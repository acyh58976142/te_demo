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
<title>组配件明细表说明</title>
<!-- Bootstrap 3.3.7 -->
<link rel="stylesheet"
	href="<%=basePath%>assets/css/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet"
	href="<%=basePath%>assets/css/font-awesome/css/font-awesome.min.css">
<!-- 自定义css -->
<link rel="stylesheet" href="<%=basePath %>pages/parts/partsExplain.css">
<body>
<div class="row">
<div class="col-lg-1 col-md-1 col-sm-1">
</div>
<div class="col-lg-11 col-md-11 col-sm-11">
<div class="pull-right">
<button class="btn btn-primary" id="export_btn"><i class="fa fa-save"></i>&nbsp;&nbsp;导&nbsp;出</button>
	<button class="btn btn-warning" id="btn_apply_back"><i class="fa fa-mail-reply"></i>&nbsp;&nbsp;返&nbsp;回</button>
</div>
<table id="explainTable">
<tr style="text-align:center;"><td colspan="10"><h1>组配件明细表说明</h1></td></tr>
<tr style="text-align:left;"><td style="width: 30px"></td><td colspan="9">1:本表中导、地线、OPGW光缆金具串型式均以代号表示，其代号意义及适用情况见下表：</td></tr>
<tr style="text-align:center;" id="wireCountTr"><td></td><td style="border: 1px solid black;width: 200px">名称</td>
<td style="border: 1px solid black;width: 120px">代号</td><td style="border: 1px solid black;width: 200px" >数量(串)</td>
<td style="border: 1px solid black;width: 200px">适用情况</td><td style="width: 200px"></td><td style="width: 200px"></td>
<td style="width: 70px"></td><td style="width: 100px"></td><td style="width: 100px"></td></tr>

<tr style="height: 18px"></tr>
<tr style="text-align:left;"><td></td><td colspan="9">2:防振锤数量及安装原则如下：</td></tr>
<tr style="text-align:center;" id="hammerTr"><td></td><td style="border: 1px solid black;">电线型号</td>
<td style="border: 1px solid black;">防振锤型号</td><td style="border: 1px solid black;" >总数(只)</td>
<td style="border: 1px solid black;">安装1只档距范围①</td><td style="border: 1px solid black;">安装2只档距范围①</td>
<td style="border: 1px solid black;">安装3只档距范围①</td><td></td><td></td><td></td></tr>

<tr style="height: 18px"></tr>
<tr style="text-align:left;"><td></td><td colspan="9">3:OPGW光缆分盘方案如下：</td></tr>
<tr style="text-align:center;" id="OPGWTr"><td></td><td style="border: 1px solid black;">盘号</td>
<td style="border: 1px solid black;">盘长(m)</td><td style="border: 1px solid black;" >起点塔号</td>
<td style="border: 1px solid black;">起点塔型</td><td style="border: 1px solid black;">终点塔号</td>
<td style="border: 1px solid black;">终点塔型</td><td></td><td></td><td></td></tr>

<tr style="height: 18px"></tr>
<tr style="text-align:center;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td rowspan="2" style="border: 1px solid black">说明页</td><td style="border: 1px solid black">图     号</td><td style="border: 1px solid black">图纸级别</td></tr>
<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td style="border: 1px solid black"><span id="pageCode"></span></td><td style="border: 1px solid black">3</td></tr>
</table>
</div>
</div>
</body>
<script type="text/javascript" src="<%=basePath%>assets/plugins/jQuery/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/bootstrap/bootstrap.min.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/layer/layer.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/plugins/form/jquery.form.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/common/default.js"></script> 
<script type="text/javascript" src="<%=basePath%>pages/parts/partsExplain.js"></script>
<script type="text/javascript">
    var path="<%=basePath%>";
    var id = '${requestScope.id}';
    var projectCode = '${requestScope.projectCode}'; 
    var codeCountList = new Array();
    codeCountList.push(JSON.parse('${requestScope.parts.column_k}'));
    codeCountList.push(JSON.parse('${requestScope.parts.column_l}'));
    codeCountList.push(JSON.parse('${requestScope.parts.column_m}'));
    codeCountList.push(JSON.parse('${requestScope.parts.column_n}'));
    codeCountList.push(JSON.parse('${requestScope.parts.column_o}')); 
    codeCountList.push(JSON.parse('${requestScope.parts.column_p}'));
    codeCountList.push(JSON.parse('${requestScope.parts.column_q}'));
    codeCountList.push(JSON.parse('${requestScope.parts.column_r}')); 
    codeCountList.push(JSON.parse('${requestScope.parts.column_s}'));//9
    codeCountList.push(JSON.parse('${requestScope.parts.column_t}'));//10
    codeCountList.push(JSON.parse('${requestScope.parts.column_w}'));//11 
    codeCountList.push(JSON.parse('${requestScope.parts.column_x}'));//12
    codeCountList.push(JSON.parse('${requestScope.parts.column_a}'));
    codeCountList.push(JSON.parse('${requestScope.parts.column_ae}')); 
    var hammerCountList = new Array();
   	hammerCountList.push(JSON.parse('${requestScope.parts.column_af}'));//导线型号
    hammerCountList.push(JSON.parse('${requestScope.parts.column_aa}'));//导线防震锤数量
    hammerCountList.push(JSON.parse('${requestScope.parts.column_ag}'));//地线型号
    hammerCountList.push(JSON.parse('${requestScope.parts.column_ab}'));//地线防震锤数量
    hammerCountList.push(JSON.parse('${requestScope.parts.column_ah}'));//OPGW型号
    hammerCountList.push(JSON.parse('${requestScope.parts.column_ac}'));//OPGW防震锤数量
    hammerCountList.push(JSON.parse('${requestScope.parts.column_ai}'));//导线直径 
    var damper = '${requestScope.damper}';
    var hammerType = '${requestScope.wireConfig.hammerType}';
    var partsExplain = new partsExplain();
</script>
</html>