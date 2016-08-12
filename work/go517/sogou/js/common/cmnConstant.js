/**
 * Created by yuexing on 2015/11/22.
 * 这是一些常量的定义
 * @author : yuexing(yuexing0921@gmail.com)
 * @since  : 2015/11/22.
 * @version: 1.0.0
 */
(function(require,define){
	define("constant",["cmnUtils"],function(cmnUtils){
		var htMainHref  =  document.getElementById("go517-requirejs").src;
		var serverHead = "chrome-extension://";
		var serverURL = serverHead + cmnUtils.getHost(htMainHref) + "/plugin";
		var constant = {
			originURL : serverURL,//为了和海淘类网站的目录进行区分，特定设立了
			science	  : isStageOrProdOnline(),//判断是什么环境
			serverAPI :{//参见java接口：http://wiki.izene.com/index.php/Banghitao-Server#.E5.9F.9F.E5.90.8D.EF.BC.9A
				lvURL		: getLvURL() + "/plu/js.htm",//java请求lv功能适配规则文件的接口
				lcLvURL		: serverURL + "/lvRule/sites/",//如果java请求不到，就用本地的适配规则文件
				cookieURL	: "",//请求java的接口，把插件内的cookie存储到服务器端 TODO,JAVA暂未开发
				//cpsURL		: getCpsURL() + "/redirect/_c.do",//请求BI的cps跳转接口
				//reURL		: "//banx.hai33.com/r.do?jsonp=?",//请求BI的广告接口
				cmnJsonURL  : serverURL + "/lvRule/cmnJson.json",//共通json
				//rateJsonURL : getRateJsonURL() + "/conf/rate.htm?jsoncallback=?",//汇率接口
				hostRuleURl : serverURL + "/rule/site/",//各个网站的规则json
				hostViewURl : serverURL + "/js/view/",//view地址
				traceBIURL  : getTraceBIURL() + "/yt/__utm.gif"//BI日志接口
			},
			view : {//这里存放的是各种各样的viewID就是EJS内的最顶层元素的ID
				VIEW_EMBED_ID               : "#haitao-embed-main",//嵌入页
				VIEW_EMBED_WEIGHT_ID        : ".haitao-goods-weight-label",//嵌入页的里面关于重量的ID
				VIEW_DOWNBAR_ID             : "#haitao-embed-main",//导航页
				VIEW_DOWNBAR_OPENCLOSE_ID   : "" +".haitao-downbar-openclose"//打开关闭bar
			},
			storage : {//STORAGE 放在localstorge里面或者cookie里面的名字
				STORAGE_RATE_TYPE       : "_haitaoRateType",//汇率ID
				STORAGE_RATE_VALUE      : "_haitaoRateValue",//汇率
				STORAGE_RATE_COUNTRY    : "_haitaoRateCountry",//所在国家，计算运费的时候会用到
				STORAGE_HREF_SERVER		: "_haitaoMainHref",//js注入时候的href
				STORAGE_BI_UUID         : "_haitaoBIUUID",//uuid
				
			},
		};
		return constant;


		function getTraceBIURL(){//获取BIlog接口 只有stage接口和线上接口
			if(isStageOrProdOnline() != "line"){//如果不是本地环境，就用stage环境
				// 下面注释代码不要删除，方便本地测试的时候进行调试
				// http://tr.hai33.com 线上环境
				// http://yt.stage.com stage环境
				return "https://tr.hai33.com";
			}else{//线上环境
				return "https://tr.hai33.com";
			}
		};
		function getLvURL(){//获取LV文件的接口 只有stage接口和线上接口
			if(isStageOrProdOnline() != "line" ){//如果是本地环境就用stage，如果不是，是什么环境就用什么环境
				return "https://phai33.stage.com";
			}else{
				return serverHead + "p.hai33.com";
			}
		};
		function getCpsURL(){//获取cps跳转路径
			if(isStageOrProdOnline() != "line" ){//如果是本地环境就用stage，如果不是，是什么环境就用什么环境
				return "http://clicks2.hai33.com:8081";//为了不暴露地址，这个要绑定host 172.16.11.220
			}else{
				if (cmnUtils.getDomain() == 'jumei.com') {
					return serverHead + 'clicks2.ruyisou.net';
				}else{
					return serverHead + "clicks2.hai33.com";
				}
			}
		};
		/**
		 * 判断是什么环境
		 * stage
		 * prod
		 * onLine
		 * local 本地测试环境
		 * return "stage" or "prod" or "line" or "local"
		 * **/
		 function isStageOrProdOnline(){//return
			var domain = cmnUtils.getDomain(htMainHref);
			if(domain == "stage.com"){
				return "stage";
			}else if(domain == "prod.com"){
				return "prod"
			}else if(domain == "hai33.com"){
				return "line";
			}else{
				return "local";
			}
		};

	});
})(R.require,R.define);

