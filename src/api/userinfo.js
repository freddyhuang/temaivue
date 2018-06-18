import { baseUrl } from './config'
/**
更新个人信息
-----------------------------
 */
export function updateUserinfo() {

    const url = baseUrl + '/user/getInfo';
    
    
	return	$.ajax({
		type: "POST",
		url: url,
		contentType: "application/json",
		success: function(data){
			return Promise.resolve(data)
		},
		error:function(error){
			return Promise.reject(error)	
		}
	});

}

/**
16.修改手机号码
url：http://192.168.0.112:8080/ticketsWeb/temai/user/updatePhone
参数：{“phone”:”13934415645”}//新手机号码
请求方式：post json 
返回数据：
{
“success”：true,//true成功 false失败
“code”:200,//200成功 500失败
“msg”:”修改成功”, //若500，”修改失败” 输入框需要回显原来的旧手机号
“result”:null
}
-----------------------------
 */
export function updatePhone(phone) {

    const url = baseUrl + '/user/updatePhone';
    
    let data = {
        phone:phone
    }
	return	$.ajax({
		type: "POST",
		url: url,
		contentType: "application/json",
		success: function(data){
			return Promise.resolve(data)
		},
		error:function(error){
			return Promise.reject(error)	
		}
	});

}

/**
17.修改密码
user/changePassword

参数：{“oldP”:”123456”,”newP”:”12345678”} //请先做必要的验证：长度（6位以上），两次

 */
export function updatePassword(oldP,newP) {

    const url = baseUrl + '/user/changePassword';
    
    let data = {
        oldP:oldP,
        newP:newP
    }
	return	$.ajax({
		type: "POST",
		url: url,
		contentType: "application/json",
		success: function(data){
			return Promise.resolve(data)
		},
		error:function(error){
			return Promise.reject(error)	
		}
	});

}
