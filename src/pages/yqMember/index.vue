<template>
  <div class="index">
    <canvas class="canvas-poster" id="canvasPoster" :style="{width:width+'px;',height: height+'px'}"
      canvas-id="canvasPoster"></canvas>
    <div class="mt30 flex-sb">
      <button open-type="share" class="btn btn-default p20  br10"><i class="iconfont iconweixin"></i>微信分享</button>
      <div @click="savePoster" class="btn  btn-default p20 br10"><i class="iconfont icontupian"></i>保存到相册</div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        InvitaType: "",
        openPlatFormType: "",
        width: "",
        height: "",
        imgServer: "",
        rpx: "",
        InvitationCode: "",
        UserSN: "",
        poster: "",
        intelInfo: {
          headerImg: '',
          bgImg: '',
          qrcode: ''
        }
      };
    },
    components: {},
    methods: {
      initPage() {
        let para = {};
        para.InvitaType = this.InvitaType;
        para.openPlatFormType = this.openPlatFormType;
        mpvue.fetchData({
          API: 'api/Push/GetWxChatShareCodeImageByRetailer',
          para,
          callback: (data) => {
            if (this.openPlatFormType == 1) {
              this.intelInfo.headerImg = this.imgServer + 'dist/images/hmm-logo.png'
            } else {
              this.intelInfo.headerImg = this.imgServer + 'dist/images/jdh-logo.png'
            }

            this.intelInfo.bgImg = this.imgServer + 'dist/images/bg-convas.png';
            this.intelInfo.qrcode = data.Data;
            this.getLocalImg();

          }
        })
      },
      getInvitationCode() {
        mpvue.fetchData({
          API: '/api/Push/PusherGetMyInvitaCode',
          callback: (data) => {
            this.InvitationCode = data.InvitationCode;
            this.UserSN = data.UserSN;
          }
        })
      },
      getLocalImg() {
        let me = this;
        var query = wx.createSelectorQuery()
        query.select('#canvasPoster').boundingClientRect((res) => {
          // 返回值包括画布的实际宽高
          console.log(res);
          me.width = res.width;
          me.rpx = res.width / 375;
          me.height = res.width * 667 / 375;
        }).exec()
        let bgImg = new Promise(function (resolve) {
          wx.getImageInfo({
            src: me.intelInfo.bgImg, //下载微信头像获得临时地址
            success: res => {
              //将头像缓存在全局变量里
              resolve(res.path)
            },
            fail: res => {
              //失败回调
            }
          });
        });
        let qrImg = new Promise(function (resolve) {
          wx.getImageInfo({
            src: me.intelInfo.qrcode, //下载微信头像获得临时地址
            success: res => {
              //将头像缓存在全局变量里
              resolve(res.path)
            },
            fail: res => {
              //失败回调
            }
          });
        });
        let headImg = new Promise(function (resolve) {
          wx.getImageInfo({
            src: me.intelInfo.headerImg, //下载微信头像获得临时地址
            success: res => {
              //将头像缓存在全局变量里
              resolve(res.path)
            },
            fail: res => {
              //失败回调
            }
          });
        });
        Promise.all([bgImg, qrImg, headImg]).then(function (result) {
          me.drawImage(result);
        })
      },
      drawImage(convasAttrs) {
        let ctx = wx.createCanvasContext('canvasPoster', this)
        let canvasW = this.width // 画布的真实宽度
        let canvasH = this.height //画布的真实高度
        // 头像和二维码大小都需要在规定大小的基础上放大像素比的比例后面都会 *this.systemInfo.pixelRatio
        let headerW = 52 * this.rpx
        let headerX = 70 * this.rpx
        let headerY = 130 * this.rpx
        let qrcodeW = 200 * this.rpx
        let qrcodeX = 90 * this.rpx
        let qrcodeY = 230 * this.rpx
        // 填充背景
        ctx.drawImage(convasAttrs[0], 0, 0, canvasW, canvasH)
        ctx.save()
        if (this.InvitaType == 5) {
          // 控制头像为圆形
          ctx.setStrokeStyle('rgba(0,0,0,.2)') //设置线条颜色，如果不设置默认是黑色，头像四周会出现黑边框
          ctx.arc(headerX + headerW / 2, headerY + headerW / 2, headerW / 2, 0, 2 * Math.PI)
          ctx.stroke()
          //画完之后执行clip()方法，否则不会出现圆形效果
          ctx.clip()
          // 将头像画到画布上
          ctx.drawImage(convasAttrs[2], headerX, headerY, headerW, headerW)
          ctx.restore()
          ctx.save()
        }
        // 绘制二维码
        ctx.drawImage(convasAttrs[1], qrcodeX, qrcodeY, qrcodeW, qrcodeW)

        //绘制字体
        ctx.font = 'normal normal 18px arial';
        ctx.setFontSize(13);
        ctx.fillStyle = '#5773f9';
        ctx.fillText(`邀请码：${this.InvitationCode}`, 120 * this.rpx, 460 * this.rpx);
        ctx.save();
        ctx.fillStyle = '#fff';

        if (this.InvitaType == 5) {
          ctx.setFontSize(18)
          if (this.openPlatFormType == 1) {
            ctx.fillText('新会员专属福利', 130 * this.rpx, 150 * this.rpx);
            ctx.fillText('50元无门槛优惠券', 130 * this.rpx, 180 * this.rpx);
          } else {
            ctx.fillText('一个APP解决', 130 * this.rpx, 150 * this.rpx);
            ctx.fillText('网上开店问题', 130 * this.rpx, 180 * this.rpx);
          }
          ctx.setFontSize(10)
          ctx.fillText('扫   码   注   册   新   会   员   领   优   惠   券', 60 * this.rpx, 560 * this.rpx);
        } else if (this.InvitaType == 3) {
          ctx.setFontSize(22)
          ctx.fillText('城市经理邀请码', 90 * this.rpx, 160 * this.rpx);
        } else if (this.InvitaType == 4) {
          ctx.setFontSize(22)
          ctx.fillText('城市拍档邀请码', 90 * this.rpx, 160 * this.rpx);
        }
        ctx.save()
        //
        ctx.draw();
        setTimeout(() => {
          //下面的13以及减26推测是因为在写样式的时候写了固定的zoom: 50%而没有用像素比缩放导致的黑边，所以在生成时进行了适当的缩小生成，这个大家可以自行尝试
          wx.canvasToTempFilePath({
            canvasId: 'canvasPoster',
            fileType: 'jpg',
            quality: 1,
            success: (res) => {
              this.poster = res.tempFilePath;
              console.log(this.poster);
            }
          })
        }, 1000)
      },
      savePoster() {
        if (this.poster) {
          wx.saveImageToPhotosAlbum({
            filePath: this.poster,
            success: (result) => {
              console.log("successs");
              wx.showToast({
                title: '海报已保存，快去分享给好友吧。',
                icon: 'none'
              })
            },
            fail: (err) => {
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
    },
    onLoad() {
      this.imgServer = process.env.APICLIENT;
      this.InvitaType = this.$root.$mp.query.InvitaType || 3;
      this.openPlatFormType = this.$root.$mp.query.openPlatFormType || "";
      this.initPage();
      this.getInvitationCode();
      mpvue.setNavigationBarTitle({
        title: "邀新会员"
      });
    },
    onPullDownRefresh() {

    },
    onShareAppMessage() {
      let title = "";
      let imageUrl = this.InvitaType == 5 ? '/static/images/share.jpg' : '/static/images/shareParter.jpg';
      if (this.InvitaType == 5 && this.openPlatFormType == 1) {
        title = "ZOL慧买卖-实体店新零售成交神器，邀您体验";
        imageUrl = "/static/images/share.jpg"
      } else if (this.InvitaType == 5 && this.openPlatFormType == 2) {
        title = "一个APP解决网上开店问题 ";
        imageUrl = "/static/images/shareJDH.jpg"
      } else if (this.InvitaType == 4) {
        title = "成为城市拍档";
        imageUrl = "/static/images/shareParter.jpg"
      } else {
        title = "成为城市经理";
        imageUrl = "/static/images/shareParter.jpg"
      }
      return {
        title: `${title}`,
        path: `pages/reg/regMain?invitedType=${this.InvitaType}&InvitationCode=${this.InvitationCode}&UserSN=${this.UserSN}&openPlatFormType=${this.openPlatFormType}`,
        imageUrl: `${imageUrl}`
      }
    }
  };

</script>

<style lang="scss" scoped>
  .index {
    padding: 0 80rpx;

    .canvas-poster {
      width: 100%;

    }
  }

</style>
