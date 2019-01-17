package com.hr.td.util;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import org.apache.log4j.Logger;

import com.fr.third.org.hsqldb.lib.StringUtil;

/**
 * 杆塔明细表生成工具类
 * @author zhh
 *
 */
public class TowerUtil {

	private static Logger logger = Logger.getLogger(TowerUtil.class);
	public static void main(String[] args) {
		System.out.println(Math.pow(2,2.5));
		// TODO Auto-generated method stub
		TowerUtil t = new TowerUtil();
		logger.info("getIColumns");
		String filePath1 = "E:\\安徽电力设计院\\huadian\\02需求RTM\\data1.TA";
		String filePath3 = "E:\\安徽电力设计院\\huadian\\02需求RTM\\data2.TA";
		String filePath2 = "E:\\安徽电力设计院\\huadian\\02需求RTM\\data3.TA";
        File file1 = new File(filePath1);
        File file2 = new File(filePath2); 
        File file3 = new File(filePath3);
		 
		List<File> list = new ArrayList<File>();
		list.add(file1);
		list.add(file2);
		list.add(file3); 
		
		t.getJColumns(TAUtil.readTa(list));
		t.getIColumns(TAUtil.readTa(list));
		logger.info("getIColumns1");
	}
	
	
	/**
	 * 获取I列的数据
	 * @param TA
	 */
	public List<List<List<String>>>   getIColumns(List<List<List<String>>> TAs) {
		List<List<List<String>>>  result = new ArrayList<List<List<String>>>();
		
		for(int l=0;l<TAs.size();l++)
		{
			List<List<String>> TA = TAs.get(l);
			
			List<Double> BColumns = getColumns(TA,1);
			List<Double> CColumns = getColumns(TA,2);
//			Map<Integer,Integer> first = new HashMap<Integer,Integer>();
//			Map<Integer,Integer> last = new HashMap<Integer,Integer>();
			List<List<String> > list= new ArrayList<List<String> >();
			int start=0;
			int end = 0;
			boolean startboo =false;
			boolean endboo = false;
			for(int i=0;i<BColumns.size();i++) {
				
				 double bvalue = BColumns.get(i);
				if(2 == (int)bvalue)
				{
					if(!startboo)
					{
						start = i;
						startboo =true;
					}else if(startboo && !endboo){
						end =i;
						Double cStart = CColumns.get(start);
						Double cEnd = 	CColumns.get(end);
							Double d =  cEnd - cStart;
							int dd = (int) Math.round(d.doubleValue());
							List<String> arr = new ArrayList<String>();
							arr.add(start+"");
							arr.add(end+"");
							arr.add(dd+"");
//							int [] arr = new int[] {start,end,dd};
							
							list.add(arr);
						start = end;
						end = 0;
						endboo =false;
					}
				}
			}
			result.add(list);
		}
		return result;
	}
	
	
	/*
	  * 判断是否为整数 
	  * @param str 传入的字符串 
	  * @return 是整数返回true,否则返回false 
	*/
	 public static boolean isInteger(String str) {  
	        Pattern pattern = Pattern.compile("^[-\\+]?[\\d]*$");  
	        return pattern.matcher(str).matches();  
	  }
	 
	 /*
	  * 判断是否为DOUBLE
	  * @param str 传入的字符串 
	  * @return 是整数返回true,否则返回false 
	*/
	 public static boolean isDouble(String sContentValue) {  
		 boolean bCheckResult=true;
		try
		{ 
			Double dCheckValue = Double.parseDouble(sContentValue);
		    	if (dCheckValue instanceof Double == false)
		    	{
		     		bCheckResult = false;
		    	}
		}
		catch(NumberFormatException e)
		{  
		    	bCheckResult = false;
		}
		
		return bCheckResult;
	  }

	/**
	 * 获取某列所有的数据
	 * @param tA
	 * @return
	 */
	private List<Double> getColumns(List<List<String>> TA,int i) {
		
		 List<Double> result = new ArrayList<Double>();
		 
		 for(List<String>  temp:TA) {
			 result.add(Double.parseDouble(temp.get(i)));
		 }
		return result;
	}
	
	

