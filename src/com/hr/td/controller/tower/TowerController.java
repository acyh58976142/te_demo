package com.hr.td.controller.tower;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
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
import com.hr.td.entity.RouteInfo;
import com.hr.td.entity.Tower;
import com.hr.td.service.tower.ITowerService;
import com.hr.td.util.CommonTool;
import com.hr.td.util.DataTablePage;
import com.hr.td.util.Page;
import com.hr.td.util.ProjectStageEnum;
import com.hr.td.util.PropertiesConfig;
import com.hr.td.util.RouteUtil;
import com.hr.td.util.TAUtil;
import com.hr.td.util.ToolsUtil;
import com.hr.td.util.TowerUtil;

@Controller
@RequestMapping("Tower")
public class TowerController {

	@Autowired
	private ITowerService towerService;

	SimpleDateFormat dateFor = new SimpleDateFormat("yyyy-MM-dd");

	/**
	 * 跳转到新建杆塔页面
	 */
	@RequestMapping(value = "/towerAdd.action", method = RequestMethod.GET)
	public Object towerAdd(HttpServletRequest request) {

		return "/tower/towerAdd";
	}

	/**
	 * 跳转到杆塔列表页面
	 */
	@RequestMapping(value = "/projectList.action", method = RequestMethod.GET)
	public Object projectList(HttpServletRequest request) {

		return "/tower/projectList";
	}

	/**
	 * 跳转到编辑杆塔明细页面
	 */
	@RequestMapping(value = "/towerEdit.action", method = RequestMethod.GET)
	public Object towerEdit(ModelMap modelMap, HttpServletRequest request) {
		String projectId = request.getParameter("projectId");
		
		modelMap.addAttribute("projectId", projectId);

		return "/tower/towerEdit";
	}

	
	/**
	 * 跳转到杆塔明细详情页面
	 */
	@RequestMapping(value = "/towerDetail.action", method = RequestMethod.GET)
	public Object towerDetail(ModelMap modelMap, HttpServletRequest request) {
		String id = request.getParameter("id");
		MainInfo main = towerService.getMainInfo(id);
	
		Tower tower = towerService.getTower(main.getTowerId());
		List<Attachment> attList = towerService.getAttachment(tower.getId());
		
		modelMap.put("attList", ToolsUtil.jsonToStr(attList));
		modelMap.addAttribute("tower", tower);
		modelMap.addAttribute("id", id);
		modelMap.addAttribute("projectCode", main.getProjectCode());

		return "/tower/towerDetail";
	}
	
	/**
	 * 跳转到杆塔明细详情页面
	 */
	@RequestMapping(value = "/towerExplain.action", method = RequestMethod.GET)
	public Object towerExplain(ModelMap modelMap, HttpServletRequest request) {
		String id = request.getParameter("id");
		modelMap.addAttribute("id", id);
		MainInfo main = towerService.getMainInfo(id);
		modelMap.addAttribute("projectCode", main.getProjectCode());

		return "/tower/towerExplain";
	}
	
	
	/**
	 * 跳转到TA文件替换页面
	 */
	@RequestMapping(value = "/towerReplace.action", method = RequestMethod.GET)
	public Object towerReplace(ModelMap modelMap, HttpServletRequest request) {
		String id = request.getParameter("id");
		MainInfo mainInfo =towerService.getMainInfo(id);
		List<Attachment> attList = towerService.getAttachment(id);
		
		modelMap.put("attList", ToolsUtil.jsonToStr(attList));
		modelMap.put("mainInfo", mainInfo);
		modelMap.addAttribute("id", id);

		return "/tower/towerReplace";
	}
	
	
	/**
	 * 跳转到TA文件关联页面
	 */
	@RequestMapping(value = "/towerRelation.action", method = RequestMethod.GET)
	public Object towerRelation(ModelMap modelMap, HttpServletRequest request) {
		String id = request.getParameter("id");
		MainInfo mainInfo =towerService.getMainInfo(id);
		List<Attachment> attList = towerService.getAttachment(id);
		
		modelMap.put("attList", ToolsUtil.jsonToStr(attList));
		modelMap.put("mainInfo", mainInfo);
		modelMap.addAttribute("id", id);

		return "/tower/towerRelation";
	}
	
	
	/**
	 * 跳转到杆塔明细校对页面
	 */
	@RequestMapping(value = "/towerCheck.action", method = RequestMethod.GET)
	public Object towerCheck(ModelMap modelMap, HttpServletRequest request) {
		String id = request.getParameter("id");
		MainInfo main = towerService.getMainInfo(id);
		Tower tower = towerService.getTower(main.getTowerId());
		
		modelMap.addAttribute("tower", tower);
		modelMap.addAttribute("id", id);
		modelMap.addAttribute("projectCode", main.getProjectCode());

		return "/tower/towerCheck";
	}
	
