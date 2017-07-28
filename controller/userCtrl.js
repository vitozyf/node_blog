// 用户操作控制器
var express = require("express");

var usersModel = require("../model/usersModel");

//MD5第三方加密模块
var md5 = require("blueimp-md5");
//导入项目配置
var config = require("../config.js");

module.exports = {
    //展示用户登陆页面
    showLogInPage(req, res) {
        res.render("user/login.ejs", {})
    },
    // 用户注册页面
    showRegister(req, res) {
        res.render("user/register.ejs", {})
    },
    //验证用户名
    verifyName(req, res) {
        // console.log(req.body);
        var userName = req.body.username;
        usersModel.verifyName(userName, (err, result) => {
            if (err) return res.json({ err_code: 1, msg: "用户名重复，请重新输入" });
            // console.log(result);
            if (!result.length) {
                return res.json({ err_code: 0, msg: "用户名可以使用" });
            } else {
                return res.json({ err_code: 1, msg: "用户名重复，请重新输入" });
            }
        })
    },
    //注册新用户
    registerNewUser(req, res) {
        console.log(req.session);

        userInfo = req.body;
        //密码加密
        userInfo.password = md5(userInfo.password, config.pwdSalt);
        usersModel.registerNewUser(userInfo, (err, result) => {
            if (err) res.json({ err_code: 1, msg: "注册失败" });
            // console.log(result);
            res.json({ err_code: 0, msg: "注册成功" });
        })
    },
    //登陆
    login(req, res) {
        var userInfo = req.body;
        //密码加密
        userInfo.password = md5(userInfo.password, config.pwdSalt);
        usersModel.login(userInfo, (err, result) => {
            if (err || !result) return res.json({ err_code: 1, msg: "登陆失败" });

            // console.log(req.session);
            // console.log(result);
            //登陆成功之前，将用户信息和登陆状态保存到session中
            req.session.userInfo = result[0];
            req.session.islogin = true;

            // console.log(req.session);

            res.json({ err_code: 0, msg: "登陆成功" });
        });

    },
    //退出
    logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                console.log('注销失败！');
            } else {
                console.log('注销成功！');
            };
            res.redirect("/");

        })
    }

}