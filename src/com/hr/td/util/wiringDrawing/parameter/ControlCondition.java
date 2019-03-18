package com.hr.td.util.wiringDrawing.parameter;
/**
 * 控制工况判断 实体类
 * @author Administrator
 *
 */
public class ControlCondition {
	
	private double omax;//σmax
	private double tn;
	private double F;
	
	private String controlConditionType;//控制工况类型
	private int controlConditionValue;//控制工况值
	
	
	/**
	 * 求解状态方程  所需参数
	 * @return
	 */
	//Km --[固定取值] 根据 [控制工况 计算项结果] 取  线长系数  Kn 中的值 (顺序序号)
	//σm --[固定取值] 根据 [控制工况 计算项结果] 取 控制工况判断 σmax 中的值 (顺序序号)
	//tm --[固定取值] 根据 [控制工况 计算项结果] 取 控制工况判断tn 中的值 (顺序序号)
	private double Km;
	private double om;
	private double tm;
	
	
	
	public double getKm() {
		return Km;
	}
	public void setKm(double km) {
		Km = km;
	}
	public double getOm() {
		return om;
	}
	public void setOm(double om) {
		this.om = om;
	}
	public double getTm() {
		return tm;
	}
	public void setTm(double tm) {
		this.tm = tm;
	}
	public double getOmax() {
		return omax;
	}
	public void setOmax(double omax) {
		this.omax = omax;
	}
	public double getTn() {
		return tn;
	}
	public void setTn(double tn) {
		this.tn = tn;
	}
	public double getF() {
		return F;
	}
	public void setF(double f) {
		F = f;
	}
	public String getControlConditionType() {
		return controlConditionType;
	}
	public void setControlConditionType(String controlConditionType) {
		this.controlConditionType = controlConditionType;
	}
	public int getControlConditionValue() {
		return controlConditionValue;
	}
	public void setControlConditionValue(int controlConditionValue) {
		this.controlConditionValue = controlConditionValue;
	}
	
}
