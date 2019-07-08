$(function(){
	//鼠标移动到a标签上变色
	var color;
	var username_pass = false;
	var password_pass = false;
	var security_code_pass = false;
	$("a").mouseover(function(){
		color = $(this).css("color");
		$(this).css({
			color:"red",
		}
		);
	}).mouseout(function(){
		$(this).css({
			color:color,
		});
	});
	
	//换验证码图片
	$("#security_code font[color='burlywood']").click(function(){
		alert("换一张！");
	});
	//验证登录信息(输入信息)
	var oUsername = $("#Login_username");
	var oPassword = $("#Login_password");
	var oSecurity = $("#sec_code");
	//提示信息
	var oUsername_tip = $("#tip_name");
	var oPassword_tip = $("#tip_psw");
	var oSecurity_tip = $("#tip_security");
	//清除信息
	oUsername.prop("value","");
	oSecurity.prop("value","");
	//验证帐号
	oUsername.focus(function(){
		oUsername_tip.text("邮箱/昵称/手机号码").css({display:"block",color:"grey"});
	}).blur(function(){
		if($(this).val() == ""){
			oUsername_tip.text("帐号不能为空").css({display:"block",color:"red"});
		}else{
			username_pass = true;
			oUsername_tip.css({display:"none"});
		}
	});
	//验证密码
	var Password = /^[0-9a-zA-Z!@#$%^&*]{6,16}$/;
	oPassword.focus(function(){
		oPassword_tip.text("6-20位英文、数字及符号的组合").css({display:"block",color:"grey"});
	}).blur(function(){
		var password = $(this).val();
		if(password == ""){
			oPassword_tip.text("密码不能为空").css({display:"block",color:"red"});
		}else if(!Password.test(password)){
			oPassword_tip.text("6-20位英文、数字及符号的组合").css({display:"block",color:"red"});
		} else{
			password_pass = true;
			oPassword_tip.css({display:"none"});
		}
	});
	//验证验证码
	oSecurity.focus(function(){
		oSecurity_tip.text("请输入验证码").css({display:"block",color:"grey"});
	}).blur(function(){
		var secrity = $(this).val();
		if(secrity != "uwv6"){
			oSecurity_tip.text("验证码输入错误，请重新输入").css({display:"block",color:"red"});
		}else{
			security_code_pass = true;
			oSecurity_tip.css({display:"none"});
		}
		});
	// //验证码
	// $('show_security_img').codeVerify({
	// 	type : 1,
	// 	width : '400px',
	// 	height : '50px',
	// 	fontSize : '30px',
	// 	codeLength : 6,
	// 	btnId : 'check-btn',
	// 	ready : function() {
	// 	},
	// 	success : function() {
	// 		alert('验证匹配！');
	// 	},
	// 	error : function() {
	// 		alert('验证码不匹配！');
	// 	}
	// });
	//登录
	$("#Login_action #Login_submit input").click(function () {
		if(username_pass && password_pass && security_code_pass){
			// alert(oUsername.val()+oPassword.val());
			$.ajax({
				url: "../loginCheck",
				async:false,
				type:"post",
				// dataType:"json",
				data:{
					"username":oUsername.val(),
					"password":oPassword.val()
				},
				success:function (data) {
					// alert(encodeURIComponent(data));
					var json = change(data);	//转换json
					if(json.phone.length != 11){
						 alert("登录失败，请重新登录！");
					}else{
						SetCookie(json);         //创建cookie
						// alert(document.referrer);
						var reg = RegExp(/Reg/);
						if(reg.exec(document.referrer)){
							window.location.href = "../";	//成功跳转
						}else{
							history.back(-1);
						}
					}
				},
				error:function (data) {
					alert("失败="+data.status);
				}
			});
		}else{
			if(username_pass == false){
				oUsername_tip.text("请完善帐号信息").css({display:"block",color:"red"});
			}
			if(password_pass == false){
				oPassword_tip.text("请完善密码信息").css({display:"block",color:"red"});
			}
			if(security_code_pass == false){
				oSecurity_tip.text("请完善验证码信息").css({display:"block",color:"red"});
			}
			return false;
		}
	});
});