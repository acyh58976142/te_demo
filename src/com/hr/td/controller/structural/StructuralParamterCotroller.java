package com.hr.td.controller.structural;

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

import com.hr.td.entity.StructuralParamter;
import com.hr.td.service.structural.IActingForceRealtionService;
import com.hr.td.service.structural.IStructuralParamterService;
import com.hr.td.util.DataTablePage;
import com.hr.td.util.ToolsUtil;
import com.nari.slsd.hd.util.CommonTool;

/**
 * 结构基础参数信息
 * @author yw
 *
 */
@Controller
@RequestMapping(value="/structural/paramter")
public class StructuralParamterCotroller {

	@Autowired
	private IStructuralParamterService paramterService;//基础参数接口
	
	
    /**
     * 分页查询结构基础参数信息
     * @param request
     * @param page
     * @return
     */
	@RequestMapping(value = "getParamPage.action")
	@ResponseBody
	public Map<String, Object> getParamPage(HttpServletRequest request, DataTablePage page,String geologicalDescription,String towerType,String projectId) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("pageSize", page.getLength());
		map.put("startIndex", page.getStart());
		map.put("geologicalDescription",geologicalDescription);
		map.put("towerType", towerType);
		map.put("projectId", projectId);
		try {
			List<Map<String, Object>> paramList = paramterService.getParamterPage(map);
			if (!ToolsUtil.isEmpty(paramList)) {
				return page.toReturnMap(paramList, paramterService.getParamCount(map));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return page.toReturnMap(new ArrayList<Object>(), 0);
	} 
	
	/**
	 * 根据地质描述、杆塔类型、转角拉压方式查询数据
	 * @param param
	 * @return
	 */
	@RequestMapping(value = "getParamterBydData.action")
	@ResponseBody
	public Map<String, Object> getParamterBydData(String param){
		Map<String, Object> returnmap = new HashMap<String, Object>();
		Map<String, Object> map=(Map<String, Object>) ToolsUtil.strToJson(param, Map.class);
		List<Map<String, Object>> paramList = paramterService.getParamter(map);
	    if(!ToolsUtil.isEmpty(paramList)){
	    	returnmap.put("code", 200);
	    	returnmap.put("list", paramList);
	    }
	    else{
	    	returnmap.put("code", 300);
	    }
		return returnmap;
	}
	
	/**
	 * 添加参数信息
	 * @param request
	 * @param param
	 * @return
	 */
	@RequestMapping(value = "addParamterList.action")
	@ResponseBody
	public Map<String, Object> addParamterList(HttpServletRequest request,String param){
		Map<String, Object> returnmap = new HashMap<String, Object>();
		Map<String, Object> map=(Map<String, Object>) ToolsUtil.strToJson(param, Map.class);
		List<Map<String, String>> dataList = (List) map.get("list");
		List<StructuralParamter> paramList = new ArrayList<StructuralParamter>();
		if(!ToolsUtil.isEmpty(dataList)){
			for(int i=0;i<dataList.size();i++){
				StructuralParamter paramter=new StructuralParamter();
				Map<String, String> pmap=dataList.get(i);
				paramter.setId(CommonTool.createUUID());
				paramter.setGeologicalDescription(pmap.get("geologicalDescription").trim()); 
				paramter.setTowerType(pmap.get("towerType").trim()); 
				paramter.setAngleLY(pmap.get("angleLY").trim());
				paramter.setActingForce(pmap.get("actingForce"));
				paramter.setTowerShaped(pmap.get("towerShaped")); 
				paramter.setCountOnly(pmap.get("countOnly"));
				paramter.setSteelLabel(pmap.get("steelLabel")); 
				paramter.setSoilVolume(pmap.get("soilVolume")); 
				paramter.setSteelQuantity(pmap.get("steelQuantity")); 
				paramter.setEarthBolt(pmap.get("earthBolt"));
				paramter.setBeddingLabel(pmap.get("beddingLabel"));
				paramter.setCushion(pmap.get("cushion"));
				paramter.setBuryingDepth(pmap.get("buryingDepth"));
				paramter.setBaseplateWidth(pmap.get("baseplateWidth")); 
				paramter.setColumnWidth(pmap.get("columnWidth"));
				paramter.setColumnHigh(pmap.get("columnHigh"));
				paramter.setBasicModel(pmap.get("basicModel"));
				paramter.setRemark(pmap.get("remark"));
				paramter.setProjectId(pmap.get("projectId"));
				paramList.add(paramter);
			}
		}
		
		int idNum=paramterService.addParamterAll(paramList);
		if(ToolsUtil.isEmpty(idNum)||idNum==0){
			returnmap.put("code", 300);
			returnmap.put("msg", "添加失败");
		}
		else{
			returnmap.put("code", 200);
			returnmap.put("msg", "添加成功");
		}
		return returnmap;
	}
	
	/**
	 * 修改参数信息
	 * @param request
	 * @param param
	 * @return
	 */
	@RequestMapping(value = "updateParamter.action")
	@ResponseBody
	public Map<String, Object> updateParamter(HttpServletRequest request,String param){
		Map<String, Object> returnmap = new HashMap<String, Object>();
		Map<String, String> map=(Map<String, String>) ToolsUtil.strToJson(param, Map.class);
		int idNum=paramterService.updateParamter(map);
		if(ToolsUtil.isEmpty(idNum)||idNum==0){
			returnmap.put("code", 300);
			returnmap.put("msg", "修改失败");
		}
		else{
			returnmap.put("code", 200);
			returnmap.put("msg", "修改成功");
		}
		return returnmap;
	}
	
	/**
	 * 删除参数信息
	 * @param request
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "deleteParamter.action")
	@ResponseBody
	public Map<String, Object> deleteParamter(HttpServletRequest request,String id){
		Map<String, Object> returnmap = new HashMap<String, Object>();
		int idNum=paramterService.deleteParamter(id);
		if(ToolsUtil.isEmpty(idNum)){
			returnmap.put("code", 300);
		}
		else{
			returnmap.put("code", 200);
		}
		return returnmap;
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
	public Map<String, Object> importExcel(@RequestParam(value="filename") MultipartFile file,String projectId,HttpServletRequest request,HttpServletResponse response) throws IOException {
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
				List<Map<String, Object>> excelList = paramterService.importExcel(fileName, file,projectId);
				
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
}
