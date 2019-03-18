package com.hr.td.entity;


import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 组配件配置表
 * @author sun
 *
 */
@Entity
@Table(name="wireConfiguration")
public class WireConfiguration{
	
	private String id;     //主键ID，32位UUID大写
	private String wireConfigData;// 导线配置
	private String groundConfigData;//地线配置
	private String OPGWConfigData;// OPGW配置
	private String wireDefaultConfig;// 导线默认配置
	private String groundDefaultConfig;// 地线默认配置
	private String OPGWDefaultConfig;// OPGW默认配置
	private Double cableLengthModulus;//光缆线长系数
	private Double cableLengthMargin;//光缆盘长裕度(m)
	private String bracketHeight;//地线支架-下横担高度
	private String hammerType;//防振锤型号

	/****主键ID*****/
	@Id
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}

	public String getWireConfigData() {
		return wireConfigData;
	}
	public void setWireConfigData(String wireConfigData) {
		this.wireConfigData = wireConfigData;
	}
	public String getGroundConfigData() {
		return groundConfigData;
	}
	public void setGroundConfigData(String groundConfigData) {
		this.groundConfigData = groundConfigData;
	}
	public String getOPGWConfigData() {
		return OPGWConfigData;
	}
	public void setOPGWConfigData(String oPGWConfigData) {
		OPGWConfigData = oPGWConfigData;
	}
	public String getWireDefaultConfig() {
		return wireDefaultConfig;
	}
	public void setWireDefaultConfig(String wireDefaultConfig) {
		this.wireDefaultConfig = wireDefaultConfig;
	}
	public String getGroundDefaultConfig() {
		return groundDefaultConfig;
	}
	public void setGroundDefaultConfig(String groundDefaultConfig) {
		this.groundDefaultConfig = groundDefaultConfig;
	}
	public String getOPGWDefaultConfig() {
		return OPGWDefaultConfig;
	}
	public void setOPGWDefaultConfig(String oPGWDefaultConfig) {
		OPGWDefaultConfig = oPGWDefaultConfig;
	}
	public Double getCableLengthModulus() {
		return cableLengthModulus;
	}
	public void setCableLengthModulus(Double cableLengthModulus) {
		this.cableLengthModulus = cableLengthModulus;
	}
	public Double getCableLengthMargin() {
		return cableLengthMargin;
	}
	public void setCableLengthMargin(Double cableLengthMargin) {
		this.cableLengthMargin = cableLengthMargin;
	}
	public String getBracketHeight() {
		return bracketHeight;
	}
	public void setBracketHeight(String bracketHeight) {
		this.bracketHeight = bracketHeight;
	}
	public String getHammerType() {
		return hammerType;
	}
	public void setHammerType(String hammerType) {
		this.hammerType = hammerType;
	}
		
}
	
	