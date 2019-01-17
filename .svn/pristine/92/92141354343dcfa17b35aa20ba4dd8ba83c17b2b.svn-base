package com.hr.td.service.impl.systemManage;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hr.td.dao.IBaseDao;
import com.hr.td.entity.UserInfo;
import com.hr.td.service.systemManage.IUserManageService;
import com.hr.td.util.Page;
import com.hr.td.util.ToolsUtil;
import com.hr.td.util.UUIDGenerator;
import com.nari.slsd.hd.util.CommonTool;

/** 
* @ClassName: BasinServiceImpl 
* @Description: 用户信息管理 
* @author 
* 
*/
@Service
public class UserManageServiceImpl implements IUserManageService{
	
	@Autowired
	private IBaseDao baseDao;

	/**
	 * 分页查询人员信息
	 * @param map
	 * @return
	 */
	@Override
	public Page queryUserManageList(Map<String, Object> map, int total) {
		
		int pageSize = CommonTool.ConvertToInt(ToolsUtil.isEmpty(map.get("pageSize"))?"0":map.get("pageSize").toString());
		int startIndex =CommonTool.ConvertToInt(ToolsUtil.isEmpty(map.get("startIndex"))?"0":map.get("startIndex").toString());
	    Map<String,Object> queryMap = getUserManageList(map);
		String sql = queryMap.get("sql").toString();
		Object[] parameters = (Object[]) queryMap.get("map");
		
		return baseDao.getPageBySql(total, sql, pageSize, startIndex, parameters);
	}

	/**
	 * 查询人员信息数量
	 * 
	 */
	@Override
	public int queryUserManageCount(Map<String, Object> map) {
		
		Map<String,Object> queryMap = getUserManageList(map);
		String sql = queryMap.get("sql").toString();
		Object[] parameters = (Object[])queryMap.get("map");
		int count= baseDao.getCountBySql(sql, parameters);
		
		return count;
	}
	
	/**
	 * 分页查询sql
	 * @param map
	 * @return
	 */
	private Map<String,Object> getUserManageList(Map<String,Object> map){
		
		Map<String, Object> paramer = new HashMap<String, Object>();
		//非空判断
		String name =  map.get("name")==null?"":map.get("name").toString();//姓名
		String state = map.get("state")==null?"":map.get("state").toString();//状态
		String loginAccount = map.get("loginAccount")==null?"":map.get("loginAccount").toString();//登录账户
		String userUnit = map.get("userUnit")==null?"":map.get("userUnit").toString();//用户所在单位
		
		StringBuilder sql= new StringBuilder();
		List<Object> list = new ArrayList<Object>();
		
		sql.append("select sui.name,sui.sex,soi.org_name,sui.mobile,sui.address,sui.email,sui.user_post,sui.loginuser, sui.user_no,sui.user_id,sui.password ,sui.org_no,sui.isSpecial,sui.isDelete from sys_user_info sui")
		.append(" LEFT JOIN sys_org_info soi on soi.org_no = sui.org_no")
		.append(" where 1=1 and sui.loginuser !='admin' ");
		
		if (!ToolsUtil.isEmpty(name)){
			//姓名
			sql.append(" and sui.name like ? ");
			list.add("%" + name.toString() + "%");
		}
		
		if (!ToolsUtil.isEmpty(loginAccount)){
			//登录账户
			sql.append(" and sui.loginuser like ? ");
			list.add("%" + loginAccount.toString() + "%");
		}
		
		if (!ToolsUtil.isEmpty(userUnit)){
			//登录账户
			sql.append(" and sui.org_no = ? ");
			list.add(userUnit.toString());
		}
		
		if(!ToolsUtil.isEmpty(state)){
			//状态
			sql.append(" and sui.isDelete = ?");
			list.add(state.toString());
		}
		
		sql.append(" order by sui.sort_no");
		paramer.put("sql", sql.toString());
		paramer.put("map", list.toArray());
		
		return paramer;
	}
	
	
	/** 
	* @Title: getOrgInfoList 
	* @Description: 获取单位信息
	* @param map
	* @return  参数说明 
	* @throws 
	*/
	@Override
	public List<Map<String, Object>> getOrgInfoList(Map<String, Object> map) {
		
		StringBuilder builder = new StringBuilder();
		List<Object> list = new ArrayList<Object>();
		builder.append(" select soi.org_no,soi.org_name,soi2.org_name as parent_no,soi.is_valid,soi.org_address,soi.org_telephone");
		builder.append(" from sys_org_info soi");
		builder.append(" left join sys_org_info soi2 on soi.parent_no=soi2.org_no ");
		builder.append(" where 1=1 ");
		
		Object obj = null;
		if (!ToolsUtil.isEmpty(obj = map.get("org_no"))) {
			builder.append(" and soi.org_no = ? ");
			list.add(obj.toString());
		}

		List<Map<String, Object>> orgInfoList = baseDao.getJdbcTemplateDAO().queryForList(builder.toString(),
				list.toArray());

		return orgInfoList;
	}

	
	/** 
	* @Title: saveUserInfo 
	* @Description: 新增人员信息
	* @param paramMap
	* @return  参数说明 
	* @throws 
	*/
	@Override
	public Serializable saveUserInfo(Map<String, Object> map) {
		
		UserInfo userInfo = new UserInfo();
		Object obj=null;
				
		//userInfo.setUserId(UUIDGenerator.getUUID());//人员id
		if(!ToolsUtil.isEmpty(obj=map.get("uuid"))){//人员id
			userInfo.setUserId(obj.toString());
		}		
		if(!ToolsUtil.isEmpty(obj=map.get("user_no"))){//人员编码
			userInfo.setUser_no(obj.toString());
		}
		if(!ToolsUtil.isEmpty(obj=map.get("loginuser"))){//登录账号
			userInfo.setLoginuser(obj.toString());
		}
		if(!ToolsUtil.isEmpty(obj=map.get("password"))){//密码
			userInfo.setPassword(obj.toString());
		}
		if(!ToolsUtil.isEmpty(obj=map.get("name"))){//姓名
			userInfo.setName(obj.toString());
		}
		if(!ToolsUtil.isEmpty(obj=map.get("sex"))){//性别
			userInfo.setSex(obj.toString());
		}
		if(!ToolsUtil.isEmpty(obj=map.get("org_name"))){//用户所在单位
			userInfo.setOrgNo(obj.toString());
		}
		if(!ToolsUtil.isEmpty(obj=map.get("mobile"))){//用户电话
			userInfo.setMobile(obj.toString());
		}
		if(!ToolsUtil.isEmpty(obj=map.get("address"))){//地址
			userInfo.setAddress(obj.toString());
		}
		if(!ToolsUtil.isEmpty(obj=map.get("email"))){//邮件
			userInfo.setEmail(obj.toString());
		}
		if(!ToolsUtil.isEmpty(obj=map.get("user_post"))){//职务
			userInfo.setPost(obj.toString());
		}
		if(!ToolsUtil.isEmpty(obj=map.get("user_level"))){//级别
			userInfo.setIsSpecial(obj.toString());
		}
		if(!ToolsUtil.isEmpty(obj=map.get("isDelete"))){//级别
			userInfo.setIsDelete(obj.toString());
		}
		Serializable Seria =baseDao.save(userInfo);
		
		return Seria;
	}


