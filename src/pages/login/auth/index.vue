<template>
  <div class="page text-center">
    <div class="authContent ">
      <div class="text-primary"><i class="iconfont iconchenggong"></i></div>
      <div class="mt30">提交成功</div>
      <div>认证资料提交成功，点击下方按钮，立即登录</div>
    </div>
    <div class="authBtn w60p"><button class="btn btn-primary block"
        @click="goUrl('/pages/login/loginMain')">立即登录</button></div>
  </div>
</template>
<script>
  import goUrl from "@/utils/goUrl";
  export default {
    data() {
      return {

      }
    },
    methods: {
      goUrl
    },
  }

</script>
<style lang="scss" scoped>
  .authContent {
    padding-top: 172rpx;

    .iconfont {
      font-size: 100rpx;
    }
  }

  .authBtn {
    margin: 0 auto;
    margin-top: 290rpx;
  }

</style>
