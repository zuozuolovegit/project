/***点击a标签后更改跳转网址的链接***/

/*(function(require,define){
	define(["cmnUtils","jq"],function(cmnUtils,jq){
		var EventListener = {
			clickChangeLink : function(){
				jq$(".go517-content-shopping-list ul li a").click(function(){
					var a_href = jq$(this).attr("href");
					var uuid = cmnUtils.getlocalStorage("go517_uuid");
					jq$(this).attr("href", a_href + uuid + "2");
			    })
			},
		}
		return EventListener;
	});	
	EventListener.clickChangeLink();
})(R.require,R.define);*/
	

