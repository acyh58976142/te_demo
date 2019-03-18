package com.hr.td.util;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import com.hr.td.entity.HorizontalTension;
import com.hr.td.entity.Load;
import com.hr.td.entity.MeterSag100;
import com.hr.td.entity.Sag;

/**
 * 力学特征--导线计算书
 * @author zhh
 *
 */
public class DynamicsFeatures {

	
	public static final double LOAD= 9.80665;
	public static final double LOAD1= 0.9;
	public static final double LOAD2= 0.980665;
	
	//温度工况
	private static int temperature_working_condition[] =new int[] {-20,-10,0,10,20,30,40};
	
	
	/**
	 * 算出荷载
	 * @param baseParam 基本条件
	 * @param wirewayParam 导线参数
	 * @param weatherConditions  气象条件
	 *  @param steps 档距开始值，档距步长，档距最大值
	 * @return
	 */
	public static  Map<String,Object>  initLoad(Map<String,String> baseParam,Map<String,String> wirewayParam,  List<Map<String,String>> weatherConditions,List<Double> steps)
	{
//		 ListSortUtil.sort(weatherConditions, true, "");
//		wirewayParam.put("pzxs", "0.0000196");
		
		Collections.sort(weatherConditions, new Comparator<Map<String, String>>() {
	            public int compare(Map<String, String> o1, Map<String, String> o2) {
	                int map1value = Integer.parseInt(String.valueOf(o1.get("workingConditionNo")));
	                int map2value = Integer.parseInt(String.valueOf(o2.get("workingConditionNo")));
	                
	                return map1value - map2value;
	            }
	      });
		
		
		 Map<String,Object> mapLoads = getLoad(baseParam,wirewayParam,weatherConditions);
		 List<Load>   listsCritical = (List<Load>) mapLoads.get("partLoads");
		 List<Load>   lists =  (List<Load>) mapLoads.get("allLoads");
	
		 //合并
//		 Collections.sort(lists); // 
		
//		 wirewayParam.put("txxs", "65000");//弹性系数
//		 wirewayParam.put("pzxs", "0.0000205");//线膨胀系数
		
		List<Load> criticalSpanResult = getCriticalSpan(baseParam,wirewayParam,weatherConditions,listsCritical);
		
		steps  = initSpan(steps, criticalSpanResult.get(0).getLr1());
		
		Map<String,Object> mapResult = calculationHorizontalTension(baseParam,wirewayParam,weatherConditions,criticalSpanResult,lists,steps);
			
		
		mapResult.put("allLoads", lists);//荷载 
		mapResult.put("criticalSpan", criticalSpanResult);//临界档距
		
		return mapResult;
	}
	
