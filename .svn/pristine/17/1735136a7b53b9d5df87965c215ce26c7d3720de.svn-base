package com.hr.td.service.impl.systemManage;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hr.td.dao.IBaseDao;
import com.hr.td.entity.PrivilegeInfo;
import com.hr.td.entity.RolePrivilegeRef;
import com.hr.td.service.systemManage.IMenuManageService;
import com.hr.td.util.Page;
import com.hr.td.util.ToolsUtil;
import com.nari.slsd.hd.util.CommonTool;
/**
 * 菜单管理
 * @author  
 *
 */
@Service
public class MenuManageServiceImpl implements IMenuManageService {
	@Autowired
	private IBaseDao baseDao;

	/**
	 * 查询菜单管理(分页)
	 * 
	 * @param map
	 * @return
	 */
	public Page queryMenuManagePage(Map<String, Object> map, int total) {
		int pageSize = CommonTool.ConvertToInt(ToolsUtil.isEmpty(map.get("pageSize")) ? "0" : map.get("pageSize").toString());
		int startIndex = CommonTool.ConvertToInt(ToolsUtil.isEmpty(map.get("startIndex")) ? "0" : map.get("startIndex").toString());
		Map<String, Object> queryMap = getQuerySQL(map);
		String sql = queryMap.get("sql").toString();
		Object[] parameters = (Object[]) queryMap.get("map");
		return baseDao.getPageBySql(total, sql, pageSize, startIndex, parameters);
	}

	/**
	 * 查询菜单管理总数
	 */
	public int queryMenuManageCount(Map<String, Object> map) {
		Map<String, Object> queryMap = getQuerySQL(map);
		String sql = queryMap.get("sql").toString();
		Object[] parameters = (Object[]) queryMap.get("map");
		int count = baseDao.getCountBySql(sql, parameters);
		return count;
	}

	/**
	 * @param map
	 * @return
	 */
	private Map<String, Object> getQuerySQL(Map<String, Object> map) {
		Map<String, Object> paramer = new HashMap<String, Object>();
		StringBuilder sql = new StringBuilder();
		List<Object> list = new ArrayList<Object>();
		String name = map.get("name")==null?"":map.get("name").toString();
		String menuType = map.get("menuType")==null?"":map.get("menuType").toString();
		sql.append(" select spi.func_id,spi.name,spi.func_type,spi.url,spi.parent_func,spi.func_code, ");
		sql.append(" spi.func_level,spi.sort_no,spi.func_icon,spis.name as SuperiorName,spi.isPhone ");
		sql.append(" from sys_privilege_info spi ");
		sql.append(" left join sys_privilege_info spis on spi.parent_func=spis.func_id where 1=1 ");
		if(!ToolsUtil.isEmpty(name)) {
			sql.append(" and spi.name like ? ");
			list.add("%" + name + "%");
		}
		if(!ToolsUtil.isEmpty(menuType)) {
			sql.append(" and spi.isPhone = ? ");
			list.add(menuType);
		}
		sql.append(" ORDER BY spi.sort_no DESC ");
		paramer.put("sql", sql.toString());
		paramer.put("map", list.toArray());
		return paramer;
	}
	
	
	/**
	 * 查询上级菜单
	 * func_type:1文件夹 /2RUL
	 */
	@Override
	public List<Map<String, Object>> QuerySuperiorMenu(){
		StringBuilder sql = new StringBuilder();
		sql.append(" select func_id,name from sys_privilege_info where func_type = 1 "); /*parent_func  is null */
		return baseDao.getJdbcTemplateDAO().queryForList(sql.toString(), new Object[]{});
	}
	
