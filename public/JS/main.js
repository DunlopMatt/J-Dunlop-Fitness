$(window).scroll(function() {
    const currentPos = $(window).scrollTop();

    $('.nav-item').each(function() {
    const sectionLink = $(this);
    // capture the height of the navbar
    const navHeight = $('.navbar').outerHeight() + 1;
    const section = $(sectionLink.attr('href'));

    // subtract the navbar height from the top of the section
    if(currentPos > section.position().top - navHeight && currentPos < section.position().top + section.height() ) {
        $('.nav-item').removeClass('active');
        sectionLink.addClass('active');
    }
    });
});

$('.nav-link').click(function(){    
    var divId = $(this).attr('href');
     $('html, body').animate({
      scrollTop: $(divId).offset().top - 85
    }, 500);
  });

  

$('body').scrollspy({ target: 'navbar' });
