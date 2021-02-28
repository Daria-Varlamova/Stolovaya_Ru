 const slider = $('.slider__list').bxSlider({ pager: false, controls: false });
 
 $(".slider__btn--prev").click(e => {
     e.preventDefault();
     slider.goToPrevSlide();
 })

 $(".slider__btn--next").click(e => {
     e.preventDefault();
     slider.goToNextSlide();
 })