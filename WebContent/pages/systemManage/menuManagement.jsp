<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>菜单管理</title>
<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
<link href="<%=basePath%>assets/css/bootstrap/css/bootstarp.style.css" rel="stylesheet" />
<link href="<%=basePath%>assets/css/bootstrap/css/bootstrap.css" rel="stylesheet" />
<link href="<%=basePath%>assets/css/font-awesome/css/font-awesome.min.css" rel="stylesheet" />
<link href="<%=basePath%>assets/plugins/datatables/dataTables.bootstrap.css" rel="stylesheet" />
<link href="<%=basePath%>assets/js/layer/mobile/need/layer.css" rel="stylesheet" />
<link href="<%=basePath%>assets/css/bootstrap/css/bootstrap-select.css" rel="stylesheet" />
<link href="<%=basePath%>assets/js/ztree/zTree_v3/css/zTreeStyle/zTreeStyle.css" rel="stylesheet" />
<link href="<%=basePath%>assets/js/video/video-js.min.css" rel="stylesheet">
<link href="<%=basePath%>assets/js/viewer/css/viewer.min.css" rel="stylesheet">
<!-- common css -->
<link href="<%=basePath%>assets/css/common/default.css" rel="stylesheet" />
<style type="text/css">
.common-info{
	top:-30px;
}
</style>
</head>
<body>
	<div class="container">
		<!-- 查询条件  Start -->
		<div class="row">
			<div class="col-sm-12 col-md-12" style="border-bottom: 1px solid #dddd;">
				<div class="col-md-4 col-xs-4">
					<div class="input-group">
						<label class="input-group-addon">功能名称：</label> <input type="text"
							class="form-control" id="MenuName" placeholder="请输入功能名称" />
					</div>
				</div>
				<div class="col-md-4 col-xs-4">
					<div class="input-group">
						<label class="input-group-addon">菜单类型：</label>
						<select id="MenuType" class="form-control">
							<option value="">请选择菜单类型</option>
							<option value="1">web端</option>
							<option value="2">app端</option>
						</select>
					</div>
				</div>
				<button class="btn btn-info" id="searchMenus">
					<span class="glyphicon glyphicon-search"></span>&nbsp;查询
				</button>
				<button type="button" id="btn_addModel" class="btn btn-success" data-toggle="modal">
					<span class="glyphicon glyphicon-plus"></span>&nbsp;添加
				</button>
			</div>
		</div>
		<!-- 查询条件  End -->

		<!-- 表格数据展示  Start -->
		<div class="row">
			<div class="tab-content" id="tab-content">
				<table class="table table-bordered table-hover" id="menuList_table">
					<thead>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
		</div>
		<!-- 表格数据展示  End -->
	</div>


	<!--Modal模态框开始-->
	<div class="modal fade" id="menuManageModal" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog" style="margin-top: 120px;">
		<div class="modal-content" style="width: 700px;">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<ul id="myTabs" class="nav nav-tabs" role="tablist">
			      <li role="presentation" class="active" onclick="$('#isPhone').val(1);" id="webli">
			      	<a href="#webHome" id="home-tab" role="tab" data-toggle="tab"  aria-expanded="false">
			      		WEB端/<span class="modal-title" id="webMyModalLabel"></span>
			      	</a>
			      </li>
			      <li role="presentation" class="" onclick="$('#isPhone').val(2);$('#webHome').attr('class','tab-pane fade');$('#webHome').attr('style','display','none');" id="appli">
			      	<a href="#appHome" role="tab" id="profile-tab" data-toggle="tab"  aria-expanded="true">
			      		APP端/<span class="modal-title" id="appMyModalLabel"></span>
			      	</a>
			      </li>
			    </ul>
			</div>
			
			<!-----内容层----->
			<div id="myTabContent" class="tab-content">
			<input type="hidden" value="1" id="isPhone">
			  <!--------------App---Start-------------->
		      <div role="tabpanel" class="tab-pane fade" id="appHome" aria-labelledby="home-tab">
		     	 <form id="AppMenuManageForm"onsubmit="return false;">
		      		<div class="modal-body">
						<div style="margin: 0px 0 0 0px;" >
							<table style=" width: 100%;">
								<tr>
									<td>
										<div class="input-group col-md-4" style="width: 100% !important">
											<label class="input-group-addon">功能名称：</label>
											<input type="text" class="form-control" id="appname" name="appname" placeholder="请输入功能名称"/>
										</div>
									</td>
									<!-- <td>
										<div class="input-group col-md-4" style="width: 100% !important">
											<label class="input-group-addon">功能类型：</label>
											<select class="form-control" id="appfunc_type" name="appfunc_type">
												<option value="">请选择功能类型</option>
												<option value="1">文件夹</option>
												<option value="2">URL</option>
											</select>
										</div>
									</td> -->
								</tr>
								<!-- <tr>
									<td>
										<div class="input-group col-md-4" style="width: 100% !important">
											<label class="input-group-addon" style="padding: 0 10px  !important">级&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</label>
											<select class="form-control" id="appfunc_level" name="appfunc_level">
												<option value="">请选择级别</option>
												<option value="1">一级菜单</option>
												<option value="2">二级菜单</option>
											</select>
										</div>
									</td>
									<td>
										<div class="input-group col-md-4" style="width: 100% !important">
											<label class="input-group-addon" style="padding: 0 12px  !important">上级功能：</label>
											<select class="form-control" id="appparent_func" name="appparent_func">
												<option value="">请选择上级功能</option>
											</select>
										</div>
									</td>
								</tr> -->
								<tr>
									<td>
										<div class="input-group col-md-4" style="width: 100% !important">
											<label class="input-group-addon" style="padding: 0 12px  !important">URL地址：</label>
											<input type="text" class="form-control" id="appurl" name="appurl" placeholder="请输入URL地址"/>
										</div>
									</td>
									<td>
										<div class="input-group col-md-4" style="width: 100% !important">
											<label class="input-group-addon">菜单图标：</label>
											<input type="text" class="form-control"  id="appfunc_icon" name="appfunc_icon"  placeholder="请输入菜单图标"/>
										</div>
									</td>
								</tr>
							</table>
						</div>
					</div>
				</form>
		      </div>
		      <!--------------APP---End-------------->
		      
		      <!--------------WEB---Start------------->
		      <div role="tabpanel" class="tab-pane fade active in" id="webHome" aria-labelledby="profile-tab">
		      	 <form id="menuManageForm"onsubmit="return false;"> 
		      		<div class="modal-body">
						<div style="margin: 0px 0 0 0px;" >
							<table style=" width: 100%;">
								<tr>
									<td>
										<div class="input-group col-md-4" style="width: 100% !important">
											<label class="input-group-addon">功能名称：</label>
											<input type="text" class="form-control" id="name" name="name" placeholder="请输入功能名称"/>
										</div>
									</td>
									<td>
										<div class="input-group col-md-4" style="width: 100% !important">
											<label class="input-group-addon">功能类型：</label>
											<select class="form-control" id="func_type" name="func_type">
												<option value="">请选择功能类型</option>
												<option value="1">文件夹</option>
												<option value="2">URL</option>
											</select>
										</div>
									</td>
								</tr>
								<tr>
									<td>
										<div class="input-group col-md-4" style="width: 100% !important">
											<label class="input-group-addon" style="padding: 0 10px  !important">级&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</label>
											<select class="form-control" id="func_level" name="func_level">
												<option value="">请选择级别</option>
												<option value="1">一级菜单</option>
												<option value="2">二级菜单</option>
											</select>
										</div>
									</td>
									<td>
										<div class="input-group col-md-4" style="width: 100% !important">
											<label class="input-group-addon" style="padding: 0 12px  !important">上级功能：</label>
											<select class="form-control" id="parent_func" name="parent_func">
												<option value="">请选择上级功能</option>
											</select>
										</div>
									</td>
								</tr>
								<tr>
									<td>
										<div class="input-group col-md-4" style="width: 100% !important">
											<label class="input-group-addon" style="padding: 0 12px  !important">URL地址：</label>
											<input type="text" class="form-control" id="url" name="url" placeholder="请输入URL地址"/>
										</div>
									</td>
									<td>
										<div class="input-group col-md-4" style="width: 100% !important">
											<label class="input-group-addon">菜单图标：</label>
											<input type="text" class="form-control" readonly="readonly" id="func_icon" name="func_icon"  placeholder="请选择菜单图标"/>
										</div>
									</td>
								</tr>
								
							</table>
						</div>
					</div>
				</form>
		      </div>
		     
		    <!--------------WEB-----End------------>
		    </div>
			<!-------------内容层----End------>
			<div class="modal-footer">
				<button type="reset" class="btn btn-primary" id="menuMAnageReset">
						<span class="glyphicon glyphicon-refresh"></span>&nbsp;重置
					</button>
				<button type="button" class="btn btn-primary" id="menuMAnageSaves">
					<span class="glyphicon glyphicon-floppy-disk"></span>&nbsp;保存
				</button>
				<button type="button" class="btn btn-warning" data-dismiss="modal">
					<span class="glyphicon glyphicon-remove"></span>&nbsp;关闭
				</button>
			</div>
		</div>
	</div>
