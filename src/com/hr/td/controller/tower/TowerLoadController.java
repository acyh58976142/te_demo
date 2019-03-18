package com.hr.td.controller.tower;

import java.io.File;
import java.util.ArrayList;
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
import com.hr.td.entity.GeologicalSchedule;
import com.hr.td.entity.HorizontalTension;
import com.hr.td.entity.MainInfo;
import com.hr.td.entity.Parts;
import com.hr.td.entity.Tower;
import com.hr.td.service.tower.IPartsService;
import com.hr.td.service.tower.ITowerLoadService;
import com.hr.td.service.tower.ITowerService;
import com.hr.td.util.DataTablePage;
import com.hr.td.util.DynamicsFeatures;
import com.hr.td.util.Page;
import com.hr.td.util.PropertiesConfig;
import com.hr.td.util.TAUtil;
import com.hr.td.util.ToolsUtil;

/**
 * 杆塔荷载
 * @author yw
 *
 */
@Controller
@RequestMapping(value="towerLoad")
public class TowerLoadController {
	
	@Autowired
	private ITowerService towerService;// 杆塔明细的接口
	
	@Autowired
	private ITowerLoadService loadService;//杆塔荷载接口
	
	@Autowired
	private IPartsService partsService;//组配件明细表
	
	/**
	 * 查询导地线参数
	 * @param request
	 * @return
	 */
	@RequestMapping(value="getGroundGuidParam.action")
	@ResponseBody
	public Map<String, Object> getGroundGuidParam(HttpServletRequest request){
		Map<String, Object> map=new HashMap<String, Object>();
		Map<String, String> param=new HashMap<String, String>();
		List<Map<String, Object>> paramList=loadService.getGroundGuideParam(param);
		if(!ToolsUtil.isEmpty(paramList)){
			map.put("code", "200");
			map.put("data", paramList);
		}
		else{
			map.put("code", "300");
		}
		return map;
	}
	
