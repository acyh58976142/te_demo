package com.hr.td.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;





public class TAUtil {

	public static List<String> towerChecktop = new ArrayList<>(Arrays.asList("杆塔编号", "塔位里程千米+米", "杆塔型式", "杆塔定位呼高(米)", "档  距(米)",
			"水平档距(米)", "垂直档距(米)", "设计施工基面升降(米)", "耐张段长(米)", "代表档距(米)", "转角角度", "导、地线接头", "交叉跨越及处理意见", "校核"));
	
	public static List<String> towertop = new ArrayList<>(Arrays.asList("杆塔编号", "塔位里程千米+米", "杆塔型式", "杆塔定位呼高(米)", "档  距(米)",
			"水平档距(米)", "垂直档距(米)", "设计施工基面升降(米)", "耐张段长(米)", "代表档距(米)", "转角角度", "导、地线接头", "交叉跨越及处理意见"));
	
	public static List<String> partstop = new ArrayList<>(Arrays.asList("杆塔编号", "塔位里程千米+米", "杆塔型式", "杆塔定位呼高(米)", "档  距(米)",
			"水平档距(米)", "垂直档距(米)", "耐张段长(米)", "代表档距(米)", "转角角度", "导线绝缘子串","", "跳线悬垂串","", "地线金具串", "", "OPGW光缆金具串", "", "OPGW光缆（平断面前进方向左侧）","","","", "OPGW光缆（平断面前进方向右侧）","","","","防振锤数量(只)","",""));
	
	public static List<String> partsVicetop = new ArrayList<>(Arrays.asList("杆塔编号", "塔位里程千米+米", "杆塔型式", "杆塔定位呼高(米)", "档  距(米)",
			"水平档距(米)", "垂直档距(米)", "耐张段长(米)", "代表档距(米)", "转角角度", "代号","数量(串)", "代号","数量(串)", "代号", "数量(串)", "代号", "数量(串)", "盘长盘号","接续盒数量(只)","余缆架数量(只)","引下线夹数量(只)", "盘长盘号","接续盒数量(只)","余缆架数量(只)","引下线夹数量(只)","导线","地线","OPGW"));
	
	//结构基础信息excel表头
	public static List<List<String>> structuraltop(){
		List<List<String>> structuraltop=new ArrayList<>();
		structuraltop.add(Arrays.asList("杆塔编号","杆塔型号","呼高(m)","转角度数","杆塔基础","","","","","岩土描述","","","","备注"));
		structuraltop.add(Arrays.asList("","","","","塔腿编号","基础型号","基柱出土高度(m)","埋深(m)","图号","岩土名称及概况","承载力特征值(kPa)","微地貌描述","地下水位埋深(m)",""));
	    return structuraltop;
	}
	
	/**
	 * 读取多个ta文件
	 * @param files
	 * @param rowNums
	 * @return
	 */
	public static List<List<List<String>>>  readTa(List<File> files)
	{

		List<List<List<String>>>  result  = new ArrayList<List<List<String>>>();
//		for(File file:files )
		for(int l=0;l<files.size();l++)
		{
				List<List<String>>   resultObj  = new  ArrayList<List<String>>();
				File file = files.get(l);
				try
		        {
		            String encoding = "GBK";
		           /* String filePath = "E:\\安徽电力设计院\\huadian\\02需求RTM\\data.TA";
		            File file = new File(filePath);*/
		            if (file.isFile() && file.exists())
		            { 
		            	
		            	// 判断文件是否存在
		                InputStreamReader read = new InputStreamReader( new FileInputStream(file), encoding);// 考虑到编码格式
		                 
	//	                InputStreamReader read = new InputStreamReader( in, encoding);// 考虑到编码格式
		                BufferedReader bufferedReader = new BufferedReader(read);
		                String lineTxt = null;
	
		              
		                while ((lineTxt = bufferedReader.readLine()) != null)
		                {
		                	List<String> list = new ArrayList<String>();
		                	 
		                	//如果是第一行数据
		       
			                	
			                   if(!"V1".equals(lineTxt.trim()))
			                   {
			                	String [] temp = lineTxt.split(",");
			                	String str = temp[0];
			                	temp[0] = str;
	//		                	list =  Arrays.asList(temp);
			                	list = new ArrayList<String>(Arrays.asList(temp));
			                   }
			                   
			                   if(list.size() > 0)
			                   {
			                	   resultObj.add(list);
			                   }
		                }
		               
		               //补空行 
		                bufferedReader.close();
		                read.close();
		            }
		            
		        }
		        catch (Exception e)
		        {
		            System.out.println("读取文件内容出错");
		            e.printStackTrace();
		        }
				result.add(resultObj);
		}
		
		return result;
	}
	
	
	/**
	 * 读取多个ta文件
	 * @param files
	 * @param rowNums
	 * @return
	 */
	public static List<List<String>> readTa(List<File> files,int rowNums)
	{
		rowNums = rowNums -3;
		List<List<String>>  result  = new ArrayList<List<String>>();
//		for(File file:files )
		 int cnums = 0;
		for(int l=0;l<files.size();l++)
		{
			File file = files.get(l);
			try
	        {
	            String encoding = "GBK";
	           /* String filePath = "E:\\安徽电力设计院\\huadian\\02需求RTM\\data.TA";
	            File file = new File(filePath);*/
	            int tempNum=0;
	            if (file.isFile() && file.exists())
	            { 
	            	
	            	// 判断文件是否存在
	                InputStreamReader read = new InputStreamReader( new FileInputStream(file), encoding);// 考虑到编码格式
	                 
//	                InputStreamReader read = new InputStreamReader( in, encoding);// 考虑到编码格式
	                BufferedReader bufferedReader = new BufferedReader(read);
	                String lineTxt = null;

	              
	                while ((lineTxt = bufferedReader.readLine()) != null)
	                {
	                	List<String> list = new ArrayList<String>();
	                	 
	                	//如果是第一行数据
	                	if(l!=0 && !"V1".equals(lineTxt.trim()) &&tempNum ==0) {
	                		result.add(initEmpty(cnums));
//	                		tempNum++;
	                		
	                	}else if(tempNum ==rowNums)
	                	{
	                		result.add(initEmpty(cnums));
//	                		tempNum++;
	                		result.add(initEmpty(cnums));
//	                		tempNum++;
	                		result.add(initEmpty(cnums));
	                		tempNum =0;
	                	}
	       
		                	
		                   if(!"V1".equals(lineTxt.trim()))
		                   {
		                	String [] temp = lineTxt.split(",");
		                	cnums = temp.length;
		                	String str = temp[0];
		                	temp[0] = str;
//		                	list =  Arrays.asList(temp);
		                	list = new ArrayList<String>(Arrays.asList(temp));
		                   }
		                   
		                   if(list.size() > 0)
		                   {
		                	   result.add(list);
		                	   result.add(list);
		                	   tempNum=tempNum+2;
		                   }
	                }
	               List<String>   templist=  result.get(result.size()-1);
	               String str = templist.get(0);
	               str ="备注"+str;
	               templist.remove(0);
	               templist.add(0, str);
	               
	               result.remove(result.size()-1);
	               result.add( templist);
	               
	               //补空行 
	                if(tempNum<= rowNums) {
	                	int count = rowNums -tempNum;
	                	for(int  k=0;k<count;k++ )
	                	{
	                		result.add(initEmpty(cnums));
	                	}
	                	result.add(initEmpty(cnums));
	                	result.add(initEmpty(cnums));
	                }
	                bufferedReader.close();
	                read.close();
	            }
	            
	        }
	        catch (Exception e)
	        {
	            System.out.println("读取文件内容出错");
	            e.printStackTrace();
	        }

		}

        
		result.add(0, initEmpty(cnums));
		
		return result;
		
	}
	private static int beginEmptyLines=2;//地质前N页需要空的行
	private static int endEmptyLines=5;//地质最后一页需要空的行
	
