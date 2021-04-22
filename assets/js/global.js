
$(function() {


	"use strict";

	/*================*/
	/* 01 - VARIABLES */
	/*================*/
	var swipers = [], winW, winH, winScroll, _isresponsive, xsPoint = 767, smPoint = 991, mdPoint = 1199;




	/*=====================*/
	/* 07 - swiper sliders */
	/*=====================*/
	function initSwiper(){
		var initIterator = 0;
		$('.swiper-container').each(function(){								  
			var $t = $(this);								  

			var index = 'swiper-unique-id-'+initIterator;

			$t.addClass('swiper-'+index + ' initialized').attr('id', index);
			$t.find('.pagination').addClass('pagination-'+index);

			var autoPlayVar = parseInt($t.attr('data-autoplay'));
			var centerVar = parseInt($t.attr('data-center'));
			var simVar = ($t.closest('.circle-description-slide-box').length)?false:true;
			var slidesPerViewVar = $t.attr('data-slides-per-view');
			var xsValue, smValue, mdValue, lgValue;
			if(slidesPerViewVar == 'responsive'){
				slidesPerViewVar = 1;
				xsValue = $t.attr('data-xs-slides');
				smValue = $t.attr('data-sm-slides');
				mdValue = $t.attr('data-md-slides');
				lgValue = $t.attr('data-lg-slides');
			}
			else if(slidesPerViewVar != 'auto'){
				slidesPerViewVar = parseInt(slidesPerViewVar);
			}
			var loopVar = parseInt($t.attr('data-loop'));
			var speedVar = parseInt($t.attr('data-speed'));


			swipers['swiper-'+index] = new Swiper('.swiper-'+index,{
				speed: speedVar,
				pagination: '.pagination-'+index,
				loop: loopVar,
				paginationClickable: true,
				autoplay: autoPlayVar,
				slidesPerView: slidesPerViewVar,
				keyboardControl: true,
				calculateHeight: true, 
				simulateTouch: simVar,
				centeredSlides: centerVar,
				onInit: function(swiper){
					if($t.attr('data-slides-per-view')=='responsive') updateSlidesPerView(xsValue, smValue, mdValue, lgValue, swiper);	
					if($t.find('.swiper-slide').length>swiper.params.slidesPerView) $t.removeClass('hide-pagination');
					else $t.addClass('hide-pagination');
				},
				onSlideChangeStart: function(swiper){
					var activeIndex = (loopVar===true)?swiper.activeIndex:swiper.activeLoopIndex;
					if($t.closest('.testimonials-container').length){
						$t.closest('.testimonials-wrapper').find('.testimonials-icons .entry div.active').removeClass('active');
						$t.closest('.testimonials-wrapper').find('.testimonials-icons .entry div').eq(activeIndex).addClass('active');
					}
					if($t.closest('.block.type-10').length){
						$t.closest('.block.type-10').find('.tab-entry.active').removeClass('active');
						$t.closest('.block.type-10').find('.tab-entry').eq(activeIndex).addClass('active');
					}
				},
				onSlideClick: function(swiper){
					if($t.closest('.circle-slide-box').length) swiper.swipeTo(swiper.clickedSlideIndex);
				}
			});
			swipers['swiper-'+index].reInit();
			//swipers['swiper-'+index].resizeFix();
			if($t.find('.default-active').length) swipers['swiper-'+index].swipeTo($t.find('.swiper-slide').index($t.find('.default-active')), 0);

			initIterator++;
		});

		$('.swiper-container.connected-to-bottom-swiper').each(function(){
			var $t = $(this);
			if($t.closest('.block').find('.connected-to-top-swiper').length){
				swipers['swiper-'+$t.attr('id')].addCallback('SlideChangeStart', function(swiper){
					swipers['swiper-'+$t.closest('.block').find('.connected-to-top-swiper').attr('id')].swipeTo(swiper.activeIndex);
				});
			}
		});

	}


	function updateSlidesPerView(xsValue, smValue, mdValue, lgValue, swiper){
		if(winW>mdPoint) swiper.params.slidesPerView = lgValue;
		else if(winW>smPoint) swiper.params.slidesPerView = mdValue;
		else if(winW>xsPoint) swiper.params.slidesPerView = smValue;
		else swiper.params.slidesPerView = xsValue;
	}

	//swiper arrows
	$('.swiper-arrow.left').click(function(){
		swipers['swiper-'+$(this).parent().attr('id')].swipePrev();
	});

	$('.swiper-arrow.right').click(function(){
		swipers['swiper-'+$(this).parent().attr('id')].swipeNext();
	});

	$('.testimonials-arrow.left').click(function(){
		swipers['swiper-'+$(this).closest('.testimonials-wrapper').find('.testimonials-container .swiper-container').attr('id')].swipePrev();
	});

	$('.testimonials-arrow.right').click(function(){
		swipers['swiper-'+$(this).closest('.testimonials-wrapper').find('.testimonials-container .swiper-container').attr('id')].swipeNext();
	});





});