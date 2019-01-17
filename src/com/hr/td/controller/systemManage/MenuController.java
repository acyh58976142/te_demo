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

import com.hr.td.service.systemManage.IMenuService;

/**
* @Title: MenuController.java
* @Package com.hr.river.controller.systemManage
* @Description: 角色菜单管理
 */
@Controller
@RequestMapping(value = "/menu")
public class MenuController {

	@Autowired
	public IMenuService menuService;
	
	/**
	* @Title: MenuController.java
	* @Package com.hr.river.controller.systemManage
	* @Description: 根据角色ID跳转角色菜单管理信息
	 */
	@RequestMapping(value = "/{roleId}/redirectMenu.action")
	public String turnToRoleManageList(@PathVariable("roleId") String roleId,ModelMap modal ){
		modal.addAttribute("roleId",roleId);
		return "/systemManage/menu";
	}
	
	/**
	* @Title: MenuController.java
	* @Package com.hr.river.controller.systemManage
	* @Description: 根据角色获取菜单信息
	 */
	@RequestMapping(value = "/loadMenuByRoleId.action")
	@ResponseBody
	public Map<String, Object> loadMenuByRoleId(@RequestParam("roleId") String roleId){
		Map<String, Object> map = new HashMap<>();
		try {
			map.put("code", 200);
			map.put("msg", "");
			map.put("data", menuService.loadMenuByRoleId(roleId));
		} catch (Exception e) {
			map.put("code", 300);
			map.put("msg", "系统异常");
			e.printStackTrace();
		}
		return map;
	}
	
	/**'
	* @Title: MenuController.java
	* @Package com.hr.river.controller.systemManage
	* @Description: 保存菜单信息
	 */
	@RequestMapping(value = "/saveMenuInfo.action")
	@ResponseBody
	public Map<String, Object> saveMenuInfo(@RequestParam("roleId") String roleId, @RequestParam("menuIds") String menuIds){
		Map<String, Object> map = new HashMap<>();
		try {
			map.put("code", 200);
			map.put("msg", "");
			map.put("data", menuService.saveMenuInfo(roleId, menuIds));
		} catch (Exception e) {
			map.put("code", 300);
			map.put("msg", "系统异常");
			e.printStackTrace();
		}
		return map;
	}
}
