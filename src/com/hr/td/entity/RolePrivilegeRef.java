package com.hr.td.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 角色菜单关联表
 * 
 * @author yw
 *
 */
@Entity
@Table(name = "sys_role_privilege_ref")
public class RolePrivilegeRef {
	private String ref_id;// 主键ID
	private String role_id;// 角色ID
	private String privilege_id;// 权限ID

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

	@Column(name = "privilege_id")
	public String getPrivilege_id() {
		return privilege_id;
	}

	public void setPrivilege_id(String privilege_id) {
		this.privilege_id = privilege_id;
	}

}
