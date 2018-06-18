<template>
    <div>
        <h3 v-if="payType==1">正在为你发起支付.....</h3>

        <div class="wx-Contact" v-else>
            <div class="wx-Contact-left">
                <h3>扫一扫付款</h3>
                <div class="photo">
                    <!--微信支付返回参数-->
                    <img :src="weixinPayQR" class="wx-erwema"/>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import { baseUrl } from "api/config";
export default {
    data(){
        return {
            weixinPayQR:'',
            payType:1
        }
    },
    created(){

        //console.log(this.$route.query.pay);
        let pay  = this.$route.query.pay;
        let payType = this.$route.query.payType
        this.payType = payType;

        if(payType == 1){

            const div = document.createElement("div");
            div.innerHTML = pay;
            document.body.appendChild(div);
            document.forms[0].submit();

        }else{

            this.weixinPayQR = baseUrl + '/order/qr_code.img?wxpay='+ pay
            setInterval("ajaxstatus()", 3000);  //微信
        }
      
        
	 },
	 mounted(){
		
	
    },
    methods:{

    //微信扫码结果3秒检查
	 ajaxstatus(){
		var id = this.$route.query.orderCode;//订单号
            if (id != "") {
                $.ajax({
                    url: baseUrl+"/order/ajaxCommet",
                    type: "GET",
                    dataType:"json",
                    data: {"id":id},
                    success: function (data) {
                        console.log(data.status);
                    
                    },
                    error: function () {
                        alert("请求订单状态出错"); 
                    }
                });
            }
        }

    }
}
</script>
<style scoped>
 h3{
    text-align: center;
    margin-top: 50px;
    margin-bottom: 50px;
 }
</style>


