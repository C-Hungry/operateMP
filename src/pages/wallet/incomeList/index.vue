<template>
  <div class="page">
    <div class="bg-primary text-white row-item">


      <picker mode="date" :end="endDate" start="2010-01-01" fields="month" @change="bindDateChange">
        <span class="text-right">
          <i class="iconfont iconshijian fr">
          </i>
        </span>
      </picker>
      <div>收支明细：{{searchDate}}</div>
      <div>收入：{{TotalInCome}} 支出：{{TotalOut}}</div>
    </div>
    <div class="row-item">
      <div class="anchor-row p20" v-for="(item,index) in dataIn.arrDataList" :key="index"
        @click="goUrl('/pages/wallet/incomeDetail/incomeDetailMain?RecordId='+item.RecordId)">
        <div class="fr mt25 text-large" :class="item.InOrOut?'text-danger':'text-ok'">
          <span>{{item.InOrOut ? '+':'-'}}</span>{{item.ChangeMoney}}</div>
        <div class="text-bold">{{item.ChangeTypeDesc}}</div>
        <div class="text-lighter text-small">{{item.DateAdded}}</div>
      </div>
      <div class="text-light  row-item text-center" style="padding-top:40%" v-if="dataIn.arrDataList.length==0">暂无相关数据
      </div>
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
        TotalInCome: "",
        TotalOut: "",
        dataIn: {
          arrDataList: []
        },
        dataOut: {
          year: "",
          month: ""
        }
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
          API: "api/Push/PusherGetMyAccountRecord",
          para,
          callback: data => {
            this.totalPages = data.TotalPages;
            this.TotalInCome = data.TotalInCome;
            this.TotalOut = data.TotalOut;
            data.Data.forEach(el => {
              el.DateAdded = mpvue.datetime(el.DateAdded).datetime;
            })
            let tempData = data.Data;
            if (this.pageIndex === 1) {
              this.dataIn.arrDataList = tempData;
            } else {
              this.dataIn.arrDataList = [...this.dataIn.arrDataList, ...tempData];
            }
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
      
      var curMonth = (new Date().getMonth()+1) < 10 ?  ('0' + (new Date().getMonth() +
        1)) :(new Date().getMonth() + 1);
      var curDate = new Date().getDate().length > 1 ? (new Date().getDate()) : ('0' + (new Date().getDate()));
      this.searchDate = new Date().getFullYear() + '年' + curMonth + '月';
      this.endDate = new Date().getFullYear() + '-' + curMonth + '-' + curDate;
      this.dataOut.year = new Date().getFullYear();
      this.dataOut.month = curMonth;
      this.serchRecord();
      mpvue.setNavigationBarTitle({
        title: "收支明细"
      });
    }
  }

</script>
<style lang="scss" scoped>
  .iconfont {
    font-size: 36rpx;
  }

</style>
