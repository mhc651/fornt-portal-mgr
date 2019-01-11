<template>
  <Row type="flex" justify="center" align="middle" class="code-row-bg" className="hx-title" style="margin-right: 20px">
    <Col span="24" class="title">

    <Poptip placement="bottom-end" width="300">
      <a style="font-size: 12px;color:red">
        {{title}}
      </a>
      <div slot="content" style="border: none">
        <slot name="content"></slot>
      </div>
    </Poptip>
    </Col>
  </Row>

</template>

<script>
  import SvgIcon from "../SvgIcon/index";
  export default {
    components: {SvgIcon},
    name: 'top-toll-bar',
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
    .title {
      font-size: 18px;
      line-height: 35px;
      padding: 0;
    }
    .help {
      color: orange;
    }
    .btn-container {
      text-align: right;
    }
  }
</style>