	/**
	 * 跳转到杆塔明细修改页面
	 */
	@RequestMapping(value = "/towerUpdate.action", method = RequestMethod.GET)
	public Object towerUpdate(ModelMap modelMap, HttpServletRequest request) {
		String id = request.getParameter("id");
		MainInfo main = towerService.getMainInfo(id);
		Tower tower = towerService.getTower(main.getTowerId());
		
		modelMap.addAttribute("tower", tower);
		modelMap.addAttribute("id", id);
		modelMap.addAttribute("projectCode", main.getProjectCode());

		return "/tower/towerUpdate";
	}
	
	@RequestMapping(value = "/queryMainInfo.action", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> queryMainInfo(DataTablePage page) {
		try {
			Map<String, Object> paramMap = new HashMap<String, Object>();

			paramMap.put("pageSize", page.getLength());
			paramMap.put("startIndex", page.getStart());
			int totalCount = towerService.findMainInfoListCount(paramMap);

			Page p = towerService.findMainInfoList(paramMap, totalCount);

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
					mainInfoMap.put("stage", ToolsUtil.isEmpty(main[5]) ? "": ProjectStageEnum.getName((int) main[5]));
					mainInfoMap.put("state", getState(main));
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

	@RequestMapping(value = "/mainInfoDelete.action", method = RequestMethod.POST)
	@ResponseBody
	public boolean mainInfoDelete(String id) {

		return towerService.deleteMainInfo(id);
	}

	/**
	 * 新增工程
	 */
	@RequestMapping(value = "/addMain.action")
	@ResponseBody
	public Object addMain(String params,String param, String projectName, String projectNo, HttpServletRequest request) {

		Tower tower = new Tower();
		tower.setId(CommonTool.createUUID());// 主键ID
		tower.setState(0);
		
		MainInfo main = new MainInfo();
		main.setId(CommonTool.createUUID());// 主键ID
		main.setProjectName(projectName);// 工程名称
		main.setProjectCode(projectNo);// 工程编号
		main.setStageId(1);// 项目阶段
		main.setDesignDate(new Date());// 创建时间
		main.setTowerId(tower.getId());

		// 附件数据处理
		List<Attachment> attchList = new ArrayList<Attachment>();
		attchList = parseFileObj(main.getId(),params);
		// route处理
		Attachment attach = new Attachment();
		Map<String, Object> map = new HashMap<String, Object>();
		Object reply = ToolsUtil.strToJson(param, Map.class);
		map = (Map) reply;
		attach.setId(CommonTool.createUUID());// 附件信息表主键ID
		attach.setFilePath(map.get("filePath")+"");// 文件地址
		attach.setNewFileName(map.get("newName")+"");// 新文件名
		attach.setOriginalFileName(map.get("fileName")+"");// 原文件名
		attach.setAttachmentType(2);
		attach.setProjectId(main.getId());// 工程ID
		attchList.add(attach);
		// route文件信息入库
		String rootPath = PropertiesConfig.getInstance().getProperty("upload_store_root");
		File file = new File(rootPath + attach.getFilePath());
		Map<String,Object> routemap =RouteUtil.readRoute(file);
		List<List<String>> tensileSection = (List<List<String>>) routemap.get("tensileSection");
		List<List<String>> conductorParameter = (List<List<String>>) routemap.get("conductorParameter");
	    List<List<String>> groundParameters = (List<List<String>>) routemap.get("groundParameters");
		
	    List<List<String>> tensileList = new ArrayList<List<String>>(); 
		for (int i = 0; i < tensileSection.size(); i++) {
  
    	if (!ToolsUtil.isEmpty(tensileSection.get(i).get(0))&&!tensileSection.get(i).get(0).equals("-")) {
    	tensileList.add(tensileSection.get(i));
    	}
		}	
	    String  conductor = getConductorParam(conductorParameter);
	    String  ground = getConductorParam(groundParameters);
		RouteInfo route = new RouteInfo();
		route.setId(CommonTool.createUUID());// route信息表主键ID
		route.setProjectId(main.getId());// 工程ID
		route.setTensileSection(ToolsUtil.jsonToStr(tensileList));//耐张段信息
		route.setConductorParam(conductor);//导线参数
		route.setConductorAllParam(ToolsUtil.jsonToStr(conductorParameter));//导线所有参数
		route.setGroundParam(ground);//地线参数
		route.setGroundAllParam(ToolsUtil.jsonToStr(groundParameters));//地线所有参数
		
		Map<String, Object> objMap = new HashMap<String, Object>();
		try {
			towerService.addMain(main, tower,attchList,route);

			objMap.put("msg", "success");
			objMap.put("projectId", main.getId());// 工程ID
		} catch (Exception e) {
			objMap.put("msg", "error");
		}
		return objMap;
	}

	/**
	 *编辑工程
	 */
	@RequestMapping(value = "/editMain.action")
	@ResponseBody
	public Object editMain(String params, String projectName, String projectNo,String id, HttpServletRequest request) {

		MainInfo main = towerService.getMainInfo(id);
		main.setProjectName(projectName);// 工程名称
		main.setProjectCode(projectNo);// 工程编号
		
		Tower tower = towerService.getTower(main.getTowerId());
		Tower newtower = new Tower();
		newtower.setId(tower.getId());
		newtower.setAngle_change_list(tower.getAngle_change_list());
		newtower.setConnect_change_list(tower.getConnect_change_list());
		newtower.setState(0);
		// 附件数据处理
		List<Attachment> attchList = new ArrayList<Attachment>();
		if(!ToolsUtil.isEmpty(params)){
		attchList = parseFileObj(main.getId(),params);
		}
		Map<String, Object> objMap = new HashMap<String, Object>();
		try {
			towerService.editMain(main, newtower,attchList);

			objMap.put("msg", "success");
		} catch (Exception e) {
			objMap.put("msg", "error");
		}
		return objMap;
	}

	/**
	 * 保存关联配置
	 */
	@RequestMapping(value = "/saveRelation.action", method = RequestMethod.POST)
	@ResponseBody
	public Object saveStingConfig(String param,String id,HttpServletRequest request) {
		RouteInfo route = towerService.getRouteInfo(id);
		route.setRelationData(param);

		Map<String, Object> objMap = new HashMap<String, Object>();
		try {
			towerService.saveRouteInfo(route);
			objMap.put("msg", "success");
		} catch (Exception e) {
			objMap.put("msg", "error");
		}
		return objMap;
	}
	/**
	 * 新增杆塔
	 */
	@RequestMapping(value = "/saveTower.action", method = RequestMethod.POST)
	@ResponseBody
	public Object saveTower(String data,String angle,String connect,String projectId,String param,  HttpServletRequest request) {
		MainInfo main = towerService.getMainInfo(projectId);
		Tower tower = towerService.getTower(main.getTowerId());
		tower.setData(data);
		tower.setAngle_change_list(angle);
		tower.setConnect_change_list(connect);
		tower.setState(0);
		
		List<Attachment> attList = towerService.getAttachment(tower.getId());
		Map<String,Object> map = new HashMap<String, Object>();
		Attachment attach=new Attachment();
		if(!ToolsUtil.isEmpty(param)){
			map	=(Map<String,Object>)ToolsUtil.strToJson(param, Map.class);
			attach.setId(CommonTool.createUUID());// 附件信息表主键ID
			attach.setFilePath(map.get("url")+"");// 文件地址
			attach.setNewFileName(map.get("newName")+"");// 新文件名
			attach.setOriginalFileName(map.get("oldName")+"");// 原文件名	
			attach.setSortNo(attList.size()+1);
			attach.setProjectId(tower.getId());// 工程ID
		}
	
		Map<String, Object> objMap = new HashMap<String, Object>();
		try {
			towerService.saveTower(tower,attach);
			objMap.put("msg", "success");
		} catch (Exception e) {
			objMap.put("msg", "error");
		}
		return objMap;
	}
	
	
	/**
	 * 校对杆塔
	 */
	@RequestMapping(value = "/checkTower.action")
	@ResponseBody
	public Object checkTower(String data,String id,int state,String param,  HttpServletRequest request) {
		MainInfo main = towerService.getMainInfo(id);
		Tower tower = towerService.getTower(main.getTowerId());	
		tower.setData(data);
		tower.setState(state);
	
		List<Attachment> attList = towerService.getAttachment(tower.getId());
		Map<String,Object> map = new HashMap<String, Object>();
		Attachment attach=new Attachment();
		if(!ToolsUtil.isEmpty(param)){
			map	=(Map<String,Object>)ToolsUtil.strToJson(param, Map.class);
			attach.setId(CommonTool.createUUID());// 附件信息表主键ID
			attach.setFilePath(map.get("url")+"");// 文件地址
			attach.setNewFileName(map.get("newName")+"");// 新文件名
			attach.setOriginalFileName(map.get("oldName")+"");// 原文件名	
			attach.setSortNo(attList.size()+1);
			attach.setProjectId(tower.getId());// 工程ID
		}
		
		Map<String, Object> objMap = new HashMap<String, Object>();
		try {
			towerService.checkTower(tower,attach);
			objMap.put("msg", "success");
		} catch (Exception e) {
			objMap.put("msg", "error");
		}
		return objMap;
	}
	
	/**
	 * 校对杆塔
	 */
	@RequestMapping(value = "/checkAgreeTower.action")
	@ResponseBody
	public Object checkAgreeTower(String data,String datas,String id,int state,String param,  HttpServletRequest request) {
		MainInfo main = towerService.getMainInfo(id);
		Tower tower = towerService.getTower(main.getTowerId());	
		tower.setData(data);
		tower.setState(state);
	
		List<Attachment> attList = towerService.getAttachment(tower.getId());
		Map<String,Object> map = new HashMap<String, Object>();
		Attachment attach=new Attachment();
		if(!ToolsUtil.isEmpty(param)){
			map	=(Map<String,Object>)ToolsUtil.strToJson(param, Map.class);
			attach.setId(CommonTool.createUUID());// 附件信息表主键ID
			attach.setFilePath(map.get("url")+"");// 文件地址
			attach.setNewFileName(map.get("newName")+"");// 新文件名
			attach.setOriginalFileName(map.get("oldName")+"");// 原文件名	
			attach.setSortNo(attList.size()+1);
			attach.setProjectId(tower.getId());// 工程ID
		}
		
		List<String> list =(List<String>)ToolsUtil.strToJson(datas, List.class);
		tower.setColumn_a(ToolsUtil.jsonToStr(list.get(0)));
		tower.setColumn_b(ToolsUtil.jsonToStr(list.get(1)));
		tower.setColumn_c(ToolsUtil.jsonToStr(list.get(2)));
		tower.setColumn_d(ToolsUtil.jsonToStr(list.get(3)));
		tower.setColumn_e(ToolsUtil.jsonToStr(list.get(4)));
		tower.setColumn_f(ToolsUtil.jsonToStr(list.get(5)));
		tower.setColumn_g(ToolsUtil.jsonToStr(list.get(6)));
		tower.setColumn_h(ToolsUtil.jsonToStr(list.get(7)));
		tower.setColumn_i(ToolsUtil.jsonToStr(list.get(8)));
		tower.setColumn_j(ToolsUtil.jsonToStr(list.get(9)));
		tower.setColumn_k(ToolsUtil.jsonToStr(list.get(10)));
		tower.setColumn_l(ToolsUtil.jsonToStr(list.get(11)));
		tower.setColumn_m(ToolsUtil.jsonToStr(list.get(12)));
		tower.setColumn_n(ToolsUtil.jsonToStr(list.get(13)));
		Map<String, Object> objMap = new HashMap<String, Object>();
		try {
			towerService.checkTower(tower,attach);
			objMap.put("msg", "success");
		} catch (Exception e) {
			objMap.put("msg", "error");
		}
		return objMap;
	}
	
	
	/**
	 * 导出杆塔
	 */
	@RequestMapping(value = "/exportTower.action")
	@ResponseBody
	public Object checkTower(String data,String id,String angle,String connect,  HttpServletRequest request) {
		MainInfo main = towerService.getMainInfo(id);
		Tower tower = new Tower();
		
		if(!ToolsUtil.isEmpty(main.getTowerId())){
			 tower = towerService.getTower(main.getTowerId());	
		}
		else{
			tower.setId(CommonTool.createUUID());
		}
		tower.setData(data);
		tower.setAngle_change_list(angle);
		tower.setConnect_change_list(connect);
	
		Attachment attach=new Attachment();
		
		Map<String, Object> objMap = new HashMap<String, Object>();
		try {
			towerService.checkTower(tower,attach);
			objMap.put("msg", "success");
		} catch (Exception e) {
			objMap.put("msg", "error");
		}
		return objMap;
	}
	
	/**
	 * 修改杆塔
	 */
	@RequestMapping(value = "/updateTower.action")
	@ResponseBody
	public Object updateTower(String data,String id,String param,String angle,String connect, HttpServletRequest request) {
		MainInfo main = towerService.getMainInfo(id);
		Tower tower = new Tower();
		if(!ToolsUtil.isEmpty(main.getTowerId())){
			tower =	towerService.getTower(main.getTowerId());
		}else{
			tower.setId(CommonTool.createUUID());
		}
		tower.setData(data);
		tower.setAngle_change_list(angle);
		tower.setConnect_change_list(connect);
		tower.setState(0);
	
		List<Attachment> attList = towerService.getAttachment(tower.getId());
		Map<String,Object> map = new HashMap<String, Object>();
		Attachment attach=new Attachment();
		if(!ToolsUtil.isEmpty(param)){
			map	=(Map<String,Object>)ToolsUtil.strToJson(param, Map.class);
			attach.setId(CommonTool.createUUID());// 附件信息表主键ID
			attach.setFilePath(map.get("url")+"");// 文件地址
			attach.setNewFileName(map.get("newName")+"");// 新文件名
			attach.setOriginalFileName(map.get("oldName")+"");// 原文件名	
			attach.setSortNo(attList.size()+1);
			attach.setProjectId(tower.getId());// 工程ID
		}
		Map<String, Object> objMap = new HashMap<String, Object>();
		try {
			towerService.checkTower(tower,attach);
			objMap.put("msg", "success");
		} catch (Exception e) {
			objMap.put("msg", "error");
		}
		return objMap;
	}
	
	
	/**
	 * 根据塔文件路径获得杆塔明细数据
	 */
	@RequestMapping(value = "/getTaData.action")
	@ResponseBody
	public Object getTaData(String id,int pagingSize) {
		
		List<List<String>> towerobj = new ArrayList<List<String>>();
		List<List<List<String>>> iList = new ArrayList<List<List<String>>>();
		List<List<List<String>>> jList = new ArrayList<List<List<String>>>();
		List<String> towertop = TAUtil.towertop;
		List<List<String>> topobj = new ArrayList<List<String>>();
		topobj.add(towertop);
		List<Attachment> attachList  = towerService.getAttachment(id);
		/*String path = attachment.getFilePath();//TA文件保存路径
*/		// 获得文件要存储的根目录的磁盘路径
		String rootPath = PropertiesConfig.getInstance().getProperty("upload_store_root");
		List<File> list = new ArrayList<File>();
		for (int i = 0; i < attachList.size(); i++) {
			Attachment attach = attachList.get(i);
			String path = attach.getFilePath();//TA文件保存路径
			File file = new File(rootPath + path);
			list.add(file);
		}
		List<List<String>> result = TAUtil.readTa(list,pagingSize);
		List<List<List<String>>> taTesult = TAUtil.readTa(list);

		TowerUtil t = new TowerUtil();
		jList=t.getJColumns(taTesult);
		iList=t.getIColumns(taTesult);
		List<List<String>> towerDetail = TAUtil.getTowerDetailByTa(result);
		
		for (int i = 0; i < towerDetail.size(); i++) {
			for (int j = 0; j < towerDetail.get(i).size(); j++) {
				if(towerDetail.get(i).get(j).equals("0")){
					towerDetail.get(i).set(j, "");
				}
			}
			towerobj.add(towerDetail.get(i));
		}
		MainInfo main = towerService.getMainInfo(id);
	
		Tower tower = towerService.getTower(main.getTowerId());
		String data = tower.getData();
		if(!ToolsUtil.isEmpty(data)){
		Object [] content = (Object[]) ToolsUtil.strToJson(data, Object[].class); 
		List<List<String>> dataList = new ArrayList<List<String>>();
		
		for (int i = 0; i < content.length; i++) {
			String str = content[i].toString();
			str = str.substring(1, str.length()-1);
			List<String> contentStr = ToolsUtil.getList(str);
			for(int j = 0; j < contentStr.size(); j++){
				if(contentStr.get(j).trim().equals("0")){
					contentStr.set(j, "");
				}
			}
		
			 dataList.add(contentStr);
		}
		
		for (int i = 0; i < dataList.size(); i++) {
			List<String> towerdataList =dataList.get(i);
			towerobj.get(i+1).addAll(towerdataList);
		}
		}
		Map<String,List<List<List<String>>>> objMap = new HashMap<String,List<List<List<String>>>>();
		
		List<List<List<String>>> sumList = new ArrayList<List<List<String>>>();
		sumList.add(topobj);
		sumList.add(towerobj);
		objMap.put("list",sumList);
		objMap.put("iList",iList);
		objMap.put("jList",jList);
	
		return objMap;
	}

	
	/**
	 * 根据项目ID获得杆塔明细数据
	 */
	@RequestMapping(value = "/getTaDataById.action")
	@ResponseBody
	public Object getTaDataById(String id,int pagingSize) {
		MainInfo main = towerService.getMainInfo(id);
		Tower tower = towerService.getTower(main.getTowerId());
		String data = tower.getData();
		List<List<String>> dataList = new ArrayList<List<String>>();
		if(!ToolsUtil.isEmpty(data)){
		Object [] content = (Object[]) ToolsUtil.strToJson(data, Object[].class); 
		
		for (int i = 0; i < content.length; i++) {
			String str = content[i].toString();
			str = str.substring(1, str.length()-1);
			List<String> contentStr = ToolsUtil.getList(str);
			for(int j = 0; j < contentStr.size(); j++){
				if(contentStr.get(j).trim().equals("0")){
					contentStr.set(j, "");
				}
			}
		
			 dataList.add(contentStr);
		}
		}
		List<List<String>> towerobj = new ArrayList<List<String>>();
		List<List<List<String>>> iList = new ArrayList<List<List<String>>>();
		List<List<List<String>>> jList = new ArrayList<List<List<String>>>();
		List<String> towertop = TAUtil.towerChecktop;
		List<List<String>> topobj = new ArrayList<List<String>>();
		topobj.add(towertop);
		List<Attachment> attachList  = towerService.getAttachment(id);
		/*String path = attachment.getFilePath();//TA文件保存路径
*/		// 获得文件要存储的根目录的磁盘路径
		String rootPath = PropertiesConfig.getInstance().getProperty("upload_store_root");
		List<File> list = new ArrayList<File>();
		for (int i = 0; i < attachList.size(); i++) {
			Attachment attach = attachList.get(i);
			String path = attach.getFilePath();//TA文件保存路径
			File file = new File(rootPath + path);
			list.add(file);
		}
		List<List<String>> result = TAUtil.readTa(list,pagingSize);
		List<List<List<String>>> taTesult = TAUtil.readTa(list);

		TowerUtil t = new TowerUtil();
		jList=t.getJColumns(taTesult);
		iList=t.getIColumns(taTesult);
		List<List<String>> towerDetail = TAUtil.getTowerDetailByTa(result);
		
		for (int i = 0; i < towerDetail.size(); i++) {
			for (int j = 0; j < towerDetail.get(i).size(); j++) {
				if(towerDetail.get(i).get(j).equals("0")){
					towerDetail.get(i).set(j, "");
				}
			}
			towerobj.add(towerDetail.get(i));
		}
		
		for (int i = 0; i < dataList.size(); i++) {
			List<String> towerdataList =dataList.get(i);
			towerobj.get(i+1).addAll(towerdataList);
		}
		
		Map<String,List<List<List<String>>>> objMap = new HashMap<String,List<List<List<String>>>>();
		
		List<List<List<String>>> sumList = new ArrayList<List<List<String>>>();
		sumList.add(topobj);
		sumList.add(towerobj);
		objMap.put("list",sumList);
		objMap.put("iList",iList);
		objMap.put("jList",jList);
	
		return objMap;
	}
	
	
	/**
	 * 根据项目ID获得杆塔明细数据
	 */
	@RequestMapping(value = "/getTaDataByIdceshi.action")
	@ResponseBody
	public Object getTaDataByIdceshi(String id,int pagingSize) {
		MainInfo main = towerService.getMainInfo(id);
		List<List<String>> towerobj = new ArrayList<List<String>>();
		List<List<List<String>>> iList = new ArrayList<List<List<String>>>();
		List<List<List<String>>> jList = new ArrayList<List<List<String>>>();
		List<String> towertop = TAUtil.towerChecktop;
		List<List<String>> topobj = new ArrayList<List<String>>();
		topobj.add(towertop);
		List<Attachment> attachList  = towerService.getAttachment(id);
		/*String path = attachment.getFilePath();//TA文件保存路径
*/		// 获得文件要存储的根目录的磁盘路径
		String rootPath = PropertiesConfig.getInstance().getProperty("upload_store_root");
		List<File> list = new ArrayList<File>();
		for (int i = 0; i < attachList.size(); i++) {
			Attachment attach = attachList.get(i);
			String path = attach.getFilePath();//TA文件保存路径
			File file = new File(rootPath + path);
			list.add(file);
		}
		List<List<String>> result = TAUtil.readTa(list,pagingSize);
		List<List<List<String>>> taTesult = TAUtil.readTa(list);

		TowerUtil t = new TowerUtil();
		jList=t.getJColumns(taTesult);
		iList=t.getIColumns(taTesult);
		List<List<String>> towerDetail = TAUtil.getTowerDetailByTaceshi(result,main.getProjectName(),attachList.size());
		
		for (int i = 0; i < towerDetail.size(); i++) {
			for (int j = 0; j < towerDetail.get(i).size(); j++) {
				if(towerDetail.get(i).get(j).equals("0")){
					towerDetail.get(i).set(j, "");
				}
			}
			towerobj.add(towerDetail.get(i));
		}
		
		Map<String,List<List<List<String>>>> objMap = new HashMap<String,List<List<List<String>>>>();
		
		List<List<List<String>>> sumList = new ArrayList<List<List<String>>>();
		sumList.add(topobj);
		sumList.add(towerobj);
		objMap.put("list",sumList);
		objMap.put("iList",iList);
		objMap.put("jList",jList);
	
		return objMap;
	}
	
	/**
	 * 修改杆塔
	 */
	@RequestMapping(value = "/getMainById.action")
	@ResponseBody
	public Object getMainById(String id, HttpServletRequest request) {
		MainInfo main = towerService.getMainInfo(id);

		Map<String, Object> objMap = new HashMap<String, Object>();
		objMap.put("name", main.getProjectName());	
		objMap.put("code", main.getProjectCode());
	
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
			String str =  obj[5].toString();
			if (str.equals("1")) {
				id = (String) obj[6];
			} else if (str.equals("2")) {
				id = (String) obj[7];
			} else if (str.equals("3")){
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
	 * 耐张段信息处理
	 * 
	 * @param tensileSection  route文件耐张段信息
	 * @return tensileList 耐张段信息
	 */
	public  List<List<String>> getTensileSection(List<List<String>> tensileSection) {    
	 List<List<String>> tensileList = new ArrayList<List<String>>(); 
		for (int i = 0; i < tensileSection.size(); i++) {
    	List<String>  list = new ArrayList<String>(); 
    	if (!ToolsUtil.isEmpty(tensileSection.get(i).get(0))&&!tensileSection.get(i).get(0).equals("-")) {
    	list.add(tensileSection.get(i).get(0)+"");//0耐张段编号 
    	list.add(tensileSection.get(i).get(22)+"");//1耐张段起点横坐标X
    	list.add(tensileSection.get(i).get(23)+"");//2耐张段起点纵坐标Y
    	list.add(tensileSection.get(i).get(24)+"");//3耐张段终点横坐标X
    	list.add(tensileSection.get(i).get(25)+"");//4耐张段终点纵坐标Y
    	list.add(tensileSection.get(i).get(33)+"");//5转角角度
    	list.add(tensileSection.get(i).get(43)+"");//6杆塔型式
    	list.add(tensileSection.get(i).get(44)+"");//7导线型号1
    	list.add(tensileSection.get(i).get(45)+"");//8分裂数
    	list.add(tensileSection.get(i).get(46)+"");//9架设位置
    	list.add(tensileSection.get(i).get(47)+"");//10导线型号2
    	list.add(tensileSection.get(i).get(48)+"");//11分裂数
    	list.add(tensileSection.get(i).get(49)+"");//12架设位置
    	list.add(tensileSection.get(i).get(50)+"");//13导线型号3
    	list.add(tensileSection.get(i).get(51)+"");//14分裂数
    	list.add(tensileSection.get(i).get(52)+"");//15架设位置
    	list.add(tensileSection.get(i).get(53)+"");//16导线型号4
    	list.add(tensileSection.get(i).get(54)+"");//17分裂数
    	list.add(tensileSection.get(i).get(55)+"");//18架设位置
    	list.add(tensileSection.get(i).get(56)+"");//19导线型号5
    	list.add(tensileSection.get(i).get(57)+"");//2分裂数
    	list.add(tensileSection.get(i).get(58)+"");//18架设位置
    	list.add(tensileSection.get(i).get(59)+"");//16导线型号6
    	list.add(tensileSection.get(i).get(60)+"");//17分裂数
    	list.add(tensileSection.get(i).get(61)+"");//18架设位置
    	list.add(tensileSection.get(i).get(56)+"");//16导线型号5
    	list.add(tensileSection.get(i).get(57)+"");//17分裂数
    	list.add(tensileSection.get(i).get(58)+"");//18架设位置
    	list.add(tensileSection.get(i).get(56)+"");//16导线型号5
    	list.add(tensileSection.get(i).get(57)+"");//17分裂数
    	list.add(tensileSection.get(i).get(58)+"");//18架设位置
    	
    	list.add(tensileSection.get(i).get(59)+"");//19地线型号1
    	list.add(tensileSection.get(i).get(60)+"");//20架设位置
    	list.add(tensileSection.get(i).get(61)+"");//21地线型号2
    	list.add(tensileSection.get(i).get(62)+"");//22架设位置
    	list.add(tensileSection.get(i).get(63)+"");//23地线型号3
    	list.add(tensileSection.get(i).get(64)+"");//24架设位置
    	list.add(tensileSection.get(i).get(65)+"");//25地线型号4
    	list.add(tensileSection.get(i).get(66)+"");//26架设位置
    	tensileList.add(list);
    }
	}
		return tensileList;
	}
	
	/**
	 * 导线参数信息处理
	 * 
	 * @param conductorParameter  route文件导线参数信息
	 * @return conductor 导线参数信息
	 */
	public  String getConductorParam(List<List<String>> conductorParameter) {  
	
	Map<String,Object> conductorMap = new HashMap<String,Object>(); 
    for (int i = 0; i < conductorParameter.size(); i++) {

    	if (!ToolsUtil.isEmpty(conductorParameter.get(i))) {
    		if (!ToolsUtil.isEmpty(conductorParameter.get(i).get(0))) {
    			conductorMap.put(conductorParameter.get(i).get(0),conductorParameter.get(i).get(2));//导线型号
    			
    		}
    	}
    }
    String conductor =  ToolsUtil.jsonToStr(conductorMap);
    return conductor;
	}
	
	private List<Attachment> parseFileObj(String id,String fileStr)
	{
		List<Attachment> resList = new ArrayList<Attachment>();
		Attachment att = null;
		if(!ToolsUtil.isEmpty(fileStr))
		{
			Map<String, Map<String, String>> strToJson = (Map<String, Map<String, String>>)ToolsUtil.strToJson(fileStr, Map.class);
			Iterator<String> it = strToJson.keySet().iterator();
			while(it.hasNext())
			{
				String key = it.next().toString();
				Map<String, String> valMap = strToJson.get(key);
				att = new Attachment();
				
				att.setProjectId(id);
				Object obj = null;
				if(!ToolsUtil.isEmpty(obj = valMap.get("id")))
				{
					att.setId(obj.toString());
				}
				else
				{
					att.setId(CommonTool.createUUID());
				}
				if(!ToolsUtil.isEmpty(obj = valMap.get("url")))
				{
					att.setFilePath(obj.toString());
				}
				if(!ToolsUtil.isEmpty(obj = valMap.get("newName")))
				{
					att.setNewFileName(obj.toString());
				}
				if(!ToolsUtil.isEmpty(obj = valMap.get("oldName")))
				{
					att.setOriginalFileName(obj.toString());
				}
				if(!ToolsUtil.isEmpty(obj = valMap.get("sort")))
				{
					att.setSortNo(Integer.parseInt(obj.toString()));
				}
				att.setAttachmentType(1);
				resList.add(att);
			}
		}
		return resList;
	}
}
