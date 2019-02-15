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
    
  this.data.id=options.id;

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

 
  data: {
    focus: false,
    inputValue: '',
    queryResult: '',
    count: 0,
    id:''
  },

  onQuery: function () {
    const db = wx.cloud.database();
    // 查询当前用户所有的 counters
    db.collection('orders').where({
      _id: this.data.id
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


   onUpdate: function (e) {
    let id = e.currentTarget.dataset.id
    const db = wx.cloud.database()
    wx.navigateTo({
      url: '../change/change?id=' + this.data.id,
    })
  },
  onRemove: function (e) {
    let id = e.currentTarget.dataset.id
    const db = wx.cloud.database()
    db.collection('orders').doc(this.data.id).remove({
      success: res => {
        wx.showToast({
          title: '删除成功',
        })
        this.setData({
          counterId: '',
          count: null,
        })
        wx.navigateTo({
          url: '../frontpage/frontpage',
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
})