package com.hr.td.util.wiringDrawing;

import com.hr.td.util.wiringDrawing.parameter.ControlCondition;
import com.hr.td.util.wiringDrawing.parameter.CounductorData;
import com.hr.td.util.wiringDrawing.parameter.LineLengthData;
import com.hr.td.util.wiringDrawing.parameter.ProcessData;
import com.hr.td.util.wiringDrawing.parameter.SolvingEquationData;
import com.hr.td.util.wiringDrawing.parameter.StringLoadData;
import com.hr.td.util.wiringDrawing.parameter.WeatherConditions;
import com.hr.td.util.wiringDrawing.vo.InputConditionData;

/**
 * 求解状态方程  
 * @author Administrator
 *
 */
public class SolvingEquationOfState {
/**
 		求解状态方程  :(计算方法)
Km --[固定取值] 根据 [控制工况 计算项结果] 取   Kn 中的值 (顺序序号)
σm --[固定取值] 根据 [控制工况 计算项结果] 取 σmax 中的值 (顺序序号)
tm --[固定取值] 根据 [控制工况 计算项结果] 取 tn 中的值 (顺序序号)
a =IF($D484=5,C485/C486^2-C486+$E443*$E442*$G459*(C482-C487)+$E442*$W440*$G459^2/$J459,C485/C486^2-C486+$E443*$E442*$G459*(C482-C487))
	过牵引 算法不同
	 =IF(NOT($D484=5),G485/G486^2-G486+$E443*$E442*$G459*(G482-G487)-$E442*$W440*$G459^2/$J459,G485/G486^2-G486+$E443*$E442*$G459*(G482-G487))
b --[固定取值] 根据  Kn 中的值 (顺序序号 对应 计算项)
A =ABS(a)
C =a/ABS(a)
Δ =13.5*a/A^3-C
σn =IF(C490=0,C489^(1/3),IF(OR(C492>1,C492=1),C490/3*(2*COSH(ACOSH(C492)/3)-C491),IF(C492<1,C490/3*(2*COS(ACOS(C492)/3)-C491))))
T =C493*$E446*$F440
fm =1/(C493*$G459)*(C473*$C440^2/8+((C471/($G440*$E446*$F440))-C473)*$H459^2/4+((C472/($N440*$E446*$F440))-C473)*$I459^2/4)
 */
	
