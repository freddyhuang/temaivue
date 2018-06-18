import { baseUrl } from './config'
/**
支付---本接口待与平台对接[订单支付成功《定时器每30分钟去扫描平台可下单订单---到第三方平台支付》]
-----------------------------
 */
export function pay(orderId,payType) {

    const url = baseUrl + '/order/pay';
    
    const data =JSON.stringify({
        "orderId":orderId,//订单id
        'type':payType //0 微信 1支付宝
    });
	
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