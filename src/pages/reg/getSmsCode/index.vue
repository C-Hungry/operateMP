<template>
  <div class="page">
    <div>
      <div class="regSmsCode">
        请输入短信验证码
        <div class="text-middle text-lighter mt10">验证码已发送到您的手机{{objRegInfo.phone}}</div>
        <div class="dis-flex smsCode">

          <div class="item" v-for="item in verCodeNumber" :key="index">
            <!-- <input class="w60p text-center text-primary"
              :class="{'on':item.isFocus}" type="number" :focus="item.isFocus" @input="getBlur(index)" maxlength="1"
              v-model="item.value"> -->
            <input :value="inputValue.length>=index+1 ? inputValue[index] :''" class="w60p text-center text-primary"
              disabled @tap="Tap" :class="{'on':inputValue.length>=index+1}" />
          </div>
        </div>
        <input class="hiddenInput" type="number" :maxlength="verCodeNumber" v-model="inputValue" bindinput="Focus"
          :focus="isFocus" @input="!Focus" bindfocus="ceshi"></input>
        <div class="text-lighter text-middle mt30">4位验证码 <span class="fr" @click="onGetCode">{{codeText}}</span></div>
      </div>
      <div class="login-text-logo text-lighter">
        联系客服：
        <span class="text-primary" @click="onCall">400-807-3818 </span>
      </div>
    </div>
    <popup :show.sync="isShowPopupLogin" title="温馨提示" btnOKText="去登录" isHideCancelBtn="true" close-after-click="true"
      @after-ok="goLogin">
      <div class="text-middle ml20  mr20">
        手机号已注册，你可以直接登录
      </div>
    </popup>
  </div>
</template>
<script>
  import popup from "@/components/confirm";
  export default {
    data() {
      return {
        smsCode: "",
        codeText: "",
        loginCode: "",
        isShowPopupLogin: false,
        isGetCodeClicked: true,
        objRegInfo: {},
        verCodeNumber: 4,
        inputValue: "",
        isFocus: true,
      }
    },
    components: {
      popup
    },
    watch: {
      inputValue(newValue) {
        console.log(this.isFocus)
        if (newValue == "") { //为空 关闭键盘 失去焦点
          //    this.isFocus = true
        } else if (newValue.length >= this.verCodeNumber) { //输入完成 关闭键盘 接口校验验证码
          this.isFocus = false
          this.checkCode()
          console.log("输入完成")
        }
      }
    },
    methods: {
      login(callback) {
        mpvue.login({
          success: res => {
            this.loginCode = res.code;
            if (typeof callback === "function") {
              callback();
            }
          }
        });
      },
      initPage() {
        this.inputValue = "";
        this.countDown();
      },
      ceshi(e) {
        console.log(e);
      },
      onCall() {
        mpvue.makePhoneCall({
          phoneNumber: mpvue.TEL
        });
      },
      Focus(e) {
        console.log(e)
      },
      Tap() {
        console.log("tap");
        if (this.isFocus == true) {
          this.isFocus = false
        }
        this.isFocus = true
      },
      countDown() {
        let num = parseInt(this.codeText) || 60;
        if (num > 1) {
          num--;
          this.codeText = num + "秒 后可以重发";
          this.hTimer = setTimeout(() => {
            this.countDown();
          }, 1000);
        } else {
          this.codeText = "重新发送验证码";
          this.isGetCodeClicked = false;
          if (this.hTimer) {
            clearTimeout(this.hTimer);
          }
        }
      },
      goLogin() {
        wx.redirectTo({
          url: `/pages/login/loginMain?InviteType=${this.objRegInfo.RoleType}`
        })
      },
      onGetCode() {
        console.log(this.isGetCodeClicked);
        let Phone = this.objRegInfo.phone;
        if (this.isGetCodeClicked) {
          // 防止重复点击
          return false;
        } else {
          this.isGetCodeClicked = true;
        }
        // this.countDown();
        let SystemType = 1;
        let SignNameType = 1;
        mpvue.fetchData({
          API: "/api/RegMng/CityRegRetailerStepBefore",
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
        });
      },
      checkCode() {
        let para = this.objRegInfo;
        para.SmsCode = this.inputValue;
        para.IsEdit = 0;
        para.WeChatCode = this.loginCode;
        let api = this.objRegInfo.RoleType == 5 ? '' : ''
        console.log(para);
        mpvue.fetchData({
          api: '/api/RegMng/CityRegRetailerStepNew1',
          para,
          callback: (data) => {
            mpvue.setStorage({
              key: "token",
              data: data.token,
              success: () => {
                if (data.PopType == 1) {
                  this.isShowPopupLogin = true;
                } else {
                  mpvue.setStorageSync('UserSN', data.UserSN);
                  if (this.objRegInfo.RoleType == 5) {
                    wx.navigateTo({
                      url: `/pages/login/payment/paymentMain?PlatformType=${this.objRegInfo.openPlatformType}`
                    });
                  } else {
                    wx.navigateTo({
                      url: `/pages/login/submitData/submitDataMain?loginType=${data.LoginType}`
                    });
                  }
                }

              }
            })
          },
          complete: res => {
            if (res.data.ResponseID === -1 || res.data.ResponseID === 2) {
              //this.arrCode[0].isFocus = true;
              // this.smsCode = "";
              // this.arrCode.forEach(el => {
              //   el.value = ""
              // })
              // this.login();
            }
          }
        })

      }
    },
    onShow() {
      this.login();
    },
    onLoad() {
      this.objRegInfo = wx.getStorageSync("regInfo") || '';
      this.initPage();
    },
    onUnLoad() {
      console.log("onUnload")
      clearTimeout(this.hTimer);
    },
  }

</script>
<style lang="scss" scoped>
  .regSmsCode {
    margin: 110rpx 50rpx;
    font-size: 46rpx;

    .smsCode {
      margin-top: 180rpx;
      background: #fff;

      input[disabled] {
        background: #fff !important;
      }

      input {


        border-bottom: 2rpx solid #E1E1E1;

        &.on {
          border-bottom: 2rpx solid #3366FF;
        }
      }
    }
  }


  input[disabled] {
    background: #fff !important;
  }

  .hiddenInput {
    /* display: inline-block; */
    width: 0;
    height: 0;
  }

</style>
