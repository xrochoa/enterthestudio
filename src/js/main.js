(function() {

    var toggleButton = $('.toggle-btn');

    function showToggleButton() {
        if ($(window).width() < 768) {
            toggleButton.css('display', 'block');
        } else {
            toggleButton.css('display', 'none');
        }
    }

    //on load
    showToggleButton();
    $('.main-nav a').addClass('animate');

    //on resize
    $(window).resize(function() {
        showToggleButton();
    });

    //on click
    toggleButton.click(function() {
        $('.main-nav').toggleClass('open');
    })


})();