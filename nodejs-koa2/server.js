const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const router = require('koa-router')
const config = require('./db.js');
const app = new Koa();


app.use(bodyParser());

//装载子路由
app.use(require('./routers/grade-report.js').routes());

app.listen(config.port, () => {
    console.log('The server is running at http://localhost:' + config.port);
});
