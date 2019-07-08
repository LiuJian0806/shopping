package cn.gzhu.edu.dao;

import cn.gzhu.edu.beans.ShoppingCartNews;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class LoadShoppingCartNewsDao {
    public List<ShoppingCartNews> loadShoppingCartNews(String phone) {
        String sql = "SELECT * FROM shoppingcart LEFT JOIN book ON shoppingcart.b_id = book.b_id WHERE shoppingcart.u_phone = "+phone+" AND shoppingcart.order_status = 1";
        List<ShoppingCartNews> list = new ArrayList<ShoppingCartNews>();
        Connection connection = JDBCUtils.getConnection();
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            ResultSet resultSet = preparedStatement.executeQuery();
            while(resultSet.next()){
                ShoppingCartNews shoppingCartNews = new ShoppingCartNews();
                shoppingCartNews.setB_id(resultSet.getString("b_id"));
                shoppingCartNews.setB_name(resultSet.getString("b_name"));
                shoppingCartNews.setB_describe(resultSet.getString("b_describe"));
                shoppingCartNews.setB_photo_1(resultSet.getString("b_photo_1"));
                shoppingCartNews.setB_photo_2(resultSet.getString("b_photo_2"));
                shoppingCartNews.setB_photo_3(resultSet.getString("b_photo_3"));
                shoppingCartNews.setB_photo_4(resultSet.getString("b_photo_4"));
                shoppingCartNews.setB_photo_5(resultSet.getString("b_photo_5"));
                shoppingCartNews.setB_oldprice(resultSet.getString("b_oldprice"));
                shoppingCartNews.setB_newprice(resultSet.getString("b_newprice"));
                shoppingCartNews.setB_ISBN(resultSet.getString("b_isbn"));
                shoppingCartNews.setB_author(resultSet.getString("b_author"));
                shoppingCartNews.setB_publish_company(resultSet.getString("b_publish_company"));
                shoppingCartNews.setB_publish_time(resultSet.getString("b_publish_time"));

                shoppingCartNews.setOrder_id(resultSet.getString("order_id"));
                shoppingCartNews.setOrder_num(Integer.parseInt(resultSet.getString("order_num")));
                shoppingCartNews.setU_phone(resultSet.getString("u_phone"));


                list.add(shoppingCartNews);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return list;
    }
}
