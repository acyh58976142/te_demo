package com.hr.td.controller.login;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hr.td.entity.UserInfo;
import com.hr.td.service.login.ILoginService;
import com.hr.td.util.ToolsUtil;

/**
 * 登陆
 * @author yw
 *
 */
@Controller
@RequestMapping(value = "/login")
public class LoginController {

	@Autowired
	private ILoginService loginService; //登陆接口

	/**
	 * 登录
	 * @param username 用户名
	 * @param password 密码
	 * @return 返回信息
	 * @throws Exception 异常
	 */
	@RequestMapping(value = "login.action")
	@ResponseBody
	public Map<String, Object> login(String username, String password, HttpServletRequest request) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		UserInfo userInfo = loginService.getUserInfo(username, password);
		try {
			if (!ToolsUtil.isEmpty(userInfo)) {
				HttpSession session = request.getSession();
				session.setAttribute("user", userInfo);
				if (!ToolsUtil.isEmpty(userInfo.getUserId())) {
					if (userInfo.getIsDelete().equals("0")) {
						map.put("code", 200);
						map.put("msg", "登录成功");
					} else {
						map.put("code", 300);
						map.put("msg", "用户已删除");
					}
				}
			} else {
				map.put("code", 300);
				map.put("msg", "用户名或密码错误，登录失败");
			}
		} catch (Exception e) {
			map.put("code", 300);
			map.put("msg", "服务器异常");
			e.printStackTrace();
		}
		return map;
	}

	/**
	 * 注销
	 * 
	 * @param session
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "loginOut.action")
	public String loginOut(HttpSession session) throws Exception {
		session.removeAttribute("usermap");
		return "/login/login";
	}
    
	/**
	 * 获取菜单
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "getMenuByUser.action")
	@ResponseBody
	public Map<String, Object> getFunctionByuser(HttpServletRequest request) {
		HttpSession session = request.getSession();
		UserInfo user = session.getAttribute("user") != null ? (UserInfo) session.getAttribute("user") : null;
		Map<String, Object> map = new HashMap<String, Object>();
		if (!ToolsUtil.isEmpty(user)) {
			String userId = user.getUserId();
			List<Map<String, Object>> list = loginService.getMenu(userId);
			map.put("flag", "success");
			map.put("list", list);

		} else {
			map.put("flag", "error");
		}

		return map;
	}

	/**
	 * 修改用户密码
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "updateUserPwd.action")
	@ResponseBody
	public Map<String, Object> updateUserPwd(HttpServletRequest request, String newPwd, String oldPwd) {
		Map<String, Object> resultMap = null;
		HttpSession session = request.getSession();
		UserInfo user = session.getAttribute("user") != null ? (UserInfo) session.getAttribute("user") : null;
		if (!ToolsUtil.isEmpty(user)) {
			String userId = user.getUserId();
			// 修改密码操作
			resultMap = loginService.updateUserPwd(userId, oldPwd, newPwd);

		}
		return resultMap;
	}

	/**
	 * 验证用户密码
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "validateUserPwd.action")
	@ResponseBody
	public Object validateUserPwd(HttpServletRequest request, String oldPwd,String newPwd,String flag) {
		boolean result = false;
		HttpSession session = request.getSession();
		UserInfo user = session.getAttribute("user") != null ? (UserInfo) session.getAttribute("user") : null;
		if (!ToolsUtil.isEmpty(user)) {
			String password = user.getPassword();
			//验证原来的密码
			if("validate_oldPwd".equals(flag)) {
				// 验证密码是否错误(用于插件验证)
				if (password.equals(oldPwd)) {
					result = true;
				}
			}else {
				//验证新密码是否与旧密码重复
				if (!password.equals(newPwd)) {
					result = true;
				}
			}
			
		}
		return result;
	}
}
