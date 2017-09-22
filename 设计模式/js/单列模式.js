let getSingle=function(fn=undefined){
	return function(){
		return fn || (fn.apply(this.arguments));
	}
}

let getSc=getSingle(function(){
	return "2";
});
let sc1=getSc();
let sc2=getSc();

console.log(sc1===sc2,sc1,sc2);
