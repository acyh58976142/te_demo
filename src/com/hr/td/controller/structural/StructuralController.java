package com.hr.td.controller.structural;

import java.io.File;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fr.third.org.apache.poi.hssf.record.formula.functions.Char;
import com.hr.td.entity.Attachment;
import com.hr.td.entity.GeologicalSchedule;
import com.hr.td.entity.MainInfo;
import com.hr.td.entity.StructuralParamter;
import com.hr.td.entity.Tower;
import com.hr.td.service.geology.IGeologyService;
import com.hr.td.service.structural.IActingForceRealtionService;
import com.hr.td.service.structural.IStructuralParamterService;
import com.hr.td.service.tower.ITowerService;
import com.hr.td.util.CompareatorSininMoreSpace;
import com.hr.td.util.PropertiesConfig;
import com.hr.td.util.TAUtil;
import com.hr.td.util.ToolsUtil;

/**
 * 结构信息
 * 
 * @author yw
 *
 */
@Controller
@RequestMapping(value = "/structural/")
public class StructuralController {

	@Autowired
	private ITowerService towerService;// 杆塔明细的接口
	
	@Autowired
	protected IGeologyService geologyService;//地质明细表接口
	
	@Autowired
	private IActingForceRealtionService actservice;//杆塔关系接口
	
	@Autowired
	private IStructuralParamterService paramterService;//基础参数接口

	/**
	 * 跳转结构信息页面
	 * 
	 * @return
	 */
	@RequestMapping(value = "turntoStructuralData.action")
	public String turntoStructuralData() {
		return "/structural/structuralData";
	}
	
	/**
	 * 根据项目id查询TA文件信息
	 * @param id
	 * @return
	 */
	public List<List<List<String>>> getTowerList(String id){
		Map<String, Object> map = new HashMap<String, Object>();
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
		return result;
	}

