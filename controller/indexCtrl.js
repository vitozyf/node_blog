// 首页控制器
var express = require("express");
var articleModel = require("../model/articleModel.js");
var moment = require("moment");
module.exports = {
    //渲染首页
    showIndexPage(req, res) {
        // console.log(req.session.islogin);
        // 当前页以及每页的数量
        var nowPage = req.query.page || 1;
        var pageSize = 8;

        // 根据当前页和每页显示的条数 调用文章数据模块获取所有文章信息
        articleModel.getAllArticle(nowPage, pageSize, (err, result) => {
            if (err) return res.json({ err_code: 1, msg: "获取文章信息失败" });
            // console.log(result);
            // 得到的result是一个数字，分别是多条sql语句执行的查询结果
            result[0].forEach(article => {
                article.ctime = moment(article.ctime).format('YYYY-MM-DD HH:mm:ss');
            });
            if (req.session.islogin) {
                // 计算总共的页数
                var totalPage = Math.ceil(result[1][0].totalCount / pageSize);
                // 渲染
                res.render("my_blog/index.ejs", {
                    islogin: req.session.islogin,
                    userInfo: req.session.userInfo,
                    list: result[0],
                    totalPage: totalPage,
                    nowPage: nowPage
                });
                // console.log(Math.ceil(result[1][0].totalCount / result[0].length));
            } else {
                res.redirect("/login");
            }
        })
    }

}