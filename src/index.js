import './style.scss';
import 'bootstrap/js/src/carousel';
//import 'bootstrap';
//import './plugins/jquery.jcarousel-core';
//import '../node_modules/jcarousel/dist/jquery.jcarousel-core';
import 'jcarousel';

$(function() {
  $('.carousel').jcarousel({
      // Configuration goes here
      //list: $('.carousel_list'),
      //items: '.carousel_item',
      animation: 'slow',
      wrap: 'both',
      vertical: false,
      rtl: true,
  });

  $('.carousel-prev').jcarouselControl({
    target: '-=1',
    carousel: $('.carousel')
  });

  $('.carousel-next').jcarouselControl({
    target: '+=1',
    carousel: $('.carousel')
  });
});
