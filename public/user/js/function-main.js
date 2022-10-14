$(document).ready(function(){
	'use trick';
	$('.slick-bestseller').slick({
  dots: false,
  infinite: false,
  speed: 300,
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
  {
      breakpoint: 1600,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: false,
        dots: false
      }
    },
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: false,
        dots: false
      }
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 567,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});
	// ---------slide parent home 1-------------
 $('.info-slider-home1').slick({
 	dots:true,
 	infinite: true,
 	autoplay:true,
	slidesToShow: 1,
	speed: 500,
	fade: true,
	asNavFor: '.slider-home1',
	customPaging : function(slider, i) {
	var thumb = $(slider.$slides[i]).data();
	return '0<a>'+(i+1)+'</a>';
	},
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
      }
    },
    {
      breakpoint: 567,
      settings: {
      	dots:false,
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
      }
    }
  ]
  
  });
 // ---------end-----------
	// ---------slide child home 1-------------
 $('.slider-home1').slick({
 	dots:false,
 	autoplay:true,
    infinite: true,
	centerMode: true,
	centerPadding: '0',
	slidesToShow: 2,
	speed: 500,
	focusOnSelect: true,
	asNavFor: '.info-slider-home1',
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: true,
        
        slidesToShow: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        
        slidesToShow: 1
      }
    }
  ]
  
  });
 // ---------end-----------
 // -----slide comment---------
 $('.slider-comment').slick({
  dots: true,
  infinite: true,
  autoplay:true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  

  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});
 // -----------end------------
 // -----slide similar home 2---------
 $('.slick-similar').slick({
  dots: true,
  infinite: false,
  autoplay:true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  

  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 568,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});
 // -----------end------------
 // -----------scroll top-----------
 $(window).scroll(function(){ 
        if ($(this).scrollTop() > 50) { 
            $('.gotop').removeClass("fade");
            $('.gotop').fadeIn();
             $('#menu-header').addClass('menu-fixed');
             $('.menu-main-home5 ').css('float','unset');
             // --------social fixed------
             $('.social-fixed').css('bottom','50%');
 			// -----end------------
        } else { 
            $('.gotop').fadeOut(); 
             $('#menu-header').removeClass("menu-fixed");
             $('.social-fixed').css('bottom','15px');
             $('.menu-main-home5 ').css('float','right');
        } 
    }); 
    $('.gotop').on("click",function(){ 
        $("html, body").animate({ scrollTop: 0 }, 500); 
        return false; 
    }); 

    // -----------end----------

    // ---------tab filter---------
