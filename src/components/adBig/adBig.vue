<template>
  <div id="image_div" class="flexslider">
		<ul class="slides">
			<li v-for="item in adBig">
        <div class="img">
          <a href="javascript:;">
            <img :src="item.img" alt="" />
          </a>
        </div>
      </li>	
		</ul>
	</div>
</template>
<script>
import {getadBig} from 'api/adBig'
require("../../api/imageTable.js")
export default {
   
  data(){
      return {
        adBig:[]
      }
    },
    created(){
      this.$nextTick(function(){
        this._getadBig();
      });
     
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
        if(res.code == 200){
          const result = res.result;
          this.adBig = result
          setTimeout(()=>{
            this._initAdBig();
          },0)
        }
      })
    }
  }
}
</script>

<style scoped>
</style>

