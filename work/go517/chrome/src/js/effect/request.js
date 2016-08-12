(function(require,define){

	define(["cmnUtils","jquery_G_j","md5"],function(cmnUtils, jquery_G_j, md5){ 

	    var request = {    

		 register : function(){
					//var protocalhttp = "http://";
					var protocalhttps = "https://";
					var host = "testclicks2.b5m.com";
					var link = "/clt/user/register?";
					var name = G_j(".content-myinfo-register .name").val();
					var email = G_j(".content-myinfo-register .name").val();
					var pass2 = G_j(".pass2").val();
					var pass3 = G_j(".pass3").val();
					var v_url = protocalhttps + host + link;
					var md5code = G_j.md5(name + pass2);//md5加密，把加密后的密码提交。(规则：把用户名和密码相加后的字符串进行MD5加密当作密码)
					/*if(document.location.href.match(/https/)){
		                var v_url = protocalhttps + host + link;
					}*/
					if(pass2==pass3){
						G_j.ajax({
							url:v_url + "name=" + name +"&email=" + email + "&pass=" + md5code,
							type:'get',
							dataType:"jsonp",
							async:true,
							jsonp:"jsonp",
							//jsonpCallback:"Callback",
							success:function (data){
								if(data.ok){
									alert("注册成功,收到邮件后请激活!");
									G_j(".content-myinfo-login").css("display","block");
					                G_j(".content-myinfo-register").css("display","none");
					                G_j(".content-myinfo-logindone").css("display","none"); 
					                request.register();
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



		    login : function (){
					//var protocalhttp = "http://";
					var protocalhttps = "https://";
					var host = "testclicks2.b5m.com";
					var link = "/clt/user/login?";
					var name = G_j(".name").val();
					var pass1 = G_j(".pass1").val();
					var v_url = protocalhttps + host + link;
					var md5code = G_j.md5(name + pass1);
					/*if(document.location.href.match(/https/)){
		                var v_url = protocalhttps + host + link;
					}*/

					G_j.ajax({
						url:v_url + "name=" + name + "&pass=" + md5code,
						type:'get',
						dataType:"jsonp",
						async:true,
						jsonp:"jsonp",
						success:function (data){
							if(data.ok){
								var data = data.data;
								//console.log(data.UserLiveness);
								/***序列化json数据存储在cookies里面***/
								/***UserLiveness活跃度，userInfo用户信息，userPoint用户积分***/
								//cmnUtils.setCookie("UserLiveness",JSON.stringify(data.UserLiveness));
								//chrome.runtime.sendMessage({nickName:data.userInfo.nickName,active:data.userPoint.active,point:data.userPoint.userPoint},function(){})；
								alert("登陆成功!");
								G_j(".content-myinfo-login").css("display","none");
					            G_j(".content-myinfo-register").css("display","none");
					            G_j(".content-myinfo-logindone").css("display","block"); 
					            G_j(".login-log span").html(data.userInfo.name);//用户名
					            if(typeof(data.UserLiveness)=="undefined"){
                                    G_j(".activity span b").html("0");//活跃度
	                                G_j(".points span b").html("0");//积分
					            }else{
	                                G_j(".activity span b").html(data.UserLiveness.userLiveness);//活跃度
	                                G_j(".points span b").html(data.userPoint.userPoint);//积分
	                            }    
                                cmnUtils.setlocalStorage("state","1");
                                cmnUtils.setlocalStorage("userid",data.userInfo.userId);
							}else{
								alert("登陆不成功,请重新输入！");
							}
						},
						error:function (xhr, statusCode, e){
							//console.log(0);
							//console.debug('error,on get hot,' + statusCode + ' ' + e);
							///callback(null);
						}
					});
		    },

            
            activity : function(){
                var protocalhttps = "https://";
				var host = "testclicks2.b5m.com";
				var link = "/userInfo/liveness?";
				var v_url = protocalhttps + host + link;
				var userid = cmnUtils.getlocalStorage("userid");
				G_j.ajax({
						url:v_url + "userId=" + userid,
						type:'get',
						dataType:"json",
						async:true,
						//jsonp:"jsonp",
						success:function (data){
							var data = data.data;
							if(typeof(data.UserLiveness)=="undefined"){
							    G_j(".activity span b").html("0");//活跃度
							}else{
								G_j(".activity span b").html(data.userLiveness.userLiveness);//活跃度
							}    
						},
						error:function (xhr, statusCode, e){
							//console.log(0);
							//console.debug('error,on get hot,' + statusCode + ' ' + e);
							///callback(null);
						}
					});
            },


            points : function(){
                var protocalhttps = "https://";
				var host = "testclicks2.b5m.com";
				var link = "/userInfo/point?";
				var v_url = protocalhttps + host + link;
				var userid = cmnUtils.getlocalStorage("userid");
				G_j.ajax({
						url:v_url + "userId=" + userid,
						type:'get',
						dataType:"json",
						async:true,
						//jsonp:"jsonp",
						success:function (data){
							var data = data.data;
							if(typeof(data.userPoint)=="undefined"){
							    G_j(".points span b").html("0");//积分
							}else{
								G_j(".points span b").html(data.userPoint.userPoint);//积分
							}  
						},
						error:function (xhr, statusCode, e){
							//console.log(0);
							//console.debug('error,on get hot,' + statusCode + ' ' + e);
							///callback(null);
						}
					});
            },


            v_code_login : function(){
                var protocalhttps = "https://";
				var host = "testclicks2.b5m.com";
				var link = "/clt/checkCode?type=c";
				var v_url = protocalhttps + host + link;
				var code = G_j(".content-myinfo-login .V-code input").val();
				G_j.ajax({
						url:v_url + "&code=" + code,
						type:'get',
						dataType:"jsonp",
						async:true,
						jsonp:"jsonp",
						success:function (data){
							if(data.ok){
								/***序列化json数据存储在cookies里面***/
								/***UserLiveness活跃度，userInfo用户信息，userPoint用户积分***/
								//cmnUtils.setCookie("UserLiveness",JSON.stringify(data.UserLiveness));
								//chrome.runtime.sendMessage({nickName:data.userInfo.nickName,active:data.userPoint.active,point:data.userPoint.userPoint},function(){})；
							    request.login();
							}else{
								alert("验证码输入错误,请重新输入！");
								G_j(".V-code img").attr("src","https://testclicks2.b5m.com/clt/checkCode?type=h" + "&" + new Date().getTime());	
							}
						},
						error:function (xhr, statusCode, e){
							//console.log(0);
							//console.debug('error,on get hot,' + statusCode + ' ' + e);
							///callback(null);
						}
					});
            },


            v_code_register : function(){
            	var protocalhttps = "https://";
				var host = "testclicks2.b5m.com";
				var link = "/clt/checkCode?type=c";
				var v_url = protocalhttps + host + link;
				var code = G_j(".content-myinfo-register .V-code input").val();
				G_j.ajax({
						url:v_url + "&code=" + code,
						type:'get',
						dataType:"jsonp",
						async:true,
						jsonp:"jsonp",
						success:function (data){
							if(data.ok){
								/***序列化json数据存储在cookies里面***/
								/***UserLiveness活跃度，userInfo用户信息，userPoint用户积分***/
								//cmnUtils.setCookie("UserLiveness",JSON.stringify(data.UserLiveness));
								//chrome.runtime.sendMessage({nickName:data.userInfo.nickName,active:data.userPoint.active,point:data.userPoint.userPoint},function(){})；
							    request.register();
							}else{
								alert("验证码输入错误,请重新输入！");
								G_j(".V-code img").attr("src","https://testclicks2.b5m.com/clt/checkCode?type=h" + "&" + new Date().getTime());
							}
						},
						error:function (xhr, statusCode, e){
							//console.log(0);
							//console.debug('error,on get hot,' + statusCode + ' ' + e);
							///callback(null);
						}
					});
            },
             
			updatecode : function (){
	            //var protocalhttp = "http://";
				var protocalhttps = "https://";
				var host = "testclicks2.b5m.com";
				var link = "/clt/user/update?";
				var name = "xuhaipeng@live.com";
				var pass1 = "izene123";
				var v_url = protocalhttps + host + link;
				var md5code = G_j.md5(name + pass1);
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
			},
	    }
	    return request;
    });
})(R.require,R.define);