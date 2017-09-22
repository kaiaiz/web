//写cookies 
function setCookie(name,value,fn){ 
    let exp = new Date();
    fn?fn(exp):exp.setTime(exp.getTime() + 7*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
}

//读取cookies 
function getCookie(name){ 
	/**
	 * cookies:
	 * 原文： name=asaaa; age=18
	 * 正则： (^| )name=([^|;])(;|$) 
	 *      以空开头，或者任何字符开头+名字+等号+任何字符或者分号开头的 + 以分号结尾和 任何字符结尾的 
	 */
    let arr,reg=new RegExp("(^| )"+name+"=([^|;]*)(;|$)");
    if(arr=document.cookie.match(reg)){
    	console.log(arr)
        return unescape(arr[2]); 
    }
    else 
        return null; 
}
//删除cookies 
function delCookie(name){ 
    let exp = new Date(); 
    exp.setTime(exp.getTime() - 1); 
    let cval=getCookie(name); 
    if(cval!=null) 
        document.cookie= name + "="+cval+";expires="+exp.toGMTString(); 
}

setCookie("name","asaaa",function(exp){
	//exp 是 时间对象。 cookies的生命周期。
	let days=20;
    exp.setTime(exp.getTime() + days*24*60*60*1000);
});
setCookie("phone","137-2899-7362;2345-6789;1231-2343");//默认存储7天
setCookie("age","18");//默认存储7天
console.log(getCookie("phone"))//读取cookie
/*delCookie("phone");//删除cookie*/
console.log(getCookie("age"))//读取cookie