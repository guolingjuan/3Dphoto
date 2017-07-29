/**
 * Created by LBBCute on 2017/7/26.
 */
window.onload=function(){
    var oImg=document.getElementsByTagName("img");
    var imgLength=oImg.length;
    var deg=360/imgLength;  //每一个图片的旋转的度数
    (function(i){
        for(;i<imgLength;i++){
            oImg[i].style.transform="rotateY("+deg*i+"deg) translateZ(330px)";
        }
    })(0);

    /*鼠标移动的时候，旋转的度数等于现在鼠标移动的距离与上一次鼠标移动的距离差*/
    var nowX,nowY,lastX,lastY,minusX,minusY,rox=-10,roy=0;
    var oWarp=document.getElementById("wrap");
    document.onmousedown=function(event){
        var e=event||window.event;
        lastX= e.clientX;  //最初的lastX,lastY就是刚开始点击的鼠标值
        lastY= e.clientY;
        this.onmousemove=function(event){
            var e=event||window.event;
            nowX= e.clientX;
            nowY= e.clientY;

            /*计算差值*/
            minusX=nowX-lastX;
            minusY=nowY-lastY;

            /*计算旋转的度数*/
            rox-=minusX*0.2;
            roy=minusY*0.1;

            oWarp.style.transform="rotateX("+rox+"deg) rotateY("+roy+"deg)";

            lastX=nowX;  //lastX就是nowX用完之后
            lastY=nowY;

        };
        this.onmouseup=function(){
            this.onmousemove=null;  //清空鼠标移动事件
            /*鼠标松开的时候有惯性；就是度数的变化（差值得变化）让度数慢慢的减小
            * 当差值小鱼某个值的时候，整个的改变就结束*/
            var timer=setInterval(function(){
                minusX*=0.95;
                minusY*=0.95;

                rox-=minusX*0.2;
                roy=minusY*0.1;
                oWarp.style.transform="rotateX("+rox+"deg) rotateY("+roy+"deg)";
                if(Math.abs(minusX)<0.1||Math.abs(minusY)<0.1){ //差值的绝对值的判断
                    clearInterval(timer);
                }
            },1000/60);
        }
    }




};