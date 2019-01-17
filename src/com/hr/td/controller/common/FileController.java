package com.hr.td.controller.common;

import java.io.File;
import java.io.FileInputStream;
import java.io.OutputStream;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.dom4j.io.OutputFormat;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hr.td.util.PropertiesConfig;

@Controller
@RequestMapping(value = "/file")
public class FileController {
	private static Logger Log = Logger.getLogger(FileController.class);

	/**
	 * 加载服务器文件,返回字节流
	 * 
	 * @param request
	 * @path path 文件存放地址
	 */
	@RequestMapping(value = "/loadServerFile", method = { RequestMethod.GET })
	public void loadServerFile(HttpServletRequest request, HttpServletResponse response, String name, String filePath) {
		try {
			String fileName = new String(name.getBytes("ISO8859-1"), "UTF-8");
			response.setContentType("application/octet-stream");
			response.setContentType("application/octet-stream;charset=utf-8");
			response.setHeader("Content-Disposition", "attachment;filename=" + fileName);

			String rootPath = PropertiesConfig.getInstance().getProperty("upload_store_root");
			FileInputStream file = new FileInputStream(rootPath + "//" + filePath);
			byte filebytes[] = new byte[file.available()];
			file.read(filebytes);
			file.close();

			OutputStream out = new java.io.BufferedOutputStream(response.getOutputStream());
			OutputFormat format = OutputFormat.createCompactFormat();
			format.setEncoding("utf-8");
			out.write(filebytes);
			out.flush();
			out.close();
		} catch (Exception e) {
			Log.info("加载服务器文件,返回字节流异常：" + e.getMessage());
		}
	}

	/**
	 * 删除指定的文件
	 * 
	 * @param strFileName
	 *            指定绝对路径的文件名
	 * @return 如果删除成功true否则false
	 */
	@RequestMapping("deleteFileByName.action")
	@ResponseBody
	public boolean deleteFileByName(HttpServletRequest request, String strFileName) {

		// 获得文件要存储的根目录的磁盘路径
		String rootPath = PropertiesConfig.getInstance().getProperty("upload_store_root");

		File fileDelete = new File(rootPath + "/" + strFileName);

		/**
		 * 判断文件是否是pdf文件，若是pdf文件则不需要再删除转换以后的pdf文件
		 */
		if (strFileName.endsWith(".doc") || strFileName.endsWith(".docx") || strFileName.endsWith(".xls")
				|| strFileName.endsWith(".xlsx")) {
			int index = strFileName.lastIndexOf(".");
			String pdfName = strFileName.substring(0, index + 1) + "pdf";
			File fileDeletePdf = new File(rootPath + "/" + pdfName);
			if (fileDelete.exists()) {
				fileDeletePdf.delete();
			}
		}

		if (!fileDelete.exists() || !fileDelete.isFile()) {
			return false;
		}
		return fileDelete.delete();
	}

	@RequestMapping("fileExists.action")
	@ResponseBody
	public Map<String, Object> fileExists(HttpServletRequest request, String strFileName) {
		Map<String, Object> map = new HashMap<>();
		map.put("file", 300);
		map.put("pdf", 300);
		// 获得文件要存储的根目录的磁盘路径
		String rootPath = PropertiesConfig.getInstance().getProperty("upload_store_root");
		File file = new File(rootPath + "/" + strFileName);
		int index = strFileName.lastIndexOf(".");
		String pdfName = strFileName.substring(0, index + 1) + "pdf";
		File filePdf = new File(rootPath + "/" + pdfName);
		if (file.exists()) {
			map.put("file", 200);
		}
		if (filePdf.exists()) {
			map.put("pdf", 200);
		}
		return map;
	}
	
	
	/**
	 * 旬报填报
	 * 加载服务器文件,返回字节流
	 * 
	 * @param request
	 * @path path 文件存放地址
	 */
	@RequestMapping(value = "/loadXunReportServerFile", method = { RequestMethod.GET })
	public void loadXunReportServerFile(HttpServletRequest request, HttpServletResponse response, String name) {
		try {
			String fileName = URLDecoder.decode(name,"UTF-8");  
			response.setContentType("application/octet-stream");
			response.setContentType("application/octet-stream;charset=utf-8");
			response.setHeader("Content-Disposition", "attachment;filename=" + fileName);
			String url = request.getSession().getServletContext().getRealPath("resources/template/temp/");
//			String rootPath = PropertiesConfig.getInstance().getProperty("upload_store_root");
//			FileInputStream file = new FileInputStream(rootPath + "//" + filePath);
			FileInputStream file = new FileInputStream(url + fileName);
			byte filebytes[] = new byte[file.available()];
			file.read(filebytes);
			file.close();

			OutputStream out = new java.io.BufferedOutputStream(response.getOutputStream());
			OutputFormat format = OutputFormat.createCompactFormat();
			format.setEncoding("utf-8");
			out.write(filebytes);
			out.flush();
			out.close();
		} catch (Exception e) {
			Log.info("加载服务器文件,返回字节流异常：" + e.getMessage());
		}
	}
	
}
