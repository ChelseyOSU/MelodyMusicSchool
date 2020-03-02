const controller = require('../controller/c-grade-report');
const router = require('koa-router')();


//获取所有学生的成绩报告
router.get('/api/gradeReport', controller.getGradeReport)


module.exports = router;