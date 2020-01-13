/**
 * 获取数据通用方法小程序版
 * @date   2019-03-11
 * @author 
 * @params { url: String, data: Object, hideLoading: Boolean, hideTips: Boolean, callback: Function, handlerMessage: Function, errorCallback: Function, complete: Function, fail: Function }
 * 常用参数url, data, callback, hideLoading 加载提示，hideTips 服务端返回提示，
 * handlerMessage服务端返回消息处理，errorCallback 为了处理错误数据，compltete是不管成功与否都会执行的，谨慎使用，可能会造成重复处理，fail是请求出问题的时候处理，一般处于网络层面，基本不涉及，涉及了处理也没多大用处
 */

function fetchData(arg) {
  let APISERVER = process.env.APISERVER;
  var tokenReal = wx.getStorageSync('token') || '';
  var api = (arg.API || arg.api || '').replace(/\s*/g, '');
  var hideLoading = arg.hideLoading; //隐藏加载动画
  var hideTips = arg.hideTips; //隐藏弹窗提示
  api = /^\//.test(api) ? api.substr(1) : api; //过滤以'/开头的API'
  if (!api) {
    console.warn('需要传入API地址，如：API:"/p/list/"');
    return;
  }
  var baseUrl = APISERVER;
  var finalUrl = baseUrl + api;
  var argPara = arg.para || {};
  var para = Object.assign({
    token: tokenReal
  }, argPara);
  var method = arg.method || 'POST'; // 默认post
  var dataList = [];

  if (!hideLoading) {
    wx.showLoading({
      title: '加载中...'
    });
  }
  var callback = function (data) {
    if (!hideLoading) {
      wx.hideLoading()
    }
    var d = data;
    if (d) {
      switch (parseInt(d.ResponseID)) {
        case 0: {
          if (!hideTips && d.Message) {
            wx.showToast({
              title: d.Message,
              icon: 'success',
              duration: 1500
            });
          }

          //处理服务器返回消息，一般用于登录页面
          if (d.Message && typeof arg.handlerMessage === 'function') {
            arg.handlerMessage(d.Message);
          }
          dataList = d.Data;
          //请求成功执行回执操作callback
          if (typeof arg.callback === 'function') {
            if (dataList == undefined) {
              dataList = '';
            }
            arg.callback(dataList);
          } else {
            // console.warn('callback 需要方法类型，请检查');
          }
          break;
        }
        case 1: {
          //登录状态失效跳转至登录页
          wx.showToast({
            title: d.Message,
            icon: 'none',
            duration: 1500,
            success: function () {
              setTimeout(function () { // 跳转到登录页
                wx.redirectTo({
                  url: '/pages/login/loginMain'
                })
              }, 1000)
            }
          })
          break;
        }
        case 3: {
          break;
        }

        default: {
          if (!hideTips && d.Message) {
            wx.showToast({
              title: d.Message,
              icon: 'none',
              duration: 1500
            })
          }
          //处理服务器返回消息，一般用于登录页面
          if (d.Message && typeof arg.handlerMessage === 'function') {
            arg.handlerMessage(d.Message);
          }
          //请求成功，但可能需要处理错误时回调方法 errorCallbak
          if (typeof arg.errorCallback === 'function') {
            arg.errorCallback(d);
          }
        }
      }
    }
  };
  if (!/http/.test(finalUrl)) {
    wx.showToast({
      title: '接口地址不正确，请调试：' + finalUrl,
      icon: 'none',
      duration: 1500,
      success: function () {}
    })
    return;
  }
  wx.request({
    url: finalUrl,
    method: method,
    headers: {},
    data: para,
    dataType: 'json',
    success: function (res) {
      callback(res.data);
    },
    complete(res) {
      if (typeof arg.complete === 'function') {
        arg.complete(res);
      }
    },
    fail(err) {
      if (typeof arg.fail === 'function') {
        arg.fail(err);
      }
    }
  });
}
export default fetchData;
