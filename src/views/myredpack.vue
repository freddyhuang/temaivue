<template>
   <div>
       	<h3 class="title_td">我的红包</h3>
					<div class="matter_div">
                        <td class="leftpack">
                            <div class="pack_type">${pack.type.name }</div>
                            <div class="pack_limitedtime">
                                有效期 <c:choose>
                                <c:when test="${not empty pack.expiryDate}">
                                    <fmt:formatDate value="${pack.effectDate}" pattern="yyyy-MM-dd HH:mm"></fmt:formatDate> 至 <fmt:formatDate value="${pack.expiryDate}" pattern="yyyy-MM-dd HH:mm"></fmt:formatDate>
                                </c:when>
                                <c:otherwise>
                                    <fmt:formatDate value="${pack.effectDate}" pattern="yyyy-MM-dd HH:mm"></fmt:formatDate> 至 不限
                                </c:otherwise>
                            </c:choose>
                            </div>
                        </td>
                        <td>
                            <div class="pack_limitedtime">${pack.state.name }</div>
                        </td>
                        <td>
                            <div class="pack_type">
                            <span class="col_amount"><fmt:formatNumber value="${pack.amount/100 }" pattern="#,###.##"></fmt:formatNumber>元</span>
                            <c:if test="${pack.type.id ==2}"><a href="/temai/${pack.product.no }.html" class="limitedgoods">（限购“${pack.product.name}”）</a></c:if>
                            </div>
                        </td>
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
           
            myredpackList:{}
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