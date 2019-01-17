package com.hr.td.controller.systemManage;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hr.td.entity.RolePrivilegeRef;
import com.hr.td.entity.RoleInfo;
import com.hr.td.service.systemManage.IRoleManageService;
import com.hr.td.util.DataTablePage;
import com.hr.td.util.Page;
import com.hr.td.util.ToolsUtil;

/**
 * 角色管理Controller
 * 
 * @author 
 *
 */
@Controller
@RequestMapping(value = "/roleManage")
public class RoleManageController {

	private static final Logger LOG = Logger.getLogger(RoleManageController.class);
	@Autowired
	private IRoleManageService roleManageService;

	@RequestMapping(value = "/turnToRoleManageList.action")
	public String turnToRoleManageList() {
		return "/systemManage/roleManageList";
	}

	/**
	 * 验证角色名称是否存在
	 * 
	 * @param userRoleInfo
	 * @return boolean
	 */
	@RequestMapping(value = "/validateRoleName.action")
	@ResponseBody
	public Map<String, Object> validateRoleName(String old_role_name, String new_role_name) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("old_role_name", old_role_name);
		paramMap.put("new_role_name", new_role_name);
		boolean result = roleManageService.validateRoleName(paramMap);
		if (result) {
			resultMap.put("msg", "可以使用");
		} else {
			resultMap.put("msg", "角色名称已存在!");
		}
		resultMap.put("result", result);
		return resultMap;
	}

	/**
	 * 分页查询角色信息
	 */
	@RequestMapping(value = "/queryRoleInfoByPage.action")
	@ResponseBody
	public Map<String, Object> queryRoleInfoByPage(String role_name, String country, DataTablePage page,
			HttpServletRequest request) {
		try {
			Map<String, Object> queryMap = new HashMap<String, Object>();
			queryMap.put("pageSize", page.getLength());
			queryMap.put("startIndex", page.getStart());
			queryMap.put("role_name", role_name);// 角色名称
			// 数量
			int total = roleManageService.queryRoleCount(queryMap);
			if (total < 0) {
				return page.toReturnMap(new ArrayList<Object>(), 0);
			}
			Page p = roleManageService.queryRoleByPage(queryMap, total);
			if (!ToolsUtil.isEmpty(p)) {
				List<Map<String, Object>> reservoirList = new ArrayList<Map<String, Object>>();
				List plist = p.getItems();
				Map<String, Object> newMap = null;
				int numNo = page.getStart() + 1;
				for (int i = 0; i < plist.size(); i++) {
					Object[] obj = (Object[]) plist.get(i);
					newMap = new HashMap<String, Object>();
					newMap.put("numNo", numNo);
					newMap.put("role_id", obj[0]);// role_id
					newMap.put("role_name", obj[1]);// 角色名称
					newMap.put("roledesc", obj[2]);// 角色描述
					newMap.put("role_code", obj[3]);// role_code
					numNo++;
					reservoirList.add(newMap);
				}
				return page.toReturnMap(reservoirList, total);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return page.toReturnMap(new ArrayList<Object>(), 0);
	}

	/**
	 * 查询单个角色信息根据主键
	 * 
	 * @param userRoleInfo
	 * @return boolean
	 */
	@RequestMapping(value = "/getRoleInfo.action")
	@ResponseBody
	public RoleInfo getRoleInfo(String id) {
		RoleInfo userRoleInfo = roleManageService.getRole(id);
		return userRoleInfo;
	}

	/**
	 * 增加角色信息
	 * 
	 * @param userRoleInfo
	 * @return boolean
	 */
	@RequestMapping(value = "/addRoleInfo.action")
	@ResponseBody
	public Map<String, Object> addRoleInfo(RoleInfo userRoleInfo) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		// 主键
		userRoleInfo.setRole_id(ToolsUtil.createUUID());
		boolean flag = roleManageService.addRole(userRoleInfo);
		if (flag) {
			resultMap.put("msg", "新增成功!");
		} else {
			resultMap.put("msg", "新增失败!");
		}
		return resultMap;
	}

	/**
	 * 修改角色信息
	 * 
	 * @param userRoleInfo
	 * @return boolean
	 */
	@RequestMapping(value = "/updateRoleInfo.action")
	@ResponseBody
	public Map<String, Object> updateRoleInfo(RoleInfo userRoleInfo) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		boolean flag = roleManageService.updateRole(userRoleInfo);
		if (flag) {
			resultMap.put("msg", "修改成功!");
		} else {
			resultMap.put("msg", "修改失败!");
		}
		resultMap.put("flag", flag);
		return resultMap;
	}

	/**
	 * 删除角色信息
	 * 
	 * @param userRoleInfo
	 * @return boolean
	 */
	@RequestMapping(value = "/deleteRoleInfo.action")
	@ResponseBody
	public Map<String, Object> deleteRoleInfo(String role_id) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		// 先判断和权限表是否还有关联
		List<RolePrivilegeRef> rolePrivilegeRefList = roleManageService.getRolePrivilegeRefListByRoleId(role_id);
		// 不存在(可以删除)
		if (rolePrivilegeRefList == null || rolePrivilegeRefList.size() == 0) {
			RoleInfo userRoleInfo = roleManageService.getRole(role_id);
			boolean flag = roleManageService.deleteRole(userRoleInfo);
			if (flag) {
				resultMap.put("msg", "删除成功!");
			} else {
				resultMap.put("msg", "删除失败!");
			}
			resultMap.put("flag", flag);
		} else {
			resultMap.put("msg", "删除失败!请确保角色信息不存在权限表中!");
		}
		return resultMap;
	}

}
