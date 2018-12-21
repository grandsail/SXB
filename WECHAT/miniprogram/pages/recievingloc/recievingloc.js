// miniprogram/pages/frontpage/frontpage.js
Page({
  data:{
    print:0
  },

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

  //刷新数据，访问数据库，寻找与本机_openid相同的订单，存储在queryResult数组内
  refreshData: function () {
    const db = wx.cloud.database()
    db.collection('recievingloc').where({
      _openid: this.data.openid
    }).get({
      success: res => {
        this.setData({
          queryResult: res.data
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
  //按加号跳转页面
  ToUserinfo: function () {
    wx.navigateTo({
      url: '../userinfo/userinfo'
    })
  },

  SelectItem(e){
    this.setData({
      print: e.currentTarget.dataset.id
    })
  }
})