package com.hr.td.dao;

import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.hr.td.util.BatchType;
import com.hr.td.util.Page;
import com.nari.slsd.hd.param.Param;


/**
 * Hiberante数据访问对象
 */
public class HibernateDao extends HibernateDaoSupport
{
	private final Logger log = Logger.getLogger(HibernateDao.class);
/**根据主键查询实体
 * @param entityClass 实体ClassType
 * @param id 实体主键
 * @return 实体
 */
@SuppressWarnings("rawtypes")
public Object get(Class entityClass, Serializable id)
{
	return getHibernateTemplate().get(entityClass, id);
}


/**根据ClassType查询所有实体
 * @param entityClass 实体ClassType
 * @return 实体集合
 * @note spring额外的API，底层是hibernate的Criteria实现的
 */
@SuppressWarnings("rawtypes")
public List loadAll(Class entityClass)
{
	return getHibernateTemplate().loadAll(entityClass);
}

/**
 * 保存实体
 * @param entity 实体模型
 * @return insert之后该实体的主键
 */
public Serializable save(Object entity)
{
	return getHibernateTemplate().save(entity);
}

/**
 * 更新实体
 * @param entity 实体模型
 * @note 如果失败将throw DataAccessException
 */
public void update(Object entity)
{
	getHibernateTemplate().update(entity);
}


/**
 * 删除实体
 * @param entity 实体模型
 * @note 如果失败将throw DataAccessException
 */
public void delete(Object entity)
{
	getHibernateTemplate().delete(entity);
}

/**
 * 实体动态属性查询
 * @param entityClass 实体模型
 * @param propertyNames 条件属性
 * @param parameter     条件值
 * @return 符合条件的实体集合
 */
@SuppressWarnings("rawtypes")
public List findByProperty(Class entityClass,String[] propertyNames,Object[] parameter)
{
	
	if(propertyNames.length!=parameter.length)
	{
		throw new IllegalArgumentException("需要查询的属性和值对象没法一一匹配！");
	}
	String className = entityClass.getName();
	StringBuilder builder = new StringBuilder();
	builder.append("from ").append(className).append(" as obj where ");
	for(int i=0;i<propertyNames.length;i++)
	{
		if(parameter[i] instanceof Object[])
		{
			Object[] paramObjects=(Object[]) parameter[i];
			builder.append(" obj.").append(propertyNames[i]).append(" in (");
			for (int j=0;j<paramObjects.length;j++)
			{
				builder.append("?,");
			}
			builder.replace(builder.lastIndexOf(","), builder.lastIndexOf(",")+1, ")");
		}
		else
		{
			builder.append(" obj.").append(propertyNames[i]).append("=? ");
		}
		//builder.append(" obj.").append(propertyNames[i]).append("=? ");
		//如不是最后一个参数，就加and
		if(i!= propertyNames.length -1)
		{
			builder.append("and");
		}
	}
	//将object嵌套全部打开
	List<Object> paList=new ArrayList<Object>();;
	for(int i=0;i<parameter.length;i++)
	{
		//paList=
		if(parameter[i] instanceof Object[])
		{
			Object[] paramObjects=(Object[]) parameter[i];
			for (int j=0;j<paramObjects.length;j++)
			{
				paList.add(paramObjects[j]);
			}
		}
		else
		{
			paList.add(parameter[i]);
		}
	}
	return getHibernateTemplate().find(builder.toString(),paList.toArray());
}

/**
 * 创建基本的Criteria
 * @param entityClass 实体的ClassType
 * @param criterions Criterion条件集合
 * @return Criteria
 */
@SuppressWarnings("rawtypes")
private Criteria createCriteria(Session session, Class entityClass,Criterion...criterions)
{
	Criteria criteria = session.createCriteria(entityClass);
	for (Criterion criterion : criterions)
	{
		criteria.add(criterion);
	}
	return criteria;
}

/**
 * 创建排序条件的Criteria
 * @param entityClass 实体的ClassType
 * @param orderProperty 排序属性集合(支持多字段排序)
 * @param isAsc 排序方式集合(默认升序,false为Desc)
 * @param criterions Criterion条件集合
 * @return Criteria
 */
@SuppressWarnings("rawtypes")
private Criteria createCriteria(Session session, Class entityClass, String[] orderProperty,
		boolean[] isAsc, Criterion... criterions)
{
	
	if(orderProperty.length==isAsc.length)
	{
		Criteria criteria = createCriteria(session,entityClass, criterions);
		for(int i=0;i<orderProperty.length;i++)
		{
			if (isAsc[i])
			{
				criteria.addOrder(Order.asc(orderProperty[i]));
			}
			else
			{
				criteria.addOrder(Order.desc(orderProperty[i]));
			}
		}
		return criteria;
	}
	else 
	{
		return null;
	}
}  

/**
 * 根据Criteria查询实体
 * @param entityClass
 * @param orderProperty
 * @param isAsc
 * @param criterions
 * @return
 */
@SuppressWarnings("rawtypes")
public List findByCriteria(final Class entityClass, final String[] orderProperty,
		final boolean[] isAsc, final Criterion... criterions)
{
	return (List) getHibernateTemplate().execute(new HibernateCallback() {
		@Override
		public Object doInHibernate(Session session) throws HibernateException,
				SQLException {
			return createCriteria(session,entityClass,orderProperty,isAsc,criterions).list();
		}
	});
}
@SuppressWarnings({ "rawtypes", "unchecked" })
public List findByCriteria(final Class entityClass, final Criterion... criterions)
{
	return (List) getHibernateTemplate().execute(new HibernateCallback() {
		@Override
		public Object doInHibernate(Session session) throws HibernateException,
				SQLException {
			return createCriteria(session,entityClass,criterions).list();
		}
	});
}
@SuppressWarnings({ "rawtypes", "unchecked" })
public Object findByCriteriaUnique(final Class entityClass, final Criterion... criterions)
{
	return getHibernateTemplate().execute(new HibernateCallback() {
		@Override
		public Object doInHibernate(Session session) throws HibernateException,
				SQLException {
			return createCriteria(session,entityClass,criterions).uniqueResult();
		}
	});
}

/**
 * 根据Criteria分页查询实体(排序)
 * @param totalCount 总记录数，可用getCountByCriteria(Criteria)获得，目的提高性能，可以复用totalCount
 * @param criteria 查询条件
 * @param pageSize 每页记录数
 * @param startIndex 每页记录的开始索引，可用Page类的getNextIndex获得
 * @param orderProperty 排序的属性
 * @param isAsc 排序顺序
 * @return Page对象
 */
public Page findPageByCriteria(final int totalCount,final Criteria criteria,final int pageSize,final int startIndex,final String orderProperty,final boolean isAsc)
{
	return (Page)getHibernateTemplate().execute(new HibernateCallback() {
		
		@Override
		public Object doInHibernate(Session arg0) throws HibernateException,
				SQLException {
			//清除criteria中rowcount条件，为下面查询数据作准备
			criteria.setProjection(null);
			//判断是否需要排序
			if(!(orderProperty == null || orderProperty.equals("")))
			{
				if(isAsc)
				{
					criteria.addOrder(Order.asc(orderProperty));
				}
				else 
				{
					criteria.addOrder(Order.desc(orderProperty));
				}
			}
			@SuppressWarnings("rawtypes")
			List items = criteria.setFirstResult(startIndex).setMaxResults(pageSize).list();   
			Page page = new Page(items, totalCount, pageSize, startIndex);   
			return page;  
		}
	});
	
}
/**
 * 根据Criterions[]分页查询实体(排序)
 * @param entityClass 实体类型
 * @param totalCount 总记录数，可用getCountByCriteria(Criteria)获得，目的提高性能，可以复用totalCount
 * @param criterions 查询条件
 * @param pageSize 每页记录数
 * @param startIndex 每页记录的开始索引，可用Page类的getNextIndex获得
 * @param orderProperty 排序的属性
 * @param isAsc 排序顺序
 * @return Page对象
 */
public Page findPageByCriterions(final Class entityClass, final int totalCount,final Criterion[] criterions,final int pageSize,final int startIndex,final String[] orderProperty,final boolean[] isAsc)
{
        return (Page)getHibernateTemplate().execute(new HibernateCallback() {
		
		@Override
		public Object doInHibernate(Session session) throws HibernateException,
				SQLException {
			Criteria criteria = createCriteria(session,entityClass,orderProperty,isAsc,criterions);
			//清除criteria中rowcount条件，为下面查询数据作准备
			criteria.setProjection(null);
			//判断是否需要排序
		/*	for(int i=0;i<orderProperty.length;i++){
				if(!(orderProperty[i] == null || orderProperty[i].equals("")))
				{
					if(isAsc[i])
					{
						criteria.addOrder(Order.asc(orderProperty[i]));
					}
					else 
					{
						criteria.addOrder(Order.desc(orderProperty[i]));
					}
				}
			}
			*/
			@SuppressWarnings("rawtypes")
			List items = criteria.setFirstResult(startIndex).setMaxResults(pageSize).list();   
			Page page = new Page(items, totalCount, pageSize, startIndex);   
			return page;  
		}
	});
	
}
/**
 * 根据Criteria分页查询实体
 * @param totalCount 总记录数，可用getCountByCriteria(Criteria)获得，目的提高性能，可以复用totalCount
 * @param criteria 查询条件
 * @param pageSize 每页记录数
 * @param startIndex 每页记录的开始索引，可用Page类的getNextIndex获得
 * @return Page对象
 */
public Page findPageByCriteria(final int totalCount,final Criteria criteria,final int pageSize,final int startIndex)
{
	return findPageByCriteria(totalCount,criteria,pageSize,startIndex,null,false);
}

/**
 * 查询符合Criteria的记录条数
 * @param criteria
 * @return
 */
public int getCountByCriteria(final Criteria criteria)
{
	return (Integer)getHibernateTemplate().execute(new HibernateCallback() {
		
		@Override
		public Object doInHibernate(Session arg0) throws HibernateException,
				SQLException {
			Integer count = (Integer) criteria.setProjection(Projections.rowCount()).uniqueResult();
			return count;
		}
	});
} 

/**
 * 查询符合Criteria[]的记录条数
 * @param entityClass 实体类型
 * @param criterions 查询条件
 * @return
 */ 
public int getCountByCriterions(final Class entityClass, final Criterion[] criterions)
{
	return (Integer)getHibernateTemplate().execute(new HibernateCallback() {
		
		@Override
		public Object doInHibernate(Session session) throws HibernateException,
				SQLException {
			Criteria criteria = createCriteria(session,entityClass,new String[0],new boolean[0],criterions);
			Integer count = (Integer) criteria.setProjection(Projections.rowCount()).uniqueResult();
			return count;
		}
	});
} 
/**
 * 创建DetachedCriteria
 * @param detachedCrieria
 * @return 查询结果
 */
@SuppressWarnings("rawtypes")
public List findByDetachedCriteria(final DetachedCriteria detachedCrieria)
{
	return (List) getHibernateTemplate().execute(new HibernateCallback()
	{
		@Override
		public Object doInHibernate(Session session)
				throws HibernateException, SQLException
		{
			Criteria criteria = detachedCrieria.getExecutableCriteria(session);
			return criteria.list();
		}

	});
}


/**
 * 根据DetachedCriteria分页查询实体(排序)
 * @param totalCount 总记录数，可用getCountByDetachedCriteria(DetachedCriteria)获得，目的提高性能，可以复用totalCount
 * @param detachedCriteria 查询条件
 * @param pageSize 每页记录数
 * @param startIndex 每页记录的开始索引，可用Page类的getNextIndex获得
 * @param orderProperty 排序的属性
 * @param isAsc 排序顺序
 * @return Page对象
 */
public Page findPageByDetachedCriteria(final int totalCount,final DetachedCriteria detachedCriteria,final int pageSize,final int startIndex,final String orderProperty,final boolean isAsc)
{
	return (Page)getHibernateTemplate().execute(new HibernateCallback(){

		@Override
		public Object doInHibernate(Session session)
				throws HibernateException, SQLException
		{
			Criteria criteria = detachedCriteria.getExecutableCriteria(session);
			
			criteria.setProjection(null);
			if(!(orderProperty == null || orderProperty.equals("")))
			{
				if(isAsc)
				{
					criteria.addOrder(Order.asc(orderProperty));
				}
				else 
				{
					criteria.addOrder(Order.desc(orderProperty));
				}
			}
			@SuppressWarnings("rawtypes")
			List items = criteria.setFirstResult(startIndex).setMaxResults(pageSize).list();
			Page page = new Page(items, totalCount, pageSize, startIndex);   
			return page;
		}
		
	});
}
/**
 * 查询符合DetachedCriteria的记录条数
 * @param DetachedCriteria
 * @return
 */
public int getCountByDetachedCriteria(final DetachedCriteria detachedCriteria)
{
	return (Integer)getHibernateTemplate().execute(new HibernateCallback() {
		@Override
		public Object doInHibernate(Session session) throws HibernateException,
				SQLException 
		{
			Criteria criteria = detachedCriteria.getExecutableCriteria(session);
			return getCountByCriteria(criteria);
		}
	});
} 

/**
 * 根据DetachedCriteria分页查询实体
 * @param totalCount
 * @param detachedCriteria
 * @param pageSize
 * @param startIndex
 * @return
 */
public Page findPageByDetachedCriteria(final int totalCount,final DetachedCriteria detachedCriteria,final int pageSize,final int startIndex)
{
	return findPageByDetachedCriteria(totalCount,detachedCriteria, pageSize,startIndex,null,false);
}

/**
 * 创建HQL的Query对象
 * @param hql
 * @param parameters
 * @return
 */
private Query createQuery(Session session,final String hql,final Object...parameters)
{
	Query query =session.createQuery(hql);
	if(parameters != null)
	{
		for (int i = 0; i < parameters.length; i++)
		{   
			if(parameters[i]!=null)
			   query.setParameter(i, parameters[i]);
		}   
	}
	return query;   
}

/**
 * 执行指定的hql语句,可以是添加,删除和更新操作
 * 如果语句不是操作行,总是返回0
 * 成功返回受影响的行数
 * @param hql hql语句
 * @param parameters 语句中指定的参数对象
 * @return 返回查询结果
 */
@SuppressWarnings({ "unchecked", "rawtypes" })
public List exeQuery(final String hql,final Object...parameters)
{
	return (List)getHibernateTemplate().execute(new HibernateCallback() {

		@Override
		public Object doInHibernate(Session session)
				throws HibernateException, SQLException {
			// TODO Auto-generated method stub
			Query query = createQuery(session, hql, parameters);
			return query.list();
		}
	});
}

/**
 * 执行指定的hql语句,执行dml操作
 * 如果语句不是操作行,总是返回0
 * 成功返回受影响的行数
 * @param hql hql语句
 * @param parameters 语句中指定的参数对象
 * @return 返回查询结果
 */
@SuppressWarnings({ "unchecked", "rawtypes" })
public int exeDml(final String hql,final Object...parameters)
{
	return (Integer)getHibernateTemplate().execute(new HibernateCallback() {

		@Override
		public Object doInHibernate(Session session)
				throws HibernateException, SQLException {
			// TODO Auto-generated method stub
			Query query = createQuery(session, hql, parameters);
			Integer status = query.executeUpdate();
			return status;
		}
	});
}
/**
 * 根据Query处理分页
 * @param totalCount 可以用getCountByQuery(hql, parameters)获得
 * @param hql
 * @param pageSize
 * @param startIndex
 * @param parameters
 * @return
 */

@SuppressWarnings("rawtypes")
public Page findPageByQuery(final int totalCount,final String hql, final int pageSize,final int startIndex, final Object...parameters)
{
	if (totalCount < 1)
	{
		return new Page(new ArrayList(0), 0);
	}
	return (Page)getHibernateTemplate().execute(new HibernateCallback() {
		
		@Override
		public Object doInHibernate(Session session) throws HibernateException,
				SQLException {
			Query query = createQuery(session,hql, parameters);
			List items = query.setFirstResult(startIndex).setMaxResults(pageSize).list();
			Page ps = new Page(items, totalCount, pageSize, startIndex);
			return ps;
		}
	});
	
}   
//处理HQL的工具方法，将HQL前面的select属性去掉，为了获得count
private String removeSelect(String hql)
{
	int beginPos = hql.toLowerCase().indexOf("from");
	return hql.substring(beginPos);
} 
//处理HQL的工具方法，将order去掉，为了获得count
private static String removeOrders(String hql)
{
	Pattern p = Pattern.compile("order\\s*by[\\w|\\W|\\s|\\S]*",Pattern.CASE_INSENSITIVE);
	Matcher m = p.matcher(hql);
	StringBuffer sb = new StringBuffer();
	while (m.find())
	{
		m.appendReplacement(sb, "");
	}
	m.appendTail(sb);
	return sb.toString();
}    

/**
 * 获得满足该HQL条件的记录count
 * @param hql
 * @param values
 * @return
 */
@SuppressWarnings("rawtypes")
public Long getCountByQuery(final String hql, Object... values)
{
	String countQueryString = " select count(*) "
			+ removeSelect(removeOrders(hql));
	List countlist = getHibernateTemplate().find(countQueryString, values);
	return (Long) countlist.get(0);
}   



/**
 * Find方式执行HQL
 * @param hql
 * @return
 */
@SuppressWarnings("rawtypes")
public List find(String hql)
{
	return getHibernateTemplate().find(hql);
}

/**
 * Find方式执行HQL
 * @param hql
 * @param parameters 
 * @return
 */
@SuppressWarnings("rawtypes")
public List find(String hql, Object... parameters)
{
	return getHibernateTemplate().find(hql, parameters);
	
}
/**
 * Find方式执行HQL,以命名占位符方式，推荐
 * @param hql
 * @param paramNames
 * @param values
 * @return
 */
public List find(String hql,String[] paramNames,Object[] values)
{
	return getHibernateTemplate().findByNamedParam(hql, paramNames, values);
}
/**
 * 适用Save Or Update不确定场景下的处理
 * @param entity
 */
public void saveOrUpdate(Object entity)
{
	getHibernateTemplate().saveOrUpdate(entity);
}

/**
 * 实体的模糊查询
 * @param entity 模糊查询条件组装的实体
 * @return
 */
@SuppressWarnings("rawtypes")
public List findByExample(Object entity)
{
	return getHibernateTemplate().findByExample(entity);
}
/**
 * 批量Insert,Update,Delete的处理
 * @param entityList 实体集合
 * @param HDParam.OpType 操作类型枚举
 * @return
 */
@SuppressWarnings("rawtypes")
public int batchExcute(final List entityList, final String opType)
{
	if(entityList == null || entityList.size() == 0)
	{
		return 0;
	}
	
	return (Integer)getHibernateTemplate().execute(new HibernateCallback() {
		@Override
		public Object doInHibernate(Session session) throws HibernateException, SQLException
		{
//			Transaction tx=session.beginTransaction();
			int excuteCount = 0;
			
			try{
				if(opType.equals(Param.OpType.OP_INSERT))
				{
					excuteCount = batchSave(session, entityList);
				}
				else if(opType.equals(Param.OpType.OP_UPDATE))
				{
					excuteCount = batchUpdate(session, entityList);
				}
				else if(opType.equals(Param.OpType.OP_DELETE))
				{
					excuteCount = batchDelete(session, entityList);
				}
				else if(opType.equals(Param.OpType.OP_INSERTORUPDATE))
				{
					excuteCount = batchSaveOrUpdate(session, entityList);
				}
			}
			catch(Exception e)
			{
//				System.out.println(e.getMessage());
//				tx.rollback();
				return excuteCount;
			}

//			tx.commit();

			return excuteCount;
		}
	});
}
@SuppressWarnings("rawtypes")
private int batchSave(Session session,List entityList)
{
	int i = 0;
	try {
		for(i=0;i<entityList.size();i++)
        {
        	session.save(entityList.get(i));
	        if(i % 50==0)
	        {
	        	session.flush();
	        	session.clear();
	     	}
//	        System.out.println(i);
        }
	} catch (Exception e) {
		e.printStackTrace();
	}
	
	
	return i;
}
@SuppressWarnings("rawtypes")
private int batchUpdate(Session session,List entityList)
{
	int i = 0;
	for(i=0;i<entityList.size();i++)
    {
    	session.update(entityList.get(i));
        if(i % 50==0)
        {
        	session.flush();
        	session.clear();
     	}
    }
	return i;
}
@SuppressWarnings("rawtypes")
private int batchDelete(Session session,List entityList)
{
	int i = 0;
	for(i=0;i<entityList.size();i++)
    {
    	session.delete(entityList.get(i));
        if(i % 50==0)
        {
        	session.flush();
        	session.clear();
     	}
    }
	return i;
}
@SuppressWarnings("rawtypes")
private int batchSaveOrUpdate(Session session,List entityList)
{
	int i = 0;
	for(i=0;i<entityList.size();i++)
    {
    	session.saveOrUpdate(entityList.get(i));
        if(i % 50==0)
        {
        	session.flush();
        	session.clear();
     	}
    }
	return i;
}

/**
 * 组装Criterion数组的工具方法
 * @param propertyNames 属性名称
 * @param condition  比较条件
 * @param propertyValue 属性值
 * @return
 */
public Criterion[]  createCriterion(String [] propertyNames,String [] condition,Object[] propertyValue)
{
	if(propertyNames.length==condition.length && propertyNames.length==condition.length)
	{
		
		Criterion[] criterion = new Criterion[propertyNames.length];
	
		for(int i=0;i<propertyNames.length;i++)
		{
			if(condition[i].equals("="))
				criterion[i]=Restrictions.eq(propertyNames[i],propertyValue[i]);
			else if(condition[i].equals(">="))		
				 criterion[i]=Restrictions.ge(propertyNames[i],propertyValue[i]);
			else if(condition[i].equals("<="))		
				 criterion[i]=Restrictions.le(propertyNames[i],propertyValue[i]);
			else if(condition[i].equals(">"))		
				 criterion[i]=Restrictions.gt(propertyNames[i],propertyValue[i]);
			else if(condition[i].equals("<"))		
				 criterion[i]=Restrictions.lt(propertyNames[i],propertyValue[i]);
			else if(condition[i].equals("like"))	
				 criterion[i]=Restrictions.like(propertyNames[i],propertyValue[i]);
			else if(condition[i].equals("in"))	
				 criterion[i]=Restrictions.in(propertyNames[i], (Object[]) propertyValue[i]);
		 }	
	    return criterion;
	}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
	else
	{
		return null;
	}
}

public String delete(String className,String constr)
{
	if(constr!="")
		return "delete "+ className+" where "+constr;
	else 
		return "delete "+ className;
	       
}
/**
 * 原生sql查询(不推荐使用)
 * @param sql
 * @param parameters
 * @return
 */
@SuppressWarnings("rawtypes")
public List queryByNativeSql(final String sql,final Object...parameters)
{
	return (List)getHibernateTemplate().executeWithNativeSession(new HibernateCallback() {
		
		@Override
		public Object doInHibernate(Session session) throws HibernateException,
				SQLException
		{
			SQLQuery query = session.createSQLQuery(sql);
			if(parameters != null)
			{
				for(int i=0;i<parameters.length;i++)
				{
					query.setParameter(i, parameters[i]);
				}
			}
			return query.list();
		}
	});
}
/**
 * HQL 单表 Update批处理</br>
 * 使用样例</br>
 *  List<Object[]> valueList = new ArrayList<Object[]>();</br>
 *  valueList.add(new Object[]{"xujunTest1","xujunaddress1"});</br>
 *  valueList.add(new Object[]{"xujunTest2","xujunaddress2"});</br>
 *  valueList.add(new Object[]{"xujunTest3","xujunaddress3"});</br>
 *  </br>
 *  List<Object[]> conditionValueList = new ArrayList<Object[]>();</br>
 *  conditionValueList.add(new Object[]{11});</br>
 *  conditionValueList.add(new Object[]{12});</br>
 *  conditionValueList.add(new Object[]{14});</br>
 *  </br>
 *  int count = batchUpdateByHQL(Demo.class, new String[]{"name","address"}, valueList, new String[]{"id"}, new String[]{"="}, conditionValueList);</br>
 * @param classType 实体类型  必要参数
 * @param propertyNames 需要update的字段名称 必要参数
 * @param values 字段的新值集合 必要参数
 * @param conditionPropertyNames 条件字段名称  可为null
 * @param condition 条件表达式，注意是HQL表达式 可为null
 * @param conditionValues 条件值集合 可为null
 * @return 批处理影响的记录条目数量
 */
public int batchUpdateByHQL( Class classType,final String[] propertyNames,final List<Object[]> values,final String[] conditionPropertyNames,String[] condition,final List<Object[]> conditionValues)
{
	if (values == null) 
	{
		throw new IllegalArgumentException(
				"Object[] values must not be null");
	}
	// 判断update值集合的item的个数必须要和propertyNames匹配
	if (values.get(0).length != propertyNames.length) 
	{
		throw new IllegalArgumentException(
				"propertyNames's length not equals values's item length");
	}
	// 如果需要条件，必须作参数判断
	if (conditionPropertyNames != null && conditionValues != null) 
	{
		if (conditionPropertyNames.length != conditionValues.get(0).length) 
		{
			throw new IllegalArgumentException(
					"conditionPropertyNames's length not equals conditionValues's length");
		}
	}
	
	final String hql = createBatchUpdateHql(classType, propertyNames, conditionPropertyNames, condition);
	log.debug(hql);
	
	return (Integer) getHibernateTemplate().execute(new HibernateCallback() {
		//记录批处理完成的总量
		int count = 0;
		@Override
		public Object doInHibernate(Session session) throws HibernateException,
				SQLException {
			Query query = session.createQuery(hql);
			//update和where参数集合绑定
			for (int i = 0; i < values.size(); i++) 
			{
				Object[] valueObjects = values.get(i);
				// where 参数绑定
				if (conditionPropertyNames != null && conditionValues != null) 
				{
					for (int j = 0; j < conditionPropertyNames.length; j++)
					{
						 query.setParameter("condition" + j, conditionValues.get(i)[j]);
					}
				}
				// update 参数绑定
				for (int j = 0; j < propertyNames.length; j++)
				{
					query.setParameter("p"+j, valueObjects[j]);
				}
				count += query.executeUpdate();
			}
			return count;
		}
	});
}
//生成单表的Update类型的HQL语句 
private  String createBatchUpdateHql(Class classType,String[] propertyNames,String[] conditionPropertyNames,String[] condition)
{
	StringBuilder builder = new StringBuilder();
	builder.append("update ");
	builder.append(classType.getSimpleName());
	builder.append(" obj set ");
	 for(int i=0;i<propertyNames.length;i++)
     {
         builder.append("obj."+propertyNames[i]+" = :p"+i+",");
     }
	//删除最后一个逗号
	builder.deleteCharAt(builder.length()-1);
	//where条件拼装，这样需要注意，如果条件为update字段，那么要保证参数占位符的唯一性，所以这里统一加condition_前缀标示
	if(conditionPropertyNames != null)
	{
		builder.append(" where ");
		int index = 0;
    	for (String conditionProperty:conditionPropertyNames)
    	{
    		builder.append("obj.");
    		builder.append(conditionProperty);
    		builder.append(" "+condition[index]);
    		builder.append(" :condition");
    		builder.append(index);
    		if(index != conditionPropertyNames.length-1)
    		{
    			builder.append(" and ");
    		}
    		index ++;
		}
	}
	return builder.toString();
}

public void dropTable(String tblname){	
	final String sqlmsg = "DROP TABLE "+tblname;
	queryByNativeSql(sqlmsg);
	/*getHibernateTemplate().execute(new HibernateCallback() {
		
		@Override
		public Object doInHibernate(Session session) throws HibernateException,
				SQLException
		{
			Query query = session.createQuery(sqlmsg);
			query.executeUpdate();
			return null;
		}
	});
	*/
	return ;
}

/**
 * sql exec 批处理</br>
 * 使用样例</br>
 * @param classType 实体类型  必要参数
 * @param propertyNames 需要update的字段名称 必要参数
 * @param values 字段的新值集合 必要参数
 * @param conditionPropertyNames 条件字段名称  可为null
 * @param condition 条件表达式，注意是HQL表达式 可为null
 * @param conditionValues 条件值集合 可为null
 * @return 批处理影响的记录条目数量
 */
public int batchExecuteBySQL(final String sql, final Object[]... parameters)
{
	getHibernateTemplate().execute(new HibernateCallback() {
		int count = 0;
		@Override
		public Object doInHibernate(Session session) throws HibernateException,
				SQLException {
			SQLQuery query = session.createSQLQuery(sql);
			for (int i = 0; i < parameters.length; i++) 
			{
				for(int j=0;j<parameters[i].length;j++){
					query.setParameter(i, parameters[i][j]);
					count += query.executeUpdate();
				}
			}
			return count;
		}
	});
	return 0;
}

public Criterion[] CombCreterion(List[] objlist) {
	ArrayList<String> propertyNames = new ArrayList<String>();
	ArrayList<String> condition = new ArrayList<String>();
	ArrayList<Object> propertyValue = new ArrayList<Object>();

	for (List litemp : objlist) {
		if (litemp == null)
			continue;
		for (int i = 0; i < litemp.size(); i = i + 3) {
			propertyNames.add(litemp.get(i).toString());
			condition.add(litemp.get(i + 1).toString());
			propertyValue.add(litemp.get(i + 2));

		}
	}
	// 说明没有条件，则压入1>0，让查询可以执行
	if (propertyNames.size() == 0) {
		propertyNames.add("1");
		condition.add(">");
		propertyValue.add(0);
	}
	String[] proStr = new String[propertyNames.size()];
	propertyNames.toArray(proStr);

	String[] condStr = new String[condition.size()];
	condition.toArray(condStr);

	Object[] proObj = new Object[propertyValue.size()];
	propertyValue.toArray(proObj);
	Criterion[] criterions = createCriterion(proStr, condStr,
			proObj);
	// hibernateDAO.getSessionFactory().getCurrentSession().close();
	return criterions;
}



/**分页的sql查询
 * @param totalCount
 * @param sql
 * @param pageSize
 * @param startIndex
 * @param parameters
 * @return
 */
public Page findPageBySql(final int totalCount, final String sql,
		final int pageSize, final int startIndex, final Object[] parameters) {
	if (totalCount < 1)
		return new Page(new ArrayList(0), 0);
	else
		return (Page) getHibernateTemplate().execute(
				new HibernateCallback() {

					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {
						SQLQuery query = session.createSQLQuery(sql);
						for (int i = 0; i < parameters.length; i++) {
							query.setParameter(i, parameters[i]);

						}
						List items = query.setFirstResult(startIndex)
								.setMaxResults(pageSize).list();
						Page ps = new Page(items, totalCount, pageSize,
								startIndex);
						return ps;
					}
				});
}
/**获取记录条数
 * @param sql
 * @param param
 * @return
 */
public int getCountBySql(String sql, Object[] param) {
	String countQueryString ="select count(*) from (" +removeOrders(sql)+") CC";
	/*String countQueryString = (new StringBuilder(" select count (*) "))
			.append(removeSelect(removeOrders(sql))).toString();*/
	BigDecimal b = (BigDecimal) queryByNativeSql(
			countQueryString, param).get(0);
	return b.intValue();
}
}


