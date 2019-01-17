package com.hr.td.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 菜单信息表
 * 
 * @author yw
 *
 */
@Entity
@Table(name = "sys_privilege_info")
public class PrivilegeInfo {
	private String func_id;// 功能id
	private String name;// 功能名称
	private String func_type;// 0:按钮 1：1级 2：2级 3：3级
	private String url;// URL地址
	private String parent_func;// 上级功能
	private String func_code;// 功能代码
	private String func_level;// 级别
	private String sort_no;// 排序
	private String func_icon;// 图标
	private String isPhone;//是否是手机端（1：web 2:手机）
	private String locationType;//是否是首页（1：顶部，2：菜单 ，3：首页）
	
	@Id
	@Column(name = "func_id")
	public String getFunc_id() {
		return func_id;
	}

	public void setFunc_id(String func_id) {
		this.func_id = func_id;
	}

	@Column(name = "name")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "func_type")
	public String getFunc_type() {
		return func_type;
	}

	public void setFunc_type(String func_type) {
		this.func_type = func_type;
	}

	@Column(name = "url")
	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	@Column(name = "parent_func")
	public String getParent_func() {
		return parent_func;
	}

	public void setParent_func(String parent_func) {
		this.parent_func = parent_func;
	}

	@Column(name = "func_code")
	public String getFunc_code() {
		return func_code;
	}

	public void setFunc_code(String func_code) {
		this.func_code = func_code;
	}

	@Column(name = "func_level")
	public String getFunc_level() {
		return func_level;
	}

	public void setFunc_level(String func_level) {
		this.func_level = func_level;
	}

	@Column(name = "sort_no")
	public String getSort_no() {
		return sort_no;
	}

	public void setSort_no(String sort_no) {
		this.sort_no = sort_no;
	}

	@Column(name = "func_icon")
	public String getFunc_icon() {
		return func_icon;
	}

	public void setFunc_icon(String func_icon) {
		this.func_icon = func_icon;
	}
	
	@Column(name = "isPhone")
	public String getIsPhone() {
		return isPhone;
	}

	public void setIsPhone(String isPhone) {
		this.isPhone = isPhone;
	}

	@Column(name = "locationType")
	public String getLocationType() {
		return locationType;
	}

	public void setLocationType(String locationType) {
		this.locationType = locationType;
	}

}
