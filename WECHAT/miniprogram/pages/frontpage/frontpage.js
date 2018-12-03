// miniprogram/pages/frontpage/frontpage.js
Page({
  onLoad: function (options) {
    // this.onAdd()
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
    this.refreshData()
    wx.stopPullDownRefresh()
  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  },

  data: {
    leftbutton: 1 ,
    rightbutton: 0,
  },

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

  // onAdd: function () {
  //   const db = wx.cloud.database()
  //   db.collection('orders').add({
  //     data: {
  //       box: 1,
  //       car: 1,
  //       number: 12345678,
  //       state: 3,
  //       time: 201712281150
  //     },
  //     success: res => {
  //       console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
  //     },
  //     fail: err => {
  //       console.error('[数据库] [新增记录] 失败：', err)
  //     }
  //   })
  // },

  changeColorL: function() {
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
  },

  changeColorR: function () {
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
  },  

  changeToIndex: function() {
    wx.navigateTo({
      url: '../book/book'
    }),
      wx.navigateTo({
        ur2: 'pages/test1/test1'
      })
  }
  

})