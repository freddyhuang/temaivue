import { baseUrl } from './config'
/**
商品详情 -6
url：/temai//product/detail?id=00000000001
参数：
请求方式：ajax  post 
-----------------------------
 */
export function getProductsDetail(productsId) {

	const url = baseUrl + '/product/detail?id=' + productsId;
	
	return	$.ajax({
		type: "get",
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