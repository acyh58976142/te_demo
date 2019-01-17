/**
 * 
 */
function ajaxError(data){
  if (data && data.responseText){
    alert(data.responseText);
    if (data && data.status == '444'){
	  window.top.location.href = basePath+'login.jsp';
	}
  }else{
	alert('请求失败');
  }
}