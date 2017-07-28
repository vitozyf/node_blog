//入口文件
const express = require("express");
const fs = require("fs");
const path = require("path");



//创建服务器
var app = express();

//静态资源托管
app.use("/node_modules", express.static("./node_modules"))

//设置默认字符串模板
app.set("view engine", "ejs");
//设置默认模板页的存放路径
app.set("views", "./views");

// 注册body-parser中间件
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

//注册express-session中间件
const session = require("express-session");
app.use(session({
    secret: "加密字符串*&^%$#@!",
    resave: false,
    saveUninitialized: false,
    cooike: { maxAge: 5 * 1000 }
}));

//注册路由
// var indexRouter = require("./routers/indexRouter.js")
// app.use(indexRouter);
// var userRouter = require("./routers/userRouter");
// app.use(userRouter);
//优化 不用分开注册每个路由
var fileNames = fs.readdir(path.join(__dirname + "/routers"), (err, fileNames) => {
    if (err) throw err;
    fileNames.forEach(fileName => {
        app.use(require(path.join(__dirname, "./routers/", fileName)));
    })
})


app.listen(3003, () => {
    console.log("server runing at http://127.0.0.1:3003");
})