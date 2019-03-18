package com.hr.td.util.wiringDrawing;

import com.hr.td.util.wiringDrawing.parameter.ControlCondition;
import com.hr.td.util.wiringDrawing.parameter.CounductorData;
import com.hr.td.util.wiringDrawing.parameter.OLSConstruction;
import com.hr.td.util.wiringDrawing.parameter.ProcessData;
import com.hr.td.util.wiringDrawing.parameter.SolvingEquationData;
import com.hr.td.util.wiringDrawing.vo.InputConditionData;

/**	
	t 固定列(-20	-10	0	10	20	30	40)
	Ga =前侧串重*9.80665
	Gb =后侧串重*9.80665
	γ =9.80665*$E444/$E446
	τ1 =C497/$G440/($E446*$F440)/$G459*$H459*($H459/2+$J459+$I459)
	τ2 =C499/$G459*$J459*($J459/2+$I459)
	τ3 =C499/$G459*$I459*($I459/2)
	τa =(C500+C501+C502)/$C440
	n1 =C503-C497/($E446*$F440)
	n2 =C504-($J459)*C499/$G459
	n3 =C505-($I459)*C499/$G459
	Kn(b) =((C503^3-C504^3)/(C497/$E446/$F440/$G440)+(C504^3-C505^3)/C499+(C505^3-C506^3)/C499)*$E442*$G459^6/6/($J459+$H459)
	a =IF($D484=5,C485/C486^2-C486+$E443*$E442*$G459*(C496+$AA440-C487)+$E442*$W440*$G459^2/$J459,C485/C486^2-C486+$E443*$E442*$G459*(C496+$AA440-C487))
	A =ABS(a)
	C =a/ABS(a)
	Δ =13.5*Kn(b)/A^3-C
	σn =IF(C509=0,#REF!^(1/3),IF(OR(C511>1,C511=1),C509/3*(2*COSH(ACOSH(C511)/3)-C510),IF(C511<1,C509/3*(2*COS(ACOS(C511)/3)-C510))))
	f =1/(C512*$G459)*(C499*$C440^2/8+((C497/($G440*$E446*$F440))-C499)*$H459^2/4+((C497/($N440*$E446*$F440))-C499)^2*$H459^4/(8*C499*$C440^2))

	
t 固定列(-20	-10	0	10	20	30	40)
Ga =前侧串重*9.80665
Gb =后侧串重*9.80665
γ =9.80665*单位长度重量/[导线参数计算截面]
τ1 =[架线弧垂(施工)-Ga]/前侧串长/([导线参数计算截面]*[分裂数])/cosβ*λ0a*(λ0a/2+l1+λ0b)
τ2 =[架线弧垂(施工)-γ]/cosβ*l1*(l1/2+λ0b)
τ3 =[架线弧垂(施工)-γ]/cosβ*λ0b*(λ0b/2)
τa =([架线弧垂(施工)-τ1]+[架线弧垂(施工)-τ2]+[架线弧垂(施工)-τ3])/$档距
n1 =[架线弧垂(施工)-τa]-[架线弧垂(施工)-Ga]/([导线参数计算截面]*[分裂数])
n2 =[架线弧垂(施工)-n1]-(l1)*[架线弧垂(施工)-γ]/cosβ
n3 =[架线弧垂(施工)-n2]-(λ0b)*[架线弧垂(施工)-γ]/cosβ
Kn(b) =(([架线弧垂(施工)-τa]^3-[架线弧垂(施工)-n1]^3)/([架线弧垂(施工)-Ga]/[导线参数计算截面]/[分裂数]/前侧串长)+([架线弧垂(施工)-n1]^3-[架线弧垂(施工)-n2]^3)/[架线弧垂(施工)-γ]+([架线弧垂(施工)-n2]^3-[架线弧垂(施工)-n3]^3)/[架线弧垂(施工)-γ])*[导线参数弹性系数]*cosβ^6/6/(l1+λ0a)
a =IF([控制工况-对应项目-对应值]=5,[求解状态方程-Km]/[求解状态方程-σm]^2-[求解状态方程-σm]+线膨胀系数*[导线参数弹性系数]*cosβ*([架线弧垂(施工)-t]+初伸长降温-[求解状态方程-tm])+[导线参数弹性系数]*过牵引长度*cosβ^2/l1,[求解状态方程-Km]/[求解状态方程-σm]^2-[求解状态方程-σm]+线膨胀系数*[导线参数弹性系数]*cosβ*([架线弧垂(施工)-t]+初伸长降温-[求解状态方程-tm]))
A =ABS(a)
C =a/ABS(a)
Δ =13.5*Kn(b)/A^3-C
σn =IF([架线弧垂(施工)-A]=0,#REF!^(1/3),IF(OR([架线弧垂(施工)-Δ]>1,[架线弧垂(施工)-Δ]=1),[架线弧垂(施工)-A]/3*(2*COSH(ACOSH([架线弧垂(施工)-Δ])/3)-[架线弧垂(施工)-C]),IF([架线弧垂(施工)-Δ]<1,[架线弧垂(施工)-A]/3*(2*COS(ACOS([架线弧垂(施工)-Δ])/3)-[架线弧垂(施工)-C]))))
f =1/([架线弧垂(施工)-σn]*cosβ)*([架线弧垂(施工)-γ]*$档距^2/8+(([架线弧垂(施工)-Ga]/(前侧串长*[导线参数计算截面]*[分裂数]))-[架线弧垂(施工)-γ])*λ0a^2/4+(([架线弧垂(施工)-Ga]/(前侧串长*[导线参数计算截面]*[分裂数]))-[架线弧垂(施工)-γ])^2*λ0a^4/(8*[架线弧垂(施工)-γ]*$档距^2))
**/

