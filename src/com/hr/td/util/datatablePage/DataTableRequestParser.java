package com.hr.td.util.datatablePage;

import java.text.MessageFormat;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.regex.Matcher;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.math.NumberUtils;

import com.nari.slsd.hd.dto.Chardata;
import com.hr.td.util.ToolsUtil;


/**
 * dataTables request的解析器
 * 
 * @author 
 * @date 2014-12-30
 */
public class DataTableRequestParser {

	/**
	 * 从http request中解析DataTable request
	 * @param httpRequest
	 * @param defaultLength
	 *            如果未指定默认页大小，则应该是？
	 * @return
	 * @throws Exception 
	 */
	public static DataTableRequest fromHttpRequest(HttpServletRequest httpRequest, int defaultLength) throws Exception {
		DataTableRequest DataTableRequest = new DataTableRequest();
		DataTableRequest.setStart(getIntParam(httpRequest, "start", 0));
		DataTableRequest.setLength(getIntParam(httpRequest, "length", defaultLength));
		DataTableRequest.setDraw(getIntParam(httpRequest, "draw", 1));

		// parse columns
		@SuppressWarnings("unchecked")
		Map<String, String[]> paramMap = httpRequest.getParameterMap();
		fillColumns(DataTableRequest, paramMap);

		// parse sorting
		fillOrdering(DataTableRequest, paramMap);

		return DataTableRequest;
	}

	/**
	 * 
	 * @throws Exception 
	 * @方法名:fillOrdering
	 * @方法功能说明: 获得排序字段+排序方式
	 * @参数类型及示例:@param DataTableRequest
	 * @参数类型及示例:@param paramMap
	 * @作者:
	 * @创建日期:2016年9月26日
	 * @创建时间:下午6:46:44
	 */
	private static void fillOrdering(DataTableRequest DataTableRequest,Map<String, String[]> paramMap) throws Exception {

		// 告诉后台哪些列是需要排序的，从0开始
		String orderColumnIndexStr = StringUtils.trimToNull(getFirstElement(paramMap.get("order[0][column]")));
		if(!ToolsUtil.injectChar(orderColumnIndexStr)){
			orderColumnIndexStr="0";
		}
		int orderColumnIndex = NumberUtils.toInt(orderColumnIndexStr, -1);
		if (orderColumnIndex < 0) {
			return;
		}

		// 本项目封装的共通表格代码对于"columns[{0}][name]"总是为""，"columns[{0}][data]"才能正常支持
//		String columnNameParamKey = MessageFormat.format("columns[{0}][name]",String.valueOf(orderColumnIndex));
		String columnNameParamKey = MessageFormat.format("columns[{0}][data]",String.valueOf(orderColumnIndex));
		/*if (columnNameParamKey == null || !ToolsUtil.injectChar(columnNameParamKey)) {
			return;
		}*/
		
		String columnName = StringUtils.trimToNull(getFirstElement(paramMap.get(columnNameParamKey)));

		if (columnName == null || !ToolsUtil.injectChar(columnName)) {
			return;
		}
		
		boolean orderAsc = "asc".equals(getFirstElement(paramMap.get("order[0][dir]")));
		
		DataTableRequest.setOrderColumn(columnName);
		DataTableRequest.setOrderAsc(orderAsc);
		
		
//		String columnName = StringUtils.trimToNull(getFirstElement(paramMap.get("orderColumn")));
//
//		if (columnName == null) {
//			return;
//		}
//		
//		boolean orderAsc = "asc".equals(getFirstElement(paramMap.get("sorting")));
//		
//		DataTableRequest.setOrderColumn(columnName);
//		DataTableRequest.setOrderAsc(orderAsc);
		
	}

	/**
	 * 
	 * @方法名:fillColumns
	 * @方法功能说明: 未知
	 * @参数类型及示例:@param DataTableRequest
	 * @参数类型及示例:@param paramMap
	 * @作者:ZhuHongBo
	 * @创建日期:2016年9月26日
	 * @创建时间:下午6:48:01
	 */
	private static void fillColumns(DataTableRequest DataTableRequest,Map<String, String[]> paramMap) {
		for (String paramName : paramMap.keySet()) {
			Matcher matcher = DataTableColumn.COLUMN_NAME_PATTERN.matcher(paramName);
			
			// 查找与该模式匹配的输入序列的下一个子序列
			if (!matcher.find()) {
				continue;
			}
			String columnIndexStr = matcher.group(1); // 返回在以前匹配操作期间由给定组捕获的输入子序列
			if (!NumberUtils.isNumber(columnIndexStr)) {
				continue;
			}
			int columnIndex = NumberUtils.toInt(columnIndexStr);
			if (paramMap.get(paramName) == null
					|| paramMap.get(paramName).length == 0
					|| StringUtils.isBlank(paramMap.get(paramName)[0])) {
				continue;
			}

			String columnName = StringUtils.trimToNull(paramMap.get(paramName)[0]);
			
			if (columnName == null || !ToolsUtil.injectChar(columnName)) {
				continue;
			}
			String columnSearchValueParamName = MessageFormat.format("columns[{0}][search][value]", String.valueOf(columnIndex));
			
			String columnSearchValue = StringUtils.trimToNull(getFirstElement(paramMap.get(columnSearchValueParamName)));
			
			DataTableRequest.addColumn(columnName, columnSearchValue);
		}
	}

	private static String getFirstElement(String[] array) {
		if (array == null) {
			return null;
		}
		if (array.length == 0) {
			return null;
		}
		return array[0];
	}

	private static int getIntParam(HttpServletRequest request,String paramName, int defaultValue) {
		return NumberUtils.toInt(
				StringUtils.trimToNull(request.getParameter(paramName)),
				defaultValue);
	}
	
	/**
	 * 获取测点数据
	 * @param httpRequest
	 * @param start 开始
	 * @param defaultLength 每次加载的数量
	 * @return
	 * @throws Exception 
	 */
	public static DataTableRequest spHttpRequest(HttpServletRequest httpRequest, int start, int defaultLength) throws Exception {
		DataTableRequest DataTableRequest = new DataTableRequest();
		DataTableRequest.setStart(getIntParam(httpRequest, "start", start));
		DataTableRequest.setLength(getIntParam(httpRequest, "length", defaultLength));
		DataTableRequest.setDraw(getIntParam(httpRequest, "draw", 1));

		// parse columns
		@SuppressWarnings("unchecked")
		Map<String, String[]> paramMap = httpRequest.getParameterMap();
		fillColumns(DataTableRequest, paramMap);

		// parse sorting
		fillOrdering(DataTableRequest, paramMap);

		return DataTableRequest;
	}
}



