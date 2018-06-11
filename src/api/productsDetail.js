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

/**
 * 时间倒计时

 */
 function cutdownTime(time){
		//取当前的时间
		var nowDate = new Date();
		var NDs = nowDate.getTime();
		//设置将来的时间
		var futureDate = new Date(time);
		
		var FTs = futureDate.getTime();
		
		var timerDiff = FTs-NDs;
		
		var diffDate = new Date(timerDiff);
		
		//计算出相差天数  
		var days=Math.floor(diffDate/(24*3600*1000))  
	  
		//计算出小时数  
	  
		var leave1=diffDate%(24*3600*1000)    //计算天数后剩余的毫秒数  
		var hours=Math.floor(leave1/(3600*1000))  
		//计算相差分钟数  
		var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数  
		var minutes=Math.floor(leave2/(60*1000))  
		//计算相差秒数  
		var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数  
		var seconds=Math.round(leave3/1000)  
		
		var html = days+"天"+hours+"时"+minutes+"分"+seconds+"秒";
		
		return html;
}

function to(num){
	num>=10?num=num:num='0'+num;
   return num.toString();
}

/**
 备注：（自动倒计时效果）
当前时间now<开始抢购时间 ：**天**时**分         后开抢 即将开抢（灰掉）
开始抢购时间<=当前时间now<截至抢购时间： **天**时**分     后截至抢购 1元抢购资格
截至抢购时间<=当前时间now<开售时间： **天**时**分      后开售 即将开售（灰掉）
开售时间<=当前时间now<停售时间： 还剩**天**时**分       结束 购买
当前时间now>=停售时间:  活动已结束 结束（灰掉）
 */
 
 export function status(openTime,enddingTime,openSaleTime,endSaleTime){
	
	 //取当前的时间
	let now = Date.parse(new Date());
	let openTimeString = new Date(String(openTime).substr(0,10)+"T"+ String(openTime).substr(11,8)).getTime();
	let enddingTimeString = new Date(String(enddingTime).substr(0,10)+"T"+ String(enddingTime).substr(11,8)).getTime();
	let openSaleTimeString = new Date(String(openSaleTime).substr(0,10)+"T"+ String(openSaleTime).substr(11,8)).getTime();
	let endSaleTimeString =  new Date(String(endSaleTime).substr(0,10)+"T"+ String(endSaleTime).substr(11,8)).getTime();

	console.log(now)
	console.log(enddingTimeString)
	 if( now < openTimeString){
  
		const statusTxt = "即将开抢"
		let cutTime = cutdownTime(openTime);
		console.log(cutTime)

		let statusjson = {
			status:0,
			statusTxt:statusTxt,
			cutTime:cutTime
		}

		return statusjson;

	 }else if(Number(openTimeString) <= now && now < Number(enddingTimeString)){

		const statusTxt = "1元抢购资格"
		let cutTime = cutdownTime(enddingTimeString);
		console.log(cutTime)

		let statusjson = {
			status:1,
			statusTxt:statusTxt,
			cutTime:cutTime
		}

		return statusjson;
		
	 }else if( enddingTimeString <= now  && now < openSaleTimeString ){
  
		const statusTxt = "即将开售"
		let cutTime = cutdownTime(openSaleTimeString);
		console.log(cutTime)

		let statusjson = {
			status:2,
			statusTxt:statusTxt,
			cutTime:cutTime
		}

		return statusjson;

	 }else if( openSaleTimeString <= now && now < endSaleTimeString ){
  
		const statusTxt = "购买"
		let cutTime = cutdownTime(endSaleTimeString);
		console.log(cutTime)

		let statusjson = {
			status:3,
			statusTxt:statusTxt,
			cutTime:cutTime
		}

		return statusjson;

	 }else if(  now >= endSaleTimeString ){
  
		const statusTxt = "结束"
		let cutTime = '活动已结束';
		console.log(cutTime)

		let statusjson = {
			status:4,
			statusTxt:statusTxt,
			cutTime:cutTime
		}

		return statusjson;

	 }else{
		 console.log(563)
	 }
 }