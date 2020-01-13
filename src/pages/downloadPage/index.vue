<template>
  <div class="page bg-gray">
    <div class="text-center">
      <div class="bg-ct-member ">
        <div class="dis-flex  text-white text-xxx-large">
          <div class="avater">
            <img mode="aspectFill" :src="objData.UserImage?objData.UserImage:'/static/images/headImg.jpg'" role="img">
          </div>
          <div class="nickName text-left ml20">
            <div>{{objData.UserName}}</div>
            <div>{{objData.RealName}}</div>
          </div>
        </div>
      </div>
      <div class="p20 dis-flex bg-white m20 tips-info br10">
        <div class="item" @click="showPopup(0)">
          <div class="iconfont iconfuwujingli text-primary"></div>
          <div>{{objData.SubjectionType==0?'平台':objData.PusherRealName}}</div>
          <div class="text-xx-small text-lighter">
            <span v-if="objData.SubjectionType==1">运营商</span>
            <span v-else-if="objData.SubjectionType==2">服务经理</span>
            <span v-else>-</span>
          </div>
        </div>
        <div class="item" style="position: relative">
          <div class="iconfont iconzaixiankefu text-primary"></div>
          <div>在线客服</div>
          <button open-type="contact" style="position:absolute;top:0;width:100%;height:100%;opacity:0" />
          <div class="text-xx-small text-lighter">常见问题解答</div>
        </div>
        <div class="item" @click="showPopup(1)">
          <div class="iconfont icondianhuakefu text-primary"></div>
          <div>电话客服</div>
          <div class="text-xx-small text-lighter">9:00-18:30</div>
        </div>
      </div>
      <div class="user-list bg-white m20 br10 mt20">
        <div class="item row-item">
          <div class="img-box">
            <img mode="widthFix" src="https://hmm.jdhui.com/new/dist/images/hmm-logo.png" alt="">
          </div>
          <div class="info">
            <div class="dis-flex flex-sb">
              <div class="w60p text-left">
                <p class="text-large text-bold">慧买卖
                  <span v-if="objData.IsOpenHmm">
                    <span class="tag tag-o-primary" v-if="objData.HmmStatus==0">待提交资料</span>
                    <span class="tag tag-o-primary" v-else-if="objData.HmmStatus==2 || objData.HmmStatus==3">待审核</span>
                    <span class="tag tag-o-primary" v-else-if="objData.HmmStatus==4">审核失败</span>
                    <span class="tag tag-o-primary" v-else-if="objData.HmmStatus==1">正常</span>
                    <span class="tag tag-o-primary" v-else-if="objData.HmmStatus==11">过期</span>
                    <span class="tag tag-o-primary" v-else-if="objData.HmmStatus==10">冻结</span>
                  </span>
                </p>
                <p class="text-lighter">
                  <span v-if="objData.IsOpenHmm">到期时间：{{objData.HmmServiceEndTime}}</span>
                  <span v-else>未开通</span>

                </p>
              </div>
              <div class="text-right text-x-small ">
                <span v-if="objData.IsOpenHmm">
                  <span class="border-danger" v-if="objData.HmmStatus==1 || objData.HmmStatus==11"
                    @click="goUrl('/pages/login/payment/paymentMain?IsContinue=1&PlatformType=1')">立即续费</span>
                  <span class="border-danger" v-else-if="objData.JdhStatus==10" @click="showPopup(1)">联系客服</span>
                  <span v-else-if="objData.HmmStatus==2 || objData.HmmStatus==3">请耐心等待审核</span>
                  <span v-else-if="objData.HmmStatus==4 || objData.HmmStatus==0">请到慧买卖APP完善资料
                  </span>
                </span>
                <span v-else>
                  <span class="border-danger"
                    @click="goUrl('/pages/login/payment/paymentMain?PlatformType=1')">立即开通</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="item row-item border-top-light">
          <div class="img-box">
            <img mode="widthFix" src="https://shop.jdhui.com/new/dist/images/jdh-logo.png" alt="">
          </div>
          <div class="info">
            <div class="dis-flex flex-sb">
              <div class="w60p text-left">
                <p class="text-large text-bold">家电汇
                  <span v-if="objData.IsOpenJdh">
                    <span class="tag tag-o-primary" v-if="objData.JdhStatus==0">待提交资料</span>
                    <span class="tag tag-o-primary" v-else-if="objData.JdhStatus==2 || objData.JdhStatus==3">待审核</span>
                    <span class="tag tag-o-primary" v-else-if="objData.JdhStatus==4">审核失败</span>
                    <span class="tag tag-o-primary" v-else-if="objData.JdhStatus==1">正常</span>
                    <span class="tag tag-o-primary" v-else-if="objData.JdhStatus==11">过期</span>
                    <span class="tag tag-o-primary" v-else-if="objData.JdhStatus==10">冻结</span>
                  </span>
                </p>
                <p class="text-lighter">
                  <span v-if="objData.IsOpenJdh"> 到期时间：{{objData.JdhServiceEndTime}}</span>
                  <span v-else>未开通</span>
                </p>
              </div>
              <div class="text-right text-x-small ">
                <span v-if="objData.IsOpenJdh">
                  <span class="border-danger" v-if="objData.JdhStatus==1 ||   objData.JdhStatus==11"
                    @click="goUrl('/pages/login/payment/paymentMain?IsContinue=1&PlatformType=2')">立即续费</span>
                  <span v-else-if="objData.JdhStatus==2 || objData.JdhStatus==3">请耐心等待审核</span>
                  <span class="border-danger" v-else-if="objData.JdhStatus==10" @click="showPopup(1)">联系客服</span>
                  <span v-else-if="objData.JdhStatus==4 || objData.JdhStatus==0">请到家电汇APP完善资料
                  </span>
                </span>
                <span v-else>
                  <span class="border-danger"
                    @click="goUrl('/pages/login/payment/paymentMain?PlatformType=2')">立即开通</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="user-list bg-white m20 br10 mt20">
        <div class="item row-item">
          <div class="dis-tc" style="width:96rpx">
            <span class="icon-down icon-bbh"><i class="iconfont iconbanbenhao"></i></span>
          </div>
          <div class="text-left info">
            <p class="text-large text-bold">版本号<span class="fr text-x-small text-lighter">1.1.13</span></p>
          </div>
        </div>
      </div>
      <div class="user-list bg-white m20 br10 mt20">
        <div class="item row-item">
          <div class="dis-tc" style="width:96rpx">
            <span class="icon-down"><i class="iconfont iconxiazai"></i></span>
          </div>
          <div class="text-left info anchor-row" @click="goUrl('/pages/workbench/productInstall/productInstallMain')">
            <p class="text-large text-bold">产品安装</p>
          </div>
        </div>
      </div>
    </div>
    <div class="login-text-logo text-lighter p20">
      <button class="btn btn-default block mb10" @click="onLogOut">退出</button>
      <!-- <div class="mt10">联系客服：<span @click="onCall">400-807-3818</span></div> -->
    </div>
    <popup :show.sync="isShowPopup" :title="isChekedPlatform?'平台客服':'服务经理'" btnOKText="拨打" close-after-click="true"
      @after-ok="callService">
      <div class="text-large" v-if="isChekedPlatform">
        400-807-3818
      </div>
      <div class="text-large" v-else>
        <span v-if="objData.SubjectionType==2">{{objData.PusherRealName}}:{{objData.PusherUserName}} </span>
        <span v-else>400-807-3818</span>
      </div>
    </popup>
  </div>
