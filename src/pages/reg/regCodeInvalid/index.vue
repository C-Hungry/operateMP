<template>
  <div>
    <div class="text-center m40">
      <div class="auth-image ">
        <img mode="aspectFit" src="/static/images/fail.png">
      </div> 
      <div class="text-muted m30">
        <p style="color:#666">区域分总注册二维码已经失效，请联系平台运营重新生成</p>
      </div>
      
      <div style="margin-top:100rpx">
        <button class="btn  btn-default block"
          @click="goUrl('/pages/login/loginMain')">去登录页</button>
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
        errDesc: "",
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
        title: "二维码失效"
      });
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
