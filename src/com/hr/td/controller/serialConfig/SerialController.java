package com.hr.td.controller.serialConfig;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hr.td.entity.RouteInfo;
import com.hr.td.entity.SerialConfigInfo;
import com.hr.td.service.material.IMaterialService;
import com.hr.td.service.serialConfig.ISerialConfigService;
import com.hr.td.service.tower.IPartsService;
import com.hr.td.service.tower.ITowerService;
import com.hr.td.util.ToolsUtil;
import com.nari.slsd.hd.util.CommonTool;

import antlr.build.Tool;
import net.sf.json.JSONArray;

@Controller
@RequestMapping(value = "/serialConfigCYH")
public class SerialController {
	
	@Autowired
	private ITowerService towerService;
	@Autowired
	private ISerialConfigService iSerialConfigService;
    @Autowired
    private IPartsService partsService;
	
	SimpleDateFormat dateFor = new SimpleDateFormat("yyyy-MM-dd");
	
	/**
	 * 批量保存金具图配置信息
	 */
	@RequestMapping(value = "addAllConfigInfo.action", method = RequestMethod.POST)
	@ResponseBody
	public Object addAllConfigInfo(@RequestParam(value ="projectId") String projectId
			,@RequestParam(value ="tableData1") String tableData1
			,@RequestParam(value ="tableData2") String tableData2
			,@RequestParam(value ="tableData3") String tableData3
			,@RequestParam(value ="tableData4") String tableData4
			,@RequestParam(value ="tableData5") String tableData5
			,@RequestParam(value ="tableData6") String tableData6
			,@RequestParam(value ="tableData7") String tableData7
			,@RequestParam(value ="tableData8") String tableData8
			,@RequestParam(value ="StringChooseSelect1") String StringChooseSelect1
			,@RequestParam(value ="InsulatorTypeSelect1") String InsulatorTypeSelect1
			,@RequestParam(value ="StringChooseSelect2") String StringChooseSelect2
			,@RequestParam(value ="InsulatorTypeSelect2") String InsulatorTypeSelect2
			,@RequestParam(value ="StringChooseSelect3") String StringChooseSelect3
			,@RequestParam(value ="InsulatorTypeSelect3") String InsulatorTypeSelect3
			,@RequestParam(value ="StringChooseSelect4") String StringChooseSelect4
			,@RequestParam(value ="InsulatorTypeSelect4") String InsulatorTypeSelect4
			,@RequestParam(value ="StringChooseSelect5") String StringChooseSelect5
			,@RequestParam(value ="InsulatorTypeSelect5") String InsulatorTypeSelect5){
				
		List<SerialConfigInfo> serialLists = new ArrayList<SerialConfigInfo>();
		for(int i = 1;i<=8;i++){
			SerialConfigInfo serialConfigInfo =iSerialConfigService.findSerialConfigInfo(projectId, i);
			if(!ToolsUtil.isEmpty(serialConfigInfo)){
				if(i==1){
					serialConfigInfo.setTableData(tableData1);
					serialConfigInfo.setStringTypeSelect(StringChooseSelect1);
					serialConfigInfo.setInsulatorTypeSelect(InsulatorTypeSelect1);
				}else if(i==2){
					serialConfigInfo.setTableData(tableData2);
					serialConfigInfo.setStringTypeSelect(StringChooseSelect2);
					serialConfigInfo.setInsulatorTypeSelect(InsulatorTypeSelect2);
				}else if(i==3){
					serialConfigInfo.setTableData(tableData3);
					serialConfigInfo.setStringTypeSelect(StringChooseSelect3);
					serialConfigInfo.setInsulatorTypeSelect(InsulatorTypeSelect3);
				}else if(i==4){
					serialConfigInfo.setTableData(tableData4);
					serialConfigInfo.setStringTypeSelect(StringChooseSelect4);
					serialConfigInfo.setInsulatorTypeSelect(InsulatorTypeSelect4);
				}else if(i==5){
					serialConfigInfo.setTableData(tableData5);
					serialConfigInfo.setStringTypeSelect(StringChooseSelect5);
					serialConfigInfo.setInsulatorTypeSelect(InsulatorTypeSelect5);
				}else if(i==6){
					serialConfigInfo.setTableData(tableData6);
				}else if(i==7){
					serialConfigInfo.setTableData(tableData7);
				}else if(i==8){
					serialConfigInfo.setTableData(tableData8);
				}
			}else{
				serialConfigInfo = new SerialConfigInfo();
				serialConfigInfo.setId(CommonTool.createUUID());
				serialConfigInfo.setProjectId(projectId);
				serialConfigInfo.setTableType(i);
				if(i==1){
					serialConfigInfo.setTableData(tableData1);
					serialConfigInfo.setStringTypeSelect(StringChooseSelect1);
					serialConfigInfo.setInsulatorTypeSelect(InsulatorTypeSelect1);
				}else if(i==2){
					serialConfigInfo.setTableData(tableData2);
					serialConfigInfo.setStringTypeSelect(StringChooseSelect2);
					serialConfigInfo.setInsulatorTypeSelect(InsulatorTypeSelect2);
				}else if(i==3){
					serialConfigInfo.setTableData(tableData3);
					serialConfigInfo.setStringTypeSelect(StringChooseSelect3);
					serialConfigInfo.setInsulatorTypeSelect(InsulatorTypeSelect3);
				}else if(i==4){
					serialConfigInfo.setTableData(tableData4);
					serialConfigInfo.setStringTypeSelect(StringChooseSelect4);
					serialConfigInfo.setInsulatorTypeSelect(InsulatorTypeSelect4);
				}else if(i==5){
					serialConfigInfo.setTableData(tableData5);
					serialConfigInfo.setStringTypeSelect(StringChooseSelect5);
					serialConfigInfo.setInsulatorTypeSelect(InsulatorTypeSelect5);
				}else if(i==6){
					serialConfigInfo.setTableData(tableData6);
				}else if(i==7){
					serialConfigInfo.setTableData(tableData7);
				}else if(i==8){
					serialConfigInfo.setTableData(tableData8);
				}
				
			}
			serialLists.add(serialConfigInfo);		
		}
		int result = iSerialConfigService.addAllConfigInfo(serialLists);
		return result;
	}	
	
