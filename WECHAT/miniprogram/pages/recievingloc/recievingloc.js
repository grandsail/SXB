// miniprogram/pages/recievingloc/recievingloc.js
Page({
  data:{
    IsEdit:0,
    reg_name:'',
    reg_phonenum:'',
    reg_address:''
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

  //编辑点击的收件地点记录
  edit(e){
    var id = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.name;
    var phonenum = e.currentTarget.dataset.phonenum;
    var address = e.currentTarget.dataset.address;
    const db = wx.cloud.database()
    db.collection('recievingloc').doc(id).remove({
      success: res => {
        this.setData({
          IsEdit:1,
          reg_name:name,
          reg_phonenum:phonenum,
          reg_address:address,
        })
      },
    })
  },

  AddRecievingLoc(e){
    var a = this.data.IsEdit;
    a = (a + 1) %2;
    this.setData({
      IsEdit:a
    })
  },

  userPhoneNumInput: function (e) {
    this.setData({
      reg_phonenum: e.detail.value
    })
  },

  userNameInput: function (e) {
    this.setData({
      reg_name: e.detail.value
    })
  },

  userAddressInput: function (e) {
    this.setData({
      reg_address: e.detail.value
    })
  },
  
  canceladd() {
    this.setData({
      IsEdit: 0
    })
  },

  saveadd: function (e) {
    const db = wx.cloud.database()
    db.collection('recievingloc').add({
      data: {
        userName: this.data.reg_name,
        userPhoneNum: this.data.reg_phonenum,
        userAddress: this.data.reg_address
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        wx.showToast({
          title: '保存成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
        this.setData({
          reg_name: '',
          reg_phonenum: '',
          reg_address: '',
        })
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
      IsEdit:0
    })
  },
})