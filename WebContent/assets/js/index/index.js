var leftMenu = '';// 左方菜单
var topMenu = '';// 上方菜单
var collapseLeft=true;
var Contants = {
	LOAD_TYPE : {
		URL_TYPE : 0,//jquery load方式加载页面
		IFRAME_TYPE : 1,//iframe方式加载页面
		WINDOW_TYPE : 2//在新窗口加载页面
	},
};
$(function() {

	//初始化提示未读消息
	clickView();
	
	// 组装菜单
	 getMenuData();
	 
	 getWeatherData();
	 
	 //点击退出
	 $(document).delegate("#logout","click",function(){
		 var fun=function(){
			 window.location.href=basePath+"login.jsp";//window.logout();
		 }
		 Tools.tipsConfirm("确定退出吗",fun,true);
	 });
	 
	 
	 //点击按钮左侧菜单收起
	 if(leftMenu!="" && collapseLeft){
	     $("body").addClass('sidebar-collapse');
	     leftCollapse();
	 }
	 $(document).delegate("#shrinkage","click",leftCollapse);

	 //点击按钮
	 $(document).delegate("#shrinkage_new","click",function(){
		 //title切换为左上角title
		 /*$(".logo").html('<img class="default-menuimg" src="'+ basePath +'resource/images/index/icon_logo.png"/>'+
				 '<img class="default-menuimg" src="'+ basePath +'resource/images/index/title_min.png"/>');*/
		// $(".logo").html('<img class="default-menuimg" src="'+ basePath +'resource/images/index/logo.png"/>');
		 //收缩按钮位置切换
		 $("#shrinkage").html('<a href="#" class="sidebar-toggle" data-toggle="offcanvas"role="button" style="color: white;margin-left: -10px !important;"> <span class="sr-only">Toggle navigation</span></a>');
		 //移除顶部title
		 $(".logo").html('');
	 });

	 //浏览器窗口大小改变事件，窗口大小改变，iframe高度随之改变
	 window.onresize = function(topMenuExists, leftMenuExists) {
		//动态计算设置ifream高度
		var heightNum = (document.documentElement.clientHeight) - ($(".navbar-static-top").outerHeight(true)) - 35;
		$("#content-main").css("height",heightNum);
		//获取浏览器宽度
		var width = document.documentElement.clientWidth;
		//获取顶部和左边菜单是否存在
		var checkTopMenuExists = $("#topMenuExists").val();
		var checkLeftMenuExists = $("#leftMenuExists").val();
		//验证宽度是否小于1180
		if(width <= 1180){
			//隐藏顶部菜单
			//如果顶部和左边菜单都存在
			if("true" == checkTopMenuExists && "true" == checkLeftMenuExists){
				$('#navbar-collapse').attr("style", "display:none");
			//如果只存在顶部菜单
			}else if("true" == checkTopMenuExists && "false" == checkLeftMenuExists){
				$(".row_top_menu").attr("style", "display:none");
			}
		}else{
			//显示顶部菜单
			//如果顶部和左边菜单都存在
			if("true" == checkTopMenuExists && "true" == checkLeftMenuExists){
				$('#navbar-collapse').removeAttr("style");
			//如果只存在顶部菜单
			}else if("true" == checkTopMenuExists && "false" == checkLeftMenuExists){
				$(".row_top_menu").removeAttr("style");
			}
		}
	}
});
function leftCollapse(){
	//按钮位置切换
	 $(".logo").html('<a href="#" id="shrinkage_new" class="sidebar-toggle" data-toggle="offcanvas"role="button" style="color: white;margin-left: -10px !important;"> <span class="sr-only">Toggle navigation</span></a>');
	 //清空元按钮
	 $("#shrinkage").html('');
	 //title切换为顶部菜单title
	 $("#logo_top_left_combination").html('<img src="'+ basePath +'resource/images/index/logo.png" alt=""/>');
}
// 登出
function logout() {
	$.ajax({
		type : 'post',
		dataType : 'json',
		url : 'uv/uvaction/logout.action',
		success : function(data) {
			window.location.href = basePath + 'login.jsp';
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(errorThrown);
			window.location.href = basePath + 'login.jsp';
		}
	});
}

function getWeatherData() {
	$.ajax({
		type : 'get',
		url : 'http://restapi.amap.com/v3/weather/weatherInfo?city=420527&key=a0f65e41a50b84fb2e165f1fd3144a37&extensions=base',
		dataType : 'json',
		success : function(data) {
			if(data != null && data.lives != null && data.lives.length > 0 && data.lives[0].weather != null && data.lives[0].weather != null){
				var weatherTable = '<table style="width:150px;line-height:50px;text-align:center;color: white;font-weight: bolder;font-size: 15px;">';
					weatherTable += '<tr>'
						weatherTable = weatherTable + '<td width="50px"><img height="48px" src="'+basePath+'resource/images/weather/'+loadWeatherIcon(data.lives[0].weather)+'" /></td><td>'+data.lives[0].weather+'</td><td>'+data.lives[0].temperature+'℃</td>'
					weatherTable += '</tr>'
				weatherTable += '</table>';
				$("#logo_top_weather").html(weatherTable);
			}
			
		},
		error : ajaxError
	});
}

/**
 * * 获取菜单 loadType 0:load方式加载页面,1:iframe方式加载页面 locationType 3:首页 1：上方 2：左侧
 * funcType 0:按钮 1：1级 2：2级 3：3级
 */
