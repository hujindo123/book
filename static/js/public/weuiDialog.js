;(function(win,$){

	// 调用方法：
	// dialog.show([data]);// 显示弹出框
	// dialog.del();//关闭弹出框
	// [data]参数说明：
	// 		data是个可选的json对象 可传可不传 （建议传入，不传则弹出默认对话框！）
	// 		data.type  字符串 可选参数   值为 alert或者dialog  默认为alert    alert只有一个按钮一段提示文字   dialog有一个标题 一段提示文字 左右两个按钮
	// 		data.title  字符串  可选参数  默认值为‘弹窗标题’  注意：当type值为alert时  此参数传入无效
	// 		data.text   字符串  可选参数  默认值为 当type值为alert时 值为‘描述文字尽量控制在三行内’ 当type值为dialog时 值为‘弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内’
	// 		data.butt_left 字符串  可选参数  默认值为‘取消’  注意 当type值为dialog时 此参数才有意义
	// 		data.butt_left_fun  fucntion 可选参数 默认为关闭弹出框函数  注意 当type值为dialog时  此参数才有意义
	// 		data.butt_right  字符串  可选参数  默认值为‘确定’  
	// 		data.butt_right_fun   function 可选参数  默认为关闭弹出框函数   
	// 		
	// 完整调用实例
	//   dialog.show({
	//   	type: 'alert',
	//   	text: '这是alert框的提示文字！',
	//   	butt_right: '这里时alert框按钮上的文字',
	//   	butt_fight_fun: function(){
	//          //可以不绑定这个事件  默认为关闭alert框
	//   		console.log('这里是为alert上的按钮绑定一个点击事件');
	//   	}
	//   });
	//   
	//   dialog.show({
	//  	type: 'dialog',
	//  	title: '这里是弹出框的标题',
	//  	text: '这里是弹出框的提示信息',
	//  	butt_left: '这里是弹出框左边的按钮文字',
	//  	butt_left_fun: function(){
	//  		//这里是左边按钮的点击事件
	//  	}, 
	//  	butt_right: '这里是弹出框右边的按钮文字',
	//  	butt_right: function(){
	//  		//这里是右边按钮的点击事件
	//  	}
	//   });
	//   
	//   dialog.del();    //这个是手动关闭弹出框  在弹出框按钮上面绑定了事件的时候用
	
	var _style = '.weui-mask{position:fixed;z-index:1000;top:0;right:0;left:0;bottom:0;background:rgba(0,0,0,0.6)}.weui-dialog{position:fixed;z-index:5000;width:80%;max-width:300px;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);background-color:#fff;text-align:center;border-radius:3px;overflow:hidden}.weui-dialog__hd{padding:1.3em 1.6em .5em}.weui-dialog__title{font-weight:400;font-size:18px}.weui-dialog__bd{padding:0 1.6em .8em;min-height:40px;font-size:15px;line-height:1.3;word-wrap:break-word;word-break:break-all;color:#999}.weui-dialog__bd:first-child{padding:2.7em 20px 1.7em;color:#353535}.weui-dialog__ft{position:relative;line-height:48px;font-size:1em;display:-webkit-box;display:-webkit-flex;display:flex}.weui-dialog__ft:after{content:" ";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #d5d5d6;color:#d5d5d6;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5)}.weui-dialog__btn{display:block;-webkit-box-flex:1;-webkit-flex:1;flex:1;color:#3cc51f;text-decoration:none;-webkit-tap-highlight-color:rgba(0,0,0,0);position:relative}.weui-dialog__btn:active{background-color:#eee}.weui-dialog__btn:after{content:" ";position:absolute;left:0;top:0;width:1px;bottom:0;border-left:1px solid #d5d5d6;color:#d5d5d6;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleX(0.5);transform:scaleX(0.5)}.weui-dialog__btn:first-child:after{display:none}.weui-dialog__btn_default{color:#353535}.weui-dialog__btn_primary{color:#0bb20c!important}@media screen and (min-width:1024px){.weui-dialog{width:35%}}',
		dialog = {},
		_weui_style_el = $('#weui-style'),
		_body = $('body');
	if ( _weui_style_el.length == 0 ) {
		$('head').append('<style type="text/css" class="weui-style">' + _style + '</style>');
	}

	dialog.show = function(){
		if ( typeof(arguments[0]) == 'object' || arguments.length == 0 ) {
			var _s = tem(arguments[0]);
			_body.append(_s);
			// 绑定事件
			bindSj(arguments[0]);
		}else{
			console.error('传入参数错误，传入的第一个参数不是json对象！');
		}
	}

	dialog.del = function(){
		deleteDom($('.weui'));
	}

	function deleteDom(dom){
		dom.remove();
	}

	function bindSj(e){
		if ( (e.type == 'alert' || !e.type) && !e.butt_right_fun ) {
			$('.weui-dialog__btn.weui-dialog__btn_primary').click( function(){deleteDom( $('.weui') )} );
		}else if( (e.type == 'alert' || !e.type) && e.butt_right_fun ){
			$('.weui-dialog__btn.weui-dialog__btn_primary').click( function(){e.butt_right_fun()} );
		}else if ( e.type == 'dialog' && !e.butt_right_fun && !e.butt_left_fun ) {
			$('.weui-dialog__btn.weui-dialog__btn_default').click( function(){deleteDom( $('.weui') )} );
			$('.weui-dialog__btn.weui-dialog__btn_primary').click( function(){deleteDom( $('.weui') )} );
		}else if ( e.type == 'dialog' && e.butt_right_fun && !e.butt_left_fun ) {
			$('.weui-dialog__btn.weui-dialog__btn_default').click( function(){deleteDom( $('.weui') )} );
			$('.weui-dialog__btn.weui-dialog__btn_primary').click( function(){ e.butt_right_fun() } );
		}else if ( e.type == 'dialog' && !e.butt_right_fun && e.butt_left_fun ) {
			$('.weui-dialog__btn.weui-dialog__btn_default').click( function(){ e.butt_left_fun() } );
			$('.weui-dialog__btn.weui-dialog__btn_primary').click( function(){deleteDom( $('.weui') )} );
		}else if ( e.type == 'dialog' && e.butt_right_fun && e.butt_left_fun ) {
			$('.weui-dialog__btn.weui-dialog__btn_default').click( function(){ e.butt_left_fun() } );
			$('.weui-dialog__btn.weui-dialog__btn_primary').click( function(){ e.butt_right_fun() } );
		}

		$('.weui-mask').click(function(){deleteDom($('.weui'))});
	}

	//生成模版字符串
	function tem(e){
		var _s = '';
		if ( typeof(e) != 'object' ) {
			console.log('传入参数不是对象！在生成模版的时候！');
			return;
		}else{
			if ( e.type == 'alert' || !e.type ) {
				_s = 	'<div class="weui">'+
            				'<div class="weui-mask"></div>'+
            				'<div class="weui-dialog">'+
                				'<div class="weui-dialog__bd">' + (e.text || '描述文字尽量控制在三行内') + '</div>'+
                				'<div class="weui-dialog__ft">'+
                    				'<a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary">' + (e.butt_right || '确定') + '</a>'+
                				'</div>'+
            				'</div>'+
        				'</div>';
			}else if( e.type == 'dialog' ){
				_s = 	'<div class="weui">'+
            				'<div class="weui-mask"></div>'+
            				'<div class="weui-dialog">'+
                				'<div class="weui-dialog__hd"><strong class="weui-dialog__title">' + (e.title || '弹窗标题') + '</strong></div>'+
            				    '<div class="weui-dialog__bd">' + (e.text || '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内') + '</div>'+
                				'<div class="weui-dialog__ft">'+
                    				'<a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default">' + (e.butt_left || '取消') + '</a>'+
                    				'<a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary">' + (e.butt_right || '确定') + '</a>'+
                				'</div>'+
            				'</div>'+
        				'</div>';
			}
		}
		return _s
	}

	win.dialog = dialog ;

})(window,(Zepto || $));