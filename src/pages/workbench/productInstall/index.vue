<template>
  <div class="page">
    <div class="split-t-gray">
      <div>
        <div class="p20 text-large">
          <img src="https://hmm.jdhui.com/new/dist/images/hmm-logo.png" class="logoImg" mode="aspectFit" alt="">
          慧买卖
        </div>
        <div class="dis-flex border-top-light border-bottom-light text-center ">
          <div class="codelist border-right-light p10">
            <img class="qrcode" :src="qrcodeImg[0]" mode="aspectFit" alt="" @click="zoomImg(0)">
            <p><i class="iconfont iconxiaochengxu"></i>使用小程序</p>
            <!-- <button class="btn btn-primary" @click="shareCode">分享二维码</button> -->
            <div>
              <navigator class="btn btn-default mt20" target="miniProgram" open-type="navigate"
                app-id="wx8f4ec1c40a1ec3dd" extra-data="" version="release">进入小程序</navigator>
            </div>
          </div>
          <div class="codelist border-right-light p10">
            <img class="qrcode" :src="qrcodeImg[1]" mode="aspectFit" alt="" @click="zoomImg(1)">
            <p><i class="iconfont iconanzhuo"></i>下载安卓APP</p>
            <!-- <button class="btn btn-primary" @click="shareCode">分享二维码</button> -->
            <div> <button class="btn btn-default mt20" @click="saveImg('1')">保存二维码</button>
            </div>
          </div>
          <div class="codelist p10">
            <img class="qrcode" :src="qrcodeImg[2]" mode="aspectFit" alt="" @click="zoomImg(2)">
            <p><i class="iconfont iconios"></i>下载苹果APP</p>
            <!-- <button class="btn btn-primary" @click="shareCode">分享二维码</button> -->
            <div> <button class="btn btn-default mt20" @click="saveImg('2')">保存二维码</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="p20 text-large">
          <img src="https://hmm.jdhui.com/new/dist/images/jdh-logo.png" class="logoImg" mode="aspectFit" alt="">
          家电汇
        </div>
        <div class="dis-flex border-top-light border-bottom-light text-center ">
          <div class="codelist border-right-light p10">
            <img class="qrcode" :src="qrcodeImg[3]" mode="aspectFit" alt="" @click="zoomImg(3)">
            <p><i class="iconfont iconanzhuo"></i>下载安卓APP</p>
            <!-- <button class="btn btn-primary" @click="shareCode">分享二维码</button> -->
            <div> <button class="btn btn-default mt20" @click="saveImg('3')">保存二维码</button>
            </div>
          </div>
          <div class="codelist p10">
            <img class="qrcode" :src="qrcodeImg[4]" mode="aspectFit" alt="" @click="zoomImg(4)">
            <p><i class="iconfont iconios"></i>下载苹果APP</p>
            <!-- <button class="btn btn-primary" @click="shareCode">分享二维码</button> -->
            <div> <button class="btn btn-default mt20" @click="saveImg('4')">保存二维码</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <popup :show.sync="isShowPopup">
      <div class="popup-content">
        <img :src="qrcodeImg[curIndex]" mode="widthFix" class="ad-image">
        <div class="close-btn text-center" @click="onClose">
          <icon size="40" type="cancel" color="#fff" />
        </div>
      </div>
    </popup>
  </div>
</template>
<script>
  import popup from "@/components/popup";
  export default {
    data() {
      return {
        qrcodeImg: [
          "https://hmm.jdhui.com/new/dist/images/qrcode/hmm_mp.jpg",
          "https://hmm.jdhui.com/new/dist/images/qrcode/hmm_android.png",
          "https://hmm.jdhui.com/new/dist/images/qrcode/hmm_ios.png",
          "https://hmm.jdhui.com/new/dist/images/qrcode/jdh_android.png",
          "https://hmm.jdhui.com/new/dist/images/qrcode/jdh_ios.png"
        ],
        isShowPopup: false,
        curIndex: 0,
      }
    },
    components: {
      popup
    },
    methods: {
      shareCode() {
        wx.showToast({
          title: "此功能正在开发中",
          icon: 'none',
          duration: 500
        })
      },
      zoomImg(index) {
        this.isShowPopup = true;
        this.curIndex = index;
      },
      onClose() {
        this.isShowPopup = false;
      },
      saveImg(i) {
        let tempImg = this.qrcodeImg[i];
        wx.downloadFile({
          url: this.qrcodeImg[i], //仅为示例，并非真实的资源
          success(res) {
            // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
            console.log(res);
            if (res.statusCode === 200) {
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success: (result) => {
                  console.log("successs");
                  wx.showToast({
                    title: '照片已保存，快去分享给好友吧。',
                    icon: 'none'
                  })
                },
                fail: (err) => {
                  console.log(err);
                  if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg ===
                    "saveImageToPhotosAlbum:fail auth deny") {
                    // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
                    wx.showModal({
                      title: '提示',
                      content: '需要您授权保存相册',
                      showCancel: false,
                      success: modalSuccess => {
                        wx.openSetting({
                          success(settingdata) {
                            console.log("settingdata", settingdata)
                            if (settingdata.authSetting['scope.writePhotosAlbum']) {
                              wx.showModal({
                                title: '提示',
                                content: '获取权限成功,再次点击图片即可保存',
                                showCancel: false,
                              })
                            } else {
                              wx.showModal({
                                title: '提示',
                                content: '获取权限失败，将无法保存到相册哦~',
                                showCancel: false,
                              })
                            }
                          },
                          fail(failData) {
                            console.log("failData", failData)
                          },
                          complete(finishData) {
                            console.log("finishData", finishData)
                          }
                        })
                      }
                    })
                  }
                }
              })
            }
          }
        })


      }
    },
  }

</script>
<style lang="scss" scoped>
  .logoImg {
    width: 42rpx;
    height: 42rpx;
    vertical-align: top;
  }

  .qrcode {
    width: 100%;
    height: 210rpx;
  }

  .codelist {
    width: 33%;
  }

  .iconfont {
    font-size: 36rpx;
  }

  .iconanzhuo {
    color: #A4C439
  }

  .iconxiaochengxu {
    color: #24AE1F
  }

  .popup-content {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: calc(100vw - 40rpx);
    text-align: center;

    .ad-image {
      width: 70%;
    }

    .close-btn {
      margin-top: 50rpx;
    }
  }

  navigator {
    opacity: 1;
    border-radius: 10rpx;
    line-height: 64rpx
  }

</style>
