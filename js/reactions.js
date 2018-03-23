const init = () =>{
    
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if( target.length ) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top-120
            }, 'slow');
        }
    });
    
	
	
		$("#card").flip({
			axis: 'x',
			trigger: 'hover',
			reverse:true,
		});
//        //fade top on scroll
//    $(window).scroll(function(){
//        
//        if ( $(window).scrollTop() > 50 ) {
//            BlurID("#about img", 40);
//        }
//        if ( $(window).scrollTop() > 120 ) {
//            BlurID("#about p", 100);
//        }
//        
//        if ( $(window).scrollTop() > 300 ) {
//            BlurID("#goal h2", 200);
//        }
//        
//        if ( $(window).scrollTop() > 350 ) {
//
//            BlurID("#goal h3", 200);
//        }
//        
//        if ( $(window).scrollTop() > 390 ) {
//            BlurID("#goal p", 200);
//        }
//
//  });
//    
//    function BlurID(sec, pixels){
//        var pixs = $(document).scrollTop()
//        pixs = pixs / pixels;
//        $(sec).css({"-webkit-filter": "blur("+pixs+"px)","filter": "blur("+pixs+"px)" })
//    }
}

window.onload=init;
