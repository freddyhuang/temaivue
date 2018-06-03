import { baseUrl } from './config'
/**
3.轮播广告
url：${pageContext.request.contextPath}/temai/index/adBig
参数：
请求方式：ajax  post 
-----------------------------
 */
export function getadBig() {

	const url =baseUrl + '/index/adBig';
	

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