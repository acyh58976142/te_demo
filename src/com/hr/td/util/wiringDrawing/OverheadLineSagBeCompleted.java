package com.hr.td.util.wiringDrawing;

import com.hr.td.util.wiringDrawing.parameter.ControlCondition;
import com.hr.td.util.wiringDrawing.parameter.CounductorData;
import com.hr.td.util.wiringDrawing.parameter.OLSBeCompleted;
import com.hr.td.util.wiringDrawing.parameter.OLSConstruction;
import com.hr.td.util.wiringDrawing.parameter.ProcessData;
import com.hr.td.util.wiringDrawing.parameter.SolvingEquationData;
import com.hr.td.util.wiringDrawing.vo.InputConditionData;

/**
 * 架线弧垂 - 竣工
 * @author Administrator
 *
 */
public class OverheadLineSagBeCompleted {
	
	/**

C517 = [架线弧垂(竣工)-b]

C518 = [架线弧垂(竣工)-A]

C519 = [架线弧垂(竣工)-C]

C520 = [架线弧垂(竣工)-Δ]

C521 = [架线弧垂(竣工)-σn]

C440 = 档距

$N440 = 后侧串长

$J459 = l1

$G459 = cosβ

$H459 = λ0a

$I459 = λ0b

$E442 = [导线参数弹性系数]

$E446 = [导线参数计算截面]

$F440 = [分裂数]

C497 = [架线弧垂(施工)-Ga]

C498 = [架线弧垂(施工)-Gb]

C499 = [架线弧垂(施工)-γ]

C508 = [架线弧垂(施工)-a]

C514 = [架线弧垂(竣工)-W1]

C515 = [架线弧垂(竣工)-γβ]




W1 =[架线弧垂(施工)-γ]*l1/cosβ
γβ =[架线弧垂(施工)-γ]/cosβ
a =[架线弧垂(施工)-a]
b =([架线弧垂(施工)-γ]^2*[导线参数弹性系数]*cosβ^3/24)*(l1*(l1+3*λ0a+3*λ0b)+(6*[架线弧垂(施工)-Ga]*λ0a/([架线弧垂(竣工)-W1]*[导线参数计算截面]*[分裂数]*[架线弧垂(竣工)-γβ]))*([架线弧垂(竣工)-W1]+2*[架线弧垂(施工)-Ga]/(3*[导线参数计算截面]*[分裂数]))+(6*[架线弧垂(施工)-Gb]*λ0b/([架线弧垂(竣工)-W1]*[导线参数计算截面]*[分裂数]*[架线弧垂(竣工)-γβ]))*([架线弧垂(竣工)-W1]+2*[架线弧垂(施工)-Gb]/(3*[导线参数计算截面]*[分裂数])))
A =ABS(a)
C =a/ABS(a)
Δ =13.5*b/A^3-C
σn =IF([架线弧垂(竣工)-A]=0,[架线弧垂(竣工)-b]^(1/3),IF(OR([架线弧垂(竣工)-Δ]>1,[架线弧垂(竣工)-Δ]=1),[架线弧垂(竣工)-A]/3*(2*COSH(ACOSH([架线弧垂(竣工)-Δ])/3)-[架线弧垂(竣工)-C]),IF([架线弧垂(竣工)-Δ]<1,[架线弧垂(竣工)-A]/3*(2*COS(ACOS([架线弧垂(竣工)-Δ])/3)-[架线弧垂(竣工)-C]))))
f =1/([架线弧垂(竣工)-σn]*cosβ)*([架线弧垂(施工)-γ]*档距^2/8+(([架线弧垂(施工)-Ga]/($G440*[导线参数计算截面]*[分裂数]))-[架线弧垂(施工)-γ])*λ0a^2/4+(([架线弧垂(施工)-Gb]/(前侧串长*[导线参数计算截面]*[分裂数]))-[架线弧垂(施工)-γ])*λ0b^2/4)





	**/
	
	
	/**
	 * 
	 * @param iData 输入条件
	 * @param cData 导线参数
	 * @param pData 过程数据
	 * @param seData 求解状态方程参数 
	 * @param olsc 架线弧垂(施工)
	 * @param t
	 * @return
	 */
	public OLSBeCompleted getOLSBeCompleted(InputConditionData iData,CounductorData cData,ProcessData pData,SolvingEquationData seData,OLSConstruction olsc){
		OLSBeCompleted olsBC = new OLSBeCompleted();
		
//		W1 =[架线弧垂(施工)-γ]*l1/cosβ
		olsBC.setW1(olsc.getV()*pData.getL1()/pData.getCosB());
		
//		γβ =[架线弧垂(施工)-γ]/cosβ
		olsBC.setvB(olsc.getV()/pData.getCosB());

//		b =([架线弧垂(施工)-γ]^2*[导线参数弹性系数]*cosβ^3/24)*(l1*(l1+3*λ0a+3*λ0b)+(6*[架线弧垂(施工)-Ga]*λ0a/([架线弧垂(竣工)-W1]*[导线参数计算截面]*[分裂数]*[架线弧垂(竣工)-γβ]))*([架线弧垂(竣工)-W1]+2*[架线弧垂(施工)-Ga]/(3*[导线参数计算截面]*[分裂数]))+(6*[架线弧垂(施工)-Gb]*λ0b/([架线弧垂(竣工)-W1]*[导线参数计算截面]*[分裂数]*[架线弧垂(竣工)-γβ]))*([架线弧垂(竣工)-W1]+2*[架线弧垂(施工)-Gb]/(3*[导线参数计算截面]*[分裂数])))
		olsBC.setB(getOLSBC_b(olsBC,olsc,iData,cData,pData));
		
//		a =[架线弧垂(施工)-a]//olsc.geta();
//		A =ABS(a)//olsc.getA();
//		C =a/ABS(a)//olsc.getC();
		
//		Δ =13.5*b/A^3-C
		olsBC.setDelta(13.5*olsBC.getB()/Math.pow(olsc.getA(),3)-olsc.getC());
		
//		σn =IF([架线弧垂(竣工)-A]=0,[架线弧垂(竣工)-b]^(1/3),IF(OR([架线弧垂(竣工)-Δ]>1,[架线弧垂(竣工)-Δ]=1),[架线弧垂(竣工)-A]/3*(2*COSH(ACOSH([架线弧垂(竣工)-Δ])/3)-[架线弧垂(竣工)-C]),IF([架线弧垂(竣工)-Δ]<1,[架线弧垂(竣工)-A]/3*(2*COS(ACOS([架线弧垂(竣工)-Δ])/3)-[架线弧垂(竣工)-C]))))
		olsBC.setOn(getOLSBC_on(olsBC,olsc));
		
//		f =1/([架线弧垂(竣工)-σn]*cosβ)*([架线弧垂(施工)-γ]*档距^2/8+(([架线弧垂(施工)-Ga]/($G440*[导线参数计算截面]*[分裂数]))-[架线弧垂(施工)-γ])*λ0a^2/4+(([架线弧垂(施工)-Gb]/(前侧串长*[导线参数计算截面]*[分裂数]))-[架线弧垂(施工)-γ])*λ0b^2/4)
		
		olsBC.setF(getOLSBC_f(olsBC,olsc,iData,cData,pData));
		
		return olsBC;
	}
	
