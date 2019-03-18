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

import com.hr.td.service.structural.IActingForceRealtionService;
import com.hr.td.util.DataTablePage;
import com.hr.td.util.ToolsUtil;

@Controller
@RequestMapping(value="/structural/relation")
public class ActingForceRelationController {

	@Autowired
	private IActingForceRealtionService actservice;//杆塔关系接口
	
    /**
     * 分页查询杆塔作用力关系
     * @param request
     * @param page
     * @return
     */
	@RequestMapping(value = "getRelationPage.action")
	@ResponseBody
	public Map<String, Object> getRelationPage(HttpServletRequest request, DataTablePage page,String towerType) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("pageSize", page.getLength());
		map.put("startIndex", page.getStart());
		map.put("towerType", towerType);
		try {
			List<Map<String, Object>> RelationList = actservice.getRelationPage(map);
			if (!ToolsUtil.isEmpty(RelationList)) {
				return page.toReturnMap(RelationList, actservice.getRelationCount(map));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return page.toReturnMap(new ArrayList<Object>(), 0);
	} 
	
	@RequestMapping(value = "getParamterBydData.action")
	@ResponseBody
	public Map<String, Object> getParamterBydData(String towerType){
		Map<String, Object> returnmap = new HashMap<String, Object>();
		returnmap.put("towerType",towerType);
		List<Map<String, Object>> mapList=actservice.getRealtionList(returnmap);
		Map<String, Object> map = new HashMap<String, Object>();
		if(!ToolsUtil.isEmpty(mapList)){
			map=mapList.get(0);
			map.put("code", 200);
		}
		else{
			map.put("code", 300);
		}
		return map;
	}
	
	/**
	 * 单个添加关系数据
	 * @param request
	 * @param param
	 * @return
	 */
	@RequestMapping(value = "addRelation.action")
	@ResponseBody
	public Map<String, Object> addRelation(HttpServletRequest request,String param){
		Map<String, Object> returnmap = new HashMap<String, Object>();
		Map<String, String> map=(Map<String, String>) ToolsUtil.strToJson(param, Map.class);
		boolean flag=actservice.addRelation(map);
		if(flag){
			returnmap.put("code", 200);
			returnmap.put("msg", "添加成功");

		}
		else{
			returnmap.put("code", 300);
			returnmap.put("msg", "添加失败");
		}
		return returnmap;
	}
	
	/**
	 * 修改参数信息
	 * @param request
	 * @param param
	 * @return
	 */
	@RequestMapping(value = "updateRelation.action")
	@ResponseBody
	public Map<String, Object> updateRelation(HttpServletRequest request,String param){
		Map<String, Object> returnmap = new HashMap<String, Object>();
		Map<String, String> map=(Map<String, String>) ToolsUtil.strToJson(param, Map.class);
		boolean flag=actservice.updateRelation(map);
		if(flag){
			returnmap.put("code", 200);
			returnmap.put("msg", "修改成功");

		}
		else{
			returnmap.put("code", 300);
			returnmap.put("msg", "修改失败");
		}
		return returnmap;
	}
	
	/**
	 * 删除关系
	 * @param request
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "deleteRelation.action")
	@ResponseBody
	public Map<String, Object> deleteRelation(HttpServletRequest request,String id){
		Map<String, Object> returnmap = new HashMap<String, Object>();
		int idNum=actservice.deleteRelation(id);
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
	public Map<String, Object> importExcel(@RequestParam(value="filename") MultipartFile file,HttpServletRequest request,HttpServletResponse response) throws IOException {
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
				List<Map<String, Object>> excelList = actservice.importExcel(fileName, file);
				
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
