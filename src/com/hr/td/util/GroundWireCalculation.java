package com.hr.td.util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import com.hr.td.entity.HorizontalTension;
import com.hr.td.entity.Load;
import com.hr.td.entity.MeterSag100;
import com.hr.td.entity.Sag;

/**
 * 力学特征--地线计算书
 * @author zhh
 *
 */
public class GroundWireCalculation {

	public static final double LOAD= 9.80665;
	public static final double LOAD1= 0.9;
	public static final double LOAD2= 0.980665;
	
	//温度工况
	private static int temperature_working_condition[] =new int[] {-20,-10,0,10,20,30,40};
	
	

	/**
	 * 算出荷载  与导线一起进行计算
	 * @param baseParam 基本条件 地线
	 * @param wirewayParam 导线参数  地线
	 * @param weatherConditions 气象条件  地线
	 * @param steps 档距  地线
	 * @param mapControllingFactors 控制因素 地线
	 * @param baseParamWireway 基本条件 导线
	 * @param wirewayParamWireway  导线参数 导线
	 * @param weatherConditionsWireway  气象条件  导线
	 * @param stepsWireway   档距  导线
	 * @return
	 */
	private static  Map<String,Object>  initLoadWithWireway(Map<String,String> baseParam,Map<String,String> wirewayParam,  List<Map<String,String>> weatherConditions,List<Double> steps,Map<String,String> mapControllingFactors  ,Map<String,String> baseParamWireway,Map<String,String> wirewayParamWireway,  List<Map<String,String>> weatherConditionsWireway,List<Double> stepsWireway )
	{
//		List<Load>   listsCritical = new ArrayList<Load>();
//		List<Load>   lists = new ArrayList<Load>();
		
		
		 Map<String,Object> mapLoads = getLoad(baseParam,wirewayParam,weatherConditions,mapControllingFactors);
		 List<Load>   listsCritical = (List<Load>) mapLoads.get("partLoads");
		 List<Load>   lists =  (List<Load>) mapLoads.get("allLoads");
		 
		 List<Load> criticalSpanResult = new ArrayList<Load>();
		 Map<String,Object> mapResult = new HashMap<String,Object>();
		
		 //导线  Wireway 
		 Map<String,Object> mapLoadsWireway  =  DynamicsFeatures.getLoad(baseParamWireway, wirewayParamWireway, weatherConditionsWireway);
		 List<Load>   listsCriticalWireway  = (List<Load>) mapLoadsWireway.get("partLoads");
		 List<Load>   listsWireway =  (List<Load>) mapLoadsWireway.get("allLoads");
		 criticalSpanResult  =  DynamicsFeatures.getCriticalSpan(baseParamWireway, wirewayParamWireway, weatherConditionsWireway, listsCriticalWireway);
		 List<Double>    spansWireway = initSpan(stepsWireway, criticalSpanResult.get(0).getLr1());
		 Map<String, Object>  mapWireway  = DynamicsFeatures.calculationHorizontalTension(baseParamWireway, wirewayParamWireway, weatherConditionsWireway, criticalSpanResult, listsWireway, spansWireway);
		 
				 
		steps  = initSpan(steps, criticalSpanResult.get(0).getLr1());
		mapResult = calculationHorizontalTensionWireway(baseParam,wirewayParam,weatherConditions,criticalSpanResult,lists,steps,mapControllingFactors,wirewayParamWireway ,listsCriticalWireway, mapWireway,   listsWireway);
				
		mapResult.put("allLoads", lists);//荷载 
		mapResult.put("criticalSpan", criticalSpanResult);//临界档距	 此档距是导线的档距	
		
		return mapResult;
		
	}
	/**
	 * 地线计算书 不与导线一起计算
	 * @param baseParam 基本条件
	 * @param wirewayParam 导线参数
	 * @param weatherConditions  气象条件
	 * @param steps  档距
	 * @param wirewaySsteps 导线档距
	 * @param  mapControllingFactors 控制条件
	 * @return
	 */
	private static  Map<String,Object>  initLoad(Map<String,String> baseParam,Map<String,String> wirewayParam,  List<Map<String,String>> weatherConditions,List<Double> steps,List<Double> wirewaySteps,Map<String,String> mapControllingFactors )
	{
//		List<Load>   listsCritical = new ArrayList<Load>();
//		List<Load>   lists = new ArrayList<Load>();
		
		
		 Map<String,Object> mapLoads = getLoad(baseParam,wirewayParam,weatherConditions,mapControllingFactors);
		 List<Load>   listsCritical = (List<Load>) mapLoads.get("partLoads");
		 List<Load>   lists =  (List<Load>) mapLoads.get("allLoads");
		 List<Load> criticalSpanResult = new ArrayList<Load>();
		 Map<String,Object> mapResult = new HashMap<String,Object>();
//		 System.out.println("");
		 
		 criticalSpanResult = getCriticalSpan(baseParam,wirewayParam,weatherConditions,listsCritical,mapControllingFactors);
		 steps  = initSpan(steps, criticalSpanResult.get(0).getLr1());
		 mapResult = calculationHorizontalTension(baseParam,wirewayParam,weatherConditions,criticalSpanResult,lists,steps);
			
		 return mapResult;
	}
	
