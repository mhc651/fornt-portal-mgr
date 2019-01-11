// 详情页
<template>
<div >
  <!-- 审核回复 -->
    <top-tool-bar class="title--bg"  :title="'企业注册审核'">
        <span slot="btn">
        <Button v-if="!read" :disabled='disabledSub' type="primary" @click="subForm" >提交回复</Button>
        <Button type="primary" @click="$router.go(-1)" >返回</Button>
      </span>
      <span slot="content">
        <strong class="help">说明</strong>
        <p>
          无
        </p>
      </span>
    </top-tool-bar>
    <div class="page-container">
    <!-- 审核信息 -->
      <div v-if="read && form.auditResultFlag||!read">

        <h5 class="title">
          审核信息
        </h5>
        <!-- form  -->
        <table class="info-table">
          <tr>
              <th class="label"><span class="required">*</span>审核结果</th>
              <td colspan="3">
                <Select :disabled='read' v-model="form.auditResultFlag">
                  <Option value="true" >通过</Option>
                  <Option value="false" >不通过</Option>
              </Select>
              </td>
            </tr>
          <tr >
              <th class="label">审核意见</th>
              <td colspan="3">
                <Input :readonly='true' v-model="form.auditContent" type="textarea" :rows="5" :placeholder='auditContentTip' />
              </td>
            </tr>
        </table>
        <!-- form  -->
      </div>
      <!-- 审核信息 end-->
    <!-- 审核回复 end-->
    <!-- string data -->
    <div>
      <h5 class="title">
        企业信息和授权信息
      </h5>
      <table class="info-table">
        <tr v-for="item of model" :key='item.index' v-if='item.type === "string" && server.orgInfo &&server.orgInfo[item.data]' >
            <th class="label">
              <span v-if='item.required' class="required">*</span>
              {{ item.name }}
            </th>
            <!-- class 不通过显示 -->
            <td colspan="3"  >
              {{ server.orgInfo[item.data]}}
            </td>
            <!-- <td align='center'>
              <div  v-if='!read && !item.read'>
                <template v-if="item.state" >
                  <Button   type="primary" @click="reviewFalse(item)" icon="close" ></Button>
                  <Button type="primary" @click="reviewTure(item)" icon="checkmark"></Button>
                </template>
              </div>
            </td> -->
          </tr>
      </table>
    </div>
    <!-- string data end -->
    <!-- 授权文件 -->
    <div>
      <h5 class="title">
        授权文件
      </h5>
      <table class="info-table">
        <tr  class="tr--only">
          <th class="label">
            授权文件
          </th>
          <td  colspan="2" >
            未找到任何文件
          </td>
        </tr>
        <!-- file -->
        <tr v-for="item of model" :key='item.index' v-if='item.type === "file" && server.orgInfo&& server.orgInfo[item.data] ||auditData[item.data]&&item.type === "file"'  >
            <th class="label">
              <span v-if='item.required' class="required">*</span>
              {{ item.name }} 
            </th>
            <td colspan="2"  >
              <!-- 资源链接 -->
              <p v-if='server.orgInfo[item.data+"Info"]&&server.orgInfo[item.data+"Info"].url'>
                <a @click='readPic(server.orgInfo[item.data+"Info"].url)' >{{ server.orgInfo[item.data+'Info'].name}}</a>
              </p>
              <p v-else>
                无
              </p>
              <!-- 资源链接 end-->
                <!-- 通过状态 -->
                <div v-if="auditData[item.data]">
                  <p>
                  状态：<span class="red">审核不通过</span>
                  </p>
                  <p>
                  原因：{{ auditData[item.data] }}
                  </p>
                </div>
                <!-- 通过状态 end-->
            </td>
            <td align='center' v-if='!read'>
                <Button   type="primary" @click="reviewFalse(item)" icon="close" ></Button>
              <Button type="primary" @click="reviewTure(item)" icon="checkmark"></Button>
            </td>
          </tr>
        <!-- file end-->
      </table>
      <Modal
          v-model="modal.show"
          :title="modal.title"
          @on-ok="reviewOk"
          width = '700'
          >
          <table class="info-table">
        <tr>
            <th class="label">审核意见</th>
            <td colspan="2">
              <Input v-model="modal.val" type="textarea" :rows="5" :placeholder='modal.tip' />
            </td>
          </tr>
      </table>

      </Modal>
    </div>
    <!-- 授权文件 end-->
    <div v-if='table.data.length'>
      <h5 class="title" >
        变更记录（每变更一次就生成一条变更记录，列表只显示审核通过的变更记录。）
      </h5>
      <Table class="table"
        border ref="selection" :columns="table.columns" ></Table>
    </div>
  </div>
