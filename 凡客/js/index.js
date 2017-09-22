window.onload = function() {
   lb();
   baktop();
   cdxh();
   search();
}
function search(){
    let sosk = document.querySelector("#sosk");
    sosk.onclick=()=>sosk.value="";
}
function cdxh(){
    let ycHz = document.querySelectorAll(".yjcd>li");
    for(let i=0;i<ycHz.length;i++){
        ycHz[i].onmouseenter=function(){
            let hzHeight=0;
            let ycDiv=ycHz[i].querySelectorAll("div");
            for(let j=0;j<ycDiv.length;j++){
                let ycNew = ycDiv[j].children;
                for(let k=0;k<ycNew.length;k++){
                    let hz= ycNew[k].children;
                    hzHeight= hz.length*35;
                }
                ycDiv[j].style.height=hzHeight+20+"px";
            }
        }
        ycHz[i].onmouseleave=function(){
            let ycDiv=ycHz[i].querySelectorAll("div");
            for(let j=0;j<ycDiv.length;j++){
                ycDiv[j].style.height=0;
            }
        }
    }
}
function lb(){
    let newlb = document.getElementsByClassName("lb-img");
    let img = newlb[0].getElementsByTagName("li");
    let imgWidth = img[0].offsetWidth;
    let newyd = document.getElementsByClassName("lb-yd");
    let yd = newyd[0].getElementsByTagName("li");
    let btnLeft = document.getElementsByClassName("lb-l")[0];
    let btnRight = document.getElementsByClassName("lb-r")[0];
    let n = 0;
    let t = setInterval(lbss, 2000);
    function lbss() {
        n++;
        if (n == img.length) {
            n = 0;
        }
        lbqh();
    }
    function lbqh(){
        for(let i=0;i<img.length;i++){
            animate(img[i],{ opacity:0});
            yd[i].style.background = '#a10000';
        }
        animate(img[n],{ opacity:1});
        yd[n].style.background = '#ddd';
    }
    for(let i=0;i<img.length;i++){
        
        yd[i].onmouseover=function(){
            clearInterval(t);
                n=i;
                if (n == img.length) {
                    n = 0;
                }
                lbqh(); 
        }
         yd[i].onmouseout=function(){
            t = setInterval(lbss, 2000);
         }
    }
     //右侧按钮点击事件
    btnRight.onclick=function(){
        lbss();
    }
    //左侧侧按钮点击事件
    btnLeft.onclick=function(){
        n-=1;
        n = (n==-1)?img.length-1:n;
        lbqh();
    }
    //右侧按钮移出事件
    btnRight.onmouseout=function(){
       t=setInterval(lbss, 3000);
    }
    //左侧侧按钮移出事件
    btnLeft.onmouseout=function(){
       t=setInterval(lbss, 3000);
    }
    //右侧按钮移出事件
    btnRight.onmouseover=function(){
       clearInterval(t);
    }
    //左侧侧按钮移出事件
    btnLeft.onmouseover=function(){
        clearInterval(t);
    }
}
function baktop(){
    var gdtimer = null;
    var rightnew3 = document.getElementsByClassName("right-new3");
    rightnew3[0].onclick = function() {
        cancelAnimationFrame(gdtimer);
        gdtimer = requestAnimationFrame(function fn() {
            var oTop = document.body.scrollTop || document.documentElement.scrollTop;
            if (oTop > 0) {
                scrollTo(0, oTop - 50);
                gdtimer = requestAnimationFrame(fn);
            } else {
                cancelAnimationFrame(gdtimer);
            }
        });
    }
}