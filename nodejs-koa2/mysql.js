var mysql = require('mysql');
var config = require('./db.js')

var pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  port: config.database.PORT
});

let query = (sql, values) => {

  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })

}


// let query = function( sql, values ) {
// pool.getConnection(function(err, connection) {
//   // 使用连接
//   connection.query( sql,values, function(err, rows) {
//     // 使用连接执行查询
//     console.log(rows)
//     connection.release();
//     //连接不再使用，返回到连接池
//   });
// });
// }


//查询所有学生的成绩报告
exports.findAllGradeReport = () => {
  let sql = "select * from grade_report;"
  return query(sql)
}

//根据班级获取学生成绩报告
//101 Classic Music Theory
//228 Survey of Jazz Composition and Arranging
//401 Popular Music Institute
exports.findGradeReportByClass = (value) => {
  let sql = "select * from grade_report where class_id=?;"
  return query(sql, value)
}


//查询所有班级
exports.findAllClass = () => {
  let sql = "select * from classes;"
  return query(sql, value)
}


//添加成绩报告
exports.addGradeReport = () => {
  let sql = "insert into grade_report(first_name,last_name,class_id, class_name, grade) set first_name=?,last_name=?,class_id=?,class_name=?,grade=?;"
  return query(sql, value)
}