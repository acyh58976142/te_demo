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
<title>明细表编辑</title>
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
<link href="<%=basePath%>pages/geology/editGeology.css" rel="stylesheet"/>
</head>
<body>
	<div class="container">
			<form enctype="multipart/form-data" id="uploadForm"
			onsubmit="return false;">
			<a href="javascript:" id="clearContext" class="file pull-left"> <input
				type="file" name="filename" id="uploadify"
				accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
				style="display: none;" class="uploadfile" />
			</a>
		</form>
	  <div class="row">
	       <!--操作栏-->
	       <div class="col-xs-12 ">
	       <div class="col-md-4 col-xs-4">
				<div class="input-group">
					<label class="input-group-addon">选择工程</label> <select
						class="form-control" id="projectName"></select>
				</div>
			</div>
			 <div class="col-md-8 col-xs-8">
			         <button class="btn btn-info" id="searchBtn" style="margin-top: 0px;">
						      <span class="glyphicon glyphicon-search"></span>&nbsp;查询
					 </button>
	                <!--  <button class="btn btn-info" style="margin-top:0px;" id="editGeology_submit">
							提交
					</button>  -->
					<button class="btn btn-info" id="editGeology_add" style="margin-top: 0px;">
					   添加
				    </button>
					 <button class="btn btn-info" style="margin-top:0px;" id="editGeology_update">
							修改
					</button> 
					<button class="btn btn-info" style="margin-top:0px;" id="editGeology_delete">
							删除
					</button>
					<button class="btn btn-info" id="editGeology_import" style="margin-top: 0px;">
					<span class="glyphicon glyphicon-folder-open"></span>&nbsp;&nbsp;导入
				    </button>
					<button class="btn btn-info" style="margin-top:0px;" id="editGeology_improt">
							导出 
					</button>
			</div>
	       </div>
	       <div id="improt_div"> 
	       <!--列表 -->
	        <div class="col-xs-12 " id="print_div">
	        
	       	       <table border="0" cellspacing="0" cellpadding="0" class="text-center" id="editGeology_table">
			        
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
	  </div>
    </div>
   
   <div class="col-xs-12 " id="export_div">	        
	       	       <table border="1" cellspacing="0" cellpadding="0" class="text-center" id="editGeology_table2">
			        
			            <caption class="text-center"><u>池州东至县兰溪——尧渡 35kV线路新建工程杆塔位地质明细表</u></caption>
			            <thead>
			                <tr>
			                    <td rowspan="2" style="width: 50px;">杆塔编号</td>
			                    <td rowspan="2" style="width: 70px;">杆塔位置</td>
			                    <td rowspan="2" style="width: 100px;">勘探依据</td>
			                    <td rowspan="2" style="width: 100px;">地层名称</td>
			                    <td rowspan="2" style="width: 50px;">层底深度（m）</td>
			                    <td rowspan="2" style="width: 200px;">岩土表述</td>
			                    <td colspan="6">岩土物理力学指标</td>
			                    <td colspan="2">微地貌</td>
			                    <td rowspan="2" style="width: 70px;">勘测点位置</td>
			                    <td rowspan="2" style="width: 50px;">地下水位埋深(m)</td>
			                    <td rowspan="2" style="width: 50px;">电阻率（Ω•m）</td>
			                    <!-- <td rowspan="2" style="width: 50px;">地层状态</td> -->
			                    <td rowspan="2" style="width: 70px;">备注</td>
			                </tr>
			                
			                <tr>
			                    <td style="width: 40px;">重力密度r（kN/m³）</td>
			                    <td	style="width: 40px;">粘聚力C（kPa）</td>
			                    <td style="width: 40px;">内摩擦角φ（°）</td>
			                    <td style="width: 40px;">承载力特征值fak（kPa）</td>
			                    <td style="width:40px;">桩的极限侧阻力标准值qsik（kPa）</td>
			                    <td style="width: 40px;">桩的极限端阻力标准值qpk（kPa）</td>
			                    <td style="width: 40px;">图片</td>
			                    <td style="width: 40px;">说明</td>
			                </tr>
			            </thead>
			       <tbody>
			       </tbody>
			       </table>
	       </div>
	       
	       	<!-- model -->
	<div class="modal fade" tabindex="-1" role="dialog" id="addModal">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">添加地质信息</h4>
				</div>
				<div class="modal-body">
					<input id="sortno" type="text" class="form-control"
						style="display: none" />
					<input type="text" 	style="display: none;" id="projectId">			
					<div class="row">					
						<div class="col-md-6">
							<div class="input-group" style="width: 100%;">
								<label class="input-group-addon label-width1">杆塔编号</label>
									 <select
									id="towerNum1" class="form-control" data-stopPropagation="true">									
								</select>								
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width2">杆塔位置</label> <input
									id="towerLocation1" type="text" class="form-control" />
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">勘探依据</label>
									<select id="explorationBasis1" class="form-control" data-stopPropagation="true">
									<option value="" selected="selected">请选择</option>
									<option value="1">钻孔</option>
									<option value="2">小麻花钻</option>
									<option value="3">静力触探</option>
									<option value="4">地质调查</option>
									<option value="5">小麻花钻+地质调查</option>
									<option value="6">静力触探+地质调查</option>
								</select>
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group" style="width: 100%;">
								<label class="input-group-addon label-width2">地层名称</label> <select
									id="stratigraphicName1" class="form-control" data-stopPropagation="true">									
								</select>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">层底深度</label> <input
									id="floorDepth1" type="text" class="form-control" />
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width2">地层状态</label> <input
									id="stratigraphicState1" type="text" class="form-control" readonly="readonly"/>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12">
							<div class="input-group">
								<label class="input-group-addon label-width1">岩土描述</label> <input
									id="geotechnicalDescription1" type="text" class="form-control" readonly="readonly"/>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">重力密度r(kN/m³)</label> <input
									id="gravityDensity1" type="text" class="form-control" readonly="readonly"/>
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width2">粘聚力C(kPa)</label> <input
									id="cohesion1" type="text" class="form-control" readonly="readonly"/>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">内摩擦角φ(°)</label> <input
									id="internalFrictionAngle1" type="text" class="form-control" readonly="readonly"/>
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width2">承载力特征值fak(kPa)</label> <input
									id="eigenvalueCapacity1" type="text" class="form-control" readonly="readonly"/>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">桩的极限侧阻力qsik(kPa)</label> <input
									id="standardSideResistance1" type="text" class="form-control" readonly="readonly"/>
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width2">桩的极限端阻力qpk(kPa)</label> <input
									id="standardEndResistance1" type="text" class="form-control" readonly="readonly"/>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">图片</label> <input
									id="pic1" type="text" class="form-control" />
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width2">说明</label> <input
									id="illustrate1" type="text" class="form-control" />
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">勘测点位置</label> <input
									id="surveyPointLocation1" type="text" class="form-control" />
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width2">地下水位埋深</label> <input
									id="waterLevel1" type="text" class="form-control" />
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">电阻率(Ω•m)</label> <input
									id="resistivity1" type="text" class="form-control" />
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width2">备注</label> <input
									id="remark1" type="text" class="form-control" />
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" id="addSubmitBtn">
						<span class="glyphicon glyphicon-floppy-disk"></span>&nbsp;保存
					</button>
					<button type="button" class="btn btn-warning" data-dismiss="modal">
						<span class="glyphicon glyphicon-remove"></span>&nbsp;关闭
					</button>
				</div>
			</div>
		</div>
	</div>
	       
	
	<!-- model -->
	<div class="modal fade" tabindex="-1" role="dialog" id="updateModal">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">修改地质信息</h4>
				</div>
				<div class="modal-body">
					<input id="geoId" type="text" class="form-control"
						style="display: none" />
					<input type="text" 	style="display: none;" id="projectId">			
					<div class="row">					
						<div class="col-md-6">
							<div class="input-group" style="width: 100%;">
								<label class="input-group-addon label-width1">杆塔编号</label> <input
									id="towerNum" class="form-control" readonly="readonly"/>								
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width2">杆塔位置</label> <input
									id="towerLocation" type="text" class="form-control" />
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">勘探依据</label>
									<select id="explorationBasis" class="form-control" data-stopPropagation="true">
									<option value="1">钻孔</option>
									<option value="2">小麻花钻</option>
									<option value="3">静力触探</option>
									<option value="4">地质调查</option>
									<option value="5">小麻花钻+地质调查</option>
									<option value="6">静力触探+地质调查</option>
								</select>
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group" style="width: 100%;">
								<label class="input-group-addon label-width2">地层名称</label> <select
									id="stratigraphicName" class="form-control" data-stopPropagation="true">									
								</select>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">层底深度</label> <input
									id="floorDepth" type="text" class="form-control" />
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width2">地层状态</label> <input
									id="stratigraphicState" type="text" class="form-control" readonly="readonly"/>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12">
							<div class="input-group">
								<label class="input-group-addon label-width1">岩土描述</label> <input
									id="geotechnicalDescription" type="text" class="form-control" readonly="readonly"/>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">重力密度r(kN/m³)</label> <input
									id="gravityDensity" type="text" class="form-control" readonly="readonly"/>
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width2">粘聚力C(kPa)</label> <input
									id="cohesion" type="text" class="form-control" readonly="readonly"/>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">内摩擦角φ(°)</label> <input
									id="internalFrictionAngle" type="text" class="form-control" readonly="readonly"/>
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width2">承载力特征值fak(kPa)</label> <input
									id="eigenvalueCapacity" type="text" class="form-control" readonly="readonly"/>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">桩的极限侧阻力qsik(kPa)</label> <input
									id="standardSideResistance" type="text" class="form-control" readonly="readonly"/>
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width2">桩的极限端阻力qpk(kPa)</label> <input
									id="standardEndResistance" type="text" class="form-control" readonly="readonly"/>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">图片</label> <input
									id="pic" type="text" class="form-control" />
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width2">说明</label> <input
									id="illustrate" type="text" class="form-control" />
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">勘测点位置</label> <input
									id="surveyPointLocation" type="text" class="form-control" />
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width2">地下水位埋深</label> <input
									id="waterLevel" type="text" class="form-control" />
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">电阻率（Ω•m）</label> <input
									id="resistivity" type="text" class="form-control" />
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width2">备注</label> <input
									id="remark" type="text" class="form-control" />
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" id="updateSubmitBtn">
						<span class="glyphicon glyphicon-floppy-disk"></span>&nbsp;保存
					</button>
					<button type="button" class="btn btn-warning" data-dismiss="modal">
						<span class="glyphicon glyphicon-remove"></span>&nbsp;关闭
					</button>
				</div>
			</div>
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
<!--导出word  -->
<script type="text/javascript" src="<%=basePath%>/assets/plugins/FileSaver.js-master/FileSaver.js"></script>
<script type="text/javascript" src="<%=basePath%>/assets/plugins/jQuery-Word-Export-master/jquery.wordexport.js"></script>
<!--附件上传  -->
<script type="text/javascript" src="<%=basePath%>assets/plugins/form/jquery.form.js"></script>
<!-- 自定义js -->
<script type="text/javascript" src="<%=basePath%>pages/geology/editGeology.js"></script>
<script>
	var path="<%=basePath%>";
	var editGeology = new editGeology();
</script>
</html>
