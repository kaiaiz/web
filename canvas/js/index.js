//新建画布功能
let bottoms=document.querySelector(".bottom");
let canvasHB = new canhb();
let mask = document.querySelector('.mask');
let createHb = document.querySelector("#createHb");
let draw=null;
createHb.onclick=createbhl;
function createbhl(){
	let ca = document.createElement("canvas");
	let eraser = bottoms.querySelector(".eraser");
	let s=bottoms.children.length-4;
	ca.id='hb'+s;
	ca.width = innerWidth - 401;
	ca.height=593;
	bottoms.insertBefore(ca,eraser);
	canvasHB.setDraw(new Draw(ca, mask));
	canvasHB.exqute("createHb");
	draw = canvasHB.hbqh(s);
}
//画布-选项卡-切换
let hbtools = document.querySelector(".tools");
hbtools.onclick=function(e){
	let bmcan=document.querySelectorAll("canvas");
	let ele = e.target;
	
	if(ele.nodeName=="LI"){
		for(let i=0;i<bmcan.length;i++){
			if(ele.children[0].id==i){
				bmcan[i].style.display="block";
				console.log(ele.children[0].id,i);
				draw = canvasHB.hbqh(i);
				console.log(ele.children[0].id,i,draw);
			}else{
				bmcan[i].style.display="none";
			}
		}
	}
}
//窗口大小改变功能
window.onresize = function() {
	let bmcan=document.querySelectorAll("canvas");
	for(let i=0;i<bmcan.length;i++){
		bmcan[i].width = innerWidth - 400;
		bmcan[i].height = innerHeight - 100;
		draw.widths = bmcan[i].width;
		draw.heights = bmcan[i].height;
		draw.history(2);
	}
}
//工具-选项卡
let labels = document.querySelectorAll('label');
labels.forEach((element, index) => {
	element.addEventListener('click', function() {
		let labelA = document.querySelector('label[active=true]');
		labelA.setAttribute('active', false);
		element.setAttribute('active', true);
	})

})

//调用方法
let inputs = document.querySelectorAll('input');
let styleS = document.querySelectorAll('.style');
//对颜色进行设置
inputs.forEach((element, index) => {
	element.onchange = function() {
		if(index == 0) {
			draw.strokeColor = element.value
		}
		if(index == 1) {
			draw.fillColor = element.value;
		}
	}
})
//对描边和填充进行设置
styleS.forEach((element, index) => {
	element.onclick = function() {
		if(index == 0) {
			draw.styles = 'stroke'
		}
		if(index == 1) {
			draw.styles = 'fill';
		}
	}
})
//ctrl+z事件
document.onkeydown = function(e) {
	if(e.ctrlKey && e.keyCode==90) {
		draw.history(0);
	}
	if(e.ctrlKey && e.keyCode==89) {
		draw.history(1);
	}
}
//type 工具事件
let types = document.querySelectorAll('.type');
types.forEach((element, index) => {
	element.onclick = function() {
		if(element.id == 'dash') {
			draw.setDash(true);
		}
		if(element.id == 'line') {
			draw.setDash(false);
		}
		if(element.id == 'qianbi') {
			draw.qianbi();
		} else if(element.id == 'djx') {
			draw.num = prompt('请选择你要输入的边数', 5);

			draw.drawD(element.id);
		} else if(element.id == 'dbx') {
			draw.num = prompt('请选择你要输入的边数', 6);
			draw.drawD(element.id);
		} else {
			draw.drawD(element.id);
		}
	}
})
//typec 工具事件
let typec = document.querySelectorAll('.typec');
typec.forEach((element, index) => {
	element.onclick = function() {
		draw.click(element.id);
	}
})
