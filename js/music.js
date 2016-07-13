
$(function() {
    // init

    $('.main-right').css('height', $('.main').outerHeight() - 161);
    $(window).resize(function(){
        $('.main-right').css('height', $('.main').outerHeight() - 161);
    });

    var teanMusic = $('#teanMusic'),
        btnPrev = $('#prevBtn'),
        btnPlay = $('#playBtn'),
        btnNext = $('#nextBtn'),
        btnPlayerMode = $('#playerMode');


    // 歌曲 数据源
    var musicList = [
        {"name": "Ma Boo", "singer": "T-ara", "img": "maboo.jpg", "src": "MaBoo.mp3"},
        {"name": "Wonder Woman", "singer": "T-ara, Davichi, Seeya", "img": "wonderwomen.jpg", "src": "WonderWoman.mp3"},
        {"name": "Falling U", "singer": "T-ara", "img": "faillingu.jpg", "src": "FallingU.mp3"},
        {"name": "Question", "singer": "Ha Yoo Sun", "img": "question.jpg", "src": "Question.mp3"},
        {"name": "I'm Yesterday", "singer": "JW (Namolla Family)", "img": "imyesterday.jpg", "src": "I'm Yesterday.mp3"},
        {"name": "죽일놈이야 (该死的家伙)", "singer": "Tae In", "img": "gsdjh.jpg", "src": "gsdjh.mp3"},
        {"name": "Cry Cry", "singer": "T-ara", "img": "crycry.jpg", "src": "Cry Cry.mp3"},
        {"name": "Number 9", "singer": "T-ara", "img": "number9.jpg", "src": "No.9.mp3"}
    ];
    var curIndex = 0;


    // 加载歌曲到页面中
    var lHtml ="";
    for(var i = 0; i < musicList.length; i++) {
        lHtml += '<li><h4>' + musicList[i].name + '</h4><p>' + musicList[i].singer + '</p></li>';
    }
    $('#MusicList').html(lHtml);

    // 点歌
    $('#MusicList li').bind('click', function() {
        isFirst = false;
        curIndex = $(this).index();
        doPlay();

    });

    // 播放
    var isFirst = true;
    function doPlay(isPause) {
        if(!isPause) {
            $('#MusicList li').eq(curIndex).addClass('cur').siblings('li').removeClass('cur');
            $('#musciInfo').find('h3').html(musicList[curIndex].name);
            $('#musciInfo').find('p').html(musicList[curIndex].singer);
            $('#musciInfo').find('img').attr('src', 'images/music/' + musicList[curIndex].img);
            teanMusic.attr('src', 'music/' + musicList[curIndex].src);
            teanMusic[0].currentTime = 0
        }

        teanMusic[0].play();
        btnPlay.attr('class', 'pause-btn');
        setTimeout(function() {init()}, 100);
        startRound();
    }

    // 上一首
    $('#prevBtn').click(function() {
        isFirst = false;
        curIndex = --curIndex < 0 ? musicList.length - 1 : curIndex;
        doPlay();
    });

    // 下一首
    $('#nextBtn').click(function() {
        isFirst = false;
        curIndex = ++curIndex == musicList.length ? 0 : curIndex;
        doPlay();
    });

    // 播放模式
    var m = 1;
    $('#playerMode').click(function() {
        if(m === 1) {
            $(this).attr('title', '随机播放').attr('class', 'mode-random');
        } else if(m === 2) {
            $(this).attr('title', '单曲循环').attr('class', 'mode-only');
        } else {
            $(this).attr('title', '顺序播放').attr('class', 'mode-order');
        }
        m = ++m == 4 ? 1 : m;
    });

    // 自动进入下一首
    teanMusic[0].addEventListener('ended', function () {
        isFirst = false;
        if($('#playerMode').attr('class') === 'mode-random') {
            curIndex = Math.floor(Math.random() * musicList.length);
        } else if($('#playerMode').attr('class') === 'mode-only') {

        } else {
            curIndex = ++curIndex == musicList.length ? 0 : curIndex;
        }

        doPlay();
    }, false);

    // 专辑图片转动开始
    var timerRound;
    function startRound() {
        stopRound();
        var i = 0;
        timerRound = setInterval(function() {
            $('#musciInfo').find('img').css('-webkit-transform', 'rotate(' + ++i + 'deg)');
        }, 20);
    }
    // 专辑图片转动停止
    function stopRound() {
        clearInterval(timerRound);
    }


    // 获取总时长
    function init() {
        var allTime;
        var allTimer = setInterval(function() {
            allTime = calcTime(Math.floor(teanMusic[0].duration));
            if(/^\d{2}:\d{2}$/.test(allTime)) {
                $('#durationTime').text(allTime);
                clearInterval(allTimer);
            }
        }, 500);
    }

    // 播放&暂停
    btnPlay.click(function() {
        if (btnPlay.attr('class') === 'pause-btn') {
            teanMusic[0].pause();
            btnPlay.attr('class', 'play-btn');
            stopRound();
        } else {
            if(isFirst) {
                doPlay();
                isFirst = false;
            }
            doPlay(true);
        }
    });

    // 格式化时间
    function calcTime(time) {
        var minute;
        var second;

        minute=String(parseInt((time % 3600) / 60, 10));
        if (minute.length == 1)   minute   = '0' + minute;
        second=String(parseInt(time % 60, 10));
        if (second.length == 1)   second   = '0' + second;
        return minute + ":" + second;
    }

    // 改变事件
    teanMusic[0].ontimeupdate = function() {
        $('#positionTime').text(calcTime(Math.floor(teanMusic[0].currentTime)));
        var curPro = teanMusic[0].currentTime / teanMusic[0].duration * 100;
        $('.playing').stop().animate({width: curPro + '%'}, 10);
        $('#playerDot').stop().animate({left: curPro + '%'}, 10);

    };

    //音量调整
    var isdown = false;
    teanMusic[0].volume = 0.5;
    $('.volume-dot').mousedown(function (e) {
        var offset = $('#volumeRange').offset();
        var left = e.pageX - offset.left - 8;
        left = left > 72 ? 72 : left;
        left = left < 0 ? 0 : left;
        $('.volume-dot').css('left', left + 'px');
        $('.volume-cur').css('width', left / 72 * 100 + "%");
        isdown = true;
    });

    $(document).mousemove(function (e) {
        if (isdown) {
            var offset = $('#volumeRange').offset();
            var left = e.pageX - offset.left - 8;
            left = left > 72 ? 72 : left;
            left = left < 0 ? 0 : left;
            $('.volume-dot').css('left', left + 'px');
            $('.volume-cur').css('width', left / 72 * 100 + "%");
            teanMusic[0].volume = Math.round(left / 72 * 10) / 10;
        }
    });

    $(document).mouseup(function () {
        isdown = false;
    });

    //音量控制
    $('#volumeRange').click(function (e) {
        var offset = $('#volumeRange').offset();
        var left = e.pageX - offset.left - 8;
        left = left > 72 ? 72 : left;
        left = left < 0 ? 0 : left;
        $('.volume-dot').css('left', left + 'px');
        $('.volume-cur').css('width', left / 72 * 100 + "%");
        teanMusic[0].volume = Math.round(left / 72 * 10) / 10;
    });


});