	/**
	 * 
	 * @param load
	 * @return
	 */
	private static List<Double> initSpan(List<Double>  list ,double load)
	{
		List<Double>  listResult = new ArrayList<Double>();
		for(int i=0 ;i < list.size();i++)
		{
			Double d = Double.parseDouble(list.get(i)+"");
			
			if(load>d && list.size()> (i+1) && load < Double.parseDouble(list.get(i+1)+"")  )
			{
				listResult.add(d);
				listResult.add(load);
			}else
			{
				listResult.add(d);
			}
		}
		
		return listResult;
	}
	/**
	 * 得到临界档距
	 * @param baseParam
	 * @param wirewayParam
	 * @param weatherConditions
	 */
	public static List<Load>  getCriticalSpan(Map<String,String> baseParam,Map<String,String> wirewayParam,  List<Map<String,String>> weatherConditions,List<Load>   listsCritical,Map<String ,String> mapControllingFactors )
	{
			List<Load>  criticalSpan = new ArrayList<Load>();//临界档距
		
			 double elasticityCoefficient =  Double.parseDouble(String.valueOf(wirewayParam.get("txxs")));//弹性系数 $N$4
			 double coefficientExpansion =  Double.parseDouble(String.valueOf(wirewayParam.get("pzxs")));//线膨胀系数$N$5
			 double section =  Double.parseDouble(String.valueOf(wirewayParam.get("jsjm")));//计算截面$N$8
			 List<Load>   nextLists = new ArrayList<Load>();
			 for(int j=0;j<listsCritical.size();j++)
			 { 
				 List<Load>   temp = new ArrayList<Load>();
				 for(int l=j+1;l<listsCritical.size();l++)
				 {
					 
					 Load  load = (Load)listsCritical.get(j).clone();
					 Load  load1 =  (Load) listsCritical.get(l).clone();
					 
					 Random random = new Random();
					 int nextNum = random.nextInt();
					 
					 load.setNextWorkingConditionNo(nextNum);
					 load1.setNextWorkingConditionNo(nextNum);
					 //σmaxm
					 double σmaxm=load.getTmax()/section;
				
					 double σmaxn=load1.getTmax()/section;
					 double γm = load.getComprehensiveLoad()/section;
					 double γn = load1.getComprehensiveLoad()/section;
					 double tm = getTemperatureByID(load.getWorkingConditionNo()+"",weatherConditions);
					 double tn = getTemperatureByID(load1.getWorkingConditionNo()+"",weatherConditions);
					 load.setΣmaxm(σmaxm);
					 load.setΣmaxn(σmaxn);
					 load.setΓm(γm);
					 load.setΓn(γn);
					 load.setTm(tm);
					 load.setTn(tn);
					 
					 load1.setΣmaxm(σmaxm);
					 load1.setΣmaxn(σmaxn);
					 load1.setΓm(γm);
					 load1.setΓn(γn);
					 load1.setTm(tm);
					 load1.setTn(tn);
					 //((24/$N$40)*(V85-W85)+24*$N$41*(Z85-AA85))/((X85/V85)^2-(Y85/W85)^2)
					 double criteriontemp = ((24/elasticityCoefficient)*(σmaxm-σmaxn) + 24*coefficientExpansion*(tm-tn))/(Math.pow((γm/σmaxm), 2)-Math.pow((γn/σmaxn), 2));
	//					 System.out.println(criteriontemp);
					 if(criteriontemp!=0)
					 {
						 load.setCriterion(criteriontemp);
						 load1.setCriterion(criteriontemp);
					 }else
					 {
						 load.setCriterion(-1);
						 load1.setCriterion(-1);
					 }
					 double Lr1 = 0;
					 if(load.getCriterion()<0)
					 {
						 Lr1 =9999;
					 }else
					 {
						 Lr1 = Math.pow(criteriontemp, 0.5);
					 }
					 load.setLr1(Lr1);
					 load1.setLr1(Lr1);
					 nextLists.add(load1);
					 temp.add(load);
				 }
				 if(temp.size() > 0)
				 { 
					 ListSortUtil.sort(temp, true, "Lr1");
	//					 System.out.println(temp.get(0).getLr1());
					 criticalSpan.add(temp.get(0));
	//					 System.out.println(temp.get(0).getLr1());
				 }
			 }
			
			 ListSortUtil.sort(criticalSpan, true, "Lr1");
			 List<Load> criticalSpanResult = new ArrayList<Load>();
			 double nextD = criticalSpan.get(0).getNextWorkingConditionNo();
			 criticalSpanResult.add(criticalSpan.get(0));
			 for(int ii=0;ii<nextLists.size();ii++)
			 {
				 double ll = nextLists.get(ii).getNextWorkingConditionNo();
				 if( ll == nextD)
				 {
					 Load  l = nextLists.get(ii);
					 l.setLr1(9999);
					 criticalSpanResult.add(l);
					 
				 }
			 }
		return criticalSpanResult;
	}
	/**
	 * 得到综合荷载、水平荷载、垂直荷载
	 * @param baseParam
	 * @param wirewayParam
	 * @param weatherConditions
	 * @param steps
	 * @return
	 */
	public static  Map<String,Object>  getLoad(Map<String,String> baseParam,Map<String,String> wirewayParam,  List<Map<String,String>> weatherConditions,Map<String,String> mapControllingFactors)
	{
		
		Map<String,Object> mapResult = new HashMap<String,Object>();
		
		List<Load>   listsCritical = new ArrayList<Load>();
		List<Load>   lists = new ArrayList<Load>();
		double breakingForce =  Double.parseDouble(String.valueOf(wirewayParam.get("ldl")));//拉断力
		
		 double unitWeight =  Double.parseDouble(String.valueOf(wirewayParam.get("cdzl")));
		 double diameter =  Double.parseDouble(String.valueOf(wirewayParam.get("wj")));
		 int isCoordinationCalculation = Integer.parseInt(String.valueOf(mapControllingFactors.get("isCoordinationCalculation")));
		 double  safetyFactor =0; //安全系数
		 double  maxTension =0;//最大平均运行张力
		 
		 
		 
		 if(isCoordinationCalculation ==0) {
			   safetyFactor =Double.parseDouble(String.valueOf(mapControllingFactors.get("aqxs")));
			   maxTension =Double.parseDouble(String.valueOf(mapControllingFactors.get("zdzl")));
		 }else {
			 
			 
		 }
		
		 for(int i=0;i<weatherConditions.size();i++)//前4中工况
		 {
			 Load l = new Load();
			 Map map = weatherConditions.get(i);
			 int workingConditionNo = Integer.parseInt(String.valueOf(map.get("workingConditionNo")));
			 String wethername = String.valueOf(map.get("workingConditionName"));
			 String isWindSpeedConversion = String.valueOf(map.get("isWindSpeedConversion"));
			 boolean isWindSpeedConversionbooelan = isWindSpeedConversion=="1" ? true:false;
			 double windSpeed=  Double.parseDouble( String.valueOf(map.get("windSpeed")));
			 
			 double iceHeightStr =  Double.parseDouble(String.valueOf(map.get("iceThickness")));
			 //	垂直荷载
			 double verticalLoad =  getVerticalLoad(unitWeight,iceHeightStr,diameter);
//			 System.out.println("verticalLoad:"+verticalLoad);
			 
			 double carrierDatumHeight =  Double.parseDouble(baseParam.get("jzgd"));
			 double altitudeHeightv =  Double.parseDouble(baseParam.get("hzgd"));
			 String roughnessClassification =   baseParam.get("czlb");
//			 System.out.println("carrierDatumHeight:"+carrierDatumHeight+",altitudeHeightv:"+altitudeHeightv+",roughnessClassification:"+roughnessClassification+",diameter:"+diameter+",iceHeightStr:"+iceHeightStr+",windSpeed:"+windSpeed+",isWindSpeedConversionbooelan:"+isWindSpeedConversionbooelan);
//			 System.out.println(wethername);
			 //水平荷载
			 double levelLoad = getLevelLoad(carrierDatumHeight,altitudeHeightv,roughnessClassification,diameter,iceHeightStr,windSpeed,isWindSpeedConversionbooelan);
			 
			 double comprehensiveLoad = Math.pow((Math.pow(levelLoad, 2) + Math.pow(verticalLoad, 2)),0.5);
			 l.setWorkingConditionNo(workingConditionNo);
			 l.setComprehensiveLoad(comprehensiveLoad);
			 l.setWorkingCondition(wethername);
			 l.setLevelLoad(levelLoad);
			 l.setVerticalLoad(verticalLoad);
			 
//			 System.out.println(comprehensiveLoad);
//			 System.out.println("levelLoad:"+levelLoad);
			 if("平均气温".equals(wethername))
			 {
				 l.setTmax(breakingForce*maxTension); 
			 }else {
				 
				 l.setTmax(breakingForce/safetyFactor); 
			 }
			 //乘以1000 好方便排序
			 l.setRp((comprehensiveLoad/l.getTmax())*1000);		 
			if(i<4)
			{
				listsCritical.add(l);
			}
			lists.add(l);
		 }
		
		 ListSortUtil.sort(listsCritical, true, "rp");
		
		
		 mapResult.put("allLoads", lists);
		 mapResult.put("partLoads", listsCritical);
		 return mapResult;
		
		
	}
	