	/** 
	* @Title: updateUserInfo 
	* @Description: 编辑人员信息
	* @param map
	* @return  参数说明 
	* @throws 
	*/
	@Override
	public boolean updateUserInfo(Map<String, Object> map) {
		
		String user_id=map.get("user_id")==null?"":map.get("user_id").toString();
		UserInfo userInfo=(UserInfo) baseDao.getEntity(UserInfo.class,user_id);
		
		userInfo.setLoginuser(map.get("loginuser")==null?"":map.get("loginuser").toString());
		userInfo.setPassword(map.get("password")==null?"":map.get("password").toString());
		userInfo.setName(map.get("name")==null?"":map.get("name").toString());
		userInfo.setSex(map.get("sex")==null?"":map.get("sex").toString());
		userInfo.setOrgNo(map.get("org_no")==null?"":map.get("org_no").toString());
		userInfo.setMobile(map.get("mobile")==null?"":map.get("mobile").toString());
		userInfo.setAddress(map.get("address")==null?"":map.get("address").toString());
		userInfo.setEmail(map.get("email")==null?"":map.get("email").toString());
		userInfo.setPost(map.get("user_post")==null?"":map.get("user_post").toString());
		userInfo.setIsSpecial(map.get("user_level")==null?"":map.get("user_level").toString());
		baseDao.update(userInfo);
		
		return true;
	}

	/**
	 * 
	* @Title: deleteUserInfo 
	* @Description: 删除人员信息
	* @param user_id
	* @return  参数说明 
	* @throws
	 */
	@Override
	public boolean deleteUserInfo(String user_id) {
		
		UserInfo userInfo= (UserInfo) baseDao.getEntity(UserInfo.class, user_id);
		userInfo.setIsDelete("1");
		baseDao.update(userInfo);
		
		return true;
	}

	
	/** 
	* @Title: getUserNoList 
	* @Description:用户编码
	* @param paramMap
	* @return  参数说明 
	* @throws 
	*/
	@Override
	public List<Map<String, Object>> getUserNoList(Map<String, Object> map) {
		
		StringBuilder builder = new StringBuilder();
		List<Object> list = new ArrayList<Object>();
		builder.append(" select max(cast(sui.user_no as int)) as user_no");
		builder.append(" from sys_user_info sui");
		builder.append(" where 1=1 ");
		builder.append(" and sui.loginuser != 'admin'");
		
		Object obj = null;
		if (!ToolsUtil.isEmpty(obj = map.get("user_no"))) {
			builder.append(" and sui.user_no = ? ");
			list.add(obj.toString());
		}

		List<Map<String, Object>> userNoList = baseDao.getJdbcTemplateDAO().queryForList(builder.toString(),
				list.toArray());

		return userNoList;
	}
	
	
	/**
	 * 员工账号唯一性验证
	 * @Title:checkLoginuser
	 * @param map
	 * @return  参数说明 
	 * @throws 
	 */
	 public boolean	checkLoginuser(Map<String,Object> map){
		 
		 boolean flag = false;
		 //员工账号
		 String loginuser = map.get("loginuser")==null?"":map.get("loginuser").toString();
		 
		 //sql
		 StringBuffer hql = new StringBuffer();
		 hql.append(" from UserInfo u where 1=1");
		 List<Object> ls = new ArrayList<>();
		 //sql条件
		 if(!ToolsUtil.isEmpty(loginuser)){
			 hql.append(" and u.loginuser = ? ");
			 ls.add(loginuser);
		 }
		 //调用并处理返回
		 List<UserInfo> userList = baseDao.queryByHQL(hql.toString(),ls.toArray());
		 if(!ToolsUtil.isEmpty(userList)){
			 
			 flag = true;
		 }
		 
		 return flag;
	 }



}
