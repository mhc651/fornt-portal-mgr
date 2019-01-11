webpackJsonp([1],{PL6z:function(t,e){},fAxu:function(t,e,r){"use strict";var a={validateIdCard:function(t,e,r){if(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(e)){if(!r)return!0;r()}else{if(!r)return!1;r(new Error("身份证格式不正确"))}},validatePhone:function(t,e,r){if(/(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/.test(e)){if(!r)return!0;r()}else{if(!r)return!1;r(new Error("手机号码格式不正确"))}},validateMail:function(t,e,r){if(/^\w{3,}@\w+(\.\w+)+$/.test(e)){if(!r)return!0;r()}else{if(!r)return!1;r(new Error("邮箱格式不正确"))}},validateNum:function(t,e,r){if(/^(0.[1-9]*||[1-9][0-9]?||[1-9][0-9]*.[0-9]+)$/.test(e)){if(!r)return!0;r()}else{if(!r)return!1;r(new Error("数字格式不正确"))}},validateInt:function(t,e,r){if(/[0-9]+/.test(e)){if(!r)return!0;r()}else{if(!r)return!1;r(new Error("整数格式不正确"))}},validateImg:function(t){return!!/\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/gi.test(t)},validateDoc:function(t){return!!/\.(doc|docx)$/gi.test(t)}};e.a=a},"h+p8":function(t,e,r){"use strict";var a=r("//Fk"),n=r.n(a),o=r("BO1k"),i=r.n(o),s=r("oUO/"),l=r("dlmu"),d=(r("YK/q"),{props:{form:{type:Object},config:{type:Array,required:!0},validate:{type:Object}},data:function(){var t=!0,e=!1,r=void 0;try{for(var a,n=i()(this.config);!(t=(a=n.next()).done);t=!0){var o=a.value,s=this.form[o.data]||o.defuld||"";this.$set(this.form,o.data,s)}}catch(t){e=!0,r=t}finally{try{!t&&n.return&&n.return()}finally{if(e)throw r}}return{formData:this.form,pic:"",viewerContainer:""}},watch:{form:function(t){this.setFormData()}},mounted:function(){var t=this,e=document.createElement("img");this.viewerContainer=new l.a(e,{url:function(e){return t.pic}})},methods:{setFormData:function(t){var e=!0,r=!1,a=void 0;try{for(var n,o=i()(this.config);!(e=(n=o.next()).done);e=!0){var s=n.value,l=this.form[s.data]||s.defuld||"";this.formData[s.data]=l}}catch(t){r=!0,a=t}finally{try{!e&&o.return&&o.return()}finally{if(r)throw a}}},resetData:function(t,e){var r=!0,a=!1,n=void 0;try{for(var o,s=i()(this.config);!(r=(o=s.next()).done);r=!0){var l=o.value;e&&e[l.data]?t[l.data]=e[l.data]:t[l.data]=l.defuld||""}}catch(t){a=!0,n=t}finally{try{!r&&s.return&&s.return()}finally{if(a)throw n}}return t},setValue:function(t){t.fn(this.formData[t.data],this.$refs.form.validateField)},subForm:function(){var t=this;return this.$refs.form.validate().then(function(e){if(e){var r=!1,a=!0,o=!1,s=void 0;try{for(var l,d=i()(t.config);!(a=(l=d.next()).done);a=!0){var u=l.value;if("file"==u.type&&u.required&&!t.formData[u.data].length){t.$Message.error({content:u.name+"内部不能为空！"}),r=!0;break}}}catch(t){o=!0,s=t}finally{try{!a&&d.return&&d.return()}finally{if(o)throw s}}return r?n.a.reject(t.formData):n.a.resolve(t.formData)}return n.a.reject(t.formData)})},resetForm:function(){return this.$refs.form.resetFields()},uploadFile:function(t,e,r,a){this.formData[t]=a.map(function(t){return t.response?t.response.content:t})},lookFile:function(t){t.name.replace(/\.[jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga]$/gi)?(this.pic=t.url,this.viewerContainer.show()):window.open(t.url)},errorFileFormat:function(t,e,r){this.$Modal.error({content:t.name+":不支持此格式!请选择"+t.format})},errorFileMax:function(t,e,r){this.$Modal.error({content:t.name+":超过指定大小！最大为"+t.max+"kb"})},errorFileLength:function(t){var e=""|t.maxLength,r=this.formData[t.data].length;if(e&&e<=r)return this.$Modal.error({content:t.name+":最大上传数目为"+e}),!1}},components:{InputItem:s.a}}),u={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("Form",{ref:"form",attrs:{model:t.form,rules:t.validate,inline:""}},[r("Row",{staticClass:"form-group",attrs:{type:"flex"}},t._l(t.config,function(e){return r("Col",{key:e.index,staticClass:"form-group_item",attrs:{span:e.span?e.span:24}},[r("Row",{staticClass:"form-group_row",attrs:{type:"flex"}},[r("Col",{staticClass:"label form-group_col"},[e.required?r("span",{staticClass:"required"},[t._v("*")]):t._e(),t._v("\n             "+t._s(e.name)+"\n           ")]),t._v(" "),r("Col",{staticClass:"form-group_col form-group_col--auto"},[e.readonly&&"select"===e.type?r("div",[t._v("\n               "+t._s(e.options[t.formData[e.data]]||"")+"\n           ")]):e.readonly&&"file"!==e.type?r("div",{staticClass:"form-group_text--pre"},[t._v(t._s(e.read||t.form[e.data]))]):r("FormItem",{class:e.readonly?"readonly":"",attrs:{prop:e.data}},["trigger"===e.type?r("Input",{attrs:{placeholder:e.placeholder,readonly:"",icon:"ios-clock-outline"},model:{value:t.formData[e.data],callback:function(r){t.$set(t.formData,e.data,r)},expression:"formData[item.data]"}},[r("Button",{attrs:{slot:"append",icon:e.icon},on:{click:function(r){t.setValue(e)}},slot:"append"})],1):"file"===e.type?r("Upload",{class:e.readonly?"readonly":"",attrs:{action:e.action,"default-file-list":t.formData[e.data],"on-success":t.uploadFile.bind(this,e.data),"on-remove":t.uploadFile.bind(this,e.data,{}),"max-size":e.maxSize,"on-preview":t.lookFile,format:e.format||[],"before-upload":t.errorFileLength.bind(this,e),"on-format-error":t.errorFileFormat.bind(this,e),"on-exceeded-size":t.errorFileMax.bind(this,e)}},[e.readonly?t._e():r("Button",{attrs:{disabled:e.disabled,type:"ghost"}},[t._v("上传文件")])],1):r("input-item",{attrs:{options:e.options,type:e.type,disabled:e.disabled,readonly:e.readonly,placeholder:e.placeholder,"load-data":e.loadData,fn:e.fn,loading:e.loading},model:{value:t.formData[e.data],callback:function(r){t.$set(t.formData,e.data,r)},expression:"formData[item.data]"}})],1),t._v(" "),t._l(e.cell,function(e){return r("div",{key:e.index},["string"==e.type?r("p",[r("span",[t._v(t._s(e.name))]),t._v(" "),r("span",{class:e.class||"",style:e.style},[t._v(t._s(t.formData[e.data]||e.default)+"\n                 ")])]):t._e()])})],2)],1)],1)}))],1)},staticRenderFns:[]};var f=r("VU/8")(d,u,!1,function(t){r("PL6z")},null,null);e.a=f.exports},"oT+t":function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=r("BO1k"),n=r.n(a),o=r("Dd8w"),i=r.n(o),s=r("gNfH"),l=r("fAxu"),d=r("h+p8"),u=r("NYxO"),f={data:function(){return{org_load:!1,disabledSub:!1,userId:this.$route.params.id||"",formValidate:{orgId:[{required:!0,message:"机构不能为空",trigger:"change"}],phone:[{required:!0,message:"手机号码不能为空",trigger:"blur"},{validator:l.a.validatePhone,trigger:"blur"}],realName:[{required:!0,message:"真实姓名不能为空",trigger:"blur"}],userName:[{required:!0,message:"登录账号不能为空",trigger:"blur"}],userType:[{required:!0,message:"账号类型不能为空",trigger:"change"}],email:[{validator:function(t,e,r){e?l.a.validateMail(t,e)?r():r(Error("邮箱格式不正确")):r()},trigger:"blur"}]},formData:{},areaList:[],orgList:{}}},computed:{state:function(){return this.initData(),this.$route.query.edit||!1},title:function(){var t=this.state?"编辑用户":"用户详情";return this.userId?t:"新增用户"},formConfig:function(){var t=this;return[{name:"账户类型",type:"select",data:"userType",required:!0,placeholder:"请选择账户类型",options:{"01":"主账号","02":"子账号"},readonly:!this.state},{name:"所属机构",type:"search",data:"orgId",required:!0,placeholder:"请输入进行机构搜索",options:this.orgList,loading:this.org_load,read:this.formData.orgName,fn:function(e){""!==e?(t.org_load=!0,t.typeOrgList({orgName:e}).then(function(e){t.org_load=!1,t.orgList=t.toTypeOrg(e.content)},function(e){t.org_load=!1})):t.orgList=[]},readonly:!!this.userId},{name:"登录账号",type:"string",data:"userName",required:!0,placeholder:"请填写登录账号",readonly:!!this.userId},{name:"真实姓名",type:"string",data:"realName",required:!0,placeholder:"请填写真实姓名",readonly:!this.state},{name:"手机号",type:"string",data:"phone",required:!0,placeholder:"请填写手机号",readonly:!this.state},{name:"邮箱",type:"string",data:"email",placeholder:"请填写邮箱",readonly:!this.state},{name:"备注",type:"text",data:"remark",placeholder:"请填写备注",readonly:!this.state}]}},methods:i()({},Object(u.b)(["userUpdate","userInfo","typeOrgList","typeAreaList","typeOrgList"]),{subForm:function(){var t=this;this.$refs.group.subForm().then(function(e){if(t.userId&&(e.userId=t.userId),t.disabledSub=!0,e.area)for(var r=["provinceId","cityId","areaId"],a=0;a<e.area.length;a++)e[r[a]]=e.area[a];t.userUpdate(e).then(function(e){t.disabledSub=!1,t.$Message.success({content:"保存成功"}),t.$router.push({name:"用户管理"})},function(e){t.disabledSub=!1})},function(t){console.error(t)})},initData:function(){var t=this;this.userId&&this.userInfo({userId:this.userId}).then(function(e){t.formData=e.content})},backData:function(){var t=this;this.state?this.$Modal.confirm({content:"取消编辑将不保存数据",onOk:function(){t.$router.push("/ZCSH001")}}):this.$router.push("/ZCSH001")},gotoState:function(t){var e={name:"用户信息",params:{id:this.userId}};t&&(e.query={edit:1}),this.$router.push(e)},toTypeArea:function(t){var e=[],r=!0,a=!1,o=void 0;try{for(var i,s=n()(t);!(r=(i=s.next()).done);r=!0){var l=i.value,d={value:l.id,label:l.name,children:[],loading:!1};e.push(d)}}catch(t){a=!0,o=t}finally{try{!r&&s.return&&s.return()}finally{if(a)throw o}}return e},toTypeOrg:function(t){var e={},r=!0,a=!1,o=void 0;try{for(var i,s=n()(t);!(r=(i=s.next()).done);r=!0){var l=i.value;e[l.id]=l.orgName}}catch(t){a=!0,o=t}finally{try{!r&&s.return&&s.return()}finally{if(a)throw o}}return e}}),created:function(){},components:{TopToolBar:s.a,FormGroup:d.a}},c={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("top-tool-bar",{attrs:{title:t.title}},[r("span",{attrs:{slot:"btn"},slot:"btn"},[r("Button",{on:{click:t.backData}},[t._v(t._s(t.state?"取消":"返回"))]),t._v(" "),t.state?r("Button",{attrs:{type:"primary",disabled:t.disabledSub},on:{click:t.subForm}},[t._v("保存")]):t._e()],1),t._v(" "),r("span",{attrs:{slot:"content"},slot:"content"},[r("strong",{staticClass:"help"},[t._v("说明")]),t._v(" "),r("p",[t._v("\n          无\n          ")])])]),t._v(" "),r("form-group",{ref:"group",attrs:{form:t.formData,config:t.formConfig,validate:t.formValidate}}),t._v(" "),t._m(0)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("p",{staticClass:"text-tip"},[e("span",{staticClass:"text--red"},[this._v("*")]),this._v("\n      提示：新建账号密码默认为 "),e("span",{staticClass:"text--red"},[this._v("hx123456")])])}]},p=r("VU/8")(f,c,!1,null,null,null);e.default=p.exports}});