$(function () {
    page();
    ranImg();
    //调用音乐播放
    $(".music").click(function(){
        clickMusic();
    });
    document.addEventListener('visibilitychange', function() {
        var isHidden = document.hidden;
        if (isHidden){
            document.getElementById("aud").pause();
            $(".icon-music").attr("style","animation-play-state:paused;-webkit-animation-play-state:paused;")
        }
    });
});

scaleW=window.innerWidth/320;
scaleH=window.innerHeight/480;

var resizes = document.querySelectorAll('.resize');
for (var j=0; j<resizes.length; j++) {
    resizes[j].style.width=parseInt(resizes[j].style.width)*scaleW+'px';
    resizes[j].style.height=parseInt(resizes[j].style.height)*scaleH+'px';
    resizes[j].style.top=parseInt(resizes[j].style.top)*scaleH+'px';
    resizes[j].style.left=parseInt(resizes[j].style.left)*scaleW+'px';
}
var mySwiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    mousewheelControl: true,
    watchSlidesProgress: true,
    onInit: function(swiper) {
        swiper.myIndex = 0;//activeIndex在滑动到一半时会切换，改用滑动完再切换的myIndex
    },
    onProgress: function(swiper) {
        for (var i = 0; i < swiper.slides.length; i++) {
            var slide=swiper.slides.eq(i);
            var progress = swiper.slides[i].progress;
            var translate, boxShadow;
            translate = progress * swiper.height * 0.8;
            scale = 1 - Math.min(Math.abs(progress * 0.2), 1);
            if (i == swiper.myIndex) {
                slide.transform('translate3d(0,' + (translate) + 'px,0) scale(' + scale + ')');
                slide.css({'z-index':0,'boxShadow':'0px 44px 10px rgba(0,0,0,.5)'});
            }
            // if($('.swiper-slide1.swiper-slide-active').length > 0 || $('.swiper-slide9.swiper-slide-active').length > 0){
            //     var lineHeight = $('.user_name').first().css('height');
            //     $('.user_name').first().css('line-height',lineHeight)
            //     $('.top').attr("style","background-color:transparent")
            //     // $('.swiper-slide').attr("style","border-shadow:unset" )
            // }else{
            //     $('.top').attr("style","background-color: #5ba1f8;")
            //     // var heightString = (screen.height - 44).toString();
            //     // var height ="background-size:" + "100% "+ heightString + "px";
            //     // $('.swiper-slide').attr("style","border-shadow:unset" )
            //     // $('.swiper-slide').attr("style",height )
            // }
        }
    },
    onTransitionEnd: function(swiper) {
        swiper.myIndex = swiper.activeIndex;
        for (var i = 0; i < swiper.slides.length; i++) {
            var slide=swiper.slides.eq(i);
            slide.transform('');
            slide.css('z-index',1);
        }
        swiper.enableMousewheelControl();
        //swiper.enableTouchControl();

        //修改最后一张top文字
        if($('.swiper-slide9.swiper-slide-active').length > 0){
            $('.top span').html("我的2018")
            $('#array').hide();
            $('.tip').attr('style','animation:show 4s linear;-webkit-animation:show 4s linear;')
        }else{
            $('.top span').html("EIP7S年度报告")
            $('#array').show();
        }

        if($('.swiper-slide1.swiper-slide-active').length > 0 || $('.swiper-slide9.swiper-slide-active').length > 0){
            var lineHeight = $('.user_name').first().css('height');
            $('.user_name').first().css('line-height',lineHeight);
            $('.music').css("display","none")
            $('.top').attr("style","background-color:transparent");
            $('.swiper-slide').attr("style","background-size:100% 100%;background-position:0 0;" );
        }
        else{
            $('.top').attr("style","background-color: #5ba1f8;")
            $('.music').css("display","block")
            var heightString = (document.documentElement.clientHeight  - 44).toString();
            var height ="background-size:" + "100% "+ heightString + "px";
            $('.swiper-slide').attr("style",height )
        }
    },
    onSetTransition: function(swiper, speed) {
        for (var i = 0; i < swiper.slides.length; i++) {
            var slide=swiper.slides.eq(i);
            slide.transition(speed + 'ms');
        }
        swiper.disableMousewheelControl();
        //swiper.disableTouchControl();
    }
});





