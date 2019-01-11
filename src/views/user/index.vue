// 项目管理
<template>
  <div>
      <top-tool-bar  title='用户管理'>
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
          <Button  @click="$router.push({name:'新增用户',query:{edit:1}})" type="primary">新增</Button>
          <Button  @click="gotoEdit">编辑</Button>
          <Button  @click="deleteTable" type="error">限制权限</Button>
           <Button  @click="setUserAuditTable" type="success">启用权限</Button>
          <Button  @click="resetPwTable" type="primary">密码重置</Button>
         </div>
      </div>
      <!-- pw show -->
      <Modal
        v-model="pwTip.bool"
        title="提示"
        width='300'
       >
        <p>{{ pwTip.content }}</p>
    </Modal>
      <!-- pw show -->
  </div>
</template>
<script>
import TopToolBar from '../../components/Common/TopToolBar.vue'
import TablePage from '../../components/tablePage.vue'
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
        data: 'name',
        name: '姓名',
        type: 'string'
      },
      {
        data: 'phone',
        name: '手机号',
        type: 'string'
      },
      {
        data: 'date',
        name: '注册时间',
        default: [],
        type: 'daterange'
      },
      {
        data: 'valid',
        name: '是否有效',
        type: 'select',
        options: [
          { value: ' ', label: '全部' },
          { value: '0', label: '不可用' },
          { value: '1', label: '可用' }
        ]
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
        title: '登录账号',
        key: 'userName',
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
            r.row.userName
          )
        }
      },
      {
        title: '姓名',
        key: 'realName'
      },

      {
        title: '手机号',
        key: 'phone'
      },
      {
        title: '账号类型',
        key: 'userType',
        render: (h, r) => {
          let val = r.row.userType === '01' ? '主帐号' : '子帐号'
          return h('span', val)
        }
      },
      {
        title: '邮箱',
        key: 'email'
      },
      {
        title: '是否有效',
        key: 'valid',
        render: (h, r) => {
          let data = {
            0: {
              title: '权限受限',
              color: '#f00'
            },
            1: {
              title: '可用',
              color: 'green'
            }
          }
          let val = r.row.valid

          return h(
            'span',
            {
              style: { color: data[val].color }
            },
            data[val].title
          )
        }
      }
    ]
    return {
      model,
      // 表格数据
      tableDate: [],
      // 重置密码提示
      pwTip: {
        bool: false,
        content: ''
      }
    }
  },
  methods: {
    ...mapActions(['userList', 'userDelete', 'userResetPw','userAudit']),
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
     * 编辑
     */
    gotoEdit() {
      let checkout = this.$refs['table'].checkout
      if (!checkout.length) {
        return this.$Message.warning({ content: Const.ERROR_EDIT_EMPTY })
      } else if (checkout.length > 1) {
        return this.$Message.warning({ content: Const.ERROR_EDIT_MORE })
      }
      this.linkData(checkout[0], 1)
    },
    /**
     * 初始化表格
     * @param {Object} param 筛选数据
     */
    initTable(param) {
      // 状态
      if (param.userType == 0) param.userType = ''
      if (param.valid == ' ') param.valid = ''
      this.userList(param).then(res => {
        this.tableDate = res.content.records
        this.model.total = res.content.total
      })
    },
    /**
     * 提交 重新启用权限
     */
    setUserAuditTable() {
      let $table = this.$refs['table']
      let datas = this.$refs['table'].checkout
      if (!datas.length) {
        this.$Message.warning({ content: '请选择启用权限的对象？' })
        return
      }
      let ids = datas.map(val => val.id).join(',')
      this.$Modal.confirm({
        content: '确定要启用选中对象的权限吗！',
        onOk: () => {
          this.userAudit({ ids }).then(
            res => {
              this.$Message.success({ content: '成功' })
              // init data
              $table.getData()
            },
            err => {
              // 失败
            }
          )
        }
      })
    },
    /**
     *  提交删除
     */
    deleteTable() {
      let $table = this.$refs['table']
      let datas = this.$refs['table'].checkout
      if (!datas.length) {
        this.$Message.warning({ content: '请选择要限制权限的对象?' })
        return
      }
      let ids = datas.map(val => val.id).join(',')
      this.$Modal.confirm({
        content: '确定要限制选中的对象的权限吗！',
        onOk: () => {
          this.userDelete({ ids }).then(
            res => {
              this.$Message.success({ content: '成功' })
              // init data
              $table.getData()
            },
            err => {
              // 失败
            }
          )
        }
      })
    },
    /**
     * 重置密码
     * */
    resetPwTable() {
      let $table = this.$refs['table']
      let datas = this.$refs['table'].checkout
      if (!datas.length) {
        this.$Message.warning({ content: '请选择要重置密码的对象' })
        return
      }
      let ids = datas.map(val => val.id).join(',')
      this.$Modal.confirm({
        content: '确定要重置密码吗！',
        onOk: () => {
          this.userResetPw({ userId: ids }).then(
            res => {
              this.pwTip.bool = true
              this.pwTip.content = res.content
              // init data
              $table.getData()
            },
            err => {
              // 失败
            }
          )
        }
      })
    }
  },
  components: {
    TopToolBar,
    TablePage
  }
}
</script>
