package com.hr.td.util.wiringDrawing.parameter;
/**
 * 求解状态方程  实体类
 * @author Administrator
 *
 */
public class SolvingEquationData {
	private double Km;//Km;
	private double om;//σm;
	private double tm;
	private double a;
	private double b;
	private double A;
	private double C;
	private double delta;//Δ;
	private double on;//σn;
	private double T;
	private double fm;
	
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
	public double geta() {
		return a;
	}
	public void seta(double a) {
		this.a = a;
	}
	public double getB() {
		return b;
	}
	public void setB(double b) {
		this.b = b;
	}
	public double getA() {
		return A;
	}
	public void setA(double a) {
		A = a;
	}
	public double getC() {
		return C;
	}
	public void setC(double c) {
		C = c;
	}
	public double getDelta() {
		return delta;
	}
	public void setDelta(double delta) {
		this.delta = delta;
	}
	public double getOn() {
		return on;
	}
	public void setOn(double on) {
		this.on = on;
	}
	public double getT() {
		return T;
	}
	public void setT(double t) {
		T = t;
	}
	public double getFm() {
		return fm;
	}
	public void setFm(double fm) {
		this.fm = fm;
	}

}