function getMenuData() {
	$.ajax({
		type : 'post',
		url : basePath + 'login/getMenuByUser.action',
		dataType : 'json',
		success : function(data) {
			var dataMenu = data.list;
			var index_menu = dataMenu;
			if (!index_menu || index_menu.length == 0) {
				Tools.tipsMsg('未配置菜单，请联系管理员!');
				return;
			}
			size = 0;
			var html = '';
			var firstPage = false;
			for (var i = 0; i < index_menu.length; i++) {
				if (index_menu[i].locationType == 3) {// 首页
					$('#tab_list').append(
							'<a href="javascript:;" class="J_menuTab active" data-id='
									+ basePath + index_menu[i].funcUrl
									+ '>' + index_menu[i].funcName
									+ '</a>');
					$('iframe[name="iframe0"]').attr('src', basePath + index_menu[i].funcUrl).attr('data-id',basePath + index_menu[i].funcUrl);
					firstPage = true;
					continue;
				}
				var subLeftMenu = 0;// 右侧子菜单个数
				var subTopMenu = 0;// 上侧子菜单个数
				/*if (i == index_menu.length - 1 && !firstPage) {
					Tools.tipsMsg('请配置首页菜单，请联系管理员!');
				}*/
				if (subLeftMenu > 0) {
					leftMenu += "</ul></li>";
				}
				if (subTopMenu > 0) {
					topMenu += "";
				}
				if (index_menu[i].locationType == 1) {// 上方菜单
					if (index_menu[i].funcType == 1) {
						if (index_menu[i].isParent == 1) {
							topMenu += "</ul></li><li class='dropdown topMenuInfo'><a href='#' data-toggle='dropdown' class='text-center div_padding'>" +
										"<img class='default-menuimg image_class' src='"+basePath +"resource/images/index/"+ index_menu[i].funcIcon +"' />"+
										"<p>"+ index_menu[i].funcName +"</p></a><ul class='dropdown-menu'>";
						} else {
							var roleParam = "";
							var funcUrl = "";
//							if (index_menu[i].roleParam.length >= 1) {
//								roleParam = index_menu[i].roleParam[0];
//							}
							var funcUrl = index_menu[i].funcUrl;
							if (index_menu[i].param != "") {
								if (funcUrl.indexOf("?") >= 0) {// 已有参数
									funcUrl += "&"
											+ index_menu[i].param;
								} else {
									funcUrl += "?"
											+ index_menu[i].param;
								}
							}
//							if (roleParam != "") {
//								if (funcUrl.indexOf("?") >= 0) {// 已有参数
//									funcUrl += "&" + roleParam;
//								} else {
//									funcUrl += "?" + roleParam;
//								}
//							}
							if(funcUrl==""){						
								topMenu += "</ul></li><li><a class='J_menuItem text-center div_padding' href=#"
										+ "><img class='default-menuimg image_class' src='"+basePath +"resource/images/index/"+ index_menu[i].funcIcon +"' />"
										+ "<p>" + index_menu[i].funcName
										+ "</p></a><ul class='dropdown-menu'>";
								
							}
							else{								
								topMenu += "</ul></li><li><a class='J_menuItem text-center div_padding' href="
										+ basePath
										+ index_menu[i].funcUrl
										+ " data-loadtype="+ index_menu[i].loadType+ "><img class='default-menuimg image_class' src='"+basePath +"resource/images/index/"+ index_menu[i].funcIcon +"' />"
										+ "<p>" + index_menu[i].funcName
										+ "</p></a><ul class='dropdown-menu'>";
							}
						
						}
						for (var m = 0; m < index_menu.length; m++) {
							if (index_menu[i].funcId == index_menu[m].parentId
									&& index_menu[m].funcType != 0) {
								/*if (index_menu[m].isParent == 1) */{
									var roleParam = "";
									var funcUrl = "";
//									if (index_menu[m].roleParam.length >= 1) {
//										roleParam = index_menu[m].roleParam[0];
//									}
									var funcUrl = index_menu[m].funcUrl;
									if ("" != index_menu[m].param && undefined != index_menu[m].param && null != index_menu[m].param) {
										if (funcUrl.indexOf("?") >= 0) {// 已有参数
											funcUrl += "&"
													+ index_menu[m].param;
										} else {
											funcUrl += "?"
													+ index_menu[m].param;
										}
									}
//									if (roleParam != "") {
//										if (funcUrl.indexOf("?") >= 0) {// 已有参数
//											funcUrl += "&" + roleParam;
//										} else {
//											funcUrl += "?" + roleParam;
//										}
//									}
									subTopMenu++;
									topMenu += "<li><a class='J_menuItem' href="
											+ basePath
											+ funcUrl + " data-loadtype="+ index_menu[m].loadType 
											+ "><i class='"
											+ index_menu[m].funcIcon
											+ "'></i>"
											+ index_menu[m].funcName
											+ "</a></li>";
								} /*else {

								}*/
							}
						}
					}
				} else if (index_menu[i].locationType == 2) {// 左侧菜单
					var roleParam = "";
					var funcUrl = "";
					if (index_menu[i].funcType == 1) {
						if (i == 0) {
							leftMenu += "<ul class='sidebar-menu'><li class='active treeview'>";
						} else {
							leftMenu += "<li class='treeview'>";
						}
						leftMenu += "<a href='#'><i class='"
								+ index_menu[i].funcIcon
								+ "'></i><span>"
								+ index_menu[i].funcName
								+ "</span><span class='pull-right-container'><i class='fa fa-angle-left pull-right'></i></span></a>";
						leftMenu += " <ul class='treeview-menu'>";
						// var subLeftMenu=0;//子菜单个数
						for (var m = 0; m < index_menu.length; m++) {
							if (index_menu[i].funcId == index_menu[m].parentId
									&& index_menu[m].funcType != 0) {
								if (index_menu[m].isParent == 1) {
									var roleParam = "";
									var funcUrl = "";
//									if (index_menu[m].roleParam.length >= 1) {
//										roleParam = index_menu[m].roleParam[0];
//									}
									var funcUrl = index_menu[m].funcUrl;
									funcUrl = basePath + funcUrl;
									var funcUrlNum = funcUrl.indexOf("http://www.nmc.cn");
									if(funcUrlNum > -1){
										funcUrl = funcUrl.substring(funcUrlNum, funcUrl.length);
									}
									
									if ("" != index_menu[m].param && undefined != index_menu[m].param && null != index_menu[m].param) {
										if (funcUrl.indexOf("?") >= 0) {// 已有参数
											funcUrl += "&"
													+ index_menu[m].param;
										} else {
											funcUrl += "?"
													+ index_menu[m].param;
										}
									}
//									if (roleParam != "") {
//										if (funcUrl.indexOf("?") >= 0) {// 已有参数
//											funcUrl += "&" + roleParam;
//										} else {
//											funcUrl += "?" + roleParam;
//										}
//									}
									subLeftMenu++;
									leftMenu += "<li><a class='J_menuItem' href="
											+ funcUrl
											+ " data-loadtype="+ index_menu[m].loadType
											+ "><i class='"
											+ index_menu[m].funcIcon
											+ "'></i>"
											+ index_menu[m].funcName
											+ "</a></li>";
									leftMenu += "";
								} else {
									var buttonName = index_menu[m].buttons;
//									if (index_menu[m].roleParam.length >= 1) {
//										roleParam = index_menu[m].roleParam[0];
//									}
									var funcUrl = index_menu[m].funcUrl;
									funcUrl = basePath + funcUrl;
									var funcUrlNum = funcUrl.indexOf("http://www.nmc.cn");
									if(funcUrlNum > -1){
										funcUrl = funcUrl.substring(funcUrlNum, funcUrl.length);
									}
									if ("" != index_menu[m].param && undefined != index_menu[m].param && null != index_menu[m].param) {
										if (funcUrl.indexOf("?") >= 0) {// 已有参数
											funcUrl +="&" + index_menu[m].param;
										} else {
											funcUrl +="?" + index_menu[m].param;
										}
									}
//									if (roleParam != "") {
//										if (funcUrl.indexOf("?") >= 0) {// 已有参数
//											funcUrl += "&" + roleParam;
//										} else {
//											funcUrl += "?" + roleParam;
//										}
//									}
									leftMenu += "<li><a class='J_menuItem' href="
											+ funcUrl
											+ " data-loadtype="+ index_menu[m].loadType
											+ "><i class='"
											+ index_menu[m].funcIcon
											+ "'></i>"
											+ index_menu[m].funcName
											+ "</a></li>";
								}
							}
						}
						leftMenu += "</ul>";
					}
				}
			}
			var width = document.documentElement.clientWidth;
			if("" == leftMenu || leftMenu.length <= 0){
				leftMenu = null;
			}
			if("" == topMenu || topMenu.length <= 0){
				topMenu = null;
			}
			//左边菜单和右边菜单都不为空
			if (null != leftMenu && null != topMenu ) {
				$("#topMenuExists").val("true");
				$("#leftMenuExists").val("true");
				$(".sidebar-toggle").attr("style", "height:70px !important;lin-height:45px !important;font-size:13px !important;");
				$(".sidebar").css("padding-top", 20);
				$(".logo").attr("style","height:70px;line-height:70px;");
				$(".content-header").css("padding-left",0).css("padding-right",0).css("padding-top",22);
				$(".content-tabs").css("margin-left",0).css("margin-right",0);
				
				//追加左侧菜单
				$('.sidebar').append(leftMenu);
				//追加顶部菜单
				var menu_user = $("#navbar-collapse").html();
				$('#navbar-collapse').html(topMenu);
				$('#navbar-collapse').append(menu_user);
				if(width <= 1180){
					$('#navbar-collapse').attr("style", "display:none");
				}else{
					$('#navbar-collapse').removeAttr("style");
				}
			//左边菜单存在，顶部菜单不存在
			} else if(null != leftMenu && null == topMenu){
				$("#topMenuExists").val("false");
				$("#leftMenuExists").val("true");
				//$(".navbar-static-top").html('<a href="#" class="sidebar-toggle" data-toggle="offcanvas"role="button"> <span class="sr-only">Toggle navigation</span></a>')
				
				$('.sidebar').append(leftMenu);
			//顶部菜单存在，左边菜单不存在
			}else if(null == leftMenu && null != topMenu){
				$("#topMenuExists").val("true");
				$("#leftMenuExists").val("false");
				$(".main-sidebar").hide();
				$(".sidebar-toggle").hide();
				$(".main-footer").hide();
				$(".content-wrapper").css("margin-left", 0);
				$(".navbar").css("margin-left", 0);
				$(".logo").remove();
				$(".content-header").css("padding-left",0).css("padding-right",0).css("padding-top",22);
				var menuTopStr = '<div class="row"><div class="col-md-12"><div class="pull-left logo_img">'+
				'<img src="'+ basePath +'resource/images/index/logo.png" alt=""/>'+
				'<img src="'+ basePath +'resource/images/index/title.png" alt="" style="margin-top:-5px;height:45px;" /></div><div class="pull-right"><ul class="nav navbar-nav">';
				if(null != topMenu && topMenu.length > 0){
					topMenu = topMenu.substring(10,topMenu.length);
					topMenu += "</ul></li>";
				}
				//组装菜单
				menuTopStr += topMenu;
				var menu_user = $("#navbar-collapse").html();
				$(".row_top_menu").html(menuTopStr);
				$('.row_top_menu').find(".navbar-nav").append(menu_user);
				if(width <= 1180){
					$(".row_top_menu").attr("style", "display:none");
				}else{
					$(".row_top_menu").removeAttr("style");
				}
			}else{
				$("#topMenuExists").val("true");
				$("#leftMenuExists").val("false");
				$(".main-sidebar").hide();
				$(".sidebar-toggle").hide();
				$(".main-footer").hide();
				$(".content-wrapper").css("margin-left", 0);
				$(".navbar").css("margin-left", 0);
				$(".logo").remove();
				var menuTopStr = '<div class="row"><div class="col-md-12"><div class="pull-left logo_img">'+
				'<img src="'+ basePath +'resource/images/index/logo.png" alt=""/>'+
				'<img src="'+ basePath +'resource/images/index/title.png" alt=""/></div><div class="pull-right"><ul class="nav navbar-nav">';
				var menu_user = $("#navbar-collapse").html();
				$(".row_top_menu").html(menuTopStr);
				$('.row_top_menu').find(".navbar-nav").append(menu_user);
				if(width <= 1180){
					$(".row_top_menu").attr("style", "display:none");
				}else{
					$(".row_top_menu").removeAttr("style");
				}
			}
			
			//动态计算设置ifream高度
			var heightNum = (document.documentElement.clientHeight) - ($(".navbar-static-top").outerHeight(true)) - 35;
			$("#content-main").css("height",heightNum);
			
			//绑定顶部菜单鼠标停留在图标事件
			$(".topMenuInfo").hover(function () {
				var isMenu = $(this).find("li");
				if(null != isMenu && isMenu.length > 0){
			        $(this).find(".dropdown-menu").stop().slideDown({duration: 500, easing: 'swing'});
				}
		    }, function () {
		        $(this).find(".dropdown-menu").stop().slideUp({duration: 400, easing: 'swing'});
		    });
			
			// 通过遍历给菜单项加上data-index属性
			$(".J_menuItem").each(function(index) {
				if (!$(this).attr('data-index')) {
					$(this).attr('data-index', index);
				}
			});
			$('.J_menuItem').on('click', clickMenuItem);
			// showLeftMenu();
		},
		error : ajaxError
	});
}

