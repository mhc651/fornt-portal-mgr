/**
* @file分页表格 基于iview 2018/06/29
* @auther qiu
*/
<template>
  <div class="table-page">
        <!-- 过滤器-->
        <div class="head-filter" >
          <Row type="flex" :gutter="16">
            <Col span="4" v-for='val of filter' :key='val.index'>
            <!-- select -->
              <!-- <Select v-if='val.type === "select"' :placeholder='val.name' v-model="filterForm[val.data]" @on-change='selectChange(val)' >
                  <Option v-for="(item,index) in val.options" :value="index" :key="item.index">{{ item }}</Option>
              </Select> -->
            <!-- select end-->
            <!-- 开始结束日期控件 -->
              <!-- <DatePicker v-model="filterForm[val.data]"  v-else-if='val.type==="daterange"'  type="daterange" placement="bottom-end" :placeholder="val.name"  style="width: 100%" ></DatePicker> -->
            <!-- 日期控件 end -->
            <!-- 普通输入框 -->
            <!-- <Input v-else-if='val.type === "string"'  v-model="filterForm[val.data]" :placeholder='val.name' /> -->
              <!-- 普通输入框 end-->
              <!-- 按钮组 -->
              <div v-if='val.type === "btns"' class="list-inline">
                  <!-- 设置 -->
                <span v-for="cell of val.cells" :key="cell.index">
                  <Button v-if="cell.type === 'set' "  type="primary">{{ cell.name }}</Button>
                  <!-- 查询 -->
                  <Button v-else-if="cell.type === 'filter' "  type="primary" @click='filterOrg'>{{ cell.name }}</Button>
                  <!-- 重置 -->
                  <Button  v-else-if="cell.type === 'reset' "  @click='resetFilterFn' >{{ cell.name }}</Button>
                </span>
              </div>
              <!-- 按钮组 end-->
              <input-item v-else
                  :options='val.options' 
                  :type='val.type' 
                  :disabled='val.disabled'
                  :readonly='val.readonly' 
                  :placeholder="val.name" 
                  v-model="filterForm[val.data]"
                  :load-data='val.loadData'
                  :fn ='val.fn'
                  :loading='val.loading'
                   @on-change='selectChange(val)'
                  />
            </Col>
          </Row>
        </div>
        <!-- 过滤 end-->
        <!-- content -->
        <Table class="table"
        @on-select='checkTable'
        @on-select-all='checkTable'
        @on-select-cancel='checkTable' border ref="selection" :columns="columns" :data="data"
        @on-row-click = 'onRowClick'
        ></Table>
        <!-- 分页 -->
        <Page
            :total="total"
            show-elevator
            show-total
            show-sizer
            :current='page'
            :page-size = 'pagerSize'
            :page-size-opts='pagerSizeArr'
            @on-change='setPage'
            @on-page-size-change="setpageSize"
          >
          </Page>
        <!-- 分页 end-->
       <Button v-if='deleteDataFn' @click="deleteData" type="error">删除</Button>
      </div>
