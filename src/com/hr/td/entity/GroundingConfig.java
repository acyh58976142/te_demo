package com.hr.td.entity;


import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 接地装置配置表
 * @author cyh
 *
 */
@Entity
@Table(name="groundingConfig")
public class GroundingConfig{
	
	private String id;
	private String no;  //代号
	private Double resistivityMin;  //土壤电阻率最小值
	private Double resistivityMax;  //土壤电阻率最大值
	private String file;  //文件
	private String projectId;  //工程id
	private Integer SerialNum;  //序号
	
	@Id
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getNo() {
		return no;
	}
	public void setNo(String no) {
		this.no = no;
	}
	public Double getResistivityMin() {
		return resistivityMin;
	}
	public void setResistivityMin(Double resistivityMin) {
		this.resistivityMin = resistivityMin;
	}
	public Double getResistivityMax() {
		return resistivityMax;
	}
	public void setResistivityMax(Double resistivityMax) {
		this.resistivityMax = resistivityMax;
	}
	public String getFile() {
		return file;
	}
	public void setFile(String file) {
		this.file = file;
	}
	public String getProjectId() {
		return projectId;
	}
	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}
	public Integer getSerialNum() {
		return SerialNum;
	}
	public void setSerialNum(Integer serialNum) {
		SerialNum = serialNum;
	}
	public GroundingConfig(String id, String no, Double resistivityMin, Double resistivityMax, String file,
			String projectId, Integer serialNum) {
		super();
		this.id = id;
		this.no = no;
		this.resistivityMin = resistivityMin;
		this.resistivityMax = resistivityMax;
		this.file = file;
		this.projectId = projectId;
		SerialNum = serialNum;
	}
	public GroundingConfig() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "GroundingConfig [id=" + id + ", no=" + no + ", resistivityMin=" + resistivityMin + ", resistivityMax="
				+ resistivityMax + ", file=" + file + ", projectId=" + projectId + ", SerialNum=" + SerialNum + "]";
	}
		
}
	
	