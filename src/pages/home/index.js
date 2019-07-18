//index.js
//获取应用实例
//const app = getApp();

Page({
  data: {
    list: [{
      icon: '/images/home/icon-01.png',
      title: '特效',
      desc: '炫酷的效果，美妙的画面',
      path: '/pages/waterfall/index'
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
