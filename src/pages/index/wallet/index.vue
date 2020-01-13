<template>
  <div class="page bg-gray">
    <div class="split-t-gray bg-white flex-sb p30 border-bottom-light">
      <div>
        <div>可提现佣金(元)</div>
        <div class="font-size48 text-danger">{{objData.AccountMoney}}</div>
      </div>
      <span class="text-right btn-tx" @click="goUrl('/pages/wallet/yongjinView/yongjinViewMain')">
        查看
      </span>
    </div>
    <div class="dis-flex bg-white border-top-light">
      <div class="item border-right-light p30" @click="showPopupInfo">
        <div class="text-lighter">预估算收益(元) <i style="font-size: 32rpx"
            class="text-small iconfont text-primary iconguanyuwomen"></i>
        </div>
        <div class="text-xxx-large">{{objData.PredictionInCome}}</div>
      </div>
      <div class="item pl30 p30">
        <div class="text-lighter">累计收益(元)</div>
        <div class="text-xxx-large">{{objData.PersonTotalIncome}}</div>
      </div>
    </div>
    <div class="split-t-gray bg-white text-large">
      <div class="p30 border-bottom-light">
        <a @click="goUrl('/pages/wallet/incomeList/incomeListMain')" class="anchor-row">
          <i class="iconfont iconshouzhimingxi"></i> 收支明细
        </a>
      </div>
      <div class="p30 border-bottom-light">
        <a href="" class="anchor-row" @click="goUrl('/pages/wallet/withdrawRecord/withdrawRecordMain')">
          <i class="iconfont icontixianjilu"></i> 提现记录
        </a>
      </div>
      <div class="p30 border-bottom-light">
        <a href="" class="anchor-row" @click="goUrl('/pages/wallet/openAccountDetail/openAccountDetailMain')">
          <i class="iconfont iconkaihujianglimingxi"></i> 开户/续费奖励明细
        </a>

      </div>
      <div class="p30 border-bottom-light">
        <a href="" class="anchor-row" @click="goUrl('/pages/wallet/orderCommission/orderCommissionMain')">
          <i class="iconfont icondingdantichengmingxi"></i> 订单提成明细
        </a>
        <!-- <a href="" class="anchor-row" @click="goUrl('/pages/index/build/buildMain')">
          <i class="iconfont icondingdantichengmingxi"></i> 订单提成明细
        </a> -->
      </div>
      <div class="p30 border-bottom-light">
        <a href="" class="anchor-row" @click="goUrl(`/pages/wallet/rewardDetail/rewardDetailMain?UserSN=${objData.UserSN}`)">
          <i class="iconfont iconyuedujilimingxi"></i> 月度激励明细
        </a>
        <!-- <a href="" class="anchor-row" @click="goUrl('/pages/index/build/buildMain')">
          <i class="iconfont iconyuedujilimingxi"></i> 月度激励明细
        </a> -->
      </div>
    </div>
    <popup :show.sync="isShowPopup" title="预估收益说明" btnOKText="知道了" is-hide-cancel-btn="true"
      @after-ok="isShowPopup=false">
      <div class="text-left text-small">
        预估收益是根据商品佣金设定估算的，并未实际收益，订单未完成收货流程也未形成实际收益，下单实付金额因参加满减、使用红包等各类活动而变更，实际收益也会受商品实付金额变化而影响。
      </div>
    </popup>
  </div>
</template>
<script>
  import goUrl from "@/utils/goUrl";
  import popup from "@/components/confirm";
  export default {
    data() {
      return {
        objData: {},
        isShowPopup: false
      }
    },
    components: {
      popup
    },
    methods: {
      goUrl,
      showPopupInfo() {
        this.isShowPopup = true;
      },
      initGetInfo() {
        mpvue.fetchData({
          API: 'api/Push/PusherGetMyAccountMoney',
          para: {},
          callback: (data) => {
            this.objData = data;
          }
        })
      }
    },
    onShow() {
      this.initGetInfo();
    },

    onLoad() {

      mpvue.setNavigationBarTitle({
        title: "钱包"
      });
    }
  }
</script>
<style lang="scss">
  .font-size48 {
    font-size: 48rpx;
  }

  .btn-tx {
    padding: 10rpx 40rpx;
    border: 1px solid #C2C2C2;
    border-radius: 10rpx;
  }

  .iconshouzhimingxi {
    color: #FF6600;
  }

  .icontixianjilu {
    color: #03C3CD;
  }

  .iconkaihujianglimingxi {
    color: #7F98FF;
  }

  .iconyuedujilimingxi {
    color: #2593FF;
  }

  .icondingdantichengmingxi {
    color: #FC9208;
  }
</style>