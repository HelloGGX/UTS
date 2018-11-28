/**
 * Created by ggx on 18/5/14.
 */
let validateId = function (idCard) {
  let pass = true
  // 15位和18位身份证号码的正则表达式
  let regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
  // 如果通过该验证，说明身份证格式正确，但准确性还需计算
  if (regIdCard.test(idCard)) {
    if (idCard.length === 18) {
      let idCardWi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2] // 将前17位加权因子保存在数组里
      let idCardY = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2] // 这是除以11后，可能产生的11位余数、验证码，也保存成数组
      let idCardWiSum = 0 // 用来保存前17位各自乖以加权因子后的总和
      for (let i = 0; i < 17; i++) {
        idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i]
      }
      let idCardMod = idCardWiSum % 11// 计算出校验码所在数组的位置
      let idCardLast = idCard.substring(17)// 得到最后一位身份证号码
      // 如果等于2，则说明校验码是10，身份证号码最后一位应该是X
      if (idCardMod === 2) {
        if (idCardLast === 'X' || idCardLast === 'x') {

        } else {
          pass = false
        }
      } else {
        // 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
        if (Number(idCardLast) === idCardY[idCardMod]) {

        } else {
          pass = false
        }
      }
    } else {
      pass = false
    }
  } else {
    pass = false
  }
  return pass
}
let otherIdNo = function () {
  return /^\s*[0-9a-zA-Z]{1,20}\s*$/
}
let mobile = function () {
  return /^[1][3,4,5,7,8][0-9]{9}$/
}
let email = function () {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
}
let name = function () {
  return (/^\s*[a-zA-Z]{1,15}\s*$/ || /^\s*[\u4e00-\u9fa5]{1,15}\s*$/)
}
let nameEn = function () {
  return /^\s*[a-zA-Z]{1,50}\s*$/
}
let nickName = function () {
  return (/^\s*[A-Za-z0-9]{1,16}\s*$/ || /^\s*[\u4e00-\u9fa5]{1,16}\s*$/)
}
let loginCode = function () {
  return /^[0-9]{5}$/
}
let cdKey = function () {
  return /^[a-hj-np-zA-HJ-NP-Z1-9]{8}$/
}
let captcha = function () {
  return /^[a-hjkmnp-zA-HJKMNP-Z1-9]{4}$/
}

let password = function () {
  return /^[a-zA-Z0-9]{6,16}$/
}
let validate = {
  id: validateId,
  otherIdNo: otherIdNo,
  name: name,
  nickName: nickName,
  mobile: mobile,
  email: email,
  nameEn: nameEn,
  loginCode: loginCode,
  password: password,
  cdKey: cdKey,
  captcha: captcha
}
export default validate