	/**
	 * 
	 * @param seData 求解状态方程
	 * @param iData 输入条件
	 * @param cData 导线参数 
	 * @param ccData 控制工况
	 * @param pData 过程参数 
	 * @param wData 气象条件
	 * @param llData 线长系数
	 * @param slData 串荷载
	 * @return
	 */
	public SolvingEquationData getSolvingEquationData(InputConditionData iData,CounductorData cData,ControlCondition ccData,ProcessData pData,WeatherConditions wData,LineLengthData llData,StringLoadData slData){
		SolvingEquationData solvingEquationData = new SolvingEquationData();
		/**
		 * 由外部逻辑获取结果
		 */
		//Km --[固定取值] 根据 [控制工况 计算项结果] 取   Kn 中的值 (顺序序号)
		//σm --[固定取值] 根据 [控制工况 计算项结果] 取 σmax 中的值 (顺序序号)
		//tm --[固定取值] 根据 [控制工况 计算项结果] 取 tn 中的值 (顺序序号)
		solvingEquationData.setKm(ccData.getKm());
		solvingEquationData.setOm(ccData.getOm());
		solvingEquationData.setTm(ccData.getTm());
		
		//a =IF($D484=5,C485/C486^2-C486+$E443*$E442*$G459*(C482-C487)+$E442*$W440*$G459^2/$J459,C485/C486^2-C486+$E443*$E442*$G459*(C482-C487))
		//	过牵引 算法不同
		//	 =IF(NOT($D484=5),G485/G486^2-G486+$E443*$E442*$G459*(G482-G487)-$E442*$W440*$G459^2/$J459,G485/G486^2-G486+$E443*$E442*$G459*(G482-G487))
		solvingEquationData.seta(getSE_a(solvingEquationData,iData,cData,ccData,pData,wData));
		
		//b --[固定取值]线长系数  Kn 中的值 (顺序序号 对应 计算项)
		solvingEquationData.setB(llData.getKn());
		
		//A =ABS(a)
		solvingEquationData.setA(Math.abs(solvingEquationData.geta()));
		
		//C =a/ABS(a)
		solvingEquationData.setC(solvingEquationData.geta()/solvingEquationData.getA());
		
		
		//Δ =13.5*a/A^3-C
		solvingEquationData.setDelta(13.5*solvingEquationData.geta()/Math.pow(solvingEquationData.getA(),3)-solvingEquationData.getC());
		
		//σn =IF(C490=0,C489^(1/3),IF(OR(C492>1,C492=1),C490/3*(2*COSH(ACOSH(C492)/3)-C491),IF(C492<1,C490/3*(2*COS(ACOS(C492)/3)-C491))))
		solvingEquationData.setOn(getSE_on(solvingEquationData));
		
		//T =C493*$E446*$F440
		//=σn*$计算截面*$分裂数
		solvingEquationData.setT(solvingEquationData.getOn()*cData.getS()*iData.getSplittingNumber());
		
		//fm =1/(C493*$G459)*(C473*$C440^2/8+((C471/($G440*$E446*$F440))-C473)*$H459^2/4+((C472/($N440*$E446*$F440))-C473)*$I459^2/4)
		//1/(σn*$cosβ)*(线长系数γ*$档距^2/8+((串荷载Ga/($前侧串长*$计算截面*$分裂数))-线长系数γ)*$λ0a^2/4+((串荷载Gb/($后侧串长*$计算截面*$分裂数))-线长系数γ)*$λ0b^2/4)
		solvingEquationData.setFm(1/(solvingEquationData.getOn()*pData.getCosB())*(llData.getY()*Math.pow(iData.getSpan(),2)/8+((slData.getGa()/(iData.getFs_SLength()*cData.getS()*iData.getSplittingNumber()))-llData.getY())*Math.pow(pData.getP0a(),2)/4+((slData.getGb()/(iData.getBs_SLength()*cData.getS()*iData.getSplittingNumber()))-llData.getY())*Math.pow(pData.getP0b(),2)/4));

				
		return solvingEquationData;
	}
	
	
	/**
	 * 分步计算 a
	 * @param seData 求解状态方程
	 * @param iData 输入条件
	 * @param cData 导线参数 
	 * @param ccData 控制工况
	 * @param pData 过程参数 
	 * @param wData 气象条件
	 * @return
	 */
	private double getSE_a(SolvingEquationData seData,InputConditionData iData,CounductorData cData,ControlCondition ccData,ProcessData pData,WeatherConditions wData){
		double a=0;
		try{
			//C485/C486^2-C486+$E443*$E442*$G459*(C482-C487)
			double param1 = seData.getKm()/Math.pow(seData.getOm(),2)-seData.getOm()+cData.getA()*cData.getE()*pData.getCosB()*(ccData.getTn()-seData.getTm());
			if(wData.getWorkingNumber() == 5){//过牵引单独 计算
				if(ccData.getControlConditionValue() == 5){//控制工况判断
					a = param1;
				}else{
					a = param1-cData.getE()*iData.getoT_length()*Math.pow(pData.getCosB(),2)/pData.getL1();
				}
			}else{
				if(ccData.getControlConditionValue() == 5){//控制工况判断
					a = param1+cData.getE()*iData.getoT_length()*Math.pow(pData.getCosB(),2)/pData.getL1();
				}else{
					a = param1;
				}
			}
		}catch(Exception e){
			System.out.println("SolvingEquationOfState 求解状态方程   计算 a 出错:");
			e.printStackTrace();
		}
		return a;
	}
	
	/**
	 * 
	 * @param seData 求解状态方程  
	 * @return
	 */
	private double getSE_on(SolvingEquationData seData){
		double on=0;
		try{
			if(seData.getA()==0)
			{
				on = Math.pow(seData.getB(),(1/3));
			}else{
				if(seData.getDelta()>=1){
					on = seData.getA()/3*(2*MathUtil.COSH(MathUtil.ACOSH(seData.getDelta())/3)-seData.getC());
				}else{
					on = seData.getA()/3*(2*Math.cos(MathUtil.ACOS(seData.getDelta())/3)-seData.getC());
				}
			}
		}catch(Exception e){
			System.out.println("SolvingEquationOfState 求解状态方程   计算 on 出错:");
			e.printStackTrace();
		}
		return on;
	}
	
	public void getSESParam(){
		
		
		
		//Km --[固定取值] 根据 [控制工况 计算项结果] 取   Kn 中的值 (顺序序号)
		//σm --[固定取值] 根据 [控制工况 计算项结果] 取 σmax 中的值 (顺序序号)
		//tm --[固定取值] 根据 [控制工况 计算项结果] 取 tn 中的值 (顺序序号)
	}
	
}
