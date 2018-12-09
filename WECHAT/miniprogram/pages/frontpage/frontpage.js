// miniprogram/pages/frontpage/frontpage.js
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

  data: {
    leftbutton: 1 , //左按钮指示 1：当前位于左按钮页面 0：不位于此页面
    rightbutton: 0, //右按钮指示 1：当前位于右按钮页面 0：不位于此页面
    step:1 //换页面指示 1：我的快件 2：个人中心
  },

  //刷新数据，访问数据库，寻找与本机_openid相同的订单，存储在queryResult数组内
  refreshData: function() {
    const db = wx.cloud.database()
    db.collection('orders').where({
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

//按下左按钮会发生跳转和变色
  LEFT: function() {
    if(this.data.leftbutton == 0)
    {
      this.setData({
        status_left: 'background-color:#BDD7EE'
      })
      this.data.leftbutton = 1
      if(this.data.rightbutton == 1)
      {
        this.setData({
          status_right: 'background-color:#F6F6F6'
        })
        this.data.rightbutton = 0
      }
    }
    //跳转至我的快件
    this.setData({
      step:1
    })
  },
//按下右按钮会发生跳转和变色
  RIGHT: function () {
    if (this.data.rightbutton == 0) {
      this.setData({
        status_right: 'background-color:#BDD7EE'
      })
      this.data.rightbutton = 1
      if (this.data.leftbutton == 1) {
        this.setData({
          status_left: 'background-color:#F6F6F6'
        })
        this.data.leftbutton = 0
      }
    }
    //跳转至个人中心
    this.setData({
      step: 2
    })
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
  changeToRecievingloc :function(){
    wx.navigateTo({
      url: '../recievingloc/recievingloc'
    })
  },
  //点“常用收件地点”跳转至recievingloc页面
  changeTohistory: function () {
    wx.navigateTo({
      url: '../history/history'
    })
  }
})