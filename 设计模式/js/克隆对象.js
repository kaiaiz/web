/**
 * 原型模式的实现关键，是语言本身是否提供了clone方法。ECMAScript 5提供
 * 了Object.create 方法，可以用来克隆对象。代码如下：
 * */

//class Plane{
//	constructor(){
//		this.blood=100;
//		this.attackLevel=1;
//		this.defenseLevel =1;
//	}
//}

let Plane=function(){
	this.blood=100;
		this.attackLevel=1;
		this.defenseLevel =1;
}
let plane = new Plane();
plane.blood=500;
plane.attackLevel=10;
plane.defenseLevel =7;

let PlaneClon= Object.create(plane);

console.log(PlaneClon);
