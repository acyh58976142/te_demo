package com.hr.td.controller.geology;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.hr.td.entity.Attachment;
import com.hr.td.entity.GeologicalSchedule;
import com.hr.td.service.geology.IGeologyService;
import com.hr.td.service.tower.ITowerService;
import com.hr.td.util.DataTablePage;
import com.hr.td.util.PropertiesConfig;
import com.hr.td.util.TAUtil;
import com.hr.td.util.ToolsUtil;
import com.nari.slsd.hd.util.CommonTool;


/**
 * 地质
 * @author cyh
 *
 */
@Controller
@RequestMapping(value = "/geology")
public class GeologyController {
	@Autowired
	protected IGeologyService iGeologyService;//地质明细表接口
	
	@Autowired
	private ITowerService towerService;// 杆塔明细的接口
	
	/**
	 *  查询地层名称和配置表ID
	 */
	@RequestMapping(value = "queryStratigraphicName.action")
	@ResponseBody
	public Map<String, Object> queryStratigraphicName(){
		List<Map<String, Object>> geologicalScheduleConfigure = iGeologyService.queryStratigraphicName();
		System.out.println(geologicalScheduleConfigure);
		Map<String, Object> map = new HashMap<>();
		if (geologicalScheduleConfigure!=null) {
			map.put("geologicalScheduleConfigure", geologicalScheduleConfigure);
		}
		return map;
	}
	
	/**
	 *  根据地层名称的value（ID）查询对应的岩土物理力学指标
	 *  @param HttpServletRequest request
	 */
	@RequestMapping(value = "queryNormByID.action")
	@ResponseBody
	public List<String> queryNormByID(HttpServletRequest request){
		String ID = request.getParameter("ID");
		List<String> list = iGeologyService.queryNormByID(ID);
		return list;
	}
		
