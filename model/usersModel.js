const express = require("express");
var connection = require("./baseDb.js");


module.exports = {
    // 验证用户名是否存在
    verifyName(userName, callback) {
        var sqlStr = "select * from usersInfo where username = ?"
        connection.query(sqlStr, userName, (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        })
    },
    //注册新用户
    registerNewUser(userInfo, callback) {
        var sqlStr = "insert into usersInfo set ?";
        connection.query(sqlStr, userInfo, (err, result) => {
            if (err) callback(err);
            callback(null, true);
        })
    },
    //登陆
    login(userInfo, callback) {
        var sqlStr = "select * from usersInfo where username = ? and password = ?";
        // console.log(userInfo);
        connection.query(sqlStr, [userInfo.username, userInfo.password], (err, result) => {
            if (err) return callback(err);
            if (result.length === 0) {
                callback(null, false);
            } else {
                callback(null, result);
            }
        })
    }
}