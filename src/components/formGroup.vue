/**
* @file表单组 基于iview Form Row Col v1 2018/06/25
* @auther qiu
*/  
<template>
  <Form ref="form" :model="form" :rules="validate" inline>
      <Row type='flex' class="form-group">
      <!-- form item -->
        <Col class="form-group_item" v-for="item of config" :key="item.index" :span="item.span?item.span:24">
          <Row type='flex' class="form-group_row" >
            <!-- title -->
            <Col class="label form-group_col">
              <span v-if="item.required" class="required">*</span>
              {{ item.name}}
            </Col>
            <!-- title -->
            <Col  class="form-group_col form-group_col--auto">
      
            <!-- 只读-->
            <!--read select -->
            <div v-if='item.readonly && item.type === "select"'>
                {{ item.options[formData[item.data]]||'' }}
            </div>
            <!--read select -->
            <div class="form-group_text--pre" v-else-if='item.readonly && item.type !== "file"'>{{ item.read||form[item.data] }}</div>
            <!-- 只读 end-->
              <!-- input  -->
              <FormItem v-else :prop="item.data" :class="item.readonly?'readonly':''">
                  <!-- trigger -->
                  <Input v-if="item.type === 'trigger' "  v-model="formData[item.data]"
                  :placeholder="item.placeholder" 
                  readonly
                  icon="ios-clock-outline" >
                      <Button slot="append" :icon="item.icon" @click ='setValue(item)'></Button>
                  </Input>
                  <!-- trigger end-->
                  <!-- file -->
                    <Upload  v-else-if="item.type === 'file'"
                      :action="item.action"
                      :default-file-list='formData[item.data]'
                      :on-success ='uploadFile.bind(this,item.data)'
                      :on-remove='uploadFile.bind(this,item.data,{})'
                      :max-size ='item.maxSize'
                      :on-preview="lookFile"
                      :format="item.format||[]"
                      :class="item.readonly?'readonly':''"
                      :before-upload='errorFileLength.bind(this,item)'
                      :on-format-error ='errorFileFormat.bind(this,item)'
                      :on-exceeded-size='errorFileMax.bind(this,item)'
                    >
                      <Button
                      v-if="!item.readonly" 
                      :disabled='item.disabled'
                      type="ghost">上传文件</Button>
                    </Upload>
                  <!-- file end-->
                  <input-item v-else
                  :options='item.options' 
                  :type='item.type' 
                  :disabled='item.disabled'
                  :readonly='item.readonly' 
                  :placeholder="item.placeholder" 
                  v-model="formData[item.data]"
                  :load-data='item.loadData'
                  :fn ='item.fn'
                  :loading='item.loading'
                  />
              </FormItem>
              <!-- cell item -->
              <div v-for='cell of item.cell' :key='cell.index'>
                <!-- text -->
                <p v-if="cell.type == 'string' ">
                  <span>{{ cell.name }}</span>
                  <span  :class='cell.class||""' :style="cell.style">{{ formData[cell.data]||cell.default }}
                  </span>
                </p>  
                <!-- text -->
              </div>
              <!-- cell item end-->
              <!-- input  end-->
            </Col>

          </Row>
        </Col>
      <!-- form item end-->
      </Row>
 </Form>