	/**
	 * 得到综合荷载、水平荷载、垂直荷载
	 * @param baseParam
	 * @param wirewayParam
	 * @param weatherConditions
	 * @param steps
	 * @return
	 */
	public static  Map<String,Object>  getLoad(Map<String,String> baseParam,Map<String,String> wirewayParam,  List<Map<String,String>> weatherConditions)
	{
		Map<String,Object> mapResult = new HashMap<String,Object>();
		
		List<Load>   listsCritical = new ArrayList<Load>();
		List<Load>   lists = new ArrayList<Load>();
		 double breakingForce =  Double.parseDouble(String.valueOf(wirewayParam.get("ldl")));//拉断力
			
		 double unitWeight =  Double.parseDouble(String.valueOf(wirewayParam.get("cdzl")));
		 double diameter =  Double.parseDouble(String.valueOf(wirewayParam.get("wj")));

		 double  safetyFactor =Double.parseDouble(String.valueOf(baseParam.get("aqxs")));//安全系数
		 double  maxTension =Double.parseDouble(String.valueOf(baseParam.get("zdzl")));//最大平均运行张力
	
		 for(int i=0;i<weatherConditions.size();i++)//前4中工况
		 {
			 Map map = weatherConditions.get(i);
			 int isCalculation = Integer.parseInt(String.valueOf(map.get("isCalculation")));
			 if(isCalculation ==1)
			 {
				 Load l = new Load();
				
				 int workingConditionNo = Integer.parseInt(String.valueOf(map.get("workingConditionNo")));
				 String wethername = String.valueOf(map.get("workingConditionName"));
				 String isWindSpeedConversion = String.valueOf(map.get("isWindSpeedConversion"));
				 boolean isWindSpeedConversionbooelan = isWindSpeedConversion.equals("1") ? true:false;
				 double windSpeed=  Double.parseDouble( String.valueOf(map.get("windSpeed")));
				 
				 double iceHeightStr =  Double.parseDouble(String.valueOf(map.get("iceThickness")));
				 //	垂直荷载
				 double verticalLoad =  getVerticalLoad(unitWeight,iceHeightStr,diameter);
	//			 System.out.println("verticalLoad:"+verticalLoad);
				 
				 double carrierDatumHeight =  Double.parseDouble(String.valueOf(baseParam.get("jzgd")));
				 double altitudeHeightv =  Double.parseDouble(String.valueOf(baseParam.get("hzgd")));
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
		 }
		
		 mapResult.put("allLoads", lists);
		 mapResult.put("partLoads", listsCritical);
		 return mapResult;
	}
	
	/**
	 * 得到临界档距
	 * @param baseParam
	 * @param wirewayParam
	 * @param weatherConditions
	 */
	public static List<Load>  getCriticalSpan(Map<String,String> baseParam,Map<String,String> wirewayParam,  List<Map<String,String>> weatherConditions,List<Load>   listsCritical )
	{
		
		ListSortUtil.sort(listsCritical, true, "rp");
		double elasticityCoefficient =  Double.parseDouble(String.valueOf(wirewayParam.get("txxs")));//弹性系数 $N$40
		double coefficientExpansion =  Double.parseDouble(String.valueOf(wirewayParam.get("pzxs")));//线膨胀系数$N$41
		 
		List<Load>  criticalSpan = new ArrayList<Load>();//临界档距
		
		 double section =  Double.parseDouble(String.valueOf(wirewayParam.get("jsjm")));//计算截面
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
//				 System.out.println(criteriontemp);
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
//				 System.out.println(temp.get(0).getLr1());
				 criticalSpan.add(temp.get(0));
//				 System.out.println(temp.get(0).getLr1());
			 }
			
			 
		 }
//		 List<Double> spans = null;
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
	 * 计算水平张力、弧垂、架线百米弧垂
	 * @param baseParam
	 * @param wirewayParam
	 * @param weatherConditions
	 * @param loads
	 * @return
	 */
	public static Map<String,Object>  calculationHorizontalTension(Map<String,String> baseParam,Map<String,String> wirewayParam,  List<Map<String,String>> weatherConditions,List<Load> loads,List<Load> loadsAll, List<Double> spans )
	{
		 Map<String,Object> mapResult = new HashMap<String,Object>();
		
		double elasticityCoefficient =  Double.parseDouble(String.valueOf(wirewayParam.get("txxs")));//弹性系数 $N$40
		double section =  Double.parseDouble(String.valueOf(wirewayParam.get("jsjm")));//计算截面 $N$44
		double coefficientExpansion =  Double.parseDouble(String.valueOf(wirewayParam.get("pzxs")));//线膨胀系数$N$41
		 
		double altitudeHeightv =  Double.parseDouble(String.valueOf(baseParam.get("hzgd")));/// 风荷载计算高度  
	
		double stringing =  Double.parseDouble( String.valueOf(baseParam.get("jxjw")));	// 架线初伸长降温 
		double F79 =       getCombinedLoadByID(2,loadsAll);          //  $F$79
		List<HorizontalTension> horizontalTensions  = new ArrayList<HorizontalTension>();
		List<Sag> sags  = new ArrayList<Sag>();
		List<MeterSag100> meterSag100  = new ArrayList<MeterSag100>();
		 
		// =$F$78 综合荷载
		 for(int i=0;i<spans.size();i++)
		 {
			 double lr = spans.get(i);
//			 if(lr ==50 )
//			 {
//				 System.out.println();
//			 }
			 Load l = getLoad(lr,loads);
			 double temperature = getTemperatureByID(l.getWorkingConditionNo()+"",weatherConditions);
			 double Tmax= l.getTmax();
			
			 double qm = Tmax/section;
			 double rm = l.getComprehensiveLoad()/section;;
			 //=B424^2*G424^2*$N$40/(24*F424^2)-(F424+$N$41*$N$40*D424)
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
				 Map map = weatherConditions.get(j);
				 int isCalculation = Integer.parseInt(String.valueOf(map.get("isCalculation")));
				 int currentWorkingConditionNo = Integer.parseInt(String.valueOf(map.get("workingConditionNo")));
				 if(isCalculation ==1)
				 {
					 
					 double comprehensiveLoad = getLoadByCurrentNo(currentWorkingConditionNo,loadsAll).getComprehensiveLoad();//.getComprehensiveLoad();//综合荷载
					 double γ = comprehensiveLoad /section;
					 double t = Double.parseDouble(String.valueOf(map.get("temperature")));
					 //=D426^2*$B424^2*$N$40/24
					 double b = Math.pow(γ, 2)* Math.pow(lr, 2)*elasticityCoefficient/24;
					 //=$H424+$N$41*$N$40*D427
					 double a = fm+coefficientExpansion*elasticityCoefficient*t;
					 //=D429^2^0.5
					 double A = Math.pow(Math.pow(a, 2), 0.5);
					
					
					 
					 int no = Integer.parseInt(String.valueOf(map.get("workingConditionNo")));
					
					 
//					 if(no==4 ||no==5 || no==7)
//					 {
//						 System.out.println("");
//					 }
					
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
//					 if(no==12)
//					 {
//						 System.out.println("11 no："+no+",k:"+k+",lr"+lr);
//					 }
					double sagv = k*Math.pow(lr, 2)/4000;
					 sag = setSag(sag,no,sagv);
			 	}
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
		if(no==4)
		 {
			sag.setIcing(σ);
		 }else  if(no==5)
		 {
			 sag.setMaxTemperature(σ);
		 }
		 else  if(no==7)
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
		 }
		 else  if(no==9)
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
	 * 根据工况序号获取load
	 * @param load
	 * @param loads
	 * @return
	 */
	private static Load getLoadByCurrentNo(int loadno ,List<Load> loads)
	{
		Load d=new Load();
		for(Load l:loads)
		{
			int  lno = l.getWorkingConditionNo();
			if(loadno == lno)
			{
			  d =l;
			  break;
			}
		}
		return d;
	}
	/**
	 * 
	 * @param load
	 * @return
	 */
	public static List<Double> initSpan(List<Double>  list ,double load)
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
	 * 根据ID获取温度值
	 * @param id
	 * @param lists
	 * @return
	 */
	public static  double getTemperatureByID(String  id,List<Map<String, String>>  lists) {
		
		double d=0;
		for(Map<String, String> map: lists)
		{
			if(id.equals(String.valueOf(map.get("workingConditionNo"))) )
			{
				d= Double.parseDouble(String.valueOf(map.get("temperature")));
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
	
	/**
	 * 对荷载进行排序
	 * @param lists
	 * @return
	 */
	private List<Load>  sortLoad(List<Load> lists)
	{
	
		for(int i=0;i<lists.size();i++) {
			for(int j=1;j<lists.size();j++)
			{
				
				 
			}
		}
		
		return lists;
		
	}
	
	/**
	 * 初始化导线
	 * @return
	 */
	private static List<String> initWireway()
	{
		
		
		return null;
	}
	
	
	/**
	 * 初始化气象条件
	 * @return
	 */
	private static List<String> initMeteorological()
	{
		
		
		return null;
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
		List steps = new ArrayList<Double>();
		 
		for(int l=1;l<=80;l++)
		{
			 
			steps.add(10*l);
		}
		
		Map<String,String> baseParam = new HashMap<String,String>();
		baseParam.put("dxxh", "JL/G1A-300/25");//导线型号
		baseParam.put("zdzl", "0.25");//最大平均运行张力
		baseParam.put("aqxs", "8");//设计安全系数
		baseParam.put("jxjw", "-25");//架线初伸长降温
		baseParam.put("hzgd", "15");//风荷载计算高度
		baseParam.put("jzgd", "10");//风荷载基准高度
		baseParam.put("czlb", "B");//地形粗糙度类别
		
		
		
		Map<String,String> wirewayParam  = new HashMap<String,String>();
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
		 temp13.put("isCalculation", "0") ;
		 temp13.put("workingConditionNo", "13") ;
		 temp13.put("temperature", "-5") ;
		 temp13.put("windSpeed", "10") ;
		 temp13.put("iceThickness", "25") ;
		 temp13.put("isWindSpeedConversion", "0") ;
		 temp13.put("remarks", "验算3") ;
		 
//		 ×	14	验算4	-5	0	3	×	验算4
		 Map<String,String> temp14 = new HashMap<String,String>();
		 temp14.put("workingConditionName", "验算4") ;
		 temp14.put("isCalculation", "0") ;
		 temp14.put("workingConditionNo", "14") ;
		 temp14.put("temperature", "-5") ;
		 temp14.put("windSpeed", "0") ;
		 temp14.put("iceThickness", "3") ;
		 temp14.put("isWindSpeedConversion", "0") ;
		 temp14.put("remarks", "验算4") ;
		 
		 
//		 ×	15	验算5	-5	0	4	×	验算5
		 Map<String,String> temp15 = new HashMap<String,String>();
		 temp15.put("workingConditionName", "验算5") ;
		 temp15.put("isCalculation", "0") ;
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
		 
		 
		 Collections.sort(weatherConditions, new Comparator<Map<String, String>>() {
	            public int compare(Map<String, String> o1, Map<String, String> o2) {
	                int map1value = Integer.parseInt(String.valueOf(o1.get("workingConditionNo")));
	                int map2value = Integer.parseInt(String.valueOf(o2.get("workingConditionNo")));
	                
	                return map1value - map2value;
	            }
	        });
		 
		// System.out.println("22222");
		initLoad(baseParam,wirewayParam,weatherConditions,steps);
		
	}
	
	
	
}
