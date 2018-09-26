(function(){
    
    "use strict";
    
    function init(){
        $(".aboutme").flip({
          trigger: 'hover',
          reverse: true,
        });
        
        $("a[href='#top']").click(function() {
            $("html, body").animate({ scrollTop: 0 }, 1000);
            return false;
        });
        
        $("a[href='#projectSection']").click(function() {
            $("html, body").animate({ scrollTop: 950 }, 1000);
          return false;
        });
        
        $("a[href='#copyright']").click(function() {
            $("html, body").animate({ scrollTop: $(document).height()}, 2000);
            return false;
        });
        
        $(".about, [data-paroller-factor]").paroller({
            factor: .2,
            type: 'foreground',
        });
        
        $(".imageThumb, [data-paroller-factor]").paroller({
            factor: .1,
            type: 'foreground',
        });
        
        $(".tags, [data-paroller-factor]").paroller({
            factor: .2,
            type: 'foreground',
        });
        
        $('.js-tilt').tilt({
            perspective: 1500,
        })
        
        $('.slick').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
					infinite:true,
          autoplay: true,
          autoplaySpeed: 2000,
					arrows: false,
					dots: true,
        });
    }

    window.onload = init;
})();