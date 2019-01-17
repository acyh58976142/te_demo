package com.hr.td.controller.systemManage;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hr.td.entity.RoleInfo;
import com.hr.td.service.systemManage.IRoleManageService;
import com.hr.td.service.systemManage.IRoleUserService;

/**
* @Description: 角色人员管理
* @author 
 */
@Controller
@RequestMapping(value = "/roleUserManger")
public class RoleUserManagerController {

	@Autowired
	private IRoleUserService roleUserService;
	
	@Autowired
	private IRoleManageService roleManageService;
	
	/**
	* @Description: 根据角色ID跳转角色人员管理信息
	* @author
	 */
	@RequestMapping(value = "/{roleId}/roleUserMenu.action")
	public String turnToRoleManageList(@PathVariable("roleId") String roleId,ModelMap modal ){
		
		RoleInfo role = roleManageService.getRole(roleId);
		modal.addAttribute("roleId",roleId);
		modal.addAttribute("roleName",role.getRole_name());
		return "/systemManage/roleUserManger";
	}
	
	/**
	* @Description: 根据角色获取人员信息
	* @author
	 */
	@RequestMapping(value = "/loadMenuByRoleId.action")
	@ResponseBody
	public Map<String, Object> loadMenuByRoleId(@RequestParam("roleId") String roleId){
		Map<String, Object> map = new HashMap<>();
		try {
			map.put("code", 200);
			map.put("msg", "");
			map.put("data", roleUserService.loadMenuByRoleId(roleId));
		} catch (Exception e) {
			map.put("code", 300);
			map.put("msg", "系统异常");
			e.printStackTrace();
		}
		return map;
	}
	
	/**
	* @Description: 根据人员获取角色信息
	* @author
	 */
	@RequestMapping(value = "/loadMenuByUserId.action")
	@ResponseBody
	public Map<String, Object> loadMenuByUserId(@RequestParam("userId") String userId){
		Map<String, Object> map = new HashMap<>();
		try {
			map.put("code", 200);
			map.put("msg", "");
			map.put("data", roleUserService.loadMenuByUserId(userId));
		} catch (Exception e) {
			map.put("code", 300);
			map.put("msg", "系统异常");
			e.printStackTrace();
		}
		return map;
	}
	
	/**'
	* @Description: 保存人员信息
	* @author 
	 */
	@RequestMapping(value = "/saveMenuInfo.action")
	@ResponseBody
	public Map<String, Object> saveMenuInfo(@RequestParam("roleId") String roleId, @RequestParam("userIds") String userIds){
		Map<String, Object> map = new HashMap<>();
		try {
			map.put("code", 200);
			map.put("msg", "");
			map.put("data", roleUserService.saveMenuInfo(roleId, userIds));
		} catch (Exception e) {
			map.put("code", 300);
			map.put("msg", "系统异常");
			e.printStackTrace();
		}
		return map;
	}
	
	/**'
	* @Description: 保存角色信息
	* @author 
	 */
	@RequestMapping(value = "/saveRoleMenu.action")
	@ResponseBody
	public Map<String, Object> saveRoleMenu(@RequestParam("userId") String userId, @RequestParam("roleIds") String roleIds){
		Map<String, Object> map = new HashMap<>();
		try {
			map.put("code", 200);
			map.put("msg", "保存成功");
			map.put("data", roleUserService.saveRoleMenu(userId, roleIds));
		} catch (Exception e) {
			map.put("code", 300);
			map.put("msg", "系统异常");
			e.printStackTrace();
		}
		return map;
	}
}
