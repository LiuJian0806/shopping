package cn.gzhu.edu.servlet;

import cn.gzhu.edu.service.Service;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class PhoneCheckServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doGet(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        super.doPost(req, resp);
        System.out.println(req.getParameter("phone"));
    }

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.service(req, resp);
        System.out.println("数据到达"+req.getParameter("phone"));
        Map<String, Object> data = new HashMap<String, Object>();
        Service service = new Service();
        data.put("phone_has", service.phoneCheck(req.getParameter("phone")));
        try {
            ResponseJsonUtils.json(resp, data);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}
