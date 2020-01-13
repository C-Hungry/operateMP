<template>
  <div class="circle_box">
    <canvas class="circle_draw" v-if="canvasId=='circle_draw'" canvas-id="circle_draw"
      :style="{width:width+'px',height: height+'px'}"></canvas>
    <canvas class="circle_draw" v-if="canvasId=='canvasActive'" canvas-id="canvasActive"
      :style="{width:width+'px',height: height+'px'}"></canvas>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      size: {
        type: Number,
        default: 100
      },
      bgColor: {
        type: String,
        default: "#f0f0f0"
      },
      selectColor: {
        type: String,
        default: "#3366FF"
      },
      value: {
        type: Number,
        default: 50
      },
      canvasId: {
        type: String,
        default: "circle_draw"
      }
    },
    data() {
      return {
        width: this.size,
        height: this.size,
        canvasTitle: this.canvasId
      }
    },
    methods: {
      drawCircle(id, x, w, step) {
        console.log(id)
        var cxt = wx.createCanvasContext(id);
        cxt.setLineWidth(8);
        cxt.setLineCap('round');
        cxt.save()
        cxt.setStrokeStyle(this.bgColor);
        cxt.beginPath();
        cxt.arc(x, x, x - w, 0, 2 * Math.PI, false);
        cxt.stroke();
        cxt.restore()
        cxt.setStrokeStyle(this.selectColor);
        cxt.beginPath();
        cxt.arc(x, x, x - w, 1.5 * Math.PI, 2 * Math.PI * this.value / 100 + 1.5 * Math.PI, false);
        cxt.stroke();
        cxt.draw();
      },

    },
    onReady() {
      // 获得 circle 组件
      //this.circle = this.selectComponent("#circle1");
      // 绘制背景圆环
      this.drawCircle(this.canvasId, this.size / 2, 8);
    }
  };
</script>
<style lang="scss" scoped>
  .circle_box {
    position: relative;
  }
</style>