var monthNum = 520;
showMonth(monthNum);
//月份用对应的图片展示
function showMonth(monthNum){
    monthNum = monthNum.toString();
    monthLength = monthNum.length;
    monthClass = "month_"+monthLength.toString();
    $('.month').addClass(monthClass);
    //月分数是一位数时，在month上加class  month_1,同理二位数时加  month_2
    monthArr = monthNum.split('');
    $('.month_img').html('');
    //对应的月份数字用图片展示
    var monthImg = '';
    $.each(monthArr,function(i,item){
        if(item==1){
            monthImg += '<img src="images/'+ item +'.png" alt="" style="width: 22%">'
        }else if(item==4){
            monthImg += '<img src="images/'+ item +'.png" alt="" style="width: 25%">'
        }
        else{
            monthImg += '<img src="images/'+ item +'.png" alt="">'
        }

    })
    $('.month_img').html(monthImg);
}

//让字体尺寸随屏幕大小改变变化
function page() {
//通过navigator判断是否是移动设备
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
//在移动端
        (function (doc, win) {
// html
            var docEl = doc.documentElement,
                resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize', recalc = function () {
                    var clientWidth = docEl.clientWidth;
                    if (!clientWidth) return;
                    clientWidth = (clientWidth > 768 ) ? 768 : clientWidth ; docEl.style.fontSize = 10 * (clientWidth / 375 ) + 'px';      //这个10可以根据自己使用的数据来调整
                };
            if (!doc.addEventListener) return; win.addEventListener(resizeEvt, recalc, false);
            recalc();
        })(document, window);
//移动端 文字适配
    }
    else {       //如果是pc端我们可以像微信公众号那样，设置最大宽度为740px
        document.documentElement.style.maxWidth=740+'px';
        document.documentElement.style.margin="0 auto"
//PC端
    }
}

//拿到图片之后修改url就可以随机加载图片

function ranImg(){
   var ranNum = Math.floor(Math.random()*10); //生成0-9的随机数
    var cardObj = [
        {
            url:'card_1.png',
            name:'成功',
            text:'面对挑战从不畏惧，面对失败从不退缩，终将登上人生巅峰。'
        },{
            url:'card_2.png',
            name:'成长',
            text:'无畏风雨，艳阳之下， 茁壮成长，气质芳华。'
        },{
            url:'card_3.png',
            name:'闪电侠',
            text:'钢铁丛林，大街小巷，都有你闪电般飞奔的身影。'
        },{
            url:'card_4.png',
            name:'导师',
            text:'方向的指路人，相遇是最好机遇，相助是最美的礼物。'
        },{
            url:'card_5.png',
            name:'旺',
            text:'鸿运当头财运旺、福气旺，业绩旺，一年旺旺旺。'
        },{
            url:'card_6.png',
            name:'爆发户',
            text:'颜值爆表，业绩爆表，“爆”是你现在最好的定位。'
        },{
            url:'card_7.png',
            name:'快乐',
            text:'追求梦想、敢于行动、享受快乐、收获幸福乐在其中。'
        },{
            url:'card_8.png',
            name:'坚持',
            text:'哪有什么天生如此，只有天天坚持，永不放弃。'
        },{
            url:'card_9.png',
            name:'奔跑',
            text:'人生来便是要努力的，你可以哭泣，但是不要忘记奔跑。'
        }
    ]
    $('.card_img').html('');
    $('.card_p').html('');
    $('.card_name').html('');
    var strCard = '';
    var textCar = '';
    var nameCar = '';
    $.each(cardObj,function(i,item){
        if(i == ranNum) {
            strCard += '<img src="images/'+ item.url +'" alt="">'
            textCar += item.text;
            nameCar += item.name;
        }
    })
    $('.card_img').html(strCard);
    $('.card_p').html(textCar);
    $('.card_name').html(nameCar);

}

//click事件封装成函数
function clickMusic(){
    if($(".icon-music").attr("num") == "1"){
        $(".icon-music").removeClass("open");
        $(".icon-music").attr("num","2")
        // $(".music-span").css("display","none");
        document.getElementById("aud").pause();
        $(".icon-music").attr("style","animation-play-state:paused;-webkit-animation-play-state:paused;")
        // $(".music_text").html("关闭");
        $(".music_text").addClass("show_hide");
        setTimeout(musicHide,2000);
    }else{
        $(".icon-music").attr("num","1");
        $(".icon-music").addClass("open");
        // $(".music-span").css("display","block");
        document.getElementById("aud").play();
        $(".icon-music").attr("style","animation:rotate 23s infinite linear;-moz-animation:rotate 23s infinite linear;-webkit-animation:rotate 23s infinite linear;-o-animation:rotate 23s infinite linear;")

        // $(".music_text").html("开启");
        $(".music_text").addClass("show_hide");
        setTimeout(musicHide,2000);
    }
    function musicHide(){
        $(".music_text").removeClass("show_hide");
    }
}