	/**
	 * 
	 * @param request
	 * @param 代表档距 representativeSpan
	 * @param 导线型号 conductor_type
	 * @return
	 */
	@RequestMapping(value="getHorizontalTension.action")
	@ResponseBody
	public  Map<String,Object> getHorizontalTension(HttpServletRequest request,double representativeSpan,String conductor_type) {
		Map<String, Object> mapHor=new HashMap<String, Object>();
		Map<String, Object> map1=new HashMap<String, Object>();
		Map<String, String> param=new HashMap<String, String>();
		param.put("conductor_type", conductor_type);
		Map<String, Object> paramMap=null;
		List<Map<String, Object>> paramList=loadService.getGroundGuideParam(param);
		if(!ToolsUtil.isEmpty(paramList)){
			paramMap=paramList.get(0);
		}
		List<Double> steps = new ArrayList<Double>();
		steps.add(representativeSpan);
		steps.add(representativeSpan);
		steps.add(representativeSpan);
		Map<String,String> baseParam=new HashMap<>();
		baseParam = new HashMap<String,String>();
		baseParam.put("dxxh", conductor_type);//导线型号
		baseParam.put("zdzl", "0.25");//最大平均运行张力
		baseParam.put("aqxs", "8");//设计安全系数
		baseParam.put("jxjw", "-25");//架线初伸长降温
		baseParam.put("hzgd", "15");//风荷载计算高度
		baseParam.put("jzgd", "10");//风荷载基准高度
		baseParam.put("czlb", "B");//地形粗糙度类别
		
		
		Map<String,String> wirewayParam=new HashMap<>();
		wirewayParam  = new HashMap<String,String>();
//		wirewayParam.put("txxs", "65000");//弹性系数
//		wirewayParam.put("pzxs", "0.0000205");//线膨胀系数
//		wirewayParam.put("cdzl", "1.0579");//单位长度重量
//		wirewayParam.put("wj", "23.76");//外径
//		wirewayParam.put("jsjm", "333.31");//计算截面
//		wirewayParam.put("ldl", "79569.15");//拉断力
		wirewayParam  = new HashMap<String,String>();
		wirewayParam.put("txxs", formatData(paramMap.get("modulus_elasticity")));//弹性系数
		wirewayParam.put("pzxs", formatData(paramMap.get("tem_exp_coefficient")));//线膨胀系数
		wirewayParam.put("cdzl",  formatData(paramMap.get("unit_weight0")));//单位长度重量
		wirewayParam.put("wj",  formatData(paramMap.get("diameter")));//外径
		wirewayParam.put("jsjm",  formatData(paramMap.get("cross_section_area")));//计算截面
		wirewayParam.put("ldl",  formatData(paramMap.get("breaking_force")));//拉断力
		List<Map<String,String>> weatherConditions = new ArrayList<>();
		 weatherConditions= new ArrayList<Map<String,String>>();
		 
		
		 Map<String,String> temp1= new HashMap<String,String>();
		 temp1.put("workingConditionName", "最低气温") ;
		 temp1.put("isCalculation", "1") ;
		 temp1.put("workingConditionNo", "1") ;
		 temp1.put("temperature", "-20") ;
		 temp1.put("windSpeed", "0") ;
		 temp1.put("iceThickness", "0") ;
		 temp1.put("isWindSpeedConversion", "0") ;
		 
		 
		 Map<String,String> temp2= new HashMap<String,String>();
		 temp2.put("workingConditionName", "平均气温") ;
		 temp2.put("isCalculation", "1") ;
		 temp2.put("workingConditionNo", "2") ;
		 temp2.put("temperature", "15") ;
		 temp2.put("windSpeed", "0") ;
		 temp2.put("iceThickness", "0") ;
		 temp2.put("isWindSpeedConversion", "0") ;
		 
		 Map<String,String> temp3= new HashMap<String,String>();
		 temp3.put("workingConditionName", "最大风") ;
		 temp3.put("isCalculation", "1") ;
		 temp3.put("workingConditionNo", "3") ;
		 temp3.put("temperature", "-5") ;
		 temp3.put("windSpeed", "27") ;
		 temp3.put("iceThickness", "0") ;
		 temp3.put("isWindSpeedConversion", "1") ;
		 
		 Map<String,String> temp4= new HashMap<String,String>();
		 temp4.put("workingConditionName", "覆冰") ;
		 temp4.put("isCalculation", "1") ;
		 temp4.put("workingConditionNo", "4") ;
		 temp4.put("temperature", "-5") ;
		 temp4.put("windSpeed", "10") ;
		 temp4.put("iceThickness", "10") ;
		 temp4.put("isWindSpeedConversion", "0") ;
		 
		 Map<String,String> temp5= new HashMap<String,String>();
		 temp5.put("workingConditionName", "最高气温") ;
		 temp5.put("isCalculation", "1") ;
		 temp5.put("workingConditionNo", "5") ;
		 temp5.put("temperature", "40") ;
		 temp5.put("windSpeed", "0") ;
		 temp5.put("iceThickness", "0") ;
		 temp5.put("isWindSpeedConversion", "0") ;
		 
		 Map<String,String> temp6= new HashMap<String,String>();
		 temp6.put("workingConditionName", "安装") ;
		 temp6.put("isCalculation", "1") ;
		 temp6.put("workingConditionNo", "6") ;
		 temp6.put("temperature", "-10") ;
		 temp6.put("windSpeed", "10") ;
		 temp6.put("iceThickness", "0") ;
		 temp6.put("isWindSpeedConversion", "0") ;
		 temp6.put("remarks", "") ;
		 
		 //√	7	外过电压	15	0	0	×	(无风)
		 Map<String,String> temp7= new HashMap<String,String>();
		 temp7.put("workingConditionName", "外过电压") ;
		 temp7.put("isCalculation", "1") ;
		 temp7.put("workingConditionNo", "7") ;
		 temp7.put("temperature", "15") ;
		 temp7.put("windSpeed", "0") ;
		 temp7.put("iceThickness", "0") ;
		 temp7.put("isWindSpeedConversion", "0") ;
		 temp7.put("remarks", "(无风)") ;
		 
		 //√	8	外过电压	15	10	0	×	(有风)
		 Map<String,String> temp8= new HashMap<String,String>();
		 temp8.put("workingConditionName", "外过电压") ;
		 temp8.put("isCalculation", "1") ;
		 temp8.put("workingConditionNo", "8") ;
		 temp8.put("temperature", "15") ;
		 temp8.put("windSpeed", "10") ;
		 temp8.put("iceThickness", "0") ;
		 temp8.put("isWindSpeedConversion", "0") ;
		 temp8.put("remarks", "(有风)") ;
		 
		 //√	9	内过电压	15	15	0	×	
		 Map<String,String> temp9= new HashMap<String,String>();
		 temp9.put("workingConditionName", "内过电压") ;
		 temp9.put("isCalculation", "1") ;
		 temp9.put("workingConditionNo", "9") ;
		 temp9.put("temperature", "15") ;
		 temp9.put("windSpeed", "15") ;
		 temp9.put("iceThickness", "0") ;
		 temp9.put("isWindSpeedConversion", "0") ;
		 temp9.put("remarks", "") ;
		 
//		 √	10	5m/s风速	15	5	0	×	钢管杆用
		 Map<String,String> temp10= new HashMap<String,String>();
		 temp10.put("workingConditionName", "5m/s风速") ;
		 temp10.put("isCalculation", "1") ;
		 temp10.put("workingConditionNo", "10") ;
		 temp10.put("temperature", "15") ;
		 temp10.put("windSpeed", "5") ;
		 temp10.put("iceThickness", "0") ;
		 temp10.put("isWindSpeedConversion", "0") ;
		 temp10.put("remarks", "钢管杆用") ;
		 
		 //×	11	地线+5	-5	10	15	×	验算1
		 Map<String,String> temp11= new HashMap<String,String>();
		 temp11.put("workingConditionName", "地线+5") ;
		 temp11.put("isCalculation", "1") ;
		 temp11.put("workingConditionNo", "11") ;
		 temp11.put("temperature", "-5") ;
		 temp11.put("windSpeed", "10") ;
		 temp11.put("iceThickness", "15") ;
		 temp11.put("isWindSpeedConversion", "0") ;
		 temp11.put("remarks", "验算1") ;
		 
//		 ×	12	三跨导线	-5	10	20	×	验算2
		 Map<String,String> temp12= new HashMap<String,String>();
		 temp12.put("workingConditionName", "三跨导线") ;
		 temp12.put("isCalculation", "1") ;
		 temp12.put("workingConditionNo", "12") ;
		 temp12.put("temperature", "-5") ;
		 temp12.put("windSpeed", "10") ;
		 temp12.put("iceThickness", "20") ;
		 temp12.put("isWindSpeedConversion", "0") ;
		 temp12.put("remarks", "验算2") ;
		 
		// ×	13	三跨地线	-5	10	25	×	验算3
		 Map<String,String> temp13 = new HashMap<String,String>();
		 temp13.put("workingConditionName", "三跨地线") ;
		 temp13.put("isCalculation", "0") ;
		 temp13.put("workingConditionNo", "13") ;
		 temp13.put("temperature", "-5") ;
		 temp13.put("windSpeed", "10") ;
		 temp13.put("iceThickness", "25") ;
		 temp13.put("isWindSpeedConversion", "0") ;
		 temp13.put("remarks", "验算3") ;
		 
//		 ×	14	验算4	-5	0	3	×	验算4
		 Map<String,String> temp14 = new HashMap<String,String>();
		 temp14.put("workingConditionName", "验算4") ;
		 temp14.put("isCalculation", "0") ;
		 temp14.put("workingConditionNo", "14") ;
		 temp14.put("temperature", "-5") ;
		 temp14.put("windSpeed", "0") ;
		 temp14.put("iceThickness", "3") ;
		 temp14.put("isWindSpeedConversion", "0") ;
		 temp14.put("remarks", "验算4") ;
		 
		 
//		 ×	15	验算5	-5	0	4	×	验算5
		 Map<String,String> temp15 = new HashMap<String,String>();
		 temp15.put("workingConditionName", "验算5") ;
		 temp15.put("isCalculation", "0") ;
		 temp15.put("workingConditionNo", "15") ;
		 temp15.put("temperature", "-5") ;
		 temp15.put("windSpeed", "0") ;
		 temp15.put("iceThickness", "4") ;
		 temp15.put("isWindSpeedConversion", "0") ;
		 temp15.put("remarks", "验算5") ;
		 
		 weatherConditions.add(temp1);
		 weatherConditions.add(temp2);
		 weatherConditions.add(temp3);
		 weatherConditions.add(temp4);
		 weatherConditions.add(temp5);
		
		 weatherConditions.add(temp6);
	
		 weatherConditions.add(temp7);
		
		 weatherConditions.add(temp8);
		
		 weatherConditions.add(temp9);
		
		 weatherConditions.add(temp10);
		
		 weatherConditions.add(temp11);
		
		 weatherConditions.add(temp12);
		
		 weatherConditions.add(temp13);
		
		 weatherConditions.add(temp14);
		 weatherConditions.add(temp15);
		
		map1=DynamicsFeatures.initLoad(baseParam, wirewayParam, weatherConditions, steps);
		List<HorizontalTension>  HorizontalTensions =(List<HorizontalTension>) map1.get("horizontalTensions");
		if(!ToolsUtil.isEmpty(HorizontalTensions)){
			mapHor.put("code", "200");
			mapHor.put("data", HorizontalTensions);
		}
		else{
			mapHor.put("code", "300");
		}
		return mapHor;
		}
	
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
		
