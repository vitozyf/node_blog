//首页路由
const express = require("express");
var indexCtrl = require("../controller/indexCtrl");


var router = express.Router();


router
//渲染首页
    .get("/", indexCtrl.showIndexPage)

module.exports = router;