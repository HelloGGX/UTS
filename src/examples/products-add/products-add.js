import './products-add.less'
import 'common/js/base'

const ProductsAdd = (function () {
  const VERSION = '1.0.0'

  class ProductsAdd {
    // Getters
    constructor ({ priceIndex = 0 } = {}) {
      this.priceIndex = priceIndex
    }
    // 加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
    static get VERSION () {
      return VERSION
    }
    init () {
      $('.dropdown-single').dropdown({
        readOnly: true,
        searchable: false,
        choice: function () {
          console.log(this.$select[0].value)
        }
      })
      $('#addPrice').on('click', () => {
        this.addPrice()
      })
      $(document).on('click', '.del', (e) => {
        this.delPrice(e.currentTarget)
      })
    }
    // initPricePopover (el) {
    //   $(el).popover({
    //     container: 'body',
    //     selector: '.del',
    //     html: true,
    //     content: `<div class="uts-popover-inner-content">
    //         <div class="uts-popover-message">
    //         <i class="utsicon fa fa-exclamation-circle">
    //         </i>
    //         <div class="uts-popover-message-title">是否要删除此行？</div>
    //         </div>
    //         <div class="uts-popover-buttons">
    //           <button type="button" class="el-button el-button--mini">
    //             <span>取 消</span>
    //           </button>
    //           <button type="button" class="el-button el-button--mini">
    //             <span>确 定</span>
    //           </button>
    //         </div>
    //     </div>`
    //   })
    // }
    priceTpl (index) {
      return `<tr class="uts-table-row uts-pages-forms-style-editable" id="NEW_TEMP_ID_${index}">
                <td class="">
                <span class="uts-table-row-indent" style="padding-left: 0px;"></span>
                <input placeholder="价格类型" type="text" data-toggle="input" data-vali="special,notnull" class="uts-input input">
                </td>
                <td class="">
                  <input placeholder="结算价格" type="text" data-toggle="input" data-vali="number,notnull" class="uts-input input">
                </td>
                <td class=""><span><a class="del" >删除</a></span></td>
              </tr>`
    }
    addPrice () {
      ++this.priceIndex
      const tpl = this.priceTpl(this.priceIndex)
      $('.uts-table-tbody').append(tpl)
    }
    delPrice (el) {
      $('#del-price').modal('show')
      $('#del-price-confirm').off().on('click', () => {
        $(el).parents('.uts-table-row').remove()
        $('#del-price').modal('hide')
      })
      // $(e).closest('.uts-table-row').remove()
    }
  }
  return ProductsAdd
})()

var productsadd = new ProductsAdd()

$(function () {
  productsadd.init()
})
