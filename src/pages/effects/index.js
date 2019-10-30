//index.js
//获取应用实例
//const app = getApp();

Page({
  data: {
    list: [{
      icon: '/images/effects/icon_clock.png',
      title: '时钟',
      desc: 'canvas绘制时钟',
      path: '/pages/waterfall/index'
    }, {
      icon: '/images/effects/icon_turntable.png',
      title: '转盘',
      desc: '抽奖转盘',
      path: '/pages/turntable/index'
    }]
  },
  onLoad () {},
  // 跳转页面
  goPage (e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.path
    })
  }
})
