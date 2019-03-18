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
<title>杆塔明细详情</title>
<link rel="stylesheet" href="<%=basePath%>assets/css/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="<%=basePath%>assets/js/zcell/ZCell.css">
<style type="text/css">
#cellContainer{
	border: 0px!important; 
    overflow: hidden;
    margin-left: 20px;
}
#zfstatd{
	display: none;
}
.rulercro{
	width: 30px!important;
}
.topDiv{
 	margin-top: 10px;
}
td{
	white-space: normal!important;
}
#coverTable td{
 text-align:center;
 height: 20px;
 border: 1px solid black; 
}
#coverTable tr{
 text-align:center;
}
.middlefont{
 font-size: 18px;
}
</style>
</head>
</head>
<body>
<div class="col-md-12 col-xs-12 topDiv" >
				<div class="pull-left">
					<h4>杆塔明细</h4>
				</div>
				<div class="pull-right">
					<button class="btn btn-primary" id="export_btn" onclick="JSONToExcelConvertor()"><i class="fa fa-save"></i>&nbsp;&nbsp;导&nbsp;出</button>
					<button class="btn btn-warning" id="btn_apply_back" onclick="backUpPage()"><i class="fa fa-mail-reply"></i>&nbsp;&nbsp;返&nbsp;回</button>
				</div>
			</div> 
<div class="col-md-12 col-xs-12">
	<div id="cellContainer" style="border:1px solid #DDECFE; overflow:hidden;">
	</div>
</div>
<div class="col-md-12"></div>
	<div class="col-md-12">上传杆塔明细文件:&nbsp;&nbsp;&nbsp;<span id="stage_file_two"></span>
</div>
<table id="coverTable" style="display: none">
<tr style="text-align:center; height: 24px"><td colspan="2" style="border: 1px solid black;width: 160px;">检索号：</td><td colspan="4" style="border: 1px solid black;width: 320px;"><span id="projectCode"></span></td><td style="width: 80px;"></td><td style="width: 80px;"></td><td style="width: 80px;"></td><td style="width: 80px;"></td><td style="width: 80px;"></td><td style="width: 80px;"></td><td style="width: 80px;"></td><td style="width:80px;"></td><td style="width: 80px;"></td><td style="width: 80px;"></td><td style="width: 80px;"></td><td style="width: 80px;"></td><td style="width: 80px;"></td><td style="width: 80px;"></td><td style="width: 80px;"></td></tr>
<tr style="text-align:center; height: 24px"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr style="text-align:center; height: 24px"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr style="text-align:center; height: 24px"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr style="text-align:center; height: 24px"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr style="text-align:center; height: 24px"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr style="text-align:center; height: 24px"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr style="text-align:center;"><td colspan="21"><h1><span id="projectName"></span></h1></td></tr>
<tr style="text-align:center; height: 24px"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr style="text-align:center; font-size: 20px;"><td colspan="21" class="middlefont">施 工 图 设 计</td></tr>
<tr style="text-align:center; height: 24px"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr style="text-align:center; height: 24px"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr style="text-align:center; font-size: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td colspan="2" class="middlefont">第1卷</td><td></td><td colspan="2" class="middlefont">第2册</td><td></td><td colspan="3" class="middlefont">连封面共<span id="pageSize"></span>页</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr style="text-align:center; height: 24px"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr style="text-align:center; height: 24px"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr style="text-align:center;"><td colspan="21"><h1>杆塔明细表</h1></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr style="text-align:center; height: 24px"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr style="text-align:center; height: 24px"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr style="text-align:center; height: 24px"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr style="text-align:center; height: 24px"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr style="text-align:center; height: 24px"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr style="text-align:center; font-size: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td colspan="2" class="middlefont">批&nbsp;&nbsp;准:</td><td colspan="3" style="border-bottom: 1px solid black"></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr style="text-align:center; font-size: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td colspan="2" class="middlefont">审&nbsp;&nbsp;核:</td><td colspan="3" style="border-bottom: 1px solid black"></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr style="text-align:center; font-size: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td colspan="2" class="middlefont">校&nbsp;&nbsp;核:</td><td colspan="3" style="border-bottom: 1px solid black"></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr style="text-align:center; font-size: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td colspan="2" class="middlefont">设&nbsp;&nbsp;计:</td><td colspan="3" style="border-bottom: 1px solid black"></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr style="text-align:center; font-size: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td colspan="2" class="middlefont">CAD 制图:</td><td colspan="3" style="border-bottom: 1px solid black"></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr style="text-align:center; height: 24px"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr style="text-align:center; height: 24px"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr style="text-align:center; height: 24px"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr style="text-align:center; height: 24px"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr style="text-align:center; height: 24px"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr style="text-align:center; height: 24px"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr style="text-align:center;"><td colspan="21"><h2>安 徽 华 电 工 程 咨 询 设 计 有 限 公 司</h2></td></tr>
<tr style="text-align:center; height: 24px"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr style="text-align:center; height: 24px"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr style="text-align:center; font-size: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td colspan="3" class="middlefont"><span id="currentMonth"></span></td><td></td><td class="middlefont">     合    肥          </td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr style="text-align:center; height: 24px"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr style="text-align:center; height: 24px"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr style="text-align:center; height: 24px"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td style="border: 1px solid black">线路结构</td><td colspan="2" style="border: 1px solid black"></td><td style="border: 1px solid black"><span id="currentDate"></span></td></tr>
<tr style="text-align:center; height: 24px"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td style="border: 1px solid black">专业</td><td colspan="2" style="border: 1px solid black">会签</td><td>日期</td></tr>

