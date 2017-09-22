class Game {
	constructor(left, scor, state, life, startbtn, phb) {
		this.left = left;
		this.scor = scor;
		this.st = null;
		this.state = state;
		this.statenum = 1;
		this.scornum = 0;
		this.life = life;
		this.lifenum = 5;
		this.num = 3;
		this.obj = {};
		this.speed = 5;
		this.height = window.innerHeight;
		this.gameflag = true;
		this.phb = phb;
		this.startbtn = startbtn;
		this.bestScor = localStorage.scor ? JSON.parse(localStorage.scor) : [];
		this.updatephb();
	}
	start() {
		for(let i = 0; i < this.num; i++) {
			this._createLetter();
		}
		this._move();
		this._keydown();
		this.gameflag=false;
	}
	_createLetter() {
		let newdiv = document.createElement("img");
		newdiv.className = "letter";
		do {
			let randomNum = Math.floor(Math.random() * 26) + 65;
			var randomLetter = String.fromCharCode(randomNum);
		} while (this.obj[randomLetter]);
		do {
			
			var randomLeft = Math.random() * (parseInt(innerWidth)-350);
		} while (this._checkLeft(randomLeft));
		
		this.obj[randomLetter] = 1;
		let randomTop = Math.random() * 50;
		this.obj[randomLetter] = {
			left: randomLeft,
			ele: newdiv
		};
		newdiv.style.left = randomLeft + "px";
		newdiv.style.top = randomTop + "px";
		newdiv.src=`img/${randomLetter}.png`;
		this.left.appendChild(newdiv);
	}
	_checkLeft(left) {
		for(let i in this.obj) {
			if(left > this.obj[i].left - 80 && left < this.obj[i].left + 80) {
				return true;
			}
		}
	}
	_move() {
		this.st = setInterval(function() {
			for(let i in this.obj) {
				let top = this.obj[i].ele.offsetTop;
				top += this.speed;
				this.obj[i].ele.style.top = top + "px";
				if(top > this.height) {
					this.lifenum--;
					this.life.innerHTML = this.lifenum;
					this.left.removeChild(this.obj[i].ele);
					delete this.obj[i];
					this._createLetter();
					if(this.lifenum === 0) {
						this._gameover();
					}
				}
			}
		}.bind(this), 60);
	}
	_keydown() {
		this.keydownHandle = function(e) {
			let kc = e.keyCode;
			let letter = String.fromCharCode(kc);
			if(this.obj[letter]) {
				this.left.removeChild(this.obj[letter].ele);
				delete this.obj[letter];
				this._createLetter();
				this.scornum++;
				this.scor.innerHTML = this.scornum;
				if(this.scornum % 10 == 0) {
					this._upstate();
				}
			}
		}.bind(this);
		document.addEventListener("keydown", this.keydownHandle);
	}
	_upstate() {
		this.statenum++;
		this.state.innerHTML = this.statenum;
		if(this.statenum < 4) {
			this._createLetter();
		} else {
			this.speed++;
		}

	}
	_gameover() {
		alert(`游戏结束当前得分为${this.scornum}`);
		if(this.bestScor.length < 3 || this.scornum > this.bestScor[2].scor) {
			let name;
			do {
				name = prompt('请输入姓名');
			} while (name === "");
			this.bestScor.push({
				name,
				scor: this.scornum
			});
			this.bestScor.sort(function(a, b) {
				if(a.scor > b.scor) {
					return -1;
				} else {
					return 1;
				}
			});
			if(this.bestScor.length > 3) {
				this.bestScor.pop();
			}
			localStorage.scor = JSON.stringify(this.bestScor);
			this.updatephb();

		}
		this.bestScor.push();
		this.left.innerHTML = "";
		this.obj = {};
		this.scornum = 0;
		this.scor.innerHTML = "0";
		this.statenum = 0;
		this.state.innerHTML = "1";
		this.lifenum = 5;
		this.life.innerHTML = "5";
		this.gameflag = true;
		this.startbtn.style.color = "#000";
		clearInterval(this.st);
		this.gameflag=true;
	}
	updatephb() {
		this.bestScor.forEach(function(v, i) {
			this.phb[i].innerHTML = v.name + "-" + v.scor;
		}.bind(this))
	}
	pause() {
		clearInterval(this.st);
		document.removeEventListener("keydown", this.keydownHandle);
	}
	run() {
		this._move();
		this._keydown();
	}
}
window.onload=function(){
	let left = document.querySelector(".left");
	let scor = document.querySelector("#score");
	let state = document.querySelector("#state");
	let life = document.querySelector("#life");
	let pauseBtn = document.querySelector("#pause");
	let phb = document.querySelectorAll(".phb span");
	let startbtn = document.querySelector("#start");
	let game = new Game(left, scor, state, life, startbtn, phb);
	let flag = true;
	startbtn.onclick = function() {
		if(game.gameflag) {
			flag = false;
			game.start();
			this.style.color = "#ccc";
		}
	}
	let flag1 = true;
	pauseBtn.onclick = function() {
		if(!flag){
			if(flag1) {
				game.pause();
				this.innerHTML = "继续";
			} else {
				game.run();
				this.innerHTML = "暂停";
			}
			flag1 = !flag1;
		}
	}	
}
