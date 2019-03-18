package com.hr.td.util.wiringDrawing.vo;

public class OutputOSagTable {

	private String lsolatedFileName;//孤立档名称	
	private String span;//档距(m)	
	private String wireModel;//电线型号	
		
	private String nT20;//架线弧垂(m)-20
	private String nT10;//架线弧垂(m)-10
	private String pT0;//架线弧垂(m)0	
	private String pT10;//架线弧垂(m)10
	private String pT20;//架线弧垂(m)20
	private String pT30;//架线弧垂(m)30
	private String pT40;//架线弧垂(m)40		
	
	private String lowerTemperature;//初伸长降温值(℃)
	private String overTraction;//过牵引最大允许值(m)
	
	//导线计算过程参数 - 用于计算地线
	private double wireway_cc_fm_j;
	//导线计算过程参数2 - 用于计算地线
	private double wireway_cc_fm_k;
	
	public double getWireway_cc_fm_j() {
		return wireway_cc_fm_j;
	}
	public void setWireway_cc_fm_j(double wireway_cc_fm_j) {
		this.wireway_cc_fm_j = wireway_cc_fm_j;
	}
	public double getWireway_cc_fm_k() {
		return wireway_cc_fm_k;
	}
	public void setWireway_cc_fm_k(double wireway_cc_fm_k) {
		this.wireway_cc_fm_k = wireway_cc_fm_k;
	}
	public String getLsolatedFileName() {
		return lsolatedFileName;
	}
	public void setLsolatedFileName(String lsolatedFileName) {
		this.lsolatedFileName = lsolatedFileName;
	}
	public String getSpan() {
		return span;
	}
	public void setSpan(String span) {
		this.span = span;
	}
	public String getWireModel() {
		return wireModel;
	}
	public void setWireModel(String wireModel) {
		this.wireModel = wireModel;
	}
	public String getnT20() {
		return nT20;
	}
	public void setnT20(String nT20) {
		this.nT20 = nT20;
	}
	public String getnT10() {
		return nT10;
	}
	public void setnT10(String nT10) {
		this.nT10 = nT10;
	}
	public String getpT0() {
		return pT0;
	}
	public void setpT0(String pT0) {
		this.pT0 = pT0;
	}
	public String getpT10() {
		return pT10;
	}
	public void setpT10(String pT10) {
		this.pT10 = pT10;
	}
	public String getpT20() {
		return pT20;
	}
	public void setpT20(String pT20) {
		this.pT20 = pT20;
	}
	public String getpT30() {
		return pT30;
	}
	public void setpT30(String pT30) {
		this.pT30 = pT30;
	}
	public String getpT40() {
		return pT40;
	}
	public void setpT40(String pT40) {
		this.pT40 = pT40;
	}
	public String getLowerTemperature() {
		return lowerTemperature;
	}
	public void setLowerTemperature(String lowerTemperature) {
		this.lowerTemperature = lowerTemperature;
	}
	public String getOverTraction() {
		return overTraction;
	}
	public void setOverTraction(String overTraction) {
		this.overTraction = overTraction;
	}
	
}
