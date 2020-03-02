const gradeReportModel = require('../mysql.js');


exports.getGradeReport = async ctx => {
    await gradeReportModel.findAllGradeReport()
        .then(result => {
            ctx.body = result
        }).catch(() => {
            ctx.body = 'error'
        })

}
