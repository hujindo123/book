;(function(win){
	var doc = win.document;
	var docEl = doc.documentElement;//html
	var metaEl = doc.querySelector('meta[name="viewport"]');//viewport meta标签dom
	var headEl = doc.querySelector('head');//head标签dom
	var dpr = win.devicePixelRatio || 1; //获取手机的物理像素与逻辑像素比，没有就默认处理成1。
	var timeID;//定时器id
	
	if( dpr >= 2.5 ){
		dpr = 3;
	}else if( 2.5 > dpr >= 1.5 ){
		dpr = 2;
	}else{
		dpr = 1;
	}
	docEl.setAttribute('data-dpr',dpr);

	if( metaEl ){
		metaEl.setAttribute('content','width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no');
	}else if( !metaEl ){
		metaEl = doc.createElement('meta');
		metaEl.setAttribute('name','viewport');
		metaEl.setAttribute('content','width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no');
		headEl.appendChild(metaEl);
	}

	function refreshRem(){
		var width = docEl.getBoundingClientRect().width;
		var rem;
		if( width > 540 ){
			width = 540;
		}
		rem = width / 10;
		docEl.style.fontSize = rem + 'px';
	}

	if (doc.readyState === 'complete') {
        doc.body.style.fontSize = 14 + 'px';
    } else {
        doc.addEventListener('DOMContentLoaded', function(e) {
            doc.body.style.fontSize = 14 + 'px';
        }, false);
    }

	win.addEventListener('resize', function() {
        clearTimeout(timeID);
        timeID = setTimeout(refreshRem, 300);
    }, false);

    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(timeID);
            timeID = setTimeout(refreshRem, 300);
        }
    }, false);

    refreshRem();
})(window);