<template>
  <div class="page split-t-gray">
    <div class="row-item">
      <div class="dis-flex pt30 pb30 border-bottom-light">
        <div class="bg-primary q-title mr15 ">Q1
          <div class="nw-triggle"></div>
        </div>
        <div class="item">
          <div class="anchor-row text-large anchor-row-vertical" :class="{'on':isShowQ1}" @click="getShowInfo('Q1')">
            什么是城市拍档？</div>
          <div v-if="isShowQ1" class="mt20 text-light">
            城市拍档是家电汇在各城市事业合伙人，不需要任何投资，做自己的CEO，时间自由，不影响自己原有工作，变现自有资源，创建一份属于自己的事业。
          </div>
        </div>
      </div>
      <div class="dis-flex pt30 pb30 border-bottom-light">
        <div class="bg-primary q-title mr15">Q2
          <div class="nw-triggle"></div>
        </div>
        <div class="item">
          <div class="anchor-row text-large anchor-row-vertical" :class="{'on':isShowQ1}" @click="getShowInfo('Q2')">
            城市拍档晋升规则？</div>
          <div v-if="isShowQ2" class="mt20 text-light">
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
          </div>
        </div>
      </div>
      <div class="dis-flex pt30 pb30 border-bottom-light">
        <div class="bg-primary q-title mr15">Q3
          <div class="nw-triggle"></div>
        </div>
        <div class="item">
          <div class="anchor-row text-large anchor-row-vertical" :class="{'on':isShowQ3}" @click="getShowInfo('Q3')">
            城市拍档收益说明？</div>
          <div v-if="isShowQ3" class="mt20 text-light">
            <table class="table table-bordered text-center text-small">

              <tbody>
                <tr>
                  <td class="item">城市拍档薪酬组成说明</td>
                </tr>
                <tr>
                  <td style="width: 10%">等级</td>
                  <td style="width: 15%">月度固定服务费</td>
                  <td style="width: 15%">会员店开户提成</td>
                  <td class="item">销售提成</td>
                  <td style="width: 10%">阶段任务奖励</td>
                  <td style="width: 10%">明星激励</td>
                  <td style="width: 10%">存量客户</td>
                </tr>
                <tr>
                  <td style="width: 10%">0星</td>
                  <td style="width: 15%"></td>
                  <td style="width: 15%">50元</td>
                  <td class="item"></td>
                  <td style="width: 10%">√</td>
                  <td style="width: 10%"></td>
                  <td style="width: 10%"></td>
                </tr>
                <tr>
                  <td style="width: 10%">1星</td>
                  <td style="width: 15%"></td>
                  <td style="width: 15%">50元</td>
                  <td class="item">√</td>
                  <td style="width: 10%">√</td>
                  <td style="width: 10%"></td>
                  <td style="width: 10%"></td>
                </tr>
                <tr>
                  <td style="width: 10%">2星</td>
                  <td style="width: 15%">1000</td>
                  <td style="width: 15%">50元</td>
                  <td class="item">√</td>
                  <td style="width: 10%">√</td>
                  <td style="width: 10%">√</td>
                  <td style="width: 10%">√</td>
                </tr>
                <tr>
                  <td style="width: 10%">3星</td>
                  <td style="width: 15%">2000</td>
                  <td style="width: 15%">50元</td>
                  <td class="item">√</td>
                  <td style="width: 10%">√</td>
                  <td style="width: 10%">√</td>
                  <td style="width: 10%">√</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="dis-flex pt30 pb30 border-bottom-light">
        <div class="bg-primary q-title mr15">Q4
          <div class="nw-triggle"></div>
        </div>
        <div class="item">
          <div class="anchor-row text-large anchor-row-vertical" :class="{'on':isShowQ3}" @click="getShowInfo('Q4')">
            城市拍档权益规则</div>
          <div v-if="isShowQ4" class="mt20">
            <div>
              <p>1）月度固定服务费：2星以上城市拍档代表慧聪云商运维客户的月度固定服务费；</p>
              <p>2）会员店开户提成：城市拍档代表慧聪云商在所辖区域所招徕的会员店（买家）均享有开户提成</p>
              <p>3）销售提成：会员店从慧买卖平台采购自营商品的不含税金额*分佣比例(综合平均不低于1%)；</p>
              <p>4）阶段任务奖励：阶段性奖励，以慧聪云商月度营销文件为准；</p>
              <p>5）明星奖励：城市拍档月度排名奖励，奖励金额不低于所属星级月度固定奖金，以慧聪云商月度营销文件为准；</p>
              <p>6）城市拍档晋升1星后增加其所辖会员店从慧买卖平台提货额分佣奖金的权益；</p>
              <p>7）城市拍档晋升2星以上增加月度固定服务费；</p>
              <p>城市拍档晋升2星以上可从公海中挑选会员店进行运营维护，享有会员店从慧买卖平台提货额的分佣奖金，所挑选的客户连续2个月未激活，掉回公海，不再享有掉落客户的分佣奖金且不可再次选择；</p>
            </div>
          </div>
        </div>
      </div>
      <div class="dis-flex pt30 pb30 border-bottom-light">
        <div class="bg-primary q-title mr15">Q5
          <div class="nw-triggle"></div>
        </div>
        <div class="item">
          <div class="anchor-row text-large anchor-row-vertical" :class="{'on':isShowQ5}" @click="getShowInfo('Q5')">
            城市拍档淘汰规则？</div>
          <div v-if="isShowQ5" class="mt20 text-light">
            <p>1.城市拍档签约后3个月内未能晋升1星拍档。</p>
            <p>2.城市拍档所辖会员店连续2个月客户激活率低于20%。</p>
            <p>3.城市拍档与慧聪云商合作期间同时兼职其它类似互联网平台。</p>
          </div>
        </div>
      </div>
      <div class="dis-flex pt30 pb30 border-bottom-light">
        <div class="bg-primary q-title mr15">Q6
          <div class="nw-triggle"></div>
        </div>
        <div class="item">
          <div class="anchor-row text-large anchor-row-vertical" :class="{'on':isShowQ6}" @click="getShowInfo('Q6')">
            每月赚取的收益什么时候可以提现？提现是到哪里？</div>
          <div v-if="isShowQ6" class="mt20">
            <p>1.客户开发收益：会员店完成注册且通过审核后，由系统结算相应奖励金额至城市拍档管理账号中，即时到账；（注册完成后）</p>
            <p>2.销售提成收益：会员店在慧买卖系统中确认收货后，由系统结算相应提成金额至城市拍档管理账号中，即时到账；（订单完成后）</p>
            <p>
              3.奖金及其它收益：次月15日前（遇法定节假日顺延）将相应服务费金额发放至城市拍档管理账号中，需选择结算方式：A.结算现金（不含税提货额），提供服务费发票；B.结算现金（不含税提货额），公司代扣20%个人所得税（劳务费）；C.兑换平台等额现金采购券。
            </p>
          </div>
        </div>
      </div>
      <div class="dis-flex pt30 pb30 border-bottom-light">
        <div class="bg-primary q-title mr15">Q7
          <div class="nw-triggle"></div>
        </div>
        <div class="item">
          <div class="anchor-row text-large anchor-row-vertical" :class="{'on':isShowQ7}" @click="getShowInfo('Q7')">
            若产生会员店退费及交易退货，如城市拍档已收取相应服务费后怎么办？</div>
          <div v-if="isShowQ7" class="mt20 text-light">
            若产生会员店退费及交易退货，如城市拍档已收取相应服务费，应返还相应金额；慧聪云商有权于下次城市拍档结算时从城市拍档管理账号中扣除相应金额，如一个月内城市拍档账号内服务费不足扣除部分的，城市拍档应以线下对公转账的方式补齐。
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
        isShowQ1: false,
        isShowQ2: false,
        isShowQ3: false,
        isShowQ4: false,
        isShowQ5: false,
        isShowQ6: false,
        isShowQ7: false,
      }
    },
    methods: {
      getShowInfo(item) {
        console.log(item);
        this['isShow' + item] = !this['isShow' + item]
      }
    },
    onLoad() {
      mpvue.setNavigationBarTitle({
        title: "常见问题"
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

</style>