	/**
	 * 读取多个ta文件
	 * @param files
	 * @param rowNums
	 * @return
	 */
	public static List<List<String>> readTaNoRepeat(List<File> files,int rowNums)
	{
		rowNums = rowNums -beginEmptyLines;
		List<List<String>>  result  = new ArrayList<List<String>>();
//		for(File file:files )
		 int cnums = 0;
		for(int l=0;l<files.size();l++)
		{
			File file = files.get(l);
			try
	        {
	            String encoding = "GBK";
	           /* String filePath = "E:\\安徽电力设计院\\huadian\\02需求RTM\\data.TA";
	            File file = new File(filePath);*/
	            int tempNum=0;
	            if (file.isFile() && file.exists())
	            { 
	            	// 判断文件是否存在
	                InputStreamReader read = new InputStreamReader( new FileInputStream(file), encoding);// 考虑到编码格式
	                 
//	                InputStreamReader read = new InputStreamReader( in, encoding);// 考虑到编码格式
	                BufferedReader bufferedReader = new BufferedReader(read);
	                String lineTxt = null;

	                while ((lineTxt = bufferedReader.readLine()) != null)
	                {
	                	List<String> list = new ArrayList<String>();
	                	 
	                	//如果是第一行数据
	                	if(l!=0 && !"V1".equals(lineTxt.trim()) &&tempNum ==0) {
	                		result.add(initEmpty(cnums));
//	                		tempNum++;
	                		
	                	}else if(tempNum ==rowNums)
	                	{
	                		for(int n=0;n< beginEmptyLines;n++)
	                		{
	                			result.add(initEmpty(cnums));
	                		}
	                		tempNum =0;
	                	}
	       
		                	
		                   if(!"V1".equals(lineTxt.trim()))
		                   {
		                	String [] temp = lineTxt.split(",");
		                	cnums = temp.length;
		                	String str = temp[0];
		                	temp[0] = str;
//		                	list =  Arrays.asList(temp);
		                	list = new ArrayList<String>(Arrays.asList(temp));
		                   }
		                   
		                   if(list.size() > 0)
		                   {
//		                	   result.add(list);
		                	   result.add(list);
		                	   tempNum=tempNum+1;
		                   }
	                }
//	               List<String>   templist=  result.get(result.size()-1);
//	               String str = templist.get(0);
//	               str ="备注"+str;
//	               templist.remove(0);
//	               templist.add(0, str);
//	               
//	               result.remove(result.size()-1);
//	               result.add( templist);
	               
	               //补空行 
	                if(tempNum<= rowNums && l<files.size()-1) {
	                	int count = rowNums -tempNum;
	                	for(int  k=0;k<count;k++ )
	                	{
	                		result.add(initEmpty(cnums));
	                	}
//	                	result.add(initEmpty(cnums));
//	                	result.add(initEmpty(cnums));
	                }
	                //补最后一页的空 endEmptyLines 行
	                else  if(tempNum<= rowNums && l == files.size()-1) {
	                	int count = rowNums -tempNum +  (endEmptyLines - beginEmptyLines );
	                	for(int  k=0;k<count;k++ )
	                	{
	                		result.add(initEmpty(cnums));
	                	}
//	                	result.add(initEmpty(cnums));
//	                	result.add(initEmpty(cnums));
	                }
	                bufferedReader.close();
	                read.close();
	            }
	            
	        }
	        catch (Exception e)
	        {
	            System.out.println("读取文件内容出错");
	            e.printStackTrace();
	        }

		}

        
//		result.add(0, initEmpty(cnums));
		
		return result;
		
	}
	/**
	 * 
	 * @param colunms
	 * @return
	 */
	private static List<String> initEmpty(int colunms) {
		
		List<String> list =new ArrayList();
		for(int i=0;i< colunms;i++)
		{
				list.add(0+"");
		}
		return list;
	}


