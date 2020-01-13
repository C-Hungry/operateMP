<template>
  <div class="webview">
    <web-view :src="url" @message="onMessage"></web-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        url: "",
        isShare: 0
      };
    },
    methods: {
      onMessage(msg) {
        // 接收网页发过来的消息
        console.log(msg);
      },
      judgeIsLogin() {

      },
    },
    onShow() {
      this.judgeIsLogin();
      //   mpvue.setStorageSync('referrerUrl', `${getUrl.getCurrentPageUrlWithArgs()}&isShare=1`);
      //   this.isShare = this.$root.$mp.query.isShare;
    },
    onLoad() {
      let query = this.$root.$mp.query;
      this.url = query.url;
    },
    onUnload() {},
    onShareAppMessage(options) {

    }
  };

</script>

<style>
</style>
