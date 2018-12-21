import './slider.less'

let Slider = (function ($) {
  var $slider = $('.slider')
  var $slideBGs = $('.slide__bg')
  var diff = 0
  var curSlide = 0
  var numOfSlides = $('.slide').length - 1
  var animating = false
  var animTime = 500
  var autoSlideTimeout
  var autoSlideDelay = 6000
  var $pagination = $('.slider-pagi')
  class Slider {
    init () {
      this.createBullets()
      this.autoSlide()
      $(document).on('mousedown touchstart', '.slider', function (e) {
        if (animating) return
        window.clearTimeout(autoSlideTimeout)
        var startX = e.pageX || e.originalEvent.touches[0].pageX

        var winW = $(window).width()
        diff = 0

        $(document).on('mousemove touchmove', function (e) {
          var x = e.pageX || e.originalEvent.touches[0].pageX
          diff = (startX - x) / winW * 70
          if ((!curSlide && diff < 0) || (curSlide === numOfSlides && diff > 0)) diff /= 2
          $slider.css('transform', 'translate3d(' + (-curSlide * 100 - diff) + '%,0,0)')
          $slideBGs.css('transform', 'translate3d(' + (curSlide * 50 + diff / 2) + '%,0,0)')
        })
      })
      $(document).on('mouseup touchend', (e) => {
        $(document).off('mousemove touchmove')
        if (animating) return
        if (!diff) {
          this.changeSlides(true)
          return
        }
        if (diff > -8 && diff < 8) {
          this.changeSlides()
          return
        }
        if (diff <= -8) {
          this.navigateLeft()
        }
        if (diff >= 8) {
          this.navigateRight()
        }
      })
      $(document).on('click', '.slider-control', (e) => {
        if ($(e.currentTarget).hasClass('left')) {
          this.navigateLeft()
        } else {
          this.navigateRight()
        }
      })

      $(document).on('click', '.slider-pagi__elem', (e) => {
        curSlide = $(e.currentTarget).data('page')
        this.changeSlides()
      })
    }
    createBullets () {
      for (var i = 0; i < numOfSlides + 1; i++) {
        var $li = $("<li class='slider-pagi__elem'></li>")
        $li.addClass('slider-pagi__elem-' + i).data('page', i)
        if (!i) $li.addClass('active')
        $pagination.append($li)
      }
    }
    manageControls () {
      $('.slider-control').removeClass('inactive')
      if (!curSlide) $('.slider-control.left').addClass('inactive')
      if (curSlide === numOfSlides) $('.slider-control.right').addClass('inactive')
    }
    autoSlide () {
      autoSlideTimeout = setTimeout(() => {
        curSlide++
        if (curSlide > numOfSlides) curSlide = 0
        this.changeSlides()
      }, autoSlideDelay)
    }
    changeSlides (instant) {
      if (!instant) {
        animating = true
        this.manageControls()
        $slider.addClass('animating')
        $slider.css('top')
        $('.slide').removeClass('active')
        $('.slide-' + curSlide).addClass('active')
        setTimeout(function () {
          $slider.removeClass('animating')
          animating = false
        }, animTime)
      }
      window.clearTimeout(autoSlideTimeout)
      $('.slider-pagi__elem').removeClass('active')
      $('.slider-pagi__elem-' + curSlide).addClass('active')
      $slider.css('transform', 'translate3d(' + -curSlide * 100 + '%,0,0)')
      $slideBGs.css('transform', 'translate3d(' + curSlide * 50 + '%,0,0)')
      diff = 0
      this.autoSlide()
    }
    navigateLeft () {
      if (animating) return
      if (curSlide > 0) curSlide--
      this.changeSlides()
    }
    navigateRight () {
      if (animating) return
      if (curSlide < numOfSlides) curSlide++
      this.changeSlides()
    }
  }
  return Slider
})($)

let slider = new Slider()
slider.init()
