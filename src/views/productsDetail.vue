<template>
  <div>
	<table cellpadding="0" cellspacing="0" class="detailsTop">
		<tr>
			<td width="360px">
				<img style="width: 360px;height: 360px;" src="/image.jspx?id=${product.titleImage.id }" alt="" />
			</td>
			<td width="640px">
				<div class="detailsMsg">
					<p class="goodName">${product.name }</p>
					<p class="goodMsg">${product.desc }</p>
					<p class="goodDeadline">
						 <!-- 使用期限：<c:choose>
							 <c:when test="${null != product.expiryTime }"> 
								<span><fmt:formatDate value='${product.expiryTime }' pattern='yyyy-MM-dd HH:mm'/></span>
							 </c:when>
							<c:otherwise><span>无限期使用</span></c:otherwise>
						</c:choose> -->
					</p>
					<form action="order.jspx" id="submitForm">
						<input type="hidden" name="id" value="${product.id }"/>
						<div class="goodNum">
							<table >
								<tr>
									<td rowspan="2" width="40px">数量 </td>
									<td rowspan="2">
										<input type="text" class="num_input" readonly="readonly" id="count" name="count" value="1"/>
									</td>
									<td><input type="button" class="num_btn_top" id="" onclick="addCount('top','${product.id }',${product.remaining },${product.limitNum });" value=""/></td>
									<td rowspan="2" style="padding-left: 20px;color: #ccc;">剩余：${product.remaining }个（每位用户限购：${product.limitNum }个） </td>
								</tr>
								<tr>
									<td><input type="button" class="num_btn_bottom" id="" onclick="addCount('bottom');" value=""/></td>
								</tr>
							</table>
						</div>
					</form>
					<div class="goodPrice">
						<!-- <c:set var="oldprice" value="${0}"></c:set>
						<c:set var="promoprice" value="${0}"></c:set> -->
						
						<span class="price_span" id="price_span">
							<!-- <c:forEach items="${product.prices }" var="p">
								<c:choose>
									<c:when test="${ 2 == p.type.id }">
										<c:set var="promoprice" value="${p.amount}"></c:set>
									</c:when>
									<c:when test="${ 1 == p.type.id }">
										<c:set var="oldprice" value="${p.amount}"></c:set>
									</c:when>
								</c:choose>
							</c:forEach> -->