</div>
</template>
<script>
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.min.css'
import TopToolBar from '../../components/Common/TopToolBar.vue'
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      disabledSub: false,
      // 编辑状态 1
      read: true,
      // 图片预览
      viewerContainer: '',
      pic: '',
      // 输入模块
      modal: {
        show: false,
        title: '',
        data: '',
        val: '',
        tip: `1、 默认不操作√、×，视审核结果为通过，不显示此弹框。
2、审核员，打×，显示此弹框，需在此处输入原因。
3、点击按钮【确定】，需把审核结果与意见显示在当前资质。
4、审核结果与审核意见需同步到审核信息模块。举例：营业执照：审核不通过，审核意见是xxx
`
      },
      auditContentTip: `说明：审核结果：通过。此处可不输审核意见
           审核结果：不通过。此处必须输入审核意见

注意：如果审核员，只在此审核信息模块选择不通过，不操作：×，需提示：您未对任何一项资质进行单独审核，请先审核具体资质项，在提交回复！`,
      form: {},
      // 审核内容，json字符串
      auditData: {},
      server: '',
      table: {
        columns: [
          {
            title: '机构名称',
            key: 'orgName'
          },
          {
            title: '被授权人姓名',
            key: 'authUserRealName'
          },
          {
            title: '被授权人手机号',
            key: 'authUserPhoneNo'
          },
          {
            title: '审核人',
            key: 'authUserPhoneNo'
          },
          {
            title: '变更时间',
            key: 'authUserPhoneNo'
          },
          {
            title: '审核时间',
            key: 'authUserPhoneNo'
          }
        ],
        data: []
      }
    }
  },
  computed: {
    model() {
      let model = [
        // 输入框
        {
          type: 'string',
          data: 'orgName',
          name: '企业名称',
          required: true,
          state: ''
        },
        {
          type: 'string',
          data: 'legalName',
          name: '法人姓名',
          required: true
        },
        {
          type: 'string',
          data: 'credit',
          name: '统一社会信用代码/营业执照代码/执业许可证代码',
          required: true
        },
        // 企业
        {
          type: 'string',
          data: 'licenseNumber',
          name: '统一社会信用代码/营业执照代码/执业许可证代码',
          required: true
        },
        // 医疗机构
        {
          type: 'string',
          data: 'authUserRealName',
          name: '被授权人姓名',
          required: true
        },
        {
          type: 'string',
          data: 'authUserCardNo',
          name: '被授权人身份证号',
          required: true
        },
        {
          type: 'string',
          data: 'authUserPhoneNo',
          name: '被授权人手机号码',
          required: true
        },
        {
          type: 'string',
          data: 'userName',
          name: '登录账号',
          required: true,
          read: true
        },
        {
          type: 'file',
          data: 'buzLicenceFile',
          name: '营业执照',
          required: true,
          state: ''
        },
        {
          type: 'file',
          data: 'organizationFile',
          name: '组织机构代码证',
          state: ''

          // required: true
        },
        {
          type: 'file',
          data: 'taxFile',
          name: '税务登记证',
          // required: true,
          state: ''
        },
        {
          type: 'file',
          data: 'authFile',
          name: '企业授权函',
          required: true,
          state: ''
        },
        {
          type: 'file',
          data: 'licenseFile',
          name: '执业许可证文件',
          required: true,
          state: ''
        }
      ]
      return model
    }
    // server() {
    //   // 获得data
    //   let params = this.$route.params
    //   return this.orgInfo({
    //     orgId: params.id,
    //     userId: params.user
    //   }).then(res => {
    //     return res.content
    //   })
    // }
  },
  methods: {
    ...mapActions(['orgInfo', 'registeredAudit']),
    // 图片预览
    readPic(url) {
      this.pic = url
      this.viewerContainer.show()
    },
    // 审核不通过
    reviewFalse(item) {
      this.modal.show = true
      this.modal.data = item
      this.modal.title = item.name
      this.modal.val = this.auditData[item.data]
    },
    // 审核通过 去除数据
    reviewTure(item) {
      delete this.auditData[item.data]
      this.setAuditContent()
    },
    // modal
    reviewOk() {
      let item = this.modal.data
      // 添加审核回复
      this.auditData[item.data] = this.modal.val
      this.setAuditContent()
    },
    // 设置审核回复字符串
    setAuditContent() {
      let content = ''
      for (let item of this.model) {
        let val = this.auditData[item.data]
        if (val) {
          content += `${item.name}:${val}\n`
        }
      }
      this.form.auditContent = content
    },
    // 提交审核消息
    subForm() {
      if (this.form.auditResultFlag === '') {
        this.$Modal.warning({
          content: '审核结果不能为空'
        })
        return false
      }
      this.disabledSub = true
      let param = JSON.parse(JSON.stringify(this.form))
      param.auditData = JSON.stringify(this.auditData)

      let bool = param.auditResultFlag === 'false' ? false : true
      let that = this
      if (this.form.auditContent !== '' && bool) {
        // 审核通过 存在审核信息
        this.$Modal.confirm({
          title: '警告',
          content: '审核意见存在不通过的资料，确定要审核通过吗',
          onOk: () => {
            this.registeredAudit(param).then(
              res => {
                this.disabledSub = false

                this.$router.go(-1)
              },
              err => {
                this.disabledSub = false
              }
            )
          }
        })
        return false
      } else if (this.form.auditContent === '' && !bool) {
        // 审核不通过 不存在审核信息
        this.$Modal.confirm({
          title: '警告',
          content: '审核意见未填写，确定要审核不通过吗',
          onOk: () => {
            this.registeredAudit(param).then(
              res => {
                this.disabledSub = false

                this.$router.go(-1)
              },
              err => {
                this.disabledSub = false
              }
            )
          }
        })
      } else {
        // 正常状态提交
        this.registeredAudit(param).then(
          res => {
            this.disabledSub = false

            this.$router.go(-1)
          },
          err => {
            this.disabledSub = false
          }
        )
      }
    }
  },
  created() {
    // 页面传参
    let params = this.$route.params
    // 跳转判断
    if (!params.id || !params.user) {
      this.$router.go(-1)
    }
    // 获取状数据
    let postParam = {
      orgId: params.id,
      userId: params.user,
      auditStatus: false
    }
    // 页面编辑
    if (this.$route.query.review) {
      this.read = false
      this.form = {
        // 企业id
        orgId: params.id,
        userId: params.user,
        // 审核结果（true，false),
        auditResultFlag: '',
        // 审核回复内容
        auditContent: ''
      }
      // 审核中状态
      postParam['auditStatus'] = true
    }
    // 获得页面数据
    this.orgInfo(postParam).then(res => {
      let data = res.content
      if (data.auditDetail.length) {
        let detail = data.auditDetail[0]
        // 审核状态
        this.form.auditResultFlag = String(detail.auditResultFlag)
        this.form.auditContent = detail.auditContent
        // 不通过信息
        if (detail.auditDataList.length) {
          let value = detail.auditDataList[0]
          this.auditData = detail.auditDataList[0]
        }
      }
      // 填充数据
      this.server = data
    })
  },
  mounted() {
    // 图片预览
    let that = this
    let img = document.createElement('img')
    this.viewerContainer = new Viewer(img, {
      url(image) {
        return that.pic
      }
    })
  },
  components: {
    TopToolBar
  }
}
</script>
<style lang="scss" src='@/assets/css/page.scss'></style>
<style rel="stylesheet/scss" lang="scss" scoped>
.tr--only {
  display: none;
}
.tr--only:only-of-type {
  display: table-row;
}
.ivu-select,
.ivu-input-wrapper {
  width: 600px;
}
.red {
  color: #f00;
}
td div p {
  margin-top: 15px;
}
</style>
