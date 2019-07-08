package cn.gzhu.edu.service;

import cn.gzhu.edu.beans.*;
import cn.gzhu.edu.dao.*;

import java.util.List;

public class Service {

    //注册
    public boolean register(User user) {
        RegisterDao registerDao = new RegisterDao();
         boolean registerSuccess = registerDao.register(user);
         return registerSuccess;
    }
    //手机号检查
    public boolean phoneCheck(String phone){
        PhoneCheckDao phoneCheckDao = new PhoneCheckDao();
        boolean phoneHas = phoneCheckDao.IsThisPhone(phone);
        return phoneHas;
    }
    //用户登录
    public User userLoginCheck(String username, String password) {
        LoginCheckDao loginCheckDao = new LoginCheckDao();
        System.out.println("到达服务窗！");
        User user = loginCheckDao.userLoginCheck(username,password);
        return user;
    }

    //管理员登录
    public Administrator manageLoginCheck(String username, String password) {
        LoginCheckDao loginCheckDao = new LoginCheckDao();
        System.out.println("到达服务窗！");
        Administrator administrator = loginCheckDao.manageLoginCheck(username,password);
        return administrator;
    }
    //添加图书
    public  boolean addBooks(Book book){
        AddBookDao addBookDao = new AddBookDao();
           boolean result = addBookDao.addBooks(book);
           return result;
    }
    //加载商品
    public List<Book> loadCommodity() {
        LoadBookDao loadBookDao = new LoadBookDao();
        return loadBookDao.loadCommodity();
    }
    //加载图书
    public Book loadBook(String book_id){
        LoadBookDao loadBookDao = new LoadBookDao();
        return loadBookDao.loadBook(book_id);
    }

    public boolean addShoppingCart(ShoppingCart shoppingCart) {
        AddShoppingCartDao addShoppingCartDao = new AddShoppingCartDao();
        return addShoppingCartDao.addShoppingcart(shoppingCart);
    }

    public List<ShoppingCartNews> loadShoppingCartNews(String phone) {
        LoadShoppingCartNewsDao loadShoppingCartNewsDao = new LoadShoppingCartNewsDao();
        return loadShoppingCartNewsDao.loadShoppingCartNews(phone);
    }

    public List<Book> searchCommidity(String search_item) {
        SearchCommocityDao searchCommocityDao = new SearchCommocityDao();
        return searchCommocityDao.searchCommodity(search_item);
    }
}
