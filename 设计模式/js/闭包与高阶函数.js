let func = function(){
	let a=1;
	console.log(a);
}
//func();

let a=1;
let func1=function(){
	let b=2;
	let func2=function(){
		let c=3;
		console.log(b);
		console.log(a);
	}
	func2();
	console.log(c);
}
//func1();

let func3=function(){
	let a=1;
	return function(){
		a++;
		console.log(a);
	}
};
//console.log(func3);
var f=func3();
/*console.log(f);
f();
f();
f();
f();*/

//依次 乘积
let mult = function(){
	let a=1;
	for(let i=0,l=arguments.length;i<l;i++){
		a*=arguments[i];	
//		console.log(a);
	}
	
	return a;
}

//console.log(mult(5,4,2));


let mult2=(function(){
	
	let  cache={};
	return function(){
		let args = Array.prototype.join.call(arguments,",");
//		console.dir(arguments);
//		console.log(args);
		if(cache[args]){
			return cache[args];
		}
		let a=1;
		for(let i=0,l=arguments.length;i<l;i++){
			a*=arguments[i];	
			console.log(a);
		}
		return cache[args]=a;
	}
})();
console.log(mult2(1,2,3));
