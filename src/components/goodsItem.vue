<template>
  <div class="item">
    <div class="img-box">
      <img :src="goods.ProImage" alt="">
    </div>
    <div class="info">
      <span class="title">{{goods.ProName}}
      </span>
      <div class="text-light text-ellipsis mt10 goods-spec">
        <span class="bg-gray text-ellipsis  text-light p10">规格：{{goods.ProSpec||goods.SpecStr}}</span>
        <span class="fr ml5">x{{goods.ShowType==3?goods.ProCount:(goods.BuyCount||goods.ProCount)}}</span>
      </div>
      <div style="height:60rpx;" v-show="goods.IsFailure==1"></div>
      <div class="origin-price text-right">
        <span class="price fl text-bottom" v-if="goods.ShowType!=3">
          ￥
          <price-split :value="goods.ProPrice"></price-split>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
  /** 
   * @Author: zhao.liubin@zol.com.cn 
   * @Date: 2019-04-19 15:05:38 
   * @Desc: 横向表格型商品展示内容，其中套餐型数据不展示价格
   */

  import priceSplit from '@/components/priceSplit.vue';
  export default {
    components: {
      priceSplit
    },
    props: {
      goods: {
        Type: Object,
        default: {}
      },
      noGo: undefined, //是否跳转，不写就是点击跳商品详情
      hideFee: undefined, //是否隐藏包邮，默认显示邮费信息
    },
    data() {
      return {}
    },
    computed: {
      computedIsShowFee() {
        return this.hideFee === undefined;
      }
    },
    methods: {

    }
  }
</script>