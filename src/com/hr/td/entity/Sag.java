package com.hr.td.entity;


import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 力学特征  - 弧垂
 * @author zhh
 *
 */
@Entity
@Table(name = "mp_sag")
public class Sag{

	/**
	 * 
	 */
	private String id;
	private double representativeSpan;//代表档距
	private double icing;//覆冰
	private double maxTemperature;//最高气温
	private double abroadNoWind;//外过(无风)
	private int wireTypeTag;	//参数类型 1:导线 2:地线
	
	@Id
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public int getWireTypeTag() {
		return wireTypeTag;
	}
	public void setWireTypeTag(int wireTypeTag) {
		this.wireTypeTag = wireTypeTag;
	}
	public double getRepresentativeSpan() {
		return representativeSpan;
	}
	public void setRepresentativeSpan(double representativeSpan) {
		this.representativeSpan = representativeSpan;
	}
	public double getIcing() {
		return icing;
	}
	public void setIcing(double icing) {
		this.icing = icing;
	}
	public double getMaxTemperature() {
		return maxTemperature;
	}
	public void setMaxTemperature(double maxTemperature) {
		this.maxTemperature = maxTemperature;
	}
	public double getAbroadNoWind() {
		return abroadNoWind;
	}
	public void setAbroadNoWind(double abroadNoWind) {
		this.abroadNoWind = abroadNoWind;
	}
	
	
}
