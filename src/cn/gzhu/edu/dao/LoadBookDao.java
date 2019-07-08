package cn.gzhu.edu.dao;

import cn.gzhu.edu.beans.Book;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class LoadBookDao {
    public List<Book> loadCommodity() {
        String sql = "select * from book";
        List<Book> list = new ArrayList<Book>();
        Connection connection = JDBCUtils.getConnection();
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            ResultSet resultSet = preparedStatement.executeQuery();
            while(resultSet.next()){
                Book book = new Book();
                book.setB_id(resultSet.getString("b_id"));
                book.setB_name(resultSet.getString("b_name"));
                book.setB_describe(resultSet.getString("b_describe"));
                book.setB_photo_1(resultSet.getString("b_photo_1"));
                book.setB_photo_2(resultSet.getString("b_photo_2"));
                book.setB_photo_3(resultSet.getString("b_photo_3"));
                book.setB_photo_4(resultSet.getString("b_photo_4"));
                book.setB_photo_5(resultSet.getString("b_photo_5"));
                book.setB_oldprice(resultSet.getString("b_oldprice"));
                book.setB_newprice(resultSet.getString("b_newprice"));
                book.setB_ISBN(resultSet.getString("b_isbn"));
                book.setB_author(resultSet.getString("b_author"));
                book.setB_publish_company(resultSet.getString("b_publish_company"));
                book.setB_publish_time(resultSet.getString("b_publish_time"));
                list.add(book);
//                System.out.println("4-dao");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return list;
    }

    public Book loadBook(String book_id) {
        String sql = "select * from book where b_id = "+book_id;
        Book book = new Book();
        Connection connection = JDBCUtils.getConnection();
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
//            preparedStatement.setObject(1,book_id);
            ResultSet resultSet = preparedStatement.executeQuery();
            resultSet.next();
            System.out.println(resultSet.getString("b_name"));
            book.setB_id(resultSet.getString("b_id"));
            book.setB_name(resultSet.getString("b_name"));
            book.setB_describe(resultSet.getString("b_describe"));
            book.setB_photo_1(resultSet.getString("b_photo_1"));
            book.setB_photo_2(resultSet.getString("b_photo_2"));
            book.setB_photo_3(resultSet.getString("b_photo_3"));
            book.setB_photo_4(resultSet.getString("b_photo_4"));
            book.setB_photo_5(resultSet.getString("b_photo_5"));
            book.setB_oldprice(resultSet.getString("b_oldprice"));
            book.setB_newprice(resultSet.getString("b_newprice"));
            book.setB_ISBN(resultSet.getString("b_isbn"));
            book.setB_author(resultSet.getString("b_author"));
            book.setB_publish_company(resultSet.getString("b_publish_company"));
            book.setB_publish_time(resultSet.getString("b_publish_time"));
        } catch (SQLException e) {
            e.printStackTrace();
        }
        System.out.println(book.toString());
        return book;
    }
}
