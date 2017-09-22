window.onload = function() {
	let phones = [{
			"name": "刘智攀",
			"phone": "13720927312",
			"pinying": "liuzhipan",
			"photo": "&#xe636;"
		},
		{
			"name": "李四",
			"phone": "1008611",
			"pinying": "lisi",
			"photo": "&#xe635;"
		},
		{
			"name": "张二",
			"phone": "10010",
			"pinying": "zhangsan",
			"photo": "&#xe636;"
		},
		{
			"name": "李五",
			"phone": "13720928856",
			"pinying": "liwu",
			"photo": "&#xe636;"
		},
		{
			"name": "王广",
			"phone": "13720428856",
			"pinying": "wangguang",
			"photo": "&#xe635;"
		},
		{
			"name": "王林",
			"phone": "13725928856",
			"pinying": "wanglin",
			"photo": "&#xe635;"
		},
		{
			"name": "王麻",
			"phone": "13720928146",
			"pinying": "wangma",
			"photo": "&#xe635;"
		},
		{
			"name": "任一林",
			"phone": "1008611",
			"pinying": "renyiling",
			"photo": "&#xe636;"
		},
		{
			"name": "孔樊杰",
			"phone": "1008611",
			"pinying": "konfanjie",
			"photo": "&#xe635;"
		},
		{
			"name": "狗蛋",
			"phone": "18320967856",
			"pinying": "goudan",
			"photo": "&#xe636;"
		},
		{
			"name": "二楞",
			"phone": "1008611",
			"pinying": "erleng",
			"photo": "&#xe635;"
		},
		{
			"name": "二蛋",
			"phone": "1008611",
			"pinying": "erdan",
			"photo": "&#xe636;"
		},
		{
			"name": "胡依依",
			"phone": "1008611",
			"pinying": "huyiyi",
			"photo": "&#xe635;"
		},
	];
	localStorage.setItem("phone", JSON.stringify(phones));
	phones = JSON.parse(localStorage.getItem("phone"));

	render(phones);
	//渲染 显示通讯录界面方法
	function render(data) {
		let flObj = [];
		data.forEach(function(ele) {
			let first = ele.pinying.charAt().toUpperCase();
			if(!flObj[first]) {
				flObj[first] = [];
			}
			flObj[first].push(ele);
		});

		let view = document.querySelector("#view>dl");
		let flObjKeySort = Object.keys(flObj).sort();
		let nameXl = document.querySelector("#name-xl>ul");

		flObjKeySort.forEach(function(ele) {
			let dt = document.createElement("dt");
			let dd = document.createElement("dd");
			dt.style.display = "none";
			dt.innerText = ele;
			nameXl.innerHTML += `<li>${ele}</li>`;
			view.appendChild(dt);
			view.appendChild(dd);
			flObj[ele].forEach(function(ele, index) {
				let ul = document.createElement("ul");
				let li = document.createElement("li");
				ul.innerHTML = `<li class="iconfont photo"><span>${ele.photo}</span>${ele.name}</li>
				<li style="display:none;">${ele.phone}</li>`;
				dd.appendChild(ul);
			});
		});
	}
	//拨号界面方法
	let mView = document.querySelector("#m-view");
	let flag = true;
	view.onclick = function(e) {
		let ele = e.target;
		if(ele.nodeName == "UL" && flag) {
			//			<img src="img/md-1.png" alt="" />
			mView.innerHTML = `<p class="iconfont photo m-photo">${ele.childNodes[0].childNodes[0].innerText}</p>
			<div class="phone">${ele.children[1].innerText}</div>
			<div class="call">
				<a href="tel:${ele.children[1].innerText}">呼叫</a>
			</div>
			<div class="send"><a href="sms:${ele.children[1].innerText}">短信</a></div>
			<div class="bz">备注:下周三陪同伙伴去一次沙漠旅行
			<br>${ele.childNodes[0].childNodes[1].nodeValue}今日来电1次</div>`;
			mView.style.display = "block";
			flag = false;
		} else {
			mView.style.display = "none";
			flag = true;
		}
		mView.onclick = function(e) {
			if(!flag) {
				this.style.display = "none";
				flag = true;
			}
		}
	}
	//搜索方法
	let search = document.querySelector("header input");
	search.oninput = function() {
		console.log(111)
		let view = document.querySelector("#view>dl");
		let nameXl = document.querySelector("#name-xl>ul");

		let name = this.value.trim();
		let arr = phones.filter(function(ele) {
			return ele.name.includes(name);
		});

		view.innerHTML = "";
		nameXl.innerHTML = "";
		render(arr);
		if(!this.value) {
			view.innerHTML = "";
			nameXl.innerHTML = "";
			render(phones);
			this.blur();//失去焦点
		}
	}
	//滚动屏幕的时候，右侧更随 显示
	let dt= document.querySelectorAll("#view>dl>dt");
	let nameXlLi = document.querySelector("#name-xl>ul");
	let header = document.querySelector("header");
	let dts=[];
	dt.forEach((ele)=>{
		dts.push(ele.nextSibling.offsetTop);
	});
	window.onscroll=function(){
		let st =document.body.scrollTop;
		let s = nameXlLi.querySelectorAll("li");
		dts.forEach((ele,index)=>{
			if(ele-header.offsetHeight-1<=st){
				s.forEach(ele=>{ele.style.cssText="background-color:transparent;color:#bcbcbc;"});
				s[index].style.cssText="background-color:#28c0c6;color:#fff;";
			}
		});
	}
	//点击右侧的字母时，通讯录 更随置顶
	nameXlLi.onclick=function(e){
		let ele=e.target;
		for(let i=0;i<this.children.length;i++){
			if(ele==this.children[i]){
				window.scrollTo(0,dts[i]-header.offsetHeight);
			}
		}
	}
	
}