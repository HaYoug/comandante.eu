jQuery( document ).ready(function() {



  if (jQuery('.wa-hero-random-text .fl-list .fl-list-item').length) {

    var elements = jQuery('.wa-hero-random-text .fl-list .fl-list-item');
    if (elements.length > 0) {
      var randomIndex = Math.floor(Math.random() * elements.length);
  
      var randomElement = elements.eq(randomIndex);
      randomElement.show();

      var imgElement = randomElement.find('.fl-list-item-content-text img');

      if (imgElement.length > 0) {
        var imgSrc = imgElement.attr('src');
  
        var targetElement = randomElement.closest('.wa-home-hero-big--box').find('.fl-col-content');
        targetElement.css('background-image', 'url(' + imgSrc + ')');
      }


    }

  }



  if (jQuery('.single-product .yith-wapo-container .option-container').length) {
    console.log('test')

    var newLink = jQuery('<a href="#" class="add-class-link">CUSTOMIZE</a>');
    jQuery('.single-product .yith-wapo-container').before(newLink);


    jQuery('.add-class-link').on('click', function(event) {
      event.preventDefault();
      jQuery('.single-product .yith-wapo-container').toggleClass('open');

    });

  }





  changeAttributesSingleProduct();
  if (jQuery('.archive .wc-block-product-categories-list').length) {

    jQuery('.wc-block-product-categories-list--depth-0 > .wc-block-product-categories-list-item a').each(function() {
      if (jQuery(this).siblings().hasClass('wc-block-product-categories-list--depth-1')) {
        jQuery(this).click(function(e) {
          e.preventDefault();

          jQuery(this).siblings('.wc-block-product-categories-list--depth-1').toggleClass('active');
        });
      }
    });
  }


  if (jQuery('.wa_product_shortdescription_readmore').length) {
    jQuery('.wa_product_shortdescription_readmore').click(function() {
      jQuery('.wa_product_shortdescription').toggleClass('active');
      if (jQuery(this).text() ==  'mehr erfahren') {
        jQuery(this).text('schließen');
      } else {
        jQuery(this).text('mehr erfahren');
      }
    });
  }

  jQuery( ".variations_form" ).on( "woocommerce_variation_select_change", function () {
    jQuery('.wa_product_container_wa_price_badges').html(jQuery('.woocommerce-variation-price_badges').html());
    jQuery('.extra_info_price').html(jQuery('.woocommerce-variation-uvp_price').html());
  } );

  jQuery( ".single_variation_wrap" ).on( "show_variation", function ( event, variation ) {
    jQuery('.wa_product_container_wa_price_badges').html(jQuery('.woocommerce-variation-price_badges').html());
    jQuery('.extra_info_price').html(jQuery('.woocommerce-variation-uvp_price').html());
  } );



  if (jQuery('.woocommerce-wishlist .product-name .nobr').length) {
    jQuery('.woocommerce-wishlist .product-name .nobr').text('PRODUKTNAME');
  }

  if (jQuery('.woocommerce-wishlist .product-price .nobr').length) {
    jQuery('.woocommerce-wishlist .product-price .nobr').text('Stückpreis');
  }


  if(jQuery('#wa-bf-grums-box').length) {
    jQuery('#wa-bf-grums-box').click(function() {
      window.location.href = '/hersteller/grums/';
    });
  }




  woocommerceFilter();
  woocommerceCategorieList();
  openCurrentCategory();
  wooCommerceBuyOnceOrSubscriptionText();
  jQuery( '.single_variation_wrap' ).on( 'show_variation', function( event, variation ) {
    changeVariationWeight();
  });
  jQuery( '.variations_form' ).on( 'woocommerce_variation_select_change', function() {
    changeVariationWeight();
  });

  initSlickProductSlider();
});

