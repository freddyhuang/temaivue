import axios from 'axios';
import qs from 'qs';
import { baseUrl } from './config'

export function sendMailCode(email){
	const url = baseUrl + '/verifycode/forRegister'
	const data = {
		email:email
	}
		return axios.post(url,data).then((res) => {
			return Promise.resolve(res.data)
	})
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
		return axios.post(url, data).then((res) => {
			return Promise.resolve(res.data)
	})		
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
	const data = qs.stringify({
		username: 13631458340,
		password: 123123,
		code:2365
	});

	return axios.post(url, data).then((res) => {
		return Promise.resolve(res.data)
	})
}

