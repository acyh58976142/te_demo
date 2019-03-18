package com.hr.td.util.wiringDrawing.parameter;
/**
 * 导线参数  来源   【导地线参数】配置参数
 */
public class CounductorData {
	
	private double E;//E 根据  电线型号  -(导地线参数)- 获取   弹性模量
	private double A;//α 根据  电线型号  -(导地线参数)- 获取   温度膨胀系数
	private double W;//W 根据  电线型号  -(导地线参数)- 获取  单位重量
	private double D;//d 根据  电线型号  -(导地线参数)- 获取  直径  外径
	private double S;//S 根据  电线型号  -(导地线参数)- 获取  截面积
	private double Tp;//Tp 根据  电线型号  -(导地线参数)- 获取  保证拉断力
	
	
	public double getE() {
		return E;
	}
	public void setE(double e) {
		E = e;
	}
	public double getA() {
		return A;
	}
	public void setA(double a) {
		A = a;
	}
	public double getW() {
		return W;
	}
	public void setW(double w) {
		W = w;
	}
	public double getD() {
		return D;
	}
	public void setD(double d) {
		D = d;
	}
	public double getS() {
		return S;
	}
	public void setS(double s) {
		S = s;
	}
	public double getTp() {
		return Tp;
	}
	public void setTp(double tp) {
		Tp = tp;
	}
	
}
