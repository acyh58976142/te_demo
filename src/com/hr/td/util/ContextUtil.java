package com.hr.td.util;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.WebApplicationContext;

/**
 * 容器对象工具
 */
public class ContextUtil {
	private static ApplicationContext applicationContext;

	private ContextUtil() {
	}

	public static void setApplicationContext(ApplicationContext applicationContext) {
		ContextUtil.applicationContext = applicationContext;

	}

	public static ApplicationContext getApplicationContext() {
		return applicationContext;
	}

	public static Object getBean(String beanName) {
		return applicationContext.getBean(beanName);
	}

	/**
	 * 获得当前的ServletContext对象
	 * 
	 * @return
	 */
	public static ServletContext getServletContext() {
		WebApplicationContext webContext = (WebApplicationContext) applicationContext;
		return webContext.getServletContext();
	}

	/**
	 * 获得Http访问绝对路径
	 * 
	 * @param request
	 * @return
	 */
	public static String getWebRootUrl(HttpServletRequest request) {
		return request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
				+ request.getContextPath();
	}
}
