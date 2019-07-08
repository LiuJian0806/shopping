package cn.gzhu.edu.servlet;

import cn.gzhu.edu.beans.User;
import cn.gzhu.edu.service.Service;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class RegisterServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doGet(req, resp);
        System.out.println("响应！");

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        super.doPost(req, resp);
        System.out.println("post请求");
    }
               
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.service(req, resp);
        System.out.println("响应");
        req.setCharacterEncoding("UTF-8");
//        Map<String,String[]> properties = req.getParameterMap();
        User user = new User();
        user.setUpet_name(req.getParameter("pet_name"));
        user.setUphone(req.getParameter("phone"));
        user.setUpsw(req.getParameter("password"));
        user.setUaddress(null);
        user.setUage(0);
        user.setUsex(null);
        Date currentTime = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH-mm-ss");
        String time = simpleDateFormat.format(currentTime);
        user.setUjoin_time(time);
        System.out.println(time);
        System.out.println(user.getUpet_name());

        System.out.println("一号位置正常");
        Service service = new Service();
        boolean regitesSuccess = service.register(user);
//        Map<String,String> result = new HashMap<>();  //创建Map对象
//        result.put("status",String.valueOf(regitesSuccess));//加入信息
//        JSONArray array = JSONArray.fromObject(result);
//        JSONObject jsonObject = new JSONObject();
//        jsonObject.put("status",String.valueOf(regitesSuccess));
        resp.getWriter().write("false");
        System.out.println(regitesSuccess);
        if(regitesSuccess){
            System.out.println("我应该跳转的！");
//            resp.sendRedirect(String.valueOf(regitesSuccess));
            resp.sendRedirect(req.getContextPath()+"/html/RegSuccess.html");
        }else{
            resp.getWriter().write("false");
            System.out.println("注册失败了！");
            resp.sendRedirect(req.getContextPath()+"/html/RegFailure.html");
        }
    }
}                
