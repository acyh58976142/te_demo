package com.hr.td.service.impl.common;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hr.td.dao.IBaseDao;
import com.hr.td.entity.MainInfo;
import com.hr.td.service.common.ICommonService;

@Service
public class CommonServiceImpl implements ICommonService{
	
	@Autowired
	private IBaseDao baseDao;

	/**
	 * 查询工程信息
	 * 
	 * @param
	 * @return list
	 */
	@Override
	public List<MainInfo> getMainInfoList() {
			
		StringBuffer sb =new StringBuffer();
		sb.append(" from MainInfo where 1=1 ");
		List<Object> ls = new ArrayList<Object>();
		
		List<MainInfo> list = baseDao.queryByHQL(sb.toString(),ls.toArray());
			
		return list;
	}
	
}
