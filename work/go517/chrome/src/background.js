 var exports={};
(function(S, undefined) {
	S.service = {
		/**
		 * @param env : {version,serviceUrl,source}
		 * @param urls : {version,serviceUrl,source}
		 * @param defaults :default params
		 */
		init : function(env, urls, defaults) {
			this.urls = urls;
			this.env = env;
			var params = [];
			if (defaults) {
				for (var i in defaults) {
					params.push(i);
				}
				this.default_params = params.join('&');
			}
		},
		_getUrl : function(url) {
			return url + (url.indexOf('?') == -1 ? '?' : "&") + this.default_params + "&t=" + new Date().getTime();
		},
		getUUID : function(request, callback, options) {
			S.ajax({
				url : this._getUrl(request && request.url || this.urls['getUUID']),
				success:function(data){
					callback(data);
				},
				error:function(xhr, statusCode, e){
					//S.console.debug('error,on get uuid,' + statusCode + ' ' + e);
					callback(null);
				}
			});
		},
		getEnv : function(request, callback) {
			callback(S.service.env);
		},
		getHotProducts : function(request, callback, options) {
			S.ajax({
				url : this._getUrl(request && request.url || this.urls['getHotProducts']),
				success:function(data){
					callback(data);
				},
				error:function(xhr, statusCode, e){
					//S.console.debug('error,on get hot,' + statusCode + ' ' + e);
					callback(null);
				}
			});
		},
		getHotMerchants : function(request, callback, options) {
			S.ajax({
				url : this._getUrl(request && request.url || this.urls['getHotMerchants']),
				success:function(data){
					callback(data);
				},
				error:function(xhr, statusCode, e){
					//S.console.debug('error,on get hot,' + statusCode + ' ' + e);
					callback(null);
				}
			});
		},
		getAlerts : function(request, callback, options) {
			S.ajax({
				url : this._getUrl(request && request.url || this.urls['getAlerts']),
				success:function(data){
					callback(data);
				},
				error:function(xhr, statusCode, e){
					//S.console.debug('error,on get alerts,' + statusCode + ' ' + e);
					callback(null);
				}
			});
		},
		/**
		 * the site to skip to inject script in the list
		 */
		siteSkipList : function(request, callback, options) {
			S.ajax({
				url : this._getUrl(request && request.url || this.urls['siteSkipList']),
				success:function(data){
					callback(data);
				},
				error:function(xhr, statusCode, e){
					//S.console.debug('error,on get alerts,' + statusCode + ' ' + e);
					callback(null);
				}
			});
		},
		notification : function(request, callback, options) {
			if(request.cmd == "show"){
				notifications.show({type:request.type, uuid: request.uuid, source: request.source});
			}
		},
		setEnv : function(request, callback, options) {
			var key_uuid = "extensions.go517.assist.uuid";
			var key_source = "extensions.go517.assist.source";
			var key_search_logo = "extensions.go517.assist.searchlogo"
			request.uuid && localStorage.setItem(key_uuid, request.uuid);
			request.source && localStorage.setItem(key_source, request.source);
			request.searchlogo && localStorage.setItem(key_search_logo, request.searchlogo);
		}
	};


    /*获取数据执行*/
    (function(){
	    chrome.runtime.onMessage.addListener(function(request, sender, sendresponse) {
	  	    var nickName = request.nickName;
	  	    var action = request.action;
	  	    if(topic == "inject" || topic == "config"){
		  	    if(msgToYTHT[action])msgToYTHT[action](request, sendresponse, sender.tab.id);
	  	    }
	    });
    })(); 

	/**
	 * @param request:         request params {topic:service name...},maybe has key 
	 * @param sendResponse:    response callback
	 * @param cache:           is cache
	 * @param options:         {refresh:false}
	 */
	S.service.helper = {
		requestHandler : function(request, sender, sendResponse , options) {
			var topic = request.topic;
			if (!request.url) request.url = S.service.urls[topic];//url in service
			try {
				if (topic.charAt(0) != '_' && typeof S.service[request.topic] === "function") {
					//from cache
					var key = request.key;
					if(!key){
						key = [], cache = null;
						for (var i in request) {
							if (i !== 'topic' && typeof request[i] !== 'object')
								key.push(request[i]);
						}
						key.sort().unshift(topic);
						key = key.join('_');
					}
					cache = S.cache.get(key);
					if (cache) return sendResponse(cache.value);
					
					// intercept cache ,data must be null if service failure
					var callback=function(){
						var data = arguments && arguments[0];
						if (data) S.cache.set(key, data, request.options);
						sendResponse.apply(this,Array.prototype.splice.call(arguments,0));
					}
					//S.console.debug("request for " + topic);
					S.service[request.topic](request, callback, options);
				} else {
					//S.console.debug("unknown request " + topic);
				}
			} catch (e) {
				//S.console.error("REQEUST ERROR:" + e.message + (e.stack ? "\n" + e.stack : ''));
			}
		}
	}
})(exports);
