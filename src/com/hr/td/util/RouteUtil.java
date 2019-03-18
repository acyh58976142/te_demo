package com.hr.td.util;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.FormulaEvaluator;

public class RouteUtil {
	
	/**
	 * 读取route文件
	 * @param files
	 * @param rowNums
	 * @return
	 */
	public static  Map<String,Object>   readRoute(File file)
	{

		Map<String,Object> map = new HashMap<String,Object>();
		try
        {
            String encoding = "GBK";
//           String filePath = "E:\\安徽电力设计院\\拷给老师资料20181020\\route.xlsx";
//            file = new File(filePath);
            if (file.isFile() && file.exists())
            {
            	
            	HSSFWorkbook workbook = new HSSFWorkbook(new FileInputStream(file));
                HSSFSheet sheet = null;
                int i = workbook.getSheetIndex("耐张段信息"); // sheet表名
                int i1 = workbook.getSheetIndex("导线参数"); //  
                int i2 = workbook.getSheetIndex("地线参数"); //   
                int i3 = workbook.getSheetIndex("route"); //   
               
                
                map.put("tensileSection", getSheet(workbook,i));
                map.put("conductorParameter", getSheet(workbook,i1));
                map.put("groundParameters", getSheet(workbook,i2));
                map.put("route", getSheet(workbook,i3));
                
//                getSheet(workbook,i1);
//                getSheet(workbook,i2);
            }
            
        }
        catch (Exception e)
        {
            System.out.println("读取文件内容出错");
            e.printStackTrace();
        }
		return map;
	}
	
	/**
	 * 读取route文件
	 * @param files
	 * @param rowNums
	 * @return
	 */
	public static  Map<String,Object>   readNewRoute(File file)
	{

		Map<String,Object> map = new HashMap<String,Object>();
		try
        {
            String encoding = "GBK";
//           String filePath = "E:\\安徽电力设计院\\拷给老师资料20181020\\route.xlsx";
//            file = new File(filePath);
            if (file.isFile() && file.exists())
            {
            	
            	HSSFWorkbook workbook = new HSSFWorkbook(new FileInputStream(file));
                HSSFSheet sheet = null;
                int i = workbook.getSheetIndex("route"); // sheet表名
//                int i1 = workbook.getSheetIndex("导线参数"); //  
//                int i2 = workbook.getSheetIndex("地线参数"); //   
//                int i3 = workbook.getSheetIndex("route"); //   
               
                
                map.put("route", getSheet(workbook,i));
//                map.put("conductorParameter", getSheet(workbook,i1));
//                map.put("groundParameters", getSheet(workbook,i2));
//                map.put("route", getSheet(workbook,i3));
                
//                getSheet(workbook,i1);
//                getSheet(workbook,i2);
            }
            
        }
        catch (Exception e)
        {
            System.out.println("读取文件内容出错");
            e.printStackTrace();
        }
		return map;
	}
	
	 
	public static  List<List<String>> getSheet(HSSFWorkbook workbook,int i)
	{
//		 List<String>  list = new ArrayList<String>();
		 HSSFSheet sheet = null;  
         sheet = workbook.getSheetAt(i);
         FormulaEvaluator evaluator = workbook.getCreationHelper().createFormulaEvaluator();
    	 List<List<String>> lists = new ArrayList<List<String>>();
         for (int j = 0; j < sheet.getLastRowNum() + 1; j++) {// getLastRowNum
        	 List<String>  list = new ArrayList<String>();                                      
             HSSFRow row = sheet.getRow(j);
             if (row != null) {
                 for (int k = 0; k < row.getLastCellNum(); k++) {// getLastCellNum
                	 HSSFCell cell = row.getCell(k)  ;                                  // 是获取最后一个不为空的列是第几个
                     if (row.getCell(k) != null) { // getCell 获取单元格数据
//                         System.out.print(row.getCell(k) + "\t");
//                         list.add(row.getCell(k).toString());
                         if (cell!=null) {
                        	 list.add(getCellValueFormula(cell,evaluator));
                         }
                     } else {
                        
                         list.add("");
                     }
                 }
             }
             lists.add(list);
           
         }
		 
		 return lists;
	}
	