	/**
	 * 计算水平张力  导线
	 * @param baseParam
	 * @param wirewayParam
	 * @param weatherConditions
	 * @param loads
	 * @return
	 */
	private static Map<String,Object>  calculationHorizontalTensionWireway(Map<String,String> baseParam,Map<String,String> wirewayParam,  List<Map<String,String>> weatherConditions,List<Load> loads,List<Load> loadsAll, List<Double> spans , Map<String,String> mapControllingFactors ,Map<String,String>  wirewayParamWireway, List<Load>  listsCriticalWireway, Map<String, Object>  mapWireway, List<Load>   listsWireway )
	{
		 Map<String,Object> mapResult = new HashMap<String,Object>();
		
		
		double D_N44 =  Double.parseDouble(String.valueOf(wirewayParamWireway.get("jsjm")));//计算截面 $N$44
		double coefficientExpansion =  Double.parseDouble(String.valueOf(wirewayParam.get("pzxs")));//线膨胀系数$N$41
		 
		double altitudeHeightv =  Double.parseDouble(baseParam.get("hzgd"));/// 风荷载计算高度  
	
		double stringing =  Double.parseDouble( String.valueOf(baseParam.get("jxjw")));	// 架线初伸长降温 
		
		double groundGuideSpacinControl =  Double.parseDouble( String.valueOf(mapControllingFactors.get("groundGuideSpacinControl")));	// 导地线间距控制式
		
		double F79 =       getCombinedLoadByID(2,loadsAll);          //  $F$79
		double E18 =  Double.parseDouble(String.valueOf(mapControllingFactors.get("controlSpan")));
		double  F47=  getCombinedLoadByID(7,loadsAll);  //7的综合荷载  
		double  N8=  Double.parseDouble(String.valueOf(wirewayParam.get("jsjm")));//计算截面 $N$8
		double  E28 = getTemperatureByID(7+"",weatherConditions); //tm
		double N4 =  Double.parseDouble(String.valueOf(wirewayParam.get("txxs")));//弹性系数 $N$40
		double N5 =  Double.parseDouble(String.valueOf(wirewayParam.get("pzxs")));//弹性系数 $N$40
		//=$F$84/$N$44
		double γm  =  getCombinedLoadByID(7,listsWireway) /Double.parseDouble(String.valueOf(wirewayParamWireway.get("jsjm")));
		
		List<HorizontalTension> horizontalTensionsWireway  = (List<HorizontalTension>) mapWireway.get("horizontalTensions");
		
		Double E16 =    Double.parseDouble(String.valueOf(mapControllingFactors.get("horizontalDistance")));//E16
		Double E17 =    Double.parseDouble(String.valueOf(mapControllingFactors.get("verticalDistance")));//E17
		
		List<HorizontalTension> horizontalTensions  = new ArrayList<HorizontalTension>();
		List<Sag> sags  = new ArrayList<Sag>();
		List<MeterSag100> meterSag100  = new ArrayList<MeterSag100>();
		 
		// =$F$78 综合荷载
		 for(int i=0;i<spans.size();i++)
		 {
			 double lr = spans.get(i);
			 
			 double Lx=  E18;
			 double γg =  F47/N8;
			 //J387/(G387/F387-8*(((0.012*K387+1)^2-E$16^2)^0.5-E$17)/(K387^2))
			 double σm = getσmByWireway(lr ,horizontalTensionsWireway)/D_N44;
			 //J387/(G387/F387-8*(((0.012*K387+1)^2-E$16^2)^0.5-E$17)/(K387^2))
			 //J387/(G387/F387-8*((($R$12*K387+1)^2-E$17^2)^0.5-E$18)/(K387^2))
			double σg = γg/(γm/σm- 8*(Math.pow((Math.pow((groundGuideSpacinControl*Lx+1), 2)- Math.pow(E16, 2)), 0.5)-E17)/Math.pow(Lx, 2));
			
			//B387^2*J387^2*$N$4/(24*I387^2)-(I387+$N$5*$N$4*D387)
			double Fm =  Math.pow(lr, 2)*Math.pow(γg, 2)*N4/(24*Math.pow(σg, 2)) - (σg+N5*N4*E28);
			
			 //I387*N$8
			 double Tm= σg* N8;
			 
			 
			 if(lr ==70 )
			 {
				 System.out.println();
			 }
			 Load l =   getLoadByID(7,loads);
//			 double temperature = getTemperatureByID(l.getWorkingConditionNo()+"",weatherConditions);
//			 double Tmax= l.getTmax();
			
//			 double qm = Tmax/section;
//			 double rm = l.getComprehensiveLoad()/section;;
			 //=B424^2*G424^2*$N$40/(24*F424^2)-(F424+$N$41*$N$40*D424)
			 //B387^2*G387^2*$N$4/(24*F387^2)-(F387+$N$5*$N$4*D387))
//			 double fm = Math.pow(lr, 2) * Math.pow( rm , 2)*elasticityCoefficient/(24*Math.pow(qm, 2)) - (qm + coefficientExpansion*elasticityCoefficient*temperature);
//			 System.out.println(fm);
			 
			 HorizontalTension ht = new  HorizontalTension();
			 Sag sag = new Sag();
			 MeterSag100 ms1 = new MeterSag100();
			 ht.setRepresentativeSpan(lr);
			 sag.setRepresentativeSpan(lr);
			 ms1.setRepresentativeSpan(lr);
			 //循环各个工况下的数据
			 for(int j=0;j<weatherConditions.size();j++)
			 {
//				 HorizontalTension ht = new  HorizontalTension();
//				 Sag sag = new Sag();
				
				 Map<String,String> map = weatherConditions.get(j);
				 double comprehensiveLoad = loadsAll.get(j).getComprehensiveLoad();//综合荷载
				 double γ = comprehensiveLoad /N8;
				 double t = Double.parseDouble(String.valueOf(map.get("temperature")));
				 //==D389^2*$B387^2*$N$4/24
				 double b = Math.pow(γ, 2)* Math.pow(lr, 2)*N4/24;
				 //=$H387+$N$5*$N$4*D390
				 double a = Fm+coefficientExpansion*N4*t;
				 //=D429^2^0.5
				 double A = Math.pow(Math.pow(a, 2), 0.5);
				
				
				 
				 int no = Integer.parseInt(String.valueOf(map.get("workingConditionNo")));
				
				 
				 if(no==4 ||no==5 || no==7)
				 {
					 System.out.println("");
				 }
				
 				double C = A/a;
				//=13.5*G428/(G430^3)-G431
				double Δ= (13.5*b)/Math.pow(A, 3) -C;
				//=IF(G432>1,ACOSH(G432),ACOS(G432))
			//	(Acosh(x))= Log(x + Sqrt(x * x – 1))  
				double θ=0;
				if(Δ  > 1)
				{
					θ = Math.log(Δ+Math.sqrt(Δ*Δ-1));
				}else
				{
					θ =Math.acos(Δ);
				}
				//=IF(G430=0,G428^(1/3),IF(G432>1,G430*(2*COSH(G433/3)-G431)/3,G430*(2*COS(G433/3)-G431)/3))
				double σ=0;
				 if(A==0) {
					 σ= Math.pow(b, 1/3);
				 }
				 else if(Δ>1)
				 {
					 σ= A*(2*Math.cosh(θ/3)-C)/3;
				 }else
				 {
					 σ= A*(2*Math.cos(θ/3)-C)/3;
				 }
				 
				 //=D397*$N$8
				 double T = σ *N8;
				 ht= setHorizontalTension(ht,no,T);
					
				 //=500*G426/G434
				 double k = 500*γ/σ;
				 if(no==4 ||no==5 || no==7)
				 {
					 System.out.println("11 no："+no+",k:"+k+",lr"+lr);
				 }
				double sagv = k*Math.pow(lr, 2)/4000;
				 sag = setSag(sag,no,sagv);
				  
				 
				 
//				 horizontalTensions.add(ht);
				
//				 sags.add(sag);
			  }
			 //计算架线百米弧垂
			 for(int k=0;k<temperature_working_condition.length;k++)
			 {
				
				 ms1.setRepresentativeSpan(lr);
				 double  t_ = temperature_working_condition[k]+stringing;
				 //==($F$42/$N$8)^2*$B387^2*$N$4/24
				 double b = Math.pow((F79/N8), 2)*Math.pow(lr, 2)*N4/24;
				 //==$H387+$N$5*$N$4*D401
				 double a =Fm+N5*N4*t_;
				 //=D440^2^0.5
				 double A = Math.pow(Math.pow(a, 2), 0.5);
				 double C = A/a;
				 //=13.5*D439/(D441^3)-D442
				 double Δ= (13.5*b)/Math.pow(A, 3)-C;
				// =IF(D443>1,ACOSH(D443),ACOS(D443))
				 double θ  = 0 ;
				 if(Δ  > 1)
				{
					θ = Math.log(Δ+Math.sqrt(Δ*Δ-1));
				}else
				{
					θ =Math.acos(Δ);
				}
				 //=IF(D441=0,D439^(1/3),IF(D443>1,D441*(2*COSH(D444/3)-D442)/3,D441*(2*COS(D444/3)-D442)/3))
				 double σ=0;
				 if(A==0) {
					 σ= Math.pow(b, 1/3);
				 }
				 else if(Δ>1)
				 {
					 σ= A*(2*Math.cosh(θ/3)-C)/3;
				 }else
				 {
					 σ= A*(2*Math.cos(θ/3)-C)/3;
				 }
				// =($F$42/$N$8)*10000/(8*D408)
				 double f100 = (F79/N8)*10000/(8*σ);
				setMs1(ms1,temperature_working_condition[k],f100);
				
			 }
			 
			sags.add(sag);
			meterSag100.add(ms1);
			horizontalTensions.add(ht);
//			System.out.println("2");
		 }
		
		 
		 mapResult.put("sags", sags);
		 mapResult.put("meterSag100", meterSag100);
		 mapResult.put("horizontalTensions", horizontalTensions);
		 
		return mapResult;
	}
	
	
	
