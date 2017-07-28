//用户路由
var express = require("express");

var route = express.Router();

var userCtrl = require("../controller/userCtrl.js");

route
//渲染登陆页面
    .get("/login", userCtrl.showLogInPage)
    //注册页面
    .get("/register", userCtrl.showRegister)
    //验证用户名是否重复userCtrl.verifyName
    .post("/registerUser", userCtrl.verifyName)
    //注册
    .post("/register", userCtrl.registerNewUser)
    //登陆
    .post("/login", userCtrl.login)
    //退出
    .get("/logout", userCtrl.logout)

module.exports = route;