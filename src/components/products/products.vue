<template>
  <!-- <c:if test="${fn:length(bottom)>0 }"> -->
		<div class="dibushangping">
			<div class="dibusplb">
				<!-- <c:forEach items="${bottom }" var="a"  varStatus="idx"> -->
					<!-- <c:if test="${idx.index<4 }"> -->
						<a href="/temai/${a.currentProduct.no }.html">
							<img src="http://www.gztemai.com/image.jspx?id=15c679c825f" alt="" />
						</a>
                        <a href="/temai/${a.currentProduct.no }.html">
							<img src="http://www.gztemai.com/image.jspx?id=15c679c825f" alt="" />
						</a>
                        <a href="/temai/${a.currentProduct.no }.html">
							<img src="http://www.gztemai.com/image.jspx?id=15c679c825f" alt="" />
						</a>
					<!-- </c:if>
				</c:forEach> -->
			</div>
		</div>
	<!-- </c:if> -->
</template>
<style scoped>
 .dibusplb{
        display: -webkit-box;;
        display: box;
        display: -webkit-flex;
        display: -moz-flex;
        display: -ms-flex;
        display: flex;
        -webkit-justify-content: space-between;
        -ms-justify-content: space-between;
        -moz-justify-content: space-between;
        justify-content: space-between;
    }
    .dibusplb a{
        width: 24.8%;
        width: calc(25% - 5px);
        height: 80px;
        
    }
    .dibusplb img{
        width: 100%;
    }
    .dibushangping{
        width:70%;
        margin: 0 auto;
        overflow: hidden;
        height: 170px;
    }
    @media only screen and (max-width: 767px) {
	.dibushangping{
        width:100%;
       
    }
    }
</style>
