<template>
  <div class="page">
    <img :src="payImg" mode="widthFix" class="headImg">
    <div class="row-item">
      <div class="text-large text-bold mb20">开户账号：{{phone}} </div>

      <div class="text-center p30" v-if="PlatformType==2&&IsContinue!=1">
        <div class="tab-bar ">
          <span class="item" :class="{on:index==curTabIndex}" @click="switchTab(index)" v-for="(item,index) in arrTab"
            :key="index">
            {{item.title}}
          </span>
        </div>
      </div>
      <div class="item" v-if="PlatformType==1">
        <radio-group class="radio-group mb15" @change="radioChange($event,item)" v-if="IsContinue">
          <div class="dis-flex flex-center pt30 pb30 border-top-light border-bottom-light"
            v-if="objData.PuserHmmContinueServiceFeeForOneYear!=0">
            <div class="item text-xxx-large ">
              <span class="text-bold">￥{{objData.PuserHmmContinueServiceFeeForOneYear}}</span>
              <div class="text-middle"> 慧买卖 1年服务费 </div>
            </div>
            <label class="radio">
              <radio :value="1" checked />
              <i class="icon"></i>
            </label>
          </div>
          <div class="dis-flex flex-center pt30 pb30 border-top-light border-bottom-light"
            v-if="objData.PuserHmmContinueServiceFeeForTwoYear!=0">
            <div class="item text-xxx-large ">
              <span class="text-bold">￥{{objData.PuserHmmContinueServiceFeeForTwoYear}}</span>
              <div class="text-middle"> 慧买卖 2年服务费 </div>
            </div>
            <label class="radio">
              <radio :value="2" />
              <i class="icon"></i>
            </label>
          </div>
          <div class="dis-flex flex-center   pt30 pb30 border-top-light border-bottom-light"
            v-if="objData.PuserHmmContinueServiceFeeForThreeYear!=0">
            <div class="item text-xxx-large ">
              <span class="text-bold">￥{{objData.PuserHmmContinueServiceFeeForThreeYear}}</span>
              <div class="text-middle"> 慧买卖 3年服务费 </div>
            </div>
            <label class="radio">
              <radio :value="3" />
              <i class="icon"></i>
            </label>
          </div>
        </radio-group>
        <radio-group class="radio-group mb15" @change="radioChange($event,item)" v-else>
          <div class="dis-flex flex-center   pt30 pb30 border-top-light border-bottom-light"
            v-if="objData.PuserHmmServiceFeeForOneYear!=0">
            <div class="item text-xxx-large ">
              <span class="text-bold">￥{{objData.PuserHmmServiceFeeForOneYear}}</span>
              <div class="text-middle"> 慧买卖 1年服务费 </div>
            </div>
            <label class="radio">
              <radio :value="1" checked />
              <i class="icon"></i>
            </label>
          </div>
          <div class="dis-flex flex-center pt30 pb30 border-top-light border-bottom-light"
            v-if="objData.PuserHmmServiceFeeForTwoYear!=0 ">
            <div class="item text-xxx-large ">
              <span class="text-bold">￥{{objData.PuserHmmServiceFeeForTwoYear}}</span>
              <div class="text-middle"> 慧买卖 2年服务费 </div>
            </div>
            <label class="radio">
              <radio :value="2" />
              <i class="icon"></i>
            </label>
          </div>
          <div class="dis-flex flex-center   pt30 pb30 border-top-light border-bottom-light"
            v-if="objData.PuserHmmServiceFeeForThreeYear!=0">
            <div class="item text-xxx-large ">
              <span class="text-bold">￥{{objData.PuserHmmServiceFeeForThreeYear}}</span>
              <div class="text-middle"> 慧买卖 3年服务费 </div>
            </div>
            <label class="radio">
              <radio :value="3" />
              <i class="icon"></i>
            </label>
          </div>
        </radio-group>
      </div>
      <div class="item" v-else-if="PlatformType==2&&OpenJdhType==2">
        <radio-group class="radio-group mb15" @change="radioChange($event,item)" v-if="IsContinue">
          <div class="dis-flex flex-center   pt30 pb30 border-top-light border-bottom-light"
            v-if="objData.PuserJdhContinueServiceFeeForOneYear!=0">
            <div class="item text-xxx-large ">
              <span class="text-bold">￥{{objData.PuserJdhContinueServiceFeeForOneYear}}</span>
              <div class="text-middle"> 家电汇专业版 1年服务费 </div>
            </div>
            <label class="radio">
              <radio :value="1" checked />
              <i class="icon"></i>
            </label>
          </div>
          <div class="dis-flex flex-center pt30 pb30 border-top-light border-bottom-light"
            v-if="objData.PuserJdhContinueServiceFeeForTwoYear!=0 ">
            <div class="item text-xxx-large ">
              <span class="text-bold">￥{{objData.PuserJdhContinueServiceFeeForTwoYear}}</span>
              <div class="text-middle"> 家电汇专业版 2年服务费 </div>
            </div>
            <label class="radio">
              <radio :value="2" />
              <i class="icon"></i>
            </label>
          </div>
          <div class="dis-flex flex-center   pt30 pb30 border-top-light border-bottom-light"
            v-if="objData.PuserJdhContinueServiceFeeForThreeYear!=0">
            <div class="item text-xxx-large ">
              <span class="text-bold">￥{{objData.PuserJdhContinueServiceFeeForThreeYear}}</span>
              <div class="text-middle"> 家电汇专业版 3年服务费 </div>
            </div>
            <label class="radio">
              <radio :value="3" />
              <i class="icon"></i>
            </label>
          </div>
        </radio-group>
        <radio-group class="radio-group mb15" @change="radioChange($event,item)" v-else>
          <div class="dis-flex flex-center   pt30 pb30 border-top-light border-bottom-light"
            v-if="objData.PuserJdhServiceFeeForOneYear!=0">
            <div class="item text-xxx-large ">
              <span class="text-bold">￥{{objData.PuserJdhServiceFeeForOneYear}}</span>
              <div class="text-middle"> 家电汇专业版 1年服务费 </div>
            </div>
            <label class="radio">
              <radio :value="1" checked />
              <i class="icon"></i>
            </label>
          </div>
          <div class="dis-flex flex-center pt30 pb30 border-top-light border-bottom-light"
            v-if="objData.PuserJdhServiceFeeForTwoYear!=0 ">
            <div class="item text-xxx-large ">
              <span class="text-bold">￥{{objData.PuserJdhServiceFeeForTwoYear}}</span>
              <div class="text-middle"> 家电汇专业版 2年服务费 </div>
            </div>
            <label class="radio">
              <radio :value="2" />
              <i class="icon"></i>
            </label>
          </div>
          <div class="dis-flex flex-center   pt30 pb30 border-top-light border-bottom-light"
            v-if="objData.PuserJdhServiceFeeForThreeYear!=0">
            <div class="item text-xxx-large ">
              <span class="text-bold">￥{{objData.PuserJdhServiceFeeForThreeYear}}</span>
              <div class="text-middle"> 家电汇专业版 3年服务费 </div>
            </div>
            <label class="radio">
              <radio :value="3" />
              <i class="icon"></i>
            </label>
          </div>
        </radio-group>
      </div>
      <div class="item" v-else-if="PlatformType==2&&OpenJdhType==1">
        <radio-group class="radio-group mb15" @change="radioChange($event,item)" v-if="IsContinue">
          <div class="dis-flex flex-center   pt30 pb30 border-top-light border-bottom-light"
            v-if="objData.PuserJdhBaseContinueServiceFeeForOneYear!=0">
            <div class="item text-xxx-large ">
              <span class="text-bold">￥{{objData.PuserJdhBaseContinueServiceFeeForOneYear}}</span>
              <div class="text-middle"> 家电汇基础版 1年服务费 </div>
            </div>
            <label class="radio">
              <radio :value="1" checked />
              <i class="icon"></i>
            </label>
          </div>
          <div class="dis-flex flex-center pt30 pb30 border-top-light border-bottom-light"
            v-if="objData.PuserJdhBaseContinueServiceFeeForTwoYear!=0 ">
            <div class="item text-xxx-large ">
              <span class="text-bold">￥{{objData.PuserJdhBaseContinueServiceFeeForTwoYear}}</span>
              <div class="text-middle"> 家电汇基础版 2年服务费 </div>
            </div>
            <label class="radio">
              <radio :value="2" />
              <i class="icon"></i>
            </label>
          </div>
          <div class="dis-flex flex-center   pt30 pb30 border-top-light border-bottom-light"
            v-if="objData.PuserJdhBaseContinueServiceFeeForThreeYear!=0">
            <div class="item text-xxx-large ">
              <span class="text-bold">￥{{objData.PuserJdhBaseContinueServiceFeeForThreeYear}}</span>
              <div class="text-middle"> 家电汇基础版 3年服务费 </div>
            </div>
            <label class="radio">
              <radio :value="3" />
              <i class="icon"></i>
            </label>
          </div>
        </radio-group>
        <radio-group class="radio-group mb15" @change="radioChange($event,item)" v-else>
          <div class="dis-flex flex-center   pt30 pb30 border-top-light border-bottom-light"
            v-if="objData.PuserJdhBaseServiceFeeForOneYear!=0">
            <div class="item text-xxx-large ">
              <span class="text-bold">￥{{objData.PuserJdhBaseServiceFeeForOneYear}}</span>
              <div class="text-middle"> 家电汇基础版 1年服务费 </div>
            </div>
            <label class="radio">
              <radio :value="1" checked />
              <i class="icon"></i>
            </label>
          </div>
          <div class="dis-flex flex-center pt30 pb30 border-top-light border-bottom-light"
            v-if="objData.PuserJdhBaseServiceFeeForTwoYear!=0 ">
            <div class="item text-xxx-large ">
              <span class="text-bold">￥{{objData.PuserJdhBaseServiceFeeForTwoYear}}</span>
              <div class="text-middle"> 家电汇基础版 2年服务费 </div>
            </div>
            <label class="radio">
              <radio :value="2" />
              <i class="icon"></i>
            </label>
          </div>
          <div class="dis-flex flex-center pt30 pb30 border-top-light border-bottom-light"
            v-if="objData.PuserJdhBaseServiceFeeForThreeYear!=0">
            <div class="item text-xxx-large ">
              <span class="text-bold">￥{{objData.PuserJdhBaseServiceFeeForThreeYear}}</span>
              <div class="text-middle"> 家电汇基础版 3年服务费 </div>
            </div>
            <label class="radio">
              <radio :value="3" />
              <i class="icon"></i>
            </label>
          </div>
        </radio-group>
      </div>
    </div>

    <div class="page-footer">
      <div class="page-footer-inner dis-flex ">
        <span class="ml30 ">合计： <span class="text-bold text-xxx-large">￥{{ServiceFee}}</span></span>
        <div class="item text-right ">
          <button class="btn btn-full w50p btn-primary text-xx-large"  @click="goPay()">确认支付</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        IsContinue: 0, //是否续费
        ServiceFee: "",
        openYear: "1",
        curTabIndex: 0,
        PlatformType: 1, //1慧买卖 2家电汇
        OpenJdhType: 1, //1基础版 2专业版
        UserSN: "",
        phone: "",
        imgServer: "",
        payImg: "",
        objData: {
          PuserHmmServiceFeeForOneYear: "",
          PuserHmmServiceFeeForTwoYear: "",
          PuserHmmServiceFeeForThreeYear: "",
          PuserHmmContinueServiceFeeForOneYear: "",
          PuserHmmContinueServiceFeeForTwoYear: "",
          PuserHmmContinueServiceFeeForThreeYear: "",
          PuserJdhServiceFeeForOneYear: "",
          PuserJdhServiceFeeForTwoYear: "",
          PuserJdhServiceFeeForThreeYear: "",
          PuserJdhContinueServiceFeeForOneYear: "",
          PuserJdhContinueServiceFeeForTwoYear: "",
          PuserJdhContinueServiceFeeForThreeYear: "",
          PuserJdhBaseServiceFeeForOneYear: "",
          PuserJdhBaseServiceFeeForTwoYear: "",
          PuserJdhBaseServiceFeeForThreeYear: "",
          PuserJdhBaseContinueServiceFeeForOneYear: "",
          PuserJdhBaseContinueServiceFeeForTwoYear: "",
          PuserJdhBaseContinueServiceFeeForThreeYear: "",
        },
        items: [{
          price: 88,
          maketPrice: 888.00,
        }],
        arrTab: [{
          title: '基础版'
        }, {
          title: '专业版'
        }]
      }
    },
    methods: {
      radioChange(e, item) {
        this.openYear = e.target.value;
        if (this.PlatformType == 1) {
          if (this.openYear == 1) {
            this.ServiceFee = this.objData.PuserHmmServiceFeeForOneYear;
          } else if (this.openYear == 2) {
            this.ServiceFee = this.objData.PuserHmmServiceFeeForTwoYear;
          } else {
            this.ServiceFee = this.objData.PuserHmmServiceFeeForThreeYear;
          }
        } else {
          if (this.OpenJdhType == 2) {
            if (this.openYear == 1) {
              this.ServiceFee = this.objData.PuserJdhServiceFeeForOneYear;
            } else if (this.openYear == 2) {
              this.ServiceFee = this.objData.PuserJdhServiceFeeForTwoYear;
            } else {
              this.ServiceFee = this.objData.PuserJdhServiceFeeForThreeYear;
            }
          } else {
            if (this.openYear == 1) {
              this.ServiceFee = this.objData.PuserJdhBaseServiceFeeForOneYear;
            } else if (this.openYear == 2) {
              this.ServiceFee = this.objData.PuserJdhBaseServiceFeeForTwoYear;
            } else {
              this.ServiceFee = this.objData.PuserJdhBaseServiceFeeForThreeYear;
            }
          }
        }


      },
      getPhone() {
        mpvue.fetchData({
          API: 'api/Push/GroundPusherGetPhoneBySn',
          para: {
            UserSN: this.UserSN
          },
          callback: (data) => {
            this.phone = data.UserName;
          }
        })
      },
      switchTab(index) {
        this.openYear = 1
        this.curTabIndex = index;
        this.OpenJdhType = index + 1;
        if (this.OpenJdhType == 1) {
          this.ServiceFee = this.objData.PuserJdhBaseServiceFeeForOneYear;
        } else {
          this.ServiceFee = this.objData.PuserJdhServiceFeeForOneYear;
        }
      },
      initPage() {
        this.payImg = this.imgServer + "/dist/images/payImg.jpg";
        if (this.PlatformType == 2) {
          this.payImg = this.imgServer + "/dist/images/payJdhImg.jpg";
        } else {
          this.payImg = this.imgServer + "/dist/images/payImg.jpg";
        }
        mpvue.fetchData({
          API: 'api/Push/GroundPusherGetService',
          para: {},
          callback: (data) => {
            this.objData = data;
            if (this.PlatformType == 1) {
              this.ServiceFee = this.IsContinue ? this.objData.PuserHmmContinueServiceFeeForOneYear : this
                .objData.PuserHmmServiceFeeForOneYear;
            } else if (this.PlatformType == 2 && this.OpenJdhType == 2) {
              this.ServiceFee = this.IsContinue ? this.objData.PuserJdhContinueServiceFeeForOneYear : this
                .objData.PuserJdhServiceFeeForOneYear;
            } else {
              this.ServiceFee = this.IsContinue ? this.objData.PuserJdhBaseContinueServiceFeeForOneYear : this
                .objData.PuserJdhBaseServiceFeeForOneYear;
            }
          }
        })
      },
      goPay() {
        let para = {};
        let me = this;
        para.UserSN = this.UserSN;
        para.PlatformType = this.PlatformType;
        para.OpenJdhType = this.OpenJdhType;
        para.ServiceFee = this.ServiceFee;
        para.openYear = this.openYear;
        para.IsContinue = this.IsContinue;
        //原始接口 -- ServiceFeePayForWechat -- 废弃
        //新接口-商品一体化 ServiceFeePayForWechatNew
        mpvue.fetchData({
          API: '/api/Pay/ServiceFeePayForWechatNew',
          para,
          callback: (data) => {
            let wxPara = JSON.parse(data.WxPayData);
            wxPara.success = function (res) {
              if (me.IsContinue) {
                wx.redirectTo({
                  url: '/pages/downloadPage/downloadPageMain'
                });
              } else {
                wx.redirectTo({
                  url: `/pages/reg/regSuccess/regSuccessMain?openPlatFormType=${me.PlatformType}`
                });
              }

            };
            wxPara.fail = function (res) {
              console.log(res);
              wx.redirectTo({
                url: `/pages/reg/regError/regErrorMain?message=${res.errMsg}&PlatformType=${me.PlatformType}`
              });
            };
            wx.requestPayment(wxPara);
          }
        })
      }
    },
    onLoad() {
      this.UserSN = wx.getStorageSync("UserSN") || this.$root.$mp.query.UserSN || '';
      this.IsContinue = this.$root.$mp.query.IsContinue || 0;
      this.PlatformType = this.$root.$mp.query.PlatformType || 1;
      this.imgServer = process.env.APICLIENT;
      this.getPhone();
      this.initPage();
      mpvue.setNavigationBarTitle({
        title: "缴费"
      });
    }
  }

</script>
<style lang="scss" scoped>
  .headImg {
    width: 100%;
  }

  .tab-bar {
    >.item {
      padding: 0 60rpx;
    }
  }

</style>
