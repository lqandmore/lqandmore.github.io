//状态机
var PENDING = 0; //挂起状态
var FULFILLED = 1; //执行成功状态
var REJECTED = 2; //执行失败状态
//定义Promise构造函数，将来用new创建Promise对象 
function Promise() {
  // state变量存储当前Promise对象的执行状态 
  var state = PENDING;
  // value变量存储执行成功后的返回值，或执行失败后的错误提示信息 
  var value = null;
  // handlers变量是一个数组，存储将来用.then()函数传入的一个或多个后续任务函数。
  var handlers = [];
  //状态变迁——定义两个底层专门修改状态的函数 
  function fulfill(result) { //执行成功后，把状态改为成功状态，并把执行结果返回值，保存在变量value中
    state = FULFILLED;
    value = result;
  }
  function reject(error) { //执行失败后，把状态改为失败状态，并把错误提示信息，保存在变量value中
    state = REJECTED;
    value = error;
  }
  //fulfill和reject方法较为底层， 通常会对外开放一个更高级的resolve方法。
  function resolve(result) { //如果当前任务成功执行完成，使用者调用了resolve(返回值)
    try {
      var then = getThen(result); //就要收集当前Promise对象身上后续的.then()函数中传入的内容
      if (then) { //如果有.then
      //就调用核心doResolve函数，执行.then()中的函数，并传入两个状态切换函数。
        doResolve(then.bind(result), resolve, reject) //resolve和doResolve之间的递归用来处理promise的层层嵌套 
        return
      } //如果没有.then，就直接切换当前Promise对象的状态，并返回执行结果，结束当前Promise对象的执行 
      fulfill(result);
    } catch (e) { //如果调用过程中出错，就调用reject()函数，将当前Promise状态切换为失败，并返回错误提示信息 
      reject(e);
    } 
  }
}

function Promise(fn) {
  //调用核心函数doResolve()，在new时就执行当前任务 
  doResolve(fn, resolve, reject); //调用上一步的doResolve(...)
  /*
    fn: function(res, rej){ 异步任务; 执行成功res(返回值); 执行失败rej(错误提示) }
    resolve是上一步定义的resolve函数 
    reject是第一步定义的出错后，将当前Promise对象状态修改为失败的回调函数
  */
  //定义函数handler，用来根据当前Promise对象的状态， 决定调用handlers数组中的哪种处理函数
  function handle(handler) { 
    if (state === PENDING) {
      handlers.push(handler); 
    } else {
      if (state === FULFILLED && typeof handler.onFulfilled === 'function') { 
        handler.onFulfilled(value);
      }
      if (state === REJECTED && typeof handler.onRejected === 'function') {
        handler.onRejected(value); 
      }
    } 
  }
  //为当前Promise对象添加.done()方法
  this.done = function (onFulfilled, onRejected) {
    // 使用定时器，确保当前任务一定是异步执行的 
    setTimeout(function () {
      handle({ //传入修改状态的两个回调函数 
        onFulfilled: onFulfilled,
        onRejected: onRejected
      }); 
    }, 0);  
  }

  this.then = function (onFulfilled, onRejected) {
    var self = this; //保存当前Promise对象
    return new Promise(function (resolve, reject) { //创建并返回下一个Promise对象
      return self.done(
        function (result) { //调用当前对象的done()函数
          if (typeof onFulfilled === 'function') { //如果.then()中传入的是一个函数 
            try {
              return resolve(onFulfilled(result)); //就调用resolve，传入下一项任务的函数，执行。 
            } catch (ex) { return reject(ex);}
          } else {
            return resolve(result); //否则就传入下一个Promise对象，继续等待。
          } 
        },
        function (error) {
          if (typeof onRejected === 'function') {
            try {
              return resolve(onRejected(error));
            } catch (ex) {return reject(ex);} 
          } else {
            return reject(error); 
          }
        } 
      );
    })
  }
}


//实现getThen()函数
/**
* .then()函数中传入的内容有两种情况: 可能传入的是下一个Promise对象，也可能直接传入匿名函数 * 如果调用resolve时传入的是下一个Promise对象，
* 就返回这个Promise对象的.then()函数.
* 如果调用resolve时传入的是下一个函数
* 就直接返回这个函数即可
* 如果调用resolve时什么都没传，就返回null
*/
function getThen(value) {
  var t = typeof value;
  if (value && (t === 'object' || t === 'function')) {
    var then = value.then;
    if (typeof then === 'function') {
      return then; 
    }
  }
  return null; 
}

//实现doResolve()函数——核心
/**
* 调用传入的.then()函数，并传入执行成功和执行失败两个修改状态的回调函数*/
function doResolve(fn, onFulfilled, onRejected) { 
  var done = false; //默认暂时未执行成功
  try {
    fn( //调用当前任务函数
      function (value) { //传入执行成功后，请使用者主动调用的res函数
        if (done) return //如果done被标记为true，说明当前异步任务执行完
        done = true //否则如果done暂时未被标记为true， 就标记为true，让当前异步任务状态变为完成状态
        onFulfilled(value) //调用传入的第一步定义的改变当前Promise状态的函数，把当前Promise对象标记为执行成功，并保存返回值 //这里调用了resolve函数。
      },
      function (reason) {//传入执行失败后，请使用者主动调用的resolve函数
        if (done) return //如果done被标记为true，说明当前异步任务执行完
        done = true //否则如果done暂时未被标记为true，就标记为true，让当前异步任务状态变为完成状态
        onRejected(reason) //调用传入的第一步定义的改变当前Promise状态的函数，把当前Promise对象标记为执行失败，并保存错误提示
      }
    )
  } catch (ex) { //如果出现异常
    if (done) return //如果done被标记为true，说明当前异步任务执行完，就退出当前任务的执行 
    done = true //否则如果done暂时未被标记为true，就标记为true。
    onRejected(ex) //调用传入的改变状态函数，把当前Promise对象标记为执行失败
  } 
}
