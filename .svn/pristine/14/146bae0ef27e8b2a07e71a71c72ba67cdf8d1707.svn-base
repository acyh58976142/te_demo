package com.hr.td.service.impl.systemManage;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hr.td.dao.IBaseDao;
import com.hr.td.service.systemManage.IRoleUserService;
import com.hr.td.util.ToolsUtil;
import com.nari.slsd.hd.util.CommonTool;

@Service
public class RoleUserServiceImpl implements IRoleUserService {
	@Autowired
	private IBaseDao baseDao;

	@Override
	public List<Map<String, Object>> loadMenuByRoleId(String roleId) {
		List<Map<String, Object>> returnList = new ArrayList<>();
		// 获取组织架构
		String orgSql = "select * from sys_org_info";
		List<Map<String, Object>> listOrg = baseDao.getJdbcTemplateDAO().queryForList(orgSql);
		
		
		// 获取系统人员
		String userSql = "select * from sys_user_info where loginuser <>'admin' and isDelete ='0' ";
		List<Map<String, Object>> listUser = baseDao.getJdbcTemplateDAO().queryForList(userSql);
		
		String userRoleSql = "select * from sys_user_role_ref where role_id = ?";
		List<Map<String, Object>> listRoleUser = baseDao.getJdbcTemplateDAO().queryForList(userRoleSql,roleId);
		returnList.addAll(assemblyUser(listUser,listRoleUser));
		returnList.addAll(assemblyOrg(listOrg));

		return returnList;
	}
	/**
	 * 根据 人员加载 角色信息
	 * @param UserId
	 * @return
	 */
	public List<Map<String, Object>> loadMenuByUserId(String userId){

        String roleSql = " select role_id as id,role_name as name,0 as pId from sys_role_info ";
		List<Map<String, Object>> rolelist =  baseDao.getJdbcTemplateDAO().queryForList(roleSql);
		
		String userRoleSql ="SELECT role_id,user_id from sys_user_role_ref "
				+ " WHERE user_id = ? ";
		
		List<Map<String, Object>> userRolelist = baseDao.getJdbcTemplateDAO().queryForList(userRoleSql,userId);
		return assemblyRole(rolelist,userRolelist);
	}
	
	private List<Map<String, Object>> assemblyRole(List<Map<String, Object>> rolelist,List<Map<String, Object>> userRolelist) {
		for (Map<String, Object> m : rolelist) {
			for (Map<String, Object> u : userRolelist) {
				if(m.get("id").equals(u.get("role_id"))){
					m.put("checked", true);
				}
			}
			m.put("icon", "../../assets/img/people.gif");
			
		}
		return rolelist;
		
	}
	
	private List<Map<String, Object>> assemblyOrg(List<Map<String, Object>> listorg) {
		List<Map<String, Object>> returnList = new ArrayList<>();

		for (Map<String, Object> map : listorg) {
			Map<String, Object> ztreeOrgMap = new HashMap<>();
			ztreeOrgMap.put("id","u" + map.get("org_no").toString());
			ztreeOrgMap.put("name", map.get("org_name").toString());
			if ("-1".equals(map.get("parent_no").toString())) {
				ztreeOrgMap.put("pId", null);
			} else {
				ztreeOrgMap.put("pId","u" + map.get("parent_no").toString());
			}
			ztreeOrgMap.put("nocheck", true);
			ztreeOrgMap.put("icon", "../../assets/img/1_open.png");
			returnList.add(ztreeOrgMap);
		}

		return returnList;
	}
	
	public List<Map<String, Object>> assemblyUser(List<Map<String, Object>> listUser,List<Map<String, Object>> listRoleUser) {
		List<Map<String, Object>> returnList = new ArrayList<>();

		if (listUser.size() > 0) {
			for (Map<String, Object> u : listUser) {
				Map<String, Object> ztreeUserMap = new HashMap<>();
				ztreeUserMap.put("id",  u.get("USER_ID").toString());
				ztreeUserMap.put("name", u.get("NAME").toString());
				ztreeUserMap.put("pId", "u" +u.get("ORG_NO").toString());
				for (Map<String, Object> map : listRoleUser) {
					if(map.get("user_id").equals(u.get("USER_ID"))){
						ztreeUserMap.put("checked", true);
					}
				}
				ztreeUserMap.put("icon", "../../assets/img/person.png");
				returnList.add(ztreeUserMap);
			}
		}
		return returnList;
	}

	@Override
	public boolean saveMenuInfo(String roleId, String userIds) {
		String roleSql = "select  ref_id,role_id ,user_id from sys_user_role_ref where role_id = '"+ roleId +"'"
				+ " and user_id = ?";
		
		String saveSQL = "INSERT INTO sys_user_role_ref(ref_id,role_id,user_id) VALUES (?,?,?)";
		String saveIds = "";
		if(!ToolsUtil.isEmpty(userIds)){
			String [] menus = userIds.split(",");
			for(String userId : menus){
				if(null != userId && "" != userId){
					List<Map<String, Object>> roleUserList = baseDao.getJdbcTemplateDAO().queryForList(roleSql,userId);
					if(roleUserList.size()<=0){
						List<String> listParam = new ArrayList<>();
						String uuid = CommonTool.createUUID();
						listParam.add(uuid);
						listParam.add(roleId);
						listParam.add(userId);
						baseDao.executeBySQL(saveSQL, listParam.toArray());
					}
					if("".equals(saveIds)){
						saveIds = "'"+ userId +"'";
					}else{
						saveIds +=  ",'"+ userId +"'";
					}
				}
			}
		}
		String deleteSQL = "delete from sys_user_role_ref where role_id = '"+ roleId +"'";
				       /*  + " and user_id <> '111'"*/
		if(!ToolsUtil.isEmpty(saveIds)){
	    	deleteSQL+=  " and user_id not in";
	    	deleteSQL +=  "("+ saveIds +")";
	    }
		baseDao.executeBySQL(deleteSQL, new Object[]{});
		return true;
	}
	
	/**
	 * 保存 角色 信息
	 */
	public boolean saveRoleMenu(String userId, String roleIds){
		String roleSql = "select  ref_id,role_id ,user_id from sys_user_role_ref where user_id = '"+ userId +"'"
				+ " and role_id = ?";
		
		String saveSQL = "INSERT INTO sys_user_role_ref(ref_id,role_id,user_id) VALUES (?,?,?)";
		String saveIds = "";
		if(!ToolsUtil.isEmpty(roleIds)){
			String [] menus = roleIds.split(",");
			for(String roleId : menus){
				if(null != roleId && "" != roleId){
					List<Map<String, Object>> roleUserList = baseDao.getJdbcTemplateDAO().queryForList(roleSql,roleId);
					if(roleUserList.size()<=0){
						List<String> listParam = new ArrayList<>();
						String uuid = CommonTool.createUUID();
						listParam.add(uuid);
						listParam.add(roleId);
						listParam.add(userId);
						baseDao.executeBySQL(saveSQL, listParam.toArray());
					}
					if("".equals(saveIds)){
						saveIds = "'"+ roleId +"'";
					}else{
						saveIds +=  ",'"+ roleId +"'";
					}
				}
			}
		}
		String deleteSQL = "delete from sys_user_role_ref where user_id = '"+ userId +"'";
				         /*+ " and user_id <> '111'"*/
						 
	    if(!ToolsUtil.isEmpty(saveIds)){
	    	deleteSQL+= " and role_id not in";
	    	deleteSQL +=  "("+ saveIds +")";
	    }
		baseDao.executeBySQL(deleteSQL, new Object[]{});
		return true;
		
	}
}
