$('.top').click(function() {      // When arrow is clicked
        $('body,html').animate({
            scrollTop : 0                       // Scroll to top of body
        }, 500);
     });

     $(window).scroll(function() {
        if ( $(window).scrollTop() > 450 ) {
            $('.top').fadeIn('slow');
        } 
         else {
            $('.top').fadeOut('slow');
        }
    });