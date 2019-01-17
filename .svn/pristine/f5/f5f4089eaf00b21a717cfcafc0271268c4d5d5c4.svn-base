package com.hr.td.controller.geology;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hr.td.entity.GeologicalSchedule;
import com.hr.td.service.geology.IGeologyService;
import com.hr.td.service.tower.ITowerService;
import com.hr.td.util.DataTablePage;
import com.hr.td.util.TAUtil;

import net.sf.json.JSONArray;

/**
 * 地质
 * @author cyh
 *
 */
@Controller
@RequestMapping(value = "/geology")
public class GeologyController {
	@Autowired
	protected IGeologyService iGeologyService;
	@Autowired
	protected ITowerService iTowerService;
	
	/**
	 *  查询地层名称和配置表ID
	 */
	@RequestMapping(value = "queryStratigraphicName.action")
	@ResponseBody
	public Map<String, Object> queryStratigraphicName(){
		List<Map<String, Object>> geologicalScheduleConfigure = iGeologyService.queryStratigraphicName();
		System.out.println(geologicalScheduleConfigure);
		Map<String, Object> map = new HashMap<>();
		if (geologicalScheduleConfigure!=null) {
			map.put("geologicalScheduleConfigure", geologicalScheduleConfigure);
		}
		return map;
	}
	
	/**
	 *  根据地层名称的value（ID）查询对应的岩土物理力学指标
	 *  @param HttpServletRequest request
	 */
	@RequestMapping(value = "queryNormByID.action")
	@ResponseBody
	public List<String> queryNormByID(HttpServletRequest request){
		String ID = request.getParameter("ID");
		List<String> list = iGeologyService.queryNormByID(ID);
		//Map<String, Object> map = new HashMap<>();
		return list;
	}
		
	/**
	 * 提交修改所有列表数据
	 * @param HttpServletRequest request
	 * @throws 
	 */
	@RequestMapping(value = "updateEditGeology.action")
	@ResponseBody
	public int updateEditGeology(HttpServletRequest request,@RequestParam(value ="dataList") String dataList){
	
		List<GeologicalSchedule> geologicalScheduleList = new ArrayList<>();
		JSONArray jsonArray = JSONArray.fromObject(dataList);
		for(int i = 0; i< jsonArray.size();i++){
			GeologicalSchedule geologicalSchedule = new GeologicalSchedule();
			
			String ID = (String)jsonArray.getJSONObject(i).get("ID");
			String towerNum = (String)jsonArray.getJSONObject(i).get("towerNum");
			String towerLocation = (String)jsonArray.getJSONObject(i).get("towerLocation");
			String explorationBasis = (String)jsonArray.getJSONObject(i).get("explorationBasis");
			String stratigraphicName = (String)jsonArray.getJSONObject(i).get("stratigraphicName");
			String floorDepth = (String)jsonArray.getJSONObject(i).get("floorDepth");
			String geotechnicalDescription = (String)jsonArray.getJSONObject(i).get("geotechnicalDescription");
			String gravityDensity = (String)jsonArray.getJSONObject(i).get("gravityDensity");
			String cohesion = (String)jsonArray.getJSONObject(i).get("cohesion");
			String internalFrictionAngle = (String)jsonArray.getJSONObject(i).get("internalFrictionAngle");
			String eigenvalueCapacity = (String)jsonArray.getJSONObject(i).get("eigenvalueCapacity");
			String standardSideResistance = (String)jsonArray.getJSONObject(i).get("standardSideResistance");
			String standardEndResistance = (String)jsonArray.getJSONObject(i).get("standardEndResistance");
			String illustrate = (String)jsonArray.getJSONObject(i).get("illustrate");
			String remark = (String)jsonArray.getJSONObject(i).get("remark");
			String surveyPointLocation = (String)jsonArray.getJSONObject(i).get("surveyPointLocation");
			String waterLevel = (String)jsonArray.getJSONObject(i).get("waterLevel");
			
			geologicalSchedule.setID(ID!=""?ID:null);
			geologicalSchedule.setMid(null);
			geologicalSchedule.setTowerNum(towerNum!=""?towerNum:null);
			geologicalSchedule.setTowerLocation(towerLocation!=""?towerLocation:null);
			geologicalSchedule.setExplorationBasis(explorationBasis!=""?explorationBasis:null);
			geologicalSchedule.setStratigraphicName(stratigraphicName!=""?stratigraphicName:null);
			geologicalSchedule.setFloorDepth(floorDepth!=""?floorDepth:null);
			geologicalSchedule.setGeotechnicalDescription(geotechnicalDescription!=""?geotechnicalDescription:null);
			geologicalSchedule.setGravityDensity(gravityDensity!=""?gravityDensity:null);
			geologicalSchedule.setCohesion(cohesion!=""?cohesion:null);
			geologicalSchedule.setInternalFrictionAngle(internalFrictionAngle!=""?internalFrictionAngle:null);
			geologicalSchedule.setEigenvalueCapacity(eigenvalueCapacity!=""?eigenvalueCapacity:null);
			geologicalSchedule.setStandardSideResistance(standardSideResistance!=""?standardSideResistance:null);
			geologicalSchedule.setStandardEndResistance(standardEndResistance!=""?standardEndResistance:null);
			geologicalSchedule.setIllustrate(illustrate!=""?illustrate:null);
			geologicalSchedule.setRemark(remark!=""?remark:null);
			geologicalSchedule.setSurveyPointLocation(surveyPointLocation!=""?surveyPointLocation:null);
			geologicalSchedule.setWaterLevel(waterLevel!=""?waterLevel:null);
			
			geologicalScheduleList.add(geologicalSchedule);
		}
		//返回前台不为空或不为0，则查询成功
		int result  =iGeologyService.updateAllEditGeological(geologicalScheduleList);
		return result;
	}	
	
