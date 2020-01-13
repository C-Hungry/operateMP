<template>
  <div class="page">
    <div class="page-footer" :class="isIPX?'isIPX':''">
      <div class="page-footer-inner dis-flex" v-if="InviteType==2">
        <span class="btn item btn btn-primary btn-full text-large"
          @click="goUrl('/pages/login/regLogin/regLoginMain?InviteType='+InviteType+'&PusherGroupId='+PusherGroupId)">马上注册成为{{InviteName}}</span>
      </div>
      <div class="page-footer-inner dis-flex" v-else>
        <span class="btn item btn btn-primary btn-full text-large"
          @click="goUrl('/pages/login/regLogin/regLoginMain?InviteType='+InviteType+'&&InvitationCode='+InvitationCode)">马上注册成为{{InviteName}}</span>
      </div>
    </div>
    <div class="page-content">
      <div v-if="InviteType==4"> <img mode="widthFix" :src="item" alt="" v-for="(item,index) in arrSrc" :key="index">
      </div>
      <div v-if="InviteType==3"><img mode="widthFix" :src="item" alt="" v-for="(item,index) in arrSrc" :key="index">
      </div>
      <div v-if="InviteType==2"><img mode="widthFix" :src="item" alt="" v-for="(item,index) in arrSrc" :key="index">
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
        InviteType: "",
        InviteName: "",
        PusherGroupId:'',
        isIPX: "",
        arrSrc: []
      }
    },
    computed: {},
    methods: {
      goUrl,
      initPageData() {
        let arrTemp = [];
        if (this.InviteType == 4) {
          for (let index = 0; index < 8; index++) {
            arrTemp.push(`${this.imgServer}/dist/images/newCityParter/${index+1}.png`)
          }
        } else if(this.InviteType == 3) {
          for (let index = 0; index < 2; index++) {
            arrTemp.push(`${this.imgServer}/dist/images/newCityParter/ct${index+1}.png`)
          }
        }else if(this.InviteType == 2){
          for (let index = 0; index < 2; index++) {
            arrTemp.push(`${this.imgServer}/dist/images/newCityParter/rt${index+1}.png`)
          }
        }
        this.arrSrc = arrTemp;
      }
    },
    onLoad() {
      this.imgServer = mpvue.IMGSERVER;
      this.InvitationCode = this.$root.$mp.query.InvitationCode || '';
      this.InviteType = this.$root.$mp.query.InviteType || '';
      this.PusherGroupId = this.$root.$mp.query.PusherGroupId || '';
      if(this.InviteType == 2){
        this.InviteName = "区域分总"
      }else if (this.InviteType == 3) {
        this.InviteName = "城市经理"
      } else if (this.InviteType == 4) {
        this.InviteName = "城市拍档"
      }
      this.initPageData();
      mpvue.setNavigationBarTitle({
        title: `注册${this.InviteName}`
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
    }
  }

</script>
<style lang="scss" scoped>
  img {
    width: 100%;
  }

</style>
