package com.hr.td.controller.systemManage;

import java.io.Serializable;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hr.td.service.systemManage.IUserManageService;
import com.hr.td.util.DataTablePage;
import com.hr.td.util.Page;
import com.hr.td.util.ToolsUtil;
import com.hr.td.util.UUIDGenerator;

/** 
* @ClassName: UserManageController 
* @Description: 人员管理
* @author
* 
*/
@Controller
@RequestMapping(value = "/userManage")
public class UserManageController {
	
	private static final Logger LOG = Logger.getLogger(UserManageController.class);
	
	@Autowired
	private IUserManageService userManageService;
	
	
	/**
	 * 跳转人员管理页面
	 * @return
	 */
	@RequestMapping(value="/turnToUserManageList.action")
	public String turnToBasinList(ModelMap model, HttpServletRequest request){
		
		Map<String, Object> map = new HashMap<String, Object>();
		//获取单位List
		List<Map<String, Object>> orgInfoList = userManageService.getOrgInfoList(map);

		model.addAttribute("orgInfoList", orgInfoList);
		
		return "/systemManage/userManageList";
	}
	
	/**
	 * 
	* @Title: queryUserManageList 
	* @Description: 分页查询人员信息
	* @param name
	* @param page
	* @param request
	* @return  参数说明 
	* @throws
	 */
	@RequestMapping(value = "/queryUserManageList.action")
	@ResponseBody
	public Map<String, Object> queryUserManageList(String name,String loginAccount,String userUnit, String state, DataTablePage page, HttpServletRequest request) {
		
		try {
			Map<String, Object> queryMap = new HashMap<String, Object>();
			queryMap.put("pageSize", page.getLength());
			queryMap.put("startIndex", page.getStart());
			queryMap.put("name", name);//姓名
			queryMap.put("state", state);//状态
			queryMap.put("loginAccount", loginAccount);//登录账户
			queryMap.put("userUnit", userUnit);//用户所在单位
			
			int total = userManageService.queryUserManageCount(queryMap);// 数量
			if (total < 0) {
				return page.toReturnMap(new ArrayList<Object>(), 0);
			}
			
			Page p = userManageService.queryUserManageList(queryMap, total);
			if (!ToolsUtil.isEmpty(p)) {
				List<Map<String, Object>> userList = new ArrayList<Map<String, Object>>();
				List plist = p.getItems();
				int numNo = 1;
				
				for (int i = 0; i < plist.size(); i++) {
					Object[] obj = (Object[]) plist.get(i);
					Map<String, Object> newMap = new HashMap<String, Object>();
					newMap.put("numNo", numNo);
					newMap.put("name", obj[0]);// 姓名
					newMap.put("sex", obj[1]);//性别
					newMap.put("org_name", obj[2]);// 用户所在单位
					newMap.put("mobile", obj[3]);//用户电话
					newMap.put("address", obj[4]);// 地址
					newMap.put("email", obj[5]);//邮件
					newMap.put("user_post", obj[6]);//职务
					newMap.put("loginuser", obj[7]);//登录名
					newMap.put("user_no", obj[8]);//用户编号
					newMap.put("user_id", obj[9]);//用户id
					newMap.put("password", obj[10]);
					newMap.put("org_no", obj[11]);
					newMap.put("isSpecial", obj[12]);
					newMap.put("isDelete", obj[13]);
					numNo++;
					userList.add(newMap);
				}
				
				return page.toReturnMap(userList, total);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return page.toReturnMap(new ArrayList<Object>(), 0);
	}
	
	
	
	@RequestMapping(value = "/addUserInfo.action")
	@ResponseBody
	public Map<String, Object> addUserInfo(@RequestParam("user_id") String user_id,@RequestParam("loginuser") String loginuser,
			@RequestParam("password") String password, @RequestParam("name") String name,
			@RequestParam("sex") String sex, @RequestParam("org_name") String org_name,
			@RequestParam("mobile") String mobile, @RequestParam("address") String address,
			@RequestParam("email") String email, @RequestParam("user_post") String user_post,
			@RequestParam("user_level") String user_level,
			@RequestParam("riverCode") String riverCode,
			@RequestParam("basicCode") String basicCode,
			HttpServletRequest request) {
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String, Object> paramMap = new HashMap<String, Object>();
		List<Map<String, Object>> userNoList = userManageService.getUserNoList(paramMap);
		if(!ToolsUtil.isEmpty(userNoList)) {
			 String user_no= userNoList.get(0).get("user_no")==null?"":userNoList.get(0).get("user_no").toString();
			 paramMap.put("user_no", String.valueOf(Integer.parseInt(user_no)+1));
		}
	    
		paramMap.put("user_id", user_id);
		paramMap.put("loginuser", loginuser);
		paramMap.put("password", password);
		paramMap.put("name", name);
		paramMap.put("sex", sex);
		paramMap.put("org_name", org_name);
		paramMap.put("org_no", org_name);
		paramMap.put("mobile", mobile);
		paramMap.put("address", address);
		paramMap.put("email", email);
		paramMap.put("user_post", user_post);
		paramMap.put("user_level", user_level);
		paramMap.put("isDelete", 0);
		
		Serializable serializable =null;
		boolean flag = false;
		if(ToolsUtil.isEmpty(user_id)) {
			 String uuid=UUIDGenerator.getUUID();
			 paramMap.put("uuid", uuid);
			 serializable = userManageService.saveUserInfo(paramMap);
			 
			 if (!ToolsUtil.isEmpty(serializable)) {
				    saveRelation(uuid,riverCode,basicCode);//添加人员河流关系
					resultMap.put("msg", "添加成功");
	    			resultMap.put("code", 200);
				}else {
					resultMap.put("msg", "添加失败");
	    			resultMap.put("code", 300);
					
				}
		}else {
			
			flag=userManageService.updateUserInfo(paramMap);
			
		}
		
			return resultMap;
		
	}
	
	public void saveRelation(String uuid,String riverCode,String basicCode){
		if(!ToolsUtil.isEmpty(riverCode)){
			int index=riverCode.indexOf(",");
			 if(index>0){
			        String[] riverArray= riverCode.split(",");
			     //   String[] basicArray= basicCode.split(",");
			        for(int i=0;i<riverArray.length;i++){
			        	Map<String, Object> relationMap=new HashMap<String, Object>();
			        	relationMap.put("user_id", uuid);
			        	relationMap.put("river_code", riverArray[i]);
			       // 	relationMap.put("basinc_code", basicArray[i]);
			        	
			        }
			 }
			 else{
				 Map<String, Object> relationMap=new HashMap<String, Object>();
		        	relationMap.put("user_id", uuid);
		        	relationMap.put("river_code", riverCode);
		       // 	relationMap.put("basinc_code", basicCode);
		    
			 }
		}		 
	}
	
	
	/**
	 * 
	* @Title: deleteUserInfo 
	* @Description: 删除人员信息
	* @param user_id
	* @param request
	* @return  参数说明 
	* @throws
	 */
	@RequestMapping(value = "/deleteUserInfo.action")
	@ResponseBody
	public Map<String, Object> deleteUserInfo(String user_id,String user_level, HttpServletRequest request){
		boolean flag = true;
		Map<String, Object> resultMap = new HashMap<String, Object>();
	try {	
		if(!ToolsUtil.isEmpty(user_level)){
			if(user_level.equals("1")){
				  resultMap.put("flag", false);
				  resultMap.put("msg", "该用户为超级用户不能删除");
			}else{
				flag = userManageService.deleteUserInfo(user_id);
				if (flag) {
					resultMap.put("msg", "删除成功");
					resultMap.put("code", 200);
				}else {
					resultMap.put("msg", "删除失败");
					resultMap.put("code", 300);
				}
			}
				return resultMap;
		}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return resultMap;
	}
	
	
	/**
	 * 检查员工账号是否重复
	 * 
	 * @param name
	 * @return
	 * @throws 
	 */
	@RequestMapping(value = "queryloginuserName.action", method = RequestMethod.POST)
	@ResponseBody
	public boolean queryloginuserName(String loginuser) {
		boolean flag = true;
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("loginuser", loginuser);
		if (!ToolsUtil.isEmpty(loginuser)) {
			flag = userManageService.checkLoginuser(map);

			return flag;
		}
		return false;
	}
	
}