	/**
	 * 分装杆塔明细数据
	 * @param result TA文件数据
	 * @return towerobj 杆塔明细数据
	 */
	public static List<List<String>> getTowerDetailByTa(List<List<String>> result)
	{
		List<List<String>> towerobj = new ArrayList<List<String>>();
		
		List<Integer> indexList = new ArrayList<Integer>();//每个TA文件数据最后1行
		List<Integer> dexList = new ArrayList<Integer>();//每个TA文件数据倒数第2行
		for (int i = 0; i < result.size(); i++) {
		
			if(result.get(i).get(0).length()>3){
				if(result.get(i).get(0).substring(0, 2).equals("备注")){
					if(result.get(i).get(0).equals(result.get(i-1).get(0)))
						indexList.add(i);
					else{
						dexList.add(i);	
					}
				}
			}
		}
		for (int i = 0; i < result.size(); i++) {
		List<String> obj = result.get(i);
		List<String> towerstr1 = new ArrayList<String>();

		towerstr1.add(obj.get(0));// 杆塔编号
		towerstr1.add(getMileage(obj.get(2)));// 塔位里程千米+米
		towerstr1.add(ToolsUtil.isEmpty(obj.get(8)) ? "" : getStyle(obj.get(8)));// 杆塔型式
		towerstr1.add(obj.get(9));// 杆塔定位呼高(米)
		
		int pageSize = 55;//每页表格数据
		int pageNum =(int) (Math.floor(i/pageSize)+1);//页数
		if (i!=0&&(i)%pageSize!=0&&(i+1)%pageSize!=0&&(i+2)%pageSize!=0&&i != result.size() - 1&&i != result.size() - 2) {// 第一条数据或分页数据
		
			Double odd = CommonTool.ConvertToDouble(result.get(i + 1).get(2)) - CommonTool.ConvertToDouble(obj.get(2));
			Double Even = CommonTool.ConvertToDouble(obj.get(2)) - CommonTool.ConvertToDouble(result.get(i - 1).get(2));
			if(dexList.contains(i)){//每个TA文件数据倒数第2行
				towerstr1.add(Math.round(Even)+ "");// 档 距(米)
				towerstr1.add(Math.round((Even)/2)+ "");//水平档距(米)
			}
			else if(indexList.contains(i)){//每个TA文件数据倒数第1行
				towerstr1.add("");// 档 距(米)
				towerstr1.add(Math.round((CommonTool.ConvertToDouble(result.get(i - 1).get(2)) - CommonTool.ConvertToDouble(result.get(i - 3).get(2)))/2)+ "");//水平档距(米)
			}
			else if(indexList.contains(i-1)||indexList.contains(i-2)){//每个TA文件数据底部
				towerstr1.add("");// 档 距(米)
				towerstr1.add("");//水平档距(米)
			}
			else if((i+4)%pageSize==0&&i != result.size() - 4){//每页倒数第4条且不是最后一页
				towerstr1.add(Math.round(Even)+ "");// 档 距(米)
				towerstr1.add(Math.round((Even+CommonTool.ConvertToDouble(result.get(i+5).get(2)) - CommonTool.ConvertToDouble(obj.get(2)))/2)+ "");//水平档距(米)
			}
			else if((i+3)%pageSize==0&&i != result.size() - 3){//每页倒数第3条且不是最后一页
				towerstr1.add(Math.round(CommonTool.ConvertToDouble(result.get(i + 4).get(2)) - CommonTool.ConvertToDouble(obj.get(2)))+ "");// 档 距(米)
				towerstr1.add(Math.round((CommonTool.ConvertToDouble(result.get(i + 4).get(2)) - CommonTool.ConvertToDouble(obj.get(2))+ CommonTool.ConvertToDouble(obj.get(2)) - CommonTool.ConvertToDouble(result.get(i - 2).get(2)))/2)+ "");//水平档距(米)
			}
			else if((i-1)%pageSize==0&&i != 1){//每页第1条且不是第一页
				towerstr1.add(Math.round(CommonTool.ConvertToDouble(obj.get(2)) - CommonTool.ConvertToDouble(result.get(i - 4).get(2)))+ "");// 档 距(米)
				towerstr1.add(Math.round((CommonTool.ConvertToDouble(obj.get(2)) - CommonTool.ConvertToDouble(result.get(i - 4).get(2))+CommonTool.ConvertToDouble(result.get(i+2).get(2)) - CommonTool.ConvertToDouble(obj.get(2)))/2)+ "");//水平档距(米)
			}
			else if((i-2)%pageSize==0&&i != 2){//每页第2条且不是第一页
				towerstr1.add(Math.round(odd)+ "");// 档 距(米)
				towerstr1.add(Math.round((odd+ CommonTool.ConvertToDouble(obj.get(2)) - CommonTool.ConvertToDouble(result.get(i - 5).get(2)))/2)+ "");//水平档距(米)
			}
			else if((i+pageNum+1)%2==0){//奇数
				towerstr1.add(Math.round(odd)+ "");// 档 距(米)
				towerstr1.add(Math.round((odd+ CommonTool.ConvertToDouble(obj.get(2)) - CommonTool.ConvertToDouble(result.get(i - 2).get(2)))/2)+ "");//水平档距(米)
			}else{//偶数
				towerstr1.add(Math.round(Even)+ "");// 档 距(米)
				towerstr1.add(Math.round((Even+CommonTool.ConvertToDouble(result.get(i+2).get(2)) - CommonTool.ConvertToDouble(obj.get(2)))/2)+ "");//水平档距(米)
			}
		} else {
			towerstr1.add("");// 档 距(米)
			towerstr1.add("");// 水平档距(米)
		}
			
		towerstr1.add(obj.get(21));// 垂直档距(米)
		towerstr1.add(obj.get(12).trim().equals("0.000")? "" :obj.get(12));// 设计施工基面升降(米)
		towerstr1.add("");// 耐张段长(米)
		towerstr1.add("");// 代表档距(米)

		towerstr1.add(getAngle(obj.get(20)));// 转角角度

		towerobj.add(towerstr1);
	}
		return towerobj;
	}
	
	
	/**
	 * 分装组配件明细数据
	 * @param result TA文件数据
	 * @return partsobj 组配件明细数据
	 */
	public static List<List<String>> getPartsDetailByTa(List<List<String>> result,Map<String, Object> bracketHeight)
	{
		List<List<String>> partsobj = new ArrayList<List<String>>();
		
		List<Integer> indexList = new ArrayList<Integer>();//每个TA文件数据最后1行
		List<Integer> dexList = new ArrayList<Integer>();//每个TA文件数据倒数第2行
		for (int i = 0; i < result.size(); i++) {
		
			if(result.get(i).get(0).length()>3){
				if(result.get(i).get(0).substring(0, 2).equals("备注")){
					if(result.get(i).get(0).equals(result.get(i-1).get(0)))
						indexList.add(i);
					else{
						dexList.add(i);	
					}
				}
			}
		}
		for (int i = 0; i < result.size(); i++) {
		List<String> obj = result.get(i);
		List<String> partsstr1 = new ArrayList<String>();

		partsstr1.add(obj.get(0));// 杆塔编号
		partsstr1.add(getMileage(obj.get(2)));// 塔位里程千米+米
		String taStyle= ToolsUtil.isEmpty(obj.get(8)) ? "" : getStyle(obj.get(8));
		partsstr1.add(taStyle);// 杆塔型式
		partsstr1.add(obj.get(9));// 杆塔定位呼高(米)
		
		int pageSize = 55;//每页表格数据
		int pageNum =(int) (Math.floor(i/pageSize)+1);//页数
		if (i!=0&&(i)%pageSize!=0&&(i+1)%pageSize!=0&&(i+2)%pageSize!=0&&i != result.size() - 1&&i != result.size() - 2) {// 第一条数据或分页数据
		
			Double odd = CommonTool.ConvertToDouble(result.get(i + 1).get(2)) - CommonTool.ConvertToDouble(obj.get(2));
			Double Even = CommonTool.ConvertToDouble(obj.get(2)) - CommonTool.ConvertToDouble(result.get(i - 1).get(2));
			if(dexList.contains(i)){//每个TA文件数据倒数第2行
				partsstr1.add(Math.round(Even)+ "");// 档 距(米)
				partsstr1.add(Math.round((Even)/2)+ "");//水平档距(米)
			}
			else if(indexList.contains(i)){//每个TA文件数据倒数第1行
				partsstr1.add("");// 档 距(米)
				partsstr1.add(Math.round((CommonTool.ConvertToDouble(result.get(i - 1).get(2)) - CommonTool.ConvertToDouble(result.get(i - 3).get(2)))/2)+ "");//水平档距(米)
			}
			else if(indexList.contains(i-1)||indexList.contains(i-2)){//每个TA文件数据底部
				partsstr1.add("");// 档 距(米)
				partsstr1.add("");//水平档距(米)
			}
			else if((i+4)%pageSize==0&&i != result.size() - 4){//每页倒数第4条且不是最后一页
				partsstr1.add(Math.round(Even)+ "");// 档 距(米)
				partsstr1.add(Math.round((Even+CommonTool.ConvertToDouble(result.get(i+5).get(2)) - CommonTool.ConvertToDouble(obj.get(2)))/2)+ "");//水平档距(米)
			}
			else if((i+3)%pageSize==0&&i != result.size() - 3){//每页倒数第3条且不是最后一页
				partsstr1.add(Math.round(CommonTool.ConvertToDouble(result.get(i + 4).get(2)) - CommonTool.ConvertToDouble(obj.get(2)))+ "");// 档 距(米)
				partsstr1.add(Math.round((CommonTool.ConvertToDouble(result.get(i + 4).get(2)) - CommonTool.ConvertToDouble(obj.get(2))+ CommonTool.ConvertToDouble(obj.get(2)) - CommonTool.ConvertToDouble(result.get(i - 2).get(2)))/2)+ "");//水平档距(米)
			}
			else if((i-1)%pageSize==0&&i != 1){//每页第1条且不是第一页
				partsstr1.add(Math.round(CommonTool.ConvertToDouble(obj.get(2)) - CommonTool.ConvertToDouble(result.get(i - 4).get(2)))+ "");// 档 距(米)
				partsstr1.add(Math.round((CommonTool.ConvertToDouble(obj.get(2)) - CommonTool.ConvertToDouble(result.get(i - 4).get(2))+CommonTool.ConvertToDouble(result.get(i+2).get(2)) - CommonTool.ConvertToDouble(obj.get(2)))/2)+ "");//水平档距(米)
			}
			else if((i-2)%pageSize==0&&i != 2){//每页第2条且不是第一页
				partsstr1.add(Math.round(odd)+ "");// 档 距(米)
				partsstr1.add(Math.round((odd+ CommonTool.ConvertToDouble(obj.get(2)) - CommonTool.ConvertToDouble(result.get(i - 5).get(2)))/2)+ "");//水平档距(米)
			}
			else if((i+pageNum+1)%2==0){//奇数
				partsstr1.add(Math.round(odd)+ "");// 档 距(米)
				partsstr1.add(Math.round((odd+ CommonTool.ConvertToDouble(obj.get(2)) - CommonTool.ConvertToDouble(result.get(i - 2).get(2)))/2)+ "");//水平档距(米)
			}else{//偶数
				partsstr1.add(Math.round(Even)+ "");// 档 距(米)
				partsstr1.add(Math.round((Even+CommonTool.ConvertToDouble(result.get(i+2).get(2)) - CommonTool.ConvertToDouble(obj.get(2)))/2)+ "");//水平档距(米)
			}
		} else {
			partsstr1.add("");// 档 距(米)
			partsstr1.add("");// 水平档距(米)
		}
			
		partsstr1.add(obj.get(21));// 垂直档距(米)
		partsstr1.add("");// 耐张段长(米)
		partsstr1.add("");// 代表档距(米)

		partsstr1.add(getAngle(obj.get(20)));// 转角角度
		partsstr1.add("");// 代号
		partsstr1.add("");// 数量(串)
		partsstr1.add("");// 代号
		partsstr1.add("");// 数量(串)
		partsstr1.add("");// 代号
		partsstr1.add("");// 数量(串)
		partsstr1.add("");// 代号
		partsstr1.add("");// 数量(串)
		partsstr1.add("");
		partsstr1.add("");
		partsstr1.add("");
		partsstr1.add("");
		partsstr1.add("");
		partsstr1.add("");
		partsstr1.add("");
		partsstr1.add("");
		partsstr1.add("");
		partsstr1.add("");
		partsstr1.add("");
		
		String height="";
		Double huheight=ToolsUtil.isEmpty(obj.get(9)) ? 0 : Double.parseDouble(obj.get(9));
		
		if(bracketHeight.containsKey(taStyle)){
			height=(Math.ceil((huheight+Double.parseDouble((String) bracketHeight.get(taStyle))-8)/2)+"");	
		}
		partsstr1.add(height);
		partsstr1.add(ToolsUtil.isEmpty(obj.get(8)) ? "" : obj.get(8));
			
		partsobj.add(partsstr1);
	}
		return partsobj;
	}
	
