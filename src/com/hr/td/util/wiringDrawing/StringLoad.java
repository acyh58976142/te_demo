package com.hr.td.util.wiringDrawing;

import com.hr.td.util.wiringDrawing.parameter.StringLoadData;
import com.hr.td.util.wiringDrawing.parameter.WeatherConditions;
import com.hr.td.util.wiringDrawing.vo.InputConditionData;

/**
 * 计算串荷载
 * @author Administrator
 *
 */
public class StringLoad {
	/**
	 * 计算串荷载
	 * @param iData 输入条件
	 * @param wData 气象条件
	 * @return
	 */
	public StringLoadData getStringLoad(InputConditionData iData,WeatherConditions wData)
	{
		StringLoadData slData = new StringLoadData();
		
		slData.setPIa(getSL_PIa(iData,wData));
		slData.setPIb(getgetSL_PIb(iData,wData));
		
		slData.setGva(getgetSL_Gva(iData,wData));
		slData.setGvb(getgetSL_Gvb(iData,wData));
		
		slData.setGa(Math.pow((Math.pow(slData.getPIa(),2)+Math.pow(slData.getGva(),2)),0.5));
		slData.setGb(Math.pow((Math.pow(slData.getPIb(),2)+Math.pow(slData.getGvb(),2)),0.5));
				
		return slData;
	}
	
	/**
	 * 分步计算 - PIa
	 * @param iData 输入条件
	 * @param wData 气象条件
	 * @return
	 */
	private double getSL_PIa(InputConditionData iData,WeatherConditions wData){
		double snValue = getValueBySplittingNumber(iData.getSplittingNumber());
		
		snValue = 10*(iData.getFs_WindArea()*iData.getFs_ECNumber()+snValue)*iData.getFs_LinkingNumber();
		
		if(iData.getAltitudeHeight()==10){
			double param = getWindSpeedReduced(wData.getWindSpeedConversion(),iData.getTerrainRoughness(),iData.getCalculatedHeight(),iData.getAltitudeHeight());
			double param2 = getIceForPIa(wData.getIceThickness());
			return snValue*Math.pow((wData.getWindSpeed()*param),2)/16*param2;
		}else{
			return snValue*Math.pow(wData.getWindSpeed(),2)/16;
		}
	}
	
	
	/**
	 * 分步计算 - PIb
	 * @param iData 输入条件
	 * @param wData 气象条件
	 * @return
	 */
	private double getgetSL_PIb(InputConditionData iData,WeatherConditions wData){
		
		if(iData.getAltitudeHeight()==10){
			double snValue = getValueBySplittingNumber(iData.getSplittingNumber());
			return 10*(iData.getBs_WindArea()*iData.getBs_ECNumber()+snValue)*iData.getBs_LinkingNumber()*Math.pow(wData.getWindSpeed(),2)/16;
		}else{
			return 0;
		}
	}
	
	/**
	 * 分步计算 - Gva
	 * @param iData 输入条件
	 * @param wData 气象条件
	 * @return
	 */
	private double getgetSL_Gva(InputConditionData iData,WeatherConditions wData)
	{
		///最低气温	平均气温	最大风
		///其他
		
		if(wData.getIceThickness()==0)
		{
			return iData.getFs_SWeight()*9.80665;
		}else{
			if(wData.getWorkingNumber()==1||wData.getWorkingNumber()==2||wData.getWorkingNumber()==3)
			{
				return (iData.getFs_SWeight()+iData.getFs_HeavyIce()*iData.getFs_ECNumber()*iData.getFs_LinkingNumber())*9.80665;
			}else{
				return (iData.getFs_SWeight()+iData.getFs_HeavyIce()*iData.getFs_ECNumber()*iData.getFs_LinkingNumber()+iData.getFs_IcingFittings())*9.80665;
			}
		}
	}
	
	/**
	 * 分步计算 - Gvb
	 * @param iData 输入条件
	 * @param wData 气象条件
	 * @return
	 */
	private double getgetSL_Gvb(InputConditionData iData,WeatherConditions wData)
	{
		if(wData.getIceThickness()==0)
		{
			return iData.getBs_SWeight()*9.80665;
		}else{
			if(wData.getWorkingNumber()==1||wData.getWorkingNumber()==2||wData.getWorkingNumber()==3)
			{
				return (iData.getBs_SWeight()+iData.getBs_HeavyIce()*iData.getBs_ECNumber()*iData.getBs_LinkingNumber())*9.80665;
			}else{
				return (iData.getBs_SWeight()+iData.getBs_HeavyIce()*iData.getBs_ECNumber()*iData.getBs_LinkingNumber()+iData.getBs_IcingFittings())*9.80665;
			}
		}
	}
	
	
	/**
	 * 根据[地形粗糙度类别]获取[风速折算参数]
	 * @param windSpeedReduced 风速折算
	 * @param terrainRoughnessCategory 地形粗糙度类别
	 * @param calculateHeight 计算高度
	 * @param benchmarkHeight 基准高度
	 * 
	 */
	private double getWindSpeedReduced(int windSpeedReduced,String terrainRoughnessCategory,double calculateHeight,double benchmarkHeight)
	{
		if(windSpeedReduced==1){//"√"
			if("A".equals(terrainRoughnessCategory)){
				return 1.379*Math.pow((calculateHeight/benchmarkHeight),0.12);
			}else if("B".equals(terrainRoughnessCategory)){
				return 1*Math.pow((calculateHeight/benchmarkHeight),0.16);
			}else if("C".equals(terrainRoughnessCategory)){
				return 0.616*Math.pow((calculateHeight/benchmarkHeight),0.22);
			}else if("D".equals(terrainRoughnessCategory)){
				return 0.318*Math.pow((calculateHeight/benchmarkHeight),0.3);
			}else{
				return 1;
			}
		}else{
			return 1;
		}
	}
	
	/**
	 * 根据分裂数获取计算参数
	 */
	private double getValueBySplittingNumber(double splittingNumber)
	{
		if(splittingNumber==1)
		{
			return 0.03;
		}else if(splittingNumber==2){
			return 0.04;
		}else if(splittingNumber==3){
			return 0.05;
		}else{
			return 0;
		}
	}
	
	/**
	 * 计算 PIa 获取冰厚参数
	 */
	private double getIceForPIa(double iceValue){
		if(iceValue>=20){
			return 2;
		}else if(20>iceValue&&iceValue>=15){
			return 1.3;
		}else if(15>iceValue&&iceValue>=10){
			return 1.2;
		}else if(10>iceValue&&iceValue>=5){
			return 1.1;
		}else{
			return 1;
		}
	}
	
}
