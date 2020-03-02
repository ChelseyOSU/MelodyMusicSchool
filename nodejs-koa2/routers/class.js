const controller = require('../controller/c-class');
const router = require('koa-router')();


router.get('/api/getAllClasses', controller.findAllClasses)

module.exports = router;