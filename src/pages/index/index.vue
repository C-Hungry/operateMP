<template>
  <div class="bg-gray page p25" v-if="inited">
    <div class="bg-white bg-box">
      <div class="p30 text-large text-bold" v-if="objData.yqjs || objData.yqxhy || objData.wdhy || objData.xsjc">会员工具
      </div>
      <div class="dis-flex text-center bg_index">
        <div class="col4" v-if="objData.yqjs">
          <a class="m10 mb40" @click="goUrl('/pages/workbench/yqIntroduce/yqIntroduceMain')">
            <img mode="aspectFit" :src="apiclient+'/dist/images/index/index1.png'" alt="">
            <p class="text-small">邀请会员介绍</p>
          </a>
        </div>
        <div class="col4" v-if="objData.yqxhy">
          <a class="m10 mb40" @click="goUrl('/pages/yqMember/yqMemberMain?InvitaType=5&openPlatFormType=1')">
            <img mode="aspectFit" :src="apiclient+'/dist/images/index/index9.png'" alt="">
            <p class="text-small">邀慧买卖会员</p>
          </a>
        </div>
        <div class="col4" v-if="objData.yqxhy">
          <a class="m10 mb40" @click="goUrl('/pages/yqMember/yqMemberMain?InvitaType=5&openPlatFormType=2')">
            <img mode="aspectFit" :src="apiclient+'/dist/images/index/index10.png'" alt="">
            <p class="text-small">邀家电汇会员</p>
          </a>
        </div>
        <div class="col4" v-if="objData.wdhy">
          <a class="m10 mb40" @click="goUrl('/pages/workbench/myMember/myMemberMain')">
            <img mode="aspectFit" :src="apiclient+'/dist/images/index/index3.png'" alt="">
            <p class="text-small">我的会员</p>
          </a>
        </div>
      </div>
    </div>
    <div class="bg-white  split-t-gray bg-box">
      <div class="p30 text-large text-bold" v-if="objData.csyyjs || objData.yqpd || objData.yqcsjl || objData.wdtd">
        运营管理</div>
      <div class="dis-flex text-center bg_index">
        <div class="col4" v-if="objData.csyyjs">
          <a class="m10 mb40" @click="goUrl('/pages/workbench/opIntroduce/opIntroduceMain')">
            <img mode="aspectFit" :src="apiclient+'/dist/images/index/index5.png'" alt="">
            <p class="text-small">城市拍档介绍</p>
          </a>
        </div>
        <div class="col4" v-if="objData.yqpd">
          <a class="m10 mb40" @click="goUrl('/pages/yqMember/yqMemberMain?InvitaType=4')">
            <img mode="aspectFit" :src="apiclient+'/dist/images/index/index6.png'" alt="">
            <p class="text-small">邀城市拍档</p>
          </a>
        </div>
        <div class="col4" v-if="objData.yqcsjl">
          <a class="m10 mb40" @click="goUrl('/pages/yqMember/yqMemberMain?InvitaType=3')">
            <img mode="aspectFit" :src="apiclient+'/dist/images/index/index7.png'" alt="">
            <p class="text-small">邀城市经理</p>
          </a>
        </div>
        <div class="col4" v-if="objData.wdtd">
          <a class="m10 mb40" @click="goUrl('/pages/workbench/myOperation/myOperationMain')">
            <img mode="aspectFit" :src="apiclient+'/dist/images/index/index8.png'" alt="">
            <p class="text-small">我的团队</p>
          </a>
        </div>
      </div>
    </div>
    <div class="bg-white  split-t-gray bg-box">
      <div class="p30 text-large text-bold" v-if="objData.hmm || objData.jdh || objData.cpaz || objData.ptkf">产品介绍</div>
      <div class="dis-flex text-center bg_index">
        <div class="col4" v-if="objData.hmm">
          <a class="m10 mb40" @click="goUrl('/pages/webview/webviewMain?url='+apiclient+'#/introHmm')">
            <img mode="aspectFit" :src="apiclient+'/dist/images/index/index9.png'" alt="">
            <p class="text-small">关于慧买卖</p>
          </a>
        </div>
        <div class="col4" v-if="objData.jdh">
          <a class="m10 mb40"
            @click="goUrl('/pages/webview/webviewMain?url=https://shop.jdhui.com/#/morePage/aboutJDH')">
            <img mode="aspectFit" :src="apiclient+'/dist/images/index/index10.png'" alt="">
            <p class="text-small">关于家电汇</p>
          </a>
        </div>
        <div class="col4" v-if="objData.cpaz">
          <a class="m10 mb40" @click="goUrl('/pages/workbench/productInstall/productInstallMain')">
            <img mode="aspectFit" :src="apiclient+'/dist/images/index/index11.png'" alt="">
            <p class="text-small">产品安装</p>
          </a>
        </div>
        <div class="col4" v-if="objData.ptkf">
          <a class="m10 mb40" @click="showKf">
            <img mode="aspectFit" :src="apiclient+'/dist/images/index/index12.png'" alt="">
            <p class="text-small">平台客服</p>
          </a>
        </div>
        <div class="col4" v-if="objData.xsjc">
          <a class="m10 mb40" @click="goUrl('/pages/workbench/tutorial/tutorialMain')">
            <img mode="aspectFit" :src="apiclient+'/dist/images/index/index4.png'" alt="">
            <p class="text-small">新手教程</p>
          </a>
        </div>
      </div>
    </div>
    <popup :show.sync="isShowContact">
      <div class="row-item text-center">
        <div class="text-lighter">您可以通过以下方式联系官方客服</div>
      </div>
      <div class="text-center">
        <div class="row-item border-top-light ">
          <button class="btn-contact " open-type="contact"
            style="position:absolute;top:0;width:100%;height:100%;opacity:0" />
          在线客服
        </div>
        <div class="row-item border-top-light" @click="onCall">
          电话客服
        </div>
        <div class="row-item border-top-light text-bold" @click="isShowContact=false">
          <span class="text-bold">关闭</span>

        </div>
      </div>
    </popup>
  </div>
