// 应用管理
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

  </div>
</template>
<script>
import TopToolBar from '../../components/Common/TopToolBar.vue'
import validatejs from '../../assets/js/validate.js'
import FormGroup from '../../components/formGroup.vue'
import { mapState, mapActions } from 'vuex'
import Const from '../../assets/js/const'
export default {
  data() {
    return {
      org_load: false,
      disabledSub: false,
      // 当前状态
      id: this.$route.params.id || '',
      app_attr: {},
      // 验证
      formValidate: {
        type: [
          {
            required: true,
            message: '应用分类不能为空',
            trigger: 'change'
          }
        ],
        name: [
          {
            required: true,
            message: '应用名称不能为空',
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '应用编号不能为空',
            trigger: 'blur'
          }
        ],
        proAppTypeId: [
          {
            required: true,
            message: '应用类型不能为空',
            trigger: 'blur'
          }
        ]
      },
      // 数据
      formData: {}
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
      let str = this.state ? '编辑应用' : '应用详情'
      return !this.id ? '新增应用' : str
    },
    // 表单配置
    formConfig() {
      return [
        {
          name: '应用分类',
          type: 'select',
          data: 'type',
          required: true,
          options: Const.TYPE_APP_ATTR,
          placeholder: '请选择账户类型',
          readonly: !!!this.state
        },
        {
          name: '应用名称',
          type: 'string',
          data: 'name',
          required: true,
          placeholder: '请填写应用名称',
          readonly: !!!this.state
        },
        {
          name: '应用编号',
          type: 'string',
          data: 'code',
          required: true,
          placeholder: '请填写应用编号',
          options: this.app_attr,
          readonly: this.id
        },
        {
          name: '应用类型',
          type: 'select',
          data: 'proAppTypeId',
          required: true,
          placeholder: '请选择应用类型',
          options: this.app_attr,
          readonly: !!!this.state
        },
        {
          name: '排序',
          type: 'string',
          data: 'sortNum',
          placeholder: '请填写排序',
          readonly: !!!this.state
        },
        {
          name: '资源路径',
          type: 'string',
          data: 'url',
          placeholder: '请填写资源路径',
          readonly: !!!this.state
        },
        {
          name: '备注',
          type: 'text',
          data: 'remark',
          placeholder: '请填写备注',
          readonly: !!!this.state
        },
        {
          name: '图标',
          type: 'file',
          data: 'logoFile',
          readonly: !!!this.state,
          defuld: [],
          action: '/portal/pub/comm/uploadimage',
          format: ['jpg', 'jpeg', 'png'],
          maxSize: 1024 * 5,
          maxLength: 1
        }
      ]
    }
  },
  methods: {
    ...mapActions([
      'appUpdate',
      'appInfo',
      'typeAppAttr',
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
          this.disabledSub = true
          // img
          if (param.logoFile.length) {
            param.logo = param.logoFile[0].id
          }
          // id
          if (this.id) param.id = this.id
          this.appUpdate(param).then(
            res => {
              this.disabledSub = false
              this.$Message.success({ content: '保存成功' })
              this.$router.push({ name: '应用管理' })
            },
            err => {
              this.disabledSub = false
              this.formData.sortNum = 100
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
      if (!this.id) return
      // 获得数据
      this.appInfo({ id: this.id }).then(res => {
        let data = res.content
        this.formData = data
        if (data.logoFile && data.logoFile.id) {
          this.formData.logoFile = [data.logoFile]
        }
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
            this.$router.push({ name: '应用管理' })
          }
        })
      } else {
        // 回退到list
        this.$router.go(-1)
      }
    },
    /**
     * 页面状态跳转 空为详情页
     */
    gotoState(val) {
      let path = {
        name: '用户信息',
        params: { id: this.id }
      }
      if (val) {
        // 编辑模式
        path.query = { edit: 1 }
      }
      this.$router.push(path)
    }
  },
  created() {
    this.typeAppAttr().then(res => {
      let arr = {}
      for (let item of res.content) {
        arr[item.id] = item.name
      }
      this.app_attr = arr
    })
  },
  components: { TopToolBar, FormGroup }
}
</script>
