<template>
<div class="loginbgBox"> 

<table class="big">
	<tr>
	<td style="border-right:none;" >
		<div class="close_div" @click="loginDivClose();">×</div>
         <!--登录box-->
		<div class="loginindexDiv">
			<div class="loginindex_title">
				<div id="loginindex_title_login" @click="show('login');" class="loginindex_title_div_sel">会员登录</div>
				<div id="loginindex_title_register" @click="show('register');">快速注册</div>
			</div>
			<div class="loginindex_div" id="login_div">

				<form  id="loginform" >
					<input type="hidden" name="op" value="login"/>
					<input type="hidden" id="loginRef" name="ref" value="${ref }"/>
					<input type="hidden" id="login_verifykey_login" name="verifykey" value="" />
					<!-- <div class="msgdiv">${msg }</div> -->
					<table style="line-height: 60px;">
						<tr>
							<td class="register_title" align="right">账&nbsp;&nbsp;&nbsp;号</td>
							<td><input type="text" class="login_text_input" name="name" id="name" v-model="loginData.userName" value=""/></td>
						</tr>
						<tr>
							<td class="register_title" align="right">密&nbsp;&nbsp;&nbsp;码</td>
							<td><input type="password" class="login_text_input" name="password" id="password" v-model="loginData.password" value=""/></td>
						</tr>
						<tr>
							<td class="register_title" align="right">验证码</td>
							<td>
								<input type="text" name="verifycode" class="login_num_input" id="login_verifycode_login" v-model="verifyCode" value=""/>
								<a href="javascript:;" onclick="reloadVerifyImage('login');">&nbsp;&nbsp;
									<img src="http://112.94.6.36:9099/ticketsWeb/temai/verifycode/code" @click="_verifycode()" alt="点击重取" id="login_verifyimage_login" class="verifyimage" />
								</a>
							</td>
						</tr>
						<tr>
							<td></td>
							<td><input type="button" class="login_btn" @click='_login()' value="登 录"/></td>
						</tr>
						<tr>
							<td></td>
							<td>
								<router-link :to="'/forgetPwd'">忘记密码</router-link>
							</td>
						</tr>
					</table>
					</form>
				</div>
                <!--注册box-->
				<div class="loginindex_div" id="register_div" style="display: none;">
					<form id="register_form">
					<input type="hidden" id="login_verifykey_register" name="verifykey" value="" />
					<table style="line-height: 45px;">
						<tr>
							<td class="register_title" align="right">用户名</td>
							<td>
								<input type="text" class="login_text_input"  name="name" id="name" value=""/>
								<div id="nameTitle" class="nameTitle_msg">长度为6-18个字符，可使用字母、数字、下划线。推荐以手机号码直接注册</div>
							</td>
						</tr>
						<tr>
							<td class="register_title" align="right">密码</td>
							<td><input type="password" class="login_text_input" name="psw" id="psw" value=""/></td>
						</tr>
						<tr>
							<td class="register_title" align="right">确认密码</td>
							<td><input type="password" class="login_text_input" name="pswagain" id="pswagain" value=""/></td>
						</tr>
						<tr>
							<td class="register_title" align="right">手机号</td>
							<td><input type="text" class="login_text_input" name="phone" id="phone" value=""/></td>
						</tr>
						<tr>
							<td class="register_title" align="right">邮箱</td>
							<td><input placeholder="请输入邮箱用于找回密码" v-model="email"  type="text" class="login_text_input" name="email" id="email" value=""/>
							<span  id="mBtnVerifyMail" class="btnverifyemail" @click="_sendMailCode">验证邮箱</span>
							</td>
						</tr>
						<tr>
							<td class="register_title" align="right">验证码</td>
							<td>
								<input type="text" name="verifycode" placeholder="邮箱验证码" class="login_num_input" id="login_verifycode_register" value=""/>
								<a href="#" target="_blank" id="mBtnReceiveMail" class="receivemail">去查看邮箱</a>
							</td>
						</tr>
						<tr>
							<td></td>
							<td>
								<label for="mAgree">
									<input type="checkbox" id="mAgree"/>我已阅读并同意<a target="_blank" href="/memberaggrement.jspx">《用户注册协议》</a>
								</label>
							</td>
						</tr>
						<tr>
							<td></td>
							<td><input type="button" @click="_register();"  class="login_btn" value="注  册" /></td>
						</tr>
					</table>
				</form>
			</div>

		</div>
	</td>
	</tr>
