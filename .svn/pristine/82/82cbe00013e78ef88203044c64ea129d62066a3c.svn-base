package com.hr.td.service.impl.geology;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.hr.td.dao.IBaseDao;
import com.hr.td.entity.GeologicalSchedule;
import com.hr.td.service.geology.IGeologyService;
import com.hr.td.util.DataTablePage;
import com.hr.td.util.Page;
import com.hr.td.util.ToolsUtil;
import com.nari.slsd.hd.param.Param;
import com.nari.slsd.hd.param.Param.OpType;
import com.nari.slsd.hd.util.CommonTool;

@Service
public class GeologyServiceImpl implements IGeologyService{
	@Autowired
	private IBaseDao baseDao;
	@Autowired
	protected JdbcTemplate jdbcTemplate;
	
	/**
	 *  查询地层名称和配置表ID
	 */
	@Override
	public List<Map<String, Object>> queryStratigraphicName() {
		String sql = "select * from geologicalScheduleConfigure";
		return jdbcTemplate.queryForList(sql);
	}
    
	/**
	 * 根据地层名称的value（ID）查询对应的岩土物理力学指标
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<String> queryNormByID(String ID) {
		//使用hql，from的是实体对象的名称
		String hql = " select geotechnicalDescription,gravityDensity,cohesion," +
				     " internalFrictionAngle,eigenvalueCapacity,standardSideResistance," +
				     " standardEndResistance from GeologicalScheduleConfigure" +
				     " where ID = ? ";
		return baseDao.find(hql, ID);
	}
    
	/**
	 * 插入所有列表数据到geologicalSchedule表中
	 * @see com.hr.td.service.geology.IGeologyService#addAllGeological(java.util.List)
	 */
	@Override
	public int addAllGeological(List<GeologicalSchedule> geologicalScheduleList) {
		
		return baseDao.batchExcute(geologicalScheduleList, Param.OpType.OP_INSERT);
	}
    
	/**
	 * 查询geologicalSchedule表信息及分页
	 * @see com.hr.td.service.geology.IGeologyService#queryGeologicalScheduleInfo()
	 */
	@Override
	public Page queryGeologicalScheduleInfo(DataTablePage page) {
		int pageSize = CommonTool.ConvertToInt(ToolsUtil.isEmpty(page.getLength())?0:page.getLength());
		int startIndex =CommonTool.ConvertToInt(ToolsUtil.isEmpty(page.getStart())?0:page.getStart());
		//查询总数量
		String sql = "select count(*) from geologicalSchedule";
		int totalCount =  jdbcTemplate.queryForInt(sql.toString());
		
		//List<Map<String, Object>> ListMap = new ArrayList<>();
		StringBuilder hql = new  StringBuilder();
		hql.append("select ID,Mid,towerNum,towerLocation,explorationBasis,stratigraphicName,floorDepth,"
				+ "geotechnicalDescription,gravityDensity,cohesion,internalFrictionAngle,eigenvalueCapacity,"
				+ "standardSideResistance,standardEndResistance,illustrate,remark,surveyPointLocation"
				+ " from geologicalSchedule ");
				
		return baseDao.getPageBySql(totalCount, hql.toString(),pageSize,startIndex,null);
	}
    
	/**
	 * 查询geologicalSchedule表信息（前台分页）
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public List<GeologicalSchedule> queryGeologicalScheduleAll() {
		String sql = " select * from geologicalSchedule ";
		//List<Object> paramList = new ArrayList<Object>();
		//return baseDao.queryBySQL(sql.toString(),paramList.toArray());
		return  jdbcTemplate.query(sql, new BeanPropertyRowMapper(GeologicalSchedule.class));
	}
    
	/**
	 * 批量修改geologicalSchedule表信息
	 */
	@Override
	public int updateAllEditGeological(List<GeologicalSchedule> geologicalScheduleList) {
		
		return baseDao.batchExcute(geologicalScheduleList, Param.OpType.OP_UPDATE);
	}
    
	/**
	 * 删除一条geologicalSchedule信息
	 */
	@Override
	public int deleteEditGeological(String id) {
		String sql = "DELETE FROM geologicalSchedule WHERE id = ? ";
         
		return jdbcTemplate.update(sql,id);
	}
   	
}
