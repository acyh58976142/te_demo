package com.hr.td.util;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;

import org.apache.commons.io.FileUtils;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
 
public class ExcelUtil {
	
    // 读取，全部sheet表及数据
    public void showExcel() throws Exception {
        HSSFWorkbook workbook = new HSSFWorkbook(new FileInputStream(new File("C:/tmp/t1.xls")));
        HSSFSheet sheet = null;
        for (int i = 0; i < workbook.getNumberOfSheets(); i++) {// 获取每个Sheet表
            sheet = workbook.getSheetAt(i);
            for (int j = 0; j < sheet.getLastRowNum() + 1; j++) {// getLastRowNum，获取最后一行的行标
                HSSFRow row = sheet.getRow(j);
                if (row != null) {
                    for (int k = 0; k < row.getLastCellNum(); k++) {// getLastCellNum，是获取最后一个不为空的列是第几个
                        if (row.getCell(k) != null) { // getCell 获取单元格数据
                            System.out.print(row.getCell(k) + "\t");
                        } else {
                            System.out.print("\t");
                        }
                    }
                }
                System.out.println(""); // 读完一行后换行
            }
            System.out.println("读取sheet表：" + workbook.getSheetName(i) + " 完成");
        }
    }
 
    // 读取，指定sheet表及数据
    public void showExcel2() throws Exception {
        HSSFWorkbook workbook = new HSSFWorkbook(new FileInputStream(new File("C:/tmp/t1.xls")));
        HSSFSheet sheet = null;
        int i = workbook.getSheetIndex("Sheet1"); // sheet表名
        sheet = workbook.getSheetAt(i);
        for (int j = 0; j < sheet.getLastRowNum() + 1; j++) {// getLastRowNum
                                                                // 获取最后一行的行标
            HSSFRow row = sheet.getRow(j);
            if (row != null) {
                for (int k = 0; k < row.getLastCellNum(); k++) {// getLastCellNum
                                                                // 是获取最后一个不为空的列是第几个
                    if (row.getCell(k) != null) { // getCell 获取单元格数据
                        System.out.print(row.getCell(k) + "\t");
                    } else {
                        System.out.print("\t");
                    }
                }
            }
            System.out.println("");
        }
    }
 
    // 写入，往指定sheet表的单元格
    public void insertExcel3() throws Exception {
    	File file1 = new File("C:/tmp/t1.xls");
    	File file2 = new File("C:/tmp/t2.xls");
    	if (!file2.exists()) {
    		FileUtils.copyFile(file1, file2);
		}
        HSSFWorkbook workbook = new HSSFWorkbook(new FileInputStream(file2)); // 读取的文件
        HSSFSheet sheet = null;
        int i = workbook.getSheetIndex("Sheet1"); // sheet表名
        sheet = workbook.getSheetAt(i);
 
        HSSFRow row = sheet.getRow(4); // 获取指定的行对象，无数据则为空，需要创建
        if (row == null) {
            row = sheet.createRow(4); // 该行无数据，创建行对象
        }
 
        Cell cell = row.createCell(4); // 创建指定单元格对象。如本身有数据会替换掉
        cell.setCellValue("修改3"); // 设置内容
        FileOutputStream fo = new FileOutputStream(file2); // 输出到文件
        workbook.write(fo);
 
    }

    
    public static void main(String[] args) {
    	ExcelUtil ex = new ExcelUtil();
    	try {
			ex.insertExcel3();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}

