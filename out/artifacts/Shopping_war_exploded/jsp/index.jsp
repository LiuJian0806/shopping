<%--
  Created by IntelliJ IDEA.
  User: 小猪快跑
  Date: 2019/6/8
  Time: 23:35
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<script type="javascript">
  var res = document.cookie();
  alert(res);
</script>
<html>
  <head>
    <title>Hello Word</title>
  </head>
  <body>
  <form action="register" method="post">
    <input type="text" name="username">
    <input type="submit" value="提交">
  </form>

  </body>
</html>
