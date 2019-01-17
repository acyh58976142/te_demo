package com.hr.td.service.impl.systemManage;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hr.td.dao.IBaseDao;
import com.hr.td.entity.SysOrgInfo;
import com.hr.td.service.systemManage.IUnitManageService;
import com.hr.td.util.Page;
import com.hr.td.util.ToolsUtil;
import com.nari.slsd.hd.util.CommonTool;

/**
 * 
 * @author 
 *
 */
@Service
public class UnitManageServiceImpl implements IUnitManageService{
	
	@Autowired
	private IBaseDao baseDao;
	
	/**
	 * 查询单位管理(分页)
	 * @param map
	 * @param total
	 * @return
	 */
	@Override
	public Page queryUnitManagePage(Map<String, Object> map, int total) {
		
		int pageSize = CommonTool.ConvertToInt(ToolsUtil.isEmpty(map.get("pageSize"))?"0":map.get("pageSize").toString());
		int startIndex =CommonTool.ConvertToInt(ToolsUtil.isEmpty(map.get("startIndex"))?"0":map.get("startIndex").toString());
		
	    Map<String,Object> queryMap = getUnitManage(map);
		String sql = queryMap.get("sql").toString();
		Object[] parameters = (Object[]) queryMap.get("map");
		return baseDao.getPageBySql(total, sql, pageSize, startIndex, parameters);
		
	}
	
	/**
	 * 查询单位管理数量
	 * @param map
	 * @return
	 */
	@Override
	public int queryUnitManageCount(Map<String, Object> map) {
		
		Map<String,Object> queryMap = getUnitManage(map);
		String sql = queryMap.get("sql").toString();
		Object[] parameters = (Object[])queryMap.get("map");
		int count= baseDao.getCountBySql(sql, parameters);
		return count;
	}
	
	
	@SuppressWarnings("unused")
	private Map<String,Object> getUnitManage(Map<String,Object> map){
		
		Map<String, Object> paramer = new HashMap<String, Object>();
		String unitName =  map.get("unitName")==null?"":map.get("unitName").toString();//单位管理
		String country =  map.get("country")==null?"":map.get("country").toString();//流经乡镇
		
		StringBuilder sql= new StringBuilder();
		List<Object> list = new ArrayList<Object>();
		sql.append(" SELECT a.*,b.org_name as name,s.ANAME from sys_org_info a ");
		sql.append(" LEFT JOIN sys_org_info b on a.parent_no=b.org_no ");
		sql.append(" LEFT JOIN sys_area_code s on s.ACODE = a.area_code");
		sql.append(" where 1=1");
		
		if (!ToolsUtil.isEmpty(unitName)){
			//管理单位名称
			sql.append(" and a.org_name like ? ");
			list.add("%" + unitName + "%");
		}
		if (!ToolsUtil.isEmpty(country)){
			int ObjLength = country.toString().length();
			if(ObjLength>6){//镇
				sql.append(" and a.area_code = ? ");
				list.add(country.toString());
			}else{//县
				sql.append(" and a.area_code like ? ");
				list.add("%" + country.toString() + "%");
			}
		}
		
		sql.append(" order by a.org_no");
		paramer.put("sql", sql.toString());
		paramer.put("map", list.toArray());
		return paramer;
	}
	
	
	/**
	 * 新增单位管理信息
	 * @param SysOrgInfo
	 * @return
	 */
	public boolean AddUnitManage(SysOrgInfo sysOrgInfo){
		
		baseDao.save(sysOrgInfo);
		return true;
	}
	
	/**
	 * 根据条件查询单位管理信息
	 * @param id
	 * @return
	 */
	public SysOrgInfo getEntity(String id){
		
		SysOrgInfo orgInfo = (SysOrgInfo) baseDao.getEntity(SysOrgInfo.class, id);
		return orgInfo;
	}
	
	
	/**
	 * 修改单位管理信息
	 * @param SysOrgInfo
	 * @true
	 */
	public boolean UpdateUnitManage(SysOrgInfo sysOrgInfo){
		
		baseDao.update(sysOrgInfo);
		return true;
	}
	
	/**
	 * 根据单位Id查询该单位下是否有人员 SQL
	 */
	private Map<String,Object> getUserOn (Map<String,Object> map){
		
		Map<String, Object> param=new HashMap<String, Object>();
		String orgOn = map.get("Id")==null?"":map.get("Id").toString();
		try 
		 {
			StringBuilder sql= new StringBuilder();
			List<Object> list = new ArrayList<Object>();
			sql.append(" SELECT u.user_no from sys_org_info s");
			sql.append(" LEFT JOIN sys_user_info u on s.org_no = u.org_no");
			sql.append(" where 1=1");
			if (!ToolsUtil.isEmpty(orgOn)){
				//管理单位编码主键
				sql.append(" and s.org_no = ? ");
				list.add(orgOn.toString());
			}
			param.put("sql", sql);
			param.put("list", list.toArray());
		 } catch (Exception e) {
				e.printStackTrace();
			}	
		return param;
	}
	
	/**
	 * 根据单位Id查询该单位下是否有人员
	 */
	public List<Map<String,Object>> queryisUserOn (Map<String,Object> map){
		
		Map<String, Object> param= getUserOn(map);
		String sql=param.get("sql").toString();
		Object[] obj=(Object[]) param.get("list");
		List<Map<String, Object>> getUseron = baseDao.getJdbcTemplateDAO().queryForList(sql, obj);
		return getUseron;
	}
	
	
	
	/**
	 * 删除单位管理信息
	 * @param SysOrgInfo
	 * @return
	 */
	public boolean  deleteUnitManage(SysOrgInfo sysOrgInfo){
		
		 baseDao.delete(sysOrgInfo);
		 return true;
	}
	
	/**
	 * 检查单位名称是否冲突
	 * 
	 * @param name
	 * @return
	 */
	 public boolean checkUnitName(Map<String,Object> map){
		boolean success = false;
		//取值
		String unitName =  map.get("name")==null?"":map.get("name").toString();//单位名称
		
		StringBuffer sb =new StringBuffer();
		sb.append(" from SysOrgInfo s where 1=1 ");
		List<Object> ls = new ArrayList<Object>();
		if (!ToolsUtil.isEmpty(unitName)){
			//管理单位名称
			sb.append(" and s.org_name = ? ");
			ls.add(unitName);
		}
		
		ls.toArray();
		List<SysOrgInfo> list = baseDao.queryByHQL(sb.toString(),ls.toArray());
		if(!ToolsUtil.isEmpty(list)){
			success = true;
		}
		return success; 
	 }
}
