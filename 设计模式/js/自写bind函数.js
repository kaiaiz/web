Function.prototype.bind = function() {
	var self = this, // 保存原函数        
		context = [].shift.call(arguments), // 需要绑定的 this 上下文         
		args = [].slice.call(arguments); // 剩余的参数转成数组     
	return function() { // 返回一个新的函数         
		return self.apply(context, [].concat.call(args,[].slice.call(arguments))); 		//执行新的函数的时候，会把之前传入的 context 当作新函数体内的 this的参数，作为新函数的参数
	}
};

var obj = {
	name: 'sven'
};

var func = function(a, b, c, d) {
		alert(this.name); // 输出：sven     
		alert ( [ a, b, c, d ] )    // 输出：		[ 1, 2, 3, 4 ] 
}.bind( obj, 1, 2 );
func(3, 4);

//-------------------------------------------------
//
//Function.prototype.bind1=function(callBack){
//	let self=this;
//	return function(){
//		callBack();
//		return self();
//	}
//}
//
//let func1=function(){
//	console.log(2222222222);
//	return "123";
//}.bind1(function(){console.log(11111111);})
//console.log(func1());
