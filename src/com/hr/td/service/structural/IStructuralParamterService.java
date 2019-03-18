package com.hr.td.service.structural;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.hr.td.entity.StructuralParamter;

/**
 * 结构基础参数信息接口
 * @author yw
 *
 */
public interface IStructuralParamterService {
	
	public int getParamCount(Map<String, Object> map);
	 
	 /**
	  * 分页查询结构基础参数信息
	  * @param map
	  * @return
	  */
     public List<Map<String, Object>> getParamterPage(Map<String, Object> map);
     
     /**
 	  * 条件查询结构基础参数信息
 	  * @param map
 	  * @return  List<Map<String, Object>>
 	  */
 	 public List<Map<String, Object>> getParamter(Map<String, Object> map);
 	 
 	 /**
 	  * 批量添加参数
 	  * @param list
 	  * @return
 	  */
 	 public int addParamterAll(List<StructuralParamter> list);
 	 
 	 /**
 	  * 单个添加参数
 	  */
 	 public boolean addParamter(Map<String, String> map);
 	 
 	 /**
 	  * 修改参数
 	  * @param map
 	  * @return
 	  */
 	 public int updateParamter(Map<String, String> map);
 	 
 	 /**
 	  * 删除参数
 	  * @param id
 	  * @return
 	  */
	 public int deleteParamter(String id);
	 
	 /**
	  * 导入
	  * @param fileName
	  * @param file
	  * @return
	  */
	 public List<Map<String, Object>> importExcel(String fileName, MultipartFile file,String projectId);
 	 
}