var woocommerceFilter = function(){
  if(jQuery('.wpc-filter-content').length > 0){
    
    jQuery('.wpc-filter-content option.wpc-term-count-0').remove();
    jQuery('.wpc-filters-section select').each(function(){

      if(jQuery(this).find('option').length <= 1){
        jQuery(this).closest('.wpc-filters-section').hide();
      }
    })
    setTimeout(function(){
      jQuery('.wa_product_filter').addClass('active');
    })
  }
}


var woocommerceCategorieList = function(){
  if(jQuery('.wc-block-product-categories-list').length > 0){
    var pathname = window.location.pathname;
    var origin   = window.location.origin;
    jQuery('.wc-block-product-categories-list a').each(function(){
     var href = jQuery(this).attr('href').split(origin);
     if(pathname == href[1]){
      jQuery(this).parent().addClass('wa_wc-block-product-categories-list-item_current');
     }
     
    })
  

  }

}

function openCurrentCategory() {
  var windowWidth = jQuery(window).width();

  if (windowWidth > 960) {
    if (jQuery('.wa_wc-block-product-categories-list-item_current').length > 0) {
      if (jQuery('.wa_wc-block-product-categories-list-item_current').parent('.wc-block-product-categories-list--depth-2').length > 0) {
        jQuery('.wa_wc-block-product-categories-list-item_current').closest('.wc-block-product-categories-list--depth-1').addClass('active');
      } else if (jQuery('.wa_wc-block-product-categories-list-item_current').parent('.wc-block-product-categories-list--depth-3').length > 0) {
        jQuery('.wa_wc-block-product-categories-list-item_current').closest('.wc-block-product-categories-list--depth-1').addClass('active');
      } else {
        jQuery('.wa_wc-block-product-categories-list-item_current').parent('.wc-block-product-categories-list--depth-1').addClass('active');
      }
    }
  }

}

var changeAttributesSingleProduct = function(){
  if(jQuery('#mahlgrad').val() == 'Ganze Bohne' ){
    jQuery("#mahlart").val('0').change();
    jQuery('#mahlart_field').hide();
  }

  jQuery('#mahlgrad').change(function(){
    if(jQuery(this).val() == 'Ganze Bohne'){
      jQuery("#mahlart").val('0').change();
      jQuery('#mahlart_field').hide();
    }

    if(jQuery(this).val() == 'Gemahlen'){
      jQuery('#mahlart_field').show();
    }

  })
}



var wooCommerceBuyOnceOrSubscriptionText = function(){
  if(jQuery('.bos4w-display-dropdown').length > 0){
    jQuery('.bos4w-display-dropdown').append('<div class="wa_bos4w-display-dropdown"><div class="wa_bos4w-display-dropdown_item">Vertragslaufzeit: unbestimmt</div><div class="wa_bos4w-display-dropdown_item">Mindestlaufzeit: 1 Monat</div><div class="wa_bos4w-display-dropdown_item">Kündigungsfrist: 1 Monat zum Monatsende</div></div>');
  }
}

var changeVariationWeight = function(){
  if(jQuery('.woocommerce-product-attributes-item--weight').length > 0){
    var weight = jQuery('.woocommerce-product-attributes-item--weight .woocommerce-product-attributes-item__value').text();
    jQuery('.wa_product_weight').html('Gewicht: '+weight);
  }
}

var initSlickProductSlider = function(){
 
    if(jQuery('.wa-slick').length > 0){
      jQuery('.wa-slick').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: '<div class="wa-slick_prev"><svg xmlns="http://www.w3.org/2000/svg" width="17" height="31" fill="none"><path d="M16.516 1.585 3.119 15.025l13.397 13.441-1.564 1.559L0 15.025l14.951-15 1.564 1.559z" fill="#ccc"></path></svg></div>',
        nextArrow: '<div class="wa-slick_next"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="31" fill="none"><path d="m.912 1.585 13.397 13.441L.912 28.466l1.565 1.559 14.951-15-14.951-15-1.565 1.56z" fill="#181818"></path></svg></div>',
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 480,
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
    }
  
}

