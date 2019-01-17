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
<!-- 自定义css -->
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/pages/tower/towerLoad.css">
<title>杆塔荷载</title>
</head>
<body>
	<div class="container-fluid">
		<div class="row row_margin10">
			<ul class="nav nav-tabs nav_top">
				<li class="active" id=""><a href="#search1" data-toggle="tab">杆塔尺寸及使用条件</a>
				</li>
				<li id=""><a href="#search2" data-toggle="tab">导地线型号及参数</a></li>
				<li class="content" id=""><a href="#search3" data-toggle="tab">金具串重量及绝缘子片数</a>
				</li>
				<li class="content" id=""><a href="#search4" data-toggle="tab">气象条件</a>
				</li>
			</ul>
		</div>
		<div class="row row_margin10">
			<div class="tab-content" id="tab-content">
				<!--1 杆塔尺寸及使用条件  开始 -->
				<div class="tab-pane fade in active" id="search1">
					<div class="row">
						<div class="col-md-12">
							<table class="table table-bordered">
								<thead>
									<tr>
										<th colspan="5">杆塔尺寸</th>
									</tr>
								</thead>
								<tbody>
									<!--条件1 -->
									<tr>
										<td>回路数</td>
										<td colspan="4"><input type="text" class="input_control"
											value="1"></td>
									</tr>
									<!--条件2 -->
									<tr>
										<td rowspan="2">铁塔计算高度</td>
										<td>基准呼高(米)</td>
										<td>中下相层高(米)</td>
										<td>上中相层高(米)</td>
										<td>地线支架高(米)</td>
									</tr>
									<tr>
										<td><input type="text" class="input_control B46"
											value="39"></td>
										<td><input type="text" class="input_control C46"
											value="0"></td>
										<td><input type="text" class="input_control D46"
											value="3.5"></td>
										<td><input type="text" class="input_control E46"
											value="3.2"></td>
									</tr>
									<!--条件3 -->
									<tr>
										<td rowspan="2">悬垂绝缘子串长</td>
										<td colspan="2">导线(米)</td>
										<td colspan="2">地线(米)</td>
									</tr>
									<tr>
										<td colspan="2"><input type="text"
											class="input_control B48" value="0"></td>
										<td colspan="2"><input type="text"
											class="input_control C48" value="0"></td>
									</tr>
									<!--条件4 -->
									<tr>
										<td>塔型</td>
										<td colspan="2"><select class="input_control B50">
												<option value="1">平丘</option>
												<option value="2">山地</option>
										</select></td>
										<td colspan="2"><select class="input_control C50">
												<option value="1">悬垂</option>
												<option value="2">耐张</option>
										</select></td>
									</tr>
								</tbody>
							</table>
							<table class="table table-bordered">
								<thead>
									<tr>
										<th colspan="5">杆塔使用条件</th>
									</tr>
								</thead>
								<tbody>
									<!--条件5 -->
									<tr>
										<td rowspan="2">最大垂直档距 Lv(max)</td>
										<td><input type="text" class="input_control B52"
											value="680"></td>
										<td rowspan="2" colspan="2">最小垂直档距 Lv(min)</td>
										<td><input type="text" class="input_control E52"
											value="-425"></td>
									</tr>
									<tr>
										<td><input type="text" class="input_control B53"
											value="170"></td>
										<td><input type="text" class="input_control E53"
											value="-650"></td>
									</tr>
									<tr>
										<td>相应档距 Lh</td>
										<td><input type="text" class="input_control B54"
											value="550"></td>
										<td colspan="2">相应档距 Lh</td>
										<td><input type="text" class="input_control E54"
											value="550"></td>
									</tr>
									<tr>
										<td>代表档距 Lp</td>
										<td><input type="text" class="input_control B56"
											value="200"></td>
										<td colspan="2">~</td>
										<td><input type="text" class="input_control E56"
											value="200"></td>
									</tr>
									<tr>
										<td>跳线水平档距 Lht</td>
										<td><input type="text" class="input_control B57"
											value="8"></td>
										<td colspan="2">跳线垂直档距 Lvt</td>
										<td><input type="text" class="input_control E57"
											value="8"></td>
									</tr>
									<tr>
										<td>转角度数</td>
										<td colspan="4"><input type="text"
											class="input_control B58" value="0"></td>
									</tr>
									<!--条件6 -->
									<tr>
										<td rowspan="2">挂点高差系数</td>
										<td>前侧导线(米)</td>
										<td>后侧导线(米)</td>
										<td>前侧地线(米)</td>
										<td>后侧地线(米)</td>
									</tr>
									<tr>
										<td><input type="text" class="input_control B61"
											value="0"></td>
										<td><input type="text" class="input_control C61"
											value="0"></td>
										<td><input type="text" class="input_control D61"
											value="0"></td>
										<td><input type="text" class="input_control E61"
											value="0"></td>
									</tr>
									<!--条件6 -->
									<tr>
										<td>代表档距 Lp</td>
										<td colspan="4"><select class="input_control">
												<option value="1">拉线塔</option>
												<option value="2">自立式铁塔</option>
										</select></td>
										<!-- <td colspan="2"><input type="text" class="input_control"
											value="1"></td> -->
									</tr>
									<tr>
										<td>杆塔类型</td>
										<td colspan="4"><input type="checkbox" name="C63" value="1">规划杆塔
											<input type="checkbox" name="C63" value="2">实际杆塔</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<!-- 杆塔尺寸及使用条件  结束 -->

				<!-- 2导地线型号及参数  开始 -->
				<div class="tab-pane fade in " id="search2">
					<div class="row">
						<div class="col-md-12">
							<table class="table table-bordered">
								<thead>
									<tr>
										<th colspan="7" class="text-left">导地线型号</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td></td>
										<td colspan="2">导地线型号</td>
										<td colspan="2">分裂根数</td>
										<td colspan="2">安全系数</td>
									</tr>
									<tr>
										<td>前侧导线</td>
										<td colspan="2" class="conductorType B69"></td>
										<td colspan="2"><input type="text"
											class="input_control D69" value="1"></td>
										<td colspan="2"><input type="text"
											class="input_control E69" value="2.5"></td>
									</tr>
									<tr>
										<td>后侧导线</td>
										<td colspan="2" class="conductorType B70"></td>
										<td colspan="2"><input type="text"
											class="input_control D70" value="1"></td>
										<td colspan="2"><input type="text"
											class="input_control E70" value="2.5"></td>
									</tr>
									<tr>
										<td>前侧地线</td>
										<td colspan="2" class="conductorType B71"></td>
										<td colspan="2"><input type="text"
											class="input_control D71" value="1"></td>
										<td colspan="2"><input type="text"
											class="input_control E71" value="3"></td>
									</tr>
									<tr>
										<td>后侧地线</td>
										<td colspan="2" class="conductorType B72"></td>
										<td colspan="2"><input type="text"
											class="input_control D72" value="1"></td>
										<td colspan="2"><input type="text"
											class="input_control E72" value="3"></td>
									</tr>
									<!--条件2 -->
									<tr>
										<td rowspan="2">跳串数</td>
										<td>上跳线串数</td>
										<td>中跳线串数</td>
										<td colspan="2">下跳线串数</td>
										<td colspan="2">跳线分裂数</td>
									</tr>
									<tr>
										<td><input type="text" class="input_control B76"
											value="1"></td>
										<td><input type="text" class="input_control C76"
											value="1"></td>
										<td colspan="2"><input type="text"
											class="input_control D76" value="1"></td>
										<td colspan="2"><input type="text"
											class="input_control E76" value="1"></td>
									</tr>
									<tr>
										<td rowspan="2">导地线弧垂</td>
										<td colspan="2">导线弧垂</td>
										<td colspan="2">地线弧垂</td>
										<td colspan="2" rowspan="2"></td>
									</tr>
									<tr>
										<td><input type="text" class="input_control B95"
											value="4.46"></td>
										<td><input type="text" class="input_control C95"
											value="4.46"></td>
										<td><input type="text" class="input_control D95"
											value="3.78"></td>
										<td><input type="text" class="input_control E95"
											value="3.78"></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>


				</div>
				<div class="tab-pane fade in " id="search3">
					<table class="table table-bordered">
						<thead>
							<tr>
								<th colspan="7">金具串</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>金具串</td>
								<td>导线串</td>
								<td>跳线串</td>
								<td>间隔棒</td>
								<td>导线防振锤</td>
								<td>地线串</td>
								<td>地线防振锤</td>
							</tr>
							<tr>
								<td>前侧重量(N)</td>
								<td><input type="text" class="input_control B100"
									value="1500"></td>
								<td><input type="text" class="input_control C100"
									value="700"></td>
								<td><input type="text" class="input_control D100" value="0"></td>
								<td><input type="text" class="input_control E100"
									value="150"></td>
								<td><input type="text" class="input_control F100"
									value="100"></td>
								<td><input type="text" class="input_control G100"
									value="90"></td>
							</tr>
							<tr>
								<td>后侧重量(N)</td>
								<td><input type="text" class="input_control B101"
									value="1500"></td>
								<td><input type="text" class="input_control C101"
									value="700"></td>
								<td><input type="text" class="input_control D101" value="0"></td>
								<td><input type="text" class="input_control E101"
									value="150"></td>
								<td><input type="text" class="input_control F101"
									value="100"></td>
								<td><input type="text" class="input_control G101"
									value="90"></td>
							</tr>
						</tbody>
					</table>

					<table class="table table-bordered">
						<thead>
							<tr>
								<th colspan="7">绝缘子(前侧)</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>绝缘子(前侧)</td>
								<td colspan="2">导线</td>
								<td colspan="2">跳线</td>
								<td colspan="2">地线</td>
							</tr>
							<tr>
								<td>绝缘子片数</td>
								<td colspan="2"><input type="text"
									class="input_control inspiece_td" value="10"></td>
								<td colspan="2"><input type="text"
									class="input_control inspiece_td" value="10"></td>
								<td colspan="2"><input type="text"
									class="input_control inspiece_td" value="1"></td>
							</tr>
							<tr>
								<td>联数</td>
								<td colspan="2"><input type="text"
									class="input_control inspiece_td" value="2"></td>
								<td colspan="2"><input type="text"
									class="input_control inspiece_td" value="2"></td>
								<td colspan="2"><input type="text"
									class="input_control inspiece_td" value="1"></td>
							</tr>
							<tr>
								<td>折算后片数</td>
								<td colspan="2"><input type="text"
									class="input_control B106" value="22" readonly="readonly"></td>
								<td colspan="2"><input type="text"
									class="input_control D106" value="11" readonly="readonly"></td>
								<td colspan="2"><input type="text"
									class="input_control F106" value="2" readonly="readonly"></td>
							</tr>
						</tbody>
					</table>

					<table class="table table-bordered">
						<thead>
							<tr>
								<th colspan="7">绝缘子(后侧)</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>绝缘子(后侧)</td>
								<td colspan="2">导线</td>
								<td colspan="2">跳线</td>
								<td colspan="2">地线</td>
							</tr>
							<tr>
								<td>绝缘子片数</td>
								<td colspan="2"><input type="text"
									class="input_control inspiece_td" value="10"></td>
								<td colspan="2"><input type="text"
									class="input_control inspiece_td" value="10"></td>
								<td colspan="2"><input type="text"
									class="input_control inspiece_td" value="1"></td>
							</tr>
							<tr>
								<td>联数</td>
								<td colspan="2"><input type="text"
									class="input_control inspiece_td" value="2"></td>
								<td colspan="2"><input type="text"
									class="input_control inspiece_td" value="1"></td>
								<td colspan="2"><input type="text"
									class="input_control inspiece_td" value="1"></td>
							</tr>
							<tr>
								<td>折算后片数</td>
								<td colspan="2"><input type="text"
									class="input_control B111" value="22" readonly="readonly"></td>
								<td colspan="2"><input type="text"
									class="input_control D111" value="11" readonly="readonly"></td>
								<td colspan="2"><input type="text"
									class="input_control F111" value="2" readonly="readonly"></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="tab-pane fade in " id="search4">
					<table class="table table-bordered">
						<thead>
							<tr>
								<th colspan="10">气象条件</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td rowspan="4">前侧气象条件</td>
								<td></td>
								<td>覆冰</td>
								<td>大风</td>
								<td>低温</td>
								<td>安装</td>
								<td>v=5</td>
								<td>覆冰验算</td>
								<td>断线</td>
								<td>高温</td>
							</tr>
							<tr>
								<td>T</td>
								<td><input type="text" class="input_control weather_T C116"
									value="-5"></td>
								<td><input type="text" class="input_control D116"
									value="-5"></td>
								<td><input type="text" class="input_control E116"
									value="-20"></td>
								<td><input type="text" class="input_control F116"
									value="-10"></td>
								<td><input type="text" class="input_control G116" value="5"></td>
								<td><input type="text" class="input_control H116"
									value="-5" readonly="readonly"></td>
								<td><input type="text" class="input_control I116"
									value="-5"></td>
								<td><input type="text" class="input_control J116"
									value="40"></td>
							</tr>
							<tr>
								<td>C</td>
								<td><input type="text" class="input_control weather_C C117"
									value="30"></td>
								<td><input type="text" class="input_control D117" value="0"></td>
								<td><input type="text" class="input_control E117" value="0"></td>
								<td><input type="text" class="input_control F117" value="0"></td>
								<td><input type="text" class="input_control G117" value="0"></td>
								<td><input type="text" class="input_control H117"
									value="35" readonly="readonly"></td>
								<td><input type="text" class="input_control I117"
									value="30"></td>
								<td><input type="text" class="input_control J117" value="0"></td>
							</tr>
							<tr>
								<td>V</td>
								<td><input type="text" class="input_control weather_v C118"
									value="15"></td>
								<td><input type="text" class="input_control weather_v D118"
									value="34"></td>
								<td><input type="text" class="input_control weather_v E118"
									value="0"></td>
								<td><input type="text" class="input_control weather_v F118"
									value="10"></td>
								<td><input type="text" class="input_control weather_v G118"
									value="15"></td>
								<td><input type="text" class="input_control weather_v H118"
									value="15" readonly="readonly"></td>
								<td><input type="text" class="input_control weather_v I118"
									value="0"></td>
								<td><input type="text" class="input_control weather_v J118"
									value="0"></td>
							</tr>
							<tr>
								<td>风压不均匀系数α：</td>
								<td></td>
								<td><input type="text" class="input_control C119" value="1"
									readonly="readonly"></td>
								<td><input type="text" class="input_control D119"
									value="0.75" readonly="readonly"></td>
								<td><input type="text" class="input_control " value="1"
									readonly="readonly"></td>
								<td><input type="text" class="input_control F119" value="1"
									readonly="readonly"></td>
								<td><input type="text" class="input_control G119" value="1"
									readonly="readonly"></td>
								<td><input type="text" class="input_control" value="1"
									readonly="readonly"></td>
								<td><input type="text" class="input_control" value="1"
									readonly="readonly"></td>
								<td><input type="text" class="input_control" value="1"
									readonly="readonly"></td>
							</tr>
							<tr>
								<td colspan="2">覆冰风荷载增大系数Bz/导地线风载调整系数βc：</td>
								<td><input type="text" class="input_control C120" value="1"
									readonly="readonly"></td>
								<td><input type="text" class="input_control D120" value="1"
									readonly="readonly"></td>
								<td><input type="text" class="input_control " value="1"
									readonly="readonly"></td>
								<td><input type="text" class="input_control" value="1"
									readonly="readonly"></td>
								<td><input type="text" class="input_control" value="1"
									readonly="readonly"></td>
								<td><input type="text" class="input_control" value="1"
									readonly="readonly"></td>
								<td><input type="text" class="input_control" value="1"
									readonly="readonly"></td>
								<td><input type="text" class="input_control" value="1"
									readonly="readonly"></td>
							</tr>
							<tr>
								<td colspan="2">地面粗糙度类别(1-陆地 2-海岛 3-城市)</td>
								<td><select class="input_control  C121">
										<option value="1">陆地</option>
										<option value="2">海岛</option>
										<option value="3" selected="selected">城市</option>
								</select></td>
								<td><span></span></td>
								<td><span></span></td>
								<td><span></span></td>
								<td><span></span></td>
								<td><span></span></td>
								<td><span></span></td>
								<td><span></span></td>
							</tr>
						</tbody>
					</table>
					<table class="table table-bordered">
						<thead>
							<tr>
								<th colspan="10">气象条件</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td rowspan="4">后侧气象条件</td>
								<td></td>
								<td>覆冰</td>
								<td>大风</td>
								<td>低温</td>
								<td>安装</td>
								<td>v=5</td>
								<td>覆冰验算</td>
								<td>断线</td>
								<td>高温</td>
							</tr>
							<tr>
								<td>T</td>
								<td><input type="text" class="input_control weather_T C124"
									value="-5"></td>
								<td><input type="text" class="input_control D124"
									value="-5"></td>
								<td><input type="text" class="input_control E124"
									value="-20"></td>
								<td><input type="text" class="input_control F124"
									value="-10"></td>
								<td><input type="text" class="input_control G124" value="5"></td>
								<td><input type="text" class="input_control H124"
									value="-5" readonly="readonly"></td>
								<td><input type="text" class="input_control I124"
									value="-5"></td>
								<td><input type="text" class="input_control J124"
									value="40"></td>
							</tr>
							<tr>
								<td>C</td>
								<td><input type="text" class="input_control weather_C C125"
									value="30"></td>
								<td><input type="text" class="input_control D125" value="0"></td>
								<td><input type="text" class="input_control E125" value="0"></td>
								<td><input type="text" class="input_control F125" value="0"></td>
								<td><input type="text" class="input_control G125" value="0"></td>
								<td><input type="text" class="input_control H125"
									value="35" readonly="readonly"></td>
								<td><input type="text" class="input_control I125"
									value="30"></td>
								<td><input type="text" class="input_control J125" value="0"></td>
							</tr>
							<tr>
								<td>V</td>
								<td><input type="text" class="input_control weather_v C126"
									value="15"></td>
								<td><input type="text" class="input_control weather_v D126"
									value="34"></td>
								<td><input type="text" class="input_control weather_v E126"
									value="0"></td>
								<td><input type="text" class="input_control weather_v F126"
									value="10"></td>
								<td><input type="text" class="input_control weather_v G126"
									value="15"></td>
								<td><input type="text" class="input_control weather_v H126"
									value="15" readonly="readonly"></td>
								<td><input type="text" class="input_control weather_v I126"
									value="0"></td>
								<td><input type="text" class="input_control weather_v J126"
									value="0"></td>
							</tr>
							<tr>
								<td>风压不均匀系数α：</td>
								<td></td>
								<td><input type="text" class="input_control" value="1"
									readonly="readonly"></td>
								<td><input type="text" class="input_control D127"
									value="0.75" readonly="readonly"></td>
								<td><input type="text" class="input_control" value="1"
									readonly="readonly"></td>
								<td><input type="text" class="input_control" value="1"
									readonly="readonly"></td>
								<td><input type="text" class="input_control" value="1"
									readonly="readonly"></td>
								<td><input type="text" class="input_control" value="1"
									readonly="readonly"></td>
								<td><input type="text" class="input_control" value="1"
									readonly="readonly"></td>
								<td><input type="text" class="input_control" value="1"
									readonly="readonly"></td>
							</tr>
							<tr>
								<td colspan="2">覆冰风荷载增大系数Bz/导地线风载调整系数βc：</td>
								<td><input type="text" class="input_control C128" value="1"
									readonly="readonly"></td>
								<td><input type="text" class="input_control D128" value="1"
									readonly="readonly"></td>
								<td><input type="text" class="input_control" value="1"
									readonly="readonly"></td>
								<td><input type="text" class="input_control" value="1"
									readonly="readonly"></td>
								<td><input type="text" class="input_control" value="1"
									readonly="readonly"></td>
								<td><input type="text" class="input_control" value="1"
									readonly="readonly"></td>
								<td><input type="text" class="input_control" value="1"
									readonly="readonly"></td>
								<td><input type="text" class="input_control" value="1"
									readonly="readonly"></td>
							</tr>
							<tr>
								<td colspan="2">地面粗糙度类别(1-陆地 2-海岛 3-城市)</td>
								<td><select class="input_control C129">
										<option value="1" selected="selected">陆地</option>
										<option value="2">海岛</option>
										<option value="3">城市</option>
								</select></td>
								<td><span></span></td>
								<td><span></span></td>
								<td><span></span></td>
								<td><span></span></td>
								<td><span></span></td>
								<td><span></span></td>
								<td><span></span></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>

		<div class="row row_margin10">
			<div class="col-md-12">
				<button class="btn btn-primary" onclick="getcount()">
					<i class="glyphicon glyphicon-search"></i>&nbsp;计算
				</button>
				<button class="btn btn-warning">
					<i class="glyphicon glyphicon-level-up"></i>&nbsp;导出excel
				</button>
			</div>
		</div>
		<div class="row row_margin10">
			<ul class="nav nav-tabs nav_top">
				<li class="active" id=""><a href="#result1" data-toggle="tab">水平荷载表(前侧)</a>
				</li>
				<li id=""><a href="#result2" data-toggle="tab">水平荷载表(后侧)</a></li>
				<li class="content" id=""><a href="#result3" data-toggle="tab">水平荷载表(综合)</a>
				</li>
				<li class="content" id=""><a href="#result4" data-toggle="tab">最大垂直荷载表</a>
				</li>
				<li class="content" id=""><a href="#result5" data-toggle="tab">最小垂直荷载表</a>
				</li>
				<li class="content" id=""><a href="#result6" data-toggle="tab">导地线张力表
						( N )</a></li>
				<li class="content" id=""><a href="#result7" data-toggle="tab">纵向不平衡张力表
						( N )</a></li>
			</ul>
		</div>

		<div class="row row_margin10">
			<div class="tab-content" id="tab-content">
				<div class="tab-pane fade in active" id="result1">
					<table class="table table-bordered">
						<thead>
							<tr>
								<th colspan="10" style="font-size: 20px">水平荷载表（前侧）</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td rowspan="4" style="padding-top: 60px; font-weight: bold;">气象条件</td>
								<td></td>
								<td style="font-weight: bold;">覆冰</td>
								<td style="font-weight: bold;">大风</td>
								<td style="font-weight: bold;">低温</td>
								<td style="font-weight: bold;">安装</td>
								<td style="font-weight: bold;">v=5</td>
								<td style="font-weight: bold;">断线</td>
								<td style="font-weight: bold;">高温</td>
							</tr>
							<tr>
								<td style="font-weight: bold;">T</td>
								<td><span class="C280"></span></td>
								<td><span class="D280"></span></td>
								<td><span class="E280"></span></td>
								<td><span class="F280"></span></td>
								<td><span class="G280"></span></td>
								<td><span class="H280"></span></td>
								<td><span class="I280"></span></td>
							</tr>
							<tr>
								<td style="font-weight: bold;">C</td>
								<td><span class="C281"></span></td>
								<td><span class="D281"></span></td>
								<td><span class="E281"></span></td>
								<td><span class="F281"></span></td>
								<td><span class="G281"></span></td>
								<td><span class="H281"></span></td>
								<td><span class="I281"></span></td>
							</tr>
							<tr>
								<td style="font-weight: bold;">V</td>
								<td><span class="C282"></span></td>
								<td><span class="D282"></span></td>
								<td><span class="E282"></span></td>
								<td><span class="F282"></span></td>
								<td><span class="G282"></span></td>
								<td><span class="H282"></span></td>
								<td><span class="I282"></span></td>
							</tr>
							<tr>
								<td rowspan="7" style="padding-top: 150px; font-weight: bold;">水平荷载</td>
								<td>上导线</td>
								<td><span class="C283"></span></td>
								<td><span class="D283"></span></td>
								<td><span class="E283"></span></td>
								<td><span class="F283"></span></td>
								<td><span class="G283"></span></td>
								<td><span class="H283"></span></td>
								<td><span class="I283"></span></td>
							</tr>
							<tr>
								<td>中导线</td>
								<td><span class="C284"></span></td>
								<td><span class="D284"></span></td>
								<td><span class="E284"></span></td>
								<td><span class="F284"></span></td>
								<td><span class="G284"></span></td>
								<td><span class="H284"></span></td>
								<td><span class="I284"></span></td>
							</tr>
							<tr>
								<td>下导线</td>
								<td><span class="C285"></span></td>
								<td><span class="D285"></span></td>
								<td><span class="E285"></span></td>
								<td><span class="F285"></span></td>
								<td><span class="G285"></span></td>
								<td><span class="H285"></span></td>
								<td><span class="I285"></span></td>
							</tr>
							<tr>
								<td>上跳线</td>
								<td><span class="C286"></span></td>
								<td><span class="D286"></span></td>
								<td><span class="E286"></span></td>
								<td><span class="F286"></span></td>
								<td><span class="G286"></span></td>
								<td><span class="H286"></span></td>
								<td><span class="I286"></span></td>
							</tr>
							<tr>
								<td>中跳线</td>
								<td><span class="C287"></span></td>
								<td><span class="D287"></span></td>
								<td><span class="E287"></span></td>
								<td><span class="F287"></span></td>
								<td><span class="G287"></span></td>
								<td><span class="H287"></span></td>
								<td><span class="I287"></span></td>
							</tr>
							<tr>
								<td>下跳线</td>
								<td><span class="C288"></span></td>
								<td><span class="D288"></span></td>
								<td><span class="E288"></span></td>
								<td><span class="F288"></span></td>
								<td><span class="G288"></span></td>
								<td><span class="H288"></span></td>
								<td><span class="I288"></span></td>
							</tr>
							<tr>
								<td>地线</td>
								<td><span class="C289"></span></td>
								<td><span class="D289"></span></td>
								<td><span class="E289"></span></td>
								<td><span class="F289"></span></td>
								<td><span class="G289"></span></td>
								<td><span class="H289"></span></td>
								<td><span class="I289"></span></td>
							</tr>
							<tr>
								<td></td>
								<td style="font-weight: bold;">地线（验算）</td>
								<td><span class="C290"></span></td>
								<td><span class="D290"></span></td>
								<td><span class="E290"></span></td>
								<td><span class="F290"></span></td>
								<td><span class="G290"></span></td>
								<td><span class="H290"></span></td>
								<td><span class="I290"></span></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="tab-pane fade in" id="result2">
					<table class="table table-bordered">
						<thead>
							<tr>
								<th colspan="10" style="font-size: 20px">水平荷载表（后侧）</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td rowspan="4" style="padding-top: 60px; font-weight: bold;">气象条件</td>
								<td></td>
								<td style="font-weight: bold;">覆冰</td>
								<td style="font-weight: bold;">大风</td>
								<td style="font-weight: bold;">低温</td>
								<td style="font-weight: bold;">安装</td>
								<td style="font-weight: bold;">v=5</td>
								<td style="font-weight: bold;">断线</td>
								<td style="font-weight: bold;">高温</td>
							</tr>
							<tr>
								<td style="font-weight: bold;">T</td>
								<td><span class="C294"></span></td>
								<td><span class="D294"></span></td>
								<td><span class="E294"></span></td>
								<td><span class="F294"></span></td>
								<td><span class="G294"></span></td>
								<td><span class="H294"></span></td>
								<td><span class="I294"></span></td>
							</tr>
							<tr>
								<td style="font-weight: bold;">C</td>
								<td><span class="C295"></span></td>
								<td><span class="D295"></span></td>
								<td><span class="E295"></span></td>
								<td><span class="F295"></span></td>
								<td><span class="G295"></span></td>
								<td><span class="H295"></span></td>
								<td><span class="I295"></span></td>
							</tr>
							<tr>
								<td style="font-weight: bold;">V</td>
								<td><span class="C296"></span></td>
								<td><span class="D296"></span></td>
								<td><span class="E296"></span></td>
								<td><span class="F296"></span></td>
								<td><span class="G296"></span></td>
								<td><span class="H296"></span></td>
								<td><span class="I296"></span></td>
							</tr>
							<tr>
								<td rowspan="7" style="padding-top: 150px; font-weight: bold;">水平荷载</td>
								<td>上导线</td>
								<td><span class="C297"></span></td>
								<td><span class="D297"></span></td>
								<td><span class="E297"></span></td>
								<td><span class="F297"></span></td>
								<td><span class="G297"></span></td>
								<td><span class="H297"></span></td>
								<td><span class="I297"></span></td>
							</tr>
							<tr>
								<td>中导线</td>
								<td><span class="C298"></span></td>
								<td><span class="D298"></span></td>
								<td><span class="E298"></span></td>
								<td><span class="F298"></span></td>
								<td><span class="G298"></span></td>
								<td><span class="H298"></span></td>
								<td><span class="I298"></span></td>
							</tr>
							<tr>
								<td>下导线</td>
								<td><span class="C299"></span></td>
								<td><span class="D299"></span></td>
								<td><span class="E299"></span></td>
								<td><span class="F299"></span></td>
								<td><span class="G299"></span></td>
								<td><span class="H299"></span></td>
								<td><span class="I299"></span></td>
							</tr>
							<tr>
								<td>上跳线</td>
								<td><span class="C300"></span></td>
								<td><span class="D300"></span></td>
								<td><span class="E300"></span></td>
								<td><span class="F300"></span></td>
								<td><span class="G300"></span></td>
								<td><span class="H300"></span></td>
								<td><span class="I300"></span></td>
							</tr>
							<tr>
								<td>中跳线</td>
								<td><span class="C301"></span></td>
								<td><span class="D301"></span></td>
								<td><span class="E301"></span></td>
								<td><span class="F301"></span></td>
								<td><span class="G301"></span></td>
								<td><span class="H301"></span></td>
								<td><span class="I301"></span></td>
							</tr>
							<tr>
								<td>下跳线</td>
								<td><span class="C302"></span></td>
								<td><span class="D302"></span></td>
								<td><span class="E302"></span></td>
								<td><span class="F302"></span></td>
								<td><span class="G302"></span></td>
								<td><span class="H302"></span></td>
								<td><span class="I302"></span></td>
							</tr>
							<tr>
								<td>地线</td>
								<td><span class="C303"></span></td>
								<td><span class="D303"></span></td>
								<td><span class="E303"></span></td>
								<td><span class="F303"></span></td>
								<td><span class="G303"></span></td>
								<td><span class="H303"></span></td>
								<td><span class="I303"></span></td>
							</tr>
							<tr>
								<td></td>
								<td>地线（验算）</td>
								<td><span class="C304"></span></td>
								<td><span class="D304"></span></td>
								<td><span class="E304"></span></td>
								<td><span class="F304"></span></td>
								<td><span class="G304"></span></td>
								<td><span class="H304"></span></td>
								<td><span class="I304"></span></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="tab-pane fade in" id="result3">
					<table class="table table-bordered">
						<thead>
							<tr>
								<th colspan="10" style="font-size: 20px">水平荷载表（综合）</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td rowspan="1" style="font-weight: bold;">气象条件</td>
								<td></td>
								<td style="font-weight: bold;">覆冰</td>
								<td style="font-weight: bold;">大风</td>
								<td style="font-weight: bold;">低温</td>
								<td style="font-weight: bold;">安装</td>
								<td style="font-weight: bold;">v=5</td>
								<td style="font-weight: bold;">断线</td>
								<td style="font-weight: bold;">高温</td>
							</tr>
							<tr>
								<td rowspan="7" style="font-weight: bold; padding-top: 150px">水平荷载</td>
								<td>上导线</td>
								<td><span class="C308"></span></td>
								<td><span class="D308"></span></td>
								<td><span class="E308"></span></td>
								<td><span class="F308"></span></td>
								<td><span class="G308"></span></td>
								<td><span class="H308"></span></td>
								<td><span class="I308"></span></td>
							</tr>
							<tr>
								<td>中导线</td>
								<td><span class="C309"></span></td>
								<td><span class="D309"></span></td>
								<td><span class="E309"></span></td>
								<td><span class="F309"></span></td>
								<td><span class="G309"></span></td>
								<td><span class="H309"></span></td>
								<td><span class="I309"></span></td>
							</tr>
							<tr>
								<td>下导线</td>
								<td><span class="C310"></span></td>
								<td><span class="D310"></span></td>
								<td><span class="E310"></span></td>
								<td><span class="F310"></span></td>
								<td><span class="G310"></span></td>
								<td><span class="H310"></span></td>
								<td><span class="I310"></span></td>
							</tr>
							<tr>
								<td>上跳线</td>
								<td><span class="C311"></span></td>
								<td><span class="D311"></span></td>
								<td><span class="E311"></span></td>
								<td><span class="F311"></span></td>
								<td><span class="G311"></span></td>
								<td><span class="H311"></span></td>
								<td><span class="I311"></span></td>
							</tr>
							<tr>
								<td>中跳线</td>
								<td><span class="C312"></span></td>
								<td><span class="D312"></span></td>
								<td><span class="E312"></span></td>
								<td><span class="F312"></span></td>
								<td><span class="G312"></span></td>
								<td><span class="H312"></span></td>
								<td><span class="I312"></span></td>
							</tr>
							<tr>
								<td>下跳线</td>
								<td><span class="C313"></span></td>
								<td><span class="D313"></span></td>
								<td><span class="E313"></span></td>
								<td><span class="F313"></span></td>
								<td><span class="G313"></span></td>
								<td><span class="H313"></span></td>
								<td><span class="I313"></span></td>
							</tr>
							<tr>
								<td>地线</td>
								<td><span class="C314"></span></td>
								<td><span class="D314"></span></td>
								<td><span class="E314"></span></td>
								<td><span class="F314"></span></td>
								<td><span class="G314"></span></td>
								<td><span class="H314"></span></td>
								<td><span class="I314"></span></td>
							</tr>
							<tr>
								<td></td>
								<td>地线（验算）</td>
								<td><span class="C315"></span></td>
								<td><span class="D315"></span></td>
								<td><span class="E315"></span></td>
								<td><span class="F315"></span></td>
								<td><span class="G315"></span></td>
								<td><span class="H315"></span></td>
								<td><span class="I315"></span></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="tab-pane fade in" id="result4">
					<table class="table table-bordered">
						<thead>
							<tr>
								<th colspan="10" style="font-size: 20px">最大垂直荷载表</th>
							</tr>
						<tbody>
							<tr>
								<td rowspan="13" style="padding-top: 260px; font-weight: bold;">最大垂直荷载</td>
								<td></td>
								<td style="font-weight: bold;">覆冰</td>
								<td style="font-weight: bold;">大风</td>
								<td style="font-weight: bold;">低温</td>
								<td style="font-weight: bold;">安装</td>
								<td style="font-weight: bold;">v=5m/s</td>
								<td style="font-weight: bold;">断线</td>
								<td style="font-weight: bold;">高温</td>
							</tr>
							<tr>
								<td>导线(前侧)</td>
								<td><span class="C319"></span></td>
								<td><span class="D319"></span></td>
								<td><span class="E319"></span></td>
								<td><span class="F319"></span></td>
								<td><span class="G319"></span></td>
								<td><span class="H319"></span></td>
								<td><span class="I319"></span></td>
							</tr>
							<tr>
								<td>导线(后侧)</td>
								<td><span class="C320"></span></td>
								<td><span class="D320"></span></td>
								<td><span class="E320"></span></td>
								<td><span class="F320"></span></td>
								<td><span class="G320"></span></td>
								<td><span class="H320"></span></td>
								<td><span class="I320"></span></td>
							</tr>
							<tr>
								<td>导线(综合)</td>
								<td><span class="C321"></span></td>
								<td><span class="D321"></span></td>
								<td><span class="E321"></span></td>
								<td><span class="F321"></span></td>
								<td><span class="G321"></span></td>
								<td><span class="H321"></span></td>
								<td><span class="I321"></span></td>
							</tr>
							<tr>
								<td>上跳线</td>
								<td><span class="C322"></span></td>
								<td><span class="D322"></span></td>
								<td><span class="E322"></span></td>
								<td><span class="F322"></span></td>
								<td><span class="G322"></span></td>
								<td><span class="H322"></span></td>
								<td><span class="I322"></span></td>
							</tr>
							<tr>
								<td>中跳线</td>
								<td><span class="C323"></span></td>
								<td><span class="D323"></span></td>
								<td><span class="E323"></span></td>
								<td><span class="F323"></span></td>
								<td><span class="G323"></span></td>
								<td><span class="H323"></span></td>
								<td><span class="I323"></span></td>
							</tr>
							<tr>
								<td>下跳线</td>
								<td><span class="C324"></span></td>
								<td><span class="D324"></span></td>
								<td><span class="E324"></span></td>
								<td><span class="F324"></span></td>
								<td><span class="G324"></span></td>
								<td><span class="H324"></span></td>
								<td><span class="I324"></span></td>
							</tr>
							<tr>
								<td>地线(前侧)</td>
								<td><span class="C325"></span></td>
								<td><span class="D325"></span></td>
								<td><span class="E325"></span></td>
								<td><span class="F325"></span></td>
								<td><span class="G325"></span></td>
								<td><span class="H325"></span></td>
								<td><span class="I325"></span></td>
							</tr>
							<tr>
								<td>地线(后侧)</td>
								<td><span class="C326"></span></td>
								<td><span class="D326"></span></td>
								<td><span class="E326"></span></td>
								<td><span class="F326"></span></td>
								<td><span class="G326"></span></td>
								<td><span class="H326"></span></td>
								<td><span class="I326"></span></td>
							</tr>
							<tr>
								<td>地线(综合)</td>
								<td><span class="C327"></span></td>
								<td><span class="D327"></span></td>
								<td><span class="E327"></span></td>
								<td><span class="F327"></span></td>
								<td><span class="G327"></span></td>
								<td><span class="H327"></span></td>
								<td><span class="I327"></span></td>
							</tr>
							<tr>
								<td>地线(前侧验算)</td>
								<td><span class="C328"></span></td>
								<td><span class="D328"></span></td>
								<td><span class="E328"></span></td>
								<td><span class="F328"></span></td>
								<td><span class="G328"></span></td>
								<td><span class="H328"></span></td>
								<td><span class="I328"></span></td>
							</tr>
							<tr>
								<td>地线(后侧验算)</td>
								<td><span class="C329"></span></td>
								<td><span class="D329"></span></td>
								<td><span class="E329"></span></td>
								<td><span class="F329"></span></td>
								<td><span class="G329"></span></td>
								<td><span class="H329"></span></td>
								<td><span class="I329"></span></td>
							</tr>
							<tr>
								<td>地线(综合验算)</td>
								<td><span class="C330"></span></td>
								<td><span class="D330"></span></td>
								<td><span class="E330"></span></td>
								<td><span class="F330"></span></td>
								<td><span class="G330"></span></td>
								<td><span class="H330"></span></td>
								<td><span class="I330"></span></td>
							</tr>
						</tbody>
						</thead>
					</table>
				</div>
				<div class="tab-pane fade in" id="result5">
					<table class="table table-bordered">
						<thead>
							<tr>
								<th colspan="10" style="font-size: 20px">最小垂直荷载表</th>
							</tr>
						<tbody>
							<tr>
								<td rowspan="13" style="padding-top: 260px; font-weight: bold;">最小垂直荷载</td>
								<td></td>
								<td style="font-weight: bold;">覆冰</td>
								<td style="font-weight: bold;">大风</td>
								<td style="font-weight: bold;">低温</td>
								<td style="font-weight: bold;">安装</td>
								<td style="font-weight: bold;">v=5m/s</td>
								<td style="font-weight: bold;">断线</td>
								<td style="font-weight: bold;">高温</td>
							</tr>
							<tr>
								<td>导线(前侧)</td>
								<td><span class="C334"></span></td>
								<td><span class="D334"></span></td>
								<td><span class="E334"></span></td>
								<td><span class="F334"></span></td>
								<td><span class="G334"></span></td>
								<td><span class="H334"></span></td>
								<td><span class="I334"></span></td>
							</tr>
							<tr>
								<td>导线(后侧)</td>
								<td><span class="C335"></span></td>
								<td><span class="D335"></span></td>
								<td><span class="E335"></span></td>
								<td><span class="F335"></span></td>
								<td><span class="G335"></span></td>
								<td><span class="H335"></span></td>
								<td><span class="I335"></span></td>
							</tr>
							<tr>
								<td>导线(综合)</td>
								<td><span class="C336"></span></td>
								<td><span class="D336"></span></td>
								<td><span class="E336"></span></td>
								<td><span class="F336"></span></td>
								<td><span class="G336"></span></td>
								<td><span class="H336"></span></td>
								<td><span class="I336"></span></td>
							</tr>
							<tr>
								<td>上跳线</td>
								<td><span class="C337"></span></td>
								<td><span class="D337"></span></td>
								<td><span class="E337"></span></td>
								<td><span class="F337"></span></td>
								<td><span class="G337"></span></td>
								<td><span class="H337"></span></td>
								<td><span class="I337"></span></td>
							</tr>
							<tr>
								<td>中跳线</td>
								<td><span class="C338"></span></td>
								<td><span class="D338"></span></td>
								<td><span class="E338"></span></td>
								<td><span class="F338"></span></td>
								<td><span class="G338"></span></td>
								<td><span class="H338"></span></td>
								<td><span class="I338"></span></td>
							</tr>
							<tr>
								<td>下跳线</td>
								<td><span class="C339"></span></td>
								<td><span class="D339"></span></td>
								<td><span class="E339"></span></td>
								<td><span class="F339"></span></td>
								<td><span class="G339"></span></td>
								<td><span class="H339"></span></td>
								<td><span class="I339"></span></td>
							</tr>
							<tr>
								<td>地线(前侧)</td>
								<td><span class="C340"></span></td>
								<td><span class="D340"></span></td>
								<td><span class="E340"></span></td>
								<td><span class="F340"></span></td>
								<td><span class="G340"></span></td>
								<td><span class="H340"></span></td>
								<td><span class="I340"></span></td>
							</tr>
							<tr>
								<td>地线(后侧)</td>
								<td><span class="C341"></span></td>
								<td><span class="D341"></span></td>
								<td><span class="E341"></span></td>
								<td><span class="F341"></span></td>
								<td><span class="G341"></span></td>
								<td><span class="H341"></span></td>
								<td><span class="I341"></span></td>
							</tr>
							<tr>
								<td>地线(综合)</td>
								<td><span class="C342"></span></td>
								<td><span class="D342"></span></td>
								<td><span class="E342"></span></td>
								<td><span class="F342"></span></td>
								<td><span class="G342"></span></td>
								<td><span class="H342"></span></td>
								<td><span class="I342"></span></td>
							</tr>
							<tr>
								<td>地线(前侧验算)</td>
								<td><span class="C343"></span></td>
								<td><span class="D343"></span></td>
								<td><span class="E343"></span></td>
								<td><span class="F343"></span></td>
								<td><span class="G343"></span></td>
								<td><span class="H343"></span></td>
								<td><span class="I343"></span></td>
							</tr>
							<tr>
								<td>地线(后侧验算)</td>
								<td><span class="C344"></span></td>
								<td><span class="D344"></span></td>
								<td><span class="E344"></span></td>
								<td><span class="F344"></span></td>
								<td><span class="G344"></span></td>
								<td><span class="H344"></span></td>
								<td><span class="I344"></span></td>
							</tr>
							<tr>
								<td>地线(综合验算)</td>
								<td><span class="C345"></span></td>
								<td><span class="D345"></span></td>
								<td><span class="E345"></span></td>
								<td><span class="F345"></span></td>
								<td><span class="G345"></span></td>
								<td><span class="H345"></span></td>
								<td><span class="I345"></span></td>
							</tr>
						</tbody>
						</thead>
					</table>
				</div>
				<div class="tab-pane fade in" id="result6">
					<table class="table table-bordered">
						<thead>
							<tr>
								<th colspan="10" style="font-size: 20px">导地线张力表 ( N )</th>
							</tr>
						<tbody>
							<tr>
								<td rowspan="1">工况条件</td>
								<td></td>
								<td style="font-weight: bold;">覆冰</td>
								<td style="font-weight: bold;">大风</td>
								<td style="font-weight: bold;">低温</td>
								<td style="font-weight: bold;">安装</td>
								<td style="font-weight: bold;">v=5m/s</td>
								<td style="font-weight: bold;">覆冰验算</td>
								<td style="font-weight: bold;">高温</td>
								<td style="font-weight: bold;">安装(初伸长)</td>
							</tr>
							<tr>
								<td rowspan="2">导线（每根）</td>
								<td><span class="B349"></span></td>
								<td><span class="C349"></span></td>
								<td><span class="D349"></span></td>
								<td><span class="E349"></span></td>
								<td><span class="F349"></span></td>
								<td><span class="G349"></span></td>
								<td><span class="H349"></span></td>
								<td><span class="I349"></span></td>
								<td><span class="J349"></span></td>
							</tr>
							<tr>
								<td><span class="B350"></span></td>
								<td><span class="C350"></span></td>
								<td><span class="D350"></span></td>
								<td><span class="E350"></span></td>
								<td><span class="F350"></span></td>
								<td><span class="G350"></span></td>
								<td><span class="H350"></span></td>
								<td><span class="I350"></span></td>
								<td><span class="J350"></span></td>
							</tr>
							<tr>
								<td rowspan="2">导线（每相）</td>
								<td><span class="B351"></span></td>
								<td><span class="C351"></span></td>
								<td><span class="D351"></span></td>
								<td><span class="E351"></span></td>
								<td><span class="F351"></span></td>
								<td><span class="G351"></span></td>
								<td><span class="H351"></span></td>
								<td><span class="I351"></span></td>
								<td><span class="J351"></span></td>
							</tr>
							<tr>
								<td><span class="B352"></span></td>
								<td><span class="C352"></span></td>
								<td><span class="D352"></span></td>
								<td><span class="E352"></span></td>
								<td><span class="F352"></span></td>
								<td><span class="G352"></span></td>
								<td><span class="H352"></span></td>
								<td><span class="I352"></span></td>
								<td><span class="J352"></span></td>
							</tr>
							<tr>
								<td rowspan="2">地线（每根）</td>
								<td><span class="B353"></span></td>
								<td><span class="C353"></span></td>
								<td><span class="D353"></span></td>
								<td><span class="E353"></span></td>
								<td><span class="F353"></span></td>
								<td><span class="G353"></span></td>
								<td><span class="H353"></span></td>
								<td><span class="I353"></span></td>
								<td><span class="J353"></span></td>
							</tr>
							<tr>
								<td><span class="B354"></span></td>
								<td><span class="C354"></span></td>
								<td><span class="D354"></span></td>
								<td><span class="E354"></span></td>
								<td><span class="F354"></span></td>
								<td><span class="G354"></span></td>
								<td><span class="H354"></span></td>
								<td><span class="I354"></span></td>
								<td><span class="J354"></span></td>
							</tr>
						</tbody>
						</thead>
					</table>
				</div>
				<div class="tab-pane fade in" id="result7">
					<table class="table table-bordered">
						<thead>
							<tr>
								<th rowspan="2" colspan="9" style="font-size: 20px">纵向不平衡张力表
									( N )</th>
							</tr>
						<tbody>
							<tr>
								<td rowspan="4" colspan="2" style="font-weight: bold;">断线情况（1）</td>
								<td style="font-weight: bold;">一相导线(前侧)</td>
								<td><span class="D358"></span></td>
								<td rowspan="4" colspan="2" style="font-weight: bold;">-5℃、有冰无风</td>
								<td><span class="G358"></span></td>
								<td><span class="H358"></span></td>
								<td><span class="I358"></span></td>
							</tr>
							<tr>
								<td style="font-weight: bold;">一相导线(后侧)</td>
								<td><span class="D359"></span></td>
								<td><span class="G359"></span></td>
								<td><span class="H359"></span></td>
								<td><span class="I359"></span></td>
							</tr>
							<tr>
								<td style="font-weight: bold;">一根地线(前侧)</td>
								<td><span class="D360"></span></td>
								<td><span class="G360"></span></td>
								<td><span class="H360"></span></td>
								<td><span></span></td>
							</tr>
							<tr>
								<td style="font-weight: bold;">一根地线(后侧)</td>
								<td><span class="D361"></span></td>
								<td><span class="G361"></span></td>
								<td><span class="H361"></span></td>
								<td><span></span></td>
							</tr>
							<tr>
								<td rowspan="4" colspan="2" style="font-weight: bold;">不均匀覆冰(1)</td>
								<td style="font-weight: bold;">一相导线(前侧)</td>
								<td><span class="D362"></span></td>
								<td rowspan="4" colspan="2" style="font-weight: bold;">-5℃、不均匀冰、10m/s风</td>
								<td><span class="G362"></span></td>
								<td><span class="H362"></span></td>
								<td><span></span></td>
							</tr>
							<tr>
								<td style="font-weight: bold;">一相导线(后侧)</td>
								<td><span class="D363"></span></td>
								<td><span class="G363"></span></td>
								<td><span class="H363"></span></td>
								<td><span></span></td>
							</tr>
							<tr>
								<td style="font-weight: bold;">一根地线(前侧)</td>
								<td><span class="D364"></span></td>
								<td><span class="G364"></span></td>
								<td><span class="H364"></span></td>
								<td><span></span></td>
							</tr>
							<tr>
								<td style="font-weight: bold;">一根地线(后侧)</td>
								<td><span class="D365"></span></td>
								<td><span class="G365"></span></td>
								<td><span class="H365"></span></td>
								<td><span></span></td>
							</tr>
							<tr>
								<td rowspan="2" colspan="3" style="font-weight: bold;">导线最大使用张力
									( N/每相 )</td>
								<td rowspan="2" colspan="2"><span class="D366"></span></td>
								<td rowspan="2" colspan="2"><span class="F366"></span></td>
								<td><span></span></td>
								<td><span></span></td>
							</tr>
							<tr>
								<td><span></span></td>
								<td><span></span></td>
							</tr>
							<tr>
								<td rowspan="2" colspan="3" style="font-weight: bold;">地线最大使用张力
									( N/每相 )</td>
								<td rowspan="2" colspan="2"><span class="D368"></span></td>
								<td rowspan="2" colspan="2"><span class="F368"></span></td>
								<td><span></span></td>
								<td><span></span></td>
							</tr>
							<tr>
								
								<td><span></span></td>
								<td><span></span></td>
							</tr>
						</tbody>
						</thead>
					</table>
				</div>
			</div>
		</div>

		<script type="text/javascript"
			src="<%=basePath%>assets/plugins/jQuery/jquery-1.11.3.min.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>assets/js/bootstrap/bootstrap.min.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>assets/js/layer/layer.js"></script>
		<script
			src="<%=basePath%>assets/plugins/datatables/jquery.dataTables.js"></script>
		<script
			src="<%=basePath%>assets/plugins/datatables/dataTables.bootstrap.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>assets/js/common/default.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>pages/tower/towerLoad.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>pages/tower/publicVariable.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>pages/tower/towerGuideWireParameter.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>pages/tower/calculHorizontalTension.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>pages/tower/eachStateVertical.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>pages/tower/horizontalLoadCalcu.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>pages/tower/towerLoadCount.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>pages/tower/towerLoadCountResult.js"></script>
		<script type="text/javascript">
			  var path="<%=basePath%>";
			var towerLoad = new TowerLoad();
		</script>
</body>
</html>