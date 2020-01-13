<template>
  <div class="page bg-gray">
    <div class="page-footer">
      <div class="page-footer-inner dis-flex">
        <span class="btn  btn-primary btn-full text-large item" @click="submit($event)">确认提现</span>
      </div>
    </div>
    <div class="row-item text-small">提现方式</div>
    <div class="bg-white p30">
      <radio-group @change="checkboxChange">
        <div class="flex-sb">
          <div class="item"> <i class="iconfont iconweixinzhifu"></i>微信支付</div>
          <div>
            <label class="checkbox">
              <input type="radio" value="1" checked>
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
          class="w90p text-xx-large text-bold" placeholder-class="text-normal text-middle" :maxlength="withDrawMoney"
          v-model="objData.withdrawMoney" @input="jisuanMoney">
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
        <p class="text-lighter text-x-small">本次提现到账金额：￥{{objData.CurrentFundsAccountMoney || 0}}</p>

      </div>
    </div>
    <div class="split-t-gray bg-white">
      <div class="row-item">
        <div class="row-title">手机号</div>
        <div class="row-content">
          <!-- <input type="text" placeholder="13522212121"> -->
          {{phone}}
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
</template>
<script>
  import goUrl from "@/utils/goUrl";
  export default {
    data() {
      return {
        isGetCodeClicked: false,
        withDrawMoney: "",
        codeText: "获取验证码",
        hTimer: null, // 计时器句柄
        phone: "",
        objData: {
          phone: "",
          withdrawMoney: "",
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
            this.objData.phone = data.Phone;
            this.objData.UserSN = data.UserSN;
            this.objData.CurrentDeductionMoney = 0;
            this.objData.CurrentFundsAccountMoney = 0;
            this.objData.TotalSuccessDeductionMoney = 0;
            this.objData.TotalSuccessWithdrawMoney = 0;
            this.phone = data.Phone.replace(/^(\d{3})(\d{4})(\d{4})$/g, "$1****$3");
          }
        })
      },
      checkboxChange(e) {
        this.objData.withdrawType = e.detail.value;
      },
      jisuanMoney() {
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
        let para = this.objData;
        console.log(this.objData);
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
    onLoad() {
      this.initGetMoney();
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
</style>