//我的消息，提示
function clickView(){    
    //消息弹窗
    var url = basePath + "/noticeRelease/queryHomePageCount.action";
    $.ajax({
		"type": 'post',	//post防止中文参数乱码
		"url": url,
		"dataType": "json",  
		"success": function(data){
			if(data>0){
				 $.messager.anim('show', 1000);
			     $.messager.lays(320, 150);
				 $.messager.show('<b style="font-size:16px;">未读通知</b>', '<span style="font-size:16px;">&nbsp;&nbsp;&nbsp;您有<b color="red">'+data+'</b>条未读通知！<a onclick="hrefMessages()" style="cursor: pointer;">请点击查看>></a></span>');
			}
		}
	});
    
    
}

function clickMenuItem() {
	// 获取标识数据
	var dataUrl = $(this).attr('href'), dataIndex = $(this).data('index'), menuName = $
			.trim($(this).text()), flag = true;
	var loadtype = $(this).attr('data-loadtype')
	if (dataUrl == undefined || $.trim(dataUrl).length == 0)
		return false;

	if (loadtype && loadtype == Contants.LOAD_TYPE.WINDOW_TYPE) {
		window.open(dataUrl);
	} else {
		// 选项卡菜单已存在
		$('.J_menuTab').each(
				function() {
					if ($(this).data('id') == dataUrl) {
						if (!$(this).hasClass('active')) {
							$(this).addClass('active').siblings('.J_menuTab')
									.removeClass('active');
							scrollToTab(this);
							// 显示tab对应的内容区
							$('.J_mainContent .J_iframe').each(
									function() {
										if ($(this).data('id') == dataUrl) {
											$(this).show()
													.siblings('.J_iframe')
													.hide();
											return false;
										}
									});
						}
						flag = false;
						return false;
					}
				});

		// 选项卡菜单不存在
		if (flag) {
			var str = '<a href="javascript:;" class="active J_menuTab" data-id="'
					+ dataUrl
					+ '">'
					+ menuName
					+ ' <i class="fa fa-times-circle"></i><!--&nbsp;<i class="fa fa-refresh"></i>--></a>';
			$('.J_menuTab').removeClass('active');

			// 添加选项卡对应的iframe
			var str1 = '<iframe class="J_iframe" name="iframe' + dataIndex
					+ '" width="100%" height="100%" src="' + dataUrl
					+ '" frameborder="0" data-id="' + dataUrl
					+ '" seamless></iframe>';
			$('.J_mainContent').find('iframe.J_iframe').hide().parents(
					'.J_mainContent').append(str1);

			// 显示loading提示
			// var loading = layer.load();
			//
			// $('.J_mainContent iframe:visible').load(function () {
			// //iframe加载完成后隐藏loading提示
			// layer.close(loading);
			// });
			// 添加选项卡
			$('.J_menuTabs .page-tabs-content').append(str);
			scrollToTab($('.J_menuTab.active'));
		}
		// var last = $("a[data-id='"+dataUrl+"']");
		var imageMenuData = [ [ {
			text : "刷新缓存",
			func : function() {
				var target = $('.J_iframe[data-id="' + dataUrl + '"]');
				var url = target.attr('src');
				// 显示loading提示
				var loading = layer.load();
				target.attr('src', url).load(function() {
					// 关闭loading提示
					layer.close(loading);
				});
			}
		} ] ];
		try {
			$("a[data-id='" + dataUrl + "']").smartMenu(imageMenuData, {
				name : "name" + uuid()
			});
		} catch (e) {
			console.log(e);
		}
	}
	
	return false;
}

