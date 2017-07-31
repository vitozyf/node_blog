// 首页JS路口
$(function() {
    $(".search").on("click", ".fa-search", function(e) {
        e.preventDefault();
        // var value = $(this).serialize();
        var value = $(this).siblings().eq(0).val();
        console.log(value);
        // 拿到搜索的内容进行ajax请求
        $.ajax({
            url: "/search",
            data: {
                value: value
            },
            type: "get",
            dataType: "json"
        }).then(function(res) {
            console.log(res);
        })
    })
})