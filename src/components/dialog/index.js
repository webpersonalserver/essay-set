//index.js
const app = getApp()

Component({
  // 私有数据，可用于模板渲染
  data: {
    content: ''
  },
  // 传入数据
  properties: {
    // 弹框状态
    status: {
      type: Boolean,
      value: false
    },
    // 标题
    title: {
      type: String,
      value: '王小星替你记着呐'
    },
    // 是否显示取消按钮
    showCancelBtn: {
      type: Boolean,
      value: true
    },
    // 取消按钮文案
    cancelText: {
      type: String,
      value: '取消'
    },
    // 是否显示确定按钮
    showConfirmBtn: {
      type: Boolean,
      value: true
    },
    // 确定按钮文案
    confirmText: {
      type: String,
      value: '确定'
    },
  },
  // 数据监听器
  observers: {
    status (value) {}
  },
  // 组件生命周期函数-在组件布局完成后执行)
  ready () {},
  //组件内部方法
  methods: {
    // 文本框失去焦点
    emitBlur (e) {
      this.setData({ content: e.detail.value })
    },
    // 文本框输入
    emitInput (e) {
      this.setData({ content: e.detail.value })
    },
    // 取消或确定
    refer (e) {
      if (e.currentTarget.dataset.type === 'confirm' && !this.data.content) {
        app.commonFun.showToast('请填写你的记录哟！')
        return false
      }
      this.triggerEvent('refer', {
        type: e.currentTarget.dataset.type,
        content: e.currentTarget.dataset.type === 'confirm' ? this.data.content : ''
      })
      this.setData({ content: '' })
    }
  }
})
