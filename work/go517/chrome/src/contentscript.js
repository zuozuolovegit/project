/**
 * content script
 * @author ch.z
 */
go_source=0;
go_uuid=0;
go_version=0;
go_sid = '5500';
go_browser = 'chrome';
go_plugin_v = "1.0.0";
go_search_logo = 0;  //注入的浏览器图标：0:百度，1:搜狗，2:360，3:必应, 4:google
(function(){
	//times = 1;
	var isErrorTimeout = 0;
	var hasInject = false;
	var com_go517_chrome = {
		init: function(){
			com_go517_chrome.startup(1);
		},
		infuse : function(data) {
			if(hasInject) return;
			hasInject = 1;
			var s, head;
			s = document.createElement("script");
			s.type = "text/javascript";
			s.charset = "utf-8";
			head = document.getElementsByTagName('head')[0];
			//go_uuid = data.uuid;//得到存储的值uuid和source
			//go_source = data.source;
			//var date = new Date();
			//var v = date.getFullYear() + "" + (date.getMonth() + 1) + "" + date.getDate();
			//scriptSrc = chrome.extension.getURL("js/")+"tips.js" + "?source="+ data.source +"&version=" + data.version + "&uuid=" + data.uuid + "&v="+ v  +"&g_sid" + g_sid;
			//var uri =  scriptSrc ;//+ "?url=" + location.href;
			//s.id = "go517-requirejs";
			//s.setAttribute("data-main",uri);
			s.src = chrome.extension.getURL("js/")+"import/hmt.js";
			head.appendChild(s);

			//chrome.extension.sendRequest({topic:"setEnv", uuid: go_uuid , source:go_source ,logo:go_search_logo}, function(){});	
		},


		startup : function(isError) {	
			var now = new Date();
			var expire = 24 * 60 * 60 * 1000
				- now.getHours() * 60 * 60 * 1000
				- now.getMinutes() * 60 * 1000
				- now.getSeconds() * 1000;
	        chrome.extension.sendRequest({  //得到localstorage里面存储的值，然后注入
				topic : "getEnv",
				options: {skip : true}
			}, function(data) {
				isError ? com_go517_chrome.infuse(data) : com_go517_chrome.init(data);
			});
		},
	};
	com_go517_chrome.init();


	var fabstrolabe = {
		disconnect: function(){
			//console.log("begin send from content to exit connect");
			chrome.runtime.sendMessage({action: "exitHost"}, function(response) {
				//console.log(response.farewell);
			});
		},

		getJsUrl:function(){
			chrome.runtime.sendMessage({topic:"inject",action:"getJsUrl"}, function(response) {
				//console.log(response.farewell);
			});
		},
		isEnoughActiveDayNum: function(){
			chrome.runtime.sendMessage({topic:"config",action: "isEnoughActiveDayNum"}, function(response) {
			});
		},
		getVersion: function(){
			chrome.runtime.sendMessage({topic:"config",action: "getVersion"}, function(response) {
			});
		},
		getBrowserPopUrl: function(){
			chrome.runtime.sendMessage({topic:"config",action: "getBrowserPopUrl"}, function(response) {
			});
		},
		setCache: function(param){
			chrome.runtime.sendMessage({topic:"config","action": "setCache","param":param}, function(response) {

			});
		}, 
		getCache: function(param){
			chrome.runtime.sendMessage({topic:"config","action": "getCache","param":param}, function(response) {

			});
		},
		runClientSetting: function(param){
			chrome.runtime.sendMessage({topic:"config","action": "runClientSetting"}, function(response) {

			});
		}

	};

	function writeConfig(name, value){
		var configWrapper = document.getElementById("_cfgwp");
		if(!configWrapper){
			configWrapper = document.createElement("div");
			configWrapper.id = "_cfgwp";
			configWrapper.style="display:none;position:absolute;left:-9999px;";
			document.body.appendChild(configWrapper);
			configWrapper.appendChild(document.createElement("span"));
		}
		var configEle = configWrapper.children[0];
		configEle.setAttribute(name, value);
	}

	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

		if(!request.topic || request.topic !='inject')return;
		//clearTimeout(isErrorTimeout);
		var url = request.url;
		var params = url && url.substring(url.indexOf('?') + 1);
		var _params = params.split('&');
		params = {};var p;
		for (var i = 0, l = _params.length; i < l; i++) {
			p = _params[i].split('=');
			params[p[0]] = p[1] || '';
		}
		
		params.scriptSrc = url;
		com_go517_chrome.infuse(params);
	});
	/*var configs = ['version', 'isEnoughActiveDayNum', 'browserPopUrl'];
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		//console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");

		if(!request.topic || request.topic !='config')return;
		for(var i = 0; i < configs.length; i++){
			if(request[configs[i]])
				writeConfig(configs[i], request[configs[i]]);
		}
	});*/
})();
