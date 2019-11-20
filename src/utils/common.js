/**
 * 显示 loading 提示框
 * @param {加载文案} title 
 */
function showLoading (title) {
  wx.showLoading({
    title: title || '加载中',
  })
}
/**
 * 关闭 loading 提示框
 */
function hideLoading () {
  wx.hideLoading()
}

export default {
  showLoading,
  hideLoading
}
