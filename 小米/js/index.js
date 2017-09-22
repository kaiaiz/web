window.onload = function() {
    //lzp_lb("banner-lb", "2000"); //轮播图
    lb1();
    GetAsideWidth(); //aside 测导航 改变宽度
    xmSingleProduct(); //小米最新单品 左右移动效果  改变 盒子上边宽 颜色
    powerflag(); //家电 滑动上移   Css动画也实现效果
    powerRightAfter(); //追加数据
    powerTab(".dp"); //家电 选项卡
    powerTab(".zn"); //智能 选项卡
    xmSingleProducts();
    zblb();
    search();
    xhcd();
}
function xhcd(){
    let sectionNav = document.querySelectorAll(".section-nav>main>nav>ul>li");
    let sectionNavM = document.querySelector(".section-nav>main>nav>ul");
    let ycNa = document.querySelector(".section-nav>.yc-na");
    let t;
    for(let i=0;i<sectionNav.length;i++){
        let ycNav;
        if(sectionNav[i].children.length>=2){
            ycNav= sectionNav[i].children[1];
            sectionNav[i].onmouseenter=function(){
                ycNa.style.height="230px";
                setTimeout(function(){
                    ycNa.append(ycNav);
                    ycNa.querySelector(".yc-nav").style.display="block";  
                },100)
            }
            sectionNav[i].onmouseleave=function(){
                ycNa.innerHTML="";
            }
        }
        sectionNav[i].onmouseleave=function(){
            if(sectionNav[i].children.length<2){
                ycNa.style.height="0";
            }
            ycNa.innerHTML="";
        }
    } 
    sectionNavM.onmouseleave=function(){
        ycNa.style.height="0";
        ycNa.innerHTML="";
        clearInterval(t);
    }
}

