package com.hr.td.service.systemManage;

import java.util.List;
import java.util.Map;

import com.hr.td.entity.PrivilegeInfo;
import com.hr.td.util.Page;

/**
 * 菜单管理
 * 
 * @author yw
 *
 */
public interface IMenuManageService {
	/**
	 * 查询(分页)
	 * 
	 * @param map
	 * @return
	 */
	public Page queryMenuManagePage(Map<String, Object> map, int total);

	/**
	 * 查询数量
	 * 
	 */
	public int queryMenuManageCount(Map<String, Object> map);

	
	/**
	 * 查询所有一级功能
	 * @return
	 */
	public List<Map<String, Object>> QuerySuperiorMenu();
	
	
	/**
	 * 添加
	 * @param map
	 * @return
	 */
	public int savemenuManageInfo(Map<String, Object> map);
	
	/**
	 * 修改
	 * @param map
	 * @return
	 */
	public int updatemenuManageInfo(Map<String, Object> map);
	
	/**
	 * 修改查询
	 * @param func_id
	 * @return
	 */
	public PrivilegeInfo queryPrivilegeInfo(String func_id);
	
	/**
	 * 删除 
	 */
	public int deleteMenuEntity(String func_id);
	
	/**
	 * 删除（查询权限关联关系） 
	 */
	public int QueryInnerMenu(String func_id);
	
	
	/**
	 * 查询所有角色
	 */
	public List<Map<String, Object>> QuerySysRoleInfo();
	
	/**
	 * 添加角色权限关联
	 */
	public int saveSysRloePrivilegeRef(String func_id,String role_id);
	
	/**
	 * 添加查询角色关联
	 */
	public List<Map<String, Object>> QuerySysRoleInfoSave(String func_id);
	
	/**
	 * 根据 菜单加载 角色信息
	 * @param UserId
	 * @return
	 */
	public List<Map<String, Object>> loadMenuByFuncId(String funcId);
	
	/**
	 * 保存 角色 信息
	 */
	public boolean saveRoleMenu(String funcId, String menuIds);
	
}