	 public static String getCellValueFormula(Cell cell, FormulaEvaluator formulaEvaluator) {
	        if (cell == null || formulaEvaluator == null) {
	            return null;
	        }
	        String str= "";
	        if (cell.getCellType() == Cell.CELL_TYPE_FORMULA) {
	        	
	        	try{
	        		str= cell.getStringCellValue();
	        	}catch(Exception e) {
	        		str=   String.valueOf(formulaEvaluator.evaluate(cell).getNumberValue());
	        	}
	        }else
	        {
	        	str =  getCellValue(cell);
	        }
	         
	
	        return str;
	    }

	 //未处理公式
	    public static String getCellValue(Cell cell) {
	        if (cell == null) {
	            return null;
	        }
	         
	       
	        switch (cell.getCellType()) {
	        	case Cell.CELL_TYPE_NUMERIC:
	                     return String.valueOf(cell.getNumericCellValue());
	            case Cell.CELL_TYPE_STRING:
	                return cell.getRichStringCellValue().getString().trim();
	            case Cell.CELL_TYPE_BOOLEAN:
	                return String.valueOf(cell.getBooleanCellValue());
	            case Cell.CELL_TYPE_FORMULA:
	                return cell.getCellFormula();
	            default:
	                return null;
	        }
	    }
	