	/**
	 * 添加
	 */
	@Override
	public int savemenuManageInfo(Map<String, Object> map) {
		PrivilegeInfo entity = new PrivilegeInfo();
		entity.setFunc_id(CommonTool.createUUID());//菜单信息表ID
		entity.setName(map.get("name")==null?"":map.get("name").toString());//菜单名称
		entity.setFunc_type(map.get("func_type")==null?"":map.get("func_type").toString());//级数0:按钮 1：1级 2：2级 3：3级
		entity.setUrl(map.get("url")==null?"":map.get("url").toString());//URL地址
		entity.setParent_func(map.get("parent_func")==null?"":map.get("parent_func").toString());//上级功能
		entity.setFunc_code(map.get("func_code")==null?"":map.get("func_code").toString());//功能代码
		entity.setFunc_level(map.get("func_level")==null?"":map.get("func_level").toString());//级别
		entity.setIsPhone(map.get("isPhone")==null?"":map.get("isPhone").toString());//是否是手机端（1：web 2:手机）
		entity.setLocationType("2");//是否是首页（1：顶部，2：菜单 ，3：首页）
		List<Map<String, Object>> list = QuerySort_no();
		StringBuffer sb = new StringBuffer();
		for(Map<String, Object> m : list) {
			sb.append(m.get("sort_no").toString());
		}
		int sortno = Integer.parseInt(sb.toString())+1;
		entity.setSort_no(Integer.toString(sortno));//排序
		entity.setFunc_icon(map.get("func_icon")==null?"":map.get("func_icon").toString());//图标
		Serializable SeriaRCI =baseDao.save(entity);
		if(SeriaRCI!=null) {
			return 1;//成功
		}else {
			return 0;//失败
		}
	}
	/**
	 * 查询最新的编号
	 * @param id
	 * @return
	 */
	public List<Map<String, Object>> QuerySort_no(){
		StringBuilder sql = new StringBuilder();
		sql.append(" select sort_no from sys_privilege_info ORDER BY sort_no DESC LIMIT 0 ,1");
		return baseDao.getJdbcTemplateDAO().queryForList(sql.toString(), new Object[]{});
	}
	
	
	/**
	 * 修改查询根据ID查询实体
	 * @param id
	 * @return
	 */
	@Override
	 public PrivilegeInfo queryPrivilegeInfo(String func_id){
		 PrivilegeInfo entity = (PrivilegeInfo) baseDao.getEntity(PrivilegeInfo.class, func_id);
    	 return entity;
     }
	
	/**
	 * 修改
	 */
	@Override
	public int updatemenuManageInfo(Map<String, Object> map) {
		PrivilegeInfo entity = new PrivilegeInfo();
		int ret=0;
		try {
			entity.setFunc_id(map.get("func_id_code")==null?"":map.get("func_id_code").toString());//菜单信息表ID
			entity.setName(map.get("name")==null?"":map.get("name").toString());//菜单名称
			entity.setFunc_type(map.get("func_type")==null?"":map.get("func_type").toString());//级数0:按钮 1：1级 2：2级 3：3级
			entity.setUrl(map.get("url")==null?"":map.get("url").toString());//URL地址
			entity.setParent_func(map.get("parent_func")==null?"":map.get("parent_func").toString());//上级功能
			entity.setFunc_code(map.get("func_code")==null?"":map.get("func_code").toString());//功能代码
			entity.setFunc_level(map.get("func_level")==null?"":map.get("func_level").toString());//级别
			entity.setSort_no(map.get("sort_no")==null?"":map.get("sort_no").toString());//排序
			entity.setFunc_icon(map.get("func_icon")==null?"":map.get("func_icon").toString());//图标
			entity.setIsPhone(map.get("isPhone")==null?"":map.get("isPhone").toString());//1web：2app
			baseDao.update(entity);
			ret=1;
		} catch (Exception e) {
			e.printStackTrace();
			ret=0;
		}
		
		return ret;//成功
	}
	
	/**
	 * 删除数据
	 */
	@Override
	public int deleteMenuEntity(String func_id) {
		int ret = 0;
		try {
			PrivilegeInfo entity = new PrivilegeInfo();
			entity.setFunc_id(func_id);
			baseDao.delete(entity);
			ret=1;
		} catch (Exception e) {
			ret=0;
			e.printStackTrace();
		}
		return ret;
	}
	/**
	 * 查询权限关联关系
	 */
	@Override
	public int QueryInnerMenu(String func_id) {
		Map<String, Object> paramer = new HashMap<String, Object>();
		StringBuilder sql = new StringBuilder();
		List<Object> list = new ArrayList<Object>();
		sql.append(" select COUNR(*) from sys_role_privilege_ref where 1=1 ");
		sql.append(" and privilege_id = ? ");
		list.add(func_id);
		paramer.put("sql", sql.toString());
		paramer.put("map", list.toArray());
		Map<String, Object> queryMap = paramer;
		String sqls = queryMap.get("sql").toString();
		Object[] parameters = (Object[]) queryMap.get("map");
		int count = baseDao.getCountBySql(sqls, parameters);
		return count;
		
	}
	
	
	