	/**
	 * 组合成结构的基础信息
	 * @param id
	 * @param pageSize
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "getTowerData.action")
	@ResponseBody
	public Map<String, Object> getTowerData(String id, int pageSize, HttpServletRequest request) {
		Map<String, Object> map=new HashMap<String, Object>();
		List<List<List<String>>> towerDetailList = getTowerList(id);
		Map<String, Object> picMap=getPicName(towerDetailList,id);
		List<List<String>> towerList = new ArrayList<List<String>>();
		List<List<String>> structuraltop = TAUtil.structuraltop();
		towerList.addAll(structuraltop);
		for(int m= 0; m < towerDetailList.size(); m++){
			List<List<String>>  towerDetail=towerDetailList.get(m);
		for (int i = 0; i < towerDetail.size(); i++) {
			List<String> tower = towerDetail.get(i);
			String towerNum=tower.get(0);//+"+"+TAUtil.getMileage(tower.get(2));// 杆塔编号+塔位里程
			String towerType=tower.get(8);
			String towerGao=tower.get(9);
			String turnAngle=TAUtil.getAngle(tower.get(20));

			List<GeologicalSchedule> scheduleList=getScheduleListByNum(towerNum);
			
				for (int j = 0; j < 4; j++) {
					String geotechnicalDescription ="";
					String stratigraphicState="";
					String eigenvalueCapacity ="";
					String illustrate ="";
					String waterLevel ="";
					String remark ="";
					String buryingDepth="";
					String columnHigh="";
					String basicModel="";
					if(!ToolsUtil.isEmpty(scheduleList)){
						if(j<scheduleList.size()){
							GeologicalSchedule schedule=scheduleList.get(j);
							geotechnicalDescription =(j+1)+":"+schedule.getGeotechnicalDescription();
							eigenvalueCapacity =schedule.getEigenvalueCapacity();
							illustrate =schedule.getIllustrate();
							waterLevel =schedule.getWaterLevel();
							remark =schedule.getRemark();
							stratigraphicState=schedule.getStratigraphicState();
							if(scheduleList.size()>4){
								if(j==3){
									for(int k=4;k<scheduleList.size();k++){
										geotechnicalDescription +=schedule.getGeotechnicalDescription();
										eigenvalueCapacity +=schedule.getEigenvalueCapacity();
										illustrate +=schedule.getIllustrate();
										waterLevel +=schedule.getWaterLevel();
										remark +=schedule.getRemark();									
									}
								}
							}					
						}						
					}
					
					Map<String, String>  ABCDMap=getABCDMap(turnAngle,j);
					//根据杆塔型号+杆塔拉压方式+地层状态
					List<Map<String, Object>> paramList=getParamterList(towerType,ABCDMap.get("type"),stratigraphicState);
					
					if(!ToolsUtil.isEmpty(paramList)){
							Map<String, Object> paramMap=paramList.get(0);
							buryingDepth=formatData(paramMap.get("buryingDepth"));
							columnHigh=formatData(paramMap.get("columnHigh"));
							basicModel=formatData(paramMap.get("basicModel"));
					}
					
					
					List<String> obj = new ArrayList<String>();
					obj.add(towerNum); 
					obj.add(towerType); // 杆塔型号
					obj.add(towerGao); // 呼高
					obj.add(turnAngle); // 转角度数
					obj.add(ABCDMap.get("name")); // 塔腿编号
					obj.add(basicModel);  //基础型号
					obj.add(columnHigh);  //基柱出土高度
					obj.add(buryingDepth);  //埋深
					obj.add(formatData(picMap.get(basicModel)));  //图号
					obj.add(formatObj(geotechnicalDescription));  //岩土名称及概况
					obj.add(formatObj(eigenvalueCapacity));  //承载力特征值
					obj.add(formatObj(illustrate));  //微地貌描述
					obj.add(waterLevel);  //地下水位埋深
					obj.add(remark);  //备注
					towerList.add(obj);
				}		
		}
		}
		map.put("list", towerList);
		return map;
	}
	
	/**
	 * 查询地质参数
	 * @param 杆塔编号 towerNum
	 * @return
	 */
	public List<GeologicalSchedule>  getScheduleListByNum(String towerNum){
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("towerNum", towerNum);
		List<GeologicalSchedule> scheduleList=geologyService.getScheduleList(map);
		return scheduleList;
	}
	
	/**
	 * 查询结构基础参数
	 * @param 杆塔类型 towerType
	 * @param 拉压方式 angleLY
	 * @param 地层状态  geologicalDescription
	 * @return
	 */
	public List<Map<String, Object>> getParamterList(String towerType,String angleLY,String geologicalDescription){
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("towerType", towerType);
		map.put("angleLY", angleLY);
		map.put("geologicalDescription", geologicalDescription);
		List<Map<String, Object>> paramList=paramterService.getParamter(map);
		return paramList;
	}

	public String formatObj(String str) {
		if(ToolsUtil.isEmpty(str)){
			return "/";
		}
		return str;
	}
	
	/**
	 * 获取目录信息
	 * @param projectId
	 * @return
	 */
	@RequestMapping(value="getPicList.action")
	@ResponseBody
	public Map<String, Object> getPicList(String projectId){
		Map<String, Object> map=new HashMap<String, Object>();
		List<List<List<String>>> towerDetailList = getTowerList(projectId);
		Map<String, Object> picMap=getPicName(towerDetailList,projectId);
		List<Map<String, String>> list=(List<Map<String, String>>) picMap.get("data");	
		if(!ToolsUtil.isEmpty(list)){	
		    map.put("code", "200");
		    map.put("data", list);
		}
		else{
			 map.put("code", "300");
		}
		return map;
	}
	
