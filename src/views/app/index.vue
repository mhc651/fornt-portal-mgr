// 应用管理列表
<template>
  <div>
    <!-- title -->
     <top-tool-bar class="title--bg" title='应该管理'>
          <span slot="content">
            <strong class="help">说明</strong>
            <p>
            无
            </p>
          </span>
      </top-tool-bar>
    <!-- title end-->
    <!-- content  -->
    <div class="page-container">
        <!-- table -->
        <table-page
          ref="table"
          :filter='filter'
          :getDataFn='initTable'
          :columns= 'columns'
          :pagerSizeArr= 'PAGE_SIZE_ARR'
          :pagerSize= 'size'
          :data = 'data'
          :total = 'total'
          :storage ='"portalmgr"+ $route.path '
         />
        <!-- table end-->
         <div style="margin-top:15px">
            <Button type="primary" @click="$router.push({name:'新增应用',query:{edit:1}})">新增</Button>
            <Button  @click="gotoEdit">编辑</Button>
            <!-- <Button  @click="deleteTable" type="error">批量删除</Button> -->
          </div>
        </div>
    </div>   
    <!-- content  end-->
  </div>
</template>

<script>
import TopToolBar from '../../components/Common/TopToolBar.vue'
import TablePage from '../../components/tablePage.vue'
import { mapState, mapActions } from 'vuex'
import Const from '../../assets/js/const'
export default {
  data() {
    return {
      // 当前状态选择
      data: [],
      size: Const.PAGE_SIZE_ARR[0],
      total: 0,
      // 应用分类
      PAGE_SIZE_ARR: Const.PAGE_SIZE_ARR,
      // 应用类型
      app_attr: {},
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '应用分类',
          key: 'type',
          render: (h, r) => {
            let val = r.row.type
            val = Const.TYPE_APP[val]
            return h('span', val)
          }
        },
        {
          title: '应用对象',
          key: 'proTypeName'
        },
        {
          title: '应用编号',
          key: 'code'
        },
        {
          title: '应用名称',
          key: 'name',
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
              r.row.name
            )
          }
        },
        {
          title: '资源路径',
          key: 'url'
        },

        {
          title: '排序',
          key: 'sort_num'
        }
      ]
    }
  },
  computed: {
    /**
     * 筛选
     */
    filter() {
      return [
        {
          data: 'type',
          name: '请选择应用分类',
          type: 'select',
          options: Const.TYPE_APP
        },
        {
          data: 'proAppTypeId',
          name: '请选择应用类型',
          type: 'select',
          options: this.app_attr
        },
        {
          data: 'code',
          name: '应用编码',
          type: 'string'
        },
        {
          data: 'name',
          name: '应用名称',
          type: 'string'
        },
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
    }
  },
  methods: {
    ...mapActions(['typeAreaList', 'appList', 'typeAppAttr']),
    /**
     * 初始化表格
     * @param {Object} param 筛选数据
     */
    initTable(param) {
      param = JSON.parse(JSON.stringify(param))
      if (param.type == 0) param.type = ''
      if (param.proAppTypeId == 0) param.proAppTypeId = ''
      // 状态
      this.appList(param).then(res => {
        this.data = res.content.records
        this.total = res.content.total
      })
    },
    /**
     * 删除应用
     */
    deleteTable() {},
    /**
     * 点击跳转到详情页
     * @param {Object} date row data
     * @param {number} state 查看/审查 1状态
     * */
    linkData(data, state) {
      let link = {
        name: '应用信息',
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
    }
  },
  created() {
    this.typeAppAttr().then(res => {
      let arr = { '0': '全部' }
      for (let item of res.content) {
        arr[item.id] = item.name
      }
      this.app_attr = arr
    })
  },
  components: { TopToolBar, TablePage }
}
</script>
<style lang="scss" src='@/assets/css/page.scss'></style>

