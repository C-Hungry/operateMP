<template>
  <div class="page bg-gray">
    <div class="page-footer">
      <div class="page-footer-inner dis-flex">
        <span class="btn  btn-primary btn-full text-large item" @click="submit($event)">确认提现</span>
      </div>
    </div>
    <div class="page-content">
      <div class="row-item text-small">提现方式</div>
      <div class="bg-white p30">
        <radio-group @change="checkboxChange($event)">
          <div class="flex-sb pt15 pb15">
            <div class="item"> <i class="iconfont iconweixinzhifu"></i>微信</div>
            <div>
              <label class="checkbox">
                <input type="radio" value="1" checked>
                <i class="icon"></i>
              </label>
            </div>
          </div>
          <div class="flex-sb border-top-light pt15 pb15">
            <div class="item"> <i class="iconfont iconumidd17"></i>支付宝</div>
            <div>
              <label class="checkbox">
                <input type="radio" value="2">
                <i class="icon"></i>
              </label>
            </div>
          </div>
        </radio-group>
      </div>
      <div class="split-t-gray bg-white pb30">
        <div class="row-item text-bold">提现金额</div>
        <div class="row-item border-bottom-light">
          <span class="text-xxx-large fl">￥</span><input type="digit" placeholder="请输入金额"
            class="w90p text-xx-large text-bold" placeholder-class="text-normal text-middle"
            v-model="objData.withdrawMoney" @blur="jisuanMoney">
        </div>
        <div class="row-item">
          <a class="fr highlight" @click="allWithdraw">全部提现</a>
          当前可提现余额：{{withDrawMoney}}
        </div>
        <div class="row-item row-item bg-gray ml30 mr30">
          <span class="fr text-underline" @click="goUrl('/pages/wallet/withdrawDesc/withdrawDescMain')">提现说明</span>
          <p class="text-lighter text-x-small">
            本月累计提现金额：￥{{objData.TotalSuccessWithdrawMoney || 0}} </p>
          <p class="text-lighter text-x-small">本月累计扣税金额： ￥{{objData.TotalSuccessDeductionMoney || 0}} </p>
          <p class="text-lighter text-x-small">本次提现扣税金额：￥{{objData.CurrentDeductionMoney || 0}}</p>
          <p class="text-lighter text-x-small">本次提现到账金额：￥{{objData.CurrentFundsAccountMoney||0}}</p>

        </div>
      </div>
      <div class="split-t-gray bg-white">
        <div class="row-item" v-if="objData.withdrawType==2">
          <div class="row-title">账号</div>
          <div class="row-content">
            <input type="text" v-model="objData.WithdrawAccount" placeholder-style="color:#999"
              placeholder="请输入你的支付宝账号">
          </div>
        </div>
        <div class="row-item border-top-light" v-if="objData.withdrawType==2">
          <div class="row-title">姓名</div>
          <div class="row-content">
            {{objData.RealName}}
            <span class="fr p5 text-x-small tag-yellow">只能提现到本人支付宝</span>
          </div>
        </div>
        <div class="row-item">
          <div class="row-title">手机号</div>
          <div class="row-content">
            {{repPhone}}
          </div>
        </div>
        <div class="row-item border-top-light">
          <div class="row-title">验证码</div>
          <div class="row-content">
            <span class="fr " :class="isGetCodeClicked ? 'disabled': ''" @click="onGetCode">{{codeText}}</span>
            <input type="text" class="w60p" v-model="objData.phoneCode" placeholder="请输入验证码">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import goUrl from "@/utils/goUrl";
  export default {
    data() {
      return {
        isGetCodeClicked: false,
        CityPusherCashOutMinMoney: "",
        CityPusherCashOutMaxMoney: "",
        withDrawMoney: "",
        accountLimit: "",
        codeText: "获取验证码",
        hTimer: null, // 计时器句柄
        repPhone: "",
        objData: {
          phone: "",
          RealName: "",
          UserSN: "",
          withdrawMoney: "",
          WithdrawAccount: "",
          TotalSuccessWithdrawMoney: "",
          TotalSuccessDeductionMoney: "",
          CurrentFundsAccountMoney: "",
          CurrentDeductionMoney: "",
          WithdrawRemark: "",
          withdrawType: 1,
        }
      }
    },
    methods: {
      goUrl,
      initGetMoney() {
        mpvue.fetchData({
          API: 'api/push/GroundPusherWalletMoney',
          callback: (data) => {
            this.withDrawMoney = data.AccountMoney;
            this.CityPusherCashOutMinMoney = data.CityPusherCashOutMinMoney;
            this.CityPusherCashOutMaxMoney = data.CityPusherCashOutMaxMoney;
            this.objData.phone = data.Phone;
            this.objData.UserSN = data.UserSN;
            this.objData.RealName = data.RealName;
            this.objData.CurrentDeductionMoney = 0;
            this.objData.CurrentFundsAccountMoney = 0;
            this.objData.TotalSuccessDeductionMoney = 0;
            this.objData.TotalSuccessWithdrawMoney = 0;
            this.repPhone = data.Phone.replace(/^(\d{3})(\d{4})(\d{4})$/g, "$1****$3");

          }
        })
      },
      checkboxChange(e) {
        this.objData.withdrawType = e.mp.detail.value;
      },
      jisuanMoney() {
        if (this.objData.withdrawMoney - this.withDrawMoney > 0) {
          mpvue.showTips('提现的金额不能高于可提现的金额')
          return;
        }
        if (this.objData.withdrawMoney < this.CityPusherCashOutMinMoney) {
          mpvue.showTips(`提现的最低金额不能低于${this.CityPusherCashOutMinMoney}元`)
          return;
        }
        if (this.objData.withdrawMoney > this.CityPusherCashOutMaxMoney) {
          mpvue.showTips(`提现的最高金额不能高于${this.CityPusherCashOutMaxMoney}元`)
          return;
        }
        mpvue.fetchData({
          API: 'api/Push/PusherGetCashOutTaxMoney',
          para: {
            CurrentCashOutMoney: this.objData.withdrawMoney
          },
          hideLoading: true,
          callback: (data) => {
            this.objData.CurrentDeductionMoney = data.CurrentDeductionMoney || 0;
            this.objData.CurrentFundsAccountMoney = data.CurrentFundsAccountMoney || 0;
            this.objData.TotalSuccessDeductionMoney = data.TotalSuccessDeductionMoney || 0;
            this.objData.TotalSuccessWithdrawMoney = data.TotalSuccessWithdrawMoney || 0;


          }
        })

      },
      onGetCode() {
        let Phone = this.objData.phone;
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
          API: "/api/Misc/CreateSMSCodeNoPic",
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
      allWithdraw() {
        this.objData.withdrawMoney = this.withDrawMoney
        this.jisuanMoney();
      },
      submit() {
        if (this.objData.withdrawType == 2 && this.objData.WithdrawAccount == '') {
          mpvue.showTips("支付宝账号不能为空");
          return;
        }
        if (this.objData.withdrawMoney < this.CityPusherCashOutMinMoney) {
          mpvue.showTips(`提现的最低金额不能低于${this.CityPusherCashOutMinMoney}元`)
          return;
        }
        if (this.objData.withdrawMoney > this.CityPusherCashOutMaxMoney) {
          mpvue.showTips(`提现的最高金额不能高于${this.CityPusherCashOutMaxMoney}元`)
          return;
        }

        let para = this.objData;

        mpvue.fetchData({
          API: 'api/push/WithdrawApplyAdd',
          para,
          callback: (data) => {
            wx.switchTab({
              url: '/pages/index/wallet/walletMain'
            })
          }
        })
      }
    },
    onUnload() {
      clearTimeout(this.hTimer);
      this.isGetCodeClicked = false;
    },
    onLoad() {
      Object.assign(this.$data, this.$options.data());
      //   this.codeText = "获取验证码";
      this.initGetMoney();
      console.log("onLoad------");
      mpvue.setNavigationBarTitle({
        title: "提现"
      });
    }
  }
</script>
<style lang="scss" scoped>
  .iconweixinzhifu {
    color: #00C800;
  }

  .iconumidd17 {
    color: #00AAEE;
  }

  .tag-yellow {
    background: #FFF6E5;
    color: #FF3A30;
  }
</style>