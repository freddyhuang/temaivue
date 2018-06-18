import { baseUrl } from './config'
/**
14.我的红包接口 
-----------------------------
 */
export function myredpack() {

    const url = baseUrl + '/redBag/list';
    
  
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