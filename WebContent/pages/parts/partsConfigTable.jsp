<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String filePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>串型配置</title>
<meta
	content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
	name="viewport">
<link href="<%=basePath%>assets/css/bootstrap/css/bootstarp.style.css"
	rel="stylesheet" />
<link href="<%=basePath%>assets/css/bootstrap/css/bootstrap.css"
	rel="stylesheet" />
<link
	href="<%=basePath%>assets/css/font-awesome/css/font-awesome.min.css"
	rel="stylesheet" />
<link
	href="<%=basePath%>assets/plugins/datatables/dataTables.bootstrap.css"
	rel="stylesheet" />

<!-- ZTree css -->
<link
	href="<%=basePath%>assets/js/ztree/zTree_v3/css/zTreeStyle/zTreeStyle.css"
	rel="stylesheet">

<!-- common css -->
<link href="<%=basePath%>assets/css/common/default.css" rel="stylesheet" />
<!-- 自定义css -->
<link href="<%=basePath%>pages/parts/partsConfigTable.css"
	rel="stylesheet" />
<link rel="stylesheet" href="<%=basePath%>assets/js/zcell/ZCell.css">
</head>
<body>
<div class="pull-right">
	<button class="btn btn-warning" id="btn_apply_back"><i class="fa fa-mail-reply"></i>&nbsp;&nbsp;返&nbsp;回</button>
	</div>
	<ul id="myTab" class="nav nav-tabs"
		style="padding-top: 10PX; margin-left: 1%;">
		<li class="active"><a href="#stingConfig" class="activeIdHref"
			data-toggle="tab">串型配置</a></li>
		<li><a href="#index" data-toggle="tab" class="activeIdHref" id="indexConfig"
			data-toggle="tab">默认配置</a></li>
		<li><a href="#description" class="activeIdHref" data-toggle="tab">OPGW光缆防振锤安装数量原则</a></li>
		<!-- <li><a href="#info" class="activeIdHref" data-toggle="tab">区段配置</a></li> -->
		<li><a href="#cable" class="activeIdHref" data-toggle="tab">光缆盘长计算</a></li>
		<li><a href="#hammerType" class="activeIdHref" data-toggle="tab">防振锤型号</a></li>
	</ul>
	<div class="container">
		<div id="myTabContent" class="tab-content">
			<!-- 串型配置开始 -->
			<div class="tab-pane fade in active" id="stingConfig">
			<div class="text-right">
					<button class="btn btn-success" id="btn_sting_save"><i class="fa fa-check-square-o"></i>&nbsp;&nbsp;保&nbsp;存</button>
			</div>
				<div class="row">
				
						<div class="col-md-12">
							<table class="table table-bordered" id="wireTable">
								<tbody>
									<tr>
										<td rowspan="2" width="50px">操作</td>
										<td rowspan="2" width="120px">导线型号</td>
										<td colspan="3">导线悬垂串</td>
										<td colspan="3">导线耐张串</td>
										<td colspan="3">跳线悬垂串</td>
									</tr>
									<tr id="wireTableTr">
									<td width="100px">名称</td>
									<td width="50px">代号</td>
									<td width="100px">适用情况</td>
									<td width="100px">名称</td>
									<td width="50px">代号</td>
									<td width="100px">适用情况</td>
									<td width="100px">名称</td>
									<td width="50px">代号</td>
									<td width="100px">适用情况</td>
									</tr>
								</tbody>
							</table>
							<br>
							<table class="table table-bordered" id="groundTable">
								<tbody>
									<tr>
										<td rowspan="2" width="60px">操作</td>
										<td rowspan="2" width="150px">导线型号</td>
										<td colspan="3">地线悬垂串</td>
										<td colspan="3">地线耐张串</td>			
								
									</tr>
									<tr id="groundTableTr">
									<td width="200px">名称</td>
									<td width="80px">代号</td>
									<td width="">适用情况</td>
									<td width="200px">名称</td>
									<td width="80px">代号</td>
									<td width="">适用情况</td>
								</tbody>
							</table>
							
							<br>
							<table class="table table-bordered" id="OPGWTable">
								<tbody>
									<tr>
										<td rowspan="2" width="60px">操作</td>
										<td rowspan="2" width="150px">导线型号</td>
									
										<td colspan="3">OPGW光缆悬垂串</td>
										<td colspan="3">OPGW光缆耐张串</td>
									</tr>
									<tr id="OPGWTableTr">
									<td width="200px">名称</td>
									<td width="80px">代号</td>
									<td width="">适用情况</td>
									<td width="200px">名称</td>
									<td width="80px">代号</td>
									<td width="">适用情况</td>
								</tbody>
							</table>
						</div>
					</div>
			</div>

			<!-- 串型配置结束 -->

			<!-- 目录(20串)开始 -->
			<div class="tab-pane fade" id="index">
				<div class="text-right">
					<button class="btn btn-success" id="btn_save"><i class="fa fa-check-square-o"></i>&nbsp;&nbsp;保&nbsp;存</button>
				</div>
					<div class="row">
					<div class="col-md-2"></div>
						<div class="col-md-8">
							<table class="table table-bordered" id="wireDefaultTable">
								<tbody>
									<tr>			
										<td rowspan="2" width="150px">导线型号</td>
										<td>导线悬垂串</td>
										<td>导线耐张串</td>
										<td colspan="3">跳线悬垂串</td>
									</tr>
									<tr id="wireDefaultTr">				
									<td width="100px">代号</td>
									<td width="100px">代号</td>
									<td width="100px">代号</td>
									<td width="">转角外侧装跳线悬垂串最小角度</td>
									<td width="">转角内侧装跳线悬垂串最大角度</td>
									</tr>
								</tbody>
							</table>
							<br>
							<table class="table table-bordered" id="groundDefaultTable">
								<tbody>
									<tr>
										<td rowspan="2" width="150px">导线型号</td>
										<td>地线悬垂串</td>
										<td>地线耐张串</td>			
								
									</tr>
									<tr id="groundDefaultTr">
								
									<td>代号</td>
								
									<td>代号</td>
					
								</tbody>
							</table>
							
							<br>
							<table class="table table-bordered" id="OPGWDefaultTable">
								<tbody>
									<tr>
										<td rowspan="2" width="150px">导线型号</td>
									
										<td>OPGW光缆悬垂串</td>
										<td>OPGW光缆耐张串</td>
									</tr>
									<tr id="OPGWDefaultTr">
							
									<td>代号</td>
						
									<td>代号</td>
						
								</tbody>
							</table>
						</div>
					</div>
			</div>
			
			<!-- 目录(20串)结束 -->


			<div class="tab-pane fade" id="description">
			
			<div class="text-right">
					<button class="btn btn-success" id="btn_description_save"><i class="fa fa-check-square-o"></i>&nbsp;&nbsp;保&nbsp;存</button>
			</div>
			
					 <div class="row">
					 <div class="col-md-3"></div>
						<div class="col-md-6">
						<div style="display: none">
						<div class="row" id="wireRange1">
						 	<div class="col-md-2 text-center marginDiv">导线直径范围</div><div class="col-md-2"><input type="text" class="input_control" value="0" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"></div>
						 	<div class="col-md-1  text-center marginDiv">~</div><div class="col-md-2"><input type="text" class="input_control" value="12" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"></div>	
						
							<table class="table table-bordered">				
							
									<tr>
										<td>档距下限</td>
										<td>档距上限</td>
										<td>数量</td>
									</tr>
									<tr>
										<td><input type="text" class="input_control" value="0" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"></td>
										<td><input type="text" class="input_control" value="300" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"></td>
										<td><input type="text" class="input_control" value="1" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"></td>
									</tr>
									<tr>
										<td><input type="text" class="input_control" value="300" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"></td>
										<td><input type="text" class="input_control" value="600" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"></td>
										<td><input type="text" class="input_control" value="2" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"></td>
									</tr>
									<tr>
										<td><input type="text" class="input_control" value="600" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"></td>
										<td><input type="text" class="input_control" value="900" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"></td>
										<td><input type="text" class="input_control" value="3" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"></td>
									</tr>
							
							</table>
							</div>
							<br>
							<div class="row" id="wireRange2">
						 	<div class="col-md-2 text-center marginDiv">导线直径范围</div><div class="col-md-2"><input type="text" class="input_control" value="12" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"></div>
						 	<div class="col-md-1  text-center marginDiv">~</div><div class="col-md-2"><input type="text" class="input_control" value="22" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"></div>	
							
							<table class="table table-bordered">
							
								<tbody>
									<tr>
										<td>档距下限</td>
										<td>档距上限</td>
										<td>数量</td>
									</tr>
									<tr>
										<td><input type="text" class="input_control" value="0" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"></td>
										<td><input type="text" class="input_control" value="350" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"></td>
										<td><input type="text" class="input_control" value="1" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"></td>
									</tr>
									<tr>
										<td><input type="text" class="input_control" value="350" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"></td>
										<td><input type="text" class="input_control" value="700" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"></td>
										<td><input type="text" class="input_control" value="2" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"></td>
									</tr>
									<tr>
										<td><input type="text" class="input_control" value="700" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"></td>
										<td><input type="text" class="input_control" value="1000" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"></td>
										<td><input type="text" class="input_control" value="3" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"></td>
									</tr>
								</tbody>
							</table>
							</div>
							<br>
							<div class="row" id="wireRange3">
						 	<div class="col-md-2 text-center marginDiv">导线直径范围</div><div class="col-md-2"><input type="text" class="input_control" value="22" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"></div>
						 	<div class="col-md-1  text-center marginDiv">~</div><div class="col-md-2"><input type="text" class="input_control" value="37.1" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"></div>	
				
							<table class="table table-bordered">
								
								<tbody>
									<tr>
										<td>档距下限</td>
										<td>档距上限</td>
										<td>数量</td>
									</tr>
									<tr>
										<td><input type="text" class="input_control" value="0" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"></td>
										<td><input type="text" class="input_control" value="450" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"></td>
										<td><input type="text" class="input_control" value="1" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"></td>
									</tr>
									<tr>
										<td><input type="text" class="input_control" value="450" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"></td>
										<td><input type="text" class="input_control" value="800" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"></td>
										<td><input type="text" class="input_control" value="2" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"></td>
									</tr>
									<tr>
										<td><input type="text" class="input_control" value="800" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"></td>
										<td><input type="text" class="input_control" value="1200" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"></td>
										<td><input type="text" class="input_control" value="3" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"></td>
									</tr>
								</tbody>
							</table>
							</div>
							</div>
							<div class="row" id="wireRange0">
						 	 		
							<table class="table table-bordered">
							
								<tbody>
									<tr>
										<td>档距下限</td>
										<td>档距上限</td>
										<td>数量</td>
									</tr>
									<tr>
										<td><input type="text" class="input_control" value="0" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"></td>
										<td><input type="text" class="input_control" value="250" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"></td>
										<td><input type="text" class="input_control" value="1" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"></td>
									</tr>
									<tr>
										<td><input type="text" class="input_control" value="250"></td>
										<td><input type="text" class="input_control" value="500"></td>
										<td><input type="text" class="input_control" value="2"></td>
									</tr>
									<tr>
										<td><input type="text" class="input_control" value="500"></td>
										<td><input type="text" class="input_control" value="800"></td>
										<td><input type="text" class="input_control" value="3"></td>
									</tr>
								</tbody>
							</table>
							</div>
						</div>
					</div> 
				
			</div>



			<div class="tab-pane fade" id="cable">
			<div class="text-right">
					<button class="btn btn-success" id="btn_cable_save"><i class="fa fa-check-square-o"></i>&nbsp;&nbsp;保&nbsp;存</button>
			</div>
					<div class="row">
					 <div class="col-md-3"></div>
						<div class="col-md-6">
							<table class="table table-bordered">
								<tr>
									<td colspan="2">光缆线长系数</td>
								</tr>
								<tr>
									<td>k=</td>
									<td><input id="modulus" type="text" class="input_control" value="1.015">
									</td>
								</tr>
							</table>
							<table class="table table-bordered">
								<tr>
									<td colspan="2">光缆盘长裕度</td>
								</tr>
								<tr>
									<td>L=</td>
									<td><input id="margin" type="text" class="input_control" value="40">
									</td>
								</tr>
							</table>
							<table>
							</table>
							<table class="table table-bordered" id="taTypeTable">
								<tr id="taTypeTr">
									<td>序号</td>
									<td>接续塔塔型</td>
									<td>地线支架-下横担高度</td>
								</tr>
							</table>
						</div>
					</div>
				</div>
				
			<div class="tab-pane fade" id="hammerType">
			<div class="text-right">
					<button class="btn btn-success" id="btn_hammerType_save"><i class="fa fa-check-square-o"></i>&nbsp;&nbsp;保&nbsp;存</button>
			</div>
					<div class="row">
					 <div class="col-md-3"></div>
						<div class="col-md-6">
							
							<table class="table table-bordered" id="hammerTypeTable">
								<tr id="hammerTypeTr">
									<td>导线型号</td>
									<td>防振锤型号</td>
								</tr>
							</table>
						</div>
					</div>
				</div>
				
			</div>
		</div>


</body>
<script type="text/javascript"
	src="<%=basePath%>assets/plugins/jQuery/jquery-2.2.3.min.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/js/bootstrap/bootstrap.min.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/js/layer/layer.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/js/zcell/ZCell.register.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/js/zcell/ZCell.min.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/js/common/default.js"></script>

<!-- 自定义js -->
<script type="text/javascript"
	src="<%=basePath%>pages/parts/partsConfigTable.js"></script>
<script>
	var path="<%=basePath%>";
	var id = '${requestScope.id}'; 
	var damper = '${requestScope.damper}'; 
	var cableModulus = '${requestScope.wireConfig.cableLengthModulus}';
	var cableMargin = '${requestScope.wireConfig.cableLengthMargin}';
	var hammerType = '${requestScope.wireConfig.hammerType}';
	var partsConfig = new partsConfig();
</script>
</html>
