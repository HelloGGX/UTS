import './canlendar.less'

const Calendar = (function ($) {
  var eCalendar = function (options, object) {
    // Initializing global variables
    var adDay = new Date().getDate()
    var adMonth = new Date().getMonth()
    var adYear = new Date().getFullYear()
    var dDay = adDay
    var dMonth = adMonth
    var dYear = adYear
    var instance = object

    var settings = $.extend({}, $.fn.eCalendar.defaults, options)

    function lpad (value, length, pad) {
      if (typeof pad === 'undefined') {
        pad = '0'
      }
      var p
      for (var i = 0; i < length; i++) {
        p += pad
      }
      return (p + value).slice(-length)
    }

    var mouseOver = function () {
      $(this).addClass('c-nav-btn-over')
    }
    var mouseLeave = function () {
      $(this).removeClass('c-nav-btn-over')
    }

    var mouseOverEvent = function () {
      $('.c-event-list').scrollTop(0)
      $(this).addClass('c-event-over')
      var d = $(this).attr('data-event-day')
      $('div.c-event-item[data-event-day="' + d + '"]').addClass('c-event-over1')
      $('.c-event-list').scrollTop($('div.c-event-item[data-event-day="' + d + '"]').position().top - $('div.c-event-item[data-event-day="' + d + '"]').height())
    }

    var mouseLeaveEvent = function () {
      $(this).removeClass('c-event-over')
      var d = $(this).attr('data-event-day')
      $('div.c-event-item[data-event-day="' + d + '"]').removeClass('c-event-over1')
    }
    var mouseOverItem = function () {
      $(this).addClass('c-event-over1')
      var d = $(this).attr('data-event-day')
      $('div.c-event[data-event-day="' + d + '"]').addClass('c-event-over')
    }
    var mouseLeaveItem = function () {
      $(this).removeClass('c-event-over1')
      var d = $(this).attr('data-event-day')
      $('div.c-event[data-event-day="' + d + '"]').removeClass('c-event-over')
    }

    var clickitem = function () {
      var d = $(this).attr('data-event-day')
      // $('div.c-event-item[data-event-day="' + d + '"]').siblings().removeAttr('style')
      // $('div.c-event-item[data-event-day="' + d + '"]').css({
      //   'font-weight': '700',
      //   'color': '#ffffff',
      //   'background': '-webkit-linear-gradient(left, #01c2e6 , #1160ff)'
      // })
      // $('div.c-event-item[data-event-day="' + d + '"]').siblings().children().removeAttr('style')
      // $('div.c-event-item[data-event-day="' + d + '"]').children().css('color', 'white')
      // $('div.c-event[data-event-day="' + d + '"]').siblings().removeAttr('style')
      // $('div.c-event[data-event-day="' + d + '"]').css({
      //   'box-shadow': ' 0 0 8px #cccccc',
      //   'font-weight': '700',
      //   'color': '#fff',
      //   'background': '-webkit-linear-gradient(left, #01c2e6 , #1160ff)'
      // })
      $('div.c-event-item[data-event-day="' + d + '"]').addClass('active').siblings().removeClass('active')
      $('div.c-event[data-event-day="' + d + '"]').addClass('active').siblings().removeClass('active')
      settings.callback($('div.c-event-item[data-event-day="' + d + '"]').find('.name').html())
    }

    var nextMonth = function () {
      if (dMonth < 11) {
        dMonth++
      } else {
        dMonth = 0
        dYear++
      }
      print()
      if ($('.c-day').is('.c-today')) {
        $('.c-month-top').html(dYear + '-' + settings.months[dMonth])
        $('.c-month-center').html($('.c-today').text())
        // $(".c-month-bottom").html("有课");
      } else {
        $('.c-month-top').html(dYear)
        $('.c-month-center').html(settings.months[dMonth])
        $('.c-month-bottom').html('')
      }
    }
    var previousMonth = function () {
      if (dMonth > 0) {
        dMonth--
      } else {
        dMonth = 11
        dYear--
      }
      print()
      if ($('.c-day').is('.c-today')) {
        $('.c-month-top').html(dYear + '-' + settings.months[dMonth])
        $('.c-month-center').html($('.c-today').text())
        // $(".c-month-bottom").html("有课");
      } else {
        $('.c-month-top').html(dYear)
        $('.c-month-center').html(settings.months[dMonth])
        $('.c-month-bottom').html('')
      }
    }

    function loadEvents () {
      if (typeof settings.url !== 'undefined' && settings.url !== '') {
        $.ajax({
          url: settings.url,
          async: false,
          success: function (result) {
            settings.events = result
            console.log(settings.events)
          }
        })
      }
    }
    // function mGetDate (year, month) {
    //   var d = new Date(year, month, 0)
    //   return d.getDate()
    // }

    function print () {
      loadEvents()
      var dWeekDayOfMonthStart = new Date(dYear, dMonth, 1).getDay()
      var dLastDayOfMonth = new Date(dYear, dMonth + 1, 0).getDate()
      // var dLastDayOfPreviousMonth = new Date(dYear, dMonth + 1, 0).getDate() - dWeekDayOfMonthStart + 1

      var cBody = $('<div/>').addClass('c-grid')
      var cEvents = $('<div/>').addClass('c-event-grid')
      var cEventsBody = $('<div/>').addClass('c-event-body')
      var cEventsTop = $('<div/>').addClass('c-event-top clearfix')
      cEvents.append($('<div/>').addClass('c-event-title c-pad-top').html(settings.eventTitle))
      cEvents.append(cEventsBody)
      var cNext = $('<div/>').addClass('c-next c-grid-title c-pad-top')
      var cMonth = $('<div/>').addClass('c-month c-grid-title c-pad-top')
      var cPrevious = $('<div/>').addClass('c-previous c-grid-title c-pad-top')
      cPrevious.html(settings.textArrows.previous)

      cNext.html(settings.textArrows.next)

      cPrevious.on('mouseover', mouseOver).on('mouseleave', mouseLeave).on('click', previousMonth)
      cNext.on('mouseover', mouseOver).on('mouseleave', mouseLeave).on('click', nextMonth)

      cEventsTop.append(cPrevious)
      cEventsTop.append(cMonth)
      cEventsTop.append(cNext)
      for (var i = 0; i < settings.weekDays.length; i++) {
        var cWeekDay = $('<div/>').addClass('c-week-day c-pad-top')
        cWeekDay.html(settings.weekDays[i])
        cBody.append(cWeekDay)
      }
      var day = 1
      // var dayOfNextMonth = 1

      for (let i = 0; i < 42; i++) {
        var cDay = $('<div/>')
        if (i < dWeekDayOfMonthStart) {
          cDay.addClass('c-day-previous-month c-pad-top')
          //                  cDay.html(dLastDayOfPreviousMonth++);
        } else if (day <= dLastDayOfMonth) {
          cDay.addClass('c-day c-pad-top')
          if (day === dDay && adMonth === dMonth && adYear === dYear) {
            cDay.addClass('c-today')
            // cDay.html(`<span>今天</span>`)
          }
          for (var j = 0; j < settings.events.length; j++) {
            var d = settings.events[j].datetime
            var price = settings.events[j].price
            if (d.getDate() === day && (d.getMonth() - 1) === dMonth && d.getFullYear() === dYear) {
              cDay.addClass('c-event').attr('data-event-day', d.getDate())
              cDay.attr('data-event-price', price)
              cDay.html(`<span>￥${price}</span>`)
              cDay.on('mouseover', mouseOverEvent).on('mouseleave', mouseLeaveEvent).on('click', clickitem)
            }
            if (d.getDate() === day && d.getMonth() === 0 && dMonth === 11 && (d.getFullYear() - 1) === dYear) {
              cDay.addClass('c-event').attr('data-event-day', d.getDate())
              cDay.attr('data-event-price', price)
              cDay.html(`<span>￥${price}</span>`)
              cDay.on('mouseover', mouseOverEvent).on('mouseleave', mouseLeaveEvent).on('click', clickitem)
            }
          }
          cDay.prepend(day++)
        } else {
          cDay.addClass('c-day-next-month c-pad-top')
          //                  cDay.html(dayOfNextMonth++);
        }
        cBody.append(cDay)
      }
      var eventList = $('<div/>').addClass('c-event-list')
      for (let i = 0; i < settings.events.length; i++) {
        let d = settings.events[i].datetime
        // console.log(d.getMonth(), (d.getMonth() - 1), dMonth)
        if ((d.getMonth() - 1) === dMonth && d.getFullYear() === dYear) {
          let date = lpad(d.getMonth(), 2) + '/' + lpad(d.getDate(), 2) + ' ' + lpad(d.getHours(), 2) + ':' + lpad(d.getMinutes(), 2)
          let item = $('<div/>').addClass('c-event-item')
          let a = $('<a/>').addClass('c-event-item-a').attr('href', settings.events[i].href)
          let title = $('<div/>').addClass('title').html(date + '  ' + settings.events[i].title)
          let 活动描述 = $('<div/>').addClass('name').html(settings.events[i].name)
          item.attr('data-event-day', d.getDate())
          item.on('mouseover', mouseOverItem).on('mouseleave', mouseLeaveItem).on('click', clickitem)

          item.append(a)
          a.append(title).append(活动描述)
          eventList.append(item)
        }
        if (d.getMonth() === 0 && dMonth === 11 && (d.getFullYear() - 1) === dYear) {
          let date = lpad(12, 2) + '/' + lpad(d.getDate(), 2) + ' ' + lpad(d.getHours(), 2) + ':' + lpad(d.getMinutes(), 2)
          let item = $('<div/>').addClass('c-event-item')
          let a = $('<a/>').addClass('c-event-item-a').attr('href', settings.events[i].href)
          let title = $('<div/>').addClass('title').html(date + '  ' + settings.events[i].title)
          let 活动描述 = $('<div/>').addClass('name').html(settings.events[i].name)
          item.attr('data-event-day', d.getDate())
          item.on('mouseover', mouseOverItem).on('mouseleave', mouseLeaveItem).on('click', clickitem)

          item.append(a)
          a.append(title).append(活动描述)
          eventList.append(item)
        }
      }

      $(instance).addClass('calendar')

      cEventsBody.append(eventList)
      $(instance).html(cBody).append(cEvents)
      $(instance).prepend(cEventsTop)
      $('.c-event-item').addClass('clearfix')

      var cMontop = $('<div/>').addClass('c-month-top')
      cMonth.append(cMontop)
      cMontop.html(dYear + '-' + settings.months[dMonth])
      var cMoncenter = $('<div/>').addClass('c-month-center')
      cMonth.append(cMoncenter)
      cMoncenter.html($('.c-today').text())
      var cMonbottom = $('<div/>').addClass('c-month-bottom')
      cMonth.append(cMonbottom)
      if ($('.c-today').is('.c-event')) {
        cMonbottom.html('有产品')
      } else {
        cMonbottom.html(' ')
      }
      $('.recommend').css('marginTop', $('.c-event-list').height() + 'px')
    }

    return print()
  }

  $.fn.eCalendar = function (oInit) {
    return this.each(function () {
      return eCalendar(oInit, $(this))
    })
  }

  // plugin defaults
  $.fn.eCalendar.defaults = {
    // weekDays: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    // months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    weekDays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    months: ['01', '02', '03', '04', '05', '06',
      '07', '08', '09', '10', '11', '12'
    ],
    textArrows: {
      previous: '',
      next: ''
    },
    eventTitle: '',
    url: '',
    events: [],
    callback: function () { }
  }
  return eCalendar
}(window.jQuery))

export default Calendar
