package com.hr.td.entity;


import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 接地装置信息表
 * @author sun
 *
 */
@Entity
@Table(name="groundingDevice")
public class GroundingDevice{
	
	private String id;     //主键ID，32位UUID大写
	private String data;// 接地装置信息
	private String projectId;//工程ID 
	
	/****主键ID*****/
	@Id
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getData() {
		return data;
	}
	public void setData(String data) {
		this.data = data;
	}
	public String getProjectId() {
		return projectId;
	}
	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}
	
}
	
	