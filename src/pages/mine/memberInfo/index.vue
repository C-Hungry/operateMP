<template>
  <div class="page p40">
    <div class="mine_card p40">
      <div class="dis-flex">
        <div class="avater mr15"><img mode="aspectFill"
            :src="dataInfo.Pusher.image ? dataInfo.Pusher.image :'/static/images/headImg.jpg'" alt="">
        </div>
        <div class="nickName ">
          <div class="text-xxx-large text-bold">{{dataInfo.Pusher.RealName}}</div>
          <div class="user-label text-primary">
            <span v-if="dataInfo.Pusher.TierLvl==4"><i
                class="iconfont iconxing mr5"></i>{{dataInfo.Pusher.UserStar|| 0}} | </span>城市拍档</div>
        </div>
      </div>

      <div class="idnumber text-xxx-large">

        ID：{{dataInfo.Pusher.userid}}
      </div>
    </div>
    <div class="text-large p40 border-light mt30 text-bold">
      <div class="text-center text-xx-large">
        距{{(dataInfo.Pusher.UserStar)+1}}星城市拍档还差{{nextNumber}}个人
      </div>
      <section class="progress" v-if="dataInfo.Pusher.TierLvl==4">
        <dl class="item" :class="item.curStyle" v-for="(item,index) in dataInfo.StarMsg" :key="index">
          <dt class="bar">
            <progress :percent="item.percent" stroke-width="2" activeColor="#3366FF" border-radius="4"></progress>
          </dt>
          <dd class="tips">
            <div>{{item.StarLvl}}星</div>
            {{item.MinUserSNC==0 ?0 :(item.MinUserSNC+1)}}

          </dd>
        </dl>
      </section>
      <div class="title-info  text-xx-large border-top-light mt40 p40">
        <i class="iconfont iconqianbi icon-title pr20"></i> 新会员注册成功得奖励
        <i class="iconfont iconqianbi icon-title pl10"></i>
      </div>
      <div class="dis-flex text-center text-xxx-large ">
        <div class="item  br15 award p10 " style="margin-right: 20rpx">
          <p class="award-title">自己可获得</p>
          <div class="mt30 text-white award-content">
            <div>50元</div>
            <div class="text-xx-small">现金奖励(可提现)</div>

          </div>
        </div>
        <div class="item  br15 p10 award ">
          <p class="award-title">新会员可获得</p>
          <div class="mt30 text-white award-content">
            <div>50元</div>
            <div class="text-xx-small">无门槛新会员福利</div>
          </div>
        </div>
      </div>
      <div class="mt40">
        <button class="btn btn-primary w100  text-xx-large" style="padding: 20rpx"
          @click="goUrl('/pages/yqMember/yqMemberMain?InvitaType=5')">去邀请新会员 得50元现金</button>
      </div>
    </div>
    <div class=" border-light mt40 p40">
      <div class="title-info  text-xx-large "><i class="iconfont iconqianbi icon-title pr20"></i>城市拍档星级介绍 <i
          class="iconfont iconqianbi icon-title pl10"></i></div>
      <div class="mt40 mb40">
        <table class="table table-bordered text-center text-small">

          <tbody>
            <tr class="bg-gray ">
              <td style="width: 40%">等级</td>
              <td class="item">0星</td>
              <td class="item">1星</td>
              <td class="item">2星</td>
              <td class="item">3星</td>
            </tr>
            <tr>
              <td style="width: 40%">月度固定服务费</td>
              <td class="item"></td>
              <td class="item">50</td>
              <td class="item">1000</td>
              <td class="item">2000</td>
            </tr>
            <tr>
              <td style="width: 40%">会员店开户提成</td>
              <td class="item">50</td>
              <td class="item"><i class="text-ok iconfont iconduihao"></i></td>
              <td class="item">50</td>
              <td class="item">50</td>
            </tr>
            <tr>
              <td style="width: 40%">销售提成</td>
              <td class="item"></td>
              <td class="item"><i class="text-ok iconfont iconduihao"></i></td>
              <td class="item"><i class="text-ok iconfont iconduihao"></i></td>
              <td class="item"><i class="text-ok iconfont iconduihao"></i></td>
            </tr>
            <tr>
              <td style="width: 40%">阶段任务奖励</td>
              <td class="item"><i class="text-ok iconfont iconduihao"></i></td>
              <td class="item"></td>
              <td class="item"><i class="text-ok iconfont iconduihao"></i></td>
              <td class="item"><i class="text-ok iconfont iconduihao"></i></td>
            </tr>
            <tr>
              <td style="width: 40%">明星激励</td>
              <td class="item"></td>
              <td class="item"></td>
              <td class="item"><i class="text-ok iconfont iconduihao"></i></td>
              <td class="item"><i class="text-ok iconfont iconduihao"></i></td>
            </tr>
            <tr>
              <td style="width: 40%">存量用户</td>
              <td class="item"></td>
              <td class="item"></td>
              <td class="item"><i class="text-ok iconfont iconduihao"></i></td>
              <td class="item"><i class="text-ok iconfont iconduihao"></i></td>
            </tr>
            <tr>
              <td class="item">4星拍档等同3星拍档所有权益</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="title-info  text-xx-large "><i class="iconfont iconqianbi icon-title pr20"></i>城市拍档星级规则 <i
          class="iconfont iconqianbi icon-title pl10"></i></div>
      <div class="mt40 mb40">

        <table class="table table-bordered text-center text-xx-small">

          <tbody>
            <tr class="bg-gray">
              <td style="width: 10%">等级</td>
              <td style="width: 20%">客户开发（户）</td>
              <td style="width: 15%">激活率</td>
              <td class="item">销售（额）</td>
              <td style="width: 10%">备注</td>
            </tr>
            <tr>
              <td style="width: 10%">1星</td>
              <td style="width: 20%">10</td>
              <td style="width: 15%">0</td>
              <td class="item">无考核</td>
              <td style="width: 10%"></td>
            </tr>
            <tr>
              <td style="width: 10%">2星</td>
              <td style="width: 20%">30</td>
              <td style="width: 15%">30%</td>
              <td class="item">门店数量*3000元/店</td>
              <td style="width: 10%"></td>
            </tr>
            <tr>
              <td style="width: 10%">3星</td>
              <td style="width: 20%">50</td>
              <td style="width: 15%">30%</td>
              <td class="item">门店数量*3000元/店</td>
              <td style="width: 10%"></td>
            </tr>
            <tr>
              <td style="width: 10%">4星</td>
              <td class="item" rowspan="4">晋升城市经理或区域代理</td>
            </tr>

          </tbody>
        </table>
      </div>
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
      initPaeData() {
        mpvue.fetchData({
          API: 'api/push/GetGroundPusherMsg',
          callback: (data) => {
            data.StarMsg.forEach(el => {
              if (el.StarLvl < data.Pusher.UserStar) {
                el.percent = 100;
                el.curStyle = "actived"
              } else if (el.StarLvl == data.Pusher.UserStar) {
                if (data.Pusher.UserStarCount > el.MinUserSNC && data.Pusher.UserStarCount <= el.MaxUserSNC) {
                  let curMin = (el.MinUserSNC == 0 ? '0' : (el.MinUserSNC + 1))
                  console.log(curMin);
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
    onLoad() {
      this.initPaeData();
      mpvue.setNavigationBarTitle({
        title: "会员中心"
      });
    }
  }
</script>
<style lang="scss" scoped>
  .idnumber {
    margin-top: 110rpx;
  }

  .progress {
    .item {
      .bar {
        &:before {
          background: #CCCCCC !important;
        }
      }

      .tips {
        color: #C1D1FF !important;
      }

      &.now {
        &.item>.bar:before {
          background: #3366FF !important;
          border: 6rpx solid #C1D1FF !important;
          z-index: 9;
        }
      }

      &.actived {
        &.item>.bar:before {
          background: #3366FF !important;
          z-index: 9;
        }
      }
    }
  }

  .award {
    background: #FBFCFF;
    border: 1rpx solid #EBEBEB;
    border-bottom: 8rpx solid #DEF0FF;

    .award-content {
      height: 265rpx;
    }
  }

  .btn {
    width: 100%;
  }

  .title-info {
    text-align: center;
    font-weight: bold;

    .iconfont {
      font-size: 28rpx;
      color: #3366FF;
    }
  }

  .table {
    ._td {
      height: 70rpx;
      line-height: 70rpx;
    }
  }
</style>