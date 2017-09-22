let duck={//鸭子对象
	duckSpeek:function(){
		console.log("嘎嘎嘎");
	}
};
let chicken={//鸡对象
	duckSpeek:function(){
		console.log("嘎嘎嘎");
	}
};

let choir=[];//合唱团

let joinChoir=function(animal){//检查进来的动物是否具有 嘎嘎嘎叫的方法
	if(animal && typeof animal.duckSpeek === 'function'){
		choir.push(animal);//压入一个动物
		console.log('恭喜加入合唱团');
		console.log(`合唱团的数量目前：${choir.length}只`);
	}
}
joinChoir(duck);
joinChoir(chicken);