function objToStr(data) {
    data = data || {};
    data.t = new Date().getTime();
    var res = [];
    for(var key in data){
        res.push(encodeURIComponent(key)+"="+encodeURIComponent(data[key]));
    }
    return res.join("&");
}
function aiax(obj) {
    //A转换对象为字符串
    var str = objToStr(obj);
    //创建ajax对象
    var xmlHttp,timer;
    if(window.XMLHttpRequest){
        xmlHttp = new XMLHttpRequest();
    }else{
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP")
    }
    if(option.type.toLocaleString() === "get"){
        xmlHttp.open(obj.type,obj.url+"?"+str,true);
        xmlHttp.send();
    }else{
        xmlHttp.open(obj.type,obj.url,true);
        xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlHttp.send(str);
    }

    // 4.监听状态的变化
    xmlHttp.onreadystatechange = function (ev2) {
        /*
        0: 请求未初始化
        1: 服务器连接已建立
        2: 请求已接收
        3: 请求处理中
        4: 请求已完成，且响应已就绪
        */
        if(xmlHttp.readyState === 4){
            clearInterval(timer);
            // 判断是否请求成功
            if(xmlHttp.status >= 200 && xmlHttp.status < 300 ||
                xmlHttp.status === 304){
                // 5.处理返回的结果
                // console.log("接收到服务器返回的数据");
                obj.success(xmlHttp);
            }else{
                // console.log("没有接收到服务器返回的数据");
                option.error(xmlhttp);
            }
        }
    }
    // 判断外界是否传入了超时时间
    if(obj.timeout){
        timer = setInterval(function () {
            console.log("中断请求");
            xmlHttp.abort();
            clearInterval(timer);
        }, obj.timeout);
    }
}