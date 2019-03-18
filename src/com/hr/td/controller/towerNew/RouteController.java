package com.hr.td.controller.towerNew;

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
import com.hr.td.entity.RouteInfoNew;
import com.hr.td.entity.Tower;
import com.hr.td.service.tower.IPartsService;
import com.hr.td.service.tower.ITowerService;
import com.hr.td.util.CommonTool;
import com.hr.td.util.DataTablePage;
import com.hr.td.util.Page;
import com.hr.td.util.ProjectStageEnum;
import com.hr.td.util.PropertiesConfig;
import com.hr.td.util.RouteUtil;
import com.hr.td.util.TAUtil;
import com.hr.td.util.ToolsUtil;

@Controller
@RequestMapping("TowerNew")
public class RouteController {

	@Autowired
	private ITowerService towerService;
	@Autowired
	private IPartsService partsService;

	SimpleDateFormat dateFor = new SimpleDateFormat("yyyy-MM-dd");

	/**
	 * 跳转到新建杆塔页面
	 */
	@RequestMapping(value = "/towerAdd.action", method = RequestMethod.GET)
	public Object towerAdd(HttpServletRequest request) {

		return "/towerNew/towerAdd";
	}

	/**
	 * 跳转到杆塔列表页面
	 */
	@RequestMapping(value = "/projectList.action", method = RequestMethod.GET)
	public Object projectList(HttpServletRequest request) {

		return "/towerNew/projectList";
	}

	
	/**
	 * 跳转到杆塔明细详情页面
	 */
	@RequestMapping(value = "/towerDetail.action", method = RequestMethod.GET)
	public Object towerDetail(ModelMap modelMap, HttpServletRequest request) {
		String id = request.getParameter("id");

		modelMap.addAttribute("id", id);

		return "/towerNew/towerDetail";
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
					mainInfoMap.put("state", "无");
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
		Map<String,Object> routemap =RouteUtil.readNewRoute(file);
		List<List<String>> tensileSection = (List<List<String>>) routemap.get("route");

	    List<List<String>> tensileList = new ArrayList<List<String>>(); 
		/*for (int i = 0; i < tensileSection.size(); i++) {
  
    	if (!ToolsUtil.isEmpty(tensileSection.get(i).get(0))&&!tensileSection.get(i).get(0).equals("-")) {
    	tensileList.add(tensileSection.get(i));
    	}
		}	*/
	  
		RouteInfoNew route = new RouteInfoNew();
		route.setId(CommonTool.createUUID());// route信息表主键ID
		route.setProjectId(main.getId());// 工程ID
		route.setTensileSection(ToolsUtil.jsonToStr(tensileSection));//耐张段信息
		
		Map<String, Object> objMap = new HashMap<String, Object>();
		try {
			towerService.addMainNew(main,attchList,route);

			objMap.put("msg", "success");
			objMap.put("projectId", main.getId());// 工程ID
		} catch (Exception e) {
			objMap.put("msg", "error");
		}
		return objMap;
	}
	/**
	 * 根据项目ID获得杆塔明细数据
	 */
	@RequestMapping(value = "/getTaDataById.action")
	@ResponseBody
	public Object getTaDataById(String id) {


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
		RouteInfoNew route = partsService.getRouteNewById(id);
		String tensileSection = route.getTensileSection();
		Object reply;
		List<List<String>> tensileList = new ArrayList<List<String>>();
		if (!ToolsUtil.isEmpty(tensileSection)) {
			reply = (ToolsUtil.strToJson(tensileSection, List.class));
			tensileList = (List<List<String>>) reply;
		}
		
		List<List<List<String>>> taTesult = TAUtil.readTa(list);
		List<List<String>> objList = RouteUtil.readNewRoute(taTesult,tensileList);	
		Map<String,List<List<List<String>>>> objMap = new HashMap<String,List<List<List<String>>>>();
		

		//objMap.put("list",list);

		return objList;
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
