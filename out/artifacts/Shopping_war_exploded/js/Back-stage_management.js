$(function () {
    //检查登录状态
    var manage_Login = document.cookie.indexOf("manage_id");
    if(manage_Login == -1){     //未登录，非法进入
        window.location.href = "Manage_Login.html"; //返回登录页
    }else{
        var greets = "[你好，"+getCookie("manage_name")+"!]";
        $(".greeting").text(greets);
    }
    //注销登录
    $(".head>div:last-child").click(function () {
            //删除当前登录信息cookie
            deleteCookie("manage_name");
            deleteCookie("manage_id");
            //刷新页面
            window.location.reload();
    });
    var $obj;
    // 1.监听一级菜单的点击事件
    $(".nav>li").click(function () {
        console.log(this);
        // 1.1拿到二级菜单
        var $sub = $(this).children(".sub");
        if(this == $obj){
            $sub.slideUp(1000);
            $(this).removeClass("current");
            $obj = "";
        }else{
            // 1.2让二级菜单展开
            $sub.slideDown(1000);
            // 1.3拿到所有非当前的二级菜单
            var otherSub = $(this).siblings().children(".sub");
            // 1.4让所有非当前的二级菜单收起
            otherSub.slideUp(1000);
            // 1.5让被点击的一级菜单箭头旋转
            $(this).addClass("current");
            // 1.6让所有非被点击的一级菜单箭头还原
            $(this).siblings().removeClass("current");
            $obj = this;
        }
    });
    //取消事件冒泡
    $(".nav>li>ul").click(function(){
        return false;
    });
    //上传图片
    $(".btn_file div input").on("change",function(){
        var filePath = $(this).val();        //获取到input的value，里面是文件的路径
        var	fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase();
        var src = window.URL.createObjectURL(this.files[0]); //转成可以在本地预览的格式
        // 检查是否是图片
        if( !fileFormat.match(/.png|.jpg|.jpeg/) ) {
            error_prompt_alert('上传错误,文件格式必须为：png/jpg/jpeg');
            alert("错误");
            return;
        }else{
            var temp = ".picture>div:nth-child("+$(this).attr("id")+") img"
            $(temp).attr('src',src);
            $('#loding').show();
        }
    });
    //提交数据到后台
    $(".submit").click(function () {
        //处理上传数据
        var formData = new FormData();
        //获取文本数据
        formData.append("describe",$("textarea").val());
        formData.append("book_name",$("#book_name").val());
        formData.append("book_publish_company",$("#book_publish").val());
        formData.append("book_author",$("#book_author").val());
        formData.append("book_publish_time",$("#book_publish_time").val());
        formData.append("book_ISBN",$("#book_ISBN").val());
        formData.append("new_price",$("#new_price").val());
        formData.append("old_price",$("#old_price").val());
        //获取文件数据
        formData.append("file_1",$("input[id='1']")[0].files[0]);
        formData.append("file_2",$("input[id='2']")[0].files[0]);
        formData.append("file_3",$("input[id='3']")[0].files[0]);
        formData.append("file_4",$("input[id='4']")[0].files[0]);
        formData.append("file_5",$("input[id='5']")[0].files[0]);


        $.ajax({
                url:"../AddBooks",
                type:"post",
                data:formData,
                // dataType:"json",
                cache:false,
                processData:false,
                contentType:false,
                success:function (data) {
                    alert("添加成功");
                    window.location.reload();
                },
                error:function (data) {
                    alert("失败="+data.status);
                }
            });
    });
});