	public static void  main(String args [])
	{
        //System.out.println(conductorParameter);
        //System.out.println(groundParameters);
		
		 
		String filePath1 = "E:\\安徽电力设计院\\huadian\\02需求RTM\\调整\\塔文件\\AJ0-AJ29\\data.TA";
		String filePath2 = "E:\\安徽电力设计院\\huadian\\02需求RTM\\调整\\塔文件\\AJ20-AJ30\\data.TA";
		String filePath3 = "E:\\安徽电力设计院\\huadian\\02需求RTM\\调整\\塔文件\\AJ21-T88\\data.TA";
		String filePath4 = "E:\\安徽电力设计院\\huadian\\02需求RTM\\调整\\塔文件\\AJ22-T118\\data.TA";
        File file1 = new File(filePath1);
        File file2 = new File(filePath2); 
        File file3 = new File(filePath3);
        File file4 = new File(filePath4);
		 
		List<File> list = new ArrayList<File>();
		list.add(file1);
		list.add(file2);
		list.add(file3); 
		list.add(file4); 
		
		List<List<List<String>>> tas =TAUtil.readTa(list);
		
		
		 File routefile = new File("E:\\安徽电力设计院\\huadian\\02需求RTM\\调整\\route4.xls");
		 
		List<List<String>> route = (List<List<String>>) readNewRoute(routefile).get("route");
		route.remove(0);
		readNewRoute(tas,route);
		
	}
	
	
	public static List<List<String>> readNewRoute(List<List<List<String>>> tas , List<List<String>> route)
	{
		
		///StringUtils.join(routeOne.toArray(), ","))
		Map<String,List<List<String>>> map = new HashMap<String,List<List<String>>>();
		List<List<String>> listResult = new ArrayList<List<String>>();
		//route 文件分类   
		for(List<String> routeOne :route)
		{
			String node = routeOne.get(0);//第一列数据
			String directionNode =  routeOne.get(14);//第15列数据
			String nodeStr = node+"#"+directionNode;
			
			if(ToolsUtil.isEmpty(map.get(nodeStr))) {
				List<List<String>> list2s = new ArrayList<List<String>>();
				
				list2s.add(routeOne);
				map.put(nodeStr, list2s);
			}else
			{
				List<List<String>> list2s = map.get(nodeStr);
				list2s.add(routeOne);
				map.put(nodeStr, list2s);
			}
		}
		//route 文件一行对应TA文件多行 
//		Set keys= map.keySet();
		
		for(String key: map.keySet())
		{
			 List<List<String>> routeLists = map.get(key);
			 String M ="";
//			 System.out.println(key);
			 if(key.equals("AJ0#AJ1"))
			 {
				 System.out.println(key);
			 }
			 if(!ToolsUtil.isEmpty(routeLists) && routeLists.size()> 0 )
			 {
				 M = routeLists.get(0).get(12).trim();
			 }
			
			List<List<String>> listTas = getSomeTa(key,tas, M);
//			if(listTas ==null)
//			{
//				System.out.println(key);
//			}
			getAIAndSetV(listTas,map.get(key),listResult,tas,M);
		}
		System.out.println(listResult.size());
//		Math.atan(arg0)
		
		
		
		return listResult;
	}
	/**
	 * 
	 * @param listTas
	 * @param list
	 * @return
	 */
	private static void getAIAndSetV(List<List<String>> listTas, List<List<String>> list, List<List<String>>  result,List<List<List<String>>> tas,String M) {

		if(!ToolsUtil.isEmpty(listTas) )
		{
			if( listTas.size() >2)
			{
				
				for(int i=1;i<listTas.size()-1;i++)
				{
					List<String> rowData = listTas.get(i);
					setRoute(i,rowData,list,listTas,result,tas,M);
				}
				
			}
			else
			{
				System.out.println("2");
				setRoute(0,listTas.get(0),list,listTas,result,tas,M);
				
				
			}
		}
			
		else
		{
			System.out.println("1");
		}
	}

	
	public static void setRoute(int i ,List<String> rowData ,List<List<String>> list,List<List<String>> listTas,List<List<String>>  result,List<List<List<String>>> tas,String M)
	{
			String A = rowData.get(0);
			List<String> rowRoute =  new ArrayList<String>();
			List<Double> darr = null;
			String B = "";
			String C ="";
			for(int j=0;j<list.size();j++)
			{
				
				 try {
					rowRoute = deepCopy(list.get(j));
				} catch (ClassNotFoundException e) {
					e.printStackTrace();
				} catch (IOException e) {
					e.printStackTrace();
				}
				if(listTas.size() == 2)
				{
					 B = rowRoute.get(1);
					 C = rowRoute.get(2);
				}else  
				{
				 darr = getAngle(rowRoute.get(1),rowRoute.get(2),rowRoute.get(15),rowRoute.get(16),listTas.get(i-1).get(1),rowData.get(1));
				 B = darr.get(0).toString();
				 C = darr.get(1).toString();
				}
				
				String D = rowData.get(0);
				String E = rowData.get(8);
				String F = rowData.get(9);
				String G = rowData.get(6);
			
				
				String H = getHColumn(D,tas) ;// rowData.get(3);
//					System.out.println(D+"H:"+H);
				String I = getIColumn(D,tas) ;
//					System.out.println(D+"I:"+I);
				String L = rowData.get(1);
				
				
				List<String> nextStr = listTas.get(i+1);
				String AC = nextStr.get(1);
				String AD =nextStr.get(0);
				String AE =nextStr.get(8);
				String AF =nextStr.get(9);
				String AG =nextStr.get(6);
				
				String AH = getHColumn(AD,tas);
				String AI = getIColumn(AD,tas);
//					System.out.println(AD+",AH:"+AH);
//					System.out.println(AD+",AI:"+AI);
				
				rowRoute.set(1, B);
				rowRoute.set(2, C);
				rowRoute.set(3, D);
				rowRoute.set(4, E);
				rowRoute.set(5, F);
				rowRoute.set(6, G);
				rowRoute.set(7, H);
				rowRoute.set(8, I);
				rowRoute.set(9, L);
				
			
				if(rowRoute.size() < 29)
				{
					rowRoute.add(AC);
				}else {
					rowRoute.set(29, AC);
				}
				
				if(rowRoute.size() <30)
				{
					rowRoute.add(AD);
				}else {
					rowRoute.set(30, AD);
				}
				
				if(rowRoute.size() < 31)
				{
					rowRoute.add(AE);
				}else {
					rowRoute.set(31, AE);
				}
				

				if(rowRoute.size() <32)
				{
					rowRoute.add(AF);
				}else {
					rowRoute.set(32, AF);
				}
				

				if(rowRoute.size() <33)
				{
					rowRoute.add(AG);
				}else {
					rowRoute.set(33, AG);
				}

				if(rowRoute.size() < 34)
				{
					rowRoute.add(AH);
				}else {
					rowRoute.set(34, AH);
				}

				if(rowRoute.size() <35)
				{
					rowRoute.add(AI);
				}else {
					rowRoute.set(35, AI);
				}

				result.add(rowRoute);
			}
	}
	
	
	private static String getHColumn(String ka, List<List<List<String>>> tas) {
		
		for(List<List<String>> onetas:tas)
		{
			for(List<String> oneRowtas: onetas)
			{
				if(oneRowtas.get(7).trim().equals(ka))
				{
					return oneRowtas.get(12);
				}
				
			}
		}
		return "0";
	}
	
	
private static String getIColumn(String ka, List<List<List<String>>> tas) {
		
		for(List<List<String>> onetas:tas)
		{
			for(List<String> oneRowtas: onetas)
			{
				if(oneRowtas.get(7).trim().equals(ka)  && oneRowtas.get(1).trim().equals("1"))
				{
					return oneRowtas.get(11);
				}
				
			}
		}
		return "0";
	}

