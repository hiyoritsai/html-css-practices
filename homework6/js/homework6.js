/* 封装获取单个元素的函数 */
var getElem=function(selector){
	return document.querySelector(selector);
}

/* 封装获取所有元素的函数 */
var getAllElem=function(selector){
	return document.querySelectorAll(selector);
}

/* 封装获取元素样式的函数 */
var getCls=function(element){
	return element.getAttribute('class');
}

/* 封装设置元素样式的函数 */
var setCls=function(element,cls){
	return element.setAttribute('class',cls);
}

/* 为元素添加样式 */
var addCls=function(element,cls){
	var baseCls=getCls(element);
	if(baseCls.indexOf(cls)===-1){	//如果要添加的样式本不存在才添加新样式
		setCls(element,baseCls+' '+cls);
	}
}

/* 为元素删除样式 */
var delCls=function(element,cls){	//如果要删除的样式存在，才进行删除
	var baseCls=getCls(element);
	if(baseCls.indexOf(cls)!=-1){
		setCls(element,baseCls.split(cls).join(' ').replace(/\s+/g,' '));	/* 把一个或多个空白符替换为一个空白符，如果不加g只会替换第一个空白符 */
	}
}

/* 第一步：初始化样式 init */
/* 把所有用到动画样式的元素都添加到屏幕数组中 */
var screenAnimateElements={
	'.header':['.header__wrap'],
	'.screen-1':['.screen-1__tit','.screen-1__des'],
	'.screen-2':['.screen-2__tit','.screen-2__des','.screen-2__break','.screen-2__bg-3'],
	'.screen-3':['.screen-3__pic','.screen-3__tit','.screen-3__des','.screen-3__break','.screen-3__course','.screen-3__wrap'],
	'.screen-4':['.screen-4__tit','.screen-4__wrap','.screen-4__item-1','.screen-4__item-2','.screen-4__item-3','.screen-4__item-4',
				'.screen-4__des','.screen-4__break'],
	'.screen-5':['.screen-5__pic','.screen-5__tit','.screen-5__des','.screen-5__break'],
	'.outline':['.outline__item']
};

/* 设置屏内元素为初始状态 */
var setScreenAnimateInit=function(screenCls){
	//初始化样式，增加init A A_ini
		var screen=document.querySelector(screenCls);	//获取当前屏的元素
		var animateElements=screenAnimateElements[screenCls];	//需要设置动画的元素
		for (var i=0;i<animateElements.length;i++) {
			var element=document.querySelector(animateElements[i]);	//遍历当前屏的所有元素
			var baseCls=element.getAttribute('class');	//先取出初始的class名
			element.setAttribute('class',baseCls+' '+animateElements[i].substr(1)+'_animate_init');	//把数组中的第i个元素取出，即参与动画的元素的基本class名
		}
	}
/* 在载入时调用样式init方法 */
window.onload=function(){
	for(k in screenAnimateElements){
		if(k==='.screen-1') continue;	//第一屏不在这里初始化，而是在css中加上init样式，并通过setTimeout来切换成done
		setScreenAnimateInit(k);
	}
	var top=document.body.scrollTop;
	console.log(top);
	if(top>=0&&top<1*640-150){
		playScreenAnimationDone('.screen-1');
		switchNavItemsAcitve(0);
		navTip.style.left=40+'px';
	}
	else if(top>=1*640-150&&top<2*640-150){
		playScreenAnimationDone('.screen-2');
		switchNavItemsAcitve(1);
		navTip.style.left=(40+1*101)+'px';
	}
	else if(top>=2*640-150&&top<3*640-150){
		playScreenAnimationDone('.screen-3');
		switchNavItemsAcitve(2);
		navTip.style.left=(40+2*101)+'px';
	}
	else if(top>=3*640-150&&top<4*640-150){
		playScreenAnimationDone('.screen-4');
		switchNavItemsAcitve(3);
		navTip.style.left=(40+3*101)+'px';
	}
	else{
		playScreenAnimationDone('.screen-5');
		switchNavItemsAcitve(4);
		navTip.style.left=(40+4*101)+'px';
	}
	
}
/* 第二步：滚动到哪就播放到哪 */
/* 设置播放屏内的元素动画 */
var playScreenAnimationDone=function(screenCls){
	//播放动画，改init为done
	var screen=document.querySelector(screenCls);	//获取当前屏的元素
	var animateElements=screenAnimateElements[screenCls];	//需要设置动画的元素
	for (var i=0;i<animateElements.length;i++) {
					var element=document.querySelector(animateElements[i]);	//遍历当前屏的所有元素
					var baseCls=element.getAttribute('class');	//先取出初始的class名
					element.setAttribute('class',baseCls.replace('_animate_init','_animate_done'));	//把数组中的第i个元素取出，即参与动画的元素的基本class名
 			}
}