	/**
	 * 获取塔位型式
	 * 
	 * @param string
	 * @return style型式
	 */
	public static String getStyle(String str) {
		String style = new String();
		if (str.contains("-")) {
			
			style = str.substring(0,str.lastIndexOf("-")).trim();
		} else {
			style = str;
		}
		return style;
	}

	/**
	 * 获取塔位里程
	 * 
	 * @param string
	 * @return mileage里程
	 */
	public static String getMileage(String str) {
		String mileage = new String();
		Double doubleAge = CommonTool.ConvertToDouble(str);
		Long age = Math.round(doubleAge);
		String ageStr = new String();
		if (age != 0) {
			ageStr = age.toString();
		}
		if (age == 0) {
			mileage = "0+000";
		} else if (age < 10) {
			mileage = ("0+00" + ageStr);
		} else if (age < 100) {
			mileage = ("0+0" + ageStr);
		} else if (age < 1000) {
			mileage = ("0+" + ageStr);
		} else {
			mileage = ageStr.substring(0, ageStr.length() - 3) + "+"
					+ ageStr.substring(ageStr.length() - 3, ageStr.length());
		}
		return mileage;
	}

	/**
	 * 获取转角角度
	 * 
	 * @param string
	 * @return angle转角角度
	 */
	public static String getAngle(String str) {
		String angle = new String();
		Double doubleAngle = CommonTool.ConvertToDouble(str);
		int spot = str.indexOf(".");
		if (doubleAngle > 0) {
			angle = "左" + str.substring(0, spot) + "° " + str.substring(spot + 1, spot + 3) + "’ "
					+ str.substring(spot + 3, spot + 5) + "” ";
		} else if (doubleAngle < 0) {
			angle = "右" + str.substring(1, spot) + "° " + str.substring(spot + 1, spot + 3) + "’ "
					+ str.substring(spot + 3, spot + 5) + "” ";
			;
		} else {
			angle = "";
		}
		return angle;
	}
	
