import './products-detail.less'
import 'common/js/base'

const ProductsDetail = (function () {
  const VERSION = '1.0.0'

  class ProductsDetail {
    // Getters
    constructor ({ previewMap = [], calendarInfo = [] } = {}) {
      this.previewMap = previewMap
      this.calendarInfo = calendarInfo
    }
    // 加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
    static get VERSION () {
      return VERSION
    }
    getCalendar () {
      this.calendarInfo = [
        {
          disabled: false, // 是否禁选
          selected: true, // 是否选中
          title: '活动标题 1',
          name: '一月十六号的产品', // 名称
          datetime: new Date(2019, 1, 16, 12),
          // href: '#',
          price: 1344
        },
        {
          disabled: false, // 是否禁选
          selected: false, // 是否选中
          datetime: new Date(2019, 1, 17, 12),
          price: 1344,
          title: '活动标题 2',
          // href: '#',
          name: '一月十七号的产品' // 名称
        },
        {
          disabled: false, // 是否禁选
          selected: false, // 是否选中
          datetime: new Date(2019, 1, 15, 12),
          price: 1244,
          title: '活动标题 3',
          // href: '#',
          name: '一月十五号的产品' // 名称
        },
        {
          disabled: false, // 是否禁选
          selected: false, // 是否选中
          datetime: new Date(2019, 1, 27, 17),
          price: 1844,
          title: '活动标题 4',
          // href: '#',
          name: '一月二十七号的产品' // 名称
        },
        {
          disabled: false, // 是否禁选
          selected: false, // 是否选中
          datetime: new Date(2019, 2, 1, 17),
          price: 1844,
          title: '活动标题 5',
          // href: '#',
          name: '二月一号的产品' // 名称
        }
      ]
    }
    init () {
      this.getCalendar()
      this.slider()
      this.Rili()
    }
    slider () { // 幻灯片
      let len = $('.preview-inner').children('.item').length
      let previewWidth = 103 * len
      $('.preview-inner').css('width', previewWidth + 'px')
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
    // _dropdown () { // 选择出行日期下拉框
    //   return $('.dropdown-single').dropdown({
    //     readOnly: true,
    //     searchable: false,
    //     data: this.calendarInfo,
    //     choice: function () {
    //       console.log(this.$select[0].value)
    //     }
    //   }).data('dropdown')
    // }
    Rili () { // 日历显示及配置
    // $('#calendar').eCalendar();
      $('#calendar').eCalendar({
        events: this.calendarInfo,
        callback: function (e) {

        }
      })
    };
  }
  return ProductsDetail
})()

var productsDetail = new ProductsDetail()

$(function () {
  productsDetail.init()
})
