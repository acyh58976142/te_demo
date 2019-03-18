package com.hr.td.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 结构基础参数信息表
 * @author yw
 *
 */
@Entity
@Table(name="structuralParamter")
public class StructuralParamter {
	private String id;  //主键
	private String geologicalDescription; //地质描述
	private String towerType;  //杆塔类型
	private String angleLY;  //转角拉压方式
	private String actingForce;  //作用力
	private String towerShaped;  //塔形
	private String countOnly;  //只数
	private String steelLabel;  //钢材标号
	private String soilVolume;  //混泥土量
	private String steelQuantity;  //钢材量
	private String earthBolt;  //地栓
	private String beddingLabel;  //垫层标号
	private String cushion;  //垫层
	private String buryingDepth;  //埋深
	private String baseplateWidth;  //底板宽
	private String columnWidth; //立柱宽
	private String columnHigh; //立柱出土高
	private String basicModel;//基础型号
	private String remark;  //备注
	private String projectId;//工程id
	@Id
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getGeologicalDescription() {
		return geologicalDescription;
	}
	public void setGeologicalDescription(String geologicalDescription) {
		this.geologicalDescription = geologicalDescription;
	}
	public String getTowerType() {
		return towerType;
	}
	public void setTowerType(String towerType) {
		this.towerType = towerType;
	}
	public String getAngleLY() {
		return angleLY;
	}
	public void setAngleLY(String angleLY) {
		this.angleLY = angleLY;
	}
	public String getActingForce() {
		return actingForce;
	}
	public void setActingForce(String actingForce) {
		this.actingForce = actingForce;
	}
	public String getTowerShaped() {
		return towerShaped;
	}
	public void setTowerShaped(String towerShaped) {
		this.towerShaped = towerShaped;
	}
	public String getCountOnly() {
		return countOnly;
	}
	public void setCountOnly(String countOnly) {
		this.countOnly = countOnly;
	}
	public String getSteelLabel() {
		return steelLabel;
	}
	public void setSteelLabel(String steelLabel) {
		this.steelLabel = steelLabel;
	}
	public String getSoilVolume() {
		return soilVolume;
	}
	public void setSoilVolume(String soilVolume) {
		this.soilVolume = soilVolume;
	}
	public String getSteelQuantity() {
		return steelQuantity;
	}
	public void setSteelQuantity(String steelQuantity) {
		this.steelQuantity = steelQuantity;
	}
	public String getEarthBolt() {
		return earthBolt;
	}
	public void setEarthBolt(String earthBolt) {
		this.earthBolt = earthBolt;
	}
	public String getBeddingLabel() {
		return beddingLabel;
	}
	public void setBeddingLabel(String beddingLabel) {
		this.beddingLabel = beddingLabel;
	}
	public String getCushion() {
		return cushion;
	}
	public void setCushion(String cushion) {
		this.cushion = cushion;
	}
	public String getBuryingDepth() {
		return buryingDepth;
	}
	public void setBuryingDepth(String buryingDepth) {
		this.buryingDepth = buryingDepth;
	}
	public String getBaseplateWidth() {
		return baseplateWidth;
	}
	public void setBaseplateWidth(String baseplateWidth) {
		this.baseplateWidth = baseplateWidth;
	}
	public String getColumnWidth() {
		return columnWidth;
	}
	public void setColumnWidth(String columnWidth) {
		this.columnWidth = columnWidth;
	}
	public String getColumnHigh() {
		return columnHigh;
	}
	public void setColumnHigh(String columnHigh) {
		this.columnHigh = columnHigh;
	}
	public String getBasicModel() {
		return basicModel;
	}
	public void setBasicModel(String basicModel) {
		this.basicModel = basicModel;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getProjectId() {
		return projectId;
	}
	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}
	
}
