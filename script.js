jQuery( document ).ready(function() {


  if(jQuery('.single-faq').length) {
    var bodyClasses = jQuery("body").attr("class").split(" ");
    var menuLinks = jQuery("ul.menu li.menu-item a");

    bodyClasses.forEach(function(className) {
      menuLinks.each(function() {
        var menuLink = jQuery(this).attr("href");
        if (menuLink.includes(className)) {
          jQuery(this).parent().addClass("matched-link");
        }
      });
    });


  }


});  

