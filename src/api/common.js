/**
 * 说明：本js文件需要配合jquery 1.9使用，
 * 顺序：jquery.js需要最先引入，本js文件，需要在body末尾引入
 */
var _IsIe = (window.all) ? true: false;
var _IsIe10 = /msie/i.test(navigator.userAgent) && (function() {
	"use strict";
	return this === undefined;
}());
var _IsIe9 = ("Microsoft Internet Explorer" == navigator.appName && "MSIE9.0" == navigator.appVersion.split(";")[1].replace(/[ ]/g, ""));
var _ISIE6 = !-[1, ] && !window.XMLHttpRequest;
var _Doc = jQuery(document),_Body =jQuery("body"),_Win = $(window),_Html=$("html").eq(0);
var _boxArray=new Array();//box集合弹出层的index记录集合
var _texts = {cancel:"取消",close:"关闭",enter:"确定",yes:"是",no:"否"};//常用按钮文字
var _sysFn =["cancel","close"];//系统的函数，关闭窗口
var _modalPosition="absolute";//弹出层的默认定位
var _Callback;//临时回调函数
/**
 * @param control jQuery元素对象
 *  取得指定控件的位置(x,y)
 *  建议使用jQuery("#div").position();//返回一个对象{top:top,left:left}
 */
function GetControlPos(control) {
	var xy = control.offset();
	return {
		left: xy.left,
		top: xy.top
	};
}
/**
 * 
 * @param div jquery对象
 * @param x 
 * @param y
 * @param w 宽度
 * @return
 */
function ShowDiv(div, x, y, w) {
	if(!div || !div instanceof jQuery || div.is(":animated")){
		return;
	}
	if( jQuery.isNumeric(w) ){
		div.width(w);
	}
	if(jQuery.isNumeric(x) && jQuery.isNumeric(y)){
		div.css({"z-index":9999,position:"absolute",left:x,top:y});
	}
	div.show(0);
}
/**
 * div居中显示
 */
jQuery.fn.showCenter=function(){
	var div = $(this),xy = clientXY(),w =div.outerWidth(),h = div.outerHeight(),x = (xy.x - w) / 2,y = (xy.y - h) / 2+_Doc.scrollTop();
	div.css({position: _modalPosition,visibility: "visible",display: "block",left: x,top: y});
	return div;
};

/**
 * ShowDiv_Width(div, x, y, width)直接调用jQuery.ShowDiv(div,x,y,[w])
 */
function ShowDiv_Width(div, x, y, width) {
	ShowDiv(div, x, y, width);
}

/**
 * HideDiv(div)隐藏层替换方法：也可直接使用jQuery("#div").hide(0);
 * @param div jQuery 元素对象
 */

function HideDiv(div) {
	div.css("display", "none");
}

/**
 * 弹一个层
 * @param div jQuery元素对象
 * @param bodycode div的innerHTML代码
 * @param x div要显示x轴坐标
 * @param y div要显示y轴坐标
 * @param width div
 * */
function showMessage(div, bodycode, x, y, width) {
	if (div) {
		div.html(bodycode);
		div.ShowDiv(div, x, y, width);
	}
	return div;
}

/**
 * 淡入效果显示div
 * @param duration 动画过度时间[可选]可以是数字或者"slow","normal","fast"
 * 在指定位置逐渐显示div
 * 替换 ShowGradualDiv和GradualDiv
 */
function showGradualDiv(div, x, y, duration) {
	duration = duration ? duration: "normal";
	if (ShowDiv(div, x, y)) {
		div.fadeIn(duration); //淡入效果
	}
}


// 检查是否移动号码
 export function IsMobilePhone(phone) {
	// 首先手机号码是11位的
	if (null == phone || 11 != phone.length) return false;

	// 由13、14、15、17或18开始的号码
	var r = phone.match(/^13\d+$|^14\d+$|^15\d+$|^17\d+$|^18\d+$/g);
	return (r && r.length == 1);
}

// 检查是否合法格式email
export function VerifyEmailAddress(str) {
	if (str.length < 5) return false;
	var myreg = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	return myreg.test(str);
}

// 检测用户名是否合法
export function VerifyLoginName(name) {
	if (!name || 0 == name.length) return true;
	var r = name.match(/[＠@\#\!！\$\#\%\^\&\*\\\/\|\,\;\:\?，。：；￥\"\'\+]/g);
	return ! (r && r.length > 0);
}
// 检查是否“YYYY-MM-DD hh:mm:ss”或“YYYY-MM-DD hh:mm”或“YYYY-MM-DD
// hh”或“YYYY-MM-DD”格式的时间输入
function IsDateTime(d) {
	var r = d.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
	if (null != r) return true;
	r = d.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{0,2})$/);
	if (null != r) return true;
	r = d.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{0,2}):(\d{0,2})$/);
	if (null != r) return true;
	r = d.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{0,2}):(\d{0,2}):(\d{0,2})$/);
	return (null != r);
}
/**
 * 选中select控件指定值的选项
 * @param control jQuery元素对象
 */
function ChoiceOption(control, val) {
	if (control) {
		control.children("option").each(function() {
			var _this = $(this);
			if (val == _this.val()) {
				_this.prop("selected", true);
				return;
			}
		});
		control.eq(0).prop("selected", true);
	}
}
/**
 * 获取select控件的选中项的值
 * @param control jQuery元素对象
 */
