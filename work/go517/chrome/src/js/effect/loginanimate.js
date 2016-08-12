(function(require,define){

	define(["jquery_G_j", "request", "cmnUtils" ,"import/jquery.hoverDelay", "import/base64"],function(jquery_G_j, request, cmnUtils, hoverDelay, base64){ 

        var loginanimate = {

        	toggleNavbar : function(){
                G_j(".my-info").hoverDelay({
				    hoverEvent : function(){
						//G_j(".go517-content-set span").html("热词搜索");
						G_j(".go517-content-GV").css("display","none");
						G_j(".go517-content-ST").css("display","none");
						G_j(".go517-content-myinfo").css("display","block"); 
						/*if(cmnUtils.getlocalStorage("mail")!==null){
				            G_j(".content-myinfo-login .name").val(cmnUtils.getlocalStorage("mail")); 
				            G_j(".content-myinfo-login .pass1").val(cmnUtils.getlocalStorage("code"));
				            G_j(".login-remerbercode img").attr("src","img/pic/img22.png")
					    }*/
					    
					    /***如果state=1则直接登录，如果不等于1则跳转到登录界面***/
					    if(cmnUtils.getlocalStorage("state")==1){//判断是否是登录状态，如果是就显示积分 活跃度
					    	G_j(".content-myinfo-login").css("display","none");
					        G_j(".content-myinfo-register").css("display","none");
					        G_j(".content-myinfo-logindone").css("display","block");
					    	request.activity();   //请求活跃度
			   	    	    request.points();     //请求积分
			   	    	    G_j(".login-log span").html(cmnUtils.getlocalStorage("mail")) //修改用户登录名
					    }else{
					    	G_j(".content-myinfo-login").css("display","block");
					        G_j(".content-myinfo-register").css("display","none");
					        G_j(".content-myinfo-logindone").css("display","none");
					        G_j(".content-myinfo-login .name").val(cmnUtils.getlocalStorage("mail"));
					        G_j(".content-myinfo-login .V-code input").val("");  
					        var a1 = base64.base64decode(cmnUtils.getlocalStorage("code"))
					        var jm = (a1.split("zch"))[0];
				            G_j(".content-myinfo-login .pass1").val(jm);
				            G_j(".login-remerbercode img").attr("src","img/pic/img22.png");
					    }
                    }
                })
        	},
            //登录   
            sumbitLogin : function(){
                G_j(".Login-login").click(function(){
						if(G_j(".login-remerbercode img").attr("src")=="img/pic/img22.png"){//判断记住密码是否被勾选
							cmnUtils.setlocalStorage("mail",G_j(".name").val());
							cmnUtils.setlocalStorage("code",base64.base64encode(G_j(".pass1").val()+"zch"));
							request.v_code_login();  
						}else{
							request.v_code_login();//执行验证码判断
							//request.login();//登陆的执行放到验证码成功的代码中去
							//updatecode();
						}		
			    })
            },
             //注册
            sumbitRegister : function(){
            	G_j(".now-register input").click(function(){
				    if(G_j(".register-userprotocol img").attr("src")!=="img/pic/img22.png"){//判断是否勾选了用户注册协议
					    alert("请阅读和同意《用户注册协议》");
				    }else{
				    	request.v_code_register();//执行验证码判断
					    //request.register();
					    
				    }
				})
            },
             //退出登录
             quitLogin : function(){
                G_j(".login-userinfo input").click(function(){
							cmnUtils.setlocalStorage("state","null");
							cmnUtils.setlocalStorage("userid","");
							//popupmain.base(popupmain.base64code);
	                        G_j(".content-myinfo-login").css("display","block");
					        G_j(".content-myinfo-register").css("display","none");
					        G_j(".content-myinfo-logindone").css("display","none");
					        G_j(".content-myinfo-login .name").val(cmnUtils.getlocalStorage("mail"));
					        G_j(".V-code img").attr("src","https://testclicks2.b5m.com/clt/checkCode?type=h" + "&" + new Date().getTime());
					        G_j(".content-myinfo-login .V-code input").val(""); 
					        var a1 = base64.base64decode(cmnUtils.getlocalStorage("code"));
					        var jm = (a1.split("zch"))[0];
				            G_j(".content-myinfo-login .pass1").val(jm);
				            G_j(".login-remerbercode img").attr("src","img/pic/img22.png");		
			    })
            },
            /***切换登录注册页面***/
            toggleLoginRegisterInterface : function(){
            	//点击切换登陆和注册图标
                G_j(".Login-login").click(function(){
					G_j(".content-myinfo-login").css("display","block");
					G_j(".content-myinfo-register").css("display","none");
					G_j(".content-myinfo-logindone").css("display","none");
			    })
	        
				G_j(".Login-register").click(function(){
					G_j(".content-myinfo-login").css("display","none");
					G_j(".content-myinfo-register").css("display","block");
					G_j(".content-myinfo-logindone").css("display","none");
					loginanimate.codeEqual();//切换页面到注册页面后加入两次输入密码是否相等判断
					//loginanimate.agreeUserProtocol();//是否勾选了同意协议
					loginanimate.sumbitRegister();
				})
		        //点击去登陆图标
		        G_j(".go-login").click(function(){
		            G_j(".content-myinfo-login").css("display","block");
					G_j(".content-myinfo-register").css("display","none");
					G_j(".content-myinfo-logindone").css("display","none");
				})
            },


			/****登录框记住密码****/
			remerberCode : function(){	
				G_j(".login-remerbercode img").mouseenter(function(){
					if(G_j(".login-remerbercode img").attr("src")=="img/pic/img20.png"){
						G_j(this).attr("src","img/pic/img21.png");
						G_j(this).click(function(){
							G_j(this).attr("src","img/pic/img22.png");
							//G_j(this).off("mouseenter");
						})
					}else{
							G_j(".login-remerbercode img").click(function(){
								G_j(this).attr("src","img/pic/img20.png");
								//G_j(this).off("mouseenter");
							})	
						}
				})

				G_j(".login-remerbercode img").mouseleave(function(){
					if(G_j(".login-remerbercode img").attr("src")=="img/pic/img22.png"){
						
						}else{
							   G_j(this).attr("src","img/pic/img20.png");
						}
				})
            },

            /***注册框同意用户协议***/
            agreeUserProtocol : function(){	
				G_j(".register-userprotocol img").mouseenter(function(){
					if(G_j(".register-userprotocol img").attr("src")=="img/pic/img20.png"){
						G_j(this).attr("src","img/pic/img21.png");
						G_j(this).click(function(){
							G_j(this).attr("src","img/pic/img22.png");
							//G_j(this).off("mouseenter");
						})
					}else{
							G_j(".register-userprotocol img").click(function(){
								G_j(this).attr("src","img/pic/img20.png");
								//G_j(this).off("mouseenter");
							})	
						}
				})

				G_j(".register-userprotocol img").mouseleave(function(){
					if(G_j(".register-userprotocol img").attr("src")=="img/pic/img22.png"){
						
						}else{
							   G_j(this).attr("src","img/pic/img20.png");
						}
				})
            },
        
			/***密码的强弱等级***/
			codeGrade : function(){
				G_j(".pass1").blur(function(){
					passlength = G_j(".pass1").val().length;
					if(passlength<=6){
						G_j(".L").attr("src","img/pic/img26.png");
						G_j(".M").attr("src","img/pic/img27.png");
						G_j(".H").attr("src","img/pic/img23.png");
					}else if(passlength>6&&passlength<=10){
						G_j(".L").attr("src","img/pic/img25.png");
						G_j(".M").attr("src","img/pic/img28.png");
						G_j(".H").attr("src","img/pic/img23.png");
					}else if(passlength>10){
						G_j(".L").attr("src","img/pic/img25.png");
						G_j(".M").attr("src","img/pic/img27.png");
						G_j(".H").attr("src","img/pic/img24.png");
				    }
				})
            },
            

			/***两次输入的密码是否相等验证***/
			codeEqual : function(){
				G_j(".pass3").blur(function(){
					if(G_j(".pass2").val()==null){
						alert("输入的密码为空，请重新输入！")
					}
					if(G_j(".pass3").val()!==G_j(".pass2").val()){
						alert("两次输入的密码不相等，请重新输入！")
					}		
				})
            },


            /***处理记住密码图片***/
			/*remerberCode : function (){
				 if(G_j(".login-remerbercode img").attr("src")=="img/img20.png"){
				     G_j(".login-remerbercode img").click(function(){
					   G_j(".login-remerbercode img").attr("src","img/img22.png");
					   G_j(this).off("mouseleave");
					   G_j(this).off("mouseenter");	
				    })
				 }
				  if(G_j(".login-remerbercode img").attr("src")=="img/img22.png"){	 
					       G_j(".login-remerbercodeimg").click(function(){
					           G_j(".login-remerbercode img").attr("src","img/img22.png");
							   G_j(".login-remerbercode img").mouseenter(function(){
								   G_j(this).attr("src","img/img21.png");
							   });
							   G_j(".login-remerbercode img").mouseleave(function(){
									G_j(this).attr("src","img/img20.png");
							   });	
				           })
			      }
			},*/




			/***register图片验证码***/
			//在文档加载的时候更新验证码
			updateVerificationCode : function(){
				window.onload = G_j(".V-code img").attr("src","https://testclicks2.b5m.com/clt/checkCode?type=h" + "&" + new Date().getTime());
				//点击验证码图标或者a标签更新验证码
				G_j(".li-code a").click(function(){
					var timestamp=new Date().getTime();
					G_j(".V-code img").attr("src","https://testclicks2.b5m.com/clt/checkCode?type=h" + "&" + timestamp);
					return false;
				})

				G_j(".V-code img").click(function(){
					var timestamp=new Date().getTime();
					G_j(".V-code img").attr("src","https://testclicks2.b5m.com/clt/checkCode?type=h" + "&" + timestamp);
					return false;
				})
            },		
        };
        return loginanimate;
    });
})(R.require,R.define);