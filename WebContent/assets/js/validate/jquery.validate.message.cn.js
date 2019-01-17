$.extend(jQuery.validator.messages, {
	required: "必填字段",
	remote: "请修正该字段",
	email: "请输入正确格式的电子邮件",
	url: "请输入合法的链接地址",
	date: "请输入合法的日期",
	dateISO: "请输入合法的ISO格式日期",
	number: "请输入合法的数字",
	digits: "只能输入整数",
	creditcard: "",
	equalTo: "请再次输入相同值",
	accept: "请输入拥有合法后缀名的字符串",
	maxlength: jQuery.validator.format("请输入最大长度为 {0} 的字符串"),
	minlength: jQuery.validator.format("请输入最小长度为 {0} 的字符串"),
	rangelength: jQuery.validator.format("请输入长度介于 {0} 和 {1} 的字符串"),
	rang: jQuery.validator.format("请输入大小介于 {0} 和 {1} 的值"),
	max: jQuery.validator.format("请输入最大为 {0} 的值"),
	min: jQuery.validator.format("请输入最小为 {0} 的值")
});

//电话号码验证
$.validator.addMethod("isMobile",function(value, element) {
	var length = value.length;
	var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
	return this.optional(element)|| (length == 11 && mobile.test(value));
}, "请输入正确的电话号码");

//数字
$.validator.addMethod("isNumber",function(value,element){
	 var figure =	/^([1-9]+)$/;
	 return this.optional(element) || (figure.test(value));
},"只能输入数字")

//验证只能输入正整数数字
$.validator.addMethod("isIntNumber",function(value,element){
	 var figure = /^\d+$/;
	 return this.optional(element) || (figure.test(value));
},"只能输入整数")

//验证正整数和负整数
$.validator.addMethod("numBer",function(value,element){
	 var zzs = /^\d+$/;
	 var fzs = /^((-\d+)|(0+))$/;
	 return this.optional(element) || (zzs.test(value)) || (fzs.test(value));
},"只能输入整数")

//电话验证——验证手机和电话座机
$.validator.addMethod("inputNumber",function(value, element){
     var	RegExp = /^((\d{7,8})|(1[35847]\d{9}))$/;
     return this.optional(element) || (RegExp.test(value));
},"请输入正确的联系方式");


//经纬度
$.validator.addMethod("Latitude",function(value,element){
	var figure =/^[0-9]+(.[0-9]{1,})?$/;
	
	 return this.optional(element) || (figure.test(value));
},"输入正确经纬度")
 //经度
$.validator.addMethod("IsJRange",function(value,element){
 
	if(0<parseFloat(value)&&parseFloat(value)<180){
		return true;
	}
	 return false;
},"请输入范围在0~180的经度数")
//纬度
$.validator.addMethod("IsWRange",function(value,element){
	if(0<parseFloat(value)&&parseFloat(value)<90){
		return true;
	}
	 return false;
},"请输入范围在0~90的纬度数")

//不能输入特殊字符
$.validator.addMethod("isName",function(value,element){
	var figure =/[@!！￥#\$%\^&\*]+/g;
	return this.optional(element) || (!figure.test(value));
},"不能输入特殊字符")


//正负数，小数两位，
$.validator.addMethod("isDoubles",function(value,element){
	var doubleOne =/^[0-9]+(.[0-9]{1,2})?$/;
	var doubleTwo =/^((-\d+)|(0+))+(.[0-9]{1,2})?$/;
	return this.optional(element) || (doubleOne.test(value)) || (doubleTwo.test(value));
},"请输入正确的温度")

//判断-50到50
$.validator.addMethod("isDoubleMinMax",function(value,element){
	if(-50<parseFloat(value)&&parseFloat(value)<50){
		return true;
	}
	 return false;
},"请输入范围在-50~50范围内的数")


//正小数两位，
$.validator.addMethod("isDouble",function(value,element){
	var doubles =/^[0-9]+(.[0-9]{1,2})?$/;
	return this.optional(element) || (doubles.test(value));
},"请输入正确数字")

