package com.hr.td.service.impl.common;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.hr.td.service.common.ICommonFileService;
import com.hr.td.util.ToolsUtil;


@Service
public class CommonFileServiceImpl implements ICommonFileService{
	
	 // 显示的导出表的标题
    private String title="网格数据";
    // 导出表的列名
    private String[] rowName={"网格编号","纬度","经度","范围","网格数","时间"," 全部人口","日间人口","夜间人口"};
    
    HttpServletResponse response;
    
    HttpServletRequest request;

    // 表格的内容
    private List<Object[]> datalist = new ArrayList<Object[]>();
    
	/**
	 * 导入excel
	 */
	@Override
	public List<Map<String, Object>> importData(String fileName, MultipartFile file) {
		
		List<Map<String, Object>> dataList = new ArrayList<Map<String, Object>>();

		InputStream inputStream = null;
		try {
			// 验证文件名是否合格
			if (!validateExcel(fileName)) {
				return null;
			}
			// 根据文件名判断文件是2003版本还是2007版本
			boolean isExcel2003 = true;
			if (isExcel2007(fileName)) {
				isExcel2003 = false;
			}
			inputStream = file.getInputStream();

			// 根据excel里面的内容读取客户信息
			dataList = getExcelInfo(inputStream, isExcel2003);
     		
			inputStream.close();
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (inputStream != null) {
				try {
					inputStream.close();
				} catch (IOException e) {
					inputStream = null;
					e.printStackTrace();
				}
			}
		}
		return dataList;
	}
	
	// @描述：是否是2003的excel，返回true是2003 
    public static boolean isExcel2003(String filePath)  {  
         return filePath.matches("^.+\\.(?i)(xls)$");  
     }  
   
    //@描述：是否是2007的excel，返回true是2007 
    public static boolean isExcel2007(String filePath)  {  
         return filePath.matches("^.+\\.(?i)(xlsx)$");  
     } 
	
	/**
	 * 获取excel表格的具体内容
	 * 
	 * @param inputStream
	 * @param isExcel2003
	 * @return
	 */
	public List<Map<String, Object>> getExcelInfo(InputStream inputStream, boolean isExcel2003) {
        // 建立一个list<map>用来装所有行的数据
     	List<Map<String, Object>> dataList = new ArrayList<Map<String, Object>>();
     	
		// 根据Excel版本选择创建Workbook的方式
		Workbook wb0 = null;
		
		try {
			if (isExcel2003) {// 当excel是2003时
				wb0 = new HSSFWorkbook(inputStream);
			} 
			else {// 当excel是2007时
				wb0 = new XSSFWorkbook(inputStream);
			}
			 // sheet循环  
            int sheetNum = sheetCirculation(wb0);
            
            for(int i=0;i<sheetNum;i++){
				//获取Excel文档中的第一个表单
	            Sheet sht0 = wb0.getSheetAt(i);
	            
	         	//获得表头行总列数
				int coloumNum=sht0.getRow(0).getPhysicalNumberOfCells();
				
				int cellNum=0;
																		
	            // 对sheet中的每一行进行迭代
	            for (Row r : sht0) {	            	
	            	 //如果当前行的行号（从0开始）未达到2（第三行）则从新循环
	                if(r.getRowNum()<1){
	                    continue;
	                }
	                
	             // 定义一个字符串来放错误信息
				 String errorMessage = "";
				 boolean isError=false;//默认没有错误
				 cellNum=r.getPhysicalNumberOfCells();//每一行的单元格数
				 
				//如果该行的单元格数不超过表头字段数量,则继续执行
				if(cellNum<=coloumNum){
					if (!ToolsUtil.isEmpty(r.getCell(0))) {
						boolean error=true;

						// 从单元格获取数据库字段值
						String geohash  = getCellValue(r.getCell(0));//网格编号
						String lat = getCellValue(r.getCell(1));//纬度
						String lon  = getCellValue(r.getCell(2));//经度
						String size = getCellValue(r.getCell(3));//范围
						String num = getCellValue(r.getCell(4));//网格数
						String gridtime = getCellValue(r.getCell(5));//时间
						String allcount = getCellValue(r.getCell(6));//全部人口
						String workcount = getCellValue(r.getCell(7));//日间人口
						String homecount = getCellValue(r.getCell(8));//夜间人口
						
						
						if (!ToolsUtil.isEmpty(errorMessage)) {
							errorList.add(errorMessage);
							totalErrormessage += errorMessage;
							isError = true;
						}

						if (!isError) {
							// 新建map，把从excel中取出的值依次保存起来
							Map<String, Object>  dataMap = new HashMap<String, Object>();
							dataMap.put("geohash",geohash);
							dataMap.put("lat",lat);
							dataMap.put("lon",lon);
							dataMap.put("size",size);
							dataMap.put("num",num);
							dataMap.put("gridtime",gridtime);
							dataMap.put("allcount",allcount);
							dataMap.put("workcount",workcount);
							dataMap.put("homecount",homecount);
							
							// 将实体类放入list
							dataList.add(dataMap);
						}
					}
				}
				
	            }
            }
            
		} catch (Exception e) {
			e.printStackTrace();
		}
		return dataList;
	}
	
