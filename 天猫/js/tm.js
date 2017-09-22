window.onload=function(){
	//轮播图
	{
		let c=0;
		let t = setInterval(lb,3000);
		$(".lunBo li").hover(()=>clearInterval(t),()=>t=setInterval(lb,3000));
		$(".web-banner-list li").hover(()=>clearInterval(t),()=>t=setInterval(lb,3000));
		function lb(){
			c++;
			if(c>=$(".lunBo li").length){
				c=0;
			}
			$(".lunBo li").removeClass('active');
			$(".lunBo li").eq(c).addClass("active");
			$(".web-banner-list li").removeClass('active');
			$(".web-banner-list li").eq(c).addClass('active');
		}
		$(".lunBo li").click(function(){
			c=$(this).index();
			$(".lunBo li").removeClass('active');
			$(this).addClass("active");
			$(".web-banner-list li").removeClass('active');
			$(".web-banner-list li").eq(c).addClass('active');
		});
	}
	//测导航下面的左右轮播
	{
		let t=setInterval(lb,3000);
		let flag=true;
		$('.next-button').hover(()=>clearInterval(t),()=>t=setInterval(lb,3000));
		$('.prev-button').hover(()=>clearInterval(t),()=>t=setInterval(lb,3000));
		$(".live-con").hover(()=>clearInterval(t),()=>t=setInterval(lb,3000));

		$('.next-button').click(function(){
			$(".show-next").animate({'marginLeft':-488},100);
			$('.prev-button').css({'display':'block'});
			$(this).css({'display':'none'});
		});
		$('.prev-button').click(function(){
			$(".show-next").animate({'marginLeft':0},100);
			$('.next-button').css({'display':'block'});
			$(this).css({'display':'none'});
		});
		
		function lb(){
			if(flag){
				$(".show-next").animate({'marginLeft':0},100);
				$('.next-button').css({'display':'block'});
				$('prev-button').css({'display':'none'});
				flag=false;
			}else{
				$(".show-next").animate({'marginLeft':-488},100);
				$('.prev-button').css({'display':'block'});
				$('.next-button').css({'display':'none'});
				flag=true;
			}
		}
		
	}
	//广告上下滚动
	{
		// let t=setInterval(lb,3000);
		// let num=0;
		// function lb(){
		// 	num++;
		// 	$('.baitiao .baitiao-inner').css({'transition':'all 1s ease','margin-top':-num*30}).on('transitionend',function(){
		// 		console.log($(this).children().length)
		// 		if(num>=$(this).children().length-1){
		// 			clearInterval(t);
		// 			$(this).css({'transition':'null','margin-top':0});
		// 			num=0;
		// 			t=setInterval(lb,3000);
		// 		}
		// 	});
		// }
		
		let baitiao=document.querySelectorAll(".baitiao");
		for(var i=0;i<baitiao.length;i++){
			baitiaomove(baitiao[i]);
		}
		function baitiaomove(baitiao){
			let baitiaoInner=baitiao.querySelector(".baitiao-inner");
			let length=baitiao.querySelectorAll(".baitiao-inner-a").length;
			let num=0;
			let st = setInterval(function(){
				num++;
				baitiaoInner.style.transition="all 1s ease";
				baitiaoInner.style.marginTop=-num*30+"px";
			},3000);
			baitiaoInner.addEventListener("transitionend",function(){
				if(num>=length-1){
					clearInterval(st);
					baitiaoInner.style.transition="null";
					baitiaoInner.style.marginTop="0px";
					num=0;
					st = setInterval(function(){
						num++;
						baitiaoInner.style.transition="all 1s ease";
						baitiaoInner.style.marginTop=-num*30+"px";
					},3000);
				}
			});
		}
	}
	{
		let obj;
		let hide=document.querySelector(".a-hide");
		window.addEventListener("scroll",function(){
			obj=document.documentElement.scrollTop==0?document.body:document.documentElement;
			if(obj.scrollTop>0){
				hide.style.display="block";
			}else{
				hide.style.display="none";
			}
			hide.onclick=function(){
				let scrollt=obj.scrollTop;
				let time=500;
				let speed=scrollt/time*50;
				let st=setInterval(function(){
					scrollt-=speed;
					obj.scrollTop=scrollt;
					if(scrollt<=0){
						obj.scrollTop=0;
						clearInterval(st);
					}
				},50);
			}
		});
	}
	{
		let imgs=document.images;
		Array.from(imgs).forEach(function(ele){
			if(window.innerHeight>getPosition(ele)){

				ele.src=ele.getAttribute("data-src");
			}
		});
		window.addEventListener("scroll",function(){
			let st=document.documentElement.scrollTop==0?document.body.scrollTop:document.documentElement.scrollTop;
			Array.from(imgs).forEach(function(ele){
				if(st+window.innerHeight>getPosition(ele)){
					ele.src=ele.getAttribute("data-src");
				}
			});
		});
		function getPosition(obj){
			let ot=obj.offsetTop;
			let parent=obj.offsetParent;
			while(parent!==null&&parent.nodeName!=="BODY"){
				ot+=parent.offsetTop;
				parent=parent.offsetParent;
			}
			return ot;
		}
	}
}
