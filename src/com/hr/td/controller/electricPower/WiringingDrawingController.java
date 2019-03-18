package com.hr.td.controller.electricPower;

import java.io.File;
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
import com.hr.td.entity.Attachment;
import com.hr.td.entity.MainInfo;
import com.hr.td.entity.RouteInfo;
import com.hr.td.service.electricPower.IWiringingDrawingService;
import com.hr.td.service.tower.ITowerService;
import com.hr.td.util.DynamicsFeatures;
import com.hr.td.util.PropertiesConfig;
import com.hr.td.util.TAUtil;
import com.hr.td.util.ToolsUtil;
import com.hr.td.util.TowerUtil;
import com.hr.td.util.wiringDrawing.Calculate;
import com.hr.td.util.wiringDrawing.parameter.CounductorData;
import com.hr.td.util.wiringDrawing.parameter.WeatherConditions;
import com.hr.td.util.wiringDrawing.vo.InputConditionData;
import com.hr.td.util.wiringDrawing.vo.OutputOSagTable;

@Controller
@RequestMapping(value = "/wiringDrawing")
public class WiringingDrawingController {
	@Autowired
	public IBaseDao baseDao;
	@Autowired
	public IWiringingDrawingService drawingService;
	
	@Autowired
	public ITowerService towerService;
	/**
	* @Title: getInitData
	* @Description: 获取初始化数据
	 */
	@RequestMapping(value = "/getInitData.action")
	@ResponseBody
	public Map<String, Object> getInitData(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		Map<String, Object> entryContition = drawingService.getEntryCondition();
		result.put("entryContition", entryContition);
		return result;
	}
	
	
	/**
	* @Title: getContinuityWireway
	* @Description: 获取连续档导线数据
	 */
	@RequestMapping(value = "/getContinuityWireway.action")
	@ResponseBody
	public Map<String, Object> getContinuityWireway(HttpServletRequest request,String id) {
		Map<String, Object> result = new HashMap<String, Object>();
		
		List<Attachment> attachments = towerService.getAttachment(id);
		
		RouteInfo route = towerService.getRouteInfo(id);
//		List<String>  wires= 
		String rootPath = PropertiesConfig.getInstance().getProperty("upload_store_root");
		Map<String, Object> map = drawingService.getWireType(attachments,route,rootPath,1);
//		
		return map;
	}
	
