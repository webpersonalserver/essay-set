//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    hasAuthorize: false, // 是否授权
    wxUserInfo: {}, // 微信用户信息
    timer: undefined, // 计时器
    meetTime: '2012-09-01 09:00:00', // 相遇时间
    startTime: '2018-10-08 00:00:00', // 开始时间
    currentTime: '猜猜看', // 当前时间
    timeText: '猜猜看' // 时间文案
  },
  onLoad () {
    this.initData()
  },
  onUnload () {
    clearInterval(this.data.timer)
  },
  initData () {
    this.setData({
      hasAuthorize: app.globalData.hasAuthorize,
      wxUserInfo: app.globalData.wxUserInfo
    })
    if (this.data.hasAuthorize) {
      let timer = setInterval(() => {
        this.getTimeContent()
      }, 1000)
      this.setData({ timer })
    }
  },
  /**
   * 授权登录
   * @param {接受参数} e 
   */
  authorizeLogin (e) {
    app.globalData.wxUserInfo = e.detail.userInfo
    app.globalData.hasAuthorize = true
    this.setData({
      wxUserInfo: e.detail.userInfo,
      hasAuthorize: true,
      timer: setInterval(() => {
        this.getTimeContent()
      }, 1000)
    })
  },
  /**
   * 获取时间
   */
  getTimeContent () {
    let startTime = new Date('2018/10/08 00:00:00') // 开始时间
    let currentTime = new Date() // 当前时间
    let timestamp = currentTime.getTime() - startTime.getTime() // 时间戳
    let d = 0 // 天
    let h = 0 // 时
    let m = 0 // 分
    let s = 0 // 秒

    d = parseInt(timestamp / 1000 / 60 / 60 / 24)
    h = parseInt((timestamp - d * 24 * 60 * 60 * 1000) / 1000 / 60 / 60)
    m = parseInt((timestamp - d * 24 * 60 * 60 * 1000 - h * 60 * 60 * 1000) / 1000 / 60)
    s = (timestamp - d * 24 * 60 * 60 * 1000 - h * 60 * 60 * 1000 - m * 60 * 1000) / 1000

    this.setData({
      currentTime: `${currentTime.getFullYear()}-${this.handleTime(currentTime.getMonth() + 1)}-${this.handleTime(currentTime.getDate())} ${this.handleTime(currentTime.getHours())}:${this.handleTime(currentTime.getMinutes())}:${this.handleTime(currentTime.getSeconds())}`,
      timeText: `${this.handleTime(d)} 天 ${this.handleTime(h)} 时 ${this.handleTime(m)} 分 ${this.handleTime(s)} 秒`
    })
  },
  handleTime (t) {
    if (t < 10) {
      return `0${t}`
    } else {
      return t
    }
  }
})