</template>
<script>
  import goUrl from "@/utils/goUrl";
  import popup from '@/components/popupTemplate.vue';
  export default {
    data() {
      return {
        apiclient: "",
        isShowContact: false,
        inited: false,
        objData: {}
      };
    },
    components: {
      popup
    },
    methods: {
      goUrl,
      initEntry() {
        mpvue.fetchData({
          API: 'api/Push/GroundPusherGetAppIndexBefore',
          callback: (data) => {
            if (data.SkipType == 1) {
              this.initPage();
              this.inited = true;
            } else {
              wx.redirectTo({
                url: "/pages/reg/regMain"
              })
            }

          }
        })
      },
      initPage() {
        mpvue.fetchData({
          API: '/api/push/LoginUserAppWorkbench',
          callback: (data) => {
            this.objData = data;
            this.isShowContact = false;
          }
        })
      },
      showKf() {
        this.isShowContact = true;
      },
      onCall() {
        mpvue.makePhoneCall({
          phoneNumber: mpvue.TEL
        });
      },
    },
    onShow() {
      this.initEntry();
    },
    onLoad() {
      console.log("onLoad")
      this.apiclient = process.env.APICLIENT;
      mpvue.setNavigationBarTitle({
        title: "工作台"
      });
    },
    onReachBottom() {
      // 监视是否到页面底部
      console.log("我到底了，该加载数据了");

    }
  };

</script>
<style lang="scss" scoped>
  .bg-box {
    border-radius: 16rpx;
    box-shadow: 6rpx 6rpx 10rpx #f9f9f9;

    .bg_index {
      img {
        width: 80rpx;
        height: 80rpx;
      }

      .col4 {
        width: 25%;
      }
    }
  }

  .dis-flex {
    flex-wrap: wrap
  }

</style>
