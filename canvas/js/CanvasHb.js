function canhb(){
	this.hb = document.querySelector(".tools");
	this.hbs={"hb":[],"index":-1};
	this.draw=null;
	this.draws=[];
	
}
canhb.prototype={
	createHb:function(){
		let that = this;
		let li=document.createElement("li");
		let index=++this.hbs.index;
		li.innerHTML=`${prompt("请输入画布名称！[3-4个字符]",'画板-临时')}<span class="iconfont icon-guanbi " id=${index}></span>`;
		this.hbs.hb.push(li);
		li.children[0].onclick=function(){
			delete that.hbs.hb[this.id];
			that.hb.removeChild(this.parentNode);
			let bottom = document.querySelector(".bottom");
			bottom.removeChild(bottom.querySelector("#hb"+this.id))
			if(that.hb.children.length ==0){
				that.hbs.hb=[];
				that.hbs.index=-1;
			}
		}
		this.hbs.hb.index=index;
		this.hb.appendChild(this.hbs.hb[this.hbs.hb.index]);
		this.draws.push(this.draw);
	},
	setDraw(draw){
		this.draw=draw;
	},
	exqute:function(funcName){
		this[funcName]();
	},
	hbqh:function(id){
		return this.draws[id];
	}
}
