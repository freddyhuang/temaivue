<template>
  <!-- <c:if test="${fn:length(bottom)>0 }"> -->
		<div class="dibushangping">
			<div class="dibusplb">
				<!-- <c:forEach items="${bottom }" var="a"  varStatus="idx"> -->
					<!-- <c:if test="${idx.index<4 }"> -->
						<a href="javascript:;" v-for="item in adSmall ">
							<img :src="item.img" alt="" @click="_goProductsDetail(item.productId)" />
						</a>
					<!-- </c:if>
				</c:forEach> -->
			</div>
		</div>
	<!-- </c:if> -->
</template>
<script>
import {getadSmall} from 'api/products'
require("../../api/imageTable.js")
export default {
   
  data(){
      return {
        adSmall:[]
      }
    },
    created(){
      this.$nextTick(function(){
        this._getadSmall();
      });
     
    },
    mouthed(){
         
    },
    methods:{
    
    _getadSmall(){
      getadSmall().then((res)=>{
        console.log(res);
        if(res.code == 200){
          const result = res.result;
          this.adSmall = result
         
        }
      })
    },
    _goProductsDetail(productId){ // 跳转详情页

      this.$store.commit("changeProductId", productId);
      this.$router.push({path:"/productsDetail"})

    }
  }
}
</script>
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
