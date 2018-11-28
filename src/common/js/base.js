import 'common/css/base.less'
import 'normalize.css'
import { isIE } from 'vendor/utils'
// var deviceWidth
// setHtmlFontSize()

// if (window.addEventListener) {
//   window.addEventListener('resize', function () {
//     setHtmlFontSize()
//   }, false)
// }
// function setHtmlFontSize () {
//   // 1366是设计稿的宽度，当大于1366时采用1366宽度，比例也是除以13.66
//   deviceWidth = document.documentElement.clientWidth > 1920 ? 1920 : document.documentElement.clientWidth
//   document.getElementsByTagName('html')[0].style.cssText = 'font-size:' + deviceWidth / 19.2 + 'px !important'
// }

var winWidth = document.documentElement.offsetWidth ||
  document.body.offsetWidth
winWidth = winWidth < 1366 ? 1366 : winWidth
var oHtml = document.getElementsByTagName('html')[0]
var oBody = document.getElementsByTagName('body')[0]
!isIE ? oHtml.style.fontSize = 100 * winWidth / 1920 + 'px' : oBody.style.fontSize = 100 * winWidth / 1920 + 'px'

if (window.addEventListener) {
  window.addEventListener('resize', function () {
    var winWidth = document.documentElement.offsetWidth || document.body.offsetWidth
    winWidth = winWidth < 1400 ? 1400 : winWidth
    var oHtml = document.getElementsByTagName('html')[0]
    var oBody = document.getElementsByTagName('body')[0]
    !isIE ? oHtml.style.fontSize = 100 * winWidth / 1920 + 'px' : oBody.style.fontSize = 100 * winWidth / 1920 + 'px'
  }, false)
}
