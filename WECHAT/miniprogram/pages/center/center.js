Page({
  onLoad: function (options) {
    // 获取初始订单信息
    this.refreshData()

  },

  onReady: function () {

  },

  onShow: function () {

  },

  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {
    //下拉刷新订单
    this.refreshData()
    wx.stopPullDownRefresh()
  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  },

//按加号跳转至book页面
changeToIndex: function() {
  wx.navigateTo({
    url: '../book/book'
  })
},

//按头像跳转至userinfo页面
changeToUserinfo: function () {
  wx.navigateTo({
    url: '../userinfo/userinfo'
  })
},

//点“常用收件地点”跳转至recievingloc页面
changeToRecievingloc: function() {
  wx.navigateTo({
    url: '../recievingloc/recievingloc'
  })
},
//点“常用收件地点”跳转至history页面
changeTohistory: function () {
  wx.navigateTo({
    url: '../history/history'
  })
}
})