package com.hr.td.controller.common;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.hr.td.service.common.ICommonFileService;
import com.hr.td.util.ToolsUtil;

@Controller
@RequestMapping(value = "/file")
public class CommonFileController {
	@Autowired
	public ICommonFileService fileService;
	
	/**
	* @Title: importExcel  
	* @Description: 项目资料数据导入,即excel转list数据
	* @param file
	* @param request
	* @param response
	* @return
	* @throws IOException
	 */
	@RequestMapping(value = "/importExcel.action")
	@ResponseBody
	public Map<String, Object> importExcel(@RequestParam(value="filename")MultipartFile file,HttpServletRequest request,HttpServletResponse response) throws IOException {
		long fileSize = file.getSize();
		long maxSize = 5400000;
		long limitSize = maxSize / 1024 / 1024;
		// 定义一个用于返回的json对象
		Map<String, Object> result = new HashMap<String, Object>();
		String fileName = file.getOriginalFilename();
		// 取文件最后一个.后面的文件名
		String fileType = fileName.substring(fileName.lastIndexOf(".") + 1);
		// 判断文件类型，如果不是excel，直接返回错误信息
		if (fileType.toUpperCase().toString().equals("XLS") || fileType.toUpperCase().toString().equals("XLSX")) {
				List<Map<String, Object>> excelList = fileService.importData(fileName, file);
				
				if(!ToolsUtil.isEmpty(excelList)){					
                    result.put("total", excelList);				
				}
		} else {
			result.put("errorType", "文件类型不正确，请重新上传！");
		}

		return result;
	}
}
