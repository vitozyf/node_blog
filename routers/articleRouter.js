const express = require("express");
const articleCtrl = require("../controller/articleCtrl.js")

var articleRouter = express.Router();

articleRouter
    .get("/article/add", articleCtrl.showArticlePage) //展示添加文章页面
    .post("/article/add", articleCtrl.addNewArticle) //提交新文章
    .get("/article/info", articleCtrl.showArticleInfo) //展示文章详情页面
    .get("/article/edit", articleCtrl.showEditPage) //展示编辑页面
    .post("/article/edit", articleCtrl.editArticle) //编辑文章

module.exports = articleRouter;