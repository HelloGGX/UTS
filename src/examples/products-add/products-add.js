import './products-add.less'
import 'common/js/base'

const ProductsAdd = (function () {
  const VERSION = '1.0.0'

  class ProductsAdd {
    // Getters
    constructor ({ priceIndex = 2, detailIndex = 1 } = {}) {
      this.priceIndex = priceIndex
      this.detailIndex = detailIndex
    }
    // 加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
    static get VERSION () {
      return VERSION
    }
    init () {
      $('#addPrice').on('click', () => {
        this.addPrice()
      })
      $('#addDetail').on('click', () => {
        this.addDetail()
      })
      $(document).on('click', '.del', (e) => {
        this.delPrice(e.currentTarget)
      })
      $(document).on('click', '.btn-detail-del', (e) => {
        this.delDetail(e.currentTarget)
      })
      $('input[name=store]').change((e) => {
        if (e.currentTarget.value === '指定门市') {
          $('#store').show()
        } else {
          $('#store').hide()
        }
      })
    }
    detailTpl (i) {
      return `<tr class="row uts-table-expanded-row">
                <td class="uts-table-title uts-table-detail-title  col-lg-1 col-md-1 col-sm-1">
                  <span>第${i}天</span>
                </td>
                <td class="col-lg-11 col-md-11 col-sm-11">
                  <dl class="row">
                    <dt class="col-lg-1 col-md-1 col-sm-1">区间：</dt>
                    <dd class="col-lg-11 col-md-11 col-sm-11">
                      <div class="uts-form-textarea">
                        <textarea name="qj" placeholder="请输入当天你的区间详情" data-toggle="input" data-vali="notnull" rows="4" class="uts-input input"
                         maxlength="2000"></textarea>
                        <div class="count">
                          <span value="">0/2000</span>
                        </div>
                      </div>
                    </dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-lg-1 col-md-1 col-sm-1">住宿</dt>
                    <dd class="col-lg-5 col-md-5 col-sm-5">
                      <input placeholder="请输入酒店名称" name="zs" type="text" data-toggle="input" data-vali="special,notnull" class="uts-input input">
                    </dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-lg-1 col-md-1 col-sm-1">用餐</dt>
                    <dd class="col-lg-5 col-md-5 col-sm-5">
                      <select name="yc" placeholder="请选择用餐类型" class="uts-input input">
                        <option value="早">早</option>
                        <option value="早中晚">早中晚</option>
                        <option value="早中">早中</option>
                        <option value="早晚">早晚</option>
                        <option value="中">中</option>
                        <option value="中晚">中晚</option>
                        <option value="晚">晚</option>
                      </select>
                    </dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-lg-1 col-md-1 col-sm-1">形程：</dt>
                      <dd class="col-lg-11 col-md-11 col-sm-11">
                        <div class="uts-form-textarea">
                          <textarea name="xcxq" placeholder="请输入当天你的形程的路线详情" data-toggle="input" data-vali="notnull" rows="4" class="uts-input input"
                          maxlength="2000"></textarea>
                          <div class="count">
                            <span value="">0/2000</span>
                          </div>
                        </div>
                      </dd>
                  </dl>
                  <dl class="row">
                    <dd class="col-lg-11 col-md-11 col-sm-11"></div>
                    <dd class="col-lg-1 col-md-1 col-sm-1">
                      <button type="button" class="el-button el-button--danger btn-detail-del">删除</button>
                    </dd>
                  </dl>
                </td>
            </tr>`
    }
    updateDetailIndex () { // 当线路详情增减的时候更新index
      let el = $('.uts-table-detail-title').find('span')
      for (let i = 1; i <= this.detailIndex; i++) {
        let elIndex = i
        $(el[--elIndex]).html(`第${i}天`)
      }
    }
    addDetail () { // 添加路线详情
      ++this.detailIndex
      const tpl = this.detailTpl(this.detailIndex)
      $('#product-detail').append(tpl)
      this.updateDetailIndex()
    }
    delDetail (el) {
      $('#del-price').modal('show')
      $('#del-price-confirm').off().on('click', () => {
        --this.detailIndex
        $(el).parents('.uts-table-expanded-row').remove()
        this.updateDetailIndex()
        $('#del-price').modal('hide')
      })
      // $(e).closest('.uts-table-row').remove()
    }
    priceTpl (index) {
      return `<tr class="uts-table-row uts-pages-forms-style-editable" id="NEW_TEMP_ID_${index}">
                <td class="">
                <span class="uts-table-row-indent" style="padding-left: 0px;"></span>
                  <select name="qt" placeholder="请选择价格类型" class="uts-input input">
                    <option value="婴儿">婴儿</option>
                    <option value="老人">老人</option>
                    <option value="单房差">单房差</option>
                    <option value="环保车">门票索道</option>
                    <option value="其他">其他</option>
                  </select>
                </td>
                <td class="">
                  <input name="qtPrice" placeholder="结算价格" type="text" data-toggle="input" data-vali="number,notnull" class="uts-input input">
                </td>
                <td class=""><span><a class="del" >删除</a></span></td>
              </tr>`
    }
    addPrice () {
      ++this.priceIndex
      const tpl = this.priceTpl(this.priceIndex)
      $('#product-price').append(tpl)
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
