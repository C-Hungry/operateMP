<template>
  <div>
    <div class="p40">页面加载中，请稍候...</div>
  </div>

</template>
<script>
  import popup from "@/components/confirm";
  export default {
    data() {
      return {
        inited: false,
        loginCode: "",
        InvitationCode: "",
        openPlatFormType: "",
        InviteType: "",
        PusherGroupId:'',
      }
    },
    components: {
      popup
    },
    methods: {
      login(callback) {
        mpvue.login({
          success: res => {
            this.loginCode = res.code;
            this.linkPath();
            if (typeof callback === "function") {
              callback();
            }
          }
        });
      },
      linkPath() {
        let para = {};
        para.WeChatCode = this.loginCode;
        para.RoleType = this.InviteType;
        para.InvitationCode = this.InvitationCode;
        para.openPlatFormType = this.openPlatFormType;
        mpvue.fetchData({
          API: 'api/UserAuth/LoginRetailerBeforeByWeChatNew',
          para,
          callback: (data) => {
            if (data.LoginStatus == 0) {
              if (this.InviteType == 5 && data.OpenPlatFormType == 1) {
                wx.redirectTo({
                  url: `/pages/reg/regEntry/regEntryMain?InvitationCode=${this.InvitationCode}` //邀请慧买卖会员界面
                })
              } else if (this.InviteType == 5 && data.OpenPlatFormType == 2) {
                wx.redirectTo({
                  url: `/pages/reg/JdhRegEntry/JdhRegEntryMain?InvitationCode=${this.InvitationCode}` //邀请家电汇会员界面
                })
              } else if (this.InviteType == 3 || this.InviteType == 4) {
                wx.redirectTo({
                  url: `/pages/reg/regParterEntry/regParterEntryMain?InviteType=${this.InviteType}&InvitationCode=${this.InvitationCode}`
                })
              } else if (this.InviteType == 2) {
                mpvue.fetchData({
                  API:'api/RegMng/CheckGroundPusher',
                  para:{
                    PusherGroupId:this.PusherGroupId
                  },
                  callback:(data)=>{
                    if(data == 1){
                      wx.redirectTo({
                        url:'/pages/reg/regCodeInvalid/regCodeInvalidMain'
                      })
                    }else{
                      wx.redirectTo({
                        url: `/pages/reg/regParterEntry/regParterEntryMain?InviteType=${this.InviteType}&PusherGroupId=${this.PusherGroupId}`
                      })
                    }
                  }
                })
              }

            } else {
              let userInfo = JSON.parse(JSON.stringify(data));
              delete userInfo.token;
              mpvue.setStorageSync("userInfo", userInfo);
              mpvue.setStorage({
                key: "token",
                data: data.token,
                success: () => {
                  mpvue.setStorageSync('UserSN', data.UserSN);
                  if (data.LoginType == 1 && data.Status == 1) {
                    wx.switchTab({
                      url: "/pages/index/main"
                    })
                  } else if (data.LoginType == 1 && data.Status == 0) {
                    wx.switchTab({
                      url: `/pages/login/submitData/submitDataMain?loginType=${data.LoginType}`
                    })
                  } else if (data.LoginType == 1 && (data.Status == 2 || data.Status == 3 || data.Status ==
                      4)) {
                    wx.switchTab({
                      url: `/pages/login/auditProgress/auditProgressMain?Status=${data.Status}`
                    })
                  } else if (data.LoginType == 0 && data.Status == -1) {
                    wx.redirectTo({
                      url: `/pages/login/payment/paymentMain?PlatformType=${data.OpenPlatFormType}`
                    })
                  } else if (data.LoginType == 0 && data.Status != -1) {
                    wx.redirectTo({
                      url: '/pages/downloadPage/downloadPageMain'
                    })
                  }
                }
              })
            }
          }
        })
      },
    },
    onLoad(query) {
      const scene = decodeURIComponent(query.scene);
      let invitedType = scene.split(",")[1] || '5';
      if (invitedType == 'undefined') {
        invitedType = "5";
      }
      let InvitationCode = scene.split(",")[0];
      let openPlatFormType = scene.split(",")[2];
      let PusherGroupId = scene.split(",")[3];
      this.InvitationCode = this.$root.$mp.query.InvitationCode || InvitationCode || '';
      this.openPlatFormType = this.$root.$mp.query.openPlatFormType || openPlatFormType || '1'; //1邀请慧买卖会员 2邀请家电汇会员
      this.InviteType = this.$root.$mp.query.invitedType || invitedType; //1平台运营2区域分总3城市经理4城市拍档5标准会员
      this.PusherGroupId = this.$root.$mp.query.PusherGroupId || PusherGroupId
      this.login();
    },
    onShow() {


    }
  }

</script>