</template>
<script>
// 自动化输入组件
import InputItem from './inputItem'
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.min.css'
export default {
  props: {
    // 对应参数
    form: {
      type: Object
    },
    /**
     * 内容配置
     * @const
     * @type {Array}
     * @param {string} type 类型
     * @param {Bool} readonly 是否只读
     */
    config: {
      type: Array,
      required: true
    },
    // 验证提示
    validate: {
      type: Object
    }
  },
  data() {
    // init form
    for (let val of this.config) {
      let value = this.form[val.data] || val.defuld || ''
      this.$set(this.form, val.data, value)
      // this.form[val.data] = val.defuld || ''
    }
    return {
      formData: this.form,
      /**
       * 表单参数
       * @namespace
       */
      pic: '',
      // 图片预览
      viewerContainer: ''
    }
  },
  watch: {
    // 更新数据
    form(val) {
      this.setFormData()
    }
  },
  mounted() {
    let that = this
    // 图片预览
    let img = document.createElement('img')
    this.viewerContainer = new Viewer(img, {
      url: image => {
        return this.pic
      }
    })
  },
  methods: {
    setFormData(val) {
      for (let val of this.config) {
        let value = this.form[val.data] || val.defuld || ''
        this.formData[val.data] = value
      }
    },
    /**
     * 重置参数
     * @param {Object} data 需要赋值的对象
     * @param {Object} obj 默认值对象
     */
    resetData(data, obj) {
      for (let val of this.config) {
        if (obj && obj[val.data]) {
          // 设置默认
          data[val.data] = obj[val.data]
        } else {
          // 归0
          data[val.data] = val.defuld || ''
        }
      }
      return data
    },
    /**
     * set form value fn
     * @param {Object} item from object
     * @callback value
     * @callback Function 表单单独验证方法（prop，error）
     */
    setValue(item) {
      item.fn(this.formData[item.data],this.$refs['form'].validateField)
    },
    /**
     * 获得param
     * @event
     */
    subForm() {
      return this.$refs['form'].validate().then(valid => {
        if (valid) {
          let br = false
          // 资源验证
          for (let item of this.config) {
            if (
              item.type == 'file' &&
              item.required &&
              !this.formData[item.data].length
            ) {
              this.$Message.error({ content: `${item.name}内部不能为空！` })
              br = true
              break
            }
          }
          // 跳出保存
          if (br) return Promise.reject(this.formData)
          return Promise.resolve(this.formData)
        } else {
          return Promise.reject(this.formData)
        }
      })
    },
    /**
     * 移除校验重置表单
     */
    resetForm() {
      return this.$refs['form'].resetFields()
    },
    /**
     * set flie list
     * @param {string} name item.data
     * @param {Object} res 服务端返回数据
     * @param {Object} file on-success/新添加数据 on-remove/删除的数据
     * @param {Array} fileList 更新后的数据
     * */
    uploadFile(name, res, file, fileList) {
      this.formData[name] = fileList.map(
        val => (val.response ? val.response.content : val)
      )
    },
    /**
     * 资源预览
     * @param {Object} file flie对象
     */
    lookFile(file) {
      let reg = /\.[jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga]$/gi
      if (file.name.replace(reg)) {
        // 图片查看
        this.pic = file.url
        this.viewerContainer.show()
      } else {
        // 下载查看
        window.open(file.url)
      }
    },
    /**
     * 错误提示超好指定大小
     * @param {Object} item config’s item
     * @param {Object} file file object
     * @param {Arrar} fileList fileList object
     */
    errorFileFormat(item, file, fileList) {
      this.$Modal.error({
        content: item.name + ':不支持此格式!请选择' + item.format
      })
    },
    /**
     * 错误提示超好指定大小
     * @param {Object} item config’s item
     * @param {Object} file file object
     * @param {Arrar} fileList fileList object
     */
    errorFileMax(item, file, fileList) {
      this.$Modal.error({
        content: item.name + ':超过指定大小！最大为' + item.max + 'kb'
      })
    },
    /**
     * 上传数检查
     * @param {Object} item config’s item
     */
    errorFileLength(item) {
      let max = item.maxLength | ''
      let num = this.formData[item.data].length
      if (max && max <= num) {
        this.$Modal.error({
          content: item.name + ':最大上传数目为' + max
        })
        return false
      }
    }
  },
  components: {
    InputItem
  }
}
</script>
<style lang="scss" >
$table-color: #ddd;
.form-group {
  width: 100%;
  border-top: 1px solid $table-color;
  border-left: 1px solid $table-color;
  border-collapse: collapse;
  .form-group_item {
    border: 1px solid $table-color;
    line-height: 30px;
    margin-left: -1px;
    margin-top: -1px;
  }
  // 标题栏
  .label {
    width: 150px;
    background: #f1f1f1;
    border-right: 1px solid $table-color;
  }
  .form-group_row {
    height: 100%;
  }
  .form-group_col {
    padding: 8px 12px;
  }
  .form-group_col--auto {
    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%;
  }
  .input-sm {
    height: 36px;
    padding: 0 0 0 12px;
  }
  .ivu-form-item {
    max-width: 600px;
    width: 100%;
    margin-bottom: 0px;
  }
  .required {
    color: #f00;
  }
  // 只读
  .readonly {
    .ivu-select-selection,
    textarea,
    input,
    select,
    button {
      pointer-events: none;
    }
  }
  // 保留空格显示
  .form-group_text--pre {
    white-space: pre-wrap;
  }
  // file
  .readonly.ivu-upload {
    .ivu-upload.ivu-upload-select,
    .ivu-upload-list-remove {
      display: none;
    }
  }
}
</style>

