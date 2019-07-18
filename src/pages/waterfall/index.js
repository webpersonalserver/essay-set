//index.js
//获取应用实例
//const app = getApp();

Page({
  data: {
    ctx: undefined,
    windowWidth: 0, // 可使用窗口宽度，单位px
    windowHeight: 0 // 可使用窗口高度，单位px
  },
  onLoad () {
    this.initCanvas()
  },
  initCanvas () {
    let systemInfo = wx.getSystemInfoSync()
    let ctx = wx.createCanvasContext('waterfall')

    this.setData({
      ctx,
      windowWidth: systemInfo.windowWidth,
      windowHeight: systemInfo.windowHeight
    })

    this.drawClock()
    // setInterval(this.drawClock, 1000)
  },
  drawClock () {
    let dotX = this.data.windowWidth / 2 // 圆点X轴坐标
    let dotY = this.data.windowHeight / 2 // 圆点Y轴坐标
    let radius = this.data.windowWidth / 2 - 20 // 半径

    // 清除画布
    this.data.ctx.clearRect(0, 0, this.data.windowWidth, this.data.windowHeight)

    // 获取时间
    let now = new Date()
    let s = now.getSeconds() // 秒
    let m = now.getMinutes() // 分
    let h = now.getHours() // 时

    // 小时必须获取浮点类型，产生偏移（小时+分钟比）
    h = h + m / 60
    h = h > 12 ? h - 12 : h

    /**
     * 画表盘
     */
    this.data.ctx.beginPath() // 画笔开始
    this.data.ctx.setLineWidth(2) // 设置画笔的线宽
    this.data.ctx.setStrokeStyle('#333') // 设置画笔的颜色
    this.data.ctx.arc(dotX, dotY, radius, 0, 360, false) //绘制圆形，坐标250,250 半径200，整圆（0-360度），false表示顺时针
    this.data.ctx.stroke() // 绘制当前路径的边框
    this.data.ctx.draw(true) // 开始绘图
    this.data.ctx.closePath() // 画笔结束

    this.data.ctx.save() // 保存绘图上下文
    this.data.ctx.translate(dotX, dotY) // 设置圆点

    /**
     * 画大刻度、小刻度、大刻度值
     */
    for (let i = 0; i < 60; i++) {
      this.data.ctx.beginPath() // 画笔开始
      this.data.ctx.setStrokeStyle('#333') // 设置画笔的颜色
      this.data.ctx.rotate(Math.PI / 30) // 设置旋转角度
      this.data.ctx.moveTo(0, radius) // 设置起点

      // 判断是画大刻度还是小刻度
      if (i % 5 === 0) {
        // 大刻度
        this.data.ctx.setLineWidth(2) // 设置画笔的线宽
        this.data.ctx.lineTo(0, radius - 18) // 设置终点
        // 刻度数值
        // this.data.ctx.setFontSize(20)
        // this.data.ctx.fillText(i === 0 ? 12 : i / 5, 0, radius - 30)
      } else {
        // 小刻度
        this.data.ctx.setLineWidth(1) // 设置画笔的线宽
        this.data.ctx.lineTo(0, radius - 12) // 设置终点
      }

      this.data.ctx.stroke() // 绘制线框
      this.data.ctx.draw(true) // 实际绘制
      this.data.ctx.save() // 保存绘图上下文
    }
    this.data.ctx.restore() // 恢复之前保存的绘图上下文
    this.data.ctx.closePath() // 画笔结束
  }
})
