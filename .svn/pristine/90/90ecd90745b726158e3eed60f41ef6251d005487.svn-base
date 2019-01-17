package com.hr.td.controller.electricPower;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hr.td.dao.IBaseDao;
import com.hr.td.entity.MainInfo;
import com.hr.td.service.electricPower.IMechanicsPropertyService;
import com.hr.td.util.DynamicsFeatures;

@Controller
@RequestMapping(value = "/mechanicsProperty")
public class MechanicsPropertyController {
	@Autowired
	public IBaseDao baseDao;
	@Autowired
	public IMechanicsPropertyService mechanicsService;
	/**
	* @Title: getInitData
	* @Description: 获取初始化数据
	 */
	@RequestMapping(value = "/getInitData.action")
	@ResponseBody
	public Map<String, Object> getInitData(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		List<Map<String, Object>> wirelist = mechanicsService.groundWireParam();
		result.put("wirelist", wirelist);
		return result;
	}
	
	/**
	* @Title: executeWireProperty  
	* @Description: 导线力学计算
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/executeWireProperty.action")
	@ResponseBody
	public Map<String, Object> executeWireProperty(HttpServletRequest request,@RequestBody Map<String,Object> param) {
		Map<String, Object> result = new HashMap<String, Object>();
		Map<String,String> baseParam = (Map<String, String>) param.get("baseParam");
		Map<String,String> wirewayParam = (Map<String, String>) param.get("wirewayParam");
		List<Map<String,String>> weatherConditions = (List<Map<String, String>>) param.get("weatherConditions");
		List<Double> steps = new ArrayList<Double>();
		List<Object> t =  (List<Object>) param.get("steps");
		for (int i = 0; i < t.size(); i++) {
			steps.add(Double.valueOf(t.get(i).toString()));
		}
		result = DynamicsFeatures.initLoad(baseParam,wirewayParam,weatherConditions,steps);
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
