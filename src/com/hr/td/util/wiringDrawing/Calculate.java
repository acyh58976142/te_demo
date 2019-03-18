package com.hr.td.util.wiringDrawing;
/**
 * 架线施工图
 * @author Administrator
 *
 */

import java.util.ArrayList;
import java.util.List;

import com.hr.td.util.wiringDrawing.parameter.CounductorData;
import com.hr.td.util.wiringDrawing.parameter.LineLengthData;
import com.hr.td.util.wiringDrawing.parameter.OLSBeCompleted;
import com.hr.td.util.wiringDrawing.parameter.OLSConstruction;
import com.hr.td.util.wiringDrawing.parameter.ProcessData;
import com.hr.td.util.wiringDrawing.parameter.ShearStressData;
import com.hr.td.util.wiringDrawing.parameter.SolvingEquationData;
import com.hr.td.util.wiringDrawing.parameter.SpecificLoadData;
import com.hr.td.util.wiringDrawing.parameter.StringLoadData;
import com.hr.td.util.wiringDrawing.parameter.WDData;
import com.hr.td.util.wiringDrawing.parameter.WeatherConditions;
import com.hr.td.util.wiringDrawing.vo.InputConditionData;
import com.hr.td.util.wiringDrawing.vo.OutputOSagTable;


public class Calculate {
	/**
	 * 计算类 
	 * 过程数据 
	 */
	private static Process process=new Process();
	
	/**
	 * 计算类 
	 * 计算比载
	 */
	private static SpecificLoad specificLoad = new SpecificLoad();
	
	/**
	 * 计算类 
	 * 计算串荷载
	 */
	private static StringLoad stringLoad = new StringLoad();
	
	/**
	 * 计算类 
	 * 计算线长系数
	 */
	private static LineLengthCoefficient lineLengthCoefficient = new LineLengthCoefficient();
		
	/**
	 * 计算类 
	 * 计算切应力
	 */
	private static ShearStress shearStress = new ShearStress();
	
	/**
	 * 计算类 
	 * 计算控制工况判断 ControlConditionJudgment
	 */
	private static ControlConditionJudgment controlConditionJudgment = new ControlConditionJudgment();
	
	/**
	 * 计算类 
	 * 计算求解状态方程   SolvingEquationOfState
	 */
	private static SolvingEquationOfState solvingEquationOfState = new SolvingEquationOfState();
	
	/**
	 * 计算类 
	 * 架线弧垂(施工)
	 */
	private static OverheadLineSagConstruction oLSConstruction = new OverheadLineSagConstruction();
	
	/**
	 * 计算类 
	 * 架线弧垂(竣工)
	 */
	private static OverheadLineSagBeCompleted oLSBeCompleted = new OverheadLineSagBeCompleted();
	