	private static double getσmByWireway(double lr, List<HorizontalTension> horizontalTensionsWireway) {
		// TODO Auto-generated method stub
		for(int i=0;i<horizontalTensionsWireway.size();i++)
		{
			HorizontalTension h = horizontalTensionsWireway.get(i);
			if(h.getRepresentativeSpan() == lr)
			{
				return h.getAbroadNoWind();
			}
		}
		return 0;
	}
	/**
	 * 计算水平张力
	 * @param baseParam
	 * @param wirewayParam
	 * @param weatherConditions
	 * @param loads
	 * @return
	 */
	private static Map<String,Object>  calculationHorizontalTension(Map<String,String> baseParam,Map<String,String> wirewayParam,  List<Map<String,String>> weatherConditions,List<Load> loads,List<Load> loadsAll, List<Double> spans )
	{
		 Map<String,Object> mapResult = new HashMap<String,Object>();
		
		double elasticityCoefficient =  Double.parseDouble(String.valueOf(wirewayParam.get("txxs")));//弹性系数 $N$40
		double section =  Double.parseDouble(String.valueOf(wirewayParam.get("jsjm")));//计算截面 $N$44
		double coefficientExpansion =  Double.parseDouble(String.valueOf(wirewayParam.get("pzxs")));//线膨胀系数$N$41
		 
		double altitudeHeightv =  Double.parseDouble(baseParam.get("hzgd"));/// 风荷载计算高度  
	
		double stringing =  Double.parseDouble( String.valueOf(baseParam.get("jxjw")));	// 架线初伸长降温 
		double F79 =       getCombinedLoadByID(2,loadsAll);          //  $F$79
		List<HorizontalTension> horizontalTensions  = new ArrayList<HorizontalTension>();
		List<Sag> sags  = new ArrayList<Sag>();
		List<MeterSag100> meterSag100  = new ArrayList<MeterSag100>();
		 
		// =$F$78 综合荷载
		 for(int i=0;i<spans.size();i++)
		 {
			 double lr = spans.get(i);
			 if(lr ==70 )
			 {
				 System.out.println();
			 }
			 Load l = getLoad(lr,loads);
			 double temperature = getTemperatureByID(l.getWorkingConditionNo()+"",weatherConditions);
			 double Tmax= l.getTmax();
			
			 double qm = Tmax/section;
			 double rm = l.getComprehensiveLoad()/section;;
			 //=B424^2*G424^2*$N$40/(24*F424^2)-(F424+$N$41*$N$40*D424)
			 //B387^2*G387^2*$N$4/(24*F387^2)-(F387+$N$5*$N$4*D387))
			 double fm = Math.pow(lr, 2) * Math.pow( rm , 2)*elasticityCoefficient/(24*Math.pow(qm, 2)) - (qm + coefficientExpansion*elasticityCoefficient*temperature);
//			 System.out.println(fm);
			 
			 HorizontalTension ht = new  HorizontalTension();
			 Sag sag = new Sag();
			 MeterSag100 ms1 = new MeterSag100();
			 ht.setRepresentativeSpan(lr);
			 sag.setRepresentativeSpan(lr);
			 ms1.setRepresentativeSpan(lr);
			 //循环各个工况下的数据
			 for(int j=0;j<weatherConditions.size();j++)
			 {
//				 HorizontalTension ht = new  HorizontalTension();
//				 Sag sag = new Sag();
				
				 Map<String,String> map = weatherConditions.get(j);
				 double comprehensiveLoad = loadsAll.get(j).getComprehensiveLoad();//综合荷载
				 double γ = comprehensiveLoad /section;
				 double t = Double.parseDouble(String.valueOf(map.get("temperature")));
				 //=D426^2*$B424^2*$N$40/24
				 double b = Math.pow(γ, 2)* Math.pow(lr, 2)*elasticityCoefficient/24;
				 //=$H424+$N$41*$N$40*D427
				 double a = fm+coefficientExpansion*elasticityCoefficient*t;
				 //=D429^2^0.5
				 double A = Math.pow(Math.pow(a, 2), 0.5);
				
				
				 
				 int no = Integer.parseInt(String.valueOf(map.get("workingConditionNo")));
				
				 
				 if(no==4 ||no==5 || no==7)
				 {
					 System.out.println("");
				 }
				
 				double C = A/a;
				//=13.5*G428/(G430^3)-G431
				double Δ= (13.5*b)/Math.pow(A, 3) -C;
				//=IF(G432>1,ACOSH(G432),ACOS(G432))
			//	(Acosh(x))= Log(x + Sqrt(x * x – 1))  
				double θ=0;
				if(Δ  > 1)
				{
					θ = Math.log(Δ+Math.sqrt(Δ*Δ-1));
				}else
				{
					θ =Math.acos(Δ);
				}
				//=IF(G430=0,G428^(1/3),IF(G432>1,G430*(2*COSH(G433/3)-G431)/3,G430*(2*COS(G433/3)-G431)/3))
				double σ=0;
				 if(A==0) {
					 σ= Math.pow(b, 1/3);
				 }
				 else if(Δ>1)
				 {
					 σ= A*(2*Math.cosh(θ/3)-C)/3;
				 }else
				 {
					 σ= A*(2*Math.cos(θ/3)-C)/3;
				 }
				 
				 //=G434*$N$44
				 double T = σ *section;
				 ht= setHorizontalTension(ht,no,T);
					
				 //=500*G426/G434
				 double k = 500*γ/σ;
				 if(no==4 ||no==5 || no==7)
				 {
					 System.out.println("11 no："+no+",k:"+k+",lr"+lr);
				 }
				double sagv = k*Math.pow(lr, 2)/4000;
				 sag = setSag(sag,no,sagv);
				  
				 
				 
//				 horizontalTensions.add(ht);
				
//				 sags.add(sag);
			  }
			 //计算架线百米弧垂
			 for(int k=0;k<temperature_working_condition.length;k++)
			 {
				
				 ms1.setRepresentativeSpan(lr);
				 double  t_ = temperature_working_condition[k]+stringing;
				 //=($F$79/$N$44)^2*$B449^2*$N$40/24
				 double b = Math.pow((F79/section), 2)*Math.pow(lr, 2)*elasticityCoefficient/24;
				 //=$H424+$N$41*$N$40*D438
				 double a =fm+elasticityCoefficient*coefficientExpansion*t_;
				 //=D440^2^0.5
				 double A = Math.pow(Math.pow(a, 2), 0.5);
				 double C = A/a;
				 //=13.5*D439/(D441^3)-D442
				 double Δ= (13.5*b)/Math.pow(A, 3)-C;
				// =IF(D443>1,ACOSH(D443),ACOS(D443))
				 double θ  = 0 ;
				 if(Δ  > 1)
				{
					θ = Math.log(Δ+Math.sqrt(Δ*Δ-1));
				}else
				{
					θ =Math.acos(Δ);
				}
				 //=IF(D441=0,D439^(1/3),IF(D443>1,D441*(2*COSH(D444/3)-D442)/3,D441*(2*COS(D444/3)-D442)/3))
				 double σ=0;
				 if(A==0) {
					 σ= Math.pow(b, 1/3);
				 }
				 else if(Δ>1)
				 {
					 σ= A*(2*Math.cosh(θ/3)-C)/3;
				 }else
				 {
					 σ= A*(2*Math.cos(θ/3)-C)/3;
				 }
				 //=($F$79/$N$44)*10000/(8*D445)
				 double f100 = (F79/section)*10000/(8*σ);
				setMs1(ms1,temperature_working_condition[k],f100);
				
			 }
			 
			sags.add(sag);
			meterSag100.add(ms1);
			horizontalTensions.add(ht);
//			System.out.println("2");
		 }
		
		 
		 mapResult.put("sags", sags);
		 mapResult.put("meterSag100", meterSag100);
		 mapResult.put("horizontalTensions", horizontalTensions);
		 
		return mapResult;
	}
	
