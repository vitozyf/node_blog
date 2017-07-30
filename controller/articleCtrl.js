var express = require("express");

var articleModel = require("../model/articleModel.js");

// mditor
var mditor = require("mditor");
var parser = new mditor.Parser();
var moment = require("moment");

module.exports = {
    //显示发表文章页面
    showArticlePage(req, res) {
        var session = req.session;
        // console.log(req.body);
        // res.send("123")
        res.render("../views/article/add.ejs", {
            islogin: session.islogin,
            userInfo: session.userInfo
        });
    },
    // 发表新文章
    addNewArticle(req, res) {
        // var session = req.session;
        // console.log(req.body);
        var newAtricle = req.body;
        newAtricle.content = parser.parse(newAtricle.content);
        newAtricle.ctime = moment().format("YYYY-MM-DD HH:mm:ss");
        // console.log(newAtricle);
        articleModel.addNewArticle(newAtricle, (err, result) => {
            if (err || result.affectedRows !== 1) res.json({ err_code: 1, msg: "发表失败，请稍后重试" });
            res.json({ err_code: 0 });
        })
    },
    // 文章详情
    showArticleInfo(req, res) {
        articleModel.getArticleInfoById(req.query.id, (err, result) => {
            if (err) res.json({ err_code: 1, msg: "获取失败" });
            // console.log(req.session.userInfo);
            result[0].ctime = moment(result[0].ctime).format("YYYY-MM-DD HH:mm:ss");
            var obj = {
                article: result[0],
                islogin: req.session.islogin,
                userInfo: req.session.userInfo
            };
            res.render("../views/article/info.ejs", obj);
            // console.log(result);
            // console.log(result[0].title);
        })
    },
    //展示编辑页面
    showEditPage(req, res) {
        // console.log(req.query.id);
        articleModel.getArticleInfoById(req.query.id, (err, article) => {
            if (err || article.length !== 1) return res.redirect("/");
            // console.log((article));
            article[0].content = parser.parse(article[0].content);
            res.render("../views/article/edit.ejs", {
                islogin: req.session.islogin,
                userInfo: req.session.userInfo,
                article: article[0]
            })
        })
    },
    //编辑文章
    editArticle(req, res) {
        // console.log(req.body);
        articleModel.editArticle(req.body, (err, result) => {
            if (err || result.affectedRows !== 1) res.json({ err_code: 1, msg: "编辑失败，请稍后再试" });
            res.json({ err_code: 0 });
        })
    }
}