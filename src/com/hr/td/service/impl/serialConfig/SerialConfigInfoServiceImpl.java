package com.hr.td.service.impl.serialConfig;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.hr.td.dao.IBaseDao;
import com.hr.td.entity.SerialConfigInfo;
import com.hr.td.service.serialConfig.ISerialConfigService;
import com.hr.td.util.ToolsUtil;
import com.nari.slsd.hd.param.Param;
import com.nari.slsd.hd.param.Param.OpType;

@Service
public class SerialConfigInfoServiceImpl implements ISerialConfigService{
	
	@Autowired
	private IBaseDao baseDao;
	@Autowired
	protected JdbcTemplate jdbcTemplate;
	
	/**
	 * 批量保存或修改配置信息
	 */
	@Override
	public int addAllConfigInfo(List<SerialConfigInfo> serialConfigInfo) {
		
		return baseDao.batchExcute(serialConfigInfo, OpType.OP_INSERTORUPDATE);
	}
	
	/**
	 * 修改配置信息
	 */
	@Override
	public int updateAllConfigInfo(List<SerialConfigInfo> serialConfigInfo) {
		// TODO Auto-generated method stub
		return 0;
	}
	
	/**
	 * 根据projectId和表格类型查询
	 */
	@Override
	public SerialConfigInfo findSerialConfigInfo(String projectId, int tableType) {
		List<Object> paramList = new ArrayList<>();
		paramList.add(projectId);
		paramList.add(tableType);
		String hql = "from SerialConfigInfo where projectId=? and tableType=? ";
		
		@SuppressWarnings("unchecked")
		List<SerialConfigInfo> list  = baseDao.queryByHQL(hql, paramList.toArray());
		if(!ToolsUtil.isEmpty(list))
		{
			return list.get(0);
		}
		return null;
		
	}
    
	/**
	 * 根据projectId查询出该工程下的5条配置信息
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<SerialConfigInfo> getAllSerialConfigInfo(String projectId) {
		String hql = "from SerialConfigInfo where projectId=?";
		List<Object> param = new ArrayList<>();
		param.add(projectId);
		
		return baseDao.queryByHQL(hql, param.toArray());
	}
    
	
}
