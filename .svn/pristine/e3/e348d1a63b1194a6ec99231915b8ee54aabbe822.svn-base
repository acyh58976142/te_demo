package com.hr.td.controller.systemManage;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hr.td.entity.SysOrgInfo;
import com.hr.td.service.systemManage.IUnitManageService;
import com.hr.td.util.CommonTool;
import com.hr.td.util.DataTablePage;
import com.hr.td.util.Page;
import com.hr.td.util.ToolsUtil;

/**
 * 
 * @Description: 单位管理
 * @author 
 */
@Controller
@RequestMapping(value = "/unitManage")
public class UnitManageController {

	@Autowired
	private IUnitManageService unitManageService;

	private static final Logger LOG = Logger.getLogger(UnitManageController.class);

	/**
	 * 跳转到单位管理页面
	 */
	@RequestMapping(value = "/turnToUnitManageList.action")
	public String turnToUnitManageList(ModelMap model, HttpServletRequest request) {
		// 自定义
		Map<String, Object> map = new HashMap<String, Object>();
		
		return "/systemManage/unitManageList";
	}

	/***
	 * 查询单位管理分页数据
	 */
	@RequestMapping(value = "/queryUnitManageList.action")
	@ResponseBody
	public Map<String, Object> queryUnitManageList(DataTablePage page, String unitName, String country) {

		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("pageSize", page.getLength());
			map.put("startIndex", page.getStart());
			map.put("unitName", unitName);
			map.put("country", country);
			// 总量
			int totalCount = unitManageService.queryUnitManageCount(map);
			if (!ToolsUtil.isEmpty(totalCount) && totalCount <= 0) {
				return page.toReturnMap(new ArrayList<Object>(), totalCount);
			}
			// 总数
			Page p = unitManageService.queryUnitManagePage(map, totalCount);
			if (!ToolsUtil.isEmpty(p)) {
				List<Map<String, Object>> Listmap = new ArrayList<Map<String, Object>>();
				List plist = p.getItems();
				int numNo = 1;
				for (int i = 0; i < plist.size(); i++) {
					Object[] obj = (Object[]) plist.get(i);
					Map<String, Object> querymap = new HashMap<String, Object>();
					querymap.put("numNo", numNo); // 序号
					querymap.put("org_no", obj[0]);// 单位编码
					querymap.put("org_name", obj[1]);// 单位名称
					querymap.put("parent_no", obj[2]);// 上级单位编号
					querymap.put("is_valid", obj[3]);// 是否生效
					querymap.put("org_address", obj[4]);// 单位地址
					querymap.put("org_telephone", obj[5]);// 联系电话
					querymap.put("area_code", obj[6]);// 行政编号
					querymap.put("parentname", obj[7]);// 上级单位名称
					querymap.put("ANAME", obj[8]);// 乡镇名称
					numNo++;
					Listmap.add(querymap);
				}
				return page.toReturnMap(Listmap, totalCount);
			}
		} catch (Exception e) {
			e.printStackTrace();
			LOG.debug(e);
		}

