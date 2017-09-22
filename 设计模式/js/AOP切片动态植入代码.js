Function.prototype.before=function(before){
	let _self=this;
	return function(){
		before.apply(this.arguments);
		return _self.apply(this,arguments);
	}
}
Function.prototype.after=function(after){
	let _self=this;
	return function(){
		let ret = _self.apply(this,arguments);
		after.apply(this.arguments);
		return ret;
	}
}

let func = function(){
	console.log(2);
}.before(()=>console.log(1)).after(()=>console.log(3));
func()
