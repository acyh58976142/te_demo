package com.hr.td.service.systemManage;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import com.hr.td.entity.RolePrivilegeRef;
import com.hr.td.entity.RoleInfo;
import com.hr.td.util.Page;

/**
 * 角色管理Service接口
 * 
 * @author yw
 *
 */
public interface IRoleManageService {

	/**
	 * 验证角色名称是否重复
	 * 
	 * @param map
	 * @return
	 */
	public boolean validateRoleName(Map<String, Object> map);

	/**
	 * 查询角色管理(分页)
	 * 
	 * @param map
	 * @return
	 */
	public Page queryRoleByPage(Map<String, Object> map, int total);

	/**
	 * 查询角色管理数量
	 * 
	 */
	public int queryRoleCount(Map<String, Object> map);

	/**
	 * 得到单个角色信息
	 * 
	 * @param id
	 * @return UserRoleInfo
	 */
	public RoleInfo getRole(String id);

	/**
	 * 增加角色信息
	 * 
	 * @param RoleInfo
	 * @return int
	 */
	public boolean addRole(RoleInfo userRoleInfo);

	/**
	 * 修改角色信息
	 * 
	 * @param userRoleInfo
	 * @return int
	 */
	public boolean updateRole(RoleInfo userRoleInfo);

	/**
	 * 删除角色信息
	 * 
	 * @param userRoleInfo
	 * @return int
	 */
	public boolean deleteRole(RoleInfo userRoleInfo);

	/**
	 * 根据RoleCode得到权限表信息
	 * 
	 * @param role_code
	 * @return
	 */
	public List<RolePrivilegeRef> getRolePrivilegeRefListByRoleId(String role_id);
}
