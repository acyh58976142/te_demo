package com.hr.td.service.impl.common;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hr.td.dao.IBaseDao;
import com.hr.td.service.common.ISerialConfigService;

@Service
public class SerialConfigServiceImpl implements ISerialConfigService{
	
	@Autowired
	private IBaseDao baseDao;
	/**
	 * @Title:getSerialConfigData
	 * @Description: TODO
	 * 
	 */
	@Override
	public List<Map<String, Object>> getSerialConfigData() {
//		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
		List<Object> list = new ArrayList<Object>();
		StringBuilder builder = new StringBuilder();
		builder.append(" SELECT * FROM ahdc.wirewayInfo ");
		return baseDao.getJdbcTemplateDAO().queryForList(builder.toString(), list.toArray());
	}
	/**
	 * @Title:getinsulatorDetailData
	 * @Description: TODO
	 * 
	 */
	@Override
	public List<Map<String, Object>> getInsulatorDetailData() {
		List<Object> list = new ArrayList<Object>();
		StringBuilder builder = new StringBuilder();
		builder.append(" SELECT * FROM ahdc.insulatorDetail ");
		return baseDao.getJdbcTemplateDAO().queryForList(builder.toString(), list.toArray());
	}
	/**
	 * @Title:getFittingDetail
	 * @Description: TODO
	 * 
	 */
	@Override
	public List<Map<String, Object>> getFittingDetail() {
		List<Object> list = new ArrayList<Object>();
		StringBuilder builder = new StringBuilder();
		builder.append(" SELECT * FROM ahdc.fittingDetail f ");
		builder.append(" left join ahdc.pictureInfo p  ");
		builder.append(" on f.stringCode = p.pictureCode  ");
		return baseDao.getJdbcTemplateDAO().queryForList(builder.toString(), list.toArray());
	}
	
}
