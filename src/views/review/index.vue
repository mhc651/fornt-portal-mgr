// 企业注册审核
<template>
  <div >
      <top-tool-bar class="title--bg" title='企业审核'>
          <span slot="content">
            <strong class="help">说明</strong>
            <p>
            无
            </p>
          </span>
      </top-tool-bar>
      <div class="page-container">
        <!-- head tab -->
        <div class="head-tab">
          <a class="head-tab_btn" v-for="(val,index) in model" :key="index" :class='index === reviewNum.active?"active":""' @click="tabState(index)" > {{ val.name }} 
            <!-- <Badge :count="val.allTotal" :overflow-count="reviewNum.max" /> -->
          </a>
        </div>
        <!-- head tab end-->
        <!-- 过滤 企业-->
        <div class="head-filter">
          <Row type="flex" :gutter="16">
            <Col span="4" v-for='val of dataConfig.input' :key='val.index'>
              <Select v-if='val.type === "select"' :placeholder='val.name' v-model="dataConfig.form[val.data]" >
                  <Option v-for="(item,index) in val.options" :value="index" :key="item.index">{{ item }}</Option>
              </Select>
            <!-- 日期控件 -->
              <DatePicker v-model="dataConfig.form[val.data]"  v-else-if='val.type==="date"'  type="daterange" placement="bottom-end" :placeholder="val.name"  style="width: 100%" ></DatePicker>
            <!-- 日期控件 end -->
              <!-- 普通输入框 -->
            <Input v-else-if='val.type === "input"'  v-model="dataConfig.form[val.data]" :placeholder='val.name' />
              <!-- 普通输入框 end-->
              <!-- 按钮组 -->
              <div v-else-if='val.type === "btns"' class="list-inline">
                  <!-- 设置 -->
                <span v-for="cell of val.cells" :key="cell.index">
                  <Button v-if="cell.type === 'set' "  type="primary">{{ cell.name }}</Button>
                  <!-- 查询 -->
                  <Button v-else-if="cell.type === 'filter' "  type="primary" @click='filterOrg'>{{ cell.name }}</Button>
                  <!-- 重置 -->
                  <Button  v-else-if="cell.type === 'reset' "  @click='resetFilter' type="primary">{{ cell.name }}</Button>
                </span>
              </div>
              <!-- 按钮组 end-->
            </Col>
          </Row>
          <!-- <div class="list-inline">
          <Button type="primary">分配</Button>
          <Button type="primary" @click='getOrgData'>匹配</Button>
          <Button @click='resetFilter' type="primary">重置</Button>
          </div> -->
        </div>
        <!-- 过滤 end-->
        <!-- content -->
        <!-- @on-row-click ='showTrTip' -->
        <Table class="table" 
        @on-select='checkTable' 
        @on-select-all='checkTable'
        @on-select-cancel='checkTable' border ref="selection" :columns="dataConfig.columns" :data="dataConfig.data"></Table>
        <!-- 分页 -->
        <Page
            :total="dataConfig.total"
            show-elevator
            show-total
            show-sizer
            :current='dataConfig.page'
            :page-size='dataConfig.size'
            :page-size-opts='dataConfig.pageSizeArr'
            @on-change='setPage'
            @on-page-size-change="setpageSize"
          >
          </Page>
        <!-- 分页 end-->
      </div>
  </div>