</template>
<script>
import InputItem from './inputItem'
export default {
  props: {
    /**
     * 过滤器
     * @const
     * @param {string} name placeholder站位字符
     * @param {string} data 对应字段
     * @param {string} type  string/input,select/select,daterange/区间时间选择器 btns/按钮组(reset:重置,filter：筛选)
     * @param {Array} cells 按钮组
     * @param {} defult:默认值, daterange:[]
     * @param {Array}options select's option
     */
    filter: {
      type: Array
    },

    // 总条数
    total: {
      type: Number
    },
    // 总条数
    total: {
      type: Number
    },
    // 页面条数选择
    pagerSizeArr: {},
    // 页面条数
    // pagerSize: {},
    // 分页数组
    // page: {
    //   type: Number,
    // },
    // 缓存器名称
    storage: {
      type: String
    },
    // table columns
    columns: {
      type: Array
    },
    // table data
    data: {
      type: Array
    },
    /**
     *数据更新方法
     *@return {Object} 返回过滤器和pageSize page
     */
    getDataFn: {
      type: Function
    },
    /**
     * 数据删除方法
     * @return {Array} 返回选中的表格数据
     * @return {Function} 数据更新
     * */

    deleteDataFn: {
      type: Function
    }
  },
  data() {
    let filterForm = this.params || {}
    filterForm = this.resetFilter(filterForm)
    return {
      page: 1,
      pagerSize: this.pagerSizeArr[0],
      // table选中
      checkout: [],
      filterForm
    }
  },
  watch: {
    data() {
      // 数据改变重置多选
      this.checkout = []
    }
  },
  methods: {
    /**
     * 单击
     * @event selected#click
     * @return 当前行数据 ，index
     */
    onRowClick(data, index) {
      this.$emit('on-row-click', data, index)
    },
    // 批量设置属性
    setDateAttr(Object) {},
    // 重置筛选数据
    resetFilter(data) {
      // 重置表单选择
      for (let item of this.filter) {
        let key = item.data
        if (key) data[key] = item.value || item.default || item.defuld || ''
      }
      return data
    },
    // 重置数据
    resetFilterFn() {
      this.resetFilter(this.filterForm)
      this.getData()
    },
    // 筛选
    filterOrg() {
      this.page = 1
      this.getData()
    },
    /**
     * 切换审核列表
     * @param {number} num 0 为待审核1
     */
    tabState(num) {
      this.reviewNum.active = num
      this.getData().then(res => {
        // 获得总数
        this.dataConfig.allTotal = res.content.total
      })
    },
    /**
     * 读取缓存记录
     * */

    readStorage() {
      let param = sessionStorage.getItem(this.storage)
      if (param) {
        param = JSON.parse(param)
        this.filterForm = param
        this.page = param.page
        this.pagerSize = param.size
      }
      this.getData()
    },
    /**
     * select 外部调用on-select方法
     * @param {Object} item 配置数据
     */
    selectChange(item) {
      if (item.onChange) item.onChange(this.filterForm[item.data])
    },
    /**
     * 时间转换 yyyy-MM-dd hh:mm:ss
     * @param {string} date 时间戳
     * */
    toDateTime(date) {
      date = new Date(date)
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      var d = date.getDate()
      d = d < 10 ? '0' + d : d
      var h = date.getHours()
      h = h < 10 ? '0' + h : h
      var minute = date.getMinutes()
      minute = minute < 10 ? '0' + minute : minute
      var second = date.getSeconds()
      second = second < 10 ? '0' + second : second
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
    },
    /**
     * 添加一个自定义参数 并发起请求
     * @param {Object} params
     */
    getParamData(params) {
      let param = this.filterForm
      for (let k in params) {
        param[k] = params[k]
      }
      if (params.page) this.page = params.page
      if (params.size) this.pagerSize = params.size
      return this.getData(param)
    },
    // 获取注册数据
    getData(data) {
      // 获取当前的列表
      let config = data ? data : this.filterForm
      // 深度复制
      let param = JSON.parse(JSON.stringify(config))

      // 查询
      param.size = this.pagerSize
      param.page = this.page

      // 时间处理
      let date = config.date
      if (date && date[0]) {
        let end = new Date(date[1]).toLocaleDateString() + ' 23:59:59'
        param.dateStart = this.toDateTime(date[0])
        param.dateEnd = this.toDateTime(end)
      }
      // 保存记录
      if (this.storage)
        sessionStorage.setItem(this.storage, JSON.stringify(param))
      // 触发触发数据
      if (this.getDataFn)return this.getDataFn(param)
    },
    /**
     * 批量删除
     * */
    deleteData() {
      if (!this.checkout.length) {
        this.$Message.error('请选择要删除的对象')
      } else {
        this.$Modal.confirm({
          title: '警告!',
          content: '您正在执行删除操作,确定要进行删除吗?',
          onOk: () => {
            this.deleteDataFn(this.checkout, this.getData)
          }
        })
      }
    },
    /**
     * 设置选中
     * @param {Array} selection 已选项数据
     * */
    checkTable(selection) {
      this.checkout = selection
    },
    /**
     * 设置当前分页
     * @param {number} val 选中的页码
     * */
    setPage(n) {
      // 获得当前列表
      this.page = n
      this.getData()
    },
    /**
     * 设置单页数目
     * @param {number} val 选中的条数
     * */
    setpageSize(val) {
      this.pagerSize = val
      this.getData()
    }
  },
  created() {
    if (this.storage) {
      // 缓存
      this.readStorage()
    } else {
      // init table
      this.getData()
    }
  },
  components: { InputItem }
}
</script>
<style lang="scss" >
.table-page {
  // 过滤
  .head-filter {
    .ivu-row-flex {
      margin-top: 15px;
    }
    .ivu-col {
      margin-bottom: 15px;
    }
    // .list-inline {
    //   text-align: center;
    // }
    .list-inline > span {
      display: inline-block;
      margin-left: 5px;
    }
  }
  td button {
    margin-left: 5px;
  }
  .ivu-page {
    margin-top: 15px;
  }
}
</style>
