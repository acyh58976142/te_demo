package com.hr.td.service.impl.electricPower;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hr.td.dao.IBaseDao;
import com.hr.td.service.electricPower.IMechanicsPropertyService;

@Service
public class MechanicsPropertyServiceImpl implements IMechanicsPropertyService{
	
	@Autowired
	private IBaseDao baseDao;
	@Override
	public List<Map<String, Object>> groundWireParam() {
		List<Object> list = new ArrayList<Object>();
		StringBuilder builder = new StringBuilder();
		builder.append(" SELECT * FROM ahdc.mp_conductor_param ");
		return baseDao.getJdbcTemplateDAO().queryForList(builder.toString(), list.toArray());
	}
	
}
