//string 转 JSON
function change(str) {
	var reg = new RegExp("=","g");
	str = str.replace(reg,":");
	var str1 = "";
	for (var i = 0; i < str.length; i++) {
		if (str[i] == ":" || str[i] == ",") {
			str1 = str1 + "'" + str[i] + "'";
			if(str[i] == ","){
				i+=1;
			}
		} else {
			if (str[i] == "{" || str[i] == "}") {
				if (str[i] == "{") {
					str1 = str1 + str[i] + "'";
				} else {
					str1 = str1 + "'" + str[i];
					break;
				}
			} else {
				if(str[i] == ""){
					continue;
				}else{
					str1 = str1 + str[i];
				}
			}
		}
		// console.log("str=" + str[i] + "    str1=" + str1);
	}
	// console.log(encodeURIComponent(str1));	//查看编码序列
	// return JSON.parse(str1);
	str1 = eval("(" + str1 + ")"); 	//转换JSON对象
	// alert(typeof str1);
	// alert("pet_name="+str1.pet_name)
	return str1;
}

//封装Cookie
function SetCookie(json) {
	console.log(json);
	   var cookie = "";
	   var time = new Date();
	   time.setTime(time.getTime()+7*24*60*60*1000); 	//设定七天有效期
		for(var key in json){
			cookie = key+"="+json[key]+";expires="+time.toUTCString()+";path=/";
			document.cookie = cookie;
		}
	   console.log(document.cookie);
}
//查找cookie中的特定值
function getCookie(key){
	var arrcookie = document.cookie.split("; ");//分割
	//遍历匹配
	for ( var i = 0; i < arrcookie.length; i++) {
		var arr = arrcookie[i].split("=");
		if (arr[0] == key){
			return arr[1];
			break;
		}else {
			continue;
		}
	}
}
//删除cookie
function deleteCookie(key) {
	var time = new Date(); //获取时间
	time.setTime(time.getTime() - 1*24*60*60*1000);	//设置cookie有效时间为-1天，已到达删除cookie的目的
	var value = getCookie(key);
	if(value != null) {
		document.cookie= key + "="+value+";expires="+time.toUTCString()+";path=/";
		// document.cookie= key + "="+value+";expires=-1;path:/";
	}
}

//批量删除cookie
function deleteCookieGroup(arr) {
	   for(var temp in arr){
	   		deleteCookie(arr[temp]);
	   }
}

//string转换arrString
function transitionArrString(data) {
	    data = data.replace("[","");
	    data = data.replace("]","");
		var arrData = new Array();
		var count = 0;
		for (var i = 0; i < data.length; i++) {
			if (data[i] == "}") {
				arrData[count] = arrData[count] + data[i];
				count++;
			} else {
				if ((data[i] == "," && data[i + 1] == "{") || data[i] == "") {
					continue;
				} else {
					if (data[i] == "{") {
						arrData[count] = "";
					}
					arrData[count] = arrData[count] + data[i];
				}
			}
		}
		// arrData.pop();
		return arrData;
}

//数组转json数组
function arrToJson(data) {

	  data.forEach(function (temp) {
		    change(temp);
	  })
}
