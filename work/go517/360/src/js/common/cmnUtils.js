/***
 * Created by yuexing on 2015/10/29.
 * 共通模块
 * 一些常用共通处理方式（和业务没有关系）
 * @author : yuexing(yuexing0921@gmail.com)
 * @since  : 2015/10/29.
 * @version: 1.0.0
 * **/
(function(require,define){
	!window.localStorage && function(){//如果没有localStorage对象，则对其初始化
		window.localStorage = {};
		var prefix = 'data-userdata',
			body = document.body,
			html = document.documentElement,
			mark = function(key, isRomove){
				// key 值字符串
				try {
					html.load(prefix);
					var tmp = html.getAttribute(prefix);
					tmp = !tmp ? '' : tmp;
				} catch(e) {
					tmp = '';
				}

				var reg = tmp.indexOf(key) === 0 ? new RegExp('\\b' + key + '\\b,?', 'i') : new RegExp(',?\\b' + key + '\\b', 'i'),
					hasKey = reg.test(tmp) ? true : falocalStoragee;

				tmp = isRomove ? tmp.replace(reg, '') : hasKey ? tmp : tmp === '' ? key : tmp.split(',').concat(key).join(',');
				html.setAttribute(prefix, tmp);
				html.save(prefix);
			};

		body.addBehavior('#default#userData');
		html.addBehavior('#default#userData');

		// getItem()
		localStorage.getItem = function(key){
			try {
				body.load(key);
				return body.getAttribute(key);
			} catch(e) {
				return null;
			}
		};

		// setItem()
		localStorage.setItem = function(key, value){
			body.setAttribute(key, value);
			body.save(key);
			mark(key, false);
		};

		// removeItem
		localStorage.removeItem = function(key){
			body.removeAttribute(key);
			body.save(key);
			mark(key, true);
		};

		// clear()
		localStorage.clear = function(){
			try {
				html.load(prefix);
				var attrs = html.getAttribute(prefix).split(',')
					, len = attrs.length;

				for (var i = 0; i < len; i++) {
					body.removeAttribute(attrs[i]);
					body.save(attrs[i]);
				}

				html.setAttribute(prefix, '');
				html.save(prefix);
			} catch(e) {

			}
		};
	}();
	define("cmnUtils",function(){
		var cmnUtils = (function () {
			/**
			 * @constructor
			 * @name protype
			 * @returns {} protype
			 */
			var protype = {};
			/**
			 * date类型转换成YYYYMMDDHHNNSS的Number类型，便于时间计算
			 * @param {object} date date
			 * @returns {Number} YYYYMMDDHHNNSS 数値化
			 */
			protype.dateFormatYYYYMMDDHHNNSS = function (date) {
				if(!date){
					date = new Date();
				}
				var YYYY = date.getYear ();
				if (YYYY < 1900) {
					YYYY += 1900
				}
				var MM = String (date.getMonth () + 1);
				if (MM.length < 2) {
					MM = "0" + MM
				}
				var DD = String (date.getDate ());
				if (DD.length < 2) {
					DD = "0" + DD
				}
				var HH = String (date.getHours ());
				if (HH.length < 2) {
					HH = "0" + HH
				}
				var NN = String (date.getMinutes ());
				if (NN.length < 2) {
					NN = "0" + NN
				}
				var SS = String (date.getSeconds ());
				if (SS.length < 2) {
					SS = "0" + SS
				}
				return Number (String (YYYY) + MM + DD + HH + NN + SS);
			};
			/**
			 * 获取一个url的域名 如 taobao.com
			 * @option {string} url 可以不传，如果不传则返回当前页面的hostName
			 * @returns {} domain
			 */
			protype.getDomain = function (url) {
				var hostname = '';
				try {
					hostname = url || (window.location || document.location).hostname;
					hostname = hostname.match(/([-\w]+\.\b(?:net\.cn|com\.hk|com\.cn|com\.au|co\.uk|co\.jp|co\.kr|com|ca|jp|de|in|cn|net|org|cc|tv$|hk)\b)/)[1];
				} catch (e) {
				}
				return hostname;
			};
			/**
			 * 获取一个url的host 如 www.taobao.com
			 * @option {string} url 可以不传，如果不传则返回当前页面的host
			 * @returns {} domain
			 */
			protype.getHost = function (url) {
				var host = '';
				try {
					host = url || (window.location || document.location).href;
					host = host.match (/(^\w+\:)*\/\/([^\/]*).*/);

					if(host[2]){
						return host[2];
					}
				} catch (e) {
				}
				return host;
			};
			/**
			 * 把一个带有带有单位的值，返回不带有单位的float
			 * @param {string} str 带有币种符号的值
			 */
			protype.getFloat = function (str) {
				var temp = str.toString().match(/[0-9]+.?[0-9]*/);
				var price = 0;
				if(temp){
					price = temp[0].replace(",","");
				}
				return Number(this.fomatFloat(price,2)).toFixed(2);
			};
			/**
			 * 判断一个字符串是否是数字
			 * @param {string} str
			 */
			protype.isNumber = function (str) {
				var temp = str.toString().match(/[0-9]+.?[0-9]*/);
				if(temp){
					return true;
				}
				return false;
			};
			/**
			 * 把一个数字，进行4舍6如
			 * @param {string} strNumber strNumber
			 * @param {number} pos 精确到几位
			 * @return
			 */
			protype.fomatFloat = function (strNumber,pos){
				return Math.round(strNumber*Math.pow(10, pos))/Math.pow(10, pos);
			}
			/**
			 * 获取url后面的所有参数 url为传过来的链接
			 * @param {string} id为参数名
			 * @returns {object} 参数值
			 */
			protype.getParams = function (url) {
				var name, value;
				var str = url; //取得整个地址栏
				var num = str.indexOf ("?")
				str = str.substr (num + 1); //取得所有参数   stringvar.substr(start [, length ]
				var arr = str.split ("&"); //各个参数放到数组里
				var params = [];
				for (var i = 0; i < arr.length; i++) {
					num = arr[i].indexOf ("=");
					if (num > 0) {
						name = arr[i].substring (0, num);
						value = arr[i].substr (num + 1);
						params[name] = value;
					}
				}
				return params;
			};
			/**
			 * 获取url后面的指定的参数
			 * url为传过来的链接（次方法因为谷歌的安全策略（eval），在background里面是不允许执行的）
			 * @param {string} id为参数名
			 * @returns {} 参数值
			 */
			protype.getParam = function (url, id) {
				url = url + "";
				var regstr = "/(\\?|\\&)" + id + "=([^\\&]+)/";
				var reg = eval (regstr);//eval可以将 regstr字符串转换为 正则表达式
				//var reg = new RegExp(regstr);
				var result = url.match (reg);//匹配的结果是：result[0]=?sid=22 result[1]=sid result[2]=22。所以下面我们返回result[2]
				if (result && result[2]) {
					return result[2];
				} else {
					return "";
				}
			};
			protype.loadCss = function(url){
				var link = document.createElement("link");
				link.rel = "stylesheet";
				link.href = url ;
				link.type = "text/css";
				//document.getElementsByTagName('head')[0].appendChild(link);
				head = document.getElementsByTagName('head')[0]
				head.insertBefore(link,head.firstChild);
			};
			protype.loadScript = function(url){
				var s = document.createElement ('script');
				s.type = 'text/javascript';
				s.charset = 'UTF-8';
				s.src = url;
				var p = document.getElementsByTagName ('head')[0] || document.documentElement;
				p.insertBefore (s, p.firstChild);
			};
			protype.getlocalStorage = function(name){//获取localStorage和cookie内
				if(localStorage){
					return localStorage.getItem(name);
				}else{
					return this.getCookie(name);//IE67没有localstorage，所以用cookie
				}
			};
			protype.setlocalStorage = function(name,value){//写localStorage和cookie内
				if(localStorage){
					localStorage.removeItem(name);
					localStorage.setItem(name,value);
				}else{
					this.setCookie(name,value);//IE67没有localstorage，所以用cookie
				}
			};
			protype.setCookie = function(name,value){//写cookies
				var Days = 30;
				var exp = new Date();
				exp.setTime(exp.getTime() + Days*24*60*60*1000);
				document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
			};
			//读取cookies
			protype.getCookie = function(name){
				var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
				if(arr=document.cookie.match(reg))
					return unescape(arr[2]);
				else
					return null;
			};
			protype.delCookie = function (name){//删除cookies
				var exp = new Date();
				exp.setTime(exp.getTime() - 1);
				var cval = this.getCookie(name);
				if(cval!=null)
					document.cookie= name + "="+cval+";expires="+exp.toGMTString();
			};


			protype.shieldElemet = '';
			/**
			 * 当ajax通信时弹出层
			 */
			protype.showShield = function () {
				jq$("#shield-pannel").remove ();
				this.shieldElemet = document.createElement ("div");
				this.shieldElemet.id = "shield-pannel";
				document.body.appendChild (this.shieldElemet);
			};
			/**
			 * 当ajax通信完成时消除层
			 */
			protype.hideShield = function () {
				this.shieldElemet = undefined;
				jq$("#shield-pannel").remove ();
			};
			protype.isMobile = function(value) {
				return /^(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/.test(value);
			};
			protype.isEmail = function(value) {
				return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]{2,})+$/.test(value);
			};
			/**
			 * 转换为https
			 */
			protype.toHttps = function(url) {
				if (location.href.indexOf('https') == 0 && url.indexOf('https') != 0) {
					url = url.replace('http', 'https');
				}
				return url;
			};
			/**
			 * 浏览器版本判断
			 */
			protype.browser = {
				/**
				 * @param {object} S bht根对象
				 */
				checkBoxModel: function(S) {
					if (typeof S.boxModel !== 'undefined') return S.boxModel;
					var div = document.createElement("div"),
						body = document.body;
					div.style.cssText = "visibility:hidden;border:0;width:1px;height:0;position:static;padding:0px;margin:0px;padding-left:1px;";
					document.body.appendChild(div);
					S.boxModel = this.boxModel = div.offsetWidth === 2;
					document.body.removeChild(div);
					div = null;
					return S.boxModel;
				},
				isIE6: (function() {
					var ua = window.navigator.userAgent.toLowerCase();
					var m = (/(msie) ([\w.]+)/).exec(ua);
					return m != null && m[2] < 7;
				})(),
				isIE: (function() {
					if (!!window.ActiveXObject || "ActiveXObject" in window)
						return true;
					else
						return false;
					//var ua = window.navigator.userAgent.toLowerCase();
					//var m = (/(msie) ([\w.]+)/).exec(ua);
					//return m != null ;
				})(),
				ltIE8: (function() {
					var ua = window.navigator.userAgent.toLowerCase();
					var m = (/(msie) ([\w.]+)/).exec(ua);
					if ((!!window.ActiveXObject || "ActiveXObject" in window)) {
						if (m != null) {
							return m[2] > 8;
						} else {
							return true;
						}
					} else {
						return true;
					}
				})()
			};

			/**
			 * console
			 */
			protype.console = {
				LEVEL: 'DEBUG',
				setLevel: function(l) {
					this.LEVEL = l;
				},
				debug: function(s) {
					if (this.LEVEL != 'DEBUG')
						return;
					try {
						window.console.debug(this.msg(s));
					} catch (e) {
						this.ieDebug(s);
					}
				},
				error: function(s) {
					if (this.LEVEL != 'ERROR')
						return;
					try {
						window.console.debug(this.msg(s));
					} catch (e) {
						this.ieDebug(s);
					}
				},
				ieDebug: function(s) {
					var msg = this.msg(s);
					setTimeout(function() {
						var test = document.getElementById('365tianxingzuo_test');
						if (!test) {
							test = document.createElement('div');
							test.id = "365tianxingzuo_test";
							test.style.display = 'none';
							document.body.appendChild(test);
						}
						var h = test.innerHTML;
						h = [h, '' + msg + '</br>'].join('');
						test.innerHTML = h;
					}, 13);
				},
				msg: function(s) {
					var date = new Date();
					var pad = function(aNumber) {
						return ((aNumber < 10) ? "0" : "") + aNumber;
					};
					s = date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate()) + " " + pad(date.getHours()) + ":" + pad(date.getMinutes()) + ":" + pad(date.getSeconds()) + " [" + this.LEVEL + "] [365tianxingzuo] " + s;
					return s;
				}
			};
			return protype;
		} ());
		return cmnUtils;
	});
})(R.require,R.define,R.S);

