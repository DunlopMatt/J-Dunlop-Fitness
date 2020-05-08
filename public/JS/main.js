$(window).scroll(function() {
    let currentPos = $(window).scrollTop();

        $('.nav-item').each(function() {
    let sectionLink = $(this);
    // capture the height of the navbar
    let navHeight = $('.navbar').outerHeight() + 1;
    let section = $(sectionLink.attr('href'));

    // subtract the navbar height from the top of the section
    if(currentPos > section.position().top - navHeight && currentPos < section.position().top + section.height() ) {
        $('.nav-item').removeClass('active');
        sectionLink.addClass('active');
    }
    });
});

$('body').scrollspy({ target: 'navbar' });