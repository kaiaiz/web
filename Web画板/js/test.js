var djs = function(num,fn){
		let t;
		let EndTime= new Date();
	    EndTime.setTime(EndTime.getTime()+1000*60*num);
		function GetRTime(){
		    let NowTime = new Date();
		    let flag=true;
		    let d=0;
		    let h=0;
		    let m=0;
		    let s=0;
		    let ms=0;
		    let chars=EndTime.getTime() - NowTime.getTime();
		    if(chars>=0){
				d=Math.floor(chars/1000/60/60/24);
				h=Math.floor(chars/1000/60/60%24);
				m=Math.floor(chars/1000/60%60);
				s=Math.floor(chars/1000%60);
				ms=Math.floor(chars%1000);
				fn(d,h,m,s,ms,chars); 
			}else{
				fn(d,h,m,s,ms,chars); 
				clearInterval(t);
			}
  		}
  		t=setInterval(GetRTime,4);
	}

var start = async function () {
    let timers = document.querySelectorAll("#timer>li");
	await djs(0.025,function(d,h,m,s,ms,chars){
		console.log(`${s}秒${ms}毫秒---${chars}`);
		if(chars==0){
			console.log("完毕");
		}
	});
};
//start();
var s=function(n1,n2){
	console.log(n1/n2);
}
var zq = async function(){
	await s(2,0);
}
s(2,0);
zq();
