package com.hr.td.util.wiringDrawing.parameter;

//工况计算实体对象
public class WDData {
	
	private WeatherConditions weatherConditions;//气象条件
	private ProcessData processData;//过程数据
	private SpecificLoadData specificLoadData;//工况比载实体类
	private StringLoadData stringLoadData;//串荷载 实体类
	private LineLengthData lineLengthData;//线长系数
	private ShearStressData shearStressData;//切应力
	private ControlCondition controlConditionData;//控制工况 参数
	private SolvingEquationData solvingEquationData;//求解状态方程参数
	private OLSConstruction olsConstruction;//架线弧垂 - 施工 实体
	private OLSBeCompleted olsBeCompleted;//架线弧垂 - 竣工 实体
	
	
	public ProcessData getProcessData() {
		return processData;
	}
	public void setProcessData(ProcessData processData) {
		this.processData = processData;
	}
	public WeatherConditions getWeatherConditions() {
		return weatherConditions;
	}
	public void setWeatherConditions(WeatherConditions weatherConditions) {
		this.weatherConditions = weatherConditions;
	}
	public SpecificLoadData getSpecificLoadData() {
		return specificLoadData;
	}
	public void setSpecificLoadData(SpecificLoadData specificLoadData) {
		this.specificLoadData = specificLoadData;
	}
	public StringLoadData getStringLoadData() {
		return stringLoadData;
	}
	public void setStringLoadData(StringLoadData stringLoadData) {
		this.stringLoadData = stringLoadData;
	}
	public LineLengthData getLineLengthData() {
		return lineLengthData;
	}
	public void setLineLengthData(LineLengthData lineLengthData) {
		this.lineLengthData = lineLengthData;
	}
	public ShearStressData getShearStressData() {
		return shearStressData;
	}
	public void setShearStressData(ShearStressData shearStressData) {
		this.shearStressData = shearStressData;
	}
	public ControlCondition getControlConditionData() {
		return controlConditionData;
	}
	public void setControlConditionData(ControlCondition controlConditionData) {
		this.controlConditionData = controlConditionData;
	}
	public SolvingEquationData getSolvingEquationData() {
		return solvingEquationData;
	}
	public void setSolvingEquationData(SolvingEquationData solvingEquationData) {
		this.solvingEquationData = solvingEquationData;
	}
	public OLSConstruction getOlsConstruction() {
		return olsConstruction;
	}
	public void setOlsConstruction(OLSConstruction olsConstruction) {
		this.olsConstruction = olsConstruction;
	}
	public OLSBeCompleted getOlsBeCompleted() {
		return olsBeCompleted;
	}
	public void setOlsBeCompleted(OLSBeCompleted olsBeCompleted) {
		this.olsBeCompleted = olsBeCompleted;
	}
}
