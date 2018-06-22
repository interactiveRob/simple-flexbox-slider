$(function(){
	var margin = 30;	
	var $slide = $('.slide');
	var $slideshow = $('.slideshow');	
	var count_slides = $slide.length;
	
	function init_slideshow(){
		var win_width = window.innerWidth;		
		
		if(win_width > 500){
			$slide.css('min-width' , win_width * .8);		
		}
		else{
			$slide.css('min-width' , win_width * .7);		
		}
	
		var slideshow_width = $slide.innerWidth() * count_slides + ( (count_slides - 1) * margin);	
		$slideshow.width(slideshow_width);		
	}
	
	init_slideshow();
	
	//set the starting position to show slide 2 in the center
	var initial_offset = ($slide.innerWidth() * .5) + (margin/2);
	$slide.css('right' , - initial_offset); 
	
	//handle resizing
	var isResizing;
	$(window).resize(function(){
		init_slideshow();
		window.clearTimeout( isResizing );

		isResizing = setTimeout(function() {
			nav_slider($('.center-slide span'));		
		}, 250);
	});

	$('nav a').click(function(e){
		e.preventDefault();
		$this = $(this);	
		
		$('nav a').removeClass('active');	
		$this.addClass('active');
		$slide.removeClass('center-slide');
		$slide.eq($this.parent().index()).addClass('center-slide');
		
		nav_slider($this);
	});
	
	function nav_slider(element){
		var el_index = element.parent().index();
		var $target_slide = $slide.eq(el_index);
		var position =  $target_slide.offset().left - $target_slide.parent().offset().left;
		var adjust = ($slide.innerWidth() * 1.5) + margin + (margin/2);
		var movement = position - adjust;
				
		$slide.animate({right: '+=' + movement } , 500);
	}
});

