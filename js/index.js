(function(){
    
    "use strict";
    
    function init(){
        $("a[href='#top']").click(function() {
            $("html, body").animate({ scrollTop: 0 }, "slow");
            return false;
        });
        
        $("a[href='#projectSection']").click(function() {
            $("html, body").animate({ scrollTop: 1050 }, "slow");
          return false;
        });
        
        $("a[href='#copyright']").click(function() {
            $("html, body").animate({ scrollTop: $(document).height()}, "slow");
            return false;
        });
        
        $(".about, [data-paroller-factor]").paroller({
            factor: .5,
            type: 'foreground',
        });
        
        
        $('.carousel').slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            dots: true,
            centerMode: true,
        });
    }
    
    window.onload = init;
})();