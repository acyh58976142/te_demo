package com.hr.td.controller.material;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hr.td.entity.Attachment;
import com.hr.td.entity.MainInfo;
import com.hr.td.entity.Parts;
import com.hr.td.entity.RouteInfo;
import com.hr.td.entity.VibrationDamper;
import com.hr.td.entity.WireConfiguration;
import com.hr.td.service.material.IMaterialService;
import com.hr.td.service.tower.IPartsService;
import com.hr.td.service.tower.ITowerService;
import com.hr.td.util.DataTablePage;
import com.hr.td.util.Page;
import com.hr.td.util.PropertiesConfig;
import com.hr.td.util.TAUtil;
import com.hr.td.util.ToolsUtil;
import com.hr.td.util.TowerUtil;

@Controller
@RequestMapping(value = "/material")
public class MaterialController {
	
	@Autowired
	private ITowerService towerService;
	@Autowired
	private IMaterialService iMaterialService;
    @Autowired
    private IPartsService partsService;
	
	SimpleDateFormat dateFor = new SimpleDateFormat("yyyy-MM-dd");
	
	/**
	 * 跳转工程列表页面
	 * @param <Obejct>
	 */
	@RequestMapping(value = "/toMaterialList.action", method = RequestMethod.GET)
	public String toMaterialList(ModelMap modelMap,HttpServletRequest request) {
		
		return  "/material/materialList";
	}
	
	/**
	 * 跳转到组配件明细说明页面
	 */
	@RequestMapping(value = "/partsExplain.action", method = RequestMethod.GET)
	public Object partsExplain(ModelMap modelMap, HttpServletRequest request) {
		String id = request.getParameter("id");
	
		Parts parts = partsService.getPartsById(id);
	
		List<VibrationDamper> damper = partsService.getVibrationDamperList(id);
		MainInfo main = towerService.getMainInfo(id);
		WireConfiguration wireConfig = new WireConfiguration();
		String wireId =main.getWireConfigId();
		if(!ToolsUtil.isEmpty(wireId)){
			wireConfig = partsService.getWireConfig(wireId); 
		}
		modelMap.addAttribute("projectCode", main.getProjectCode());
		modelMap.addAttribute("projectName", main.getProjectName());
		modelMap.addAttribute("damper", ToolsUtil.jsonToStr(damper));
		modelMap.addAttribute("wireConfig", wireConfig);
		modelMap.addAttribute("parts", parts);	
		modelMap.addAttribute("id", id);

		return "/material/partsExplain";
	}
	
	/**
	 * 跳转导地线重量页面
	 * @param <Obejct>
	 */
	@RequestMapping(value = "/toMaterialGroundWire.action", method = RequestMethod.GET)
	public String toMaterialGroundWire(ModelMap modelMap,HttpServletRequest request) {
		String projectName = request.getParameter("projectName");
		String projectId = request.getParameter("projectId");
				
		modelMap.addAttribute("projectName", projectName);
		modelMap.addAttribute("projectId", projectId);
		
		return  "/material/materialGroundWire";
	}
	
	/**
	 * 跳转到材料iframe页面
	 * @param <Obejct>
	 */
	@RequestMapping(value = "/toMaterialIndex.action", method = RequestMethod.GET)
	public String toGroundingConfig(ModelMap modelMap,HttpServletRequest request) {
		String projectName = request.getParameter("projectName");
		String projectId = request.getParameter("projectId");
				
		/*Map<String, Object> listMap = new HashMap<String, Object>();
		listMap.put("projectName", projectName);
		listMap.put("projectId", projectId);*/
		
		modelMap.addAttribute("projectName", projectName);
		modelMap.addAttribute("projectId", projectId);
		
		return  "/material/materialIndex";
	}
	
