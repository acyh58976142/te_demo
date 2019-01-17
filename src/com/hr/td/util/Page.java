package com.hr.td.util;
import java.util.List;

/**
 * 分页包装
 */
public class Page
{
	//默认分页大小�?10
	public final static int PAGESIZE = 10;
	private int pageSize = PAGESIZE;
	//返回的记录
	private List<?> items;
	//总数量
	private int totalCount;
	private int[] indexes = new int[0];
	private int startIndex = 0;

	public Page(List<?> items, int totalCount)
	{
		setPageSize(PAGESIZE);
		setTotalCount(totalCount);
		setItems(items);
		setStartIndex(0);
	}

	public Page(List<?> items, int totalCount, int startIndex)
	{
		setPageSize(PAGESIZE);
		setTotalCount(totalCount);
		setItems(items);
		setStartIndex(startIndex);
	}

	public Page(List<?> items, int totalCount, int pageSize, int startIndex)
	{
		setPageSize(pageSize);
		setTotalCount(totalCount);
		setItems(items);
		setStartIndex(startIndex);
	}

	/**
	 * 将页码转换为列表的startIndex，默认PAGESIZE
	 */
	public static int convertFromPageToStartIndex(int pageNo)
	{
		return (pageNo - 1) * PAGESIZE;
	}

	/**
	 * 将页码转换为列表的startIndex
	 */
	public static int convertFromPageToStartIndex(int pageNo, int pageSize)
	{
		return (pageNo - 1) * pageSize;
	}

	public List<?> getItems()
	{
		return items;
	}

	public void setItems(List<?> items)
	{
		this.items = items;
	}

	public int getPageSize()
	{
		return pageSize;
	}

	public void setPageSize(int pageSize)
	{
		this.pageSize = pageSize;
	}

	public int getTotalCount()
	{
		return totalCount;
	}

	/**
	 * 设置数据总数，并计算各页起始位置
	 */
	public void setTotalCount(int totalCount)
	{
		if (totalCount > 0)
		{
			this.totalCount = totalCount;
			// 页数
			int pageCount = totalCount / pageSize;
			// 页数�?1
			if (totalCount % pageSize > 0)
				pageCount++;
			// 创建页数数组
			indexes = new int[pageCount];
			// 记录下每页的�?始记录的index
			for (int i = 0; i < pageCount; i++)
			{
				indexes[i] = pageSize * i;
			}
		}
		else
		{
			this.totalCount = 0;
		}
	}
	public int[] getIndexes()
	{
		return indexes;
	}

	public void setIndexes(int[] indexes)
	{
		this.indexes = indexes;
	}

	public int getStartIndex()
	{
		return startIndex;
	}

	/**
	 * 设置当前起始位置
	 */
	public void setStartIndex(int startIndex)
	{
		if (totalCount <= 0)
			this.startIndex = 0;
		else if (startIndex >= totalCount)
			this.startIndex = indexes[indexes.length - 1];
		else if (startIndex < 0)
			this.startIndex = 0;
		else
		{
			this.startIndex = indexes[startIndex / pageSize];
		}
	}

	/**
	 * 获得下页起始位置
	 */
	public int getNextIndex()
	{
		int nextIndex = getStartIndex() + pageSize;
		if (nextIndex >= totalCount)
			return getStartIndex();
		else
			return nextIndex;
	}

	/**
	 * 获得上页起始位置
	 */
	public int getPreviousIndex()
	{
		int previousIndex = getStartIndex() - pageSize;
		if (previousIndex < 0)
			return 0;
		else
			return previousIndex;
	}

	/**
	 * 取�?�页�?.
	 */
	public long getTotalPageCount()
	{
		if (totalCount % pageSize == 0)
			return totalCount / pageSize;
		else
			return totalCount / pageSize + 1;
	}

	/**
	 * 取该页当前页�?,页码�?1�?�?.
	 */
	public long getCurrentPageNo()
	{
		return startIndex / pageSize + 1;
	}

	/**
	 * 该页是否有下�?�?.
	 */
	public boolean hasNextPage()
	{
		return this.getCurrentPageNo() < this.getTotalPageCount() ;
	}

	/**
	 * 该页是否有上�?�?.
	 */
	public boolean hasPreviousPage()
	{
		return this.getCurrentPageNo() > 1;
	}
}