<!-- 							
							<c:choose>
								<c:when test="${product.state.id==5 || product.state.id==6}">
									抢购价：<span class="price_sign">¥</span>
									<span class="now_price"><fmt:formatNumber value="${promoprice/100}" pattern="####.##"></fmt:formatNumber></span>
									<span class="old_price">原价：¥<fmt:formatNumber value="${oldprice/100}" pattern="####.##"></fmt:formatNumber></span>
								</c:when>
								<c:otherwise>
								特卖价：<span class="price_sign">¥</span>
									<span class="now_price"><fmt:formatNumber value="${oldprice/100}" pattern="####.##"></fmt:formatNumber></span>
								<span class="old_price">抢购价：¥<fmt:formatNumber value="${promoprice/100}" pattern="####.##"></fmt:formatNumber></span>
								</c:otherwise>
							</c:choose> -->
						</span>
						<!-- <c:choose>
							<c:when test="${5==product.state.id}"> -->
								<!-- 抢购前 -->
								<span class="unbuybtn_span" id="willbuy">即将开抢</span>
							<!-- </c:when>
							<c:when test="${6==product.state.id}"> -->
								<!-- 抢购中 -->
								<span class="buybtn_span" id="willbuy" onclick="$('#submitForm').submit();">1元抢购优惠资格</span>
							<!-- </c:when>
							<c:when test="${1 == product.state.id }"> -->
								<span class="unbuybtn_span" id="willbuy">即将开售</span>
							<!-- </c:when>
							<c:when test="${2 == product.state.id}"> -->
								<!-- <c:if test="${null != user && canBuy }"> -->
									<span class="buybtn_span" id="buybtn_span" onclick="$('#submitForm').submit();">购买</span>
								<!-- </c:if>
								<c:if test="${null != user && !canBuy }">
									<c:if test="${0 == product.remaining  }"><span class="unbuybtn_span" id="unbuybtn_span">已抢光</span></c:if>
									<c:if test="${0 != product.remaining  }"><span class="unbuybtn_span" id="unbuybtn_span">立即抢购</span></c:if>
								</c:if> -->
								<!-- <c:if test="${null == user}"> -->
									<span class="unbuybtn_span" id="loginbuybtn_span" style="cursor: pointer;" onclick="loginDiv.showLogin();">立即登录抢购</span>
								<!-- </c:if>
							</c:when> -->
							<!-- <c:when test="${3 == product.state.id || 4 == product.state.id}">
								<span class="unbuybtn_span" id="unbuy">已结束</span>
							</c:when> -->
						<!-- </c:choose> -->
					</div>
					<div class="goodLestTime">
						<table>
							<!-- <c:choose>
								<c:when test="${5 == product.state.id }"> -->
									<tr id="upTime">
										<td width="208px" id="countdown_td"><div id="countup"></div></td>
										<td width="60px" align="left">后开抢</td>
										<td class="proper_num">&nbsp; 已有<span>10000</span>人登记抢购 </td>
										<td>分享至&or;&nbsp;</td>
									</tr>
								<!-- </c:when> -->
								<!-- <c:when test="${6 == product.state.id }">
									<tr id="upTime">
										<td width="208px" id="countdown_td"><div id="countup"></div></td>
										<td width="60px" align="left">后截止抢购</td>
										<td class="proper_num">&nbsp;<%-- 已有<span>10000</span>人登记抢购 --%></td>
										<td><%-- 分享至&or; --%>&nbsp;</td>
									</tr>
								</c:when> -->
								<!-- <c:when test="${1 == product.state.id }">
									<tr id="upTime">
										<td width="208px" id="countdown_td"><div id="countup"></div></td>
										<td width="60px" align="left">后开售</td>
										<td class="proper_num">&nbsp;<%-- 已有<span>10000</span>人登记抢购 --%></td>
										<td><%-- 分享至&or; --%>&nbsp;</td>
									</tr>
								</c:when> -->
								<!-- <c:when test="${2 == product.state.id }">
									<tr id="downTime">
										<td width="30px">还剩</td>
										<td width="208px" id="countdown_td"><div id="countdown"></div></td>
										<td width="30px" align="left">结束</td>
										<td class="proper_num">&nbsp;<%-- 已有<span>10000</span>人登记抢购 --%></td>
										<td><%-- 分享至&or; --%>&nbsp;</td>
									</tr>
								</c:when> -->
								<!-- <c:otherwise>
									<tr id="downTime">
										<td width="70px">活动已结束</td>
										<td width="208px" id="countdown_td"><div id="countover"></div></td>
										<td class="proper_num">&nbsp;<%-- 已有<span>10000</span>人登记抢购 --%></td>
										<td><%-- 分享至&or; --%>&nbsp;</td>
									</tr>
								</c:otherwise>
							</c:choose> -->
						</table>
					</div>
				</div>
			</td>
		</tr>
	</table>
	<table cellpadding="0" cellspacing="0" class="details_table">
		<thead>
			<tr>
				<th width="150px">
					<div onclick="selectType($(this),'goodDetails');" class="select_th">商品详情</div>
				</th>
				 <th width="150px">
					<div onclick="selectType($(this),'comment');">累计评论 <span style="color: red;">1000</span></div>
				</th>
				<th width="150px">
					<div onclick="selectType($(this),'orderRecord');" id="orderRecordTitle">成交记录 <span style="color: red;">${list.count }</span>条</div>
				</th>
				<th width="150px">
					<div onclick="selectType($(this),'service');">服务详情</div>
				</th>
				<th width="150px">
					<div onclick="selectType($(this),'presalerecored');">预购记录 <span style="color: red;">${fn:length(presalse) }</span>条</div>
				</th>
				<th width="400px"></th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td colspan="5">
					<!-- 商品详情 -->
					<div id="goodDetails" class="goodDetails detail_div">${product.productDetail }</div>
					<!-- 累计评论 -->
					 <div id="comment" class="comment detail_div">
						<table>
							<tr>
								<td>
									<div class="commentDiv">
										<div class="commentUserName">用户135****6178</div>
										<div class="commentTime">2014-12-12 8:00</div>
										<div class="commentContent">很划算，超值，希望多搞点东西特卖，支持！</div>
									</div>
								</td>
							</tr>
					    </table>
					</div> 
					<!-- 成交记录 -->
					<div id="orderRecord" class="orderRecord detail_div">
                    	<table width="1000px">
                    		<tr>
                    			<td width="150px" class="orderRecordTitle">用户</td>
                    			<td width="150px" class="orderRecordTitle">销售价格</td>
                    			<td width="150px" class="orderRecordTitle">数量</td>
                    			<td width="150px" class="orderRecordTitle">成交时间</td>
                    			<td width="400px" style="height:35px;font-weight: bold;">
                    				<span style="margin-left: 50px">商品名称</span>
                    			</td>
                    		</tr>
                    		<!-- <c:forEach items="${list }" var="t">
	                    		<tr>
	                    			<td width="120px" class="orderRecordContent">${tu:secMobile(t.user.name )}</td>
	                    			<td width="150px" class="orderRecordContent">${t.amount/100 }元</td>
	                    			<td width="150px" class="orderRecordContent">${t.count }件</td>
	                    			<td width="150px" class="orderRecordContent">
	                    				<fmt:formatDate value='${t.createTime }' pattern='yyyy-MM-dd HH:mm'/>
	                    			</td>
	                    			<td width="370px" style="height:80px;">
	                    				<span style="margin-left: 30px">${t.product.name }</span>
	                    			</td>
	                    		</tr>
                    		</c:forEach> -->
                    		<tr><td colspan="5" style="border: none;" align="right"><jsp:include page="/pagebar.jsp" /></td></tr>
                    	</table>
					</div>
					<!-- 服务详情 -->
					<div id="service" class="service detail_div"><div class="serviceDiv" style="box-sizing:border-box;">${product.serviceDetail }</div></div>
					<div id="presalerecored" class="service presalerecored_div detail_div">
						
						<!-- <c:choose>
							<c:when test="${not empty presalse}"> -->
								<div class="packrecord">
									<table width="1000px">
		                    		<tr>
		                    			<td width="150px" class="orderRecordTitle">用户</td>
		                    			<td width="150px" class="orderRecordTitle">抢购价格</td>
		                    			<td width="150px" class="orderRecordTitle">数量</td>
		                    			<td width="150px" class="orderRecordTitle">成交时间</td>
		                    			<td width="400px" style="height:35px;font-weight: bold;">
		                    				<span style="margin-left: 50px">商品名称</span>
		                    			</td>
		                    		</tr>
		                    		<!-- <c:forEach items="${presalse }" var="t"> -->
			                    		<tr>
			                    			<td width="120px" class="orderRecordContent">${tu:secMobile(t.user.name )}</td>
			                    			<td width="150px" class="orderRecordContent">${t.amount/100 }元</td>
			                    			<td width="150px" class="orderRecordContent">${t.count }件</td>
			                    			<td width="150px" class="orderRecordContent">
			                    				<fmt:formatDate value='${t.createTime }' pattern='yyyy-MM-dd HH:mm'/>
			                    			</td>
			                    			<td width="370px" style="height:80px;">
			                    				<span style="margin-left: 30px">${t.product.name }</span>
			                    			</td>
			                    		</tr>
		                    		<!-- </c:forEach> -->
		                    	</table>
								</div>
							<!-- </c:when>
							<c:otherwise> -->
								<div class="serviceDiv">没有预购记录</div>
							<!-- </c:otherwise>
						</c:choose> -->
					</div>
				</td>
			</tr>
		</tbody>
	</table>
</div>
</template>
<script>
import { getProductsDetail } from "api/productsDetail";
export default {
	data(){
		return {

		}
	},
	created(){
	  this._getProductsDetail(productsId);//获取登录的图片验证码
 	 },
	mouthed(){
		
	},
	methods:{
		_getProductsDetail(productsId){
			getProductsDetail(productsId).then(res=>{
				console.log(res)
			})
		}
	}
}
</script>
<style scoped>
 @import "../../static/css/countdown.css";
  @import "../../static/css/details.css";
</style>