	/**
	 */
	private static void setMs1(MeterSag100 ms1, int i, double f100) {
		// TODO Auto-generated method stub
	//	{-20,-10,0,10,20,30,40};
		if(i==-20)
		{
			ms1.setT20A(f100);
		}
		else if(i==-10)
		{
			ms1.setT10A(f100);
		}
		else if(i== 0)
		{
			ms1.setT0(f100);
		}
		else if(i== 10)
		{
			ms1.setT10B(f100);
		}
		else if(i== 20)
		{
			ms1.setT20B(f100);
		}
		else if(i== 30)
		{
			ms1.setT30B(f100);
		}
		else if(i== 40)
		{
			ms1.setT40B(f100);
		}
	}
	/**
	 * 
	 * @param sag
	 * @param no
	 * @param σ
	 * @return
	 */
	private static Sag setSag(Sag sag, int no, double σ) {
		if(no==3)
		 {
			sag.setIcing(σ);
		 }else  if(no==4)
		 {
			 sag.setMaxTemperature(σ);
		 }
		 else  if(no==6)
		 {
			 sag.setAbroadNoWind(σ);
		 }
		
		return sag;
	}
	/**
	 * 
	 * @param ht
	 * @param no
	 * @param v
	 * @return
	 */
	public static HorizontalTension setHorizontalTension(HorizontalTension ht ,int no ,double v){
		
		if(no==1)
		 {       
			 ht.setMinTemperature(v);
		 }else  if(no==2)
		 {
			 ht.setAvgTemperature(v);
		 }
		 else  if(no==3)
		 {
			 ht.setMaxWind(v);
		 }
		 else  if(no==4)
		 {
			 ht.setIcing(v);
		 }
		 else  if(no==5)
		 {
			 ht.setMaxTemperature(v);
		 }
		 else  if(no==6)
		 {
			 ht.setInstallV(v);
		 }
		 else  if(no==7)
		 {
			 ht.setAbroadNoWind(v);
		 }
		 else  if(no== 8)
		 {
			 ht.setAbroadWind(v);
		 }else  if(no==9)
		 {
			 ht.setInternalOvervoltage(v);
		 }else  if(no==10)
		 {
			 ht.setSecond5Wind(v);
		 }
		 else  if(no==11)
		 {
			 ht.setGroundWire5(v);
			 
		 }else  if(no==12)
		 {
			 ht.setThreeSpanConductors(v);
		 }else  if(no==13)
		 {
			 ht.setThreeSpanLine(v);
		 }else  if(no==14)
		 {
			 ht.setCheckingComputations4(v);
		  
		 }
		 else  if(no==15)
		 {
			 ht.setCheckingComputations5(v);
		  
		 }
		
		return ht;
	}
	/**
	 * 根据档距获取临界档距序号
	 * @param load
	 * @param loads
	 * @return
	 */
	private static Load getLoad(double load ,List<Load> loads)
	{
		Load d=new Load();
		for(Load l:loads)
		{
			double lr = l.getLr1();
			if(load <= lr)
			{
			  d =l;
			  break;
			}
		}
		
		return d;
	}
	/**
	 * 根据ID获Combined load综合荷载
	 * @param id
	 * @param lists
	 * @return
	 */
	public static  double getCombinedLoadByID(int  id,List<Load> loadsAll) {
		
		double d=0;
		for(Load load: loadsAll)
		{
			if(id ==load.getWorkingConditionNo()) 
			{
				d= load.getComprehensiveLoad();
			}
		}
		return d;
		
	}
	
	/**
	 * 根据ID获Combined load综合荷载
	 * @param id
	 * @param lists
	 * @return
	 */
	public static  Load getLoadByID(int  id,List<Load> loadsAll) {
		
		Load d= new Load();
		for(Load load: loadsAll)
		{
			if(id ==load.getWorkingConditionNo()) 
			{
				d= load;
			}
		}
		return d;
		
	}
	/**
	 * 
	 * @param start 起始
	 * @param step 步长
	 * @param max 最大
	 * @param load
	 * @return
	 */
	private static List<Double> initSpan(double start,double step,double max,double load)
	{
		List<Double>  list = new ArrayList<Double>();
		for(int i=(int)start;i <= max;i+=step)
		{
			list.add((double)i);

			if(load>i && load <i+step)
			{
				list.add(load);
			}
		}
		
		return list;
	}
	
