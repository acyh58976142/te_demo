package com.hr.td.util;

import com.hr.td.util.PropertiesConfig;

/**
 * SQL分页封装
 */
public class SqlPage
{
	private String dbType;
	
	public SqlPage()
	{
		dbType = PropertiesConfig.getInstance().getProperty("dbType");
	}
	
	public String getPageSql(String querySelect, int offset, int limit)
	{
		if(dbType.toLowerCase().equals("sqlserver2008"))
		{
			return sqlserver2008PageSql(querySelect,offset,limit);
		}
		throw new RuntimeException("当前数据库没有开发对应的分页sql");
	}
	public static void main(String[] args)
	{
		SqlPage page = new SqlPage();
		System.out.println(page.getPageSql("select username,realname from JD_User  order by UserId", 0, 3));
	}
	/**
	 * sqlserver2008分页查询
	 * @param querySelect sql
	 * @param offset 起始index ，从0�?�?
	 * @param limit 结束index，从1�?�?
	 * @return
	 */
	private String sqlserver2008PageSql(String querySelect, int offset, int limit)
	{
		int lastIndexOfOrderBy = getLastIndexOfOrderBy(querySelect);
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
	private static int getLastIndexOfOrderBy(String sql)
	{
		return sql.toLowerCase().lastIndexOf("order by ");
	}
}