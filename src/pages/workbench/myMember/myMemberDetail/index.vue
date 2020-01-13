<template>
  <div class="page bg-gray">
    <div class="page-footer">
      <div class="page-footer-inner dis-flex text-center pt15">
        <div class="item" @click="goUrl('/pages/workbench/followUp/followUpMain?UserId='+UserId)">
          <i class="iconfont iconxiegenjin"></i>
          <div>写跟进</div>
        </div>
        <div class="item" @click="onCall(objInfo.UserName)">
          <i class="iconfont icondianhua"></i>
          <div>打电话</div>
        </div>
      </div>
    </div>
    <div class="page-content">
      <div class="user-list bg-white">
        <div class="item row-item">
          <div class="img-box">
            <img :src="objInfo.UserImage?objInfo.UserImage:'/static/images/headImg.jpg'" alt="">
            <span class="img-label label-primary">{{objInfo.StatusDesc}}</span>
          </div>
          <div class="info">
            <div class="title">{{objInfo.RealName?objInfo.RealName:objInfo.UserName}} <span
                class="tag tag-o-danger ml10">{{objInfo.InvitaSourceDesc}}</span><span
                class="fr text-x-small text-lighter text-normal">服务经理</span></div>
            <div class="goods-desc">
              <span class="fr">{{objInfo.PusherRealName}}</span>
              <div class="text-ellipsis w60p">
                <span v-if="objInfo.EnterpriseType==3">个人</span>
                <span v-else-if="objInfo.EnterpriseType==2">个体户</span>
                <span v-else>{{objInfo.EnterpriseName}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="dis-flex mb30">
          <div class="item text-center">
            <div class="text-lighter text-x-small">注册时间</div>
            <div class="text-small">{{objInfo.DateAdded}}</div>
          </div>
          <div class="item text-center">
            <div class="text-lighter text-x-small">最近访问时间</div>
            <div class="text-small">{{objInfo.LastVisitTime?objInfo.LastVisitTime:'无'}}</div>
          </div>
          <div class="item text-center">
            <div class="text-lighter text-x-small">最近下单时间</div>
            <div class="text-small">{{objInfo.LastOrderTime?objInfo.LastOrderTime:'无'}}</div>
          </div>
        </div>

        <scroll-view class="scroll-x-box border-top-light border-bottom-light" scroll-x="true">
          <view class="scroll-x-box-list" :class="{on:index==curTabIndex}" @click="swtichTab(index)" v-for="(item, index) in arrTab" :key="index" >
            {{item.name}}
          </view>
        </scroll-view>

        <!-- <div class="tabs border-top-light border-bottom-light">
          <div class="item" :class="{on:index==curTabIndex}" @click="swtichTab(index)" v-for="(item,index) in arrTab"
            :key="index">
            {{item.name}}
          </div>
        </div> -->

      </div>
      <div class="row-item">
        <div class="row-item bg-white" v-if="curTabIndex==0">
          <div>
            <picker mode="date" :end="endDate" start="2010-01-01" fields="month" @change="bindDateChange">
              <span class="text-right">
                <i class="iconfont iconshijian fr ">
                  <span class="text-small ml10 text-bold">{{searchDate}}</span>
                </i>
              </span>
            </picker>
            <div class="tab-bar">
              <span class="item" :key="index" v-for="(item,index) in arrStatus" :class="{on:AnalysisType==item.status}"
                @click="changeOrderStatus(item.status)">{{item.title}}</span>
            </div>
          </div>
          <div class="mt10">
            <table class="table table-bordered text-center ">
              <tbody>
                <tr>
                  <td class="item p20">
                    <p class="text-x-small text-lighter">累计采购额</p>
                    <p class="text-bold">￥{{objOrderData.TotalMoney}}</p>
                  </td>
                  <td class="item p20">
                    <p class="text-x-small text-lighter">累计有效采购额</p>
                    <p class="text-bold">￥{{objOrderData.TotalEffectiveMoney}}</p>
                  </td>
                  <td class="item p20">
                    <p class="text-x-small text-lighter">累计退货退款额</p>
                    <p class="text-bold">￥{{objOrderData.TotalRefundMoney}}</p>
                  </td>
                </tr>
                <tr>
                  <td class="item p20">
                    <p class="text-x-small text-lighter">累计订单数</p>
                    <p class="text-bold">￥{{objOrderData.TotalOrderNum}}</p>
                  </td>
                  <td class="item p20">
                    <p class="text-x-small text-lighter">累计有效订单数</p>
                    <p class="text-bold">￥{{objOrderData.TotalEffectiveOrderNum}}</p>
                  </td>
                  <td class="item p20">
                    <p class="text-x-small text-lighter">累计退货退款订单数</p>
                    <p class="text-bold">￥{{objOrderData.TotalRefundOrderNum}}</p>
                  </td>
                </tr>
                <tr>
                  <td class="item p20">
                    <p class="text-x-small text-lighter">本月采购额</p>
                    <p class="text-bold">￥{{objOrderData.TotalMoneyByMonth}}</p>
                  </td>
                  <td class="item p20">
                    <p class="text-x-small text-lighter">本月有效采购额</p>
                    <p class="text-bold">￥{{objOrderData.TotalEffectiveMoneyByMonth}}</p>
                  </td>
                  <td class="item p20">
                    <p class="text-x-small text-lighter">本月退货退款额</p>
                    <p class="text-bold">￥{{objOrderData.TotalRefundMoneyByMonth}}</p>
                  </td>
                </tr>
                <tr>
                  <td class="item p20">
                    <p class="text-x-small text-lighter">总订单笔数</p>
                    <p class="text-bold">￥{{objOrderData.TotalOrderNumByMonth}}</p>
                  </td>
                  <td class="item p20">
                    <p class="text-x-small text-lighter">有效订单笔数</p>
                    <p class="text-bold">￥{{objOrderData.TotalEffectiveOrderNumByMonth}}</p>
                  </td>
                  <td class="item p20">
                    <p class="text-x-small text-lighter">退货退款笔数</p>
                    <p class="text-bold">￥{{objOrderData.TotalRefundOrderNumByMonth}}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class=" bg-gray" v-if="curTabIndex==1">
          <div class="tab-bar bg-white tab-flex border-bottom-split-gray">
            <div class="item" :class="{on:dataOut.orderStatus===''}" @click="switchStatus('')">全部</div>
            <div class="item" :class="{on:dataOut.orderStatus==item.k}" @click="switchStatus(item.k)"
              v-for="(item,index) in arrOrderStatus" :key="index">
              {{item.v}}
            </div>
          </div>
          <div class="border-bottom-split-gray bg bg-white" :key="index" v-for="(item,index) in dataIn.arrDataList">
            <div @click="goToOrderDetail(item)">
              <div class="text-x-large">
                {{item.ShopName}}
              </div>
              <div class="goods-list pt30 pb30" :class="index1>0 ? 'border-top-light':''" :key="index1"
                v-for="(item,index1) in item.OrderDetails">
                <goods-item :goods="item" hide-fee></goods-item>
              </div>
              <div class="text-right row-item ">
                共 {{item.TotalGoodsNum}}件商品，总金额：<span class="text-danger">
                  ￥{{item.FinalTotalMoney}}
                </span>
              </div>
            </div>
          </div>
          <div class="text-light bg-white row-item text-center" style="padding-top:40%"
            v-if="dataIn.arrDataList.length==0">
            暂无相关数据
          </div>
        </div>
        <div class="row-item bg-white" v-if="curTabIndex==2">
          <ul class="audit-flow ">
            <li class="item dis-flex" v-for="(item,index) in objFolRecord" :key="index">
              <div class="audit-title text-right text-lighter">
                {{item.DateAdded}}
              </div>
              <div class="audit-detail switcher-block">
                <div class="bg-gray p20 mt15">
                  <div>{{item.RealNameAdded}}<span class="fr tag-title">
                      <span v-if="item.FollowType==1">打电话</span>
                      <span v-if="item.FollowType==2">发微信</span>
                      <span v-if="item.FollowType==3">发短信 </span>
                      <span v-if="item.FollowType==4">面访</span>
                      <span v-if="item.FollowType==5">活动</span>
                      <span v-if="item.FollowType==6">其他</span>
                    </span></div>
                  <div class="text-lighter mt10 mb10">{{item.FollowContent}}</div>
                  <div>
                    <img mode="aspectFill" class="mr10" v-for="(item1,index1) in item.Images" :key="index1" :src="item1"
                      alt="">
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div class="text-light  row-item text-center" style="padding-top:40%" v-if="objFolRecord.length==0">暂无相关数据
          </div>
        </div>
        <div v-if="curTabIndex==3">
          <div class="row-item bg-white pay">
            <ul>
              <li>
                <img mode="aspectFit" :src="apiclient+'/dist/images/index/index9.png'" alt="慧买卖">
                <span>慧买卖</span>
                <em v-if="RetailerInfo.IsOpenHmm == 1">到期时间:{{RetailerInfo.HmmServiceEndTime}}</em>
                <strong v-else>未开通</strong>
              </li>
              <li>
                <img mode="aspectFit" :src="apiclient+'/dist/images/index/index10.png'" alt="家电汇">
                <span>家电汇</span>
                <em v-if="RetailerInfo.IsOpenJdh == 1">到期时间:{{RetailerInfo.JdhServiceEndTime}}</em>
                <strong v-else>未开通</strong>
              </li>
            </ul>
          </div>
          <div class="row-item bg-white record">
            <!-- <div class="payjl">线上缴费记录</div> -->
            <ul class="audit-flow">
              <li class="item dis-flex" v-for="(item,index) in RetailerPayList" :key="index">
                <div class="audit-title text-right text-lighter">
                  {{item.CompleteTime}}
                </div>
                <div class="audit-detail switcher-block">
                  <div class="bg-gray p20 mt15">
                    <div>{{item.platformName}}-{{item.OpenYear}}年<strong class="pay-price"><em>¥</em>{{item.ServiceFee}}</strong></div>
                    <div class="payTip">{{item.PayName}}</div>
                    <div class="text-lighter pt20">订单号：{{item.ServiceOrderCode}}</div>
                    <div class="text-lighter pt20" style="line-height:40rpx">流水号：{{item.SettlementTradeCode}}</div>
                  </div>
                </div>
              </li>
            </ul>
            <div class="text-light row-item text-center" style="padding-top:40%" v-if="RetailerPayList.length==0">暂无线上缴费记录</div>
          </div>
        </div>
        <div class="row-item bg-white" v-if="curTabIndex==4">
          <div class="row-item">
            <div class="row-title text-lighter">类型</div>
            <div class="row-content">
              <span v-if="objInfo.EnterpriseType==1">企业</span>
              <span v-if="objInfo.EnterpriseType==2">个体户</span>
              <span v-if="objInfo.EnterpriseType==3">个人</span>
            </div>
          </div>
          <div class="row-item border-top-light" v-if="objInfo.EnterpriseName&&objInfo.EnterpriseName!=''">
            <div class="row-title text-lighter">企业名称</div>
            <div class="row-content">{{objInfo.EnterpriseName}}</div>
          </div>
          <div class="row-item border-top-light" v-if="objInfo.TaxNum&&objInfo.TaxNum!=''">
            <div class="row-title text-lighter">税号</div>
            <div class="row-content">{{objInfo.TaxNum}}</div>
          </div>
          <div class="row-item border-top-light" v-if="objInfo.LegalPerson&&objInfo.LegalPerson!=''">
            <div class="row-title text-lighter">法人</div>
            <div class="row-content">{{objInfo.LegalPerson}}</div>
          </div>
          <div class="row-item border-top-light">
            <div class="row-title text-lighter">地区</div>
            <div class="row-content">
              {{objInfo.AreaName1}}-{{objInfo.AreaName2}}-{{objInfo.AreaName3}}-{{objInfo.AreaName4}}</div>
          </div>
          <div class="row-item border-top-light">
            <div class="row-title text-lighter">开通平台</div>
            <div class="row-content">
              <p v-if="objInfo.IsOpenHmm">慧买卖：{{objInfo.HmmServiceEndTime}}</p>
              <p v-if="objInfo.IsOpenJdh">家电汇：{{objInfo.JdhServiceEndTime}}</p>
            </div>
          </div>
          <div class="row-item border-top-light" v-if="objInfo.ShopBrandNames&&objInfo.ShopBrandNames!=''">
            <div class="row-title text-lighter">主营品牌</div>
            <div class="row-content">
              {{objInfo.ShopBrandNames}}
            </div>
          </div>
          <div class="row-item border-top-light" v-if="objInfo.ShopImage&&objInfo.ShopImage!=''">
            <div class="row-title text-lighter">店铺资质</div>
            <div class="row-content">
              <img mode="aspectFill" class="img-default" :src="objInfo.ShopImage" alt=""></div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import goodsItem from '@/components/goodsItem.vue';
  import goUrl from "@/utils/goUrl";
  export default {
    data() {
      return {
        apiclient: "",
        currentTab: 0,
        curTabIndex: 0,
        totalPages: 0,
        UserId: "",
        AnalysisType: 1,
        year: "",
        month: "",
        dataOut: {
          Key: "",
          type: "",
          BeginDate: "",
          EndDate: "",
          orderStatus: "",
          PageIndex: 1,
          PageSize: 15
        },
        objInfo: {},
        objOrderData: "",
        objFolRecord: "",
        arrTab: [{
            name: '订单简报'
          }, {
            name: '订单列表'
          },
          {
            name: '跟进记录'
          },
          {
            name: '产品缴费'
          },
          {
            name: '基本信息'
          }
        ],
        arrStatus: [{
            status: 1,
            title: '实时订单'
          },
          {
            status: 2,
            title: '完成订单'
          },
        ],
        arrOrderStatus: [{
            k: 1,
            v: '待付款'
          },
          {
            k: 2,
            v: '待发货'
          },
          {
            k: 4,
            v: '待收货'
          },
          {
            k: 6,
            v: '已完成'
          },
        ],
        searchDate: "",
        endDate: "",
        dataIn: {
          inited: false,
          arrDataList: []
        },
        RetailerPayList:[],//缴费记录
        RetailerInfo:{}//开通详情
      }
    },
    components: {
      goodsItem
    },
    methods: {
      goUrl,
      onCall(item) {
        mpvue.makePhoneCall({
          phoneNumber: item
        })
      },
      swtichTab(index) {
        this.curTabIndex = index;
        if (index == 2) {
          this.initFolRecord();
        } else if (index == 1) {
          this.initOrderList();
        }
      },
      changeOrderStatus(status) {
        this.AnalysisType = status;
        this.initOrderStatus();
      },
      switchStatus(status) {
        this.dataOut.orderStatus = status;
        this.dataIn.inited = false;
        this.dataIn.arrDataList = [];
        this.pageIndex = 1;
        this.initOrderList(1);
      },
      bindDateChange(e) {

        this.year = e.mp.detail.value.split("-")[0];
        this.month = e.mp.detail.value.split("-")[1];
        this.searchDate = this.year + '.' + this.month;
        this.initOrderStatus();
      },
      initPageData(pageIndex) {
        let para = {}
        para.UserSN = this.UserId;
        mpvue.fetchData({
          API: 'api/Push/CityPusherGetMyRetailerDetails',
          para,
          callback: (data) => {
            data.DateAdded = mpvue.datetime(data.DateAdded).date;
            data.DateModify = mpvue.datetime(data.DateModify).date;
            data.HmmServiceEndTime = mpvue.datetime(data.HmmServiceEndTime).date;
            data.JdhServiceEndTime = mpvue.datetime(data.JdhServiceEndTime).date;
            data.LastOrderTime = mpvue.datetime(data.LastOrderTime).date;
            this.objInfo = data
          }
        })
      },
      initOrderStatus() {
        let para = {}
        para.UserSN = this.UserId;
        para.AnalysisType = this.AnalysisType;
        para.Year = this.year;
        para.Month = this.month;
        mpvue.fetchData({
          API: 'api/Push/CityPusherGetMyRetailerOrderStatistic',
          para,
          callback: (data) => {
            this.objOrderData = data;
          }
        })
      },
      initFolRecord() {
        let para = this.dataOut;
        para.UserSN = this.UserId;
        mpvue.fetchData({
          API: 'api/RegMng/FollowRecordList',
          para,
          callback: (data) => {
            data.Data.forEach(el => {
              el.Images = el.Images.split(",")
            })
            this.objFolRecord = data.Data;
          }
        })
      },
      initProductPayment(){
        let para = {}
        para.UserSN = this.UserId;
        mpvue.fetchData({
          API: 'api/RegMng/PGetRetailerPayList',
          para,
          callback: (data) => {
            data.RetailerInfo.HmmServiceEndTime = mpvue.datetime(data.RetailerInfo.HmmServiceEndTime).date;
            data.RetailerInfo.JdhServiceEndTime = mpvue.datetime(data.RetailerInfo.JdhServiceEndTime).date;
            this.RetailerInfo = data.RetailerInfo
            this.RetailerPayList = data.RetailerPayList
          }
        })
      },
      initOrderList() {
        let para = JSON.parse(JSON.stringify(this.dataOut));
        para.status = para.orderStatus;
        para.UserSN_R = this.UserId;
        mpvue.fetchData({
          API: "api/Push/CityPusherGetMyRetailerOrderList",
          para,
          callback: data => {
            this.totalPages = data.TotalPages;
            wx.stopPullDownRefresh();
            this.dataIn.inited = true;
            let tmpData = data.Data;
            if (this.dataOut.PageIndex === 1) {
              this.dataIn.arrDataList = tmpData;
            } else {
              this.dataIn.arrDataList = [...this.dataIn.arrDataList, ...tmpData];
            }
          }
        });
      },
      goToOrderDetail(item) {
        wx.navigateTo({
          url: `/pages/workbench/orderDetail/orderDetailMain?orderType=${item.OrderType}&orderCode=${item.OrderCode}`
        });
      }
    },
    onLoad() {
      this.apiclient = process.env.APICLIENT;
      this.UserId = this.$root.$mp.query.UserId;

      var curMonth = (new Date().getMonth() + 1).toString().length > 1 ? (new Date().getMonth() + 1) : ('0' + (
        new Date()
        .getMonth() +
        1));
      var curDate = (new Date().getDate() + 1).toString().length > 1 ? (new Date().getDate()) : ('0' + (new Date()
        .getDate()));
      this.searchDate = new Date().getFullYear() + '.' + curMonth;
      this.endDate = new Date()
        .getFullYear() + '-' + curMonth + '-' + curDate;
      this.year = new Date().getFullYear();
      this.month =
        curMonth;
      this.curTabIndex = 0;
      this.initPageData();
      this.initOrderStatus();
      this.initProductPayment();
      mpvue.setNavigationBarTitle({
        title: "会员详情"
      });
    },
    onShow() {
      console.log(this.curTabIndex);
      if (this.curTabIndex == 2) {
        this.initFolRecord();
      }
      if(this.curTabIndex == 3){
        this.initProductPayment()
      }
    },
    onReachBottom() {
      console.log("load more data");
      if (this.totalPages > this.dataOut.PageIndex) {
        this.dataOut.PageIndex += 1;
        this.initPageData();
      }
    }
  }

</script>
<style lang="scss" scoped>

::-webkit-scrollbar { // 隐藏滚动条
  width: 0;
  height: 0;
  color: transparent;
  display:none;
}
  .page-footer-inner {
    line-height: 1.5;

    .iconxiegenjin,
    .icondianhua {
      font-size: 30rpx
    }
  }

  .iconshijian {
    font-size: 30rpx;
  }

  .tab-flex {
    display: flex;
    margin-right: 0;
    text-align: center;

    .item {
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
      margin: 0;
    }
  }



.scroll-x-box {
  white-space: nowrap;
  display: flex;
  position: relative;
  margin: auto;
  line-height: 100rpx;
}
.scroll-x-box-list {
  position:relative;
  text-align: center;
  width: 25%;
  display: inline-block;
}
.scroll-x-box-list.on {
  color: #3366FF;
}
.scroll-x-box-list.on:after {
  content: '';
  position: absolute;
  left: 50%;
  width: 40rpx;
  margin-left: -20rpx;
  bottom: 0rpx;
  height: 4rpx;
  background: #3366FF;
}

.pay ul li{
  width:100%;
  overflow:hidden;
  padding:30rpx 0;
  border-bottom:2rpx rgba(235,235,235,1) solid
}
.pay ul li:last-child{
  border-bottom:none
}
.pay ul li img{
  width:68rpx;
  height:68rpx;
  display:block;
  float:left
}
.pay ul li span{
  display:block;
  float:left;
  font-size:28rpx;
  color:#333;
  padding:6rpx 0 0 30rpx;
}
.pay ul li em{
  display:block;
  float:right;
  text-align:right;
  // margin-top:-20rpx
  padding-top: 6rpx;
}
.pay ul li strong{
  display:block;
  float:right;
  text-align:right;
  color:#999;
  padding-top: 6rpx;
}
.payTip{
  margin-top:20rpx;
  width:120rpx;
  height: 40rpx;
  line-height: 40rpx;
  background:rgba(236,241,255,1);
  font-size:20rpx;
  color: #3366ff;
  overflow: hidden;
  text-align: center
}
.pay-price{
  display: block;
  float:right;
  color: #FF0100;
  font-size: 36rpx;
}
.pay-price em{
  float:left;
  font-size: 10px;
  padding-top:10rpx
}

.record{
  margin-top:20rpx;
}

.payjl{
  padding-bottom: 20rpx;
  border-bottom:2rpx rgba(235,235,235,1) solid
}




</style>
