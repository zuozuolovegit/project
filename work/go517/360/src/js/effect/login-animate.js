/*(function(require,define){

	define(["jquery_G_j", "effect/request"],function(jquery_G_j, request){  */
        /****login选择框****/ 

		G_j(".login-center-right-remenbercode img").mouseenter(function(){
			if(G_j(".login-center-right-remenbercode img").attr("src")=="img/img18.png"){
				G_j(this).attr("src","img/img19.png");
				G_j(this).click(function(){
					G_j(this).attr("src","img/img20.png");
					//G_j(this).off("mouseenter");
				})
			}else{
					G_j(this).click(function(){
						G_j(this).attr("src","img/img18.png");
						//G_j(this).off("mouseenter");
					})	
				}
		})
		G_j(".login-center-right-remenbercode img").mouseleave(function(){
			if(G_j(".login-center-right-remenbercode img").attr("src")=="img/img20.png"){
				
				}else{
					   G_j(this).attr("src","img/img18.png");
				}
		})


		/****register选择框****/	
		G_j(".protocol img").mouseenter(function(){
			if(G_j(".protocol img").attr("src")=="img/img18.png"){
				G_j(this).attr("src","img/img19.png");
				G_j(this).click(function(){
					G_j(this).attr("src","img/img20.png");
					//G_j(this).off("mouseenter");
				})
			}else{
					G_j(".protocol img").click(function(){
						G_j(this).attr("src","img/img18.png");
						//G_j(this).off("mouseenter");
					})	
				}
		})

		G_j(".protocol img").mouseleave(function(){
			if(G_j(".protocol img").attr("src")=="img/img20.png"){
				
				}else{
					   G_j(this).attr("src","img/img18.png");
				}
		})


		/***密码的强弱等级***/
		G_j(".pass1").blur(function(){
			passlength = G_j(".pass1").val().length;
			if(passlength<=6){
				G_j(".L").attr("src","img/img26.png");
				G_j(".M").attr("src","img/img27.png");
				G_j(".H").attr("src","img/img23.png");
			}else if(passlength>6&&passlength<=10){
				G_j(".L").attr("src","img/img25.png");
				G_j(".M").attr("src","img/img28.png");
				G_j(".H").attr("src","img/img23.png");
			}else if(passlength>10){
				G_j(".L").attr("src","img/img25.png");
				G_j(".M").attr("src","img/img27.png");
				G_j(".H").attr("src","img/img24.png");
		    }
		})

		/***两次输入的密码是否相等验证***/
		G_j(".pass2").blur(function(){
			if(G_j(".pass1").val()!==G_j(".pass2").val()){
				alert("两次输入的密码不相等，请重新输入！")
			}
			
		})

		/***提交验证***/
		G_j(".nowregister input").click(function(){
			if(G_j(".protocol img").attr("src")!=="img/img20.png"){//判断是否勾选了用户注册协议
				alert("请阅读和同意《用户注册协议》");
			}else{
				register();
			}
			
		})

		/***登陆***/
		G_j(".login-center-right-bottom input").click(function(){
			if(G_j(".login-center-right-remenbercode img").attr("src")!=="img/img20.png"){//判断是否勾选了用户注册协议
				//alert("请阅读和同意《用户注册协议》");
			}else{
				login();
				//updatecode();
			}
		})



		/*function handlechioce(){
			 if(G_j(".login-center-right-remenbercode img").attr("src")=="img/img18.png"){
			     G_j(".login-center-right-remenbercode img").click(function(){
				   G_j(".login-center-right-remenbercode img").attr("src","img/img20.png");
				   G_j(this).off("mouseleave");
				   G_j(this).off("mouseenter");	
			    })
			 }
			  if(G_j(".login-center-right-remenbercode img").attr("src")=="img/img20.png"){	 
				       G_j(".login-center-right-remenbercode img").click(function(){
				           G_j(".login-center-right-remenbercode img").attr("src","img/img20.png");
						   G_j(".login-center-right-remenbercode img").mouseenter(function(){
							   G_j(this).attr("src","img/img19.png");
						   });
						   G_j(".login-center-right-remenbercode img").mouseleave(function(){
								G_j(this).attr("src","img/img18.png");
						   });	
			           })
		      }
		}*/




		/***register图片验证码***/
		window.onload = G_j(".V-code img").attr("src","http://www.go517.cn/checkCode.do?type=h" + "&" + new Date().getTime());
		G_j(".li-code a").click(function(){
			var timestamp=new Date().getTime();
			G_j(".V-code img").attr("src","http://www.go517.cn/checkCode.do?type=h"+"&"+timestamp);
			return false;
		})

		G_j(".V-code img").click(function(){
			var timestamp=new Date().getTime();
			G_j(".V-code img").attr("src","http://www.go517.cn/checkCode.do?type=h"+"&"+timestamp);
			return false;
		})


/*});
})(R.require,R.define);*/