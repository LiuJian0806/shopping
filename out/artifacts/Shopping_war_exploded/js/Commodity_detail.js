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
	//跳转至个人中心、购物车、订单页
	$("#head #Super_link #head_Super_link .a:eq(3)").prevAll().children("a").click(function () {
		    // alert($(this).text());
		if(isLogin())
			$(this).attr("href","Personal_center.html");
		else {
			$(this).attr("href","Login.html");
		}
	});
	
	//数量的添加\减少
	$(".context .buy_news div:first-child div>div:nth-child(1)").click(function(){
		var value = parseInt($(".context .buy_news div:first-child input").val());
		value++;
		$(".context .buy_news div:first-child input").attr("value",value);
	});
	$(".context .buy_news div:first-child div>div:nth-child(2)").click(function(){
		var value = parseInt($(".context .buy_news div:first-child input").val());
		if(value<=1)
		{
			value = 1;
		}else{
			value--;
		}
		$(".context .buy_news div:first-child input").attr("value",value);
	});
	//鼠标移入图片改变大图
	var urlCheck = "../img/book/blank.jpg";
	$(".context .photo div:not(:first-child)").mouseover(function(){
		var url = $(this).children("img").attr("src");


		if(url != urlCheck) {
			$(this).children("img").css({
				border:"1px solid whitesmoke",
			});
			$(".context .photo div:first-child img").attr("src", url);
		}
	}).mouseout(function(){
		$(this).find("img").css({
			border:"0",
		});	
	});

	loadBook(); //加载商品信息
	//加入购物车
	$(".context .buy_news>div").eq(1).click(function () {
		if(isLogin()) {
			// alert(document.cookie);
			// console.log(getCookie("pitch_up_book") + getCookie("phone"));
			addShoppingCart();
		}
		else
			window.location.href = "Login.html";
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

//加载书本详情
function loadBook() {
	var value = getCookie("pitch_up_book");  //找到需要加载的书编号
	// deleteCookie("pitch_up_book");          //删除需要查找的的书编号
	// alert(value);
	$.ajax({
		url:"../loadBook",
		async:false,
		type:"post",
		data:{
			"book_id":value
		},
		success:function (data) {
			var json = change(data.toString());
			console.log(json);
			//图片显示
			$(".context .photo .big_photo img").attr("src", "../img/book/" + json.b_photo_1);
			var $Img = $(".context .photo .small_photo");
			var html1 = "<div class = 'show_photo'><img src='../img/book/";
			var html2 = "'></div>";

			if (json.b_photo_1 != "undefined") {
				$Img.eq(0).children("img").attr("src", "../img/book/" + json.b_photo_1);
				var html = html1+json.b_photo_1+html2;
				$(".context").append(html);
			} else
				$Img.eq(0).children("img").attr("src","../img/book/blank.jpg");

			if(json.b_photo_2 != "undefined") {
				$Img.eq(1).children("img").attr("src", "../img/book/" + json.b_photo_2);
				var html = html1+json.b_photo_2+html2;
				$(".context").append(html);
			} else
				$Img.eq(1).children("img").attr("src","../img/book/blank.jpg");

			if(json.b_photo_3 != "undefined") {
				$Img.eq(2).children("img").attr("src", "../img/book/" + json.b_photo_3);
				var html = html1+json.b_photo_3+html2;
				$(".context").append(html);
			}else
				$Img.eq(2).children("img").attr("src","../img/book/blank.jpg");

			if(json.b_photo_4 != "undefined") {
				$Img.eq(3).children("img").attr("src", "../img/book/" + json.b_photo_4);
				var html = html1+json.b_photo_4+html2;
				$(".context").append(html);
			}else
				$Img.eq(3).children("img").attr("src","../img/book/blank.jpg");

			if(json.b_photo_5 != "undefined") {
				$Img.eq(4).children("img").attr("src", "../img/book/" + json.b_photo_5);
				var html = html1+json.b_photo_5+html2;
				$(".context").append(html);
			}else
				$Img.eq(4).children("img").attr("src","../img/book/blank.jpg");
			//信息展示
			$(".context .news .book_name").text(json.b_name);	//书名
			$(".context .news .descride p").text(json.b_descride);
			$(".context .news .publish_news .autor a").text(json.b_author);
			$(".context .news .publish_news .publish_company a").text(json.b_publish_company);
			$(".context .news .publish_news .publish_time a").text(json.b_public_time);
			var $price = $(".context .news .price span");
			$price.eq(0).text("￥"+parseFloat(json.b_newprice).toFixed(2));
			var count = parseFloat(json.b_newprice)/parseFloat(json.b_oldprice);
			$price.eq(1).text("("+((count*10).toFixed(2))+"折)");
			$price.eq(2).text("原价："+parseFloat(json.b_oldprice).toFixed(2));
			var eBook = (parseFloat(json.b_newprice*0.11)).toFixed(2);
			$price.eq(3).children("p").text("￥"+eBook);
		},
		error:function (data) {
			// alert("失败="+data.status);
		}
	});
}

//加入购物车
function addShoppingCart() {
	  $.ajax({
		  url:"../addShoppingCart",
		  async:false,
		  type:"post",
		  data:{
			   b_id:getCookie("pitch_up_book"),
			   u_phone:getCookie("phone"),
			   order_num:$(".context .buy_news>div:first-child input").val(),
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