	/**
	 * 分步计算 - b
	 * @param olsBC 架线弧垂(竣工)实体对象
	 * @param olsc 架线弧垂(施工)实体对象
	 * @param iData 输入参数
	 * @param cData 导线参数
	 * @param pData 过程数据
	 * @param seData 求解状态方程参数 
	 * @param cc 控制工况 参数
	 * @return  
	 */
	public double getOLSBC_b(OLSBeCompleted olsBC,OLSConstruction olsc,InputConditionData iData,CounductorData cData,ProcessData pData){
		double b=1;
		try{
			double param1 = (olsBC.getW1()*cData.getS()*iData.getSplittingNumber()*olsBC.getvB());
			double param2 = (olsBC.getW1()+2*olsc.getGa()/(3*cData.getS()*iData.getSplittingNumber()));
			b = (Math.pow(olsc.getV(),2)*cData.getE()*Math.pow(pData.getCosB(),3)/24)*(pData.getL1()*(pData.getL1()+3*pData.getP0a()+3*pData.getP0b())+(6*olsc.getGa()*pData.getP0a()/param1)*param2+(6*olsc.getGb()*pData.getP0b()/param1)*param2);
		}catch(Exception e){
			System.out.println("OverheadLineSagBeCompleted 架线弧垂 (竣工) 计算 b 出错:");
			e.printStackTrace();
		}
		
		return b;
	}
	
	/**
	 * 分步计算 - on
	 * @param olsBC 架线弧垂(竣工)实体对象
	 * @param olsc 架线弧垂(施工)实体对象
	 * @return  
	 */
	public double getOLSBC_on(OLSBeCompleted olsBC,OLSConstruction olsc){
		double on=1;
		try{
			if(olsc.getA()==0){
				on = Math.pow(olsBC.getB(),(1/3));
			}else{
				if(olsBC.getDelta()>=1){
					on = olsc.getA()/3*(2*Math.cosh(MathUtil.ACOSH(olsBC.getDelta())/3)-olsc.getC());
				}else{
					on = olsc.getA()/3*(2*Math.cos(Math.acos(olsBC.getDelta())/3)-olsc.getC());
				}
			}
		}catch(Exception e){
			System.out.println("OverheadLineSagBeCompleted 架线弧垂 (竣工) 计算 on 出错:");
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
	private String getOLSBC_f(OLSBeCompleted olsBC,OLSConstruction olsc,InputConditionData iData,CounductorData cData,ProcessData pData){
		try{
			double f = 1/(olsBC.getOn()*pData.getCosB())*(olsc.getV()*Math.pow(iData.getSpan(),2)/8+((olsc.getGa()/(iData.getFs_SLength()*cData.getS()*iData.getSplittingNumber()))-olsc.getV())*Math.pow(pData.getP0a(),2)/4+((olsc.getGb()/(iData.getBs_SLength()*cData.getS()*iData.getSplittingNumber()))-olsc.getV())*Math.pow(pData.getP0b(),2)/4);
			return String.format("%.3f", f);
		}catch(Exception e){
			System.out.println("OverheadLineSagBeCompleted 架线弧垂 (竣工) 计算 f 出错:");
			e.printStackTrace();
		}
		return null;
	}

	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
