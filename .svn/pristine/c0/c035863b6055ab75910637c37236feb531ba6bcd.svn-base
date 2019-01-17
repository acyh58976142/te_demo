package com.hr.td.service.login;

import java.util.List;
import java.util.Map;

import com.hr.td.entity.UserInfo;

public interface ILoginService {

	/**
	 * 根据用户名和密码获取用户信息
	 * @param name 用户名
	 * @param password 密码
	 * @return
	 */
	public UserInfo getUserInfo(String name,String password);
	
	/**
	 * 根据用户id获取菜单
	 * @param userId
	 * @return
	 */
	public List<Map<String,Object>> getMenu(String userId);
	
	/**
	 * 根据用户名和密码获取用户信息
	 * @param name 用户名
	 * @param password 密码
	 * @return
	 */
	public Map<String, Object> updateUserPwd(String userId, String oldPwd, String newPwd);
}
