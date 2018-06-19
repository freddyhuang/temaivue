<template>
  <div class="hello">
   <div class="head">
	<div class="header">
		<div class="header_div">
			<div class="header_div_left">
				<span>Hello，欢迎来到 <a href="javascript:;">吉特卖</a> </span>
			<!--	<a onclick="return addFav();" href="" rel="sidebar" target=_self>收藏网站</a>-->
			</div>
			<div class="header_div_right">
				
				<div v-if="loginFlage">
					<span class="navtopItem" style="cursor: text;"><a href="/temai/userinfo.jspx">您好, {{userinfo.userName}}</a></span>
					<router-link to="/myorderHeader/myorder">
						<span class="navtopItem" 	@click="closePop">我的特卖</span>
					</router-link>
					<span class="navtopItem" onclick="loginDiv.logout();">退出</span>
				</div>

				<div v-else style="display:inline-block" class="loginIn">
						<span @click="showLogin">登录</span>
						<span @click="showLogin">注册<a class="col_reg">(立送红包)</a></span>
				</div>
			
				
			
			
				<span @click="showFilterPop" class="me">我的</span>
				
				<div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
	        <dl class="filter-price">
	          <dt>你好,{{userinfo.userName}}</dt>
	          <dd 	@click="closePop"><router-link to="/myorderHeader/myorder">我的特卖</router-link></dd>
	          <dd  	@click="showLogin">
	            <a href="javascript:void(0)" @click="closePop">登录</a>
	          </dd>
	          <dd @click="showLogin">
	            <a href="javascript:void(0)" @click="closePop">注册</a>
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
</div>
<div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
<login v-show="loginBoxFlag" @changeLoginBoxFlag='changeLoginBoxFlag($event)'></login>
</div>
  
</template>

<script>
import login from '@/components/LoginAndRegister/login';
import { updateUserinfo } from "api/userinfo";
export default {
  name: 'HelloWorld',
  data () {
    return {
		filterBy:false,//控制价格是否显示(屏幕达到一定宽度)
		overLayFlag:false, //控制遮罩层,
		loginFlage:false ,//控制是否显示登录(用户还没登录)
		loginBoxFlag:false,
		userinfo:{}
    }
  },
created(){
	  this._updateUserinfo() // 获取用户数据
  },
  methods:{
		showFilterPop:function(){
			this.filterBy=true;
			this.overLayFlag=true;
		},
		closePop:function(){ // 关闭控制层
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
			console.log($event)
			this.loginBoxFlag = $event;
		},
		_updateUserinfo(){
			updateUserinfo().then(res=>{
				
				res = JSON.parse(res)
				if(res.code == 200){
					let result = res.result;
					this.userinfo = result;
					this.loginFlage = true;
				}
			})
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