	/**
	 *  查询geologicalSchedule表信息
	 */
	@RequestMapping(value = "queryGeologicalScheduleInfo.action")
	@ResponseBody
	public Map<String,Object> queryGeologicalScheduleInfo(){
		List<GeologicalSchedule> geologicalScheduleList = iGeologyService.queryGeologicalScheduleAll();
		if (geologicalScheduleList!=null) {
			   List<Object> objList=new ArrayList<Object>();
			for (GeologicalSchedule geologicalSchedule : geologicalScheduleList) {
				Map<String, Object> map = new HashMap<>();
				/*//讲地层名称和与其关联的岩层物理力学指标放入一个list集合中
				List<Object> stratigraphicNameList = new ArrayList<>();
				stratigraphicNameList.add(geologicalSchedule.getStratigraphicName());
				stratigraphicNameList.add(geologicalSchedule.getGeotechnicalDescription());*/
				
				
				map.put("ID",geologicalSchedule.getID()!=null?geologicalSchedule.getID():"");
				map.put("Mid",geologicalSchedule.getMid()!=null?geologicalSchedule.getMid():"");
				map.put("towerNum",geologicalSchedule.getTowerNum()!=null?geologicalSchedule.getTowerNum():"");
				map.put("towerLocation",geologicalSchedule.getTowerLocation()!=null?geologicalSchedule.getTowerLocation():"");
				map.put("explorationBasis",geologicalSchedule.getExplorationBasis()!=null?geologicalSchedule.getExplorationBasis():"");
				map.put("stratigraphicName",geologicalSchedule.getStratigraphicName()!=null?geologicalSchedule.getStratigraphicName():"");
				map.put("floorDepth",geologicalSchedule.getFloorDepth()!=null?geologicalSchedule.getFloorDepth():"");
				map.put("geotechnicalDescription",geologicalSchedule.getGeotechnicalDescription()!=null?geologicalSchedule.getGeotechnicalDescription():"");
				map.put("gravityDensity",geologicalSchedule.getGravityDensity()!=null?geologicalSchedule.getGravityDensity():"");
				map.put("cohesion",geologicalSchedule.getCohesion()!=null?geologicalSchedule.getCohesion():"");
				map.put("internalFrictionAngle",geologicalSchedule.getInternalFrictionAngle()!=null?geologicalSchedule.getInternalFrictionAngle():"");
				map.put("eigenvalueCapacity",geologicalSchedule.getEigenvalueCapacity()!=null?geologicalSchedule.getEigenvalueCapacity():"");
				map.put("standardSideResistance",geologicalSchedule.getStandardSideResistance()!=null?geologicalSchedule.getStandardSideResistance():"");
				map.put("standardEndResistance",geologicalSchedule.getStandardEndResistance()!=null?geologicalSchedule.getStandardEndResistance():"");
				map.put("illustrate",geologicalSchedule.getIllustrate()!=null?geologicalSchedule.getIllustrate():"");
				map.put("remark",geologicalSchedule.getRemark()!=null?geologicalSchedule.getRemark():"");
				map.put("surveyPointLocation",geologicalSchedule.getSurveyPointLocation()!=null?geologicalSchedule.getSurveyPointLocation():"");
				map.put("waterLevel",geologicalSchedule.getWaterLevel()!=null?geologicalSchedule.getWaterLevel():"");
				
				objList.add(map);
			}
			DataTablePage dataTable=new DataTablePage();
			Map<String,Object> objMap=dataTable.toReturnMap(objList,objList.size());
			return objMap;
		}
		return null;
	}
	
	
	/**
	 * 保存所有列表数据
	 * @param HttpServletRequest request
	 * @throws 
	 */
	@RequestMapping(value = "save.action")
	@ResponseBody
	public int saveGeology(HttpServletRequest request,@RequestParam(value ="dataList") String dataList){
	
		List<GeologicalSchedule> geologicalScheduleList = new ArrayList<>();
		JSONArray jsonArray = JSONArray.fromObject(dataList);
		for(int i = 0; i< jsonArray.size();i++){
			GeologicalSchedule geologicalSchedule = new GeologicalSchedule();
			
			UUID uuid =UUID.randomUUID();
			String towerNum = (String)jsonArray.getJSONObject(i).get("towerNum");
			String towerLocation = (String)jsonArray.getJSONObject(i).get("towerLocation");
			String explorationBasis = (String)jsonArray.getJSONObject(i).get("explorationBasis");
			String stratigraphicName = (String)jsonArray.getJSONObject(i).get("stratigraphicName");
			String floorDepth = (String)jsonArray.getJSONObject(i).get("floorDepth");
			String geotechnicalDescription = (String)jsonArray.getJSONObject(i).get("geotechnicalDescription");
			String gravityDensity = (String)jsonArray.getJSONObject(i).get("gravityDensity");
			String cohesion = (String)jsonArray.getJSONObject(i).get("cohesion");
			String internalFrictionAngle = (String)jsonArray.getJSONObject(i).get("internalFrictionAngle");
			String eigenvalueCapacity = (String)jsonArray.getJSONObject(i).get("eigenvalueCapacity");
			String standardSideResistance = (String)jsonArray.getJSONObject(i).get("standardSideResistance");
			String standardEndResistance = (String)jsonArray.getJSONObject(i).get("standardEndResistance");
			String illustrate = (String)jsonArray.getJSONObject(i).get("illustrate");
			String remark = (String)jsonArray.getJSONObject(i).get("remark");
			String surveyPointLocation = (String)jsonArray.getJSONObject(i).get("surveyPointLocation");
			String waterLevel = (String)jsonArray.getJSONObject(i).get("waterLevel");
			
			geologicalSchedule.setID(uuid.toString().replace("-", ""));
			geologicalSchedule.setMid(null);
			geologicalSchedule.setTowerNum(towerNum!=""?towerNum:null);
			geologicalSchedule.setTowerLocation(towerLocation!=""?towerLocation:null);
			geologicalSchedule.setExplorationBasis(explorationBasis!=""?explorationBasis:null);
			geologicalSchedule.setStratigraphicName(stratigraphicName!=""?stratigraphicName:null);
			geologicalSchedule.setFloorDepth(floorDepth!=""?floorDepth:null);
			geologicalSchedule.setGeotechnicalDescription(geotechnicalDescription!=""?geotechnicalDescription:null);
			geologicalSchedule.setGravityDensity(gravityDensity!=""?gravityDensity:null);
			geologicalSchedule.setCohesion(cohesion!=""?cohesion:null);
			geologicalSchedule.setInternalFrictionAngle(internalFrictionAngle!=""?internalFrictionAngle:null);
			geologicalSchedule.setEigenvalueCapacity(eigenvalueCapacity!=""?eigenvalueCapacity:null);
			geologicalSchedule.setStandardSideResistance(standardSideResistance!=""?standardSideResistance:null);
			geologicalSchedule.setStandardEndResistance(standardEndResistance!=""?standardEndResistance:null);
			geologicalSchedule.setIllustrate(illustrate!=""?illustrate:null);
			geologicalSchedule.setRemark(remark!=""?remark:null);
			geologicalSchedule.setSurveyPointLocation(surveyPointLocation!=""?surveyPointLocation:null);
			geologicalSchedule.setWaterLevel(waterLevel!=""?waterLevel:null);
			
			geologicalScheduleList.add(geologicalSchedule);
		}
		//返回前台不为空或不为0，则查询成功
		int result  =iGeologyService.addAllGeological(geologicalScheduleList);
		return result;
	}	
	