	/**
	 * 分页查询地质数据
	 * @param request
	 * @param page
	 * @param projectId
	 * @return
	 */
	@RequestMapping(value = "getSchedulePage.action")
	@ResponseBody
	public Map<String, Object> getSchedulePage(HttpServletRequest request, DataTablePage page,String projectId) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("pageSize", page.getLength());
		map.put("startIndex", page.getStart());
		map.put("projectId",projectId);
		try {
			List<Map<String, Object>> RelationList = iGeologyService.getSchedulePage(map);
			if (!ToolsUtil.isEmpty(RelationList)) {
				return page.toReturnMap(RelationList, iGeologyService.getScheduleCount(map));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return page.toReturnMap(new ArrayList<Object>(), 0);
	} 
	
	@RequestMapping(value = "getSchedulePage2.action")
	@ResponseBody
	public Map<String, Object> getSchedulePage2(HttpServletRequest request, DataTablePage page,String projectId) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("projectId",projectId);
		try {
			List<GeologicalSchedule> RelationList = iGeologyService.getScheduleList(map);
			if (!ToolsUtil.isEmpty(RelationList)) {
				return page.toReturnMap(RelationList, RelationList.size());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return page.toReturnMap(new ArrayList<Object>(), 0);
	} 
	
	/**
	 * 保存所有列表数据
	 * @param HttpServletRequest request
	 * @throws 
	 */
	@RequestMapping(value = "save.action")
	@ResponseBody
	public int saveGeology(HttpServletRequest request,@RequestParam(value ="param") String param){
		Map<String, Object> map=(Map<String, Object>) ToolsUtil.strToJson(param, Map.class);
		List<Map<String, Object>> dataList = (List) map.get("list");
		List<GeologicalSchedule> geologicalScheduleList = new ArrayList<GeologicalSchedule>();
		if(!ToolsUtil.isEmpty(dataList)){
			for(int i = 0; i< dataList.size();i++){
				GeologicalSchedule geologicalSchedule = new GeologicalSchedule();
				Map<String, Object> scheduleMap=dataList.get(i);
				if(ToolsUtil.isEmpty(formatData(scheduleMap.get("id")))){
					geologicalSchedule.setId(CommonTool.createUUID());
				}
				else{
					geologicalSchedule.setId(formatData(scheduleMap.get("id")));
				}
				geologicalSchedule.setMid(null);
				geologicalSchedule.setTowerNum(formatData(scheduleMap.get("towerNum")));
				geologicalSchedule.setTowerLocation(formatData(scheduleMap.get("towerLocation")));
				geologicalSchedule.setExplorationBasis(formatData(scheduleMap.get("explorationBasis")));
				geologicalSchedule.setStratigraphicName(formatData(scheduleMap.get("stratigraphicName")));
				geologicalSchedule.setFloorDepth(formatData(scheduleMap.get("floorDepth")));
				geologicalSchedule.setGeotechnicalDescription(formatData(scheduleMap.get("geotechnicalDescription")));
				geologicalSchedule.setGravityDensity(formatData(scheduleMap.get("gravityDensity")));
				geologicalSchedule.setCohesion(formatData(scheduleMap.get("cohesion")));
				geologicalSchedule.setInternalFrictionAngle(formatData(scheduleMap.get("internalFrictionAngle")));
				geologicalSchedule.setEigenvalueCapacity(formatData(scheduleMap.get("eigenvalueCapacity")));
				geologicalSchedule.setStandardSideResistance(formatData(scheduleMap.get("standardSideResistance")));
				geologicalSchedule.setStandardEndResistance(formatData(scheduleMap.get("standardEndResistance")));
				geologicalSchedule.setIllustrate(formatData(scheduleMap.get("illustrate")));
				geologicalSchedule.setRemark(formatData(scheduleMap.get("remark")));
				geologicalSchedule.setSurveyPointLocation(formatData(scheduleMap.get("surveyPointLocation")));
				geologicalSchedule.setWaterLevel(formatData(scheduleMap.get("waterLevel")));
				geologicalSchedule.setResistivity(formatData(scheduleMap.get("resistivity")));
				geologicalSchedule.setStratigraphicState(formatData(scheduleMap.get("stratigraphicState")));
				geologicalSchedule.setSortno(formatData(scheduleMap.get("sortno")));
				geologicalSchedule.setProjectId(formatData(scheduleMap.get("projectId")));
				geologicalScheduleList.add(geologicalSchedule);
			}
		}
		int result=0;
		if(map.get("type").equals("add")){//新增
			//返回前台不为空或不为0，则查询成功
			 result  =iGeologyService.addAllGeological(geologicalScheduleList);
		}
		if(map.get("type").equals("update")){//编辑
			//返回前台不为空或不为0，则查询成功
			result  =iGeologyService.updateAllEditGeological(geologicalScheduleList);
		}
		
		return result;
	}
	
	/**
	 * 处理data
	 * @param data
	 * @return
	 */
	public String formatData(Object data){
		if(ToolsUtil.isEmpty(data)){
			return "";
		}
		return data.toString();
	}

	/**
	 *  根据主键id删除一条geologicalSchedule信息
	 *  @param HttpServletRequest request
	 */
	@RequestMapping(value = "deleteEditGeological.action")
	@ResponseBody
	public int deleteEditGeological(HttpServletRequest request){
	    String id = request.getParameter("ID");	
	    int result = iGeologyService.deleteEditGeological(id);
	    return result;
	}
	
	/**
	 * 从文件里获取杆塔编号数据
	 * @param HttpServletRequest request
	 */
	@RequestMapping(value = "findTowerNum.action")
	@ResponseBody
	public List<String> findTowerNum(String id,HttpServletRequest request){
		List<Attachment> attachList = towerService.getAttachment(id);
		// 获得文件要存储的根目录的磁盘路径
		String rootPath = PropertiesConfig.getInstance().getProperty("upload_store_root");
		List<File> list = new ArrayList<File>();
		for (int i = 0; i < attachList.size(); i++) {
			Attachment attach = attachList.get(i);
			String path = attach.getFilePath();// TA文件保存路径
			File file = new File(rootPath + path);
			list.add(file);
		}
		List<List<List<String>>> towerDetailList = TAUtil.readTa(list);
//		List<List<String>> towerDetail = TAUtil.getTowerDetailByTa(result.get(0));
		List<String> towerList = new ArrayList<String>();
		for(int m= 0; m < towerDetailList.size(); m++){
			List<List<String>>  towerDetail=towerDetailList.get(m);
		    for (int i = 0; i < towerDetail.size(); i++) {
			     List<String> tower = towerDetail.get(i);
				 String towerNum=tower.get(0);//+"+"+TAUtil.getMileage(tower.get(2));
			     towerList.add(towerNum); // 杆塔编号+塔位里程			
		     }
		}
		return towerList;
	}
	
	@RequestMapping(value="getCountByParam.action")
	@ResponseBody
	public Map<String, Object> getCountByParam(String id){
		Map<String, Object> map=iGeologyService.getGeologicalScheduleInfo(id);
		return map;
	}
	
	
	/**
	* @Title: importExcel  
	* @Description: 项目资料数据导入,即excel转list数据
	* @param file
	* @param request
	* @param response
	* @return
	* @throws IOException
	 */
	@RequestMapping(value = "/importExcel.action")
	@ResponseBody
	public Map<String, Object> importExcel(@RequestParam(value="filename") MultipartFile file,String id,HttpServletRequest request,HttpServletResponse response) throws IOException {
		long fileSize = file.getSize();
		long maxSize = 5400000;
		long limitSize = maxSize / 1024 / 1024;
		// 定义一个用于返回的json对象
		Map<String, Object> result = new HashMap<String, Object>();
		String fileName = file.getOriginalFilename();
		// 取文件最后一个.后面的文件名
		String fileType = fileName.substring(fileName.lastIndexOf(".") + 1);
		// 判断文件类型，如果不是excel，直接返回错误信息
		if (fileType.toUpperCase().toString().equals("XLS") || fileType.toUpperCase().toString().equals("XLSX")) {
			// 如果上传文件超过规定大小，则返回出错信息
			if (fileSize <= maxSize) {
				List<Map<String, Object>> excelList = iGeologyService.importExcel(fileName, file,id);
				
				if(!ToolsUtil.isEmpty(excelList)){
					Map<String, Object> map = excelList.get(0);
					// 如果包含出错信息，且出错信息不为空，就返回错误信息
					if (map.containsKey("errorMessage")) {
						String errorMessage = formatData(map.get("errorMessage"));
						if (!ToolsUtil.isEmpty(errorMessage)) {
							result.put("errorMessage", errorMessage);
						}						
					} 
					// 存入数据库错误
					if (map.containsKey("errorDataMessage")) {
						String errorMessage = formatData(map.get("errorDataMessage"));
						if (!ToolsUtil.isEmpty(errorMessage)) {
							result.put("errorMessage", errorMessage);
						}						
					}
					//成功存入数据库
					if (map.containsKey("total")) {
						String totalInsert = formatData(map.get("total"));
						result.put("total", totalInsert);
					}					
				}
				
			} else {
				result.put("errorType", "上传文件大小超过限制,请上传小于" + limitSize + "MB的文件！");
			}
		} else {
			result.put("errorType", "文件类型不正确，请重新上传！");
		}

		return result;
	}
	
	/**
	 * 分页查询地质参数
	 * @param request
	 * @param page
	 * @param projectId
	 * @return
	 */
	@RequestMapping(value = "getConfigurePage.action")
	@ResponseBody
	public Map<String, Object> getConfigurePage(HttpServletRequest request, DataTablePage page,String stratigraphicName,String stratigraphicState) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("pageSize", page.getLength());
		map.put("startIndex", page.getStart());
		map.put("stratigraphicName", stratigraphicName);
		map.put("stratigraphicState", stratigraphicState);
		try {
			List<Map<String, Object>> RelationList = iGeologyService.getConfigurePage(map);
			if (!ToolsUtil.isEmpty(RelationList)) {
				return page.toReturnMap(RelationList, iGeologyService.getConfigureCount(map));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return page.toReturnMap(new ArrayList<Object>(), 0);
	}
	
	/**
	 * 保存地质参数信息
	 * @param HttpServletRequest request
	 * @throws 
	 */
	@RequestMapping(value = "saveGeologyConfigure.action")
	@ResponseBody
	public Map<String, Object> saveGeologyConfigure(HttpServletRequest request,@RequestParam(value ="param") String param){
		Map<String, String> map=(Map<String, String>) ToolsUtil.strToJson(param, Map.class);
		Map<String, Object> returnMap=new HashMap<String, Object>();
		int index=0;
		if(!ToolsUtil.isEmpty(map.get("id"))){
			 index=iGeologyService.updateConfigure(map);
		}
		else{
			index=iGeologyService.addConfigure(map);
		}
		
		if(index>0){
			returnMap.put("code", "200");
		}
		else{
			returnMap.put("code", "300");
		}
		return returnMap;
	}
	
	/**
	 * 删除参数信息
	 * @param HttpServletRequest request
	 * @throws 
	 */
	@RequestMapping(value = "deleteConfigure.action")
	@ResponseBody
	public Map<String, Object> deleteConfigure(HttpServletRequest request,@RequestParam(value ="id") String id){
		Map<String, Object> returnMap=new HashMap<String, Object>();
		int index=iGeologyService.deleteConfigure(id);
		
		if(index>0){
			returnMap.put("code", "200");
		}
		else{
			returnMap.put("code", "300");
		}
		return returnMap;
	}
}
