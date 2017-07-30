// 首页控制器
var express = require("express");
var articleModel = require("../model/articleModel.js");
var moment = require("moment");
module.exports = {
    //渲染首页
    showIndexPage(req, res) {
        // console.log(req.session.islogin);
        var nowPage = req.query.page || 1;
        var pageSize = 5;

        // 调用文章数据模块获取所有文章信息
        articleModel.getAllArticle(nowPage, pageSize, (err, result) => {
            if (err) return res.json({ err_code: 1, msg: "获取文章信息失败" });
            // console.log(result);
            // result.forEach(article => {
            //     article.ctime = moment(article.ctime).format('YYYY-MM-DD HH:mm:ss');
            // });
            // if (req.session.islogin) {

            //     res.render("my_blog/index.ejs", {
            //         islogin: req.session.islogin,
            //         userInfo: req.session.userInfo,
            //         list: result
            //     });
            // } else {
            //     res.redirect("/login");
            // }
        })
    }

}