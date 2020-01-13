<template>
  <div class="page">
    <div class="split-t-gray row-item text-large">
      <div class="anchor-row row-item " @click="goUrl('/pages/wallet/coupon/couponMain')">
        <i class="iconfont iconzhuantihuoyouhuima mr5"></i>转提货优惠码(可转赠)
      </div>
      <div class="anchor-row row-item border-top-light" @click="goUrl('/pages/wallet/goWithdraw/goWithdrawMain')">
        <i class="iconfont icontixian mr5"> </i>提现
      </div>
      <div class="anchor-row row-item border-top-light" @click="goUrl('/pages/wallet/offliceBill/offliceBillMain')">
        <i class="iconfont iconxianxiakaipiaotixian mr5"></i> 线下开票提现
      </div>
    </div>
  </div>
</template>
<script>
  import goUrl from "@/utils/goUrl";
  export default {
    data() {
      return {

      }
    },
    methods: {
      goUrl
    },

    onLoad() {
      mpvue.setNavigationBarTitle({
        title: "佣金查看"
      });
    }
  }
</script>
<style lang="scss" scoped>
  .iconzhuantihuoyouhuima {
    background: linear-gradient(to bottom, #FFD325, #FC9208);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .icontixian {

    background: linear-gradient(to bottom, #FF9314, #FF6600);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .iconxianxiakaipiaotixian {
    color: #03C3CD
  }
</style>