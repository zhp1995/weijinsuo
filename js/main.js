
$(function(){   
	//设置轮播图的样式
	// 将轮播图设为背景图，当屏幕大于768px:用大图(2000x400)→ 当屏幕小于768px:用小图(600x340)并换成图片(方便伸缩)
	//让window对象立即触发一下resize
	function resize(){
		var  windowWidth=$(window).width();
		var isSmallScreen=windowWidth < 768;
		$('#main_ad > .carousel-inner > .item').each(function(i,item){
			var $item=$(item);  
			var imgSrc=$item.data(isSmallScreen ? 'img-xs' : 'img-lg' );
			// var imgSrc=isSmallScreen ? $item.data("img-xs") : $item.data("img-lg");

			$item.css('backgroundImage','url("'+ imgSrc +'")');
			if(isSmallScreen){
				$item.html('<img src="'+ imgSrc +'" alt="哈哈" />');
			}else{
				$item.empty(); 
			}
		});
	}
	$(window).on('resize',resize).trigger('resize');


	//获取轮播图容器 → 记录鼠标点下的位置+抬起的位置→ 比大小（控制精度）→ 注册事件
	//1.获取手指在轮播图元素上的一个滑动方向（左右）
	//2.根据获得的方向选择上一张或者下一张
		//$('a').click()
		//原生的carousel方法实现
	var $carousel=$('.carousel');
	var startX,endX;
	var offset=50;
	$carousel.on('touchstart',function(e){
		startX=e.originalEvent.touches[0].clientX;
	});
	$carousel.on('touchmove',function(e){
		endX=e.originalEvent.touches[0].clientX;
	});
	$carousel.on('touchend',function(e){
		var distance=Math.abs(startX-endX);
		if(distance>offset){
			$(this).carousel(startX>endX ? 'next':'prev');
		}
	});


	//初始化tooltips插件
	$('[data-toggle="tooltip"]').tooltip();

	//控制标签页的容器宽度
	//判断当前ul的宽度是否超出屏幕，如果超出就显示横向滚动条
	var $ulContainer = $('.nav-tabs');
	var width=30;       //因为原本ul上有padding-left
	$ulContainer.children().each(function(index,element){  
		width += element.clientWidth;
	});
	if(width > $(window).width()){		
		$ulContainer.css('width',width).parent().css('overflow-x','scroll');
	}

	//新闻模块
	//a注册点击事件,点击时将对应的title设置到相应的位置
	var $newTitle=$('.news-title');
	$('#news .nav-pills a ').on('click',function(){
		var $this=$(this);
		$newTitle.text($this.data('title'));
	});



});