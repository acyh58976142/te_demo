package com.hr.td.util.wiringDrawing;

import com.hr.td.util.wiringDrawing.parameter.CounductorData;
import com.hr.td.util.wiringDrawing.parameter.SpecificLoadData;
import com.hr.td.util.wiringDrawing.parameter.WeatherConditions;
import com.hr.td.util.wiringDrawing.vo.InputConditionData;

/**
 * 工况比载计算
 * 
 * @author Administrator
 *
 */
public class SpecificLoad {
	
	/**
	 * @param iData 输入条件
	 * @param wData气象条件
	 * @param cData 导线参数
	 * @return
	 */
	public SpecificLoadData getSpecificLoadData(InputConditionData iData,WeatherConditions wData, CounductorData cData){
		SpecificLoadData slData = new SpecificLoadData();
		 
		slData.setVertical(getVertical(cData.getW(),wData.getIceThickness(),cData.getD(),cData.getS()));
		slData.setHorizontal(getHorizontal(iData.getAltitudeHeight(),wData.getWindSpeed(),wData.getWindSpeedConversion(),iData.getTerrainRoughness(),iData.getCalculatedHeight(),wData.getIceThickness(),cData.getD(),cData.getS()));
		slData.setComprehensive(getComprehensive(slData.getVertical(),slData.getHorizontal()));
		
		return slData;
	}
	
	/***
	 * 综合比载  (垂直比载^2+水平比载^2)^0.5
	 * @param vertical 垂直比载 
	 * @param horizontal 水平比载
	 */
	private double getComprehensive(double vertical,double horizontal){
		return Math.pow(Math.pow(vertical,2)+Math.pow(horizontal,2),0.5);
	}
	
	
	/**
	 * 垂直比载    (9.80665*单位长度重量+9.80665*0.9*PI()*冰厚*(外径+冰厚)/1000)/计算截面
	 * @param w 单位长度重量
	 * @param ice 冰厚
	 * @param outerDiameter 外径
	 * @param section 计算截面
	 */
	private double getVertical(double w,double ice,double outerDiameter,double section){
		return (9.80665*w+9.80665*0.9*Math.PI*ice*(outerDiameter+ice)/1000)/section;
	}
	
	
	/**
	 * 水平比载
	 * @param benchmarkHeight 基准高度
	 * @param windSpeed 风速
	 * @param windSpeedReduced 风速折算
	 * @param terrainRoughnessCategory 地形粗糙度类别
	 * @param calculateHeight 计算高度
	 * @param ice 冰厚
	 * @param outerDiameter 外径
	 * @param section 计算截面
	 */
	private double getHorizontal(double benchmarkHeight,double windSpeed,int windSpeedReduced,String terrainRoughnessCategory,double calculateHeight,double ice,double outerDiameter,double section){
		double param1 = 1;
		double param2 = 1.1;
		
		double wSpeed = 0.7;//getWindSpeed(windSpeed);
		double wSpeedReduced = 1;
		
		if(benchmarkHeight == 10){
			if(windSpeed<20){
				wSpeed = 1;
			}else if(20<=windSpeed&&windSpeed<27){
				wSpeed = 0.85; 
			}else if(27<=windSpeed&&windSpeed<31.5){
				wSpeed = 0.75;
			}
			wSpeedReduced = getWindSpeedReduced(windSpeedReduced,terrainRoughnessCategory,calculateHeight,benchmarkHeight); 
			double p33 = getIce(ice);
			param1 = wSpeed*wSpeedReduced*p33;
		}else if(benchmarkHeight == 15){
			wSpeed = getWindSpeed(windSpeed);
			if(windSpeedReduced==1){//"√"
				wSpeedReduced = Math.pow(calculateHeight/benchmarkHeight,0.32);
			}else{
				wSpeedReduced = 1;
			}
			param1 = 0.980665* wSpeed * wSpeedReduced; 	 
		}
		 
		if(outerDiameter<17||ice>0){
			param2 = 1.2;
		}	
		
		return param1*(Math.pow(windSpeed,2)/1.6)*param2*(outerDiameter+2*ice)/(1000*section);
	}
	
	/**
	 * 根据风速获取计算参数
	 * @param windSpeed 风速
	 * @return
	 */
	private double getWindSpeed(double windSpeed)
	{
		if(windSpeed<20){
			return 1;
		}else if(20<=windSpeed&&windSpeed<30){
			return 0.85; 
		}else if(30<=windSpeed&&windSpeed<35){
			return 0.75;
		}else{
			return 0.7;
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
				return 1.379*Math.pow((calculateHeight/benchmarkHeight),0.24);
			}else if("B".equals(terrainRoughnessCategory)){
				return 1*Math.pow((calculateHeight/benchmarkHeight),0.32);
			}else if("C".equals(terrainRoughnessCategory)){
				return 0.616*Math.pow((calculateHeight/benchmarkHeight),0.44);
			}else if("D".equals(terrainRoughnessCategory)){
				return 0.318*Math.pow((calculateHeight/benchmarkHeight),0.6);
			}else{
				return 1;
			}
		}else{
			return 1;
		}
	}
	
	/**
	 * 根据冰厚获取计算参数
	 * @param ice 冰厚
	 */
	private double getIce(double ice){
		if(ice>=20){
			return 2;
		}else if(ice>=15&&ice<20){
			return 1.3;
		}else if(ice>=10&&ice<15){
			return 1.2;
		}else if(ice>=5&&ice<10){
			return 1.1;
		}else{
			return 1;
		}
	}
}
