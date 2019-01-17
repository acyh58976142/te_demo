package com.hr.td.upload;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.fileupload.FileItem;

/**
 * 上传文档处理接口
 */
public interface Uploadprocessor
{
	/**
	 * 处理过程
	 * @param uploadFile
	 * @param others
	 * @return
	 */
	public Map<String, Object> process(FileItem uploadFile,Map<String, Object> others);
	/**
	 * 是否接受处理
	 * @param bizType
	 * @return
	 */
	public boolean accept(String bizType);
	
}
