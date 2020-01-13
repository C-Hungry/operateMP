<template>
  <div class="page">
    <div class="page-footer">
      <div class="page-footer-inner dis-flex">
        <span class="btn btn-primary btn-full text-large item" style="background: #D23338"
          @click="goUrl('/pages/login/regLogin/regLoginMain?InviteType=5&openPlatformType=2&InvitationCode='+InvitationCode)">马上注册成为家电汇认证会员</span>
      </div>
    </div>
    <div class="page-content">
      <div class="bg bg-warning text-warning">
        嗨,老板！我是家电汇{{RoleName}}：{{RealName ? RealName:UserName}}
        <div>
          推荐一个APP给你，解决网上开店问题~
        </div>
      </div>
      <div class="bg-gold p40">
        <div class="bg-card p20">
          <div class="flex-sb">
            <div class="item text-xxx-large text-bold">
              <div>开发新用户</div>
              <div>注册家电汇认证会员</div>
            </div>
            <div class="item">
              <img src="https://hmm.jdhui.com/new/dist/images/jdh-logo.png" alt="">
            </div>
          </div>
          <div class="slogn text-small">
            一个APP解决网上开店问题
          </div>
        </div>
        <div class="dis-flex text-white text-center pt40">
          <div class="item">
            <div class="bg-circle"><i class="iconfont iconzhuangxiu"></i></div>
            <div>店铺装修</div>
          </div>
          <div class="item">
            <div class="bg-circle"><i class="iconfont iconyingxiaozhongxin"></i></div>
            <div>营销工具</div>
          </div>
          <div class="item">
            <div class="bg-circle"><i class="iconfont iconkehu"></i></div>
            <div>顾客管理</div>
          </div>
          <div class="item">
            <div class="bg-circle"><i class="iconfont iconfenxiao"></i></div>
            <div>合伙人分销</div>
          </div>
        </div>
      </div>
      <div class=" pb40">
        <div class=" border-light">

          <div class="mt30">
            <div>
              <img mode="widthFix" :src="item" class="hzImg" alt="" v-for="(item,index) in arrSrc" :key="index">
            </div>
          </div>
          <div class="m30 introlc ">
            <img mode="aspectFit" src="https://hmm.jdhui.com/new/dist/images/zhucelc.png" alt="">
            <div class="flex-sb text-center text-x-small mt10">
              <div class="item">
                注册并支付年费
                <p>成为认证会员</p>
              </div>
              <div class="item">
                下载家电汇APP
                <p>或搜索小程序</p>
              </div>
              <div class="item">
                开启店铺新
                <p> 会员福利礼包</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import goUrl from "@/utils/goUrl";
  export default {
    data() {
      return {
        InvitationCode: "",
        RoleName: "",
        RealName: "",
        UserName: "",
        imgServer: "",
        hmmLogoImg: "",
        zhucelc: "",
        hzImg: "",
        arrSrc: []
      }
    },
    methods: {
      goUrl,
      initPageData() {
        this.hmmLogoImg = this.imgServer + "/dist/images/hmm-logo.png";
        this.zhucelc = this.imgServer + "/dist/images/hmm-logo.png";
        mpvue.fetchData({
          API: 'api/Push/GroundPusherGetByCode',
          para: {
            InvitaCode: this.InvitationCode
          },
          callback: (data) => {
            console.log(data)
            this.RealName = data.RealName
            this.UserName = data.UserName;
            this.RoleName = data.RoleName;
          }
        })
        this.hzImg = this.imgServer + "/dist/images/zsgn.jpg"
        let arrTemp = [];
        for (let index = 0; index < 7; index++) {
          arrTemp.push(`https://shop.jdhui.com/new/dist/images/newIntroImgs/${index+1}.png`)
        }
        this.arrSrc = arrTemp;
      }
    },
    onLoad() {
      this.InvitationCode = this.$root.$mp.query.InvitationCode || '';
      this.imgServer = process.env.APICLIENT;
      this.initPageData();
      mpvue.setNavigationBarTitle({
        title: "注册家电汇会员"
      });
    }
  }

</script>
<style lang="scss" scoped>
  .title-info {
    text-align: center;

    .iconfont {
      font-size: 32rpx;
      color: #D23338;
    }

  }

  .hzImg {
    width: 100%;
  }

  .introlc {
    padding: 0 78rpx 30rpx;
    box-shadow: 1px 2px 14px #f1f1f1;

  }

</style>