</table>
</div>
</template>
<script>
import {login,register2,sendMailCode, verifycode , sureverifycode} from "api/login";
import {jtrim,VerifyLoginName,VerifyEmailAddress,IsMobilePhone} from 'api/common';
export default {
  data(){
      return {
        showDiv : null,
		theUrl : null,
		loginData:{
			username:'',
			password:''
		},
		verifyCode:'',
		verifyImg:'',
		email:''
      }
  },
  created(){
	  //this._verifycode();//获取登录的图片验证码
  },
  mouthed(){
	  
  },
  methods:{
     show:function (type){
		$(".loginindex_title_div_sel").removeClass('loginindex_title_div_sel');
		if("login"==type){
			$("#loginindex_title_login").addClass('loginindex_title_div_sel');
			$("#register_div").hide();
			$("#login_div").show();
		}else{
			$("#loginindex_title_register").addClass('loginindex_title_div_sel');
			$("#register_div").css("display","block");
			$("#login_div").hide();
		}
    },
	loginDivClose(){
		this.$emit('changeLoginBoxFlag',false)
	},
	_verifycode(){
		verifycode().then(res=>{
			this.verifyImg = res;
		})
	},
    _login(){
		console.log(this.loginData)
		
		if(this.loginData.userName==''){
			alert('请输入用户名')
			return;
		}
		if(this.loginData.password==''){
			alert('请输入你的密码')
			return;
		}
		if(this.verifyCode == ''){
			alert('验证码为空')
			return false;
		}
		if(this.verifyCode.length<=2){
			alert('验证码位数有误')
			return false;
		}
		sureverifycode(this.verifyCode).then(res=>{
			if(res.code == 200){
				login(this.loginData,this.verifyCode).then((res)=>{
					console.log(res)
					if(res.code == 200){

						this.$emit('changeLoginBoxFlag',false);

					}
				})
			}else{
				alert(res.msg);
			}
		})
        
		
	},
	_sendMailCode(){
			
		const email = this.email;

		if(email == ''){
			alert('邮件不能为空')
			return;
		}
		var mEmail = $("#email");
		if(!VerifyEmailAddress(email)){
			mEmail.focus();
			alert("请输入正确的E-mail！");
			return;
		}
		
		//发送邮件
		sendMailCode(email).then((res)=>{
			console.log(res)
			const msg = res.msg
			if(res.code == 200){
				alert('发送成功')
			}else{
				alert(msg)
			}
		})
		
	},
	_register(){
		var form = $("#register_div");
		var phone = form.find("#phone");// 手机
		var psw = form.find("#psw");// 密码
		var pswagain = form.find("#pswagain");
		var verifycode = form.find("#login_verifycode_register");// 验证码
		var name = form.find("#name");//用户名
		var email = form.find("#email");//邮箱
		var mAgree = $("#mAgree");
	
		if (0 == name.val().length) {
			alert("请输入用户名!");
			name.focus();
			return ;
		} else if (!VerifyLoginName(name.val())) {
			alert("请输入正确的用户名！");
			name.focus();
			return ;
		} else if (6 > name.val().length || 18 < name.val().length) {
			alert("用户名长度必须为：6-18个字符！");
			name.focus();
			return ;
		}
		if (0 == psw.val().length) {
			alert("请输入密码!");
			psw.focus();
			return ;
		}
		if (psw.val().length < 6) {
			alert("密码不能少于6位!");
			psw.focus();
			return ;
		}
		if (20 < psw.val().length) {
			alert("密码不能多于20位!");
			psw.focus();
			return ;
		}
		if (0 == pswagain.val().length) {
			alert("请再次输入密码以确认!");
			pswagain.focus();
			return ;
		}
		if (pswagain.val() != psw.val()) {
			alert("两次输入的密码不一致，请重新输入!");
			psw.focus();
			return;
		}
		if (0 == phone.val().length) {
			alert("请输入手机号！");
			phone.focus();
			return;
		} else if (!IsMobilePhone(phone.val())) {
			alert("请输入正确的手机号！");
			phone.focus();
			return;
		}
		if (0 == email.val().length) {
			alert("请输入E-mail！");
			email.focus();
			return;
		} else if (!VerifyEmailAddress(email.val())) {
			alert("请输入正确的E-mail！");
			email.focus();
			return;
		}
		if (0 == verifycode.val().length) {
			alert("请输入验证邮箱中收到的验证码！");
			verifycode.focus();
			return;
		}
		console.log(mAgree.is(":checked"));
		if(!mAgree.is(":checked")){
			alert("请阅读并同意用户注册协议");
			return;
		}
		let regristerData = {
			username : name.val(),
			password : psw.val(),
			telephone : phone.val(),
			email :email.val(),
			code : verifycode.val()
		}

		register2(regristerData).then(res=>{ //点击注册按钮
			console.log(res)
			const msg = res.msg
			if(res.code == 200){
				alert('注册成功！')
			}else{
				alert(msg)
			}
		})
	}
  }
}
</script>
<style scoped>
 	@import "../../../static/css/login.css";
	@import "../../../static/css/head.css";
	.big{
		position: absolute;
		top:0px;
		left: 0px;
		right: 0px;
		bottom: 0px;
		margin: auto;
		z-index: 999;
		background-color:#ffffff;
	}
	.loginbgBox{
		position: fixed;
		top:0px;
		left: 0px;
		width: 100%;
		height: 100%;
		z-index: 888;
		background-color:rgba(0,0,0,0.5);
	}
</style>

