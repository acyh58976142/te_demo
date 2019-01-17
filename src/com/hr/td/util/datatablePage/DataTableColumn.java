package com.hr.td.util.datatablePage;

import java.util.regex.Pattern;


/**
 * columns 实体
 * @author 
 * @date 2014-12-30
 */
public class DataTableColumn {

	private String name;
	private String searchValue;
	
	public static final Pattern COLUMN_NAME_PATTERN = Pattern.compile("columns\\[(\\d+)\\]\\[name\\]");
	

	public static final DataTableColumn createInstance(String name,String searchValue) {
		DataTableColumn instance = new DataTableColumn();
		instance.name = name;
		instance.searchValue = searchValue;
		return instance;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSearchValue() {
		return searchValue;
	}

	public void setSearchValue(String searchValue) {
		this.searchValue = searchValue;
	}

 
}


