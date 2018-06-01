<template>
  <div class="hello">
   <div class="head">
	<div class="header">
		<div class="header_div">
			<div class="header_div_left">
				<span>Hello，欢迎来到 <a href="/">吉特卖</a> </span>
			<!--	<a onclick="return addFav();" href="" rel="sidebar" target=_self>收藏网站</a>-->
			</div>
			<div class="header_div_right">
				
				<div v-if="loginFlage">
					<span class="navtopItem" style="cursor: text;"><a href="/temai/userinfo.jspx">您好, ${user.name}</a></span>
					<span class="navtopItem" onclick="loginDiv.logout();">退出</span>
				</div>

				<div v-else style="display:inline-block" class="loginIn">
						<span @click="showLogin">登录</span>
						<span onclick="loginDiv.showRegister();">注册<c:if test="${isHasRegpack}"><a class="col_reg">(立送红包)</a></c:if></span>
				</div>
				<span class="navtopItem">我的特卖</span>
			
				<span @click="showFilterPop" class="me">我的</span>
				
				<div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
	        <dl class="filter-price">
	          <dt>你好,${user.name}</dt>
	          <dd><a  href="/temai/myorder.jspx">我的特卖</a></dd>
	          <dd  @click="showLogin">
	            <a href="javascript:void(0)">登录</a>
	          </dd>
	          <dd>
	            <a href="javascript:void(0)">注册</a>
	          </dd>
	          <dd>
	            <a href="javascript:void(0)">退出</a>
	          </dd>
	        </dl>
	      </div>
				
			</div>
			
		</div>
	</div>
	<div class="head_logo_div">
		<div class="head_logo" onclick="location.href='/';">
		</div>
	</div>
</div>
<div class="loginDiv" id="loginDiv">
	<div class="close_div" onclick="loginDiv.close();">&times;</div>
	<div class="loginDiv_title">
		<div id="title_login" onclick="loginDiv.showLogin();">会员登录</div>
		<div id="title_register" onclick="loginDiv.showRegister();">快速注册</div>
	</div>
	<div class="login_div" id="div_login">
		<form action="/login.jspx" id="loginform" method="post">
			<input type="hidden" name="op" value="login"/>
			<input type="hidden" id="loginRef" name="ref" value=""/>
			<input type="hidden" id="verifykey_login" name="verifykey" value="${verifykey}" />
			<table style="line-height: 60px;">
				<tr>
					<td class="register_title" align="right">账&nbsp;&nbsp;&nbsp;号</td>
					<td><input type="text" class="login_text_input" name="name" id="name1" value=""/></td>
				</tr>
				<tr>
					<td class="register_title" align="right">密&nbsp;&nbsp;&nbsp;码</td>
					<td><input type="password" class="login_text_input" name="password" id="password" value=""/></td>
				</tr>
				<tr>
					<td class="register_title" align="right">验证码</td>
					<td>
						<input type="text" name="verifycode" class="login_num_input" id="verifycode_login" value=""/>
						<a href="javascript:;" onclick="loginDiv.reloadVerifyImage('login');">&nbsp;&nbsp;<img  class="verifyimage"  src="/getverifyimage.jspx?verifykey=${verifykey}" alt="点击重取" id="verifyimage_login"  /></a>
					</td>
				</tr>
				<tr>
					<td></td>
					<td><input type="button" @click="_login" class="login_btn" value="登录" /></td>
				</tr>
				<tr>
					<td></td>
					<td><a href="findpsw.jspx" target="_blank">忘记密码</a></td>
				</tr>
			</table>
		</form>
	</div>
	<div class="login_div" id="div_register">
		<form action="/register.jspx" id="registerform" method="post">
			<input type="hidden" id="verifykey_register" name="verifykey" value="${verifykey}" />
			<table style="line-height: 45px;">
				<tr>
					<td class="register_title" align="right">用户名</td>
					<td>
						<input type="text" class="login_text_input"  onfocus="loginDiv.toolMsg($('#nameTitle'));" onblur="$('#nameTitle').hide();" name="name" id="name2" value=""/>
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
					<td><input placeholder="请输入邮箱，用于找回密码" type="text" class="login_text_input" name="email" id="email" value=""/>
					<span onclick="loginDiv.sendemail()" id="mBtnVerifyMail" class="btnverifyemail">验证邮箱</span></td>
				</tr>
				<tr>
					<td class="register_title" align="right">验证码</td>
					<td>
						<input  placeholder="邮箱验证码"  type="text" name="verifycode" class="login_num_input" maxlength="6" id="verifycode_register" value=""/>
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
					<td><input type="button" onclick="loginDiv.register();"  class="login_btn" value="注  册" /></td>
				</tr>
			</table>
		</form>
	</div>
</div>
<div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
<login v-show="loginBoxFlag" @changeLoginBoxFlag='changeLoginBoxFlag($event)'></login>
</div>
  
</template>

<script>
import login from '@/components/LoginAndRegister/login';
export default {
  name: 'HelloWorld',
  data () {
    return {
		filterBy:false,//控制价格是否显示(屏幕达到一定宽度)
		overLayFlag:false, //控制遮罩层,
		loginFlage:false ,//控制是否显示登录(用户还没登录)
		loginBoxFlag:false
    }
  },
  methods:{
		showFilterPop:function(){
			this.filterBy=true;
			this.overLayFlag=true;
		},
		closePop:function(){
			this.filterBy=false;
			this.overLayFlag=false;
		},
		setpriceFilter:function(index){//点击价格区间
			this.priceChecked = index;
			this.closePop();
		},
		showLogin(){
			this.loginBoxFlag = true;
		},
		changeLoginBoxFlag($event){
			this.loginBoxFlag = $event;
		},
		_login(){
			
		}
	},
	components:{
		login
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../../../static/css/head.css";
</style>
