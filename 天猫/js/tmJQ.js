$(function(){
    var designWidth = 1080;
    function fontSize(){
        var CW = document.documentElement.clientWidth;
        console.log(CW);
        if (CW<768) {
            var size = CW/designWidth*100+"px";
            $("html").css("fontSize",size);
        }else{
            $("html").css("fontSize",null);
        }
    }
    fontSize();
    $(window).resize = fontSize;
    {
        const small=document.querySelectorAll(".show-next>div>a");
        const big=document.querySelectorAll(".above-cover>a>image");
        const word=document.querySelectorAll(".cover-m-word");
        const masks=document.querySelectorAll(".show-next a .mask");
        const gonggao=document.querySelector(".fc-item-list");
        let length=document.querySelectorAll(".fc-item-list span").length;
        let num=0;
        small.forEach(function(ele,index){
            ele.onmouseover=function(){
                big.forEach(function(ele,index){
                    ele.style.zIndex=1;
                    ele.style.display="none";
                    masks[index].style.display="none";
                    word[index].style.display="none";
                })
                big[index].style.display="block";
                masks[index].style.display="block";
                word[index].style.display="block";
            }
        });
        setInterval(function(){
            num++;
            if (num == 1) {
                gonggao.style.transition="all .5s ease";
            }
            if(num==length/2){
                num=0;
            }
            gonggao.style.marginTop=-num*40+"px";
        },3000);
        gonggao.addEventListener("transitionend",function(){
            if(num==2){
                gonggao.style.transition="null";
                gonggao.style.marginTop="-2px";
                num=0;
            }
        })
    }
    //左侧导航栏
    {
        let colorarr=["#64C333","#EA5F8D","#0AA6E8","#F7A945","#19C8A9","#F15453","#000"];
        let index;
        let leftbararr=[];
        $(window).scroll(function(){
            var st=$(window).scrollTop();
            if(st>765){
                $(".toptop").slideDown(300);
            }
            if(st>600){
                $(".left-fixed").show(500);
            }else if(st<600){
                $(".left-fixed").hide(500);
            }
            if(st<765){
                $(".toptop").slideUp(300);
            }
            $(".fouth-parts").each(function(i){
                leftbararr.push($(this).offset().top);
            })
            $(".left-fixed .inners").each(function(i){
                if(st>leftbararr[i]){
                    $(".left-fixed .inners").css("background",'rgba(0,0,0,0.6)').eq(i).css("background",colorarr[i]);
                }
            });
        })
        $(".left-fixed .inners").click(function(){
            let index=($(this).index()-1);
            let ot=$(".fouth-parts").eq(index).offset().top;
            $("html,body").animate({scrollTop:ot});
            $(".left-fixed .inners").css("background",'rgba(0,0,0,0.6)').eq(index).css("background",colorarr[index]);
        });
    }
})