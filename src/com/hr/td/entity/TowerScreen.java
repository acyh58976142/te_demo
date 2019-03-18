package com.hr.td.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 筛选后的杆塔信息
 * @author yw
 *
 */
@Entity
@Table(name="tower_screen")
public class TowerScreen {
      private String id;
      private String screenData;
      private String projectId;
      
  	@Id
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getScreenData() {
		return screenData;
	}
	public void setScreenData(String screenData) {
		this.screenData = screenData;
	}
	public String getProjectId() {
		return projectId;
	}
	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}
      
      
}