/* 第一屏动画通过settimeout来播放 */
setTimeout(function(){
	playScreenAnimationDone('.screen-1');
},200)

/* 获得所有元素 */
var navItems=getAllElem('.header__nav-item');
var outlineItems=getAllElem('.outline__item');

var switchNavItemsAcitve=function(index){
	for(var i=0;i<navItems.length;i++){
		delCls(navItems[i],'header__nav-item_status_active');
		delCls(outlineItems[i],'outline__item_status_active');
	}
	addCls(navItems[index],'header__nav-item_status_active');
	addCls(outlineItems[index],'outline__item_status_active');
}


window.onscroll=function(){
	var top=document.body.scrollTop;	//获取滚动条的高度
	/* ！！！！chrome获取不到，Edge可以，IE8也不行 */
	if(top>60){
		addCls(getElem('.header__wrap'),'header__wrap_status_black');
		addCls(getElem('.outline'),'outline_status_in');
	}
	else{
		delCls(getElem('.header__wrap'),'header__wrap_status_black');
		delCls(getElem('.outline'),'outline_status_in');
	}
	/* 记得要根据话筒条改变导航active元素的位置 */
	/* 先获得当前active元素，并删除它的样式 */

	if(top>=0){
		playScreenAnimationDone('.screen-1');
		switchNavItemsAcitve(0);
		navTip.style.left=40+'px';
	}
	if(top>640*1-150){
		playScreenAnimationDone('.screen-2');
		switchNavItemsAcitve(1);
		navTip.style.left=(40+1*101)+'px';
	}
	if(top>640*2-150){
		playScreenAnimationDone('.screen-3');
		switchNavItemsAcitve(2);
		navTip.style.left=(40+2*101)+'px';
	}
	if(top>640*3-150){
		playScreenAnimationDone('.screen-4');
		switchNavItemsAcitve(3);
		navTip.style.left=(40+3*101)+'px';
	}
	if(top>640*4-150){
		playScreenAnimationDone('.screen-5');
		switchNavItemsAcitve(4);
		navTip.style.left=(40+4*101)+'px';
	}
}
/* 第三步：双向定位 */
/* 获得所有元素 */

var setJump=function(i,lib){
	var item=lib[i];
	item.onclick=function(){
		document.body.scrollTop=i*640;
	}
}

for(var i=0;i<navItems.length;i++){
	setJump(i,navItems);
}
for(var i=0;i<outlineItems.length;i++){
	setJump(i,outlineItems);
}
/* 第四步：滑动门特效 */
var navTip=getElem('.header__nav-tip');
navTip.style.left=40+'px';
var setTip=function(index,lib){
	lib[index].onmouseover=function(){
		navTip.style.left=(40+index*101)+'px';
	}
	var activeIndex=0;
	lib[index].onmouseout=function(){
		for(var i=0;i<lib.length;i++){
			if(getCls(lib[i]).indexOf('header__nav-item_status_active')>-1)	/* 找到当前选中的元素，是被激活的元素 */
			{
				activeIndex=i;
				break;
			}
		}
		console.log(activeIndex);
		navTip.style.left=(40+activeIndex*101)+'px';
	}
}
for(var i=0;i<navItems.length;i++){
	setTip(i,navItems);
}

