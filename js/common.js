/**
 * Created by xiaohu on 2017/8/14.
 */
(function(){
    var BannerSlide = function(ele, options){
        this.opts = $.extend({}, {

        }, options);
        //elements
        this.$box = $(ele);
        this.$bannerBox = $(ele).children(":first");
        this.$imgList = this.$bannerBox.children();
        this.$dotBox = $(ele).children(":last");
        this.$dotList = this.$dotBox.children();
        this.imgLen = this.$imgList.length;
        this.$curNo = 0;
        //some class str
        this.activeCls = this.opts.activeCls || "active";

        this._init();
    };
    BannerSlide.prototype = {
        constructor: BannerSlide,
        _init: function(){
            this.imgShow();
            this.startInterval();
        },
        startInterval: function(){
            var that = this;
            window.setInterval(function(){
                that.$dotList.eq(that.$curNo).removeClass("active");
                that.$imgList.eq(that.$curNo).hide();
                that.$curNo += 1;
                if(that.$curNo == that.imgLen){
                    that.$curNo = 0;
                }
                that.$dotList.eq(that.$curNo).addClass("active");
                that.$imgList.eq(that.$curNo).show();
            }, 5000);
        },
        imgShow: function(){
            this.$dotList.eq(this.$curNo).addClass("active");
            this.$imgList.eq(this.$curNo).show();
        }
    };
    $.fn.bannerSlide = function(options){
        var $this = $(this);
        var data = $this.data("bannerSlide");
        if(!data){
            $this.data("bannerSlide", (data = new BannerSlide(this, options)));
        }
    };
    $.fn.bannerSlide.constructor = BannerSlide;
})(window.jQuery);
//一下为公用的方法
//打开遮罩层
function shadowTog(){
    $(".shadow").toggle();
}
//组织浏默认事件
function forbiddenDefault(){
    return false;
}
$(function(){
    //底部导航
    $(".footer li").on("touchend", function(){
        var $this = $(this);
        if($this.hasClass("index")){return;}
        var idx = $this.index();
        switch(idx){
            case 0:
                window.location.href = "./index.html";
                break;
            case 1:
                window.location.href = "./my_course.html";
                break;
            case 2:
                window.location.href= "./personal.html";
                break;
        }
    });
    $("a").each(function(){
        $(this).css("text-decoration", "none");
    });
});