<template>
  <div class="login-box">
    <div class="login-logo">
      <img class="logo" mode="aspectFit" src="/static/images/logo.png"> </div>
    <div class="login-btn m30 ">
      <button class="btn btn-default block " @click="onSMSLogin" :style="{'border':!isChecked?'none':''}"
        :disabled="!isChecked">
        <i class="iconfont iconshouji"></i>手机短信验证登录</button>
    </div>
    <div class="login-btn m30">
      <button class="btn btn-primary block  mt40" open-type="getPhoneNumber" :disabled="!isChecked"
        @getphonenumber="getPhoneNumber">
        <i class="iconfont iconweixin"></i>微信授权快捷登录</button>
    </div>
    <div class="separation-line text-center w50p" v-if="InvitationCode">
      <span>邀请码：{{InvitationCode}}</span>
    </div>
    <div class="login-text-logo text-light">
      <checkbox-group class="checkbox-group mb15" @change="checkboxChange">
        <label class="checkbox">
          <input type="checkbox" :checked="isChecked">
          <i class="icon"></i>
        </label>
      </checkbox-group>阅读并同意
      <span class="text-primary"
        @click="goUrl('/pages/webview/webviewMain?url=https://hmm.jdhui.com/index.html#/agreement/regAgreement')">
        《会员店注册协议》</span>

    </div>

    <popup-confirm :show.sync="isShowPopup" title="操作提示" btnOKText="去注册" @after-ok="goReg" @after-cancel="goCancel"
      closeAfterClick="true">
      <div class="text-left text-small">
        您的账号还未注册，请先注册
      </div>
    </popup-confirm>
    <popup-confirm :show.sync="isShowStatusPopup" title="操作提示" :btnOKText="popType==3?'联系客服':'知道了'"
      isHideCancelBtn="true" closeAfterClick="true" @after-ok="goCall">
      <div class="text-left text-small">
        {{popMsg}}
      </div>
    </popup-confirm>
    <popup :show.sync="isShowPopupLogin" title="短信验证" btn-text="登录" :is-close-after-confirm="false" :is-login="true"
      @confirm="onConfirm" @close="onClose">
      <div class="login-box">
        <div class="login-input">
          <input type="number" maxlength="11" v-model="objLogin.phone" placeholder="注册或绑定手机号"
            :placeholder-style="placeholderStyle" adjust-position="true" cursor-spacing="100">
        </div>
        <div class="login-input dis-flex">
          <input type="number" maxlength="6" class="check-code" v-model="objLogin.SmsCode" placeholder="短信动态码"
            :placeholder-style="placeholderStyle" adjust-position="true" cursor-spacing="100">
          <span class="code" :class="isGetCodeClicked ? 'disabled': ''" @click="onGetCode">{{codeText}}</span>
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
  import goUrl from "@/utils/goUrl";
  import popup from '@/components/popup.vue';
  import popupConfirm from '@/components/confirm.vue';
  export default {
    data() {
      return {
        url: "",
        isShowPopupLogin: false,
        placeholderStyle: "color: #999",
        codeText: "获取验证码",
        InvitationCode: "",
        InviteType: "",
        loginCode: "",
        isGetCodeClicked: false,
        isConfirmClicked: false,
        isChecked: true,
        isShowPopup: false,
        isShowStatusPopup: false,
        popType: "",
        popMsg: "",
        objLogin: {
          phone: "",
          SmsCode: ""
        },
      };
    },
    components: {
      popup,
      popupConfirm
    },
    methods: {
      goUrl,
      login(callback) {
        mpvue.login({
          success: res => {
            console.log(res);
            this.loginCode = res.code;
            if (typeof callback === "function") {
              callback();
            }
          }
        });
      },
      checkboxChange(e) {
        this.isChecked = e.target.value.length == 1 ? true : false;
      },
      onSMSLogin() {
        // mpvue.navigateTo({
        //   url: `/pages/login/regLogin/regLoginMain?InviteType=${this.InviteType}&InviteCode=${this.InvitationCode}`
        // });
        this.isShowPopupLogin = true;

      },
      getPhoneNumber(e) {
        if (!this.isChecked) {
          mpvue.showTips("必须同意会员注册协议才能登录");
          return false;
        }
        let res = e.target;

        if (!/ok/.test(res.errMsg)) { //拒绝给号
          return;
        }
        // this.login();
        let EncryptedData = res.encryptedData;
        let WeChatIv = res.iv;
        let WeChatCode = this.loginCode;
        mpvue.checkSession({
          // 检查当前code有效期（一般5分钟），正常的话可以解密电话号，如果不正常，提升用户重新点击
          success: () => {
            mpvue.fetchData({
              API: "/api/UserAuth/LoginPusherByWeChatNew",
              para: {
                WeChatCode,
                EncryptedData,
                WeChatIv
              },
              callback: data => {
                if (data.PopType == 0) {
                  let userInfo = JSON.parse(JSON.stringify(data));
                  delete userInfo.token;
                  mpvue.setStorageSync("userInfo", userInfo);
                  mpvue.setStorage({
                    key: "token",
                    data: data.token,
                    success: () => {
                      mpvue.setStorageSync('UserSN', data.UserSN);
                      if (data.LoginType == 1 && data.Status == 1) {
                        wx.switchTab({
                          url: "/pages/index/main"
                        })
                      } else if (data.LoginType == 1 && data.Status == 0) {
                        wx.redirectTo({
                          url: `/pages/login/submitData/submitDataMain?loginType=${data.LoginType}`
                        })
                      } else if (data.LoginType == 1 && (data.Status == 2 || data.Status == 3 || data
                          .Status ==
                          4)) {
                        wx.redirectTo({
                          url: `/pages/login/auditProgress/auditProgressMain?Status=${data.Status}`
                        })
                      } else if (data.LoginType == 0 && data.Status == -1) {
                        wx.redirectTo({
                          url: `/pages/login/payment/paymentMain?PlatformType=${data.OpenPlatFormType}`
                        })
                      } else if (data.LoginType == 0 && data.Status != -1) {
                        wx.redirectTo({
                          url: '/pages/downloadPage/downloadPageMain'
                        })
                      }
                    },
                    fail: () => {
                      // this.isShowPopup = true;
                    }
                  })
                } else {
                  this.isShowStatusPopup = true;
                  this.popType = data.PopType;
                  this.popMsg = data.PopMessage;
                }
              },
              complete: res => {
                if (res.data.ResponseID === -1) {
                  this.login();
                  //  this.isShowPopup = true;
                }
              }
            });
          },
          fail: () => {
            mpvue.showTips({
              title: "授权码已超时，请重新点击按钮",
              icon: "none",
              callback: () => {
                this.login();
              }
            });
          }
        });

      },
      onConfirm() {
        let Phone = this.objLogin.phone;
        let SmsCode = this.objLogin.SmsCode;
        let WeChatCode = this.loginCode;
        if (!Phone) {
          mpvue.showTips({
            title: "请输入手机号",
            icon: "none"
          });
          this.isConfirmClicked = false;
          return false;
        }
        if (!SmsCode) {
          mpvue.showTips({
            title: "请输入验证码",
            icon: "none"
          });
          this.isConfirmClicked = false;
          return false;
        }

        let para = this.objLogin;

        para.WeChatCode = this.loginCode;
        mpvue.checkSession({
          success: () => {
            mpvue.fetchData({
              API: 'api/UserAuth/LoginPusherByPhoneNew',
              para,
              callback: (data) => {
                if (data.PopType == 0) {
                  mpvue.setStorage({
                    key: "token",
                    data: data.token,
                    success: () => {
                      mpvue.setStorageSync('UserSN', data.UserSN);
                      if (data.LoginType == 1 && data.Status == 1) {
                        wx.switchTab({
                          url: "/pages/index/main"
                        })
                      } else if (data.LoginType == 1 && data.Status == 0) {
                        wx.redirectTo({
                          url: `/pages/login/submitData/submitDataMain?loginType=${data.LoginType}`
                        })
                      } else if (data.LoginType == 1 && (data.Status == 2 || data.Status == 3 || data
                          .Status ==
                          4)) {
                        wx.redirectTo({
                          url: `/pages/login/auditProgress/auditProgressMain?Status=${data.Status}`
                        })
                      } else if (data.LoginType == 0 && data.Status == -1) {
                        wx.redirectTo({
                          url: `/pages/login/payment/paymentMain?PlatformType=${data.OpenPlatFormType}`
                        })
                      } else if (data.LoginType == 0 && data.Status != -1) {
                        wx.redirectTo({
                          url: '/pages/downloadPage/downloadPageMain'
                        })
                      }
                    }
                  })
                } else {
                  this.isShowStatusPopup = true;
                  this.popType = data.PopType;
                  this.popMsg = data.PopMessage;
                }
              },
              complete: res => {
                if (res.data.ResponseID === -1 || res.data.ResponseID === 2) {
                  this.login();
                  // this.isShowPopup = true;
                }
              }
            })

          },
          fail: () => {
            mpvue.showTips({
              title: "授权码已超时，请重新点击按钮",
              icon: "none",
              callback: () => {
                this.login();
              }
            });
          }
        })
      },
      onClose() {
        this.objLogin.phone = "";
        this.objLogin.SmsCode = "";
      },
      onGetCode() {
        let Phone = this.objLogin.phone;
        if (!/^1\d{10}$/.test(Phone)) {
          mpvue.showTips({
            title: "请输入正确的手机号",
            icon: "none"
          });
          this.isGetCodeClicked = false;
          return false;
        }
        if (this.isGetCodeClicked) {
          // 防止重复点击
          return false;
        } else {
          this.isGetCodeClicked = true;
        }
        let SystemType = 1;
        let SignNameType = 1;
        // this.countDown();
        mpvue.fetchData({
          //API: "/api/Misc/CityCreateSMSCodeNoPic",
          API:"/api/Misc/CityCreateSMSCodeNoPicNew",
          para: {
            Phone,
            SystemType,
            SignNameType
          },
          callback: data => {
            this.countDown();
          },
          errorCallback: () => {
            this.isGetCodeClicked = false;
          },
          complete: res => {
            if (res.data.ResponseID === 3) {
              this.isShowPopup = true;
            }
          }
        });

      },
      countDown() {
        let num = parseInt(this.codeText) || 60;
        if (num > 1) {
          num--;
          this.codeText = num + "S";
          this.hTimer = setTimeout(() => {
            this.countDown();
          }, 1000);
        } else {
          this.codeText = "获取验证码";
          this.isGetCodeClicked = false;
          if (this.hTimer) {
            clearTimeout(this.hTimer);
          }
        }
      },
      goReg() {
        wx.redirectTo({
          url: `/pages/login/regLogin/regLoginMain?InviteType=${this.InviteType}`
        })
      },
      goCancel() {
        this.isGetCodeClicked = false;
      },
      goCall() {
        if (this.popType == 3) {
          mpvue.makePhoneCall({
            phoneNumber: mpvue.TEL
          });
        }
      }
    },
    onLoad() {
      this.InvitationCode = this.$root.$mp.query.InvitationCode || "";
      this.InviteType = this.$root.$mp.query.InviteType || "5";
      this.isShowPopup = false;
    },
    onShow() {
      this.login();
    },
    onUnload() {
      console.log("unLoad")
      this.objLogin.SmsCode = "";
      this.objLogin.phone = "";
      this.isShowPopupLogin = false;
      this.isShowStatusPopup = false;
      this.codeText = "获取验证码";
      this.isGetCodeClicked = false;
      clearTimeout(this.hTimer);
    }
  };

</script>

<style lang="scss" scoped>
  .login-box {
    margin: 0 20rpx;
    text-align: center;
    box-sizing: border-box;

    .login-logo {
      padding-top: 180rpx;
      margin-bottom: 180rpx;

      .logo {
        height: 220rpx;
      }
    }

    .login-btn {
      .btn {
        font-size: 36rpx;
      }
    }

    .login-text-logo {
      margin-top: 200rpx;

      .logo-text {
        height: 40rpx;
      }
    }

    .login-input {
      text-align: left;
      margin-top: 48rpx;

      input {
        height: 96rpx;
        line-height: 96rpx;
        padding: 0 20rpx;
        background: #f6f6f6;
      }

      .check-code {
        width: 60%;
      }

      .code {
        height: 96rpx;
        line-height: 96rpx;
        padding-right: 20rpx;
        background: #f6f6f6;
        width: 40%;
        color: #666;
        text-align: right;
        font-size: 28rpx;
      }
    }
  }

</style>
