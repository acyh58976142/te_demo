package com.hr.td.service.impl.tower;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hr.td.dao.IBaseDao;
import com.hr.td.entity.MainInfo;
import com.hr.td.entity.Parts;
import com.hr.td.entity.RouteInfo;
import com.hr.td.entity.RouteInfoNew;
import com.hr.td.entity.VibrationDamper;
import com.hr.td.entity.WireConfiguration;
import com.hr.td.service.tower.IPartsService;
import com.hr.td.util.Page;
import com.hr.td.util.ToolsUtil;
import com.nari.slsd.hd.param.Param;
import com.nari.slsd.hd.util.CommonTool;


@Service
public class PartsServiceImpl implements IPartsService {

	@Autowired
	private IBaseDao baseDao;

	/**
	 * 根据主键获取杆塔实体
	 */
	public WireConfiguration getWireConfig(String id) {
		WireConfiguration tower =(WireConfiguration) baseDao.getEntity(WireConfiguration.class, id);
	
		return tower;
	}
	
	/**
	 * 根据工程ID查询Route
	 * 
	 * @param id工程ID
	 * @return attachment
	 */
	public RouteInfo getRouteById(String id) {
			
		StringBuffer sb =new StringBuffer();
		sb.append(" from RouteInfo where projectId=? ");
		List<Object> ls = new ArrayList<Object>();
		ls.add(id);
		ls.toArray();
		List<RouteInfo> list = baseDao.queryByHQL(sb.toString(),ls.toArray());
		if(!ToolsUtil.isEmpty(list))
		{
			return list.get(0);
		}
		return null;	
	
	}
	
	/**
	 * 根据工程ID查询Route
	 * 
	 * @param id工程ID
	 * @return attachment
	 */
	public RouteInfoNew getRouteNewById(String id) {
			
		StringBuffer sb =new StringBuffer();
		sb.append(" from RouteInfoNew where projectId=? ");
		List<Object> ls = new ArrayList<Object>();
		ls.add(id);
		ls.toArray();
		List<RouteInfoNew> list = baseDao.queryByHQL(sb.toString(),ls.toArray());
		if(!ToolsUtil.isEmpty(list))
		{
			return list.get(0);
		}
		return null;	
	
	}
	
	public Page findMainInfoList(Map<String, Object> map,int totalCount) {
		int pageSize = CommonTool.ConvertToInt(ToolsUtil.isEmpty(map.get("pageSize"))?0:map.get("pageSize"));
		int startIndex =CommonTool.ConvertToInt(ToolsUtil.isEmpty(map.get("startIndex"))?0:map.get("startIndex"));
		StringBuilder hql = new StringBuilder();
		List<Object> paramList = new ArrayList<Object>();
		hql.append(" select id, projectName,projectCode,designUnit,designDate,wireConfigId from mainInfo order by designDate desc ");	
		
		return baseDao.getPageBySql(totalCount, hql.toString(),pageSize,startIndex, paramList.toArray());

	}
	
	/**
	 * 查询总数量
	 * @param paramMap
	 * @return int
	 */
	@Override
	public int findMainInfoListCount(Map<String, Object> paramMap){
		int totalCount=0;
		StringBuilder sql = new StringBuilder();
		List<Object> paramList = new ArrayList<Object>();
		sql.append("select id from mainInfo as M where 1=1 order by M.designDate desc ");
		
		List<Map<String, Object>> list = baseDao.getJdbcTemplateDAO().queryForList(sql.toString(), paramList.toArray());

		totalCount=list.size();
		return totalCount;
	};
	

	/**
	 * 保存配置表到数据库为工程表加关联字段
	 */
	public boolean  saveStingConfig(MainInfo main,WireConfiguration wireConfig){	
		//工程表加关联字段
		baseDao.saveOrUpdate(main);
		//保存配置表
		if(!ToolsUtil.isEmpty(wireConfig))
		{
			baseDao.saveOrUpdate(wireConfig);
		}
		return true;
	}
	
