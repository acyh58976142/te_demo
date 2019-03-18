package com.hr.td.util.wiringDrawing;
/**
 * 推算公式
 * @author Administrator
 */
public class MathUtil {
//	正切 (Sec(x))= 1 / Cos(x)  
	public static double SEC(double x){
		return 1/Math.cos(x);
	}
	
//	余切 (Csc(x))= 1 / Sin(x)
	public static double CSC(double x){
		return 1/Math.sin(x);
	}
	
//	余切 (Ctan(x))= 1 / Tan(x) 
	public static double CTAN(double x){
		return 1/Math.tan(x);
	}
	
//	反正弦 (Asin(x))= Atan(x / Sqrt(-x * x + 1))
	public static double ASIN(double x){
		return Math.atan(x/Math.sqrt(-x*x+1));
	}
	
//	反余弦 (Acos(x))= Atan(-x / Sqrt(-x * x + 1)) + 2 * Atan(1)
	public static double ACOS(double x){
		return Math.atan(-x/Math.sqrt(-x*x+1)+2*Math.atan(x));
	}
	
//	反正割 (Asec(x))= 2 * Atan(1) – Atan(Sign(x) / Sqrt(x * x – 1))
//	反余割 (Acsc(x))= Atan(Sign(x) / Sqrt(x * x – 1))
//	反余切 (Acot(x))= 2 * Atan(1) - Atan(x)  
//	双曲正弦 (Sinh(x))= (Exp(x) – Exp(-x)) / 2 
//	双曲余弦 (Cosh(x))= (Exp(x) + Exp(-x)) / 2 
	public static double COSH(double x){
		return (Math.exp(x)+Math.exp(-x))/2;
	}
//	双曲正切 (Tanh(x))= (Exp(x) – Exp(-x)) / (Exp(x) + Exp(-x))  
//	双曲正割 (Sech(x))= 2 / (Exp(x) + Exp(-x))  
//	双曲余割 (Csch(x))= 2 / (Exp(x) – Exp(-x))  
//	双曲余切 (Coth(x))= (Exp(x) + Exp(-x)) / (Exp(x) – Exp(-x))  
//	反双曲正弦 (Asinh(x))= Log(x + Sqrt(x * x + 1))  
//	反双曲余弦 (Acosh(x))= Log(x + Sqrt(x * x – 1))  
	public static double ACOSH(double x){
		return Math.log(x+Math.sqrt(x*x-1)); 
	}
//	反双曲正切 (Atanh(x))= Log((1 + x) / (1 – x)) / 2  
//	反双曲正割 (AsecH(x))= Log((Sqrt(-x * x + 1) + 1) / x)  
//	反双曲余割 (Acsch(x))= Log((Sign(x) * Sqrt(x * x + 1) + 1) / x)  
//	反双曲余切 (Acoth(x))= Log((x + 1) / (x – 1)) / 2 
}
