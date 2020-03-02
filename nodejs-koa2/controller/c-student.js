const studentModel = require('../mysql.js');


exports.addStudent = async ctx => {
    await studentModel.addStudent()
        .then(result => {
            ctx.body = {
                code: 200,
                message: 'ok'
            }
        }).catch(() => {
            ctx.body = 'error'
        })

}