$(function(){
  	var x = $('.column');
  	var y = $('#btn-selection .btn');
  	var i;
  	for (i = 0; i < x.length; i++) {
  		$('.column').addClass('show');
  	}
  	$('.btn.blazers').on('click',function(){
  		for (i = 0; i < x.length; i++) {
  		$('.column.blazers').addClass('show');
  		$('.column').not('.blazers').removeClass('show');
  		}
  		for (i = 0; i < y.length; i++) {
  		$('.btn.blazers').addClass('active');
  		$('.btn').not('.blazers').removeClass('active');
  		}

  	});
  	$('.btn.jackets').on('click',function(){
  		for (i = 0; i < x.length; i++) {
  		$('.column.jackets').addClass('show');
  		$('.column').not('.jackets').removeClass('show');
  	}
  		for (i = 0; i < x.length; i++) {
  		$('.btn.jackets').addClass('active');
  		$('.btn').not('.jackets').removeClass('active');
  	}
  	});
  	$('.btn.trousers').on('click',function(){
  		for (i = 0; i < x.length; i++) {
  		$('.column.trousers').addClass('show');
  		$('.column').not('.trousers').removeClass('show');
  	}	
  	for (i = 0; i < x.length; i++) {
  		$('.btn.trousers').addClass('active');
  		$('.btn').not('.trousers').removeClass('active');
  	}	
  	});
  	$('.btn.shoes').on('click',function(){
  		for (i = 0; i < x.length; i++) {
  		$('.column.shoes').addClass('show');
  		$('.column').not('.shoes').removeClass('show');
  	}	
  	for (i = 0; i < x.length; i++) {
  		$('.btn.shoes').addClass('active');
  		$('.btn').not('.shoes').removeClass('active');
  	}	
  	});
  	$('.btn.accessories').on('click',function(){
  		for (i = 0; i < x.length; i++) {
  		$('.column.accessories').addClass('show');
  		$('.column').not('.accessories').removeClass('show');
  	}
  	for (i = 0; i < x.length; i++) {
  		$('.btn.accessories').addClass('active');
  		$('.btn').not('.accessories').removeClass('active');
  	}	
  	});
  	$('.btn.all').on('click',function(){
  		for (i = 0; i < x.length; i++) {
  		$('.column').addClass('show');
  		
  	}
  	for (i = 0; i < x.length; i++) {
  		$('.btn.all').addClass('active');
  		$('.btn').not('.all').removeClass('active');
  	}	
  	});
  });
    // ---------end------------
    // -------form search------
    $('#btn-search').on('click',function(){
    	$('.form-search').css('right','0');
    });
    $('#close-search').on('click',function(){
    	$('.form-search').css('right','-1920px');
    });
    // ------------end------------
    // --------form cart----------
    $('#btn-cart').on('click',function(){
    	$('.form-cart').css('right','0');
    	$('.overlay').css('opacity','1').css('visibility','visible');
    });
    $('#close-cart').on('click',function(){
    	$('.form-cart').css('right','-470px');
    	$('.overlay').css('opacity','0').css('visibility','hidden');
    });
    // -------------end----------
    // ------push menu----------
    $(function(){
     var menuLeft = $('.pushmenu-left');
	    var menuHome6 = $('.menu-home5');
	    var nav_list = $('.open-cart');
	    var nav_click = $('.btn-push-menu');
	    nav_list.on("click", function(event) {
	        event.stopPropagation();
	        $(this).toggleClass('active');
	        $('body').toggleClass('pushmenu-push-toright-cart');
	        menuLeft.toggleClass('pushmenu-open');
	        $(".container").toggleClass("canvas-container");
	    });
	    nav_click.on("click", function(event) {
	        event.stopPropagation();
	        $(this).toggleClass('active');
	        $('body').toggleClass('pushmenu-push-toleft');
	        menuHome6.toggleClass('pushmenu-open');
	        $('.menu-mobile-left-content').hide();
	        $('#slide-bar-category').hide();
	    });
	    $(".wrappage").on("click", function() {
	        $(this).removeClass('active');
	        $('body').removeClass('pushmenu-push-toright-cart').removeClass('pushmenu-push-toleft');
	        menuLeft.removeClass('pushmenu-open');
	        menuHome6.removeClass('pushmenu-open');
	    });
	    $(".close-left").on("click", function() {
	        $(this).removeClass('active');
	        $('body').removeClass('pushmenu-push-toright-cart');
	        menuLeft.removeClass('pushmenu-open');
	    });
	    $(".close-left").on("click", function() {
	        $('body').removeClass('pushmenu-push-toleft');
	        menuHome6.removeClass('pushmenu-open');
	    });
	    // Open menu dropdown home 5
	    $(".js-menubar li .icon-sub-menu").on("click", function() {

	        $(this).toggleClass('up-icon');
	        $(this).parent().find(".js-open-menu").slideToggle('fast', function() {
	            $(this).next().stop(true).toggleClass('open', $(this).is(":visible"));
	        });
	    });
	});
    // ----------end-----------
    // ---------slide home 2-------------
 $('.slider-home2').slick({
 	dots:false,
 	autoplay:true,
    infinite: true,
	slidesToShow: 1,
	speed: 1500,
  	fade:true
  });
 // ---------end-----------
 // ---------slide home 3-------------
 $('.slider-home3').slick({
 	dots:false,
 	autoplay:true,
    infinite: true,
	slidesToShow: 1,
	speed: 1500,
  	fade:true
  });
 // ---------end-----------
 // ---------slide home 4-------------
 $('.slider-home4').slick({
 	dots:true,
 	autoplay:false,
 	arrows:true,
    infinite: true,
	slidesToShow: 1,
	speed: 1000,
  	fade:false,
  	customPaging : function(slider, i) {
	var thumb = $(slider.$slides[i]).data();
	return '<a>0'+(i+1)+'<span>_________</span>05</a>';
	},
  });
 // ---------end-----------
 // ---------slide brand-------------
 $('.brand-slider').slick({
 	dots:false,
 	autoplay:true,
    infinite: true,
	slidesToShow: 6,
	speed: 500,
	responsive: [
  
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 567,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
  	
  });
 // ---------end-----------
 // ---------slide brand home 4-------------
 $('.brand-home4').slick({
 	dots:false,
 	autoplay:true,
	speed: 1500,
	slidesPerRow: 6, 
  	rows: 3,
	responsive: [
  
    {
      breakpoint: 1200,
      settings: {
        slidesPerRow: 4, 
  		
      }
    },
    {
      breakpoint: 991,
      settings: {
        slidesPerRow: 3, 
  		rows: 2,
      }
    },
    {
      breakpoint: 567,
      settings: {
        slidesPerRow: 1, 
  		rows: 2,
      }
    },
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
  	
  });
 // ---------end-----------
 // ---------slide home 5-------------
  $('.slider-home5').slick({
 	dots:false,
 	
 	infinite: true,
 	autoplay:false,
	slidesToShow: 1,
	speed: 1500,
	fade: true,
	asNavFor: '.slider-nav-home5',
	
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1
      }
    },
    {
      breakpoint: 567,
      settings: {
        slidesToShow: 1
      }
    }
  ]
  
  });
  // ---------end-----------
  // ---------slide nav home 5-------------
  $('.slider-nav-home5').slick({
 	dots:false,

 	infinite: true,
 	autoplay:false,
	slidesToShow: 2,
	speed: 1500,
	fade: false,
	asNavFor: '.slider-home5',
	
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1
      }
    }
  ]
  
  });
  // ---------end-----------
  // ---------slide  home 6-------------
  $('.slider-home6').slick({
 	dots:false,
 	infinite: true,
 	autoplay:true,
	slidesToShow: 1,
	speed: 1500,
	fade: true,
  });
  // ---------end-----------
  // ---------slide product home 6-------------
 $('.slick-bestseller-home6').slick({
 	dots:false,
 	autoplay:false,
	speed: 1000,
	slidesPerRow: 4, 
  	rows: 2,
	responsive: [
  
    {
      breakpoint: 1200,
      settings: {
        slidesPerRow: 3, 
  		
      }
    },
    {
      breakpoint: 991,
      settings: {
        slidesPerRow: 2, 
      }
    },
    {
      breakpoint: 567,
      settings: {
        slidesPerRow: 1, 
  		rows: 2,
      }
    },
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
  	
  });
 // ---------end-----------
 // -----slide product home 6---------
 $('.slick-newarrival').slick({
  dots: false,
  infinite: false,
  autoplay:false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  

  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 567,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});
 // -----------end------------
 // ---------slide  home 7-------------
  $('.slider-home7').slick({
 	dots:true,
 	infinite: true,
 	autoplay:true,
	slidesToShow: 1,
	speed: 1000,
	fade: true,
	customPaging : function(slider, i) {
	var thumb = $(slider.$slides[i]).data();
	return '<a>0'+(i+1)+'</a>';
	},
  });
  // ---------end-----------
  // ---------slide product home 7-------------
 $('.slick-bestseller-home7').slick({
 	dots:false,
 	autoplay:false,
	speed: 1000,
	slidesPerRow: 5, 
  	rows: 2,
	responsive: [
  	{
      breakpoint: 1600,
      settings: {
        slidesPerRow: 4, 
  		
      }
    },
    {
      breakpoint: 1400,
      settings: {
        slidesPerRow: 3, 
  		
      }
    },
    {
      breakpoint: 991,
      settings: {
        slidesPerRow: 2, 
      }
    },
    {
      breakpoint: 567,
      settings: {
        slidesPerRow: 1, 
  		rows: 2,
      }
    },
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
  	
  });
 // ---------end-----------
 // ------accordion--------
 var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}
// ---------end-----------
// --------sidebar---------
$('.open-sidebar').on('click',function(){
	if($(this).attr('data-click-state') == 0) {
	$(this).attr('data-click-state', 1);
	$('.sidebar').css('right','0').css('opacity','1');
	$('.open-sidebar').css('background','#ee9051').css('transform','translateX(-275px)');;
	$('.open-sidebar i').css('color','#fff').css('transform','rotate(180deg)');
	$('.overlay').addClass('active');
} else {
	$(this).attr('data-click-state', 0);
	$('.sidebar').css('right','-300px').css('opacity','0');
	$('.open-sidebar').css('background','#fff').css('transform','translateX(0)');;
	$('.open-sidebar i').css('color','#ee9051').css('transform','rotate(0)');
	$('.overlay').removeClass('active');
}
});
// ----------end---------
// --------sidebar left---------
$('.open-sidebar-left').on('click',function(){
	if($(this).attr('data-click-state') == 0) {
	$(this).attr('data-click-state', 1);
	$('.sidebar-left').css('left','0').css('opacity','1');
	$('.open-sidebar-left').css('background','#ee9051').css('transform','translateX(275px)');;
	$('.open-sidebar-left i').css('color','#fff').css('transform','rotate(180deg)');
	$('.overlay').addClass('active');
} else {
	$(this).attr('data-click-state', 0);
	$('.sidebar-left').css('left','-300px').css('opacity','0');
	$('.open-sidebar-left').css('background','#fff').css('transform','translateX(0)');;
	$('.open-sidebar-left i').css('color','#ee9051').css('transform','rotate(0)');
	$('.overlay').removeClass('active');
}
});
// ----------end---------
// ------product list--------
$("#btn-list").on("click",function(){
   $(".product").addClass("product-list");
    $("#btn-list").addClass("active");
    $("#btn-grid").removeClass("active");
});
$("#btn-grid").on("click",function(){
   $(".product").removeClass("product-list");
   $("#btn-list").removeClass("active");
   $("#btn-grid").addClass("active");
});
// ----------end---------
// ---------slide product detail-------------
 $('.slick-product-detail').slick({
 	dots:false,
 	infinite: false,
 	autoplay:false,
	slidesToShow: 1,
	speed: 500,
	fade: false,
	asNavFor: '.slick-nav-product-detail',
  });
 // ---------end-----------
	// ---------slide nav product detail-------------
 $('.slick-nav-product-detail').slick({
 	dots:false,
 	autoplay:false,
    infinite: false,
	slidesToShow: 3,
	speed: 500,
	focusOnSelect: true,
	asNavFor: '.slick-product-detail',
  });
 // ---------end-----------
 // ---------slide product vertical detail-------------
 $('.slick-product-detail-vertical').slick({
 	dots:false,
 	infinite: false,
 	autoplay:false,
	slidesToShow: 1,
	speed: 500,
	fade: false,
	asNavFor: '.slick-nav-product-detail-vertical',
  });
 // ---------end-----------
	// ---------slide nav product vertical detail-------------
 $('.slick-nav-product-detail-vertical').slick({
 	dots:false,
 	vertical:true,
 	autoplay:false,
    infinite: false,
	slidesToShow: 3,
	speed: 500,
	focusOnSelect: true,
	asNavFor: '.slick-product-detail-vertical',
  });
 // ---------end-----------
});