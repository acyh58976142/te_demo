package com.hr.td.service.impl.systemManage;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hr.td.dao.IBaseDao;
import com.hr.td.service.systemManage.IMenuService;
import com.nari.slsd.hd.util.CommonTool;

@Service
public class MenuImpl implements IMenuService {
	@Autowired
	private IBaseDao baseDao;

	@Override
	public List<Map<String, Object>> loadMenuByRoleId(String roleId) {
		String menuSql = "select func_id id,name,func_type,url,parent_func pId,func_code,func_level,sort_no,func_icon "+
				" from sys_privilege_info order by func_level,sort_no";
		String roleSql = "select ref_id,role_id,privilege_id from sys_role_privilege_ref where role_id = '"+ roleId +"'";
		
		List<Map<String, Object>> listMenu = baseDao.getJdbcTemplateDAO().queryForList(menuSql);
		List<Map<String, Object>> roleMenu = baseDao.getJdbcTemplateDAO().queryForList(roleSql);
		if(null != roleMenu){
			for(Map<String, Object> m : listMenu){
				for(Map<String, Object> r : roleMenu){
					if(r.get("privilege_id").toString().equals(m.get("id").toString())){
						m.put("checked", true);
					}
				}
			}
		}
		return listMenu;
	}

	@Override
	public boolean saveMenuInfo(String roleId, String menuIds) {
		String roleSql = "select ref_id,role_id,privilege_id from sys_role_privilege_ref where role_id = '"+ roleId +"'";
		List<Map<String, Object>> roleMenu = baseDao.getJdbcTemplateDAO().queryForList(roleSql);
		String saveSQL = "INSERT INTO sys_role_privilege_ref(ref_id,role_id,privilege_id) VALUES (?,?,?)";
		String [] menus = menuIds.split(",");
		int index = 0;
		int length = menus.length;
		String saveIds = "";
		for(String s : menus){
			if(null != s && "" != s){
				List<String> listParam = new ArrayList<>();
				String uuid = CommonTool.createUUID();
				if("".equals(saveIds)){
					saveIds = "'"+ uuid +"'";
				}else{
					saveIds = saveIds + ",'"+ uuid +"'";
				}
				listParam.add(uuid);
				listParam.add(roleId);
				listParam.add(s);
				baseDao.executeBySQL(saveSQL, listParam.toArray());
				index ++;
			}else{
				length --;
			}
		}
		String deleteSQL = "delete from sys_role_privilege_ref where ref_id in";
		if(index == length){
			String deleteIdStr = "";
			for(Map<String, Object> m : roleMenu){
				if("".equals(deleteIdStr)){
					deleteIdStr = "'"+ m.get("ref_id").toString() +"'";
				}else{
					deleteIdStr = deleteIdStr + ",'"+ m.get("ref_id").toString() +"'";
				}
			}
			if(null != deleteIdStr && !"".equals(deleteIdStr)){
				deleteSQL = deleteSQL + "("+ deleteIdStr +")";
				baseDao.executeBySQL(deleteSQL, new Object[]{});
			}
		}else{
			if(null != saveIds && !"".equals(saveIds)){
				deleteSQL = deleteSQL + "("+ saveIds +")";
				baseDao.executeBySQL(deleteSQL, new Object[]{});
			}
		}
		return true;
	}
}