	/**
	 * 获取表格的sheet页数
	 * @param wb
	 * @return
	 */
    private int sheetCirculation(Workbook wb) {  
        int sheetCount = -1;  
        sheetCount = wb.getNumberOfSheets();  
        return sheetCount;  
    } 
	
	private String totalErrormessage;
	private List<Object> errorList= new ArrayList<Object>(); 
	private boolean errorFlag = false;
	
	/**
	* @Title: validateExcel  
	* @Description: 验证EXCEL文件
	* @param filePath
	* @return
	 */
	public boolean validateExcel(String filePath) {
		if (filePath == null || !(isExcel2003(filePath) || isExcel2007(filePath))) {
		 
			totalErrormessage = "文件名不是excel格式";
			errorList.add(totalErrormessage);
			return false;
		}
		return true;
	}

    /**
     * 导出
     */
	@Override
	public Map<String, Object> exportData(List list) {
        try {
            if (list != null && list.size() > 0) {
                // 开始导出，获取模板路径
                String templatePath = request.getSession().getServletContext().getRealPath("template/user.xls");

                // 写入工作簿
                exportData(list, templatePath, response);
            }
        } catch (Exception e) {
            return null;
        }
		return null;
	}

	  public void exportData(List list, String templatePath,HttpServletResponse response) throws Exception {
	        //获取文件输入流，创建工作簿
//	        FileInputStream fis = new FileInputStream(new File(templatePath));
//	        HSSFWorkbook workBook = new HSSFWorkbook(fis);
	        HSSFWorkbook workBook =  new HSSFWorkbook(); 

	        //设置导出文件名，并编码
	        String fileName = "数据导出_" + System.currentTimeMillis()+".xls";
	        fileName = URLEncoder.encode(fileName, "UTF-8");  
	        response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
	        response.setContentType("application/octet-stream;charset=UTF-8"); 

	        //创建输出流
	        OutputStream outputStream = new BufferedOutputStream(response.getOutputStream());

	        exportUserData(workBook, list);

	        //删除模板页
	      //  workBook.removeSheetAt(0);

	        //将工作簿写入输出流
	        workBook.write(outputStream);

	        //关闭资源流
//	        fis.close();
	        outputStream.flush();  
	        outputStream.close();
	    }

