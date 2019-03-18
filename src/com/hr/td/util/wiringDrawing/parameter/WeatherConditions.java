package com.hr.td.util.wiringDrawing.parameter;

/**
 * 气象条件   -来源-【孤立档气象条件】 配置参数
 * @author Administrator
 *
 */
public class WeatherConditions {
/**
	参与计算	工况序号	工况	温度℃ 	风速m/s	冰厚mm	风速折算	备注
	√	1	最低气温	-20	0	0	×	
	√	2	平均气温	15	0	0	×	
	√	3	最大风	-5	25	0	√	基准高10m
	√	4	覆冰	-5	10	10	×	
	√	5	最高气温	40	0	0	×	
	√	6	安装	-10	10	0	×	
	√	7	外过电压	15	0	0	×	(无风)
	√	8	外过电压	15	10	0	×	(有风)
	√	9	内过电压	15	15	0	×	
	√	10	5m/s风速	15	5	0	×	钢管杆用
	√	11	地线+5	-5	10	15	×	验算1
	√	12	三跨导线	-5	10	20	×	验算2
	×	13	三跨地线	-5	10	25	×	验算3
	×	14	验算4	-5	0	3	×	验算4
	×	15	验算5	-5	0	4	×	验算5
*/
	
	String combinationName;//组合名称;
	int participationCalculation;//参与计算;	 0-不计算    1-计算
	int workingNumber;//工况序号;	
	String workingName;//工况名称;	
	double temperature;//温度;
	double windSpeed;//风速;	
	double iceThickness;//冰厚;	
	int windSpeedConversion;//风速折算;  0-不计算    1-计算	
	String remarks;//备注;
	
	public String getCombinationName() {
		return combinationName;
	}
	public void setCombinationName(String combinationName) {
		this.combinationName = combinationName;
	}
	public int getParticipationCalculation() {
		return participationCalculation;
	}
	public void setParticipationCalculation(int participationCalculation) {
		this.participationCalculation = participationCalculation;
	}
	public int getWorkingNumber() {
		return workingNumber;
	}
	public void setWorkingNumber(int workingNumber) {
		this.workingNumber = workingNumber;
	}
	public String getWorkingName() {
		return workingName;
	}
	public void setWorkingName(String workingName) {
		this.workingName = workingName;
	}
	public double getTemperature() {
		return temperature;
	}
	public void setTemperature(double temperature) {
		this.temperature = temperature;
	}
	public double getWindSpeed() {
		return windSpeed;
	}
	public void setWindSpeed(double windSpeed) {
		this.windSpeed = windSpeed;
	}
	public double getIceThickness() {
		return iceThickness;
	}
	public void setIceThickness(double iceThickness) {
		this.iceThickness = iceThickness;
	}
	public int getWindSpeedConversion() {
		return windSpeedConversion;
	}
	public void setWindSpeedConversion(int windSpeedConversion) {
		this.windSpeedConversion = windSpeedConversion;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
}
