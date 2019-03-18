package com.hr.td.util.wiringDrawing;

import com.hr.td.util.wiringDrawing.parameter.ProcessData;
import com.hr.td.util.wiringDrawing.vo.InputConditionData;

/**
 * 过程数据 
 * @author Administrator
 *
 */
public class Process {
	
	/**
	 * 计算过程数据 
	 * @param iData 输入条件
	 * @return
	 */
	public ProcessData getProcessData(InputConditionData iData){
		ProcessData processData=new ProcessData();
		processData.setCosB(getCosB(iData.getSpan(),iData.getHeightDifference()));
		processData.setP0a(get0a(iData.getFs_SLength(),processData.getCosB()));
		processData.setP0b(get0b(iData.getBs_SLength(),processData.getCosB()));
		processData.setL1(getl1(iData.getSpan(),processData.getP0a(),processData.getP0b()));
		return processData;
	}
	
	
	/**
	 * 获取cosβ
	 * cosβ = 档距/(档距^2+挂线点高差^2)^0.5
	 * @param span 档距
	 * @param difference 挂线点高差
	 * @return
	 */
	private double getCosB(double span,double difference){
		return span/Math.pow((Math.pow(span,2)+Math.pow(difference,2)),0.5);
	}
	
	/**
	 * 获取λ0a
	 * λ0a = 前侧串长 * cosβ
	 * @param frontSideLength 前侧串长
	 * @param cosB
	 * @return
	 */
	private double get0a(double frontSideLength,double cosB){
		return frontSideLength*cosB;
	}
	
	/**
	 * 获取λ0b
	 * λ0b = 后侧串长 * cosβ
	 * @param rearSideLength 后侧串长
	 * @param cosB
	 * @return
	 */
	private double get0b(double rearSideLength,double cosB){
		return rearSideLength*cosB;
	}
	
	/**
	 * 获取l1
	 * l1 = 档距 - λ0a - λ0b
	 * @param span 档距
	 * @param p0a λ0a 
	 * @param p0b λ0b 
	 * @return
	 */
	private double getl1(double span,double p0a,double p0b){
		return span-p0a-p0b;
	}
}
