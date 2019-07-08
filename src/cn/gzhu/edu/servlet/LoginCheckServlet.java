package cn.gzhu.edu.servlet;

import cn.gzhu.edu.beans.User;
import cn.gzhu.edu.service.Service;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class LoginCheckServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doGet(req, resp);
        System.out.println("响应我！");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        super.doPost(req, resp);
        System.out.println("post响应！");
//        Cookie cookie = new Cookie("status","true");
//        resp.addCookie(cookie);
    }

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.service(req, resp);
//        System.out.println(req.getParameter("username"));
        req.setCharacterEncoding("UTF-8");
        String username = req.getParameter("username");
        String password = req.getParameter("password");
        Service service = new Service();
        User user = service.userLoginCheck(username,password);

        Map<String, Object> data = new HashMap<String, Object>();
        data.put("pet_name",user.getUpet_name());
        data.put("phone",user.getUphone());
        data.put("join_time",user.getUjoin_time());
        data.put("age",user.getUage());
        data.put("sex",user.getUsex());
        data.put("address",user.getUaddress());

        System.out.println(user.toString());
//        JSONObject jsonObject = JSONObject.fromObject(user);
//        System.out.println("jsonObject="+jsonObject);
        try {
            ResponseJsonUtils.json(resp, data);
        } catch (Exception ex) {
            ex.printStackTrace();
        }

    }
}
