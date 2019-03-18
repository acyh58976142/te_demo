package com.hr.td.service.tower;


import java.util.List;
import java.util.Map;

import com.hr.td.entity.Attachment;
import com.hr.td.entity.MainInfo;
import com.hr.td.entity.RouteInfo;
import com.hr.td.entity.RouteInfoNew;
import com.hr.td.entity.Tower;
import com.hr.td.util.Page;


public interface ITowerService{

	//根据主键获取实体
	public MainInfo getMainInfo(String id);
	//根据主键获取杆塔实体
	public Tower getTower(String id);
	//根据阶段id获取阶段状态
	public String getState(String id,String stageId);
	//根据工程ID查询附件
	public List<Attachment> getAttachment(String id);
	//根据工程ID查询Route文件信息表
	public RouteInfo getRouteInfo(String id);
	
	public Attachment getRouteAttachment(String id);
	/**
 	* 根据map里的条件查询工程信息，将列表展示需要的字段信息存进Page
 	* @param map
 	* @param totalCount查询记录总数
 	* @return Page 分页信息
 	*/
	public Page findMainInfoList(Map<String, Object> map,int totalCount);
	
	/**
	 * 根据map里的查询条件查询总数量
	 * @param paramMap
	 * @return int  记录总数量
	 */
	public int findMainInfoListCount(Map<String, Object> paramMap);

	 // 保存route文件信息表到数据库
	public boolean saveRouteInfo(RouteInfo route);
	 //保存杆塔表更新工程表到数据库
	public boolean saveTower(Tower tower,Attachment attach);	
	//校对杆塔表
	public boolean checkTower(Tower tower,Attachment attach);	
	 //保存工程表，附件信息表到数据库
	public boolean addMain(MainInfo main,Tower tower,List<Attachment> attachments,RouteInfo route);	
	
	public boolean editMain(MainInfo main,Tower tower,List<Attachment> attachments);
	//删除工程信息
	public boolean deleteMainInfo(String id);
	
	public boolean addMainNew(MainInfo main,List<Attachment> attachments,RouteInfoNew route);
		 
}

