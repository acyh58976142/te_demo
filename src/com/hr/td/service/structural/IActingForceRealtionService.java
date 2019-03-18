package com.hr.td.service.structural;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.hr.td.entity.ActingForceRelation;
import com.hr.td.entity.StructuralParamter;

public interface IActingForceRealtionService {
	
	public int getRelationCount(Map<String, Object> map);
	 
	 /**
	  * 分页查询杆塔作用关系
	  * @param map
	  * @return
	  */
   public List<Map<String, Object>> getRelationPage(Map<String, Object> map);
   
   /**
	  * 条件查询杆塔作用力关系
	  * @param map
	  * @return  List<Map<String, Object>>
	  */
	 public List<Map<String, Object>> getRealtionList(Map<String, Object> map);
   
   /**
    * 批量添加
    * @param list
    * @return
    */
   public int addRelationAll(List<ActingForceRelation> list);
   
   /**
    * 添加杆塔作用力关系
    * @param map
    * @return
    */
	 public boolean addRelation(Map<String, String> map);
 	 
	 /**
	  * 修改杆塔作用力关系
	  * @param map
	  * @return
	  */
	 public boolean updateRelation(Map<String, String> map);
	 
	 /**
	  * 删除杆塔作用力关系
	  * @param id
	  * @return
	  */
	 public int deleteRelation(String id);
	 
    public List<Map<String, Object>> importExcel(String fileName, MultipartFile file);
}
