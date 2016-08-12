/**
 * @author : yuexing(yuexing0921@gmail.com)
 * @since  : 2015/11/19
 * @version: 1.0.0
 * **/
(function(require,define){

	require.config({
		baseUrl: document.getElementById("go517-requirejs").src.match(/chrome-extension\S+js\//)[0],
		paths : {
			//whiteList   : 'common/cmnWhiteList',//白名单
			constant    : 'common/cmnConstant',//常用共通变量
			cmnUtils    : 'common/cmnUtils',//共通util
			//cmnAjax     : 'common/cmnAjax',//所有的ajax都通过这个进行请求
			popupmain   : 'create/popupmain',
			ejs         : 'import/ejs',
			jquery_G_j  : 'import/jquery-1.11.3',
			jq          : 'import/jquery',
			lz          : 'import/lz',
			click       : 'effect/click',
			loginanimate : 'effect/loginanimate',
			request     :  'effect/request',
			md5         :  'import/jquery.md5'
		},
		shim : {
			cmnUtils 	 : {deps : ["jq"]},
			cmnAjax  	 : {deps : ["jq"]},
			popupmain    : {deps : ["jq"]},
            click        : {exports : 'click'},
            md5          : {deps : ["jq"]}  
			//ejs         : {deps : ["import/jquery"]}
		}
	});
	/**
	 *  注入页面文件程序的入口
	 *  用require加载需要的js
	 *  然后进行初始化后加载
	 *  
	 * **/
	require(["constant","cmnUtils","popupmain"],function(constant, cmnUtils, popupmain){
		var main = {
			init : function() {
				//var host = cmnUtils.getDomain();
				var url = document.getElementById("go517-requirejs").getAttribute("data-main");
				    //cmnUtils.setlocalStorage(constant.storage.STORAGE_HREF_SERVER,url);//存储data-main的href，方便以后各种读取
					cmnUtils.loadCss("css/tips.css");
					cmnUtils.loadCss("css/tips-reset.css");
					//cmnUtils.setlocalStorage(constant.storage.STORAGE_RATE_TYPE,whiteList[host].rateType);//设置汇率单位
					//cmnUtils.setlocalStorage(constant.storage.STORAGE_RATE_COUNTRY,whiteList[host].country);//设置所在国家
					//EventListener.clickChangeLink();
					popupmain.run();//按照不同的网站加载规则
			},
		};
		main.init();
	});
})(R.require,R.define);