//slick carousel function using slick and jquery
$(document).ready(function () {
    $('.carousel-container').slick({
        dots: true,
        arrows: true,
        infinite: true,
        pauseOnHover: true,
        swipe: true,
        swipeToSlide: true,
        cssEase: 'linear',
        autoplaySpeed: 4000,
        autoplay: true,
        aspectRatio: true,
    });
});    