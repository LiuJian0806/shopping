package cn.gzhu.edu.dao;

import cn.gzhu.edu.beans.Administrator;
import cn.gzhu.edu.beans.User;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class LoginCheckDao {
    //用户登录检查
    public User userLoginCheck(String username, String password) {
        String sql = "";
        System.out.println("username="+username+"password="+password);
        if(username.length() == 11){
            sql = "SELECT *  from users where uphone = ? and upsw = ?";
        }else{
            sql = "SELECT *  from users where upet_name = ? and upsw = ?";
        }
        User user = new User();
        Connection connection = JDBCUtils.getConnection();
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setObject(1,username);
            preparedStatement.setObject(2,password);
            ResultSet resultSet = preparedStatement.executeQuery();
            System.out.println("resultSet="+resultSet);
            resultSet.next();
            user.setUpet_name(resultSet.getString("upet_name"));
            user.setUphone(resultSet.getString("uphone"));
            user.setUage(Integer.parseInt(resultSet.getString("uage")));
            user.setUsex(resultSet.getString("usex"));
            user.setUjoin_time(resultSet.getString("ujoin_time"));
            user.setUaddress(resultSet.getString("uaddress"));
            user.setUpsw(resultSet.getString("upsw"));
            //关闭连接
//           JDBCUtils.close(connection,preparedStatement,resultSet);

        } catch (SQLException e) {
            e.printStackTrace();
        }
        System.out.println("到达数据库端="+user.toString());
        return user;
    }

    //管理员登录检查
    public Administrator manageLoginCheck(String username, String password){
        System.out.println("管理员访问！");
        String sql = "SELECT *  from manage where m_id = ? and m_password = ?";
        Administrator administrator = new Administrator();
        Connection connection = JDBCUtils.getConnection();
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setObject(1,username);
            preparedStatement.setObject(2,password);
            ResultSet resultSet = preparedStatement.executeQuery();
            resultSet.next();
            administrator.setM_id(resultSet.getString("m_id"));
            administrator.setM_name(resultSet.getString("m_name"));
            administrator.setM_password(resultSet.getString("m_password"));
            System.out.println(administrator.getM_id()+"=="+administrator.getM_name());
//            JDBCUtils.close(connection,preparedStatement,resultSet);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return administrator;
    }
}
