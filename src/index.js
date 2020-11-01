import './style.scss';

let pageRefs = [];
let clicked = false;
let carouselScrollingIntervalID;
let carouselList = document.querySelector('.carousel__list');

function startCarouselScrolling() {
  carouselScrollingIntervalID = setInterval(() => {
    nextPage(true);
    moveCarouselFrame();
  }, 6000);
}

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

function nextPage(nextFlag) {
  let i;
  let next = 0;

  for(i = 0; i < pageRefs.length; i++) {
    if(pageRefs[i].active) {
      pageRefs[i].active = false;
      if(nextFlag) {
        if(i < pageRefs.length - 1) {
          next = i+1;
        } else {
          next = 0;
        }
      } else {
        if(i >  0) {
          next = i-1;
        } else {
          next = pageRefs.length - 1;
        }
      }

    }
  }
  pageRefs[next].active = true;
  highLightMarker();
}

function moveCarouselFrame() {
  //let carouselList = document.querySelector('.carousel__list');
  let carouselWidth = getComputedStyle(document.querySelector('.carousel__wrapper')).width;
  let currentIndex;
  let carouselWidthInt;

  for (let i = 0; i < pageRefs.length; i++) {
    if (pageRefs[i].active) {
      currentIndex = i;
    }
  }
  carouselWidthInt = parseInt(carouselWidth);
  carouselList.style.left = "-" + (carouselWidthInt * currentIndex) + "px";
}

(function pagination() {
  let carousel = document.querySelector('.carousel');
  let carouselItems = Array.from(document.querySelectorAll('.carousel__item'));
  let carouselPagination = document.querySelector('.carousel__pagination');
  let _pageRefs = [];
  //let pageRefs = Array.from(document.querySelectorAll('.carousel__page-marker'));
  let i;

  for(i= 0; i < carouselItems.length; i++) {
    _pageRefs.push(document.createElement('a'));
    _pageRefs[i].classList.add('carousel__page-marker');
    _pageRefs[i].setAttribute('href','#'+i);
    carouselPagination.appendChild(_pageRefs[i]);
  }

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

  carousel.addEventListener('click', function(event){
    let currentPageMarker;

    if(event.target.closest('.carousel__page-marker')) {
      currentPageMarker = event.target.closest('.carousel__page-marker');
      clicked = true;

      clearInterval(carouselScrollingIntervalID);
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
      moveCarouselFrame();
      startCarouselScrolling();
    }
    if(event.target.closest('.carousel__next')) {
      clearInterval(carouselScrollingIntervalID);
      clicked = true;
      nextPage(true);
      moveCarouselFrame();
      startCarouselScrolling();
    }
    if(event.target.closest('.carousel__prev')) {
      clearInterval(carouselScrollingIntervalID);
      clicked = true;
      nextPage(false);
      moveCarouselFrame();
      startCarouselScrolling();
    }
  });
})();

(function () {
  startCarouselScrolling();
})();