	/**
	 * 
	 * @param iData 输入条件
	 * @param cData 导线参数
	 * @param paramArray 气象条件(数组 包含过牵引  顺序固定)
	 * @return
	 */
	public static List<OutputOSagTable> getOutputOSagTableArray(InputConditionData iData,CounductorData cData,List<WeatherConditions> paramArray){
		List<WDData> wdDataArray = new ArrayList<WDData>();
		//过程数据
		ProcessData pData = process.getProcessData(iData);
		for (WeatherConditions wData : paramArray) {
			//比载
			SpecificLoadData slData = specificLoad.getSpecificLoadData(iData, wData, cData);
			
			//串荷载
			StringLoadData stringLoadData = stringLoad.getStringLoad(iData, wData);
			
			//线长系数
			LineLengthData llData = lineLengthCoefficient.getLineLengthData(iData, slData, pData, cData, stringLoadData);
			
			//切应力
			ShearStressData ssData = shearStress.getShearStress(iData, pData, cData, stringLoadData, llData);
			
			WDData wdData = new WDData();
			wdData.setProcessData(pData);
			wdData.setWeatherConditions(wData);
			wdData.setSpecificLoadData(slData);//工况比载实体类
			wdData.setStringLoadData(stringLoadData); //串荷载 实体类
			wdData.setLineLengthData(llData);//线长系数
			wdData.setShearStressData(ssData);//切应力
			
			wdDataArray.add(wdData);
		}
		
		//2 - 计算控制工况  (循环所有工况)
		for (WDData wdData : wdDataArray) {
			wdData.setControlConditionData(controlConditionJudgment.getControlCondition(iData, wdData.getWeatherConditions(), wdData.getLineLengthData(), cData, wdData.getProcessData(), wdData.getStringLoadData()));
		}
		
		//3 - 判断工况  (1,2循环计算完成后 进行 判断  循环内每个附同样的值)
		wdDataArray = controlConditionJudgment.getControlConditionTypeAndValue(iData,wdDataArray);
		
		//4 - 计算求解状态方程  (循环计算结果)
		for (WDData wdData : wdDataArray) {
			SolvingEquationData seData = solvingEquationOfState.getSolvingEquationData(iData, cData, wdData.getControlConditionData(), wdData.getProcessData(), wdData.getWeatherConditions(), wdData.getLineLengthData(), wdData.getStringLoadData());
			wdData.setSolvingEquationData(seData);//求解状态方程参数
			
			//导线计算 - 需要取出状态方程式中  F 外过(v=0) 和 外过 的值
			if(0==iData.getLineType()){
				if(8==wdData.getWeatherConditions().getWorkingNumber())
				{
					iData.setWireway_cc_fm_j(seData.getFm());
					
				}else if(9==wdData.getWeatherConditions().getWorkingNumber())
				{
					iData.setWireway_cc_fm_k(seData.getFm());
				}
			}
		}
		
		systemMassage(wdDataArray);
		
		//5 -   计算架线弧垂(施工)  计算架线弧垂(竣工) --循环指定
		int[] t = new int[]{-20,-10,0,10,20,30,40};
		String[] c_str = new String[7]; 
		String[] bc_str = new String[7];
		for(int i=0; i<t.length; i++)
		{
			OLSConstruction olsc = oLSConstruction.getOLSConstruction(iData, cData, wdDataArray.get(0).getProcessData(), wdDataArray.get(0).getSolvingEquationData(), wdDataArray.get(0).getControlConditionData(),t[i]);
			//架线弧垂 - 施工 实体
			c_str[i] = olsc.getF();
			
			OLSBeCompleted olsbc = oLSBeCompleted.getOLSBeCompleted(iData, cData, wdDataArray.get(0).getProcessData(), wdDataArray.get(0).getSolvingEquationData(), olsc);
			//架线弧垂 - 竣工 实体
			bc_str[i] = olsbc.getF();
		}
		

		
		//6 - 施工结果 
		OutputOSagTable ols_Data = new OutputOSagTable();
		ols_Data.setLsolatedFileName(iData.getFs_TowerNumber()+"~"+iData.getBs_TowerNumber());
		ols_Data.setSpan(iData.getSpan()+"");//档距(m)	
		ols_Data.setWireModel(iData.getWireType());//电线型号	
		ols_Data.setLowerTemperature(iData.getInitialElongationCooling()+"");//初伸长降温值(℃)
		ols_Data.setOverTraction(iData.getoT_length()+"");//过牵引最大允许值(m)
		
		ols_Data.setnT20(c_str[0]);
		ols_Data.setnT10(c_str[1]);
		ols_Data.setpT0(c_str[2]);	
		ols_Data.setpT10(c_str[3]);
		ols_Data.setpT20(c_str[4]);
		ols_Data.setpT30(c_str[5]);
		ols_Data.setpT40(c_str[6]);	
		
		ols_Data.setWireway_cc_fm_j(iData.getWireway_cc_fm_j());
		ols_Data.setWireway_cc_fm_k(iData.getWireway_cc_fm_k());
		
		//竣工结果
		OutputOSagTable olsbcData = new OutputOSagTable();
		olsbcData.setLsolatedFileName(iData.getFs_TowerNumber()+"~"+iData.getBs_TowerNumber());
		olsbcData.setSpan(iData.getSpan()+"");//档距(m)	
		olsbcData.setWireModel(iData.getWireType());//电线型号	
		olsbcData.setLowerTemperature(iData.getInitialElongationCooling()+"");//初伸长降温值(℃)
		olsbcData.setOverTraction(iData.getoT_length()+"");//过牵引最大允许值(m)
		
		olsbcData.setnT20(bc_str[0]);
		olsbcData.setnT10(bc_str[1]);
		olsbcData.setpT0(bc_str[2]);	
		olsbcData.setpT10(bc_str[3]);
		olsbcData.setpT20(bc_str[4]);
		olsbcData.setpT30(bc_str[5]);
		olsbcData.setpT40(bc_str[6]);
		
		olsbcData.setWireway_cc_fm_j(iData.getWireway_cc_fm_j());
		olsbcData.setWireway_cc_fm_k(iData.getWireway_cc_fm_k());
		
		List<OutputOSagTable> oSTArray = new ArrayList<OutputOSagTable>();
		oSTArray.add(ols_Data);
		oSTArray.add(olsbcData);
		
		systemMassage2(oSTArray);
		
		//6 - 返回所有计算结果
		return oSTArray;
	}
	
	
	public static void main(String[] arg){
		//计算参数准备
		TestParam testParam = new TestParam();
		//入参整理  -- 输入条件
		InputConditionData iData = testParam.getInputConditionData();
		
		//准备计算参数整理 -- 导线参数  气象条件
		CounductorData cData = testParam.getCounductorData();
		
		//气象条件
		List<WeatherConditions> paramArray = testParam.getWeatherConditions();
		
		//保存结果数组
		List<OutputOSagTable> ostArray = getOutputOSagTableArray(iData, cData, paramArray);
		
		systemMassage2(ostArray);
	}
	