	@RequestMapping(value = "getTowerList.action")
	@ResponseBody
	public Map<String, Object> getTowerList(HttpServletRequest request, DataTablePage page,String id) {
		List<List<List<String>>> towerDetailList = getTowerList(id);
		List<Map<String, Object>> towerList = new ArrayList<Map<String, Object>>(); 
		try {
			for(int m= 0; m < towerDetailList.size(); m++){
				List<List<String>>  towerDetail=towerDetailList.get(m);
			  for (int i = 0; i < towerDetail.size(); i++) {
				List<String> tower = towerDetail.get(i);
				String towerNum=tower.get(0)+"+"+TAUtil.getMileage(tower.get(2));// 杆塔编号+塔位里程
				String towerType=tower.get(8);
				String towerGao=tower.get(9);
				String turnAngle=TAUtil.getAngle(tower.get(20));
				Map<String, Object> map=new HashMap<String, Object>();
				map.put("number", towerNum);
				map.put("towerNum", tower.get(0));
				map.put("towerMileage", TAUtil.getMileage(tower.get(2)));
				map.put("towerType", towerType);
				map.put("towerGao", towerGao);
				map.put("turnAngle", turnAngle);
				towerList.add(map);	
			   }
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return page.toReturnMap(towerList, towerList.size());
	} 
	
	/**
	 * 获取杆塔数据
	 * 
	 * @return
	 */
	@RequestMapping(value = "getTowerInfo.action")
	@ResponseBody
	public Map<String, Object> getTowerInfo(String id) {
		Map<String, Object> map=new HashMap<String, Object>();
		
		MainInfo main = towerService.getMainInfo(id);
		
		Tower tower = towerService.getTower(main.getTowerId());
		map.put("data", tower);
		
		return map;
	}
	
	/**
	 * 获取组配件明细表的数据
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "getPartsInfo.action")
	@ResponseBody
	public 	Map<String, Object> getPartsInfo(String id) {
		Map<String, Object> map=new HashMap<String, Object>();
		Parts parts=partsService.getPartsById(id);
		if(!ToolsUtil.isEmpty(parts)){
			map.put("code", "200");
			map.put("data", parts);
		}
		else{
			map.put("code", "300");
		}
		return map;
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
