package com.hr.td.util.wiringDrawing;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.hr.td.util.wiringDrawing.parameter.ControlCondition;
import com.hr.td.util.wiringDrawing.parameter.CounductorData;
import com.hr.td.util.wiringDrawing.parameter.LineLengthData;
import com.hr.td.util.wiringDrawing.parameter.ProcessData;
import com.hr.td.util.wiringDrawing.parameter.SolvingEquationData;
import com.hr.td.util.wiringDrawing.parameter.StringLoadData;
import com.hr.td.util.wiringDrawing.parameter.WDData;
import com.hr.td.util.wiringDrawing.parameter.WeatherConditions;
import com.hr.td.util.wiringDrawing.vo.InputConditionData;

/**
 * 控制工况判断 计算
 * @author Administrator
 *
 */
public class ControlConditionJudgment {

	/**
	 * 
	 * σmax =MIN($E447/$Y440/$E446,$V440/$E446/$F440)
		tn =INDEX($J442:$J457,C465,1)
		F (计算项目不同 方法不同)
			
			控制工况  ---[根据计算结果 获取  -- (计算项) ]    =MATCH(IF(INDEX($B$71:$AI$130,$A613+2,V615)="",IF(MAX(C661:G661)<MIN(J661:K661),MIN(J661:K661),MAX(C661:G661)),MAX(C661:G661)),C661:K661,0)

	 */
	
	/**
	 * 计算控制工况判断 
	 * @param iData 输入参数 
	 * @param ccData 控制工况判
	 * @param wData 气象条件
	 * @param llData 线长系数
	 * @param cData 导线参数
	 * @param pData 过程数据 
	 * @param slData 串荷载
	 * @param seData 求解方程式
	 * @return
	 */
	public ControlCondition getControlCondition(InputConditionData iData,WeatherConditions wData,LineLengthData llData,CounductorData cData,ProcessData pData,StringLoadData slData){
		ControlCondition controlCondition = new ControlCondition();
		
		//σmax =MIN($E447/$Y440/$E446,$V440/$E446/$F440)
		//拉断力/安全系数/计算截面     ,过牵引允许张力/计算截面/分裂数
//		controlCondition.setOmax(Math.min(cData.getTp()/iData.getSafety_Factor()/cData.getS() ,iData.getoT_Tension()/cData.getS()/iData.getSplittingNumber()));
		controlCondition.setOmax(getCC_Omax(iData, wData, cData, pData, llData, slData));
		//tn =INDEX($J442:$J457,C465,1)  //气象条件  温度  温度℃
		controlCondition.setTn(wData.getTemperature());
		
		//F (计算项目不同 方法不同)  1-9   6,7
		//最低气温	平均气温	最大风	覆冰	过牵引	最高气温	安装	"外过 (v=0)"	外过
		controlCondition.setF(getCC_F(iData,controlCondition,wData,llData,cData,pData,slData));

		//控制工况  - 最低气温	平均气温	最大风	覆冰	过牵引	最高气温	安装	"外过(v=0)"	外过	内过电压	5m/s风速	地线+5	三跨导线	三跨地线		验算5
		//=INDEX(C555:K555,1,D573)
		
		//=MATCH(IF(INDEX($B$71:$AI$130,$A524+1,V526)="",IF(MAX(C572:G572)<MIN(J572:K572),MIN(J572:K572),MAX(C572:G572)),MAX(C572:G572)),C572:K572,0)
		//MATCH （F 中 最大值 ，f第一个值）
		
		
		return controlCondition;
	}
	
