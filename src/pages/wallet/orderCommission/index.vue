<template>
  <div class="page bg-gray">
    <div v-if="dataIn.RoleType==4&&dataIn.StarLvl>0">
      <div class="border-bottom-light bg-white">
        <div class="tabs">
          <div class="item" :class="{on:dataOut.status===0}" @click="switchStatus('')">全部</div>
          <div class="item" :class="{on:dataOut.status==item.k}" @click="switchStatus(item.k)"
            v-for="(item,index) in arrStatus" :key="index">
            {{item.v}}
          </div>
        </div>
      </div>
      <div class="row-item">

        <div class="br20 bg-white" v-for="(item,index) in dataIn.arrDataList" :key="index"
          :class="index>0 ? 'split-t-gray':''">
          <div class="row-item">
            订单号：{{item.OrderCode}}
            <span class="fr text-primary">
              {{item.OrderStatusDesc}}
            </span>
          </div>
          <div class="goods-list row-item " :key="index1" v-for="(item1,index1) in item.OrderDetails ">
            <div class="item pt15">
              <div class="img-box">
                <img :src="item1.ProImage" alt="">
              </div>
              <div class="info">
                <span class="title">{{item1.ProName}}
                </span>
                <div class="text-light text-ellipsis mt10 goods-spec">
                  <span class="bg-gray text-ellipsis  text-light p10">规格：{{item1.ProSpec||item1.SpecStr}}</span>
                  <span class="fr ml5">x{{item1.ShowType==3?item1.ProCount:(item1.BuyCount||item1.ProCount)}}</span>
                </div>

              </div>
            </div>
            <div class="dis-flex text-center">
              <div class="col3 text-lighter text-x-small lh15 mt20">
                商品合计金额
                <p class="text-default text-bold text-middle">
                  ￥{{item1.OneSubTotal?item1.OneSubTotal:'-'}}
                </p>
              </div>
              <div class="col3 text-lighter text-x-small lh15 mt20">
                结算金额
                <p class="text-default text-bold text-middle">￥{{item1.SubTotal}}</p>
              </div>
              <div class="col3 text-lighter text-x-small lh15 mt20">
                提成点
                <p class="text-default text-bold text-middle">
                  {{item1.CityGearPercent?item1.CityGearPercent:'-'}}%</p>
              </div>
            </div>
          </div>
          <div class="dis-flex text-center border-top-light">

            <div class="col3 text-lighter text-x-small lh15 mt20">
              订单付款金额
              <p class="text-default text-bold text-middle">￥{{item.FinalTotalMoney }}</p>
            </div>
            <div class="col3 text-lighter text-x-small lh15 mt20">
              预估提成收入
              <p class="text-default text-bold text-middle">￥{{item.OrderCanCommissionTotalMoney }}</p>
            </div>
            <div class="col3 text-lighter text-x-small lh15 mt20">
              结算提成收入
              <p class="text-default text-bold text-middle">￥{{item.OrderCommissionMoney}}</p>
            </div>
          </div>
          <div class="mt20  row-item  text-lighter text-x-small">
            <p>付款时间：{{item.PayTime?item.PayTime:'无'}}</p>
            <p>结算时间：{{item.SettlementTime?item.SettlementTime:'无'}}</p>
          </div>
        </div>
        <div class="text-light row-item text-center" style="padding-top:40%" v-if="dataIn.arrDataList.length==0">暂无相关数据
        </div>
      </div>
    </div>
    <div class=" row-item text-center bg-white p30" v-else-if="dataIn.RoleType==4&&dataIn.StarLvl==0">
      <div class=" text-light" style="padding-top:20%;padding-bottom:20%;">
        只有到达1星以上的城市拍档才享受订单提成
        <div class="btn btn-primary item block mt40" @click="goUrl('/pages/yqMember/yqMemberMain?InvitaType=5')">
          去开发新会员升级账户星级</div>
      </div>
    </div>
    <div class=" row-item text-center bg-white p30" v-else-if="dataIn.RoleType==3">
      <div class=" text-light" style="padding-top:20%;padding-bottom:20%;">
        你是城市运营经理，没有线上订单提成
      </div>
    </div>
    <div class=" row-item text-center bg-white p30" v-else-if="dataIn.RoleType==2">
      <div class=" text-light" style="padding-top:20%;padding-bottom:20%;">
        你是城市运营分总，没有线上订单提成

      </div>
    </div>
  </div>
</template>
<script>
  import goodsItem from "@/components/goodsItem.vue";
  import goUrl from "@/utils/goUrl";
  export default {
    data() {
      return {
        totalPages: 0,

        dataOut: {
          pageIndex: 1,
          pageSize: 15,
          status: 0
        },
        dataIn: {
          arrDataList: [],
          IsOrderCommission: "",
          StarLvl: "",
          RoleType: ""
        },
        arrStatus: [{
            k: 1,
            v: '已付款'
          },
          {
            k: 2,
            v: '已收货'
          },
          {
            k: 3,
            v: '已结算'
          },
          {
            k: 4,
            v: '已失效'
          }
        ],
      }
    },
    components: {
      goodsItem
    },
    methods: {
      goUrl,
      switchStatus(status) {
        this.dataOut.status = status;
        this.dataIn.arrDataList = [];
        this.dataOut.pageIndex = 1;
        this.initPageData();
      },
      initPageData() {
        let para = JSON.parse(JSON.stringify(this.dataOut));
        mpvue.fetchData({
          API: "/api/Push/CityPusherGetMyOrderCommissionList",
          para,
          callback: data => {
            this.totalPages = data.TotalPages;
            wx.stopPullDownRefresh();
            this.dataIn.inited = true;
            data.Data.map((el, index) => {
              el.OrderDetails.map((ed, index1) => {
                if (ed.TaocanList.length != 0) {
                  console.log(index)
                  console.log(index1)
                  //   el.OrderDetails[index1] = ed.TaocanList;
                  el.OrderDetails.splice(1, 1);
                  el.OrderDetails = el.OrderDetails.concat(ed.TaocanList)
                }
              })
              return el;

            })

            this.dataIn.IsOrderCommission = data.IsOrderCommission;
            this.dataIn.StarLvl = data.StarLvl;
            this.dataIn.RoleType = data.RoleType;
            this.dataIn.arrDataList = this.dataIn.arrDataList.concat(data.Data);
          }
        });
      },

    },
    onLoad() {
      mpvue.setNavigationBarTitle({
        title: "订单提成明细"
      });

      this.initPageData();
    },
    onReachBottom() {
      console.log("load more data");
      if (this.totalPages > this.dataOut.pageIndex) {
        this.dataOut.pageIndex += 1;
        this.getGoodsData();
      }
    },
  }

</script>
<style lang="scss" scoped>
  .lh15 {
    line-height: 1.5;
  }

  .dis-flex {
    flex-wrap: wrap;
  }

  .goods-list {
    .item {
      .info {
        .origin-price {
          bottom: -5px;
        }
      }
    }

  }

  .btn {
    border-radius: 100rpx
  }

</style>
