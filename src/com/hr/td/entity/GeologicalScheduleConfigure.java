package com.hr.td.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 地址明细配置
 * @author cyh
 *
 */
@Entity
@Table(name="geologicalScheduleConfigure")
public class GeologicalScheduleConfigure {
	private String ID;
	private String stratigraphicName;  //地层名称
	private String floorDepth;  //层底深度
	private String geotechnicalDescription;  //岩土描述
	private String gravityDensity;  //重力密度
	private String cohesion;  //黏聚力
	private String internalFrictionAngle; //内摩擦角
	private String eigenvalueCapacity; //承载力特征值
	private String standardSideResistance;  //桩的极限侧阻力标准值
	private String standardEndResistance;  //桩的极限端阻力标准值
	
	public GeologicalScheduleConfigure() {
		super();
		// TODO Auto-generated constructor stub
	}
	public GeologicalScheduleConfigure(String iD, String stratigraphicName, String floorDepth,
			String geotechnicalDescription, String gravityDensity, String cohesion, String internalFrictionAngle,
			String eigenvalueCapacity, String standardSideResistance, String standardEndResistance) {
		super();
		ID = iD;
		this.stratigraphicName = stratigraphicName;
		this.floorDepth = floorDepth;
		this.geotechnicalDescription = geotechnicalDescription;
		this.gravityDensity = gravityDensity;
		this.cohesion = cohesion;
		this.internalFrictionAngle = internalFrictionAngle;
		this.eigenvalueCapacity = eigenvalueCapacity;
		this.standardSideResistance = standardSideResistance;
		this.standardEndResistance = standardEndResistance;
	}
	@Id
	public String getID() {
		return ID;
	}
	public void setID(String iD) {
		ID = iD;
	}
	public String getStratigraphicName() {
		return stratigraphicName;
	}
	public void setStratigraphicName(String stratigraphicName) {
		this.stratigraphicName = stratigraphicName;
	}
	public String getFloorDepth() {
		return floorDepth;
	}
	public void setFloorDepth(String floorDepth) {
		this.floorDepth = floorDepth;
	}
	public String getGeotechnicalDescription() {
		return geotechnicalDescription;
	}
	public void setGeotechnicalDescription(String geotechnicalDescription) {
		this.geotechnicalDescription = geotechnicalDescription;
	}
	public String getGravityDensity() {
		return gravityDensity;
	}
	public void setGravityDensity(String gravityDensity) {
		this.gravityDensity = gravityDensity;
	}
	public String getCohesion() {
		return cohesion;
	}
	public void setCohesion(String cohesion) {
		this.cohesion = cohesion;
	}
	public String getInternalFrictionAngle() {
		return internalFrictionAngle;
	}
	public void setInternalFrictionAngle(String internalFrictionAngle) {
		this.internalFrictionAngle = internalFrictionAngle;
	}
	public String getEigenvalueCapacity() {
		return eigenvalueCapacity;
	}
	public void setEigenvalueCapacity(String eigenvalueCapacity) {
		this.eigenvalueCapacity = eigenvalueCapacity;
	}
	public String getStandardSideResistance() {
		return standardSideResistance;
	}
	public void setStandardSideResistance(String standardSideResistance) {
		this.standardSideResistance = standardSideResistance;
	}
	public String getStandardEndResistance() {
		return standardEndResistance;
	}
	public void setStandardEndResistance(String standardEndResistance) {
		this.standardEndResistance = standardEndResistance;
	}
		
}
