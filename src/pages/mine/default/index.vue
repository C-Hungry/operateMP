<template>
  <div class="page p40">
    <div class="mine_card p40">
      <div class="dis-flex">
        <div class="avater mr15"><img mode="aspectFill"
            :src="dataInfo.Pusher.image ? dataInfo.Pusher.image :'/static/images/headImg.jpg'" alt="">
        </div>
        <div class="nickName ">
          <div class="text-xxx-large text-bold">
            {{dataInfo.Pusher.RealName? dataInfo.Pusher.RealName : dataInfo.Pusher.phone }}</div>
          <div class="user-label text-primary">
            <span v-if="dataInfo.Pusher.TierLvl==4"><i
                class="iconfont iconxing mr5"></i>{{dataInfo.Pusher.UserStar|| 0}} |</span>
            {{dataInfo.Pusher.TierName}}</div>
        </div>
      </div>
      <section class="progress" v-if="dataInfo.Pusher.TierLvl==4">
        <dl class="item" :class="item.curStyle" v-for="(item,index) in dataInfo.StarMsg" :key="index">
          <dt class="bar">
            <progress :percent="item.percent" stroke-width="2" backgroundColor="#175ADA" activeColor="#fff"
              border-radius="4"></progress>
          </dt>
          <dd class="tips">
            <i>{{item.StarLvl}}星</i>
            {{item.MinUserSNC==0 ?0 :(item.MinUserSNC+1)}}
          </dd>
        </dl>
        <!-- <dl class="item actived">
          <dt class="bar">
            <progress percent="100" stroke-width="2" backgroundColor="#175ADA" activeColor="#fff"
              border-radius="4"></progress>
          </dt>
          <dd class="tips">
            0
          </dd>
        </dl>
        <dl class="item now">
          <dt class="bar">
            <progress percent="40" stroke-width="2" backgroundColor="#175ADA" activeColor="#fff"
              border-radius="4"></progress>
          </dt>
          <dd class="tips ">
            10
          </dd>
        </dl>
        <dl class="item">
          <dt class="bar">
            <progress percent="0" stroke-width="2" backgroundColor="#175ADA" activeColor="#fff"
              border-radius="4"></progress>
          </dt>
          <dd class="tips">
            30
          </dd>
        </dl>
        <dl class="item ">
          <dt class="bar">
          </dt>
          <dd class="tips">
            50
          </dd>
        </dl> -->
      </section>
      <div class="text-x-small" v-if="dataInfo.Pusher.TierLvl==4">
        距{{(dataInfo.Pusher.UserStar)+1}}星城市拍档还差 {{nextNumber}}个会员店
        <span class="fr member-center" @click="goUrl('/pages/mine/memberInfo/memberInfoMain')">会员中心 ></span>
      </div>
    </div>
    <div class="text-large pt40">
      <div class="row-item border-bottom-light">
        <a class="anchor-row pt10 pb10" @click="goUrl('/pages/mine/question/questionMain')">
          <i class="iconfont iconchangjianwenti mr10"></i> 常见问题
        </a>
      </div>
      <div class="row-item border-bottom-light">
        <a href="" class="anchor-row pt10 pb10" @click="goUrl('/pages/mine/aboutUs/aboutUsMain')">
          <i class="iconfont iconguanyuwomen mr10"></i> 关于我们
        </a>
      </div>
      <div class="row-item border-bottom-light">
        <a href="" class=" pt10 pb10">
          <i class="iconfont iconbanbenhao mr10"></i> 版本号
          <span class="fr">1.1.13</span>
        </a>
      </div>
    </div>
    <div class="mt40">
      <button class="btn  btn-default block" @click="onLogOut">退出</button>
    </div>
  </div>
</template>
<script>
  import goUrl from "@/utils/goUrl";
  export default {
    data() {
      return {
        nextNumber: "",
        dataInfo: {
          Pusher: {},
          StarMsg: []
        }
      }
    },
    methods: {
      goUrl,
      onLogOut() {
        mpvue.fetchData({
          API: "api/UserAuth/CityPusherLoginOut",
          callback: data => {
            mpvue.removeStorageSync("token");
            wx.redirectTo({
              url: '/pages/login/loginMain'
            })
          }
        });

      },
      initPaeData() {
        mpvue.fetchData({
          API: 'api/push/GetGroundPusherMsg',
          callback: (data) => {
            data.StarMsg.forEach(el => {
              if (el.StarLvl < data.Pusher.UserStar) {
                el.percent = 100;
                el.curStyle = "actived"
              } else if (el.StarLvl == data.Pusher.UserStar) {
                if (data.Pusher.UserStarCount > el.MinUserSNC && data.Pusher.UserStarCount <= el
                  .MaxUserSNC) {
                  let curMin = (el.MinUserSNC == 0 ? '0' : (el.MinUserSNC + 1))
                  el.percent = parseInt((data.Pusher.UserStarCount - curMin) / (el.MaxUserSNC - curMin) *
                    100);
                  el.curStyle = "now"
                }
                this.nextNumber = el.MaxUserSNC + 1 - data.Pusher.UserStarCount;
              } else {
                el.percent = 0;
              }
            });
            this.dataInfo = data
          }
        })
      }
    },
    onShow() {
      this.initPaeData();
    },
    onLoad() {

      mpvue.setNavigationBarTitle({
        title: "我的"
      });
    }
  }
</script>
<style lang="scss" scoped>
  .iconfont {
    font-size: 36rpx;

    &.iconchangjianwenti {
      color: #FF9313;
    }

    &.iconguanyuwomen {
      color: #11E9DD;
    }

    &.iconbanbenhao {
      color: #00BEFF
    }
  }
</style>