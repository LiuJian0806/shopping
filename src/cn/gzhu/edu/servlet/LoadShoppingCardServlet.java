package cn.gzhu.edu.servlet;

import cn.gzhu.edu.beans.ShoppingCartNews;
import cn.gzhu.edu.service.Service;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class LoadShoppingCardServlet extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        super.service(req, resp);
        Service service = new Service();
        List<ShoppingCartNews> list = service.loadShoppingCartNews(req.getParameter("u_phone"));    //创建购物车信息集合（用户不止只有一个商品在购物车）
        List<Map<String,Object>> lists = new ArrayList<Map<String,Object>>();
        for(ShoppingCartNews shoppingCartNews:list){
            Map<String, Object> data = new HashMap<String, Object>();
            data.put("b_id",shoppingCartNews.getB_id());
            data.put("b_name",shoppingCartNews.getB_name());
            data.put("b_photo_1",shoppingCartNews.getB_photo_1());
            data.put("b_photo_2",shoppingCartNews.getB_photo_2());
            data.put("b_photo_3",shoppingCartNews.getB_photo_3());
            data.put("b_photo_4",shoppingCartNews.getB_photo_4());
            data.put("b_photo_5",shoppingCartNews.getB_photo_5());
            data.put("b_describe",shoppingCartNews.getB_describe());
            data.put("b_oldprice",shoppingCartNews.getB_oldprice());
            data.put("b_newprice",shoppingCartNews.getB_newprice());
            data.put("b_isbn",shoppingCartNews.getB_ISBN());
            data.put("b_author",shoppingCartNews.getB_author());
            data.put("b_publish_company",shoppingCartNews.getB_publish_company());
            data.put("b_publish_time",shoppingCartNews.getB_publish_time());
            data.put("order_id",shoppingCartNews.getOrder_id());
            data.put("order_num",shoppingCartNews.getOrder_num());
            data.put("u_phone",shoppingCartNews.getU_phone());
            lists.add(data);
        }
        try {
            ResponseJsonUtils.json(resp,lists);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
