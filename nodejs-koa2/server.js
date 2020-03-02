const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
var cors = require('koa2-cors');
const config = require('./db.js');
const app = new Koa();

app.use(cors());
app.use(bodyParser());

//装载子路由
app.use(require('./routers/grade-report.js').routes());
app.use(require('./routers/class.js').routes());

app.listen(config.port, () => {
    console.log('The server is running at http://localhost:' + config.port);
});
