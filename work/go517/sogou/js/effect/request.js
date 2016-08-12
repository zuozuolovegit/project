/*(function(require,define){

	define("loginreg",["cmnUtils","jquery_G_j"],function(cmnUtils, jquery_G_j){ 

	    var loginreg = {  */  

		    register=function(){
					var protocalhttp = "http://";
					var protocalhttps = "https://";
					var host = "www.go517.cn";
					var link = "/clt/user/register?";
					var name = G_j(".name").val();
					var email = G_j(".name").val();
					var pass1 = G_j(".pass1").val();
					var pass2 = G_j(".pass2").val();
					var v_url = protocalhttp + host + link;
					var md5code = G_j.md5(name + pass1);//md5加密，把加密后的密码提交。(规则：把用户名和密码相加后的字符串进行MD5加密当作密码)
					if(document.location.href.match(/https/)){
		                var v_url = protocalhttps + host + link;
					}
					if(pass1==pass2){
						G_j.ajax({
							url:v_url + "name=" + name +"&email=" + email + "&pass=" + md5code,
							type:'get',
							dataType:"jsonp",
							async:true,
							jsonp:"jsonp",
							//jsonpCallback:"Callback",
							success:function (data){
								if(data.ok){
									alert("注册成功");
									setTimeout(function(){location.href="http://www.jipucoffee.com/login.html";},2000);
								}		
								//console.log("suc:"+data.result.data.realtime.wind["windspeed"]);
							},
							error:function (xhr, statusCode, e){
								//console.log(0);
								//console.debug('error,on get hot,' + statusCode + ' ' + e);
								//callback(null);
							}
						});
					}
		    },



		    login=function (){
					var protocalhttp = "http://";
					var protocalhttps = "https://";
					var host = "www.go517.cn";
					var link = "/clt/user/login?";
					var name = G_j(".name").val();
					var pass1 = G_j(".pass1").val();
					var v_url = protocalhttp + host + link;
					var md5code = G_j.md5(name + pass1);
					if(document.location.href.match(/https/)){
		                var v_url = protocalhttps + host + link;
					}

					G_j.ajax({
						url:v_url + "name=" + name + "&pass=" + md5code,
						type:'get',
						dataType:"jsonp",
						async:true,
						jsonp:"jsonp",
						success:function (data){
							if(data.ok){
								/***序列化json数据存储在cookies里面***/
								/***UserLiveness活跃度，userInfo用户信息，userPoint用户积分***/
								cmnUtils.setCookie("UserLiveness",JSON.stringify(data.UserLiveness));
								//chrome.runtime.sendMessage({nickName:data.userInfo.nickName,active:data.userPoint.active,point:data.userPoint.userPoint},function(){})；
								alert("登陆成功");
							}
						},
						error:function (xhr, statusCode, e){
							//console.log(0);
							//console.debug('error,on get hot,' + statusCode + ' ' + e);
							///callback(null);
						}
					});
		    },


		    updatecode = function (){
		          var protocalhttp = "http://";
					var protocalhttps = "https://";
					var host = "www.go517.cn";
					var link = "/clt/user/update?";
					var name = "2798117741@qq.com";
					var pass1 = "123456";
					var v_url = protocalhttp + host + link;
					var md5code = G_j.md5(name + pass1);
					if(document.location.href.match(/https/)){
		                var v_url = protocalhttps + host + link;
					}

					G_j.ajax({
						url:v_url + "name=" + name + "&pass=" + md5code,
						type:'get',
						dataType:"jsonp",
						async:true,
						//jsonp:"jsonp",
						success:function (data){
							alert("");
					    }
					});
		    }
	   /* }
	    return loginreg;
    })
})(R.require,R.define);*/