	/**
	 * 查询所有角色
	 */
	public List<Map<String, Object>> QuerySysRoleInfo(){
		StringBuilder sql = new StringBuilder();
		sql.append(" select role_id as id,role_name as name,0 as pId from sys_role_info ");
		return baseDao.getJdbcTemplateDAO().queryForList(sql.toString(), new Object[]{});
	}
	
	/**
	 * 添加保存角色权限关联
	 */
	@Override
	public int saveSysRloePrivilegeRef(String func_id,String role_id)  {
		RolePrivilegeRef entity = new RolePrivilegeRef();
		entity.setRef_id(CommonTool.createUUID());//角色权限关联表ID
		entity.setRole_id(role_id);// 角色ID
		entity.setPrivilege_id(func_id);;// 权限ID
		Serializable SeriaRCI =baseDao.save(entity);
		if(SeriaRCI!=null) {
			return 1;//成功
		}else {
			return 0;//失败
		}
	}
	
	/**
	 * 添加权限关联关系查询
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String, Object>> QuerySysRoleInfoSave(String func_id){
		Map<String, Object> paramer = new HashMap<String, Object>();
		StringBuilder sql = new StringBuilder();
		List<Object> list = new ArrayList<Object>();
		sql.append(" select * from sys_role_privilege_ref where 1=1 ");
		sql.append(" and privilege_id = ? ");
		list.add(func_id);
		paramer.put("map", list);
	    Object[] parameters = {list.get(0)};
		List<Map<String, Object>> listsa = baseDao.queryBySQL(sql.toString(), parameters);
		return listsa;
	}
	
	/**
	 * 根据 菜单加载 角色信息
	 * @param UserId
	 * @return
	 */
	public List<Map<String, Object>> loadMenuByFuncId(String funcId){
		String roleSql = " select role_id as id,role_name as name,0 as pId from sys_role_info ";
		List<Map<String, Object>> rolelist =  baseDao.getJdbcTemplateDAO().queryForList(roleSql);
		
		String menuRoleSql ="SELECT role_id,privilege_id  from sys_role_privilege_ref "
				+ " WHERE privilege_id = ? ";
		
		List<Map<String, Object>> menuRolelist = baseDao.getJdbcTemplateDAO().queryForList(menuRoleSql,funcId);
		return assemblyRole(rolelist,menuRolelist);
	}
	
	private List<Map<String, Object>> assemblyRole(List<Map<String, Object>> rolelist,List<Map<String, Object>> menuRolelist) {
		for (Map<String, Object> m : rolelist) {
			for (Map<String, Object> u : menuRolelist) {
				if(m.get("id").equals(u.get("role_id"))){
					m.put("checked", true);
				}
			}
			m.put("icon", "../../assets/img/people.gif");
			
		}
		return rolelist;
		
	}
	
	/**
	 * 保存 角色 信息
	 */
	public boolean saveRoleMenu(String funcId, String roleIds){
		String roleSql = "select  ref_id,role_id ,privilege_id from sys_role_privilege_ref where privilege_id = '"+ funcId +"'"
				+ " and role_id = ?";
		
		String saveSQL = "INSERT INTO sys_role_privilege_ref(ref_id,role_id,privilege_id) VALUES (?,?,?)";
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
						listParam.add(funcId);
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
		String deleteSQL = "delete from sys_role_privilege_ref where privilege_id = '"+ funcId +"'";

		if(!ToolsUtil.isEmpty(saveIds)){
			deleteSQL+= " and role_id not in";
			deleteSQL +=  "("+ saveIds +")";
		}
		baseDao.executeBySQL(deleteSQL, new Object[]{});
		return true;
		
	}
	
}
