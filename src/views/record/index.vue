// 项目管理
<template>
  <div>
      <top-tool-bar  title='开通记录'>
        <span slot="btn">
      </span>
          <span slot="content">
            <strong class="help">说明</strong>
            <p>
            无
            </p>

          </span>
      </top-tool-bar>
      <div class="page-container">
        <table-page
          ref="table"
          :filter='model.filter'
          :getDataFn='initTable'
          :columns= 'model.columns'
          :pagerSizeArr= 'model.PAGE_SIZE_ARR'
          :pagerSize= 'model.size'
          :data= 'tableDate'
          :total = 'model.total'
          :storage ='"portalmgr"+ $route.path '
         />
         <div style="margin-top:15px">
          <Button  @click="setAppOpen" type="primary">设置开通日期</Button>
         </div>
      </div>
      <!-- pw show -->
      <my-modal
      title="设置开通时间"
      v-model="modal_date"
      width="400"
      @on-close = 'modal_date = false'
      @on-ok = 'subAppOpenTable' 
      > 
        <Form ref="form" :model="form_date" :label-width="70"
         style="margin-top:20px"
         >
          <FormItem class="form--padding" label="开通时间" prop="date">
            <DatePicker type="date" v-model="form_date.date" 
            style="width:100%"
            ></DatePicker>
          </FormItem>
        </Form>
      </my-modal>
      <!-- pw show -->
  </div>
</template>
<script>
import TopToolBar from '../../components/Common/TopToolBar.vue'
import TablePage from '../../components/tablePage.vue'
import MyModal from '../../components/myModal.vue'
import { mapState, mapActions } from 'vuex'
import Const from '../../assets/js/const'
export default {
  data() {
    let model = {
      // 总数据数
      total: 0,
      size: Const.PAGE_SIZE_ARR[0],
      page: 1,
      PAGE_SIZE_ARR: Const.PAGE_SIZE_ARR
    }
    // 筛选列表
    model['filter'] = [
      {
        data: 'orgName',
        name: '企业名称',
        type: 'string'
      },
      {
        data: 'appName',
        name: '应用名称',
        type: 'string'
      },
      {
        data: 'date',
        name: '注册时间',
        default: [],
        type: 'daterange'
      },
      // {
      //   name: '请选择账号类型',
      //   type: 'select',
      //   data: 'userType',
      //   options: { '0':'全部','01': '主账号', '02': '子账号' }
      // },
      {
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
    ]
    // 表格配置
    model.columns = [
      {
        type: 'selection',
        width: 60,
        align: 'center'
      },
      {
        title: '企业名称',
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
        title: '应用名称',
        key: 'appName'
      },
      {
        title: '账号',
        key: 'userName',
        // render: (h, r) => {
        //   let val = r.row.userType === '01' ? '主帐号' : '子帐号'
        //   return h('span', val)
        // }
      },
      {
        title: '开通时间',
        key: 'openingTime'
      },
      {
        title: '应用开通到期时间',
        key: 'openValidData'
      }
    ]
    return {
      model,
      // 表格数据
      tableDate: [],
      // 设置的时间
      modal_date: false,
      form_date: {
        date: ''
      }
    }
  },
  methods: {
    ...mapActions(['appOpenList', 'appOpenDate']),
    /**
     * 点击跳转到详情页
     * @param {Object} date row data
     * @param {number} state 查看/审查 1状态
     * */
    linkData(data, state) {
      let link = {
        name: '用户信息',
        params: {
          id: data.id
        }
      }
      if (state) link.query = { edit: 1 }
      this.$router.push(link)
    },

    /**
     * 初始化表格
     * @param {Object} param 筛选数据
     */
    initTable(param) {
      // 状态
      if (param.userType == 0) param.userType = ''
      if (param.valid == ' ') param.valid = ''
      this.appOpenList(param).then(res => {
        this.tableDate = res.content.records
        this.model.total = res.content.total
      })
    },
    /**
     * 设置开通时间时间
     */
    setAppOpen() {
      let $table = this.$refs['table']
      let datas = this.$refs['table'].checkout
      if (!datas.length) {
        this.$Message.warning({ content: '请选择设置的对象？' })
        return
      }
      this.modal_date = true
    },
    /**
     * 提交开通时间
     */
    subAppOpenTable() {
      if (!this.form_date.date) {
        this.$Message.warning({ content: '请设置开通的时间' })
        return
      }
      let $table = this.$refs['table']
      let datas = this.$refs['table'].checkout
      let date = this.form_date.date.toLocaleDateString()
      // date = date.replace(/\\/g, '-')
      let params = {
        ids: datas.map(v => v.id).join(','),
        openValidDate: date.replace(/\//g, '-')
      }
      this.appOpenDate(params).then(res => {
        this.modal_date = false
        this.$Message.success({content:'设置成功！'})
        this.$refs['table'].getData()
      })
    }
  },
  components: {
    TopToolBar,
    TablePage,
    MyModal
  }
}
</script>