//河长工作台点击跳转
function triggerfun(i) {
	
	var dataIndex = 777+i;
	var menuName = "";
	var dataUrl="";
	if(i=="0"){
	   menuName = "待办事项";
	   dataUrl = basePath+"pages/riverBench/backlogMattersList.jsp";
	}
    if(i=="1"){
       menuName = "督办事项";
  	   dataUrl = basePath+"pages/riverBench/supervisoryMattersList.jsp";
	}
    if(i=="2"){
       menuName = "问题清单";
  	   dataUrl = basePath+"/riverBench/issuesInfo/turnToIssueInfoList.action";
    }
    if(i=="3"){
       menuName = "案件管理";
  	   dataUrl = basePath+"/riverBench/caseManage/turnToCaseManageList.action";
    }
    if(i=="4"){
        menuName = "巡检信息查看";
   	   dataUrl = basePath+"/tasklist/redirectTaskList.action";
    }
    if(i=="5"){
        menuName = "巡检隐患查看";
   	   dataUrl = basePath+"/taskError/redirectTaskError.action";
     }

	var flag = true;
	var loadtype = 1;
	
	var mapFrame;
	
	$('.J_menuTab').each(
			function() {
				var _url = $(this).data('id').split("?")[0];
				if (_url == dataUrl) {
					if (!$(this).hasClass('active')) {
						$(this).addClass('active').siblings('.J_menuTab')
								.removeClass('active');
						scrollToTab(this);
						// 显示tab对应的内容区
						$('.J_mainContent .J_iframe').each(function() {
							var _url2 = $(this).data('id').split("?")[0];
							if (_url2 == dataUrl) {
								$(this).show().siblings('.J_iframe').hide();
								mapFrame=$(this)[0];
								return false;
							}
						});
					}
					flag = false;
					return false;
				}
			});
	
	// 选项卡菜单不存在
	if (flag) {
		var str = '<a href="javascript:;" class="active J_menuTab" data-id="'
				+ dataUrl
				+ '">'
				+ menuName
				+ ' <i class="fa fa-times-circle"></i><!--&nbsp;<i class="fa fa-refresh"></i>--></a>';
		$('.J_menuTab').removeClass('active');

		// 添加选项卡对应的iframe
		var str1 = '<iframe class="J_iframe" name="iframe' + dataIndex
				+ '" width="100%" height="100%" src="' + dataUrl
				+ '" frameborder="0" data-id="' + dataUrl
				+ '" seamless></iframe>';
		$('.J_mainContent').find('iframe.J_iframe').hide().parents(
				'.J_mainContent').append(str1);
		// 添加选项卡
		$('.J_menuTabs .page-tabs-content').append(str);
		scrollToTab($('.J_menuTab.active'));
	}else{
		//界面已加载
		if(typeof(mapFrame)!="undefined"){
			try{
				mapFrame.contentWindow.stationLocation(data);
			}catch(error){
				
			}
		}
	}
	return false;
} 



