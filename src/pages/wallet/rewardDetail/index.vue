<template>
  <div class="page bg-gray">
    <div class="row-item">
      <div class="bg-white row-item">
        <picker
          mode="date"
          :end="endDate"
          start="2010-01-01"
          fields="month"
          @change="bindDateChange"
        >
          <span>
            <i class="iconfont iconshijian">
              <span class="text-small ml10 text-bold flex-center">{{searchDate}}</span>
            </i>
          </span>
        </picker>
        <!-- TierLvl // 2:'城市分总'; 3:'城市经理'; 4:'城市拍档'; -->
        <div v-if="TierLvl == 4 && rewardData.StarLvl > 1">
          <div class="dis-flex mt40 flex-space">
            <div class="text-light text-small">
              会员采购额指标
              <p
                class="text-default text-large text-bold"
              >￥{{rewardData.StandardMonthPurchaseMoney}}.00</p>
              <div class="mt20">会员激活数指标</div>
              <p
                class="text-default text-large text-bold"
              >{{rewardData.StandartMonthActivateNum}}个会员</p>
              <p
                class="mt40 text-muted-light"
                v-if="rewardData.Status != 2"
              >结算时间：{{rewardData.SettlementTime}}</p>
            </div>
            <div class="text-light text-small">
              <p class="text-right">月度激励</p>
              <p class="text-danger text-large text-bold mb40">￥{{rewardData.AwardMoney}}.00</p>
              <div class="btn item status-btn" v-if="rewardData.Status == 2">核算中</div>
              <i
                class="iconfont iconyiwancheng text-danger status-img"
                v-else-if="rewardData.Status == 1"
              ></i>
              <i
                class="iconfont iconweiwancheng text-lighter status-img"
                v-else-if="rewardData.Status == 0"
              ></i>
            </div>
          </div>
          <div class="dis-flex flex-space mt40 pt40 border-top-light">
            <div class="text-small text-light">
              当前会员采购额
              <p
                class="text-default text-large text-bold"
              >￥{{rewardData.ActualMonthPurchaseMoney}}.00</p>
              <div class="mt20">还差会员采购额</div>
              <p class="text-default text-large text-bold">￥{{rewardData.DifMonthPurchaseMoney}}.00</p>
            </div>
            <div>
              <circle size="90" :value="rewardData.purchaseRate">
                <div class="circle_info">{{rewardData.purchaseRate}}%</div>
              </circle>
              <div class="text-x-small">会员采购额完成率</div>
            </div>
          </div>
          <div class="dis-flex flex-space mt40 pt40 border-top-light">
            <div class="text-small text-light">
              当前会员激活数
              <p class="text-default text-large text-bold">{{rewardData.ActualMonthActivateNum}}</p>
              <div class="mt20">还差会员激活数</div>
              <p class="text-default text-large text-bold">{{rewardData.DifMonthActivateNum}}</p>
            </div>
            <div>
              <circle size="90" :value="rewardData.activateRate" canvas-id="canvasActive">
                <div class="circle_info">{{rewardData.activateRate}}%</div>
              </circle>
              <div class="text-x-small">会员激活率完成率</div>
            </div>
          </div>
        </div>
        <div
          class="row-item text-center bg-white p30"
          v-if="TierLvl == 4 && rewardData.StarLvl < 2"
        >
          <div class="text-light" style="padding-top:20%;padding-bottom:20%;">
            只有到达2星以上的城市拍档才享受月度激励
            <div
              class="btn btn-primary item block mt40"
              @click="goUrl('/pages/yqMember/yqMemberMain?InvitaType=5')"
            >去开发新会员升级账户星级</div>
          </div>
        </div>
        <div
          class="row-item text-center bg-white p30"
          v-if="TierLvl == 3"
        >
          <div class="text-light" style="padding-top:20%;padding-bottom:20%;">你是城市运营经理，月度激励线下统一核算</div>
        </div>
        <div
          class="row-item text-center bg-white p30"
          v-if="TierLvl == 2"
        >
          <div class="text-light" style="padding-top:20%;padding-bottom:20%;">你是城市运营分总，月度激励线下统一核算</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import circle from "@/components/circle";
import goUrl from "@/utils/goUrl";
export default {
  components: {
    circle
  },
  data() {
    return {
      UserSN: "",
      endDate: "",
      searchDate: "",
      Year: "",
      Month: "",
      rewardData: {},
      TierLvl: null
    };
  },
  methods: {
    goUrl,
    bindDateChange(e) {
      this.Year = e.mp.detail.value.split("-")[0];
      this.Month = e.mp.detail.value.split("-")[1];
      this.searchDate = this.Year + "." + this.Month;
      if(this.TierLvl == 4){
        this.serchRecord();
      }
    },
    serchRecord() {
      let para = {};
      para.UserSN = this.UserSN;
      para.Year = this.Year;
      para.Month = this.Month;
      mpvue.fetchData({
        API: "/api/Push/GetMonthRewardInfo",
        para,
        callback: data => {
          if (data.length != 0) {
            this.rewardData = data[0];
            this.rewardData.purchaseRate = (
              data[0].ActualMonthPurchaseMoney /
              data[0].StandardMonthPurchaseMoney *
              100
            ).toFixed(1);
            this.rewardData.activateRate = (
              data[0].ActualMonthActivateNum /
              data[0].StandartMonthActivateNum *
              100
            ).toFixed(1);
            wx.stopPullDownRefresh();
          }
        }
      });
    },
    initPaeData() {
      mpvue.fetchData({
        API: "api/push/GetGroundPusherMsg",
        callback: data => {
          this.TierLvl = data.Pusher.TierLvl
          if(this.TierLvl == 4){
            this.serchRecord();
          }
        }
      });
    }
  },
  onLoad() {
    this.UserSN = this.$root.$mp.query.UserSN;

    var curMonth =
      (new Date().getMonth() + 1).toString().length > 1
        ? new Date().getMonth() + 1
        : "0" + (new Date().getMonth() + 1);
    var curDate =
      (new Date().getDate() + 1).toString().length > 1
        ? new Date().getDate()
        : "0" + new Date().getDate();
    this.endDate = new Date().getFullYear() + "-" + curMonth + "-" + curDate;

    this.Year = new Date().getFullYear();
    this.Month = curMonth;

    this.searchDate = new Date().getFullYear() + "." + curMonth;

    this.initPaeData();
  }
};
</script>
<style lang="scss" scoped>
.circle_info {
  position: absolute;
  top: 36%;
  left: 30%;
}
.btn {
  border-radius: 100rpx;
}
.status-btn {
  border-radius: 48rpx;
  background: #eee;
  color: #3366ff;
}
.status-img {
  font-size: 120rpx;
}
</style>