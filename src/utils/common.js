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
/**
 * 提示框
 * @param {提示文案} msg 
 * @param {提示图标} icon 
 */
function showToast (msg, icon) {
  wx.showToast({
    title: msg || '',
    icon: icon || 'none',
    duration: 2000
  })
}

export default {
  showLoading,
  hideLoading,
  showToast
}
