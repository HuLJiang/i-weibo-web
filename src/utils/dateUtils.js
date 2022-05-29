/** *日期格式化工具类*** */
const DateUtils = {}

//将当前时间、或时间戳、2019/08/2，转换成yyyy-MM-dd格式，“-”连字符可自定义
DateUtils.formatDate = function (value, fmt) {
  var date
  if (typeof (value) == 'string') {
    value = value.replace(/[-]/g, '/')
    if (value.lastIndexOf('.') != -1) {
      value = value.substring(0, value.lastIndexOf('.'))
    }
  }
  if (value == null || value == '' || value == 'null') {
    return value
  } else {
    if (Number.isInteger(value)) {
      value = Number(value)
    }
    date = new Date(value)
  }

  if (fmt == null || fmt == '' || fmt == 'null') {
    fmt = 'yyyy-MM-dd'
  }
  return date.Format(fmt)
}

//将当前时间、或时间戳，转换成yyyy-MM-dd hh:mm:ss格式，“-”连字符可自定义
DateUtils.formatDateTime = function (value, fmt) {
  var date
  if (typeof (value) == 'string') {
    value = value.replace(/[-]/g, '/')
    value = value.substring(0, value.lastIndexOf('.'))
  }
  if (value == null || value == '') {
    return value
  } else {
    if (Number.isInteger(value)) {
      value = Number(value)
    }
    date = new Date(value)
  }

  if (fmt == null || fmt == '' || fmt == 'null') {
    fmt = 'yyyy-MM-dd hh:mm:ss'
  }
  return date.Format(fmt)
}

// 列表---格式化日期
DateUtils.formatGridDate = function (fmt) {
  return function (value) {
    var text
    try {
      text = DateUtils.formatDate(value, fmt)
    } catch (err) {
      text = value
    }
    return text
  }
}

// 列表---格式化日期时间
DateUtils.formatGridDateTime = function (fmt) {
  return function (value) {
    var text
    try {
      text = DateUtils.formatDate(value, fmt)
    } catch (err) {
      text = DateUtils.formatDate(value, 'yyyy-MM-dd hh:mm:ss')
    }
    return text

  }
}

/**
 * 将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
 * @param str "yyyy-mm-dd HH:MM:ss"格式的日期字符串
 * @returns {Date} Date对象
 */
DateUtils.parse = function (str) {
  let a = str.split(/[^0-9]/)
  return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5])
}

DateUtils.minuteToReadable = function (minute) {
  if (minute === undefined || minute === 0 || minute === 'NaN') {
    return '0分钟'
  }
  let result = ''
  let hour = parseInt(minute / 60)
  if (hour !== 0) {
    result += hour + '小时'
  }
  minute = minute % 60
  result += minute + '分钟'
  return result
}

function isLeapYear(year) {
  return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0)
}

function getMonthDays(year, month) {
  return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (isLeapYear(year) ? 29 : 28)
}

DateUtils.getWeekNumber = function (now) {
  var year = now.getFullYear(),
    month = now.getMonth(),
    days = now.getDate()
  //那一天是那一年中的第多少天
  for (var i = 0; i < month; i++) {
    days += getMonthDays(year, i)
  }

  //那一年第一天是星期几
  var yearFirstDay = new Date(year, 0, 1).getDay() || 7

  var week = null
  if (yearFirstDay == 1) {
    week = Math.ceil(days / yearFirstDay)
  } else {
    days -= (7 - yearFirstDay + 1)
    week = Math.ceil(days / 7) + 1
  }

  return week
}

/** 扩展日期对象的格式化方法 */
Date.prototype.Format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'H+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds()
    // 毫秒
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '')
      .substr(4 - RegExp.$1.length))
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) :
        (('00' + o[k]).substr(('' + o[k]).length)))
  return fmt
}

export default DateUtils
