// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()


exports.main = async (event, context) => {
  const db = cloud.database()
  const _ = db.command
  const del = await db.collection('Cars').where({
    isuse : true
  }).remove()
}