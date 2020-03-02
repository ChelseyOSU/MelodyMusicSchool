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
    await studentModel.addStudent([grade_obj.firstName, grade_obj.lastName, grade_obj.age])
        .then(result => {
            console.log(result)
            studuentId = result.insertId;
        }).catch(() => {
        })

    console.log(studuentId)


    //在添加名单
    await enrollmentModel.addEnrollment([studuentId, grade_obj.classId])
        .then(result => {
        }).catch(() => {
        })


    await gradeReportModel.addGradeReport([studuentId, grade_obj.firstName, grade_obj.lastName, grade_obj.classId, grade_obj.className, grade_obj.grade])
        .then(result => {
            ctx.body = {
                code: 200,
                message: 'ok'
            }
        }).catch(() => {
            ctx.body = 'error'
        })

}


exports.deleteOne = async (ctx) => {
    let id = ctx.request.body.id;
    console.log(id)

    //先查出grade
    let grade_obj;
    await gradeReportModel.findGradeReportById(id)
        .then(result => {
            grade_obj = result[0];
        }).catch(() => {
            ctx.body = 'error'
        })

    console.log("***********************************")
    console.log(grade_obj)
    console.log(grade_obj.student_id)
    console.log(grade_obj.class_id)
    console.log("***********************************")

    //根据grade的student_id和class_id删除enrollments
    await gradeReportModel.deleteEnrollment(grade_obj.student_id, grade_obj.class_id)
        .then(result => {
        }).catch(() => {
            ctx.body = 'delete enrollment error'
        })

    //删除成绩
    await gradeReportModel.deleteGradeReport(id)
        .then(result => {
        }).catch(() => {
            ctx.body = 'delete grade report error'
        })

    //删除学生
    await gradeReportModel.deleteStudent(grade_obj.student_id)
        .then(result => {
            ctx.body = {
                code: 200,
                message: 'ok'
            }
        }).catch(() => {
            ctx.body = 'delete student error'
        })

}