	/**
	 * 根据projectId得出该工程下的5条配置信息
	 */
	@RequestMapping(value = "getAllSerialConfigInfo.action", method = RequestMethod.POST)
	@ResponseBody
	public Object getAllSerialConfigInfo(HttpServletRequest request){
		String projectId = request.getParameter("projectId");
		
		List<SerialConfigInfo> serialConfigInfoList = iSerialConfigService.getAllSerialConfigInfo(projectId);
		JSONArray  json  =  JSONArray.fromObject(serialConfigInfoList); 
        String  result  =  json.toString();
		
		return result;
	}
	
	/**
	 * 根据导线型号（多个）从route文件中得到电压等级和导线分裂方式
	 */
	@RequestMapping(value = "queryVoltagAndWire.action", method = RequestMethod.POST)
	@ResponseBody
	public Object queryVoltagAndWire(HttpServletRequest request,@RequestParam(value ="wireNameList[]") List<String> wireNameList
			,@RequestParam(value ="wireNameList2[]") List<String> wireNameList2
			,@RequestParam(value ="wireNameList3[]") List<String> wireNameList3
			,@RequestParam(value ="wireNameList4[]") List<String> wireNameList4
			,@RequestParam(value ="wireNameList5[]") List<String> wireNameList5
			,@RequestParam(value ="projectId") String projectId
			){
				
		/*获取电压等级和导线分裂方式*/
		RouteInfo route = partsService.getRouteById(projectId);
		List<List<String>> listList = getVoltagAndWire(route,wireNameList);
		List<List<String>> listList2 = getVoltagAndWire(route,wireNameList2);
		List<List<String>> listList3 = getVoltagAndWire(route,wireNameList3);
		List<List<String>> listList4 = getVoltagAndWire(route,wireNameList4);
		List<List<String>> listList5 = getVoltagAndWire(route,wireNameList5);
		Map<String, List<List<String>>> map = new HashMap<>();
		map.put("listList", listList);
		map.put("listList2", listList2);
		map.put("listList3", listList3);
		map.put("listList4", listList4);
		map.put("listList5", listList5);
		return map;
	}
	
	/**
	 * 根据id获取route数据并从中取出对应导线型号的电压等级(VoltageLevel)和导线分裂方式(WireSplitting)
	 * @param
	 * @return List<List<String>>
	 */
	public List<List<String>> getVoltagAndWire(RouteInfo route,List<String> wireNameList){
        String tensileSection = route.getTensileSection();
		Object reply;
		List<List<String>> tensileList = new ArrayList<List<String>>();
		if (!ToolsUtil.isEmpty(tensileSection)) {
			reply = (ToolsUtil.strToJson(tensileSection, List.class));
			tensileList = (List<List<String>>) reply;
		}
		System.out.println(tensileList);
		
		List<List<String>> list = new ArrayList<>();
		
		for (String str : wireNameList) {
			A:
			for (int i = 0; i < tensileList.size(); i++) {
				for (int k = 0; k < tensileList.get(i).size(); k++) {
					if (!ToolsUtil.isEmpty(tensileList.get(i).get(k))) {
						if ( (tensileList.get(i).get(k).equals(str)) ) {
							List<String> list2 = new ArrayList<>();
							list2.add(tensileList.get(i).get(35));
							list2.add(tensileList.get(i).get(k+1));
							
							list.add(list2);
							break A;
						}
					}
				
					
				}
			}
		}
		System.out.println(list);
		
		
		return list;
	}
	
	/**
	 * 跳转工程列表页面
	 * @param <String>
	 */
	@RequestMapping(value = "/toMaterialList.action", method = RequestMethod.GET)
	public String toMaterialList(ModelMap modelMap,HttpServletRequest request) {
		
		return  "/material/materialList";
	}
	
    /**
	 * 集合去空
	 * 
	 * @param originalList
	 *            原集合
	 * @return tempList新集合
	 */
	public List<String> removalNull(List<String> originalList) {

		List<String> tempList = new ArrayList<String>();
		for (String object : originalList) {
			if (!ToolsUtil.isEmpty(object)) {
			if (!object.equals("null")) {
				tempList.add(object);
			}
			}
		}
		return tempList;
	}

	/**
	 * 集合去重
	 * 
	 * @param originalList
	 *            原集合
	 * @return tempList新集合
	 */
	public List<String> getRemovalList(List<String> originalList) {

		List<String> tempList = new ArrayList<String>();
		for (String object : originalList) {
			if (!ToolsUtil.isEmpty(object)) {
			if (!tempList.contains(object) &&  !object.equals("null")) {
				tempList.add(object);
			}
			}
		}
		return tempList;
	}
	
}
