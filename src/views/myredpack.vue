<template>
   <div>
       	<h3 class="title_td">我的红包</h3>
			<tr>
				<td valign="top">
					<div class="matter_div">
					    <table class="orderTable" >
					    	<tbody>
						    	<!-- <c:forEach items="${list }" var="pack"> -->
								<tr v-for="item in myredpackList" :key="item">
									<td class="leftpack">
										<div class="pack_type" v-if="item.channel == 1">定向红包</div>
										<div class="pack_type" v-else>通用红包</div>
										
										<div class="pack_limitedtime">
											有效期 
												{{item.beginTime}} 至 {{item.overTime}}

												<!-- <fmt:formatDate value="${pack.effectDate}" pattern="yyyy-MM-dd HH:mm"></fmt:formatDate> 至 不限 -->
											
										</div>
									</td>
									<td>
										<div class="pack_limitedtime" v-if="item.status == 0">待生效</div>
										<div class="pack_limitedtime" v-if="item.status == 1">未使用</div>
										<div class="pack_limitedtime" v-if="item.status == 2">已使用</div>
										<div class="pack_limitedtime" v-if="item.status == 3">已过期</div>
									</td>
									<td>
										<div class="pack_type" v-if="item.channel==1">
											<span class="col_amount">
												{{item.money}}元
											</span>
											<a href="javascript:;" class="limitedgoods">（限购“{{item.productName}}”）</a>
										</div>
									</td>
								</tr>
						    	<!-- </c:forEach> -->
					    	</tbody>
					    </table>
					</div>
					<div style="margin: 20px 30px 30px 0;float: right;clear: both;">
						<jsp:include page="/pagebar.jsp" />
					</div>
				</td>
		</tr>
	</div>
</template>
<script>
import { myredpack } from "api/myredpack";

export default {
	data(){
		return {
           
            myredpackList:[]
		}
	},
	created(){
        
	 },
	 mounted(){
		
         this._myredpack();
	},
	methods:{
		_myredpack(){
			
			myredpack().then(res=>{
				res = JSON.parse(res)				
				
				if(res.code == 200){
					let result = res.result;
					this.myredpackList = res.result.data;
					
				}else if(res.code == 500){ // 用户未登录，请登录后再下单
					this.loginBoxFlag = true;
				}else{
					alert(res.msg)
				}
			})
        },

		_gomyorder(){
			this.$router.push({path:"/myorder"});
		}
	
	},
	components:{
	
	}
}
</script>

<style scoped>
  
    @import "../../static/css/myredpack.css"; 
</style>