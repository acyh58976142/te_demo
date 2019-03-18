package com.hr.td.entity;


import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * route文件信息表
 * @author sun
 *
 */
@Entity
@Table(name="routeInfoNew")
public class RouteInfoNew{
	
	private String id;     //主键ID，32位UUID大写
	private String projectId;//工程ID 
	private String tensileSection;// 耐张段信息
	private String conductorParam;// 导线参数
	private String groundParam; //地线参数
	private String conductorAllParam;// 所有导线参数
	private String groundAllParam; // 所有地线参数
	private String relationData;//route文件和Ta文件关联信息(taSortno:ta文件序号，routeNo:route文件耐张段编号)
	private String allLineData; // 所有线路参数

	/****主键ID*****/
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
	public String getTensileSection() {
		return tensileSection;
	}
	public void setTensileSection(String tensileSection) {
		this.tensileSection = tensileSection;
	}
	public String getConductorParam() {
		return conductorParam;
	}
	public void setConductorParam(String conductorParam) {
		this.conductorParam = conductorParam;
	}
	public String getGroundParam() {
		return groundParam;
	}
	public void setGroundParam(String groundParam) {
		this.groundParam = groundParam;
	}
	public String getRelationData() {
		return relationData;
	}
	public void setRelationData(String relationData) {
		this.relationData = relationData;
	}
	public String getConductorAllParam() {
		return conductorAllParam;
	}
	public void setConductorAllParam(String conductorAllParam) {
		this.conductorAllParam = conductorAllParam;
	}
	public String getGroundAllParam() {
		return groundAllParam;
	}
	public void setGroundAllParam(String groundAllParam) {
		this.groundAllParam = groundAllParam;
	}
	public String getAllLineData() {
		return allLineData;
	}
	public void setAllLineData(String allLineData) {
		this.allLineData = allLineData;
	}
	
}
	
	