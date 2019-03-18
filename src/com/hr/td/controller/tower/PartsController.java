package com.hr.td.controller.tower;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import com.hr.td.service.tower.IPartsService;
import com.hr.td.service.tower.ITowerService;
import com.hr.td.util.CommonTool;
import com.hr.td.util.DataTablePage;
import com.hr.td.util.Page;
import com.hr.td.util.PropertiesConfig;
import com.hr.td.util.TAUtil;
import com.hr.td.util.ToolsUtil;
import com.hr.td.util.TowerUtil;

@Controller
@RequestMapping("Parts")
public class PartsController {

	@Autowired
	private ITowerService towerService;

	@Autowired
	private IPartsService partsService;

	SimpleDateFormat dateFor = new SimpleDateFormat("yyyy-MM-dd");

	/**
	 * 跳转到杆塔列表页面
	 */
	@RequestMapping(value = "/projectList.action", method = RequestMethod.GET)
	public Object projectList(HttpServletRequest request) {

		return "/parts/projectList";
	}

	/**
	 * 跳转到组配件明细详情页面
	 */
	@RequestMapping(value = "/partsDetail.action", method = RequestMethod.GET)
	public Object towerDetail(ModelMap modelMap, HttpServletRequest request) {
		String id = request.getParameter("id");
		MainInfo main = towerService.getMainInfo(id);
		WireConfiguration wireConfig = new WireConfiguration();
		String wireId =main.getWireConfigId();
		if(!ToolsUtil.isEmpty(wireId)){
			wireConfig = partsService.getWireConfig(wireId); 
		}
		
		Parts parts = partsService.getPartsById(id);
		Map<String, String> paramMap = new HashMap<String, String>();
		if(!ToolsUtil.isEmpty(parts)){
		//paramMap.put("s", parts.getColumn_s());
		paramMap.put("t", parts.getColumn_t());
		//paramMap.put("u", parts.getColumn_u());
		//paramMap.put("v", parts.getColumn_v());
		//paramMap.put("w", parts.getColumn_w());
		paramMap.put("x", parts.getColumn_x());
		//paramMap.put("y", parts.getColumn_y());
		//paramMap.put("z", parts.getColumn_z());
		}
		modelMap.put("paramMap", paramMap);
		
		modelMap.addAttribute("modulus", wireConfig.getCableLengthModulus());//光缆线长系数
		modelMap.addAttribute("margin", wireConfig.getCableLengthMargin());//光缆盘长裕度(m)
		modelMap.addAttribute("id", id);
		modelMap.addAttribute("projectCode", main.getProjectCode());

		return "/parts/partsDetail";
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

		modelMap.addAttribute("damper", ToolsUtil.jsonToStr(damper));
		modelMap.addAttribute("wireConfig", wireConfig);
		modelMap.addAttribute("parts", parts);	
		modelMap.addAttribute("id", id);
		modelMap.addAttribute("projectCode", main.getProjectCode());

		return "/parts/partsExplain";
	}

	
	/**
	 * 跳转到组配件配置页面
	 */
	@RequestMapping(value = "/partsConfigTable.action", method = RequestMethod.GET)
	public Object a(ModelMap modelMap, HttpServletRequest request) {
		String id = request.getParameter("id");
		List<VibrationDamper> damper = partsService.getVibrationDamperList(id);
		MainInfo main = towerService.getMainInfo(id);
		WireConfiguration wireConfig = new WireConfiguration();
		String wireId =main.getWireConfigId();
		if(!ToolsUtil.isEmpty(wireId)){
			wireConfig = partsService.getWireConfig(wireId); 
		}

		modelMap.put("damper", ToolsUtil.jsonToStr(damper));
		modelMap.addAttribute("wireConfig", wireConfig);
		modelMap.addAttribute("id", id);

		return "/parts/partsConfigTable";
	}

	/**
	 * 跳转到杆塔明细校对页面
	 */
	@RequestMapping(value = "/towerCheck.action", method = RequestMethod.GET)
	public Object towerCheck(ModelMap modelMap, HttpServletRequest request) {
		String id = request.getParameter("id");

		modelMap.addAttribute("id", id);

		return "/tower/towerCheck";
	}

	/**
	 * 跳转到杆塔明细修改页面
	 */
	@RequestMapping(value = "/towerUpdate.action", method = RequestMethod.GET)
	public Object towerUpdate(ModelMap modelMap, HttpServletRequest request) {
		String id = request.getParameter("id");

		modelMap.addAttribute("id", id);

		return "/tower/towerUpdate";
	}

