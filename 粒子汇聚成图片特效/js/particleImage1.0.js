(function(){
    var defaults={
        rows:300,//粒子行数，行数应为宽度像素的约数
        cols:300,//粒子列数，列数应为高度像素的约数
        speed:10,//粒子移动速度（帧数）
        during:1000,//每个粒子运动的时间
        imgURL:"images/isux.png",//图片地址
        completion:1,//图片重绘度（0-1）1表示图片完整复原
        back:true,//重绘结束是否还原粒子平铺
        stayTime:4000,//重绘结束至粒子重新平铺开始的时间(back为true时有效)

    };
    var particles=[];
    var _width,_height;
    var s_width,s_height,image;
    var ctx;
    var settings;
    $.fn.particleImage=function(options){
        settings=$.extend({},defaults,options);
        this.each(function(){
            init(this);
        })
    };

    function init(element){
        // var canvas=document.getElementById(element_);
        $(element).append('<canvas id="particleImageCanvas"></canvas>');
        _width=$(element).width();
        _height=$(element).height();
        var canvas=document.getElementById("particleImageCanvas");
        canvas.width=_width;
        canvas.height=_height;
        ctx=null;
        if(canvas.getContext){
            ctx=canvas.getContext('2d');
        }
        var img=new Image();
        img.src=settings.imgURL;
        img.onload=function(){
            ctx.drawImage(img,0,0,_width,_height);
            image=ctx.getImageData(0,0,_width,_height);
            s_width=parseInt(image.width/settings.cols);
            s_height=parseInt(image.height/settings.rows);
            calculatePos();
        };

    };
    function calculatePos() {
            var data=image.data;

            // for(var i=0;i<data.length/4;i++){
            //     if(data[4*i]<255){
            //         var particle={
            //             x:300,
            //             y:300,
            //             par_x:i%600,
            //             par_y:(i/600).toFixed(0),
            //             fillStyle:'rgba('+data[4*i]+','+data[4*i+1]+','+data[4*i+2]+','+data[4*i+3]+')',
            //         };
            //         var startx=particle.x;
            //         var endx=particle.par_x;
            //         var starty=particle.y;
            //         var endy=particle.par_y;
            //         particle.speedX=(endx-startx)/speed;
            //         particle.speedY=(endy-starty)/speed;
            //         particle.xx=particle.x;
            //         particle.yy=particle.y;
            //         particles.push(particle);
            //     }
            // }

            for(var i=1;i<=settings.rows;i++){
                for(var j=1;j<=settings.cols;j++){
                    var pos=[(i*s_height-1)*image.width+(j*s_width-1)]*4;
                    if(data[pos]<255||data[pos+1]<255||data[pos+2]<255||data[pos+3]<255){
                        var particle={
                            x:_width/2,//粒子初始位置
                            y:_height/2,
                            par_x:j*s_width+Math.random()*30,
                            par_y:i*s_height+Math.random()*30,
                            duration:settings.during,
                            count:0,
                            fillStyle:'rgba('+data[pos]+','+data[pos+1]+','+data[pos+2]+','+data[pos+3]+')',
                        };
                        var startx=particle.x;
                        var endx=particle.par_x;
                        var starty=particle.y;
                        var endy=particle.par_y;
                        particle.speedX=(endx-startx)/settings.speed;
                        particle.speedY=(endy-starty)/settings.speed;
                        particle.xx=particle.x;
                        particle.yy=particle.y;
                        particles.push(particle);
                    }
                }
            }


            drawImage();
        };
    var animate;//停止循环的句柄
    var step=1;
    function drawImage(){
            ctx.clearRect(0,0,_width,_height);
            var len=particles.length;
            // var step=1;
            for(var i=0;i<len/settings.rows*step*2;i++){
                    ctx.fillStyle=particles[i].fillStyle;
                    var x=linear(particles[i].duration/settings.speed*particles[i].count,particles[i].x,particles[i].par_x-particles[i].x,particles[i].duration);
                    var y=linear(particles[i].duration/settings.speed*particles[i].count,particles[i].y,particles[i].par_y-particles[i].y,particles[i].duration);
                if(particles[i].count<settings.speed){
                    particles[i].count++;
                    if(particles[i].count>0){
                        var ranx=Math.random()*10*particles[i].count;
                        var rany=Math.random()*20*particles[i].count;
                        x>=particles[i].x? x=x+ranx:x=x-ranx;
                    //     x=x+ran;
                        y=y+rany;
                    }

                }
                ctx.fillRect(x,y,s_width,s_height);
                // if(count<parseInt(settings.speed*settings.completion)){
                //     particles[i].x+=particles[i].speedX;
                //     particles[i].y+=particles[i].speedY;
                // }
                // else if(count==speed-1){
                //     particles[i].x=particles[i].par_x;
                //     particles[i].y=particles[i].par_y;
                // }

            }
            var count=0;
            for(i=0;i<len;i++){
                if(particles[i].count==settings.speed){
                    count++;
                }
            }
            if(count==len){
                cancelAnimationFrame(animate);
                step=1;
                // if(settings.back){
                //     count=0;
                //     for(var i=0;i<len;i++){
                //         particles[i].speedX=0-particles[i].speedX;
                //         particles[i].speedY=0-particles[i].speedY;
                //     }
                //     setTimeout(function(){
                //         drawImage();
                //     },settings.stayTime);
                // }
            }else{
                animate=requestAnimationFrame(drawImage);
                step++;
            }
        };

    var linear=function(e,a,g,f){return g*e/f+a},
        easeInOutQuad=function(e,a,g,f){e/=f/2;if(e<1){return g/2*e*e+a}e--;return -g/2*(e*(e-2)-1)+a},
        easeOutQuad=function(e,a,g,f){e/=f;return -g*e*(e-2)+a},
        easeOutQuad=function(e,a,g,f){e/=f;return -g*e*(e-2)+a},
        easeInCubic=function(e,a,g,f){e/=f;return g*e*e*e+a},
        easeOutCubic=function(e,a,g,f){e/=f;e--;return g*(e*e*e+1)+a},
        easeInOutCubic=function(e,a,g,f){e/=f/2;if(e<1){return g/2*e*e*e+a}e-=2;return g/2*(e*e*e+2)+a},
        easeInQuart=function(e,a,g,f){e/=f;return g*e*e*e*e+a},
        easeOutQuart=function(e,a,g,f){e/=f;e--;return -g*(e*e*e*e-1)+a},
        easeInOutQuart=function(e,a,g,f){e/=f/2;if(e<1){return g/2*e*e*e*e+a}e-=2;return -g/2*(e*e*e*e-2)+a},
        easeInQuint=function(e,a,g,f){e/=f;return g*e*e*e*e*e+a},
        easeOutQuint=function(e,a,g,f){e/=f;e--;return g*(e*e*e*e*e+1)+a},
        easeInOutQuint=function(e,a,g,f){e/=f/2;if(e<1){return g/2*e*e*e*e*e+a}e-=2;return g/2*(e*e*e*e*e+2)+a},
        easeInSine=function(e,a,g,f){return -g*Math.cos(e/f*(Math.PI/2))+g+a},
        easeOutSine=function(e,a,g,f){return g*Math.sin(e/f*(Math.PI/2))+a},
        easeInOutSine=function(e,a,g,f){return -g/2*(Math.cos(Math.PI*e/f)-1)+a},
        easeInExpo=function(e,a,g,f){return g*Math.pow(2,10*(e/f-1))+a},
        easeOutExpo=function(e,a,g,f){return g*(-Math.pow(2,-10*e/f)+1)+a},
        easeInOutExpo=function(e,a,g,f){return g*(-Math.pow(2,-10*e/f)+1)+a},
        easeInCirc=function(e,a,g,f){e/=f;return -g*(Math.sqrt(1-e*e)-1)+a},
        easeOutCirc=function(e,a,g,f){e/=f;e--;return g*Math.sqrt(1-e*e)+a},
        easeInOutCirc=function(e,a,g,f){e/=f/2;if(e<1){return -g/2*(Math.sqrt(1-e*e)-1)+a}e-=2;return g/2*(Math.sqrt(1-e*e)+1)+a},
        easeInOutElastic=function(g,e,k,j,f,i){if(g==0){return e}if((g/=j/2)==2){return e+k}if(!i){i=j*(0.3*1.5)}if(!f||f<Math.abs(k)){f=k;var h=i/4}else{var h=i/(2*Math.PI)*Math.asin(k/f)}if(g<1){return -0.5*(f*Math.pow(2,10*(g-=1))*Math.sin((g*j-h)*(2*Math.PI)/i))+e}return f*Math.pow(2,-10*(g-=1))*Math.sin((g*j-h)*(2*Math.PI)/i)*0.5+k+e},
        easeInElastic=function(g,e,k,j,f,i){if(g==0){return e}if((g/=j)==1){return e+k}if(!i){i=j*0.3}if(!f||f<Math.abs(k)){f=k;var h=i/4}else{var h=i/(2*Math.PI)*Math.asin(k/f)}return -(f*Math.pow(2,10*(g-=1))*Math.sin((g*j-h)*(2*Math.PI)/i))+e},
        easeOutElastic=function(g,e,k,j,f,i){if(g==0){return e}if((g/=j)==1){return e+k}if(!i){i=j*0.3}if(!f||f<Math.abs(k)){f=k;var h=i/4}else{var h=i/(2*Math.PI)*Math.asin(k/f)}return(f*Math.pow(2,-10*g)*Math.sin((g*j-h)*(2*Math.PI)/i)+k+e)},
        easeInOutBack=function(e,a,h,g,f){if(f==undefined){f=1.70158}if((e/=g/2)<1){return h/2*(e*e*(((f*=(1.525))+1)*e-f))+a}return h/2*((e-=2)*e*(((f*=(1.525))+1)*e+f)+2)+a},easeInBack=function(e,a,h,g,f){if(f==undefined){f=1.70158}return h*(e/=g)*e*((f+1)*e-f)+a},
        easeOutBack=function(e,a,h,g,f){if(f==undefined){f=1.70158}return h*((e=e/g-1)*e*((f+1)*e+f)+1)+a};



})()