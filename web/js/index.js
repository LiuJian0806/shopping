$(function(){
	//检查登录状态
	isLogin();
	//跳转至个人中心、购物车、订单页
	$("#head #Super_link #head_Super_link .a:eq(3)").prevAll().children("a").click(function () {
		// alert($(this).text());
		if(isLogin())
			$(this).attr("href","html/Personal_center.html");
		else {
			$(this).attr("href","html/Login.html");
		}
	});

	//注销
	$("#log_off").click(function () {
		//删除用户信息cookie
		deleteCookieGroup(['pet_name','address','phone','sex','join_time','age']);
		//刷新页面
		window.location.reload();
	});
	//图书分类效果
	var oDiv = $("#select_advertise #left div:gt(0)");
	// alert(oDiv.eq(0).css("id"));
	oDiv.mouseover(function(){
		$(this).css({border:"3px solid red",color:"red"});
	}).mouseout(function(){
		$(this).css({border:"0",color:"black"});
	});

	//查询商品
	$("#search #search_input #btn").click(function () {
		  var context = $("#search #search_input #input input").val();
		  // alert(context);
		  if(context == ""){
		  		alert("请输入查询的商品！");
		  }else{
			  var time = new Date();
			  time.setTime(time.getTime()+7*24*60*60*1000); 	//设定七天有效期
			  var cookie = "search_item="+context+";expires="+time.toUTCString()+";path=/";
			  document.cookie = cookie;
			  window.location.href = "html/Products.html";	//成功跳转
		  }
	});
	//超链接鼠标移动变色
	var color;
	$("a").mouseover(function(){
		color = $(this).css("color");
		$(this).css({
			color:"red",
		});
	}).mouseout(function(){
		$(this).css({
			color:color,
		});
	});
    //启动加载页面商品信息
	loadCommodity();

	//点击商品跳转至商品详情页
    $("#second_select>div:gt(1)").click(function () {
        $(this).attr("name");
        var time = new Date();
        time.setTime(time.getTime()+7*24*60*60*1000); 	//设定七天有效期
        var cookie = "pitch_up_book="+$(this).attr("name")+";expires="+time.toUTCString()+";path=/";
        document.cookie = cookie;
        window.location.href = "html/Commodity_detail.html";	//成功跳转
    });
});

//加载商品
function loadCommodity() {
	   $.ajax({
		   url:"loadCommodity",
           async:false,
		   type:"post",
           data:{},
		   success:function (data) {
		       // console.log(data);
               // console.log(encodeURIComponent(data));
               var data = transitionArrString(data);
               var count = 3;
               var location = "";
               data.forEach(function (value) {
                   location = "#second_select>div:nth-child("+count+")";
                   console.log(value);
                   var json = change(value);
                   $(location+" .photo img").attr("src","img/book/"+json.b_photo_1);
                   $(location+" .message p").text(json.b_name);
                   $(location+" .message .now_price").html("秒杀价 ￥"+json.b_newprice+"&nbsp;&nbsp;");
                   $(location+" .message .original_price").html(""+json.b_oldprice);
                   $(location).attr("name",json.b_id);
                   count++;
               });
		   },
           error: function(xhr, exception){
               alert(data.status);
           }
	   });
}

//判断登录状态
function isLogin() {
	var Login = document.cookie.indexOf("pet_name=");
	if(Login == -1){
		$("#on_line").css({
			display:"none",
		});
		$("#off_line").css({
			display:"block",
		});
		return false;
	}else{
		$("#off_line").css({
			display:"none",
		});
		$("#on_line").css({
			display:"block",
		});
		$("#on_line #pet_name").text(getCookie("pet_name"));
		return true;
	}
}

