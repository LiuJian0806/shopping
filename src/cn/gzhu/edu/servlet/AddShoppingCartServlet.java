package cn.gzhu.edu.servlet;

import cn.gzhu.edu.beans.ShoppingCart;
import cn.gzhu.edu.service.Service;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class AddShoppingCartServlet extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        super.service(req, resp);
        ShoppingCart shoppingCart = new ShoppingCart();//定义购物车对象，用于封装数据
        Date date = new Date();  //定义时间对象

        shoppingCart.setB_id(req.getParameter("b_id"));
         //已加入购物车时间作为该商品在购物车上的编号
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
        String time = simpleDateFormat.format(date);
        shoppingCart.setOrder_id(time);
        shoppingCart.setOrder_num(Integer.parseInt(req.getParameter("order_num")));
        shoppingCart.setU_phone(req.getParameter("u_phone"));
        shoppingCart.setOrder_status(Integer.parseInt(req.getParameter("order_status")));    //用于记录购物车该商品状态，1为正常状态，2为删除状态（不显示于用户）
        Service service = new Service();
        boolean status = service.addShoppingCart(shoppingCart);

        Map<String, Object> data = new HashMap<String, Object>();
        data.put("status",status);

        try {
            ResponseJsonUtils.json(resp,data);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
