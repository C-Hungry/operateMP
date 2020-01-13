<template>
  <span class="price-xx-large">
    <span v-if="computedIsInvalid">
      {{value}}
    </span>
    <span v-else>
      <span class="price-large">{{computedValueF}}</span>.{{computedValueE}}
    </span>

  </span>
</template>
<script>
  /**
   * 分隔价格字符串为整数部分大号字体，小数部分小号字体
   * */
  export default {
    props: {
      value: '',
      class: '',
    },
    components: {},
    data() {
      return {}
    },
    computed: {
      computedIsInvalid() {
        if (!parseFloat(this.value)) {
          return true;
        }
        return false;
      },
      computedValueF() {
        return ((this.value && (this.value - 0).toFixed(2)) || 0).toString().split('.')[0];
      },
      computedValueE() {
        return ((this.value && (this.value - 0).toFixed(2)) || 0).toString().split('.')[1] || '00';
      }
    },
    methods: {},
    mounted() {
    }
  }
</script>