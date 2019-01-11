<template>
  <div>
    <!-- head -->
       <top-tool-bar  :title='title'>
        <span slot="btn">
        <Button @click="backData" >{{ state?'取消':'返回' }}</Button>
        <Button type="primary" :disabled='disabledSub' v-if='state' @click="subForm" >保存</Button>
      </span>
          <span slot="content">
            <strong class="help">说明</strong>
            <p>
            无
            </p>

          </span>
      </top-tool-bar>
    <!-- head end-->
      <form-group  ref="group" :form='formData' :config='formConfig' :validate='formValidate' ></form-group>

      <p class="text-tip">
        <span class="text--red">*</span>
        提示：新建账号密码默认为 <span class="text--red">hx123456</span>
      </p>
  </div>
</template>
<script>
import TopToolBar from '../../components/Common/TopToolBar.vue'
import validatejs from '../../assets/js/validate.js'
import FormGroup from '../../components/formGroup.vue'
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    /**
     *  允许空验证
     */
    const validateEmail = function(a, v, c) {
      if (v) {
        if (validatejs.validateMail(a, v)) {
          c()
        } else {
          c(Error('邮箱格式不正确'))
        }
      } else {
        // 允许空
        c()
      }
    }
    return {
      org_load: false,
      disabledSub: false,
      // 当前状态
      userId: this.$route.params.id || '',
      // 验证
      formValidate: {
        // area: [
        //   {
        //     validator: (r, v, callback) => {
        //       if (v.length) {
        //         callback()
        //       } else {
        //         callback(new Error('所属地区不能为空'))
        //       }
        //     },
        //     trigger: 'change'
        //   }
        // ],
        orgId: [
          {
            required: true,
            message: '机构不能为空',
            trigger: 'change'
          }
        ],
        phone: [
          {
            required: true,
            message: '手机号码不能为空',
            trigger: 'blur'
          },
          { validator: validatejs.validatePhone, trigger: 'blur' }
        ],
        realName: [
          {
            required: true,
            message: '真实姓名不能为空',
            trigger: 'blur'
          }
        ],
        userName: [
          {
            required: true,
            message: '登录账号不能为空',
            trigger: 'blur'
          }
        ],
        userType: [
          {
            required: true,
            message: '账号类型不能为空',
            trigger: 'change'
          }
        ],
        email: [
          {
            validator: validateEmail,
            trigger: 'blur'
          }
        ]
      },
      // 数据
      formData: {},
      // 地区列表
      areaList: [],
      orgList: {}
    }
  },
  computed: {
    // 只读状态 1 编辑
    state() {
      this.initData()
      return this.$route.query.edit || false
    },
    // 标题
    title() {
      let str = this.state ? '编辑用户' : '用户详情'
      return !this.userId ? '新增用户' : str
    },
    // 表单配置
    formConfig() {
      return [
        // {
        //   name: '所属所属区域',
        //   type: 'cascader',
        //   data: 'area',
        //   required: true,
        //   defuld: [],
        //   placeholder: '请选择所属所属区域',
        //   options: this.areaList,
        //   loadData: (item, callback) => {
        //     item.loading = true
        //     // 修改加载状态
        //     this.typeAreaList({ parentId: item.value }).then(res => {
        //       item.loading = false
        //       if (res.content.length) {
        //         item.children = this.toTypeArea(res.content)
        //         callback()
        //       } else {
        //         // 发现无下一级时更新数值
        //         this.formData.area.push(item.value)
        //         delete item.children
        //         delete item.loading
        //       }
        //     })
        //   },
        //   readonly: !!!this.state
        // },
        {
          name: '账户类型',
          type: 'select',
          data: 'userType',
          required: true,
          placeholder: '请选择账户类型',
          options: { '01': '主账号', '02': '子账号' },
          readonly: !!!this.state
        },
        {
          name: '所属机构',
          type: 'search',
          data: 'orgId',
          required: true,
          placeholder: '请输入进行机构搜索',
          options: this.orgList,
          loading: this.org_load,
          read: this.formData.orgName,
          fn: (query) => {
            // 远程搜索
            if (query !== '') {
              /**
               * 企业选项
               */
              this.org_load = true
              this.typeOrgList({ orgName: query }).then(
                res => {
                  this.org_load = false
                  this.orgList = this.toTypeOrg(res.content)
                },
                err => {
                   this.org_load = false
                }
              )
            } else {
              this.orgList = []
            }
          },
          readonly: this.userId ? true : false
        },
        {
          name: '登录账号',
          type: 'string',
          data: 'userName',
          required: true,
          placeholder: '请填写登录账号',
          readonly: this.userId ? true : false
        },
        {
          name: '真实姓名',
          type: 'string',
          data: 'realName',
          required: true,
          placeholder: '请填写真实姓名',
          readonly: !!!this.state
        },
        {
          name: '手机号',
          type: 'string',
          data: 'phone',
          required: true,
          placeholder: '请填写手机号',
          readonly: !!!this.state
        },
        {
          name: '邮箱',
          type: 'string',
          data: 'email',
          placeholder: '请填写邮箱',
          readonly: !!!this.state
        },
        {
          name: '备注',
          type: 'text',
          data: 'remark',
          placeholder: '请填写备注',
          readonly: !!!this.state
        }
      ]
    }
  },
  methods: {
    ...mapActions([
      'userUpdate',
      'userInfo',
      'typeOrgList',
      'typeAreaList',
      'typeOrgList'
    ]),
    /**
     * 提交表单
     */
    subForm() {
      this.$refs['group'].subForm().then(
        param => {
          // 编辑用户
          if (this.userId) {
            param['userId'] = this.userId
          }
          this.disabledSub = true
          if (param.area) {
            // area to param
            let area = ['provinceId', 'cityId', 'areaId']
            for (let i = 0; i < param.area.length; i++) {
              param[area[i]] = param.area[i]
            }
          }
          this.userUpdate(param).then(
            res => {
              this.disabledSub = false
              this.$Message.success({ content: '保存成功' })
              this.$router.push({ name: '用户管理' })
            },
            err => {
              this.disabledSub = false
            }
          )
        },
        err => {
          console.error(err)
        }
      )
    },
    /**
     * 数据初始化
     */
    initData() {
      if (!this.userId) return
      // 获得数据
      this.userInfo({ userId: this.userId }).then(res => {
        this.formData = res.content
        // 企业列表组
      })
    },
    /**
     * 取消
     */
    backData() {
      if (this.state) {
        this.$Modal.confirm({
          content: '取消编辑将不保存数据',
          onOk: () => {
            this.$router.push('/ZCSH001')
          }
        })
      } else {
        // 回退到list
        this.$router.push('/ZCSH001')
      }
    },
    /**
     * 页面状态跳转 空为详情页
     */
    gotoState(val) {
      let path = {
        name: '用户信息',
        params: { id: this.userId }
      }
      if (val) {
        // 编辑模式
        path.query = { edit: 1 }
      }
      this.$router.push(path)
    },
    /**
     * 地区格式转换
     * @param {Array} datas
     */
    toTypeArea(datas) {
      let area = []
      for (let item of datas) {
        let arr = {
          value: item.id,
          label: item.name,
          children: [],
          loading: false
        }
        area.push(arr)
      }
      return area
    },
    /**
     * 转企业列表格式
     */
    toTypeOrg(datas) {
      let options = {}
      for (let item of datas) {
        options[item.id] = item.orgName
      }
      return options
    }
  },
  created() {
    /**
     * 地区省
     */
    // this.typeAreaList().then(res => {
    //   this.areaList = this.toTypeArea(res.content)
    // })
  },
  components: { TopToolBar, FormGroup }
}
</script>