	/**
	 * 保存配置表到数据库
	 */
	public boolean  saveDefaultConfig(WireConfiguration wireConfig){	
	
		//保存配置表
		if(!ToolsUtil.isEmpty(wireConfig))
		{
			baseDao.saveOrUpdate(wireConfig);
		}
		return true;
	}
	
	/**
	 * 根据工程ID查询防震锤配置
	 * 
	 * @param id工程ID
	 * @return VibrationDamper
	 */
	public List<VibrationDamper> getVibrationDamperList(String id) {
			
		StringBuffer sb =new StringBuffer();
		sb.append("from VibrationDamper where projectId=? ");
		List<Object> ls = new ArrayList<Object>();
		ls.add(id);
		ls.toArray();
		List<VibrationDamper> list = baseDao.queryByHQL(sb.toString(),ls.toArray());
			
		return list;
	}
	
	/**
	 * 查询防震锤配置
	 * 
	 * @param 
	 * @return VibrationDamper
	 */
	public List<VibrationDamper> getVibrationDamperList() {
			
		StringBuffer sb =new StringBuffer();
		sb.append("from VibrationDamper where 1=1 ");
		List<Object> ls = new ArrayList<Object>();
		ls.toArray();
		List<VibrationDamper> list = baseDao.queryByHQL(sb.toString(),ls.toArray());
			
		return list;
	}
	/**
	 * 保存防震锤配置表到数据库
	 */
	public boolean saveVibrationDamper(List<VibrationDamper> damperList,String id) {
		
		List<VibrationDamper> vibrationDampers= getVibrationDamperList(id);
		if(!ToolsUtil.isEmpty(vibrationDampers))
		{
			baseDao.batchExcute(vibrationDampers, Param.OpType.OP_DELETE);
		}
		
		//保存防震锤配置表
		if(!ToolsUtil.isEmpty(damperList))
		{
			baseDao.batchExcute(damperList, Param.OpType.OP_INSERT);
		}
	
		return true;
	}
	
	/**
	 * 根据档距和直径查询防震锤数量
	 * @param span 档距 diameter 直径  type 0:地线 其余导线
	 * @return damperCount 防震锤数量
	 */
	public int getDamperCount(Double span,Double diameter,int type,String projectId){
		int damperCount=0;
		StringBuilder sql = new StringBuilder();
		List<Object> paramList = new ArrayList<Object>();
		sql.append("select count from vibrationDamper where minSpan < ? and maxSpan >= ? ");
		paramList.add(span);
		paramList.add(span);
		if(type==0){
		sql.append(" and vibrationType = 0 and projectId = ? ");	
		paramList.add(projectId);
		}else{
		sql.append(" and vibrationType != 0 and minDiameter < ? and maxDiameter >= ? ");
		paramList.add(diameter);
		paramList.add(diameter);
		}
		List<Map<String, Object>> list = baseDao.getJdbcTemplateDAO().queryForList(sql.toString(), paramList.toArray());
		if(!ToolsUtil.isEmpty(list))
		{
			damperCount = (int) list.get(0).get("count");
		}
		return damperCount;
	};
		
	/**
	 * 保存组配件明细表到数据库
	 */
	public boolean  saveParts(Parts parts){	
	
		//保存组配件明细表
		if(!ToolsUtil.isEmpty(parts))
		{
			baseDao.saveOrUpdate(parts);
		}
		return true;
	}
	
	/**
	 * 根据工程ID查询组配件信息表
	 * 
	 * @param id工程ID
	 * @return Parts
	 */
	public Parts getPartsById(String id) {
			
		StringBuffer sb =new StringBuffer();
		sb.append("from Parts where projectId=? ");
		List<Object> ls = new ArrayList<Object>();
		ls.add(id);
		ls.toArray();
		List<Parts> list = baseDao.queryByHQL(sb.toString(),ls.toArray());
		if(!ToolsUtil.isEmpty(list))
		{
			return list.get(0);
		}
		return null;	
	
	}
}
