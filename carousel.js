;(function($){
    // 这里是把插件方法挂到jquery的实例上面
    $.fn.carousel = function(options){
        this.each(function(){
            new Carousel($(this),options)
        })
    }
    function Carousel($elem,options){
        this.option = {
            "width" : "536px",
            "height" : "300px"
        };
        this.cur = 0;
        this.timer= null;
        this.$carousel = $elem;
        this.$list = $(".carousel__list",this.$carousel);
        this.$items = $(".carousel__item",this.$carousel);
        this.$pre = $(".carousel__pre",this.$carousel);
        this.$next = $(".carousel__next",this.$carousel);
        this.$crt = $(".carousel__control",this.$carousel);
        this.$btn = $("i",this.$crt);

        $.extend(this.option,options);
        
        this.size = this.$items.length;

        this.setStyle();
        this.bind();
        this.autoPlay();
    }

    Carousel.prototype={
        constructor : Carousel,
        bind : function(){
            var _this=this;
            this.$pre.on("click",this.showPre.bind(this));
            this.$next.on("click",this.showNext.bind(this));
            this.$btn.each(function(){
                $(this).on("click",function(){
                    _this.cur = $(this).index();
                    _this.switchPic();
                    _this.$btn.removeClass("active");
                    _this.$btn.eq(_this.cur).addClass("active");
                })
            });
            this.$carousel.on("mouseenter",function(){
                clearInterval(_this.timer);
            });
            this.$carousel.on("mouseleave",function(){
                _this.timer = setInterval(function(){
                    _this.showNext();
                },3000)
            })
        },

        setStyle : function(){
            this.$carousel.css({
                "width" : this.option.width,
                "height" : this.option.height,
            });
            this.$list.css("width",parseInt(this.option.width)*this.size);
            this.$items.find("img").css({
                "width" : this.option.width,
                "height" : this.option.height
            }); 
        },

        showPre : function(){
            if(this.cur===0){
                this.cur = this.size-1;
            }else{
                this.cur--;
            };
            this.switchPic();
            this.$btn.removeClass("active");
            this.$btn.eq(this.cur).addClass("active");
        },

        showNext : function(){
            if(this.cur===this.size-1){
                this.cur = 0;
            }else{
                this.cur++;
            } 
            this.switchPic();
            this.$btn.removeClass("active");
            this.$btn.eq(this.cur).addClass("active");
        },

        switchPic : function(){
            this.$list.animate({
                "left" : -parseInt(this.option.width)*this.cur
            },500);
        },
        
        autoPlay : function(){
            var _this = this;
            this.timer = setInterval(function(){
                _this.showNext();
            },3000)
        }
    }

})(jQuery)