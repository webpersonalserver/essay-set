//index.js
//获取应用实例
//const app = getApp();

Page({
  data: {
    list: [{
      icon: '/images/mine/ic_meet.png',
      label: '我们相遇了(可能有些许误差哟)',
      value: '2012-09-01 09:00:00'
    }, {
      icon: '/images/mine/ic_start.png',
      label: '我们在这点开始了哟',
      value: '2018-10-08 00:00:00'
    }, {
      icon: '/images/mine/ic_accompanied.png',
      label: '我们相伴着哟',
      value: '猜猜看'
    }, {
      icon: '/images/mine/ic_duration.png',
      label: '我们已相守了哟',
      value: '猜猜看'
    }],
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
    let timer = setInterval(() => {
      this.getTimeContent()
    }, 1000)
    this.setData({ timer })
  },
  // 获取时间
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
      'list[2].value': `${currentTime.getFullYear()}-${this.handleTime(currentTime.getMonth() + 1)}-${this.handleTime(currentTime.getDate())} ${this.handleTime(currentTime.getHours())}:${this.handleTime(currentTime.getMinutes())}:${this.handleTime(currentTime.getSeconds())}`,
      'list[3].value': `${this.handleTime(d)} 天 ${this.handleTime(h)} 时 ${this.handleTime(m)} 分 ${this.handleTime(s)} 秒`
    })
  },
  // 处理时间格式
  handleTime (t) {
    if (t < 10) {
      return `0${t}`
    } else {
      return t
    }
  }
})