</div>
<!--模态框结束-->






















<!-- 图标选择Model -->
<div class="modal fade" id="menu_addMenu_seleceIconModal"  style="display: none;">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
        <h4 class="modal-title">请选择图标</h4>
      </div>
      <div class="modal-body">
      	<div class="container-fluid" id="iconBody">
    <meta charset="utf-8">
    <title></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
	<style>
	#iconCss .list-unstyled li {
		float: left;
		width: auto;
		margin: 5px;
	}
	#iconCss .list-unstyled li .glyphicon-class {
		display: none;
	}
	</style>
  <div class="container-fluid" id="iconCss">
    <ul class="list-unstyled">
        <li>
          <span class="btn glyphicon glyphicon-asterisk" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">btn glyphicon glyphicon-asterisk</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-plus" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">btn glyphicon glyphicon-plus</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-euro" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-euro</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-eur" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-eur</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-minus" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-minus</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-cloud" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-cloud</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-envelope" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-envelope</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-pencil" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-pencil</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-glass" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-glass</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-music" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-music</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-search" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-search</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-heart" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-heart</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-star" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-star</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-star-empty" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-star-empty</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-user" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-user</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-film" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-film</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-th-large" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-th-large</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-th" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-th</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-th-list" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-th-list</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-ok" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-ok</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-remove" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-remove</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-zoom-in" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-zoom-in</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-zoom-out" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-zoom-out</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-off" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-off</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-signal" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-signal</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-cog" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-cog</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-trash" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-trash</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-home" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-home</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-file" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-file</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-time" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-time</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-road" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-road</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-download-alt" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-download-alt</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-download" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-download</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-upload" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-upload</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-inbox" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-inbox</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-play-circle" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-play-circle</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-repeat" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-repeat</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-refresh" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-refresh</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-list-alt" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-list-alt</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-lock" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-lock</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-flag" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-flag</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-headphones" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-headphones</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-volume-off" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-volume-off</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-volume-down" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-volume-down</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-volume-up" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-volume-up</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-qrcode" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-qrcode</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-barcode" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-barcode</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-tag" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-tag</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-tags" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-tags</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-book" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-book</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-bookmark" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-bookmark</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-print" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-print</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-camera" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-camera</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-font" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-font</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-bold" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-bold</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-italic" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-italic</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-text-height" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-text-height</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-text-width" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-text-width</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-align-left" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-align-left</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-align-center" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-align-center</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-align-right" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-align-right</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-align-justify" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-align-justify</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-list" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-list</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-indent-left" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-indent-left</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-indent-right" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-indent-right</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-facetime-video" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-facetime-video</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-picture" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-picture</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-map-marker" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-map-marker</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-adjust" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-adjust</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-tint" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-tint</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-edit" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-edit</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-share" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-share</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-check" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-check</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-move" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-move</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-step-backward" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-step-backward</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-fast-backward" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-fast-backward</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-backward" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-backward</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-play" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-play</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-pause" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-pause</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-stop" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-stop</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-forward" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-forward</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-fast-forward" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-fast-forward</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-step-forward" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-step-forward</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-eject" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-eject</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-chevron-left" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-chevron-left</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-chevron-right" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">btn glyphicon glyphicon-chevron-right</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-plus-sign" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">btn glyphicon glyphicon-plus-sign</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-minus-sign" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-minus-sign</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-remove-sign" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-remove-sign</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-ok-sign" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-ok-sign</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-question-sign" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-question-sign</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-info-sign" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-info-sign</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-screenshot" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-screenshot</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-remove-circle" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-remove-circle</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-ok-circle" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-ok-circle</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-ban-circle" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-ban-circle</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-arrow-left" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-arrow-left</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-arrow-right" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-arrow-right</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-arrow-up" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-arrow-up</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-arrow-down" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-arrow-down</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-share-alt" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-share-alt</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-resize-full" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-resize-full</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-resize-small" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-resize-small</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-exclamation-sign" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-exclamation-sign</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-gift" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-gift</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-leaf" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-leaf</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-fire" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-fire</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-eye-open" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-eye-open</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-eye-close" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-eye-close</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-warning-sign" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-warning-sign</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-plane" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-plane</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-calendar" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-calendar</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-random" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-random</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-comment" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-comment</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-magnet" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-magnet</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-chevron-up" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-chevron-up</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-chevron-down" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-chevron-down</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-retweet" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-retweet</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-shopping-cart" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-shopping-cart</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-folder-close" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-folder-close</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-folder-open" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-folder-open</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-resize-vertical" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-resize-vertical</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-resize-horizontal" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-resize-horizontal</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-hdd" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-hdd</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-bullhorn" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-bullhorn</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-bell" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-bell</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-certificate" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-certificate</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-thumbs-up" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-thumbs-up</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-thumbs-down" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-thumbs-down</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-hand-right" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-hand-right</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-hand-left" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-hand-left</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-hand-up" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-hand-up</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-hand-down" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-hand-down</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-circle-arrow-right" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-circle-arrow-right</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-circle-arrow-left" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-circle-arrow-left</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-circle-arrow-up" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-circle-arrow-up</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-circle-arrow-down" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-circle-arrow-down</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-globe" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-globe</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-wrench" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-wrench</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-tasks" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-tasks</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-filter" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-filter</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-briefcase" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-briefcase</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-fullscreen" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-fullscreen</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-dashboard" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-dashboard</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-paperclip" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-paperclip</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-heart-empty" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-heart-empty</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-link" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-link</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-phone" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-phone</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-pushpin" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-pushpin</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-usd" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-usd</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-gbp" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-gbp</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-sort" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-sort</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-sort-by-alphabet" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-sort-by-alphabet</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-sort-by-alphabet-alt" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-sort-by-alphabet-alt</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-sort-by-order" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-sort-by-order</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-sort-by-order-alt" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-sort-by-order-alt</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-sort-by-attributes" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-sort-by-attributes</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-sort-by-attributes-alt" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-sort-by-attributes-alt</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-unchecked" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-unchecked</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-expand" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-expand</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-collapse-down" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-collapse-down</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-collapse-up" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-collapse-up</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-log-in" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-log-in</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-flash" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-flash</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-log-out" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-log-out</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-new-window" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-new-window</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-record" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-record</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-save" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-save</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-open" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-open</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-saved" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-saved</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-import" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-import</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-export" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-export</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-send" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-send</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-floppy-disk" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-floppy-disk</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-floppy-saved" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-floppy-saved</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-floppy-remove" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-floppy-remove</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-floppy-save" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-floppy-save</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-floppy-open" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-floppy-open</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-credit-card" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-credit-card</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-transfer" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-transfer</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-cutlery" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-cutlery</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-header" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-header</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-compressed" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-compressed</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-earphone" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-earphone</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-phone-alt" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-phone-alt</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-tower" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-tower</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-stats" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-stats</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-sd-video" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-sd-video</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-hd-video" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-hd-video</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-subtitles" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-subtitles</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-sound-stereo" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-sound-stereo</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-sound-dolby" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-sound-dolby</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-sound-5-1" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-sound-5-1</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-sound-6-1" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-sound-6-1</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-sound-7-1" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-sound-7-1</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-copyright-mark" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-copyright-mark</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-registration-mark" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-registration-mark</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-cloud-download" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-cloud-download</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-cloud-upload" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-cloud-upload</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-tree-conifer" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-tree-conifer</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-tree-deciduous" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-tree-deciduous</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-cd" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-cd</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-save-file" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-save-file</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-open-file" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-open-file</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-level-up" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-level-up</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-copy" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-copy</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-paste" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-paste</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-alert" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-alert</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-equalizer" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-equalizer</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-king" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-king</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-queen" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-queen</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-pawn" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-pawn</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-bishop" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-bishop</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-knight" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-knight</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-baby-formula" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-baby-formula</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-tent" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-tent</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-blackboard" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-blackboard</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-bed" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-bed</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-apple" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-apple</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-erase" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-erase</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-hourglass" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-hourglass</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-lamp" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-lamp</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-duplicate" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-duplicate</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-piggy-bank" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-piggy-bank</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-scissors" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-scissors</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-bitcoin" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-bitcoin</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-btc" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-btc</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-xbt" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-xbt</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-yen" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-yen</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-jpy" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-jpy</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-ruble" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-ruble</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-rub" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-rub</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-scale" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-scale</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-ice-lolly" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-ice-lolly</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-ice-lolly-tasted" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-ice-lolly-tasted</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-education" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-education</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-option-horizontal" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-option-horizontal</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-option-vertical" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-option-vertical</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-menu-hamburger" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-menu-hamburger</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-modal-window" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-modal-window</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-oil" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-oil</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-grain" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-grain</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-sunglasses" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-sunglasses</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-text-size" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-text-size</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-text-color" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-text-color</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-text-background" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-text-background</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-object-align-top" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-object-align-top</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-object-align-bottom" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-object-align-bottom</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-object-align-horizontal" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-object-align-horizontal</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-object-align-left" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-object-align-left</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-object-align-vertical" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-object-align-vertical</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-object-align-right" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-object-align-right</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-triangle-right" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-triangle-right</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-triangle-left" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-triangle-left</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-triangle-bottom" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-triangle-bottom</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-triangle-top" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-triangle-top</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-console" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-console</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-superscript" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-superscript</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-subscript" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-subscript</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-menu-left" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-menu-left</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-menu-right" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-menu-right</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-menu-down" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-menu-down</span>
        </li>
      
        <li>
          <span class="btn glyphicon glyphicon-menu-up" onclick="setIcon($(this).attr('class').replace('btn ',''))"></span>
          <span class="glyphicon-class">glyphicon glyphicon-menu-up</span>
        </li>
      
    </ul>
  </div>
