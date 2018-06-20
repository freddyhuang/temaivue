<template>
<div class="loginbgBox"> 

<table class="big">
	<tr>
	<td style="border-right:none;" >
		<div class="close_div" @click="loginDivClose();">×</div>
         <!--登录box-->
		<div class="loginindexDiv">
			<div class="loginindex_title">
				<div id="loginindex_title_login" @click="currentIndex = 0"  :class="{'loginindex_title_div_sel':currentIndex==0}">会员登录</div>
				<div id="loginindex_title_register" @click="currentIndex = 1" :class="{'loginindex_title_div_sel':currentIndex==1}">快速注册</div>
			</div>
			<div class="loginindex_div" id="login_div" v-show="currentIndex==0">

				<form>
					<input type="hidden" name="op" value="login"/>
					<input type="hidden"  name="ref" value="${ref }"/>
					<input type="hidden" id="login_verifykey_login" name="verifykey" value="" />
					<!-- <div class="msgdiv">${msg }</div> -->
					<table style="line-height: 60px;">
						<tr>
							<td class="register_title" align="right">账&nbsp;&nbsp;&nbsp;号</td>
							<td><input type="text" class="login_text_input" name="name"  v-model="loginData.username" /></td>
						</tr>
						<tr>
							<td class="register_title" align="right">密&nbsp;&nbsp;&nbsp;码</td>
							<td><input type="password" class="login_text_input" name="password"  v-model="loginData.password" value=""/></td>
						</tr>
						<tr>
							<td class="register_title" align="right">验证码</td>
							<td>
								<input type="text" name="verifycode" class="login_num_input" id="login_verifycode_login" v-model="verifyCode" value=""/>
								<a @click="_verifycode()">&nbsp;&nbsp;
									<img :src="verifyImg"   alt="点击重取" id="login_verifyimage_login1" class="verifyimage" />
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
				<div class="loginindex_div" id="register_div" v-show="currentIndex==1">
					<form id="register_form">
					<input type="hidden" id="login_verifykey_register" name="verifykey" value="" />
					<table style="line-height: 45px;">
						<tr>
							<td class="register_title" align="right">用户名</td>
							<td>
								<input type="text" class="login_text_input"   v-model="registerData.username" />
								<div id="nameTitle" class="nameTitle_msg">长度为6-18个字符，可使用字母、数字、下划线。推荐以手机号码直接注册</div>
							</td>
						</tr>
						<tr>
							<td class="register_title" align="right">密码</td>
							<td><input type="password" class="login_text_input" name="psw"  v-model="registerData.password" /></td>
						</tr>
						<tr>
							<td class="register_title" align="right">确认密码</td>
							<td><input type="password" class="login_text_input" name="pswagain" v-model="registerData.surePassword"  /></td>
						</tr>
						<tr>
							<td class="register_title" align="right">手机号</td>
							<td><input type="text" class="login_text_input" name="phone" v-model="registerData.phone"/></td>
						</tr>
						<tr>
							<td class="register_title" align="right">邮箱</td>
							<td><input  placeholder="请输入邮箱用于找回密码" v-model="registerData.email"  type="text" class="login_text_input" name="email"  value=""/>
							<span  id="mBtnVerifyMail" class="btnverifyemail" @click="_sendMailCode">验证邮箱</span>
							</td>
						</tr>
						<tr>
							<td class="register_title" align="right">验证码</td>
							<td>
								<input v-mode="registerData.verifyCode" type="text" name="verifycode" placeholder="邮箱验证码" class="login_num_input" id="login_verifycode_register" />
								<a href="#" target="_blank" id="mBtnReceiveMail" class="receivemail">去查看邮箱</a>
							</td>
						</tr>
						<tr>
							<td></td>
							<td>
								<label for="mAgree">
									<input type="checkbox"/>我已阅读并同意<a target="_blank">《用户注册协议》</a>
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
import { updateUserinfo } from "api/userinfo";
import { baseUrl } from "api/config";
import {jtrim,VerifyLoginName,VerifyEmailAddress,IsMobilePhone} from 'api/common';
export default {
  data(){
      return {
		currentIndex:0,
        showDiv : null,
		theUrl : null,
		loginData:{
			username:'',
			password:''
		},
		registerData:{
			username:'',
			password:'',
			surePassword:'',
			phone:'',
			email:'',
			verifyCode:''
		},
		verifyCode:'',
		verifyImg:''
      }
  },
  created(){

	   this.verifyImg = baseUrl+'/verifycode/code' ; // 获取登录的图片验证码

  },
  mouthed(){
	  
  },
  methods:{
     show:function (type){
		
    },
	loginDivClose(){
		
		this.$emit('changeLoginBoxFlag',false)
	},
	_verifycode(){
		// verifycode().then(res=>{
		// 	this.verifyImg = res;
		// })
		var num = Math.ceil(Math.random()*10);//生成一个随机数（防止缓存）
　　　　this.verifyImg= baseUrl+'/verifycode/code?' + num;
	},
    _login(){
		console.log(this.loginData)
		
		if(this.loginData.username==''){
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
				console.log(111)
				login(this.loginData,this.verifyCode).then((res)=>{
					console.log(222)
					console.log(res)
					if(res.code == 200){

						this.$emit('changeLoginBoxFlag',false);
						this.$emit('_updateUserinfo');
						
					}else{

						alert(res.msg)
						
					}
				})
			}else{
				alert(res.msg);
			}
		})
        
		
	},
	_sendMailCode(){
			
		const email = this.registerData.email;

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
		var name = this.registerData.username;//用户名
		var phone = this.registerData.phone;// 手机
		var psw = this.registerData.password;// 密码
		var pswagain = this.registerData.surePassword; // 确认密码
		var verifycode = this.registerData.verifyCode;// 验证码
		var email =this.registerData.email;//邮箱
		var mAgree = $("#mAgree");
	
		if (0 == name.length) {
			alert("请输入用户名!");
			
			return ;
		} else if (!VerifyLoginName(name)) {
			alert("请输入正确的用户名！");
		
			return ;
		} else if (6 > name.length || 18 < name.length) {
			alert("用户名长度必须为：6-18个字符！");
			
			return ;
		}
		if (0 == psw.length) {
			alert("请输入密码!");
			
			return ;
		}
		if (psw.length < 6) {
			alert("密码不能少于6位!");
		
			return ;
		}
		if (20 < psw.length) {
			alert("密码不能多于20位!");
			
			return ;
		}
		if (0 == pswagain.length) {
			alert("请再次输入密码以确认!");
			
			return ;
		}
		if (pswagain != psw) {
			alert("两次输入的密码不一致，请重新输入!");
			
			return;
		}
		if (0 == phone.length) {
			alert("请输入手机号！");
			
			return;
		} else if (!IsMobilePhone(phone)) {
			alert("请输入正确的手机号！");
			
			return;
		}
		if (0 == email.length) {
			alert("请输入E-mail！");
			
			return;
		} else if (!VerifyEmailAddress(email)) {
			alert("请输入正确的E-mail！");
			
			return;
		}
		if (0 == verifycode.length) {
			alert("请输入验证邮箱中收到的验证码！");
			
			return;
		}
		console.log(mAgree.is(":checked"));
		if(!mAgree.is(":checked")){
			alert("请阅读并同意用户注册协议");
			return;
		}
		let regristerData = this.registerData;
			

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

