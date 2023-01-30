jQuery(document).ready(function() {



    var swiper = new Swiper('.swiper-step', {
    	loop: true,
    	allowTouchMove: false,
      navigation: {
        nextEl: '.swiper-button-next-step',
        prevEl: '.swiper-button-prev-step',
      },
    });

    var swiper = new Swiper('.swiper-home', {
    	loop: true,
    	allowTouchMove: false,
      navigation: {
        nextEl: '.swiper-button-next-home',
        prevEl: '.swiper-button-prev-home',
      },
    });

    var swiper = new Swiper('.swiper-obj', {
    allowTouchMove: false,
   slidesPerView: 3,
  spaceBetween: 10,
      loop: true,
      breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 5
    },
    // when window width is >= 480px
    768: {
      slidesPerView: 2,
      spaceBetween: 10
    },
    // when window width is >= 640px
    1200: {
      slidesPerView: 3,
      spaceBetween: 15
    }
  },
      navigation: {
        nextEl: '.swiper-button-next-obj',
        prevEl: '.swiper-button-prev-obj',
      },
    });

  


    $(".menu-desk").find("li").on("mouseover", function () {
    $(this).find("a").addClass("active");
});
    $(".menu-desk").find("li").on("mouseout", function () {
    $(this).find("a").removeClass("active");
});


    $( ".call-btn" ).click(function() {
  $(".modal.call").addClass("d-flex");
  $( ".modal.call .modal-form" ).removeClass("d-none");
});

$( ".similar-btn" ).click(function() {
  $(".modal.similar").addClass("d-flex");
  $( ".modal.similar .modal-form" ).removeClass("d-none");
});

    $( ".close" ).click(function() {
  $(this).closest( ".modal" ).removeClass("d-flex");
  $(".thanks").removeClass("active");
});


$("form").submit(function () {
 var formID = $(this).attr('id');
 // Добавление решётки к имени ID
 var formNm = $('#' + formID);	
if(formID == "rasschet-nomod"){

 $(this).hide();
$(this).siblings(".thanks").addClass("active");
 } else if(formID == "request-nomod"){
$(this).hide();
$(this).siblings(".thanks").addClass("active");
 }
 else {
 	$(this).closest( ".modal-form" ).addClass("d-none");
 $(".thanks").addClass("active");
 }
 return false;
 });


//Опросник
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
	
	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
	
	//show the next fieldset
	next_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({
        'transform': 'scale('+scale+')',
        'position': 'absolute'
      });
			next_fs.css({'left': left, 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});
//Опросник


});