</div>
     </div>
     <div class="modal-footer">
       <button type="button" class="btn btn-warning" data-dismiss="modal">
       		<span class="glyphicon glyphicon-remove"></span>&nbsp;关闭
       </button>
     </div>
   </div><!-- /.modal-content -->
 </div><!-- /.modal-dialog -->
</div>
			
<!--角色Modal模态框开始-->
	<div class="modal fade" id="sysRoleInfoModel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-content" style="width: 410px;margin: auto;margin-top: 120px;">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="modalTitle">
					角色分配
				</h4>
				<input type="hidden" id="funcId"/>
			</div>
			<div class="modal-body">
				 <div class="row">
					<div class="col-md-12 col-xs-12 ztree" id="menuZtree"></div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary" id="submitRole_btn">
					<span class="glyphicon glyphicon-floppy-disk"></span>&nbsp;保存
				</button>
				<button type="button" class="btn btn-warning" data-dismiss="modal" id="closeRole_btn">
					<span class="glyphicon glyphicon-remove"></span>&nbsp;关闭
				</button>
			</div>
		</div>
</div>
<!-- 角色model结束 -->			
			
</body>
<script type="text/javascript" src="<%=basePath%>assets/plugins/jQuery/jquery-2.2.3.min.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/bootstrap/bootstrap.min.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/laydate-5.0/laydate.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/layer/layer.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/plugins/datatables/jquery.dataTables.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/plugins/datatables/dataTables.bootstrap.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/bootstrap/bootstrap-select.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/common/default.js"></script>
<!--valiDate  -->
<script type="text/javascript" src="<%=basePath%>assets/plugins/validate/jquery.metadata.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/plugins/validate/jquery.validate.min.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/plugins/validate/jquery.validate.message.cn.js"></script>
<!-- 自定义js -->
<script type="text/javascript" src="<%=basePath%>pages/systemManage/menuManagement.js"></script>
<!-- zTree -->
<script src="<%=basePath%>assets/js/ztree/zTree_v3/js/jquery.ztree.core-3.5.js"></script>
<script src="<%=basePath%>assets/js/ztree/zTree_v3/js/jquery.ztree.excheck-3.5.js"></script>
<script>
	var path="<%=basePath%>";
	var menuList = new menuList();
</script>
</html>
