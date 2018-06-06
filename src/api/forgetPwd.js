import { baseUrl } from './config'
/**
忘记密码
url：/user/forgetPass
参数：
请求方式：ajax  post 
-----------------------------
 */
export function forgetPwd(params) {

	const url =baseUrl + '/user/forgetPass';
	const data = params

	return	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		contentType: "application/json",
		success: function(data){
			return Promise.resolve(data)
		},
		error:function(error){
			return Promise.reject(error)	
		}
	});

}