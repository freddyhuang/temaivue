import { baseUrl } from './config'
/**
我的订单接口
-----------------------------
 */
export function myOrderList() {

    const url = baseUrl + '/order/list';
	
    let myOrderData = {
		"orderId":"",//订单id 若查看订单详情，需要传值；如果查看订单列表，则参数值取空””
		"pageNo":1, //页码，默认从1开始
		"pageSize":10 //每页显示数量
	}  
	
    const data = JSON.stringify(myOrderData);
	
	return	$.ajax({
		type: "POST",
		url: url,
		data:data,
		contentType: "application/json",
		success: function(data){
			return Promise.resolve(data)
		},
		error:function(error){
			return Promise.reject(error)	
		}
	});

}