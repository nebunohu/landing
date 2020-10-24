import './style.scss';
//import 'bootstrap/js/src/carousel';
//import 'bootstrap';
//import './plugins/jquery.jcarousel-core';
//import '../node_modules/jcarousel/dist/jquery.jcarousel-core';
import 'jcarousel/dist/jquery.jcarousel-core';
import 'jcarousel/dist/jquery.jcarousel-pagination';
import 'jcarousel/dist/jquery.jcarousel-control';
import "jcarousel/dist/jquery.jcarousel-autoscroll";

var pageRefs = [];

function highLightMarker() {
    let i;
    for(i = 0; i < pageRefs.length; i++) {
        if (pageRefs[i].active) {
            pageRefs[i].DOM.classList.add('carousel__page-marker_active');
        } else {
            if (pageRefs[i].DOM.classList.contains('carousel__page-marker_active')) {
                pageRefs[i].DOM.classList.remove('carousel__page-marker_active');
            }
        }
    }
}

(function($) {
  function nextPage(pageRefs) {
    let i;
    let next = 0;

    for(i = 0; i < pageRefs.length; i++) {
      if(pageRefs[i].active) {
        pageRefs[i].active = false;
        if(i < pageRefs.length - 1) {
            next = i+1;
        } else {
            next = 0;
        }
      }
    }
    pageRefs[next].active = true;
    highLightMarker();
  }

  $('.carousel__wrapper')
      .on('jcarousel:scrollend', function(event, carousel, target, animate) {
          // "this" refers to the root element
          // "carousel" is the jCarousel instance
          // "target" is the target argument passed to the `scroll` method
          // "animate" is the animate argument passed to the `scroll` method
          //      indicating whether jCarousel was requested to do an animation
          nextPage(pageRefs);
      })
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

  let _pageRefs = Array.from(document.querySelectorAll('.carousel__page-marker'));
  let i;

  for(i = 0; i < _pageRefs.length; i++) {
    let pageRef = {DOM : undefined,
                   active : false};
    pageRef.DOM = _pageRefs[i];
    if(i === 0) {
      pageRef.active = true;
      pageRef.DOM.classList.add('carousel__page-marker_active');
    } else {
      pageRef.active = false;
    }
    pageRefs.push(pageRef);
  }

})(jQuery);

(function pagination() {
  let carouselPagination = document.querySelector('.carousel__pagination');
  //let pageRefs = Array.from(document.querySelectorAll('.carousel__page-marker'));
  let i = 0;

  carouselPagination.addEventListener('click', function(event){
    let currentPageMarker;

    if(event.target.closest('.carousel__page-marker')) {
      currentPageMarker = event.target.closest('.carousel__page-marker');

      for(i = 0; i < pageRefs.length; i++) {
        if(pageRefs[i].active) {
          pageRefs[i].active = false;
          pageRefs[i].DOM.classList.remove('carousel__page-marker_active');
        }
      }
      currentPageMarker.classList.add('carousel__page-marker_active');
      for(i = 0; i < pageRefs.length; i++) {
        if(pageRefs[i].DOM.classList.contains('carousel__page-marker_active')) {
          pageRefs[i].active = true;
        }
      }
    }
  });
})();
