package com.hr.td.service.impl.tower;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hr.td.dao.IBaseDao;
import com.hr.td.entity.Attachment;
import com.hr.td.entity.MainInfo;
import com.hr.td.entity.RouteInfo;
import com.hr.td.entity.RouteInfoNew;
import com.hr.td.entity.Tower;
import com.hr.td.service.tower.ITowerService;
import com.hr.td.util.Page;
import com.hr.td.util.StageStateEnum;
import com.hr.td.util.ToolsUtil;
import com.nari.slsd.hd.param.Param;
import com.nari.slsd.hd.util.CommonTool;


@Service
public class TowerServiceImpl implements ITowerService {

	@Autowired
	private IBaseDao baseDao;

	/**
	 * 根据主键获取工程实体
	 */
	public MainInfo getMainInfo(String id) {
		MainInfo main =(MainInfo) baseDao.getEntity(MainInfo.class, id);
	
		return main;
	}
	
	/**
	 * 根据工程ID查询附件
	 * 
	 * @param id工程ID
	 * @return attachment
	 */
	public List<Attachment> getAttachment(String id) {
			
		StringBuffer sb =new StringBuffer();
		sb.append("from Attachment where projectId=? and attachmentType=1 order by sortNo ");
		List<Object> ls = new ArrayList<Object>();
		ls.add(id);
		ls.toArray();
		List<Attachment> list = baseDao.queryByHQL(sb.toString(),ls.toArray());
			
		return list;
	}
	

	/**
	 * 根据工程ID查询Route附件
	 * 
	 * @param id工程ID
	 * @return attachment
	 */
	public Attachment getRouteAttachment(String id) {
			
		StringBuffer sb =new StringBuffer();
		sb.append("from Attachment where projectId=? and attachmentType=2 ");
		List<Object> ls = new ArrayList<Object>();
		ls.add(id);
		ls.toArray();
		List<Attachment> list = baseDao.queryByHQL(sb.toString(),ls.toArray());
		if(!ToolsUtil.isEmpty(list))
		{
			return list.get(0);
		}
		return null;	
	
	}
	/**
	 * 根据主键获取杆塔实体
	 */
	public Tower getTower(String id) {
		Tower tower =(Tower) baseDao.getEntity(Tower.class, id);
	
		return tower;
	}
	
	
	/**
	 * 根据阶段id获取阶段状态
	 */
	public String getState(String id,String stageId) {
		String state = new String();
		int stateInt = 0;
		if(stageId.equals("1")){
			Tower tower =(Tower) baseDao.getEntity(Tower.class, id);
			stateInt=tower.getState();
		}
		state = StageStateEnum.getName(stateInt);
		return state;
	}
	
	/**
	 * 获取工程信息，将列表展示需要的字段信息存进list
	 */
	public Page findMainInfoList(Map<String, Object> map,int totalCount) {
		int pageSize = CommonTool.ConvertToInt(ToolsUtil.isEmpty(map.get("pageSize"))?0:map.get("pageSize"));
		int startIndex =CommonTool.ConvertToInt(ToolsUtil.isEmpty(map.get("startIndex"))?0:map.get("startIndex"));
		StringBuilder hql = new StringBuilder();
		List<Object> paramList = new ArrayList<Object>();
		hql.append(" select id, projectName,projectCode,designUnit,designDate,stageId,towerId from mainInfo order by designDate desc ");	
		
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
	 * 保存工程表，附件信息表到数据库
	 */
	public boolean addMain(MainInfo main,Tower tower,List<Attachment> attachments,RouteInfo route) {
		//保存项目
		baseDao.save(main);
		//保存杆塔表
		baseDao.saveOrUpdate(tower);
		//保存附件
		if(!ToolsUtil.isEmpty(attachments))
		{
			baseDao.batchExcute(attachments, Param.OpType.OP_INSERT);
		}
		//保存route表
		if(!ToolsUtil.isEmpty(route.getId()))
		{
			baseDao.saveOrUpdate(route);
		}
		
		return true;
	}
	
	/**
	 * 保存工程表，附件信息表到数据库
	 */
	public boolean addMainNew(MainInfo main,List<Attachment> attachments,RouteInfoNew route) {
		//保存项目
		baseDao.save(main);
		//保存附件
		if(!ToolsUtil.isEmpty(attachments))
		{
			baseDao.batchExcute(attachments, Param.OpType.OP_INSERT);
		}
		//保存route表
		if(!ToolsUtil.isEmpty(route.getId()))
		{
			baseDao.saveOrUpdate(route);
		}
		
		return true;
	}
	
	
	/**
	 * 保存工程表，附件信息表到数据库
	 */
	public boolean editMain(MainInfo main,Tower tower,List<Attachment> attachments) {
		//保存项目
		baseDao.saveOrUpdate(main);
		//保存杆塔表
		baseDao.saveOrUpdate(tower);
		//保存附件
		if(!ToolsUtil.isEmpty(attachments))
		{
			baseDao.batchExcute(attachments, Param.OpType.OP_INSERTORUPDATE);
		}
		return true;
	}
	
	/**
	 * 保存杆塔表更新工程表到数据库
	 */
	public boolean saveTower(Tower tower,Attachment attach) {
		//保存杆塔表
		baseDao.saveOrUpdate(tower);
		//保存附件
		if(!ToolsUtil.isEmpty(attach.getId()))
		{
			baseDao.save(attach);
		}
		return true;
	}
	
	/**
	 * 保存route文件信息表到数据库
	 */
	public boolean saveRouteInfo(RouteInfo route) {
		//保存route文件信息表
		baseDao.saveOrUpdate(route);
		
		return true;
	}
	
	/**
	 * 根据工程ID查询Route文件信息表
	 * 
	 * @param id工程ID
	 * @return RouteInfo
	 */
	public RouteInfo getRouteInfo(String id) {
			
		StringBuffer sb =new StringBuffer();
		sb.append("from RouteInfo where projectId=? ");
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
	 * 校对杆塔表更新工程表到数据库
	 */
	public boolean checkTower(Tower tower,Attachment attach) {
		//更新杆塔表
		baseDao.saveOrUpdate(tower);
		//保存附件
		if(!ToolsUtil.isEmpty(attach.getId()))
		{
			baseDao.save(attach);
		}
		return true;
	}
	
	@Override
	public boolean deleteMainInfo(String id) {
		MainInfo main =(MainInfo) baseDao.getEntity(MainInfo.class, id);

	    Tower tower = getTower(main.getTowerId());
		List<Attachment> attachments= getAttachment(id);
		if(!ToolsUtil.isEmpty(attachments))
		{
			baseDao.batchExcute(attachments, Param.OpType.OP_DELETE);
		}
		if(!ToolsUtil.isEmpty(tower))
		{
		 List<Attachment> towerAttachs= getAttachment(main.getTowerId());
		 if(!ToolsUtil.isEmpty(towerAttachs))
			{
				baseDao.batchExcute(towerAttachs, Param.OpType.OP_DELETE);
			}
		baseDao.delete(tower);
		}
		
		baseDao.delete(main);
		return false;
	}
	
}