	    /**
	     * 
	     * exportUserData:将数据写入工作簿. <br/>
	     *
	     * @param workBook
	     * @param List
	     */
	    private void exportUserData(HSSFWorkbook workBook, List list) {
	    	  // 创建工作表
            HSSFSheet sheet = workBook.createSheet("数据信息表");

            // 产生表格标题行
            HSSFRow row = sheet.createRow(0);
            HSSFCell cellTitle = row.createCell(0);
	        
	        // sheet样式定义
            // 列头样式
            HSSFCellStyle columnTopStyle = this.getColumnTopStyle(workBook);
            // 单元格样式
            HSSFCellStyle style = this.getStyle(workBook);
	        
            // 合并单元格
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, (rowName.length - 1)));
            cellTitle.setCellStyle(columnTopStyle);
            cellTitle.setCellValue(title);

            // 定义所需要的列数
            int columnNum = rowName.length;
            // 在索引2的位置创建行
            HSSFRow rowRowName = sheet.createRow(1);

            // 将列头设置到sheet的单元格中
            for (int i = 0; i < columnNum; i++) {
                // 创建列头对应个数的单元格
                HSSFCell cellRowName = rowRowName.createCell(i);
                // 设置列头单元格的数据类型
                cellRowName.setCellType(HSSFCell.CELL_TYPE_STRING);
                HSSFRichTextString textString = new HSSFRichTextString(rowName[i]);
                // 设置列头单元格的值
                cellRowName.setCellValue(textString);
                // 设置列头单元格样式
                cellRowName.setCellStyle(style);
            }

	        //定义起始行，从第二行开始
	        int singleRowIndex = 2;

	        //开始遍历
	        for (int i=0;i<list.size();i++) {
	            try {
	                //起始列索引
	                int singleColIndex=0;

	                //创建行
	                HSSFRow singleRow = sheet.createRow(singleRowIndex++);

	                //创建列
	                HSSFCell singleCell = null;

	                //geohash 网格编号编号 ,0
	                singleCell=singleRow.createCell(singleColIndex++);
	                singleCell.setCellValue("");
	                singleCell.setCellStyle(style);
	                
	                //lat 纬度,1
	                singleCell=singleRow.createCell(singleColIndex++);
	                singleCell.setCellValue("");
	                singleCell.setCellStyle(style);
	                
	                //lon 经度,2
	                singleCell=singleRow.createCell(singleColIndex++);
	                singleCell.setCellValue("");
	                singleCell.setCellStyle(style);
	                
	                //size 范围,3
	                singleCell=singleRow.createCell(singleColIndex++);
	                singleCell.setCellValue("");
	                singleCell.setCellStyle(style);
	                
	                //num 网格数,4
	                singleCell=singleRow.createCell(singleColIndex++);
	                singleCell.setCellValue("");
	                singleCell.setCellStyle(style);
	                
	                //gridtime 时间,5
	                singleCell=singleRow.createCell(singleColIndex++);
	                singleCell.setCellValue("");
	                singleCell.setCellStyle(style);
	                
	                //allcount 全部人口,6
	                singleCell=singleRow.createCell(singleColIndex++);
	                singleCell.setCellValue("");
	                singleCell.setCellStyle(style);
	                
	                //workcount 日间人口,7
	                singleCell=singleRow.createCell(singleColIndex++);
	                singleCell.setCellValue("");
	                singleCell.setCellStyle(style);
	                
	                //homecount 夜间人口,8
	                singleCell=singleRow.createCell(singleColIndex++);
	                singleCell.setCellValue("");
	                singleCell.setCellStyle(style);

	            } catch (Exception e) {
	                e.printStackTrace();
	                continue;
	            }
	        }
	        
            // 让列宽随着导出的列长度自动适应
            for (int colNum = 0; colNum < columnNum; colNum++) {
                int columnWidth = sheet.getColumnWidth(colNum) / 256;
                for (int rowNum = 0; rowNum < sheet.getLastRowNum(); rowNum++) {
                    HSSFRow currentRow;
                    // 当前行未被使用过
                    if (sheet.getRow(rowNum) == null) {
                        currentRow = sheet.createRow(rowNum);
                    } else {
                        currentRow = sheet.getRow(rowNum);
                    }
                    if (currentRow.getCell(colNum) != null) {
                        HSSFCell currentCell = currentRow.getCell(colNum);
                        if (currentCell.getCellType() == HSSFCell.CELL_TYPE_STRING) {
                            try{
                                int length = currentCell.getStringCellValue().getBytes().length;
                                if (columnWidth < length) {
                                    columnWidth = length;
                                }
                            }catch (Exception e){}
                        }
                    }
                    if (colNum == 0) {
                        sheet.setColumnWidth(colNum, (columnWidth - 2) * 256);
                    } else {
                        sheet.setColumnWidth(colNum, (columnWidth + 4) * 256);
                    }
                }
            }
	    }
	    
	    /**
	     * 列头单元格样式
	     */
	    public static HSSFCellStyle getColumnTopStyle(HSSFWorkbook workbook) {
	        // 设置字体
	        HSSFFont font = workbook.createFont();
	        // 设置字体大小
	        font.setFontHeightInPoints((short) 12);
	        // 字体加粗
	        font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
	        // 设置字体名称
	        font.setFontName("微软雅黑");
	        // 设置样式
	        HSSFCellStyle cellStyle = workbook.createCellStyle();
	        // 设置底边框
	        cellStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN);
	        // 设置底边框颜色
	        cellStyle.setBottomBorderColor(HSSFColor.BLACK.index);
	        // 设置左边框
	        cellStyle.setBorderLeft(HSSFCellStyle.BORDER_THIN);
	        // 设置左边框颜色
	        cellStyle.setLeftBorderColor(HSSFColor.BLACK.index);
	        // 设置右边框
	        cellStyle.setBorderRight(HSSFCellStyle.BORDER_THIN);
	        // 设置右边框颜色
	        cellStyle.setRightBorderColor(HSSFColor.BLACK.index);
	        // 设置顶边框
	        cellStyle.setBorderTop(HSSFCellStyle.BORDER_THIN);
	        // 设置顶边框颜色
	        cellStyle.setTopBorderColor(HSSFColor.BLACK.index);
	        // 在样式中应用设置的字体
	        cellStyle.setFont(font);

	        // cellStyle.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
	        cellStyle.setFillBackgroundColor(HSSFColor.SKY_BLUE.index);
	        // 设置自动换行
	        cellStyle.setWrapText(false);
	        // 设置水平对齐的样式为居中对齐
	        cellStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
	        // 设置垂直对齐的样式为居中对齐
	        cellStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
	        return cellStyle;
	    }

	    /**
	     * 获取数据信息单元格样式
	     */
	    public static HSSFCellStyle getStyle(HSSFWorkbook workbook) {
	        // 设置字体
	        HSSFFont font = workbook.createFont();
	        // 设置字体大小
	        font.setFontHeightInPoints((short) 10);
	        // 字体加粗
	        // font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
	        // 设置字体名字
	        font.setFontName("微软雅黑");
	        // 设置样式
	        HSSFCellStyle cellStyle = workbook.createCellStyle();
	        // 设置底边框
	        cellStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN);
	        // 设置底边框颜色
	        cellStyle.setBottomBorderColor(HSSFColor.BLACK.index);
	        // 设置左边框
	        cellStyle.setBorderLeft(HSSFCellStyle.BORDER_THIN);
	        // 设置左边框颜色
	        cellStyle.setLeftBorderColor(HSSFColor.BLACK.index);
	        // 设置右边框
	        cellStyle.setBorderRight(HSSFCellStyle.BORDER_THIN);
	        // 设置右边框颜色
	        cellStyle.setRightBorderColor(HSSFColor.BLACK.index);
	        // 设置顶边框
	        cellStyle.setBorderTop(HSSFCellStyle.BORDER_THIN);
	        // 设置顶边框颜色
	        cellStyle.setTopBorderColor(HSSFColor.BLACK.index);
	        // 在样式中应用设置的字体
	        cellStyle.setFont(font);
	        // 设置自动幻皇
	        cellStyle.setWrapText(false);
	        // 设置水平对其的样式为居中对齐
	        cellStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
	        // 设置垂直对齐的样式为居中对齐
	        cellStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
	        return cellStyle;
	    }

	    /**
	     * 获取数据信息单元格样式
	     */
	    public static HSSFCellStyle getFontBlodStyle(HSSFWorkbook workbook) {
	        // 设置字体
	        HSSFFont font = workbook.createFont();
	        // 设置字体大小
	        font.setFontHeightInPoints((short) 10);
	        // 字体加粗
	        font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
	        // 设置字体名字
	        font.setFontName("微软雅黑");
	        // 设置样式
	        HSSFCellStyle cellStyle = workbook.createCellStyle();
	        // 设置底边框
	        cellStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN);
	        // 设置底边框颜色
	        cellStyle.setBottomBorderColor(HSSFColor.BLACK.index);
	        // 设置左边框
	        cellStyle.setBorderLeft(HSSFCellStyle.BORDER_THIN);
	        // 设置左边框颜色
	        cellStyle.setLeftBorderColor(HSSFColor.BLACK.index);
	        // 设置右边框
	        cellStyle.setBorderRight(HSSFCellStyle.BORDER_THIN);
	        // 设置右边框颜色
	        cellStyle.setRightBorderColor(HSSFColor.BLACK.index);
	        // 设置顶边框
	        cellStyle.setBorderTop(HSSFCellStyle.BORDER_THIN);
	        // 设置顶边框颜色
	        cellStyle.setTopBorderColor(HSSFColor.BLACK.index);
	        // 在样式中应用设置的字体
	        cellStyle.setFont(font);
	        // 设置自动幻皇
	        cellStyle.setWrapText(false);
	        // 设置水平对其的样式为居中对齐
	        cellStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
	        // 设置垂直对齐的样式为居中对齐
	        cellStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
	        return cellStyle;
	    }
	    
	    
	    /**
		* @Title: getCellValue  
		* @Description: 单元格内容类型判断并取值
		* @param cell
		* @return
		 */
		public static String getCellValue(Cell cell) {  
			 SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
			//SimpleDateFormat sdfFull = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	        String cellValue = "";  
	        switch (cell.getCellType()) {  
	        case Cell.CELL_TYPE_STRING:  // 字符串
	            cellValue = cell.getRichStringCellValue().getString().trim();  
	            break;  
	        case Cell.CELL_TYPE_NUMERIC:  // 数字
	          //如果为时间格式的内容
	            if (HSSFDateUtil.isCellDateFormatted(cell)) {      
	               //注：format格式 yyyy-MM-dd hh:mm:ss 中小时为12小时制，若要24小时制，则把小h变为H即可，yyyy-MM-dd HH:mm:ss
	               cellValue=sdf.format(HSSFDateUtil.getJavaDate(cell. getNumericCellValue())).toString();                                 
	                 break;
	             } else {
	            	 cellValue = new DecimalFormat("0").format(cell.getNumericCellValue());
	             }
	            break;  
	        case Cell.CELL_TYPE_BOOLEAN:  // Boolean
	            cellValue = String.valueOf(cell.getBooleanCellValue()).trim();  
	            break;  
	        case Cell.CELL_TYPE_FORMULA:  // 公式
	            cellValue = cell.getCellFormula();  
	            break; 
	        case Cell.CELL_TYPE_BLANK: // 空值
	        	cellValue = "";
	            break;
	        case Cell.CELL_TYPE_ERROR: // 故障
	        	cellValue = "非法字符";
	            break;
	        default:
	        	cellValue = "未知类型";
	            break;
	        }  
	        return cellValue;  
	    }
		
		@SuppressWarnings("deprecation")
		@Override
		public HSSFWorkbook export(List<Map<String, Object>> list) {

			// 声明String数组，并初始化元素（表头名称）
			//第一行表头字段，合并单元格时字段跨几列就将该字段重复几次 S
			String[] excelHeader0 = { "城市名称",
				"监测点",
				"污染物浓度及空气质量分指数（AQI）",
				"污染物浓度及空气质量分指数（AQI）",
				"污染物浓度及空气质量分指数（AQI）",
				"污染物浓度及空气质量分指数（AQI）",
				"污染物浓度及空气质量分指数（AQI）",
				"污染物浓度及空气质量分指数（AQI）",
				"污染物浓度及空气质量分指数（AQI）",
				"污染物浓度及空气质量分指数（AQI）",
				"污染物浓度及空气质量分指数（AQI）",
				"污染物浓度及空气质量分指数（AQI）",
				"污染物浓度及空气质量分指数（AQI）",
				"污染物浓度及空气质量分指数（AQI）",
				"空气质量指数（AQI）",
				"首要污染物",
				"空气质量指数级别",
				"空气质量指数类别",
				"空气质量指数类别"
			};
			// “0,2,0,0” ===> “起始行，截止行，起始列，截止列” 
			String[] headnum0 = {
				"0,2,0,0",
				"0,2,1,1",
				"0,0,2,13",
				"0,2,14,14",
				"0,2,15,15",
				"0,2,16,16",
				"0,1,17,18"
			};
			//第二行表头字段，其中的空的双引号是为了补全表格边框 
			String[] excelHeader1 = {
				"二氧化硫（SO₂）24小时平均",
				"二氧化硫（SO₂）24小时平均",
				"二氧化氮（NO₂）24小时平均",
				"二氧化氮（NO₂）24小时平均",
				"颗粒物（粒径小于等于10μm）24小时平均",
				"颗粒物（粒径小于等于10μm）24小时平均",
				"一氧化碳（CO）24小时平均",
				"一氧化碳（CO）24小时平均",
				"臭氧（O₃）最大8小时平均",
				"臭氧（O₃）最大8小时平均",
				"颗粒物（粒径小于等于2.5μm）24小时平均",
				"颗粒物（粒径小于等于2.5μm）24小时平均",
				"",
				"",
				"",
				"",
				""
			};
			// 合并单元格
			String[] headnum1 = {
				"1,1,2,3",
				"1,1,4,5",
				"1,1,6,7",
				"1,1,8,9",
				"1,1,10,11",
				"1,1,12,13"
			};
			//第三行表头字段
			String[] excelHeader2 = {
				"",
				"",
				"浓度/（μg/m3）",
				"分指数",
				"浓度/（μg/m3）",
				"分指数",
				"浓度/（μg/m3）",
				"分指数",
				"浓度/（μg/m3）",
				"分指数",
				"浓度/（μg/m3）",
				"分指数",
				"浓度/（μg/m3）",
				"分指数",
				"",
				"类别",
				"颜色"
			};
			String[] headnum2 = {
				"2,2,2,2",
				"2,2,3,3",
				"2,2,4,4",
				"2,2,5,5",
				"2,2,6,6",
				"2,2,7,7",
				"2,2,8,8",
				"2,2,9,9",
				"2,2,10,10",
				"2,2,11,11",
				"2,2,12,12",
				"2,2,13,13",
				"2,2,17,17",
				"2,2,18,18"
			};
			// 声明一个工作簿
			HSSFWorkbook wb = new HSSFWorkbook();
			// 生成一个表格
			HSSFSheet sheet = wb.createSheet("TAQIDataReport");
			// 生成一种样式 
			HSSFCellStyle style = wb.createCellStyle();
			// 设置样式 
			style.setFillForegroundColor(HSSFColor.SKY_BLUE.index);
			style.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
			style.setBorderBottom(HSSFCellStyle.BORDER_THIN);
			style.setBorderLeft(HSSFCellStyle.BORDER_THIN);
			style.setBorderRight(HSSFCellStyle.BORDER_THIN);
			style.setBorderTop(HSSFCellStyle.BORDER_THIN);
			style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
			style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
			// 生成一种字体 
			HSSFFont font = wb.createFont();
			// 设置字体 
			font.setFontName("微软雅黑");
			// 设置字体大小
			font.setFontHeightInPoints((short) 12);
			// 字体加粗
			font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
			// 在样式中引用这种字体 
			style.setFont(font);
			// 生成并设置另一个样式
			HSSFCellStyle style2 = wb.createCellStyle();
			style2.setFillForegroundColor(HSSFColor.LIGHT_YELLOW.index);
			style2.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
			style2.setBorderBottom(HSSFCellStyle.BORDER_THIN);
			style2.setBorderLeft(HSSFCellStyle.BORDER_THIN);
			style2.setBorderRight(HSSFCellStyle.BORDER_THIN);
			style2.setBorderTop(HSSFCellStyle.BORDER_THIN);
			style2.setAlignment(HSSFCellStyle.ALIGN_CENTER);
			style2.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
			// 生成另一种字体2 
			HSSFFont font2 = wb.createFont();
			// 设置字体 
			font2.setFontName("微软雅黑");
			// 设置字体大小
			font2.setFontHeightInPoints((short) 12);
			// 字体加粗 //
			font2.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
			// 在样式2中引用这种字体
			style2.setFont(font2);
			// 生成表格的第一行 
			// 第一行表头
			HSSFRow row = sheet.createRow(0);
			for(int i = 0; i < excelHeader0.length; i++) {
				sheet.autoSizeColumn(i, true);
				// 根据字段长度自动调整列的宽度 
				HSSFCell cell = row.createCell(i);
				cell.setCellValue(excelHeader0[i]);
				cell.setCellStyle(style);
				// System.out.println(excelHeader0[i]); 
				if(i >= 0 && i <= 18) {
					for(int j = 0; j < excelHeader0.length; j++) {
						// 从第j列开始填充 cell = row.createCell(j); 
						// 填充excelHeader1[j]第j个元素 
						cell.setCellValue(excelHeader0[j]);
						cell.setCellStyle(style);
					}
				}
				// 设置列宽 
				// sheet.setColumnWidth(0, 5500);
				// sheet.setColumnWidth(1, 6500);
				// 设置行高 
				// sheet.setDefaultRowHeight((short) 360);
			}
			// 动态合并单元格 
			for(int i = 0; i < headnum0.length; i++) {
				sheet.autoSizeColumn(i, true);
				String[] temp = headnum0[i].split(",");
				Integer startrow = Integer.parseInt(temp[0]);
				Integer overrow = Integer.parseInt(temp[1]);
				Integer startcol = Integer.parseInt(temp[2]);
				Integer overcol = Integer.parseInt(temp[3]);
				sheet.addMergedRegion(new CellRangeAddress(startrow, overrow, startcol, overcol));
			}
			// 第二行表头
			row = sheet.createRow(1);
			for(int i = 0; i < excelHeader1.length; i++) {
				sheet.autoSizeColumn(i, true);
				// 自动调整宽度 
				HSSFCell cell = row.createCell(i + 1);
				cell.setCellValue(excelHeader1[i]);
				cell.setCellStyle(style);
				if(i >= 2 && i <= 18) {
					for(int j = 0; j < excelHeader1.length; j++) {
						// 从第j+1列开始填充 
						cell = row.createCell(j + 2);
						// 填充excelHeader1[j]第j个元素 
						cell.setCellValue(excelHeader1[j]);
						cell.setCellStyle(style);
					}
				}
			}
			// 动态合并单元格
			for(int i = 0; i < headnum1.length; i++) {
				sheet.autoSizeColumn(i, true);
				String[] temp = headnum1[i].split(",");
				Integer startrow = Integer.parseInt(temp[0]);
				Integer overrow = Integer.parseInt(temp[1]);
				Integer startcol = Integer.parseInt(temp[2]);
				Integer overcol = Integer.parseInt(temp[3]);
				sheet.addMergedRegion(new CellRangeAddress(startrow, overrow, startcol, overcol));
			}
			// 第三行表头 
			row = sheet.createRow(2);
			for(int i = 0; i < excelHeader2.length; i++) {
				HSSFCell cell = row.createCell(i + 2);
				cell.setCellValue(excelHeader2[i]);
				cell.setCellStyle(style);
				// System.out.println(excelHeader2[i]);
				sheet.autoSizeColumn(i, true);
				// 自动调整宽度 
				if(i > 1 && i <= 18) {
					for(int j = 0; j < excelHeader2.length; j++) {
						// 从第j+2列开始填充
						cell = row.createCell(j);
						// 填充excelHeader1[j]第j个元素
						cell.setCellValue(excelHeader2[j]);
						cell.setCellStyle(style);
					}
				}
			}
			// 动态合并单元格 
			for(int i = 0; i < headnum2.length; i++) {
				sheet.autoSizeColumn(i, true);
				String[] temp = headnum2[i].split(",");
				Integer startrow = Integer.parseInt(temp[0]);
				Integer overrow = Integer.parseInt(temp[1]);
				Integer startcol = Integer.parseInt(temp[2]);
				Integer overcol = Integer.parseInt(temp[3]);
				sheet.addMergedRegion(new CellRangeAddress(startrow, overrow, startcol, overcol));
			}
			
			
			//第四行数据
			for(int i = 0; i < list.size(); i++) {
				row = sheet.createRow(i + 3);
//				TAQIDataReport report = list.get(i);
//				// 导入对应列的数据
//				HSSFCell cell = row.createCell(0);
//				cell.setCellValue(report.getCity());
//				cell.setCellStyle(style2);
//				HSSFCell cell1 = row.createCell(1);
//				cell1.setCellValue(report.getAdd());
//				cell1.setCellStyle(style2);
//				HSSFCell cell2 = row.createCell(2);
//				cell2.setCellValue(report.getSo2Concentration());
//				cell2.setCellStyle(style2);
//				HSSFCell cell3 = row.createCell(3);
//				cell3.setCellValue(report.getSo2Subindex());
//				cell3.setCellStyle(style2);
//				HSSFCell cell4 = row.createCell(4);
//				cell4.setCellValue(report.getNo2Concentration());
//				cell4.setCellStyle(style2);
//				HSSFCell cell5 = row.createCell(5);
//				cell5.setCellValue(report.getNo2Subindex());
//				cell5.setCellStyle(style2);
//				HSSFCell cell6 = row.createCell(6);
//				cell6.setCellValue(report.getPm10Concentration());
//				cell6.setCellStyle(style2);
//				HSSFCell cell7 = row.createCell(7);
//				cell7.setCellValue(report.getPm10Subindex());
//				cell7.setCellStyle(style2);
//				HSSFCell cell8 = row.createCell(8);
//				cell8.setCellValue(report.getCoConcentration());
//				cell8.setCellStyle(style2);
//				HSSFCell cell9 = row.createCell(9);
//				cell9.setCellValue(report.getCoSubindex());
//				cell9.setCellStyle(style2);
//				HSSFCell cell10 = row.createCell(10);
//				cell10.setCellValue(report.getO3Concentration());
//				cell10.setCellStyle(style2);
//				HSSFCell cell11 = row.createCell(11);
//				cell11.setCellValue(report.getO3Subindex());
//				cell11.setCellStyle(style2);
//				HSSFCell cell12 = row.createCell(12);
//				cell12.setCellValue(report.getPm25Concentration());
//				cell12.setCellStyle(style2);
//				HSSFCell cell13 = row.createCell(13);
//				cell13.setCellValue(report.getPm25Subindex());
//				cell13.setCellStyle(style2);
//				HSSFCell cell14 = row.createCell(14);
//				cell14.setCellValue(report.getAirSubindex());
//				cell14.setCellStyle(style2);
//				HSSFCell cell15 = row.createCell(15);
//				cell15.setCellValue(report.getKeyPollution());
//				cell15.setCellStyle(style2);
//				HSSFCell cell16 = row.createCell(16);
//				cell16.setCellValue(report.getLevel());
//				cell16.setCellStyle(style2);
//				HSSFCell cell17 = row.createCell(17);
//				cell17.setCellValue(report.getType());
//				cell17.setCellStyle(style2);
//				HSSFCell cell18 = row.createCell(18);
//				cell18.setCellValue(report.getColor());
//				cell18.setCellStyle(style2);
			}
			return wb;
		}  
	    
}
