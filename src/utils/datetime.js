//通用处理时间戳
function resetTimeStamp(value) {
  if (!value) {
    return {
      year: '',
      month: '',
      day: '',
      hours: '',
      minutes: '',
      seconds: '',
      date: '',
      datetime: ''
    };
  }
  value = value.split('.')[0];
  value = (value + 'Z').replace(/\//g, '-').replace(/[\u4E00-\u9FA5]/g, '').replace(/-(\d+)-(\d+)/, function (all, a, b) {
    /^\d$/.test(a) && (a = '0' + a);
    /^\d$/.test(b) && (b = '0' + b);
    return '-' + a + '-' + b;
  }).replace(/(\d+):(\d+):(\d+)/, function (all, a, b, c) {
    let arrTemp = [];
    /^\d$/.test(a) && (a = '0' + a);
    /^\d$/.test(b) && (b = '0' + b);
    /^\d$/.test(c) && (c = '0' + c);
    arrTemp.push(a, b, c);
    return arrTemp.join(':');
  }).replace(/\d(\s+)\d/, function (all, a) {
    if (/^\s+$/.test(a)) {
      return all.replace(a, 'T');
    }
  }); //强制把时间格式加T
  var dt = new Date(new Date(value).toUTCString().replace('GMT', ''));
  var year = dt.getFullYear();
  var month = parseInt(dt.getMonth()) + 1;
  var day = parseInt(dt.getDate());
  var hours = parseInt(dt.getHours());
  var minutes = parseInt(dt.getMinutes());
  var seconds = parseInt(dt.getSeconds());

  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  return {
    year: year,
    month: month,
    day: day,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    date: year + '-' + month + '-' + day,//传入 2016-07-07T10:27:13  过滤成： 2016-07-07
    datetime: year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds//  时间过滤器完整： 传入 2016-07-07T10:27:13  过滤成： 2016-07-07 10:27:13
  };
}
module.exports = resetTimeStamp;