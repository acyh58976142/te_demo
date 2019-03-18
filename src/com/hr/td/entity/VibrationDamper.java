package com.hr.td.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 防震锤配置信息表的实体类
 * 
 * @author sunyongjian
 */
@Entity
@Table(name = "vibrationDamper")
public class VibrationDamper {

	private String id; // ID
	private String projectId; // 工程项目ID
	private Integer vibrationType; //0：地线；1：导线小；2导线中；3导线大；
	private Double minDiameter;//直径范围最小值
	private Double maxDiameter;//直径范围最大值
	private Double minSpan;//档距下限
	private Double maxSpan;//档距上限
	private Integer count; // 数量
	private Integer sortNo; // Type相同时的序号

	/** ID 主键 */
	@Id
	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	/** 工程项目ID */
	public String getProjectId() {
		return projectId;
	}
	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}

	public Integer getVibrationType() {
		return vibrationType;
	}

	public void setVibrationType(Integer vibrationType) {
		this.vibrationType = vibrationType;
	}

	public Double getMinDiameter() {
		return minDiameter;
	}

	public void setMinDiameter(Double minDiameter) {
		this.minDiameter = minDiameter;
	}

	public Double getMaxDiameter() {
		return maxDiameter;
	}

	public void setMaxDiameter(Double maxDiameter) {
		this.maxDiameter = maxDiameter;
	}

	public Double getMinSpan() {
		return minSpan;
	}

	public void setMinSpan(Double minSpan) {
		this.minSpan = minSpan;
	}

	public Double getMaxSpan() {
		return maxSpan;
	}

	public void setMaxSpan(Double maxSpan) {
		this.maxSpan = maxSpan;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public Integer getSortNo() {
		return sortNo;
	}

	public void setSortNo(Integer sortNo) {
		this.sortNo = sortNo;
	}
	
}
