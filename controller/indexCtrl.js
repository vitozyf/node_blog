// 首页控制器
var express = require("express");

module.exports = {
    //渲染首页
    showIndexPage(req, res) {
        // console.log(req.session);
        res.render("index", {
            islogin: req.session.islogin,
            userInfo: req.session.userInfo
        });
    }

}