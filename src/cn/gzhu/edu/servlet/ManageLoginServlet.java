package cn.gzhu.edu.servlet;

import cn.gzhu.edu.beans.Administrator;
import cn.gzhu.edu.service.Service;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class ManageLoginServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        super.doPost(req, resp);
    }

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        super.service(req, resp);
        String username = req.getParameter("manage_name");
        String password = req.getParameter("manage_password");
        Service service = new Service();
        Administrator administrator = service.manageLoginCheck(username,password);

        Map<String, Object> data = new HashMap<String, Object>();
        data.put("manage_name",administrator.getM_name());
        data.put("manage_id",administrator.getM_id());

        try {
            ResponseJsonUtils.json(resp,data);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