//地图定位接口  测试
function locationOnMap(data) {
	var type = data.type;
	var code = data.code;
	var x = data.x;
	var y = data.y;
	
	if(type=="11"){
		//问题清单
		var Name = encodeURI(encodeURI(data.Name));//乡镇名称
		var areaCode = data.areaCode;//乡镇编码
		var caseId = data.caseId;//案件编码
		var handleMethod = encodeURI(encodeURI(data.handleMethod));//处理措施
		var issuesCode = data.issuesCode;//事件类型
		var issuesDetail = encodeURI(encodeURI(data.issuesDetail));//事件问题描述
		var issuesSource = encodeURI(encodeURI(data.issuesSource));//事件来源
		var issuesState = encodeURI(encodeURI(data.issuesState));//事件状态
		var issuesTime = data.issuesTime;//时间
		var locationDesc = encodeURI(encodeURI(data.locationDesc));//位置描述
		var typeName = encodeURI(encodeURI(data.typeName));//类型名称
		var riverCode = data.riverCode;//河流编号
		var river_name = encodeURI(encodeURI(data.river_name));//河流名称
		
	}else if(type=="10"){
		//企业信息
		var address = encodeURI(encodeURI(data.address));//地址
		var companyName = encodeURI(encodeURI(data.companyName));//企业名称
		var countyCode = data.countyCode;//乡镇编码
		var name = encodeURI(encodeURI(data.name));//乡镇名称
		var river = data.river;//河流编码
		var reach = data.reach;//河段编码
		var riverName = encodeURI(encodeURI(data.riverName));//河流名称
		var segName = encodeURI(encodeURI(data.segName)); //河段名称
		
	}
	
	var dataUrl = basePath+"map/index.jsp";
	var dataIndex = 999;
	var menuName = "一张图";
	var flag = true;
	var loadtype = 1;
	
	var mapFrame;
	
	$('.J_menuTab').each(
			function() {
				var _url = $(this).data('id').split("?")[0];
				if (_url == dataUrl) {
					if (!$(this).hasClass('active')) {
						$(this).addClass('active').siblings('.J_menuTab')
								.removeClass('active');
						scrollToTab(this);
						// 显示tab对应的内容区
						$('.J_mainContent .J_iframe').each(function() {
							var _url2 = $(this).data('id').split("?")[0];
							if (_url2 == dataUrl) {
								$(this).show().siblings('.J_iframe').hide();
								mapFrame=$(this)[0];
								return false;
							}
						});
					}
					flag = false;
					return false;
				}
			});
	
	// 选项卡菜单不存在
	if (flag) {
		dataUrl+="?type="+type+"&code="+code+"&x="+x+"&y="+y;
		
		if(type=="11"){//问题清单
			dataUrl+="&Name="+Name+"&areaCode="+areaCode+"&caseId="+caseId+"&handleMethod="+handleMethod+"&issuesCode="+issuesCode+"&issuesDetail="+issuesDetail+"&issuesSource="+issuesSource+"&issuesState="+issuesState+"&issuesTime="+issuesTime+"&locationDesc="+locationDesc+"&typeName="+typeName+"&riverCode="+riverCode +"&river_name="+river_name;
		
		}else if(type=="10"){//企业信息
			dataUrl+="&address="+address+"&companyName="+companyName+"&countyCode="+countyCode+"&name="+name+"&river="+river+"&reach="+reach+"&riverName="+riverName+"&segName="+segName;
		}
		
		var str = '<a href="javascript:;" class="active J_menuTab" data-id="'
				+ dataUrl
				+ '">'
				+ menuName
				+ ' <i class="fa fa-times-circle"></i><!--&nbsp;<i class="fa fa-refresh"></i>--></a>';
		$('.J_menuTab').removeClass('active');

		// 添加选项卡对应的iframe
		var str1 = '<iframe class="J_iframe" name="iframe' + dataIndex
				+ '" width="100%" height="100%" src="' + dataUrl
				+ '" frameborder="0" data-id="' + dataUrl
				+ '" seamless></iframe>';
		$('.J_mainContent').find('iframe.J_iframe').hide().parents(
				'.J_mainContent').append(str1);
		// 添加选项卡
		$('.J_menuTabs .page-tabs-content').append(str);
		scrollToTab($('.J_menuTab.active'));
	}else{
		//地图已加载
		if(typeof(mapFrame)!="undefined"){
			try{
				mapFrame.contentWindow.stationLocation(data);
			}catch(error){
				
			}
		}
	}

	return false;
} 


