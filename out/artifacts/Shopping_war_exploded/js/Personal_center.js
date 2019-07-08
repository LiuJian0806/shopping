$(function(){
	//检查登录状态
	if(!isLogin()){   //未登录不允许访问个人中心
		window.location.href = "../";
	}

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
	//数量的添加\减少 金额随数量变化
	$(".context .commodity>div:nth-child(4)>div>div>div:nth-child(1)").click(function(){
		//找到当前的父节点
		var oInput = $(this).parent().parent().children(["input"]);
		var value = parseInt(oInput.val());
		value++;
		// $(".context .commodity>div:nth-child(4)>div:first-child input").attr("value",value);
		oInput.attr("value",value);
		//金额改变
		var oUnit = $(this).parent().parent().parent().prev().children(":first-child");	//查找单价对象
		// alert(oUnit.text());
		var str = oUnit.text();
		str = str.substr(1,5);
		var sum = parseFloat(str)*value;
		sum = sum.toFixed(2);
		var oSum = $(this).parent().parent().parent().next().children(":first-child");	//查找总额对象
		oSum.text("￥"+sum);
	});
	$(".context .commodity>div:nth-child(4)>div>div>div:nth-child(2)").click(function(){
		var oInput = $(this).parent().parent().children(["input"]);
		var value = parseInt(oInput.val());
		if(value<=1)
		{
			value = 1;
		}else{
			value--;
		}
		oInput.attr("value",value);
		//金额改变
		var oUnit = $(this).parent().parent().parent().prev().children(":first-child");	//查找单价对象
		var str = oUnit.text();
		str = str.substr(1,5);
		var sum = parseFloat(str)*value;
		sum = sum.toFixed(2);
		var oSum = $(this).parent().parent().parent().next().children(":first-child");	//查找总额对象
		oSum.text("￥"+sum);
	});
	//删除购物车
	$(".context .commodity>div:nth-child(6) span:first-child").click(function(){
		var oAncestor = $(this).parent().parent();
		oAncestor.remove();
	});
	//购买
	$(".context .commodity>div:nth-child(6) span:last-child").click(function(){
		alert("购买");
	});
	//手动修改值
	$(".context .commodity>div:nth-child(4)>div:first-child input").blur(function(){
		var value = $(this).val();
		$(this).text(value);
	});

	 //事件委托
	//数量的添加减少
	$("body").delegate(".context .commodity>div:nth-child(4)>div>div>div:nth-child(1)","click",function () {
		//找到当前的父节点
		var oInput = $(this).parent().parent().children(["input"]);
		var value = parseInt(oInput.val());
		value++;
		// $(".context .commodity>div:nth-child(4)>div:first-child input").attr("value",value);
		oInput.attr("value",value);
		//金额改变
		var oUnit = $(this).parent().parent().parent().prev().children(":first-child");	//查找单价对象
		// alert(oUnit.text());
		var str = oUnit.text();
		str = str.substr(1,5);
		var sum = parseFloat(str)*value;
		sum = sum.toFixed(2);
		var oSum = $(this).parent().parent().parent().next().children(":first-child");	//查找总额对象
		oSum.text("￥"+sum);
		var b_id = $(this).parent().parent().parent().parent().attr("name");//找到该行节点name属性
		updateNum(b_id,1,1);	//更新数据库信息
	});
	$("body").delegate(".context .commodity>div:nth-child(4)>div>div>div:nth-child(2)","click",function () {
		var oInput = $(this).parent().parent().children(["input"]);
		var value = parseInt(oInput.val());
		var val = value;
		if(value<=1)
		{
			value = 1;
		}else{
			value--;
		}
		var b_id = $(this).parent().parent().parent().parent().attr("name");//找到该行节点name属性
		if(value != val){
			updateNum(b_id,-1,1);
		}
		oInput.attr("value",value);
		//金额改变
		var oUnit = $(this).parent().parent().parent().prev().children(":first-child");	//查找单价对象
		var str = oUnit.text();
		str = str.substr(1,5);
		var sum = parseFloat(str)*value;
		sum = sum.toFixed(2);
		var oSum = $(this).parent().parent().parent().next().children(":first-child");	//查找总额对象
		oSum.text("￥"+sum);
	});
	//删除
	$("body").delegate(".context .commodity>div:nth-child(6) span:first-child","click",function () {
		var oAncestor = $(this).parent().parent();
		var b_id = oAncestor.attr("name");
		updateNum(b_id,0,0);
		oAncestor.remove();
	});
	//点击勾选
	$("body").delegate(".context .commodity .select","click",function () {
		   $(this).children("img").toggle();
	});
	//购买
	$("body").delegate(".context .commodity>div:nth-child(6) span:last-child","click",function () {
		var oAncestor = $(this).parent().parent();
		var b_id = oAncestor.attr("name");
		// var status = updateNum(b_id,0,3);
		// alert(status);
		if(updateNum(b_id,0,3)){
			alert("下单成功，请在我的订单中查看！");
			oAncestor.remove();
		}else{
			alert("下单失败，请重新下单！")
		}
	});
	//全选
	$(".context .detail .shopping_cart .table_head>div:first-child").click(function () {
		  $(this).children("img").toggle();
		  if($(this).children("img").css("display") == "block"){
			  $(".context .detail .shopping_cart .commodity .select img").css({"display":"block"});
		  }else{
			  $(".context .detail .shopping_cart .commodity .select img").css({"display":"none"});
		  }
	});

	//鼠标移入菜单变色
	$(".context .memu ul>li:not(:first-child)").mouseover(function(){
		$(this).css({
			color:"red",
		});
	}).mouseout(function(){
		$(this).css({
			color:"black",
		});
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
	//加载购物车信息
	loadShoppingCart();
});

function loadShoppingCart() {
	$.ajax({
		url:"../loadShoppingCart",
		async:false,
		type:"post",
		data:{
			u_phone:getCookie("phone"),
		},
		success:function (data) {
			console.log(data.toString());
			data = transitionArrString(data);
			console.log(data);
			console.log(data.length);
			data.forEach(function (value) {
				var json = change(value);
				createChildren(json);
				console.log(json);
			});
		},
		error:function (data) {
			console.log(data.status);
		}
	});
};

function createChildren(json) {
	    var html = "<div class=\"commodity\" name="+json.b_id+">\n" +
			"\t\t\t\t\t\t<div class=\"select\"><img src=\"../img/勾选.png\" ></div>\n" +
			"\t\t\t\t\t\t<div>\n" +
			"\t\t\t\t\t\t\t<div class=\"picture\"><img src=\"../img/book/"+json.b_photo_1+"\" alt=\"\"></div>\n" +
			"\t\t\t\t\t\t\t<div class=\"descride\">\n" +
			"\t\t\t\t\t\t\t\t<div class=\"book_name\">书名：<span>"+json.b_name+"</span></div>\n" +
			"\t\t\t\t\t\t\t\t<div class=\"book_descride\">\n" +
			json.b_describe+"\n" +
			"\t\t\t\t\t\t\t\t</div>\n" +
			"\t\t\t\t\t\t\t</div>\n" +
			"\t\t\t\t\t\t</div>\n" +
			"\t\t\t\t\t\t<div>\n" +
			"\t\t\t\t\t\t\t<span>￥"+parseFloat(json.b_newprice).toFixed(2)+"</span>\n" +
			"\t\t\t\t\t\t\t<span>￥"+parseFloat(json.b_oldprice).toFixed(2)+"</span>\n" +
			"\t\t\t\t\t\t</div>\n" +
			"\t\t\t\t\t\t<div>\n" +
			"\t\t\t\t\t\t\t<div>\n" +
			"\t\t\t\t\t\t\t\t<input type=\"number\" name=\"\" id=\"\" value=\""+json.order_num+"\" />\n" +
			"\t\t\t\t\t\t\t\t<div>\n" +
			"\t\t\t\t\t\t\t\t\t<div><img src=\"../img/加号.png\" ></div>\n" +
			"\t\t\t\t\t\t\t\t\t<div><img src=\"../img/减号.png\" ></div>\n" +
			"\t\t\t\t\t\t\t\t</div>\n" +
			"\t\t\t\t\t\t\t</div>\n" +
			"\t\t\t\t\t\t</div>\n" +
			"\t\t\t\t\t\t<div>\n" +
			"\t\t\t\t\t\t\t<span>￥"+(parseFloat(json.b_newprice)*parseFloat(json.order_num)).toFixed(2)+"</span>\n" +
			"\t\t\t\t\t\t</div>\n" +
			"\t\t\t\t\t\t<div>\n" +
			"\t\t\t\t\t\t\t<span>删除</span>\n" +
			"\t\t\t\t\t\t\t<span>购买</span>\n" +
			"\t\t\t\t\t\t</div>\n" +
			"\t\t\t\t\t</div>";

	    $(".context .detail .shopping_cart").append(html);
}

//更新商品数量
function updateNum(b_id,newNum,status) {
	return $.ajax({
		url:"../addShoppingCart",
		async:false,
		type:"post",
		data:{
			b_id:b_id,
			u_phone:getCookie("phone"),
			order_num:newNum,
			order_status:status,
		},
		success:function (data) {
			var json = change(data.toString());
			if(json.status == "true") {
				console.log("更新成功");
				return true;
			}
			else {
				console.log("更新失败");
				return false;
			}
		},
		error:function (data) {
			console.log(data.status);
			return false;
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