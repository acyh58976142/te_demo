package com.hr.td.util;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.VerticalAlignment;
/**
 * 导出Excel
 */
public class ExportExcel
{
	private static Logger LOG = Logger.getLogger(ExportExcel.class);
	private static ExportExcel instance;
	/**
	 * 导出excel
	 * 
	 * @param title
	 *            列名�?
	 * @param list
	 *            �?要导出的数据
	 * @param excelName
	 *            文件名称
	 */
	public void export(HttpServletRequest request, HttpServletResponse response, String[] title, List<Object[]> list, String excelName)
	{
		/** 根据条件获取�?有符合条件的注册信息，封装为excel格式，写入浏览器默认路径 */
		java.io.BufferedOutputStream bos = null;
		HSSFWorkbook wb = null;
		try
		{
			/** 解决中文文件名乱�? */
			if(request.getHeader("User-Agent").toLowerCase().indexOf("firefox") > 0)// firefox浏览�?
			{
				excelName = URLDecoder.decode(excelName, "UTF-8");
				excelName = excelName.replace(" ", "_");
				excelName = new String(excelName.getBytes("UTF-8"), "ISO8859-1");
			}
			else
			{
				excelName = URLDecoder.decode(excelName, "UTF-8");
				excelName = excelName.replace(" ", "_");
				excelName = URLEncoder.encode(excelName, "UTF-8");
			}
			response.setContentType("application/octet-stream;charset=UTF-8");
			response.setHeader("Content-Disposition", "attachment;filename=" + excelName + ".xls");
			wb = getHSSFWorkbook(list, title); // 生成Excel内容
			bos = new java.io.BufferedOutputStream(response.getOutputStream());
			wb.write(bos);
			bos.flush();
		}
		catch(Exception e)
		{
			LOG.error(e);
		}
		finally
		{
			if(bos != null)
			{
				try
				{
					bos.close();
				}
				catch(Exception e)
				{
					LOG.error(e);
				}
				bos = null;
			}
		}
	}
	/***
	 * 生成excel内容
	 * 
	 * @param list
	 * @param title
	 * @return
	 */
	private HSSFWorkbook getHSSFWorkbook(List<Object[]> list, String[] title)
	{
		HSSFWorkbook workbook = new HSSFWorkbook();
		HSSFCellStyle styleStr = getStrStyle(workbook);// 表格默认样式
		HSSFCellStyle getTopStyle = getTopStyle(workbook);// 表格默认样式
		try
		{
			HSSFSheet sheet = workbook.createSheet("sheet1"); // 创建工作�?
			sheet.setDefaultColumnWidth(14); // 设置默认列宽
			HSSFRow rowRowName = sheet.createRow(0); // 在索�?1的位置创建行(�?顶端的行�?始的第二�?)
			rowRowName.setHeightInPoints(26);
			// 将列头设置到sheet的单元格�?
			for(int n = 0; n < title.length; n++)
			{
				HSSFCell cellRowName = rowRowName.createCell(n); // 创建列头对应个数的单元格
				cellRowName.setCellValue(title[n]);// 设置列头单元格的�?
				cellRowName.setCellStyle(getTopStyle);
			}
			// 将查询出的数据设置到sheet对应的单元格�?
			for(int i = 0; i < list.size(); i++)
			{
				Object[] exmap = list.get(i);
				HSSFRow row = sheet.createRow(i + 1);// 创建�?�?的行�?
				row.setHeightInPoints(18);
				// 遍历每个对象
				for(int j = 0; j < exmap.length; j++)
				{
					HSSFCell cell = row.createCell(j);
					cell.setCellStyle(styleStr);
					cell.setCellValue(exmap[j] + "");

				}
			}
		}
		catch(Exception e)
		{
			LOG.error(e);
		}
		return workbook;
	}
	/**
	 * 获取导出execl类对�?
	 * 
	 * @return
	 */
	public static ExportExcel getInstance()
	{
		if(instance == null)
		{
			instance = new ExportExcel();
		}
		return instance;
	}
	/**
	 * 表头数据信息单元格样�?
	 * 
	 * @param workbook
	 *            表格对象
	 * @return
	 */
	public static HSSFCellStyle getTopStyle(HSSFWorkbook workbook)
	{
		HSSFCellStyle style = workbook.createCellStyle();// 设置样式
		style.setAlignment(HorizontalAlignment.CENTER);// 左右居中
		style.setVerticalAlignment(VerticalAlignment.CENTER);// 上下居中
		// 设置字体
		HSSFFont font = workbook.createFont();
		// 设置字体大小
		font.setFontHeightInPoints((short)11);
		font.setBold(true);// 粗体显示
		// 在样式用应用设置的字�?;
		style.setFont(font);
		// 设置自动换行;
		style.setWrapText(false);
		return style;
	}
	/**
	 * 列字符串型数据信息单元格样式
	 * 
	 * @param workbook
	 *            表格对象
	 * @return
	 */
	public static HSSFCellStyle getStrStyle(HSSFWorkbook workbook)
	{
		HSSFCellStyle style = workbook.createCellStyle();// 设置样式
		style.setAlignment(HorizontalAlignment.CENTER);// 左右居中
		style.setVerticalAlignment(VerticalAlignment.CENTER);// 上下居中
		// 设置字体
		HSSFFont font = workbook.createFont();
		// 设置字体大小
		font.setFontHeightInPoints((short)11);
		// //设置字体名字
		// font.setFontName("Courier New");
		// 设置样式;
		// 在样式用应用设置的字�?;
		style.setFont(font);
		// 设置自动换行;
		style.setWrapText(false);
		return style;
	}
	/**
	 * 列数字型数据信息单元格样�?
	 * 
	 * @param workbook
	 *            表格对象
	 * @return
	 */
	@SuppressWarnings("static-access")
	public static HSSFCellStyle getNumStyle(HSSFWorkbook workbook)
	{
		HSSFCellStyle style = workbook.createCellStyle();// 设置样式
		style.setAlignment(HorizontalAlignment.CENTER);// 左右居中
		style.setVerticalAlignment(VerticalAlignment.CENTER);// 上下居中
		HSSFDataFormat df = workbook.createDataFormat(); // 此处设置数据格式
		style.setDataFormat(df.getBuiltinFormat("#,##0.00"));// 保留两位小数�?
		// 设置字体
		HSSFFont font = workbook.createFont();
		// 设置字体大小
		font.setFontHeightInPoints((short)11);
		// 设置字体名字
		font.setFontName("Courier New");
		// 设置样式;
		// 在样式用应用设置的字�?;
		style.setFont(font);
		// 设置自动换行;
		style.setWrapText(false);
		return style;
	}
}
