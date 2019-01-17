<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>工程列表</title>
<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
<link rel="stylesheet" href="<%=request.getContextPath()%>/assets/css/bootstrap/css/bootstarp.style.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/assets/css/bootstrap/css/bootstrap.min.css">
<link href="<%=request.getContextPath()%>/assets/plugins/datatables/dataTables.bootstrap.css" rel="stylesheet">
<link rel="stylesheet" href="<%=request.getContextPath()%>/assets/css/font-awesome/css/font-awesome.min.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/assets/css/common/default.css">

</head>
<body>
	<div class="container">
		<div class="row row_serch">
			<div class="col-md-12 col-xs-12">
				<div class="pull-left">
					<h4>工程列表</h4>
				</div>
				<div class="pull-right">
			<%-- 	<c:if test="${isShow}"> --%>
					<button class="btn btn-primary" id="drl_btnNew">
							<i class="fa fa-file"></i>&nbsp;&nbsp;新&nbsp;建
					</button>
					<button class="btn btn-warning" id="drl_btnEdit">
							<i class="fa fa-pencil-square-o"></i>&nbsp;&nbsp;编&nbsp;辑
					</button>
		
					<button class="btn btn-info" id="apply-update">
						<i class="fa fa-paste"></i>&nbsp;&nbsp;校&nbsp;核
					</button>
				<%-- 	</c:if> --%>
			</div>
			</div>
		</div>
			<div class="row">
			<div class="col-md-12 col-xs-12 data-div">
				<table class="table table-hover table-bordered" id="projectApply_table">
					<thead>
						
					</thead>
					<tbody></tbody>
				</table>
</div>
</div>
</div>

<!-- Modal -->
<!-- 	<div class="modal fade" id="flowModal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog" style="width: 800px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">
						<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
					</button>
					<h4 class="modal-title" id="myModalLabel">数据流程</h4>
				</div>
				<div class="modal-body">
					<div class="row row_color">
						<div class="vertical-container dark-timeline" id="vertical-timeline">
							
						</div>
					</div>
				</div>
			</div>
		</div>
	</div> -->

</body>	
			
<script type="text/javascript" src="<%=request.getContextPath()%>/assets/plugins/jQuery/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/assets/js/bootstrap/bootstrap.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/assets/js/layer/layer.js"></script>
<script src="<%=request.getContextPath()%>/assets/plugins/datatables/jquery.dataTables.js"></script>
<script src="<%=request.getContextPath()%>/assets/plugins/datatables/dataTables.bootstrap.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/common/default.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/tower/projectList.js"></script>
<script type="text/javascript">
	var path="<%=request.getContextPath()%>";
	var projectList = new projectList();
</script>
</html>