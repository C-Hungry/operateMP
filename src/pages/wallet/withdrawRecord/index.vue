<template>
  <div class="page">
    <div class="bg-primary text-white row-item">


      <picker mode="date" :end="endDate" start="2010-01-01" fields="month" @change="bindDateChange">
        <span class="text-right">
          <i class="iconfont iconshijian fr">
          </i>
        </span>
      </picker>
      <div>提现明细：{{searchDate}}</div>
      <div>提现：{{dataIn.hzWithdrawApplyMoney}} 到账：{{dataIn.hzFundsAccountMoney}} 扣税：{{dataIn.hzDeductionMoney}}</div>
    </div>
    <div class="row-item border-bottom-light" v-for="(item,index) in dataIn.arrDataList" :key="index">
      <div class="anchor-row p20"
        @click="goUrl('/pages/wallet/withdrawRecord/wrDetail/wrDetailMain?id='+item.WithdrawApplyId)">
        <div class="fr text-small text-right">
          <span class="text-danger text-right text-large">{{item.WithdrawApplyMoney}}</span>
          <p class="text-x-small text-lighter">{{item.WithdrawStateDes}}</p>
        </div>
        <div class="text-bold">{{item.WithdrawType}}提现</div>
        <div class="text-lighter text-small">{{item.WithdrawApplyDate}}</div>
      </div>

    </div>
    <div class="text-light  row-item text-center" style="padding-top:40%" v-if="dataIn.arrDataList.length==0">暂无相关数据
    </div>
  </div>
</template>
<script>
  import goUrl from "@/utils/goUrl";
  export default {
    data() {
      return {
        loading: false,
        pageIndex: 1,
        searchDate: "",
        endDate: "",
        totalPages: 0,
        dataIn: {
          arrDataList: [],
          hzDeductionMoney: "",
          hzFundsAccountMoney: "",
          hzWithdrawApplyMoney: ""
        },
        dataOut: {}
      }
    },
    methods: {
      goUrl,
      bindDateChange(e) {
        this.dataOut.year = e.mp.detail.value.split("-")[0];
        this.dataOut.month = e.mp.detail.value.split("-")[1];
        this.searchDate = this.dataOut.year + '年' + this.dataOut.month + '月';
        this.serchRecord();
      },
      serchRecord() {
        this.loading = true;
        this.pageIndex = 1;
        this.dataIn.arrDataList = [];
        this.getAllRecord();
      },
      getAllRecord() {
        this.loading = true;
        let para = this.dataOut;
        para.pageSize = 10;
        para.pageIndex = this.pageIndex;
        mpvue.fetchData({
          API: "api/push/WithdrawApplyListAndPagingAPP",
          para,
          callback: data => {
            this.totalPages = data.TotalPages;
            console.log(data);
            data.Data.Detail.forEach(el => {
              el.WithdrawApplyDate = mpvue.datetime(el.WithdrawApplyDate).datetime;
            })
            let tempData = data.Data.Detail;
            if (this.pageIndex === 1) {
              this.dataIn.arrDataList = tempData;
            } else {
              this.dataIn.arrDataList = [...this.dataIn.arrDataList, ...tempData];
            }
            this.dataIn.hzDeductionMoney = data.Data.hzDeductionMoney;
            this.dataIn.hzFundsAccountMoney = data.Data.hzFundsAccountMoney;
            this.dataIn.hzWithdrawApplyMoney = data.Data.hzWithdrawApplyMoney;
          }
        });
      }

    },
    onReachBottom() {
      console.log("load more data");
      if (this.totalPages > this.pageIndex) {
        this.pageIndex += 1;
        this.getAllRecord();
      }
    },
    onLoad() {
      mpvue.setNavigationBarTitle({
        title: "提现记录"
      });
      // var curMonth = new Date().getMonth().length > 1 ? (new Date().getMonth() + 1) : ('0' + (new Date().getMonth() +
      //   1));
      var curMonth = (new Date().getMonth()+1) < 10 ?  ('0' + (new Date().getMonth() +
        1)) :(new Date().getMonth() + 1);
      var curDate = new Date().getDate().length > 1 ? (new Date().getDate()) : ('0' + (new Date().getDate()));
      this.searchDate = new Date().getFullYear() + '年' + curMonth + '月';
      this.endDate = new Date().getFullYear() + '-' + curMonth + '-' + curDate;
      this.dataOut.year = new Date().getFullYear();
      this.dataOut.month = curMonth;
      this.serchRecord();
    }
  }

</script>
<style lang="scss" scoped>
  .iconfont {
    font-size: 36rpx;
  }

</style>
