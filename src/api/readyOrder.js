import { baseUrl } from './config'
/**

-----------------------------
 */
export function orderSubmit(orderData) {
	console.log(orderData)
    const url = baseUrl + '/order/submit';
    
    const data = JSON.stringify(orderData);
	
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