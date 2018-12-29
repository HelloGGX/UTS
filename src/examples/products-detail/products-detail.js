import './products-detail.less'
import 'common/js/base'

const ProductsDetail = (function () {
  const VERSION = '1.0.0'

  class ProductsDetail {
    // Getters
    constructor ({ previewMap = [] } = {}) {
      this.previewMap = previewMap
    }
    // 加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
    static get VERSION () {
      return VERSION
    }
    init () {
      this.slider()
      let len = $('.preview-inner').children('.item').length
      let previewWidth = 103 * len
      $('.preview-inner').css('width', previewWidth + 'px')
    }
    slider () {
      $('#myCarousel').carousel('cycle')
      $('.preview-inner').on('click', (e) => {
        let target = e.target.closest('.item')
        this._adjust($(target).attr('data-slide-to'))
      })
      $('#myCarousel').on('slide.bs.carousel', (event) => {
        var $hoder = $('.carousel-container').find('.item')
        var $items = $(event.relatedTarget)
        // getIndex就是轮播到当前位置的索引
        var getIndex = $hoder.index($items)
        $($('.carousel-indicators').find('.item')[getIndex]).addClass('active').siblings().removeClass('active')
        this._adjust(getIndex)
      })
    }
    _adjust (i) {
      const items = Array.from($('.preview-inner').children('.item'))
      const viewportWidth = $('.preview-container').width()
      const tabListWidth = $('.preview-inner').children('.item').length * $(items[0]).outerWidth()
      const minTranslate = Math.min(0, viewportWidth - tabListWidth)
      const middleTranslate = viewportWidth / 2
      let width = 0
      items.every((item, index) => {
        if (index === Number(i)) {
          return false
        }
        width += item.offsetWidth + 4
        return true
      })
      let translate = middleTranslate - width
      translate = Math.max(minTranslate, Math.min(0, translate))
      $('.preview-inner').css({
        'marginLeft': `${translate}px`
      })
    }
  }
  return ProductsDetail
})()

var productsDetail = new ProductsDetail()

$(function () {
  productsDetail.init()
})
