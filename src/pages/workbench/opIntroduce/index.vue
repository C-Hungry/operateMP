<template>
  <div class="page">
    <img mode="widthFix" :src="item" alt="" v-for="(item,index) in arrSrc" :key="index">

  </div>
</template>
<script>
  export default {
    data() {
      return {
        arrSrc: []
      }
    },
    computed: {},
    methods: {
      initPageData() {
        let arrTemp = [];
        for (let index = 0; index < 14; index++) {
          arrTemp.push(`${this.imgServer}/dist/images/aCityParter/${index+1}.jpg`)
        }

        this.arrSrc = arrTemp;
      }
    },
    onLoad() {
      this.imgServer = mpvue.IMGSERVER;
      this.initPageData();
      mpvue.setNavigationBarTitle({
        title: "城市拍档介绍"
      });
    }
  }

</script>
<style lang="scss" scoped>
  img {
    width: 100%;
  }

</style>
