const controller = require('../controller/c-grade-report');
const router = require('koa-router')();


//获取所有学生的成绩报告
router.get('/api/getGradeReport', controller.findAllGradeReport)

router.get('/api/getGradeReportByClass', controller.findGradeReportByClass)

router.post('/api/addGradeReport', controller.addGradeReport)

module.exports = router;