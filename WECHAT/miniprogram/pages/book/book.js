<<<<<<< HEAD
var app = getApp()


=======
var app = getApp();
>>>>>>> master
Page({
  
data: {
  date: '2018-09-01',
    time: '12:01',
  num: '',
  phonenum:'',
  name: '',
  address: '',
  state: 2,
  car: '',
  box: '',
  back: '',
  canUesAddr: ''
  },

  onLoad: function (options) {
    // 获取初始订单信息
    this.refreshData()
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

  
  //刷新数据，访问数据库，寻找与本机_openid相同的收件地点记录，存储在queryResult数组内
  refreshData: function () {
    const db = wx.cloud.database()
    db.collection('recievingloc').where({
      openid: this.data.openid
    }).get({
      success: res => {
        this.setData({
          canUesAddr: res.data
        })
        this.data.name = canUesAddr[0].name
        this.data.phonenum = canUesAddr[0].phonenum
        this.data.address = canUesAddr[0].address
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
  
  
//获取输入的数据
userNumInput: function (e) {
    // console.log(e.detail.value)设置用户名
    this.setData({
      userNum: e.detail.value
    })
  },

//提交订单并跳转到首页
clickMe: function (e) {
  const db = wx.cloud.database()
  wx.cloud.callFunction({
    name:"distributeCar",
    data:{
      time: this.data.time,
      postnum: this.data.userNum,
      address: this.data.address,
    },
    success: res => {
      this.setData({
        back:res.result,
       
     
      })
      console.log('调用云函数成功: ', res)
      db.collection('orders').add({
        data: {
          date: this.data.date,
          time: this.data.time,
          postnum: this.data.userNum,
          car: this.data.back.carNum,
          box: this.data.back.carBox,
          state: 1,
          name:this.data.name,
          address:this.data.address,
          phonenum:this.data.phonenum


        
        },

        success: res => {
          this.setData({
            counterId: res._id,
            
          })
         
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
    fail: err => {
      console.error('调用云函数失败：', err)
    }
  })
},
  toFrontpage:function(){
    wx.reLaunch({
      url: '../frontpage/frontpage',
    })
  },

  toChange:function(){
wx.navigateTo({
  url:'../recievingloc/recievingloc',
})

  }

  })