	/**
	 * 获取J列的数据
	 * @param TA
	 */
	public List<List<List<String>>>   getJColumns(List<List<List<String>>> TAs) {
		
		List<List<List<String>>>  result = new ArrayList<List<List<String>>>();
		
		for(int i=0;i<TAs.size();i++)
		{
			List<List<String>> TA = TAs.get(i);
			//TA 数据的D 列 
			List<Double> TADColumns = getColumns(TA,3);
			//TA 数据的B 列 
			List<Double> TABColumns = getColumns(TA,1);
			//TA 数据的G列
			List<Double> TAGColumns = getColumns(TA,6);
			//TA 数据的 M列
			List<Double> TAMColumns = getColumns(TA,12);
			
			//TA 数据的  C列  档距
			List<Double> TACColumns = getTACColumns(TA); //
			
			// 数据准备 T列 //R5+S5+H5-H4-R4-S4
			List<Double> TColumns = getTColumns(TADColumns,TAGColumns,TAMColumns);
			// 数据准备  U
			List<Double> UColumns =getUColumns(TColumns,TACColumns);
			// 数据准备  V
			List<Double> VColumns =getVColumns(UColumns);
			// 数据准备 X  
			List<Double> XColumns =getXYColumns(TACColumns,VColumns);
			// 数据准备Y  
			List<Double> YColumns =getXYColumns(XColumns,VColumns);
			
			// 数据准备W  
			List<Double> WColumns =getWColumns(TACColumns,VColumns);
			
			List<Double> cosr =getCosr(TABColumns,XColumns,YColumns);
			
			List<List<String>> temp = getResult(cosr,WColumns,XColumns,TABColumns);
			result.add(temp);
		}
		
		return result;
	}
	
	/**
	 * 
	 * @param cosr
	 * @param wColumns
	 * @param xColumns
	 * @param len
	 * @return
	 */
	private List<List<String>>   getResult(List<Double>  cosr, List<Double> wColumns, List<Double> xColumns, List<Double> bColumns) {
		
		List<List<String>> result = new ArrayList<List<String>>();
		double sumdw= 0d;
		double sumdx= 0d;
		
		int start=0;
		int end = 0;
		boolean startboo =false;
		boolean endboo = false;
		for(int i=0;i < bColumns.size();i++)
		{
			sumdw = sumdw+ wColumns.get(i);
			sumdx = sumdx+ xColumns.get(i);
			
			double db = bColumns.get(i);
			if(db==2.0|| db ==3.0)
			{
				
				if(!startboo)
				{
					start = i;
					startboo =true;
				}else if(startboo && !endboo){
					end =i;
					
					double dwx = sumdw/sumdx;
//					System.out.println(dwx);
					double d =(1/cosr.get(i))*(Math.pow(dwx,0.5));
				
					int dd = (int) Math.round(d);
					
					List<String> list = new ArrayList<String>();
					list.add(start+"");
					list.add(end+"");
					list.add(dd+"");
					
//					int [] arr = new int[] {start,end,dd};
//					System.out.println("d:"+d);
					result.add(list);
					
					start = end;
					end = 0;
					endboo =false;
				}
//				System.out.println("dw"+sumdw);
//				System.out.println("dx"+sumdx);
			}
//			else
//			{
//				result.add(0d);
//			}
			
		}
		
		return result;
		
	}


	/**
	 * 
	 * @param CCColumns
	 * @param vColumns
	 * @return
	 */
	private List<Double> getWColumns(List<Double> CCColumns, List<Double> vColumns) {
		List<Double>  list = new ArrayList<Double>();
		for(int i=0;i<CCColumns.size();i++) {
			
			double dc = CCColumns.get(i);
			double dv = vColumns.get(i);
			
//			System.out.println("dc:"+dc);
			double d = Math.pow(dc,3)*dv;
			list.add(d);
		}
		
		return list;
	}


	/**
	 * 获取档距
	 * @param tA
	 * @return
	 */
	private List<Double> getTACColumns(List<List<String>> tA) {

		 List<Double>  list = new ArrayList<Double>();
		 list.add(0d);
		 for(int i=1;i< tA.size();i++) {
			 double d2 = Double.parseDouble(tA.get(i-1).get(2));
			 double d = Double.parseDouble(tA.get(i).get(2));
			 double d1 = d -d2; 
			 list.add(d1);
			
		 }
		
		return list;
	}

