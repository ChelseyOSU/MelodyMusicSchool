const gradeReportModel = require('../mysql.js');
const studentModel = require('../mysql.js');
const enrollmentModel = require('../mysql.js');

exports.findAllGradeReport = async ctx => {
    await gradeReportModel.findAllGradeReport()
        .then(result => {
            ctx.body = result
        }).catch(() => {
            ctx.body = 'error'
        })

}

exports.findGradeReportByClass = async (ctx) => {
    let classId = ctx.request.query.classId;
    console.log(classId)
    await gradeReportModel.findGradeReportByClass(classId)
        .then(result => {
            ctx.body = result
        }).catch(() => {
            ctx.body = 'error'
        })

}


exports.addGradeReport = async ctx => {
    // console.log(ctx.request.body)
    let grade_obj = ctx.request.body;

    // 先添加学生
    let studuentId;
    await studentModel.addStudent([grade_obj.firstName, grade_obj.lastName,grade_obj.age])
    .then(result => {
        console.log(result)
        studuentId  = result.insertId;
    }).catch(() => {
    })

    console.log(studuentId)
    

    //在添加名单
    await enrollmentModel.addEnrollment([studuentId, grade_obj.classId])
    .then(result => {
    }).catch(() => {
    })


    await gradeReportModel.addGradeReport([studuentId,grade_obj.firstName, grade_obj.lastName,grade_obj.classId, grade_obj.className, grade_obj.grade])
        .then(result => {
            ctx.body = {
                code: 200,
                message: 'ok'
            }
        }).catch(() => {
            ctx.body = 'error'
        })

}