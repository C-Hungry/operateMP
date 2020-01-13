<template>
  <div class="page bg-gray">

    <div class="split-t-gray bg-white">
      <div class="flex-sb p20">
        <div class="item">提现方式</div>
        <div class="item text-right">{{objDetail.WithdrawTypeDes}}</div>
      </div>
      <div class="flex-sb p20 border-top-light">
        <div class="item">提现金额</div>
        <div class="item text-right">￥{{objDetail.WithdrawMoney}}</div>
      </div>
      <div class="flex-sb p20 border-top-light">
        <div class="item">扣税金额</div>
        <div class="item text-right">￥{{objDetail.DeductionMoney}}</div>
      </div>
      <div class="flex-sb p20 border-top-light">
        <div class="item">实际到账金额</div>
        <div class="item text-right text-danger">￥{{objDetail.FundsAccountMoney}}</div>
      </div>
    </div>
    <div class="split-t-gray bg-white">
      <div class="flex-sb p20">
        <div class="item">提现信息</div>
        <div class="item">{{objDetail.WithdrawAccount}}</div>
      </div>
      <!-- <div class="flex-sb p20 border-top-light">
        <div class="item">备注信息</div>
        <div class="item">{{objDetail.AuditRemark}}</div>
      </div> -->
    </div>
    <div class="split-t-gray bg-white">
      <div class="flex-sb p20">
        <div class="item">状态</div>
        <div class="item">{{objDetail.WithdrawStateDes}}</div>
      </div>
      <div class="flex-sb p20 border-top-light">
        <div class="item">操作时间</div>
        <div class="item">{{objDetail.DateAdded}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        id: "",
        objDetail: {}
      }
    },
    methods: {
      initPageData() {
        mpvue.fetchData({
          API: 'api/push/WithdrawApplyDetailAPP',
          para: {
            Id: this.id
          },
          callback: (data) => {
            data.DateAdded = mpvue.datetime(data.DateAdded).datetime;
            this.objDetail = data;
          }
        })
      }
    },
    onLoad() {
      this.id = this.$root.$mp.query.id; //
      this.initPageData();
      mpvue.setNavigationBarTitle({
        title: "提现详情"
      });
    }
  }

</script>
<style lang="scss" scoped>
  .text-title {
    font-size: 60rpx;
    padding: 80rpx;
  }

</style>
