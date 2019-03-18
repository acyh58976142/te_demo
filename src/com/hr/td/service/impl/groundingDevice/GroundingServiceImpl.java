package com.hr.td.service.impl.groundingDevice;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.hr.td.dao.IBaseDao;
import com.hr.td.entity.Attachment;
import com.hr.td.entity.GroundingConfig;
import com.hr.td.entity.GroundingDevice;
import com.hr.td.service.groundingDevice.IGroundingService;
import com.hr.td.util.Page;
import com.hr.td.util.ToolsUtil;
import com.nari.slsd.hd.param.Param;
import com.nari.slsd.hd.util.CommonTool;

@Service
public class GroundingServiceImpl implements IGroundingService{
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
		hql.append(" select id, projectName,projectCode,designUnit,designDate,wireConfigId from mainInfo ");	
		
		return baseDao.getPageBySql(totalCount, hql.toString(),pageSize,startIndex, paramList.toArray());
	}
    
	/**
	 * 通过projetId查询接地配置表有无该项目配置信息
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<GroundingConfig> findGroundingConfig(String projectId) {
		String hql="select id,no,resistivityMin,resistivityMax from GroundingConfig where projectId = ?"
				 + " order by SerialNum asc ";
		
		return baseDao.execSql(hql, projectId);
	}
    
	/**
	 * 根据工程ID查询接地装置配置信息
	 * 
	 * @param id工程ID
	 * @return list 接地装置配置信息
	 */
	public List<GroundingConfig> getGroundingConfigList(String id) {
			
		StringBuffer sb =new StringBuffer();
		sb.append(" from GroundingConfig where projectId = ? order by SerialNum ");
		List<Object> ls = new ArrayList<Object>();
		ls.add(id);
		ls.toArray();
		List<GroundingConfig> list = baseDao.queryByHQL(sb.toString(),ls.toArray());
		
		return list;	
	
	}
	/**
	 * 批量插入接地配置信息
	 */
	@Override
	public int addAllGroundingConfig(List<GroundingConfig> groundingConfigList) {
		
		return baseDao.batchExcute(groundingConfigList, Param.OpType.OP_INSERT);
	}
    
	/*
	 * 批量修改接地配置信息
	 */
	@Override
	public int updateAllGroundingConfig(List<GroundingConfig> groundingConfigList) {
		
		return baseDao.batchExcute(groundingConfigList, Param.OpType.OP_UPDATE);
	}
    
	/**
	 * 在插入数据之前批量删除操作
	 */
	@Override
	public int deleteAllGroundingConfigByPrijectId(String projectId) {
		String sql = "DELETE FROM groundingConfig WHERE projectId = ? ";
        
		return jdbcTemplate.update(sql,projectId);
	}
    
	/**
	 * 批量插入数据到附件表
	 */
	@Override
	public int addAllAttachment(List<Attachment> attachmentList) {
		
		return baseDao.batchExcute(attachmentList, Param.OpType.OP_INSERT);
	}

	/**
	 * 在插入数据之前批量删除附件表操作(附件表里的projectId为接地配置表的主键id)
	 */
	@Override
	public int deleteAllAttachmentByPrijectId(String projectId) {
		/*List<Attachment> AttachmentList = findAttachmentByProjectIdAndType(projectId);
		if (ToolsUtil.isEmpty(AttachmentList)) {
			return baseDao.batchExcute(AttachmentList, Param.OpType.OP_DELETE);
		}
		return 0;*/
        String sql = "DELETE FROM attachment WHERE projectId = ? and attachmentType = 3 ";
        
		return jdbcTemplate.update(sql,projectId);
	}
    
	/**
	 * 根据projetId和项目类型查询接地配置附件信息
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<Attachment> findAttachmentByProjectIdAndType(String projectId) {
		/*List<Object> parameters = new ArrayList<Object>();
		parameters.add(projectId);*/
		String sql = "select a.id,a.originalFileName,a.newFileName,a.filePath,"
				+ "a.projectId,a.stageId,a.attachmentType,a.sortNo "
				+ "from Attachment a where a.attachmentType = 3 and a.projectId = ? order by sortNo asc ";
		/*String hql="from Attachment where attachmentType = 3 and projectId = ?"
				 + " order by sortNo desc ";*/
		return baseDao.execSql(sql, projectId);
		//return baseDao.queryByHQL(hql.toString(), parameters.toArray());
	}
	
	
	/**
	 * 根据杆塔编号查询电阻率
	 * @param towerNum  杆塔编号
	 * @return resistivity 电阻率
	 */
	public String getResistivity(String towerNum){
		String resistivity="";
		StringBuilder sql = new StringBuilder();
		List<Object> paramList = new ArrayList<Object>();
		sql.append("select resistivity from geologicalSchedule where towerNum= ? and resistivity is not null ");
		paramList.add(towerNum);
		
		List<Map<String, Object>> list = baseDao.getJdbcTemplateDAO().queryForList(sql.toString(), paramList.toArray());
		if(!ToolsUtil.isEmpty(list))
		{
			resistivity = list.get(0).get("resistivity")+"";
		}
		return resistivity;
	};
	
	/**
	 * 根据电阻率查询代号
	 * @param resistivity 电阻率
	 * @return no 代号
	 */
	public String getNoByResistivity(String resistivity,String projectId){
		String no="";
		StringBuilder sql = new StringBuilder();
		List<Object> paramList = new ArrayList<Object>();
		sql.append("select no from groundingConfig where resistivityMin<= ? and resistivityMax >= ? and projectId= ? ");
		paramList.add(resistivity);
		paramList.add(resistivity);
		paramList.add(projectId);
		
		List<Map<String, Object>> list = baseDao.getJdbcTemplateDAO().queryForList(sql.toString(), paramList.toArray());
		if(!ToolsUtil.isEmpty(list))
		{
			no = list.get(0).get("no")+"";
		}
		return no;
	};
	
	/**
	 * 根据工程ID查询接地装置表
	 * 
	 * @param id工程ID
	 * @return GroundingDevice
	 */
	public GroundingDevice getGroundingById(String id) {
			
		StringBuffer sb =new StringBuffer();
		sb.append(" from GroundingDevice where projectId=? ");
		List<Object> ls = new ArrayList<Object>();
		ls.add(id);
		ls.toArray();
		List<GroundingDevice> list = baseDao.queryByHQL(sb.toString(),ls.toArray());
		if(!ToolsUtil.isEmpty(list))
		{
			return list.get(0);
		}
		return null;	
	
	}
	
	/**
	 * 保存接地装置信息表到数据库
	 */
	public boolean saveGrounding(GroundingDevice grounding) {
		//保存接地装置信息表到数据库
		baseDao.saveOrUpdate(grounding);
		
		return true;
	}
}
