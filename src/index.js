import './style.scss';
import 'bootstrap/js/src/carousel';
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

  $('.carousel_pagination').jcarouselPagination({
    item: function(page) {
        return '<a class="carousel_page-marker" href="#' + page + '">' + '</a>';
    },
    carousel: $('.carousel_wrapper')
  });

  let fullyVisible = $('.carousel_wrapper').jcarousel('fullyvisible')
  console.log(fullyVisible);
  fullyVisible.addClass('visible');
  let items = $('.carousel_wrapper').jcarousel('list');
  console.log(items);
});
