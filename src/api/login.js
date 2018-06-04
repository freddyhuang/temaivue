import { baseUrl } from './config'

export function sendMailCode(email){ // 发送电子邮件验证码
	const url = baseUrl + '/verifycode/forRegister'
	const params = JSON.stringify({
		email:email
	})
	// return axios({
	// 	method: 'post',
	// 	url: url,
		
	// 	data:params
	// 	})
	// 	.then((res) => {

	// 		return Promise.resolve(res.data)
	// 	})
	// 	.catch((error) => {

	// 		return Promise.reject(error)
	// 	});
		return	$.ajax({
				type: "POST",
				url: url,
				data:params,
				dataType: "json",
				contentType: "application/json",
				success: function(data){
					return Promise.resolve(res.data)
				},
				error:function(er){
					return Promise.reject(error)	
				}
			});
	}
	
/**
  获取图片验证码

 */
	export function verifycode(){
		
		const url = baseUrl + '/verifycode/code'

		return	$.ajax({
			type: "GET",
			url: url,
			dataType: "xml",
			success: function(data){
				return Promise.resolve(data)
			},
			error:function(error){
				return Promise.reject(error)	
			}
		});
	}

	/**
        验证 图片验证码

 */
  export function sureverifycode(verifyCode){
		console.log(verifyCode)
	const url = baseUrl + '/verifycode/checkVerifyCode?verifyCode=' + verifyCode

	return $.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		success: function(data){
			return Promise.resolve(data)
		},
		error:function(error){
			return Promise.reject(error)
		}
	});
	
}
	
/**
注册
username 用户名 长度30
password 密码 长度20
telephone 手机 需正则验证手机
email 邮箱 长度30（发送邮件验证码接口10）
code 验证码
 */
export function register2(data) {
	const url = baseUrl + '/user/register'
	const params = JSON.stringify(data);

		return	$.ajax({
			type: "POST",
			url: url,
			data:params,
			dataType: "json",
			contentType: "application/json",
			success: function(data){
				return Promise.resolve(res.data)
			},
			error:function(error){
				return Promise.reject(error)	
			}
		});
}

/**
登陆、
username 用户名
password 密码 
code 验证码（图片验证码接口11）
-----------------------------
 */
export function login(loginData) {

	const url = baseUrl + '/user/login';
	const params = JSON.stringify(loginData);

		return	$.ajax({
			type: "POST",
			url: url,
			data:params,
			dataType: "json",
			contentType: "application/json",
			success: function(data){
				return Promise.resolve(res.data)
			},
			error:function(error){
				return Promise.reject(error)	
			}
		});
}

