<template>
<div class="footer">
	<div class="footer_top">
		<div class="footer_top_div">
			<a href="/about.jspx">关于我们</a>
			<span class="footer_line">|</span>
			<a href="/contact.jspx">联系我们</a>
			<span class="footer_line">|</span>
			<a href="/blogroll.jspx">友情链接</a>
			<span class="footer_line">|</span>
			<a href="/help.jspx">帮助中心</a>
		</div>
	</div>
	<div class="footer_botton">
	<span style="color: #fafafa;"><%=ph.getVersion()%>
			<%
				if (null != now) {
					out.print("&nbsp;&nbsp;耗时:");
					out.print(System.currentTimeMillis() - now);
					out.print("ms");
				}
			%></span>
		<div class="footer_botton_div">&copy;2018 gztemai <a href="http://www.miibeian.gov.cn/">粤ICP备15117280号-1</a>
			<p class="tamai_copyRight">版权所有广州市吉金信息科技有限公司</p>
		</div>
	</div>
</div>
</template>

<script>
</script>

<style>
	@import "../../../static/css/footer.css"
</style>