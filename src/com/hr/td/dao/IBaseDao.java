package com.hr.td.dao;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;

import org.hibernate.criterion.Criterion;
import org.springframework.jdbc.core.JdbcTemplate;

import com.hr.td.util.Page;



public interface IBaseDao {
	/**根据主键查询实体
	 * @param entityClass 实体ClassType
	 * @param id 实体主键
	 * @return 实体
	 */
	@SuppressWarnings("rawtypes")
	public Object getEntity(Class entityClass, Serializable id);
	/**
	 * 保存实体
	 * @param entity 实体模型
	 * @return insert之后该实体的主键
	 */
	public Serializable save(Object entity);

	/**根据ClassType查询所有实体
	 * @param entityClass 实体ClassType
	 * @return 实体集合
	 */
	@SuppressWarnings("rawtypes")
	public List loadAll(Class entityClass);
	/**
	 * 更新实体
	 * @param entity 实体模型
	 * @note 如果失败将throw DataAccessException
	 */
	public void update(Object entity);
	/**
	 * 删除实体
	 * @param entity 实体模型
	 * @note 如果失败将throw DataAccessException
	 */
	public void delete(Object entity);
	/**
	 * 实体动态属性查询
	 * @param entityClass 实体模型
	 * @param propertyNames 条件属性
	 * @param parameter     条件值
	 * @return 符合条件的实体集合
	 */
	@SuppressWarnings("rawtypes")
	public List findByProperty(Class entityClass,String[] propertyNames,Object[] parameter);
	/**
	 * 实体的模糊查询
	 * @param entity 模糊查询条件组装的实体
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public List findByExample(Object entity);
	/**
	 * 批量Insert,Update,Delete的处理
	 * @param entityList 实体集合
	 * @param HDParam.OpType 操作类型枚举
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public int batchExcute(final List entityList,final String opType);
	/**执行DML绑定批量操作，自定义SQL
	 * @param inmap
	 * @return
	 */	
	public int  execDmlSql( HashMap<String,Object> inmap);
	/**
	 * 直接执行sql语句
	 * inmap为必须参数, 不能为null,
	 * inmap中 Param.ExParamType.EX_SQL 参数不能为null,
	 * @author yangning
	 * @param inmap (Param.ExParamType.EX_SQL : sql语句) 参数的使用相见Param.ExParamType.EX_SQL类
	 * 				使用范例：inmap.put(Param.ExParamType.EX_SQL, string);	
	 * 		  		(Param.TimeType.EQ_BTIME : 绑定开始时间条件)  参数的使用相见Param.TimeType.EQ_BTIME类 
	 * 				使用范例：inmap.put(Param.TimeType.EQ_BTIME,calendar);
	 * 		  		(Param.TimeType.EQ_ETIME : 绑定结束时间条件)  参数的使用相见Param.TimeType.EQ_ETIME类 
	 * 				使用范例：inmap.put(Param.TimeType.EQ_ETIME,calendar);
	 * 		  		(Param.ExParamType.EX_SLIPWIN : 结果个数限制)  参数的使用相见Param.ExParamType.EX_SLIPWIN类 
	 * 				使用范例：inmap.put(Param.ExParamType.EX_SLIPWIN,10);
	 * 		  		(Param.IdType.STR_IDARRAY : 绑定字段名或字符串侧点名)  参数的使用相见Param.IdType.STR_IDARRAY类 
	 * 				使用范例：inmap.put(Param.IdType.STR_IDARRAY,COLNAME);
	 * 		  		(Param.IdType.LONG_IDARRAY : 绑定测点号)  参数的使用相见Param.IdType.LONG_IDARRAY类 
	 * 				使用范例：inmap.put(Param.IdType.LONG_IDARRAY,1111111);
	 * 其中：EQ_BTIME，EQ_ETIME可以压入需要带入的时间，SQL串中的TB，TE将被当做时间保留字会被[EQ_BTIME]，[EQ_ETIME]的值替换
	 * LONG_IDARRAY可以压入Long型站号组，[IDARRAY]将被当做保留字会被LONG_IDARRAY的值替换
	 * STR_IDARRAY可以压入String型站号组，[STRIDARRAY]将被当做保留字会被STR_IDARRAY的值替换
	 * EX_INT如果压入1，则STR_IDARRAY中存放的是需要替换的Column的名称
	 * EX_SLIPWIN如果压入，则替换
	 * @return List 其中存放的是Object[]按查询字段存放
	 */
	public List  execSql(HashMap<String,Object> inmap);
	/**获取实体类对应的表的列名称和中文说明
	 * @param entityClass 实体类名称
	 * @return 列名为key，列说明为value的hashmap
	 */
	public HashMap<String, String> getColumnData(Class entityClass);
	

	/**针对通用类型的查询组合
	 * @param entityClass 实体类名称
	 * @param inmap 查询条件在inmap的ExCondition和ExCondLinkStr中
	 * @return
	 */
	public List execGenCondSql(Class entityClass,HashMap<String,Object> inmap);
	
	/**插入或更新
	 * @param entity
	 * @return
	 */
	public void saveOrUpdate(Object entity);
	public List getChildList(Class childClass, Long parentId);
	/**获取任意数据表的条件查询的记录条数,
	 * @author yangning
	 * @param objClass
	 * @param inMap inmap中excond[]是条件，exlinkstr是连接字符串
	 * @return 记录条数
	 */
	public Long getRecordCount( String apptype,Class objClass,HashMap<String,Object> inMap);
	/**获取任意数据表的分页查询的数据列
	 * @param totalCount 记录总数
	 * @param hql  执行的hql语句
	 * @param pageSize 每页记录数
	 * @param startIndex 起始记录数
	 * @param parameters 绑定变量参数值
	 * @return
	 */
	public List getRecordBypage( int totalCount, String hql, int pageSize, int startIndex, Object...parameters);
	
	public Object[]  bindParamForSqlOrHql(HashMap<String,Object> inmaplocal);
	
	public int getCount(String hql, Object[] param);

	public int getCount(Class entityClass, Criterion criterions[]);

	public Page getByPage(int totalCount, String hql, int pageSize, int startIndex, Object[] parameters);

	public Page getByPage(Class entityClass, int totalCount, Criterion criterions[], int pageSize, int startIndex, String orderProperty[], boolean isAsc[]);

	//public Criterion[] exCondToCriterion(ExCond[] exConds);

	public int executeBySQL(final String sql, final Object[] parameters);

	public List queryByHQL(String hql, Object[] parameters);

	public List queryBySQL(String sql, Object[] parameters);

	public int getCountBySql(String sql, Object[] param);

	public Page getPageBySql(final int totalCount, final String sql, final int pageSize, final int startIndex, final Object[] parameters);
	
	public List execSql(String sql, Object... params);
	
	public List find(String hql, Object... parameters);
	
	public List find(String hql, String[] paramNames, Object[] values);
	
	public JdbcTemplate getJdbcTemplateDAO();
	 
	public HibernateDao getHibernateDAO();
	
	public int executeBySQLNew(final String sql, final Object[] parameters);
}
