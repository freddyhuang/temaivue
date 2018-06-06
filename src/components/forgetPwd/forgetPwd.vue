<template>
    <table class="big">
        <tr>
        <td style="border-right:none; padding: 20px 0;" >
            <div class="loginindexDiv">
                <div class="loginindex_title">
                    <div id="loginindex_title_login"  class="findbacktitle">找回密码</div>
                </div>
                <div class="loginindex_div" id="login_div">
                    <form action="loginindex.jspx" id="loginform" method="post">
                        <input type="hidden" id="verifykey_findback" name="verifykey" value="${verifykey}" />
                        <table style="line-height: 60px;">
                            <tr>
                                <td class="register_title" align="right">邮&nbsp;&nbsp;&nbsp;箱</td>
                                <td><input placeholder="请输入邮箱地址" type="text" class="login_text_input" name="mail" id="mMail"/></td>
                            </tr>
                            <tr>
                                <td class="register_title" align="right">验证码</td>
                                <td>
                                    <input type="text" name="verifycode" class="login_num_input" id="verifycode_findback" value=""/>
                                    <a href="javascript:;" onclick="reloadVerifyImage('findback');">
                                        &nbsp;&nbsp;<img src="http://112.94.6.36:9099/ticketsWeb/temai/verifycode/code" alt="点击重取" id="verifyimage_findback" class="verifyimage" />
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><div  id="mBtnFind"  onclick="fnSend()">找回密码</div></td>
                            </tr>
                        </table>
                        </form>
                </div>
            </div>
        </td>
        </tr>
    </table>
</template>
<script>
import {VerifyEmailAddress} from 'api/common';
import { forgetPwd } from "api/forgetPwd"
export default {
    data(){
        return {

        }
    },
    methods:{
        _forgetPwd(){
            let mMail = $("#mMail");
            let verifycode = $('#verifycode_findback');
            if(mMail.val() == ''){
                alert('邮件不能为空')
                return
            }
            if(!VerifyEmailAddress(mMail.val())){
                mMail.focus();
                alert("请输入正确的E-mail！");
                return;
            }
           if (0 == verifycode.val().length) {
                alert("请输入验证邮箱中收到的验证码！");
                verifycode.focus();
                return;
            }
            const params = {"email":mMail.val(),"code":verifycode.val()}
            forgetPwd(params).then(res=>{
                let msg = res.msg;
                if(res.code == 200){
                    alert(msg);
                    this.$router.push({path:"/login"})
                }else{

                    alert(msg);

                }
            })
        }
    }
}
</script>

<style scoped>
     @import "../../../static/css/login.css";
     @import "../../../static/css/head.css";
   .findbacktitle{
	text-align: center;
	width: 100%!important;
	font-weight: bold;
	color: #3C6BB3;
}
.loginindexDiv{
	border: none;
}
#mBtnFind{
	margin-top: 30px;
	font-weight: normal;
	line-height: 30px;
	padding: 0;
	text-align: center;
	width: 140px;
	color:white;
	background-color: #FF7000;
	cursor: pointer;
}
</style>

