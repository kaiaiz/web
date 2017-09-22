window.onload = function() {
    let text = document.querySelector("#ly-content");
    let sy = document.querySelector(".lz-sy span");
    text.onkeyup = function(e) {
        if (this.maxLength >= 200) {
            this.maxLength = 200;
        }
        sy.innerText = 200 - this.value.length;
        if (e.keyCode == 13 && e.shiftKey) {
            let time = new Date();
            let li = document.createElement("li");
            let p = document.createElement("p");
            let str = this.value;
            let imgNumber = str.match(/【em_[1-9]+】/g);
            if(imgNumber){
            	let strs=str;
	            for(let i=0;i<imgNumber.length;i++){
	            	let url=imgNumber[i].substring(imgNumber[i].lastIndexOf("\_")+1,imgNumber[i].length-1);
	            	str=str.replace(/【em_[1-9]{1,}】/, `<img src="img/face/${url}.gif" alt="">`);
	            }
	        }
	        p.innerHTML = str;
            li.append(p);
            li.innerHTML = li.innerHTML + `<span>留言3</span><time>${time.getFullYear()+'年'+(time.getMonth()+1)+'月'+time.getDate()+'日'+time.getHours()+'时'+time.getMinutes()+'分'+time.getSeconds()+'秒'}</time>`;
            let zx = document.querySelector(".ly-zs");
            zx.insertBefore(li, zx.querySelector("li"));
        }
    }
    emj();
}
function emj(){
	let emotion= document.querySelector(".emotion");
	let conntent = document.querySelector("#ly-content");
	let ul = emotion.querySelector("ul");
	let flag=true;
	let str="";
	for(let i=1;i<50;i++){
		str+=`<li style="background:url('img/face/${i}.gif') no-repeat center center;"></li>`;
	}
	ul.innerHTML=str;

	emotion.onmousedown=function(){
		if(flag){
			ul.style.display="flex";
			setTimeout(()=>{ul.style.opacity="1";},1);
			
			flag=false;
		}else{
			ul.style.opacity="0";
			setTimeout(()=>{ul.style.display="none";},500);
			
			flag=true;
		}
	}
	let lis = document.querySelectorAll(".emotion>ul>li");
	lis.forEach(function(ele){
		ele.onmousedown=function(){
			let url = getComputedStyle(ele).backgroundImage;
			url="【em_"+url.substring(url.lastIndexOf("\/")+1,url.length-6)+"】";
			conntent.value+=url;
		}
	});
}