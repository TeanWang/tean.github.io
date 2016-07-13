$(function() {
	// 关于我
	function closeAboutMe() {
		$('.about-me').animate({top:'-100%'}, 500, function() {
			$(this).css({'left':'-100%', 'top':'5%'});
		});
	}
	function openAboutMe() {
		$('.about-me').animate({left:'50%'}, 500);
	}
	
	// 联系我
	function closeContactMe() {
		$('.contact-me').animate({top:'-100%'}, 500, function() {
			$(this).css({'left':'-100%', 'top':'5%'});

		});
	}
	function openContactMe() {
		$('.contact-me').animate({left:'50%'}, 500);
	}
	
	// 首页
	function closeHome() {
		$('.index').animate({top:'-100%'}, 500, function() {
			$(this).css({'left':'-100%', 'top':'50%'});
		});
	}
	function openHome() {
		$('.index').animate({left:'50%'}, 500);
	}
	
	// 菜单点击
	$('#myHome').click(function() {
		closeAboutMe();
		closeContactMe();
		openHome();
		$('#nav').trigger("click");
	});
	$('.am-close').click(function() {
		closeAboutMe();
		closeContactMe();
		openHome();
	});
	$('.cm-close').click(function() {
		closeAboutMe();
		closeContactMe();
		openHome();
	});
	$('#aboutMe').click(function() {
		closeHome();
		closeContactMe();
		openAboutMe();
		$('#nav').trigger("click");
	});
	$('#ContactMe').click(function() {
		closeHome();
		closeAboutMe();
		openContactMe();
		$('#nav').trigger("click");
	});

    // 捕获#

    var curHash = location.hash;
    console.log(curHash);
    if(curHash == '#contact') {
        closeHome();
        closeAboutMe();
        openContactMe();
    } else if(curHash == '#about') {
        closeHome();
        closeContactMe();
        openAboutMe();
    }

	// 连接跳转特效
	$('.tean-link').click(function(event) {
		var _this = $(this);
		var s = 0;
		var mTimer = setInterval(function() {
			$('.index').css('-webkit-transform', 'rotateX(' + --s + 'deg)');
		}, 1);
		$('.index').animate({left:'-100%'}, 1000, function() {
			location.href = _this.attr('href');
		});
		return false;
	});
	
	// 微信
	$('#wechat').hover(function() {
		$('.wechat').stop().animate({top:0}, 500);
	}, function() {
		$('.wechat').stop().animate({top:-315}, 500);
	});
	
	// 左侧菜单
	var menu = false;
	$('#nav').click(function() {
		if(!menu) {
			$(this).animate({left:260}, 500);
			$('#navBar').animate({left:0}, 500, function() {
				$('.line-a').animate({top:15}, 500, function() {
					var _this = $(this);
					var s1 = 0;
					var t1 = setInterval(function() {
						_this.css('-webkit-transform', 'rotate(' + ++s1 + 'deg)');
						if(s1 == 45) clearInterval(t1);
					}, 1);
					
				});
				$('.line-c').animate({top:15}, 500, function() {
					var _this = $(this);
					var s1 = 0;
					var t1 = setInterval(function() {
						_this.css('-webkit-transform', 'rotate(' + --s1 + 'deg)');
						if(s1 == -45) clearInterval(t1);
					}, 1);
				});
				$('.line-b').animate({opacity:0}, 500);
				
			});
			menu = true;
		} else {
			$(this).animate({left:20}, 500);
			$('#navBar').animate({left:-240}, 500, function() {
				var s1 = 45, s2 = -45;
				var t1 = setInterval(function() {
					$('.line-a').css('-webkit-transform', 'rotate(' + --s1 + 'deg)');
					if(s1 == 0) {
						clearInterval(t1);
						$('.line-a').animate({top:0}, 500)
					}
				}, 1),
					t2 = setInterval(function() {
					$('.line-c').css('-webkit-transform', 'rotate(' + ++s2 + 'deg)');
					if(s2 == 0) {
						clearInterval(t2);
						$('.line-c').animate({top:30}, 500);
						$('.line-b').animate({opacity:1}, 500);
					}
				}, 1);
				
			});
			menu = false;
		}
	});
	
	// 背景音乐
	var i = 0;
	var bgMusic = true;
	var timer = setInterval(function() {
		$('#musicBar').css('-webkit-transform', 'rotate(' + ++i + 'deg)');
	}, 1);
	$('#musicBar').click(function() {
		if(bgMusic) {
			clearInterval(timer);
			$('#myBgMusic')[0].pause();
		} else {
			timer = setInterval(function() {
				$('#musicBar').css('-webkit-transform', 'rotate(' + ++i + 'deg)');
			}, 1);
			$('#myBgMusic')[0].play(); 
		}
		bgMusic = !bgMusic;
	});
	
});