</template>

<script>
  import goUrl from "@/utils/goUrl";
  import popup from "@/components/confirm";
  export default {
    data() {
      return {
        isChekedPlatform: "",
        errReason: "",
        errDesc: "",
        isShowPopup: false,
        UserSN: "",
        objData: {
          UserImage: "",
          UserName: "",
          RealName: "",
          PusherUserName: "",
          SubjectionType: 0 //0平台 1运营商 2拍档
        }
      };
    },
    components: {
      popup
    },
    methods: {
      goUrl,
      initPageData() {
        let para = {};
        para.UserSN = this.UserSN;
        mpvue.fetchData({
          API: 'api/Push/CityPusherGetRetailerInfo',
          para,
          callback: (data) => {
            this.objData = data; //
          }
        })
      },
      onLogOut() {
        mpvue.fetchData({
          API: "api/UserAuth/CityPusherLoginOut",
          callback: data => {
            // 销毁证据
            mpvue.removeStorageSync("userInfo");
            mpvue.removeStorageSync("token");
            mpvue.removeStorageSync("UserSN");
            wx.redirectTo({
              url: '/pages/login/loginMain'
            })
          }
        });
      },
      showPopup(index) {
        this.isChekedPlatform = index;
        this.isShowPopup = true;
      },
      onCall() {
        mpvue.makePhoneCall({
          phoneNumber: mpvue.TEL
        });
      },
      callService() {
        if (this.isChekedPlatform) {
          mpvue.makePhoneCall({
            phoneNumber: mpvue.TEL
          });
        } else {
          mpvue.makePhoneCall({
            phoneNumber: this.objData.PusherUserName
          });
        }

      }
    },
    onLoad() {
      this.UserSN = wx.getStorageSync("UserSN") || this.$root.$mp.query.UserSN || '';
      mpvue.setNavigationBarTitle({
        title: "会员中心"
      });
      this.initPageData();

    },
    onShow() {}
  };

</script>

<style lang="scss" scoped>
  @import '@/SCSS/base/_variables.scss';

  .iconfont {
    font-size: 36rpx;
  }

  .icon-down {
    width: 50rpx;
    height: 50rpx;
    border-radius: 10rpx;
    background: linear-gradient(to bottom, #11E9DD, #03C3CD);
    display: inline-block;
    color: #fff;
  }

  .icon-bbh {

    background: linear-gradient(to bottom, #00BEFF, #2593FF);
  }

  .bg-ct-member {
    background: $color-primary;
    height: 300rpx;
    padding: 40rpx 20rpx 0;

    .avater {
      image {
        width: 120rpx;
        height: 120rpx;
        border-radius: 100%;
      }
    }
  }

  .tips-info {
    margin-top: -100rpx;
  }

  .user-list {
    .row-title {
      margin-right: 0
    }
  }

</style>
