/**
 * 荷载导出excel
 */
function exportToExcel(){
	/**
	 * 导出excel包含多个sheet
	 * @param {Object} tables  tableId的数组;
	 * @param {Object} wsnames sheet的名字数组;
	 * @param {Object} wbname  wbname:工作簿名字;
	 * @param {Object} appname Excel
	 */
	var tables=["A_WindLoad_table","B_WindLoad_table","A_GravityLoad_table","B_GravityLoad_table","A_TensionLoad_table","B_TensionLoad_table","A_NBalanceTensionLoad_table","B_NBalanceTensionLoad_table"];
	var wsnames=["A侧线风力荷载(N)","B侧线风力荷载(N)","A侧线重力荷载(N)","B侧线重力荷载(N)","A侧张力(N)","B侧张力(N)","A侧不平衡张力(N)","B侧不平衡张力(N)"];
	var wbname="荷载导出文件";
	var appname="Excel";
	tablesToExcel(tables, wsnames, wbname, appname);
}