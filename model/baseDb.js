// 创建数据库连接对象
const mysql = require("mysql");

connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "node_blog"
});
module.exports = connection;