	/**
	 * 查询并分页
	 * @param request
	 * @param page
	 * @return
	 */
	@RequestMapping(value = "queryMainInfo.action", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> queryMainInfo(HttpServletRequest request, DataTablePage page) {
		try {
			Map<String, Object> paramMap = new HashMap<String, Object>();

			paramMap.put("pageSize", page.getLength());
			paramMap.put("startIndex", page.getStart());
			int totalCount = iMaterialService.findMainInfoListCount();

			Page p = iMaterialService.findMainInfoList(paramMap, totalCount);

			if (!ToolsUtil.isEmpty(p)) {
				List<Map<String, Object>> mapList = new ArrayList<Map<String, Object>>();
				Map<String, Object> mainInfoMap = null;

				@SuppressWarnings("unchecked")
				List<Object> list = (List<Object>) p.getItems();
				// 序号列
				int index = 1;
				for (int i = 0; i < list.size(); i++) {
					mainInfoMap = new HashMap<String, Object>();
					Object[] main = (Object[]) list.get(i);

					mainInfoMap.put("id", main[0]);
					mainInfoMap.put("projectName", main[1]);
					mainInfoMap.put("projectCode", main[2]);
					mainInfoMap.put("designUnit", main[3]);
					mainInfoMap.put("designDate", ToolsUtil.isEmpty(main[4]) ? "" : dateFor.format(main[4]));
					mainInfoMap.put("state", ToolsUtil.isEmpty(main[5]) ? "未配置": "已配置");
					mainInfoMap.put("index", index+"");
					index++;

					mapList.add(mainInfoMap);
				}
				return page.toReturnMap(mapList, totalCount);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
		
	/**
	 * 通过导线地线型号解析获取单位重量，获取耐张段长度解析并求和，单位重量*总耐张段长度=导线重量
	 */
	@RequestMapping(value = "/getPartsDataI.action")
	@ResponseBody
	public Object getPartsDataI(HttpServletRequest request) {
        String id = request.getParameter("projectId");
        
        /*----------------->>根据工程ID获得组配件明细数据中的耐张段长度<<-----------------*/
		//获得组配件明细数据中I列的数据
		List<Attachment> attachList = towerService.getAttachment(id);
		List<List<List<String>>> iList = getILength(attachList);
		
		System.out.println(iList);
		//获得耐张段长度的数据
		List<String> iList2 = new ArrayList<>();
		for (List<List<String>> list2 : iList) {
			for (List<String> list3 : list2) {
				 iList2.add(list3.get(2));
			}
		}
		System.out.println("list2"+iList2);
		
		/*----------------->>根据工程ID获取导线，地线型号<<-----------------*/
		RouteInfo route = partsService.getRouteById(id);
				
		Map<String, List<List<String>>> groundAndConductor = getGroundAndConductor(id);
		List<List<String>> conductorList = groundAndConductor.get("conductorList");
		List<List<String>> groundlists = groundAndConductor.get("groundlists");
		System.out.println("conductorList:"+conductorList);
		System.out.println("groundlists:"+groundlists);
		/*----------------->>根据工程id，查询出routeInfo表 conductorAllParam,groundAllParam信息<<-----------------*/
		//根据工程id，查询出routeInfo表 conductorAllParam,groundAllParam信息
		String conductorAllParam = route.getConductorAllParam();
		String groundAllParam = route.getGroundAllParam();
		
		//把conductorAllParam，groundAllParam转成List<List<String>>数据格式
		List<List<String>> conductorAllParamList = stringToListlist(conductorAllParam);
		List<List<String>> groundAllParamList = stringToListlist(groundAllParam);
		System.out.println("conductorAllParam信息"+conductorAllParamList);
		System.out.println("groundAllParam信息"+groundAllParamList);
		
		/*----------------->>解析合并数据<<-----------------*/
		//取出conductorAllParamList，groundAllParamList中的导线型号和单个重量，以导线型号为key，单个重量为value放入map中
		Map<String, Object> conductorMap = putConductorMap(conductorAllParamList,groundAllParamList);
	    System.out.println("conductorMap:"+conductorMap);
		
	   //把conductorAllParamList，groundAllParamList变为 List<List<String>>,最底层的格式[导线型号，耐张段长度]
	    List<List<String>> conductorList2 = new ArrayList<>();
	    for (int i = 0; i < iList2.size(); i++) {
		  
		   //List<List<String>> groundlists2 = new ArrayList<>();
		   for (int j = 0; j < conductorList.get(i).size(); j++) {
			   List<String> conductorListString = new ArrayList<>();
			   conductorListString.add(conductorList.get(i).get(j));
			   conductorListString.add(iList2.get(i));	  
			   conductorList2.add(conductorListString);
		   }
		   
		   for (int j = 0; j < groundlists.get(i).size(); j++) {
			
			   List<String> groundlistsString = new ArrayList<>();
			   groundlistsString.add(groundlists.get(i).get(j));
			   groundlistsString.add(iList2.get(i));
			   conductorList2.add(groundlistsString);
		   }
		  
	    }
	  		   	  	   
	   List<String> listStr = new ArrayList<>(); //导线型号集合
	   List<List<String>> listStr2 = new ArrayList<>(); //[导线型号，耐张段长度]集合
	   /*把导线型号，地线型号相同的耐张段长度相加*/
	   //把conductorListListList变为 listStr集合 和 listStr2 集合
	   for (int i = 0; i < conductorList2.size(); i++) { 
			    	listStr.add(conductorList2.get(i).get(0));
			    	listStr2.add(conductorList2.get(i));
		}   
	   		
	   System.out.println(listStr2);
	   //去重后的导线型号,地线型号集合
	   Set<String> result = new HashSet<String>(listStr);
	   Map<String, Integer> map = new HashMap<>();
	   //去重后导线型号 == listStr2集合里的 导线型号
	   for (String str : result) {
		   int count = 0;
		   for(int i = 0; i< listStr2.size();i++){
			 if (listStr2.get(i).get(0).equals(str)) {
				 count += listStr2.get(i).get(1)!=null?Integer.parseInt(listStr2.get(i).get(1)):0;
			 }
		   }
		   map.put(str, count);
	   }
	   System.out.println("map:"+map);	
	   
	   /*----------------->>根据导线型号得到 单位重量*耐张段总长度 <<-----------------*/
	  Map<String, String> map2 = new HashMap<>();
	  for (Map.Entry<String, Integer> m : map.entrySet()) {
		   double val = 0;
		   if(conductorMap.containsKey(m.getKey())){
			      double d = Double.parseDouble(conductorMap.get(m.getKey()).toString());
			      val = m.getValue() * d;
		   }
		   map2.put(m.getKey(), String.valueOf(val));
		   }
	   System.out.println("map2:"+map2);
	   	  
	   //JSONObject re=JSONObject.fromObject(map);
	   //String resultMap2=re.toString();	   
	   List<List<String>> map2ListList = new ArrayList<>();
	   for (Map.Entry<String, String> m : map2.entrySet()) {
		   List<String> map2List = new ArrayList<>();
		   map2List.add(m.getKey());
		   map2List.add(m.getValue());
		   map2ListList.add(map2List);
	   }
	   
	   return map2ListList;
	}
		
	/**
	 * 获取导线，地线型号
	 * @param  工程id
	 * @return Map<String, List<List<String>>>
	 */
	public Map<String, List<List<String>>> getGroundAndConductor(String id) {
				
		RouteInfo route = partsService.getRouteById(id);
		// route文件耐张段信息
		String tensileSection = route.getTensileSection();
		Object reply;
		List<List<String>> tensileList = new ArrayList<List<String>>();
		if (!ToolsUtil.isEmpty(tensileSection)) {
			reply = (ToolsUtil.strToJson(tensileSection, List.class));
			tensileList = (List<List<String>>) reply;
		}

		List<List<String>> conductorList = new ArrayList<>();// 导线型号集合
		List<List<String>> groundlists = new ArrayList<>();// 地线型号集合
        
		for (int i = 1; i < tensileList.size(); i++) {
            List<String> wireType = new ArrayList<>();
			
            wireType.add(tensileList.get(i).get(44));// 导线型号1
			wireType.add(tensileList.get(i).get(47));// 导线型号2
			wireType.add(tensileList.get(i).get(50));// 导线型号3
			wireType.add(tensileList.get(i).get(53));// 导线型号4
			wireType.add(tensileList.get(i).get(56));// 导线型号5
			wireType.add(tensileList.get(i).get(59));// 导线型号6
			wireType.add(tensileList.get(i).get(62));// 导线型号7
			wireType.add(tensileList.get(i).get(65));// 导线型号8
			wireType.add(tensileList.get(i).get(68));// 导线型号9
			wireType.add(tensileList.get(i).get(71));// 导线型号10
			wireType.add(tensileList.get(i).get(74));// 导线型号11
			wireType.add(tensileList.get(i).get(77));// 导线型号12

			if (getRemovalList(wireType).size() > 0) {
				conductorList.add(removalNull(wireType));
			}

		}

		for (int i = 1; i < tensileList.size(); i++) {
			List<String> groundType = new ArrayList<String>();// 地线型号
			
			groundType.add(tensileList.get(i).get(80));// 地线型号1
			groundType.add(tensileList.get(i).get(82));// 地线型号2
			groundType.add(tensileList.get(i).get(84));// 地线型号3
			groundType.add(tensileList.get(i).get(86));// 地线型号4
			groundType.add(tensileList.get(i).get(88));// 地线型号5
			groundType.add(tensileList.get(i).get(90));// 地线型号6
			groundType.add(tensileList.get(i).get(92));// 地线型号7
			groundType.add(tensileList.get(i).get(94));// 地线型号8
			groundType.add(tensileList.get(i).get(96));// 地线型号9
			groundType.add(tensileList.get(i).get(98));// 地线型号10
			groundType.add(tensileList.get(i).get(100));// 地线型号11
			groundType.add(tensileList.get(i).get(102));// 地线型号12

			
			groundlists.add(removalNull(groundType));	
		}
        
		Map<String, List<List<String>>> map = new HashMap<>();
		map.put("conductorList", conductorList);
		map.put("groundlists", groundlists);
		
		return map;
	}
		
	/**
	 * 取出conductorAllParamList，groundAllParamList中的导线型号和单个重量，以导线型号为key，单个重量为value放入map中
	 * @param
	 * @return Map<String,Object>
	 */
	public Map<String,Object> putConductorMap(List<List<String>> conductorAllParamList,List<List<String>> groundAllParamList){
		Map<String,Object> conductorMap = new HashMap<String,Object>(); 
	    for (int i = 0; i < conductorAllParamList.size(); i++) {

	    	if (!ToolsUtil.isEmpty(conductorAllParamList.get(i))) {
	    		if (!ToolsUtil.isEmpty(conductorAllParamList.get(i).get(0))/*&& !(conductorAllParamList.get(i).get(0).equals("导线型号"))*/ ) {
	    			//double d = Double.parseDouble(conductorAllParamList.get(i).get(4));
	    			conductorMap.put(conductorAllParamList.get(i).get(0),conductorAllParamList.get(i).get(4));
	    			
	    		}
	    	}
	    }
	    //Map<String,Object> groundMap = new HashMap<String,Object>(); 
	    for (int i = 0; i < groundAllParamList.size(); i++) {

	    	if (!ToolsUtil.isEmpty(groundAllParamList.get(i))) {
	    		if (!ToolsUtil.isEmpty(groundAllParamList.get(i).get(0))) {
	    			//double d = Double.parseDouble(groundAllParamList.get(i).get(4).toString());
	    			conductorMap.put(groundAllParamList.get(i).get(0),groundAllParamList.get(i).get(4));
	    			
	    		}
	    	}
	    }
	    return conductorMap;
	}
	
	/**
	 * 将两个map合并取值 两个map重名key值相乘 
	 */
	public Map<String, Object> mergeMap(Map<String, Object> map1,Map<String, Object> map2){
		   Map<String, Object> map3 = new HashMap<>();
		   for (Map.Entry<String, Object> m : map1.entrySet()) {
				   double val = 0;
				   if(map2.containsKey(m.getKey())){
					      double d = Double.parseDouble(map2.get(m.getKey()).toString());
					      String str=m.getValue().toString()!=null?m.getValue().toString():"0";
					      val = Double.parseDouble(str) * d;
				   }
				   map3.put(m.getKey(), (Object)val);
				   }
		   return map3;
	}
	
	/**
	 * 根据工程ID获得组配件明细数据中I列的数据
	 * @param
	 * @return
	 */
	public List<List<List<String>>> getILength(List<Attachment> attachList){
		List<List<List<String>>> iList = new ArrayList<List<List<String>>>();
		
		// 获得文件要存储的根目录的磁盘路径
		String rootPath = PropertiesConfig.getInstance().getProperty("upload_store_root");
		List<File> list = new ArrayList<File>();
		for (int i = 0; i < attachList.size(); i++) {
			Attachment attach = attachList.get(i);
			String path = attach.getFilePath();// TA文件保存路径
			File file = new File(rootPath + path);
			list.add(file);
		}
	
		List<List<List<String>>> taTesult = TAUtil.readTa(list);

		TowerUtil t = new TowerUtil();
		iList = t.getIColumns(taTesult);
				
		return iList;
	}
	
	/**
	 * 为conductorAllParamList，groundAllParamList插入耐张段长度
	 * 同时变为 List<List<String>>,最底层的格式[导线型号，耐张段长度]
	 */
	public List<List<String>> changeToListList(List<List<String>> listList1,List<List<String>> listList2,
	List<String> list){
		 List<List<String>> listList3 = new ArrayList<>();
		    for (int i = 0; i < list.size(); i++) {
			  
			   //List<List<String>> groundlists2 = new ArrayList<>();
			   for (int j = 0; j < listList1.get(i).size(); j++) {
				   List<String> list2 = new ArrayList<>();
				   list2.add(listList1.get(i).get(j));
				   list2.add(list.get(i));	  
				   listList3.add(list2);
			   }
			   
			   for (int j = 0; j < listList2.get(i).size(); j++) {
				
				   List<String> list3 = new ArrayList<>();
				   list3.add(listList2.get(i).get(j));
				   list3.add(list.get(i));
				   listList3.add(list3);
			   }
			  
		    }
		
		return listList3;
	}
	
	/**
	 * 将String类型(json格式)转成List<List<String>>
	 * @param 
	 * @return 
	 */
	@SuppressWarnings("unchecked")
	public List<List<String>> stringToListlist(String str){
		Object reply;
		List<List<String>> ListList = new ArrayList<List<String>>();
		if (!ToolsUtil.isEmpty(str)) {
			reply = (ToolsUtil.strToJson(str, List.class));
			ListList = (List<List<String>>) reply;
		}
		return ListList;
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
