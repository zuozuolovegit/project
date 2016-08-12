/**
 * Created by yuexing on 2015/11/19.
 * 
 * 
 * 
 * 
 * 
 */
(function(require,define){

	define(["constant","cmnUtils","ejs","jquery_G_j","jq"],function(constant, cmnUtils, ejs, jquery_G_j, jq){
		var tipsmian = {
			/**
			 * 业务逻辑：
			 * 加载业务逻辑
			 *   
			 * **/
			run : function(){
			   
			   
			   cmnUtils.loadScript("js/import/hmt.js");
			   //cmnUtils.loadScript("js/effect/click.js");
			   /*cmnUtils.loadScript("js/import/jquery-1.11.3.js");*/
			   var html = new EJS({url:'view/tips.ejs'}).text;
			   //jq$("body").prepend(html);
			   jq$("body").append(html);
			},
		}
		return tipsmian;
	});
})(R.require,R.define);
