package com.hr.td.service.geology;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.hr.td.entity.GeologicalSchedule;
import com.hr.td.entity.GeologicalScheduleConfigure;
import com.hr.td.util.DataTablePage;
import com.hr.td.util.Page;

public interface IGeologyService {
	
	//查询地层名称和配置表ID
	public List<Map<String, Object>> queryStratigraphicName();
	
	//根据地层名称的value（ID）查询对应的岩土物理力学指标
	public List<String> queryNormByID(String ID);
	
	//插入所有列表数据到geologicalSchedule表中
	public int addAllGeological(List<GeologicalSchedule> geologicalScheduleList);

	
	//查询geologicalSchedule表信息（前台分页）
	public List<GeologicalSchedule> queryGeologicalScheduleAll();
	
	//批量修改geologicalSchedule表信息
	public int updateAllEditGeological(List<GeologicalSchedule> geologicalScheduleList);
	
	//根据主键id删除一条geologicalSchedule信息
	public int deleteEditGeological(String id);
	
	/**
	 * 查询地质数据 geologicalSchedule
	 * @param map
	 * @return
	 */
	public List<GeologicalSchedule> getScheduleList(Map<String, Object> map);
	
	public int getScheduleCount(Map<String, Object> map);
	
	public List<Map<String, Object>> getSchedulePage(Map<String, Object> map);
	
	public  Map<String, Object> getGeologicalScheduleInfo(String projectId);
	
	public List<Map<String, Object>> importExcel(String fileName, MultipartFile file,String projectId);
	
	
	/**
	 * 查询地质参数  geologicalScheduleConfigure
	 * @param map
	 * @return
	 */
	public List<Map<String, Object>> queryStratigraphic(Map<String, Object> map);
	
	public int getConfigureCount(Map<String, Object> map);
	
	public List<Map<String, Object>> getConfigurePage(Map<String, Object> map);
	
	public int addConfigure(Map<String, String> map);
	
	public int updateConfigure(Map<String, String> map);
	
	public int deleteConfigure(String id);
	
	public GeologicalScheduleConfigure getConfugureEntity(String id);
}
