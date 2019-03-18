package com.hr.td.util.wiringDrawing.parameter;
/**
 * 架线弧垂 - 竣工 实体
 * @author Administrator
 *
 */
public class OLSBeCompleted {
	private double W1;//W1;
	private double vB;//γβ;
	private double b;
	private double delta;//Δ;
	private double on;//σn;
	private String f;
	
	public double getW1() {
		return W1;
	}
	public void setW1(double w1) {
		W1 = w1;
	}
	public double getvB() {
		return vB;
	}
	public void setvB(double vB) {
		this.vB = vB;
	}
	public double getB() {
		return b;
	}
	public void setB(double b) {
		this.b = b;
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
	public String getF() {
		return f;
	}
	public void setF(String f) {
		this.f = f;
	}
}
