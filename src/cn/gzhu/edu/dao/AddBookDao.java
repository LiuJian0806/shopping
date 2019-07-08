package cn.gzhu.edu.dao;

import cn.gzhu.edu.beans.Book;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class AddBookDao {
    public boolean addBooks(Book book) {
        int result = 0;//记录结果
        String sql = "insert into book values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        Connection connection = JDBCUtils.getConnection();
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setObject(1,book.getB_id());
            preparedStatement.setObject(2,book.getB_name());
            preparedStatement.setObject(3,book.getB_photo_1());
            preparedStatement.setObject(4,book.getB_photo_2());
            preparedStatement.setObject(5,book.getB_photo_3());
            preparedStatement.setObject(6,book.getB_photo_4());
            preparedStatement.setObject(7,book.getB_photo_5());
            preparedStatement.setObject(8,book.getB_describe());
            preparedStatement.setObject(9,book.getB_newprice());
            preparedStatement.setObject(10,book.getB_oldprice());
            preparedStatement.setObject(11,book.getB_author());
            preparedStatement.setObject(12,book.getB_publish_company());
            preparedStatement.setObject(13,book.getB_publish_time());
            preparedStatement.setObject(14,book.getB_ISBN());
            result = preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return result>0?true:false;
    }
}