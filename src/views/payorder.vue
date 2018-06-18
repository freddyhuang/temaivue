<template>
<div>
    <div>
	<table cellpadding="0" cellspacing="0" class="success">
		<tr>
			<td>
				<div class="orderSuccess">
					<p><img src="../../static/images/paysucc.png"/>恭喜你成功提交订单！系统已帮你保留商品，时间为10分钟，请在订单有效时间内尽快支付。</p>
					<table>
						<tr>
							<td>剩余时间：</td>
							<td><div id="countdown"></div></td>
						</tr>
					</table>
			   	</div>
				<form id="payorderForm">
					<input type="hidden" name="op" value="pay"/>
					<input type="hidden" name="id" value="${order.id }"/>
					<div class="ordermessage">
						<!-- 倒计时 -->
					    <!-- 订单信息 -->
					  	<div class="orderMessage">
					  		<div class="messageDiv" style="width: 65%">
					  			<font>订单号：{{payData.orderCode}}</font>
					  			<p style="margin-top: 5px">	
					  				<span>订单商品：{{payData.productName}}</span>
				  					<span style="margin-left: 5px">× {{payData.num}}</span>
				  				</p>
					  		</div>
					  		<div class="messageDiv">
					  		<span >应付金额：</span>
					  		<span style="font-size:32px;color:#FF8000;">{{payData.price}}</span>
					  		<span >元</span>
					  		</div>
					  	</div>
					  	
						<div class="selectPayType">
							<div class="order">
								<span class="font_bule">商品信息</span>
								<table class="orderTable">
									<tr>
										<th>商品名称</th>
										<c:if test="${not empty order.transactions[0].standard }">
					    					<th>规格</th>
						    			</c:if>
										<th>使用期限</th>
										<th>数量</th>
										<th>总价</th>
									</tr>
									<tr>
										<td>{{payData.productName}}</td>
										<c:if test="${not empty order.transactions[0].standard }">
					    					<td>${order.transactions[0].standard }</td>
						    			</c:if>
										<td>
											<span>{{payData.expiryDate}}</span>
											<!-- <span>无限期使用</span> -->
										</td>
										<td>{{payData.num}}</td>
										<td>{{payData.price}}元</td>
									</tr>
								</table>
							</div>
						</div>
  						<!-- <c:set var="gifts" value="${order.asset.coupons}"></c:set> -->
						<!-- <c:if test="${not empty gifts}">
							<div class="selectPayType">
								<div class="order">
									<span class="font_bule">使用红包</span>
									<table class="orderTable">
										<thead>
											<tr>
												<th>序号</th>
												<th>金额</th>
											</tr>
										</thead>
										<tbody>
					  						<c:forEach var="gift" items="${gifts}" varStatus="idx">
											<tr>
												<td>${idx.index+1}</td>
												<td><fmt:formatNumber value="${gift.amount}" pattern="#,###.##"></fmt:formatNumber>元</td>
											</tr>
						    				</c:forEach>
										</tbody>
									</table>
								</div>
							</div>
						</c:if> -->
						<div class="selectPayType">
							<span class="font_bule">请选择支付方式</span>
						    <div style="margin: 30px 0 50px 0;">
					    		<div class="bankdiv">
				    				 <span class="bank">
			    						<input type="radio" id="union" name="paytype" checked="checked" v-mode="payType" @click='payType=0'/>
				    					<label for="union"><img src="../../static/images/weixinpay.png" alt="微信" height="57px" width="59px" align="middle" class="bankimg" />
                                        </label>
				    				</span>
				    				<span class="bank">
			    						<input type="radio" id="zfb" name="paytype" checked="checked" v-mode="payType" @click='payType=1'/>
		    							<label for="zfb"><img src="../../static/images/zhifubaologo.png" alt="支付宝" height="40px" width="177px" align="middle" class="bankimg" /></label>
				    				</span>
				    				<span class="bank" style="display: none;">
			    						<input type="radio" id="wft" name="paytype" value="4"/>
		    							<label for="wft"><img src="../../static/images/unionpay.png" alt="网付通" height="40px" width="177px" align="middle" class="bankimg" /></label>
				    				</span>
				    				<c:if test="${cantestpay==true}">
					    				<span class="bank">
			    							<label for="ceshi"><input type="radio" id="ceshi" name="paytype" value="-1"/>测试支付</label>
					    				</span>
				    				</c:if>
					    		</div>
						    </div>
						</div>
						<!-- 确认支付 -->	
						<div class="paybnt_div">
                            
                            <div class="unbuy" id="unstart"  v-show="state.status==2">未开始</div>
                            
                            <input class="pay_bnt" id="pay_bnt" v-show="state.status==0||state.status==1||state.status==3" @click="_pay" type="button" value="确认支付"/>
                        
                            <div class="unbuy" id="unbuy" v-show="state.status==4">已结束</div>

						</div>
					</div>
				</form>
			</td>
			<td class="td_advert" valign="top">
				<div class="div_advertcontent"> 
					<span class="span_adverttext">鼎力赞助</span>
					<a href="http://www.zuoche.com" target="_blank"><span class="zuoche"></span></a>
					<a href="http://xq.zuoche.com/sns/xqdownload/" target="_blank"><span class="xianquan"></span></a>
				</div>
			</td>
		</tr>
	</table>
