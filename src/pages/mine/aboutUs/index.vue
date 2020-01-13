<template>
  <div class="page">
    <img mode="widthFix" :src="item" alt="" v-for="(item,index) in arrSrc" :key="index">
    <div class="mt20 row-item">
      相关协议
      <div class="mt20 text-primary" @click="downLoadPage">
        《城市拍档推广合作方案细则》
      </div>
      <div class="mt20 text-primary" @click="downLoadHmm">
        《慧买卖推广服务商合作协议》
      </div>

    </div>
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
      downLoadPage() {
        wx.downloadFile({
          url: 'https://hmm.jdhui.com/new/dist/files/cityParter.docx',
          success(res) {
            // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
            console.log(res);
            if (res.statusCode === 200) {
              const filePath = res.tempFilePath
              wx.openDocument({
                filePath: filePath,
                success: function (res) {
                  console.log('打开文档成功')
                }
              })
            }
          }
        })
      },
      downLoadHmm() {
        wx.downloadFile({
          url: 'https://hmm.jdhui.com/new/dist/files/hmmCooper.docx',
          success(res) {
            // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
            console.log(res);
            if (res.statusCode === 200) {
              const filePath = res.tempFilePath
              wx.openDocument({
                filePath: filePath,
                success: function (res) {
                  console.log('打开文档成功')
                }
              })
            }
          }
        })
      },
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
        title: "关于我们"
      });
    }
  }

</script>
<style lang="scss" scoped>
  img {
    width: 100%;
  }

</style>
