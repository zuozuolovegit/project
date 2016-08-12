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
		var popupmain = {
			/**
			 * 业务逻辑：
			 * 加载业务逻辑
			 * **/

			 /****base64加解密算法*****/
		    base64EncodeChars : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",  
		    base64DecodeChars : new Array(  
		    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  
		    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  
		    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,  
		    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,  
		    -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,  
		    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,  
		    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,  
		    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1),  
		  
			base64encode : function(str) {  
			    var out, i, len;  
			    var c1, c2, c3;  
			  
			    len = str.length;  
			    i = 0;  
			    out = "";  
			    while(i < len) {  
			    c1 = str.charCodeAt(i++) & 0xff;  
			    if(i == len)  
			    {  
			        out += popupmain.base64EncodeChars.charAt(c1 >> 2);  
			        out += popupmain.base64EncodeChars.charAt((c1 & 0x3) << 4);  
			        out += "==";  
			        break;  
			    }  
			    c2 = str.charCodeAt(i++);  
			    if(i == len)  
			    {  
			        out += popupmain.base64EncodeChars.charAt(c1 >> 2);  
			        out += popupmain.base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));  
			        out += popupmain.base64EncodeChars.charAt((c2 & 0xF) << 2);  
			        out += "=";  
			        break;  
			    }  
			    c3 = str.charCodeAt(i++);  
			    out += popupmain.base64EncodeChars.charAt(c1 >> 2);  
			    out += popupmain.base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));  
			    out += popupmain.base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6));  
			    out += popupmain.base64EncodeChars.charAt(c3 & 0x3F);  
			    }  
			    return out;  
			},  
		  
			base64decode : function (str) {  
			    var c1, c2, c3, c4;  
			    var i, len, out;  
			  
			    len = str.length;  
			    i = 0;  
			    out = "";  
			    while(i < len) {  
			    /* c1 */  
			    do {  
			        c1 = popupmain.base64DecodeChars[str.charCodeAt(i++) & 0xff];  
			    } while(i < len && c1 == -1);  
			    if(c1 == -1)  
			        break;  
			  
			    /* c2 */  
			    do {  
			        c2 = popupmain.base64DecodeChars[str.charCodeAt(i++) & 0xff];  
			    } while(i < len && c2 == -1);  
			    if(c2 == -1)  
			        break;  
			  
			    out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));  
			  
			    /* c3 */  
			    do {  
			        c3 = str.charCodeAt(i++) & 0xff;  
			        if(c3 == 61)  
			        return out;  
			        c3 = popupmain.base64DecodeChars[c3];  
			    } while(i < len && c3 == -1);  
			    if(c3 == -1)  
			        break;  
			  
			    out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));  
			  
			    /* c4 */  
			    do {  
			        c4 = str.charCodeAt(i++) & 0xff;  
			        if(c4 == 61)  
			        return out;  
			        c4 = popupmain.base64DecodeChars[c4];  
			    } while(i < len && c4 == -1);  
			    if(c4 == -1)  
			        break;  
			    out += String.fromCharCode(((c3 & 0x03) << 6) | c4);  
			    }  
			    return out;  
			}, 
		/***读取插件安装目录下杀手加入的js文件，获取浏览器信息***/
		    /*var eeee=chrome.extension.getURL("type.js")
		    G_j.getJSON(eeee, function(json){
		      alert("JSON Data: " + json.type);
		    });*/
		    gettype : function(){
		    	var adddd;
			    G_j.ajax({
			      async: false,
			      type: "get",
			      url:chrome.extension.getURL("type.js"),
			      success: function(data){
			         adddd = JSON.parse(data).type;
			      }
			    })
			    return adddd;
		    },
		/***读取插件安装目录下杀手加入的文件中的uuid,版本号，硬件信息，渠道号***/

			    base64code : "js/info.js",
				base : function (u) {
					  var global = this;
					  var xhr;
					  xhr = new XMLHttpRequest();
					  xhr.open("GET", chrome.extension.getURL(u), true);
					  xhr.onreadystatechange = function(e) {
					    if (xhr.readyState === 4 && xhr.status === 200) {
					      popupmain.getbase.call(global, xhr.responseText);
					      //xmlDoc = xhr.responseText;
					    }
					  }; 
					  xhr.send(null);
				}, 
			    //console.log(xmlDoc)



			 getbase : function(data){
			 	  var sid = 2600;
			      junicode = popupmain.base64decode(data);
			      var str = '';  
			      for(var i = 0 , len =  junicode.length ; i < len ;++i){  
			           // str += String.fromCharCode(junicode[i]);
			            str += String.fromCharCode((junicode.charCodeAt(i) ^ (i * 0xcc + i)) & 0xff );
			      }  
			      basedata = JSON.parse(str);
			      baseVersion = basedata.v;
			      baseSource = basedata.q;
			      baseYJ = popupmain.base64decode(basedata.x);
			      uuid = basedata.y;
                  //uuid2 = cmnUtils.getlocalStorage("go517_uuid")
			      popupmain.clickChangeLink(uuid,popupmain.gettype(),baseSource,sid);
			      popupmain.clickChangeSearchValue(uuid,popupmain.gettype(),baseSource,sid);
			      popupmain.keyChangeSearchValue(uuid,popupmain.gettype(),baseSource,sid);
			      //setapp(baseSource,baseUUID);
			      //dde(baseUUID,baseSource);
			},
			//popupmain.base(popupmain.base64code);
            /***生成随机的UUID***/
            uuid : function(){
			    var s = [];
			    var hexDigits = "0123456789abcdef";
			    for (var i = 0; i < 36; i++) {
			        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
			    }
			    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
			    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
			    s[8] = s[13] = s[18] = s[23] = "";
			    var uuid = s.join("");
			    return uuid;
			},
            /***点击a标签跳转***/
            clickChangeLink : function(uuid,type,ch,sid){
				jq$(".go517-content-shopping-list ul li a").click(function(){
					var a_href = jq$(this).attr("href");
					//var uuid = cmnUtils.getlocalStorage("go517_uuid");
					jq$(this).attr("href", a_href + uuid + "2" + "&type=" + type + "&ch=" + ch + "&sid=" + sid);
					//popupmain.pluginActiveData(uuid);
			    })
			}, 
            /***点击搜索按钮***/
            clickChangeSearchValue : function(uuid,type,ch,sid){
            	//jq$(".go517-content-search button").unbind('click');  
			    jq$(".go517-content-search button").on("click",function(){
	                inputValue = encodeURIComponent(jq$(".go517-content-search input").val());
                    formAction = jq$(".form-get").attr("action");
                    jq$(".form-get").attr("action",formAction + uuid + "2" + "&type=" + type + "&ch=" + ch + "&sid=" + sid + "&k=" + inputValue);
                })
               // console.log("123456");
            },
            /***按下回车键***/
            keyChangeSearchValue : function(uuid){
            	/*jq$(".go517-content-search button").click(function(){
	                inputValue = encodeURIComponent(jq$(".go517-content-search input").val());
                    formAction = jq$(".form-get").attr("action");
                    jq$(".form-get").attr("action",formAction + uuid + "2" + "&k=" + inputValue);
                }),*/
                jq$(".go517-content-search input").keydown(function(){
	                    var e = e || event,
						keycode = e.which || e.keyCode;
						if (keycode==13) {
						$(".go517-content-search button").trigger("click");
                    }
                })
            },
            /***日志***/
            /*pluginActiveData : function(uuid){
                var timestamp = new Date().getTime();
                //var currenturl = window.location.href; 
            	var data = {
                     "uid": uuid, //用户唯一标识
				     "ct": timestamp, //客户端时间戳，
					 "pt": "2600", //产品的ID
					 "ad": "1014", //具体事件类型
					 "cl": "260000", //具体的渠道号
					 "ver": "1.0.0", //具体的版本号
					 "br": "chrome", //浏览器类型
					 "dl": "", //当前URL
					 "dr": "", // referrer,当前请求头中的referrer信息
					 "mid": "", //用户中心ID
            	 };
                		jq$.ajax({
                			//dataType : "json",
						    type: "GET",
						    url: "http://tr.go517.cn/gocrx/g.gif?"+ encodeURIComponent(JSON.stringify(data)),
						});

            },
*/
			run : function(){
			   cmnUtils.loadScript("js/import/jquery.hoverDelay.js");
			   cmnUtils.loadScript("js/effect/animate.js");	
			   cmnUtils.loadScript("js/effect/request.js");	
			   cmnUtils.loadScript("js/effect/login-animate.js");
			   cmnUtils.loadScript("js/import/jquery.md5.js");
			   cmnUtils.loadScript("js/import/lz.js");
			   //cmnUtils.loadScript("js/effect/click.js");
			   /*cmnUtils.loadScript("js/import/jquery-1.11.3.js");*/
			   var html = new EJS({url:'view/tips.ejs'}).text;
			   //jq$("body").prepend(html);
			   jq$("body").append(html);
			   //EventListener.clickChangeLink();

			   if(cmnUtils.getlocalStorage("go517_uuid")==null){
			   	  cmnUtils.setlocalStorage("go517_uuid",popupmain.uuid());  
			   }
			   //uuid = cmnUtils.getlocalStorage("go517_uuid");
			   /*popupmain.clickChangeLink(uuid);
			   popupmain.clickChangeSearchValue(uuid);
			   popupmain.keyChangeSearchValue(uuid);*/
			   popupmain.base(popupmain.base64code);
			},

			
		}
		return popupmain;
	});
})(R.require,R.define);
