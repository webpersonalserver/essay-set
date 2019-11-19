//app.js
App({
  data: {},
  globalData: {
    hasLogin: false, // 是否登录，true：已登录；false：未登录
    hasAuthorize: false, // 是否授权，true：已授权；false：未授权
    wxUserInfo: {} // 微信用户信息
  },
  onLaunch () {
    this.initProgram()
  },
  initProgram () {
    return new Promise((resolve, reject) => {
      // 判断用户是否已经授权用户信息
      wx.getSetting({
        success: resSetData => {
          if (resSetData.authSetting['scope.userInfo']) { // 已授权
            this.globalData.hasAuthorize = true
            // 可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: resUserInfo => {
                this.globalData.wxUserInfo = resUserInfo.userInfo
                resolve({
                  msgCode: 2, // 1：未授权；2：已授权
                  message: '已授权'
                })
              }
            })
          } else { // 未授权
            resolve({
              msgCode: 1, // 1：未授权；2：已授权
              message: '未授权'
            })
          }
        }
      })
    })
  }
  
})
