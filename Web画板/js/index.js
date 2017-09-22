window.onload = function() {
	
	//创建画板对象
	let cv = new Canvas();
	let color = document.getElementById("color");
	//设置颜色 画板的fillStyle--- strokeStyle
	color.onchange = function() {
		cv.setColor(this.value);
	}
	//设置粗细 画板的 lineWidth
	let range = document.getElementById("range");
	range.onchange = function() {
		cv.setLineWidth(this.value);
	}
	//橡皮檫  画板清除
	let eraser = document.getElementById("eraser");
	eraser.onclick = function() {
		cv.setClickType(5);
		cv.can.style.cursor="url(img/erase.ico) 4 12, auto";
	}
	//画板 涂画功能
	let clickType = document.getElementById("clickType");
	let toolsType = document.getElementsByClassName("tools-Type");
	let Tbian =document.getElementById("T-bian");
	let Tjiao =document.getElementById("T-jiao");
	toolsType[0].style.top=0;
	Tbian.oninput=function(){
		cv.setTbian(this.value);
	}
	Tjiao.oninput=function(){
		cv.setTjiao(this.value);
	}
	clickType.onmouseup=function(){
		cv.can.style.cursor='crosshair';
		let index = clickType.selectedIndex;
		let value = clickType.options[index].value;
		cv.setClickType(parseInt(value<0?0:value));
		for(let i=0;i<toolsType.length;i++){
			toolsType[i].style.top="-100%";
		}
		toolsType[index].style.top=0;
	}
}

