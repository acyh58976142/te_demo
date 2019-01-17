function Login() {
	var username = $.cookie('username');
	var password = $.cookie('password');
	if (username && password) {
		$('#login_username').val(username);
		$('#login_password').val(password);
	}
	$('#submit').on("click",this.loginSubmit);
	
}

Login.prototype.loginSubmit = function() {
	var username = $('#login_username').val();
	var password = $("#login_password").val();
	if(null == username || username.length <= 0) {
		Tools.tipsMsg("请输入用户名");
		return false;
	}
	if(null == password || password.length <= 0) {
		Tools.tipsMsg("请输入密码");
		return false;
	}
	
	$.ajax({
		type : 'post',
		url : path + 'login/login.action',
		data : {
			'username' : username,
			'password' : password
		},
		success : function(data) {
			if (data.code == '200') {
				location.href = path + 'index.jsp';
			} else {
				Tools.msg(data.msg);
			}
		},
		error : function() {
			Tools.tipsMsg("登陆失败");
		}
	});
}
