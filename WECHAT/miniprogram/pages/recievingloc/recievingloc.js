// miniprogram/pages/recievingloc/recievingloc.js
Page({
  data:{
    IsAdd:0,
    address: '',
  },

  onLoad: function (options) {
    // 获取初始收件地点信息
    this.refreshData()
  },

  onPullDownRefresh: function () {
    //下拉刷新常用收件地点
    this.refreshData()
    wx.stopPullDownRefresh()
  },

  //刷新数据，访问数据库，寻找与本机_openid相同的收件地点记录，存储在queryResult数组内
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

  //选中点击的收件地点记录
  SelectItem(e){
    this.setData({
      //print: e.currentTarget.dataset.id
    })
  },

  AddRecievingLoc(e){
    var a = this.data.IsAdd;
    a = (a + 1) %2;
    this.setData({
      IsAdd:a
    })
  },

  userAddressInput: function (e) {

    this.setData({
      userAddress: e.detail.value
    })
  },
  
  clickMe: function (e) {
    const db = wx.cloud.database()

    db.collection('recievingloc').add({
      data: {
        RecievingLoc: this.data.userAddress
      },

      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        wx.showToast({
          title: '上传成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '上传失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }

    })

    this.setData({
      IsAdd:0
    })
  },
})