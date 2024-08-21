// assets/js/functions.js

$(document).ready(() => {
  let canScroll = true, scrollController = null;

  $(this).on('mousewheel DOMMouseScroll', (e) => {
    if (!$('.outer-nav').hasClass('is-vis')) {
      e.preventDefault();
      const delta = e.originalEvent.wheelDelta ? -e.originalEvent.wheelDelta : e.originalEvent.detail * 20;
      if (Math.abs(delta) > 50 && canScroll) {
        canScroll = false;
        clearTimeout(scrollController);
        scrollController = setTimeout(() => canScroll = true, 800);
        updateHelper(delta > 0 ? 1 : -1);
      }
    }
  });

  $('.side-nav li, .outer-nav li').click(function() {
    if (!$(this).hasClass('is-active')) {
      const $this = $(this), curActive = $this.parent().find('.is-active'),
            curPos = $this.parent().children().index(curActive),
            nextPos = $this.parent().children().index($this),
            lastItem = $this.parent().children().length - 1;
      updateNavs(nextPos);
      updateContent(curPos, nextPos, lastItem);
    }
  });

  $('.cta').click(() => {
    const curActive = $('.side-nav').find('.is-active'),
          curPos = $('.side-nav').children().index(curActive),
          lastItem = $('.side-nav').children().length - 1;
    updateNavs(lastItem);
    updateContent(curPos, lastItem, lastItem);
  });

  const mc = new Hammer(document.getElementById('viewport'));
  mc.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
  mc.on('swipeup swipedown', updateHelper);

  $(document).keyup((e) => {
    if (!$('.outer-nav').hasClass('is-vis')) {
      e.preventDefault();
      updateHelper(e);
    }
  });

  function updateHelper(param) {
    const curActive = $('.side-nav').find('.is-active'),
          curPos = $('.side-nav').children().index(curActive),
          lastItem = $('.side-nav').children().length - 1,
          nextPos = param.type === "swipeup" || param.keyCode === 40 || param > 0 ?
                    (curPos !== lastItem ? curPos + 1 : 0) :
                    (curPos !== 0 ? curPos - 1 : lastItem);
    updateNavs(nextPos);
    updateContent(curPos, nextPos, lastItem);
  }

  function updateNavs(nextPos) {
    $('.side-nav, .outer-nav').children().removeClass('is-active')
      .eq(nextPos).addClass('is-active');
  }

  function updateContent(curPos, nextPos, lastItem) {
    $('.main-content').children().removeClass('section--is-active')
      .eq(nextPos).addClass('section--is-active');
    $('.main-content .section').children().removeClass('section--next section--prev');

    if ((curPos === lastItem && nextPos === 0) || (curPos === 0 && nextPos === lastItem)) {
      $('.main-content .section').children().removeClass('section--next section--prev');
    } else if (curPos < nextPos) {
      $('.main-content').children().eq(curPos).children().addClass('section--next');
    } else {
      $('.main-content').children().eq(curPos).children().addClass('section--prev');
    }

    $('.header--cta').toggleClass('is-active', nextPos !== 0 && nextPos !== lastItem);
  }

  function outerNav() {
    $('.header--nav-toggle').click(() => {
      $('.perspective').addClass('perspective--modalview');
      setTimeout(() => $('.perspective').addClass('effect-rotate-left--animate'), 25);
      $('.outer-nav, .outer-nav li, .outer-nav--return').addClass('is-vis');
    });

    $('.outer-nav--return, .outer-nav li').click(() => {
      $('.perspective').removeClass('effect-rotate-left--animate');
      setTimeout(() => $('.perspective').removeClass('perspective--modalview'), 400);
      $('.outer-nav, .outer-nav li, .outer-nav--return').removeClass('is-vis');
    });
  }

  function workSlider() {
    $('.slider--prev, .slider--next').click(function() {
      const $this = $(this), $slider = $('.slider'),
            curLeft = $slider.find('.slider--item-left'),
            curCenter = $slider.find('.slider--item-center'),
            curRight = $slider.find('.slider--item-right'),
            totalWorks = $slider.children().length;

      $slider.animate({ opacity: 0 }, 400, () => {
        if ($this.hasClass('slider--next')) {
          if (curLeft.next().length) {
            curLeft.removeClass('slider--item-left').next().addClass('slider--item-left');
            curCenter.removeClass('slider--item-center').next().addClass('slider--item-center');
            curRight.removeClass('slider--item-right').next().addClass('slider--item-right');
          } else {
            curLeft.removeClass('slider--item-left').siblings().first().addClass('slider--item-left');
            curCenter.removeClass('slider--item-center').next().addClass('slider--item-center');
            curRight.removeClass('slider--item-right').next().addClass('slider--item-right');
          }
        } else {
          if (curLeft.prev().length) {
            curLeft.removeClass('slider--item-left').prev().addClass('slider--item-left');
            curCenter.removeClass('slider--item-center').prev().addClass('slider--item-center');
            curRight.removeClass('slider--item-right').prev().addClass('slider--item-right');
          } else {
            curLeft.removeClass('slider--item-left').siblings().last().addClass('slider--item-left');
            curCenter.removeClass('slider--item-center').prev().addClass('slider--item-center');
            curRight.removeClass('slider--item-right').prev().addClass('slider--item-right');
          }
        }
        $slider.animate({ opacity: 1 }, 400);
      });
    });
  }

  function transitionLabels() {
    $('.work-request--information input').focusout(function() {
      $(this).toggleClass('has-value', $(this).val() !== "");
      window.scrollTo(0, 0);
    });
  }



  outerNav();
  workSlider();
  transitionLabels();
});