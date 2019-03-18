<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>建立TA文件与route文件之间的关联</title>
<!-- Bootstrap 3.3.7 -->
<link rel="stylesheet"
	href="<%=basePath%>assets/css/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet"
	href="<%=basePath%>assets/css/font-awesome/css/font-awesome.min.css">
<!-- 自定义css -->
<link rel="stylesheet" href="<%=basePath %>pages/tower/towerAdd.css">
<body>
	<div class="">
		<div class="headDiv">
			<div class="col-lg-12 col-md-12 col-sm-12">
				<h3>建立route文件与TA文件之间的关联</h3>
			</div>
	<div class="row">
				
						<div class="col-md-12">
							<table class="table table-bordered">
								<tbody>
									<tr id="naiTableTr">
										<td>耐张段编号</td>
										<td>关联的TA文件</td>
									</tr>
									
								</tbody>
							</table>
						</div>
					</div>

			<div class="col-lg-12 col-md-12 col-sm-12 magintop-row">
				<div class="col-lg-offset-1 col-lg-10">
					<button class='form-control btn btn-info' id='submit'>提交</button>
				</div>
			</div>
		</div>
	</div>
</body>
<script type="text/javascript" src="<%=basePath%>assets/plugins/jQuery/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/bootstrap/bootstrap.min.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/layer/layer.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/plugins/form/jquery.form.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/common/default.js"></script> 
<script type="text/javascript" src="<%=basePath%>pages/tower/towerRelation.js"></script>
<script type="text/javascript">
    var path="<%=basePath%>";
    var id = '${requestScope.id}';
	var towerAdd = new towerAdd('${attList}');
</script>
</html>