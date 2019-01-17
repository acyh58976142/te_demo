package com.hr.td.service.systemManage;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import com.hr.td.util.Page;

/** 
* @ClassName: IUserManageService 
* @Description: 用户信息管理
* @author yw
* 
*/
public interface IUserManageService {
	/**
	 * 分页查询人员信息
	 * @param map
	 * @return
	 */
	public Page queryUserManageList(Map<String,Object> map,int total);
	
	/**
	 * 查询人员信息数量
	 * 
	 */
	public int queryUserManageCount(Map<String,Object> map);

	/** 
	* @Title: saveUserInfo 
	* @Description: 新增人员信息
	* @param paramMap
	* @return  参数说明 
	* @throws 
	*/
	public Serializable saveUserInfo(Map<String, Object> paramMap);


	/** 
	* @Title: updateUserInfo 
	* @Description: 编辑人员信息
	* @param UserManage
	* @return  参数说明 
	* @throws 
	*/
	public boolean updateUserInfo(Map<String, Object> map);
	
	/**
	 * 
	* @Title: deleteUserInfo 
	* @Description: 删除人员信息
	* @param user_id
	* @return  参数说明 
	* @throws
	 */
	public boolean deleteUserInfo(String user_id);

	/** 
	* @Title: getOrgInfoList 
	* @Description: 获取单位信息
	* @param map
	* @return  参数说明 
	* @throws 
	*/
	public List<Map<String, Object>> getOrgInfoList(Map<String, Object> map);

	/** 
	* @Title: getUserNoList 
	* @Description:用户编码
	* @param paramMap
	* @return  参数说明 
	* @throws 
	*/
	public List<Map<String, Object>> getUserNoList(Map<String, Object> paramMap);
	
	/**
	 * 员工账号唯一性验证
	 * @Title:checkLoginuser
	 * @param map
	 * @return  参数说明 
	 * @throws 
	 */
	 public boolean	checkLoginuser(Map<String,Object> map);

}