	@RequestMapping(value = "/queryMainInfo.action", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> queryMainInfo(DataTablePage page) {
		try {
			Map<String, Object> paramMap = new HashMap<String, Object>();

			paramMap.put("pageSize", page.getLength());
			paramMap.put("startIndex", page.getStart());
			int totalCount = partsService.findMainInfoListCount(paramMap);

			Page p = partsService.findMainInfoList(paramMap, totalCount);

			if (!ToolsUtil.isEmpty(p)) {
				List<Map<String, Object>> mapList = new ArrayList<Map<String, Object>>();
				Map<String, Object> mainInfoMap = null;

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
					mainInfoMap.put("state", ToolsUtil.isEmpty(main[5]) ? "未配置" : "已配置");
					mainInfoMap.put("index", index + "");
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
	 * 保存组配件明细表
	 */
	@RequestMapping(value = "/saveParts.action")
	@ResponseBody
	public Object saveParts(String datas,String id,HttpServletRequest request) {
		Parts parts = partsService.getPartsById(id);
		if(ToolsUtil.isEmpty(parts)){
			parts = new Parts();
			parts.setId(CommonTool.createUUID());
		}
	
		List<String> list =(List<String>)ToolsUtil.strToJson(datas, List.class);
		parts.setColumn_k(ToolsUtil.jsonToStr(list.get(0)));
		parts.setColumn_l(ToolsUtil.jsonToStr(list.get(1)));
		parts.setColumn_m(ToolsUtil.jsonToStr(list.get(2)));
		parts.setColumn_n(ToolsUtil.jsonToStr(list.get(3)));
		parts.setColumn_o(ToolsUtil.jsonToStr(list.get(4)));
		parts.setColumn_p(ToolsUtil.jsonToStr(list.get(5)));
		parts.setColumn_q(ToolsUtil.jsonToStr(list.get(6)));
		parts.setColumn_r(ToolsUtil.jsonToStr(list.get(7)));
		parts.setColumn_s(ToolsUtil.jsonToStr(list.get(8)));
		parts.setColumn_t(ToolsUtil.jsonToStr(list.get(9)));
		parts.setColumn_u(ToolsUtil.jsonToStr(list.get(10)));
		parts.setColumn_v(ToolsUtil.jsonToStr(list.get(11)));
		parts.setColumn_w(ToolsUtil.jsonToStr(list.get(12)));
		parts.setColumn_x(ToolsUtil.jsonToStr(list.get(13)));
		parts.setColumn_y(ToolsUtil.jsonToStr(list.get(14)));
		parts.setColumn_z(ToolsUtil.jsonToStr(list.get(15)));
		parts.setColumn_aa(ToolsUtil.jsonToStr(list.get(16)));
		parts.setColumn_ab(ToolsUtil.jsonToStr(list.get(17)));
		parts.setColumn_ac(ToolsUtil.jsonToStr(list.get(18)));
		parts.setColumn_ae(ToolsUtil.jsonToStr(list.get(19)));
		parts.setColumn_a(ToolsUtil.jsonToStr(list.get(20)));
		parts.setColumn_af(ToolsUtil.jsonToStr(list.get(21)));
		parts.setColumn_ag(ToolsUtil.jsonToStr(list.get(22)));
		parts.setColumn_ah(ToolsUtil.jsonToStr(list.get(23)));
		parts.setColumn_ai(ToolsUtil.jsonToStr(list.get(24)));
		
		parts.setProjectId(id);
		
		Map<String, Object> objMap = new HashMap<String, Object>();
		try {
			partsService.saveParts(parts);
			objMap.put("msg", "success");
		} catch (Exception e) {
			objMap.put("msg", "error");
		}
		return objMap;
	}
	
	
	/**
	 * 根据ID获得组配件明细数据
	 */
	@RequestMapping(value = "/getPartsData.action")
	@ResponseBody
	public Object getTaData(String id, int pagingSize) {

		List<List<String>> towerobj = new ArrayList<List<String>>();
		List<List<List<String>>> iList = new ArrayList<List<List<String>>>();
		List<List<List<String>>> jList = new ArrayList<List<List<String>>>();
		List<String> partstop = TAUtil.partstop;
		List<String> partsVicetop = TAUtil.partsVicetop;
		List<List<String>> topobj = new ArrayList<List<String>>();
		topobj.add(partstop);
		topobj.add(partsVicetop);
		List<Attachment> attachList = towerService.getAttachment(id);
		/*
		 * String path = attachment.getFilePath();//TA文件保存路径
		 */ // 获得文件要存储的根目录的磁盘路径
		String rootPath = PropertiesConfig.getInstance().getProperty("upload_store_root");
		List<File> list = new ArrayList<File>();
		for (int i = 0; i < attachList.size(); i++) {
			Attachment attach = attachList.get(i);
			String path = attach.getFilePath();// TA文件保存路径
			File file = new File(rootPath + path);
			list.add(file);
		}
		List<List<String>> result = TAUtil.readTa(list, pagingSize);
		List<List<List<String>>> taTesult = TAUtil.readTa(list);

		TowerUtil t = new TowerUtil();
		jList = t.getJColumns(taTesult);
		iList = t.getIColumns(taTesult);

		MainInfo main = towerService.getMainInfo(id);
		WireConfiguration wireConfig = new WireConfiguration();
		String wireId =main.getWireConfigId();
		if(!ToolsUtil.isEmpty(wireId)){
			wireConfig = partsService.getWireConfig(wireId); 
		}
	
		Map<String, Object> bracketHeight = new HashMap<String, Object>();
		if(!ToolsUtil.isEmpty(wireConfig.getBracketHeight())){
			bracketHeight=(Map<String, Object>) ToolsUtil.strToJson(wireConfig.getBracketHeight(), Map.class);
		}
		
		List<List<String>> towerDetail = TAUtil.getPartsDetailByTa(result,bracketHeight);

		for (int i = 0; i < towerDetail.size(); i++) {
			for (int j = 0; j < towerDetail.get(i).size(); j++) {
				if (towerDetail.get(i).get(j).equals("0")) {
					towerDetail.get(i).set(j, "");
				}
			}
			towerobj.add(towerDetail.get(i));
		}

		Map<String, List<List<List<String>>>> objMap = new HashMap<String, List<List<List<String>>>>();

		List<List<List<String>>> sumList = new ArrayList<List<List<String>>>();
		sumList.add(topobj);
		sumList.add(towerobj);

		List<List<List<String>>> sumTypeList = getSumTypeList(id, pagingSize, jList, result);
		List<List<List<String>>> sumCountList = getSumCountList(id, pagingSize, jList, result);
		List<List<List<String>>> hammerCountList = getHammerCountList(id, pagingSize, jList, result, towerobj);
		objMap.put("sumTypeList", sumTypeList);
		objMap.put("sumCountList", sumCountList);
		objMap.put("hammerCountList", hammerCountList);
		objMap.put("list", sumList);
		objMap.put("iList", iList);
		objMap.put("jList", jList);

		return objMap;
	}

	/**
	 * 根据ID获得组配件说明数据
	 */
	@RequestMapping(value = "/getTowerExplain.action")
	@ResponseBody
	public Object getTowerExplain(String id) {

		List<List<List<String>>> jList = new ArrayList<List<List<String>>>();
	
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
		List<List<List<String>>> taTesult = TAUtil.readTa(list);

		TowerUtil t = new TowerUtil();
		jList = t.getJColumns(taTesult); 
		
		List<List<Integer>> naiList = new ArrayList<List<Integer>>();//耐张段起始信息集合
		int count = 0;
		for(int i=0;i<jList.size();i++){
			for(int j=0;j<jList.get(i).size();j++){
				String start = jList.get(i).get(j).get(0);
				String end = jList.get(i).get(j).get(1);
				naiList.add(Arrays.asList(Integer.parseInt(start)+count,Integer.parseInt(end)+count));
			}
			count+= Integer.parseInt(jList.get(i).get(jList.get(i).size()-1).get(1))+1;
		}
		List<List<String>> loopAndTypeList = getLoopAndTypeList(id);//耐张段回路数和杆塔类型集合
		
		List<List<String>> taList = new ArrayList<List<String>>();
		for(int i=0;i<taTesult.size();i++){
			for(int j=0;j<taTesult.get(i).size();j++){
				taList.add(taTesult.get(i).get(j));
			}	
		}
		List<List<String>> towerExplain = getTowerExplain(taList,naiList,loopAndTypeList);
	
		return towerExplain;
	}
	
	/**
	 * 根据项目ID获得杆塔型号数据
	 */
	@RequestMapping(value = "/getTaTypeById.action")
	@ResponseBody
	public Object getTaTypeById(String id) {

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

		List<List<List<String>>> result = TAUtil.readTa(list);
		List<String> hangList = new ArrayList<String>();
		List<String> tensileList = new ArrayList<String>();

		Map<String, List<String>> objMap = new HashMap<String, List<String>>();
		for (int i = 0; i < result.size(); i++) {
			for (int j = 0; j < result.get(i).size(); j++) {
				if (!ToolsUtil.isEmpty(result.get(i).get(j))) {
					if (result.get(i).get(j).get(1).equals("1")) {
						hangList.add(result.get(i).get(j).get(8).trim());
					} else if (result.get(i).get(j).get(1).equals("2")) {
						tensileList.add(result.get(i).get(j).get(8).trim());
					}
				}
			}
		}
		hangList = getRemovalList(hangList);
		tensileList = getRemovalList(tensileList);

		objMap.put("hangList", hangList);
		objMap.put("tensileList", tensileList);

		return objMap;
	}

	/**
	 * 根据项目ID获得杆塔型号数据
	 */
	@RequestMapping(value = "/getTotalTaTypeById.action")
	@ResponseBody
	public Object getTotalTaTypeById(String id) {
	
		List<Attachment> attachList  = towerService.getAttachment(id);

	// 获得文件要存储的根目录的磁盘路径
		String rootPath = PropertiesConfig.getInstance().getProperty("upload_store_root");
		List<File> list = new ArrayList<File>();
		for (int i = 0; i < attachList.size(); i++) {
			Attachment attach = attachList.get(i);
			String path = attach.getFilePath();//TA文件保存路径
			File file = new File(rootPath + path);
			list.add(file);
		}
	
		List<List<List<String>>> result = TAUtil.readTa(list);
	
		List<String> totalList = new ArrayList<String>();
	 
		Map<String,List<String>> objMap = new HashMap<String,List<String>>();
		for (int i = 0; i < result.size(); i++) {
			for (int j = 0; j < result.get(i).size(); j++) {
			  if(!ToolsUtil.isEmpty(result.get(i).get(j))){
				  String type = result.get(i).get(j).get(8).trim();
				if(type.length() > 3){
					type = type.substring(0,type.lastIndexOf("-"));
				}
				  totalList.add(type);
				}
			}
		}
		totalList=getRemovalList(totalList);
		
		List<String> bracketHeight = new ArrayList<String>();
		
		MainInfo main = towerService.getMainInfo(id);
		WireConfiguration wireConfig = new WireConfiguration();
		String wireId =main.getWireConfigId();
		if(!ToolsUtil.isEmpty(wireId)){
			wireConfig = partsService.getWireConfig(wireId); 
		}

		if(!ToolsUtil.isEmpty(wireConfig.getBracketHeight())){
			bracketHeight.add(wireConfig.getBracketHeight());
		}
		objMap.put("bracketHeight",bracketHeight);
		objMap.put("totalList",totalList);
				
		return objMap;
	}

	/**
	 * 根据项目ID获得导线型号数据
	 */
	@RequestMapping(value = "/getWireTypeById.action")
	@ResponseBody
	public Object getWireTypeById(String id) {

		RouteInfo route = partsService.getRouteById(id);
		String tensileSection = route.getTensileSection();
		Object reply;
		List<List<String>> tensileList = new ArrayList<List<String>>();
		if (!ToolsUtil.isEmpty(tensileSection)) {
			reply = (ToolsUtil.strToJson(tensileSection, List.class));
			tensileList = (List<List<String>>) reply;
		}
		List<String> wireTypeList = new ArrayList<String>();// 导线型号集合
		List<String> groundTypeList = new ArrayList<String>();// 地线型号集合

		for (int i = 1; i < tensileList.size(); i++) {
			wireTypeList.add(tensileList.get(i).get(44));// 导线型号1
			wireTypeList.add(tensileList.get(i).get(47));// 导线型号2
			wireTypeList.add(tensileList.get(i).get(50));// 导线型号3
			wireTypeList.add(tensileList.get(i).get(53));// 导线型号4
			wireTypeList.add(tensileList.get(i).get(56));// 导线型号5
			wireTypeList.add(tensileList.get(i).get(59));// 导线型号6
			wireTypeList.add(tensileList.get(i).get(62));// 导线型号7
			wireTypeList.add(tensileList.get(i).get(65));// 导线型号8
			wireTypeList.add(tensileList.get(i).get(68));// 导线型号9
			wireTypeList.add(tensileList.get(i).get(71));// 导线型号10
			wireTypeList.add(tensileList.get(i).get(74));// 导线型号11
			wireTypeList.add(tensileList.get(i).get(77));// 导线型号12
		}
		for (int i = 1; i < tensileList.size(); i++) {
			groundTypeList.add(tensileList.get(i).get(80));// 地线型号1
			groundTypeList.add(tensileList.get(i).get(82));// 地线型号2
			groundTypeList.add(tensileList.get(i).get(84));// 地线型号3
			groundTypeList.add(tensileList.get(i).get(86));// 地线型号4
			groundTypeList.add(tensileList.get(i).get(88));// 地线型号5
			groundTypeList.add(tensileList.get(i).get(90));// 地线型号6
			groundTypeList.add(tensileList.get(i).get(92));// 地线型号7
			groundTypeList.add(tensileList.get(i).get(94));// 地线型号8
			groundTypeList.add(tensileList.get(i).get(96));// 地线型号9
			groundTypeList.add(tensileList.get(i).get(98));// 地线型号10
			groundTypeList.add(tensileList.get(i).get(100));// 地线型号11
			groundTypeList.add(tensileList.get(i).get(102));// 地线型号12
		}

		wireTypeList = getRemovalList(wireTypeList);
		groundTypeList = getRemovalList(groundTypeList);
		List<String> OPGWList = new ArrayList<String>();// OPGW导线型号集合
		List<String> groundList = new ArrayList<String>();// 地线中除OPGW导线型号集合
		for (int i = 0; i < groundTypeList.size(); i++) {
			if (groundTypeList.get(i).substring(0, 4).equals("OPGW")) {
				OPGWList.add(groundTypeList.get(i));
			} else {
				groundList.add(groundTypeList.get(i));
			}
		}

		Map<String, List<String>> objMap = new HashMap<String, List<String>>();

		objMap.put("wireList", wireTypeList);
		objMap.put("groundList", groundList);
		objMap.put("OPGWList", OPGWList);

		return objMap;
	}

	/**
	 * 根据项目ID获得route文件耐张段编号
	 */
	@RequestMapping(value = "/getNumberById.action")
	@ResponseBody
	public Object getNumberById(String id) {

		RouteInfo route = partsService.getRouteById(id);
		String tensileSection = route.getTensileSection();
		Object reply;
		List<List<String>> tensileList = new ArrayList<List<String>>();
		if (!ToolsUtil.isEmpty(tensileSection)) {
			reply = (ToolsUtil.strToJson(tensileSection, List.class));
			tensileList = (List<List<String>>) reply;
		}
		List<String> numberList = new ArrayList<String>();// 耐张段编号

		for (int i = 1; i < tensileList.size(); i++) {
			numberList.add(tensileList.get(i).get(0));// 耐张段编号
		}

		return numberList;
	}

	/**
	 * 根据项目ID获得配置数据
	 */
	@RequestMapping(value = "/getConfigDataById.action")
	@ResponseBody
	public Object getConfigDataById(String id) {

		MainInfo main = towerService.getMainInfo(id);
		String wireId = main.getWireConfigId();
		String wireData = null;
		String groundData = null;
		String OPGWData = null;
		String wireDefault = null;
		String groundDefault = null;
		String OPGWDefault = null;

		if (!ToolsUtil.isEmpty(wireId)) {
			WireConfiguration wireConfig = partsService.getWireConfig(wireId);
			wireData = wireConfig.getWireConfigData();
			groundData = wireConfig.getGroundConfigData();
			OPGWData = wireConfig.getOPGWConfigData();
			wireDefault = wireConfig.getWireDefaultConfig();
			groundDefault = wireConfig.getGroundDefaultConfig();
			OPGWDefault = wireConfig.getOPGWDefaultConfig();
		}
		Map<String, String> objMap = new HashMap<String, String>();
		objMap.put("wireData", wireData);
		objMap.put("groundData", groundData);
		objMap.put("OPGWData", OPGWData);
		objMap.put("wireDefault", wireDefault);
		objMap.put("groundDefault", groundDefault);
		objMap.put("OPGWDefault", OPGWDefault);

		return objMap;
	}

	/**
	 * 保存串行配置
	 */
	@RequestMapping(value = "/saveStingConfig.action", method = RequestMethod.POST)
	@ResponseBody
	public Object saveStingConfig(String wire, String ground, String OPGW, String id, HttpServletRequest request) {
		MainInfo main = towerService.getMainInfo(id);
		WireConfiguration wireConfig = new WireConfiguration();
		String wireId = main.getWireConfigId();
		if (!ToolsUtil.isEmpty(wireId)) {
			wireConfig = partsService.getWireConfig(wireId);
		} else {
			wireConfig.setId(CommonTool.createUUID());
			main.setWireConfigId(wireConfig.getId());
		}
		wireConfig.setWireConfigData(wire);
		wireConfig.setGroundConfigData(ground);
		wireConfig.setOPGWConfigData(OPGW);

		Map<String, Object> objMap = new HashMap<String, Object>();
		try {
			partsService.saveStingConfig(main, wireConfig);
			objMap.put("msg", "success");
		} catch (Exception e) {
			objMap.put("msg", "error");
		}
		return objMap;
	}

	/**
	 * 保存光缆盘长计算配置
	 */
	@RequestMapping(value = "/saveCable.action", method = RequestMethod.POST)
	@ResponseBody
	public Object saveCable(String cable,String id,String modulus,String margin, HttpServletRequest request) {
		MainInfo main = towerService.getMainInfo(id);
		WireConfiguration wireConfig = new WireConfiguration();
		String wireId = main.getWireConfigId();
		wireConfig = partsService.getWireConfig(wireId);
		wireConfig.setCableLengthMargin(Double.parseDouble(margin));
		wireConfig.setCableLengthModulus(Double.parseDouble(modulus));
		wireConfig.setBracketHeight(cable);

		Map<String, Object> objMap = new HashMap<String, Object>();
		try {
			partsService.saveDefaultConfig(wireConfig);
			objMap.put("msg", "success");
		} catch (Exception e) {
			objMap.put("msg", "error");
		}
		return objMap;
	}

	/**
	 * 保存光缆盘长计算配置
	 */
	@RequestMapping(value = "/saveHammerType.action", method = RequestMethod.POST)
	@ResponseBody
	public Object saveHammerType(String hammerType,String id, HttpServletRequest request) {
		MainInfo main = towerService.getMainInfo(id);
		WireConfiguration wireConfig = new WireConfiguration();
		String wireId = main.getWireConfigId();
		wireConfig = partsService.getWireConfig(wireId);
		
		wireConfig.setHammerType(hammerType);

		Map<String, Object> objMap = new HashMap<String, Object>();
		try {
			partsService.saveDefaultConfig(wireConfig);
			objMap.put("msg", "success");
		} catch (Exception e) {
			objMap.put("msg", "error");
		}
		return objMap;
	}
	
	/**
	 * 保存串行配置
	 */
	@RequestMapping(value = "/saveDefaultConfig.action", method = RequestMethod.POST)
	@ResponseBody
	public Object saveDefaultConfig(String wire, String ground, String OPGW, String id, HttpServletRequest request) {
		MainInfo main = towerService.getMainInfo(id);
		WireConfiguration wireConfig = new WireConfiguration();
		String wireId = main.getWireConfigId();

		wireConfig = partsService.getWireConfig(wireId);

		wireConfig.setWireDefaultConfig(wire);
		wireConfig.setGroundDefaultConfig(ground);
		wireConfig.setOPGWDefaultConfig(OPGW);

		Map<String, Object> objMap = new HashMap<String, Object>();
		try {
			partsService.saveDefaultConfig(wireConfig);
			objMap.put("msg", "success");
		} catch (Exception e) {
			objMap.put("msg", "error");
		}
		return objMap;
	}

	/**
	 * 保存防震锤配置
	 */
	@RequestMapping(value = "/saveVibrationDamper.action", method = RequestMethod.POST)
	@ResponseBody
	public Object saveVibrationDamper(String vibrationParam, String id, HttpServletRequest request) {
		List<Map<String, Object>> list = (List<Map<String, Object>>) ToolsUtil.strToJson(vibrationParam, List.class);
		List<VibrationDamper> damperList = new ArrayList<VibrationDamper>();
		List<VibrationDamper> vibrationDampers = partsService.getVibrationDamperList();
		if (!ToolsUtil.isEmpty(vibrationDampers)) {
			for (Map<String, Object> map : list) {

				if (map.get("vibrationType").equals(0)) {
					VibrationDamper damper = new VibrationDamper();
					damper.setId(CommonTool.createUUID());// 主键ID
					damper.setVibrationType(0);// 0：地线；
					damper.setMinSpan(Double.parseDouble(map.get("minSpan") + ""));// 档距下限
					damper.setMaxSpan(Double.parseDouble(map.get("maxSpan") + ""));// 档距上限
					damper.setSortNo(Integer.parseInt(map.get("sortNo") + ""));// 序号
					damper.setCount(Integer.parseInt(map.get("count") + ""));// 数量
					damper.setProjectId(id);// 工程ID
					damperList.add(damper);
				}

			}
		} else {
			for (Map<String, Object> map : list) {
				VibrationDamper damper = new VibrationDamper();
				if (map.get("vibrationType").equals(0)) {
					damper.setId(CommonTool.createUUID());// 主键ID
					damper.setVibrationType(0);// 0：地线；
					damper.setMinSpan(Double.parseDouble(map.get("minSpan") + ""));// 档距下限
					damper.setMaxSpan(Double.parseDouble(map.get("maxSpan") + ""));// 档距上限
					damper.setSortNo(Integer.parseInt(map.get("sortNo") + ""));// 序号
					damper.setCount(Integer.parseInt(map.get("count") + ""));// 数量
					damper.setProjectId(id);// 工程ID
				} else {
					damper.setId(CommonTool.createUUID());// 主键ID
					damper.setVibrationType(Integer.parseInt(map.get("vibrationType") + ""));
					damper.setMinDiameter(Double.parseDouble(map.get("minDiameter") + ""));// 直径范围最小值
					damper.setMaxDiameter(Double.parseDouble(map.get("maxDiameter") + ""));// 直径范围最大值
					damper.setMinSpan(Double.parseDouble(map.get("minSpan") + ""));// 档距下限
					damper.setMaxSpan(Double.parseDouble(map.get("maxSpan") + ""));// 档距上限
					damper.setSortNo(Integer.parseInt(map.get("sortNo") + ""));// 序号
					damper.setCount(Integer.parseInt(map.get("count") + ""));// 数量
				}
				damperList.add(damper);
			}
		}
		Map<String, Object> objMap = new HashMap<String, Object>();
		try {
			partsService.saveVibrationDamper(damperList, id);
			objMap.put("msg", "success");
		} catch (Exception e) {
			objMap.put("msg", "error");
		}
		return objMap;
	}

	/**
	 * 获取阶段状态
	 * 
	 * @param string
	 * @return state阶段状态
	 */
	public String getState(Object[] obj) {
		String state = new String();
		String id = new String();
		if (!ToolsUtil.isEmpty(obj[5])) {
			String str = obj[5].toString();
			if (str.equals("1")) {
				id = (String) obj[6];
			} else if (str.equals("2")) {
				id = (String) obj[7];
			} else if (str.equals("3")) {
				id = (String) obj[8];
			} else if (str.equals("4")) {
				id = (String) obj[9];
			}
			state = towerService.getState(id, str);
		} else {

			state = "";
		}
		return state;
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
			if (!tempList.contains(object) && !object.equals("null")) {
				tempList.add(object);
			}
			}
		}
		return tempList;
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
			if(!ToolsUtil.isEmpty(object)){
			if (!object.equals("null")) {
				tempList.add(object);
			}
			}
		}
		return tempList;
	}

	/**
	 * 根据导线分裂数获取导线数量
	 * 
	 * @param str
	 *            导线分裂数
	 * @return count 数量
	 */
	public int getWireCount(String str) {
		int count = 0;
		if (!ToolsUtil.isEmpty(str)) {
			if (!str.equals("null")) {
			count = 1;
		}
		}
		return count;
	}

	/**
	 * 根据导线分裂数获取导线数量
	 * 
	 * @param str
	 *            导线分裂数
	 * @return count 数量
	 */
	public int getWireSplitCount(String str) {
		int count = 0;
		if (str.equals("单导线")) {
			count = 1;
		} else if (str.equals("垂直双分裂") || str.equals("水平双分裂")) {
			count = 2;
		} else if (str.equals("四分裂")) {
			count = 4;
		}
		return count;
	}

	/**
	 * 根据地线型号获取地线数量
	 * 
	 * @param str
	 *            地线型号
	 * @return count 数量
	 */
	public int getGroundCount(String str) {
		int count = 0;

		if (!ToolsUtil.isEmpty(str)) {
			if (!str.equals("null")&&str.length() < 4) {
				count = 1;
			} else if (!str.substring(0, 4).equals("OPGW")) {
				count = 1;
			}
		}

		return count;
	}

	/**
	 * 根据地线型号获取OPGW数量
	 * 
	 * @param str
	 *            地线型号
	 * @return count 数量
	 */
	public int getOPGWCount(String str) {
		int count = 0;

		if (!ToolsUtil.isEmpty(str)) {
			if (!str.equals("null") || str.length()>= 4) {
			if (str.substring(0, 4).equals("OPGW")) {
				count = 1;
			}
			}
		}

		return count;
	}

	/**
	 * 获取导线代号信息
	 * 
	 * @param id
	 *            pagingSize jList result
	 * @return sumTypeList 导线代号信息
	 */
	public List<List<List<String>>> getSumTypeList(String id, int pagingSize, List<List<List<String>>> jList,
			List<List<String>> result) {
		// TA文件起始塔下标
		List<Integer> startList = new ArrayList<Integer>();
		startList.add(1);
		for (int i = 1; i < result.size() / pagingSize; i++) {
			if (result.get(i * pagingSize - 3).get(0).equals("0")) {
				startList.add(i * pagingSize + 1);
			}
		}
		;

		List<List<Integer>> newlists = new ArrayList<List<Integer>>();
		for (int i = 0; i < jList.size(); i++) {
			for (int j = 0; j < jList.get(i).size(); j++) {
				List<Integer> newlist = new ArrayList<Integer>();
				int startInTa = Integer.parseInt(jList.get(i).get(j).get(0)) * 2;
				int start = startInTa + (int) Math.floor((startInTa + 2) / pagingSize) * 3 + startList.get(i);

				int endInTa = Integer.parseInt(jList.get(i).get(j).get(1)) * 2;
				int end = endInTa + (int) Math.floor((endInTa + 2) / pagingSize) * 3 + startList.get(i);
				newlist.add(start);
				newlist.add(end);
				newlists.add(newlist);
			}
		}
		;

		RouteInfo route = partsService.getRouteById(id);
		String tensileSection = route.getTensileSection();
		Object reply;
		List<List<String>> tensileList = new ArrayList<List<String>>();
		if (!ToolsUtil.isEmpty(tensileSection)) {
			reply = (ToolsUtil.strToJson(tensileSection, List.class));
			tensileList = (List<List<String>>) reply;
		}
		List<String> wireTypeList = new ArrayList<String>();// 导线型号集合
		//List<String> groundTypeList = new ArrayList<String>();// 地线型号集合
		List<String> OPGWList = new ArrayList<String>();// OPGW导线型号集合
		List<String> groundList = new ArrayList<String>();// 地线中除OPGW导线型号集合

		for (int i = 1; i < tensileList.size(); i++) {
			List<String> wireType = new ArrayList<String>();// 导线型号

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
		
			wireTypeList.add(getRemovalList(wireType).get(0));
		}
		for (int i = 1; i < tensileList.size(); i++) {
			List<String> groundType = new ArrayList<String>();// 地线型号
			List<String> groundRemovalType = new ArrayList<String>();// 地线型号
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
			
			groundRemovalType = getRemovalList(groundType);
			String ground="";
			String OPGW="";
			for (int j = 0; j < groundRemovalType.size(); j++) {
				if (groundRemovalType.get(j).length()>=4) {
					if (groundRemovalType.get(j).substring(0, 4).equals("OPGW")) {
						OPGW=groundRemovalType.get(j);	
					}else{
						ground=groundRemovalType.get(j);
					}
				}else{
					ground=groundRemovalType.get(j);
				}
				
			}
			OPGWList.add(OPGW);
			groundList.add(ground);
		}

		MainInfo main = towerService.getMainInfo(id);
		String wireId = main.getWireConfigId();

		String wireDefault = null;
		String groundDefault = null;
		String OPGWDefault = null;

		if (!ToolsUtil.isEmpty(wireId)) {
			WireConfiguration wireConfig = partsService.getWireConfig(wireId);

			wireDefault = wireConfig.getWireDefaultConfig();
			groundDefault = wireConfig.getGroundDefaultConfig();
			OPGWDefault = wireConfig.getOPGWDefaultConfig();
		}

		// 导线跳线
		Object wireReply;
		Map<String, List<String>> wireList = new HashMap<String, List<String>>();
		if (!ToolsUtil.isEmpty(wireDefault)) {
			wireReply = (ToolsUtil.strToJson(wireDefault, Map.class));
			wireList = (Map<String, List<String>>) wireReply;
		}
		List<List<List<String>>> wireTypetotal = new ArrayList<List<List<String>>>();
		for (int i = 0; i < wireTypeList.size(); i++) {
			List<List<String>> wireType = new ArrayList<List<String>>();
			List<String> wirehang = new ArrayList<String>();// 导线悬垂代号集合
			List<String> wirehangDefault = new ArrayList<String>();// 导线悬垂默认代号
			List<String> wirenai = new ArrayList<String>();// 导线耐张代号集合
			List<String> wirenaiDefault = new ArrayList<String>();// 导线耐张默认代号
			List<String> tiaohang = new ArrayList<String>();// 跳线悬垂代号集合
			List<String> tiaohangDefault = new ArrayList<String>();// 跳线悬垂默认代号

			wirehang.add(wireList.get(wireTypeList.get(i)).get(0));
			wirehangDefault.add(wireList.get(wireTypeList.get(i)).get(1));
			wirenai.add(wireList.get(wireTypeList.get(i)).get(2));
			wirenaiDefault.add(wireList.get(wireTypeList.get(i)).get(3));
			tiaohang.add(wireList.get(wireTypeList.get(i)).get(4));
			tiaohangDefault.add(wireList.get(wireTypeList.get(i)).get(5));
			wireType.add(wirehang);
			wireType.add(wirehangDefault);
			wireType.add(wirenai);
			wireType.add(wirenaiDefault);
			wireType.add(tiaohang);
			wireType.add(tiaohangDefault);
			wireTypetotal.add(wireType);
		}

		// 地线
		Object groundReply;
		Map<String, List<String>> groundDefaultList = new HashMap<String, List<String>>();
		if (!ToolsUtil.isEmpty(groundDefault)) {
			groundReply = (ToolsUtil.strToJson(groundDefault, Map.class));
			groundDefaultList = (Map<String, List<String>>) groundReply;
		}
		List<List<List<String>>> groundTypetotal = new ArrayList<List<List<String>>>();
		for (int i = 0; i < groundList.size(); i++) {
			List<List<String>> groundType = new ArrayList<List<String>>();
			List<String> groundhang = new ArrayList<String>();// 地线悬垂代号集合
			List<String> groundhangDefault = new ArrayList<String>();// 地线悬垂默认代号
			List<String> groundnai = new ArrayList<String>();// 地线耐张代号集合
			List<String> groundnaiDefault = new ArrayList<String>();// 地线耐张默认代号

			if (!ToolsUtil.isEmpty(groundList.get(i))) {
				groundhang.add(groundDefaultList.get(groundList.get(i)).get(0));
				groundhangDefault.add(groundDefaultList.get(groundList.get(i)).get(1));
				groundnai.add(groundDefaultList.get(groundList.get(i)).get(2));
				groundnaiDefault.add(groundDefaultList.get(groundList.get(i)).get(3));
			} else {
				groundhang.add("");
				groundnai.add("");
			}
			groundType.add(groundhang);
			groundType.add(groundhangDefault);
			groundType.add(groundnai);
			groundType.add(groundnaiDefault);
			groundTypetotal.add(groundType);
		}

		// OPGW光缆
		Object OPGWReply;
		Map<String, List<String>> OPGWDefaultList = new HashMap<String, List<String>>();
		if (!ToolsUtil.isEmpty(OPGWDefault)) {
			OPGWReply = (ToolsUtil.strToJson(OPGWDefault, Map.class));
			OPGWDefaultList = (Map<String, List<String>>) OPGWReply;
		}
		List<List<List<String>>> OPGWTypetotal = new ArrayList<List<List<String>>>();
		for (int i = 0; i < OPGWList.size(); i++) {
			List<List<String>> OPGWType = new ArrayList<List<String>>();
			List<String> OPGWhang = new ArrayList<String>();// 地线悬垂代号集合
			List<String> OPGWhangDefault = new ArrayList<String>();// 地线默认悬垂代号
			List<String> OPGWnai = new ArrayList<String>();// 地线耐张代号集合
			List<String> OPGWnaiDefault = new ArrayList<String>();// 地线默认耐张代号
			if (!ToolsUtil.isEmpty(OPGWList.get(i))) {
				OPGWhang.add(OPGWDefaultList.get(OPGWList.get(i)).get(0));
				OPGWhangDefault.add(OPGWDefaultList.get(OPGWList.get(i)).get(1));
				OPGWnai.add(OPGWDefaultList.get(OPGWList.get(i)).get(2));
				OPGWnaiDefault.add(OPGWDefaultList.get(OPGWList.get(i)).get(3));
			} else {
				OPGWhang.add("");
				OPGWnai.add("");
			}
			OPGWType.add(OPGWhang);
			OPGWType.add(OPGWhangDefault);
			OPGWType.add(OPGWnai);
			OPGWType.add(OPGWnaiDefault);
			OPGWTypetotal.add(OPGWType);
		}

		List<List<String>> wireNaiType = new ArrayList<List<String>>();// 导线耐张
		List<List<String>> wireHangType = new ArrayList<List<String>>();// 导线悬垂
		List<List<String>> tiaoHangType = new ArrayList<List<String>>();// 跳线悬垂
		List<List<String>> groundNaiType = new ArrayList<List<String>>();// 地线耐张
		List<List<String>> groundHangType = new ArrayList<List<String>>();// 地线悬垂
		List<List<String>> OPGWNaiType = new ArrayList<List<String>>();// OPGW耐张
		List<List<String>> OPGWHangType = new ArrayList<List<String>>();// OPGW悬垂
		List<List<String>> wireNaiTypeDefault = new ArrayList<List<String>>();// 导线默认耐张
		List<List<String>> wireHangTypeDefault = new ArrayList<List<String>>();// 导线默认悬垂
		List<List<String>> tiaoHangTypeDefault = new ArrayList<List<String>>();// 跳线默认悬垂
		List<List<String>> groundNaiTypeDefault = new ArrayList<List<String>>();// 地线默认耐张
		List<List<String>> groundHangTypeDefault = new ArrayList<List<String>>();// 地线默认悬垂
		List<List<String>> OPGWNaiTypeDefault = new ArrayList<List<String>>();// OPGW默认耐张
		List<List<String>> OPGWHangTypeDefault = new ArrayList<List<String>>();// OPGW默认悬垂
		List<Integer> wireNailist = new ArrayList<Integer>();
		List<Integer> wireHanglist = new ArrayList<Integer>();
		List<String> newWireNailist = new ArrayList<String>();
		List<String> newWireHanglist = new ArrayList<String>();
		for (int i = 0; i < result.size(); i++) {
			for (int j = 0; j < newlists.size(); j++) {
				if (i == newlists.get(j).get(1) || i == newlists.get(j).get(1) + 1 || i == newlists.get(j).get(0) + 1) {
					wireNailist.add(i);
					wireNaiType.add(wireTypetotal.get(j).get(2));
					wireNaiTypeDefault.add(wireTypetotal.get(j).get(3));
					tiaoHangType.add(wireTypetotal.get(j).get(4));
					tiaoHangTypeDefault.add(wireTypetotal.get(j).get(5));
					groundNaiType.add(groundTypetotal.get(j).get(2));
					groundNaiTypeDefault.add(groundTypetotal.get(j).get(3));
					OPGWNaiType.add(OPGWTypetotal.get(j).get(2));
					OPGWNaiTypeDefault.add(OPGWTypetotal.get(j).get(3));
					break;
				} else if (i > newlists.get(j).get(0) + 1 && i < newlists.get(j).get(1) && i % 2 != 0) {
					wireHanglist.add(i);
					wireHangType.add(wireTypetotal.get(j).get(0));
					wireHangTypeDefault.add(wireTypetotal.get(j).get(1));
					groundHangType.add(groundTypetotal.get(j).get(0));
					groundHangTypeDefault.add(groundTypetotal.get(j).get(1));
					OPGWHangType.add(OPGWTypetotal.get(j).get(0));
					OPGWHangTypeDefault.add(OPGWTypetotal.get(j).get(1));
					break;
				}

			}
		}
		;

		for (int i = 0; i < wireNailist.size(); i++) {

			newWireNailist.add((wireNailist.get(i) + ((int) Math.floor(wireNailist.get(i) / pagingSize)) + 2) + "");

		}
		for (int i = 0; i < wireHanglist.size(); i++) {
			newWireHanglist.add((wireHanglist.get(i) + ((int) Math.floor(wireHanglist.get(i) / pagingSize)) + 2) + "");
		}
		List<List<String>> sumIndexList = new ArrayList<List<String>>();
		sumIndexList.add(newWireNailist);
		sumIndexList.add(newWireHanglist);

		List<List<List<String>>> sumTypeList = new ArrayList<List<List<String>>>();
		sumTypeList.add(sumIndexList);
		sumTypeList.add(wireNaiType);
		sumTypeList.add(wireNaiTypeDefault);
		sumTypeList.add(wireHangType);
		sumTypeList.add(wireHangTypeDefault);
		sumTypeList.add(tiaoHangType);
		sumTypeList.add(tiaoHangTypeDefault);
		sumTypeList.add(groundNaiType);
		sumTypeList.add(groundNaiTypeDefault);
		sumTypeList.add(groundHangType);
		sumTypeList.add(groundHangTypeDefault);
		sumTypeList.add(OPGWNaiType);
		sumTypeList.add(OPGWNaiTypeDefault);
		sumTypeList.add(OPGWHangType);
		sumTypeList.add(OPGWHangTypeDefault);

		return sumTypeList;
	}

	/**
	 * 获取导线数量信息
	 * 
	 * @param id
	 *            pagingSize jList result
	 * @return sumTypeList 导线代号信息
	 */
	public List<List<List<String>>> getSumCountList(String id, int pagingSize, List<List<List<String>>> jList,
			List<List<String>> result) {
		// TA文件起始塔下标
		List<Integer> startList = new ArrayList<Integer>();
		startList.add(1);
		for (int i = 1; i < result.size() / pagingSize; i++) {
			if (result.get(i * pagingSize - 3).get(0).equals("0")) {
				startList.add(i * pagingSize + 1);
			}
		}
		;

		List<List<String>> newlists = new ArrayList<List<String>>();
		for (int i = 0; i < jList.size(); i++) {
			for (int j = 0; j < jList.get(i).size(); j++) {
				List<String> newlist = new ArrayList<String>();
				int startInTa = Integer.parseInt(jList.get(i).get(j).get(0)) * 2;
				int start = startInTa + (int) Math.floor((startInTa + 2) / pagingSize) * 3 + startList.get(i);

				int endInTa = Integer.parseInt(jList.get(i).get(j).get(1)) * 2;
				int end = endInTa + (int) Math.floor((endInTa + 2) / pagingSize) * 3 + startList.get(i);
				newlist.add(start + "");
				newlist.add(end + "");
				newlists.add(newlist);
			}
		}
		;

		// route文耐张段信息
		RouteInfo route = partsService.getRouteById(id);
		String tensileSection = route.getTensileSection();
		Object reply;
		List<List<String>> tensileList = new ArrayList<List<String>>();
		if (!ToolsUtil.isEmpty(tensileSection)) {
			reply = (ToolsUtil.strToJson(tensileSection, List.class));
			tensileList = (List<List<String>>) reply;
		}

		MainInfo main = towerService.getMainInfo(id);
		String wireId = main.getWireConfigId();
		WireConfiguration wireConfig = partsService.getWireConfig(wireId);

		String wireDefault = wireConfig.getWireDefaultConfig();

		// 导线配置信息
		Object wireReply;
		Map<String, List<String>> wireList = new HashMap<String, List<String>>();
		if (!ToolsUtil.isEmpty(wireDefault)) {
			wireReply = (ToolsUtil.strToJson(wireDefault, Map.class));
			wireList = (Map<String, List<String>>) wireReply;
		}

		List<String> wireCount = new ArrayList<String>();// 导线数量
		List<String> tiaoCount = new ArrayList<String>();// 跳线数量
		for (int i = 1; i < tensileList.size(); i++) {
			List<String> tensile = tensileList.get(i);
			wireCount.add((getWireCount(tensile.get(44)) + getWireCount(tensile.get(47)) + getWireCount(tensile.get(50))
					+ getWireCount(tensile.get(53))+ getWireCount(tensile.get(56))+ getWireCount(tensile.get(59))
					+ getWireCount(tensile.get(62))+ getWireCount(tensile.get(65))+ getWireCount(tensile.get(68))
					+ getWireCount(tensile.get(71))+ getWireCount(tensile.get(74))+ getWireCount(tensile.get(77))) * 3 + "");// 导线数量

			int tiao1 = getCountByAngleAndPosition(
					Double.parseDouble(ToolsUtil.isEmpty(tensile.get(33)) ? "0" : tensile.get(33)), tensile.get(44),
					tensile.get(46), wireList);
			int tiao2 = getCountByAngleAndPosition(
					Double.parseDouble(ToolsUtil.isEmpty(tensile.get(33)) ? "0" : tensile.get(33)), tensile.get(47),
					tensile.get(49), wireList);
			int tiao3 = getCountByAngleAndPosition(
					Double.parseDouble(ToolsUtil.isEmpty(tensile.get(33)) ? "0" : tensile.get(33)), tensile.get(50),
					tensile.get(52), wireList);
			int tiao4 = getCountByAngleAndPosition(
					Double.parseDouble(ToolsUtil.isEmpty(tensile.get(33)) ? "0" : tensile.get(33)), tensile.get(53),
					tensile.get(55), wireList);
			int tiao5 = getCountByAngleAndPosition(
					Double.parseDouble(ToolsUtil.isEmpty(tensile.get(33)) ? "0" : tensile.get(33)), tensile.get(56),
					tensile.get(58), wireList);
			int tiao6 = getCountByAngleAndPosition(
					Double.parseDouble(ToolsUtil.isEmpty(tensile.get(33)) ? "0" : tensile.get(33)), tensile.get(59),
					tensile.get(61), wireList);
			int tiao7 = getCountByAngleAndPosition(
					Double.parseDouble(ToolsUtil.isEmpty(tensile.get(33)) ? "0" : tensile.get(33)), tensile.get(62),
					tensile.get(64), wireList);
			int tiao8 = getCountByAngleAndPosition(
					Double.parseDouble(ToolsUtil.isEmpty(tensile.get(33)) ? "0" : tensile.get(33)), tensile.get(65),
					tensile.get(67), wireList);
			int tiao9 = getCountByAngleAndPosition(
					Double.parseDouble(ToolsUtil.isEmpty(tensile.get(33)) ? "0" : tensile.get(33)), tensile.get(68),
					tensile.get(70), wireList);
			int tiao10 = getCountByAngleAndPosition(
					Double.parseDouble(ToolsUtil.isEmpty(tensile.get(33)) ? "0" : tensile.get(33)), tensile.get(71),
					tensile.get(73), wireList);
			int tiao11 = getCountByAngleAndPosition(
					Double.parseDouble(ToolsUtil.isEmpty(tensile.get(33)) ? "0" : tensile.get(33)), tensile.get(74),
					tensile.get(76), wireList);
			int tiao12 = getCountByAngleAndPosition(
					Double.parseDouble(ToolsUtil.isEmpty(tensile.get(33)) ? "0" : tensile.get(33)), tensile.get(77),
					tensile.get(79), wireList);
			tiaoCount.add((tiao1 + tiao2 + tiao3 + tiao4 + tiao5 + tiao6 + tiao7 + tiao8 + tiao9 + tiao10 + tiao11 + tiao12) + "");
		}

		List<String> groundCount = new ArrayList<String>();// 地线数量
		List<String> OPGWCount = new ArrayList<String>();// OPGW数量
		for (int i = 1; i < tensileList.size(); i++) {
			groundCount.add(getGroundCount(tensileList.get(i).get(80)) + getGroundCount(tensileList.get(i).get(82))
					+ getGroundCount(tensileList.get(i).get(84)) + getGroundCount(tensileList.get(i).get(86))
					+ getGroundCount(tensileList.get(i).get(88)) + getGroundCount(tensileList.get(i).get(90))
					+ getGroundCount(tensileList.get(i).get(92)) + getGroundCount(tensileList.get(i).get(94))
					+ getGroundCount(tensileList.get(i).get(96)) + getGroundCount(tensileList.get(i).get(98))
					+ getGroundCount(tensileList.get(i).get(100)) + getGroundCount(tensileList.get(i).get(102))+ "");// 地线数量
			OPGWCount.add(getOPGWCount(tensileList.get(i).get(80)) + getOPGWCount(tensileList.get(i).get(82))
					+ getOPGWCount(tensileList.get(i).get(84)) + getOPGWCount(tensileList.get(i).get(86))
					+ getOPGWCount(tensileList.get(i).get(88)) + getOPGWCount(tensileList.get(i).get(90))
					+ getOPGWCount(tensileList.get(i).get(92)) + getOPGWCount(tensileList.get(i).get(94))
					+ getOPGWCount(tensileList.get(i).get(96)) + getOPGWCount(tensileList.get(i).get(98))
					+ getOPGWCount(tensileList.get(i).get(100)) + getOPGWCount(tensileList.get(i).get(102))+ "");// OPGW数量

		}

		List<List<String>> countList = new ArrayList<List<String>>();// 数量集合
		countList.add(wireCount);
		countList.add(groundCount);
		countList.add(OPGWCount);
		countList.add(tiaoCount);

		List<List<List<String>>> sumCountList = new ArrayList<List<List<String>>>();
		sumCountList.add(newlists);
		sumCountList.add(countList);

		return sumCountList;
	}

	/**
	 * 获取防震锤数量信息
	 * 
	 * @param id
	 *            pagingSize jList result
	 * @return
	 */
	public List<List<List<String>>> getHammerCountList(String id, int pagingSize, List<List<List<String>>> jList,
			List<List<String>> result, List<List<String>> towerobj) {
		// TA文件起始塔下标
		List<Integer> startList = new ArrayList<Integer>();
		startList.add(1);
		for (int i = 1; i < result.size() / pagingSize; i++) {
			if (result.get(i * pagingSize - 3).get(0).equals("0")) {
				startList.add(i * pagingSize + 1);
			}
		}
		;

		List<List<String>> newlists = new ArrayList<List<String>>();
		for (int i = 0; i < jList.size(); i++) {
			for (int j = 0; j < jList.get(i).size(); j++) {
				List<String> newlist = new ArrayList<String>();
				int startInTa = Integer.parseInt(jList.get(i).get(j).get(0)) * 2;
				int start = startInTa + (int) Math.floor((startInTa + 2) / pagingSize) * 3 + startList.get(i);

				int endInTa = Integer.parseInt(jList.get(i).get(j).get(1)) * 2;
				int end = endInTa + (int) Math.floor((endInTa + 2) / pagingSize) * 3 + startList.get(i);
				newlist.add(start + "");
				newlist.add(end + "");
				newlists.add(newlist);
			}
		}
		;

		RouteInfo route = partsService.getRouteById(id);
		// route文件耐张段信息
		String tensileSection = route.getTensileSection();
		// route文件导线参数
		String conductorParam = route.getConductorParam();
		Object reply;
		List<List<String>> tensileList = new ArrayList<List<String>>();
		if (!ToolsUtil.isEmpty(tensileSection)) {
			reply = (ToolsUtil.strToJson(tensileSection, List.class));
			tensileList = (List<List<String>>) reply;
		}

		Object conductorReply;
		Map<String, String> conductormap = new HashMap<String, String>();
		if (!ToolsUtil.isEmpty(conductorParam)) {
			conductorReply = (ToolsUtil.strToJson(conductorParam, Map.class));
			conductormap = (Map<String, String>) conductorReply;
		}


		List<List<String>> wireSumList = new ArrayList<List<String>>();// 导线直径,回路数分裂数集合
		List<String> conductorList = new ArrayList<String>();// 导线型号集合
		List<String> conductorDiameter = new ArrayList<String>();// 导线型号集合
		List<String> groundTypeList = new ArrayList<String>();// 地线型号集合
		List<String> groundlists = new ArrayList<String>();// 地线型号集合(除OPGW)
		List<String> OPGWlists = new ArrayList<String>();// OPGW型号集合
		
		for (int i = 1; i < tensileList.size(); i++) {
			List<String> wireTypeList = new ArrayList<String>();// 导线直径集合
			List<String> wireType = new ArrayList<String>();// 导线型号
			List<String> wireSplit = new ArrayList<String>();// 导线分裂

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

			wireSplit.add(tensileList.get(i).get(45));// 导线分裂1
			wireSplit.add(tensileList.get(i).get(48));// 导线分裂2
			wireSplit.add(tensileList.get(i).get(51));// 导线分裂3
			wireSplit.add(tensileList.get(i).get(54));// 导线分裂4
			wireSplit.add(tensileList.get(i).get(57));// 导线分裂5
			wireSplit.add(tensileList.get(i).get(60));// 导线分裂6
			wireSplit.add(tensileList.get(i).get(63));// 导线分裂7
			wireSplit.add(tensileList.get(i).get(66));// 导线分裂8
			wireSplit.add(tensileList.get(i).get(69));// 导线分裂9
			wireSplit.add(tensileList.get(i).get(72));// 导线分裂10
			wireSplit.add(tensileList.get(i).get(75));// 导线分裂11
			wireSplit.add(tensileList.get(i).get(78));// 导线分裂12

			if (getRemovalList(wireSplit).size() > 0) {
				wireTypeList.add(conductormap.get(getRemovalList(wireType).get(0)));// 直径
				wireTypeList.add(removalNull(wireSplit).size() + "");// 回路数
				wireTypeList.add(getWireSplitCount(getRemovalList(wireSplit).get(0)) + "");// 分裂数
				conductorList.add(getRemovalList(wireType).get(0));
				conductorDiameter.add(conductormap.get(getRemovalList(wireType).get(0)));// 直径
				wireSumList.add(wireTypeList);
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
			String ground = getRemovalList(groundType).get(0);
			groundTypeList.add(ground);
			if(ground.length()>=4){
				if(ground.substring(0, 4).equals("OPGW")){
					OPGWlists.add(ground);
					groundlists.add("");
				}else{
					OPGWlists.add("");
					groundlists.add(ground);
				}
			}else{
				OPGWlists.add("");
				groundlists.add(ground);
			}
		}
		List<List<String>> wireTotalList = new ArrayList<List<String>>();// 档距,导线直径,回路数分裂数集合
		List<List<String>> OPGWList = new ArrayList<List<String>>();// OPGW导线档距,回路数集合
		List<List<String>> groundList = new ArrayList<List<String>>();// 地线中除OPGW导线档距,回路数集合
		for (int i = 0; i < towerobj.size(); i++) {
			for (int j = 0; j < newlists.size(); j++) {
				if (Integer.parseInt(newlists.get(j).get(0)) <= i && Integer.parseInt(newlists.get(j).get(1)) >= i) {
					wireTotalList.add(Arrays.asList(towerobj.get(i).get(4), wireSumList.get(j).get(0),
							wireSumList.get(j).get(1), wireSumList.get(j).get(2)));
					if (groundTypeList.get(j).substring(0, 4).equals("OPGW")) {
						groundList.add(null);
						OPGWList.add(Arrays.asList(towerobj.get(i).get(4), wireSumList.get(j).get(1)));
					} else {
						OPGWList.add(null);
						groundList.add(Arrays.asList(towerobj.get(i).get(4), wireSumList.get(j).get(1)));
					}
					break;
				} else if (i == 0 || i > Integer.parseInt(newlists.get(newlists.size() - 1).get(1))) {
					wireTotalList.add(null);
					OPGWList.add(null);
					groundList.add(null);
					break;
				} else if (i > Integer.parseInt(newlists.get(j).get(1))
						&& i < Integer.parseInt(newlists.get(j + 1).get(0))) {
					wireTotalList.add(null);
					OPGWList.add(null);
					groundList.add(null);
					break;
				}
			}
		}
		;
		List<String> wireCount = getDamperCount(id, wireTotalList);
		List<String> OPGWCount = getOPGWDamperCount(id, OPGWList);
		List<String> groundCount = getOPGWDamperCount(id, groundList);

		List<List<String>> countList = new ArrayList<List<String>>();// 数量集合
		List<List<String>> conductorTypeList = new ArrayList<List<String>>();// 导线型号集合
		countList.add(wireCount);
		countList.add(groundCount);
		countList.add(OPGWCount);

		conductorTypeList.add(conductorList);
		conductorTypeList.add(groundlists);
		conductorTypeList.add(OPGWlists);
		conductorTypeList.add(conductorDiameter);
		
		List<List<List<String>>> sumCountList = new ArrayList<List<List<String>>>();
		sumCountList.add(newlists);
		sumCountList.add(countList);
		sumCountList.add(conductorTypeList);

		return sumCountList;
	}

	
	/**
	 * 获取回路数和杆塔类型信息
	 * @param id   
	 * @return loopAndTypeList 回路数和杆塔类型集合
	 */
	public List<List<String>> getLoopAndTypeList(String id) {
	
		RouteInfo route = partsService.getRouteById(id);
		// route文件耐张段信息
		String tensileSection = route.getTensileSection();
		
		Object reply;
		List<List<String>> tensileList = new ArrayList<List<String>>();
		if (!ToolsUtil.isEmpty(tensileSection)) {
			reply = (ToolsUtil.strToJson(tensileSection, List.class));
			tensileList = (List<List<String>>) reply;
		}
		
		List<List<String>> loopAndTypeList = new ArrayList<List<String>>();//回路数和杆塔类型集合
		for (int i = 1; i < tensileList.size(); i++) {
			List<String> wireLoop = new ArrayList<String>();// 导线架设位置

			wireLoop.add(tensileList.get(i).get(46));// 架设位置1
			wireLoop.add(tensileList.get(i).get(49));// 架设位置2
			wireLoop.add(tensileList.get(i).get(52));// 架设位置3
			wireLoop.add(tensileList.get(i).get(55));// 架设位置4
			wireLoop.add(tensileList.get(i).get(58));// 架设位置5
			wireLoop.add(tensileList.get(i).get(61));// 架设位置6
			wireLoop.add(tensileList.get(i).get(64));// 架设位置7
			wireLoop.add(tensileList.get(i).get(67));// 架设位置8
			wireLoop.add(tensileList.get(i).get(70));// 架设位置9
			wireLoop.add(tensileList.get(i).get(73));// 架设位置10
			wireLoop.add(tensileList.get(i).get(76));// 架设位置11
			wireLoop.add(tensileList.get(i).get(79));// 架设位置12
			String loop = getRemovalList(wireLoop).get(0);
			loop = loop.substring(loop.indexOf("-")+1,loop.indexOf("-")+2);
			loopAndTypeList.add(Arrays.asList(loop,tensileList.get(i).get(43)));
		}

		return loopAndTypeList;
	}

	/**
	 * 通过导线型号架线位置和转角角度获得跳线架线数量
	 * 
	 * @param str
	 *            型号 wireList配置信息 angle转角角度 position架线位置
	 * @return count 数量
	 */
	public int getCountByAngleAndPosition(double angle, String str, String position,
			Map<String, List<String>> wireList) {
		int count = 0;
		if (!ToolsUtil.isEmpty(str) && !str.equals("null") && angle != 0) {
			double minAngle = Double.parseDouble(wireList.get(str).get(6));
			double maxAngle = Double.parseDouble(wireList.get(str).get(7));
			count = ToolsUtil.getCountByAngleAndPosition(angle, position, minAngle, maxAngle);
		}
		return count;
	}

	/**
	 * 获取杆塔说明数据
	 * @param result TA文件数据
	 * @return towerobj 杆塔说明数据
	 */
	public List<List<String>> getTowerExplain(List<List<String>> result,List<List<Integer>> naiList,List<List<String>> loopAndTypeList)
	{
		List<List<String>> towerobj = new ArrayList<List<String>>();
		
	
		for (int i = 0; i < result.size(); i++) {
		List<String> obj = result.get(i);
		List<String> towerstr1 = new ArrayList<String>();
		for (int j = 0; j < naiList.size(); j++) {
			if(j==naiList.size()-1){
				if(i>=naiList.get(j).get(0)&&i<=naiList.get(j).get(1)){
					towerstr1.add(loopAndTypeList.get(j).get(0));//回路数
					towerstr1.add(getNaiOrHang(obj.get(1)));//悬垂塔/耐张塔
					towerstr1.add(loopAndTypeList.get(j).get(1));//角钢/钢管
					continue;
				}
			}else{
				if(i>=naiList.get(j).get(0)&&i<naiList.get(j+1).get(0)){
					towerstr1.add(loopAndTypeList.get(j).get(0));//回路数
					towerstr1.add(getNaiOrHang(obj.get(1)));//悬垂塔/耐张塔
					towerstr1.add(loopAndTypeList.get(j).get(1));//角钢/钢管
					continue;
				}
			}
		}
		towerstr1.add(ToolsUtil.isEmpty(obj.get(8)) ? "" : getStyle(obj.get(8)));// 杆塔型式
		towerstr1.add(obj.get(9));// 杆塔定位呼高(米)
		
		towerobj.add(towerstr1);
	}
		return towerobj;
	}
	
	
	/**
	 * 根据直径长度获取安装数量
	 * 
	 * @param str
	 *            直径长度
	 * @return count 数量
	 */
	public int getCountByDiameter(String str) {
		int count = 0;

		if (!ToolsUtil.isEmpty(str) && !str.equals("null")) {
			if (str.substring(0, 4).equals("OPGW")) {
				count = 1;
			}
		}

		return count;
	}

	/**
	 * 获取非空数据
	 * 
	 * @param str
	 *            直径长度
	 * @return count 数量
	 */
	public String getIsEmpty(String str) {

		if (!ToolsUtil.isEmpty(str) && !str.equals("null")) {
			return str;
		}

		return "";
	}

	/**
	 * 获取防震锤数量
	 * 
	 * @param wireTotalList
	 *            档距,导线直径,回路数分裂数集合
	 * @return wireList 防震锤数量集合
	 */
	public List<String> getDamperCount(String id, List<List<String>> wireTotalList) {
		List<String> wireList = new ArrayList<String>();
		for (int i = 0; i < wireTotalList.size(); i++) {
			if (!ToolsUtil.isEmpty(wireTotalList.get(i))) {
				if (!ToolsUtil.isEmpty(wireTotalList.get(i).get(0))
						&& !ToolsUtil.isEmpty(wireTotalList.get(i).get(1))) {
					int count = partsService.getDamperCount(Double.parseDouble(wireTotalList.get(i).get(0)),
							Double.parseDouble(wireTotalList.get(i).get(1)), 1, id);
					wireList.add(count + "×" + Integer.parseInt(wireTotalList.get(i).get(2))
							* Integer.parseInt(wireTotalList.get(i).get(3)) * 3);
				} else {
					wireList.add("");
				}
			} else {
				wireList.add("");
			}

		}
		return wireList;
	}

	/**
	 * 获取OPGW防震锤数量
	 * 
	 * @param wireTotalList
	 *            档距，回路数集合
	 * @return wireList 防震锤数量集合
	 */
	public List<String> getOPGWDamperCount(String id, List<List<String>> list) {
		List<String> wireList = new ArrayList<String>();
		for (int i = 0; i < list.size(); i++) {
			if (!ToolsUtil.isEmpty(list.get(i))) {
				if (!ToolsUtil.isEmpty(list.get(i).get(0)) && !ToolsUtil.isEmpty(list.get(i).get(1))) {
					int count = partsService.getDamperCount(Double.parseDouble(list.get(i).get(0)), 0.0, 0, id);
					wireList.add(count + "×" + Integer.parseInt(list.get(i).get(1)));
				} else {
					wireList.add("");
				}
			} else {
				wireList.add("");
			}

		}
		return wireList;
	}
	
/**
 * 获取塔位型式
 * 
 * @param string
 * @return style型式
 */
public String getStyle(String str) {
	String style = new String();
	if (str.contains("-")) {
		
		style = str.substring(0,str.lastIndexOf("-")).trim();
	} else {
		style = str;
	}
	return style;
}

/**
 * 获取塔是耐张塔还是悬垂塔
 * 
 * @param string
 * @return style塔型
 */
public String getNaiOrHang(String str) {
	String style = new String();
	if (str.equals("1")) {
		style = "悬垂塔";
	} else if(str.equals("2")){
		style = "耐张塔";
	}
	return style;
}
}
