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

#### 使用 Canvas 绘制图像的步骤：
![绘制图像的步骤](/Sourse/1.png "绘制图像的步骤")

#### 绘制圆弧

    context.arc(x,y,r,sAngle,eAngle,counterclockwise);
    
- counterclockwise：可选。规定应该逆时针还是顺时针绘图。false 为顺时针，true 为逆时针
    
#### 绘制直线

    context.beginPath();
    context.moveTo(50,50);
    context.lineTo(100,100);
    context.strokeStyle = '#fff';
    context.stroke();
    
- moveTo(x,y)：把路径移动到画布中的指定点，不创建线条
- lineTo(x,y)：添加一个新点，然后在画布中创建从该点到最后指定点的线条

    ##### 给绘制的直线添加样式

**样式**|**描述**
 ------------- | ------------- 
 lineCap	|设置或返回线条的结束端点样式（butt/round/square）
 lineJoin	|设置或返回两条线相交时，所创建的拐角类型(miter/round/bevel)
 lineWidth	|设置或返回当前的线条宽度
 miterLimit	|设置或返回最大斜接长度(前提lineJoin为miter)
 
#### 绘制矩形
 
    context.beginPath();
    context.fillStyle = '#fff';
    context.fillRect(10, 10, 100, 100);
    context.strokeStyle = '#fff';
    context.strokeRect(130, 10, 100, 100);
    
- fillRect(x,y,width,height)：绘制一个实心矩形
- strokeRect(x,y,width,height)：绘制一个空心矩形

&nbsp;
### 颜色、样式和阴影
 
 可以给路径设置哪些属性来改变其样式。
 
 **属性**|**描述**
  ------------- | ------------- 
  fillStyle	|设置或返回用于填充绘画的颜色、渐变或模式
  strokeStyle	|设置或返回用于笔触的颜色、渐变或模式
  shadowColor	|设置或返回用于阴影的颜色
  shadowBlur	|设置或返回用于阴影的模糊级别（数字）
  shadowOffsetX	|设置或返回阴影距形状的水平距离
  shadowOffsetY	|设置或返回阴影距形状的垂直距离

#### 设置阴影

    context.beginPath();
    context.arc(100,100,50,0,2*Math.PI,false);
    context.fillStyle = '#fff';
    context.shadowBlur = 20;
    context.shadowColor = '#fff';
    context.fill()

#### 设置渐变

 **方法**|**描述**
------------- | ------------- 
createLinearGradient()	|创建线性渐变（用在画布内容上）
createPattern()	|在指定的方向上重复指定的元素
createRadialGradient()	|创建放射状/环形的渐变（用在画布内容上）
addColorStop()	|规定渐变对象中的颜色和停止位置

    context.createLinearGradient(x0,y0,x1,y1)

- x0：开始渐变的 x 坐标
- y0：开始渐变的 y 坐标
- x1：结束渐变的 x 坐标
- y1：结束渐变的 y 坐标


    例：
    var grd = context.createLinearGradient(100,100,100,200);
    grd.addColorStop(0,'pink');//设置颜色断点，可添加多个addColorStop
    grd.addColorStop(1,'white');
    
    context.fillStyle = grd;//将创建的渐变作为颜色赋值给fillStyle属性
    context.fillRect(100,100,200,200);
    
>注：如果fillRect创建的图形坐标尺寸与createLinearGradient内参数设置的渐变尺寸不吻合，相当于fillRect图形截取createLinearGradient对应坐标中的一段填充


&nbsp;
### 图形转换

 **方法**|**描述**
------------- | ------------- 
scale(scalewidth,scaleheight)	|缩放当前绘图至更大或更小
rotate()	|旋转当前绘图
translate()	|重新映射画布上的 (0,0) 位置
transform()	|替换绘图的当前转换矩阵
setTransform()	|将当前转换重置为单位矩阵，然后运行 transform()


#### 缩放

    context.strokeStyle = 'white';
    context.strokeRect(5,5,50,25);//原大小
    context.scale(2,2);
    context.strokeRect(5,5,50,25);//放大两倍
    context.scale(2,2);
    context.strokeRect(5,5,50,25);//放大四倍
    
>上例可以看到，在设置 scale() 方法之后，无论是线条的宽度还是坐标的位置，都被放大了。并且 scale() 的效果是可以叠加的，也就是说，上例使用了两次 scale(2,2) 那么，最后一个矩形相对于第一个矩形长和宽，以及坐标的位置就放大了 4 倍。

#### 旋转

    context.rotate(angle)
    
- angle : 旋转角度，以弧度计。 如需将角度转换为弧度，请使用 degrees*Math.PI/180 公式进行计算。 举例：如需旋转 5 度，可规定下面的公式：5*Math.PI/180。


    例：
    context.fillStyle = 'white';
    context.rotate(20*Math.PI/180);
    context.fillRect(70,30,200,100);

 
 >在进行图形变换的时候，我们需要**画布旋转，然后再绘制图形**。
  这样的结果是，我们使用的图形变换的方法都是作用在画布上的，既然对画布进行了变换，那么在接下来绘制的图形都会变换。这点是需要注意的。
  比如我对画布使用了 rotate(20*Math.PI/180) 方法，就是将画布旋转了 20°，然后之后绘制的图形都会旋转 20°。


&nbsp;
### 图像绘制


 **方法**|**描述**
------------- | ------------- 
drawImage()	|向画布上绘制图像、画布或视频

    context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
    
- img：规定要使用的图像、画布或视频
- sx：可选。开始剪切的 x 坐标位置
- sy：可选。开始剪切的 y 坐标位置
- swidth：可选。被剪切图像的宽度
- sheight：可选。被剪切图像的高度
- x：在画布上放置图像的 x 坐标位置
- y：在画布上放置图像的 y 坐标位置
- width：可选。要使用的图像的宽度（伸展或缩小图像）
- height：可选。要使用的图像的高度（伸展或缩小图像）