<template>
    <div>
    	<nav-header></nav-header>
         <ad-big></ad-big>
         <products></products>
     	
      	<nav-footer></nav-footer>
    </div>
</template>
<script>
    
	import NavHeader from '@/components/header/header';
	import NavFooter from '@/components/footer/footer';
	import adBig from '@/components/adBig/adBig';
	import products from '@/components/products/products';
    export default{
         name: 'Goodlist',
        data(){
            return {
				
				priceChecked:"all",//控制选中价格范围
				filterBy:false,//控制价格是否显示(屏幕达到一定宽度)
				overLayFlag:false //控制遮罩层
            }
        },
        components:{
        	NavHeader,
        	NavFooter,
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