</template>
<script>
import TopToolBar from '../../components/Common/TopToolBar.vue'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    TopToolBar,
  },
  data() {
    // 分页配置
    let pageSizeArr = [10, 20, 30, 40]
    // model config

    let org = {
      name: '待审核',
      allTotal: 0,
      // 总数据数
      total: 0,
      auditStatus: '02',
      size: pageSizeArr[0],
      page: 1,
      pageSizeArr,
      // 存放数据
      data: [],
      form: {},
      input: {
        orgName: {
          type: 'input',
          data: 'orgName',
          name: '机构名称',
          value: ''
        },
        legalName: {
          type: 'input',
          data: 'realName',
          name: '被授权人姓名',
          value: ''
        },
        phone: {
          type: 'input',
          data: 'phone',
          name: '手机号',
          value: ''
        },
        // state: {
        //   data: 'state',
        //   type: 'select',
        //   name: '请选择分配状态',
        //   value: '',
        //   options: { '01': '未分配', '02': '已分配（客服A）' }
        // },
        state1: {
          type: 'select',
          data: 'orgInfoTypeId',
          name: '请选择机构类型',
          value: '1',
          default: '1',
          options: { '1': '企业机构', '2': '医疗机构' }
        },
        date: {
          data: 'date',
          name: '提交时间',
          default: [],
          type: 'date'
        },
        btns: {
          name: '按钮组',
          type: 'btns',
          cells: [
            // {
            //   name: '分配',
            //   type: 'set',
            //   target: 'state'
            // },
            {
              name: '筛选',
              type: 'filter'
            },
            {
              name: '重置',
              type: 'reset'
            }
          ]
        }
      },
      // table columns config
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '机构名称',
          key: 'orgName',
          render: (h, r) => {
            return h(
              'a',
              {
                on: {
                  click: () => {
                    this.linkData(r.row)
                  }
                }
              },
              r.row.orgName
            )
          }
        },
        {
          title: '被授权人姓名',
          key: 'realName'
        },
        // {
        //   title: '法人身份证号码',
        //   key: 'cardNo'
        // },
        {
          title: '手机号',
          key: 'phone'
        },
        {
          title: '分配状态',
          render: (h, r) => {
            return h('span', '未分配')
          }
        },
        {
          title: '提交时间',
          key: 'createTime',
          render: (h, r) => {
            let date = r.row.createTime
            date = new Date(date).toLocaleDateString()
            return h('span', date)
          }
        },
        {
          title: '操作',
          render: (h, r) => {
            let data = r.row.createTime
            return h(
              'Button',
              {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.linkData(r.row, 1)
                  }
                }
              },
              '审核'
            )
          }
        }
      ]
    }
    let org2 = {
      name: '审核通过',
      allTotal: 0,
      // 总数据数
      total: 0,
      auditStatus: '04',
      size: pageSizeArr[0],
      page: 1,
      pageSizeArr,
      // 存放数据
      data: [],
      form: {},
      input: {
        orgName: {
          type: 'input',
          data: 'orgName',
          name: '机构名称',
          value: ''
        },
        legalName: {
          type: 'input',
          data: 'realName',
          name: '被授权人姓名',
          value: ''
        },
        phone: {
          type: 'input',
          data: 'phone',
          name: '手机号',
          value: ''
        },
        state1: {
          type: 'select',
          data: 'orgInfoTypeId',
          name: '请选择机构类型',
          value: '1',
          default: '1',
          options: { '1': '企业机构', '2': '医疗机构' }
        },
        date: {
          data: 'date',
          name: '审核时间',
          default: [],
          type: 'date'
        },
        btns: {
          name: '按钮组',
          type: 'btns',
          cells: [
            {
              name: '筛选',
              type: 'filter'
            },
            {
              name: '重置',
              type: 'reset'
            }
          ]
        }
      },
      // table columns config
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '机构名称',
          key: 'orgName',
          render: (h, r) => {
            return h(
              'a',
              {
                on: {
                  click: () => {
                    this.linkData(r.row)
                  }
                }
              },
              r.row.orgName
            )
          }
        },
        {
          title: '被授权人姓名',
          key: 'realName'
        },
        {
          title: '手机号',
          key: 'phone'
        },
        // {
        //   title: '审核人',
        // },
        {
          title: '审核时间',
          key: 'modifyTime',
          render: (h, r) => {
            let date = r.row.modifyTime
            date = new Date(date).toLocaleDateString()
            return h('span', date)
          }
        },
        {
          title: '审核状态',
          key: 'auditStatus',
          render: (h, r) => {
            let f = h(
              'Tooltip',
              {
                props: {
                  content: r.row.auditCause
                }
              },
              '不通过'
            )

            let t = h('span', '通过')
            let val = r.row.auditStatus === '04' ? t : f
            return val
          }
        }
      ]
    }
    let org3 = {
      name: '审核不通过',
      allTotal: 0,
      // 总数据数
      total: 0,
      auditStatus: '05',
      size: pageSizeArr[0],
      page: 1,
      pageSizeArr,
      // 存放数据
      data: [],
      form: {},
      input: {
        orgName: {
          type: 'input',
          data: 'orgName',
          name: '机构名称',
          value: ''
        },
        legalName: {
          type: 'input',
          data: 'realName',
          name: '被授权人姓名',
          value: ''
        },
        phone: {
          type: 'input',
          data: 'phone',
          name: '手机号',
          value: ''
        },
        state1: {
          type: 'select',
          data: 'orgInfoTypeId',
          name: '请选择机构类型',
          value: '1',
          default: '1',
          options: { '1': '企业机构', '2': '医疗机构' }
        },
        date: {
          data: 'date',
          name: '审核时间',
          default: [],
          type: 'date'
        },
        btns: {
          name: '按钮组',
          type: 'btns',
          cells: [
            {
              name: '筛选',
              type: 'filter'
            },
            {
              name: '重置',
              type: 'reset'
            }
          ]
        }
      },
      // table columns config
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '机构名称',
          key: 'orgName',
          render: (h, r) => {
            return h(
              'a',
              {
                on: {
                  click: () => {
                    this.linkData(r.row)
                  }
                }
              },
              r.row.orgName
            )
          }
        },
        {
          title: '被授权人姓名',
          key: 'realName'
        },
        {
          title: '手机号',
          key: 'phone'
        },
        // {
        //   title: '审核人',
        // },
        {
          title: '审核时间',
          key: 'modifyTime',
          render: (h, r) => {
            let date = r.row.modifyTime
            date = new Date(date).toLocaleDateString()
            return h('span', date)
          }
        },
        {
          title: '审核状态',
          key: 'auditStatus',
          render: (h, r) => {
            let f = h(
              'Tooltip',
              {
                props: {
                  content: r.row.auditCause
                }
              },
              '不通过'
            )

            let t = h('span', '通过')
            let val = r.row.auditStatus === '04' ? t : f
            return val
          }
        }
      ]
    }

    let model = [org, org2,org3]
    // init form value
    for (let item of model) {
      for (let k in item.input) {
        let val = item.input[k]
        if (val.type !== 'btns') {
          if (val.data) item.form[val.data] = val.default || ''
        }
      }
    }
    return {
      // 审核
      reviewNum: {
        // 当前焦点
        active: 0,
        // 最大显示
        max: 99
      },
      // 列表数据
      model,
      // 选中
      checkout: []
    }
  },
  computed: {
    ...mapState(['pageModel']),
    storage() {
      return `portalmgr${this.$route.path}`
    },
    /// 获得当前列表配置
    dataConfig() {
      let name = this.reviewNum.active
      return this.model[name]
    }
  },
  methods: {
    ...mapActions(['registered', 'registeredAudit']),
    // 批量设置属性
    setDateAttr(Object) {},
    // 重置企业搜索
    resetFilter() {
      // 重置表单选择
      for (let index in this.dataConfig.input) {
        let cell = this.dataConfig.input[index]
        this.dataConfig.form[cell.data] = cell.default || ''
      }
      this.getOrgData().then(res => {
        // 获得总数
        this.dataConfig.allTotal = res.content.total
      })
    },
    // 筛选
    filterOrg() {
      this.dataConfig.page = 1
      this.getOrgData()
    },
    /**
     * 切换审核列表
     * @param {number} num 0 为待审核1
     */
    tabState(num) {
      this.reviewNum.active = num
      this.getOrgData().then(res => {
        // 获得总数
        this.dataConfig.allTotal = res.content.total
      })
    },
    // 读取缓存记录
    readStorage() {
      let config = sessionStorage.getItem(this.storage)
      if (!config) return false
      config = JSON.parse(config)
      // 选中的数据
      this.reviewNum.active = config.id
      this.dataConfig.form = config.data.form
      this.dataConfig.page = config.data.page
      this.dataConfig.size = config.data.size
      // this.dataConfig.total = config.data.total
      this.getOrgData()
      return config
    },
    /**
     * 时间转换 yyyy-MM-dd hh:mm:ss
     * @param {string} d 时间戳
     * */
    toDateTime(d) {
      let date = new Date(d)
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
    // 获取注册数据
    getOrgData(data) {
      // 获取当前的列表
      let config = data ? data : this.dataConfig

      // 查询
      let param = {
        size: config.size,
        page: config.page,
        orgInfoTypeId: config.check,
        auditStatus: config.auditStatus
      }
      // 获得表单数据
      for (let k in config.form) {
        let val = config.form[k]
        param[k] = val
      }
      // 时间处理
      let date = config.form.date
      if (date.length && date[0]) {
        let end = new Date(date[1]).toLocaleDateString() + ' 23:59:59'
        param.dateStart = this.toDateTime(date[0])
        param.dateEnd = this.toDateTime(end)
      }
      // 时间对象 JSON.stringify 转换后会出现 day-1的问题
      this.dataConfig.form.date = [param.dateStart,param.dateEnd]
      return this.registered(param).then(
        res => {
          // 更新数据
          this.initTable(res.content)
          // 设置缓存记录
          let storageDate = { id: this.reviewNum.active, data: this.dataConfig }
          sessionStorage.setItem(this.storage, JSON.stringify(storageDate))
          return Promise.resolve(res)
        },
        err => {
          return Promise.reject(res)
        }
      )
    },
    /**
     * 初始化表格
     * @param {Object} data table config
     * */
    initTable(data) {
      this.dataConfig.size = data.size
      this.dataConfig.page = data.page
      // table data
      this.dataConfig.data = data.records
      // data all
      this.dataConfig.total = data.total
    },
    /**
     * 点击跳转到详情页
     * @param {Object} date row data
     * @param {number} state 查看/审查 1状态
     * */

    linkData(data, state) {
      let link = `/ZCSH002/page/${data.id}/${data.userId}`
      if (state) link += '?review=1'
      this.$router.push(link)
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
      this.dataConfig.page = n
      this.getOrgData()
    },
    /**
     * 设置单页数目
     * @param {number} val 选中的条数
     * */
    setpageSize(val) {
      this.dataConfig.size = val
      this.getOrgData()
    }
  },
  created() {
    // 读取表格缓存
    let storage = this.readStorage()
    if (!storage) {
      this.getOrgData()
    }
  },
}
</script>
<style lang="scss" src='@/assets/css/page.scss'></style>
