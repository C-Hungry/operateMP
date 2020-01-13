<template>
  <div class="popup" v-if="show">
    <div class="popup-box" v-if="isLogin">
      <div class="popup-head">
        <div class="popup-title">
          <span class="text-default text-x-large">{{title}}</span>
          <span>
            <icon size="18" type="cancel" color="#999" @click="onClose"/>
          </span>
        </div>
      </div>
      <div class="popup-body">
        <slot></slot>
      </div>
      <div class="popup-foot">
        <slot name="slot-foot">
          <span class="btn btn-primary block btn-foot" @click="onConfirm">{{btnText}}</span>
        </slot>
      </div>
    </div>
    <template v-else>
      <slot></slot>
    </template>
  </div>
</template>

<script>
/*
* @params show 控制显示，title 标题，btnText 按钮文本，isCloseAfterConfirm 点击确定按钮后是否关闭弹窗（有时候需要判断输入是否正确，错误情况不关闭）
* 为了首页可用这个遮罩，参数里增加了是否是login页面的布局，默认是false
*/
export default {
  props: {
    show: Boolean,
    title: String,
    btnText: {
      type: String,
      default: "确定"
    },
    isCloseAfterConfirm: {
      type: Boolean,
      default: true
    },
    isLogin: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClose() {
      this.$emit("close");
      this.$emit("update:show", false);
    },
    onConfirm() {
      this.$emit("confirm");
      if (this.isCloseAfterConfirm) {
        this.onClose();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.popup {
  background: rgba(51, 51, 51, 0.4);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 100;
  .popup-box {
    background: #fff;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    animation: trbottom 0.3s ease-out;
    .popup-head {
      box-sizing: border-box;
      overflow: hidden;
      .popup-title {
        box-sizing: border-box;
        padding: 33rpx 20rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        &:after {
          content: "";
          position: absolute;
          left: 20rpx;
          bottom: 0;
          width: calc(100vw - 20rpx);
          border-bottom: solid 1rpx #efefef;
          transform: scaleY(0.5);
        }
      }
    }
    .popup-foot {
      box-sizing: border-box;
      margin: {
        left: 20rpx;
        right: 20rpx;
      }
      .btn-foot {
        margin: {
          top: 80rpx;
          bottom: 80rpx;
        }
      }
    }
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
</style>
