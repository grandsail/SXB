const app = getApp()
// "pages/frontpage/frontpage",
//   "pages/book/book",
Page({
  data: {
    motto: '在线',
    userInfo: {},
    hasUserInfo: false,
    result: '',
    state: ''
  },
  //事件处理函数
  onLoad: function () {
    wx.authorize({
      scope: 'scope.userInfo',
      success() {
        wx.getUserInfo({
          withCredentials: true,
          lang: '',
          success: function(res) {
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          },
        })
      }
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },


})