package com.hr.td.controller.common;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hr.td.dao.IBaseDao;
import com.hr.td.entity.MainInfo;
import com.hr.td.service.common.ICommonFileService;
import com.hr.td.service.common.ISerialConfigService;
import com.hr.td.util.TxtRead;

@Controller
@RequestMapping(value = "/serialConfig")
public class SerialConfigController {
	@Autowired
	public ICommonFileService fileService;
	@Autowired
	public ISerialConfigService serialConfig;
	@Autowired
	public IBaseDao baseDao;
	/**
	* @Title: getConductorGroup  
	* @Description: 获取初始化数据
	 */
	@RequestMapping(value = "/getInitData.action")
	@ResponseBody
	public Map<String, Object> importExcel(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
//		List<Map<String, Object>> wldesclist = serialConfig.getSerialConfigData();
		//	绝缘子参数
		List<Map<String, Object>> insulatorlist = serialConfig.getInsulatorDetailData();
		//	导线垂直,耐张串
		List<Map<String, Object>> fittinglist = serialConfig.getFittingDetail();
		String path = Thread.currentThread().getContextClassLoader().getResource("").getPath();
		path = path.substring(1, path.indexOf("classes"));// 从路径字符串中取出工程路径
		String dxxhPath = path + "/txtproperties/导线等效规则.txt";
		String dxfxPath = path + "/txtproperties/导线分裂方式.txt";
		String dydjPath = path + "/txtproperties/电压等级.txt";
		List<String[]> dxxhList = TxtRead.readTxt(dxxhPath, ",", "utf-8");
		List<String[]> dxfxList = TxtRead.readTxt(dxfxPath, ",", "utf-8");
		List<String[]> dydjList = TxtRead.readTxt(dydjPath, ",", "utf-8");
		result.put("dxxhList", dxxhList);
		result.put("dxfxList", dxfxList);
		result.put("dydjList", dydjList);
		result.put("insulatorlist", insulatorlist);
		result.put("fittinglist", fittinglist);
		return result;
	}
	
	/**
	 * 根据主键获取工程实体
	 */
	public MainInfo getMainInfo(String id) {
		MainInfo main =(MainInfo) baseDao.getEntity(MainInfo.class, id);
		return main;
	}
	
}