function GetOptionValue(control) {
	if (control) {
		return control.children("option:selected").val();
	}
}
//动态装入javascript
function LoadJavaScript(url,callback) {
	var s = document.createElement("script");
	s.type = "text/javascript";
	if(callback){
		if(_IsIe){
			s.onreadystatechange = function(){
				if(this.readyState=='loaded'){
					s.onreadystatechange = null;
					callback();
				}
			}
		}else{
			s.onload = callback;
		}
	}
	var root = document.getElementsByTagName("head")[0];
	root.appendChild(s);
	s.src = url;
	return s;
}
/**
 * 选中checkbox控件指定值的选项
 * @param control jQuery元素对象数组 例如：jQuery("input[name='checkbox']");
 */
function SetCheckBox(controls, val) {
	if (control) {
		controls.each(function() {
			var _this = $(this);
			if (val == _this.val()) {
				_this.prop("checked", true);
				return;
			}
		});
		control[0].prop("checked", true);
	}
}

function UU(AA, ZZ) {
	if (null == ZZ || ZZ >= 16) ZZ = 0;
	if (null == AA || AA.length < 4 || 0 != (3 & AA.length)) return "";

	var KK = "";
	for (var i = 0; i < AA.length; i += 4) {
		var ___utf16 = parseInt(AA.substr(i, 4), 16);
		var RR = 0;
		switch (ZZ) {
		case 1:
			RR = 0x0001;
			break;
		case 2:
			RR = 0x0003;
			break;
		case 3:
			RR = 0x0007;
			break;
		case 4:
			RR = 0x000F;
			break;
		case 5:
			RR = 0x001F;
			break;
		case 6:
			RR = 0x003F;
			break;
		case 7:
			RR = 0x007F;
			break;
		case 8:
			RR = 0x00FF;
			break;
		case 9:
			RR = 0x01FF;
			break;
		case 10:
			RR = 0x03FF;
			break;
		case 11:
			RR = 0x07FF;
			break;
		case 12:
			RR = 0x0FFF;
			break;
		case 13:
			RR = 0x1FFF;
			break;
		case 14:
			RR = 0x3FFF;
			break;
		case 15:
			RR = 0x7FFF;
			break;
		case 16:
			RR = 0xFFFF;
			break;
		}
		var OO = (RR & ___utf16);
		___utf16 &= (~RR);
		___utf16 >>= ZZ;
		___utf16 |= (OO << (16 - ZZ));
		KK += String.fromCharCode(___utf16);
		ZZ = (0x000F & ___utf16);
	}
	return KK;
}

/**
 * 写入cookie
 * @param name 
 * @param value
 * @param expires
 * @param path
 * @param domain
 * @param secure
 * @return
 */
function SetCookie(name, value, expires, path, domain, secure) {
	var strCookie = name + "=" + escape(value) + ";";
	if (null != expires) {
		if (expires < 0) strCookie += "expires=-1;";
		else {
			var expdate = new Date();
			expdate.setTime(expdate.getTime() + (expires * 1000));
			strCookie += ("expires=" + expdate.toGMTString() + ";");
		}
	}
	if (null != path) {
		strCookie += ("path=" + path + ";");
	}
	if (null != domain) {
		strCookie += ("domain=" + domain + ";");
	}
	if (true == secure) {
		strCookie += "secure;";
	}
	document.cookie = strCookie;
}
/**
 * 根据名字获取cookie
 * @param name 
 * @return
 */
function GetCookie(name) {
	var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
	if (null != arr) return unescape(arr[2]);
	return null;
}
/**
 * 根据名字删除cookie
 * @param name 
 * @return
 */
function DeleteCookie(name) {
	var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
	if (null != arr) {
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		document.cookie = name + "=;expires=" + exp.toGMTString() + ";";
	}
}

// 把一个低8位数值转换为一个十六进制字符
function HexByteConvert(bt_) {
	bt_ &= 0xF;
	if (bt_ > 9) return bt_ + (97 - 10); // +'a'
	else return bt_ + 48; // +'0';
}

// 格式化为十六进制字串
function Hex(num_) {
	if ((0x7FFFFFFF & num_) <= 0xFF) return String.fromCharCode(HexByteConvert(num_ >> 4), HexByteConvert(num_));
	if ((0x7FFFFFFF & num_) <= 0xFFFF) return String.fromCharCode(HexByteConvert(num_ >> 12), HexByteConvert(num_ >> 8), HexByteConvert(num_ >> 4), HexByteConvert(num_));
	return String.fromCharCode(HexByteConvert(num_ >> 28), HexByteConvert(num_ >> 24), HexByteConvert(num_ >> 20), HexByteConvert(num_ >> 16), HexByteConvert(num_ >> 12), HexByteConvert(num_ >> 8), HexByteConvert(num_ >> 4), HexByteConvert(num_));
}

/*******************************************************************************
 * UNICODE编码规则： 0x00000000 - 0x0000007F 0xxxxxxx ANSI码（英文,数字符号）占一个byte
 * 0x00000080 - 0x000007FF 110xxxxx 10xxxxxx 0x00000800 - 0x0000FFFF 1110xxxx
 * 10xxxxxx 10xxxxxx 中日韩文等编码占三个byte 0x00010000 - 0x001FFFFF 11110xxx 10xxxxxx
 * 10xxxxxx 10xxxxxx 0x00200000 - 0x03FFFFFF 111110xx 10xxxxxx 10xxxxxx 10xxxxxx
 ******************************************************************************/

