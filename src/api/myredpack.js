import { baseUrl } from './config'
/**
14.我的红包接口 
-----------------------------
 */
export function myredpack() {

    const url = baseUrl + '/redBag/list';
    const data =JSON.stringify({
		"pageNo":1, //页码，默认从1开始
		"pageSize":10 //每页显示数量
	})
  
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