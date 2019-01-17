package com.hr.td.util.datatablePage;

import java.util.LinkedHashMap;
import java.util.Map;


/**
 * datatables ajax 请求建模
 * 注：
 * 1.不支持regex search 
 * 2.只支持单一维度排序 
 * 
 * @author 
 * @date 2014-12-30
 */
public class DataTableRequest {

	/**
	 * 绘画计数器
	 */
	private int draw;

	/**
	 * 分页起始坐标
	 */
	private int start;

	/**
	 * 分页长度
	 */
	private int length;

	/**
	 * 请求  columns
	 */
	private Map<String, DataTableColumn> columns = new LinkedHashMap<String, DataTableColumn>();

	/**
	 * 用于排序的列名
	 */
	private String orderColumn;

	/**
	 * 排序是否为升序。如果{@link #orderColumn}为空，则此字段的字将被忽略
	 */
	private boolean orderAsc;

	/**
	 * 加一个column
	 * 
	 * @param name
	 * @param searchValue
	 */
	public void addColumn(String name, String searchValue) {
		DataTableColumn column = DataTableColumn.createInstance(name, searchValue);
		columns.put(name, column);
	}

	/**
	 * 根据column name拿到search value
	 * 
	 * @param name
	 * @return
	 */
	public String getColumnSearchValue(String name) {
		DataTableColumn column = columns.get(name);
		if (column == null) {
			return null;
		}
		return column.getSearchValue();
	}

	public int getDraw() {
		return draw;
	}

	public void setDraw(int draw) {
		this.draw = draw;
	}

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public int getLength() {
		return length;
	}

	public void setLength(int length) {
		this.length = length;
	}

	public int getPageSize() {
		return getLength();
	}

	public int getPageIndexOneBased() {
		if (this.getPageSize() <= 0) {
			return 1;
		}

		return this.getStart() / this.getPageSize() + 1;
	}

	public String getOrderColumn() {
		return orderColumn;
	}

	public void setOrderColumn(String orderColumnName) {
		this.orderColumn = orderColumnName;
	}

	public boolean isOrderAsc() {
		return orderAsc;
	}

	public void setOrderAsc(boolean orderAsc) {
		this.orderAsc = orderAsc;
	}
 
}




