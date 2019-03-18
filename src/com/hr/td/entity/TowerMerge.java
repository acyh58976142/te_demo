package com.hr.td.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 归并后的杆塔信息
 * @author yw
 *
 */
@Entity
@Table(name="tower_merge")
public class TowerMerge {
	 private String id;
     private String mergeData;
     private String towerData;
     private String projectId;
     
 	@Id
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getMergeData() {
		return mergeData;
	}
	public void setMergeData(String mergeData) {
		this.mergeData = mergeData;
	}
	public String getTowerData() {
		return towerData;
	}
	public void setTowerData(String towerData) {
		this.towerData = towerData;
	}
	public String getProjectId() {
		return projectId;
	}
	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}
     
}
