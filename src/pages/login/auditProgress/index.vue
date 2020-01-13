<template>
  <div>
    <div class="text-center m40 text-large">
      <div class="auth-image">
        <img mode="aspectFit" v-if="Status==1" src="/static/images/deng.png">
        <img mode="aspectFit" v-else-if="Status==3" src="/static/images/success.png">
        <img mode="aspectFit" v-else-if="Status==2" src="/static/images/fail.png">
      </div>
      <div class=" text-xxx-large text-default mt30 text-bold">
        <span v-if="Status==3">注册成功</span>
        <span v-else-if="Status==1">等待审核</span>
        <span v-else>资料认证审核失败</span>
      </div>
      <div class="m20">
        <span v-if="Status==1" class="text-lighter">
          资料认证中，预计1-3个工作日，请耐心等待！
        </span>
        <span v-if="Status==2&&AuditeFailMsg!=''" class="text-danger">
          原因：{{AuditeFailMsg}}
        </span>
      </div>
      <div class="m30">
        <button class="btn btn-primary block" @click="goUrl('/pages/index/main',3)"
          v-if="Status==3">点击进入会员店管理助手</button>
        <button class="btn btn-primary block" @click="goUrl('/pages/login/submitData/submitDataMain')"
          v-if="Status==2">重新提交</button>
        <button class="btn btn-primary block mt20" @click="gocontact" v-if="Status==2">电话联系客服</button>
      </div>

      <div class="login-text-logo text-lighter">
        联系客服:
        <span class="text-primary" @click="onCall">请致电：400-807-3818 </span>
      </div>

    </div>
    <popup :show.sync="isShowPopup" title="平台客服" btnOKText="拨打" close-after-click="true" @after-ok="onCall">
      <div class="text-middle ml20  mr20">
        400-807-3818
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
        UserSN: "",
        AuditeFailMsg: "",
        Status: 2,
        isShowPopup: false
      };
    },
    components: {
      popup
    },
    methods: {
      goUrl,
      initPage() {
        mpvue.fetchData({
          API: '/api/Push/GroundPusherQueryRegResult',
          para: {
            UserSN: this.UserSN
          },
          callback: (data) => {
            this.Status = data.Result; //result 0代缴费1代提交2待审核3审核失败4正常
            this.AuditeFailMsg = data.AuditeFailMsg;
          }
        })
      },
      gocontact() {
        this.isShowPopup = true;
      },
      onCall() { //打电话
        mpvue.makePhoneCall({
          phoneNumber: mpvue.TEL
        });
      },
    },
    onLoad() {
      mpvue.setNavigationBarTitle({
        title: "资料审核"
      });
      this.UserSN = wx.getStorageSync("UserSN") || this.$root.$mp.query.UserSN || '';
      this.initPage();
    },
    onShow() {}
  };

</script>

<style lang="scss" scoped>

</style>
