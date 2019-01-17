package com.hr.td.util;
import java.sql.Types;

import org.hibernate.Hibernate;
import org.hibernate.dialect.SQLServerDialect;

/**
 * A dialect for Microsoft SQL Server 2008 with JDBC Driver 3.0 and above
 */
public class SQLServer2008Dialect extends SQLServerDialect
{
	public SQLServer2008Dialect()
	{
		super();
		registerHibernateType(1, "string");
		registerHibernateType(-9, "string");
		registerHibernateType(-16, "string");
		registerHibernateType(3, "double");
		registerHibernateType(-15, "string");

		registerHibernateType(Types.NCHAR, Hibernate.STRING.getName());
		registerColumnType(Types.DATE, "date");
		registerColumnType(Types.TIME, "time");
		registerColumnType(Types.TIMESTAMP, "datetime2");
	}
	   static int getLastIndexOfOrderBy(String sql){
	         return sql.toLowerCase().lastIndexOf("order by ");
	     }
	public String getLimitString(String querySelect, int offset, int limit)
	{
		int lastIndexOfOrderBy = getLastIndexOfOrderBy(querySelect);
		// �?没有 order by 或第�?页的情况�?
		if(lastIndexOfOrderBy < 0 || querySelect.endsWith(")") || offset == 0)
			return super.getLimitString(querySelect, 0, limit);
		else
		{
			// 取出 order by 语句
			String orderby = querySelect.substring(lastIndexOfOrderBy, querySelect.length());
			// 取出 from 前的内容
			int indexOfFrom = querySelect.toLowerCase().indexOf("from");
			String selectFld = querySelect.substring(0, indexOfFrom);
			// 取出 from 语句后的内容
			String selectFromTableAndWhere = querySelect.substring(indexOfFrom, lastIndexOfOrderBy);
			StringBuffer sql = new StringBuffer(querySelect.length() + 100);
			sql.append("select * from (").append(selectFld).append(",ROW_NUMBER() OVER(").append(orderby).append(") as _page_row_num_hb ").append(selectFromTableAndWhere)
					.append(" ) temp ").append(" where  _page_row_num_hb BETWEEN  ").append(offset + 1).append(" and ").append(limit);
			return sql.toString();
		}
	}
    //使offset 参数生效
    public boolean supportsLimitOffset(){
         return true;
     }
}