	public static <T> List<T> deepCopy(List<T> src) throws IOException, ClassNotFoundException {  
	    ByteArrayOutputStream byteOut = new ByteArrayOutputStream();  
	    ObjectOutputStream out = new ObjectOutputStream(byteOut);  
	    out.writeObject(src);  
	 
	    ByteArrayInputStream byteIn = new ByteArrayInputStream(byteOut.toByteArray());  
	    ObjectInputStream in = new ObjectInputStream(byteIn);  
	    @SuppressWarnings("unchecked")  
	    List<T> dest = (List<T>) in.readObject();  
	    return dest;  
	}  
	 
	/**
	 * 
	 * @param key
	 * @param tas
	 * @return
	 */
	private static List<List<String>> getSomeTa(String key, List<List<List<String>>> tas,String M) {

		List<List<String>>   result = new ArrayList<List<String>>();
		String [] arr = key.split("#");		
		boolean arr0 = false;
		boolean arr1 = false;
		if("1.0".equals(M)) {
			for(List<List<String>> onetas:tas)
			{
				for(List<String> oneRowtas: onetas)
				{
					if(!arr0 && !arr1 && arr[0].trim().equals(oneRowtas.get(7).trim())) {
						
							result.add(oneRowtas);
							arr0= true;
					}else if(arr0 && !arr1 && !arr[1].trim().equals(oneRowtas.get(7).trim())) {
						result.add(oneRowtas);
					}
					else if(arr0 && !arr1 && arr[1].trim().equals(oneRowtas.get(7).trim())) {
							
							result.add(oneRowtas);
							arr1 = true;
							return result ;
					}
				}
			}
		}else if("-1.0".equals(M))
		{
			for(List<List<String>> onetas:tas)
			{
//				for(List<String> oneRowtas: onetas)
				for(int i=onetas.size()-1;i>= 0;i--)
				{
					List<String> oneRowtas = onetas.get(i);
					if(!arr0 && !arr1 && arr[0].trim().equals(oneRowtas.get(7).trim())) {
						
							result.add(oneRowtas);
							arr0= true;
					}else if(arr0 && !arr1 && !arr[1].trim().equals(oneRowtas.get(7).trim())) {
						result.add(oneRowtas);
					}
					else if(arr0 && !arr1 && arr[1].trim().equals(oneRowtas.get(7).trim())) {
							
							result.add(oneRowtas);
							arr1 = true;
							return result ;
					}
				}
			}
		}
		
		return null;
	}

	/**
	 * 算角度
	 * @param x1
	 * @param y1
	 * @param x2
	 * @param y2
	 * @param m1
	 * @param m2
	 * @return
	 */
	private static  List<Double> getAngle(String sx1,String sy1,String sx2,String sy2,String sm1,String sm2) {
		List<Double> list = new ArrayList<Double>();
		double x1 = Double.parseDouble(sx1);
		double y1 = Double.parseDouble(sy1);
		double x2 = Double.parseDouble(sx2);
		double y2 = Double.parseDouble(sy2);
		double m1 = Double.parseDouble(sm1);
		double m2 = Double.parseDouble(sm2);
		
		double tanb= (y2-y1)/(x2-x1);
		double b = Math.atan(tanb);
		
		double y3 = y1+(m2 -m1)/Math.sin(b);
		double x3 = x1+(m2 -m1)/Math.cos(b);
		
		list.add(x3);
		list.add(y3);
		return list;
	}
}

