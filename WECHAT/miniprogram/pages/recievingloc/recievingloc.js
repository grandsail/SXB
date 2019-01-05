// miniprogram/pages/recievingloc/recievingloc.js
Page({
  data:{
    IsAdd:0,
    IsEdit:0,
    reg_name:'',
    reg_phonenum:'',
    reg_address:'',
    reg_id:''
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
    //db.collection('recievingloc').doc(id).remove({
     // success: res => {
    this.setData({
      IsEdit:1,
      reg_name:name,
      reg_phonenum:phonenum,
      reg_address:address,
      reg_id:id,
     
    })
      //},
    //})
  },



  AddRecievingLoc(e){
    var a = this.data.IsAdd;
    a = (a + 1) %2;
    this.setData({
      IsAdd:a
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
  
  cancel() {
    this.setData({
      IsAdd: 0,
      IsEdit: 0,
    })
  },

  saveadd: function (e) {


    const db = wx.cloud.database()
    db.collection('recievingloc').add({
      data: {
        name: this.data.reg_name,
        phonenum: this.data.reg_phonenum,
        address: this.data.reg_address,
        select:0
      },
      success: res => {
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
        this.setData({
          reg_name: '',
          reg_phonenum: '',
          reg_address: '',
        })
      },
      fail: err => {
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
    this.setData({
      IsEdit:0,
      IsAdd:0
    })
  },

  save_edit: function (e) {
    const db = wx.cloud.database()
    db.collection('recievingloc').doc(this.data.reg_id).remove({})
    db.collection('recievingloc').add({
      
      data: {
        userName: this.data.reg_name,
        userPhoneNum: this.data.reg_phonenum,
        userAddress: this.data.reg_address
      
      },
      success: res => {
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
        this.setData({
          reg_name: '',
          reg_phonenum: '',
          reg_address: '',
          reg_id:'',
        })
      },
      fail: err => {
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
    this.setData({
      IsEdit: 0,
      IsAdd: 0
    })
  },
})
