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


