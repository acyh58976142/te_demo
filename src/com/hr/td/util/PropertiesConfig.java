package com.hr.td.util;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Properties;

/**
 * 
 * @ClassName: PropertiesConfig
 * @Description: 获取资源文件配置参数
 * @author Merely
 * @date 2017年11月5日 下午8:21:21
 *
 */
public class PropertiesConfig {
	private static PropertiesConfig propertiesConfig;
	private Properties properties;

	private PropertiesConfig() {
		properties = new Properties();
		try {
			String path = Thread.currentThread().getContextClassLoader().getResource("").getPath();
			path = path.substring(1, path.indexOf("classes"));
			// 从路径字符串中取出工程路径
			InputStream inputStream = new FileInputStream(path + "/resource.properties");
			// 支持中文
			BufferedReader bf = new BufferedReader(new InputStreamReader(inputStream));
			properties.load(bf);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	public static PropertiesConfig getInstance() {
		if (propertiesConfig == null) {
			propertiesConfig = new PropertiesConfig();
		}
		return propertiesConfig;
	}

	/**
	 * 根据参数名称获取参数值
	* @Description: TODO
	* @param @param key
	* @param @return
	* @author Merely
	* @throws
	 */
	public String getProperty(String key) {
		return properties.getProperty(key);
	}
}
