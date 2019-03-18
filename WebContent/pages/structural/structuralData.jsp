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
<title>结构数据</title>
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/bootstrap/css/bootstarp.style.css">
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/bootstrap/css/bootstrap.min.css">
<link
	href="<%=request.getContextPath()%>/assets/plugins/datatables/dataTables.bootstrap.css"
	rel="stylesheet">
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/font-awesome/css/font-awesome.min.css">
<!-- 公共css -->
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/common/default.css">
<link rel="stylesheet" href="<%=basePath%>assets/js/zcell/ZCell.css">
<link rel="stylesheet" href="<%=basePath%>pages/structural/structural.css">

</head>
<body>
	<div class="container-fluid">
		<div class="row">
			<ul class="nav nav-tabs nav_top">
				<li class="active" id=""><a href="#cell1" data-toggle="tab">结构基础数据</a>
				</li>
				<li id=""><a href="#cell2" data-toggle="tab">说明</a></li>
				<li class="" id=""><a href="#cell3" data-toggle="tab">封面</a>
				<li class="" id=""><a href="#cell4" data-toggle="tab">目录</a></li>
			</ul>
		</div>

		<div class="row topDiv row-margin0">
			<div class="tab-content" id="tab-content">
				<div class="tab-pane fade in active" id="cell1">
					<div class="row  topDiv row-margin0">
					   <div class="col-md-4 col-xs-4">
					      <div class="input-group">
						     <label class="input-group-addon">选择工程</label> 
						      <select class="form-control" id="projectName"></select>
					         </div>
				          </div>
						<div class="col-md-4 col-xs-4">
						   <button class="btn btn-info" id="searchBtn" style="margin-top: 0px;">
						      <span class="glyphicon glyphicon-search"></span>&nbsp;查询
					        </button>
							<button class="btn btn-primary" id="export_btn" onclick="JSONToExcelConvertor()" style="margin-top: 0px;">
								<i class="fa fa-save"></i>&nbsp;&nbsp;导&nbsp;出
							</button>
						</div>
					</div>
					<div id="cellContainer1" style="overflow: hidden;">
					</div>
				</div>
				
				<div class="tab-pane fade " id="cell2">
					<div id="cellContainer2" style="border: 1px solid;width:76%">
					     <div class="row row-margin0">
					     	<h3 class="p_align">安徽华电工程咨询设计有限公司修改(补充)设计图纸说明表</h3>
					     	<h3 class="p_align">(Q/AHDC Z301A-2019)</h3>
					     	 <div id="" style="border: 2px solid;margin:20px;">
					     	    <div class="p_align" style="margin:10px 0px 10px 0px;">
					     	         <input class="borderInput" style="width: 36%;" value="金家岭-寿州π入南关变220kv线路"/>工程
					     	         <input class="borderInput" value="施工图"/>设计阶段
					     		     <input class="borderInput" value="结构"/>部分
					     	   </div>
					     	    <div class="" style="margin:10px 0px 10px 20px;"> <!-- margin:10px 0px 10px 20px; -->
					     	                    第<input class="width16" value="2"/>卷 &nbsp;&nbsp;
					     	                    第<input class="width16 " value="1"/>册&nbsp;&nbsp; 
					     	                    第<input class="width16" value="/" />分册&nbsp;&nbsp;
					     	   </div>
					     	   <div style="text-align: right;margin:10px 20px 10px 0px;">
					     	    	卷册检索号<input class="borderInput" value="341-S1377S-T0201A"/>
					     	   </div>
					     	    <div style="border:0.5px solid;margin:10px 0px 10px 0px;"></div>
					     	   
					     	    <div style="margin:10px 0px 10px 20px;">
					     	      <p>1.修改(补充)图纸理由：</p>
					     	      
					     	      <div>
					     	       <textarea class="textFont" rows="5" cols="80">路径调整,塔型基础修改;补充结构部分设计安全相关说明</textarea>
					     	      </div>
					     	      
					     	      <p>2.修改(补充)新图共<input class="width16" value="4"/>张，(开列图号),请归入相应图纸卷册中去：</p>
					     	      <div>
					     	       <textarea class="textFont" rows="5" cols="80">目录、S1375S-T0201-01-03</textarea>
					     	      </div>
					     	      
					     	      <p>3.修改(补充)图纸理由：</p>
					     	      <div>
					     	       <textarea class="textFont" rows="5" cols="80">目录、S1375S-T0201-01-03</textarea>
					     	      </div>
					     	      <p>4.修改(补充)图纸理由：</p>
					     	      <div>
					     	       <textarea class="textFont" rows="5" cols="80">无</textarea>
					     	      </div>
					     	      <p>(以上由修改人填写)</p>
					     	      
					     	      <p>修改人:<input class="borderInput"/>组长:<input class="borderInput"/>部门负责人或主任工程师:<input class="borderInput"/></p>
					     	      
					     	   </div>
					     	  <div style="border:0.5px solid;margin:10px 0px 10px 0px;"></div>
					     	  
					     	  <div style="margin:10px 0px 10px 20px;">
					     	     <p>1.发送单位及份数：</p>
					     	     <p>本修改(补充)设计图纸,请按原图纸发送单位及份数进行发送。</p>
					     	  </div>
					     	  
					     	   <div style="text-align: right; margin:10px 20px 10px 0px;">
					     	     <p>经办人:<input class="borderInput"/></p>
					     	  </div>
					     	  
					     	</div>
					     </div>
					</div>
				</div>
				
				<!-- 封面  -->
				<div class="tab-pane fade " id="cell3">
					<div id="cellContainer3" style="border: 1px solid;">
						 <div class="row row-margin0">
							<div class="col-sm-1 col-md-1 col-lg-1 isdNumber" style="width:6%;">检索号</div>
							<div class="col-sm-2 col-md-2 col-lg-2 isdNumber">341-S1377S-T0201A</div>
						 </div>
						<div class="row row-margin0">
							 
							<h2 class="p_align"><input class="borderInput widthTitle" value="金家岭-寿州π入南关变220kv线路"/>工程</h2>							
							<h2 class="p_align">施工图设计(结构部分)</h2>
							<h1 class="p_align" style="font-weight:bold;">基&nbsp;&nbsp;础&nbsp;&nbsp;明&nbsp;&nbsp;细&nbsp;&nbsp;表</h1>
							<div class="p_align">
								<span  style="font-size:26px;">第&nbsp;&nbsp; 2 &nbsp;&nbsp;卷&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
								<span  style="font-size:26px;">&nbsp;&nbsp;第&nbsp;&nbsp; 1 &nbsp;&nbsp;册</span>
							</div>
							<p class="p_align">
								<span class="font22">批&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;准&nbsp;:</span>
								<input class="borderInput"/>
							</p>
							<p class="p_align">
								<span class="font22">审&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;核&nbsp;:</span>
								<input class="borderInput"/>
							</p>
							<p class="p_align">
								<span class="font22">校&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;核&nbsp;:</span>
								<input class="borderInput"/>
							</p>
							<p class="p_align">
								<span class="font22">设&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;计&nbsp;:</span>
								<input class="borderInput"/>
							</p>
							<p class="p_align">
								<span class="font22">CAD制图&nbsp;:</span>
								<input class="borderInput"/>
							</p>
							<p class="p_align font26">安徽华电工程设计咨询有限公司</p>
							<p class="p_align font26">2018年11月 合肥</p>
						</div>
						
						<div class="row row-margin0 tableDiv">
						  <div class="col-sm-3 col-md-3 col-lg-3 pull-right">
							   <table  class="tablecss">
							   		<tr>
							   			<td>专业</td>
							   			<td>会签</td>
							   		</tr>
							   		<tr>
							   			<td>送电电气</td>
							   			<td><input class="tableInput"/></td>
							   		</tr>
							   		<tr>
							   			<td>岩土</td>
							   			<td><input class="tableInput"/></td>
							   		</tr>
							   </table>
						   </div>	
						</div>
						
					</div>
				</div>
				
				<div class="tab-pane fade " id="cell4">
					<div id="cellContainer4" style="overflow: hidden;"></div>
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
	src="<%=basePath%>assets/js/laydate-5.0/laydate.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/js/layer/layer.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/plugins/datatables/jquery.dataTables.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/plugins/datatables/dataTables.bootstrap.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/js/bootstrap/bootstrap-select.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/js/zcell/ZCell.register.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/js/zcell/ZCell.min.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/js/zcell/ZCell-util.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/js/common/default.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/plugins/validate/jquery.metadata.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/plugins/validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/plugins/validate/jquery.validate.message.cn.js"></script>
<!-- 自定义js -->
<script type="text/javascript"
	src="<%=basePath%>pages/structural/structuralData.js"></script>
<script type="text/javascript">
	var path = "<%=basePath%>";
</script>
</html>