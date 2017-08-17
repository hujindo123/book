;(function(win,$){

	// 给蒙层添加点击事件
	$(window).on('click touchend','.mask',close);
	function close(){
		$('.mask').parent().hide();
	}

})(window,Zepto);