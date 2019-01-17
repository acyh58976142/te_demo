package com.hr.td.service.impl.systemManage;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hr.td.dao.IBaseDao;
import com.hr.td.entity.RolePrivilegeRef;
import com.hr.td.entity.RoleInfo;
import com.hr.td.service.systemManage.IRoleManageService;
import com.hr.td.util.Page;
import com.hr.td.util.ToolsUtil;
import com.nari.slsd.hd.util.CommonTool;

@Service
public class RoleManageServiceImpl implements IRoleManageService {
	@Autowired
	private IBaseDao baseDao;

	/**
	 * 验证角色名称是否重复
	 * 
	 * @param map
	 * @return
	 */
	public boolean validateRoleName(Map<String, Object> map) {
		boolean result = false;
		List<String> paramList = new ArrayList<String>();
		String old_role_name = map.get("old_role_name").toString();
		String new_role_name = map.get("new_role_name").toString();
		StringBuilder sb = new StringBuilder();
		sb.append(" select  count(1) from sys_role_info ");
		sb.append(" where 1 = 1 ");
		if (!ToolsUtil.isEmpty(old_role_name)) {
			sb.append(" and role_name = ? ");
			paramList.add(old_role_name);
		}
		if (!ToolsUtil.isEmpty(new_role_name)) {
			sb.append(" and role_name = ? ");
			paramList.add(new_role_name);
		}
		List list = baseDao.queryBySQL(sb.toString(), paramList.toArray());
		if (list != null && list.size() > 0) {
			String resultStr = list.get(0).toString();
			if ("0".equals(resultStr)) {
				result = true;
			}
		}
		return result;

	}

	/**
	 * 查询角色管理(分页)
	 * 
	 * @param map
	 * @return
	 */
	public Page queryRoleByPage(Map<String, Object> map, int total) {
		int pageSize = CommonTool
				.ConvertToInt(ToolsUtil.isEmpty(map.get("pageSize")) ? "0" : map.get("pageSize").toString());
		int startIndex = CommonTool
				.ConvertToInt(ToolsUtil.isEmpty(map.get("startIndex")) ? "0" : map.get("startIndex").toString());
		Map<String, Object> queryMap = getRoleManageMap(map);
		String sql = queryMap.get("sql").toString();
		Object[] parameters = (Object[]) queryMap.get("map");
		return baseDao.getPageBySql(total, sql, pageSize, startIndex, parameters);
	}

	/**
	 * 查询角色管理数量
	 * 
	 */
	public int queryRoleCount(Map<String, Object> map) {
		Map<String, Object> queryMap = getRoleManageMap(map);
		String sql = queryMap.get("sql").toString();
		Object[] parameters = (Object[]) queryMap.get("map");
		int count = baseDao.getCountBySql(sql, parameters);
		return count;
	}

	/**
	 * 查询单个角色信息根据主键
	 * 
	 * @param userRoleInfo
	 * @return int
	 */
	public RoleInfo getRole(String id) {
		RoleInfo userRoleInfo = null;
		try {
			userRoleInfo = (RoleInfo) baseDao.getEntity(RoleInfo.class, id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return userRoleInfo;
	}

	/**
	 * 增加角色信息
	 * 
	 * @param userRoleInfo
	 * @return int
	 */
	public boolean addRole(RoleInfo userRoleInfo) {
		boolean result = false;
		try {
			baseDao.save(userRoleInfo);
			result = true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	/**
	 * 修改角色信息
	 * 
	 * @param userRoleInfo
	 * @return int
	 */
	public boolean updateRole(RoleInfo userRoleInfo) {
		boolean result = false;
		try {
			baseDao.update(userRoleInfo);
			result = true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	/**
	 * 根据RoleCode得到权限表信息
	 * 
	 * @param role_code
	 * @return
	 */
	public List<RolePrivilegeRef> getRolePrivilegeRefListByRoleId(String role_id) {
		List<RolePrivilegeRef> rolePrivilegeRefList = null;
		try {
			StringBuilder sb = new StringBuilder();
			sb.append(" select ").append(" ref_id,role_id,privilege_id  ").append(" from sys_role_privilege_ref ")
					.append(" where  1 = 1 ").append(" and role_id = ? ");

			List<Object> paramList = new ArrayList<Object>();
			paramList.add(role_id);
			Object[] params = (Object[]) paramList.toArray();
			List rolePrivilegeRefObjList = baseDao.queryBySQL(sb.toString(), params);
			if (rolePrivilegeRefObjList != null && rolePrivilegeRefObjList.size() > 0) {
				rolePrivilegeRefList = new ArrayList<RolePrivilegeRef>();
				rolePrivilegeRefList.add(new RolePrivilegeRef());
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return rolePrivilegeRefList;
	}

	/**
	 * 删除角色信息
	 * 
	 * @param userRoleInfo
	 * @return int
	 */
	public boolean deleteRole(RoleInfo userRoleInfo) {
		boolean result = false;
		try {
			baseDao.delete(userRoleInfo);
			result = true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	/**
	 * 查询角色管理sql
	 * 
	 * @param map
	 * @return
	 */
	private Map<String, Object> getRoleManageMap(Map<String, Object> map) {
		Map<String, Object> paramer = new HashMap<String, Object>();

		StringBuilder sql = new StringBuilder();
		List<Object> list = new ArrayList<Object>();
		sql.append(" select role_id,role_name,roledesc,role_code   ").append(" from sys_role_info   ")
				.append(" where 1 = 1   ");
		if (!ToolsUtil.isEmpty(map.get("role_name"))) {
			sql.append(" and role_name like ? ");
			list.add("%" + map.get("role_name").toString() + "%");
		}
		sql.append(" order by role_id");
		paramer.put("sql", sql.toString());
		paramer.put("map", list.toArray());
		return paramer;
	}
}