	public static void  main(String args [])
	{
	
	/*	String filePath1 = "F:\\hdc\\02需求RTM\\11\\11\\data1.ind";*/
	
	}
	
	
	/**
	 * 读取Ind文件 交叉跨域情况
	 * @param files
	 * @param rowNums
	 * @return
	 */
	public static 	List<List<String>> readInd1(String filePath)
	{


		List<List<String>>   resultObj  = new  ArrayList<List<String>>();
			
				try
		        {
		            String encoding = "GBK";
		           //String filePath = "F:\\hdc\\02需求RTM\\data1.ind";
		            //String filePath = "E:\\upload\\data1.ind";	
		            File file = new File(filePath);
		            if (file.isFile() && file.exists())
		            { 
		            	
		            	// 判断文件是否存在
		                InputStreamReader read = new InputStreamReader( new FileInputStream(file), encoding);// 考虑到编码格式
		                 
	//	                InputStreamReader read = new InputStreamReader( in, encoding);// 考虑到编码格式
		                BufferedReader bufferedReader = new BufferedReader(read);
		                String lineTxt = null;
	
		              
		                while (!ToolsUtil.isEmpty(lineTxt = bufferedReader.readLine()))
		                {
		                	List<String> list = new ArrayList<String>();
		                	 
		                	//如果是第一行数据
		       
			                	
			                   if("/".equals(lineTxt.substring(0, 1)))
			                   {
			                	String [] temp = lineTxt.split(",");
			                	String str = temp[0];
			                	temp[0] = str;
	//		                	list =  Arrays.asList(temp);
			                	list = new ArrayList<String>(Arrays.asList(temp));
			                   }
			                   
			                   if(list.size() > 0)
			                   {
			                	   resultObj.add(list);
			                	  
			                   }
		                }
		               
		               //补空行 
		                bufferedReader.close();
		                read.close();
		            }
		            
		        }
		        catch (Exception e)
		        {
		            System.out.println("读取文件内容出错");
		            e.printStackTrace();
		        }
		
		return resultObj;
	}
	
