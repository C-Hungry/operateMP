<template>
  <div class="page bg-gray">
    <div class="bg-white  text-center text-title" :class="objDetail.InOrOut?'text-danger':'text-ok'">
      {{objDetail.InOrOut ? '+':'-'}} {{objDetail.ChangeMoney}}
    </div>
    <div class="split-t-gray bg-white">
      <div class="row-item">
        <div class="row-title text-light text-x-large">业务类型</div>
        <div class="row-content text-right">{{objDetail.InOrOut?'收入':'支出'}}</div>
      </div>
      <div class="row-item border-top-light">
        <div class="row-title">业务标题</div>
        <div class="row-content text-right">{{objDetail.ChangeTypeDesc}}</div>
      </div>
      <div class="row-item border-top-light">
        <div class="row-title">业务备注</div>
        <div class="row-content text-right">
          <div v-html="objDetail.Desc"></div>
        </div>
      </div>
    </div>
    <div class="split-t-gray bg-white">
      <div class="row-item">
        <div class="row-title">操作时间</div>
        <div class="row-content text-right">{{objDetail.DateAdded}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        RecordId: "",
        objDetail: {}
      }
    },
    methods: {
      initPageData() {
        mpvue.fetchData({
          API: 'api/Push/PusherGetMyAccountChangeDetail',
          para: {
            RecordId: this.RecordId
          },
          callback: (data) => {
            data.DateAdded = mpvue.datetime(data.DateAdded).datetime;
            data.Desc = data.Desc.split('||').join('<br>')
            console.log(data.Desc);
            this.objDetail = data;
          }
        })
      }
    },
    onLoad() {
      this.RecordId = this.$root.$mp.query.RecordId; //
      this.initPageData();
      mpvue.setNavigationBarTitle({
        title: "收支详细"
      });
    }
  }

</script>
<style lang="scss" scoped>
  .text-title {
    font-size: 60rpx;
    padding: 80rpx;
  }

</style>
