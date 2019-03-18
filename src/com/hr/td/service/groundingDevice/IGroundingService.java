package com.hr.td.service.groundingDevice;

import java.util.List;
import java.util.Map;

import com.hr.td.entity.Attachment;
import com.hr.td.entity.GroundingConfig;
import com.hr.td.entity.GroundingDevice;
import com.hr.td.util.Page;

public interface IGroundingService {
	
	/**
	 * 批量插入数据到附件表
	 */
	public int addAllAttachment(List<Attachment> attachmentList);
		
	/**
	 * 批量插入接地配置信息
	 */
	public int addAllGroundingConfig(List<GroundingConfig> groundingConfigList);
	
	/**
	 * 在插入数据之前批量删除操作
	 */
	public int deleteAllGroundingConfigByPrijectId(String projectId);
	
	/**
	 * 在插入数据之前批量删除附件表操作(附件表里的projectId为接地配置表的主键id)
	 */
	public int deleteAllAttachmentByPrijectId(String projectId);
	
	/**
	 * 批量修改接地配置信息
	 */
	public int updateAllGroundingConfig(List<GroundingConfig> groundingConfigList);
	
	/**
	 * 通过projetId查询接地配置表有无该项目配置信息
	 */
	public List<GroundingConfig> findGroundingConfig(String projectId);
	
	/**
	 * 根据projetId和项目类型查询接地配置附件信息
	 */
	public List<Attachment> findAttachmentByProjectIdAndType(String projectId);
	
     /**
      * 初始化工程列表并分页
      */
	 //查询总记录数
	 public int findMainInfoListCount();
	 //根据map里的条件查询工程信息，将列表展示需要的字段信息存进Page
	 public Page findMainInfoList(Map<String, Object> map,int totalCount);
	 
	 /**
	 * 根据杆塔编号查询电阻率
	 * @param towerNum  杆塔编号
	 */
	 public String getResistivity(String towerNum);
	 /**
	 * 根据电阻率查询代号
	 * @param resistivity 电阻率
	 * @return no 代号
	 */
	public String getNoByResistivity(String resistivity,String projectId);
	//根据工程ID查询接地装置配置信息
	public List<GroundingConfig> getGroundingConfigList(String id);
	//根据工程ID查询接地装置表
	public GroundingDevice getGroundingById(String id);
	//保存接地装置信息表到数据库
	public boolean saveGrounding(GroundingDevice grounding);
}
