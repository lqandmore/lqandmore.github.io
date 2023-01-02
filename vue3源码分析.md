Vue3进行了哪些优化：

源码体积的优化：

移除一些冷门的feature(比如filter、inline-template)

引入tree-shaking，依赖ES6模块语法的静态结构，通过静态分析，将未被引入的代码块做标记，在压缩阶段利用uglify-js、terser等压缩功能句讲这些没用到的代码删掉，减少打包体积。

数据劫持优化，放弃Object.defineProperty转而使用proxy