//登录初始化提示消息跳转
function hrefMessages(data) {
	var dataUrl = basePath+"pages/riverBench/notiFicationQuery.jsp";
	var dataIndex = 888;
	var menuName = "通知查看";
	var flag = true;
	var loadtype = 1;
	
	var mapFrame;
	
	$('.J_menuTab').each(
			function() {
				var _url = $(this).data('id').split("?")[0];
				if (_url == dataUrl) {
					if (!$(this).hasClass('active')) {
						$(this).addClass('active').siblings('.J_menuTab')
								.removeClass('active');
						scrollToTab(this);
						// 显示tab对应的内容区
						$('.J_mainContent .J_iframe').each(function() {
							var _url2 = $(this).data('id').split("?")[0];
							if (_url2 == dataUrl) {
								$(this).show().siblings('.J_iframe').hide();
								mapFrame=$(this)[0];
								return false;
							}
						});
					}
					flag = false;
					return false;
				}
			});
	
	// 选项卡菜单不存在
	if (flag) {
		var str = '<a href="javascript:;" class="active J_menuTab" data-id="'
				+ dataUrl
				+ '">'
				+ menuName
				+ ' <i class="fa fa-times-circle"></i><!--&nbsp;<i class="fa fa-refresh"></i>--></a>';
		$('.J_menuTab').removeClass('active');

		// 添加选项卡对应的iframe
		var str1 = '<iframe class="J_iframe" name="iframe' + dataIndex
				+ '" width="100%" height="100%" src="' + dataUrl
				+ '" frameborder="0" data-id="' + dataUrl
				+ '" seamless></iframe>';
		$('.J_mainContent').find('iframe.J_iframe').hide().parents(
				'.J_mainContent').append(str1);
		// 添加选项卡
		$('.J_menuTabs .page-tabs-content').append(str);
		scrollToTab($('.J_menuTab.active'));
	}else{
		//界面已加载
		if(typeof(mapFrame)!="undefined"){
			try{
				mapFrame.contentWindow.stationLocation(data);
			}catch(error){
				
			}
		}
	}
	return false;
} 




