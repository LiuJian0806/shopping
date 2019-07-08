$(function () {
    //忘记密码
    $("#forget_password").click(function () {
           alert("请联系部门主管！")
    });
    //登录
    $("#login_btn input").click(function () {
          if($("#manage_name").val() == "" || $("#manage_password").val() == ""){
              alert("请完善登录信息！");
          }else {
              var manage_name =  $("#manage_name").val();
              var manage_password = $("#manage_password").val();
              $.ajax({
                  url:"../ManageLogin",
                  async:false,
                  type:"post",
                  data:{
                      "manage_name":manage_name,
                      "manage_password":manage_password
                  },
                  success:function (data) {
                      // alert(data);
                      var reg = new RegExp("=","g");
                      data = data.replace(reg,":");
                      var json = change(data);	//转换json
                      if(json.manage_id != null){
                          // alert("注册成功+"+json.manage_id);
                          SetCookie(json);
                          window.location.href = "Back-stage_management.html";
                      }else {
                          alert("注册失败");
                      }
                  },
                  error:function (data) {
                         alert(data.status);
                  }
              });
          }
    });
});