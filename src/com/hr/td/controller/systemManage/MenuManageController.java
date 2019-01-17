package com.hr.td.controller.systemManage;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hr.td.entity.PrivilegeInfo;
import com.hr.td.service.systemManage.IMenuManageService;
import com.hr.td.util.DataTablePage;
import com.hr.td.util.Page;
import com.hr.td.util.ToolsUtil;

/**
 * 菜单管理Controller
 * @author 
 */
@Controller
@RequestMapping(value = "/menuManage")
public class MenuManageController {

	@Autowired
	private IMenuManageService imenumanageservice;

	@RequestMapping(value = "/turnTomenuManageList.action")
	public String turnTomenuManageList() {
		return "/systemManage/menuManagement";
	}

	/**
	 * 分页查询角色信息
	 */
	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/queryMenuManageList.action")
	@ResponseBody
	public Map<String, Object> queryMenuManageList(String name,String menuType, DataTablePage page,
			HttpServletRequest request) {
		try {
			Map<String, Object> queryMap = new HashMap<String, Object>();
			queryMap.put("pageSize", page.getLength());
			queryMap.put("startIndex", page.getStart());
			queryMap.put("name", name);// 菜单名称
			queryMap.put("menuType", menuType);// 菜单类型：1：web 2:app
			// 数量
			int total = imenumanageservice.queryMenuManageCount(queryMap);
			if (total < 0) {
				return page.toReturnMap(new ArrayList<Object>(), 0);
			}
			Page p = imenumanageservice.queryMenuManagePage(queryMap, total);
			if (!ToolsUtil.isEmpty(p)) {
				List<Map<String, Object>> reservoirList = new ArrayList<Map<String, Object>>();
				
				List plist = p.getItems();
				Map<String, Object> newMap = null;
				int numNo = 1;
				for (int i = 0; i < plist.size(); i++) {
					Object[] obj = (Object[]) plist.get(i);
					newMap = new HashMap<String, Object>();
					newMap.put("numNo", numNo);
					newMap.put("func_id", obj[0]);// 功能ID
					newMap.put("name", obj[1]);// 功能名称
					newMap.put("func_type", obj[2]);//功能类型
					newMap.put("url", obj[3]);//URL地址
					newMap.put("parent_func", obj[4]);//上级功能CODE
					newMap.put("func_code", obj[5]);// 功能代码
					newMap.put("func_level", obj[6]);// 级别
					newMap.put("sort_no", obj[7]);// 排序
					newMap.put("func_icon", obj[8]);//菜单图标
					newMap.put("SuperiorName", obj[9]);//上级功能名称
					newMap.put("isPhone", obj[10]);//菜单类型（1：web 2:app）
					
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
	* @Description: 根据菜单获取角色信息
	* @author chenSha
	* @date 2018年2月5日 上午10:39:51
	 */
	@RequestMapping(value = "/loadMenuByFuncId.action")
	@ResponseBody
	public Map<String, Object> loadMenuByFuncId(@RequestParam("funcId") String funcId){
		Map<String, Object> map = new HashMap<>();
		try {
			map.put("code", 200);
			map.put("msg", "");
			map.put("data", imenumanageservice.loadMenuByFuncId(funcId));
		} catch (Exception e) {
			map.put("code", 300);
			map.put("msg", "系统异常");
			e.printStackTrace();
		}
		return map;
	}
	
	/**'
	* @Description: 保存角色信息
	* @author chenSha
	* @date 2018年2月5日 上午11:27:45
	 */
	@RequestMapping(value = "/saveRoleMenu.action")
	@ResponseBody
	public Map<String, Object> saveRoleMenu(@RequestParam("funcId") String funcId, @RequestParam("roleIds") String roleIds){
		Map<String, Object> map = new HashMap<>();
		try {
			map.put("code", 200);
			map.put("msg", "保存成功");
			map.put("data", imenumanageservice.saveRoleMenu(funcId, roleIds));
		} catch (Exception e) {
			map.put("code", 300);
			map.put("msg", "系统异常");
			e.printStackTrace();
		}
		return map;
	}
	
	@RequestMapping(value="/QuerySuperiorMenu.action")
	@ResponseBody
	public Map<String,Object> QuerySuperiorMenu(HttpServletRequest request){
		Map<String,Object> retMap = new HashMap<String,Object>();
		try {
			//查询上级功能
			List<Map<String, Object>> superiormenu = imenumanageservice.QuerySuperiorMenu();
			retMap.put("superiormenu", superiormenu);
			} catch (Exception e) {
				e.printStackTrace();
			}
		return  retMap;
	}

	/**
	 * 添加菜单信息
	 * @param mycars
	 * @param request
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping(value="/savemenuManageInfo.action")
	@ResponseBody
	public Map<String,Object> savemenuManageInfo( String mycars, HttpServletRequest request){
		Map<String,Object> retMap = new HashMap<String,Object>();
		Object jsonString = ToolsUtil.strToJson(mycars, Map.class);
		Map<String,Object> paramData  = (Map) jsonString;
		try {
				int a = imenumanageservice.savemenuManageInfo(paramData);
				if(a==1) {
					retMap.put("code", 200);
					retMap.put("msg", "success");
				}
			} catch (Exception e) {
				e.printStackTrace();
				retMap.put("code", 300);
				retMap.put("msg", "error");
			}
		return  retMap;
	}
	
	
	
	
	/**
	 * 修改菜单信息
	 * @param mycars
	 * @param request
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping(value="/updatemenuManageInfo.action")
	@ResponseBody
	public Map<String,Object> updatemenuManageInfo( String mycars, HttpServletRequest request){
		Map<String,Object> retMap = new HashMap<String,Object>();
		Object jsonString = ToolsUtil.strToJson(mycars, Map.class);
		Map<String,Object> paramData  = (Map) jsonString;
		try {
				int a = imenumanageservice.updatemenuManageInfo(paramData);
				if(a==1) {
					retMap.put("code", 200);
					retMap.put("msg", "success");
				}else {
					retMap.put("code", 300);
					retMap.put("msg", "error");
				}
			} catch (Exception e) {
				e.printStackTrace();
				retMap.put("code", 300);
				retMap.put("msg", "error");
			}
		return  retMap;
	}
	
	/**
	 * 通过ID查询数据
	 * @param func_id
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/querymenuEntity.action")
	@ResponseBody
	public Map<String,Object> queryPrivilegeInfo( String func_id, HttpServletRequest request){
		Map<String,Object> retMap = new HashMap<String,Object>();
		try {
			 PrivilegeInfo	entity = imenumanageservice.queryPrivilegeInfo(func_id);
				retMap.put("entity", entity);
			} catch (Exception e) {
				e.printStackTrace();
			}
		return  retMap;
	}
	
	

	/**
	 * 通过ID删除数据
	 * @param river_id
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/deleteMenuEntity.action")
	@ResponseBody
	public Map<String,Object> deleteMenuEntity( String func_id, HttpServletRequest request){
		Map<String,Object> retMap = new HashMap<String,Object>();
		try {
				int sta = 0;
				//查询权限表的关联关系
				int nums = imenumanageservice.QueryInnerMenu(func_id);
				//如果有关联关系
				if(nums>0) {
					retMap.put("code", 200);
					retMap.put("msg", "500");
				}else {
					sta = imenumanageservice.deleteMenuEntity(func_id);
					if(sta==1) {
						retMap.put("code", 200);
						retMap.put("msg", "success");
					}else {
						retMap.put("code", 300);
						retMap.put("msg", "error");
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		return  retMap;
	}
	
	/**
	 * 查询所有的角色
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/QuerySysRoleInfo.action")
	@ResponseBody
	public Map<String,Object> QuerySysRoleInfo( HttpServletRequest request){
		Map<String,Object> retMap = new HashMap<String,Object>();
		try {
//				List<Map<String,Object>> list = imenumanageservice.QuerySysRoleInfo();
//				Map<String,Object> map = new HashMap<>();
//				map.put("id", 0);
//				map.put("name", "角色信息");
//				map.put("pId", null);
//				list.add(map);
//				retMap.put("list", list);
			} catch (Exception e) {
				e.printStackTrace();
			}
		return  retMap;
	}
	
	
	
	/**
	 * 添加查询角色关联
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/QuerySysRoleInfoSave.action")
	@ResponseBody
	public Map<String,Object> QuerySysRoleInfoSave(String func_id, HttpServletRequest request){
		Map<String,Object> retMap = new HashMap<String,Object>();
		try {
				List<Map<String,Object>> list = imenumanageservice.QuerySysRoleInfoSave(func_id);
				List<Map<String, Object>> reservoirList = new ArrayList<Map<String, Object>>();
				if (!ToolsUtil.isEmpty(list)) {
					Map<String, Object> newMap = null;
					for (int i = 0; i < list.size(); i++) {
						Map<String, Object> maplist = list.get(i);
						newMap = new HashMap<String, Object>();
						newMap.put("ref_id", maplist.get("ref_id").toString());//主键ID
						newMap.put("role_id", maplist.get("role_id").toString());//角色ID
						newMap.put("privilege_id", maplist.get("privilege_id").toString());//权限ID
						reservoirList.add(newMap);
					}
				}
				retMap.put("reservoirList", reservoirList);
			} catch (Exception e) {
				e.printStackTrace();
			}
		return  retMap;
	}
	
	
	
	
	
	
	
	
	
	
}
