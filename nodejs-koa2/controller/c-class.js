const classModel = require('../mysql.js');


exports.findAllClasses = async ctx => {
    await classModel.findAllClasses()
        .then(result => {
            ctx.body = result
        }).catch(() => {
            ctx.body = 'error'
        })

}