	/**
	 * 读取Ind文件 交叉跨域情况
	 * @param files
	 * @param rowNums
	 * @return
	 */
	public static 	List<List<String>> readInd(String filePath)
	{


		List<List<String>>   resultObj  = new  ArrayList<List<String>>();
			
				try
		        {
		            String encoding = "GBK";
		            //String filePath = "F:\\hdc\\02需求RTM\\阜三-白果\\塔文件\\AJ0-AJ29\\data.ind";
		            //String filePath = "E:\\upload\\data.ind";
		            File file = new File(filePath);
		            if (file.isFile() && file.exists())
		            { 
		            	
		            	// 判断文件是否存在
		                InputStreamReader read = new InputStreamReader( new FileInputStream(file), encoding);// 考虑到编码格式
		                 
	//	                InputStreamReader read = new InputStreamReader( in, encoding);// 考虑到编码格式
		                BufferedReader bufferedReader = new BufferedReader(read);
		                String lineTxt = null;
	
		              
		                while ((lineTxt = bufferedReader.readLine()) != null)
		                {
		                	List<String> list = new ArrayList<String>();
		                	 
			                	String [] temp = lineTxt.split(",");
			                	String str = temp[0];
			                	temp[0] = str;
	//		                	list =  Arrays.asList(temp);
			                	list = new ArrayList<String>(Arrays.asList(temp));
			                  
			                   
			                   if(list.size() > 0)
			                   {
			                	   resultObj.add(list);
			                	  
			                   }
		                }
		               
		               //补空行 
		                bufferedReader.close();
		                read.close();
		            }
		            
		        }
		        catch (Exception e)
		        {
		            System.out.println("读取文件内容出错");
		            e.printStackTrace();
		        }
		
		return resultObj;
	}
	public static List<List<String>> getTowerDetailByTaceshi(List<List<String>> result,String name,int attchCount)
	{
		
			List<List<List<String>>>  indObj = new ArrayList<List<List<String>>>();
			for(int i = 1; i <=attchCount; i++) {
				String fileObj1 ="E:\\ahdc\\"+name+"\\塔文件\\ta"+i+"\\data1.ind";
				String fileObj2 ="E:\\ahdc\\"+name+"\\塔文件\\ta"+i+"\\data.ind";
				List<List<String>>   indObj1=	readInd1(fileObj1);
				List<List<String>>   indObj2= readInd(fileObj2);
				
				List<List<String>>  sumindObj= getDataByComparison(indObj1,indObj2);
				indObj.add(sumindObj);
			}
			int k = 0;
			int pageSize = 55;//每页表格数
		
			for(int i = 1; i < result.size()-4; i++) {
				List<String>   list=  new  ArrayList<String>();
				StringBuffer tempBuffer = new StringBuffer();
				if(k<indObj.size()){
				for(int j = 0; j < indObj.get(k).size(); j++) {
					double indMileage = Double.parseDouble(indObj.get(k).get(j).get(3));
					double taMileage = Double.parseDouble(result.get(i).get(2));
					double taMileage2 = Double.parseDouble(result.get(i+1).get(2));
					double taMileage3 = Double.parseDouble(result.get(i+4).get(2));
					
						if(indMileage>taMileage&&indMileage<taMileage2){
							list.add(indObj.get(k).get(j).get(5));
			
						}
						
						else if(taMileage2==0&&taMileage3!=0){
							if(indMileage>taMileage&&indMileage<taMileage3){
								list.add(indObj.get(k).get(j).get(5));		
							}
						}
					
					if(result.get(i).get(0).length()>3){
						if(result.get(i).get(0).substring(0, 2).equals("备注")){
							if(result.get(i).get(0).equals(result.get(i-1).get(0))){
							k++;
							break;
							}
						}
					}
				}
			}
				 Map<String,Integer> map = new HashMap<String,Integer>();
				 
			        for (String temp : list) {
			            Integer count =  map.get(temp);
			            map.put(temp, (count == null) ? 1 : count + 1);
			        }
			        
			        for (String str : map.keySet()) {
			               //map.keySet()返回的是所有key的值
			        	Integer  in = map.get(str);//得到每个key多对用value的值
			        	tempBuffer.append("跨"+str+""+in+"次,");
			        	  }
			       
			        result.get(i).set(109, tempBuffer+"");
			   
			}
		List<List<String>> towerobj = new ArrayList<List<String>>();
		
		List<Integer> indexList = new ArrayList<Integer>();//每个TA文件数据最后1行
		List<Integer> dexList = new ArrayList<Integer>();//每个TA文件数据倒数第2行
		for (int i = 0; i < result.size(); i++) {
		
			if(result.get(i).get(0).length()>3){
				if(result.get(i).get(0).substring(0, 2).equals("备注")){
					if(result.get(i).get(0).equals(result.get(i-1).get(0)))
						indexList.add(i);
					else{
						dexList.add(i);	
					}
				}
			}
		}
		for (int i = 0; i < result.size(); i++) {
		List<String> obj = result.get(i);
		List<String> towerstr1 = new ArrayList<String>();

		towerstr1.add(obj.get(0));// 杆塔编号
		towerstr1.add(getMileage(obj.get(2)));// 塔位里程千米+米
		towerstr1.add(ToolsUtil.isEmpty(obj.get(8)) ? "" : getStyle(obj.get(8)));// 杆塔型式
		towerstr1.add(obj.get(9));// 杆塔定位呼高(米)
		
		int pageNum =(int) (Math.floor(i/pageSize)+1);//页数
		if (i!=0&&(i)%pageSize!=0&&(i+1)%pageSize!=0&&(i+2)%pageSize!=0&&i != result.size() - 1&&i != result.size() - 2) {// 第一条数据或分页数据
		
			Double odd = CommonTool.ConvertToDouble(result.get(i + 1).get(2)) - CommonTool.ConvertToDouble(obj.get(2));
			Double Even = CommonTool.ConvertToDouble(obj.get(2)) - CommonTool.ConvertToDouble(result.get(i - 1).get(2));
			if(dexList.contains(i)){//每个TA文件数据倒数第2行
				towerstr1.add(Math.round(Even)+ "");// 档 距(米)
				towerstr1.add(Math.round((Even)/2)+ "");//水平档距(米)
			}
			else if(indexList.contains(i)){//每个TA文件数据倒数第1行
				towerstr1.add("");// 档 距(米)
				towerstr1.add(Math.round((CommonTool.ConvertToDouble(result.get(i - 1).get(2)) - CommonTool.ConvertToDouble(result.get(i - 3).get(2)))/2)+ "");//水平档距(米)
			}
			else if(indexList.contains(i-1)||indexList.contains(i-2)){//每个TA文件数据底部
				towerstr1.add("");// 档 距(米)
				towerstr1.add("");//水平档距(米)
			}
			else if((i+4)%pageSize==0&&i != result.size() - 4){//每页倒数第4条且不是最后一页
				towerstr1.add(Math.round(Even)+ "");// 档 距(米)
				towerstr1.add(Math.round((Even+CommonTool.ConvertToDouble(result.get(i+5).get(2)) - CommonTool.ConvertToDouble(obj.get(2)))/2)+ "");//水平档距(米)
			}
			else if((i+3)%pageSize==0&&i != result.size() - 3){//每页倒数第3条且不是最后一页
				towerstr1.add(Math.round(CommonTool.ConvertToDouble(result.get(i + 4).get(2)) - CommonTool.ConvertToDouble(obj.get(2)))+ "");// 档 距(米)
				towerstr1.add(Math.round((CommonTool.ConvertToDouble(result.get(i + 4).get(2)) - CommonTool.ConvertToDouble(obj.get(2))+ CommonTool.ConvertToDouble(obj.get(2)) - CommonTool.ConvertToDouble(result.get(i - 2).get(2)))/2)+ "");//水平档距(米)
			}
			else if((i-1)%pageSize==0&&i != 1){//每页第1条且不是第一页
				towerstr1.add(Math.round(CommonTool.ConvertToDouble(obj.get(2)) - CommonTool.ConvertToDouble(result.get(i - 4).get(2)))+ "");// 档 距(米)
				towerstr1.add(Math.round((CommonTool.ConvertToDouble(obj.get(2)) - CommonTool.ConvertToDouble(result.get(i - 4).get(2))+CommonTool.ConvertToDouble(result.get(i+2).get(2)) - CommonTool.ConvertToDouble(obj.get(2)))/2)+ "");//水平档距(米)
			}
			else if((i-2)%pageSize==0&&i != 2){//每页第2条且不是第一页
				towerstr1.add(Math.round(odd)+ "");// 档 距(米)
				towerstr1.add(Math.round((odd+ CommonTool.ConvertToDouble(obj.get(2)) - CommonTool.ConvertToDouble(result.get(i - 5).get(2)))/2)+ "");//水平档距(米)
			}
			else if((i+pageNum+1)%2==0){//奇数
				towerstr1.add(Math.round(odd)+ "");// 档 距(米)
				towerstr1.add(Math.round((odd+ CommonTool.ConvertToDouble(obj.get(2)) - CommonTool.ConvertToDouble(result.get(i - 2).get(2)))/2)+ "");//水平档距(米)
			}else{//偶数
				towerstr1.add(Math.round(Even)+ "");// 档 距(米)
				towerstr1.add(Math.round((Even+CommonTool.ConvertToDouble(result.get(i+2).get(2)) - CommonTool.ConvertToDouble(obj.get(2)))/2)+ "");//水平档距(米)
			}
		} else {
			towerstr1.add("");// 档 距(米)
			towerstr1.add("");// 水平档距(米)
		}
			
		towerstr1.add(obj.get(21));// 垂直档距(米)
		towerstr1.add(obj.get(12).trim().equals("0.000")? "" :obj.get(12));// 设计施工基面升降(米)
		towerstr1.add("");// 耐张段长(米)
		towerstr1.add("");// 代表档距(米)

		towerstr1.add(getAngle(obj.get(20)));// 转角角度
		towerstr1.add("");
		if ((i-1)%pageSize!=0) {
			towerstr1.add(obj.get(109));
		}else{
			towerstr1.add("");
		}
		towerstr1.add("");
		towerobj.add(towerstr1);
	}
		return towerobj;
	}
		
	
	/**
	 *  对读取到两个ind文件的数据进行比对后，根据业务逻辑处理indObj1的数据并返回
	 *  @param List<List<String>> indObj1,List<List<String>> indObj
	 *  @return List<List<String>>
	 */
	public static List<List<String>> getDataByComparison(List<List<String>> indObj1,List<List<String>> indObj)
	{
		        //对比indObj1和indObj，在indObj1中去除indObj没有的第8位序号
				/*Iterator<List<String>> it = indObj1.iterator();
				while(it.hasNext()){
				    List<String> list = it.next();
				    Iterator<List<String>> it2 = indObj.iterator();
				    boolean flag = false;
				    		   
					if ( list.get(5).equals("沟") || list.get(5).equals("路")  ) {
				    	   while(it2.hasNext()) {
						           List<String> list2 = it2.next();
						     
						    	   if( (list.get(7)).equals(list2.get(7))){
								    	  flag = true;
								       
							       }
						      
						    }
				    	    if (!flag) {
						    	   it.remove();
				            }
				     }
				}*/
				
		for (int i = 0; i < indObj1.size(); i++) {
			boolean flag = false; 
			if ( indObj1.get(i).get(5).equals("沟") ||indObj1.get(i).get(5).equals("路")  ) {
				for (int j = 0; j < indObj.size(); j++) {
					if( (indObj1.get(i).get(7)).equals(indObj.get(j).get(7))  ){
						flag=true;
					}
				}
				if (!flag) {
					indObj1.remove(i);
					i--;
				}
			}
			
			
		}
		
				//对比indObj1和indObj,将indObj中第8位为0的数据加入indObj1中
				for (int i = 0; i < indObj.size(); i++) {
					if ((indObj.get(i).get(7)).equals("0")) {
						if(-15<=Double.parseDouble(indObj.get(i).get(4))&&Double.parseDouble(indObj.get(i).get(4))<=15){
							indObj1.add(indObj.get(i));
						}
					}
				}
				
				//分别取出35kv，110kv，220kv，500kv和比对，
				//如果前一个公里数和后一个公里数分别相差10m，13m，15m，20m，保留一个
									
				List<String> arrInt = new ArrayList<>();
				
				List<List<String>> List35 = new ArrayList<List<String>>();
				List<List<String>> List110 = new ArrayList<List<String>>();
				List<List<String>> List220 = new ArrayList<List<String>>();
				List<List<String>> List500 = new ArrayList<List<String>>();
				
				for(int i=0;i < indObj1.size();i++){
					        List<String> list = indObj1.get(i);
					   
							if (list.get(5).equals("35kV")||list.get(5).equals("35KV")||list.get(5).equals("35kv")) {
								List35.add(list);
							}
			                if (list.get(5).equals("110kV")||list.get(5).equals("110KV")||list.get(5).equals("110kv")) {
			                	List110.add(list);
							}
			                if (list.get(5).equals("220kV")||list.get(5).equals("220KV")||list.get(5).equals("220kv")) {
			                	List220.add(list);
							}
			                if (list.get(5).equals("500kV")||list.get(5).equals("500KV")||list.get(5).equals("500kv")) {
			                	List500.add(list);
							}
						
				}
				
				for(int i=1;i < List35.size();i++){
					List<String> list = List35.get(i);
					List<String> list1 = List35.get(i-1);
					Double result = Double.parseDouble(list.get(3)) - Double.parseDouble(list1.get(3));
					if (result < 10) {
						arrInt.add(list.get(7));
					}
				}
				
				for(int i=1;i < List110.size();i++){
					List<String> list = List110.get(i);
					List<String> list1 = List110.get(i-1);
					Double result = Double.parseDouble(list.get(3)) - Double.parseDouble(list1.get(3));
					if (result < 13) {
						arrInt.add(list.get(7));
					}
				}
				
				for(int i=1;i < List220.size();i++){
					List<String> list = List220.get(i);
					List<String> list1 = List220.get(i-1);
					Double result = Double.parseDouble(list.get(3)) - Double.parseDouble(list1.get(3));
					if (result < 15) {
						arrInt.add(list.get(7));
					}
				}
				
				for(int i=1;i < List500.size();i++){
					List<String> list = List500.get(i);
					List<String> list1 = List500.get(i-1);
					Double result = Double.parseDouble(list.get(3)) - Double.parseDouble(list1.get(3));
					if (result < 20) {
						arrInt.add(list.get(7));
					}
				}
				
				for (int i = 0; i < indObj1.size(); i++) {
					 if(arrInt.contains(indObj1.get(i).get(7))){
						 indObj1.remove(i);
						i--;
						
					    }
				}
		
		return indObj1;
	}
	
