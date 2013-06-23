function mycarousel_initCallback(carousel)
{
    // Disable autoscrolling if the user clicks the prev or next button.
    carousel.buttonNext.bind('click', function() {
        carousel.startAuto(0);
    });

    carousel.buttonPrev.bind('click', function() {
        carousel.startAuto(0);
    });

    // Pause autoscrolling if the user moves with the cursor over the clip.
    carousel.clip.hover(function() {
        carousel.stopAuto();
    }, function() {
        carousel.startAuto();
    });
};

function sliderHeight(){

	wh = $(window).height();
	$('#slide1').css({height:wh});

}

function mymargtop() {
	var body_h = $(window).height();
	var container_h = $('.filtr_bg').height();
	var marg_top = Math.abs((body_h - container_h)/2);
	$('.filtr_bg').css('margin-top', marg_top);
	$('.filtr_bg').css('margin-bottom', marg_top);
}

function drop_menu () {
	//DROP menu
	if ($(window).width()<750){
		$(".navigation li").click(function(){
			$(".navigation").slideToggle("slow");
		});
	}
}

jQuery(document).ready(function ($) {

    $(window).stellar();

    var links = $('.navigation').find('li');
    slide = $('.slide');
    button = $('.button');
    mywindow = $(window);
    htmlbody = $('html,body');


    slide.waypoint(function (event, direction) {

        dataslide = $(this).attr('data-slide');

        if (direction === 'down') {
            $('.navigation li[data-slide="' + dataslide + '"]').addClass('active').prev().removeClass('active');
        }
        else {
            $('.navigation li[data-slide="' + dataslide + '"]').addClass('active').next().removeClass('active');
        }

    });

    mywindow.scroll(function () {
        if (mywindow.scrollTop() == 0) {
            $('.navigation li[data-slide="1"]').addClass('active');
            $('.navigation li[data-slide="2"]').removeClass('active');
        }
    });

    function goToByScroll(dataslide) {
        htmlbody.animate({
            scrollTop: $('.slide[data-slide="' + dataslide + '"]').offset().top + 1
        }, 2000, 'easeInOutQuint');
    }



    links.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);
    });

    button.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);

    });


	// Sticky Navigation
	$(".menu").sticky({topSpacing:0});

	//DROP menu
	$(".btn_dropdown").click(function () {
		$(".navigation").slideToggle("slow");
	});


	//prettyPhoto
	$("a[rel^='prettyPhoto']").prettyPhoto();

    //Carousel
    jQuery('#mycarousel').jcarousel({
        auto: 1000,
        scroll: 1,
        wrap: 'circular',
        initCallback: mycarousel_initCallback
    });

	//drop_menu();

	sliderHeight();

	mymargtop ();



    var $container = $('.projects');

    $container.isotope({
      itemSelector : '.element'
    });

    var $optionSets = $('#options .option-set'),
        $optionLinks = $optionSets.find('a');

    $optionLinks.click(function(){
      var $this = $(this);
      // don't proceed if already selected
      if ( $this.hasClass('selected') ) {
        return false;
      }
      var $optionSet = $this.parents('.option-set');
      $optionSet.find('.selected').removeClass('selected');
      $this.addClass('selected');

      // make option object dynamically, i.e. { filter: '.my-filter-class' }
      var options = {},
          key = $optionSet.attr('data-option-key'),
          value = $this.attr('data-option-value');
      // parse 'false' as false boolean
      value = value === 'false' ? false : value;
      options[ key ] = value;
      if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
        // changes in layout modes need extra logic
        changeLayoutMode( $this, options )
      } else {
        // otherwise, apply new options
        $container.isotope( options );
      }

      return false;
    });

});

$(window).bind('resize',function() {
	//Update slider height
	sliderHeight();
	mymargtop ();
});

$(window).resize(function(){
	drop_menu();
});