	/**
	 * 控制工况 判断 -- 需要前面计算结束
	 */
	public List<WDData> getControlConditionTypeAndValue(InputConditionData iData,List<WDData> wdDataArray){
		//控制工况  - 最低气温	平均气温	最大风	覆冰	过牵引	最高气温	安装	"外过(v=0)"	外过	内过电压	5m/s风速	地线+5	三跨导线	三跨地线		验算5
		//=INDEX(C555:K555,1,D573) //名称
				
		//=MATCH(IF(INDEX($B$71:$AI$130,$A524+1,V526)="",IF(MAX(C572:G572)<MIN(J572:K572),MIN(J572:K572),MAX(C572:G572)),MAX(C572:G572)),C572:K572,0)
		//MATCH （F 中 最大值 ，f第一个值） -- f最大值 对应工况序号
		
		//允许张力  不为空   取最大值
		
		
		//最低气温	平均气温	最大风	覆冰	过牵引  取最大值    1-5  -- 地线判断
		//"外过(v=0)"	外过  取最小值  8 9 

		//两个值取最大的序号和 名字
		
		try{
			int count=0;
//			double tempValue = wdDataArray.get(0).getControlConditionData().getF();
			double tempValue = wdDataArray.get(0).getControlConditionData().getOmax();
			for(int i=1;i<5;i++){
				if(tempValue<wdDataArray.get(i).getControlConditionData().getOmax())
				{
					tempValue = wdDataArray.get(i).getControlConditionData().getOmax();
					count = i;
				}
			}

			if(iData.getLineType()==1){
				int count2 = 7;
				double tempValue2=0;
				if(wdDataArray.get(7).getControlConditionData().getOmax()!=0||wdDataArray.get(8).getControlConditionData().getOmax()!=0){
					if(wdDataArray.get(7).getControlConditionData().getOmax()<=wdDataArray.get(8).getControlConditionData().getOmax())
					{
						tempValue2 = wdDataArray.get(7).getControlConditionData().getOmax();
					}else{
						tempValue2 = wdDataArray.get(8).getControlConditionData().getOmax();
						count2 = 8;
					}
				}
				
				if(tempValue2!=0&&tempValue2<tempValue)
				{
					count = count2;
				}
			}
			//Km --[固定取值] 根据 [控制工况 计算项结果] 取   Kn 中的值 (顺序序号)
			//σm --[固定取值] 根据 [控制工况 计算项结果] 取 σmax 中的值 (顺序序号)
			//tm --[固定取值] 根据 [控制工况 计算项结果] 取 tn 中的值 (顺序序号)
			for (WDData wdData : wdDataArray) {
				wdData.getControlConditionData().setControlConditionType(wdDataArray.get(count).getWeatherConditions().getWorkingName());
				wdData.getControlConditionData().setControlConditionValue(wdDataArray.get(count).getWeatherConditions().getWorkingNumber());
				wdData.getControlConditionData().setKm(wdDataArray.get(count).getLineLengthData().getKn());
				wdData.getControlConditionData().setOm(wdDataArray.get(count).getControlConditionData().getOmax());
				wdData.getControlConditionData().setTm(wdDataArray.get(count).getControlConditionData().getTn());
			}
			
		}catch(Exception e){
			System.out.println("ControlConditionJudgment 控制工况 判断 出错:");
			e.printStackTrace();
		}
		
		return wdDataArray;
	}
	
	
	
	
	/**
	 * 分步计算 f 
	 * 根据工况类型 进行不同计算
	 * @param iData 输入参数 
	 * @param ccData 控制工况判
	 * @param wData 气象条件
	 * @param llData 线长系数
	 * @param cData 导线参数
	 * @param pData 过程数据 
	 * @param slData 串荷载
	 * @return
	 */
	private double getCC_F(InputConditionData iData,ControlCondition ccData,WeatherConditions wData,LineLengthData llData,CounductorData cData,ProcessData pData,StringLoadData slData){
		double f = 0;
		try{
			//F (计算项目不同 方法不同) //工程讯号
			if(wData.getWorkingNumber()==1||wData.getWorkingNumber()==2||wData.getWorkingNumber()==3||wData.getWorkingNumber()==4){
				//1-4  最低气温	平均气温	最大风	   覆冰
				//=C476/C481^2-(C481+$E443*$E442*$G459*C482)
				//线长系数KN/σmax^2 - (σmax + 线膨胀系数*弹性系数*cosβ*tn)
				f = llData.getKn()/Math.pow(ccData.getOmax(),2)-(ccData.getOmax()+cData.getA()*cData.getE()*pData.getCosB()*ccData.getTn());
				
			}else if(wData.getWorkingNumber()==5){
				//5 过牵引
				//=G565/G570^2-(G570+$E532*$E531*$G548*G571-W529*E531*G548^2/J548)
//				= 线长系数KN/σmax^2-(σmax + 线膨胀系数*弹性系数*cosβ*tn  - 过牵引长度*弹性系数*cosβ^2/l1);
				f = llData.getKn()/Math.pow(ccData.getOmax(),2)-(ccData.getOmax()+cData.getA()*cData.getE()*pData.getCosB()*ccData.getTn()-iData.getoT_length()*cData.getE()*Math.pow(pData.getCosB(),2)/pData.getL1());
			}else if(iData.getLineType()==1&&wData.getWorkingNumber()==8){
				//8  外过 (v=0)  --只有地线计算
				//=J565/J570^2-(J570+$E532*$E531*$G548*J571)
				f = llData.getKn()/Math.pow(ccData.getOmax(),2)-(ccData.getOmax()+cData.getA()*cData.getE()*pData.getCosB()*ccData.getTn());
			}else if(iData.getLineType()==1&&wData.getWorkingNumber()==9){
				//9  外过  --只有地线计算
				//=J565/J570^2-(J570+$E532*$E531*$G548*J571)
				f = llData.getKn()/Math.pow(ccData.getOmax(),2)-(ccData.getOmax()+cData.getA()*cData.getE()*pData.getCosB()*ccData.getTn());
			}
		}catch(Exception e){
			System.out.println("ControlConditionJudgment 控制工况判断 计算 f 出错:");
			e.printStackTrace();
		}
		
		return f;
	}
	
