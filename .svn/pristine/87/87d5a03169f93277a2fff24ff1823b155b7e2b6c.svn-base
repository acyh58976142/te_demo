package com.hr.td.service.common;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

public interface ICommonFileService {
       //导入
	   public List<Map<String, Object>> importData(String fileName, MultipartFile file);
	   //导出
	  public Map<String, Object> exportData(List list);
	  
	  //导出
	  public HSSFWorkbook  export(List <Map<String, Object>> list);
}
