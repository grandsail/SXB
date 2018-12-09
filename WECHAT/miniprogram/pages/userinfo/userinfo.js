Page({

  data: {
    name: '',
    phonenum: '',
    address: '',
  },

  userNameInput: function (e) {

    this.setData({
      userName: e.detail.value
    })
  },

  userPhoneNumInput: function (e) {

    this.setData({
      userPhoneNum: e.detail.value
    })
  },

  userAddressInput: function (e) {

    this.setData({
      userAddress: e.detail.value
    })
  },

  clickMe: function (e) {
    const db = wx.cloud.database()

    db.collection('userinfo').add({
      data: {
        name: this.data.userName,
        phonenum: this.data.userPhoneNum,
        address: this.data.userAddress
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

})