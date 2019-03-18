package com.hr.td.service.impl.material;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.hr.td.dao.IBaseDao;
import com.hr.td.service.material.IMaterialService;
import com.hr.td.util.Page;
import com.hr.td.util.ToolsUtil;
import com.nari.slsd.hd.util.CommonTool;

@Service
public class MaterialServiceImpl implements IMaterialService{
	
	@Autowired
	private IBaseDao baseDao;
	@Autowired
	protected JdbcTemplate jdbcTemplate;
    
	/**
	 * 查询总数
	 */
	@Override
	public int findMainInfoListCount() {
		int totalCount=0;
		StringBuilder sql = new StringBuilder();
		List<Object> paramList = new ArrayList<Object>();
		sql.append("select id from mainInfo as M where 1=1 order by M.designDate desc ");
		
		List<Map<String, Object>> list = baseDao.getJdbcTemplateDAO().queryForList(sql.toString(), paramList.toArray());

		totalCount=list.size();
		return totalCount;
	}
	
	/**
 	* 根据map里的条件查询工程信息，将列表展示需要的字段信息存进Page
 	* @param map
 	* @param totalCount查询记录总数
 	* @return Page 分页信息
 	*/
	@Override
	public Page findMainInfoList(Map<String, Object> map, int totalCount) {
		int pageSize = CommonTool.ConvertToInt(ToolsUtil.isEmpty(map.get("pageSize"))?0:map.get("pageSize"));
		int startIndex =CommonTool.ConvertToInt(ToolsUtil.isEmpty(map.get("startIndex"))?0:map.get("startIndex"));
		StringBuilder hql = new StringBuilder();
		List<Object> paramList = new ArrayList<Object>();
		hql.append(" select id, projectName,projectCode,designUnit,designDate,wireConfigId from mainInfo order by designDate desc ");	
		
		return baseDao.getPageBySql(totalCount, hql.toString(),pageSize,startIndex, paramList.toArray());
	}
    

   
}
