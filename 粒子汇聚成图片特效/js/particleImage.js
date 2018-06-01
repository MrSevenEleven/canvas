(function(){
    var defaults={
        rows:300,//粒子行数，行数应为宽度像素的约数
        cols:300,//粒子列数，列数应为高度像素的约数
        speed:15,//粒子移动速度（帧数）
        imgURL:"images/isux.png",//图片地址
        completion:0.9//图片重绘度（0-1）1表示图片完整复原

    };
    var particles=[];
    // var rows=300,cols=300;
    // var speed=15;
    var _width,_height;
    var s_width,s_height,image;
    // var canvas;
    var ctx;
    var settings;
    // var settings_;
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
                            x:Math.random()*_width,
                            y:Math.random()*_height,
                            par_x:j*s_width,
                            par_y:i*s_height,
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
    var count=0;
    function drawImage(){
            ctx.clearRect(0,0,_width,_height);
            var len=particles.length;
            for(var i=0;i<len;i++){
                ctx.fillStyle=particles[i].fillStyle;
                ctx.fillRect(particles[i].x,particles[i].y,s_width,s_height);
                if(count<parseInt(settings.speed*settings.completion)){
                    particles[i].x+=particles[i].speedX;
                    particles[i].y+=particles[i].speedY;
                }
                // else if(count==speed-1){
                //     particles[i].x=particles[i].par_x;
                //     particles[i].y=particles[i].par_y;
                // }

            }
            if(count==settings.speed*settings.completion){
                count=0;
                for(var i=0;i<len;i++){
                    particles[i].speedX=0-particles[i].speedX;
                    particles[i].speedY=0-particles[i].speedY;
                }
                cancelAnimationFrame(animate);
                setTimeout(function(){
                    drawImage();
                },5000);
            }else{
                animate=requestAnimationFrame(drawImage);
                count++
            }
        };





})()