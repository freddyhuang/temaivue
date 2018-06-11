<template>
    <div>
    	
         <ad-big></ad-big>
         <products></products>
     	
      	
    </div>
</template>
<script>
    
	import adBig from '@/components/adBig/adBig';
	import products from '@/components/products/products';
    export default{
         name: 'Goodlist',
        data(){
            return {
            }
        },
        components:{
			adBig,
			products
        },
        methods:{
        	
        }
    }
</script>
<style scoped>
    .msg_table{width: 100%;}
    .msg_table td{border: none;}
   
</style>