	public static List<List<String>> readTaceshi()
	{
		int rowNums = 55 -3;
		List<List<String>>  result  = new ArrayList<List<String>>();
//		for(File file:files )
		 int cnums = 0;

			try
	        {
	            String encoding = "GBK";
	           String filePath = "F:\\hdc\\02需求RTM\\11\\11\\data.TA";
	            File file = new File(filePath);
	            int tempNum=0;
	            int l=0;
	    	
	            if (file.isFile() && file.exists())
	            { 
	            	
	            	// 判断文件是否存在
	                InputStreamReader read = new InputStreamReader( new FileInputStream(file), encoding);// 考虑到编码格式
	                 
//	                InputStreamReader read = new InputStreamReader( in, encoding);// 考虑到编码格式
	                BufferedReader bufferedReader = new BufferedReader(read);
	                String lineTxt = null;

	              
	                while ((lineTxt = bufferedReader.readLine()) != null)
	                {
	                	List<String> list = new ArrayList<String>();
	                	 
	                	//如果是第一行数据
	                	if(l!=0 && !"V1".equals(lineTxt.trim()) &&tempNum ==0) {
	                		result.add(initEmpty(cnums));
//	                		tempNum++;
	                		
	                	}else if(tempNum ==rowNums)
	                	{
	                		result.add(initEmpty(cnums));
//	                		tempNum++;
	                		result.add(initEmpty(cnums));
//	                		tempNum++;
	                		result.add(initEmpty(cnums));
	                		tempNum =0;
	                	}
	       
		                	
		                   if(!"V1".equals(lineTxt.trim()))
		                   {
		                	String [] temp = lineTxt.split(",");
		                	cnums = temp.length;
		                	String str = temp[0];
		                	temp[0] = str;
//		                	list =  Arrays.asList(temp);
		                	list = new ArrayList<String>(Arrays.asList(temp));
		                   }
		                   
		                   if(list.size() > 0)
		                   {
		                	   result.add(list);
		                	   result.add(list);
		                	   tempNum=tempNum+2;
		                   }
	                }
	               List<String>   templist=  result.get(result.size()-1);
	               String str = templist.get(0);
	               str ="备注"+str;
	               templist.remove(0);
	               templist.add(0, str);
	               
	               result.remove(result.size()-1);
	               result.add( templist);
	               
	               //补空行 
	                if(tempNum<= rowNums) {
	                	int count = rowNums -tempNum;
	                	for(int  k=0;k<count;k++ )
	                	{
	                		result.add(initEmpty(cnums));
	                	}
	                	result.add(initEmpty(cnums));
	                	result.add(initEmpty(cnums));
	                }
	                bufferedReader.close();
	                read.close();
	            }
	            
	        }
	        catch (Exception e)
	        {
	            System.out.println("读取文件内容出错");
	            e.printStackTrace();
	        }

        
		result.add(0, initEmpty(cnums));
		
		return result;
		
	}
}

