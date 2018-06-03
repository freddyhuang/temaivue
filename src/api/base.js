//重写alert方法，去掉地址显示
window.alert = function(name){
	var iframe = document.createElement("IFRAME");
	iframe.style.display="none";
	iframe.setAttribute("src", 'data:text/plain,');
	document.documentElement.appendChild(iframe);
	window.frames[0].window.alert(name);
	iframe.parentNode.removeChild(iframe);
}

//重写confirm方法，去掉地址显示
window.confirm = function(name){
	var iframe = document.createElement("IFRAME");
	iframe.style.display="none";
	iframe.setAttribute("src", 'data:text/plain,');
	document.documentElement.appendChild(iframe);
	var result = window.frames[0].window.confirm(name);
	iframe.parentNode.removeChild(iframe);
	return result;
}