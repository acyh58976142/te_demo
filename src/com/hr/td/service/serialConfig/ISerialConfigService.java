package com.hr.td.service.serialConfig;

import java.util.List;

import com.hr.td.entity.SerialConfigInfo;

public interface ISerialConfigService {
       
	/**
	 * 批量保存或修改配置信息
	 */
	public int addAllConfigInfo(List<SerialConfigInfo> serialConfigInfo);
	
	/**
	 * 修改配置信息
	 */
	public int updateAllConfigInfo(List<SerialConfigInfo> serialConfigInfo);
	
	/**
	 * 根据projectId和类型
	 */
	public SerialConfigInfo findSerialConfigInfo(String projectId,int tableType);
	
	/**
	 * 根据projectId查询出该工程下的5条配置信息
	 */
	public List<SerialConfigInfo> getAllSerialConfigInfo(String projectId);
}
