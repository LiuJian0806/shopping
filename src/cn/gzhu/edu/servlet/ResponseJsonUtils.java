package cn.gzhu.edu.servlet;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
/**
 * 将后台处理完的结果写回前端页面,如jsp页面;
 * 或者可用于在ajax异步调用后台方法,该方法处理完相应业务逻辑之后将结果返回,这个结果即通过这个工具类实现
 */
public class ResponseJsonUtils {
    public static void json(HttpServletResponse response, Object o) throws Exception {
        response.setContentType("text/html;charset=utf-8");
        PrintWriter out = response.getWriter();
//        out.println(o.toString());
//        System.out.println(o.toString());
        out.write(o.toString());
        out.flush();
        out.close();
//        System.out.println("怕是你没有发信息出去");
    }
}