// 关闭选项卡菜单
function closeTab() {
	var closeTabId = $(this).parents('.J_menuTab').data('id');
	var currentWidth = $(this).parents('.J_menuTab').width();

	// 当前元素处于活动状态
	if ($(this).parents('.J_menuTab').hasClass('active')) {

		// 当前元素后面有同辈元素，使后面的一个元素处于活动状态
		if ($(this).parents('.J_menuTab').next('.J_menuTab').size()) {

			var activeId = $(this).parents('.J_menuTab').next(
					'.J_menuTab:eq(0)').data('id');
			$(this).parents('.J_menuTab').next('.J_menuTab:eq(0)').addClass(
					'active');

			$('.J_mainContent .J_iframe').each(function() {
				if ($(this).data('id') == activeId) {
					$(this).show().siblings('.J_iframe').hide();
					return false;
				}
			});

			var marginLeftVal = parseInt($('.page-tabs-content').css(
					'margin-left'));
			if (marginLeftVal < 0) {
				$('.page-tabs-content').animate({
					marginLeft : (marginLeftVal + currentWidth) + 'px'
				}, "fast");
			}

			// 移除当前选项卡
			$(this).parents('.J_menuTab').remove();

			// 移除tab对应的内容区
			$('.J_mainContent .J_iframe').each(function() {
				if ($(this).data('id') == closeTabId) {
					$(this).remove();
					return false;
				}
			});
		}

		// 当前元素后面没有同辈元素，使当前元素的上一个元素处于活动状态
		if ($(this).parents('.J_menuTab').prev('.J_menuTab').size()) {
			var activeId = $(this).parents('.J_menuTab')
					.prev('.J_menuTab:last').data('id');
			$(this).parents('.J_menuTab').prev('.J_menuTab:last').addClass(
					'active');
			$('.J_mainContent .J_iframe').each(function() {
				if ($(this).data('id') == activeId) {
					$(this).show().siblings('.J_iframe').hide();
					return false;
				}
			});

			// 移除当前选项卡
			$(this).parents('.J_menuTab').remove();

			// 移除tab对应的内容区
			$('.J_mainContent .J_iframe').each(function() {
				if ($(this).data('id') == closeTabId) {
					$(this).remove();
					return false;
				}
			});
		}
	}
	// 当前元素不处于活动状态
	else {
		// 移除当前选项卡
		$(this).parents('.J_menuTab').remove();

		// 移除相应tab对应的内容区
		$('.J_mainContent .J_iframe').each(function() {
			if ($(this).data('id') == closeTabId) {
				$(this).remove();
				return false;
			}
		});
		scrollToTab($('.J_menuTab.active'));
	}
	return false;
}

$('.J_menuTabs').on('click', "i[class='fa fa-times-circle']", closeTab);

$('.J_menuTabs').on('click', "i[class='fa fa-refresh']", refreshTab);

// 关闭其他选项卡
function closeOtherTabs() {
	$('.page-tabs-content').children("[data-id]").not(":first").not(".active")
			.each(function() {
				$('.J_iframe[data-id="' + $(this).data('id') + '"]').remove();
				$(this).remove();
			});
	$('.page-tabs-content').css("margin-left", "0");
}
$('.J_tabCloseOther').on('click', closeOtherTabs);

// 滚动到已激活的选项卡
function showActiveTab() {
	scrollToTab($('.J_menuTab.active'));
}
// 定位当前选项卡
$('.J_tabShowActive').on('click', showActiveTab);

// 点击选项卡菜单
function activeTab() {
	if (!$(this).hasClass('active')) {
		var currentId = $(this).data('id');
		// 显示tab对应的内容区
		$('.J_mainContent .J_iframe').each(function() {
			if ($(this).data('id') == currentId) {
				$(this).show().siblings('.J_iframe').hide();
				return false;
			}
		});
		$(this).addClass('active').siblings('.J_menuTab').removeClass('active');
		scrollToTab(this);
	}
}

// 点击某一tab
$('.J_menuTabs').on('click', '.J_menuTab', activeTab);

// 刷新iframe
function refreshTab() {
	var target = $('.J_iframe[data-id="' + $(this).data('id') + '"]');
	if (target == undefined) {
		target = $('.J_iframe[data-id="' + $(this).parent().data('id') + '"]');
	}
	var url = target.attr('src');
	// 显示loading提示
	var loading = layer.load();
	target.attr('src', url).load(function() {
		// 关闭loading提示
		layer.close(loading);
	});
}

// 刷新
$('.J_menuTabs').on('dblclick', '.J_menuTab', refreshTab);

// 左移按扭
$('.J_tabLeft').on('click', scrollTabLeft);

// 右移按扭
$('.J_tabRight').on('click', scrollTabRight);

// 关闭全部
$('.J_tabCloseAll').on(
		'click',
		function() {
			$('.page-tabs-content').children("[data-id]").not(":first").each(
					function() {
						$('.J_iframe[data-id="' + $(this).data('id') + '"]')
								.remove();
						$(this).remove();
					});
			$('.page-tabs-content').children("[data-id]:first").each(
					function() {
						$('.J_iframe[data-id="' + $(this).data('id') + '"]')
								.show();
						$(this).addClass("active");
					});
			$('.page-tabs-content').css("margin-left", "0");
		});

