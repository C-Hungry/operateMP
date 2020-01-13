<template>
  <div class="popup" v-if="show">
    <div class="confirm-box">
      <span class="confirm-close" @click="onClose" v-if="closeIcon!=undefined">
        &times;
      </span>
      <div class="confirm-title pl30 pr30" v-if="title.length > 0">{{title}}</div>
      <div class="confirm-body text-xxx-large dis-flex">
        <slot>{{content}}</slot>
      </div>
      <div class="confirm-foot dis-flex">
        <div class="btn-box" v-if="!isHideCancelBtn">
          <button :open-type="btnCancelOpenType" class="btn-cancel" :style="btnCancelStyle"
            @click="onCancel">{{btnCancelText}}</button>
        </div>
        <div class="btn-box" v-if="!isHideOKBtn">
          <button :open-type="btnOKOpenType" class="btn-ok" :style="btnOKStyle" @click="onOK">{{btnOKText}}</button>
        </div>
      </div>
      <slot name="other"></slot>
    </div>
  </div>
</template>

<script>
  /* @props show： 控制弹窗显示； title： 顶部标题； content：中间显示的内容； 
   * btnCancelText： 左侧按钮文本； btnOKText 右侧按钮文本 btnCancelOpenType, btnOKOpenType 按钮的原生open-type属性，特殊用途
   * btnCancelStyle： 左侧按钮自定义样式； btnOKStyle： 右侧按钮自定义样式；closeAfterClick 点击按钮后是否关闭弹窗，为false的情况下需要手动关闭弹窗
   * isHideCancelBtn: 是否隐藏左侧按钮； isHideOKBtn: 是否隐藏右侧按钮
   */
  import popup from "@/components/popup";
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ""
      },
      content: {
        type: String,
        default: ""
      },
      btnCancelText: {
        type: String,
        default: "取消"
      },
      btnOKText: {
        type: String,
        default: "确定"
      },
      btnCancelOpenType: {
        // 控制按钮作用
        type: String,
        default: ""
      },
      btnOKOpenType: {
        type: String,
        default: ""
      },
      btnCancelStyle: {
        // 自定义样式
        type: String,
        default: ""
      },
      btnOKStyle: {
        type: String,
        default: ""
      },
      isHideCancelBtn: {
        type: Boolean,
        default: false
      },
      isHideOKBtn: {
        type: Boolean,
        default: false
      },
      closeAfterClick: undefined,
      closeIcon: undefined,
    },
    data() {
      return {};
    },
    components: {
      popup
    },
    methods: {
      onClose() {
        this.$emit("update:show", false);
      },
      onCancel() {
        this.$emit("after-cancel");
        if (this.closeAfterClick !== undefined) {
          this.onClose();
        }
      },
      onOK() {
        this.$emit("after-ok");
        if (this.closeAfterClick !== undefined) {
          this.onClose();
        }
      }
    }
  };

</script>

<style lang="scss" scoped>
  @import "@/SCSS/base/_variables.scss";

  .popup {
    background: rgba(51, 51, 51, 0.4);
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 101;

    .confirm-box {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 87.5%;
      background: #fff;
      box-sizing: border-box;

      /* animation: popup 0.25s ease-in; */
      .confirm-title {
        line-height: 88rpx;
        color: #353535;
        font-size: 16px;
      }

      .confirm-close {
        position: absolute;
        right: 0;
        top: 0;
        font-size: 20px;
        padding: 0 10px;
        color: $color-danger;
      }

      .confirm-body {
        min-height: 220rpx;
        padding: 0 10px;
        justify-content: center;
        align-items: center;
      }

      .confirm-foot {
        box-shadow: 0 -1px #f0f0f0;

        .btn-box {
          flex: 1;

          button {
            border: none;
            border-radius: 0;

            line-height: 96rpx;
            font-size: 33rpx;

            &:after {
              border: none;
            }
          }

          .btn-cancel {
            background: #fff;
            border-right: solid 1rpx #f0f0f0;
          }

          .btn-ok {
            background: $color-primary;
            color: #fff;
          }
        }
      }
    }
  }

  @keyframes popup {
    0% {
      width: 0%;
      height: 0;
      opacity: 0.3;
    }

    100% {
      height: auto;
      width: 87.5%;
      opacity: 1;
    }
  }

</style>
