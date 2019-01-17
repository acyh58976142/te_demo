
package com.hr.td.util;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.WebApplicationContextUtils;

/**
 * 扩展spring的ContextLoaderListener
 */
public class ExtendContextLoaderListener extends ContextLoaderListener
{
	
	@Override
	public void contextInitialized(ServletContextEvent event)
	{
		super.contextInitialized(event);
		ServletContext servletContext = event.getServletContext();
		ApplicationContext applicationContext = WebApplicationContextUtils.getWebApplicationContext(servletContext);
		ContextUtil.setApplicationContext(applicationContext);
		//加载config.properties文件
		PropertiesConfig.getInstance();
	}
}