// 转换字串为UTF8字符集的URI编码串
function EscapeURI(str) {
	str += "";
	if (!str || 0 == str.length) return "";
	var utf16;
	var uri = "";
	for (var i = 0; i < str.length; i++) {
		utf16 = str.charCodeAt(i);
		if (utf16 < 0x80) {
			var ch = str.charAt(i);
			switch (ch) {
			case ' ':
			case '%':
			case '&':
			case '\'':
			case '"':
			case '=':
			case '@':
			case ':':
			case '/':
			case '?':
			case '+':
			case '#':
			case '\n':
				uri += "%" + Hex(utf16);
				break;
			case '\r':
				break;
			default:
				uri += ch;
				break;
			}
		} else if (utf16 >= 0x80 && utf16 < 0x07ff) {
			uri += "%" + Hex(0xC0 | (0x1F & (utf16 >> 6)));
			uri += "%" + Hex(0x80 | (0x3F & utf16));
		} else if (utf16 >= 0x0800) {
			uri += "%" + Hex(0xE0 | (0x0F & (utf16 >> 12)));
			uri += "%" + Hex(0x80 | (0x3F & (utf16 >> 6)));
			uri += "%" + Hex(0x80 | (0x3F & utf16));
		} else {
			// 不会吧，还有这种错误的情况？
			throw "未知的UNICODE编码规则!"
		}
	}
	return uri;
}

// 取得caption/name部分
function GetUniteIdCaption(id) {
	if (null == id || 0 == id.length) {
		return "";
	}
	var idx = id.indexOf(':');
	if ( - 1 == idx) {
		idx = id.indexOf('!');
		if ( - 1 == idx) {
			return id;
		}
	}
	return id.substr(idx + 1);
}

// 取得ID部分
function GetUniteId(id) {
	if (null == id || 0 == id.length) {
		return "";
	}
	var idx = id.indexOf(':');
	if ( - 1 == idx) {
		idx = id.indexOf('!');
		if ( - 1 == idx) {
			return id;
		}
	}
	return id.substr(0, idx);
}
//去除所有空格
export function jtrim(str) {
	return str.replace(/\s|\xA0/g,"");
};

// 去左空格;
String.prototype.ltrim = function() {
	return this.replace(/^\s*/, "");
};
// 去右空格;
String.prototype.rtrim = function() {
	return this.replace(/\s*$/, "");
}
//去两边的空格
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
};
//封装的StringBuffer,提高拼接性能
function StringBuffer() {
	this.__strings__ = new Array();
}
// StringBuffer拼接
StringBuffer.prototype.append = function(str) {
	this.__strings__.push(str);
};
// 转化为字符串
StringBuffer.prototype.toString = function() {
	return this.__strings__.join("");
};
// 末尾匹配
String.prototype.isEndWith = function(s) {
	if (s == null || s == "" || this.length == 0 || s.length > this.length) return false;
	if (this.substring(this.length - s.length) == s) return true;
	else return false;
	return true;
};
// 是否开始匹配
String.prototype.isStartWith = function(s) {
	if (s == null || s == "" || this.length == 0 || s.length > this.length) return false;
	if (this.substr(0, s.length) == s) return true;
	else return false;
	return true;
};
//文本是否包含
String.prototype.isContains = function(s) {
	if (s == null || s == "" || this.length == 0 || s.length > this.length) return false;
	if ( - 1 != this.indexOf(s)) return true;
	else return false;
	return true;
};

//文本全局替换
String.prototype.replaceAll = function(oldText, replaceText) {
	var regExp = new RegExp(oldText, "g"); // g 全局
	return this.replace(regExp, replaceText);
};
//截取指定长度的字符串，后面追加"…"
String.prototype.subCentent = function(num) {
	var c = this;
	if (!isNaN(num) && 0 < num && num >= c.length) {
		return c.substr(0, num) + "...";
	}
	return this;
}
/**
 * 判断是否是确认事件
 * @param e 事件
 */
function doEnter(e) {
	e = e ? e: event;
	return 13 == e.keyCode;
}
/**
 * 光标移至文本框文字最后 
 * @param obj:DOM元素对象（input text/search/number/等）
 */
function focuslast(obj) {
	if (_IsIe) { //只有ie不支持自动移动到末尾
		var text = obj.createTextRange();
		text.collapse(false);
		text.select();
	}
	obj.focus();
}

/**
 * 调整IFRAME的高度（可以使用autoFrameHeight()代替）
 * @param the jQuery元素对象
 */
function FixIframeHeight(the) {
	if (the) {
		_Doc.delay(200).queue(function() {
			the.height(_Body.heigth());
			_Doc.dequeue();
		});
	}
}

/**
 * 格式化的日期时间字串
 * @param d Date对象等于空为当前时间
 * @param format 格式化格式
 * @return 格式化后的字符串 format=格式（1=长日期，2=短日期；0x10=长时间格式，0x20=短时间格式，省略为自动长日期且长时间格式）
 * 例如：new Date().FormatDateTime(1);
 */
Date.prototype.FormatDateTime = function(format) {
	var d = this;
	if (!d) return "";
	var year = d.getFullYear(),
	month = 1 + d.getMonth(),
	date = d.getDate(),
	hour = d.getHours(),
	minute = d.getMinutes(),
	second = d.getSeconds();
	var str = "";
	if (!format) {
		// 自动格式
		str = String(hour) + ":" + minute + ":" + second,
		_str = String(year) + "-" + month + "-" + date;
		if ("0:0:0" == str) {
			str = _str;
		} else {
			str = _str + " " + str;
		}
	} else {
		if (1 == (0xF & format)) {
			str = String(year) + "-" + month + "-" + date; // 长日期
		} else if (2 == (0xF & format)) {
			str = String(0xF & year) + "-" + month + "-" + date; // 短日期
		}
		if (0x10 == (0xF0 & format)) {
			str += (str.length > 0 ? " ": "") + String(hour) + ":" + minute + ":" + second; // 长时间格式
		} else if (0x20 == (0xF0 & format)) {
			str += (str.length > 0 ? " ": "") + String(hour) + ":" + minute; // 短时间格式
		}
	}
	return str;
};

