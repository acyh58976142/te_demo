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
<title>组配件明细详情</title>
<link rel="stylesheet" href="<%=basePath%>assets/css/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="<%=basePath%>assets/js/zcell/ZCell.css">
<style type="text/css">

#cellContainer{
	border: 0px!important; 
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
.Alabel{
	display: none ;
	font-family: inherit;
    font-size: inherit;
    line-height: inherit;
}
</style>
</head>
</head>
<body>
<div class="col-md-12 col-xs-12 topDiv" >
				<div class="pull-left">
					<h4>组配件明细</h4>
				</div>
				<div class="pull-right">
					<button class="btn btn-success" id="btn_apply_save" onclick="saveParts()"><i class="fa fa-check-square-o"></i>&nbsp;&nbsp;提&nbsp;交</button>			
					<button class="btn btn-danger" id="calc_Btn" onclick="diskCalc()">计算盘长</button>
					<button class="btn btn-primary" id="export_btn" onclick="JSONToExcelConvertor()"><i class="fa fa-save"></i>&nbsp;&nbsp;导&nbsp;出</button>
					<button class="btn btn-warning" id="btn_apply_back" onclick="backUpPage()"><i class="fa fa-mail-reply"></i>&nbsp;&nbsp;返&nbsp;回</button>
				</div>
			</div> 
<div class="col-md-12 col-xs-12 middleDiv">
	<div id="cellContainer" style="border:1px solid #DDECFE;">
	</div>
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
<tr style="text-align:center; font-size: 20px;"><td></td><td></td><td></td><td></td><td></td><td></td><td colspan="2" class="middlefont">第2卷</td><td></td><td colspan="2" class="middlefont">第/册</td><td></td><td colspan="3" class="middlefont">连封面共<span id="pageSize"></span>页</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr style="text-align:center; height: 24px"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr style="text-align:center; height: 24px"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr style="text-align:center;"><td colspan="21"><h1>组配件明细表</h1></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
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
</body>
<script type="text/javascript" src="<%=basePath%>assets/js/zcell/jquery.min.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/zcell/ZCell.register.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/zcell/ZCell.min.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/zcell/ZCell-util.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/common/default.js"></script> 
<script type="text/javascript" src="<%=basePath%>assets/js/layer/layer.js"></script>
<script type="text/javascript" src="<%=basePath%>pages/parts/partsDetail.js"></script>
<script type="text/javascript">
    var path="<%=basePath%>"; 
    var id = '${requestScope.id}'; 
    var modulus = '${requestScope.modulus}'; 
    var margin = '${requestScope.margin}';
    if(Tools.isEmpty(modulus)){
    	modulus =1.015;
    	margin =40;
    }
    var projectCode = '${requestScope.projectCode}'; 
    var diskList = new Array();
    //diskList.push(JSON.parse('${requestScope.paramMap.s}'));
    if('${requestScope.paramMap}'!='{}'){
    	diskList.push(JSON.parse('${requestScope.paramMap.t}'));
    	diskList.push(JSON.parse('${requestScope.paramMap.x}'));
    }
  /* diskList.push(JSON.parse('${requestScope.paramMap.u}'));
    diskList.push(JSON.parse('${requestScope.paramMap.v}'));
    diskList.push(JSON.parse('${requestScope.paramMap.w}')); */
   /*  diskList.push(JSON.parse('${requestScope.paramMap.y}'));
    diskList.push(JSON.parse('${requestScope.paramMap.z}')); */

</script>

        
</html>