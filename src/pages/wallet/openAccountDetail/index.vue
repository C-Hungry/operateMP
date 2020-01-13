<template>
  <div class="bg-gray">
    <div class="border-bottom-light bg-white">
      <div class="tabs">
        <div class="item" :class="{on:dataOut.payStatus===''}" @click="switchStatus('')">全部</div>
        <div class="item" :class="{on:dataOut.payStatus==item.k}" @click="switchStatus(item.k)"
          v-for="(item,index) in arrStatus" :key="index">
          {{item.v}}
        </div>
      </div>
    </div>
    <div class="row-item">
      <div class="user-list row-item border-bottom-light bg-white br10 mb20" v-for="(item,index) in dataIn.arrDataList"
        :key="index" @click="goUrl('/pages/workbench/myMember/myMemberDetail/myMemberDetailMain')">
        <div class="item">
          <div class="img-box">
            <img mode="widthFix" :src="item.HeadImg?item.HeadImg:'/static/images/headImg.jpg'" alt="">
          </div>
          <div class="info">
            <div class="dis-flex">
              <div class="item">
                <p class="text-large text-bold">{{item.RetailerReal?item.RetailerReal:'-'}}</p>
                <p>{{item.RetailerUserName}}</p>
              </div>
              <div class="text-right mt20">
                <span class="text-x-small  border-primary">{{item.PayStatus==2?'已缴费':'未缴费'}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="dis-flex text-x-small lh15 mt20 text-lighter">
          <div class="item">
            <span v-if="item.IsRenew&&item.IsRenew!=''">{{item.IsRenew==1?'续费':'开户'}}奖励收入</span>
            <p class="text-bold text-large text-default">￥{{item.AwardMoney}}</p>
          </div>
          <div class="w70p text-right">
            注册时间：{{item.RegisteDate}}
            <p class="mt5">支付时间：{{item.PayTime?item.PayTime:'-'}}</p>
          </div>
        </div>
      </div>
      <div class="text-light row-item text-center" style="padding-top:40%" v-if="dataIn.arrDataList.length==0">暂无相关数据
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        totalPages: 0,
        UserSN: "",
        dataOut: {
          pageIndex: 1,
          pageSize: 15,
          payStatus: "",
          Key: "", //关键字
          DateType: "", //1注册时间2支付时间
          Start: "", //开始时间
          End: "", //结束时间
        },
        dataIn: {
          arrDataList: []
        },
        arrStatus: [{
            k: 2,
            v: '已缴费'
          },
          {
            k: 1,
            v: '未缴费'
          }
        ],
      }
    },
    methods: {
      switchStatus(status) {
        this.dataOut.payStatus = status || '';
        this.dataIn.arrDataList = [];
        this.dataOut.pageIndex = 1;
        this.initPageData();
      },
      initPageData() {
        this.dataOut.Key = this.UserSN;
        let para = JSON.parse(JSON.stringify(this.dataOut));
        mpvue.fetchData({
          API: "/api/Push/AccountOpenAwardList",
          para,
          callback: data => {
            this.totalPages = data.TotalPages;
            data.Data.forEach(el => {
              el.RegisteDate = mpvue.datetime(el.RegisteDate).datetime;
              if (el.PayTime) {
                el.PayTime = mpvue.datetime(el.PayTime).datetime;
              }
            })
            wx.stopPullDownRefresh();
            this.dataIn.inited = true;
            this.arrCurList = data.Data;
            this.dataIn.arrDataList = this.dataIn.arrDataList.concat(data.Data);
          }
        });
      },

    },
    onLoad() {
      this.UserSN = wx.getStorageSync("UserSN") || this.$root.$mp.query.UserSN || '';
      this.switchStatus();
      mpvue.setNavigationBarTitle({
        title: "开户奖励明细"
      });
    },
    onReachBottom() {
      console.log("load more data");
      if (this.totalPages > this.dataOut.pageIndex) {
        this.dataOut.pageIndex += 1;
        this.initPageData();
      }
    },
  }

</script>
<style lang="scss" scoped>
  .lh15 {
    line-height: 1.5;
  }

</style>
