/**
 * 返回距现在时间间隔对象，倒计时去调用方法里调用 setIntevel(()=>fn(d),1000);
 * @date   2018-08-10
 * @author zhao.liubin@zol.com.cn
 * @param  {[date]}
 * @return {},月、日、时分秒钟，及完整的时分秒钟，
 */

var fn = function (d) {
  d = d.replace(/\d(\s+)\d/, function (all, a) {
    if (/^\s+$/.test(a)) {
      return all.replace(a, 'T');
    }
    //console.log(d,"d");
  }).replace(/\//g, '-');
  var objTemp = {
    year: '',
    month: '',
    day: '',
    hour: '',
    minute: '',
    second: '',
    fullTime: '',//完整的时间，年月日时分秒':'分隔
    fullTimeCN: '',//完整的时间，年月日时分秒中文展示
  };

  var f = {
    zero: function (n) {
      var n = parseInt(n, 10);
      if (n > 0) {
        if (n <= 9) {
          n = "0" + n;
        }
        return String(n);
      } else {
        return "00";
      }
    },
    dv: function () {
      d = d || Date.UTC(2050, 0, 1); //如果未定义时间，则我们设定倒计时日期是2050年1月1日
      var future = new Date(new Date(d + 'Z').toUTCString().replace('GMT', '')),
        now = new Date() - 0;
      //现在将来秒差值
      var dur = Math.floor((future - now) / 1000),
        pms = {
          sec: "00",
          minute: "00",
          hour: "00",
          day: "0",
          month: "0",
          year: "0"
        };
        //console.log(dur);
      if (dur > 0) {
        pms.sec = f.zero(dur % 60);
        pms.minute = Math.floor((dur / 60)) > 0 ? f.zero(Math.floor((dur / 60)) % 60) : "00";
        pms.hour = Math.floor((dur / 3600)) > 0 ? f.zero(Math.floor((dur / 3600)) % 24) : "00";
        pms.day = Math.floor((dur / (3600 * 24))) > 0 ? Math.floor((dur / (3600 * 24))) : "00";
        pms.month = Math.floor((dur / (3600 * 24 * 30))) > 0 ? Math.floor((dur / (3600 * 24 * 30))) : "00";
      }
      return pms;
    },
    ui: function () {
      var strFullTime = '';
      var strFullTimeCN = '';
      var strSplit = ':';
      if (f.dv().day > 0) {
        strFullTimeCN += f.dv().day + '天';
        strFullTime += '<span class="item">' + f.dv().day + '</span>' + '天';
      }

      strFullTimeCN += f.dv().hour + '小时';
      strFullTimeCN += f.dv().minute + '分';
      strFullTimeCN += f.dv().sec + '秒';

      strFullTime += '<span class="item">' + f.dv().hour + '</span>' + strSplit;
      strFullTime += '<span class="item">' + f.dv().minute + '</span>' + strSplit;
      strFullTime += '<span class="item">' + f.dv().sec + '</span>';

      objTemp.month = f.dv().month;
      objTemp.day = f.dv().day;
      objTemp.hour = f.dv().hour;
      objTemp.minute = f.dv().minute;
      objTemp.second = f.dv().sec;
      objTemp.fullTime = strFullTime;
      objTemp.fullTimeCN = strFullTimeCN;
      return objTemp;
    }
  };
  return f.ui();
};

module.exports = fn;