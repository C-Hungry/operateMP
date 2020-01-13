<template>
  <div class="page shareMember bg-gold">
    <div class="page-footer" :class="isIPX?'isIPX':''">
      <div class="page-footer-inner dis-flex">
        <button class="btn  btn-primary btn-full btn-gold text-bold text-xx-large item"
          @click="goUrl('/pages/yqMember/yqMemberMain?InvitaType=5')">去邀请新会员 得50元现金</button>
      </div>
    </div>
    <div class="p30 mb40">
      <div class="bg-card p20">
        <div class="flex-sb">
          <div class="item text-xxx-large text-bold">
            <div>开发新用户</div>
            <div>注册慧买卖认证会员</div>
          </div>
          <div class="item">
            <img :src="hmmLogo" alt="">
          </div>
        </div>
        <div class="slogn text-small">
          家电/3C实体店新零售成交神器!
        </div>
      </div>
      <div class="title-info text-white">
        <i class="iconfont iconqianbi icon-title pr20"></i>新会员注册成功得奖励
        <i class="iconfont iconqianbi icon-title pl10"></i>
      </div>
      <div class="dis-flex text-center text-xxx-large ">
        <div class="item bg-white br15 award p10" style="margin-right: 20rpx">
          <p class="award-title">自己可获得</p>
          <div class=" text-white award-content">
            <div class="num-size">50<span class="text-xx-small">元</span></div>
            <div class="text-x-small">现金奖励(可提现)</div>

          </div>
        </div>
        <div class="item bg-white br15 p10 award">
          <p class="award-title">新会员可获得</p>
          <div class=" text-white award-content">
            <div class="num-size">50<span class="text-xx-small">元</span></div>
            <div class="text-x-small">无门槛会员红包</div>

          </div>

        </div>
      </div>
      <div class="title-info text-white">
        <i class="iconfont iconqianbi icon-title pr20"></i>邀请新会员攻略
        <i class="iconfont iconqianbi icon-title pl10"></i>
      </div>
      <div class="bg-white br15 introlc  border-b10 p40">
        <img mode="aspectFit" :src="introlc" alt="">
        <div class="flex-sb text-center mt10">
          <div class="item">
            分享注册
            <p> 海报/小程序</p>
          </div>
          <div class="item">
            新会员支付
            <p> 88元注册</p>
          </div>
          <div class="item">
            登录APP领取
            <p>新会员福利包</p>
          </div>
        </div>
      </div>
      <div class="title-info text-white">
        <i class="iconfont iconqianbi icon-title pr20"></i>关于城市运营计划
        <i class="iconfont iconqianbi icon-title pl10"></i>
      </div>
      <div class="bg-white br15 border-b10 p30 mb40">
        <img mode="widthFix" :src="item" class="hmmImg" alt="" v-for="(item,index) in arrSrc" :key="index">
      </div>
    </div>
  </div>
</template>
<script>
  import goUrl from "@/utils/goUrl";
  export default {
    data() {
      return {
        inviteCode: "",
        isIPX: "",
        UserSN: "",
        hmmLogo: "",
        introlc: "",
        arrSrc: []
      }
    },
    methods: {
      goUrl,
      goShare() {

      },
      getInviteCode() {
        mpvue.fetchData({
          API: '/api/Push/PusherGetMyInvitaCode',
          callback: (data) => {
            this.inviteCode = data.InviteCode;
            this.UserSN = data.UserSN;
            this.hmmLogo = this.imgServer + "/dist/images/hmm-logo.png"
            this.introlc = this.imgServer + "/dist/images/introlc.png"
            mpvue.setStorageSync("inviteCode", data.InviteCode);
            mpvue.setStorageSync("UserSN", data.UserSN);
            let arrTemp = [];
            for (let index = 0; index < 14; index++) {
              arrTemp.push(`${this.imgServer}/dist/images/aCityParter/${index+1}.jpg`)
            }

            this.arrSrc = arrTemp;
          }
        })
      },
    },
    onLoad() {
      this.UserSN = wx.getStorageSync('UserSN') || "";
      this.imgServer = process.env.APICLIENT;
      this.getInviteCode();
      mpvue.setNavigationBarTitle({
        title: "邀新会员，赚赏金"
      });
      let isIPX = ""
      mpvue.getSystemInfo({
        success: function (res) {
          if (res.model.indexOf("iPhone X") >= 0 || res.model == "iPhone XR") {
            isIPX = 1;
          }
        }
      })
      this.isIPX = isIPX;
    },
    onPageScroll() { //滚动时页面命中选项卡

    },
    onShareAppMessage() {
      console.log(this.inviteCode);
      return {
        title: "ZOL慧买卖-实体店新零售成交神器",
        path: `pages/reg/regMain?inviteCode=${this.inviteCode}&UserSN=${this.UserSN}`,
        imageUrl: '/static/images/share.jpg'
      }
    }
  }

</script>
<style lang="scss" scoped>
  .hmmImg {
    width: 100%;
  }

</style>
