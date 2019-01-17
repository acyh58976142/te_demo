<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<aside class="main-sidebar">
	<section class="sidebar">
		<div class="user-panel">
			<div class="pull-left image">
				<img src="<%=request.getContextPath()%>/resource/images/adminLte/user.png" class="img-circle" alt="User Image">
			</div>
			<div class="pull-left info">
				<p></p>
				<a href="#"><i class="fa fa-circle text-success"></i>${user.name}</a>
			</div>
		</div>
	</section>

	<script type="text/javascript" src="<%=request.getContextPath()%>/assets/plugins/jQuery/jquery-2.2.3.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/assets/js/bootstrap/bootstrap.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/assets/js/laydate-5.0/laydate.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/assets/plugins/layer/layer.min.js"></script>
	
	<script type="text/javascript" src="<%=request.getContextPath()%>/assets/js/common/default.js"></script>
	<script type="text/javascript">
		$(function() {
			$(function() {
				$(".info").click(function(){
					//iframe层-父子操作
					layer.open({
						title:["修改密码","font-size:18px;"],
						type : 2,
						area : [ '400px', '285px' ],
						fixed : false, //不固定
						maxmin : false,
						content : 'pages/updatePwd/updatePwd.jsp'
					});
				})
				
			})
		})
	</script>
</aside>
