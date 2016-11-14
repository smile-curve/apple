$(function(){
    //初始化 菜单的宽高
    var clientW=$(window).width();
    var clientH=$(window).height();
    $(".son").css({"width":clientW,"height":clientH});
    $(".menu").click(function(){
        $(".son").slideToggle(200);
    })

    //轮播图
    //当不关注浏览器时，setInterval会继续工作，但是有关于dom的操作会停止
    var currentNum=0;
    var nextNum=0;
    var currentTime=0;
    var flag=true;
    //图片自动轮播
    function move1(type){
        type=type||"right";
        if(type=="right"){
            nextNum++;
            if(nextNum==3){
                nextNum=0;
                flag=false;
            }
            $(".list:eq("+currentNum+")").animate({"transform":"scale(1,1)"}).css("zIndex",0);
            $(".list:eq("+nextNum+")").animate({left:0},function(){
                $(".list:eq("+currentNum+")").css({
                    left:"100%",width:"100%",height:"100%"
                })
                currentNum=nextNum;
                currentTime=0;
                flag=true;
            }).css("zIndex",1);
        }else if(type=="left"){
            nextNum--;
            if(nextNum==-1){
                nextNum=2;
                flag=false;
            }
            $(".list:eq("+currentNum+")").animate({left:"100%"}).css("zIndex",1);
            $(".list").eq(nextNum).css({"transform":"scale(1,1)","left":"0","zIndex":"0"}).animate({width:"100%",height:"100%"},function(){
                currentNum=nextNum;
            });
        }
       
    }

    //进度条的变化
    function move2(){
        currentTime+=50;
        var bili=currentTime/2600;
        if(bili>1){
            bili=1;    //防止第一个进度条在等待第二张图片时候超出1
        }
        $(".progress").eq(currentNum).css({width:bili*100+"%"});
        if(flag===false){
            $(".progress").css("width",0);
        }
    }
    var t1=setInterval(move1,3000);
    var t2=setInterval(move2,50);
    //浏览器获得焦点时，开启setInterval
    $(window).focus(function(){
        t1=setInterval(move1,3000);
        t2=setInterval(move2,50);
    })
    //浏览器失去焦点时，停止setInterval
    $(window).blur(function(){
        clearInterval(t1);
        clearInterval(t2);
    })
    $(".leftbtn").click(function(){
        clearInterval(t1);
        clearInterval(t2);
        move1("left");
        $(".btns-list").find(".progress").css("width",0);
        $(".btns-list").eq(nextNum).find(".progress").css({"width":"100%"});
    })
    $(".rightbtn").click(function(){
        clearInterval(t1);
        clearInterval(t2);
        move1("right");
        $(".btns-list").find(".progress").css("width",0);
        $(".btns-list").eq(nextNum).find(".progress").css({"width":"100%"});
    })

    $(".btns-list").click(function(){
        nextNum=$(this).index(".btns-list");
        stop();
    })
    function stop(){
        //定时器停掉
        clearInterval(t1);
        clearInterval(t2);

        //按钮的变化
        $(".btns-list").find(".progress").css("width",0);
        $(".btns-list").eq(nextNum).find(".progress").css({"width":"100%"});

        //轮播图发生变化
        if(nextNum>currentNum){
            $(".list:eq("+currentNum+")").animate({"transform":"scale(1,1)"}).css("zIndex",0);
            $(".list:eq("+nextNum+")").animate({left:0},function(){
                $(".list:eq("+currentNum+")").css({
                    left:"100%",width:"100%",height:"100%"
                })
                currentNum=nextNum;
            }).css("zIndex",1);
        }else{
            $(".list:eq("+currentNum+")").animate({left:"100%"}).css("zIndex",1);
            $(".list").eq(nextNum).css({"transform":"scale(1,1)",left:0}).animate({width:"100%",height:"100%"},function(){
                currentNum=nextNum;
            });
        }
    }
    
    
    //底部小屏时的滑上滑下效果
    $(".column_title>h4").click(function(){
        $(this).next().slideToggle(200);
    })
})