	/**
	 * 获取基础型号对应的图号
	 * @param towerDetailList
	 * @return
	 */
	public Map<String, Object> getPicName(List<List<List<String>>> towerDetailList,String projectId){
		List<Map<String, String>> picList=new ArrayList<Map<String, String>>();
		List<StructuralParamter> moreSpaces = new ArrayList<StructuralParamter>();
		 Map<String, Object> picMap = new HashMap<String, Object>();
		for(int m = 0; m < towerDetailList.size(); m++){
			List<List<String>>  towerDetail=towerDetailList.get(m);
			for (int i = 0; i < towerDetail.size(); i++) {
				List<String> tower = towerDetail.get(i);
				String towerNum=tower.get(0);//+"+"+TAUtil.getMileage(tower.get(2));// 杆塔编号+塔位里程
				String towerType=tower.get(8);//杆塔型号
				String turnAngleName=getTowerTypeName(tower.get(8));
				String turnAngle=TAUtil.getAngle(tower.get(20));
				String forceTtype="";
				List<String> str=new ArrayList<String>();
				if(turnAngleName.equals("直线塔")){
					forceTtype="L";
					str.add(forceTtype);
				}
				else{
					//转角塔
					if(ToolsUtil.isEmpty(turnAngle)){
						forceTtype="L";
						str.add(forceTtype);
					}
					else{
		        	double angle=Double.parseDouble(turnAngle.substring(1,turnAngle.indexOf("°")));
		        	if(Math.abs(angle)>=20){//判断角度是否在范围内
		        		//转角方向	
	    				str.add("L");
	    				str.add("Y");
		        	}
		        	else{
		        		str.add("L");
		        	}
					}
				}
				//地质参数
				List<GeologicalSchedule> ScheduleList= getScheduleListByNum(towerNum);	
				if(!ToolsUtil.isEmpty(ScheduleList)){
				    for(int j=0;j<ScheduleList.size();j++){
						GeologicalSchedule	Schedule=ScheduleList.get(j);
						if(!ToolsUtil.isEmpty(Schedule)){
							//地层描述
							String stratigraphicState=Schedule.getStratigraphicState();							
							for(int f=0;f<str.size();f++){//转角拉压方式
								Map<String, Object> map=new HashMap<String, Object>();
								map.put("geologicalDescription", stratigraphicState);
								map.put("towerType", towerType);
								map.put("angleLY", str.get(f));
								List<Map<String, Object>> paramList=paramterService.getParamter(map);
								if(!ToolsUtil.isEmpty(paramList)){
									Map<String, Object> paramMap=paramList.get(0);
									StructuralParamter param=new StructuralParamter();
									param.setId(paramMap.get("id").toString());
									param.setGeologicalDescription(formatData(paramMap.get("geologicalDescription"))); 
									param.setTowerType(formatData(paramMap.get("towerType"))); 
									param.setAngleLY(formatData(paramMap.get("angleLY")));
									param.setActingForce(formatData(paramMap.get("actingForce")));
									param.setSoilVolume(formatData(paramMap.get("soilVolume"))); 
									param.setBasicModel(formatData(paramMap.get("basicModel")));
									param.setRemark(formatData(paramMap.get("remark")));
									if(!ToolsUtil.isEmpty(moreSpaces)){
										Boolean flag=true;
										//去重复
										for(StructuralParamter p:moreSpaces){
											//基础型号
											if(p.getBasicModel().equals(param.getBasicModel())){
												flag=false;
											}
										}
										if(flag){
											moreSpaces.add(param);
										}
									}	
									else{
										moreSpaces.add(param);
									}
								}				
							}										
						}
					}
				}
				
			}
		}	
				
		if(!ToolsUtil.isEmpty(moreSpaces)){
			//根据混凝土量排序
			CompareatorSininMoreSpace compareatorSMS = new CompareatorSininMoreSpace();
			Collections.sort(moreSpaces, compareatorSMS);
			String projectCode=getProjectInfo(projectId);
			for(int i=0;i<moreSpaces.size();i++){
				StructuralParamter paramter=moreSpaces.get(i);
				 Map<String, String> newMap = new HashMap<String, String>();
				 newMap.put("id",paramter.getId()); 
				 newMap.put("geologicalDescription",paramter.getGeologicalDescription()); 
				 newMap.put("towerType",paramter.getTowerType()); 
				 newMap.put("angleLY",paramter.getAngleLY()); 
				 newMap.put("actingForce",paramter.getActingForce()); 				 
				 newMap.put("soilVolume",paramter.getSoilVolume()); 
				 newMap.put("basicModel",paramter.getBasicModel()); 
				 newMap.put("remark",paramter.getRemark());
				 newMap.put("picNumber","S1345S-T0202-"+(i+1)); 
				 newMap.put("number",i+""); 
				 picList.add(newMap);
				 picMap.put(paramter.getBasicModel(),projectCode+"-T0202-"+(i+1)); 
			}
		}
		picMap.put("data", picList);
		return picMap;
	}
	
