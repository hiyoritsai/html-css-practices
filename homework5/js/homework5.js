var index=0;
var tabs=byId("tabgroup").getElementsByTagName("div");
var size=tabs.length;
var timer=null;

/* 封装的可兼容的getElementById方法 */
function byId(id){
	return typeof(id)==="string"?document.getElementById(id):id;
}
/* 封装的可兼容的事件绑定方法 */
function addHandler(element,type,handler){
	/* 非IE系 */
	if(element.addEventListener){
		element.addEventListener(type,handler,true);
	}
	/* IE8以上 */
	else if(element.attachEvent){
		element.attachEvent("on"+type,handler);
	}
	/* IE8以下 */
	else{
		element["on"+type]=handler;
	}
}
/* 给每个tabs[i]加上id名	 */
for(var i=0;i<size;i++){
	tabs[i].id=i;
	addHandler(tabs[i],"click",function(){
		
		/* this指向触发点击事件的元素，获取被点击的元素的id，同时改变index的值 */
		index=this.id;	
		
		/* 先取消所有tab标签的高亮样式 */
		for(var i=0;i<size;i++){
			tabs[i].style.backgroundColor="#fff";
			tabs[i].style.fontWeight="normal";
		}
		
		/* 再给被点击的标签添加高亮样式，并切换图片 */
		tabs[index].style.backgroundColor="#fc0";
		tabs[index].style.fontWeight="bold";
		changeImg();
	})
}

function changeImg(){
	/* 先获取img数组 */
	var pics=byId("picgroup").getElementsByTagName("div");
	
	/* 先隐藏所有图片 */
	for(var i=0;i<size;i++){
		pics[i].style.display="none";
	}
	
	/* 再将当前图片显示出来 */
	pics[index].style.display="block";
}

function startAutoPlay(){
	/* 每1000ms，即1s执行一次函数体中的方法 */
	timer=setInterval(function(){
		index++;
		if(index>=size) index=0;
		for(var i=0;i<size;i++){
			tabs[i].style.backgroundColor="#fff";
			tabs[i].style.fontWeight="normal";
		}
		tabs[index].style.backgroundColor="#fc0";
		tabs[index].style.fontWeight="bold";
		changeImg();
	},1000);
}

function stopAutoPlay(){
	if(timer){
		/* setInterval()返回的值是clearInterval的参数，这个方法用来清除周期函数 */
		clearInterval(timer);
	}
}

/* 运行脚本后就监听鼠标移入事件 */
addHandler(mainbody,"mouseover",stopAutoPlay);
/* 运行脚本后就监听鼠标移出事件 */
addHandler(mainbody,"mouseout",startAutoPlay);
/* 运行脚本后就自动执行周期函数 */
startAutoPlay();

