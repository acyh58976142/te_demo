<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>杆塔位地质明细表新增</title>
<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
<link href="<%=basePath%>assets/css/bootstrap/css/bootstarp.style.css" rel="stylesheet" /> 
<link href="<%=basePath%>assets/css/bootstrap/css/bootstrap.css" rel="stylesheet" />
<link href="<%=basePath%>assets/css/font-awesome/css/font-awesome.min.css" rel="stylesheet"/>
<link href="<%=basePath%>assets/plugins/datatables/dataTables.bootstrap.css" rel="stylesheet" />
<link href="<%=basePath%>assets/js/layer/mobile/need/layer.css" rel="stylesheet" />
<link href="<%=basePath%>assets/css/bootstrap/css/bootstrap-select.css" rel="stylesheet" />
<link href="<%=basePath%>assets/js/ztree/zTree_v3/css/zTreeStyle/zTreeStyle.css" rel="stylesheet"/>
 <link href="<%=basePath%>assets/js/video/video-js.min.css" rel="stylesheet">
<link href="<%=basePath%>assets/js/viewer/css/viewer.min.css" rel="stylesheet"> 
<!-- common css -->
<link href="<%=basePath%>assets/css/common/default.css" rel="stylesheet"/>
<!-- 自定义  -->
<link href="<%=basePath%>pages/geology/geology.css" rel="stylesheet"/>
</head>
<body>
	<div class="container">
	       <!--操作栏-->
	       <div class="row row-margin0">
	       <div class="col-md-4 col-xs-4">
				<div class="input-group">
					<label class="input-group-addon">选择工程</label> <select
						class="form-control" id="projectName"></select>
				</div>
			</div>
			<div class="col-md-8 col-xs-8">
	                <button class="btn btn-info" style="margin-top:0px;" id="geology_add">
							新加一条
					</button>
					<button class="btn btn-info" style="margin-top:0px;" id="geology_delete">
							删除
					</button>
					 <button class="btn btn-info" style="margin-top:0px;" id="geology_save">
							保存
				 </button>
				 </div>
	       </div>
	       <!--列表 -->
	        <div class="row row-margin0" id="table_div" style="overflow: auto">
			       <table class="text-center" id="geology_table">
			            <caption class="text-center"><u>池州东至县兰溪——尧渡 35kV线路新建工程杆塔位地质明细表</u></caption>
			            <thead>
			                <tr>
			                    <th rowspan="2" style="width: 50px;">杆塔编号</th>
			                    <th rowspan="2" style="width: 70px;">杆塔位置</th>
			                    <th rowspan="2" style="width: 100px;">勘探依据</th>
			                    <th rowspan="2" style="width: 100px;">地层名称</th>
			                    <th rowspan="2" style="width: 50px;">层底深度（m）</th>
			                    <th rowspan="2" style="width: 200px;">岩土表述</th>
			                    <th colspan="6">岩土物理力学指标</th>
			                    <th colspan="2">微地貌</th>
			                    <th rowspan="2" style="width: 70px;">勘测点位置</th>
			                    <th rowspan="2" style="width: 50px;">地下水位<br />埋深(m)</th>
			                    <th rowspan="2" style="width: 50px;">电阻率（Ω•m）</th>
			                    <th rowspan="2" style="width: 50px;">地层状态</th>
			                    <th rowspan="2" style="width: 70px;">备注</th>
			                </tr>
			                
			                <tr>
			                    <th style="width: 40px;">重力<br />密度r（kN/m³）</th>
			                    <th	style="width: 40px;">粘聚力C（kPa）</th>
			                    <th style="width: 40px;">内摩<br />擦角φ（°）</th>
			                    <th style="width: 40px;">承载力<br />特征值fak<br />（kPa）</th>
			                    <th style="width:40px;">桩的极限侧<br />阻力标准值qsik<br />（kPa）</th>
			                    <th style="width: 40px;">桩的极限端<br />阻力标准值qpk<br />（kPa）</th>
			                    <th style="width: 40px;">图片</th>
			                    <th style="width: 40px;">说明</th>
			                </tr>
			            </thead>
			       <tbody>
			       </tbody>
			       </table>
	       </div>
    </div>
   
   
	
</body>
<script type="text/javascript" src="<%=basePath%>assets/plugins/jQuery/jquery-2.2.3.min.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/bootstrap/bootstrap.min.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/laydate-5.0/laydate.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/layer/layer.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/common/default.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/plugins/datatables/jquery.dataTables.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/plugins/datatables/dataTables.bootstrap.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/bootstrap/bootstrap-select.js"></script>
<!-- viliDate -->
<script type="text/javascript" src="<%=basePath%>/assets/plugins/validate/jquery.metadata.js"></script>
<script type="text/javascript" src="<%=basePath%>/assets/plugins/validate/jquery.validate.min.js"></script>
<script type="text/javascript" src="<%=basePath%>/assets/plugins/validate/jquery.validate.message.cn.js"></script>
<!-- echarts js -->
<script src="<%=basePath%>assets/plugins/echarts/echarts.js"></script>
<script src="<%=basePath%>assets/plugins/echarts/macarons.js"></script>
<!-- 自定义js -->
<script type="text/javascript" src="<%=basePath%>pages/geology/geology.js"></script>
<script>
	var path="<%=basePath%>";
	var geology = new geology();
</script>
</html>