	/**
	 * 
	 * @param xColumns
	 * @param yColumns
	 * @return
	 */
	private List<Double>  getCosr(List<Double>  bColumns,List<Double> xColumns, List<Double> yColumns) {
		
		
		List<Double> result = new ArrayList<Double>();
		double xsum=0;
		double ysum=0; 
		for(int i=0;i  < bColumns.size();i++)
		{
			double db= bColumns.get(i);
			double dx= xColumns.get(i);
			double dy= yColumns.get(i);
			
			xsum = xsum+dx;
			ysum = ysum +dy;
			
			if(db==2.0|| db ==3.0)
			{
				
				if(ysum != 0d)
				{
					double cosr = xsum/ysum;
					result.add(cosr);
				}
				
			}else {
				result.add(0d);
			}
		}
		
		return result;
	}


	/**
	 * 
	 * @param tABColumns
	 * @param xColumns
	 * @return
	 */
	private List<Double> getAAColumns(List<Double> tABColumns, List<Double> xColumns) {
		
		for(int i=0;i< tABColumns.size() ;i++)
		{
			int p = (int)tABColumns.get(i).doubleValue();
			if(p==1) {
				
			}
		}
		
		return null;
	}

	
		
	/** 
	 * 获取X 列的数据  =E4/V4
	 * @param cColumns
	 * @param vColumns
	 * @return  
	 */
	private List<Double> getXYColumns(List<Double> cColumns, List<Double> vColumns) {

		List<Double> XColumns = new ArrayList<Double>();
		int  len = 0;
		if(cColumns.size() < vColumns.size())
		{
			len = cColumns.size();
		}else
		{
			len = vColumns.size();
		}
		for(int i=1;i<len ;i++)
		{
			double cv =  cColumns.get(i);
			double vv =  vColumns.get(i);
			
			double v= cv/vv;
			if(i == 1 )
			{
				XColumns.add(v);
			}
			XColumns.add(v);
		}
		
		return XColumns;
	}


	/**
	 * 获取v列 的数据
	 * @param uColumns
	 * @return
	 */
	private List<Double> getVColumns(List<Double> uColumns) {
		
		List<Double> VColumns = new ArrayList<Double>();
		
		for(int i=1;i<uColumns.size();i++)
		{
			double v = Math.cos(uColumns.get(i));
			if(i==1)
			{
				VColumns.add(v);
			}
				VColumns.add(v);
		}
		
		return VColumns;
	}


	/**
	 * 获取J列的数据
	 * @param TA
	 */
	public List<Double>  getTColumns(List<Double> DColumns,List<Double> GColumns,List<Double> MColumns ) {
		//T列
		List<Double> TColumns = new ArrayList<Double>();
		//R5+S5+H5-H4-R4-S4
		int len =0 ;
		if(DColumns.size() <=GColumns.size())
		{
			len=DColumns.size();
		}else
		{
			if(GColumns.size() < MColumns.size()) {
				len =GColumns.size();
			}else
			{
				len = MColumns.size();
			}
		}
		
		for(int i=1;i<len;i++) {
			double gd = GColumns.get(i);
			double dd = DColumns.get(i);
			double md =MColumns.get(i);
			
			
			double gd1 = GColumns.get(i-1);
			double dd1 = DColumns.get(i-1);
			double md1 = MColumns.get(i-1);
			
			double r = gd+dd+md - (gd1+dd1+md1);
			if(TColumns.size()==0 && i==1)
			{
				TColumns.add(r);
				TColumns.add(r);
			}else
			{
				TColumns.add(r);
			}
		}
		return TColumns;
	}
	
	public List<Double>  getUColumns(List<Double> TColumns,List<Double> CColumns)
	{
		
		//U列
		List<Double> UColumns = new ArrayList<Double>();
		int len =0;
		if(TColumns.size()  < CColumns.size())
		{
			len = TColumns.size() ;
		}else
		{
			len = CColumns.size();
		}
		for(int i=1;i<len;i++)
		{
			double tv= TColumns.get(i);
			double ev= CColumns.get(i);
			double uv = Math.atan(tv/ev);
			if(i==1)
			{
				UColumns.add(uv);
				UColumns.add(uv);
			}else
			{
				UColumns.add(uv);
			}
		}
		return UColumns;
		
	}
	
}
