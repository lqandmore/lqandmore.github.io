# vue3源码分析



Vue3进行了哪些优化：

源码体积的优化：

移除一些冷门的feature(比如filter、inline-template)

引入tree-shaking，依赖ES6模块语法的静态结构，通过静态分析，将未被引入的代码块做标记，在压缩阶段利用uglify-js、terser等压缩功能句讲这些没用到的代码删掉，减少打包体积。

数据劫持优化，放弃Object.defineProperty转而使用proxy





createApp主要做了2件事情 ： 创建app对象和重新app.mount方法

1.创建app对象

首先，我们使用ensureRender().createApp()来创建app对象：

```javascript
const app = ensureRenderer().createApp(...args)
```

其中 ensureRenderer() 用来创建一个渲染器对象，它的内部代码是这样的：

```javascript
// 渲染相关的一些配置，比如更新属性的方法，操作 DOM 的方法
const rendererOptions = {
  patchProp,
  ...nodeOps
}
let renderer
// 延时创建渲染器，当用户只依赖响应式包的时候，可以通过 tree-shaking 移除核心渲染逻辑相关的代码
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions))
}
function createRenderer(options) {
  return baseCreateRenderer(options)
}
function baseCreateRenderer(options) {
  function render(vnode, container) {
    // 组件渲染的核心逻辑
  }

  return {
    render,
    createApp: createAppAPI(render)
  }
}
function createAppAPI(render) {
  // createApp createApp 方法接受的两个参数：根组件的对象和 prop
  return function createApp(rootComponent, rootProps = null) {
    const app = {
      _component: rootComponent,
      _props: rootProps,
      mount(rootContainer) {
        // 创建根组件的 vnode
        const vnode = createVNode(rootComponent, rootProps)
        // 利用渲染器渲染 vnode
        render(vnode, rootContainer)
        app._container = rootContainer
        return vnode.component.proxy
      }
    }
    return app
  }
}
```

