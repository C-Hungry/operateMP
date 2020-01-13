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
            <div class="title">{{objInfo.RealName?objInfo.RealName:objInfo.UserName}}<span class="tag-label"><i
                  class="iconfont iconxing"></i>{{objInfo.StarsLevel}}</span> <span
                class="tag tag-o-danger ml10">{{objInfo.InvitaSourceDesc}}</span><span
                class="fr text-x-small text-lighter text-normal">服务经理</span></div>
            <div class="goods-desc">
              <span class="fr">{{objInfo.PRealName}}</span>
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
            <div class="text-small">{{objInfo.CreateTime?objInfo.CreateTime:'无'}}</div>
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
        <div class="tabs border-top-light border-bottom-light">
          <div class="item" :class="{on:index==curTabIndex}" @click="swtichTab(index)" v-for="(item,index) in arrTab"
            :key="index">
            {{item.name}}
          </div>
        </div>
      </div>
      <div class="row-item">
        <div class="bg-white" v-if="curTabIndex==0">
          <div class="row-item ">
            <div class="text-center text-x-large text-bold mt10">团队会员分析</div>
            <div class="mt20">
              <table class="table table-bordered text-center ">
                <tbody>
                  <tr>
                    <td class="item p20">
                      <p class="text-x-small text-lighter">累计会员总数</p>
                      <p class="text-bold">{{objMemberData.TotalRetailerNum}}</p>
                    </td>
                    <td class="item p20">
                      <p class="text-x-small text-lighter">直属开发会员数</p>
                      <p class="text-bold">{{objMemberData.DirectOpenRetailerNum}}</p>
                    </td>
                    <td class="item p20">
                      <p class="text-x-small text-lighter">团队开发会员数</p>
                      <p class="text-bold">{{objMemberData.TeamOpenRetailerNum}}</p>
                    </td>
                  </tr>
                  <tr>
                    <td class="item p20">
                      <p class="text-x-small text-lighter">有效会员总数</p>
                      <p class="text-bold">{{objMemberData.EffectiveRetailerNum}}</p>
                    </td>
                    <td class="item p20">
                      <p class="text-x-small text-lighter">已过期会员总数</p>
                      <p class="text-bold">{{objMemberData.OverdueRetailerNum}}</p>
                    </td>
                    <td class="item p20">
                      <p class="text-x-small text-lighter">待提交会员总数</p>
                      <p class="text-bold">{{objMemberData.WaitSubmitRetailerNum}}</p>
                    </td>
                  </tr>
                  <tr>
                    <td class="item p20">
                      <p class="text-x-small text-lighter">待审核会员总数</p>
                      <p class="text-bold">{{objMemberData.WaitAuditRetailerNum}}</p>
                    </td>
                    <td class="item p20">
                      <p class="text-x-small text-lighter">审核失败会员总数</p>
                      <p class="text-bold">{{objMemberData.AuditingRefuseRetailerNum}}</p>
                    </td>
                    <td class="item p20">
                      <p class="text-x-small text-lighter">已冻结会员总数</p>
                      <p class="text-bold">{{objMemberData.FrozenRetailerNum}}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="split-t-gray row-item">
            <div class="text-center text-x-large text-bold mt10 mb20">团队会员交易分析</div>
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
            <div class="mt20">
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
                      <p class="text-x-small text-lighter">本月有效会员数</p>
                      <p class="text-bold">{{objOrderData.TotalEffectiveRetailerNumByMonth}}</p>
                    </td>
                    <td class="item p20">
                      <p class="text-x-small text-lighter">本月成交会员数</p>
                      <p class="text-bold">{{objOrderData.TotalOrderRetailerNumByMonth}}</p>
                    </td>
                    <td class="item p20">
                      <p class="text-x-small text-lighter">本月会员激活率</p>
                      <p class="text-bold">{{objOrderData.ActivationRateByMonth}}%</p>
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
                      <p class="text-x-small text-lighter">本月订单笔数</p>
                      <p class="text-bold">{{objOrderData.TotalOrderNumByMonth}}</p>
                    </td>
                    <td class="item p20">
                      <p class="text-x-small text-lighter">本月有效订单笔数</p>
                      <p class="text-bold">{{objOrderData.TotalEffectiveOrderNumByMonth}}</p>
                    </td>
                    <td class="item p20">
                      <p class="text-x-small text-lighter">本月退货退款笔数</p>
                      <p class="text-bold">{{objOrderData.TotalRefundOrderNumByMonth}}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="bg-white" v-if="curTabIndex==1">

          <div class="user-list border-top-light pt10" 
            v-for="(item,index) in dataIn.arrRetailerList" 
            :key="index"
            @click="goUrl('/pages/workbench/myMember/myMemberDetail/myMemberDetailMain?UserId='+item.UserSN)">
            <div class="item row-item">
              <div class="img-box">
                <img :src="item.UserImage?item.UserImage:'/static/images/headImg.jpg'" alt="">
                <span class="img-label label-primary">{{item.StatusDesc}}</span>
              </div>
              <div class="info">
                <div class="title">{{item.RealName?item.RealName:item.UserName}} <span
                    class="tag tag-o-danger ml10">{{item.InvitaSourceDesc}}</span><span
                    class="fr text-x-small text-lighter text-normal">服务经理</span></div>
                <div class="goods-desc">
                  <span class="fr">{{item.PuserRealName}}</span>
                  <div class="text-ellipsis w70p">{{item.EnterpriseType==3?'个人':item.EnterpriseName}}</div>
                </div>
              </div>
            </div>
            <div class="dis-flex mb30">
              <div class="item text-center">
                <div class="text-lighter text-x-small">注册时间</div>
                <div class="text-small">{{item.CreateTime?item.CreateTime:'无'}}</div>
              </div>
              <div class="item text-center">
                <div class="text-lighter text-x-small">最近访问时间</div>
                <div class="text-small">{{item.LastVisitTime?item.LastVisitTime:'无'}}</div>
              </div>
              <div class="item text-center">
                <div class="text-lighter text-x-small">最近下单时间</div>
                <div class="text-small">{{item.LastOrderTime?item.LastOrderTime:'无'}}</div>
              </div>
            </div>
          </div>
          <div class="text-light  row-item text-center" style="padding-top:40%" v-if="dataIn.arrRetailerList.length==0">
            暂无相关数据
          </div>
        </div>
        <div class="row-item bg-white" v-if="curTabIndex==2">
          <ul class="audit-flow">
            <li class="item dis-flex" v-for="(item,index) in dataIn.objFolRecord" :key="index">
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
          <div class="text-light  row-item text-center" style="padding-top:40%" v-if="dataIn.objFolRecord.length==0">
            暂无相关数据
          </div>
        </div>
        <div class="row-item bg-white" v-if="curTabIndex==3">
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
          <div class="row-item border-top-light" v-if="objInfo.ShopBrandNames!=''">
            <div class="row-title text-lighter">主营品牌</div>
            <div class="row-content">
              {{objInfo.ShopBrandNames}}
            </div>
          </div>
          <div class="row-item border-top-light" v-if="objInfo.ShopImage!=''">
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
        curTabIndex: 0,
        totalPages: 0,
        UserId: "",
        StarsLevel: "",
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
        objOrderData: {},

        objMemberData: [],
        arrTab: [{
            name: '运营简报'
          }, {
            name: '会员列表'
          },
          {
            name: '跟进记录'
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
          arrDataList: [],
          arrRetailerList: [],
          objFolRecord: [],
        },
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

      bindDateChange(e) {
        this.year = e.mp.detail.value.split("-")[0];
        this.month = e.mp.detail.value.split("-")[1];
        this.searchDate = this.year + '.' + this.month;
        this.initOrderStatus();
      },
      initPageData(pageIndex) {
        let para = this.dataOut
        para.UserSN = this.UserId;
        para.StarsLevel = this.StarsLevel;
        // para.PageIndex = this.dataOut.pageIndex || pageIndex;
        // para.PageSize = this.dataOut.PageSize;

        mpvue.fetchData({
          API: 'api/Push/CityPusherGetMyTeamDetails',
          para,
          callback: (data) => {
            data.DateAdded = mpvue.datetime(data.DateAdded).date;
            data.DateModify = mpvue.datetime(data.DateModify).date;
            data.HmmServiceEndTime = mpvue.datetime(data.HmmServiceEndTime).date;
            data.JdhServiceEndTime = mpvue.datetime(data.JdhServiceEndTime).date;

            this.objInfo = data
          }
        })
      },
      initOrderStatus() {
        let para = {}
        para.UserSN = this.UserId;
        para.AnalysisType = this.AnalysisType;
        para.Year = this.year;
        para.Month = parseInt(this.month);
        mpvue.fetchData({
          API: 'api/Push/CityPusherGetMyTeamTransactionStatistic',
          para,
          callback: (data) => {
            data.ActivationRateByMonth = (data.ActivationRateByMonth * 100).toFixed(2);
            this.objOrderData = data;
          }
        })
      },
      initMemberData() {
        let para = {}
        para.UserSN = this.UserId;
        para.AnalysisType = this.AnalysisType;
        para.Year = this.year;
        para.Month = parseInt(this.month);
        mpvue.fetchData({
          API: 'api/Push/CityPusherGetMyTeamMemberStatistic',
          para,
          callback: (data) => {
            this.objMemberData = data;
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

            this.totalPages = data.TotalPages;
            this.dataIn.inited = true;
            let tmpData = data.Data;
            if (this.dataOut.PageIndex === 1) {
              this.dataIn.objFolRecord = tmpData;
            } else {
              this.dataIn.objFolRecord = [...this.dataIn.objFolRecord, ...tmpData];
            }
          }
        })
      },
      initOrderList() {
        let para = JSON.parse(JSON.stringify(this.dataOut));
        para.UserSN = this.UserId;
        mpvue.fetchData({
          API: "api/Push/CityPusherGetMyTeamRetailerList",
          para,
          callback: data => {
            this.totalPages = data.TotalPages;
            this.dataIn.inited = true;
            let tmpData = data.Data;
            tmpData.forEach(item=>{
              item.CreateTime = mpvue.datetime(item.CreateTime).date;
              item.LastVisitTime = mpvue.datetime(item.LastVisitTime).date;
              item.LastOrderTime = mpvue.datetime(item.LastOrderTime).date;
            })
            console.log("tmpData--->",tmpData)
            if (this.dataOut.PageIndex === 1) {
              this.dataIn.arrRetailerList = tmpData;
            } else {
              this.dataIn.arrRetailerList = [...this.dataIn.arrRetailerList, ...tmpData];
            }
          }
        });
      },
    },
    onLoad() {
      mpvue.setNavigationBarTitle({
        title: "城市运营详情"
      });
      Object.assign(this.$data, this.$options.data());
      this.curTabIndex = 0;
      this.UserId = this.$root.$mp.query.UserId;
      this.StarsLevel = this.$root.$mp.query.StarsLevel;
      var curMonth = (new Date().getMonth() + 1).toString().length > 1 ? (new Date().getMonth() + 1) : ('0' + (
        new Date().getMonth() + 1));
      var curDate = (new Date().getDate() + 1).toString().length > 1 ? (new Date().getDate()) : ('0' + (new Date()
        .getDate()));
      this.searchDate = new Date().getFullYear() + '.' + curMonth;
      this.endDate = new Date().getFullYear() + '-' + curMonth + '-' + curDate;
      this.year = new Date().getFullYear();
      this.month = curMonth;

      this.initPageData();
      this.initOrderStatus();
      this.initMemberData();

    },
    onShow() {
      console.log(this.curTabIndex);
      if (this.curTabIndex == 2) {
        this.initFolRecord();
      }
    },
    onReachBottom() {
      console.log("load more data");
      if (this.totalPages > this.dataOut.PageIndex) {
        this.dataOut.PageIndex += 1;
        this.initOrderList();
      }
    }
  }

</script>
<style lang="scss" scoped>
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

</style>
