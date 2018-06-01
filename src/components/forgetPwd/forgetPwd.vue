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
                                    <a href="javascript:;" onclick="reloadVerifyImage('findback');">&nbsp;&nbsp;<img src="/getverifyimage.jspx?verifykey=${verifykey}" alt="点击重取" id="verifyimage_findback" class="verifyimage" /></a>
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

