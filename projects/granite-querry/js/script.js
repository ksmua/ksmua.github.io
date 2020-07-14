window.onload = function () {
  var width = document.documentElement.clientWidth;
  // console.log("width for swiper = ", width * 0.9);
  var mySwiper = new Swiper('.swiper-container', {
    direction: 'horizontal',
    loop: true,
    width: width,
    setWrapperSize: true,
  
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  })
};
