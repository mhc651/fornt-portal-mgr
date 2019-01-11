<template>
  <Row type="flex" justify="center" align="middle" class="code-row-bg" className="hx-title">
    <Col span="12" class="title">
    {{title}}
    <Poptip placement="bottom-start" width="300">
      <a>
        <svg-icon iconClass="help" class="help"></svg-icon>
      </a>
      <div slot="content">
        <slot name="content"></slot>
      </div>
    </Poptip>
    </Col>
    <Col span="12" class="btn-container">
    <slot name="btn"></slot>
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
