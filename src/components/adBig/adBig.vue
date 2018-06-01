<template>
  <div id="image_div" class="flexslider">
		<ul class="slides">
			<!-- <c:forEach items="${banner }" var="a"> -->
				<!-- <li><div class="img"><a href="/temai/${a.currentProduct.no }.html"><img src="/image.jspx?id=${a.picture.id.ordinal }" alt="" /></a></div></li> -->
                <li><div class="img"><a href="/temai/${a.currentProduct.no }.html"><img src="http://www.gztemai.com/image.jspx?id=15b46e94155" alt="" /></a></div></li>
                <li><div class="img"><a href="/temai/${a.currentProduct.no }.html"><img src="http://www.gztemai.com/image.jspx?id=15b46e94155" alt="" /></a></div></li>
			<!-- </c:forEach> -->
		</ul>
	</div>
</template>
<script>
 require('../../api/imageTable.js')
  require('../../api/common.js')
export default {
   
  data(){
      return {

      }
    },
    created(){
      this.$nextTick(function(){
        this._initAdBig();
      });
      this._getadBig();
    },
   mouthed(){
         
  },
    methods:{
     _initAdBig:function (){
		$('#image_div').flexslider({
            animation: "slide",
            direction:"horizontal",
            easing:"swing"
        });
    },
    _getadBig(){
      getadBig().then((res)=>{
        console.log(res);
      })
    }
  }
}
</script>

<style scoped>
</style>

