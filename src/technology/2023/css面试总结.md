#### 高度坍塌  

父元素不写高度时，子元素浮动后，父元素发生高度坍塌。

解决方案：

1. 给父元素添加声明overflow: hidden 

   优点：代码少，简单

   缺点：不能和position定位配合使用，超出尺寸的内容会被隐藏

2. 在浮动元素下方添加空的div,并给元素声明clear: both ,保险起见再添加height:0.清除个别块元素可能自带height: 16px; 

   缺点：需要添加多余的空标签，并且添加属性。影响子元素的查找。

3. 万能方式:

   ```css
   box:after{
   	content:"";
   	display:block;
   	clear:both;
   	height:0;/*为了清楚个别块元素自带的16px高度*/
   }
   ```

   

4. 父元素也添加浮动。

   缺点：可能产生新的浮动问题。

####  BFC

##### 定义

块级格式化上下文(block formatting context )，它是一个独立的渲染区域，只有块级元素参与，它规定了内部的块级元素如何布局，并且与这个区域外部毫不相干。外部元素也不会影响这个渲染区域内的元素。

简单的说就是一个隔离的独立的渲染区域，内部子元素不会影响外部元素，外部元素也无法影响区域内部子元素。

box是css布局的对象和基本单位。直观点说，就是一个页面是由很多个盒子区域组成。元素的类型和display属性，决定了这个盒子区域的类型。

不同类型的盒子区域内的子元素，会以不同的formatting context 方式渲染。display属性决定了box以哪一种方式渲染。  

display属性为block, list-item, table的元素，会生成块级元素渲染区域，并且以BFC的方式渲染。

display属性为inline, inline-table的元素，会生成行级元素渲染区域。并且以IFC的方式渲染。

##### 布局规则  

默认内部的块元素会在垂直方向，一个接一个的放置，每个块元素独占一行。



















