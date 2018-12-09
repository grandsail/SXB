// miniprogram/pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onQuery()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
      
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: 'input',
      path: 'miniprogram/pages/test/test'
    }
  },

  data: {
    focus: false,
    inputValue: '',
    queryResult: '',
    count: 0
  },

  onAdd: function (e) {
    const db = wx.cloud.database()
    const newCount = this.data.count + 1
    db.collection('todos').add({
      data: {
        phoneNum: e.detail.value.phone,
        count: newCount
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
  },

  onQuery: function () {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
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
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },

  formSubmit: function (e) {
    this.onAdd(e)
    this.setData({
      count:this.data.count + 1
    })
    this.onQuery()
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  onRemove: function (e) {
    let id = e.currentTarget.dataset.id
       const db = wx.cloud.database()
    db.collection('todos').doc(id).remove({
         success: res => {
           wx.showToast({
             title: '删除成功',
           })
           this.setData({
             counterId: '',
             count: null,
           })
         },
        fail: err => {
           wx.showToast({
             icon: 'none',
             title: '删除失败',
           })
           console.error('[数据库] [删除记录] 失败：', err)
         }
       })
     
  },

  formReset: function () {
    this.setData ({
      "queryResult":''
    })
    console.log('form发生了reset事件')
  },
  detail: function () {
    wx.navigateTo({
      url: '../detail/detail',
    })
  }
})