package cn.gzhu.edu.servlet;

import cn.gzhu.edu.beans.Book;
import cn.gzhu.edu.service.Service;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

//@WebServlet("/loadBook")
public class LoadBookServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        super.doPost(req, resp);
        System.out.println("会不会是这里的问题");
    }

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.service(req, resp);
        System.out.println("到达服务器");
        req.setCharacterEncoding("UTF-8");
        String book_id = req.getParameter("book_id");
        Service service = new Service();
        Book book = service.loadBook(book_id);

        System.out.println(book.toString());
        Map<String, Object> data = new HashMap<String, Object>();
        data.put("b_id",book.getB_id());
        data.put("b_name",book.getB_name());
        data.put("b_photo_1",book.getB_photo_1());
        data.put("b_photo_2",book.getB_photo_2());
        data.put("b_photo_3",book.getB_photo_3());
        data.put("b_photo_4",book.getB_photo_4());
        data.put("b_photo_5",book.getB_photo_5());
        data.put("b_describe",book.getB_describe());
        data.put("b_oldprice",book.getB_oldprice());
        data.put("b_newprice",book.getB_newprice());
        data.put("b_isbn",book.getB_ISBN());
        data.put("b_author",book.getB_author());
        data.put("b_publish_company",book.getB_publish_company());
        data.put("b_publish_time",book.getB_publish_time());
        try {
            ResponseJsonUtils.json(resp,data);
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("结束");
    }
}
