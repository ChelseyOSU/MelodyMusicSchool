const gradeReportModel = require('../mysql.js');


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