function search(){
    let search = document.getElementsByClassName("search-3")[0];
    let ycr = document.getElementsByClassName("yc-r")[0];
    let sectionTop = document.getElementsByClassName("section-top")[0];
    window.onclick=function(e){
        if(e.target.getAttribute("id")=="search-1"){
           ycr.style.display="block";
           sectionTop.style.display="none";
        }else{
             ycr.style.display="none";
             sectionTop.style.display="block";
        }
    }
}
function zblb() {
    var xh = 0;
    for (var i = 0; i < 4; i++) {
        $(".nr-box-in .nr-yd li").eq(3 * i).css({
            'border': '2px solid #FF6700',
            'background': '#fff',
            'width': '6px',
            'height': '6px'
        });
    }
    $(".nr-box-in .nr-yd li").click(function(event) {
        xh = $(this).index();
        var num = xh * 296 + 15 * xh;

        $(this).closest('.nr-yd').closest('li').find('.nr-in').animate({ 'margin-left': '-' + num + 'px' });
        $(".nr-box-in .nr-yd li").css({ 'border': 'none', 'background': '#b0b0b0', 'width': '8px', 'height': '8px' });
        $(this).css({ 'border': '2px solid #FF6700', 'background': '#fff', 'width': '6px', 'height': '6px' });
    });
    $(".nr-box-in li .nr-r").click(function(event) {
        xh = xh + 1;
        if (xh > 2) {
            xh = 2;
        }
        var num = xh * 296 + 15 * xh;
        $(this).closest('li').find('.nr-in').animate({ 'margin-left': '-' + num + 'px' });
        $(".nr-box-in .nr-yd li").css({ 'border': 'none', 'background': '#b0b0b0', 'width': '8px', 'height': '8px' });
        $(this).closest('li').find('.nr-yd').find('li').eq(xh).css({ 'border': '2px solid #FF6700', 'background': '#fff', 'width': '6px', 'height': '6px' });
    });
    $(".nr-box-in li .nr-l").click(function(event) {
        xh = xh - 1;
        if (xh < 0) {
            xh = 0;
        }
        var num = xh * 296 + 15 * xh;
        $(this).closest('li').find('.nr-in').animate({ 'margin-left': '-' + num + 'px' });
        $(".nr-box-in .nr-yd li").css({ 'border': 'none', 'background': '#b0b0b0', 'width': '8px', 'height': '8px' });
        $(this).closest('li').find('.nr-yd').find('li').eq(xh).css({ 'border': '2px solid #FF6700', 'background': '#fff', 'width': '6px', 'height': '6px' });
    });
}
//家电 选项卡
//
function powerTab(name) {
    $(name + " .mi-homepower-right ul li").click(function(event) {
        $(name + " .home-power-in").hide();
        $(name + " .mi-homepower-right ul li").css({ 'color': '#424242', 'border-bottom': 'none' });
        $(this).css({ 'color': '#ff6700', 'border-bottom': '2px solid #ff6700' });
        $(name + " .home-power-in").eq($(this).index()).show();
    });
}
//追加数据
function powerRightAfter() {
    var powerintemp = $(".homepower-right").html();
    var powerin = "";
    var flag = ['影音-2', '电脑-3', '家居-4'];
    for (var i = 0; i < 3; i++) {
        powerin = powerin + powerintemp.replace("享9.5折", flag[i]);
    }
    $(".homepower-right .home-power-in").after(powerin);
}
//家电 滑动上移
function powerflag() {
    $(".home-power-in li").mouseover(function() {
        $(".hiddenflag").animate({ 'bottom': '-75px' });
    })
    $(".home-power-in li").mouseout(function() {
        $(".hiddenflag").animate({ 'bottom': '-75px' });
    })
}
//周边推荐 动画 左右移动效果
function xmSingleProducts() {
    let t;
    let flag=true;
    $(".mi-zb .mi-spbtn-left").css('color', '#B0B0B3');
    $(".mi-zb .mi-spbtn-left").click(function() {
        clearInterval(t);
        $(".mi-zb .zb-box-in").animate({ 'margin-left': '-1240px' }, 1000);
    })
    $(".mi-zb .mi-spbtn-right").click(function() {
         clearInterval(t);
        $(".mi-zb .zb-box-in").animate({ 'margin-left': '0' }, 1000, );
    })
    function qhs(){
        if(flag){
            $(".mi-zb .zb-box-in").animate({ 'margin-left': '-1240px' }, 1000);
            flag=false;
        }else{
            $(".mi-zb .zb-box-in").animate({ 'margin-left': '0' }, 1000, );
            flag=true;
        }
    }
    t=setInterval(qhs,5000);
}
//小米最新单品 变色+ 动画 左右移动效果
function xmSingleProduct() {
    $(".mi-spbtn-left").css('color', '#B0B0B3');
    var asa = $('.sp-box-in li');
    let flag=true;
    let t;
    for (var i = 0; i < asa.length; i++) {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        var randomRgb = "rgb(" + r + "," + g + "," + b + ")";

        if (i < 4) {
            $('.nr-box-in li h2').eq(i).css({ 'color': randomRgb, 'border-color': randomRgb });
        }
        $('.sp-box-in li').eq(i).css('border-color', randomRgb);
    }
    t=setInterval(qhcp,5000);
    function qhcp(){
        if(flag){
            $(".mi-spbtn-right").css('color', '#B0B0B3');
            $(".mi-spbtn-left").css('color', '#EBEBEB');
            $(".mx-box-in").animate({ 'margin-left': '-1240px' }, 1000);
            flag=false;
        }else{
            $(".mi-spbtn-right").css('color', '#EBEBEB');
            $(".mi-spbtn-left").css('color', '#B0B0B3');
            $(".mx-box-in").animate({ 'margin-left': '0' }, 1000, function() {});
            flag=true;
        }
    }
    $(".mi-spbtn-left").click(function() {
        clearInterval(t);
        $(this).css('color', '#EBEBEB');
        $(".mi-spbtn-right").css('color', '#B0B0B3');
        $(".mx-box-in").animate({ 'margin-left': '-1240px' }, 1000);
    })
    $(".mi-spbtn-right").click(function() {
        clearInterval(t);
        $(this).css('color', '#EBEBEB');
        $(".mi-spbtn-left").css('color', '#B0B0B3');
        $(".mx-box-in").animate({ 'margin-left': '0' }, 1000, function() {});
    })
    $(".mi-spbtn-left").mouseup(function(event) {
        t=setInterval(qhcp,5000);
    });
    $(".mi-spbtn-right").mouseup(function(event) {
        t=setInterval(qhcp,5000);
    });
}
//取到aside响应出来的右侧菜单宽度。
function GetAsideWidth() {
    $(".aside-out").mouseover(function(event) {
        var number = $(this).find('.create-aside ul').length;
        var asideWidth = 0;
        if (number == 4) {
            asideWidth = number * 246 + 8;
        } else {
            asideWidth = number * 246 + 16;
        }
        $(".create-aside").css({ width: asideWidth + 'px' });
    });
}
function lb1(){
    let c=0,timer=5000;
    let t=setInterval(lbss,timer);
    $(".lb-yd li").click(function(){
        c=$(this).index();
        $(".lb-yd li").css({'background-color':"#dddddd"});
        $(this).css({'background-color':"#a10000"});
        $(".lb-img li").finish();
        $(".lb-img li").animate({opacity: 0},1000);
        $(".lb-img li").eq(c).animate({opacity: 1},1000);
    });
    function lbss(){
        
        if(c>=$(".lb-img li").length){
            c=0;
        }
        $(".lb-yd li").hover(()=>clearInterval(t),()=>t=setInterval(lbss,timer)).css({'background-color':"#dddddd"});
        $(".lb-yd li").eq(c).css({'background-color':"#a10000"});
        $(".lb-img li").animate({opacity: 0},1000);
        $(".lb-img li").hover(()=>clearInterval(t),()=>t=setInterval(lbss,timer)).eq(c).animate({opacity: 1},1000,()=>c++);
    }
    $(".lb-l").hover(()=>clearInterval(t),()=>t=setInterval(lbss,timer)).click(function(){
        c++;
        if(c>=$(".lb-img li").length){
            c=0;
        }
        $(".lb-img li").finish();
        $(".lb-yd li").css({'background-color':"#dddddd"});
        $(".lb-yd li").eq(c).css({'background-color':"#a10000"});
        $(".lb-img li").animate({opacity: 0},1000);
        $(".lb-img li").eq(c).animate({opacity: 1},1000);
        
    });
    $(".lb-r").hover(()=>clearInterval(t),()=>t=setInterval(lbss,timer)).click(function(){
        c--;
        if(c<0){
            c=$(".lb-img li").length-1;
        }
        $(".lb-img li").finish();
        $(".lb-yd li").css({'background-color':"#dddddd"});
        $(".lb-yd li").eq(c).css({'background-color':"#a10000"});
        $(".lb-img li").animate({opacity: 0},1000);
        $(".lb-img li").eq(c).animate({opacity: 1},1000);
  
    });

    
}
//  轮播特效
function lzp_lb(name, time) {
    var newlb = document.getElementsByClassName(name);
    var img = newlb[0].getElementsByTagName("li");
    let imgWidth = img[0].style.width;
    var newyd = document.getElementsByClassName("lb-yd");
    var yd = newyd[0].getElementsByTagName("li");
    var lbl = document.getElementsByClassName("lb-l");
    var lbr = document.getElementsByClassName("lb-r");
    var c = 0;
    let flag=true;
    var lbtimer = setInterval(lbss, time);

    function lbss() {
        c++;
        if (c == 4) {
            c = 0;
        }

        lbqh();
    }

    function lbqh(){
        if(flag){
            flag=false;
            for (var i = 0; i < 4; i++) {
                animate(img[i],{opacity: 0},1000);
                yd[i].style.background = '#dddddd';
            }
            animate(img[c],{opacity: 1},1000,function(){
                flag=true;
            });
            yd[c].style.background = '#a10000';
        }
    }

    for (var i = 0; i < yd.length; i++) {
        yd[i].xh = i;
        yd[i].onmouseover = function() {
            c = this.xh;
            clearInterval(lbtimer);
            lbqh();
        }
        yd[i].onmouseout = function() {
            lbtimer = setInterval(lbss, time);
        }
    }
    lbl[0].onmousedown = function() {
        if (c == 0) {
            c = 4;
        }
        c = c - 1;
        lbqh();

    }
    lbl[0].onmouseover = function() {
        clearInterval(lbtimer);
    }
    lbl[0].onmouseout = function() {
        lbtimer = setInterval(lbss, time);
    }

    lbr[0].onmouseover = function() {
        clearInterval(lbtimer);
    }
    lbr[0].onmousedown = function() {
        if (c == 3) {
            c = -1;
        }
        c = c + 1;

       lbqh();
   }
    lbr[0].onmouseout = function() {
        lbtimer = setInterval(lbss, time);
    }
}