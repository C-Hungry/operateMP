<template>
  <div>
    <div class="text-center m40 text-large">
      <div class="auth-image ">
        <img mode="aspectFit" src="/static/images/success.png">
      </div>
      <div class=" text-xxx-large text-default mt30 text-bold">注册成功</div>
      <div class=" m30 text-left">
        <p>恭喜您成为{{openPlatFormType==1?'慧买卖':'家电汇'}}会员，请按照以下操作完成认证：
        </p>
        <p>步骤一：点击下方按钮安装{{openPlatFormType==1?'慧买卖':'家电汇'}}；</p>
        <p>步骤二：登录{{openPlatFormType==1?'慧买卖':'家电汇'}}APP(密码请查收短信)；</p>
        <p>步骤三：提交认证资料，成为认证会员；</p>
        <p> 开启店铺新零售经营模式。</p>
      </div>
      <div class="text-primary mt30 w80p divcenter">
        <!-- 登录账号：{{phone}} 密码以短信形式发送，请注意查看 -->
        各个应用市场搜索“{{openPlatFormType==1?'慧买卖':'家电汇'}}”也可安装
      </div>
      <div class="login-text-logo text-lighter">
        联系客服:
        <span @click="onCall()" class="text-primary">400-807-3818 </span>
      </div>
      <div class="mt20">
        <button class="btn btn-primary block"
          @click="goUrl('/pages/workbench/productInstall/productInstallMain')">去下载安装产品</button>
        <button class="btn btn-default block mt20" @click="onLogOut">退出</button>
      </div>
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
        phone: "",
        openPlatFormType: ""
      };
    },
    methods: {
      goUrl,
      onLogOut() {
        mpvue.fetchData({
          API: "api/UserAuth/CityPusherLoginOut",
          callback: data => {
            // 销毁证据
            mpvue.removeStorageSync("userInfo");
            mpvue.removeStorageSync("token");
            wx.redirectTo({
              url: '/pages/login/loginMain'
            })
          }
        });
      },
      onCall() {
        mpvue.makePhoneCall({
          phoneNumber: mpvue.TEL
        });
      },
      getPhone() {
        mpvue.fetchData({
          API: 'api/Push/GroundPusherGetPhoneBySn',
          para: {
            UserSN: this.UserSN
          },
          callback: (data) => {
            this.phone = data.UserName;
          }
        })
      }
    },
    onLoad() {
      mpvue.setNavigationBarTitle({
        title: "注册成功"
      });
      this.UserSN = wx.getStorageSync("UserSN") || this.$root.$mp.query.UserSN || '';
      this.openPlatFormType = this.$root.$mp.query.openPlatFormType || 1;
      this.getPhone();
    },
    onShow() {}
  };

</script>

<style lang="scss" scoped>
  .copyPwd {
    margin-left: 49%;
    border-radius: 8rpx;
  }

  .divcenter {
    margin: 0 auto;
  }

</style>
