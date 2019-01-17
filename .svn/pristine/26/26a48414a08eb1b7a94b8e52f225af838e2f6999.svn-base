package com.hr.td.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/** 
* @ClassName: SysOrgInfo 
* @Description: 单位组织
* @author 
* 
*/
@Entity
@Table(name = "sys_org_info")
public class SysOrgInfo {
	
	private String org_no;         //单位编号
	private String org_name;       //单位名称
	private String parent_no;      //上级单位
	private String org_address;    //地址
	private String org_telephone;  //电话
	private String area_code;      //区域编码
	private String is_valid;       //是否生效
	
	@Id
	@Column(name = "org_no")
	public String getOrg_no() {
		return org_no;
	}
	public void setOrg_no(String org_no) {
		this.org_no = org_no;
	}
	
	@Column(name = "org_name")
	public String getOrg_name() {
		return org_name;
	}
	public void setOrg_name(String org_name) {
		this.org_name = org_name;
	}
	
	@Column(name = "parent_no")
	public String getParent_no() {
		return parent_no;
	}
	public void setParent_no(String parent_no) {
		this.parent_no = parent_no;
	}
	
	@Column(name = "is_valid")
	public String getIs_valid() {
		return is_valid;
	}
	public void setIs_valid(String is_valid) {
		this.is_valid = is_valid;
	}
	
	@Column(name = "org_address")
	public String getOrg_address() {
		return org_address;
	}
	public void setOrg_address(String org_address) {
		this.org_address = org_address;
	}
	
	@Column(name = "org_telephone")
	public String getOrg_telephone() {
		return org_telephone;
	}
	public void setOrg_telephone(String org_telephone) {
		this.org_telephone = org_telephone;
	}
	
	@Column(name = "area_code")
	public String getArea_code() {
		return area_code;
	}
	public void setArea_code(String area_code) {
		this.area_code = area_code;
	}
	
	

}
