import './style.scss';
//import 'bootstrap/js/src/carousel';
//import 'bootstrap';
//import './plugins/jquery.jcarousel-core';
//import '../node_modules/jcarousel/dist/jquery.jcarousel-core';
import 'jcarousel';

$(function() {
  $('.carousel_wrapper')
      .jcarousel({
          // Configuration goes here
          //list: '.carousel_list',
          //items: '.carousel_item',
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

  $('.carousel_prev').jcarouselControl({
    target: '-=1',
    carousel: $('.carousel_wrapper')
  });

  $('.carousel_next').jcarouselControl({
    target: '+=1',
    carousel: $('.carousel_wrapper')
  });

  /*$('.carousel_pagination').jcarouselPagination({
    item: function(page) {
        return '<a class="carousel_page-marker" href="#' + page + '">' + '</a>';
    },
    carousel: $('.carousel_wrapper')
  });*/

  let fullyVisible = $('.carousel_wrapper').jcarousel('fullyvisible')
  console.log(fullyVisible);
  fullyVisible.addClass('visible');
  let items = $('.carousel_wrapper').jcarousel('list');
  console.log(items);
});

(function pagination() {
  let carouselItems = Array.from(document.querySelectorAll('.carousel_item'));
  let carouselPagination = document.querySelector('.carousel_pagination');
  let pageRefs = Array.from(document.querySelectorAll('.carousel_page-marker'));
  let i = 0;

  if (pageRefs.length) {
    for(i = 0; i < pageRefs.length; i++) {
      carouselPagination.removeChild(document.querySelector('.carousel_page-marker'));
    }
  }
  pageRefs.slice(0, pageRefs.length);
  

  for(i= 0; i < carouselItems.length; i++) {
    pageRefs.push(document.createElement('a'));
    pageRefs[i].classList.add('carousel_page-marker');
    pageRefs[i].setAttribute('href','#'+i);
    carouselPagination.appendChild(pageRefs[i]);
  }



  carouselPagination.addEventListener('click', function(event){
    let currentPageMarker;
    let href;

    if(event.target.closest('.carousel_page-marker')) {
      currentPageMarker = event.target.closest('.carousel_page-marker');
      href = currentPageMarker.getAttribute('href');

    }
  });
})();