		return page.toReturnMap(new ArrayList<Object>(), 0);
	}

	/**
	 * 新增单位管理信息数据
	 */
	@RequestMapping(value = "/addUnitManage.action")
	@ResponseBody
	public Map<String, Object> addOrgInfo(String param, HttpServletRequest request) {
		boolean flag = true;
		Map<String, Object> result = new HashMap<String, Object>();
		Object jsonString = ToolsUtil.strToJson(param, Map.class);
		result = (Map) jsonString;

		// 获取值
		String unitName = result.get("org_name") == null ? "" : result.get("org_name").toString();// 单位名称
		String parentname = result.get("parentname") == null ? "" : result.get("parentname").toString();// 上级单位名称
		String orgAddress = result.get("org_address") == null ? "" : result.get("org_address").toString();// 地址
		String orgTelephone = result.get("org_telephone") == null ? "" : result.get("org_telephone").toString();// 联系电话
		String codeName = result.get("code") == null ? "" : result.get("code").toString();// 乡镇名称
		String isValid = result.get("is_valid") == null ? "" : result.get("is_valid").toString();// 乡镇名称
		String uuId = CommonTool.createUUID() == null ? "" : CommonTool.createUUID().toString();
		// 设置

		SysOrgInfo org = new SysOrgInfo();
		org.setOrg_name(unitName);
		org.setParent_no(parentname);
		org.setOrg_address(orgAddress);
		org.setOrg_telephone(orgTelephone);
		org.setArea_code(codeName);
		org.setIs_valid(isValid);
		org.setOrg_no(uuId);
		// 调用保存接口
		flag = unitManageService.AddUnitManage(org);

		if (flag) {
			result.put("msg", "添加成功");
			result.put("code", "200");
		} else {
			result.put("msg", "添加失败");
			result.put("code", "300");
		}
		return result;
	}

	/**
	 * 编辑赋值
	 */
	@RequestMapping(value = "/getUnitManage.action")
	@ResponseBody
	public SysOrgInfo getUnitManage(String id) {

		SysOrgInfo orgInfo = new SysOrgInfo();
		if (!ToolsUtil.isEmpty(id)) {

			orgInfo = unitManageService.getEntity(id);
		}
		return orgInfo;
	}

	/**
	 * 编辑保存
	 */
	@RequestMapping(value = "/updateUnitManage.action")
	@ResponseBody
	public Map<String, Object> UpdateOrgInfo(String param, HttpServletRequest request) {
		boolean flag = true;
		Map<String, Object> result = new HashMap<String, Object>();
		Object jsonString = ToolsUtil.strToJson(param, Map.class);
		result = (Map) jsonString;

		// 获取值
		String Id = result.get("Id") == null ? "" : result.get("Id").toString();// 主键Id
		String unitName = result.get("org_name") == null ? "" : result.get("org_name").toString();// 单位名称
		String parentname = result.get("parentname") == null ? "" : result.get("parentname").toString();// 上级单位名称
		String orgAddress = result.get("org_address") == null ? "" : result.get("org_address").toString();// 地址
		String orgTelephone = result.get("org_telephone") == null ? "" : result.get("org_telephone").toString();// 联系电话
		String codeName = result.get("code") == null ? "" : result.get("code").toString();// 乡镇名称
		String isValid = result.get("is_valid") == null ? "" : result.get("is_valid").toString();// 乡镇名称
		// 设置

		SysOrgInfo org = new SysOrgInfo();
		org.setOrg_name(unitName);
		org.setParent_no(parentname);
		org.setOrg_address(orgAddress);
		org.setOrg_telephone(orgTelephone);
		org.setArea_code(codeName);
		org.setIs_valid(isValid);
		org.setOrg_no(Id);
		// 调用保存接口
		flag = unitManageService.UpdateUnitManage(org);

		if (flag) {
			result.put("msg", "编辑成功");
			result.put("code", "200");
		} else {
			result.put("msg", "编辑失败");
			result.put("code", "300");
		}
		return result;
	}

	/**
	 * 删除
	 */
	@RequestMapping(value = "/deleteUnitManage.action")
	@ResponseBody
	public Map<String, Object> deleteUnitManage(String Id) {

		boolean flag = true;
		Map<String, Object> result = new HashMap<String, Object>();
		Map<String, Object> map = new HashMap<String, Object>();

		map.put("Id", Id);

		SysOrgInfo orginfo = new SysOrgInfo();
		orginfo.setOrg_no(Id);
		//获取单位绑定的人员编号
		List<Map<String, Object>> getueron = unitManageService.queryisUserOn(map);
		List<String> str = new ArrayList<>();
		Object[] obj = null;
		//循环获取人员编码，判断非空
		for (int i = 0; i < getueron.size(); i++) {
			
			Map<String, Object> dmap = getueron.get(i);
			if(!ToolsUtil.isEmpty(dmap.get("user_no"))){
				str.add(dmap.get("user_no").toString());
			}else{
				obj=(Object[]) dmap.get("user_no");
			}
		}
		//取出人员编号，做非空处理；单位下有人员存在则，不能删除此单位信息
		if (!ToolsUtil.isEmpty(str)) {
			
			result.put("obj", str);
			return result;
		//没有人员，可以删除单位
		} else if (!ToolsUtil.isEmpty(Id) && ToolsUtil.isEmpty(obj)) {
			flag = unitManageService.deleteUnitManage(orginfo);

			if (flag) {
				result.put("msg", "删除成功");
				result.put("code", "200");
			} else {
				result.put("msg", "删除失败");
				result.put("code", "300");
			}
		}
		return result;
	}

	/**
	 * 检查单位名称是否重复
	 * 
	 * @param name
	 * @return
	 * @throws 
	 */
	@RequestMapping(value = "queryUnitName.action", method = RequestMethod.POST)
	@ResponseBody
	public boolean queryUnitName(String name) {
		boolean flag = true;
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("name", name);
		if (!ToolsUtil.isEmpty(name)) {
			flag = unitManageService.checkUnitName(map);

			return flag;
		}

		return false;
	}
}