	/**
	* @Title: getStandardSeriesByParam  
	* @Description: 孤立档配置与计算
	 */
	@RequestMapping(value = "/getStandardSeriesByParam.action")
	@ResponseBody
	public Map<String, Object> getStandardSeriesByParam(HttpServletRequest request,@RequestBody Map<String,Object> param) {
		Map<String, Object> result = new HashMap<String, Object>();
		List<Map<String, Object>> standardList = drawingService.getStandardSeriesByParam(param);
		result.put("standardList", standardList);
		return result;
	}
	/**
	* @Title: executeIsolatedSpan  
	* @Description: 孤立档配置与计算
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/executeIsolatedSpan.action")
	@ResponseBody
	public Map<String, Object> executeIsolatedSpan(HttpServletRequest request,@RequestBody Map<String,Object> param) {
		Map<String, Object> result = new HashMap<String, Object>();
		List<Map<String, Object>> inputConditionList = (List<Map<String, Object>>) param.get("inputConditionData");
		List<Map<String, Object>> weatherConditionsList = (List<Map<String, Object>>) param.get("weatherConditions");
		List<OutputOSagTable> ostArray = new ArrayList<OutputOSagTable>();
		int lineType =0;
		double wireway_cc_fm_j =0;
		double wireway_cc_fm_k =0;
		
		for (int i = 0; i < inputConditionList.size(); i++) {
			InputConditionData iData = new InputConditionData();
			
			CounductorData cData =  new CounductorData();
			ToolsUtil.mapToObject(inputConditionList.get(i), iData);
			lineType = iData.getLineType();
			List<Map<String, Object>> conductorList =  drawingService.groundWireParam(iData.getWireType()); 
			cData.setE(Double.parseDouble(conductorList.get(0).get("modulus_elasticity").toString()));
			cData.setA(Double.parseDouble(conductorList.get(0).get("tem_exp_coefficient").toString()));
			cData.setW(Double.parseDouble(conductorList.get(0).get("unit_weight").toString()));
			cData.setD(Double.parseDouble(conductorList.get(0).get("diameter").toString()));
			cData.setS(Double.parseDouble(conductorList.get(0).get("cross_section_area").toString()));
			cData.setTp(Double.parseDouble(conductorList.get(0).get("breaking_force").toString()));
			ToolsUtil.mapToObject(conductorList.get(0), cData);
			List<Map<String, Object>> weatherCondition = (List<Map<String, Object>>) weatherConditionsList.get(i);
			List<WeatherConditions> paramArray = new ArrayList<WeatherConditions>();
			for (int j = 0; j < weatherCondition.size(); j++) {
				WeatherConditions conditions = new WeatherConditions();
				ToolsUtil.mapToObject(weatherCondition.get(j),conditions);
				paramArray.add(conditions);
			}
			if(lineType == 1)
			{
				iData.setWireway_cc_fm_j(wireway_cc_fm_j);
				iData.setWireway_cc_fm_k(wireway_cc_fm_k);
			}
			List<OutputOSagTable> listsOOST = Calculate.getOutputOSagTableArray(iData, cData, paramArray);
			ostArray.addAll(listsOOST);
			if(lineType == 0)
			{
				wireway_cc_fm_j =listsOOST.get(0).getWireway_cc_fm_j();
				wireway_cc_fm_k =  listsOOST.get(0).getWireway_cc_fm_k();
			}
		}
		result.put("ostArray", ostArray);
		return result;
	}
	
	
	
	
	/**
	* @Title: getDrawingNum  
	* @Description: 获取连续档的图号
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/getDrawingNum.action")
	@ResponseBody
	public Map<String, Object> getDrawingNum(HttpServletRequest request,@RequestBody Map<String,Object> param) {
		Map<String, Object> result = new HashMap<String, Object>();
		List<Map<String, Object>> ground_WireList = (List<Map<String, Object>>) param.get("ground_Wire");
		List<Map<String, Object>> wirewayList = (List<Map<String, Object>>) param.get("wireway");
		 result =  drawingService.getDrawingNum(ground_WireList, wirewayList);
		 
		return result;
	}
	/**
	* @Title: saveResult  
	* @Description: 保存导线力学计算结果
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/saveResult.action")
	@ResponseBody
	public Map<String, Object> saveResult(HttpServletRequest request,@RequestBody Map<String,Object> param) {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		Map<String, Object> result = new HashMap<String, Object>();
		Map<String,String> baseParam = (Map<String, String>) param.get("baseParam");
		Map<String,String> wirewayParam = (Map<String, String>) param.get("wirewayParam");
		List<Map<String,String>> weatherConditions = (List<Map<String, String>>) param.get("weatherConditions");
		List<Double> steps = new ArrayList<Double>();
		List<Object> t =  (List<Object>) param.get("steps");
		for (int i = 0; i < t.size(); i++) {
			steps.add(Double.valueOf(t.get(i).toString()));
		}
		paramMap = DynamicsFeatures.initLoad(baseParam,wirewayParam,weatherConditions,steps);
		boolean bool = drawingService.updateMechanicsProperty(baseParam,wirewayParam,weatherConditions,paramMap);
		result.put("result", bool);
		return result;
	}
	/**
	 * 根据主键获取工程实体
	 */
	public MainInfo getMainInfo(String id) {
		MainInfo main =(MainInfo) baseDao.getEntity(MainInfo.class, id);
		return main;
	}
	/**
	* @Title: getConductorParam
	* @Description: 获取导线参数
	 */
	@RequestMapping(value = "/getConductorParam.action")
	@ResponseBody
	public Map<String, Object> getConductorParam(HttpServletRequest request,String param) {
		Map<String, Object> result = new HashMap<String, Object>();
		List<Map<String, Object>> conductorParam = drawingService.groundWireParam(param);
		result.put("conductorParam", conductorParam);
		return result;
	}
}
