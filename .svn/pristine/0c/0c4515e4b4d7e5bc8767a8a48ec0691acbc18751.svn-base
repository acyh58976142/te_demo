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
	  <div class="row">
	       <!--操作栏-->
	       <div class="col-xs-12 text-right">
	               <!--  <button class="btn btn-info" style="margin-top:0px;" id="editGeology_add">
							提交
					</button> -->
					<button class="btn btn-info" style="margin-top:0px;" id="editGeology_delete">
							删除
					</button>
					<button class="btn btn-info" style="margin-top:0px;" id="editGeology_improt">
							导出 
					</button>
	       </div>
	       <div id="improt_div"> 
	        <style  type="text/css">
	                #print_div table{
	                border-collapse:collapse;
	                margin: auto;
	                }
	              	#print_div  tr{
					/* 	border:1px solid #000; */
						
					}
					#print_div  th{
						vertical-align: middle;
						border:1px solid #000;
						/* padding: 0px; */
					    line-height: 1.42857143;
					    font-weight: bold ;
					  
					}
					#print_div  td{ 
						text-align:center;
						border:1px solid #000;
						
					}
					.inputText{
						border:0;
						outline: none;
						width: 100%;
						text-align: center;
					}
					 select{
						text-align: center;
					    text-align-last: center;
					    -webkit-appearance: none;
					    border:0; 
					}
	        </style>
	       <!--列表 -->
	        <div class="col-xs-12 " id="print_div">
	        
	       	       <table border="0" cellspacing="0" cellpadding="0" class="text-center" id="editGeology_table">
			        
			            <caption class="text-center"><u>池州东至县兰溪——尧渡 35kV线路新建工程杆塔位地质明细表</u></caption>
			            <thead>
			                <tr>
			                    <th  rowspan="2" style="width: 3%">杆塔编号</th>
			                    <th  rowspan="2" style="width: 4%">杆塔位置</th>
			                    <th  rowspan="2" style="width: 3%">勘探依据</th>
			                    <th  rowspan="2" style="width: 3%">地层名称</th>
			                    <th  rowspan="2" style="width: 3%">层底深度（m）</th>
			                    <th  rowspan="2" style="width: 15%">岩土表述</th>
			                    <th  colspan="6">岩土物理力学指标</th>
			                    <th  colspan="2">微地貌</th>
			                    <th  rowspan="2" style="width: 4%">勘测点位置</th>
			                    <th  rowspan="2" style="width: 5%">地下水位类型埋深（m）</th>
			                    <th rowspan="2" style="width: 4%">备注</th>
			                </tr>
			                
			                <tr>
			                    <th style="width: 3%">重力<br />密度r（kN/m³）</th>
			                    <th	style="width: 3%">粘聚力C（kPa）</th>
			                    <th style="width: 3%">内摩<br />擦角φ（°）</th>
			                    <th style="width: 3%">承载力<br />特征值fak（kPa）</th>
			                    <th style="width: 5%">桩的极限侧阻力标准值qsik（kPa）</th>
			                    <th style="width: 5%">桩的极限端阻力标准值qpk（kPa）</th>
			                    <th style="width: 20%">图片</th>
			                    <th style="width: 4%">说明</th>
			                </tr>
			            </thead>
			       <tbody>
			       </tbody>
			       </table>
	       </div>
	       </div>
	        <div class="col-xs-12 text-center">
	             <button class="btn btn-info" style="" id="editGeology_submit">
							提交
				 </button>
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
<!-- viliDate -->
<script type="text/javascript" src="<%=basePath%>/assets/plugins/validate/jquery.metadata.js"></script>
<script type="text/javascript" src="<%=basePath%>/assets/plugins/validate/jquery.validate.min.js"></script>
<script type="text/javascript" src="<%=basePath%>/assets/plugins/validate/jquery.validate.message.cn.js"></script>
<!-- echarts js -->
<script src="<%=basePath%>assets/plugins/echarts/echarts.js"></script>
<script src="<%=basePath%>assets/plugins/echarts/macarons.js"></script>
<!--导出word  -->
<script type="text/javascript" src="<%=basePath%>/assets/plugins/FileSaver.js-master/FileSaver.js"></script>
<script type="text/javascript" src="<%=basePath%>/assets/plugins/jQuery-Word-Export-master/jquery.wordexport.js"></script>
<!-- 自定义js -->
<script type="text/javascript" src="<%=basePath%>pages/geology/editGeology.js"></script>
<script>
	var path="<%=basePath%>";
	var editGeology = new editGeology();
</script>
</html>
