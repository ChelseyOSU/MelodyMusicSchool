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
exports.findAllClasses = () => {
  let sql = "select * from classes;"
  return query(sql)
}


//添加成绩报告
exports.addGradeReport = (value) => {
  let sql = "insert into grade_report set student_id=?,first_name=?,last_name=?,class_id=?,class_name=?,grade=?;"
  return query(sql, value)
}

//添加学生
exports.addStudent = (value) => {
  let sql = "insert into students set first_name=?,last_name=?,age=?;"
  return query(sql, value)
}

//添加名单
exports.addEnrollment = (value) => {
  let sql = "insert into enrollments set student_id=?,class_id=?;"
  return query(sql, value)
}



//根据id查询grade
exports.findGradeReportById =  ( id ) => {
  let _sql = `select * from grade_report where id="${id}";`
  return query( _sql)
}

//根据id查询student
exports.findStudentById =  ( id ) => {
  let _sql = `select * from students where id="${id}";`
  return query( _sql)
}

// 删除学生
exports.deleteStudent = (id) => {
  let _sql = `delete from students where id = ${id}`
  return query(_sql)
}

// 根据id删除名单
// exports.deleteEnrollment = (id) => {
//   let _sql = `delete from enrollments where id = ${id}`
//   return query(_sql)
// }

// 根据student_id和class_id删除名单
exports.deleteEnrollment = (student_id, class_id) => {
  let _sql = `delete from enrollments where student_id = ${student_id} and class_id = ${class_id}`
  return query(_sql)
}

// 删除成绩
exports.deleteGradeReport = (id) => {
  let _sql = `delete from grade_report where id = ${id}`
  return query(_sql)
}



exports.editGradeReport = (value) => {
  let sql = "update grade_report set first_name=?,last_name=?,class_id=?,class_name=?,grade=? where id=?"
  return query(sql, value)
}

exports.editStudent = (value) => {
  let sql = "update students set first_name=?,last_name=?,age=? where id=?"
  return query(sql, value)
}