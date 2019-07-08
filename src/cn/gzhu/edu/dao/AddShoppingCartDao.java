package cn.gzhu.edu.dao;

import cn.gzhu.edu.beans.ShoppingCart;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class AddShoppingCartDao {
    public boolean addShoppingcart(ShoppingCart shoppingCart) {
        boolean status = false;
         if(checkExit(shoppingCart)){
             status = updateData(shoppingCart);
         }else{
             status = addNewLine(shoppingCart);
         }
         return status;
    }

    public boolean checkExit(ShoppingCart shoppingCart){
        String sql = "select * from shoppingcart where b_id = "+shoppingCart.getB_id()+" and u_phone = "+shoppingCart.getU_phone()+" and order_status = 1";
        Connection connection = JDBCUtils.getConnection();
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            ResultSet resultSet = preparedStatement.executeQuery();
            if(resultSet.next()){
                return true;
            }else{
                return false;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean updateData(ShoppingCart shoppingCart){
        String sql = "UPDATE shoppingcart set order_num = order_num +"+shoppingCart.getOrder_num()+",order_status ="+shoppingCart.getOrder_status()+" where b_id = "+shoppingCart.getB_id();
        Connection connection = JDBCUtils.getConnection();
        int resultSet = 0;
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            resultSet = preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return resultSet>0?true:false;
    }

    public  boolean addNewLine(ShoppingCart shoppingCart){
        String sql = "insert into shoppingcart values(?,?,?,?,?)";
        int resultSet = 0;
        Connection connection = JDBCUtils.getConnection();
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setObject(1,shoppingCart.getOrder_id());
            preparedStatement.setObject(2,shoppingCart.getB_id());
            preparedStatement.setObject(3,shoppingCart.getU_phone());
            preparedStatement.setObject(4,shoppingCart.getOrder_num());
            preparedStatement.setObject(5,shoppingCart.getOrder_status());
            resultSet = preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return resultSet>0?true:false;
    }
}
