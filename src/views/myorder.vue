<template>
    <div>	
		<h3 class="title_td">我的订单</h3>
			<tr>
				<td valign="top">

					<div class="matter_div">
						<!-- <label for="all" style="margin-left: 6px;"><input onclick="selectAll()"  type="checkbox" id="all"/>全选</label>
					    <span style="cursor: pointer;" onclick="select($(this));">待付款</span>
					    <span style="cursor: pointer;" onclick="select($(this));">已付款</span>
					    <span style="cursor: pointer;" onclick="select($(this));">退款</span>
					    <span style="float: right;"><a href="#">删除订单</a></span> -->
					    <table class="orderTable" >
					    	<tr>
					    		<!-- <th></th> -->
					    		<th width="400">订单信息</th>
					    		<th>下单时间</th>
					    		<th>订单总额</th>
					    		<th>红包总额</th>
					    		<th>支付金额</th>
					    		<th>状态	</th>
					    		<th>操作</th>
					    	</tr>
					    	<!-- <c:forEach items="${list }" var="order"> -->
								<!-- <nav > -->
						    	<tr v-for="item in orderList" :key="item">
						    		<!-- <td style="border-left:1px solid #CCCCCC">
						    			<input type="checkbox" name="goodsOne"/>
					    			</td> -->
						    		<td style="text-align: left;">
						    		    <a href="/temai/${order.transactions[0].product.no }.html" target="_blank">
						    		    	<img :src="item.img" alt="item.productName"  style="float: left;margin:0 10px;width:100px;height: 100px;"/>
						    		    </a>
						    			<p>
											<a href="/temai/${order.transactions[0].product.no }.html" target="_blank">
											 {{item.productName}}
											</a>
										</p>
						    			<p style="color:#999999;margin-top: 3px;">
											订单号：{{item.orderCode}}
										</p>
						    			<p style="color:#999999;margin-top: 3px;">
						    				期限：<span>{{item.expiryDate}}</span>
						    			</p>
						    			<!-- <c:if test="${ !empty order.transactions[0].tokens[0].content }"> -->
						    				<!-- <p style="color:#FF0000;margin-top: 3px;">
												券号：${order.transactions[0].tokens[0].content }
												<span style="color: #009900;">（${order.transactions[0].tokens[0].state.name }）</span>
											</p> -->
						    			<!-- </c:if> -->
						    			<!-- <c:if test="${not empty order.transactions[0].standard }">
					    				<p>
						    			规格：${order.transactions[0].standard }
					    				</p>
						    			</c:if> -->
					    			</td>
						    		<td>
										<!-- <fmt:formatDate value='${order.createTime }' pattern='yyyy-MM-dd HH:mm'/> -->
										{{item.payTime}}
									</td>
						    		<td>
						    			<!-- <fmt:formatNumber value="${order.amount/100  }" pattern="#,###.##"/>元 -->
										{{item.price}}元
						    		</td>
						    		<td>
						    			<c:set var="packamount" value="${0}"></c:set>
						    			<c:forEach var="gift" items="${order.asset.coupons}">
							    			<c:set var="packamount" value="${packamount+gift.amount}"></c:set>
						    			</c:forEach>
						    			<!-- <c:choose>
						    				<c:when test="${packamount>0}">
							    				<fmt:formatNumber value="${packamount }" pattern="#,###.##"></fmt:formatNumber>元
						    				</c:when> -->
											<span v-if="item.redbagId">{{item.redbagCount}}元</span>
						    				<!-- <c:otherwise>--</c:otherwise> -->
											<span v-else>--</span>
						    			</c:choose>
						    		</td>
						    		<td style="color: red;"><!--支付金额-->
										<!-- <fmt:formatNumber value="${order.payAmount/100  }" pattern="#,###.##"/> -->
										{{item.pay}}
										元
						    		</td>
						    		<td>
										<!--状态 status 0：等待付款 1：支付成功 2:支付失败-->
										<span v-if="item.status == 0" style="color: #009900">等待付款</span>
										<span v-else-if="item.status == 1" style="color: #009900">支付成功</span>
										<span v-else-if="item.status == 2" style="color: #009900">支付失败</span>
									</td>
						    		<td style="border-right:1px solid #CCCCCC">
							    		<!-- <c:if test="${2 == order.state.id || 3 == order.state.id}">
							    			<c:if test="${0 < order.payment.remainTime }"> -->
											<nav v-if="item.status == 0">
												<a class="operate" style="background-color: #FF6600;">
													<font style="color: white; font-weight: bold;line-height: 30px">付款</font>
												</a>
											</nav>
											<!-- </c:if> -->
											<!-- <c:if test="${0 > order.payment.remainTime }">
												<a class="operate" style="background-color: #ccc;">
												<font style="color: white; font-weight: bold;line-height: 30px">付款</font></a>
											</c:if>
							    		</c:if> -->
								    	<!-- <a class="operate" href="">取消</a><br/>
								    	<a class="operate" href="">申请退款</a><br/>
								   		<a class="operate" href="">重新发送短信</a><br/>
								    	<a class="operate" href="">点评</a> -->
									</td>
						    	</tr>
					    	<!-- </c:forEach> -->
							<!-- </nav> -->
					    </table>
					</div>
					<div style="margin: 20px 30px 30px 0;float: right;clear: both;">
						<jsp:include page="/pagebar.jsp" />
					</div>
				</td>
			</tr>
		<login v-show="loginBoxFlag" @changeLoginBoxFlag="_changeLoginBoxFlag"></login>
	</div>
</template>
<script>
import login from '@/components/LoginAndRegister/login';
import { baseUrl } from "api/config";
import {myOrderList } from 'api/myorder'
export default {
    data(){
        return {
			loginBoxFlag:false,
			order:{},
            orderList:[]
        }
    },
    created(){
		this._myOrderList()
	 },
	 mounted(){
		
	
    },
    methods:{

		_myOrderList(){
			myOrderList().then((res) => {
				
				console.log(res)
				res = JSON.parse(res)
				if(res.code == 200){

					this.orderList = res.result.data;

				}else if(res.code == 500){
					if(res.msg == '用户未登录，请登录后再下单'){
						
						this.loginBoxFlag = true;
					}
				}
			})
		},
		_changeLoginBoxFlag(msg){
			console.log(msg)
			this.loginBoxFlag = msg
		}

	},
	components:{
		login
	}
}
</script>

<style scoped>
  
    @import "../../static/css/myorder.css";
</style>
