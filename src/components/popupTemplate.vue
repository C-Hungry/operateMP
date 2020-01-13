<template>
  <div v-if="visible" class="popupZ" :class="{full:computedIsFull}" @click.stop="close">
    <div class="popupZ-content" :class="[direction,{'pb':computedIsHasFooter},{'pt':title!==undefined}]" @click.stop>
      <div class="header fixed" v-if="title!==undefined">
        <a href="javascript:;" class="goback" @click="close"></a>
        <div class="text-center title">
          {{title}}
        </div>
      </div>
      <span class="close" @click.stop="close" v-if="hasCloseBtn">&times;</span>
      <div class="mt10 pl15 text-left"
        style="font-size:28rpx;line-height:60rpx;border-bottom:1rpx solid #eee;color:#101010;"
        v-show="titleRuleShow !== undefined" v-text="titleRuleShow"></div>
      <div class="page-footer" v-if="computedIsHasFooter">
        <span v-if="computedIsHasCloseFooterBtn" class="btn btn-primary block btn-full btn-primary-t closeFooterBtn"
          @click.stop="close">{{footerBtnText||'关闭'}}</span>
        <div class="closeFooterBtn block" v-if="computedIsDefineFooter">
          <slot name="footer">
          </slot>
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  /** 
   * @Author: zhao.liubin@zol.com.cn 
   * @Date: 2019-03-13 10:54:54 
   * @Desc: 底部弹出 模板，只给小程序用
   */
  export default {
    props: {
      title: {
        type: [String, Number],
        default: undefined
      }, //右侧滑出时，标题
      titleRuleShow: {
        type: String,
        default: undefined
      },
      full: undefined, //是否整屏显示
      show: Boolean,
      hasCloseBtn: {
        type: Boolean,
        default: false
      },
      defineFooter: undefined,
      hasCloseFooterBtn: {
        type: Boolean,
        default: false
      },
      footerBtnText: "", //底部标题按钮
      direction: { //动画方向["right","bottom"]
        type: String,
        default: "bottom"
      }
    },
    data() {
      return {
        visible: this.show
      };
    },
    computed: {
      computedIsFull() {
        return this.full != undefined;
      },
      computedIsDefineFooter() {
        return this.defineFooter != undefined;
      },
      computedIsHasCloseFooterBtn() {
        return this.hasCloseFooterBtn != undefined;
      },
      computedIsHasFooter() {
        console.log(this.defineFooter);
        console.log(this.hasCloseFooterBtn);
        return this.defineFooter != undefined || this.hasCloseFooterBtn != false;
      }
    },
    methods: {
      close() {
        this.visible = false;
        this.$emit("update:show", this.visible);
        this.$emit("close");
      }
    },
    watch: {
      show(v, oldV) {
        this.visible = v;
      },
      visible(v, oldV) {
        this.$emit("update:show", v);
      }
    }
  };

</script>
<style scoped lang="scss">
  @import '@/SCSS/base/_variables.scss';

  .popupZ {
    flex: none;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 100;
    transitoin: background .2s;
    -webkit-tap-highlight-color: transparent;

    .bottom {
      position: absolute;
      bottom: 0;
      width: 100%;
      max-height: 75%;
      overflow-x: hidden;
      background-color: white;
      animation: trbottom 0.3s ease-out;
    }

    .right {
      position: absolute;
      right: 0;
      height: 100%;
      min-width: 90%;
      width: 90%;
      background-color: white;
      overflow-x: hidden;

      /* animation: trright 0.3s ease-out ; */
      :global(.header.fixed) {
        width: 90%;
      }

      :global(.page-footer) {
        left: auto;
        width: 90%;
      }
    }

    .left {
      position: absolute;
      left: 0;
      height: 100%;
      background-color: white;
      overflow-x: hidden;
      animation: trleft 0.3s ease-out;
    }

    .top {
      position: absolute;
      top: 0;
      width: 100%;
      background-color: white;
      animation: trtop 0.3s ease-out;
    }

    &.full {
      .right {
        width: 100%;

        :global(.header.fixed),
        :global(.page-footer) {
          width: 100%;
        }
      }
    }

    &.notfull {
      .right {
        width: 90%;

        :global(.header.fixed),
        :global(.page-footer) {
          width: 90%;
        }
      }
    }

    .pb {
      padding-bottom: $height-btn;
    }

    .pt {
      padding-top: $height-btn;
    }
  }

  .t {

    &-enter,
    &-leave-to {
      background-color: rgba(0, 0, 0, 0);

      .bottom {
        // transform: translate(0, 100%)
      }
    }

    &-enter-to,
    &-leave {
      background-color: rgba(0, 0, 0, 0.6);

      .bottom {
        // transform: translate(0, 0)
      }
    }

    &-enter-active,
    &-leave-active {
      transition: 0.2s;
    }
  }

  .close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 4px 10px;
    color: #999;
    line-height: 1;
    background-color: transparent;
    user-select: none;
    font-size: 28px;
    z-index: 100;
  }

  .closeFooterBtn {
    position: fixed;
    bottom: 0;
    z-index: 5;

    ~.popupZ-content {
      padding-bottom: $height-btn;
    }
  }

  @keyframes trbottom {
    from {
      transform: translate(0, 100%);
      opacity: 0;
    }

    to {
      transform: translate(0, 0);
      opacity: 1;
    }
  }

  @keyframes trright {
    from {
      transform: translate(100%, 0);
      opacity: 0;
    }

    to {
      transform: translate(0, 0);
      opacity: 1;
    }
  }

  @keyframes trleft {
    from {
      transform: translate(-100%, 0);
      opacity: 0;
    }

    to {
      transform: translate(0, 0);
      opacity: 1;
    }
  }

  @keyframes trtop {
    from {
      transform: translate(0, -100%);
      opacity: 0;
    }

    to {
      transform: translate(0, 0);
      opacity: 1;
    }
  }

</style>
