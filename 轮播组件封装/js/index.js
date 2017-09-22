(function(global) {
	let setting={
		btnCenter:"center",
		btnLrHeight:"-75%",
        animate:"flowLeft",
		lbhtml:`<ul class="lb-data-imgs">
			
		</ul>
		<ul class="lb-botton-center">
			<li></li>
			<li></li>
			<li></li>
		</ul>
		<ul class="lb-botton-lr">
			<li>&lt;</li>
			<li>&gt;</li>
		</ul>`,

	}
function createLB(obj) {
    	Object.assign(setting,obj);//合并 对象
    	let box = document.querySelector(setting.id);
    	box.innerHTML=setting.lbhtml;
    	let imgs= box.querySelector(".lb-data-imgs");
    	let btnCenter= box.querySelector(".lb-botton-center");
    	let btnCenters = box.querySelectorAll(".lb-botton-center li");
    	let btnLr= box.querySelector(".lb-botton-lr");
    	let btnLrs= box.querySelectorAll(".lb-botton-lr li");
    	let tempImg="";
    	let t;
    	let c=0;
    	for(let i=0;i<setting.data.length;i++){
    		tempImg+= `<li><a href="javascript:void(0);"><img src="${setting.data[i]}" alt=""></a></li>`;
    	}
    	imgs.innerHTML=tempImg;
    	let img = imgs.querySelectorAll("li");
    	switch(setting.btnCenter){
    		case "left":
    			btnCenter.style.justifyContent="flex-start";
    			break;
    		case "center":
    			btnCenter.style.justifyContent="center";
    			break;
    		case "right":
    			btnCenter.style.justifyContent="flex-end";
    			break;
    		default:
    			btnCenter.style.justifyContent="center";
    			break;
    	}
    	
    	btnLr.style.transform=`translateY(${setting.btnLrHeight})`;
    	btnCenters.forEach(function(ele){
    		ele.addEventListener("mouseenter",RmoveEnter,false)
    		ele.addEventListener("mouseleave",RmoveLeave,false)
    	});
    	btnLrs.forEach(function(ele,index){
    		if(index==0){
    			ele.addEventListener("mousedown",LmoveEnter,false)
    			ele.addEventListener("mouseup",LmoveLeave,false)
    		}else{
    			ele.addEventListener("mousedown",RmoveEnter,false)
    			ele.addEventListener("mouseup",RmoveLeave,false)
    		}	
    	});
    	function LmoveEnter(){
    		clearInterval(t);
    		if(c==-1){c=img.length-1;}
    		lbQh();
    		c--;
    		//this.style.background="red";
    	}
    	function LmoveLeave(){
    		t=setInterval(interval,2000);
    		//this.style.background="white";
    	}
    	function RmoveEnter(){
    		clearInterval(t);
    		interval();
    		//this.style.background="red";
    	}
    	function RmoveLeave(){
    		t=setInterval(interval,2000);
    		//this.style.background="white";
    	}
    	t=setInterval(interval,2000);
    	function interval(){
    		if(c==img.length){c=0;}
    		lbQh();
    		c++;
    	}
    	function lbQh(){
            if(setting.animate == "opcity"){
                img.forEach(function(ele,index){
                    if(c==index){
                        ele.style.display="block";
                    }else{
                        ele.style.display="none";

                    }
                });
                btnCenters.forEach(function(ele,index){
                    if(c==index){
                        ele.style.background="red";
                        ele.style.transform="scale(0.5, 0.5)";
                    }else{
                        ele.style.background="white";
                        ele.style.transform="scale(1, 1)";

                    }
                });
            }else if(setting.animate == "flowLeft"){  
        		img.forEach(function(ele,index){
                    if(c==index-1){
                        ele.style.top="650px";
                    }
                    if(c==index){
                        ele.style.top="0";
                    }
                    if(c==index+1){
                        ele.style.top="-650px";
                    }
                });
            }
    	}

    }
    global.LB = createLB;
})(window);