	/**
	 * 根据工况序号获取load
	 * @param load
	 * @param loads
	 * @return
	 */
	private static Load getLoadByNo(int loadno ,List<Load> loads)
	{
		Load d=new Load();
		for(Load l:loads)
		{
			int  lno = l.getNextWorkingConditionNo();
			if(loadno == lno)
			{
			  d =l;
			  break;
			}
		}
		return d;
	}
	/**
	 * 计算垂直荷载
	 * @return
	 */
	private static double getVerticalLoad(double unitWeight ,double iceThickness,double diameter)
	{
		//=9.80665*N$42+9.80665*0.9*PI()*G50*($N$43+G50)/1000
		double temp = LOAD*unitWeight+LOAD*LOAD1*Math.PI*iceThickness*(diameter+iceThickness)/1000;
		return temp;
	}
	
	/**
	 * 根据ID获取温度值
	 * @param id
	 * @param lists
	 * @return
	 */
	public static  double getTemperatureByID(String  id,List<Map<String, String>>  lists) {
		
		double d=0;
		for(Map<String, String> map: lists)
		{
			if(id.equals(map.get("workingConditionNo")) )
			{
				d= Double.parseDouble(String.valueOf(map.get("temperature")));
			}
		}
		return d;
		
	}
	
	/**
	 * 计算水平荷载
	 * @param carrierDatumHeight    风荷载基准高度
	 * @param altitudeHeight 风荷载计算高度
	 * @param roughnessClassification 地形粗糙度类别
	 * @param diameter 外径  
	 * @param iceThickness 冰厚
	 * @param windSpeed 风速
	 * @param windSpeedConversion  风速折算
	 * 
	 * @return
	 */
	private static double getLevelLoad(double carrierDatumHeight,double altitudeHeight ,String roughnessClassification,double diameter,double iceThickness,double windSpeed,boolean windSpeedConversion)
	{
		
		//E$45=10,
	
		double tt= 0;
		if(carrierDatumHeight ==10)
		{
			double temp =0;
		//	F52<20,1,IF(F52<27,0.85,IF(F52<31.5,0.75,0.7))
			if(windSpeed <20 )
			{
				temp=  1;
			}else if(windSpeed <27 )
			{
				temp=  0.85;
			}else if(windSpeed < 31.5)
			{
				temp= 0.75;
			}else
			{
				temp= 0.7;
			}
			
			double temp2=0;
			if(windSpeedConversion)
			{
				if("A".equals(roughnessClassification))
				{
					temp2=1.379;
				}else if("B".equals(roughnessClassification))
				{
					temp2=1;
				}else if("C".equals(roughnessClassification))
				{
					temp2= 0.616;
				}
				else if("D".equals(roughnessClassification))
				{
					temp2= 0.318;
				}
				temp2 =temp2* Math.pow(altitudeHeight/carrierDatumHeight,0.32);
				 
			}else
			{
				temp2=1;
			}
			double temp3=0;
			if(iceThickness >= 20)
			{
				temp3 = 2;
			}else if(iceThickness >= 15)
			{
				temp3 = 1.3;
			}
			else if(iceThickness >= 10)
			{
				temp3 = 1.2;
			}
			else if(iceThickness >= 5)
			{
				temp3 = 1.1;
			}else {
				temp3 = 1;
			}
			
			tt = temp*temp2*temp3;
		}
		
		//E$45=15
		else if(carrierDatumHeight ==15) //IF(E$45=15,0.980665*IF(F52<20,1,IF(F52<30,0.85,IF(F52<35,0.75,0.7)))*(IF(H52="√",(E$44/E$45)^0.32,1)),"")
		{
			double temp4=0;
			if(windSpeed <20 )
			{
				temp4=  1;
			}else if(windSpeed <30 )
			{
				temp4=  0.85;
			}
			else if(windSpeed <35 )
			{
				temp4=  0.75;
			}else
			{
				temp4=  0.7;
			}
			temp4 =LOAD2*temp4;
			if(windSpeedConversion) {
				temp4 =temp4* Math.pow(altitudeHeight/carrierDatumHeight,0.32);
			}
			
			tt = temp4;
		}
		//F52^2/1.6
		double tt1 =Math.pow(windSpeed, 2)/1.6;
		//IF(OR(N$43<17,G52>0),1.2,1.1)
		if(diameter <17  || iceThickness > 0)
		{
			tt1= tt1*1.2;
		}else
		{
			tt1= tt1*1.1;
		}
		//(F52^2/1.6)*IF(OR(N$43<17,G52>0),1.2,1.1)*(N$43+2*G52)/1000
		return tt*tt1*((diameter+2*iceThickness)/1000);
	}
	
//	mapControllingFactors.put("isCoordinationCalculation", "1"); //是否与导线配合计算  1是    0否
//	mapControllingFactors.put("horizontalDistance", "0.6"); //导地线水平距离
//	mapControllingFactors.put("verticalDistance", "4"); //导地线垂直距离
//	mapControllingFactors.put("controlSpan", "506.080"); //控制档距
//	mapControllingFactors.put("groundGuideSpacinControl", "0.012"); //导地线间距控制式
	
