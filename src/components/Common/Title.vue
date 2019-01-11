<template>
    <div class="hx-title clearfix">
        <h4 class="tit">{{title}} <i class="fas fa-question-circle fa-xs"></i></h4>
        <kendo-button class="k-primary ml-10 tit-btn fl">批量导入</kendo-button>
        <kendo-button class="k-primary ml-10 tit-btn fl">添加产品</kendo-button>
    </div>
</template>

<script>
export default {
  name: 'Title',
  props: {
    title: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss">
.hx-title {
    border-bottom: 1px solid lightgray;
    padding-bottom: 6px;
    .tit {
        float: left;
    }
    .tit-btn {
        float: right;
    }
}
</style>
