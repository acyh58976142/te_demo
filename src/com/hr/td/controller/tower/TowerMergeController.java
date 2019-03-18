package com.hr.td.controller.tower;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hr.td.entity.TowerMerge;
import com.hr.td.entity.TowerScreen;
import com.hr.td.service.tower.ITowerMergeService;
import com.hr.td.util.DataTablePage;
import com.hr.td.util.ToolsUtil;

/**
 * 筛选和归并
 * @author yw
 *
 */
@Controller
@RequestMapping(value="/merge")
public class TowerMergeController {
	@Autowired
	private ITowerMergeService mergeService;//筛选和归并的接口
	
	/**
	 * 添加筛选的杆塔信息
	 * @param projectId
	 * @param screenData
	 * @param request
	 * @return
	 */
	@RequestMapping(value="addTowerScreen.action")
	@ResponseBody
	public boolean addTowerScreen(String projectId,String screenData,HttpServletRequest request){
		Map<String, String> map=new HashMap<String,String>();
		map.put("projectId", projectId);	
		map.put("screenData", screenData);	
		boolean flag=mergeService.updateTowerScreen(map);
		return flag;
	}
	
	/**
	 * 查询筛选后的杆塔信息
	 * @param page
	 * @param projectId
	 * @return
	 */
	@RequestMapping(value="getTowerScreen.action")
	@ResponseBody
	public Map<String, Object> getTowerScreen(DataTablePage page,String projectId){
		Map<String, String> map = new HashMap<String, String>();
		map.put("projectId", projectId);
		try {
			List<TowerScreen> screenList = mergeService.getTowerScreen(map);
			if (!ToolsUtil.isEmpty(screenList)) {
				TowerScreen screen=screenList.get(0);
				String screenData=screen.getScreenData();
				List<Map<String, String>> list=(List<Map<String, String>>) ToolsUtil.strToJson(screenData, List.class);
				return page.toReturnMap(list, list.size());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return page.toReturnMap(new ArrayList<Object>(), 0);
	}
	
	@RequestMapping(value="getTowerScreenInfo.action")
	@ResponseBody
	public Map<String, String> getTowerScreenInfo(String projectId){
		Map<String, String> map = new HashMap<String, String>();
		map.put("projectId", projectId);
		try {
			List<TowerScreen> screenList = mergeService.getTowerScreen(map);
			if(ToolsUtil.isEmpty(screenList)){
				map.put("code", "200");
			}
			else{
				map.put("code", "300");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return map;
	}

	/**
	 * 添加归并后的杆塔信息
	 * @param projectId
	 * @param mergeData
	 * @param towerData
	 * @param request
	 * @return
	 */
	@RequestMapping(value="addTowerMerge.action")
	@ResponseBody
	public boolean addTowerMerge(String projectId,String mergeData,String towerData,HttpServletRequest request){
		Map<String, String> map=new HashMap<String,String>();
		map.put("projectId", projectId);	
		map.put("mergeData", mergeData);	
		map.put("towerData", towerData);	
		boolean flag=mergeService.addTowerMerge(map);
		return flag;
	}
	
	/**
	 * 查询归并后的数据
	 * @param page
	 * @param projectId
	 * @return
	 */
	@RequestMapping(value="getTowerMerge.action")
	@ResponseBody
	public Map<String, Object> getTowerMerge(DataTablePage page,String projectId){
		Map<String, String> map = new HashMap<String, String>();
		map.put("projectId", projectId);
		try {
			List<TowerMerge> mergeList = mergeService.getTowerMerge(map);
			if (!ToolsUtil.isEmpty(mergeList)) {
				List<Map<String, String>> list=new ArrayList<Map<String, String>>();
				for(TowerMerge merge:mergeList){
					Map<String,String> mergeMap=(Map<String, String>) ToolsUtil.strToJson(merge.getMergeData(), Map.class);
					mergeMap.put("id", merge.getId());
					mergeMap.put("projectId", projectId);
					mergeMap.put("towerData", merge.getTowerData());
					list.add(mergeMap);
				}
			return page.toReturnMap(list, list.size());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return page.toReturnMap(new ArrayList<Object>(), 0);
	}
	
	/**
	 * 获取具体的归并信息
	 * @param mergeId
	 * @return
	 */
	@RequestMapping(value="getTowerMergeInfo.action")
	@ResponseBody
	public Map<String, String> getTowerMergeInfo(String mergeId){
		Map<String, String> map = new HashMap<String, String>();
		Map<String,String> mergeMap=null;
		map.put("id", mergeId);
		List<TowerMerge> mergeList = mergeService.getTowerMerge(map);
		if (!ToolsUtil.isEmpty(mergeList)) {
			TowerMerge merge=mergeList.get(0);
			mergeMap=(Map<String, String>) ToolsUtil.strToJson(merge.getMergeData(), Map.class);
		}
		return mergeMap;
	}
	
	/**
	 * 删除归并的信息
	 * @param param
	 * @return
	 */
	@RequestMapping(value="deleteTowerMerge.action")
	@ResponseBody
	public boolean deleteTowerMerge(String param){
        Map<String, String> map=(Map<String, String>) ToolsUtil.strToJson(param, Map.class);
        boolean flag=mergeService.deleteTowerMerge(map);
		return flag;
	}
	
	//跳转归并页面
	@RequestMapping(value="turnToTowerMerge.action")
	public String turnToTowerMerge(String projectId,ModelMap modelmap){
		modelmap.put("projectId", projectId);
		return "/tower/towerMerge";
	}
	
	//跳转荷载计算页面
	@RequestMapping(value="turnToTowerLoad.action")
	public String turnToTowerLoad(String projectId,String mergeId,ModelMap modelmap){
		modelmap.put("projectId", projectId);
		modelmap.put("mergeId", mergeId);
		return "/tower/towerLoad";
	}
}
