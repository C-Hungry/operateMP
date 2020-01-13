<template>
  <div class="page">
    <div class="login-logo m40 text-center">
      <img class="logo" mode="aspectFit" src="/static/images/logo.png">
    </div>
    <div class="login-form text-large m40">
      <div class="p20 dis-flex flex-center border-bottom-light">
        <i class="iconfont iconxingming"></i>
        <input type="text" maxlength="4" v-model="objLogin.RealName" placeholder="请填写您的真实姓名"
          placeholder-style="color:#ccc" class="w90p" adjust-position="true" cursor-spacing="100">
      </div>
      <div class="p20 dis-flex flex-center border-bottom-light">
        <i class="iconfont iconshoujihao"></i>
        <input type="number" maxlength="11" v-model="objLogin.phone" placeholder="请输入手机号" placeholder-style="color:#ccc"
          adjust-position="true" cursor-spacing="100">
      </div>
      <div class="p20 mt20 dis-flex flex-center border-bottom-light" v-if="objLogin.RoleType == 2">
        <i class="iconfont iconyaoqingma"></i>
        <span>邀您成为区域分总</span>
      </div>
      <div class="p20 mt20 dis-flex flex-center border-bottom-light" v-else>
        <i class="iconfont iconyaoqingma"></i>
        <input type="text" maxlength="8" v-model="objLogin.InvitationCode" placeholder="请输入邀请码(必填)"
          placeholder-style="color:#ccc" adjust-position="true" cursor-spacing="100">
      </div>
      <div class="row-item pt30 text-small text-light">
        <checkbox-group class="checkbox-group mb15" @change="checkboxChange">
          <label class="checkbox">
            <input type="checkbox" :checked="isChecked">
            <i class="icon"></i>
          </label>
        </checkbox-group>
        阅读并同意 <span class="text-primary" v-if="objLogin.openPlatformType==2"
          @click="goUrl('/pages/webview/webviewMain?url=https://shop.jdhui.com/#/regAgreement')">
          《会员店服务协议》
        </span>
        <span class="text-primary" v-else
          @click="goUrl('/pages/webview/webviewMain?url=https://hmm.jdhui.com/index.html#/agreement/regAgreement')">
          《会员店服务协议》</span>
        <span class="text-primary"
          @click="goUrl('/pages/webview/webviewMain?url=https://hmm.jdhui.com/index.html#/agreement/privacy')">
          《隐私协议》</span>
      </div>
      <div class="row-item">
        <button class="btn btn-primary block text-xxx-large" :disabled="!isChecked" @click="onGetCode">获取短信验证</button>
      </div>

    </div>

    <div class="login-text-logo text-lighter">
      联系客服:
      <span @click="onCall()" class="text-primary">400-807-3818 </span>
    </div>
  </div>
</template>

<script>
  import goUrl from "@/utils/goUrl";
  export default {
    data() {
      return {
        objLogin: {
          RealName: "",
          phone: "",
          RoleType: "",
          InvitationCode: "",
          deviceInfo: "",
          PusherGroupId:""
        },
        isChecked: true,
        codeText: "获取验证码",
        loginCode: "",
        hTimer: null, // 计时器句柄
        isGetCodeClicked: false,
        isConfirmClicked: false
      };
    },
    methods: {
      goUrl,
      onGetCode() {
        let Phone = this.objLogin.phone;
        let InvitationCode = this.objLogin.InvitationCode;
        let RoleType = this.objLogin.RoleType;
        if (!/^1\d{10}$/.test(Phone)) {
          mpvue.showTips({
            title: "请输入正确的手机号",
            icon: "none"
          });
          this.isGetCodeClicked = false;
          return false;
        } else if (this.objLogin.RealName == '') {
          mpvue.showTips("请输入真实姓名");
          return;
        } else if (this.objLogin.InvitationCode == '' && this.objLogin.RoleType != 2) {
          mpvue.showTips("请输入邀请码");
          return;
        }

        if (this.isGetCodeClicked) {
          // 防止重复点击
          return false;
        } else {
          this.isGetCodeClicked = true;
        }
        let SystemType = 1;
        let SignNameType = 1;
        mpvue.fetchData({
          API: "/api/RegMng/CityRegRetailerStepBefore",
          para: {
            Phone,
            InvitationCode,
            SystemType,
            SignNameType,
            RoleType
          },
          callback: data => {
            wx.redirectTo({
              url: "/pages/reg/getSmsCode/getSmsCodeMain"
            })
            mpvue.setStorageSync("regInfo", this.objLogin);
          },
          errorCallback: () => {
            this.isGetCodeClicked = false;
          },
        });
      },
      onCall() {
        mpvue.makePhoneCall({
          phoneNumber: mpvue.TEL
        });
      },
      checkboxChange(e) {
        this.isChecked = e.target.value.length == 1 ? true : false;
      },
    },
    onUnLoad() {

    },
    onLoad() {
      this.isGetCodeClicked = false;
      this.objLogin.RealName = "";
      this.objLogin.InvitationCode = this.$root.$mp.query.InvitationCode || "";
      this.objLogin.RoleType = this.$root.$mp.query.InviteType || "";
      this.objLogin.openPlatformType = this.$root.$mp.query.openPlatformType || "";
      this.objLogin.PusherGroupId = this.$root.$mp.query.PusherGroupId || "";
      this.objLogin.phone = ""
    }
  };

</script>
<style lang="scss" scoped>
  .login-logo {
    img {
      height: 200rpx;
    }
  }

  .login-form {
    .iconfont {
      font-size: 36rpx;
      color: #ccc;
      margin-right: 10rpx;
    }

    .code {
      text-align: right;
    }
  }

</style>
