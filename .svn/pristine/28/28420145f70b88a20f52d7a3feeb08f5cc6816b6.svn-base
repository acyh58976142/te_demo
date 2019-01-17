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
<title>人员管理</title>
<meta
	content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
	name="viewport">
<link href="<%=basePath%>assets/css/bootstrap/css/bootstrap.css"
	rel="stylesheet" />
<link
	href="<%=basePath%>assets/css/font-awesome/css/font-awesome.min.css"
	rel="stylesheet" />
<link
	href="<%=basePath%>assets/plugins/datatables/dataTables.bootstrap.css"
	rel="stylesheet" />
<link href="<%=basePath%>assets/js/layer/mobile/need/layer.css"
	rel="stylesheet" />
<link
	href="<%=basePath%>assets/js/ztree/zTree_v3/css/zTreeStyle/zTreeStyle.css"
	rel="stylesheet" />
<link href="<%=basePath%>assets/css/bootstrap/css/bootstrap-select.css"
	rel="stylesheet" />
<!-- common css -->
<link href="<%=basePath%>assets/css/common/default.css" rel="stylesheet" />
<style type="text/css">
.row {
	margin-right: 10px;
	margin-left: 10px;
	margin-top: 10px;
}

.selectpicker {
	margin-top: 0px;
}
</style>
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-md-4 col-xs-4">
				<div class="input-group">
					<label class="input-group-addon">姓名：</label> <input type="text"
						class="form-control" id="name" placeholder="请输入姓名" />
				</div>
			</div>
			<div class="col-md-4 col-xs-4">
				<div class="input-group">
					<label class="input-group-addon">登录账户：</label> <input type="text"
						class="form-control" id="loginAccount" placeholder="请输入账户" />
				</div>
			</div>
			<div class="col-md-4 col-xs-4">
				<div class="input-group">
					<label class="input-group-addon">用户所在单位：</label> <select
						class="form-control" id="userUnit">
						<option value="">--请选择用户所在单位--</option>
						<c:forEach items="${orgInfoList}" var="orgInfo">
							<option value="${orgInfo.org_no}">${orgInfo.org_name}</option>
						</c:forEach>
					</select>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-md-4 col-xs-4">
				<div class="input-group">
					<label class="input-group-addon">状态：</label> <select
						class="form-control" id="state">
						<option value="">--请选择状态--</option>
						<option value="0">正常</option>
						<option value="1">已删除</option>
					</select>
				</div>
			</div>

			<div class="col-md-4 col-xs-4 text-left common-paddingTop">
				<button class="btn btn-info" id="searchBtn">
					<span class="glyphicon glyphicon-search"></span>&nbsp;查询
				</button>
				<button class="btn btn-success" id="addBtn">
					<span class="glyphicon glyphicon-plus"></span>&nbsp;添加
				</button>
			</div>
		</div>

		<div class="row">
			<div class="tab-content" id="tab-content">
				<table class="table table-bordered table-hover" id="user_table">
					<thead>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<!--新增页面  start-->
	<div class="modal fade" tabindex="-1" role="dialog" id="AddUserModal"
		data-backdrop="static">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="addUserTitle"></h4>
				</div>
				<div class="modal-body" style="margin-top: -10px !important;">
					<form id="caseAppTable" onsubmit="return false;">
						<div class="row">
							<div class="col-sm-6 col-md-6 col-xs-6">
								<div class="input-group">
									<label class="input-group-addon">账号：</label> <input type="text"
										class="form-control" id="add_loginuser" name="add_loginuser"
										placeholder="请输入账号" />
								</div>
							</div>
							<div class="col-sm-6 col-md-6 col-xs-6">
								<div class="input-group">
									<label class="input-group-addon">密码：</label> <input type="text"
										class="form-control" id="add_password" name="add_password"
										placeholder="请输入密码" />
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-sm-6 col-md-6 col-xs-6">
								<div class="input-group">
									<label class="input-group-addon">姓名：</label> <input type="text"
										class="form-control" id="add_name" name="add_name"
										placeholder="请输入姓名" />
								</div>
							</div>
							<div class="col-sm-6 col-md-6 col-xs-6">
								<div class="input-group">
									<label class="input-group-addon">性别：</label> <select
										class="form-control" id="add_sex" name="add_sex">
										<option value="">请选择性别</option>
										<option value="1">男</option>
										<option value="2">女</option>
									</select>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-sm-6 col-md-6 col-xs-6">
								<div class="input-group">
									<label class="input-group-addon">单位：</label> <select
										class="form-control" id="add_org_name" name="add_org_name">
										<option value="">请选择单位</option>
										<c:forEach items="${orgInfoList}" var="orgInfo">
											<option value="${orgInfo.org_no}">${orgInfo.org_name}</option>
										</c:forEach>
									</select>
								</div>
							</div>
							<div class="col-sm-6 col-md-6 col-xs-6">
								<div class="input-group">
									<label class="input-group-addon">电话：</label> <input type="text"
										class="form-control" id="add_mobile" name="add_mobile"
										placeholder="请输入电话" />
								</div>
							</div>
						</div>

						<div class="row">
							<div class="col-sm-6 col-md-6 col-xs-6">
								<div class="input-group">
									<label class="input-group-addon">邮件：</label> <input type="text"
										class="form-control" id="add_email" name="add_email"
										placeholder="请输入邮件" />
								</div>
							</div>
							<div class="col-sm-6 col-md-6 col-xs-6">
								<div class="input-group">
									<label class="input-group-addon">地址：</label> <input type="text"
										class="form-control" id="add_address" name="add_address"
										placeholder="请输入地址" />
								</div>
							</div>
						</div>

						<div class="row">
							<div class="col-sm-6 col-md-6 col-xs-6">
								<div class="input-group">
									<label class="input-group-addon">职务：</label>
									 <select class="form-control" id="add_user_post" name="add_user_post">
										<option value="">请选择职务</option>
										<option value="1">第一总河长</option>
										<option value="2">总河长</option>
										<option value="3">副总河长</option>
										<option value="4">河长</option>
										<option value="5">副河长</option>
										<option value="6">流域河长</option>
										<option value="7">流域副河长</option>
										<option value="8">乡镇第一河长</option>
										<option value="9">乡镇河长</option>
										<option value="10">乡镇河段长</option>
										<option value="11">第一河段长</option>
										<option value="12">巡检人员</option>
									</select>
								</div>
							</div>
							<div class="col-sm-6 col-md-6 col-xs-6">
								<div class="input-group">
									<label class="input-group-addon">级别：</label> <select
										class="form-control" id="add_user_level" name="add_user_level">
										<option value="0">普通用户</option>
										<option value="1">特殊用户</option>
									</select>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-sm-6 col-md-6 col-xs-6">
								<div class="input-group">
									<label class="input-group-addon">河流：</label> <select
										class="selectpicker bla bla bli form-control" multiple
										data-live-search="true" id="river_code" name="river_code">
									</select>
								</div>
							</div>
						</div>
					</form>
				</div>

				<div class="modal-footer">
					<button type="button" class="btn btn-primary" id="addSubmitBtn">
						<span class="glyphicon glyphicon-floppy-disk"></span>&nbsp;保存
					</button>
					<button type="button" class="btn btn-warning" id="addCancleBtn"
						data-dismiss="modal">
						<span class="glyphicon glyphicon-remove"></span>&nbsp;关闭
					</button>
				</div>
			</div>
		</div>
	</div>
	<!--新增页面 end-->

	<!--详情页面  start-->
	<div class="modal fade" tabindex="-1" role="dialog"
		id="detailUserModal" data-backdrop="static">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close" aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="detailUserTitle">人员详情</h4>
				</div>
				<div class="modal-body" style="margin-top: -10px !important;">
					<div class="row">
						<div class="col-sm-6 col-md-6 col-xs-6">
							<span class="text-right">用户编号：</span> <span id="detail_user_no"></span>
						</div>
						<div class="col-sm-6 col-md-6 col-xs-6">
							<span class="text-right">登录账号：</span> <span id="detail_loginuser"></span>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-6 col-md-6 col-xs-6">
							<span class="text-right">密码：</span> <span id="detail_password"></span>
						</div>
						<div class="col-sm-6 col-md-6 col-xs-6">
							<span class="text-right">姓名：</span> <span id="detail_name"></span>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-6 col-md-6 col-xs-6">
							<span class="text-right">性别：</span> <span id="detail_sex"></span>
						</div>
						<div class="col-sm-6 col-md-6 col-xs-6">
							<span class="text-right">用户所在单位：</span> <span
								id="detail_org_name"></span>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-6 col-md-6 col-xs-6">
							<span class="text-right">用户电话：</span> <span id="detail_mobile"></span>
						</div>
						<div class="col-sm-6 col-md-6 col-xs-6">
							<span class="text-right">地址：</span> <span id="detail_address"></span>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-6 col-md-6 col-xs-6">
							<span class="text-right">邮件：</span> <span id="detail_email"></span>
						</div>
						<div class="col-sm-6 col-md-6 col-xs-6">
							<span class="text-right">职务：</span> <span id="detail_user_post"></span>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-6 col-md-6 col-xs-6">
							<span class="text-right">级别：</span> <span id="detail_user_level"></span>
						</div>
						<div class="col-sm-6 col-md-6 col-xs-6">
							<span class="text-right">相关河流：</span> <span id="detail_river_code"></span>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-warning" id="detailCancleBtn"
						data-dismiss="modal">
						<span class="glyphicon glyphicon-remove"></span>&nbsp;关闭
					</button>
				</div>
			</div>
		</div>
	</div>
	<!--详情页面  end-->

	<!--角色Modal模态框开始-->
	<div class="modal fade" id="sysRoleInfoModel" data-backdrop="static"
		tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
		aria-hidden="true">
		<div class="modal-content"
			style="width: 410px; margin: auto; margin-top: 120px;">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">&times;</button>
				<h4 class="modal-title" id="modalTitle">角色分配</h4>
				<input type="hidden" id="userId" />
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
				<button type="button" class="btn btn-warning" id="closeRole_btn"
					data-dismiss="modal">
					<span class="glyphicon glyphicon-remove"></span>&nbsp;关闭
				</button>
			</div>
		</div>
	</div>
	<!-- 角色model结束 -->


</body>
<script type="text/javascript"
	src="<%=basePath%>assets/plugins/jQuery/jquery-2.2.3.min.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/js/bootstrap/bootstrap.min.js"></script>
<script src="<%=basePath%>assets/js/bootstrap/bootstrap-select.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/js/laydate-5.0/laydate.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/js/layer/layer.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/plugins/datatables/jquery.dataTables.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/plugins/datatables/dataTables.bootstrap.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/plugins/validate/jquery.metadata.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/plugins/validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/plugins/validate/jquery.validate.message.cn.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/js/ztree/zTree_v3/js/jquery.ztree.core-3.5.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/js/ztree/zTree_v3/js/jquery.ztree.excheck-3.5.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/js/common/default.js"></script>
<!-- 自定义js -->
<script type="text/javascript"
	src="<%=basePath%>pages/systemManage/userManageList.js"></script>
<script>
	var path="<%=basePath%>";
	var userManageList = new userManageList();
</script>
</html>
