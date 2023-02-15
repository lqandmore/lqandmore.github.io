function deepClone(target) {
  let newObj //定义一个变量，准备接新副本对象  
  if (typeof target === 'object') {//如果当前需要深拷贝的是一个引用类型对象
    if (target === null || target.constructor === RegExp) {//如果是null或者正则表达式对象，直接赋值
      newObj = target
    }else if (Array.isArray(target)) {//递归克隆数组中的每一项
      newObj = []
      for (let i in target) {
        newObj.push(deepClone(target[i]))
      }
    }else {//否则是普通对象，直接for in循环递归遍历复制对象中每个属性值 
      newObj = {}
      for (let i in  target) {
        newObj[i] =deepClone(target[i])
      }
    }
  } else {//如果不是对象而是原始数据类型，那么直接赋值 
    newObj = target
  }
  return newObj

}
