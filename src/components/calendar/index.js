//index.js
//获取应用实例
// const app = getApp()

Component({
  // 私有数据，可用于模板渲染
  data: {
    title: '', // 标题
    currentIndex: -1, // 选中的日期索引
    nowDay: { // 当前日期数据
      year: '', // 年份
      month: '', // 月份
      day: '', // 天
      week: '' // 星期
    },
    clickDay: { // 点击的日期数据
      year: '', // 年份
      month: '', // 月份
      day: '', // 天
      week: '' // 星期
    },
    weeksArray: ['一', '二', '三', '四', '五', '六', '日'], // 周标题数据
    showDate: '', // 当前显示的日期
    dateArray: [] // 当前显示月份日期数据
  },
  // 传入数据
  properties: {
    // 左箭头
    leftArrow: {
      type: String,
      value: '/images/common/ic_left_dou_arrow.png'
    },
    // 右箭头
    rightArrow: {
      type: String,
      value: '/images/common/ic_right_dou_arrow.png'
    },
    // 是否显示周标题
    weeks: {
      type: Boolean,
      value: true
    },
    // 是否显示农历日期
    lunar: {
      type: Boolean,
      value: true
    }
  },
  // 组件生命周期函数-在组件布局完成后执行)
  ready () {
    this.initData()
  },
  //组件内部方法
  methods: {
    initData () {
      // 设置今年今月今天日期数据
      let currentDate = new Date()
      let year = currentDate.getFullYear()
      let month = currentDate.getMonth()
      let day = currentDate.getDate()
      let week = [7, 1, 2, 3, 4, 5, 6][new Date(year, month, day).getDay()]

      this.setData({
        nowDay: { // 点击的日期数据
          year, // 年份
          month, // 月份
          day, // 天
          week // 星期
        },
        clickDay: {
          year,
          month,
          day,
          week
        }
      })
      // 获取当前显示月份日期数据
      this.getCurrentDate()
    },
    // 处理日期格式
    handleDateFormat (v) {
      if (Number(v) > 9) {
        return v
      } else {
        return `0${v}`
      }
    },
    // 获取当前显示日期数据
    getCurrentDate () {
      let currentDate = this.data.showDate ? new Date(this.data.showDate) : new Date() // 当前显示日期
      let year = currentDate.getFullYear() // 当前显示年份
      let month = currentDate.getMonth() // 当前显示月份
      let currentYear = new Date().getFullYear() // 今年
      let currentMonth = new Date().getMonth() // 今月
      let currentDay = new Date().getDate() // 今天
      let days = new Date(year, month + 1, 0).getDate() // 当前显示月份的天数
      let week = new Date(year, month, 1).getDay() ? new Date(year, month, 1).getDay() : 7 // 当前显示月份的第一天是星期几
      let lastDays = new Date(year, month, 0).getDate() // 上个月的天数

      // 设置当前显示月份日期数组
      let dateArray = []
      for (let i = 2 - week; i <= days; i++) {
        // 设置选中的日期索引
        if (this.data.clickDay.year === year && this.data.clickDay.month === month && this.data.clickDay.day === i) {
          this.setData({ currentIndex: week - 2 + i })
        }
        dateArray.push({
          status: this.data.clickDay.year === year && this.data.clickDay.month === month && this.data.clickDay.day === i ? true : false,
          currentMonth: i > 0 ? 1 : 0, // 是否为当前显示月份日期，0：上个月；1：当前月；2下个月
          currentDay: currentYear === year && currentMonth === month && i === currentDay ? true : false, // 是否为今天
          year: i > 0 ? year : month === 0 ? year - 1 : year,
          month: i > 0 ? month : month === 0 ? 11 : month - 1,
          week: i > 0 ? [7, 1, 2, 3, 4, 5, 6][new Date(year, month, i).getDay()] : '', // 当天星期数（只记录当前显示月份的）
          solar: i > 0 ? i : lastDays + i, // 阳历
          lunar: '' // 农历
        })
      }
      // 补充完当前显示月份日期尾部
      if (dateArray.length % 7 !== 0) {
        let num = 7 - dateArray.length % 7
        for (let i = 1; i <= num; i++) {
          dateArray.push({
            status: false,
            currentMonth: 2, // 是否为当前显示月份日期，0：上个月；1：当前月；2下个月
            currentDay: false, // 是否为今天
            year: month === 11 ? year + 1 : year, // 当天年份（只记录当前显示月份的）
            month: month === 11 ? 0 : month + 1, // 当天月份（只记录当前显示月份的）
            week: '', // 当天星期数（只记录当前显示月份的）
            solar: i, // 阳历
            lunar: '' // 农历
          })
        }
      }
      this.setData({
        dateArray,
        title: `${year}-${this.handleDateFormat(month + 1)}`
      })
    },
    // 点击上下月
    clickLastOrNextMonth (e) {
      let type = e.currentTarget ? e.currentTarget.dataset.type : e
      let currentDate = this.data.showDate ? new Date(this.data.showDate) : new Date() // 当前显示日期
      let year = currentDate.getFullYear() // 当前显示年份
      let month = currentDate.getMonth() // 当前显示月份
      let changeMonth // 改变月份日期

      if (type === 'last') { // 上个月
        changeMonth = new Date(year, month - 1)
      } else { // 下个月
        changeMonth = new Date(year, month + 1)
      }

      // 设置改变后的日期
      this.setData({
        showDate: changeMonth
      })
      // 获取显示的日期数据
      this.getCurrentDate()
    },
    // 点击具体日期
    clickDay (e) {
      let index = e.currentTarget.dataset.index
      let info = this.data.dateArray[index]
      let currentDate = new Date()
      let year = currentDate.getFullYear()
      let month = currentDate.getMonth()
      let day = currentDate.getDate()
      let clickDay = {
        year,
        month,
        day,
        week: [7, 1, 2, 3, 4, 5, 6][new Date(year, month, day).getDay()]
      }

      // 判断是否是点击的今天
      if (info.year === year && info.month === month && info.solar === day) { // 是
        let modify = `dateArray[${this.data.currentIndex}].status`
        if (this.data.currentIndex >= 0) {
          this.setData({
            [modify]: false,
            clickDay,
            currentIndex: index
          })
        } else {
          this.setData({
            clickDay,
            currentIndex: index
          })
        }
      } else { // 不是
        let current = `dateArray[${this.data.currentIndex}].status`
        let modify = `dateArray[${index}].status`
        if (this.data.currentIndex >= 0) {
          this.setData({
            [current]: false,
            [modify]: true,
            clickDay: {
              year: info.year,
              month: info.month,
              day: info.solar,
              week: info.week
            },
            currentIndex: index
          })
        } else {
          this.setData({
            [modify]: true,
            clickDay: {
              year: info.year,
              month: info.month,
              day: info.solar,
              week: info.week
            },
            currentIndex: index
          })
        }
        // 判断是上个月还是下个月
        if (info.currentMonth === 0) { // 上个月
          this.clickLastOrNextMonth('last')
        } else if (info.currentMonth === 2) { // 下个月
          this.clickLastOrNextMonth('next')
        }
      }
    }
  }
})