	/**
	 * 分步计算 Omax
	 * 根据工况类型 进行不同计算 
	 * -最低气温	平均气温	最大风	覆冰	过牵引  取最大值    1-5  -- 导线线判断
	 * 外过(v=0)"	外过  取最小值  8 9  -- 地线判断
	 * @param iData
	 * @param wData 气象条件
	 * @param cData 导线参数
	 * @return
	 */
	private double getCC_Omax(InputConditionData iData,WeatherConditions wData,CounductorData cData,ProcessData pData,LineLengthData llData,StringLoadData slData){
		double omax=1;
		try{
			if(wData.getWorkingNumber()==1||wData.getWorkingNumber()==3||wData.getWorkingNumber()==4){
//				1 3 4 =MIN($E536/$Y529/$E535,$V529/$E535/$F529)
				omax = Math.min(cData.getTp()/iData.getSafety_Factor()/cData.getS() ,iData.getoT_Tension()/cData.getS()/iData.getSplittingNumber());
				
			}else if(wData.getWorkingNumber()==2){
//				2=MIN($E536*$Z529/$E535,$V529/$E535/$F529)   //Z529  平均运行张力百分比
				omax = Math.min(cData.getTp()*iData.getAve_Tension()/cData.getS() ,iData.getoT_Tension()/cData.getS()/iData.getSplittingNumber());
			}else if(wData.getWorkingNumber()==5){
//				5=$V529/$E535/$F529
				omax = iData.getoT_Tension()/cData.getS()/iData.getSplittingNumber();
			}else if(iData.getLineType()==1&&wData.getWorkingNumber()==8){
				if(iData.getLineType()==1){
//					7=(J562*C529^2/8+(J560/(G529*E535*F529)-J562)*H548^2/4+(J561/(N529*E535*F529)-J562)*I548^2/4)/((J495-MAX(0,MAX(0,(AG592*C529+1)^2-AE529^2)^0.5-AF529))*G548)
					omax=(llData.getY()*Math.pow(iData.getSpan(),2)/8+(slData.getGa()/(iData.getFs_SLength()*cData.getS()*iData.getSplittingNumber())-llData.getY())*Math.pow(pData.getP0a(),2)/4+(slData.getGb()/(iData.getBs_SLength()*cData.getS()*iData.getSplittingNumber())-llData.getY())*Math.pow(pData.getP0b(),2)/4)/((iData.getWireway_cc_fm_j()-Math.max(0,Math.pow(Math.max(0,Math.pow((iData.getSpacingControlType()*iData.getSpan()+1),2)-Math.pow(iData.getThs_Horizontal(),2)),0.5)-iData.getThs_Vertical()))*pData.getCosB());
				}
			}else if(iData.getLineType()==1&&wData.getWorkingNumber()==9){
				if(iData.getLineType()==1){
//					8=1/(K495*G548)*(K562*C529^2/8+(K560/(G529*E535)-K562)*I548^2/4+(K561/(N529*E535)-K562)*I548^2/4)
					omax = 1/(iData.getWireway_cc_fm_k()*pData.getCosB())*(llData.getY()*Math.pow(iData.getSpan(),2)/8+(slData.getGa()/(iData.getFs_SLength()*cData.getS())-llData.getY())*Math.pow(pData.getP0b(),2)/4+(slData.getGb()/(iData.getBs_SLength()*cData.getS())-llData.getY())*Math.pow(pData.getP0b(),2)/4);
				}
			}
			
		}catch(Exception e){
			e.printStackTrace();
		}
		return omax;
	}
	
	
	
}
