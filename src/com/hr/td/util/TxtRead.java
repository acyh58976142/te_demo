package com.hr.td.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

/**
 * @author wp
 */
public class TxtRead {

	/**
	* @Title: TxtRead.java
	* @Package com.nari.slsd.hu.util
	* @Description: 读取txt
	* 
	* 			每次读取一行数据
	* 			
	* 			url:文件地址
	* 			
	* 			splitStr：数据间隔，如：A,A,A 则传入 ,
	* 
	* 			coding : 文件编码（utf-8,gbk......）
	* 
	* @author Merely
	* @date 2018年7月23日 下午2:38:44
	 */
	public static List<String[]> readTxt(String url, String splitStr, String coding) {
		List<String[]> str = new ArrayList<>();
		try {
			File filename = new File(url);
			InputStreamReader reader = new InputStreamReader(new FileInputStream(filename), coding);
			BufferedReader br = new BufferedReader(reader);
			String line = "";
			line = br.readLine();
			while (line != null) {
				if(null != line && !"".equals(line) && !"null".equals(line)){
					str.add(line.split(splitStr));
				}
				line = br.readLine();
			}
			br.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return str;
	}
	
	public static void main(String[] args) {
		String comoper_record = PropertiesConfig.getInstance().getProperty("comoperRecord");// 门禁记录配置文件位置
		List<String[]> list = TxtRead.readTxt(comoper_record, ",", "utf-8");
		System.out.println(list);
	}
}
