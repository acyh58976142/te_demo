package com.hr.td.entity;

import java.io.Serializable;

/**
 * 力学特征  - 弧垂
 * @author zhh
 *
 */
public class Sag implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private double representativeSpan;//代表档距
	private double icing;//覆冰
	private double maxTemperature;//最高气温
	private double abroadNoWind;//外过(无风)
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
