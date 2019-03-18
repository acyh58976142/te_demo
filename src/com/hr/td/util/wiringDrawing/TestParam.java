package com.hr.td.util.wiringDrawing;

import java.util.ArrayList;
import java.util.List;

import com.hr.td.util.wiringDrawing.parameter.CounductorData;
import com.hr.td.util.wiringDrawing.parameter.WeatherConditions;
import com.hr.td.util.wiringDrawing.vo.InputConditionData;

/**
 * 测试参数
 * @author Administrator
 *
 */
public class TestParam {
	
	public InputConditionData getInputConditionData(){
		String fs_TowerNumber="#3";// 前侧塔号
		String bs_TowerNumber="#4";// 后侧塔号
		double span=55;// 档距
		int lineType = 0;//电线类型  -  0-导线   1-地线
		double heightDifference=1;// 挂线点高差
		String wireType="GJ-35";// 电线型号
		double splittingNumber=2;// 分裂数	
		
		double fs_SLength=1;// 前侧串长
		double fs_SWeight=1;// 前侧串重
		double fs_LinkingNumber=1;// 前侧 联数
		double fs_ECNumber=1;// 前侧 每联片数
		double fs_WindArea=1;// 前侧 每片受风面积
		double fs_HeavyIce=1;// 前侧 每片覆冰重
		double fs_IcingFittings=1;// 前侧 金具覆冰
		
		double bs_SLength=1;// 后侧	串长
		double bs_SWeight=1;// 后侧	串重
		double bs_LinkingNumber=1;// 后侧	联数
		double bs_ECNumber=1;// 后侧	每联片数
		double bs_WindArea=1;// 后侧	每片受风面积
		double bs_HeavyIce=1;// 后侧	每片覆冰重
		double bs_IcingFittings=1;// 后侧	金具覆冰
		
		double weatherConditions_type=1;//气象条件组合 -- 类型
		String weatherConditions_name="组合4";//气象条件组合 -- 名称
		
		double oT_Tension=1;//过牵引	 过牵引允许张力
		double oT_length=1;//过牵引	 过牵引长度
		double oT_temperature=1;//过牵引	 过牵引气温
		
		double safety_Factor=1;//安全系数
		double ave_Tension=0.01;//平均运行张力百分比
		double initialElongationCooling=1;//初伸长降温
		double calculatedHeight=15;//计算高度
		double altitudeHeight=10;//基准高度
		String terrainRoughness="B";//地形粗糙度类别
		
		double ths_Horizontal=1;//塔头间距 水平(m)
		double ths_Vertical=4.5;//塔头间距 垂直(m)
		
		
		
		
		
		InputConditionData iData = new InputConditionData();//输入参数
		
		iData.setFs_TowerNumber(fs_TowerNumber);// 前侧塔号
		iData.setBs_TowerNumber(bs_TowerNumber);// 后侧塔号
		iData.setSpan(span);// 档距
		iData.setLineType(lineType);//电线类型  -  0-导线   1-地线
		iData.setHeightDifference(heightDifference);// 挂线点高差
		iData.setWireType(wireType);// 电线型号
		iData.setSplittingNumber(splittingNumber);// 分裂数	
		
		iData.setFs_SLength(fs_SLength);// 前侧串长
		iData.setFs_SWeight(fs_SWeight);// 前侧串重
		iData.setFs_LinkingNumber(fs_LinkingNumber);// 前侧 联数
		iData.setFs_ECNumber(fs_ECNumber);// 前侧 每联片数
		iData.setFs_WindArea(fs_WindArea);// 前侧 每片受风面积
		iData.setFs_HeavyIce(fs_HeavyIce);// 前侧 每片覆冰重
		iData.setFs_IcingFittings(fs_IcingFittings);// 前侧 金具覆冰
		
		iData.setBs_SLength(bs_SLength);// 后侧	串长
		iData.setBs_SWeight(bs_SWeight);// 后侧	串重
		iData.setBs_LinkingNumber(bs_LinkingNumber);// 后侧	联数
		iData.setBs_ECNumber(bs_ECNumber);// 后侧	每联片数
		iData.setBs_WindArea(bs_WindArea);// 后侧	每片受风面积
		iData.setBs_HeavyIce(bs_HeavyIce);// 后侧	每片覆冰重
		iData.setBs_IcingFittings(bs_IcingFittings);// 后侧	金具覆冰
		
		iData.setWeatherConditions_type(weatherConditions_type);//气象条件组合 -- 类型
		iData.setWeatherConditions_name(weatherConditions_name);//气象条件组合 -- 名称
		
		iData.setoT_Tension(oT_Tension);//过牵引	 过牵引允许张力
		iData.setoT_length(oT_length);//过牵引	 过牵引长度
		iData.setoT_temperature(oT_temperature);//过牵引	 过牵引气温
		
		iData.setSafety_Factor(safety_Factor);//安全系数
		iData.setAve_Tension(ave_Tension);//平均运行张力百分比
		iData.setInitialElongationCooling(initialElongationCooling);//初伸长降温
		iData.setCalculatedHeight(calculatedHeight);//计算高度
		iData.setAltitudeHeight(altitudeHeight);//基准高度
		iData.setTerrainRoughness(terrainRoughness);//地形粗糙度类别
		
		iData.setThs_Horizontal(ths_Horizontal);//塔头间距 水平(m)
		iData.setThs_Vertical(ths_Vertical);//塔头间距 垂直(m)
		
		return iData;
	}
	
	
	public CounductorData getCounductorData(){
		CounductorData cData = new CounductorData();//导线参数
		
		double E=185000;//E 根据  电线型号  -(导地线参数)- 获取   弹性模量
		double A=0.0000115;//α 根据  电线型号  -(导地线参数)- 获取   温度膨胀系数
		double W=0.2951;//W 根据  电线型号  -(导地线参数)- 获取  单位重量
		double D=7.8;//d 根据  电线型号  -(导地线参数)- 获取  直径  外径
		double S=37.17;//S 根据  电线型号  -(导地线参数)- 获取  截面积
		double Tp=43420;//Tp 根据  电线型号  -(导地线参数)- 获取  保证拉断力
		
		cData.setE(E);//E 根据  电线型号  -(导地线参数)- 获取   弹性模量
		cData.setA(A);//α 根据  电线型号  -(导地线参数)- 获取   温度膨胀系数
		cData.setW(W);//W 根据  电线型号  -(导地线参数)- 获取  单位重量
		cData.setD(D);//d 根据  电线型号  -(导地线参数)- 获取  直径  外径
		cData.setS(S);//S 根据  电线型号  -(导地线参数)- 获取  截面积
		cData.setTp(Tp);//Tp 根据  电线型号  -(导地线参数)- 获取  保证拉断力
		
		return cData;
	}
	
	
	
