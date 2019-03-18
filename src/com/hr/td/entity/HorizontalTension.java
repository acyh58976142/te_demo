package com.hr.td.entity;


import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 力学特征  - 水平张力
 * @author zhh
 *
 */
@Entity
@Table(name = "mp_horizontal_tension")
public class HorizontalTension{

	/**
	 * 
	 */
	private String id;
	private double representativeSpan;//代表档距
	private double minTemperature;//最低气温
	private double avgTemperature;//平均气温
	private double maxWind;//最大风
	private double icing;//覆冰
	private double maxTemperature;//最高气温
	private double installV;//安装
	private double abroadNoWind;//外过(无风)
	private double abroadWind;//外过(有风)
	private double internalOvervoltage;//内过电压
	private double second5Wind;//5m/s风速.
	private double groundWire5;//地线+5
	private double threeSpanConductors;//三跨导线
	private double threeSpanLine;//三跨地线
	private double checkingComputations4;//验算4
	private double checkingComputations5;//验算5
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
	public double getGroundWire5() {
		return groundWire5;
	}
	public void setGroundWire5(double groundWire5) {
		this.groundWire5 = groundWire5;
	}
	public double getThreeSpanConductors() {
		return threeSpanConductors;
	}
	public void setThreeSpanConductors(double threeSpanConductors) {
		this.threeSpanConductors = threeSpanConductors;
	}
	public double getThreeSpanLine() {
		return threeSpanLine;
	}
	public void setThreeSpanLine(double threeSpanLine) {
		this.threeSpanLine = threeSpanLine;
	}
	public double getCheckingComputations4() {
		return checkingComputations4;
	}
	public void setCheckingComputations4(double checkingComputations4) {
		this.checkingComputations4 = checkingComputations4;
	}
	public double getCheckingComputations5() {
		return checkingComputations5;
	}
	public void setCheckingComputations5(double checkingComputations5) {
		this.checkingComputations5 = checkingComputations5;
	}
	public double getRepresentativeSpan() {
		return representativeSpan;
	}
	public void setRepresentativeSpan(double representativeSpan) {
		this.representativeSpan = representativeSpan;
	}
	public double getMinTemperature() {
		return minTemperature;
	}
	public void setMinTemperature(double minTemperature) {
		this.minTemperature = minTemperature;
	}
	public double getAvgTemperature() {
		return avgTemperature;
	}
	public void setAvgTemperature(double avgTemperature) {
		this.avgTemperature = avgTemperature;
	}
	public double getMaxWind() {
		return maxWind;
	}
	public void setMaxWind(double maxWind) {
		this.maxWind = maxWind;
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
	public double getInstallV() {
		return installV;
	}
	public void setInstallV(double installV) {
		this.installV = installV;
	}
	public double getAbroadNoWind() {
		return abroadNoWind;
	}
	public void setAbroadNoWind(double abroadNoWind) {
		this.abroadNoWind = abroadNoWind;
	}
	public double getAbroadWind() {
		return abroadWind;
	}
	public void setAbroadWind(double abroadWind) {
		this.abroadWind = abroadWind;
	}
	public double getInternalOvervoltage() {
		return internalOvervoltage;
	}
	public void setInternalOvervoltage(double internalOvervoltage) {
		this.internalOvervoltage = internalOvervoltage;
	}
	public double getSecond5Wind() {
		return second5Wind;
	}
	public void setSecond5Wind(double second5Wind) {
		this.second5Wind = second5Wind;
	}
	
	
	
}
