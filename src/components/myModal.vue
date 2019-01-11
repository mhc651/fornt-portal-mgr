/**
* @file 对话框基于iview 组件 2018/06/20
* @author qiu 
*/
<template>
<transition name="show">
  <div v-if='show' class="my-modal_bg" @click="close" >
    <div class="my-modal" :style="{width:width+'px'}" @click.stop >
      <h3 class="my-modal_head">
        {{ title }}
      </h3>
      <!-- content -->
      <slot></slot>
      <!-- content end-->
      <div class="my-modal_btn">
        <Button @click="close">取消</Button>
        <Button type="primary"  @click="ok">确定</Button>
      </div>
    </div>  
  </div>
</transition>

</template>
<script>
export default {
  props: {
    /**
     * 显示
     */
    value: {},
    /**
     * 标题
     */
    title: {},
    /**
     * 宽度
     */
    width: {}
  },
  data() {
    return {
      show: this.value
    }
  },
  watch: {
    value(val) {
      this.show = val
      if(val){

      }
    },
  },
  methods: {
    close() {
      this.$emit('on-close')
    },
    ok() {
      this.$emit('on-ok')
    }
  },
}
</script>
<style lang="scss">
$border_color: #f1f1f1;
// transititon
.show-leave-active,.show-enter-active{
  transition: all .5s;
}
.show-leave,.show-enter-to{
  opacity: 1;
}
.show-enter,.show-leave-to{
  opacity: 0;
}
.my-modal_bg{
  position: fixed;
  left: 0;
  top:0;
  width: 100%;
  height: 100%;
  z-index: 999;
  overflow: auto;
}
.my-modal {
  position: absolute;
  top: 100px;
  left: 0;
  right: 0;
  margin: auto;
  min-width: 200px;
  min-height: 200px;
  
  background: #fff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
  .my-modal_head,
  .my-modal_btn {
    padding: 10px;
    margin-right: -10px;
    margin-left: -10px;
  }
  .my-modal_head {
    border-bottom: 1px solid $border_color;
    margin-top: -10px;
  }
  .my-modal_btn {
    border-top: 1px solid $border_color;
    text-align: right;
    margin-top:10px;
    margin-bottom: -10px;
    button {
      margin-left: 15px;
    }
  }
}
</style>

