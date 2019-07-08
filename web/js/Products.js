$(function(){
	//检查登录状态
	isLogin();
	//注销
	$("#log_off").click(function () {
		//删除用户信息cookie
		deleteCookieGroup(['pet_name','address','phone','sex','join_time','age']);
		//刷新页面
		window.location.reload();
	});
	//跳转至个人中心、购物车、订单页
	$("#head #Super_link #head_Super_link .a:eq(3)").prevAll().children("a").click(function () {
		if(isLogin())
			$(this).attr("href","Personal_center.html");
		else {
			$(this).attr("href","Login.html");
		}
	});
	//加载查询的数据
	loadSearchCommodity();
	//点击展开下拉框
	$("#navigation #classify_head").click(function(){
		$(this).siblings().eq(1).slideToggle(1000);
	});
	//图书分类效果
	var oDiv = $("#navigation #contain div");
	// alert(oDiv.eq(0).css("id"));
	oDiv.hover(function(){
		$(this).css({border:"3px solid red",color:"red"});
	},function(){
		$(this).css({border:"0",color:"black"});
	});
	//事件委托
	$("body").delegate("#commodity_all #commodity_left > ul .li div:last-child span:nth-last-of-type(2)","click",function () {
		if(isLogin()){
		    	var b_id = $(this).parent().parent().attr("name");
		    	// alert(b_id);
		    	addShoppingCart(b_id);
		}else{
			window.location.href = "Login.html";
		}
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
			window.location.href = "Products.html";	//成功跳转
		}
	});
});

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

//查询搜素内容
function loadSearchCommodity() {
	$.ajax({
		url:"../searchCommodity",
		async:false,
		type:"post",
		data:{
			search_item:getCookie("search_item"),
		},
		success:function (data) {
			data = transitionArrString(data);
			console.log(data);
			data.forEach(function (value) {
				var json = change(value);
				loadSearchItem(json);
			});
		},
		error:function (data) {
			console.log(data.status);
		}
	});
}

//把结果显示出来
function loadSearchItem(json) {
	  var html = "<li class='li' name = '"+json.b_id+"'>\n" +
		  "\t\t\t\t\t\t<div class=\"left\">\n" +
		  "\t\t\t\t\t\t\t<img src=\"../img/book/"+json.b_photo_1+"\" >\n" +
		  "\t\t\t\t\t\t</div>\n" +
		  "\t\t\t\t\t\t<div class=\"right\">\n" +
		  "\t\t\t\t\t\t\t<font><a href=\"#\">"+json.b_name+"</a></font><br>\n" +
		  "\t\t\t\t\t\t\t<span class=\"price\"><font color=\"red\">￥"+parseFloat(json.b_newprice).toFixed(2)+"</font><font class=\"old_price\">&nbsp;定价<font>￥"+parseFloat(json.b_oldprice).toFixed(2)+"</font>("+(parseFloat(json.b_newprice)/parseFloat(json.b_oldprice)*10).toFixed(2)+"折)</font></span>\n" +
		  "\t\t\t\t\t\t\t<font size=\"\" color=\"\"></font>\n" +
		  "\t\t\t\t\t\t\t<font class=\"publish_information\"><a href=\"#\">"+json.b_author+"</a>著，<a href=\"#\">"+json.b_publish_company+"发行</a>/"+json.b_publish_time+"/<a href=\"#\">"+json.b_publish_company+"</a></font><br>\n" +
		  "\t\t\t\t\t\t\t<font class=\"descride\">"+json.b_describe+"\n" +
		  "\t\t\t\t\t\t\t </font><br>\n" +
		  "\t\t\t\t\t\t\t <span class=\"add_shopping_cart\">加入购物车</span><span class=\"enshrine\">收藏</span>\n" +
		  "\t\t\t\t\t\t</div>\n" +
		  "\t\t\t\t\t</li>";

	  $("#commodity_all #commodity_left > ul").append(html);
}

//加入购物车
function addShoppingCart(b_id) {
	$.ajax({
		url:"../addShoppingCart",
		async:false,
		type:"post",
		data:{
			b_id:b_id,
			u_phone:getCookie("phone"),
			order_num:1,
			order_status:1
		},
		success:function (data) {
			var json = change(data.toString());
			if(json.status == "true")
				alert("添加成功");
			else
				alert("添加失败！");
		},
		error:function (data) {
			console.log(data.status);
		}
	});
}