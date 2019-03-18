package com.hr.td.controller.common;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hr.td.dao.IBaseDao;
import com.hr.td.entity.MainInfo;
import com.hr.td.entity.Tower;
import com.hr.td.service.common.ICommonService;

@Controller
@RequestMapping(value = "/common")
public class CommonController {
	@Autowired
	public ICommonService commonService;
	@Autowired
	public IBaseDao baseDao;
	
	/**
	 * 根据主键获取工程实体
	 */
	@RequestMapping(value = "/getMainInfoById.action")
	@ResponseBody
	public MainInfo getMainInfoById(String id) {
		MainInfo main =(MainInfo) baseDao.getEntity(MainInfo.class, id);
		return main;
	}
	/**
	 * 根据主键获取他文件实体
	 */
	@RequestMapping(value = "/getTowerInfoById.action")
	@ResponseBody
	public Tower getTowerInfoById(String id) {
		Tower tower =(Tower) baseDao.getEntity(Tower.class, id);
		return tower;
	}
	
	/**
	 * 根据主键获取工程数组
	 */
	@RequestMapping(value = "/getMainInfoList.action")
	@ResponseBody
	public List<MainInfo> getMainInfoList() {
		List<MainInfo> mainList = commonService.getMainInfoList();
		return mainList;
	}
}
