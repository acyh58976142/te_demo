package com.hr.td.service.tower;


import java.util.List;
import java.util.Map;

import com.hr.td.entity.MainInfo;
import com.hr.td.entity.Parts;
import com.hr.td.entity.RouteInfo;
import com.hr.td.entity.RouteInfoNew;
import com.hr.td.entity.VibrationDamper;
import com.hr.td.entity.WireConfiguration;
import com.hr.td.util.Page;


public interface IPartsService{

	
	//根据主键获取配置表实体
	public WireConfiguration getWireConfig(String id);
	//根据根据工程ID查询Route
	public RouteInfo getRouteById(String id);
	//根据根据工程ID查询RouteNew
	public RouteInfoNew getRouteNewById(String id);
	//根据工程ID查询防震锤配置
	public List<VibrationDamper> getVibrationDamperList(String id);
	//根据根据工程ID查询组配件
	public Parts getPartsById(String id);
	public List<VibrationDamper> getVibrationDamperList();
	
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
	/**
	 * 根据档距和直径查询防震锤数量
	 * @param span 档距 diameter 直径  type 0:地线 其余导线
	 * @return damperCount 防震锤数量
	 */
	public int getDamperCount(Double span,Double diameter,int type,String projectId);
	 //保存配置表到数据库为工程表加关联字段
	public boolean saveStingConfig(MainInfo main,WireConfiguration wireConfig);	
	//保存配置表到数据库
	public boolean  saveDefaultConfig(WireConfiguration wireConfig);
	//保存组配件明细表到数据库
	public boolean  saveParts(Parts parts);
	//保存防震锤配置表
	public boolean saveVibrationDamper(List<VibrationDamper> damperList,String id);
	 
}

