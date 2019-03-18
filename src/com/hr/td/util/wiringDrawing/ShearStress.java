package com.hr.td.util.wiringDrawing;

import com.hr.td.util.wiringDrawing.parameter.CounductorData;
import com.hr.td.util.wiringDrawing.parameter.LineLengthData;
import com.hr.td.util.wiringDrawing.parameter.ProcessData;
import com.hr.td.util.wiringDrawing.parameter.ShearStressData;
import com.hr.td.util.wiringDrawing.parameter.StringLoadData;
import com.hr.td.util.wiringDrawing.vo.InputConditionData;

/**
 * 切应力 计算
 * 
 * @author Administrator
 *
 */
public class ShearStress {
	
	/**
	 * 切应力 计算
	 * @param iData 输入条件
	 * @param pData 过程数据
	 * @param cData 导线参数
	 * @param slData 串荷载
	 * @param llData 线长系数
	 * return 
	 */
	public ShearStressData getShearStress(InputConditionData iData,ProcessData pData,CounductorData cData,StringLoadData slData,LineLengthData llData){
		ShearStressData ssData = new ShearStressData();
		
		ssData.setT1(slData.getGa()/iData.getFs_SLength()/(cData.getS()*iData.getSplittingNumber())/pData.getCosB()*pData.getP0a()*(pData.getP0a()/2+pData.getL1()+pData.getP0b()));
		ssData.setT2(llData.getY()/pData.getCosB()*pData.getL1()*(pData.getL1()/2+pData.getP0b()));
		ssData.setT3(slData.getGb()/iData.getBs_SLength()/(cData.getS()*iData.getSplittingNumber())/pData.getCosB()*pData.getP0b()*(pData.getP0b()/2));
		
		ssData.setTa((ssData.getT1()+ssData.getT2()+ssData.getT3())/iData.getSpan());
		
		return ssData;
	}
	
	
	

}
