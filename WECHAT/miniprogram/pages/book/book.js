var app = getApp()
Page({
  
data: {
  date: '2018-09-01',
  time: '12:00',
  num: '',
  phonenum:'',
  name: '',
  address: '',
  state: 2,
  car: '',
  box: '',
  back: '',
  canUseAddr: '',
  IsAdd: 0,
  IsEdit: 0,
  select: false,
   clickId: ''
 
  

  },

  onPullDownRefresh: function () {
    //下拉刷新订单
    this.refreshData()
    wx.stopPullDownRefresh()
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

 
  
  //刷新数据，访问数据库，寻找与本机_openid相同的收件地点记录，存储在canUseAddr数组内
  refreshData: function () {
    const db = wx.cloud.database()
    db.collection('recievingloc').where({
      _openid:this.data.openid
   
    }).
    get({
      success: res => {
        this.setData({
          canUseAddr: res.data
        })

        var b=this.data.clickId;
        this.data.name = canUseAddr[b].name
        this.data.phonenum = canUseAddr[b].phonenum
        this.data.address = canUseAddr[b].address
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
  
  addrSelect: function (res) {
    
    var select = this.data.boolean;
    this.setData({
      
      select:!select

    })
console.log(res)
this.setData({
  clickId:res.currentTarget.id,
 
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
submit: function (e) {
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
  url:'../addrselect/addrselect',
})

  },

  AddRecievingLoc(e) {
    var a = this.data.IsAdd;
    a = (a + 1) % 2;
 
    this.setData({
      IsAdd: a
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
        address: this.data.reg_address
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
      IsEdit: 0,
      IsAdd: 0
    })
  },



  edit(e) {
    var id = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.name;
    var phonenum = e.currentTarget.dataset.phonenum;
    var address = e.currentTarget.dataset.address;

    const db = wx.cloud.database()
    //db.collection('recievingloc').doc(id).remove({
    // success: res => {
    this.setData({
      IsEdit: 1,
      reg_name: name,
      reg_phonenum: phonenum,
      reg_address: address,
      reg_id: id,
      select: false
    })
    },

  save_edit: function (e) {
    const db = wx.cloud.database()
    db.collection('recievingloc').doc(this.data.reg_id).remove({})
    db.collection('recievingloc').add({
      data: {
        name: this.data.reg_name,
       phonenum: this.data.reg_phonenum,
        address: this.data.reg_address
      },
      success: res => {
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
        this.setData({
          reg_name: '',
          reg_phonenum: '',
          reg_address: '',
          reg_id: '',
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
toAddr:function()
{
  wx.navigateTo({
    url: '../addrselect/addrselect',
    success: function(res) {},
    fail: function(res) {},
    complete: function(res) {},
  })
}


  })