	/**
	 * 
	 * @param mapControllingFactors  控制因素  导地线间距控制式    导地线垂直距离    导地线水平距离
	 * @return 
	 */
	public static double  getControlSpan(Map<String,String> mapControllingFactors)
	{
	    int  one=2000;
	    int  two=1;
		
		double d =0;
		double R12 =  Double.parseDouble(String.valueOf(mapControllingFactors.get("groundGuideSpacinControl")));
		double E17 = Double.parseDouble(String.valueOf(mapControllingFactors.get("horizontalDistance")));
		double E18 = Double.parseDouble(String.valueOf(mapControllingFactors.get("verticalDistance")));
		
		//=(($R$12*$AN63)^2+3*$R$12*$AN63-2*($E$17^2-1))*0.5/(ABS((1+$R$12*$AN63)^2-$E$17^2))^0.5  $R$12  AN63  E$17
		
		List<Double>    AK = new ArrayList<Double>(); 
		List<Double>  AL = new ArrayList<Double>(); 
		List<Double>  AM = new ArrayList<Double>(); 
		List<Double> AMTemp = new ArrayList<Double>(); 
		List<Double> AN = new ArrayList<Double>(); 
		List<Double> AQ = new ArrayList<Double>(); 
		List<Double> AR = new ArrayList<Double>(); 
		List<Double> AS = new ArrayList<Double>(); 
		
		
//		if(al  < 0 )
//		{
//			an+
//		}
		//=(($R$12*$AN63)^2+3*$R$12*$AN63-2*($E$17^2-1))*0.5/(ABS((1+$R$12*$AN63)^2-$E$17^2))^0.5  $R$12  AN63  E$17
		//=IF(AL64<0,AN64+AR65,AN64-AR65)    AL64  AN64  AR65
		for(int i=1;i<51;i++)
		{
			double ak =0;
			double al = 0;
			double am = 0;
			double an = 0;
			double aq = 0;
			double ar = 0;
			double as = 0;
			if(i==1)
			{
				ak = (Math.pow(R12*one, 2)+ 3*R12*one-2*(Math.pow(E17, 2)-1))* 0.5/Math.pow(Math.abs(Math.pow(1+R12*one, 2) - Math.pow(E17, 2)), 0.5) ;
//			    AK[i-1]=ak;
			    AK.add(ak);
				al = ak - E18;
//				AL[i-1] = al;
				AL.add(al);
				am = Math.abs(al);
//				AMTemp[i-1]=am;
				AMTemp.add(am);
//				AM[i-1]=am;
				AM.add(am);
				an = one;
//				AN[i-1] = an;
				AN.add(an);
			}
			
			else if(i==2)
			{
				ak = (Math.pow(R12*two, 2)+ 3*R12*two-2*(Math.pow(E17, 2)-1))* 0.5/Math.pow(Math.abs(Math.pow(1+R12*two, 2) - Math.pow(E17, 2)), 0.5) ;
//				AK[i-1]=ak;
				AK.add(ak);
				al = ak - E18;
//				AL[i-1] = al;
				AL.add(al);
				am = Math.abs(al);
				AMTemp.add(am);
				AM.add(am);
//				AM[i-1]=am;
//				AMTemp[i-1]=am;
				an = two;
//				AN[i-1] = an;
				AN.add(an);
			}

			else if(i > 2)
			{
				double i1= AMTemp.get(i-1-1);
				AMTemp.remove(i-1-1);
				Collections.sort(AMTemp);
				
				for(int j=0;j<AM.size();j++)
				{
					if(AMTemp.get(0).doubleValue() == AM.get(j).doubleValue())
					{
						aq=AN.get(j);
						AQ.add(aq);
						break;
					}
				}
				AMTemp.add(i1);
				
				ar = Math.abs((aq-AN.get(i-1-1))/2);
				AR.add(ar);
				if(AL.get(i-1-1) < 0 )
				{
					as = AN.get(i-1-1) + ar;
				}else
				{
					as = AN.get(i-1-1) - ar;
				}
				AS.add(as);
				
				
				ak = (Math.pow(R12*as, 2)+ 3*R12*as-2*(Math.pow(E17, 2)-1))* 0.5/Math.pow(Math.abs(Math.pow(1+R12*as, 2) - Math.pow(E17, 2)), 0.5) ;
//				AK[i-1]=ak;
				AK.add(ak);
				al = ak - E18;
//				AL[i-1] = al;
				AL.add(al);
				am = Math.abs(al);
				AMTemp.add(am);
				AM.add(am);
//				AM[i-1]=am;
//				AMTemp[i-1]=am;
				an = as;
//				AN[i-1] = an;
				AN.add(an);
				
			}
			
		}
		
		d = AQ.get(AQ.size()-1);
		return  d;
	}
	