/**
 * 返回长日期格式化字串，只日期部分
 */
Date.prototype.FormatDateLong = function FormatDateLong(d) {
	return this.FormatDateTime(1);
};
// 检测浏览器
function checkBrowser() {
	if (navigator.userAgent.indexOf("MSIE") > 0) {
		return "IE"
	}
	if (isFirefox = navigator.userAgent.indexOf("Firefox") > 0) {
		return "FF";
	}
	if (navigator.userAgent.indexOf("AppleWebKit") > 0) {
		return "APPLE";
	} else return null;
}
function IEwhat() {
	if (navigator.userAgent.indexOf("MSIE 6") > 0) {
		return "IE6"
	}
	if (navigator.userAgent.indexOf("MSIE 7") > 0) {
		return "IE7"
	}
	if (navigator.userAgent.indexOf("MSIE 8") > 0) {
		return "IE8"
	}
	return null;
}
// 返回上一页历史
function goback() {
	history.back(); //histroy.go(-1);
}
// 弹出框DIV--用于制作圆角矩形的，不建议使用（现代浏览器都支持圆角radius）
var div_header = '<b class="xt1"></b><b class="xt2"></b><b	class="xt3"></b><b class="xt4"></b><b class="xt5"></b><b class="xt6"></b><b	class="xt7"></b><div class="xtoxcontent">';
var div_footer = '</div><b class="xt7"></b><b class="xt6"></b><b class="xt5"></b><b class="xt4"></b><b class="xt3"></b><b class="xt2"></b><b class="xt1"></b>';
// 固定tips DIV
var tips_header = '<b class="xb1"></b><b class="xb2"></b><b	class="xb3"></b><b class="xb4"></b><b class="xb5"></b><b class="xb6"></b><b	class="xb7"></b><div class="xboxcontent">';
var tips_footer = '</div><b class="xb7"></b><b class="xb6"></b><b class="xb5"></b><b class="xb4"></b><b	class="xb3"></b><b class="xb2"></b><b class="xb1"></b>';

/**
 *@param div  jQuery元素对象
 */
function SetDivTips(div) {
	div.html(tips_header + div.innerHTML + tips_footer).css({
		"margin-top": "0",
		"margin-left": "0"
	});
}
/**
 * @param div 对话框
 * jQuery元素对象
 */
function SetDivDialog(div) {
	div.html(div_header + div.innerHTML + div_footer).addClass("divdialog");
}

// encodeHTML编码HTML
function encodeHTML(str) {
	if (0 == str.length) return str;
	str = str.replace(/\r/g, "");
	str = str.replace(/\</g, "&lt;");
	str = str.replace(/\>/g, "&gt;");
	str = str.replace(/\n/g, "<br>");
	str = str.replace(/ /g, "&nbsp;");
	return str;
}
function decodeHTML(str) {
	if (null == str || 0 == str.length) return str;
	str = str.replace(/<br>/g, "\n");
	str = str.replace(/&lt;/g, "<");
	str = str.replace(/&gt;/g, ">");
	str = str.replace(/&nbsp;/g, " ");
	return str;
}
// 检测00:00的时间格式
function checkTime(t) {
	t = t.replace(/：/, ":");
	if ( - 1 == t.indexOf(":") || 5 < t.length) return false;
	var _t = t.split(":");
	if (2 < _t.length || null == _t[0].match(/^\d+$/) || 2 < _t[0].length || 24 < parseInt(_t[0], 10) || 2 < _t[1].length || null == _t[1].match(/^\d+$/) || 60 < parseInt(_t[1], 10) || (24 == parseInt(_t[0], 10) && 0 < parseInt(_t[1], 10))) return false;
	return true;
}
// 整理0:0格式为00:00格式输出
function toTime(t) {
	t = t.replace(/：/, ":");
	if ( - 1 == t.indexOf(":")) return t;
	var _t = t.split(":");
	if (1 == _t[0].length) _t[0] = "0" + _t[0];
	if (1 == _t[1].length) _t[1] += "0";
	else if (null == _t[1] || 0 == _t[1].length) _t[1] = "00";
	t = _t[0] + ":" + _t[1];
	return t;
}
// 时间格式“n天n小时”，“n小时n分钟”
function dayHourMinute(t) {
	// if(null==t.match(/^\d+$/)) return t;
	var d = 0;
	var h = parseInt(parseInt(t, 10) / 60, 10);
	var m = parseInt(t, 10) % 60;
	if (24 < h) {
		d = parseInt(parseInt(h, 10) / 24, 10);
		h = parseInt(h, 10) % 24;
		return d + "天" + h + "小时";
	}
	return h + "小时" + m + "分钟";
}
// 检测价钱为整数或小数
function checkFare(val) {
	if (null == val || 0 == val.length) return false;
	if ( - 1 != val.indexOf(".")) {
		var _val = val.split(".");
		if (2 < _val.length || null == _val[0].match(/^\d+$/) || null == _val[1].match(/^\d+$/)) return false;
	} else {
		if (null == val.match(/^\d+$/)) return false;
	}
	return true;
}
// 整理价钱格式，整数或保留n位小数
function toFare(val, num) {
	if (null == val || 0 == val.length) return 0;
	if (!num) num = 0;
	return parseFloat(val).toFixed(num);
}

/**
 * 添加到收藏夹
 */
