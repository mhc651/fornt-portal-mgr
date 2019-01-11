/**
 * @file 提示 2018/06/21
 * @author qiu
 */
const define = {
  title:'提示',
  content:''
}

export default class Tip {
  /**
   *
   * @param {title} 提示
   */
  constructor({
    width = 380,
    top = '12%',
    border_color = '#f1f1f1',
    time = 0.5
  }) {

    this.dom = document.createElement('div')
    this.dom.className = 'my-tip'
    this.dom.innerHTML = `
      <h4 class='my-tip_head'><span class='my-tip_icon'>！</span><span class='my-tip_title'>${define.title}</span></h4>
      <div class='my-tip_content' >
        ${define.content}
      </div>
      <div class='text-center my-tip_btn'>
        <button type='button' class='my-tip_close'>确定</button>
      </div>
    `
    this.style = document.createElement('style')
    this.style.innerHTML = `
      .my-tip{
        position:fixed;
        left:0;
        right:0;
        top:${top};
        width:${width}px;
        margin-left:auto;
        margin-right:auto;
        z-index:999999999;
        background: #fff;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
        transition: all ${time}s;
        -webkit-transition: all ${time}s;
        transform:translate3d(0,-100%,0);
        -webkit-transform:translate3d(0,-100%,0);
        opacity: 0;
        pointer-events: none;
        font-size:14px;
      }
      .my-tip.active{
        transform:translate3d(0,0%,0);
        -webkit-transform:translate3d(0,0%,0);
        opacity: 1;
        pointer-events: auto;
      }
      .my-tip_head,
      .my-tip_btn {
        padding: 10px;
        margin-right: -10px;
        margin-left: -10px;
      }
      .my-tip_head {
        border-bottom: 1px solid ${border_color};
        margin-top: -10px;
        margin-bottom:10px;
      }
      .my-tip_head>span{
        display:inline-block;
        vertical-align: middle;
      }
      .my-tip_icon{
        color:#ffb000;
        width:20px;
        height:20px;
        text-align:center;
        border:1px solid #ffb020;
        border-radius:50%;
        margin-right:5px;
      }
      .my-tip_btn {
        border-top: 1px solid ${border_color};
        text-align: right;
        margin-top:10px;
        margin-bottom: -10px;
      }
      .my-tip_btn button{
        background:#2d8cf0;
        padding:8px 10px;
        border:0 none;
        color:#fff;
        border-radius:5px;
      }
      .my-tip_content{
        min-height:50px;
        word-break:break-all;
      }
    `
    document.getElementsByTagName('head')[0].appendChild(this.style)
    document.body.appendChild(this.dom)

    /**
     * 标题
     * @namespace
     */
    Object.defineProperty(this, 'title', {
      set(val) {
        this.dom.querySelector('.my-tip_title').innerHTML = val
      },
      get() {
        return this.dom.querySelector('.my-tip_title').innerHTML
      }
    })
    // this.title = this.dom.querySelector('.my-tip_title').innerHTML
    /**
     * 内容
     * @namespace
     */
    Object.defineProperty(this, 'content', {
      set(val) {
        this.dom.querySelector('.my-tip_content').innerHTML = val
      },
      get() {
        return this.dom.querySelector('.my-tip_content').innerHTML
      }
    })
    /**
     * 点击时触发
     * @namespace
     */
    this.onOk = ''

    this.dom.querySelector('.my-tip_close').addEventListener('click', () => {
      if (this.onOk) this.onOk()
      this.hide()
    })
  }
  /**
   * 显示
   * @param {Object} config 提示信息
   * @param {String} config.title 标题
   * @param {String} config.content 内容
   */
  show(config) {
    for (let k in config) {
      this[k] = config[k]
    }
    this.dom.classList.add('active')
  }
  /**
   *
   */
  hide() {
    this.dom.classList.remove('active')
    this.onOk = ''
    this.title = define.title
    this.content = define.content
  }
}