	private static void systemMassage2(List<OutputOSagTable> ostArray) {
		System.out.println("-----------------------");
		System.out.println("孤立档名称	档距(m) 架线弧垂(m)-20  架线弧垂(m)-10  架线弧垂(m)0  架线弧垂(m)10  架线弧垂(m)20  架线弧垂(m)30    架线弧垂(m)40  初伸长降温值(℃) 过牵引最大允许值(m) 导线计算过程参数    导线计算过程参数2");
		for(OutputOSagTable oot: ostArray){
			System.out.print(oot.getLsolatedFileName());System.out.print("  ");	
			System.out.print(oot.getSpan());System.out.print("  ");
			System.out.print(oot.getWireModel());System.out.print("  ");
			System.out.print(oot.getnT20());System.out.print("  ");
			System.out.print(oot.getnT10());System.out.print("  ");
			System.out.print(oot.getpT0());System.out.print("  ");
			System.out.print(oot.getpT10());System.out.print("  ");
			System.out.print(oot.getpT20());System.out.print("  ");
			System.out.print(oot.getpT30());System.out.print("  ");
			System.out.print(oot.getpT40());System.out.print("  ");
			System.out.print(oot.getLowerTemperature());System.out.print("  ");
			System.out.print(oot.getOverTraction());System.out.print("  ");
			System.out.print(oot.getWireway_cc_fm_j());System.out.print("  ");
			System.out.println(oot.getWireway_cc_fm_k());System.out.print("  ");
			System.out.println("-----------------------");
		}
		System.out.println("-----------------------");
		
	}
	
	private static void systemMassage(List<WDData> wdDataArray){
		//计算结束 提取结果  -- wdDataArray
		System.out.println("工况序号	工况	垂直比载	水平比载	综合比载");
		for (WDData wdData :wdDataArray)
		{
			System.out.println(wdData.getWeatherConditions().getWorkingNumber()+"--"+wdData.getWeatherConditions().getWorkingName()+"--"+wdData.getSpecificLoadData().getVertical() + "--" + wdData.getSpecificLoadData().getHorizontal() + "--" +wdData.getSpecificLoadData().getComprehensive());
		}
		System.out.println("-----------------------");
		
		//"频繁调用过程数据"
		System.out.println("cosβ λ0a λ0b l1");
		System.out.println(wdDataArray.get(0).getProcessData().getCosB()+" "+wdDataArray.get(0).getProcessData().getP0a()+" "+wdDataArray.get(0).getProcessData().getP0b()+" "+wdDataArray.get(0).getProcessData().getL1());
		System.out.println("-----------------------");
		
		
		System.out.println("串荷载");
		System.out.println("串荷载    最低气温   平均气温	  最大风   覆冰	   过牵引   最高气温  安装  外过(v=0)  外过   内过电压    5m/s风速   地线+5   三跨导线    三跨地线   验算4    验算5");
		System.out.print("PIa");
		for(WDData wdData :wdDataArray){
			System.out.print(" "+wdData.getStringLoadData().getPIa());
		}
		System.out.println("");
		
		System.out.print("PIb");
		for(WDData wdData :wdDataArray){
			System.out.print(" "+wdData.getStringLoadData().getPIb());
		}
		System.out.println("");
		
		System.out.print("Gva");
		for(WDData wdData :wdDataArray){
			System.out.print(" "+wdData.getStringLoadData().getGva());
		}
		System.out.println("");
		
		System.out.print("Gvb");
		for(WDData wdData :wdDataArray){
			System.out.print(" "+wdData.getStringLoadData().getGvb());
		}
		System.out.println("");
		
		System.out.print("Ga");
		for(WDData wdData :wdDataArray){
			System.out.print(" "+wdData.getStringLoadData().getGa());
		}
		System.out.println("");
		
		System.out.print("Gb");
		for(WDData wdData :wdDataArray){
			System.out.print(" "+wdData.getStringLoadData().getGb());
		}
		System.out.println("");
		
		System.out.println("-----------------------");
		
		
		System.out.print("Gb");
		for(WDData wdData :wdDataArray){
			System.out.print(" "+wdData.getStringLoadData().getGb());
		}
		System.out.println("");
		
	}
	
	
}