	public List<WeatherConditions> getWeatherConditions(){
		List<WeatherConditions> paramArray = new ArrayList<WeatherConditions>();
		
		//参与计算
		int[] p1 = new int[]{1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1};
		
		//工况名称;	
		String[] p2 = new String[]{"最低气温","平均气温","最大风","覆冰","过牵引","最高气温","安装","外过(v=0)","外过","内过电压","5m/s风速","地线+5","三跨导线","三跨地线","验算4","验算5"};

		//温度;
		int[] p3 = new int[]{-20,15,-5,-5,1,40,-10,15,15,15,15,-5,-5,-5,-5,-5};
		//风速;	
		int[] p4 = new int[]{0,0,29,10,0,0,10,0,10,15,5,10,10,10,0,0};
		//冰厚;	
		int[] p5 = new int[]{0,0,0,10,0,0,0,0,0,0,0,15,20,25,3,4};

		//风速这算;	
		int[] p6 = new int[]{0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0};
	
		for(int i=0; i<16 ;i++){
			WeatherConditions wData = new WeatherConditions();
			
			wData.setCombinationName("组合4");////组合名称;
			wData.setParticipationCalculation(p1[i]);//参与计算;	 0-不计算    1-计算
			wData.setWorkingNumber(i+1);//工况序号;	
			wData.setWorkingName(p2[i]);//工况名称;	
			wData.setTemperature(p3[i]);//温度;
			wData.setWindSpeed(p4[i]);//风速;	
			wData.setIceThickness(p5[i]);//冰厚;		
			wData.setWindSpeedConversion(p6[i]);//风速;	  0-不计算    1-计算	
			wData.setRemarks("");//备注;
			
			paramArray.add(wData);
		}
		
		return paramArray;
	}

}
