Page({

data: {
  date: '2018-09-01',
    time: '12:01',
  num: '',
  phonenum:'',
  name: '',
  address: '',
  state: 1
  },
//picker选择时间日期
bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  }
,
//获取输入的数据
userNumInput: function (e) {
    // console.log(e.detail.value)设置用户名
    this.setData({
      userNum: e.detail.value
    })
  },
userPhoneNumInput: function (e) {
   
    this.setData({
     userPhoneNum: e.detail.value
    })
  },
  
userNameInput: function (e) {

    this.setData({
      userName: e.detail.value
    })
  },
userAddressInput: function (e) {

    this.setData({
      userAddress: e.detail.value
    })
  },
//提交订单并跳转到首页
clickMe: function (e) {
  const db = wx.cloud.database()
    
  db.collection('orders').add({
    data: {
      date: this.data.date,
      time:this.data.time,
      postnum: this.data.userNum,
      phonenum:this.data.userPhoneNum,
      name:this.data.userName,
      address:this.data.userAddress,
      car: 1,
      box:1,
      state:1
      },


    success: res => {
      // 在返回结果中会包含新创建的记录的 _id
      wx.showToast({
        title: '预约成功',
      })
      console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
    },
    fail: err => {
      wx.showToast({
        icon: 'none',
        title: '预约失败'
      })
      console.error('[数据库] [新增记录] 失败：', err)
    }

    })
  },
  toFrontpage:function(){
    wx.navigateTo({
      url: '../frontpage/frontpage',
    })
  }

  })