/**
 * 架线弧垂(施工) - 计算
 * 
 * @author Administrator
 * 
 */
public class OverheadLineSagConstruction{

	/**
	 * 
	 * @param iData 输入条件
	 * @param cData 导线参数
	 * @param pData 过程数据
	 * @param seData 求解状态方程参数 
	 * @param cc 控制工况 参数
	 * @param t
	 * @return
	 */
	public OLSConstruction getOLSConstruction(InputConditionData iData,CounductorData cData,ProcessData pData,SolvingEquationData seData,ControlCondition cc,double t){
		OLSConstruction olsc = new OLSConstruction();
		olsc.setT(t);
		
		//Ga =前侧串重*9.80665
		olsc.setGa(iData.getFs_SWeight()*9.80665);
		
		//Gb =后侧串重*9.80665
		olsc.setGb(iData.getBs_SWeight()*9.80665);
		
		//γ =9.80665*单位长度重量/[导线参数计算截面]
		olsc.setV(9.80665*cData.getW()/cData.getS());
		
		//τ1 =[架线弧垂(施工)-Ga]/前侧串长/([导线参数计算截面]*[分裂数])/cosβ*λ0a*(λ0a/2+l1+λ0b)
		olsc.setT1(olsc.getGa()/iData.getFs_SLength()/(cData.getS()*iData.getSplittingNumber())/pData.getCosB()*pData.getP0a()*(pData.getP0a()/2+pData.getL1()+pData.getP0b()));
		
		//τ2 =[架线弧垂(施工)-γ]/cosβ*l1*(l1/2+λ0b)
		olsc.setT2(olsc.getV()/pData.getCosB()*pData.getL1()*(pData.getL1()/2+pData.getP0b()));
		
		//τ3 =[架线弧垂(施工)-γ]/cosβ*λ0b*(λ0b/2)
		olsc.setT3(olsc.getV()/pData.getCosB()*pData.getP0b()*(pData.getP0b()/2));
		
		//τa =([架线弧垂(施工)-τ1]+[架线弧垂(施工)-τ2]+[架线弧垂(施工)-τ3])/档距
		olsc.setTa((olsc.getT1()+olsc.getT2()+olsc.getT3())/iData.getSpan());
		
		//n1 =[架线弧垂(施工)-τa]-[架线弧垂(施工)-Ga]/([导线参数计算截面]*[分裂数])
		olsc.setN1(olsc.getTa()-olsc.getGa()/(cData.getS()*iData.getSplittingNumber()));
		
		//n2 =[架线弧垂(施工)-n1]-(l1)*[架线弧垂(施工)-γ]/cosβ
		olsc.setN2(olsc.getN1()-pData.getL1()*olsc.getV()/pData.getCosB());
		
		//n3 =[架线弧垂(施工)-n2]-(λ0b)*[架线弧垂(施工)-γ]/cosβ
		olsc.setN3(olsc.getN2()-pData.getP0b()*olsc.getV()/pData.getCosB());
		
		//Kn(b) =(([架线弧垂(施工)-τa]^3-[架线弧垂(施工)-n1]^3)/([架线弧垂(施工)-Ga]/[导线参数计算截面]/[分裂数]/前侧串长)+([架线弧垂(施工)-n1]^3-[架线弧垂(施工)-n2]^3)/[架线弧垂(施工)-γ]+([架线弧垂(施工)-n2]^3-[架线弧垂(施工)-n3]^3)/[架线弧垂(施工)-γ])*[导线参数弹性系数]*cosβ^6/6/(l1+λ0a)
		olsc.setKn_b(getOLSC_Kn_b(olsc,iData,cData,pData));
		
		//a =IF([控制工况-对应项目-对应值]=5,[求解状态方程-Km]/[求解状态方程-σm]^2-[求解状态方程-σm]+线膨胀系数*[导线参数弹性系数]*cosβ*([架线弧垂(施工)-t]+初伸长降温-[求解状态方程-tm])+[导线参数弹性系数]*过牵引长度*cosβ^2/l1,[求解状态方程-Km]/[求解状态方程-σm]^2-[求解状态方程-σm]+线膨胀系数*[导线参数弹性系数]*cosβ*([架线弧垂(施工)-t]+初伸长降温-[求解状态方程-tm]))
		olsc.seta(getOLSC_a(olsc,iData,cData,pData,seData,cc));		
				
		//A =ABS(a)
		olsc.setA(Math.abs(olsc.geta()));
		
		//C =a/ABS(a)
		olsc.setC(olsc.geta()/olsc.getA());
		
		//Δ =13.5*Kn(b)/A^3-C
		olsc.setDelta(13.5*olsc.getKn_b()/Math.pow(olsc.getA(),3)-olsc.getC());
		
		//σn =IF([架线弧垂(施工)-A]=0,#REF!^(1/3),IF(OR([架线弧垂(施工)-Δ]>1,[架线弧垂(施工)-Δ]=1),[架线弧垂(施工)-A]/3*(2*COSH(ACOSH([架线弧垂(施工)-Δ])/3)-[架线弧垂(施工)-C]),IF([架线弧垂(施工)-Δ]<1,[架线弧垂(施工)-A]/3*(2*COS(ACOS([架线弧垂(施工)-Δ])/3)-[架线弧垂(施工)-C]))))
		olsc.setOn(getOLSC_on(olsc));
		
		//f =1/([架线弧垂(施工)-σn]*cosβ)*([架线弧垂(施工)-γ]*$档距^2/8+(([架线弧垂(施工)-Ga]/(前侧串长*[导线参数计算截面]*[分裂数]))-[架线弧垂(施工)-γ])*λ0a^2/4+(([架线弧垂(施工)-Ga]/(前侧串长*[导线参数计算截面]*[分裂数]))-[架线弧垂(施工)-γ])^2*λ0a^4/(8*[架线弧垂(施工)-γ]*$档距^2))
		olsc.setF(getOLSC_f(olsc,iData,cData,pData));
		
		return olsc;
	}
	
