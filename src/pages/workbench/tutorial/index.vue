<template>
  <div class="page split-t-gray">
    <div class="row-item">
      <div class="dis-flex">
        <div class="bg-primary q-title mr15">1
          <div class="nw-triggle"></div>
        </div>
        <div class="item  pb20">
          <div class="text-large anchor-row-vertical">
            通过“会员店管理助手" 小程序怎么邀请会员注册-系统操作流程？</div>
          <div class="text-lighter">
            工作台（小程序右下角）——邀新会员——生成独立小程序码——保存或直接发送给微信好友即可。
          </div>
        </div>
      </div>
      <div class="dis-flex mt10">
        <div class="bg-primary q-title mr15">2
          <div class="nw-triggle"></div>
        </div>
        <div class="item  pb20">
          <div class="text-large anchor-row-vertical">
            怎么协助客户安装慧买卖APP、怎么进入慧买卖小程序</div>
          <div class="text-lighter">
            会员完成小程序注册后，即可进入慧买卖小程序。根据会员所属区域，推送客服二维码给会员，会员添加客服后，由客服进行慧买卖APP指导安装。
          </div>
        </div>
      </div>
      <div class="dis-flex mt10">
        <div class="bg-primary q-title mr15">3
          <div class="nw-triggle"></div>
        </div>
        <div class="item  pb20">
          <div class="text-large anchor-row-vertical">
            注册成功后收益，开户奖励怎么查看？</div>
          <div class="text-lighter">
            会员注册成功慧买卖小程序后，城市拍档可在拍档小程序右下角钱包—收支明细或开户奖励明细中查看。
          </div>
        </div>
      </div>
      <div class="dis-flex mt10">
        <div class="bg-primary q-title mr15">4
          <div class="nw-triggle"></div>
        </div>
        <div class="item  pb20">
          <div class="text-large anchor-row-vertical">
            新会员怎么领取优惠券？</div>
          <div class="text-lighter">
            50元新会员优惠券在会员注册成功的同时，由系统自动推送到会员慧买卖账户，会员可登录慧买卖小程序（我的—优惠券）进行查看领取使用。
          </div>
        </div>
      </div>
      <div class="dis-flex mt10">
        <div class="bg-primary q-title mr15">5
          <div class="nw-triggle"></div>
        </div>
        <div class="item  pb20">
          <div class="text-large anchor-row-vertical">
            怎么提升自己的城市拍档的星级？</div>
          <div class="text-lighter">
            城市拍档通过星级管理，在完成客户开发任务、会员激活任务或阶段性任务均可提升星级，具体如下：
            <table class="table table-bordered text-center text-small">

              <tbody>
                <tr>
                  <td class="item">城市拍档分级</td>
                </tr>
                <tr>
                  <td style="width: 10%">等级</td>
                  <td style="width: 15%">客户开发（户）</td>
                  <td style="width: 15%">激活率</td>
                  <td class="item">销售（额）</td>
                  <td style="width: 10%">备注</td>
                </tr>
                <tr>
                  <td style="width: 10%">1星</td>
                  <td style="width: 15%">10</td>
                  <td style="width: 15%">0</td>
                  <td class="item">无考核</td>
                  <td style="width: 10%"></td>
                </tr>
                <tr>
                  <td style="width: 10%">2星</td>
                  <td style="width: 15%">30</td>
                  <td style="width: 15%">30%</td>
                  <td class="item">门店数量*3000元/店</td>
                  <td style="width: 10%"></td>
                </tr>
                <tr>
                  <td style="width: 10%">3星</td>
                  <td style="width: 15%">50</td>
                  <td style="width: 15%">30%</td>
                  <td class="item">门店数量*3000元/店</td>
                  <td style="width: 10%"></td>
                </tr>
                <tr>
                  <td style="width: 10%">4星</td>
                  <td class="item" rowspan="4">晋升城市经理或区域代理</td>
                </tr>
                <tr>
                  <td class="item">新签约城市拍档为0星拍档；无任务要求，可根据业绩情况直接晋升为1-3星；享受对应的城市拍档权益。</td>
                </tr>
              </tbody>
            </table>
            <div class="mt10 text-small">备注：1）客户开发指城市拍档代表慧聪云商在所辖区域所招徕的会员店（买家）的数量；
              2）激活率指城市拍档所辖会员店提货额≥ 1元的会员店数量/所辖会员店总数量；
              3）销售额指城市拍档所辖会员店总数量*销售任务；</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    methods: {

    },
    onLoad() {
      mpvue.setNavigationBarTitle({
        title: "新手教程"
      });
    }
  }

</script>
<style lang="scss" scoped>
  .q-title {
    width: 48rpx;
    height: 38rpx;
    color: #fff;
    text-align: center;
    position: relative;
    line-height: 38rpx;
    margin-top: 5rpx;
    font-size: 26rpx;

    .nw-triggle {
      position: absolute;
      bottom: -10rpx;
      left: 0;
      width: 0;
      height: 0;
      border-width: 6px 6px 0 0;
      border-style: solid;
      border-color: #3366FF transparent transparent transparent;
    }
  }

  .table {
    width: 100%;

  }

</style>