</div>
<div id="divMask" class="divMask"></div>
<div class="waitpay" id="waitpay">
	<div class="close_div" onclick="closeWaitPay();">&times;</div>
	<div class="loginDiv_title">
		<div id="title_login" class="loginDiv_title_div_sel">付款确认</div>
	</div>
	<div class="waitpay_div" id="div_waitpay">
		<table cellpadding="6" cellspacing="6">
			<tr>
				<td @click="_gomyorder">
					<div class="paywait_cz">
						<p style="font-size: 14px;font-weight: bold;">已完成支付</p>
						<p class="to_mon">查看订单详情</p>
					</div>
				</td>
				<td>
					<div class="paywait_cz">
						<p  style="font-size: 14px;font-weight: bold;">支付遇到问题</p>
						<p onclick="closeWaitPay();" class="to_mon">修改支付方式</p>
					</div>
				</td>
			</tr>
		</table>
	</div>
</div>
</div>
</template>
<script>
import { pay } from "api/payorder";
import Bus from "api/bus";
import login from '@/components/LoginAndRegister/login';
export default {
	data(){
		return {

			product:{},
			state:{},
            params:{},
			payData:{},
			payType:1
		
		}
	},
	created(){

		this.product = this.$store.state.product.id
		? this.$store.state.product
		: JSON.parse(window.localStorage.getItem("product"));

		this.state = this.$store.state.StateDate.status
		? this.$store.state.StateDate
		: JSON.parse(window.localStorage.getItem("StateDate"));

		this.params = this.$store.state.buyDes.title
		? this.$store.state.buyDes
		: JSON.parse(window.localStorage.getItem("buyDes"));
        
       
        this.payData =  this.$store.state.payData.id
		? this.$store.state.payData
		: JSON.parse(window.localStorage.getItem("payData"));
          
	 
	 },
	 mounted(){
		
	
	},
	methods:{
		_pay(){
			const orderId =  this.payData.id; // 订单id
            const payType = this.payType;  // 支付方式 0为微信  1为支付宝
			pay(orderId,payType).then(res=>{
				res = JSON.parse(res)				
				
				if(res.code == 200){
					let result = res.result;
					let orderCode = result.orderCode;
					$("#divMask").show();
					$("#waitpay").show();
					//Bus.$emit('pay',result.alipay);
					if(payType == 1){
						var pay = result.alipay
					}else{
						var pay = result.wxpay
					}
					
					const {href} = this.$router.resolve({
						name: "paypass",
						query: {
							pay:pay,
							payType:payType,
							orderCode:orderCode
						}
					});
					window.open(href, '_blank');
					//this.$router.push({path:"/paypass",pay:{result:result.alipay}});
					
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
 	@import "../../static/css/countdown.css";
  	@import "../../static/css/success.css";
</style>
