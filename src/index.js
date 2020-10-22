import './style.scss';
//import 'bootstrap/js/src/carousel';
//import 'bootstrap';
//import './plugins/jquery.jcarousel-core';
//import '../node_modules/jcarousel/dist/jquery.jcarousel-core';
import 'jcarousel/dist/jquery.jcarousel-core';
import 'jcarousel/dist/jquery.jcarousel-pagination';
import 'jcarousel/dist/jquery.jcarousel-control';
import "jcarousel/dist/jquery.jcarousel-autoscroll";

(function($) {
  $('.carousel__wrapper')
      .jcarousel({
          // Configuration goes here
          list: '.carousel__list',
          items: '.carousel__item',
          animation: 'slow',
          wrap: 'both',
          vertical: false,
      })
      .jcarouselAutoscroll({
          interval: 6000,
          target: '+=1',
          autostart: true
      })
  ;

  $('.carousel__prev').jcarouselControl({
    target: '-=1',
    carousel: $('.carousel__wrapper')
  });

  $('.carousel__next').jcarouselControl({
    target: '+=1',
    carousel: $('.carousel__wrapper')
  });

  /*$('.carousel_pagination').jcarouselPagination({
    item: function(page) {
        return '<a class="carousel_page-marker" href="#' + page + '">' + '</a>';
    },
    carousel: $('.carousel_wrapper')
  });*/

  let fullyVisible = $('.carousel__wrapper').jcarousel('fullyvisible')
  console.log(fullyVisible);
  //fullyVisible.addClass('visible');
  let items = $('.carousel__wrapper').jcarousel('list');
  console.log(items);
})(jQuery);

(function pagination() {
  let carouselItems = Array.from(document.querySelectorAll('.carousel__item'));
  let carouselPagination = document.querySelector('.carousel__pagination');
  let pageRefs = Array.from(document.querySelectorAll('.carousel__page-marker'));
  let i = 0;

  if (pageRefs.length) {
    for(i = 0; i < pageRefs.length; i++) {
      carouselPagination.removeChild(document.querySelector('.carousel__page-marker'));
    }
  }
  pageRefs.slice(0, pageRefs.length);
  

  for(i= 0; i < carouselItems.length; i++) {
    pageRefs.push(document.createElement('a'));
    pageRefs[i].classList.add('carousel__page-marker');
    pageRefs[i].setAttribute('href','#'+i);
    carouselPagination.appendChild(pageRefs[i]);
  }

  carouselPagination.addEventListener('click', function(event){
    let currentPageMarker;
    let href;

    if(event.target.closest('.carousel__page-marker')) {
      currentPageMarker = event.target.closest('.carousel__page-marker');
      href = currentPageMarker.getAttribute('href');
      currentPageMarker.classList.add('carousel__page-marker_active');
    }
  });
})();