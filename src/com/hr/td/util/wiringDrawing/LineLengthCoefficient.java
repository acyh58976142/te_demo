package com.hr.td.util.wiringDrawing;
/**
 * 线长系数 计算
 * @author Administrator
 *
 */

import com.hr.td.util.wiringDrawing.parameter.CounductorData;
import com.hr.td.util.wiringDrawing.parameter.LineLengthData;
import com.hr.td.util.wiringDrawing.parameter.ProcessData;
import com.hr.td.util.wiringDrawing.parameter.SpecificLoadData;
import com.hr.td.util.wiringDrawing.parameter.StringLoadData;
import com.hr.td.util.wiringDrawing.vo.InputConditionData;

public class LineLengthCoefficient{

	/**
	 * 线长系数 计算
	 * @param iData 输入条件
	 * @param slData 工程比载实体
	 * @param pData 过程数据
	 * @param cData 导线参数
	 * @param stringLoadData 串荷载
	 * @return
	 */
	public LineLengthData getLineLengthData(InputConditionData iData,SpecificLoadData slData,ProcessData pData,CounductorData cData,StringLoadData stringLoadData){
		LineLengthData llData = new LineLengthData();
		 
		llData.setY(slData.getComprehensive());
		llData.setW1(llData.getY()*pData.getL1()/pData.getCosB());
		llData.setYB(llData.getY()/pData.getCosB());
		
		llData.setKn((Math.pow(llData.getY(),2)*cData.getE()*Math.pow(pData.getCosB(),3)/24)*(pData.getL1()*(pData.getL1()+3*pData.getP0a()+3*pData.getP0b())+(6*stringLoadData.getGa()*pData.getP0a()/(llData.getW1()*cData.getS()*iData.getSplittingNumber()*llData.getYB()))*(llData.getW1()+2*stringLoadData.getGa()/(3*cData.getS()*iData.getSplittingNumber()))+(6*stringLoadData.getGb()*pData.getP0b()/(llData.getW1()*cData.getS()*iData.getSplittingNumber()*llData.getYB()))*(llData.getW1()+2*stringLoadData.getGb()/(3*cData.getS()*iData.getSplittingNumber()))));
		 
		return llData;
	 }
	
	

}
