package com.hr.td.service.systemManage;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

/**
 * 角色 人员 分配 Service
 * @author 
 *
 */
@Service
public interface IRoleUserService {

	/**
	* @Title: IMenuService.java
	* @Package com.hr.river.service.systemManage
	* @Description: 根据角色加载 人员 信息
	 */
	public List<Map<String, Object>> loadMenuByRoleId(String roleId);
	
	/**
	 * 根据 人员加载 角色信息
	 * @param UserId
	 * @return
	 */
	public List<Map<String, Object>> loadMenuByUserId(String UserId);
	
	
	/**
	* @Title: IMenuService.java
	* @Package com.hr.river.service.systemManage
	* @Description: 保存 人员 信息
	 */
	public boolean saveMenuInfo(String roleId, String menuIds);
	/**
	 * 保存 角色 信息
	 */
	public boolean saveRoleMenu(String userId, String menuIds);
}
