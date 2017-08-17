//图片懒加载
(function(win){
	//先获取整个文档中带有data-url的img元素
	var imgDom = win.document.documentElement.querySelectorAll('img[data-url]') || [];
	//定义一个图片加载失败是显示的图片url默认为空！
	var imgErrorUrl = "";
	// 定义一个定时器
	var time;
	// 定义一个懒加载变量对象  绑定到window对象上 做全局调用
	var imageLazyLoading = {};

	function getImage(){
		var imgDom = win.document.documentElement.querySelectorAll('img[data-url]') || [];
		var length = imgDom.length;
		for( var i = 0; i < length; i++ ){
			var img = imgDom[i];
			//页面被卷去的高
			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			//浏览器可视区域的高
			var clientHeight = document.documentElement.clientHeight;
			//获取元素距离页面顶端的高度
			var h = getH(img);
			// 获取元素本身的高度
			var imgH = img.offsetHeight;
			//判断元素是否在可视区域内
			if ( ( h + imgH ) > scrollTop && h < ( scrollTop + clientHeight + 50 ) ) {
				console.log("触发了设置src函数");
				var url = img.getAttribute("data-url");
				setImageUrl(img,url);
			}
		}
	}

	//设置image标签的url属性
	function setImageUrl(el,url){
		//显示loading动画
		// loadingShow(el);
		//设置image标签的src属性
		el.setAttribute("src",url);
		//移除image标签的data-url属性
		el.removeAttribute("data-url");
		// //监听图片加载事件
		// if (el.addEventListener) {
		// 	el.addEventListener("load", function(){
		// 		loadingHide(el);
		// 	});
		// 	el.addEventListener("error", function(){
		// 		loadingHide(el);
		// 		setImageUrl(this,imgErrorUrl);
		// 	});
		// }//处理ie8及以下兼容
		// else if (el.attachEvent) {
		// 	el.attrchEvent("load", function(){
		// 		removeLoading(el);
		// 	});
		// 	el.attrchEvent("error",function(){
		// 		loadingHide(el);
		// 		setImageUrl(this,imgErrorUrl);
		// 	});
		// }
	}

	//获取元素距离网页顶部的距离
	function getH(el){
		var h = 0;
		while (el) {  
	        h += el.offsetTop;  
	        el = el.offsetParent;  
    	}
    	return h;
	}

	function loadingShow(el){
		var el = el.parentNode;
		var dom = win.document.createElement("div");
		dom.setAttribute("class","loading");
		el.setAttribute("class",el.getAttribute("class") + " loading-box");
		el.appendChild(dom);
	}

	function loadingHide(el){
		var el = el.parentNode;
		var dom = el.querySelector(".loading");
		el.remove(dom);
	}

	win.addEventListener('load', function(){
		clearTimeout(time);
		time = setTimeout(getImage,500);
	});

	win.addEventListener("scroll", function(){
		clearTimeout(time);
		time = setTimeout(getImage,500);
	});

	// 注册一个方法来手动出发懒加载事件
	imageLazyLoading.start = function(){
		alert("调用成功");
		clearTimeout(time);
		time = setTimeout(getImage,500);
	}

	// 将对象添加到window对象中
	win.imageLazyLoading = imageLazyLoading;
})(window);