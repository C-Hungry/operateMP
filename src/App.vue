<script>
  // if (process.env.NODE_ENV == 'development') { //开发环境
  //   // wx.setStorageSync('APISERVER', 'http://tstapi.jdhui.com.cn/'); //接口地址
  //   // wx.setStorageSync('UPLOADSERVER', 'http://tstpic.jdhui.com.cn/api/UploadFile/UploadFiles'); //上传图片地址

  //   process.env.APISERVER = 'http://tstapi.jdhui.com.cn/';
  //   process.env.UPLOADSERVER = 'http://tstpic.jdhui.com.cn/api/UploadFile/UploadFiles';
  // } else { //正式生产环境
  //   // wx.setStorageSync('APISERVER', 'https://api.jdhui.com/');
  //   // wx.setStorageSync('UPLOADSERVER', 'https://imgapi.jdhui.com/api/UploadFile/UploadFiles'); //上传地下
  //   process.env.APISERVER = 'https://api.jdhui.com/';
  //   process.env.UPLOADSERVER = 'https://imgapi.jdhui.com/api/UploadFile/UploadFiles';
  // }

  import fetchData from "./utils/fetchData.js"; //请求数据
  import showTips from "./utils/showTips.js"; //提示文字
  import datetime from "./utils/datetime.js"; //格式化时间
  export default {
    data() {
      return {}
    },
    created() {
      // 调用API从本地缓存中获取数据
      /*
       * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
       * 微信：mpvue === wx, mpvuePlatform === 'wx'
       * 头条：mpvue === tt, mpvuePlatform === 'tt'
       * 百度：mpvue === swan, mpvuePlatform === 'swan'
       * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
       */

      let logs;
      if (mpvuePlatform === "my") {
        logs = mpvue.getStorageSync({
          key: "logs"
        }).data || [];
        logs.unshift(Date.now());
        mpvue.setStorageSync({
          key: "logs",
          data: logs
        });
      } else {
        logs = mpvue.getStorageSync("logs") || [];
        logs.unshift(Date.now());
        mpvue.setStorageSync("logs", logs);
      }
      mpvue.fetchData = fetchData;
      mpvue.showTips = showTips;
      mpvue.datetime = datetime;
      mpvue.TEL = "4008073818";
      mpvue.UPLOADSERVER = process.env.UPLOADSERVER; //上传服务器
      mpvue.IMGSERVER = 'https://hmm.jdhui.com/new/';
      mpvue.isPopupAd = false; // 全局变量，标识是否已经弹出过广告
      mpvue.menuHeight = `${wx.getMenuButtonBoundingClientRect().height}px`;
      mpvue.menuTop = `${wx.getMenuButtonBoundingClientRect().top}px`;
    },
    log() {
      console.log(`log at:${Date.now()}`);
    }
  };
</script>

<style lang="scss">
  @import "@/SCSS/zErp.scss";

  view,
  label,
  ._span {
    box-sizing: border-box;
  }

  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 200rpx 0;
    box-sizing: border-box;
  }

  /* this rule will be remove */
  * {
    transition: width 2s;
    -moz-transition: width 2s;
    -webkit-transition: width 2s;
    -o-transition: width 2s;
  }
</style>