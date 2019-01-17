package com.hr.td.controller.tower;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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
import com.hr.td.entity.Tower;
import com.hr.td.service.tower.ITowerService;
import com.hr.td.util.CommonTool;
import com.hr.td.util.DataTablePage;
import com.hr.td.util.Page;
import com.hr.td.util.ProjectStageEnum;
import com.hr.td.util.PropertiesConfig;
import com.hr.td.util.TAUtil;
import com.hr.td.util.ToolsUtil;
import com.hr.td.util.TowerUtil;

@Controller
@RequestMapping("Parts")
public class PartsController {

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
		
		modelMap.addAttribute("id", id);

		return "/tower/towerDetail";
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
	 * 根据ID获得组配件明细数据
	 */
	@RequestMapping(value = "/getPartsData.action")
	@ResponseBody
	public Object getTaData(String id,int pagingSize) {
		
		List<List<String>> towerobj = new ArrayList<List<String>>();
		List<List<List<String>>> iList = new ArrayList<List<List<String>>>();
		List<List<List<String>>> jList = new ArrayList<List<List<String>>>();
		List<String> partstop = TAUtil.partstop;
		List<String> partsVicetop = TAUtil.partsVicetop;
		List<List<String>> topobj = new ArrayList<List<String>>();
		topobj.add(partstop);
		topobj.add(partsVicetop);
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
		List<List<String>> towerDetail = TAUtil.getPartsDetailByTa(result);
		
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
	 * 根据项目ID获得杆塔明细数据
	 */
	@RequestMapping(value = "/getTaDataById.action")
	@ResponseBody
	public Object getTaDataById(String id,int pagingSize) {
		MainInfo main = towerService.getMainInfo(id);
		Tower tower = towerService.getTower(main.getTowerId());
		String data = tower.getData();
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
}
