// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const carInfo = await db.collection('cars').get()
  let openid = event.userInfo.openId
  let carNum = 0
  let carBox = 0

  for (var i = 0; i < 24; i++) {
    if (event.time > carInfo.data[i].timedown && event.time <= carInfo.data[i].timeup) 
    {
      console.log(i)
      const update = await db.collection('cars').doc(carInfo.data[i]._id).update({
        data: {
          isUse: true,
          now: carInfo.data[i].now + 1,
          postnum: db.command.push(event.postnum),
          openid: db.command.push(openid),
          adress: event.adress
        }
      })
      carNum = i
      carBox = carInfo.data[i].now
      console.log(carNum)
      console.log(carBox)
      break
    }
  }
  return {
    carBox,
    carNum
  }
}