var connection = require("./baseDb.js");

module.exports = {
    //发表新文章
    addNewArticle(newAtricle, callback) {
        var sqlStr = "insert into articles set ?";
        connection.query(sqlStr, newAtricle, (err, result) => {
            if (err) return callback(err);
            // console.log(result);
            callback(null, result);
        })
    },
    // 首页根据参数 获取页码部分文章信息
    getAllArticle(nowPage, pageSize, callback) {
        // 执行多条语句前记得配置mysql中间件
        var sqlStr = "SELECT articles.* , usersinfo.nickname FROM articles LEFT JOIN usersinfo ON articles.authorId=usersinfo.id ORDER BY ctime DESC LIMIT ? , ? ; select count(*) AS totalCount from articles;";
        var offset = (nowPage - 1) * pageSize;
        connection.query(sqlStr, [offset, pageSize], (err, result) => {
            if (err) return callback(err);
            // console.log(result);
            callback(null, result);
        })
    },
    //根据id获取文章详情
    getArticleInfoById(id, callback) {
        var sqlStr = "SELECT articles.*,usersinfo.nickname FROM articles LEFT JOIN usersinfo ON articles.authorId = usersinfo.id where articles.id = ?";
        connection.query(sqlStr, id, (err, result) => {
            if (err) callback(err);
            // console.log(result);
            callback(null, result);
        })
    },
    // 编辑文章信息
    editArticle(article, callback) {
        var sqlStr = "update articles set ? where id = ?";
        connection.query(sqlStr, [article, article.id], (err, result) => {
            if (err) callback(err);
            callback(null, result);
        })
    }
}