	/**
	 * 分步计算 Kn(b)
	 * @param olsc 架线弧垂(施工)实体对象
	 * @param iData 输入参数
	 * @param cData 导线参数
	 * @param pData 过程数据
	 * @return  
	 */
	private double getOLSC_Kn_b(OLSConstruction olsc,InputConditionData iData,CounductorData cData,ProcessData pData){
		double kn_b=1;
		try{
			kn_b = ((Math.pow(olsc.getTa(), 3)-Math.pow(olsc.getN1(),3))/(olsc.getGa()/cData.getS()/iData.getSplittingNumber()/iData.getFs_SLength())+(Math.pow(olsc.getN1(), 3)-Math.pow(olsc.getN2(), 3))/olsc.getV()+(Math.pow(olsc.getN2(),3)-Math.pow(olsc.getN3(),3))/olsc.getV())*cData.getE()*Math.pow(pData.getCosB(),6)/6/(pData.getL1()+pData.getP0a());
		}catch(Exception e){
			System.out.println("OverheadLineSagConstruction 架线弧垂 (施工) 计算 Kn(b) 出错:");
			e.printStackTrace();
		}
		
		return kn_b;
	}
	

	/**
	 * 分步计算 a
	 * @param olsc 架线弧垂(施工)实体对象
	 * @param iData 输入参数
	 * @param cData 导线参数
	 * @param pData 过程数据
	 * @param seData 求解状态方程参数 
	 * @param cc 控制工况 参数
	 * @return  
	 */
	private double getOLSC_a(OLSConstruction olsc,InputConditionData iData,CounductorData cData,ProcessData pData,SolvingEquationData seData,ControlCondition cc){
		double a=1;
		try{
			a = seData.getKm()/Math.pow(seData.getOm(), 2)-seData.getOm()+cData.getA()*cData.getE()*pData.getCosB()*(olsc.getT()+iData.getInitialElongationCooling()-seData.getTm());
			
			if(cc.getControlConditionValue()==5)
			{
				a = a + cData.getE()*iData.getoT_length()*Math.pow(pData.getCosB(),2)/pData.getL1();
			}
		}catch(Exception e){
			System.out.println("OverheadLineSagConstruction 架线弧垂 (施工) 计算 a 出错:");
			e.printStackTrace();
		}
		
		return a;
	}
	
	
	/**
	 * 分步计算 on
	 * @param olsc 架线弧垂(施工)实体对象
	 * @return  
	 */
	private double getOLSC_on(OLSConstruction olsc){
		double on=1;
		try{
			if(olsc.getA()==0){
				on = Math.pow(olsc.getKn_b(),(1/3));
			}else{
				if(olsc.getDelta()>=1){
					on = olsc.getA()/3*(2*MathUtil.COSH(MathUtil.ACOSH(olsc.getDelta())/3)-olsc.getC());
				}else{
					on = olsc.getA()/3*(2*Math.cos(Math.acos(olsc.getDelta())/3)-olsc.getC());
				}
			}
		}catch(Exception e){
			System.out.println("OverheadLineSagConstruction 架线弧垂 (施工) 计算 on 出错:");
			e.printStackTrace();
		}
		return on;
	}
	
	
	/**
	 * 分步计算 f
	 * @param olsc 架线弧垂(施工)实体对象
	 * @param iData 输入参数
	 * @param cData 导线参数
	 * @param pData 过程数据
	 * @return  
	 */
	private String getOLSC_f(OLSConstruction olsc,InputConditionData iData,CounductorData cData,ProcessData pData){
		try{
			double param1 = ((olsc.getGa()/(iData.getFs_SLength()*cData.getS()*iData.getSplittingNumber()))-olsc.getV());
			double param2 = ((olsc.getGa()/(iData.getBs_SLength()*cData.getS()*iData.getSplittingNumber()))-olsc.getV());
			double f = 1/(olsc.getOn()*pData.getCosB())*(olsc.getV()*Math.pow(iData.getSpan(),2)/8+param1*Math.pow(pData.getP0a(),2)/4+Math.pow(param2,2)*Math.pow(pData.getP0a(),4)/(8*olsc.getV()*Math.pow(iData.getSpan(),2)));
			
			return String.format("%.3f", f);
		}catch(Exception e){
			System.out.println("OverheadLineSagConstruction 架线弧垂 (施工) 计算 f 出错:");
			e.printStackTrace();
		}
		return null;
	}

}