function AddFav() {
	var title = '坐车网-北京、广州、上海、深圳等城市公交查询，旅行线路景点交通查询，最新的列车飞机以及市内公交车地铁路线，清晰的电子地图，方便的旅游行程指南';
	if (document.all) {
		window.external.addFavorite('http://www.zuoche.com/', title);
	} else if (window.sidebar) {
		window.sidebar.addPanel(title, 'http://www.zuoche.com/', '');
	}
	return false;
}
// 取得浏览器的可见宽高
function clientXY() {
	return {
		x: _Win.width(),
		y: _Win.height()
	};
}
// 取得滚动条的位置
function scrollXY() {
	var x = _Doc.scrollLeft(),
	y = _Doc.scrollTop();
	return {
		"x": x,
		"y": y
	};
}

/**
 * 获取页面（或iframe）的实际宽高
 * @param doc 
 */
function pageXY(doc) {
	var doc = doc || _Doc;
	var y = doc.height(),
	x = doc.width();
	return {
		"x": x,
		"y": y
	};
}

/**
 * 自动调整iframe的高度
 * @param frame jQuery元素对象
 *  @param minHeight 设置iframe的最小高度
 */
function autoFrameHeight(frame, minHeight) {
	try {
		var id = frame.attr("id");
		var subDoc = $(_IsIe ? window.frames[frame.id] : frame.get(0).contentWindow.document);
		var h = pageXY(subDoc).y;
		h = h >= 0 && minHeight && minHeight ? minHeight: h;
		frame.heigth(h);
	} catch(e) {
		// frame域名不同时，会报Permission denied to access property 'document'
		// webkit不会
	}
}
/**
 * 分享到新浪微博
 * @param title
 * @param url
 * @param pic
 * @return
 */
