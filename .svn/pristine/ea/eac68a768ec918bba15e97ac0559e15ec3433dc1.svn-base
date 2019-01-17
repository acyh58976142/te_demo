package com.hr.td.service.impl.login;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hr.td.dao.IBaseDao;
import com.hr.td.entity.UserInfo;
import com.hr.td.service.login.ILoginService;
import com.hr.td.util.ToolsUtil;

@Service
public class LoginServiceImpl implements ILoginService {

	@Autowired
	private IBaseDao baseDao;
	/**
	 * 根据用户名和密码获取用户信息
	 * @param name 用户名
	 * @param password 密码
	 * @return
	 */
	public UserInfo getUserInfo(String name, String password) {
		StringBuffer sb =new StringBuffer();
		sb.append(" from UserInfo where loginuser =? and password=? and isDelete = '0'");
		@SuppressWarnings("unchecked")
		List<UserInfo> userList =baseDao.find(sb.toString(), name,password);
		if(!ToolsUtil.isEmpty(userList)){
			return userList.get(0);
		}
		
		return null;
	}
	
	/**
	 * 根据用户id获取菜单
	 * @param userId 
	 * @return
	 */
	public List<Map<String,Object>> getMenu(String userId){
		StringBuffer sb =new StringBuffer();
		List<Map<String,Object>> list=null;
		
		if("1".equals(userId)){//超级管理员
			 sb.append(" select * from ( ");
	         sb.append(" select distinct d.func_id, d.parent_func parentId,d.func_id funcId,d.name funcName,d.func_type funcType,d.url funcUrl,1 loadType,d.parent_func,d.sort_no , ");
			 sb.append(" d.locationType,case WHEN d.func_level =1 then 1 else 0 end isParent,d.func_icon funcIcon  ");
			 sb.append(" from sys_privilege_info d  ");
			 sb.append(" where 1=1 ");
			 sb.append(" and d.func_id is not null) temp  ");
			 sb.append(" order by temp.parent_func,temp.sort_no "); 
			 list=baseDao.getJdbcTemplateDAO().queryForList(sb.toString());
		 }	
		 else{
			 sb.append(" select * from ( ");
	         sb.append(" select distinct d.func_id, d.parent_func parentId,d.func_id funcId,d.name funcName,d.func_type funcType,d.url funcUrl,1 loadType,d.parent_func,d.sort_no , ");
			 sb.append(" d.locationType,case WHEN d.func_level =1 then 1 else 0 end isParent,d.func_icon funcIcon  ");
			 sb.append(" from sys_user_info a  ");
			 sb.append(" LEFT JOIN sys_user_role_ref  b on a.user_id =b.user_id  ");
			 sb.append(" left join sys_role_privilege_ref c on b.role_id =c.role_id  ");
			 sb.append(" LEFT JOIN sys_privilege_info d on d.func_id =c.privilege_id  ");
			 sb.append(" where 1=1 ");
			 sb.append(" and  a.user_id =?  ");
			 sb.append(" and d.func_id is not null) temp  ");
			 sb.append(" order by temp.parent_func,temp.sort_no "); 
			
			 list=baseDao.getJdbcTemplateDAO().queryForList(sb.toString(), userId);
		 }
	
		return list;
	}

	@Override
	public Map<String, Object> updateUserPwd(String userId, String oldPwd, String newPwd) {
		Map<String, Object> map = new HashMap<>();
		UserInfo user = (UserInfo) baseDao.getEntity(UserInfo.class, userId);
		if(null != user){
			if(user.getPassword().equals(oldPwd)){
				user.setPassword(newPwd);
				baseDao.update(user);
				map.put("code", 200);
				map.put("msg", "密码修改成功");
				map.put("data", "");
			}else{
				map.put("code", 300);
				map.put("msg", "原密码错误");
				map.put("data", "");
			}
		}
		return map;
	}

}
