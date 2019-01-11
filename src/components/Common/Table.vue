<template>
  <div class="hx-table">
    <kendo-grid :dataSource="dataSource" :pageable="pageable" :sortable="true" :resizable="true" :editable="true">
      <kendo-grid-column :selectable="true" width="50px"></kendo-grid-column>
      <kendo-grid-column field="productName" title="产品名称"></kendo-grid-column>
      <kendo-grid-column field="orgInfoName" title="生产企业"></kendo-grid-column>
      <kendo-grid-column field="registerCardNo" title="注册证编号"></kendo-grid-column>
      <kendo-grid-column field="standard" title="规格" :width="'80px'"></kendo-grid-column>
      <kendo-grid-column field="model" title="型号" :width="'80px'"></kendo-grid-column>
      <kendo-grid-column field="aup2ProjectTypeGroupName" title="分组"></kendo-grid-column>
      <kendo-grid-column field="aup2ProjectTypeQualityName" title="质量层次"></kendo-grid-column>
      <kendo-grid-column field="auditStatus" title="审核状态">
      </kendo-grid-column>
    </kendo-grid>

  </div>
</template>

<script>
  export default {
    name: 'Table',
    data() {
      return {
        pageable: {
          pageSize: 10,
          input: true,
          numeric: true,
          info: true,
          alwaysVisible: true,
          messages: {
            empty: '无数据',
            display: '显示条目 {0}-{1} 共 {2}',
            of: '共 {0}',
            page: '页'
          }
        },
        multipleSelection: [],
        tableData3: [
          {
            "id": "196019785503531008",
            "productName": "阿斯顿发送到",
            "orgInfoName": null,
            "registerCardNo": "1a",
            "standard": "d",
            "model": "dadsf ",
            "aup2ProjectTypeGroupName": "留置针（开放式普通型留置针,含DEHP）",
            "auditStatus": "1",
            "aup2ProjectTypeQualityName": null
          }, {
            "id": "196019785574834176",
            "productName": "阿斯顿发送到",
            "orgInfoName": null,
            "registerCardNo": "2b",
            "standard": "d",
            "model": "df",
            "aup2ProjectTypeGroupName": "留置针（密闭式普通正压型留置针，不含DEHP）",
            "auditStatus": "1",
            "aup2ProjectTypeQualityName": null
          }, {
            "id": "196019785633554432",
            "productName": "阿斯顿发送到",
            "orgInfoName": null,
            "registerCardNo": "3c",
            "standard": "d",
            "model": "ff",
            "aup2ProjectTypeGroupName": "",
            "auditStatus": "1",
            "aup2ProjectTypeQualityName": null
          }
        ]
      };
    },
    props: {
      dataSource: {
        type: Array,
        default: []
      }
    },
    methods: {}
  }
  ;
</script>

<style lang="scss">
  .hx-table .el-table th {
    overflow: inherit;
  }

  .hx-table {
    table {
      color: black;
    }
  }
</style>
