import './style.scss';
import 'bootstrap/js/src/carousel';
//import 'bootstrap';
import './plugins/jquery.jcarousel-core';

$(function() {
  $('.carousel').jcarousel({
      // Configuration goes here
      list: '.carousel_list',
      //items: '.carousel_item',
      animation: 'slow',
      wrap: 'both',
      vertical: false,
      rtl: true
  });
});