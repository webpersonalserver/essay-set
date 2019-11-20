//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    hasAuthorize: false, // 是否授权
    wxUserInfo: {}, // 微信用户信息
    list: [{
      icon: '/images/mine/ic_time.png',
      label: '重要时刻',
      path: '/pages/important-moment/index'
    }, {
      icon: '/images/mine/ic_punch.png',
      label: '打卡',
      path: ''
    }]
  },
  onLoad () {
    this.initData()
  },
  initData () {
    this.setData({
      hasAuthorize: app.globalData.hasAuthorize,
      wxUserInfo: app.globalData.wxUserInfo
    })
  },
  /**
   * 授权登录
   * @param {接受参数} e 
   */
  authorizeLogin (e) {
    if (e.detail.userInfo) { // 同意
      app.globalData.wxUserInfo = e.detail.userInfo
      app.globalData.hasAuthorize = true
      this.setData({
        wxUserInfo: e.detail.userInfo,
        hasAuthorize: true
      })
    }
  },
  // 跳转页面
  goPage (e) {
    if (!e.currentTarget.dataset.path) return
    wx.navigateTo({
      url: e.currentTarget.dataset.path
    })
  }
})