</table>

<!-- <table id="explainTable" style="display: none">
<tr style="text-align:center; height: 18px"><td style="width: 30px;"></td><td style="width: 100px;"></td><td style="width: 55px;"></td><td style="width: 30px;"></td><td style="width: 55px;"></td><td style="width: 30px;"></td><td style="width: 55px;"></td><td style="width: 30px;"></td><td style="width: 55px;"></td><td style="width:30px;"></td><td style="width: 55px;">
</td><td style="width: 30px;"></td><td style="width: 55px;"></td><td style="width: 30px;"></td><td style="width: 55px;"></td><td style="width: 30px;"></td><td style="width: 55px;"></td><td style="width: 30px;"></td><td style="width: 55px;"></td><td style="width: 30px;"></td><td style="width: 55px;"></td><td style="width: 30px;"></td><td style="width: 55px;"></td>
<td style="width: 30px;"></td><td style="width: 55px;"></td><td style="width:30px;"></td><td style="width: 55px;"></td><td style="width: 30px;"></td><td style="width: 55px;"></td><td style="width: 30px;"></td><td style="width: 55px;"></td><td style="width: 30px;"></td><td style="width: 55px;"></td><td style="width: 30px;"></td><td style="width: 55px;"></td><td style="width: 30px;"></td><td style="width: 55px;"></td></tr>
<tr style="text-align:center;"><td></td><td colspan="35"><h1>杆塔明细表说明</h1></td><td></td></tr>
<tr style="background-color: #ffff00;height: 18px"><td colspan="36"></td><td></td></tr>
<tr style="background-color: #ffff00;height: 18px"><td style="text-align:center;">1.</td><td style="text-align:left;" colspan="35">本工程自500kV昭关变电站220kV构架起，至220kV香泉变电站构架止，全线双回路角钢塔架设，全线共分为A、B两段。本卷册为A段，自香泉变220kV构架起，至新建#51塔止，路径长度为18.368km。</td><td></td></tr>
<tr style="background-color: #ffff00;height: 18px"><td style="text-align:center;">2.</td><td style="text-align:left;" colspan="35">本工程A段线路的测量及杆塔编号均由220kV香泉变电站构架开始，以面向500kV昭关变电站方向为前进方向。</td><td></td></tr>
<tr id="situationTr" style="background-color: #ffff00;height: 18px"><td style="text-align:center;">3.</td><td style="text-align:left;" colspan="35">本工程A段线路新建铁塔51基，其中双回路耐张角钢塔12基，双回路直线角钢塔39基，杆塔具体使用情况详见下表：</td><td></td></tr>
<tr style="background-color: #ffff00;height: 18px"><td style="text-align:center;">4.</td><td style="text-align:left;" colspan="35">本工程防雷采用两根地线保护，一根采用GJ-80，一根采用36芯OPGW光缆，详见全线地线布置示意图。</td><td></td></tr>
<tr style="background-color: #ffff00;height: 18px"><td style="text-align:center;">5.</td><td style="text-align:left;" colspan="35">全线拆除房屋应按拆房分幅图为准。</td><td></td></tr>
<tr style="background-color: #ffff00;height: 18px"><td style="text-align:center;">6.</td><td style="text-align:left;" colspan="35">本明细表中接地型式应对照接地装置施工图进行施工，对重要的交叉跨越物及其它交叉跨越物距离较紧的，施工弧垂不应有正误差。</td><td></td></tr>
<tr style="background-color: #ffff00;height: 18px"><td style="text-align:center;">7.</td><td style="text-align:left;" colspan="35">沿线树木应按《110kV～750kV架空输电线路设计规范》(GB50545-2010)和其他有关规定砍伐出通道，对于通道以外，但仍属导线风偏危险区的树木，应根据安全运行的实际需要予以砍伐，为保护森林资源，砍伐时应根据实际情况灵活掌握，对既不妨碍架线施工，今后也不会影响线路安全运行的树木，可以不砍或少砍。</td><td></td></tr>
<tr style="background-color: #ffff00;height: 18px"><td style="text-align:center;">8.</td><td style="text-align:left;" colspan="35">施工前应对档距、高程、转角及被交叉跨越物，尤其是新建的被交叉跨越物进行复测，若发现有与本施工图不符之处时，请及时与设计人员进行联系，以便及时处理。</td><td></td></tr>
<tr id="endTr" style="background-color: #ffff00;height: 18px"><td style="text-align:center;">9.</td><td style="text-align:left;" colspan="35">施工时应将本表与线路平断面定位图及组配件施工图、架线施工图有关图纸对照使用,若有不符请及时与设计人员联系处理。</td><td></td></tr>
<tr style="text-align:center; height: 18px"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
<td></td><td></td><td></td><td></td><td></td><td></td><td colspan="3" rowspan="2" style="border: 1px solid black">说明页</td><td colspan="6" style="border: 1px solid black">图     号</td><td colspan="2" style="border: 1px solid black">图纸级别</td></tr>
<tr style="text-align:center; height: 18px"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
<td></td><td></td><td></td><td></td><td></td><td></td><td colspan="6" style="border: 1px solid black"><span id="pageCode"></span></td><td colspan="2" style="border: 1px solid black">3</td></tr>
</table> -->
</body>
<script type="text/javascript" src="<%=basePath%>assets/js/zcell/jquery.min.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/zcell/ZCell.register.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/zcell/ZCell.min.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/common/default.js"></script> 
<script type="text/javascript" src="<%=basePath%>assets/js/layer/layer.js"></script>
<script type="text/javascript" src="<%=basePath%>pages/tower/towerDetail.js"></script>
<script type="text/javascript">
    var path="<%=basePath%>"; 
    var id = '${requestScope.id}'; 
    var projectCode = '${requestScope.projectCode}'; 
    var attr = '${requestScope.attList}'; 
    var angle = '${requestScope.tower.angle_change_list}'; 
    var connect = '${requestScope.tower.connect_change_list}'; 

</script>

        
</html>