package com.hr.td.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 用户角色表
 * 
 * @author yw
 *
 */
@Entity
@Table(name = "sys_user_role_ref")
public class UserRole {
	// 主键ID
	private String ref_id;
	// 角色ID
	private String role_id;
	// 用户id
	private String user_id;

	@Id
	@Column(name = "ref_id")
	public String getRef_id() {
		return ref_id;
	}

	public void setRef_id(String ref_id) {
		this.ref_id = ref_id;
	}

	@Column(name = "role_id")
	public String getRole_id() {
		return role_id;
	}

	public void setRole_id(String role_id) {
		this.role_id = role_id;
	}

	@Column(name = "user_id")
	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

}