     /**
      * 获取工程信息
      * @return
      */
	public String getProjectInfo(String id){
		MainInfo main = towerService.getMainInfo(id);
		return main.getProjectCode();
	}
 
	
	public Map<String, String> getABCDMap(String turnAngle,int i) {
		Map<String, String> map=new HashMap<String, String>();

		String AB_str="";
		String CD_str="";
        if(!ToolsUtil.isEmpty(turnAngle)){//直线塔
        	//转角塔
        	double angle=Double.parseDouble(turnAngle.substring(1,turnAngle.indexOf("°")));
        	if(Math.abs(angle)>=20){//判断角度是否在范围内
        		//转角方向
    			String direction=turnAngle.substring(0, 1);
    			if(direction.equals("左")){
    				AB_str="Y";
    				CD_str="L";
    			}
                if(direction.equals("右")){               	
    				AB_str="L";
    				CD_str="Y";
    			}	
        	}
        	else{
        		AB_str="L";
    			CD_str="L";
        	}
		}
        else{
        	AB_str="L";
			CD_str="L";
        }
        
        if (i == 0) {
    		map.put("name", "A");
    		map.put("type", AB_str);
		}
		if (i == 1) {
			map.put("name", "B");
    		map.put("type", AB_str);
		}
		if (i == 2) {
			map.put("name", "C");
    		map.put("type", CD_str);
		}
		if (i == 3) {
			map.put("name", "D");
    		map.put("type", CD_str);
		}

		return map;
	}
	
	/**
	 * 获取杆塔类型
	 * @param 工程 id
	 * @return
	 */
	@RequestMapping(value="getTowerType.action")
	@ResponseBody
	public Map<String, Object> getTowerTypeList(String id){
		Map<String, Object> map=new HashMap<String, Object>();
		List<List<List<String>>> towerDetailList = getTowerList(id);
		List<Map<String, Object>> towerList = new ArrayList<Map<String, Object>>();
		for(int m = 0; m < towerDetailList.size(); m++){
			List<List<String>>  towerDetail=towerDetailList.get(m);
		for (int i = 0; i < towerDetail.size(); i++) {
			     List<String> tower = towerDetail.get(i);
			     Map<String, Object> towerMap=new HashMap<String, Object>();
			     towerMap.put("towerNum",tower.get(0)+"+"+TAUtil.getMileage(tower.get(2)));// 杆塔编号+塔位里程);// 杆塔编号+里程
			     towerMap.put("towerType", tower.get(8));// 杆塔型号
			     towerMap.put("turnAngle",TAUtil.getAngle(tower.get(20)));// 转角角度
			     towerMap.put("towerTypeName",getTowerTypeName(tower.get(8)));// 转角角度
			     towerList.add(towerMap); 
		}
		}
		
        map.put("list", towerList);
		return map;
	}
	
	
	public String  getTowerTypeName(String towerType){
		String name="直线塔";
		if(!ToolsUtil.isEmpty(towerType)){
			String name_str=towerType;
			if(towerType.indexOf("-")!=-1){
				name_str=towerType.substring(towerType.indexOf("-"),towerType.length());
			}
			if(name_str.indexOf("Z")!=-1){//直线塔
				if(name_str.indexOf("ZJ")!=-1){
					name="直转塔";
				}
			}
			else{ //转角塔
				if(name_str.indexOf("DJ")!=-1){
					name="终端塔";
				}
				else{
					name="转角塔";
				}
			}
			
		}
		return name;
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