class Canvas {
	constructor() {
		this.can = null;
		this.canvas = null;
		this.color = "black";
		this.history={data:[],name:[],index:-1,ID:null};
		this.lineWidth = 5;
		this.clickType=0;
		this.startPoint={"X":0,"Y":0};
		this.endPoint={"X":0,"Y":0};
		this.r=10;
		this.Tbian=5;
		this.Tjiao=5;
		this._init_();//初始化画板
		this._init_Style();//初始化画板样式
	}
	_init_() {
		this.history.ID = document.querySelector("#history>ul");
		this.can = document.getElementById("canvas");
		this.can.style.cursor='crosshair';
		this.canvas = this.can.getContext("2d");
		this.setBackGroundBefore();
		
		this.mousedown(); //组册事件
		//初始化 历史记录
		this.putHistory(0,"画布场景")
	}
	//画线起始 -- 鼠标点击的起始位置
	_init_Style(){
		this.canvas.strokeStyle = this.color;
		this.canvas.lineWidth = this.lineWidth;
		this.canvas.fillStyle = this.color;
		
	}
	setClickType(clickType){
		this.clickType=clickType;
	}
	setColor(color) {
		this.color = color;
	}
	setTbian(Tbian){
		this.Tbian=Tbian;
	}
	setTjiao(Tjiao){
		this.Tjiao=Tjiao;
	}
	setLineWidth(num) {
		this.lineWidth = num;
	}
	setBackGroundBefore(){
		this.canvas.fillStyle = "gainsboro";
		this.canvas.fillRect(0,0,this.can.width,this.can.height);
		this.canvas.fill();
	}
	hx(x, y) {
		this._init_Style();
		this.canvas.beginPath();
		this.canvas.lineCap="round";
		this.canvas.moveTo(x, y);
	}
	//橡皮檫
	eraser(x,y){
		this.canvas.strokeStyle="gainsboro";
		this.canvas.beginPath();
		this.canvas.lineWidth= this.lineWidth;
		this.canvas.lineCap="round";
		this.canvas.moveTo(x, y);
	}
	//画直线
	line(){
		this._init_Style();
		this.canvas.clearRect(0,0,this.canvas.offsetWidth,this.canvas.offsetHeight); 
		this.hx(this.startPoint.X,this.startPoint.Y)
		this.moveHx(this.endPoint.X,this.endPoint.Y);
	}
	//历史记录
	putHistory(flag,name){
		switch(flag){
			//0:读取每画一笔后的画板数据
			case 0:
				this.history.index++;
				this.history.data[this.history.index]=this.canvas.getImageData(0,0,this.can.width,this.can.height);
				let li = document.createElement("li");
				let time = new Date();
				li.innerHTML=`${name}<i style="font-size:14px;color:blue;">${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}</i>`;
				this.history.name[this.history.index]=li;
				this.history.ID.appendChild(this.history.name[this.history.index]);
				break;
			//1:ctrl+z 撤回
			case 1:
				if(this.history.index>0){
					if(this.history.index==this.history.data.length){
						this.history.index++;
					}
					let lis = this.history.ID.querySelectorAll("li");
					this.history.ID.removeChild(this.history.name[this.history.index]);
					this.history.index--;
					this.putHistory();
				}
				break;
			//2:ctrl+y 撤销撤回
			case 2:
				if(this.history.index<this.history.data.length){
					this.history.index++;
					if(this.history.data.length==this.history.index){
						this.history.index-=1;
					}
					this.putHistory();
					this.history.ID.appendChild(this.history.name[this.history.index]);
				}
			default :
				this.canvas.putImageData(this.history.data[this.history.index],0,0);
				break;
		}
	}
	//得到2点之间的一半距离
	getR(){
		this.r=Math.sqrt(Math.pow(this.endPoint.X-this.startPoint.X,2)+Math.pow(this.endPoint.Y-this.startPoint.Y,2));	
	}
	//画五角星
	drawStar() {
		this._init_Style();
		this.getR();
		this.canvas.beginPath();
		this.canvas.moveTo(this.startPoint.X+this.r,this.startPoint.Y);
		let ang = 360/(this.Tjiao *2)/180 *Math.PI;
		for(var i = 0; i < this.Tjiao*2 ; i++) {
			if(i%2){
				this.canvas.lineTo(Math.cos(i*ang) * this.r/2 + this.startPoint.X, Math.sin(i*ang) *this.r/2 + this.startPoint.Y);
			}else{
				this.canvas.lineTo(Math.cos(i*ang) * this.r + this.startPoint.X, Math.sin(i*ang) *this.r + this.startPoint.Y);
			}
		}
		this.canvas.closePath();
		this.canvas.stroke();
	}
	//画多边形
	drawVertices(){
		this.getR();
//		this._init_Style();
		this.hx(this.startPoint.X+this.r,this.startPoint.Y);
		for(let i=1;i<this.Tbian;i++){
			let ang = 360/this.Tbian/180*Math.PI;  			this.canvas.lineTo(this.startPoint.X+this.r*Math.cos(ang*i),this.startPoint.Y+this.r*Math.sin(ang*i));
		}
		this.canvas.closePath();
		this.canvas.stroke();
	}
	//画圆
	circle(){
		this._init_Style();
		this.getR();
		this.canvas.beginPath();
		this.canvas.arc(this.startPoint.X,this.startPoint.Y,this.r,0,Math.PI*2,false);
		this.canvas.closePath();
		this.canvas.stroke();
		
	}
	//画线 移动的 -- 鼠标移动的位置
	moveHx(x, y) {
		this.canvas.lineTo(x, y);
		this.canvas.stroke();
	}
	mousedown() {
		let that = this;
		let sa=true;
		let historyName="";
		that.can.onmousedown = function(e) {
			let event = window.event || e;
			that.startPoint.X = event.offsetX;
			that.startPoint.Y = event.offsetY;
			if(that.history.data.length>0){
				that.putHistory();
			}
			switch (that.clickType){
					case 0:
						historyName="画直线";
						break;
					case 1:
						historyName="铅笔";
						that.hx(that.startPoint.X, that.startPoint.Y);
						break;
					case 2:
						historyName="多边形";
						break;
					case 3:
						historyName="五角星";
						break;
					case 4:
						historyName="画圆";
						break;
					case 5:
						historyName="橡皮檫";
						
						that.eraser(that.startPoint.X, that.startPoint.Y);
						break;
					default:
						break;
				}
			that.can.onmousemove = function() {
				let event = window.event || e;
				that.endPoint.X = event.offsetX;
				that.endPoint.Y = event.offsetY;
				if(that.history.data.length>0){
					that.putHistory();
				}
				switch (that.clickType){
					case 0:
						that.line();
						break;
					case 1:
						that.moveHx(that.endPoint.X, that.endPoint.Y);
						break;
					case 2:
						that.drawVertices();
						break;
					case 3:
						that.drawStar();
						break;
					case 4:
						that.circle();
						break;
					case 5:
						that.moveHx(that.endPoint.X, that.endPoint.Y);
						break;
					default:
						break;
				}
			}
		}
		that.can.onmouseup = function(e) {
			that.putHistory(0,historyName);
			that.can.onmousemove = null;
		}
		document.onkeydown=function(e){
			if(e.ctrlKey && e.keyCode == 90){
				that.putHistory(1);
			}
			if(e.ctrlKey && e.keyCode == 89){
				that.putHistory(2);
			}
			if(e.ctrlKey){
				that.startPoint.X=that.endPoint.X-that.r/2;
				that.startPoint.Y=that.endPoint.Y-that.r/2;
			}
		}
	}
	
}