<template>
  <div>
    <div class="text-center m40">
      <div class="auth-image ">
        <img mode="aspectFit" src="/static/images/fail.png">
      </div>
      <div class=" text-xxx-large text-default mt30 text-bold">支付失败</div>
      <div class="text-muted m30">
        <p>{{errReason}}
        </p>
      </div>

      <div class="mt30">
        <button class="btn  btn-primary block"
          @click="goUrl('/pages/login/payment/paymentMain?UserSN='+UserSN+'&PlatformType='+PlatformType)">重新支付</button>
      </div>
      <div class="mt30">
        <button class="btn  btn-default block"
          @click="goUrl('/pages/login/payment/paymentMain?UserSN='+UserSN+'&PlatformType='+PlatformType)">返回</button>
      </div>

    </div>
    <div class="login-text-logo text-lighter">
      联系客服:
      <span class="text-primary" @click="onCall">400-807-3818 </span>
    </div>
  </div>
</template>

<script>
  import goUrl from "@/utils/goUrl";
  export default {
    data() {
      return {
        errReason: "",
        errDesc: "",
        PlatformType: "",
      };
    },
    methods: {
      goUrl,
      onCall() {
        mpvue.makePhoneCall({
          phoneNumber: mpvue.TEL
        });
      }
    },
    onLoad() {
      mpvue.setNavigationBarTitle({
        title: "付款失败"
      });
      this.errReason = this.$root.$mp.query.message || '公众号配置不正确或取消支付';
      this.UserSN = wx.getStorageSync("UserSN") || this.$root.$mp.query.UserSN || '';
      this.PlatformType = this.$root.$mp.query.PlatformType || 1;
      this.errDesc = this.$root.$mp.query.des;
    },
    onShow() {}
  };

</script>

<style lang="scss" scoped>
  .copyPwd {
    margin-left: 49%;
    border-radius: 8rpx;
  }

</style>
