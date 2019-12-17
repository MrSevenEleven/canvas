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

```
例：
var grd = context.createLinearGradient(100,100,100,200);
grd.addColorStop(0,'pink');//设置颜色断点，可添加多个addColorStop
grd.addColorStop(1,'white');
context.fillStyle = grd;//将创建的渐变作为颜色赋值给fillStyle属性
context.fillRect(100,100,200,200);
```

    
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


----------
&nbsp;
## 2.炫酷背景特效的通性

### 背景

将背景设置为纯色、渐变或可平铺的图形？
- 为了适配所有的设备，尽可能让所有的设备都能够显示出相同的效果  
    渐变色网站：[uigradients](https://uigradients.com "uigradients")
 
    
&nbsp;
### 炫酷
- 动
- 随机

#### 让页面上的元素动起来的几种方式：
- gif 图
- CSS3 动画
- js 控制
- svg
- Canvas

#### 设置为“随机”动画的好处：  
人都有一种心理，一旦找到事物发展的规律，便对其失去了兴趣。
也就是说，如果你的动画是一个规律的，并且规律是简单可寻的，那么用户在看过一次之后，找到了其中的规律，第二次再看的时候便不会再对其感兴趣。
相反，我们就可以写出让用户每一次打开都不一样的特效，这样用户会感觉到“新奇”，便会对你的网站感兴趣。

&nbsp;
### 效果


这里我们说的效果主要是与鼠标之间的交互效果。
我们经常使用的与鼠标之间的交互效果主要有两种：

- 鼠标跟随
- 视觉差


### 总结：
- 背景  
    - 单一颜色
    - 渐变
    - 平铺
- 炫酷  
    - 动
    - 随机
- 特效（与用户交互）  
    - 鼠标跟随
    - 视觉差
    
-----------

&nbsp;
## 3.怎么实现随机粒子

#### 随机粒子特效分析

将无数的单个粒子组合使其呈现出固定形态，借由控制器，脚本来控制其整体或单个的运动，模拟出现真实的效果。

#### 实现随机粒子特效
![粒子图](/Sourse/3.png "粒子图")


[Demo3.1](chapter3.0.html "Demo3.1")

-------------
&nbsp;
### 4.使你的随机粒子动起来

#### animate() 函数

其实，Canvas 制作动画是一个不断擦除再重绘的过程，跟最原始实现动画的方式类似。在纸片上画每一帧，然后以很快的速度翻动小本本，就会有动画的效果。  
现在我们实现动画需要在很短的时间内不断的清除内容再重新绘制，新的图形和原先清除的图形之间有某种位置关系，速度足够快的话，我们就会看到动画的效果。  

要清除当前屏幕,用到的是canvas的content.clearRect() 方法。  

    context.clearRect(x,y,width,height);
    
- x：要清除的矩形左上角的 x 坐标
- y：要清除的矩形左上角的 y 坐标
- width：要清除的矩形的宽度，以像素计
- height：要清除的矩形的高度，以像素计


    window.requestAnimationFrame() 
    
window.requestAnimationFrame()方法告诉浏览器，你希望执行动画，并请求浏览器调用指定的函数在下一次重绘之前更新动画。该方法使用一个回调函数作为参数，这个回调函数会在浏览器重绘之前调用。  

使用 requestAnimationFrame() 函数递归的调用 animate() 函数来实现动画的效果。

    function animate() {
        content.clearRect(0, 0, WIDTH, HEIGHT);

        for (var i in round) {
            round[i].move();
        }
        requestAnimationFrame(animate);
    }
    
    
#### 创建 move() 函数

使用 move() 函数来改变 round 的坐标，实现运动效果。

    Round_item.prototype.move = function () {
        this.y -= 0.15;
        if (this.y <= -10) {
            this.y = HEIGHT + 10;
        }
        this.draw();
    };

运动效果：
[Demo4.0](chapter4.0.html "Demo4.0")

----------------

&nbsp;
### 5.使你的鼠标和屏幕互动

**实现效果：**
鼠标移动，会在经过的地方创建一个圆，圆的半径由小变大，达到某个固定大小时该圆消失。圆的颜色也是在随机变化的

#### onmousemove 事件

获得鼠标的坐标，然后将鼠标的坐标以及其他信息 push 到数组中

#### 设置 color

设置颜色的渐变,可用hsl（H,S,L）颜色表示,color的颜色值依次增加一个增量。

- H：Hue(色调)。0(或360)表示红色，120表示绿色，240表示蓝色，也可取其他数值来指定颜色。取值为：0 - 360
- S：Saturation(饱和度)。取值为：0.0% - 100.0%
- L：Lightness(亮度)。取值为：0.0% - 100.0%


    if (para.color) {
        color2 = para.color;
    } else {
        color = Math.random() * 360;
    }
           
  
    ···         
    if (!para.color) {
       color += .1;
       color2 = 'hsl(' + color + ',100%,80%)';
    }        
    ···
    

#### animate() 函数

清除屏幕再重新绘制

-------------

>小结  
1.创建 Canvas 元素，设置参数  
2.鼠标移动事件，将坐标信息 push 到数组  
3.设置颜色  
4.设置动画 animate() 函数

&nbsp;
### 6.使你的 Canvas 更加优雅

#### 常见的 Canvas 优化方法

##### 避免浮点数的坐标点

绘制图形时，长度与坐标应选取整数而不是浮点数，原因在于 Canvas 支持半个像素绘制。会根据小数位实现插值算法实现绘制图像的反锯齿效果，如果没有必要请不要选择浮点数值。

##### 使用多层画布去画一个复杂的场景

一般在游戏中这个优化方式会经常使用，但是在我们的背景特效中不经常使用，这个优化方式是将经常移动的元素和不经常移动的元素分层，避免不必要的重绘。

##### 用 CSS transform 特性缩放画布

如果你使用 left、top 这些 CSS 属性来写动画的话，那么会触发整个像素渲染流程 —— paint、layout 和 composition。
但是使用 transform 中的 translateX/Y 来切换动画，你将会发现，这并不会触发 paint 和 layout，仅仅会触发 composition 的阶段。
这是因为 transform 调用的是 GPU 而不是 CPU。

##### 离屏渲染

离屏渲染，其实就是设置缓存，绘制图像的时候在屏幕之外的地方绘制好，然后再直接拿过来用。
建立两个 Canvas 标签，大小一致，一个正常显示，一个隐藏（缓存用的，不插入 DOM 中）。先将结果 draw 到缓存用的 canvas 上下文中，因为游离 Canvas 不会造成 UI 的渲染，所以它不会展现出来；再把缓存的内容整个裁剪再 draw 到正常显示用的 Canvas 上，这样能优化不少。

#### 离屏渲染

Canvas 的离屏渲染优化，以前两个示例说明，主要过程就是将一个一个的粒子先在屏幕之外创建出来，然后再使用 drawImage() 方法将其“放入”到我们的主屏幕中。

方式一：
[每个粒子都创建一个离屏canvas实例](chapter6.0.html "每个粒子都创建一个canvas实例")

方式二：
[所有粒子都创建在一个离屏canvas实例中](chapter6.1.html "每个粒子都创建一个canvas实例")

>小结：
1.离屏canvas并不一定会优化canvas的性能，还与代码中调用canvasAPI所消耗的性能相关  
2.方式一中，绘制第一种形状的简单粒子，在不开启离屏时性能反而优于开启状态；  
3.方式一中，绘制第二种形状的彩虹圈粒子，开启离屏性能得到明显优化；  
4.方式二中，将所有粒子都绘制在一张离屏canvas对象中，每次更新离屏canvas对象再drawImage()更新到屏幕画布显示，性能没有太大变化（这种方式每次都需要重绘粒子，与直接在屏幕上绘制粒子性能相差无几）；  
5.离屏渲染的目的应该尽可能复用已绘制元素的离屏canvas，减少再次重绘某些图形元素的造成的性能损耗。同时需要创建绘制多个canvas造成的API损耗应该与直接在屏幕上绘制图形的损耗相权衡，才能达到真正优化方式。



#### canvas性能优化文章参考：
[Canvas 最佳实践（性能篇）](https://fed.taobao.org/blog/taofed/do71ct/canvas-performance/?spm=taofed.blogs.header.7.1cdc5ac8QP4aJy "Canvas 最佳实践（性能篇）")










