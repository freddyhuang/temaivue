import { baseUrl } from './config'
/**

-----------------------------
 */
export function orderSubmit(params) {

    const url = baseUrl + '/order/submit';
    
    const data = params
	
	return	$.ajax({
		type: "json",
		url: url,
		data:data,
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