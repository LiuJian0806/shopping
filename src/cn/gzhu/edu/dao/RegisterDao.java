package cn.gzhu.edu.dao;

import cn.gzhu.edu.beans.User;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class RegisterDao {
    public boolean register(User user){
        String sql = "insert into users values(?,?,?,?,?,?,?)";
        int resultSet = 0;
        Connection connection = JDBCUtils.getConnection();
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setObject(1,user.getUpet_name());
            preparedStatement.setObject(2,user.getUphone());
            preparedStatement.setObject(3,user.getUpsw());
            preparedStatement.setObject(4,user.getUage());
            preparedStatement.setObject(5,user.getUsex());
            preparedStatement.setObject(6,user.getUaddress());
            preparedStatement.setObject(7,user.getUjoin_time());
            resultSet = preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return resultSet>0?true:false;
    }
}
