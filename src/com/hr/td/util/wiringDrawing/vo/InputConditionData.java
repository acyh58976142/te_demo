package com.hr.td.util.wiringDrawing.vo;
/**
 * 输入条件
 * @author Administrator
 *
 */
public class InputConditionData {
	private String fs_TowerNumber;// 前侧塔号
	private String bs_TowerNumber;// 后侧塔号
	private double span;// 档距
	private int lineType;//电线类型  -  0-导线   1-地线
	private double heightDifference;// 挂线点高差
	private String wireType;// 电线型号
	private double splittingNumber;// 分裂数	
	
	private double fs_SLength;// 前侧串长
	private double fs_SWeight;// 前侧串重
	private double fs_LinkingNumber;// 前侧 联数
	private double fs_ECNumber;// 前侧 每联片数
	private double fs_WindArea;// 前侧 每片受风面积
	private double fs_HeavyIce;// 前侧 每片覆冰重
	private double fs_IcingFittings;// 前侧 金具覆冰
	
	private double bs_SLength;// 后侧	串长
	private double bs_SWeight;// 后侧	串重
	private double bs_LinkingNumber;// 后侧	联数
	private double bs_ECNumber;// 后侧	每联片数
	private double bs_WindArea;// 后侧	每片受风面积
	private double bs_HeavyIce;// 后侧	每片覆冰重
	private double bs_IcingFittings;// 后侧	金具覆冰
	
	private double weatherConditions_type;//气象条件组合 -- 类型
	private String weatherConditions_name;//气象条件组合 -- 名称
	
	private double oT_Tension;//过牵引	 过牵引允许张力
	private double oT_length;//过牵引	 过牵引长度
	private double oT_temperature;//过牵引	 过牵引气温
	
	private double safety_Factor;//安全系数
	private double ave_Tension;//平均运行张力百分比
	private double initialElongationCooling;//初伸长降温
	private double calculatedHeight;//计算高度
	private double altitudeHeight;//基准高度
	private String terrainRoughness;//地形粗糙度类别
	
	private double ths_Horizontal;//塔头间距 水平(m)
	private double ths_Vertical;//塔头间距 垂直(m)
	
	
	private double spacingControlType;//导地线间距控制式
	
	private double wireway_cc_fm_j;//导线  求解状态方程  外过(v=0)  fm 值
	private double wireway_cc_fm_k;//导线  求解状态方程  外过 fm 值
	
	
	public double getWireway_cc_fm_k() {
		return wireway_cc_fm_k;
	}
	public void setWireway_cc_fm_k(double wireway_cc_fm_k) {
		this.wireway_cc_fm_k = wireway_cc_fm_k;
	}
	public double getWireway_cc_fm_j() {
		return wireway_cc_fm_j;
	}
	public void setWireway_cc_fm_j(double wireway_cc_fm_j) {
		this.wireway_cc_fm_j = wireway_cc_fm_j;
	}
	public double getSpacingControlType() {
		return spacingControlType;
	}
	public void setSpacingControlType(double spacingControlType) {
		this.spacingControlType = spacingControlType;
	}
	public int getLineType() {
		return lineType;
	}
	public void setLineType(int lineType) {
		this.lineType = lineType;
	}
	
