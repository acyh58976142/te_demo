package com.hr.td.service.systemManage;

import java.util.List;
import java.util.Map;

import com.hr.td.entity.SysOrgInfo;
import com.hr.td.util.Page;

/**
 * 
 * @author 
 *
 */
public interface IUnitManageService {
	
	/**
	 * 查询单位管理(分页)
	 * 
	 * @param map
	 * @param total
	 * @return
	 */
	public Page queryUnitManagePage(Map<String, Object> map, int total);

	/**
	 * 查询单位管理数量
	 * @param map
	 */
	public int queryUnitManageCount(Map<String, Object> map);
	
	
	/**
	 * 新增单位管理信息
	 * @param SysOrgInfo
	 */
	public boolean AddUnitManage(SysOrgInfo sysOrgInfo);
	
	/**
	 * 根据条件查询单位管理信息
	 * @param id
	 */
	public SysOrgInfo getEntity(String id);
	
	/**
	 * 修改单位管理信息
	 * @param SysOrgInfo
	 */
	public boolean UpdateUnitManage(SysOrgInfo sysOrgInfo);
	
	/**
	 * 根据单位Id查询该单位下是否有人员
	 */
	public List<Map<String,Object>> queryisUserOn (Map<String,Object> map);
	
	/**
	 * 删除单位管理信息
	 * @param SysOrgInfo
	 */
	public boolean deleteUnitManage(SysOrgInfo sysOrgInfo);
	
	/**
	 * 检查单位名称是否冲突
	 * 
	 * @param name
	 * @return
	 */
	 public boolean checkUnitName(Map<String,Object> map);
}
