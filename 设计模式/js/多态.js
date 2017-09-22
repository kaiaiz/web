//封装多态方法
let makeSound=function(animal){
	animal.sound();
}
class Duck{
	sound(){
		console.log("嘎嘎嘎");
	}
};
class Chicken{
	sound(){
		console.log("咕咕咕");
	}
};
makeSound(new Duck());
makeSound(new Chicken());
class Dog{
	sound(){
		console.log("汪汪汪");
	}
};
makeSound(new Dog());

//私有属性
let Myclass= (function(){
	let key = Symbol('key');
	function Myclass(privateData){
		this[key]=privateData;
	}
	Myclass.prototype={
		doStuff:function(){
			return this[key];
		}
	}
	return Myclass;//返回暴露的接口
})();
console.log(Myclass)

let c = new Myclass("hello");
console.dir(c.doStuff());