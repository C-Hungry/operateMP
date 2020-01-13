<template>
  <div class="page bg-gray">
    <div class="order-detail">
      <div class="bg-white">
        <div class="border-top-light border-bottom-split-gray">
          <div class="row-item">
            <div class="fr l-text-small text-danger" v-if="computedIsAdvance || computedIsCrowd">
              <span>{{objDataInfo.OrderMiniStatusDesc}}</span>
              <p v-if="objDataInfo.OrderStatus==1 || objDataInfo.OrderStatus==3" v-html="adOrderStatusDetail"></p>
            </div>
            <div class="fr l-text-small text-danger" v-else>
              <span v-if="objDataInfo.OrderStatus!=0" v-html="orderStatusDetail"></span>
              <span v-else>
                <span class="text-danger" v-if="objDataInfo.OrderCloseType==1">买家关闭订单</span>
                <span class="text-danger" v-if="objDataInfo.OrderCloseType==2">卖家关闭订单</span>
                <!-- <span class="text-danger" v-if="objDataInfo.OrderCloseType==3">平台关闭</span> -->
                <span class="text-danger" v-if="objDataInfo.OrderCloseType==4">超时未付款</span>
                <span class="text-danger" v-if="objDataInfo.OrderCloseType==5">退款成功</span>
                <span class="text-danger" v-if="objDataInfo.OrderCloseType==7">卖家审核线下付款失败</span>
              </span>
            </div>
            <i class="iconfont mr5 icon-fukuan" v-if="objDataInfo.OrderStatus==1"></i>
            <i class="iconfont mr5 icon-dengdai" v-if="objDataInfo.OrderStatus>1&&objDataInfo.OrderStatus<6 "></i>
            <i class="iconfont mr5 icon-chenggong" v-if="objDataInfo.OrderStatus==6"></i>
            <i class="iconfont mr5 icon-guanbi" v-if="objDataInfo.OrderStatus==-1 || objDataInfo.OrderStatus==0"></i>
            {{objDataInfo.OrderStatusDesc}}
          </div>
        </div>
        <div class="border-bottom-split-gray">
          <div class="row-item thin border-bottom-split-gray"
            v-if="(objDataInfo.OrderStatus==3||objDataInfo.OrderStatus==4||objDataInfo.OrderStatus==5||objDataInfo.OrderStatus==6) && (!computedIsAdvance && !computedIsCrowd) ">
            <span class="anchor-row">
              <i class="icon mr5 icon-car"></i>
              <span v-if="objDataInfo.OrderStatus==3">部分货物已发出，请您准备收货</span>
              <span v-else>货物已送出，点击查看物流信息</span>
            </span>
          </div>
          <div class="row-item thin  bg-warning">
            <span class="text-ellipsis dis-inline-block fl mr5">{{objDataInfo.ReceiverName}}</span>
            {{objDataInfo.ReceiverPhone}}
            <p class="text-light text-ellipsis">{{objDataInfo.AddressInfo}}</p>
          </div>
        </div>
        <div>
          <div class="row-item" v-if="objDataInfo.SupplierName">

            <span class="l-ytitle ">{{objDataInfo.SupplierName}}</span>
          </div>
          <div class="border-top-light">
            <div :key="index" class="border-bottom-split-gray" v-for="(item,index) in objDataInfo.GoodsDetails">
              <template v-if="item.IsTaocan==1">
                <div class="row-item">
                  <span class="tag tag-o-danger">套餐</span>优惠套餐
                </div>
                <div class="goods-list row-list" :key="index1" v-for="(item,index1) in item.TaocanList">
                  <goods-item :goods="item"></goods-item>
                </div>
                <div class="row-item border-bottom-light">
                  <span class="fr">x {{item.ProCount}}</span>
                  套餐价：
                  <span class="price">
                    {{item.ProPrice}}
                    <span v-if="item.TaocanDiscount>0">(节省{{item.TaocanDiscount}})</span>
                  </span>
                </div>
              </template>
              <template v-else>
                <div class="row-item" v-if="item.IsManjian==1">
                  <span class="tag tag-o-danger">满减</span>
                  {{objDataInfo.ManjianRule}}
                </div>
                <div class="row-list goods-list">
                  <goods-item :goods="item"></goods-item>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="border-bottom-split-gray">
          <div class="row-item">
            买家留言：
            <span class="text-light">{{objDataInfo.Message}}</span>
          </div>
          <div class="row-item border-top-light">
            <span class="btn fr small" @click="copy(curOrderCode)">复制</span>
            订单号：{{curOrderCode}}
          </div>
          <div class="row-item border-top-light">下单时间：{{objDataInfo.DateAdded}}</div>

          <template v-if="computedPayWay.depositWay&&computedPayWay.depositWay!=''">
            <div class="row-item border-top-light">
              <span v-if="objDataInfo.OrderChannelType==5">预订时间：</span>
              <span v-else-if="objDataInfo.OrderChannelType==4">集采时间：</span>
              <span v-else>支付时间：</span>
              {{computedPayWay.depositTime}}</div>
            <div class="row-item border-top-light">
              <span v-if="objDataInfo.OrderChannelType==5">预订方式：</span>
              <span v-else-if="objDataInfo.OrderChannelType==4">集采方式：</span>
              <span v-else>支付方式：</span>
              {{computedPayWay.depositWay}}</div>
          </template>
          <template v-if="computedPayWay.tailTime&&computedPayWay.tailTime!=''">
            <div class="row-item border-top-light">尾款时间：{{computedPayWay.tailTime}}</div>
            <div class="row-item border-top-light">尾款方式：{{computedPayWay.tailWay}}</div>
          </template>
        </div>
        <div class="border-bottom-split-gray">
          <div class="row-item text-right">
            <p class="clearfix">
              <span class="fl text-light">商品总额</span>
              ￥{{objDataInfo.OrderTotalMoney}}
            </p>
            <div class="dis-flex" v-if="computedIsAdvance || computedIsCrowd">
              <!-- 订金加尾款的显示情况 -->
              <div class="dis-flex" style="width:100%;" v-if="objDataInfo.ProSaleType == 3">
                <ul class="mt10">
                  <li class="item pt10">
                    <p class="datail">订金</p>
                  </li>
                  <li class="item mt15">
                    <p class="detail">尾款</p>
                  </li>
                </ul>
                <div class="item">
                  <div class="pt10">
                    <span class="text-danger">￥{{objDataInfo.DepositFinalMoney}}</span>
                  </div>
                  <div class="mt15">
                    <span class="text-danger">￥{{objDataInfo.TailFinalMoney}}</span>
                  </div>
                </div>
              </div>
              <!-- 全款的显示情况 -->
              <div class="dis-flex" style="width:100%;" v-else>
                <ul class="mt10">
                  <li class="item pt10">
                    <p class="datail">全款</p>
                  </li>
                </ul>
                <div class="item pt10">
                  <div>
                    <span class="text-danger">￥{{objDataInfo.DepositFinalMoney}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <p class="clearfix">
                <span class="fl text-light">优惠金额</span>
                ￥{{objDataInfo.DiscountCoupon}}
              </p>
              <p class="clearfix">
                <span class="fl text-light">立减金额</span>
                ￥{{objDataInfo.DiscountManjian}}
              </p>
              <p class="clearfix" v-if="objDataInfo.DiscountOffLinePay&&objDataInfo.DiscountOffLinePay>0">
                <span class="fl text-light">线下立减金额</span>
                ￥{{objDataInfo.DiscountOffLinePay}}
              </p>
            </div>
          </div>
          <div class="row-item text-right border-top-light" v-if="!computedIsAdvance && !computedIsCrowd">
            <span
              v-if="objDataInfo.OrderStatus==1 && (objDataInfo.ProofStatus==1 || objDataInfo.ProofStatus==0 )">需付款：</span>
            <span v-else>实付金额：</span>
            <span class="price">￥{{objDataInfo.FinalTotalMoney}}</span>
          </div>
          <div class="row-item text-right border-top-light" v-else>
            <span class="text-danger">需付款：</span>
            <span class="price">￥
              {{objDataInfo.NeedPayFinalMoney}}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  /**
   * @Author: zhao.liubin@zol.com.cn
   * @Date: 2019-04-03 11:05:49
   * @Desc: 订单详情页
   */
  import priceSplit from "@/components/priceSplit.vue";
  import countDown from "@/utils/Zcountdown.js";
  import goodsItem from "@/components/goodsItem.vue";
  export default {
    components: {
      priceSplit,
      goodsItem,
    },
    data() {
      return {
        curOrderCode: "",
        curOrderType: 1,
        curOrderChannelType: 1,
        objDataInfo: {
          PayDetails: [] //支付方式，多个
        },
        orderStatusDetail: "",
        adOrderStatusDetail: "",
        timeCountDown: 0
      };
    },
    computed: {
      computedPayWay() {
        let payWay = {};
        if (this.objDataInfo.PayDetails.length > 0) {
          payWay.depositWay = this.objDataInfo.PayDetails[0].DisplayName;
          payWay.depositTime = mpvue.datetime(this.objDataInfo.PayDetails[0].DateAdded).datetime
        }
        if (this.objDataInfo.PayDetails.length > 1) {
          payWay.tailWay = this.objDataInfo.PayDetails[1].DisplayName;
          payWay.tailTime = mpvue.datetime(this.objDataInfo.PayDetails[1].DateAdded).datetime
        }
        return payWay;
      },
      computedIsAdvance() {
        //判断是否预订商品
        return this.curOrderType == 5;
      },
      computedIsCrowd() {
        //判断是否众筹集采商品
        return this.curOrderType == 4;
      },
    },
    methods: {
      initPageData() {
        let para = {};
        para.orderCode = this.curOrderCode;
        para.orderType = this.curOrderType;
        mpvue.fetchData({
          API: "/api/OrderCenter/RGetOrderDetails",
          para,
          callback: data => {
            wx.stopPullDownRefresh();
            data.DateAdded = mpvue.datetime(data.DateAdded).datetime;
            this.objDataInfo = data;
            this.curOrderChannelType = data.OrderChannelType;
            clearInterval(this.timeCountDown);
            if (
              this.objDataInfo.OrderStatus == 1 &&
              this.objDataInfo.ProofStatus == 0
            ) {
              this.timeCountDown = setInterval(() => {
                if (
                  new Date() <
                  new Date(
                    this.objDataInfo.OrderCloseTime.replace("T", " ").replace(
                      /-/g,
                      "/"
                    )
                  )
                ) {
                  this.orderStatusDetail =
                    "剩余支付时间 " +
                    countDown(this.objDataInfo.OrderCloseTime).fullTimeCN;
                } else {
                  this.orderStatusDetail = "";
                }
              }, 1000);
            }
            if (
              this.objDataInfo.OrderStatus == 1 &&
              this.objDataInfo.ProofStatus == 1
            ) {
              this.orderStatusDetail = "待上传线下支付凭证";
            }
            if (
              this.objDataInfo.OrderStatus == 1 &&
              this.objDataInfo.ProofStatus == 2
            ) {
              this.orderStatusDetail = "线下付款待确认";
            }
            if (
              this.objDataInfo.OrderStatus == 1 &&
              this.objDataInfo.ProofStatus == 3
            ) {
              this.orderStatusDetail = "线下支付，财务审核线下付款信息未通过";
            }
            if (
              this.objDataInfo.OrderStatus == 2 ||
              this.objDataInfo.OrderStatus == 3
            ) {
              this.orderStatusDetail = "请耐心等待卖家发货";
            }
            if (this.objDataInfo.OrderStatus == 4) {
              this.timeCountDown = setInterval(() => {
                if (
                  new Date() <
                  new Date(
                    this.objDataInfo.OrderConfirmGoodsTime.replace(
                      "T",
                      " "
                    ).replace(/-/g, "/")
                  )
                ) {
                  this.orderStatusDetail =
                    "剩余自动确认收货时间 " +
                    countDown(this.objDataInfo.OrderConfirmGoodsTime).fullTimeCN;
                } else {
                  this.orderStatusDetail = "";
                }
              }, 1000);
            }
            if (this.objDataInfo.OrderStatus == 5) {
              //已完成
              this.timeCountDown = setInterval(() => {
                if (
                  new Date() <
                  new Date(
                    this.objDataInfo.OrderAutoCompleteTime.replace(
                      "T",
                      " "
                    ).replace(/-/g, "/")
                  )
                ) {
                  this.orderStatusDetail =
                    "剩余完成时间 " +
                    countDown(this.objDataInfo.OrderAutoCompleteTime).fullTimeCN;
                } else {
                  this.orderStatusDetail = "";
                }
              }, 1000);
            }
            if (
              (this.objDataInfo.OrderStatus == 1) &&
              (this.curOrderChannelType == 4 || this.curOrderChannelType == 5)
            ) {
              this.timeCountDown = setInterval(() => {
                if (
                  new Date() <
                  new Date(
                    this.objDataInfo.OrderCloseTime.replace("T", " ").replace(
                      /-/g,
                      "/"
                    )
                  )
                ) {
                  this.adOrderStatusDetail =
                    "剩余支付时间 " +
                    countDown(this.objDataInfo.OrderCloseTime).fullTimeCN;
                } else {
                  this.adOrderStatusDetail = "";
                }
              }, 1000);
            }
            if (
              this.objDataInfo.OrderStatus == 3 &&
              (this.curOrderChannelType == 4 || this.curOrderChannelType == 5)
            ) {
              this.timeCountDown = setInterval(() => {
                if (
                  new Date() <
                  new Date(
                    this.objDataInfo.TailPayEndTime.replace("T", " ").replace(
                      /-/g,
                      "/"
                    )
                  )
                ) {
                  this.adOrderStatusDetail =
                    "剩余支付时间 " +
                    countDown(this.objDataInfo.TailPayEndTime).fullTimeCN;
                } else {
                  this.adOrderStatusDetail = "";
                }
              }, 1000);
            }
          }
        });
      },
      delayReceive() {
        //延长收货
        wx.showModal({
          title: "操作提示",
          content: "您确定要延长收货时间吗？\r\n（提示：每笔订单只能延迟一次哦）",
          success: res => {
            if (res.confirm) {
              mpvue.fetchData({
                API: "/api/OrderCenter/ROrderExtendCollectGoods",
                para: {
                  orderCode: this.curOrderCode,
                  orderType: this.curOrderType
                },
                callback: data => {
                  this.initPageData();
                }
              });
            }
          }
        });
      },
      receiveGoods() {
        //确认收货
        wx.showModal({
          title: "操作提示",
          content: "请确认在收到商品后操作哦！",
          success: res => {
            if (res.confirm) {
              mpvue.fetchData({
                API: "/api/OrderCenter/RConfirmGoods",
                para: {
                  orderCode: this.curOrderCode,
                  orderType: this.curOrderType
                },
                callback: data => {
                  this.initPageData();
                }
              });
            }
          }
        });
      },
      delOrder() {
        wx.showModal({
          title: "操作提示",
          content: "确认要删除该交易吗？",
          success: res => {
            if (res.confirm) {
              mpvue.fetchData({
                API: "/api/OrderCenter/RHmmOrderDelete",
                para: {
                  orderCode: this.curOrderCode,
                  orderType: this.curOrderType
                },
                callback: data => {
                  wx.navigateTo({
                    url: "/pages/mine/orderList/orderListMain"
                  });
                }
              });
            }
          }
        });
      },
      cancelOrder() {
        wx.showModal({
          title: "操作提示",
          content: "确认要关闭该交易吗？",
          success: res => {
            if (res.confirm) {
              mpvue.fetchData({
                API: "/api/OrderCenter/RHmmOrderCancel",
                para: {
                  orderCode: this.curOrderCode,
                  orderType: this.curOrderType
                },
                callback: data => {
                  this.initPageData();
                }
              });
            }
          }
        });
      },
      goToPay() {
        if (this.objDataInfo.IsSelfSupport != 1) {
          mpvue.showTips("非自营店铺订单请到APP支付");
          return;
        }
        wx.navigateTo({
          url: `/pages/deal/pay/payMain?orderCode=${this.objDataInfo.OrderCode}`
        });
      },
      applyAfterSale() {
        mpvue.showTips("请在慧买卖APP内申请售后服务");
        return;
      },
      copy(str) {
        wx.setClipboardData({
          data: str,
          success(res) {
            mpvue.showTips("复制成功");
          }
        });
      }
    },
    onShow() {
      console.log("onShow");
    },
    onLoad() {
      mpvue.setNavigationBarTitle({
        title: "订单详情"
      });
      Object.assign(this.$data, this.$options.data());
      this.curOrderCode = this.$root.$mp.query.orderCode || "";
      this.curOrderType = this.$root.$mp.query.orderType || 1;
      this.initPageData();
    },
    onUnload() {
      clearInterval(this.timeCountDown);
    },
    onPullDownRefresh() {
      // 下拉刷新页面
      this.initPageData();
    }
  };
</script>