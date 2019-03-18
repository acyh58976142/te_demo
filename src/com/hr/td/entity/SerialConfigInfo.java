package com.hr.td.entity;


import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 金具图配置信息记录表
 * @author cyh
 *
 */
@Entity
@Table(name="serialConfigInfo")
public class SerialConfigInfo{
	
	private String id;  //主键id
	private String projectId; //工程id
	private int tableType; //表格类型  1导线耐张段 2导线耐张段 3跳线串 4地线悬垂串 5地线耐张串
	private String tableData; //表格数据
	private String stringTypeSelect;   //串行选择下拉框
	private String insulatorTypeSelect;  //绝缘子型号下拉框
	
	public SerialConfigInfo(String id, String projectId, int tableType, String tableData, String stringTypeSelect,
			String insulatorTypeSelect) {
		super();
		this.id = id;
		this.projectId = projectId;
		this.tableType = tableType;
		this.tableData = tableData;
		this.stringTypeSelect = stringTypeSelect;
		this.insulatorTypeSelect = insulatorTypeSelect;
	}
	public SerialConfigInfo() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "SerialConfigInfo [id=" + id + ", projectId=" + projectId + ", tableType=" + tableType + ", tableData="
				+ tableData + ", stringTypeSelect=" + stringTypeSelect + ", insulatorTypeSelect=" + insulatorTypeSelect
				+ "]";
	}
	@Id
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getProjectId() {
		return projectId;
	}
	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}
	public int getTableType() {
		return tableType;
	}
	public void setTableType(int tableType) {
		this.tableType = tableType;
	}
	public String getTableData() {
		return tableData;
	}
	public void setTableData(String tableData) {
		this.tableData = tableData;
	}
	public String getStringTypeSelect() {
		return stringTypeSelect;
	}
	public void setStringTypeSelect(String stringTypeSelect) {
		this.stringTypeSelect = stringTypeSelect;
	}
	public String getInsulatorTypeSelect() {
		return insulatorTypeSelect;
	}
	public void setInsulatorTypeSelect(String insulatorTypeSelect) {
		this.insulatorTypeSelect = insulatorTypeSelect;
	}
	
}
	
	