function uuid() {
	var s = [];
	var hexDigits = "0123456789abcdef";
	for (var i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the
														// clock_seq_hi_and_reserved
														// to 01
	s[8] = s[13] = s[18] = s[23] = "-";

	var uuid = s.join("");
	return uuid;
}

// 计算元素集合的总宽度
function calSumWidth(elements) {
	var width = 0;
	$(elements).each(function() {
		width += $(this).outerWidth(true);
	});
	return width;
}
// 滚动到指定选项卡
function scrollToTab(element) {
	var marginLeftVal = calSumWidth($(element).prevAll()), marginRightVal = calSumWidth($(
			element).nextAll());
	// 可视区域非tab宽度
	var tabOuterWidth = calSumWidth($(".content-tabs").children().not(
			".J_menuTabs"));
	// 可视区域tab宽度
	var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
	// 实际滚动宽度
	var scrollVal = 0;
	if ($(".page-tabs-content").outerWidth() < visibleWidth) {
		scrollVal = 0;
	} else if (marginRightVal <= (visibleWidth - $(element).outerWidth(true) - $(
			element).next().outerWidth(true))) {
		if ((visibleWidth - $(element).next().outerWidth(true)) > marginRightVal) {
			scrollVal = marginLeftVal;
			var tabElement = element;
			while ((scrollVal - $(tabElement).outerWidth()) > ($(
					".page-tabs-content").outerWidth() - visibleWidth)) {
				scrollVal -= $(tabElement).prev().outerWidth();
				tabElement = $(tabElement).prev();
			}
		}
	} else if (marginLeftVal > (visibleWidth - $(element).outerWidth(true) - $(
			element).prev().outerWidth(true))) {
		scrollVal = marginLeftVal - $(element).prev().outerWidth(true);
	}
	$('.page-tabs-content').animate({
		marginLeft : 0 - scrollVal + 'px'
	}, "fast");
}
// 查看左侧隐藏的选项卡
function scrollTabLeft() {
	var marginLeftVal = Math.abs(parseInt($('.page-tabs-content').css(
			'margin-left')));
	// 可视区域非tab宽度
	var tabOuterWidth = calSumWidth($(".content-tabs").children().not(
			".J_menuTabs"));
	// 可视区域tab宽度
	var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
	// 实际滚动宽度
	var scrollVal = 0;
	if ($(".page-tabs-content").width() < visibleWidth) {
		return false;
	} else {
		var tabElement = $(".J_menuTab:first");
		var offsetVal = 0;
		while ((offsetVal + $(tabElement).outerWidth(true)) <= marginLeftVal) {// 找到离当前tab最近的元素
			offsetVal += $(tabElement).outerWidth(true);
			tabElement = $(tabElement).next();
		}
		offsetVal = 0;
		if (calSumWidth($(tabElement).prevAll()) > visibleWidth) {
			while ((offsetVal + $(tabElement).outerWidth(true)) < (visibleWidth)
					&& tabElement.length > 0) {
				offsetVal += $(tabElement).outerWidth(true);
				tabElement = $(tabElement).prev();
			}
			scrollVal = calSumWidth($(tabElement).prevAll());
		}
	}
	$('.page-tabs-content').animate({
		marginLeft : 0 - scrollVal + 'px'
	}, "fast");
}
// 查看右侧隐藏的选项卡
function scrollTabRight() {
	var marginLeftVal = Math.abs(parseInt($('.page-tabs-content').css(
			'margin-left')));
	// 可视区域非tab宽度
	var tabOuterWidth = calSumWidth($(".content-tabs").children().not(
			".J_menuTabs"));
	// 可视区域tab宽度
	var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
	// 实际滚动宽度
	var scrollVal = 0;
	if ($(".page-tabs-content").width() < visibleWidth) {
		return false;
	} else {
		var tabElement = $(".J_menuTab:first");
		var offsetVal = 0;
		while ((offsetVal + $(tabElement).outerWidth(true)) <= marginLeftVal) {// 找到离当前tab最近的元素
			offsetVal += $(tabElement).outerWidth(true);
			tabElement = $(tabElement).next();
		}
		offsetVal = 0;
		while ((offsetVal + $(tabElement).outerWidth(true)) < (visibleWidth)
				&& tabElement.length > 0) {
			offsetVal += $(tabElement).outerWidth(true);
			tabElement = $(tabElement).next();
		}
		scrollVal = calSumWidth($(tabElement).prevAll());
		if (scrollVal > 0) {
			$('.page-tabs-content').animate({
				marginLeft : 0 - scrollVal + 'px'
			}, "fast");
		}
	}
		
}

function loadWeatherIcon(weatherType){
	var weatherName = new Array();
	weatherName.push("晴", "多云", "阴", "阵雨", "雷阵雨", "雷阵雨伴有冰雹", "雨夹雪", "小雨",
			"中雨", "大雨", "暴雨", "大暴雨", "特大暴雨", "阵雪", "小雪", "中雪", "大雪", "暴雪", "雾",
			"冻雨", "沙尘暴", "小雨转中雨", "中雨转大雨", "大雨转暴雨", "暴雨转大暴雨", "大暴雨转特大暴雨",
			"小雪转中雪", "中雪转大雪", "大雪转暴雪", "浮尘", "扬沙", "强沙尘暴", "霾");
	var weatherIcon = new Array();
	weatherIcon.push("00.png", "01.png", "02.png", "03.png", "04.png", "05.png", "06.png", "07.png",
			"08.png", "09.png", "10.png", "11.png", "12.png", "13.png", "14.png", "15.png", "16.png", "17.png", "18.png",
			"19.png", "20.png", "21.png", "22.png", "23.png", "24.png", "25.png",
			"26.png", "27.png", "28.png", "29.png", "30.png", "31.png", "53.png");

	var icon = "";
	$.each(weatherName, function(i, obj){
		if(obj == weatherType){
			icon = weatherIcon[i];
		}
	})
	if(icon == ""){
		icon = "undefined.png";
	}
	return icon;
}

