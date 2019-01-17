<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>输电线路快速勘测设计一体化软件 </title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  
  <link rel="icon" type="image/x-icon" href="<%=request.getContextPath()%>/resource/images/index/icon_logo.ico" />    
  <link rel="shortcut icon" type="image/x-icon" href="<%=request.getContextPath()%>/resource/images/index/icon_logo.ico" />    
  <link rel="bookmark" type="image/x-icon" href="<%=request.getContextPath()%>/resource/images/index/icon_logo.ico" />
  
  <!-- Bootstrap 3.3.7 -->
  <link rel="stylesheet" href="<%=basePath %>assets/css/bootstrap/css/bootstrap.min.css">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="<%=basePath %>assets/css/font-awesome/css/font-awesome.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="<%=basePath %>assets/css/ionicons/css/ionicons.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="<%=basePath %>assets/css/adminLte/AdminLTE.min.css">

  <link rel="stylesheet" href="<%=basePath %>assets/css/adminLte/skins/_all-skins.min.css">
  <!-- iCheck -->
  <link rel="stylesheet" href="<%=basePath %>assets/plugins/iCheck/flat/blue.css">
  <!-- jvectormap -->
  <link rel="stylesheet" href="<%=basePath %>assets/plugins/jvectormap/jquery-jvectormap-1.2.2.css">
  <!-- Date Picker -->
  <link rel="stylesheet" href="<%=basePath %>assets/plugins/datepicker/datepicker3.css">
  <!-- Daterange picker -->
  <link rel="stylesheet" href="<%=basePath %>assets/plugins/daterangepicker/daterangepicker.css">
  <!-- bootstrap wysihtml5 - text editor -->
  <link rel="stylesheet" href="<%=basePath %>assets/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css">
  
  <link rel="stylesheet" href="<%=basePath %>assets/plugins/smartMenu/smartMenu.css" type="text/css" />

  <link rel="stylesheet" href="<%=basePath %>assets/css/index/style.css">
  <link rel="stylesheet" href="<%=basePath %>assets/css/index/index.css">
<style type="text/css">
	#message{
		bottom:-10px !important;
		background: rgb(227, 244, 251) !important;
	}
</style>
</head>
<body class="hold-transition skin-blue sidebar-mini fixed" style="overflow:hidden;">
<div class="wrapper" style="overflow:hidden;">
<input type="hidden" id="topMenuExists" value="false">
<input type="hidden" id="leftMenuExists" value="false">s
<%@ include file="pages/menu/top.jsp" %>
<%@ include file="pages/menu/leftMenu.jsp" %>
<!--   Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <section class="content-header">
      <div class="row content-tabs">
        <button class="roll-nav roll-left J_tabLeft"><i class="fa fa-backward"></i>
        </button>
        <nav class="page-tabs J_menuTabs">
          <div class="page-tabs-content" id="tab_list">
          </div>
        </nav>
        <button class="roll-nav roll-right J_tabRight"><i class="fa fa-forward"></i>
        </button>
        <div class="btn-group roll-nav roll-right">
          <button class="dropdown J_tabClose" data-toggle="dropdown" aria-expanded="false">关闭操作<span class="caret"></span>
          </button>
          <ul role="menu" class="dropdown-menu dropdown-menu-right">
            <li class="J_tabCloseAll"><a>关闭全部选项卡</a>
            </li>
            <li class="J_tabCloseOther"><a>关闭其他选项卡</a>
            </li>
          </ul>
        </div>
      </div> 
    </section>
    
    <!-- Main content -->
    <section class="content">
      <div class="row J_mainContent" id="content-main">
        <iframe class="J_iframe" name="iframe0" width="100%" height="100%" src="" frameborder="0" data-id="" seamless="" style="display: inline;"></iframe>
      </div>
    </section>
    <!-- /.content -->
  </div>
  <%@ include file="pages/menu/rightbar.jsp" %>
</div>
<!-- ./wrapper -->
  
<!-- jQuery 2.2.3 -->
<script src="assets/plugins/jQuery/jquery-1.11.3.min.js"></script>
<script src="assets/plugins/jQueryUI/jquery-ui.min.js"></script>
<script>
  $.widget.bridge('uibutton', $.ui.button);
  var basePath="<%=basePath %>";
</script>
<!-- Bootstrap 3.3.6 -->
<script src="<%=basePath %>assets/js/bootstrap/bootstrap.min.js"></script>
<!-- Sparkline -->
<script src="<%=basePath %>assets/plugins/sparkline/jquery.sparkline.min.js"></script>
<!-- jvectormap -->
<script src="<%=basePath %>assets/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js"></script>
<script src="<%=basePath %>assets/plugins/jvectormap/jquery-jvectormap-world-mill-en.js"></script>
<!-- jQuery Knob Chart -->
<script src="<%=basePath %>assets/plugins/knob/jquery.knob.js"></script>
<!-- daterangepicker -->
<script src="<%=basePath %>assets/plugins/daterangepicker/moment.min.js"></script>
<script src="<%=basePath %>assets/plugins/daterangepicker/daterangepicker.js"></script>
<!-- datepicker -->
<script src="<%=basePath %>assets/plugins/datepicker/bootstrap-datepicker.js"></script>
<!-- Bootstrap WYSIHTML5 -->
<script src="<%=basePath %>assets/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js"></script>
<!-- Slimscroll -->
<script src="<%=basePath %>assets/plugins/slimScroll/jquery.slimscroll.min.js"></script>
<!-- FastClick -->
<script src="<%=basePath %>assets/plugins/fastclick/fastclick.js"></script>
<!-- AdminLTE App -->
<script src="<%=basePath %>assets/js/adminLte/app.js"></script>

<script src="<%=basePath %>assets/js/adminLte/demo.js"></script>

<script type="text/javascript" src="<%=basePath%>assets/js/layer/layer.js"></script>
<script type="text/javascript" src="<%=basePath %>assets/plugins/smartMenu/jquery-smartMenu.js"  charset="utf-8"></script>
<script type="text/javascript" src="<%=basePath %>assets/js/common/util.js"></script>
<script type="text/javascript" src="<%=basePath %>assets/js/common/default.js"></script>
<script type="text/javascript" src="<%=basePath %>assets/js/index/index.js"></script>
<script type="text/javascript" src="<%=basePath %>assets/js/window/jquery.messager.js"></script>
<script type="text/javascript" src="<%=basePath %>assets/plugins/layer/layer.min.js"></script> 
<!-- 弹窗 
<script type="text/javascript" src="<%=basePath %>assets/js/window/jquery-1.2.6.pack.js"></script>-->

<script>
$(function () {
    $("#content-main").css("height",$(document).height()-90 +"px");
    $('li.dropdown').mouseover(function() {
		$(this).addClass('open');
	}).mouseout(function() {
		$(this).removeClass('open');
	});   
});
</script>
</body>
</html>
