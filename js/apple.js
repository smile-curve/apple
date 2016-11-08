$(function(){
	var num=0;
	var next=0;
	var w=$(window).width();
	var flag=true;
	$(".imgbox>a:gt(0)").css("left",$(".imgbox>a").width()+"px");
	function move(type){
		type=type||"right";
		if(!flag){
			return;
		}
		flag=false;
		$(".imgbox>a").stop(false,false);
		if(type=="left"){
			next--;
			if(next<0){
				next=$(".imgbox>a").length-1;
			}
			$(".imgbox>a").eq(next).css("left","-"+$(".imgbox>a").width()+"px").animate({left:0},1000);
			$(".imgbox>a").eq(num).animate({left:w},1000,function(){
				flag=true;
			})
		}
		if(type=="right"){
			next++;
			if(next>=$(".imgbox>a").length){
				next=0;
			}
			$(".imgbox>a").eq(next).css("left",$(".imgbox>a").width()+"px").animate({left:0},1000);
			$(".imgbox>a").eq(num).animate({left:"-"+$(".imgbox>a").width()},1000,function(){
				flag=true;
			})
			
		}
		$(".banner>.btn>li").eq(next).addClass("active");
      	$(".banner>.btn>li").eq(num).removeClass("active");
      	num=next;
		
	}
	var t=setInterval(move,3000);
	$(".banner").mouseover(function(){
		clearInterval(t);
		$(".leftbtn").css("display","block");
		$(".rightbtn").css("display","block");
	}).mouseout(function(){
		t=setInterval(move,3000);
		$(".leftbtn").css("display","none");
		$(".rightbtn").css("display","none");
	})
	$(".leftbtn").click(function(){
		move("left");
	})
	$(".rightbtn").click(function(){		
		move("right");
	})
	$(".banner>.btn li").click(function(){
		next=$(this).index();
		if(num>next){
			next=$(this).index()-1;
			move("right");
		}else if(num<next){
			next=$(this).index()+1;
			move("left");
		}
	})
})

