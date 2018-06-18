<template>
    <div>
        <div class="title_td">账号设置  <input type="button" value="修改密码" id="show_btn" class="userinfo_table_title_btn" @click="showpass"/></div>
        <tr>
            <td valign="top">
                <table class="userinfo_table">
                    <tr class="changeinfo_tr">
                        <td align="right">用户名：</td>
                        <td>
                            <input readonly="readonly" type="text" class="input_text" name="name" id="loginname" v-model="userinfo.userName"/>
                        </td>
                    </tr>
                    <tr class="changepass_tr" style="display: none">
                        <td align="right">原密码：</td>
                        <td>
                            <input type="password" name="oldpass" class="input_text" v-mode="changePData.oldP" id="oldpass" placeholder="原密码"/>
                        </td>
                    </tr>
                    <tr class="changepass_tr" style="display: none">
                        <td align="right">新密码：</td>
                        <td>
                            <input type="password" class="input_text" name="newpass"  v-mode="changePData.newP" id="newpass" placeholder="新密码"/>
                        </td>
                    </tr>
                    <tr class="changepass_tr" style="display: none">
                        <td align="right">确定密码：</td>
                        <td>
                            <input type="password" class="input_text" name="repass" v-mode="changePData.sureNewP" id="repass" placeholder="确认密码"/>
                        </td>
                    </tr>
                    <tr class="changeinfo_tr">
                        <td align="right">手机号：</td>
                        <td><input type="text" name="mobile" id="mobile" class="input_text" v-model="userinfo.phone"/></td>
                    </tr>
                    <tr class="changeinfo_tr">
                        <td align="right">E-mail：</td>
                        <td><input readonly="readonly" type="text" name="email" id="info_email" class="input_text" v-model="userinfo.email"/></td>
                    </tr>
                    <tr>
                        <td colspan="2" align="center">
                            <input type="button" value="保存" id="info_btn" class="userinfo_table_btn" onclick="changeinfo();"/>
                            <input type="button" value="保存密码" id="pass_btn" class="userinfo_table_btn" @click='_updatePassword' style="display: none;"/>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </div>
</template>
<script>
import { updateUserinfo ,updatePhone,updatePassword } from "api/userinfo";
import login from '@/components/LoginAndRegister/login';
export default {
	data(){
		return {

            userinfo:{},
            changePData:{
                oldP:'',
                newP:'',
                sureNewP:''
            }
		}
	},
	created(){
        this._updateUserinfo();
	 },
	 mounted(){
		
	
	},
	methods:{
		_updateUserinfo(){
			
			updateUserinfo().then(res=>{
				res = JSON.parse(res)				
				
				if(res.code == 200){
					let result = res.result;
					this.userinfo = result;
					
					
					
				}else if(res.code == 500){ // 用户未登录，请登录后再下单
					this.loginBoxFlag = true;
				}else{
					alert(res.msg)
				}
			})
        },
        _updatePassword(){
     
            let oldP = this.changePData.oldP;
            let newP = this.changePData.newP;
            let sureNewP = this.changePData.sureNewP;
            console.log(this.changePData.oldP)
            console.log( this.changePData.newP)
            console.log(oldP)
            console.log(newP);
            console.log(sureNewP)
            if(oldP.length < 6 ||newP.length < 6 || sureNewP.length < 6 ){
                alert("密码为6为以上")
                return;
            }
            if(newP != sureNewP){
                alert('两次密码不一致')
            }
            updatePassword(oldP,newP).then((res)=>{
                console.log(res);
            })
        },
        showpass: function(){
			if($(".changepass_tr").is(":hidden")){
				$("#oldpass").val("");
				$("#newpass").val("");
				$("#repass").val("");
				$(".changepass_tr").show();
				$(".changeinfo_tr").hide();
				$("#show_btn").val("修改信息");
				$("#info_btn").hide();
				$("#pass_btn").show();
		    }else{
				
				$(".changepass_tr").hide();
				$(".changeinfo_tr").show();
				$("#show_btn").val("修改密码");
				$("#info_btn").show();
				$("#pass_btn").hide();
		    }
	    },
        
		_gomyorder(){
			this.$router.push({path:"/myorder"});
		}
	
	},
	components:{
	
	}
}
</script>

<style scoped>
  
    @import "../../static/css/myorder.css";
</style>