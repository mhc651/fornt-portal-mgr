/**
* @file 输入框组件 v1 2018/06/29
* @author qiu
*/
<template>
  <div>
    <!-- read -->
    <p v-if="type == 'read' ">
      <span>{{ placeholder }}</span>
      <span  :class='className||""' :style="styleData">{{ currentValue }}
      </span>
    </p>  
    <!-- read -->
    <!-- string input -->
    <Input v-else-if="type === 'string' " type="text" :placeholder="placeholder"  :value="currentValue" 
    :disabled='disabled'
    :readonly='readonly'
    @on-change="handleInput"
     />
    <!-- string input end-->
    <!-- text -->
    <Input v-else-if="type === 'text' " type="textarea" 
    :readonly='readonly'
    :disabled='disabled'
    :placeholder="placeholder" :value="currentValue"   :autosize="{minRows: 3,maxRows: 6}"  />
    <!-- text end-->
    <!--  下拉选择框 -->
    <Select v-if="type === 'select' " :value='currentValue'
     :placeholder="placeholder"
    :disabled='disabled'
    :readonly='readonly'
    @on-change='handleSelect'
    >
    <!-- filterable 搜索,tablepage 会导致无内容 -->
      <Option  v-for='(option , k ) in options' :key='option.index' :value="option.value||k" >{{ option.label||option }}</Option>
    </Select>
    <!-- 下拉选择框 end-->
    <!-- 级联 -->
    <Cascader  v-else-if="type === 'cascader' " :data="options" 
    :value='currentValue'
    :disabled='disabled'
    :readonly='readonly'
    :placeholder ='placeholder'
    :load-data='loadData' 
    @on-change='handleSelect'
    change-on-select ></Cascader>
    <!-- 级联 end-->
    <!-- 远程远程搜索-->
    <Select v-if="type === 'search' "
      :placeholder="placeholder"
        :value="currentValue"
        :disabled='disabled'
        :readonly='readonly'
        :loading="loading"
        filterable
        remote
        :remote-method="fn"
        @on-change='handleSelect'
        >
        <Option  v-for='(option , k ) in options' :key='option.index' :value="k" >{{ option }}</Option>
    </Select>
    <!-- 远程远程搜索 end-->
    <!-- 开始结束日期控件 -->
      <DatePicker  :value="currentValue" v-else-if='type==="daterange"'  type="daterange"
      placement="bottom-end" 
      :readonly='readonly'
      :placeholder="placeholder"
      @on-change='handleSelect'
      style="width: 100%" ></DatePicker>
    <!-- 日期控件 end -->
  </div>
</template>
<script>
export default {
  props: {
    /**
     * 级联加载数据
     * @callback {Object} item 选择的数据 callback 触发下级展开
     * @callback {Array} item.children 子级数据
     * */
    loadData: {
      type: Function
    },
    /**
     * search加载数据
     * @callback {String} query查询的数据
     */
    fn: {
      type: Function
    },
    // 加载状态 search加载数据 做为是否结束的状态
    loading: {
      type: Boolean
    },
    // 不可用
    disabled: {
      type: Boolean
    },
    // 只读
    readonly: {
      type: Boolean
    },

    // 站位提示
    placeholder: {
      type: String
    },
    // 输入框类型
    type: {
      type: String
    },
    // 自定義類
    className: {
      type: String
    },
    // 自定義樣式
    styleData: {
      type: Object
    },
    // 选项 key ：name select 级联多选用
    options: {
      type: [Object, Array]
    },
    // 内容值
    value: {
      required: true
    }
  },
  data() {
    return {
      // 参数
      currentValue: this.value,
      pic: '',
      // 图片预览
      viewerContainer: ''
    }
  },
  watch: {
    value(v) {
      this.setCurrentValue(v)
    }
  },
  methods: {
    /**
     * 回调参数
     * @param {Object} e event
     */
    handleInput(e) {
      let value = e.target.value
      this.$emit('input', value)
      this.setCurrentValue(value)
      this.$emit('on-change', e)
    },
    handleSelect(value) {
      this.$emit('input', value)
      this.setCurrentValue(value)
      this.$emit('on-change', value)
    },
    /**
     * 设置值
     * @param {} value 值
     */
    setCurrentValue(value) {
      // 相同则跳出
      if (value === this.currentValue) return
      this.currentValue = value
    }
  }
}
</script>
