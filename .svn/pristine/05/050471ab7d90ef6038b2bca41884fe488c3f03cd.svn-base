package com.hr.td.util;

import java.util.List;

/**
 * DataTables表格控件后台数据
 *
 */
public class DataTableObject<T> {
	
	public DataTableObject() {
		
	}
	
	public DataTableObject(int iTotalRecords, int iTotalDisplayRecords, String eEcho, String sColumns, List<T> aaData) {
		super();
		this.iTotalRecords = (long) iTotalRecords;
		this.iTotalDisplayRecords = (long) iTotalDisplayRecords;
		this.eEcho = eEcho;
		this.sColumns = sColumns;
		this.aaData = aaData;
	}
	
	public DataTableObject(Long iTotalRecords, Long iTotalDisplayRecords, String eEcho, String sColumns, List<T> aaData) {
		super();
		this.iTotalRecords = iTotalRecords;
		this.iTotalDisplayRecords = iTotalDisplayRecords;
		this.eEcho = eEcho;
		this.sColumns = sColumns;
		this.aaData = aaData;
	}
     

	/**
	 * 总数
	 */
	private Long iTotalRecords;
	
	/**
	 * 每页显示�?
	 */
	private Long iTotalDisplayRecords;
	
	/**
	 * 
	 */
	private String eEcho;
	
	/**
	 * 
	 */
	private String sColumns;
	
	/**
	 * 数据
	 */
	private List<T> aaData;

	public Long getiTotalRecords() {
		return iTotalRecords;
	}

	public void setiTotalRecords(Long iTotalRecords) {
		this.iTotalRecords = iTotalRecords;
	}

	public Long getiTotalDisplayRecords() {
		return iTotalDisplayRecords;
	}

	public void setiTotalDisplayRecords(Long iTotalDisplayRecords) {
		this.iTotalDisplayRecords = iTotalDisplayRecords;
	}

	public String geteEcho() {
		return eEcho;
	}

	public void seteEcho(String eEcho) {
		this.eEcho = eEcho;
	}

	public String getsColumns() {
		return sColumns;
	}

	public void setsColumns(String sColumns) {
		this.sColumns = sColumns;
	}

	public List<T> getAaData() {
		return aaData;
	}

	public void setAaData(List<T> aaData) {
		this.aaData = aaData;
	}
	
}
