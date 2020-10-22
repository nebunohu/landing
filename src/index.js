//import './style.scss';
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

  $('.carousel__pagination').jcarouselPagination({
    item: function(page) {
        return '<a class="carousel__page-marker" href="#' + page + '">' + '</a>';
    },
    carousel: $('.carousel__wrapper')
  });

  let firstPageRef = document.querySelector('.carousel__page-marker');
  firstPageRef.classList.add('carousel__page-marker_active');

})(jQuery);

(function pagination() {
  let carouselPagination = document.querySelector('.carousel__pagination');
  let pageRefs = Array.from(document.querySelectorAll('.carousel__page-marker'));
  let i = 0;

  carouselPagination.addEventListener('click', function(event){
    let currentPageMarker;

    if(event.target.closest('.carousel__page-marker')) {
      currentPageMarker = event.target.closest('.carousel__page-marker');
      
      for(i = 0; i < pageRefs.length; i++) {
        if(pageRefs[i].classList.contains('carousel__page-marker_active')) {
          pageRefs[i].classList.remove('carousel__page-marker_active');
        }
      }
      currentPageMarker.classList.add('carousel__page-marker_active');
    }
  });
})();
