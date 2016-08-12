G_j(".fixed-left-logo").mouseenter(function(){
  G_j(".go517-content").animate({left:'0px'});
  //G_j(".go517-content-search input").focus();
}); 
G_j(".go517-content-search input").focus();
/****处理动画效果   *****/
/*G_j(document).on("click",function(){
	G_j(".go517-content").animate({left:'-550px'})
})

G_j(".go517-content").click(function(){
	//return false;阻止默认事件和冒泡事件
    //event.preventDefault();阻止默认事件但是允许冒泡事件的发生
	event.stopPropagation();//阻止冒泡但是允许默认事件的发生
});*/

G_j(".go517-content").mouseleave(function(){
	G_j(".go517-content").animate({left:'-570px'});
	if(G_j(".go517-content-searchpulldown").css("display")=="block"){
	    G_j(".go517-content-searchpulldown").css("display","none");	
	    G_j(".up-down-log").attr("src","img/pic/img4.png"); 
    }
})

G_j(".go517-content-title-close").click(function(){
	G_j(".go517-content").animate({left:'-570px'});
})

/****切换导航标签*****/
G_j(".go517-content-title-navbar ul li").each(function(){
    var that = G_j(this);
    that.hoverDelay({
	    hoverEvent : function(){
		    that.addClass("active");
		    that.siblings().removeClass("active");
	    }	
    })
})

/******展开搜索标签******/
G_j(".go517-content-search .brand-log").click(function(){
	G_j(".go517-content-searchpulldown").toggle("normal","linear");
		if((G_j(".up-down-log").attr("src"))=="img/pic/img4.png")
		  {
		    G_j(".up-down-log").attr("src","img/pic/img9.png")
		  }else{
		    G_j(".up-down-log").attr("src","img/pic/img4.png")
		  }
})


G_j(".go517-content-search .up-down-log").click(function(){
	G_j(".go517-content-searchpulldown").toggle("normal","linear");
		if((G_j(".up-down-log").attr("src"))=="img/pic/img4.png")
		  {
		    G_j(".up-down-log").attr("src","img/pic/img9.png")
		  }else{
		    G_j(".up-down-log").attr("src","img/pic/img4.png")
		  }
})

/******切换搜索标签******/
G_j(".go517-content-searchpulldown ul li").click(function(){
  var searchimg =G_j(this).children("img").attr("src");	
  var changeplaceholder =G_j(this).children("span").text();
  //var hotwordvalue = G_j(".hotword-detail-classify a span").val();
  G_j(".go517-content-search input").focus();//获取焦点
  G_j(".go517-content-search .brand-log").attr("src",searchimg);
  G_j(".up-down-log").attr("src","img/pic/img4.png");
  G_j(".go517-content-search input").attr("placeholder",changeplaceholder);
  G_j(".go517-content-searchpulldown").css("display","none");
  switch(changeplaceholder){
	  case "百度":G_j(".form-get").attr("action","http://www.go517.cn/go?l=N4IgJiBcIO5wdAIwIYEswFd4GMD2BbEAGhAAcoQBrEAXyA");
	             G_j(".go517-content-search input").attr("name","wd");
	  break;
	  case "360":G_j(".form-get").attr("action","http://www.go517.cn/go?l=N4IgJiBcIO5wdAZwPbwMbILYgDQgA5QgDWIAvkA");
	             G_j(".go517-content-search input").attr("name","q");
      break;
	  case "搜狗":G_j(".form-get").attr("action","http://www.go517.cn/go?l=N4IgJiBcIO5wdAZwPYHNkFd4GNkFsQAaEAByhAGsQBfIA");
	             G_j(".go517-content-search input").attr("name","query");
	  break;
	  case "必应":G_j(".form-get").attr("action","http://www.go517.cn/go?l=N4IgJiBcIMYHYDoBGBLOBzBMD2BbEANCAA5QgDWIAvkA");
	             G_j(".go517-content-search input").attr("name","q");
	  break;
	  /*case "google":G_j(".form-get").attr("action","http://www.go517.cn/go?l=N4IgJiBcIO5wdAcwPbMQGwKbwMbILYgA0IADlCANYgC+QA");
	                G_j(".go517-content-search input").attr("name","q");
	  break;*/ 
	  };
  //$(".go517-content-searchpulldown").css("display","none");
})


G_j(".go517-content-searchpulldown").mouseleave(function(){
  G_j(".go517-content-searchpulldown").hide("1000"); 
    G_j(".up-down-log").attr("src","img/pic/img9.png");
})



/*G_j("#horoscope-tips").mouseleave(function(){
  G_j("#horoscope-tips").animate({left:'-380px'});
}); */

/******切换不同目录******/
/*G_j(".my-info").hoverDelay({
	hoverEvent : function(){
		//G_j(".go517-content-set span").html("热词搜索");
		G_j(".go517-content-GV").css("display","none");
		G_j(".go517-content-ST").css("display","none");
		G_j(".go517-content-myinfo").css("display","block"); 
		if(cmnUtils.getlocalStorage("mail")!==null){
            G_j(".name").val(cmnUtils.getlocalStorage("mail")); 
            G_j(".pass1").val(cmnUtils.getlocalStorage("code"));
	   }
   }
})*/

G_j(".shopping-tourism").hoverDelay({
	hoverEvent : function(){
	//G_j(".go517-content-set span").html("电商旅游");
	G_j(".go517-content-myinfo").css("display","none");
	G_j(".go517-content-GV").css("display","none");
	G_j(".go517-content-ST").css("display","block");
	}
})

G_j(".game-video").hoverDelay({
	hoverEvent : function(){
	//G_j(".go517-content-set span").html("游戏视频");
	G_j(".go517-content-myinfo").css("display","none");
	G_j(".go517-content-ST").css("display","none");
	G_j(".go517-content-GV").css("display","block");
	}
})

/***切换游戏标签***/

/*G_j(".y-l img").mouseenter(function(){
	 G_j(this).css("opacity","0.5");
})
G_j(".y-l img").mouseleave(function(){
	 G_j(this).css("opacity","1");
})
G_j(".y-l").click(function(){
   G_j(".y-6").css("display","none");
   G_j(".y-1").css("display","inline-block"); 
})

G_j(".y-r img").mouseenter(function(){
	 G_j(this).css("opacity","0.5");
})
G_j(".y-r img").mouseleave(function(){
	 G_j(this).css("opacity","1");
})
G_j(".y-r").click(function(){
   G_j(".y-1").css("display","none");
   G_j(".y-6").css("display","inline-block"); 
})*/

