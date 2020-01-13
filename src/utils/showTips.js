/*
* 封装showToast
* @params { title: String, icon: ['success'|'loading'|'error'|'none'], duration: Number, mask: Boolean, callback: Function }
* icon原生只支持success，loading，none，当传入error的时候需要定义下image图片不能为空，title字段长度默认为7个，原生只有在icon为none的时候换行显示，长度可以大于7，原生写的是14个，实际可能不一致
*/
function showTips(title = '', duration, mask = false, callback) {
  if (typeof title === 'string') {
    wx.showToast({
      title: title,
      icon: 'none',
      duration: duration || 1500,
      mask: mask,
      success: typeof callback === 'function' ? callback : function () { }
    });
  }
  if (typeof title === 'object' && arguments.length === 1) {
    let objBase = {
      title: '',
      icon: 'none',
      duration: 1500,
      mask: false,
      callback: function () { }
    };
    let objArg = Object.assign(objBase, title);
    wx.showToast({
      title: objArg.title,
      icon: objArg.icon,
      duration: objArg.duration,
      mask: objArg.mask,
      success: objArg.callback
    });
  }
}
export default showTips;