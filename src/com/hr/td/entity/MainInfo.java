package com.hr.td.entity;


import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 工程基本信息表
 * @author sun
 *
 */
@Entity
@Table(name="mainInfo")
public class MainInfo{
	
	private String id;     //主键ID，32位UUID大写
	private int stageId;// 项目阶段ID
	private String towerId;// 杆塔ID
	private String wireConfigId;// 组配件配置ID
	private String projectName; //工程名称
	private String projectCode;   //工程编号
	private String designUnit; 
	private Date designDate;  //时间
	
	
	/****主键ID*****/
	@Id
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getProjectName() {
		return projectName;
	}
	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
	public String getProjectCode() {
		return projectCode;
	}
	public void setProjectCode(String projectCode) {
		this.projectCode = projectCode;
	}
	public String getDesignUnit() {
		return designUnit;
	}
	public void setDesignUnit(String designUnit) {
		this.designUnit = designUnit;
	}
	public Date getDesignDate() {
		return designDate;
	}
	public void setDesignDate(Date designDate) {
		this.designDate = designDate;
	}
	public int getStageId() {
		return stageId;
	}
	public void setStageId(int stageId) {
		this.stageId = stageId;
	}
	public String getTowerId() {
		return towerId;
	}
	public void setTowerId(String towerId) {
		this.towerId = towerId;
	}
	public String getWireConfigId() {
		return wireConfigId;
	}
	public void setWireConfigId(String wireConfigId) {
		this.wireConfigId = wireConfigId;
	}  

}
	
	