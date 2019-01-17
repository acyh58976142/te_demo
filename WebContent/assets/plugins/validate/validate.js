var reg_float = /^(\d+)(\.?\d{0,2})?$/;
var reg_double = /^(\d+)(\.?\d{0,3})?$/;
var reg_double_2_3 = /^(\d{0,2})(\.\d{0,3})?$/;
var reg_double_4_3 = /^(\d{0,4})(\.\d{0,3})?$/;
var reg_double_6_3 = /^(\d{0,6})(\.\d{0,3})?$/;
var reg_int = /^[1-9]*[1-9][0-9]*$/;
var reg_minus = /^(-|\d?)\d+$/;
var reg_identity = /^(\d{14}|\d{17})(\d|[xX])$/;
var reg_phone = /^(13|15|14|18)\d{9}$/;
var reg_negative = /^(-?\d+)(\.?\d{0,2})?$/;
var reg_email = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
var reg_special = /^.*[\'|\"|\/|<|>|~|!|@|#|$|%|^|&|*|(|)|_|+|`|￥].*$/;
var reg_selectItem = /^\s+|\s+$/;
var reg_telephone = /^((13|15|14|18)\d{9})$|^(\d{3,4}-\d{7,8})$/;
var reg_passEmpty=/^\s+|\s+$/;
var reg_zeroint = /^[0]|[1-9]\d*$/;
var reg_loginName = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/;
var reg_noEmpty = /\s/;
var reg_postCode = /^\d{6}$/;
var reg_sqlspecial = /^.*[%|_].*$/;
var reg_yidongHaoDuan = /^134|135|136|137|138|139|147|150|151|152|157|158|159|182|183|184|187|188\d{8}$/;
var reg_ip = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
$(document).ready(function(){
	initValidate();
});
function initValidate(){
	//初始化悬浮气泡
	$(".notempty").each(function(){
		var tag = this.tagName;
		power($(this),tag == "INPUT" ? "必填项,请输入内容" : "必选项,请选择相应的选项");
	});
	$(".notemptyTextarea").each(function(){
		var tag = this.tagName;
		power($(this),tag == "TEXTAREA" ? "必填项,请输入内容" : "必填项,请输入内容");
	});
	power($(".integer"),"请输入一个大于零的正整数");
	power($(".identity"),"请输入一个正确格式的身份证号码,可以是18位或15位的身份证号码,可以以x或X结尾");
	power($(".phone"),"请输入一个正确格式的手机号码,例如: 13012345678");
	power($(".negative"),"请输入一个至多两位小数的数字,可以有符号,例如:12.5,12.55,-12.55,-12");
	power($(".float"),"请输入一个至多两位小数的数字,不能有符号,例如:12.5,12.55,12");
	power($(".double"),"请输入一个至多三位小数的数字,不能有符号,例如:12,12.5,12.55,12.555");
	power($(".double_2_3"),"请输入一个至多两位整数且至多三位小数的数字,不能有符号");
	power($(".double_4_3"),"请输入一个至多四位整数且至多三位小数的数字,不能有符号");
	power($(".double_6_3"),"请输入一个至多六位整数且至多三位小数的数字,不能有符号");
	power($(".email"),"请输入一个正确格式的电子邮箱,例如:jack@163.com");
	power($(".minus"),"请输入一个数字,可以是零或负数");
	power($(".repeat"),"请再次输入密码");
	power($(".special"),"不能含有特殊字符");
	power($(".telephone"),"请输入一个正确格式的电话号码,例如: 025-85554444,13012345678");
	power($(".passEmpty"),"必填项,请输入内容");
	power($(".selectItem"),"必填项,请选择相应的信息");
	power($(".zeroInteger"),"请输入一个大于或等于零的整数");
	power($(".loginName"),'账号只允许包含字母、中文、数字和"_"。');
	power($(".yidongHaoDuan"),'请输入移动号段');
	power($(".ip"),'请输入ip');
}
function power(selector,msg){
	selector.attr("msg","<font style='font-size:12px;' color='#5B5B5B'>" + msg + "</font>").powerFloat({eventType:"focus",edgeAdjust:false, targetMode:"remind", targetAttr:'msg', position:"2-1"});
	return selector;
}

function notempty(s){
	if(s.is("select")){
		var val = s.find("option:selected").val();
		return val == "";
	} else {
		return s.val().replace(/^\s+|\s+$/,'').replace(/^\s+|\s+$/,'').length == "";
	}
}








function checkLength(s)
{
    return s.val().replace(/^\s+|\s+$/,'').replace(/^\s+|\s+$/,'').length > Number(s.attr("length"));
}
function checkFormat(formId, preAction){
	var selector = null;
	if(null != formId && formId.length > 0){
		selector = $("#" + formId).find(".INPUTTEXT,.notempty,.identity,.phone,.negative,.float,.double,.double_2_3,.double_4_3,.double_6_3,.email,.integer,.minus,.notemptyTextarea,.repeat,.special,.passEmpty,.selectItem,.zeroInteger,.loginName,.noEmpty,.telephone,.postCode,.sqlspecial,.queryspecial,.yidongHaoDuan,.ip");
	} else {
		selector = $(".INPUTTEXT,.notempty,.identity,.phone,.negative,.float,.double,.double_2_3,.double_4_3,.double_6_3,.email,.integer,.minus,.notemptyTextarea,.repeat,.special,.passEmpty,.selectItem,.zeroInteger,.loginName,.noEmpty,.telephone,.postCode,.sqlspecial,.queryspecial,.yidongHaoDuan,.ip");
	}
	var rslt = true;
	selector.each(function(){
		if(checkFiled($(this), preAction)){
			rslt = false
			return rslt;
		}
	});
	return rslt;
}
function checkFiled(s, preAction){
    s.val(s.val().replace(/^\s+|\s+$/,'').replace(/^\s+|\s+$/,''));
	var a = $("#repeatPwd").val();
	var b = $("#pwd").val();
	var val = s.val();
	var rslt = s.hasClass("notempty") && notempty(s);
	notemptyRslt = s.hasClass("notemptyTextarea") && notempty(s);
	integerRslt = s.hasClass("integer") && val.length > 0 && !reg_int.test(val);
	phoneRslt = s.hasClass("phone") && val.length > 0 && !reg_phone.test(val);
	telephoneRslt = s.hasClass("telephone") && val.length > 0 && !reg_telephone.test(val);
	negativeRslt = s.hasClass("negative") && val.length > 0 && !reg_negative.test(val);
	floatRslt = s.hasClass("float") && val.length > 0 && !reg_float.test(val);
	doubleRslt = s.hasClass("double") && val.length > 0 && !reg_double.test(val);
	double_2_3Rslt = s.hasClass("double_2_3") && val.length > 0 && !reg_double_2_3.test(val);
	double_4_3Rslt = s.hasClass("double_4_3") && val.length > 0 && !reg_double_4_3.test(val);
	double_6_3Rslt = s.hasClass("double_6_3") && val.length > 0 && !reg_double_6_3.test(val);
	emailRslt = s.hasClass("email") && val.length > 0 && !reg_email.test(val);
	minusRslt = s.hasClass("minus") && val.length > 0 && !reg_minus.test(val);
	identityRslt = s.hasClass("identity") && val.length > 0 && !reg_identity.test(val);
	repeatRslt = s.hasClass("repeat") && val.length > 0 && (a!=b);
	specialRslt = s.hasClass("special") && val.length > 0 && reg_special.test(val);
	lengthRslt = s.hasClass("length") && checkLength(s);
	zerointRslt = s.hasClass("zeroInteger") && val.length > 0 && !reg_zeroint.test(val);
	passEmptyRslt = s.hasClass("INPUTTEXT") && val.length > 0 && reg_passEmpty.test(val);
	loginNameRslt = s.hasClass("loginName") && val.length > 0 && !reg_loginName.test(val);
	noEmptyReslt = s.hasClass("noEmpty") && val.length > 0 && reg_noEmpty.test(val);
	postCodeReslt = s.hasClass("postCode") && val.length > 0 && !reg_postCode.test(val);
	sqlspecialReslt = s.hasClass("sqlspecial") && val.length > 0 && reg_sqlspecial.test(val);
	queryspecialRslt = s.hasClass("queryspecial") && val.length > 0 && reg_special.test(val);
	yidongHaoDuan = s.hasClass("yidongHaoDuan") && val.length > 0 && !reg_yidongHaoDuan.test(val);
	ipRslt = s.hasClass("ip") && val.length > 0 && !reg_ip.test(val);
	if (rslt)
	{
	    var tag = s[0].tagName;
		power(s,tag == "INPUT" ? "必填项,请输入内容" : "必选项,请选择相应的选项");
	}
	else if (notemptyRslt)
	{
	    var tag = s[0].tagName;
		power(s,tag == "INPUT" ? "必填项,请输入内容" : "必填项,请输入内容");
	}
	else if (passEmptyRslt)
	{
	    power(s,'两端不能有空格！');
	}
	else if (integerRslt)
	{
	    power(s,"请输入一个大于零的正整数");
	}
	else if (phoneRslt)
	{
	    power(s,"请输入一个正确格式的电话号码,例如:13012345678");
	}
	else if (telephoneRslt)
	{
	    power(s,"请输入一个正确格式的电话号码,例如: 025-85554444,13012345678");
	}
	else if (negativeRslt)
	{
	    power(s,"请输入一个至多两位小数的数字,可以有符号,例如:12.5,12.55,-12.55,-12");
	}
	else if (floatRslt)
	{
	    power(s,"请输入一个至多两位小数的数字,不能有符号,例如:12.5,12.55,12");
	}
	else if (doubleRslt)
	{
	    power(s,"请输入一个至多三位小数的数字,不能有符号,例如:12,12.5,12.55,12.555");
	}
	else if (double_2_3Rslt)
	{
	    power(s,"请输入一个至多两位整数且至多三位小数的数字,不能有符号");
	}
	else if (double_4_3Rslt)
	{
	    power(s,"请输入一个至多四位整数且至多三位小数的数字,不能有符号");
	}
	else if (double_6_3Rslt)
	{
	    power(s,"请输入一个至多六位整数且至多三位小数的数字,不能有符号");
	}
	else if (emailRslt)
	{
	    power(s,"请输入一个正确格式的电子邮箱,例如:jack@163.com");
	}
	else if (minusRslt)
	{
	    power(s,"请输入一个数字,可以是零或负数");
	}
	else if (identityRslt)
	{
	    power(s,"请输入一个正确格式的身份证号码,可以是18位或15位的身份证号码,可以以x或X结尾");
	}
	else if (repeatRslt)
	{
	    power(s,"请再次输入密码");
	}
	else if (specialRslt)
	{
	    power(s,"不能含有特殊字符");
	}
	else if (lengthRslt)
	{
	    power(s, "最多输入"+s.attr("length")+"个字符");
	}
	else if (zerointRslt)
	{
	    power(s,"请输入一个大于或等于零的整数");
	}
	else if (loginNameRslt)
	{
	    power(s,'登录名只允许包含字母、中文、数字和"_"。');
	}
	else if (noEmptyReslt)
	{
	    power(s,"不允许输入空格");
	}
	else if (postCodeReslt)
	{
	    power(s,"请输入6位数字");
	}
	else if (sqlspecialReslt)
	{
	    power(s,"不允许输入%和_");
	}
	else if (yidongHaoDuan){
		power(s,"您输入的号码不是移动号段!");
	}
	else if (ipRslt){
		power(s,"请输入正确的ip!");
	}
	rslt = rslt+notemptyRslt+integerRslt+phoneRslt+negativeRslt+floatRslt+doubleRslt+double_2_3Rslt+double_4_3Rslt+double_6_3Rslt+emailRslt+minusRslt+identityRslt+repeatRslt+specialRslt+lengthRslt+passEmptyRslt+zerointRslt+loginNameRslt+noEmptyReslt+telephoneRslt+postCodeReslt+sqlspecialReslt+yidongHaoDuan+ipRslt;
	if(rslt > 0){
			if (preAction && typeof preAction == "function")
			{
				preAction();
			}
			var msg = s.attr("msg").replace("#5B5B5B","#FF0000");
			s.attr("msg",msg);
			s.bind("change",function(){
				var msg = s.attr("msg").replace("#FF0000","#5B5B5B");
				s.attr("msg",msg);
			}).focus();
	}
	return rslt > 0;
}

function showErrorMessage(s, message, flag)
{
	if (flag)
	{
		power(s,message);
		var msg = s.attr("msg").replace("#5B5B5B","#FF0000");
		s.attr("msg",msg);
		s.bind("change",function(){
			s.removeAttr("msg");
		}).focus();
	}
	return flag;
}