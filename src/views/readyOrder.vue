<template>
  <div>
	<table cellpadding="0" cellspacing="0" class="success">
		<tr>
			<td>
				<form id="orderForm">
					
					<div class="ordermessage">
							<!-- 倒计时 -->
							<div style="height: 50px">
						
								<nav v-if="state.status==0">
									<div class="top">距离抢购开始时间还有</div>
									<div style="width: 208px;height: 60px;float: left;"  id="countup"></div>
								</nav>
								<nav v-else-if="state.status == 1">
									<div class="top">距离抢购截止时间还有</div>
									<div style="width: 208px;height: 60px;float: left;"  id="countup"></div>
								</nav>
								<nav v-else-if="state.status == 2">
									<div class="top">距离购买开始时间还有</div>
									<div style="width: 208px;height: 60px;float: left;"  id="countup"></div>
								</nav>
								<nav v-else-if="state.status == 3">
									<div class="top">距离购买截止时间还有</div>
									<div style="width: 208px;height: 60px;float: left;"  id="countdown"></div>
								</nav>
								<nav v-else>
									<div class="top">活动已结束</div>
									<div style="width: 208px;height: 60px;float: left;"  id="countover"></div>
								</nav>
							
					    	</div>
						<!-- 支付方式 -->
						<div class="selectPayType">
							<!-- 确认订单 -->
							<div class="order">
								<span class="font_bule">确认商品</span>
								<table class="orderTable">
									<tr>
										<th>商品名称</th>
										<th>使用截止期限</th>
										<th>数量</th>
										<th>总价</th>
									</tr>
									<tr>
										<td><a target="_blank" >{{product.name}}</a></td>
										<td>
											<span v-if=" product.expiryDate != null">{{product.expiryDate}}</span>
							
											<span v-else>无限期使用</span>
						
										</td>
										<td>{{params.num}}</td>
										<td>¥{{product.purchasePrice * params.num}}</td>
									</tr>
									<!-- <c:if test="${not empty product.standards }">
										<tr>
											<td width="263">请选择商品规格</td>									
											<td align="left" colspan="3" class="standards" valign="middle">
												<c:forEach var="s" items="${product.standards }" varStatus="idx">
													<label for="standards_${idx.index }"><input <c:if test="${idx.index==0 }">checked="checked"</c:if>  id="standards_${idx.index }" type="radio" name="standards" value="${s }"/>${s }</label>
												</c:forEach>
											</td>									
										</tr>
									</c:if> -->
								</table>
							</div>
							<span class="font_bule">请选择支付方式</span>
						    <div style="margin: 30px 0 50px 0;">
					    		<div class="bankdiv">
				    				<span class="bank">
			    						<input type="radio" id="union" name="paytype" checked="checked" value="1"/>
				    					<label for="union"><img src="/images/unionpay.png" alt="银联" height="40px" width="162px" align="middle" class="bankimg" ></img></label>
				    				</span>
				    				<span class="bank">
			    						<input type="radio" id="zfb" name="paytype" value="2"/>
		    							<label for="zfb"><img src="/images/zhifubaologo.png" alt="支付宝" height="40px" width="177px" align="middle" class="bankimg" ></img></label>
				    				</span>
					    		</div>
						    </div>
						 <table class="allpaytb">
						   		<c:if test="${empty oldproduct}">
						    	<tr>
						    		<td colspan="2">
						    			<c:if test="${(not empty redpack && redpack[0].product.id.id == product.id.id ) || (not empty genpack && empty oldproduct)}">
							    			<div class="useablepack" id="mUseablepack">
								    			<c:if test="${not empty redpack && redpack[0].product.id.id == product.id.id}">
									    			<div class="redpacktitle">使用定向红包（限购当前商品，超额使用不返现）</div>
								    				<div>
								    					<div class="packitem"><label><input checked="checked" class="redpack_dir" data-type="定向红包" value="" data-amount="${0}" type="radio" name="drtredpack"/>不使用定向红包
									    					</label>
									    				</div>
									    				<c:forEach var="pack" items="${redpack}">
										    				<div class="packitem"><label><input class="redpack_dir" data-type="定向红包" value="${pack.id }" data-amount="${pack.amount/100 }" type="radio" name="drtredpack"/>
										    					<span style="color: #FF7F00;font-weight: bold;"> <fmt:formatNumber value="${pack.amount/100}" pattern="#,###.##"/> </span>元
										    				</label>
										    			</div>
									    				</c:forEach>
								    				</div>
								    			</c:if>
							    			<c:if test="${not empty genpack && empty oldproduct}">
						    					<div>
									    			<div class="redpacktitle" >使用通用红包（适用于所有商品，超额使用不返现）</div>
						    						<div class="packitem">
						    						<label><input checked="checked" class="redpack_dir" data-type="通用红包" value="" data-amount="${0}" type="radio" name="genredpack"/>不使用通用红包
								    				</label>
								    				</div>
								    				<c:forEach var="pack" items="${genpack}">
									    				<div class="packitem"><label><input class="redpack_gen" data-type="通用红包" value="${pack.id }" data-amount="${pack.amount/100 }" type="radio" name="genredpack"/>
									    					<span style="color: #FF7F00;font-weight: bold;"> <fmt:formatNumber value="${pack.amount/100}" pattern="#,###.##"/> </span>元，使用期限：
									    					<c:choose>
									    						<c:when test="${empty pack.expiryDate}">无期限限制</c:when>
									    						<c:otherwise>
									    							<fmt:formatDate value="${pack.expiryDate}" pattern="yyyy-MM-dd HH:mm"/>过期
									    						</c:otherwise>
									    					</c:choose>
									    				</label>
									    			</div>
								    				</c:forEach>
						    					</div>
							    			</c:if>
							    			</div>
						    			</c:if>
						    		</td>
						    	</tr>
						    	</c:if> 
						    	<tr>
						    		<td class="snaptips" style="width: 400px;">
									    <c:set var="promoprice" value="${0}"></c:set>
						    			<c:if test="${not empty oldproduct}">
											<c:forEach items="${oldproduct.prices }" var="p">
												<c:if test="${ 2 == p.type.id }">
													<c:set var="promoprice" value="${p.amount}"></c:set>
												</c:if>
											</c:forEach>
						    			<span class="col_price"><fmt:formatNumber value="${product.salePrice.amount/100 }" pattern="#,###.##"/></span>元 抢购${product.name }后，将获得<span class="col_price"><fmt:formatNumber value="${(oldproduct.salePrice.amount - promoprice)/100  }" pattern="#,###.##"/></span>元红包，开售购买时可减扣金额。
						    			</c:if>
						    		</td>
						    		<td>
										<div class="allpays">
											<span style="font-size: 14px;">总计支付：</span>
											<span class="font_org" >¥<span class="font_org" id="mStatAmount" data-amount="${product.salePrice.amount/100 * count}"><fmt:formatNumber value="${(product.salePrice.amount/100) * count}" /></span></span>
										</div>
						    		</td>
						    	</tr>
						    </table>
						</div> 
						<!-- 确认支付 -->	
						<div class="paybnt_div" id="paybnt_div"> 
							 <c:choose>
								<c:when test="${5 == product.state.id }">
									<div class="unbuy" id="unstart">待抢购</div>
								</c:when>
								<c:when test="${6 == product.state.id }">
									<c:if test="${canBuy }">
										<input class="pay_bnt" id="pay_bnt" type="button" onclick="checkCanBuy(${count },'${product.id }');" value="提交订单"/>
									</c:if>
									<c:if test="${!canBuy }">
										<input class="unpay_bnt" id="unpay_bnt" type="button" value="提交订单"/>
									</c:if>
								</c:when>
								<c:when test="${1 == product.state.id }">
									<div class="unbuy" id="unstart">未开始</div>
								</c:when>
								<c:when test="${2 == product.state.id }">
									<c:if test="${canBuy }"> 
										<input class="pay_bnt" id="pay_bnt" type="button" onclick="checkCanBuy(${count },'${product.id }');" value="提交订单"/>
									</c:if>
									<c:if test="${!canBuy }"> 
										<input class="unpay_bnt" id="unpay_bnt" type="button" value="提交订单"/>
									</c:if>
								</c:when>
								<c:when test="${3 == product.state.id || 4 == product.state.id}"> -->
									<div class="unbuy" id="unbuy">已结束</div>
								</c:when>
							</c:choose>
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
		</tr> -->
	</table>
</div>

</template>
<script>
import { orderSubmit } from "api/readyOrder";
export default {
	data(){
		return {

			product:{},
			state:{},
			params:{}
		
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
		console.log(this.params)
	  	this._orderSubmit(this.params); // 提交订单
	 
	 },
	 mounted(){
		
	
	},
	methods:{
		_orderSubmit(params){
			orderSubmit(params).then(res=>{
				console.log(res)
			})
		},
		_goreadyOrder(){
			this.$router.push({path:"/readyOrder"});
		}
	}
}
</script>
<style scoped>
 @import "../../static/css/countdown.css";
  @import "../../static/css/success.css";
</style>

