package com.hr.td.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 角色信息
 * 
 * @author yw
 *
 */
@Entity
@Table(name = "sys_role_info")
public class RoleInfo {
	private String role_id;// 角色id(主键)
	private String role_name;// 角色名称
	private String roledesc;// 角色描述
	private String role_code;// 角色code

	@Id
	@Column(name = "role_id")
	public String getRole_id() {
		return role_id;
	}

	public void setRole_id(String role_id) {
		this.role_id = role_id;
	}

	@Column(name = "role_name")
	public String getRole_name() {
		return role_name;
	}

	public void setRole_name(String role_name) {
		this.role_name = role_name;
	}

	@Column(name = "roledesc")
	public String getRoledesc() {
		return roledesc;
	}

	public void setRoledesc(String roledesc) {
		this.roledesc = roledesc;
	}

	@Column(name = "role_code")
	public String getRole_code() {
		return role_code;
	}

	public void setRole_code(String role_code) {
		this.role_code = role_code;
	}

}