	/**
	 *  根据主键id删除一条geologicalSchedule信息
	 *  @param HttpServletRequest request
	 */
	@RequestMapping(value = "deleteEditGeological.action")
	@ResponseBody
	public int deleteEditGeological(HttpServletRequest request){
	    String id = request.getParameter("ID");	
	    int result = iGeologyService.deleteEditGeological(id);
	    return result;
	}
	
	/**
	 * 从文件里获取杆塔编号数据
	 * @param HttpServletRequest request
	 */
	@RequestMapping(value = "findTowerNum.action")
	@ResponseBody
	public List<String> findTowerNum(HttpServletRequest request){
		/*
		String id = "220e0774a1b04d59b0e3bcb90370be99";
		//根据工程id查询出Ta文件路径
		 List<Attachment> attachList = iTowerService.getAttachment(id);
		 //获得文件要存储的根目录的磁盘路径
		String rootPath = PropertiesConfig.getInstance().getProperty("upload_store_root");
		List<File> list = new ArrayList<File>();*/
		/*for (int i = 0; i < attachList.size(); i++) {
				Attachment attach = attachList.get(i);
				String path = attach.getFilePath();//TA文件保存路径
				File file = new File(rootPath + path);
				list.add(file);
		}*/
		List<File> list = new ArrayList<File>();
		//String path ="/1/1545981266307.TA";
		File file = new File("E:/webserver/AhdcSystemFile/1/1545981266307.TA");
		list.add(file);
		//解析文件获取数据
		List<List<List<String>>> result = TAUtil.readTa(list);
        //取出所得数据中的杆塔编号并放入list集合中
		List<String> towerNum = new ArrayList<>();
		for(int i=0;i<result.size();i++){
			for(int j=0;j<result.get(i).size();j++){
				towerNum.add(result.get(i).get(j).get(0));
			}
		}
		return towerNum;
	}
	
}