function shareToSina(title, url, pic) {
	if (!title || title.length <= 0) {
		title = document.title;
	}
	if (!url || url.length <= 0) {
		url = document.URL;
	}
	if (!pic) {
		pic = "";
	}
	var maxLength = 120; // 新浪的短url有20个字符，占用10个位置
	if (title.length > 120) {
		title = title.substr(0, maxLength) + "..."
	}
	title = encodeURIComponent(title);
	// 编码之前再过滤一遍
	url = encodeURIComponent(decodeURIComponent(url).replace(/[[+]/g, "@").replace(/[[#]/g, "$"));
	pic = encodeURIComponent(decodeURIComponent(pic).replace(/[[+]/g, "@").replace(/[[#]/g, "$"));
	window.open(['http://v.t.sina.com.cn/share/share.php?appkey=2524860089&content=utf-8&title=', title, '&url=', url, '&pic=', pic].join(''), "", ['toolbar=0,status=0,resizable=0,width=615px;height=605px,left=', (screen.width - 615) / 2, ',top=', (screen.height - 605) / 2].join(''));
}
// 转到登录页面
function loginTurnOff() {
	var url = window.top.document.URL;
	if (url.indexOf("login.jspx") > 0) {
		url = "";
	}
	window.top.location = "../login.jspx?ref=" + EscapeURI(url);
}
//转到注册页面
function regTurnOff() {
	var url = window.top.document.URL;
	if (url.indexOf("register.jspx") > 0) {
		url = "";
	}
	window.top.location = "../register.jspx?ref=" + EscapeURI(url);
}
/**
 * 条件：jQuery转化后的DOM图片对象
 * 单张图片延时加载：原理就是首先显示一张预备的小图片，等待文档加载完毕后，执行该方法，加载包含在该元素属性中的真正图片路径
 * @param attr 储存了真正src的属性名字（建议使用data-src）
 * @param callback 回调函数 真正的src加载完毕后，执行
 */
jQuery.fn.lazyLoad=function(attr,callback){
	var _this = $(this);
	var src = _this.attr(attr);
	if(src){
		if(jQuery.isFunction(callback)){
			_this.get(0).onload =callback;
		}
		_this.attr("src",src);
		_this.removeAttr(attr);
	}
}
/**
 * 批量设置延迟加载的图片（该方法主要是根据选择器获取指定的元素集合，然后通过遍历，设置每个元素.lazyLoad方法）
 * @param selector:选择器（例如："#img"、".img"、"img"等等）
 * @param attr  储存了真正src的属性名字（建议使用data-src）
 * @param callback 回调函数 真正的src加载完毕后，执行
 */
jQuery.lazyLoad=function(selector,attr,callback){
	$(selector).each(function(index){
		$(this).lazyLoad(attr,function(){
			callback(index)
		});
	});
};

//设置坐车网设为首页
function SetToHome(the) {
	try {
		the.style.behavior = 'url(#default#homepage)';
		the.setHomePage('http://www.zuoche.com/');
	} catch(e) {
		if (window.netscape) {
			try {
				netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
			} catch(e) {
				alert('抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为“true”');
			}
		} else {
			alert('抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将 http://www.zuoche.com/ 设置为首页。');
		}
	}
	return false;
}

// js身份证号验证2
function checkIdcard(idcard) {
	var Errors = new Array("验证通过!", "身份证号码位数不对!", "身份证号码出生日期超出范围或含有非法字符!", "身份证号码校验错误!", "身份证地区非法!");
	var area={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}
	var retflag = false;
	var idcard, Y, JYM;
	var S, M;
	var idcard_array = new Array();
	idcard_array = idcard.split("");
	// 地区检验
	if (area[parseInt(idcard.substr(0, 2))] == null) return Errors[4];
	// 身份号码位数及格式检验
	switch (idcard.length) {
	case 15:
		if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)) {
			ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/; // 测试出生日期的合法性
		} else {
			ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/; // 测试出生日期的合法性
		}
		if (ereg.test(idcard)) return Errors[0];
		else {
			return Errors[2];
		}
		break;
	case 18:
		// 18位身份号码检测
		// 出生日期的合法性检查
		// 闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
		// 平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
		if ((parseInt(idcard.substr(6, 4)) % 4 == 0 && parseInt(idcard.substr(6, 4)) % 100 != 0) || parseInt(idcard.substr(6, 4)) % 400 == 0) {
			ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; // 闰年出生日期的合法性正则表达式
		} else {
			ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; // 平年出生日	期的合法性正则表达式
		}
		if (ereg.test(idcard)) { // 测试出生日期的合法性
			// 计算校验位
			S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 + parseInt(idcard_array[7]) * 1 + parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9]) * 3;
			Y = S % 11;
			M = "F";
			JYM = "10X98765432";
			M = JYM.substr(Y, 1); // 判断校验位
			if (M.toUpperCase() == idcard_array[17] || M.toLowerCase() == idcard_array[17]) return Errors[0]; // 检测ID的校验位,自动转换大小写
			else {
				return Errors[3];
			}
		} else return Errors[2];
		break;
	default:
		return Errors[1];
		break;
	}
}

function checkPassport(str) {
	return /(P\d{7})|(G\d{8})/.test(str);
}

// 电话号码正则判断(固话)
function IsTelephone(obj) {
	var pattern = /(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)/;
	return pattern.test(obj) ? true: false;
}

/** **评价星星迁入common***** */
var Ratings = function(div, value) {
	this.id = this._stack.push(this) - 1;
	this.images = new Array();
	this.onSet = null;
	this.value = value;
	if (div) {
		this.show(div, value);
	}
}

Ratings.prototype._stack = new Array();
Ratings.prototype._labels = ['差', '一般', '还可以', '比较好', '非常好'];
Ratings.prototype._white = '../images/travel/star_white.gif';
Ratings.prototype._hover = '../images/travel/star_hover.gif';
Ratings.prototype._yellow = '../images/travel/star_yellow.gif';
Ratings.prototype.show = function(div, value) {
	this.div = div;
	if (null != value) this.value = value;
	this.div.innerHTML = '';
	var i;
	var img;
	for (i = 0; i < this.value; i++) {
		img = document.createElement("IMG");
		img.src = this._yellow;
		img.onmouseout = new Function('Ratings.prototype._stack[' + this.id + '].update(-1)');
		img.onmouseover = new Function('Ratings.prototype._stack[' + this.id + '].update(' + (1 + i) + ')');
		img.onclick = new Function('Ratings.prototype._stack[' + this.id + '].set(' + (1 + i) + ')');
		this.images[i] = img;
		this.div.appendChild(img);
	}
	for (; i < this._labels.length; i++) {
		img = document.createElement("IMG");
		img.src = this._white;
		img.onmouseout = new Function('Ratings.prototype._stack[' + this.id + '].update(-1)');
		img.onmouseover = new Function('Ratings.prototype._stack[' + this.id + '].update(' + (1 + i) + ')');
		img.onclick = new Function('Ratings.prototype._stack[' + this.id + '].set(' + (1 + i) + ')');
		this.images[i] = img;
		this.div.appendChild(img);
	}
}
Ratings.prototype.update = function(idx) {
	if ( - 1 == idx) {
		idx = this.value;
		var i;
		for (i = 0; i < idx; i++) {
			img = this.images[i];
			img.src = this._yellow;
		}
		for (; i < this._labels.length; i++) {
			img = this.images[i];
			img.src = this._white;
		}
		return;
	}
	var i;
	for (i = 0; i < idx; i++) {
		img = this.images[i];
		img.src = this._hover;
	}
	for (; i < this._labels.length; i++) {
		img = this.images[i];
		img.src = this._white;
	}
}
Ratings.prototype.set = function(value) {
	if (this.onSet) this.value = this.onSet(value, this);
	else this.value = value;
	this.update( - 1);
}

/**
 * 兼容IE的png不透明底，对象一定要是div或a标签，具体例子请查看客户端下载页
 * @param id图片id或jQuery元素对象例如：element或者jQuery("#id")
 */
function setIEFilter(id, src) {
	var _this = jQuery("#" + id) | id;
	if (_this && (_this.is("div") || _this.is("a"))) {
		if (_ISIE6) {
			_this.css("filter", "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=scale, src='" + src + "')");
		} else {
			_this.css("background-image", "url('" + src + "')");
		}
	}
}

//拖动盒子
jQuery.fn.drag=function(dragBar){
	var box = $(this), xold = 0,yold = 0,title = dragBar?dragBar:box;//标题
	var boxWidth = box.outerWidth(),boxHeight = box.outerHeight();//盒子宽高
    title.hover(function() {
    	title.css("cursor", "move");
    }, function() {
    	title.css("cursor", "default");
    });
    
    title.mousedown(function(e){
        var offset = title.offset();
        var x = e.pageX - offset.left;//鼠标相对移动块的位置
        var y = e.pageY - offset.top;
        var scrollTop = _Doc.scrollTop();//距离顶部的距离
        var winWidth = _Win.width(),winHeight=_Win.height()+scrollTop;//窗口的宽度
        _Doc.bind('selectstart', function() {
            return false;
        });
        _Doc.bind("mousemove", function(ev) { //绑定鼠标的移动事件，因为光标在DIV元素外面也要有效果，所以要用doucment的事件，而不用DIV元素的事件
            var _x = ev.pageX - x; //获得X轴方向移动的值
            var _y = ev.pageY - y; //获得Y轴方向移动的值
            xold = _x, yold = _y;
//				
//        	title.html(_y+":"+(winHeight  - boxHeight));//
//            if (_x - xold > -1 && (_x >= winWidth -boxWidth  || _x <= 0)) {
//
                if (_y >= winHeight - boxHeight || _y <= 0) {
                    return false;
                }
//                box.css("top",_y+"px");
//                return false;
//            }
            if (_y - yold >= -1 && (_y >=winHeight  - boxHeight || _y-scrollTop <= 0)) {
//                if (_x >= winWidth - boxWidth || _x <= 0) {
//                    return false;
//                }
                box.css("left",_x+"px");
                return false;
            }
            box.css({ left: _x + "px", top: _y + "px", opacity: "0.5"});//
        });
    });
    _Doc.mouseup(function() {
        $(this).unbind("mousemove selectstart");
        if (box.css("opacity") == 0.5) {
            box.animate({
                opacity: 1
            }, 400);
        }
    });
	return box;
};
//显示或设置滚动条为默认值
jQuery.showScroll=function(){
	if(noBox()){
		_Body.css("overflow","");
		_Html.css("overflow","");
	}
};
//隐藏滚动条
jQuery.hideScroll=function(){
	_Body.css("overflow","hidden");
	_Html.css("overflow","hidden");
};
/**
 * 
 * 在指定的坐标点显示指定的div 替换原来的ShowDiv(div, x, y, w)
 * @param jquery元素对象如：jQuery("#div");
 * @param x x轴坐标
 * @param y y轴坐标(x，y不指定则居中显示)
 * @param w 设定元素的宽度，不指定则为元素默认宽度
 * 使用方法jQuery.ShowDiv(jQuery("#div"),x,y,[w]);//中括号表示可选参数
 */
function setPosition(div, x, y, w,dragable) {
	if (div) {
		var w = jQuery.isNumeric(w) ? w: div.outerWidth(),
		h = div.outerHeight();
		div.css({position: _modalPosition,visibility: "visible",display: "block",width: w});
		if (jQuery.isNumeric(x) && jQuery.isNumeric(y)) {
			div.css({left: x,top: y});
		} else {
			div.showCenter();//居中显示
		}
	}
	return dragable?div.drag():div;
};
/**
 * 弹出层：已经提供了弹出的标题，和关闭功能
 * 参数说明：需要传入一个对象格式为：
 * {
 * 		htmlcode:"",//html代码生成内容
 * 		css:{},//设置弹出层的样式以对象的形式，例如：{height:"300px",width:"500px",background:"white"}
 *		title:"标题",//设置标题
 * 		titlebgcolor:"",//设置标题的背景颜色，例如：blue;
 * 		titlecolor:"",//设置标题的文字颜色，例如：blue;
 * 		showModal:false,//是否生成遮罩
 * 		dragAble:false,//是否可以拖动
 * 		handler:null,//弹出层生成后执行的时间，可以为弹出的内容绑定事件
 * 		handlerFeforeClose:窗口关闭前执行
 * };
 */
jQuery.showBox=function(data){
	jQuery.hideScroll();//隐藏滚动条
	var mWidth = _Win.width(),mHeight=_Doc.height();
	var index=999,boxcount = _boxArray.length;
	var d={htmlcode:"",css:{fontSize:"14px",fontWeight:"bolder"},
			title:"标题",
			titlebgcolor:"#57b7e1",
			titlecolor:"#ffffff",
			showModal:true,dragAble:true,
			handler:null,duration:"normal",showClose:true,
			notitle:false,mCss:{},isScroll:true,handlerFeforeClose:null
	};
	if(jQuery.isPlainObject(data)){
		d=jQuery.extend(d,data)
		d.duration=_ISIE6?0:d.duration;
	}
	if(boxcount>0){
		index = _boxArray[boxcount-1];
	}
	var modalcss = {position:_modalPosition,top:0, left:0, width:mWidth, height:mHeight, background:"#000",zIndex:index,opacity:"0.5"};
	var boxcss = {width: "500px", height: "400px", background:"white",boxShadow:"5px 5px 13px rgba(0,0,0,0.6)",zIndex:(index+1)};
	var modal = $("<div/>").css(modalcss).css(d.mCss);//遮罩
	var box =$("<div/>").attr("class","_box").css(boxcss).css(d.css).data("isBox",true);//盒子
	_boxArray.push(index+1);
	var close=function(fn){//关闭
		if(d.showModal){
			modal.fadeOut(d.duration);
		}
		_Callback = fn;
		box.fadeOut(d.duration,function(){
			box.remove();
			modal.remove();
			_boxArray.splice($.inArray(index+1,_boxArray),1);
			jQuery.showScroll();//显示滚动条
			if(jQuery.isFunction(_Callback)){
				_Callback();
			}
		});
	};
	box.data("close",close);
	// 标题默认样式
	var title_css = {height:"25px",width:box.innerWidth()-10,padding:"5px",borderBottom:"1px solid #d8d8d8",textAlign:"center",lineHeight:"25px",fontSize:"16px",fontWeight:"bold",visibility:d.notitle?"hidden":"visible"};
	//标题
	var titlediv =$("<div/>").css(title_css).html(d.title);
	titlediv.css({"color":d.titlecolor,"background":d.titlebgcolor});
	
	var content = $("<div/>").attr("class","_content").css({width:"100%",height:box.height()-titlediv.height()-11,marginTop:"-23px",overflowX:"hidden",overflowY:(d.isScroll?"auto":"hidden")}).append(d.htmlcode);//内容
	box.bind("mousedown",function(){
		var ind = parseInt(box.css("zIndex")), _index = _boxArray[_boxArray.length-1];//现在index和最大的max比较
		if(ind<_index){
			box.css("zIndex",_index+1);
			if(d.showModal){
				modal.css("zIndex",_index);
			}
			_boxArray.splice($.inArray(index,_boxArray),1);
			_boxArray.push(_index+1);
		}
	});
	//关闭按钮
	var closebtn = $("<div/>").attr("class","_close").css({height:"20px",width:"20px",position:"relative",top:"-29px",marginLeft:"-10px",left:(box.width()-22),cursor:"pointer",visibility:d.showClose?"visible":"hidden"})
	.append("<span class='to_close'></span>").click(function(){
		close(d.handlerFeforeClose);
	});
	closebtn.find(".to_close").hover(function(){
		$(this).addClass("to_closehover");
	},function(){
		$(this).removeClass("to_closehover");
	});
	box.append(titlediv).append(closebtn).append(content);
	if(d.notitle && !d.showClose){
		titlediv.css("display","none");
		closebtn.css("display","none");
		content.css({height:box.height()-titlediv.height()+19,marginTop:"0"});
	}
	box.showCenter();//居中显示
	if(d.dragAble){
		box.drag(titlediv);
	}
	_Body.append(box);
	if(d.showModal){
		_Body.append(modal);
	}
	_Win.bind("resize",function(){
		if(_boxArray.length==0){
			return;
		}
		box.showCenter();//居中显示
		if(d.showModal){
			var modalcss = {position:_modalPosition,top:0, left:0, width:mWidth, height:mHeight, background:"#000",zIndex:index};
			modal.css(modalcss);
		}
	});
	if(jQuery.isFunction(d.handler)){
		d.handler();
	}
	return box;
};
//等待
jQuery.loading=function(data){
	var icon=jQuery("<img src='../images/loading_big.gif' style='margin-top:15px; height:40px;'/>");
	var box=jQuery("<div style='height:100px;width:200px;text-align:center;top:0;position:relative'/>").append(icon);
	var d={htmlcode:box,notitle:true,showClose:false,css:{width:"200px",height:"140px",borderRadius:"5px",
		border:"1px solid #DDDDDD",background:"black",opacity:"0.9",boxShadow:"2px 2px 3px rgba(136,136,136,0.6)"},
		mCss:{"opacity":"0.5"}};
	return jQuery.showBox(d);
};
//对话框
jQuery.showDialog=function(data){
	var d={htmlcode:"",message:"这是对话框",
			css:{width:"350px",height:"180px"},
			title:"温馨提示",showModal:true,dragAble:true,
			handler:null,duration:"normal",showClose:true,
			enter:null,cancel:null,icon:"../images/dialog_test.png",
			cancelText:_texts.cancel,enterText:_texts.enter
	};
	if(jQuery.isPlainObject(data)){
		d=jQuery.extend(d,data)
	}
	var ip_btn={//按钮样式
			width:"60px", height:"30px",lineHeight:"30px", textAlign:"center",
			cursor: "pointer",border: "1px solid #CCC",background: "#eeeeee",
			float: "right",marginLeft: "10px",textShadow: "#fff 0 -1px 0",display:"none",fontSize:"12px"
	};
	var icon = jQuery("<img style='position: relative;top: 3px;margin-right: 5px;'/>").attr("src",d.icon);//图标
	var message=jQuery("<span/>").text(d.message);//提示信息
	var meessageInner=jQuery("<div style='width:100%; height: auto; margin-bottom: 40px;margin-top:30px;font-size: 12px;'/>").append(icon).append(message);//内框
	var btnEnter = jQuery("<div/>").html(d.enterText).css(ip_btn);//确认按钮
	var btnCancel = jQuery("<div/>").html(d.cancelText).css(ip_btn);//取消按钮
	var buttons = jQuery("<div style='width: auto; height: 35px; margin-right: 30px; clear: both;'/>").attr("class","to_middle").append(btnCancel).append(btnEnter);//按钮
	var messageoutter = jQuery("<div style='text-align: left;text-indent: 30px;'/>").append(meessageInner);//按钮外边框
	var dialog = jQuery("<div style='width:350px; height: 100px;text-align: center;'/>").append(messageoutter).append(buttons);//对话框下部分
	d.htmlcode = dialog;
	var box =jQuery.showBox(d), close = box.data("close");//关闭事件
	var realFn=function(fn){//获取真实的函数
		if( jQuery.inArray(fn,_sysFn)!=-1){
			return close;
		}else if(jQuery.isFunction(fn)){
			return function(){
				close(fn);
			};
		}
	}
	//事件
	if(!d.enter && !d.cancel){
		btnEnter.show(0).bind("click",close);
	}else{
		if(d.enter){//确定按钮
			btnEnter.show(0).bind("click",realFn(d.enter));
		}
		if(d.cancel){
			btnCancel.show(0).bind("click",realFn(d.cancel));
		}
	}
	return box;
};

//判断没有弹出层
function noBox(){
	return _boxArray.length==0;
}
//存在弹出层时禁止菜单
//_Doc.bind("contextmenu",function(e){
//	return noBox();
//});
//存在弹出层时，禁止滚动
_Win.bind("mousewheel",function(e){
	return noBox();
});
/**
 * 获取随机数参与用于aj的url
 * flag:是否前面不添加“&”
 */
function getRanUrl(flag){
	return (flag?"":"&"+"sign=")+parseInt(Math.random(9)*1000000);
}