	public static void main(String args []) {
//		System.out.println(Math.pow(10, 2)/1.6);
//		System.out.println(Math.pow(10, 2)/1.6*1.1*((23.76+2*0)/1000));
//		System.out.println(Math.pow(10, 2)/1.6*1.1*(10+2*0)/1000);
//		for(int i=0;i<1000;i++)
//		{
//			Random random = new Random();
//			System.out.println(random.nextInt());
//		}
		Map<String,String> baseParam = new HashMap<String,String>();
		List<List<String>>  loadList = new ArrayList<List<String>>();
		List<Double> steps = new ArrayList<Double>();
//		steps.add((double)10);
//		steps.add((double)10);
//		steps.add((double)800);
		double tdouble=0;
		for(int l=1;l<=80;l++)
		{
			steps.add((double) (10*l));
		}
		
		baseParam = new HashMap<String,String>();
		baseParam.put("dxxh", "JL/G1A-300/25");//地线型号
//		baseParam.put("zdzl", "0.25");//最大平均运行张力
//		baseParam.put("aqxs", "8");//设计安全系数
		baseParam.put("jxjw", "-25");//架线初伸长降温
		baseParam.put("hzgd", "15");//风荷载计算高度
		baseParam.put("jzgd", "10");//风荷载基准高度
		baseParam.put("czlb", "B");//地形粗糙度类别
		
		Map<String,String> wirewayParam  = new HashMap<String,String>();
		//地线参数
		wirewayParam  = new HashMap<String,String>();
		wirewayParam.put("txxs", "65000");//弹性系数
		wirewayParam.put("pzxs", "0.0000205");//线膨胀系数
		wirewayParam.put("cdzl", "1.0579");//单位长度重量
		wirewayParam.put("wj", "23.76");//外径
		wirewayParam.put("jsjm", "333.31");//计算截面
		wirewayParam.put("ldl", "79569.15");//拉断力
		
		List<Map<String,String>> weatherConditions= new ArrayList<Map<String,String>>();
	
		 
		
		 Map<String,String> temp1= new HashMap<String,String>();
		 temp1.put("workingConditionName", "最低气温") ;
		 temp1.put("isCalculation", "1") ;
		 temp1.put("workingConditionNo", "1") ;
		 temp1.put("temperature", "-20") ;
		 temp1.put("windSpeed", "0") ;
		 temp1.put("iceThickness", "0") ;
		 temp1.put("isWindSpeedConversion", "0") ;
		 
		 
		 Map<String,String> temp2= new HashMap<String,String>();
		 temp2.put("workingConditionName", "平均气温") ;
		 temp2.put("isCalculation", "1") ;
		 temp2.put("workingConditionNo", "2") ;
		 temp2.put("temperature", "15") ;
		 temp2.put("windSpeed", "0") ;
		 temp2.put("iceThickness", "0") ;
		 temp2.put("isWindSpeedConversion", "0") ;
		 
		 Map<String,String> temp3= new HashMap<String,String>();
		 temp3.put("workingConditionName", "最大风") ;
		 temp3.put("isCalculation", "1") ;
		 temp3.put("workingConditionNo", "3") ;
		 temp3.put("temperature", "-5") ;
		 temp3.put("windSpeed", "27") ;
		 temp3.put("iceThickness", "0") ;
		 temp3.put("isWindSpeedConversion", "1") ;
		 
		 Map<String,String> temp4= new HashMap<String,String>();
		 temp4.put("workingConditionName", "覆冰") ;
		 temp4.put("isCalculation", "1") ;
		 temp4.put("workingConditionNo", "4") ;
		 temp4.put("temperature", "-5") ;
		 temp4.put("windSpeed", "10") ;
		 temp4.put("iceThickness", "10") ;
		 temp4.put("isWindSpeedConversion", "0") ;
		 
		 Map<String,String> temp5= new HashMap<String,String>();
		 temp5.put("workingConditionName", "最高气温") ;
		 temp5.put("isCalculation", "1") ;
		 temp5.put("workingConditionNo", "5") ;
		 temp5.put("temperature", "40") ;
		 temp5.put("windSpeed", "0") ;
		 temp5.put("iceThickness", "0") ;
		 temp5.put("isWindSpeedConversion", "0") ;
		 
		 Map<String,String> temp6= new HashMap<String,String>();
		 temp6.put("workingConditionName", "安装") ;
		 temp6.put("isCalculation", "1") ;
		 temp6.put("workingConditionNo", "6") ;
		 temp6.put("temperature", "-10") ;
		 temp6.put("windSpeed", "10") ;
		 temp6.put("iceThickness", "0") ;
		 temp6.put("isWindSpeedConversion", "0") ;
		 temp6.put("remarks", "") ;
		 
		 //√	7	外过电压	15	0	0	×	(无风)
		 Map<String,String> temp7= new HashMap<String,String>();
		 temp7.put("workingConditionName", "外过电压") ;
		 temp7.put("isCalculation", "1") ;
		 temp7.put("workingConditionNo", "7") ;
		 temp7.put("temperature", "15") ;
		 temp7.put("windSpeed", "0") ;
		 temp7.put("iceThickness", "0") ;
		 temp7.put("isWindSpeedConversion", "0") ;
		 temp7.put("remarks", "(无风)") ;
		 
		 //√	8	外过电压	15	10	0	×	(有风)
		 Map<String,String> temp8= new HashMap<String,String>();
		 temp8.put("workingConditionName", "外过电压") ;
		 temp8.put("isCalculation", "1") ;
		 temp8.put("workingConditionNo", "8") ;
		 temp8.put("temperature", "15") ;
		 temp8.put("windSpeed", "10") ;
		 temp8.put("iceThickness", "0") ;
		 temp8.put("isWindSpeedConversion", "0") ;
		 temp8.put("remarks", "(有风)") ;
		 
		 //√	9	内过电压	15	15	0	×	
		 Map<String,String> temp9= new HashMap<String,String>();
		 temp9.put("workingConditionName", "内过电压") ;
		 temp9.put("isCalculation", "1") ;
		 temp9.put("workingConditionNo", "9") ;
		 temp9.put("temperature", "15") ;
		 temp9.put("windSpeed", "15") ;
		 temp9.put("iceThickness", "0") ;
		 temp9.put("isWindSpeedConversion", "0") ;
		 temp9.put("remarks", "") ;
		 
//		 √	10	5m/s风速	15	5	0	×	钢管杆用
		 Map<String,String> temp10= new HashMap<String,String>();
		 temp10.put("workingConditionName", "5m/s风速") ;
		 temp10.put("isCalculation", "1") ;
		 temp10.put("workingConditionNo", "10") ;
		 temp10.put("temperature", "15") ;
		 temp10.put("windSpeed", "5") ;
		 temp10.put("iceThickness", "0") ;
		 temp10.put("isWindSpeedConversion", "0") ;
		 temp10.put("remarks", "钢管杆用") ;
		 
		 //×	11	地线+5	-5	10	15	×	验算1
		 Map<String,String> temp11= new HashMap<String,String>();
		 temp11.put("workingConditionName", "地线+5") ;
		 temp11.put("isCalculation", "1") ;
		 temp11.put("workingConditionNo", "11") ;
		 temp11.put("temperature", "-5") ;
		 temp11.put("windSpeed", "10") ;
		 temp11.put("iceThickness", "15") ;
		 temp11.put("isWindSpeedConversion", "0") ;
		 temp11.put("remarks", "验算1") ;
		 
//		 ×	12	三跨导线	-5	10	20	×	验算2
		 Map<String,String> temp12= new HashMap<String,String>();
		 temp12.put("workingConditionName", "三跨导线") ;
		 temp12.put("isCalculation", "1") ;
		 temp12.put("workingConditionNo", "12") ;
		 temp12.put("temperature", "-5") ;
		 temp12.put("windSpeed", "10") ;
		 temp12.put("iceThickness", "20") ;
		 temp12.put("isWindSpeedConversion", "0") ;
		 temp12.put("remarks", "验算2") ;
		 
		// ×	13	三跨地线	-5	10	25	×	验算3
		 Map<String,String> temp13 = new HashMap<String,String>();
		 temp13.put("workingConditionName", "三跨地线") ;
		 temp13.put("isCalculation", "1") ;
		 temp13.put("workingConditionNo", "13") ;
		 temp13.put("temperature", "-5") ;
		 temp13.put("windSpeed", "10") ;
		 temp13.put("iceThickness", "25") ;
		 temp13.put("isWindSpeedConversion", "0") ;
		 temp13.put("remarks", "验算3") ;
		 
//		 ×	14	验算4	-5	0	3	×	验算4
		 Map<String,String> temp14 = new HashMap<String,String>();
		 temp14.put("workingConditionName", "验算4") ;
		 temp14.put("isCalculation", "1") ;
		 temp14.put("workingConditionNo", "14") ;
		 temp14.put("temperature", "-5") ;
		 temp14.put("windSpeed", "0") ;
		 temp14.put("iceThickness", "3") ;
		 temp14.put("isWindSpeedConversion", "0") ;
		 temp14.put("remarks", "验算4") ;
		 
		 
//		 ×	15	验算5	-5	0	4	×	验算5
		 Map<String,String> temp15 = new HashMap<String,String>();
		 temp15.put("workingConditionName", "验算5") ;
		 temp15.put("isCalculation", "1") ;
		 temp15.put("workingConditionNo", "15") ;
		 temp15.put("temperature", "-5") ;
		 temp15.put("windSpeed", "0") ;
		 temp15.put("iceThickness", "4") ;
		 temp15.put("isWindSpeedConversion", "0") ;
		 temp15.put("remarks", "验算5") ;
		 
		 weatherConditions.add(temp1);
		 weatherConditions.add(temp2);
		 weatherConditions.add(temp3);
		 weatherConditions.add(temp4);
		 weatherConditions.add(temp5);
		
		 weatherConditions.add(temp6);
	
		 weatherConditions.add(temp7);
		
		 weatherConditions.add(temp8);
		
		 weatherConditions.add(temp9);
		
		 weatherConditions.add(temp10);
		
		 weatherConditions.add(temp11);
		
		 weatherConditions.add(temp12);
		
		 weatherConditions.add(temp13);
		
		 weatherConditions.add(temp14);
		 weatherConditions.add(temp15);
		 
		
//		int  isCoordinationCalculation = 0;
	//	控制因素
		Map<String,String> mapControllingFactors =new HashMap<String,String>();
		mapControllingFactors.put("isCoordinationCalculation", "1"); //是否与导线配合计算  1是    0否
		mapControllingFactors.put("horizontalDistance", "0.6"); //导地线水平距离
		mapControllingFactors.put("verticalDistance", "4"); //导地线垂直距离
		mapControllingFactors.put("controlSpan", "506.080"); //控制档距
		mapControllingFactors.put("groundGuideSpacinControl", "0.015"); //导地线间距控制式
		
		
		Map<String,String> baseParamWireway = new HashMap<String,String>();
		baseParamWireway.put("dxxh", "JL/G1A-300/25");//导线型号
		baseParamWireway.put("zdzl", "0.25");//最大平均运行张力
		baseParamWireway.put("aqxs", "8");//设计安全系数
		baseParamWireway.put("jxjw", "-25");//架线初伸长降温
		baseParamWireway.put("hzgd", "15");//风荷载计算高度
		baseParamWireway.put("jzgd", "10");//风荷载基准高度
		baseParamWireway.put("czlb", "B");//地形粗糙度类别
//		mapControllingFactors.put("isCoordinationCalculation", "0"); //是否与导线配合计算    1是    0否
//		mapControllingFactors.put("zdzl", "0.25"); //最大平均运行张力
//		mapControllingFactors.put("aqxs", "10"); //设计安全系数
//		initLoad(baseParam,wirewayParam,weatherConditions,steps,null,mapControllingFactors);
//		initLoadWithWireway(baseParam,wirewayParam,weatherConditions,steps, mapControllingFactors  , baseParamWireway, wirewayParam,   weatherConditions, steps );
		getControlSpan(mapControllingFactors);
	}
	
}
