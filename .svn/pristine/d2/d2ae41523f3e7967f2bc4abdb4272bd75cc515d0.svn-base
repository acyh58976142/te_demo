//dataTables修改datatable默认设置
$.fn.dataTables_userDef = function(options)
{
	var defaults={
			"destroy" : true,// 摧毁现有结构。重新创建新的datatable
			"serverSide" : true,
			"autoWidth" : false, // 自适应宽度
			"stateSave" : false, // 保存状态到cookie ******很重要 ，
			// 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性设置为true就可避免了
			"paging" : true, // 是否使用分页
			"searching" : false,
			"lengthChange" : false, // 是否启用设置每页显示记录数
			"pageLength" : 10,// 默认每页显示的记录数
			"scrollCollapse" : false, // 指定适当的时候缩起滚动视图
			"ordering" : true, // 是否使用排序
//			"bJQueryUI": false, //页面风格使用jQuery.
//			"sPaginationType": "full_numbers", //分页样式
			"language": {
							"sLengthMenu": "&nbsp;&nbsp;&nbsp;&nbsp;每页显示 _MENU_ 条",
							"sZeroRecords": "抱歉， 没有找到",
			            	"sEmptyTable": "抱歉， 没有找到",
			            	"sInfo": "显示 _START_ 到 _END_ 条　共 _TOTAL_ 条",
			            	"sInfoEmpty": "没有记录",
			            	"sInfoFiltered": "(从 _MAX_ 条数据中检索)",
			            	"sProcessing":"正在加载中...",
			            	"sSearch": "搜索：",
			            	"oPaginate": {
			            		"sFirst": "首页",
			            		"sPrevious": "上一页",
			            		"sNext": "下一页",
			            		"sLast": "末页"
			            	}
						}};
	options = $.extend(true,{}, defaults, options);
	return this.dataTable(options);
};
