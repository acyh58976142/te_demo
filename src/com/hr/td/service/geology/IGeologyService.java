package com.hr.td.service.geology;

import java.util.List;
import java.util.Map;

import com.hr.td.entity.GeologicalSchedule;
import com.hr.td.util.DataTablePage;
import com.hr.td.util.Page;

public interface IGeologyService {
	
	//查询地层名称和配置表ID
	public List<Map<String, Object>> queryStratigraphicName();
	//根据地层名称的value（ID）查询对应的岩土物理力学指标
	public List<String> queryNormByID(String ID);
	//插入所有列表数据到geologicalSchedule表中
	public int addAllGeological(List<GeologicalSchedule> geologicalScheduleList);
	//查询geologicalSchedule表信息并分页
	public Page queryGeologicalScheduleInfo(DataTablePage page);
	//查询geologicalSchedule表信息（前台分页）
	public List<GeologicalSchedule> queryGeologicalScheduleAll();
	//批量修改geologicalSchedule表信息
	public int updateAllEditGeological(List<GeologicalSchedule> geologicalScheduleList);
	//根据主键id删除一条geologicalSchedule信息
	public int deleteEditGeological(String id);
}
