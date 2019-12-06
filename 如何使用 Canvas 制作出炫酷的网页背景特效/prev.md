# 使用Canvas制作酷炫网页背景
&nbsp;

## 1.入门Canvas

### 创建Canvas画布

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
        <style>
            #canvas {
                background: #000;
            }
        </style>
    </head>
    <body>
        <canvas id="canvas"></canvas>
    </body>
    </html>





>没有设置宽高的Canvas，那么会**自动创建一个 300 * 150 的画布**（单位默认为 px）


改变画布的大小有三种方式：  

1.html设置height和width

    <canvas id="canvas" width="400" height="400">
    

2.css设置height和width

    #canvas {
                background: #000;
                width: 400px;
                height: 400px;
            }
          
>如果使用 CSS 来设置宽高的话，画布就会按照 300 * 150 的比例进行缩放，也就是将 300 * 150 的页面显示在 400 * 400 的容器中
  
3.js设置height和width

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var cx = canvas.width = 400;
    var cy = canvas.height = 400;
    
    
>**尽量使用 HTML 的width 和 height 属性或者直接使用 JS 动态来设置宽高，不要使用 CSS 设置。**

&nbsp;
### 获取Canvas对象

    var content=canvas.getContext(contextType, contextAttributes);

#### 上下文类型（contextType）：

- 2d：代表一个二维渲染上下文
- webgl（或"experimental-webgl"）：代表一个三维渲染上下文
- webgl2（或"experimental-webgl2"）：代表一个三维渲染上下文；这种情况下只能在浏览器中实现 WebGL 版本2 (OpenGL ES 3.0)。

```
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
```
    
&nbsp;
### 绘制路径


**方法**|**名称**
 ------------- | ------------- 
 fill()	|填充路径
 stroke()|	描边
 arc()|	创建圆弧
 rect()|	创建矩形
 fillRect()|	绘制矩形路径区域
 strokeRect()|	绘制矩形路径描边
 clearRect()|	在给定的矩形内清除指定的像素
 arcTo()|	创建两切线之间的弧/曲线
 beginPath()|	起始一条路径，或重置当前路径
 moveTo()|	把路径移动到画布中的指定点，不创建线条
 lineTo()|	添加一个新点，然后在画布中创建从该点到最后指定点的线条
 closePath()|	创建从当前点回到起始点的路径
 clip()|	从原始画布剪切任意形状和尺寸的区域
 quadraticCurveTo()|	创建二次方贝塞尔曲线
 bezierCurveTo()|	创建三次方贝塞尔曲线
 isPointInPath()|	如果指定的点位于当前路径中，则返回 true，否则返回 false
 