	public String getFs_TowerNumber() {
		return fs_TowerNumber;
	}
	public void setFs_TowerNumber(String fs_TowerNumber) {
		this.fs_TowerNumber = fs_TowerNumber;
	}
	public String getBs_TowerNumber() {
		return bs_TowerNumber;
	}
	public void setBs_TowerNumber(String bs_TowerNumber) {
		this.bs_TowerNumber = bs_TowerNumber;
	}
	public double getSpan() {
		return span;
	}
	public void setSpan(double span) {
		this.span = span;
	}
	public double getHeightDifference() {
		return heightDifference;
	}
	public void setHeightDifference(double heightDifference) {
		this.heightDifference = heightDifference;
	}
	public String getWireType() {
		return wireType;
	}
	public void setWireType(String wireType) {
		this.wireType = wireType;
	}
	public double getSplittingNumber() {
		return splittingNumber;
	}
	public void setSplittingNumber(double splittingNumber) {
		this.splittingNumber = splittingNumber;
	}
	public double getFs_SLength() {
		return fs_SLength;
	}
	public void setFs_SLength(double fs_SLength) {
		this.fs_SLength = fs_SLength;
	}
	public double getFs_SWeight() {
		return fs_SWeight;
	}
	public void setFs_SWeight(double fs_SWeight) {
		this.fs_SWeight = fs_SWeight;
	}
	public double getFs_LinkingNumber() {
		return fs_LinkingNumber;
	}
	public void setFs_LinkingNumber(double fs_LinkingNumber) {
		this.fs_LinkingNumber = fs_LinkingNumber;
	}
	public double getFs_ECNumber() {
		return fs_ECNumber;
	}
	public void setFs_ECNumber(double fs_ECNumber) {
		this.fs_ECNumber = fs_ECNumber;
	}
	public double getFs_WindArea() {
		return fs_WindArea;
	}
	public void setFs_WindArea(double fs_WindArea) {
		this.fs_WindArea = fs_WindArea;
	}
	public double getFs_HeavyIce() {
		return fs_HeavyIce;
	}
	public void setFs_HeavyIce(double fs_HeavyIce) {
		this.fs_HeavyIce = fs_HeavyIce;
	}
	public double getFs_IcingFittings() {
		return fs_IcingFittings;
	}
	public void setFs_IcingFittings(double fs_IcingFittings) {
		this.fs_IcingFittings = fs_IcingFittings;
	}
	public double getBs_SLength() {
		return bs_SLength;
	}
	public void setBs_SLength(double bs_SLength) {
		this.bs_SLength = bs_SLength;
	}
	public double getBs_SWeight() {
		return bs_SWeight;
	}
	public void setBs_SWeight(double bs_SWeight) {
		this.bs_SWeight = bs_SWeight;
	}
	public double getBs_LinkingNumber() {
		return bs_LinkingNumber;
	}
	public void setBs_LinkingNumber(double bs_LinkingNumber) {
		this.bs_LinkingNumber = bs_LinkingNumber;
	}
	public double getBs_ECNumber() {
		return bs_ECNumber;
	}
	public void setBs_ECNumber(double bs_ECNumber) {
		this.bs_ECNumber = bs_ECNumber;
	}
	public double getBs_WindArea() {
		return bs_WindArea;
	}
	public void setBs_WindArea(double bs_WindArea) {
		this.bs_WindArea = bs_WindArea;
	}
	public double getBs_HeavyIce() {
		return bs_HeavyIce;
	}
	public void setBs_HeavyIce(double bs_HeavyIce) {
		this.bs_HeavyIce = bs_HeavyIce;
	}
	public double getBs_IcingFittings() {
		return bs_IcingFittings;
	}
	public void setBs_IcingFittings(double bs_IcingFittings) {
		this.bs_IcingFittings = bs_IcingFittings;
	}
	public double getWeatherConditions_type() {
		return weatherConditions_type;
	}
	public void setWeatherConditions_type(double weatherConditions_type) {
		this.weatherConditions_type = weatherConditions_type;
	}
	public String getWeatherConditions_name() {
		return weatherConditions_name;
	}
	public void setWeatherConditions_name(String weatherConditions_name) {
		this.weatherConditions_name = weatherConditions_name;
	}
	public double getoT_Tension() {
		return oT_Tension;
	}
	public void setoT_Tension(double oT_Tension) {
		this.oT_Tension = oT_Tension;
	}
	public double getoT_length() {
		return oT_length;
	}
	public void setoT_length(double oT_length) {
		this.oT_length = oT_length;
	}
	public double getoT_temperature() {
		return oT_temperature;
	}
	public void setoT_temperature(double oT_temperature) {
		this.oT_temperature = oT_temperature;
	}
	public double getSafety_Factor() {
		return safety_Factor;
	}
	public void setSafety_Factor(double safety_Factor) {
		this.safety_Factor = safety_Factor;
	}
	public double getAve_Tension() {
		return ave_Tension;
	}
	public void setAve_Tension(double ave_Tension) {
		this.ave_Tension = ave_Tension;
	}
	public double getInitialElongationCooling() {
		return initialElongationCooling;
	}
	public void setInitialElongationCooling(double initialElongationCooling) {
		this.initialElongationCooling = initialElongationCooling;
	}
	public double getCalculatedHeight() {
		return calculatedHeight;
	}
	public void setCalculatedHeight(double calculatedHeight) {
		this.calculatedHeight = calculatedHeight;
	}
	public double getAltitudeHeight() {
		return altitudeHeight;
	}
	public void setAltitudeHeight(double altitudeHeight) {
		this.altitudeHeight = altitudeHeight;
	}
	public String getTerrainRoughness() {
		return terrainRoughness;
	}
	public void setTerrainRoughness(String terrainRoughness) {
		this.terrainRoughness = terrainRoughness;
	}
	public double getThs_Horizontal() {
		return ths_Horizontal;
	}
	public void setThs_Horizontal(double ths_Horizontal) {
		this.ths_Horizontal = ths_Horizontal;
	}
	public double getThs_Vertical() {
		return ths_Vertical;
	}
	public void setThs_Vertical(double ths_Vertical) {
		this.ths_Vertical = ths_Vertical;
	}
	
}
