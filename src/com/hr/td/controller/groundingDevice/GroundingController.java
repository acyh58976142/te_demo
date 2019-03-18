package com.hr.td.controller.groundingDevice;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hr.td.entity.Attachment;
import com.hr.td.entity.GroundingConfig;
import com.hr.td.entity.GroundingDevice;
import com.hr.td.entity.MainInfo;
import com.hr.td.entity.Tower;
import com.hr.td.service.groundingDevice.IGroundingService;
import com.hr.td.service.tower.ITowerService;
import com.hr.td.util.DataTablePage;
import com.hr.td.util.Page;
import com.hr.td.util.PropertiesConfig;
import com.hr.td.util.TAUtil;
import com.hr.td.util.ToolsUtil;
import com.nari.slsd.hd.util.CommonTool;

import net.sf.json.JSONArray;

@Controller
@RequestMapping("GroundingDevice")
public class GroundingController {

	@Autowired
	private IGroundingService iGroundingService;
	
	@Autowired
	private ITowerService towerService;

	SimpleDateFormat dateFor = new SimpleDateFormat("yyyy-MM-dd");
    
	/**
	 * 跳转到接地装置工程列表页面
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/toGroundingList.action", method = RequestMethod.GET)
	public String projectList(HttpServletRequest request) {

		return "/groundingDevice/groundingList";
	}
	
	/**
	 * 跳转到接地装置工程列表页面
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/groundingDetail.action", method = RequestMethod.GET)
	public String groundingDetail(ModelMap modelMap,HttpServletRequest request) {
		String id = request.getParameter("id");
		MainInfo main = towerService.getMainInfo(id);
		
		modelMap.addAttribute("id", id);
		modelMap.addAttribute("projectCode", main.getProjectCode());
		return "/groundingDevice/groundingDetail";
	}
	
	/**
	 * 跳转到接地装置配置页面
	 * @param <Obejct>
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/toGroundingConfig.action", method = RequestMethod.GET)
	public <Obejct> Obejct toGroundingConfig(ModelMap modelMap,HttpServletRequest request) {
		String projectName = request.getParameter("projectName");
		String projectId = request.getParameter("projectId");
				
		List<GroundingConfig> listArray = iGroundingService.findGroundingConfig(projectId);
		List<Attachment> attachmentArray = iGroundingService.findAttachmentByProjectIdAndType(projectId);
		JSONArray groundingConfigList=JSONArray.fromObject(listArray);
		JSONArray attachmentList=JSONArray.fromObject(attachmentArray);
		
		Map<String, Object> listMap = new HashMap<String, Object>();
		listMap.put("projectName", projectName);
		listMap.put("projectId", projectId);
		listMap.put("groundingConfigList", groundingConfigList);
		listMap.put("attachmentList", attachmentList);
		modelMap.addAttribute("listMap", listMap);
		
		return (Obejct) "/groundingDevice/groundingConfig";
	}
	
	/**
	 * 批量保存接地配置信息
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/save.action")
	@ResponseBody
	public int saveGeology(HttpServletRequest request,@RequestParam(value ="dataList") String param){
		List<GroundingConfig> groundingConfigList = new ArrayList<GroundingConfig>();
		List<Attachment> attachmentList = new ArrayList<Attachment>();
		if(!ToolsUtil.isEmpty(param)){
			JSONArray jsonArray = JSONArray.fromObject(param);
			
			for(int i = 0; i< jsonArray.size();i++){
				GroundingConfig groundingConfig = new GroundingConfig();
				Attachment attachment = new Attachment();
				Map<String, String> groundingConfigMap=(Map<String, String>) jsonArray.get(i);
				String uuid = CommonTool.createUUID();				
				groundingConfig.setId(uuid);
				groundingConfig.setNo(groundingConfigMap.get("no"));
				groundingConfig.setProjectId(groundingConfigMap.get("projectId"));
				groundingConfig.setResistivityMax(Double.parseDouble(groundingConfigMap.get("resistivityMax")!=""?groundingConfigMap.get("resistivityMax"):null));
				groundingConfig.setResistivityMin(Double.parseDouble(groundingConfigMap.get("resistivityMin")));
				groundingConfig.setFile(groundingConfigMap.get("file"));
				groundingConfig.setSerialNum(Integer.parseInt(groundingConfigMap.get("serialNum")));
				
				groundingConfigList.add(groundingConfig);
				//保存到附件表
				if (!ToolsUtil.isEmpty(groundingConfigMap.get("originalFileName"))
					&&!ToolsUtil.isEmpty(groundingConfigMap.get("newFileName"))
					&&!ToolsUtil.isEmpty(groundingConfigMap.get("filePath")) ) {
					attachment.setId(CommonTool.createUUID());
					attachment.setProjectId(groundingConfigMap.get("projectId"));
					attachment.setOriginalFileName(groundingConfigMap.get("originalFileName")!=null?groundingConfigMap.get("originalFileName"):"");
					attachment.setNewFileName(groundingConfigMap.get("newFileName")!=null?groundingConfigMap.get("newFileName"):"");
					attachment.setFilePath(groundingConfigMap.get("filePath")!=null?groundingConfigMap.get("filePath"):"");
					attachment.setAttachmentType(3);
					attachment.setSortNo(Integer.parseInt(groundingConfigMap.get("serialNum").toString()));
					
					attachmentList.add(attachment);
				}
								
			}
		}
		int result = 0;
		int result1 = 0;
		int result2 = 0;
		String projectId = request.getParameter("projectId");
		@SuppressWarnings("unused")
		int deleteResult = iGroundingService.deleteAllGroundingConfigByPrijectId(projectId);
		@SuppressWarnings("unused")
		int deleteResult2 = iGroundingService.deleteAllAttachmentByPrijectId(projectId);
		
		if (!ToolsUtil.isEmpty(groundingConfigList)) {
			result1 = iGroundingService.addAllGroundingConfig(groundingConfigList);
			result2 = iGroundingService.addAllAttachment(attachmentList);
		}
		
	    result = result1 + result2;
		//返回前台不为空或不为0，则插入成功
		return result;
	}
	
	/**
	 * 查询并分页
	 * @param request
	 * @param page
	 * @return
	 */
	@RequestMapping(value = "/queryMainInfo.action", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> queryMainInfo(HttpServletRequest request, DataTablePage page) {
		try {
			Map<String, Object> paramMap = new HashMap<String, Object>();

			paramMap.put("pageSize", page.getLength());
			paramMap.put("startIndex", page.getStart());
			int totalCount = iGroundingService.findMainInfoListCount();

			Page p = iGroundingService.findMainInfoList(paramMap, totalCount);

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
	 * 根据ID获得接地装置明细数据
	 */
	@RequestMapping(value = "/getDeviceDetail.action")
	@ResponseBody
	public Object getDeviceDetail(String id,int pagingSize) {

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
	
		List<List<String>> result = TAUtil.readTa(list,pagingSize);

		List<List<String>> deviceDetail = getGroundDeviceDetail(result,id);
		for (int i = 0; i < deviceDetail.size(); i++) {
			for (int j = 0; j < deviceDetail.get(i).size(); j++) {
				if(deviceDetail.get(i).get(j).equals("0")){
					deviceDetail.get(i).set(j, "");
				}
			}
		}
		
		return deviceDetail;
	}
	
	/**
	 * 新增杆塔
	 */
	@RequestMapping(value = "/saveGrounding.action", method = RequestMethod.POST)
	@ResponseBody
	public Object saveGrounding(String data,String id,HttpServletRequest request) {
		GroundingDevice grounding =	iGroundingService.getGroundingById(id);
		if (ToolsUtil.isEmpty(grounding)) {
			grounding = new GroundingDevice();
			grounding.setId(CommonTool.createUUID());// 主键ID
			grounding.setProjectId(id);
		}
		grounding.setData(data);
		
		Map<String, Object> objMap = new HashMap<String, Object>();
		try {
			iGroundingService.saveGrounding(grounding);
			objMap.put("msg", "success");
		} catch (Exception e) {
			objMap.put("msg", "error");
		}
		return objMap;
	}
	
	
	/**
	 * 根据ID获得接地装置代号
	 */
	@RequestMapping(value = "/getGroundingConfig.action")
	@ResponseBody
	public Object getGroundingConfig(String id) {

		List<GroundingConfig> listArray = iGroundingService.getGroundingConfigList(id);
		GroundingDevice grounding = iGroundingService.getGroundingById(id);
		List<String> dataList = new ArrayList<String>();
		if (!ToolsUtil.isEmpty(grounding)) {
			String data = grounding.getData();
			dataList =(List<String>)ToolsUtil.strToJson(data, List.class);
		}
		List<String> groundNo = new ArrayList<String>();
		groundNo.add("");
		for (int i = 0; i < listArray.size(); i++) {
			groundNo.add(listArray.get(i).getNo());
		}
		
		Map<String,List<String>> objMap = new HashMap<String,List<String>>();
		objMap.put("groundNo", groundNo);
		objMap.put("dataList", dataList);
		
		return objMap;
	}
	
	
	public List<List<String>> getGroundDeviceDetail(List<List<String>> result,String id)
	{
		 List<List<String>> towerobj = new ArrayList<List<String>>();
		 List<String> towerTop = new ArrayList<>(Arrays.asList("杆塔编号", "塔位里程千米+米", "杆塔型式", "杆塔定位呼高(米)", "接地装置"));
		 towerobj.add(towerTop);
		
		for (int i = 1; i < result.size(); i++) {
		List<String> obj = result.get(i);
		List<String> towerstr1 = new ArrayList<String>();
		String taNo = new String();
		taNo = obj.get(0);
		if(taNo.length()>3){
			if(taNo.substring(0, 2).equals("备注")){
				taNo = taNo.substring(2); 
			}
		}
		towerstr1.add(taNo);//杆塔编号
		String mileage = new String();
		mileage = getMileage(obj.get(2));
		towerstr1.add(mileage);// 塔位里程千米+米
		towerstr1.add(ToolsUtil.isEmpty(obj.get(8)) ? "" : getStyle(obj.get(8)));// 杆塔型式
		towerstr1.add(obj.get(9));// 杆塔定位呼高(米)
		towerstr1.add("");
		String resistivity = iGroundingService.getResistivity(taNo+"+"+obj.get(2));
		String no = "";
		if (!ToolsUtil.isEmpty(resistivity)&&!ToolsUtil.isEmpty(id)) {
		no=	iGroundingService.getNoByResistivity(resistivity,id);
		if (ToolsUtil.isEmpty(no)) {
			no=	getGroundNo(Double.parseDouble(resistivity));
			}
		}
		
		towerstr1.add(no);
		
		towerobj.add(towerstr1);
	}
		return towerobj;
	}
	
	/**
	 * 获取接地装置代号
	 * 
	 * @param resistivity 土壤电阻率
	 * @return groundNo 接地装置代号
	 */
	public String getGroundNo(Double resistivity) {
		String groundNo = new String();
		if (0<resistivity&&resistivity<=300) {	
			groundNo = "T3";
		}else if(300<resistivity&&resistivity<=600){
			groundNo = "T6";
		}else if(600<resistivity&&resistivity<1000){
			groundNo = "T10";
		}
		return groundNo;
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
	 * 获取塔位里程
	 * 
	 * @param string
	 * @return mileage里程
	 */
	public String getMileage(String str) {
		String mileage = new String();
		Double doubleAge = CommonTool.ConvertToDouble(str);
		Long age = Math.round(doubleAge);
		String ageStr = new String();
		if (age != 0) {
			ageStr = age.toString();
		}
		if (age == 0) {
			mileage = "0+000";
		} else if (age < 10) {
			mileage = ("0+00" + ageStr);
		} else if (age < 100) {
			mileage = ("0+0" + ageStr);
		} else if (age < 1000) {
			mileage = ("0+" + ageStr);
		} else {
			mileage = ageStr.substring(0, ageStr.length() - 3) + "+"
					+ ageStr.substring(ageStr.length() - 3, ageStr.length());
		}
		return mileage;
	}
}
