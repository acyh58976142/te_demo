package com.hr.td.service.impl.electricPower;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hr.td.dao.IBaseDao;
import com.hr.td.entity.Attachment;
import com.hr.td.entity.HorizontalTension;
import com.hr.td.entity.MeterSag100;
import com.hr.td.entity.RouteInfo;
import com.hr.td.entity.Sag;
import com.hr.td.service.electricPower.IWiringingDrawingService;
import com.hr.td.util.PropertiesConfig;
import com.hr.td.util.TAUtil;
import com.hr.td.util.ToolsUtil;
import com.hr.td.util.TowerUtil;

@Service
public class WiringingDrawingServiceImpl implements IWiringingDrawingService{
	
	@Autowired
	private IBaseDao baseDao;
	@Override
	public List<Map<String, Object>> groundWireParam(String param) {
		List<Object> list = new ArrayList<Object>();
		StringBuilder builder = new StringBuilder();
		builder.append(" SELECT * FROM ahdc.ground_guide_param where 1 = 1 ");
		if (!ToolsUtil.isEmpty(param)) {
			builder.append(" AND conductor_type = ? ");
			list.add(param);
		}
		return baseDao.getJdbcTemplateDAO().queryForList(builder.toString(), list.toArray());
	}
	@Override
	public Map<String, Object> getEntryCondition() {
		Map<String, Object> reultMap = new HashMap<String, Object>();
		List<Object> list = new ArrayList<Object>();
		StringBuilder builder = new StringBuilder();
		
		//	导线基本条件
		builder.append(" SELECT * FROM ahdc.mp_base_param where wireTypeTag = '1' ");
		List<Map<String, Object>> mp_base_param1 = baseDao.getJdbcTemplateDAO().queryForList(builder.toString(), list.toArray());
		reultMap.put("baseParam1", mp_base_param1);
		
		//	地线基本条件
		builder = new StringBuilder();
		builder.append(" SELECT * FROM ahdc.mp_base_param WHERE wireTypeTag = '2' ");
		List<Map<String, Object>> mp_base_param2 = baseDao.getJdbcTemplateDAO().queryForList(builder.toString(), list.toArray());
		reultMap.put("baseParam2", mp_base_param2);
		
		//	导线气象条件
		builder = new StringBuilder();
		builder.append(" SELECT * FROM ahdc.mp_weather_conditions WHERE wireTypeTag = '1' order by workingConditionNo ");
		List<Map<String, Object>> mp_weather_conditions1 = baseDao.getJdbcTemplateDAO().queryForList(builder.toString(), list.toArray());
		reultMap.put("weatherConditions1", mp_weather_conditions1);
		
		//	地线气象条件
		builder = new StringBuilder();
		builder.append(" SELECT * FROM ahdc.mp_weather_conditions WHERE wireTypeTag = '2' order by workingConditionNo ");
		List<Map<String, Object>> mp_weather_conditions2 = baseDao.getJdbcTemplateDAO().queryForList(builder.toString(), list.toArray());
		reultMap.put("weatherConditions2", mp_weather_conditions2);
		
		//	导线代表档距与步长
		builder = new StringBuilder();
		builder.append(" SELECT * FROM ahdc.mp_ruling_span WHERE wireTypeTag = 1 ");
		List<Map<String, Object>> mp_ruling_span1 = baseDao.getJdbcTemplateDAO().queryForList(builder.toString(), list.toArray());
		reultMap.put("steps1", mp_ruling_span1);
		
		//	地线代表档距与步长
		builder = new StringBuilder();
		builder.append(" SELECT * FROM ahdc.mp_ruling_span WHERE wireTypeTag = 2 ");
		List<Map<String, Object>> mp_ruling_span2 = baseDao.getJdbcTemplateDAO().queryForList(builder.toString(), list.toArray());
		reultMap.put("steps2", mp_ruling_span2);
		
		//	导线参数
		builder = new StringBuilder();
		builder.append(" SELECT * FROM ahdc.ground_guide_param order by ground_id ");
		List<Map<String, Object>> ground_guide_param = baseDao.getJdbcTemplateDAO().queryForList(builder.toString(), list.toArray());
		reultMap.put("wirewayParam", ground_guide_param);
		
		return reultMap;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public boolean updateMechanicsProperty(Map<String, String> baseParam, Map<String, String> wirewayParam,
			List<Map<String, String>> weatherConditions, Map<String, Object> result) {
		List<Object> list = new ArrayList<Object>();
		StringBuilder builder = new StringBuilder();
		//	导线基本条件
		list.add(baseParam.get("dxxh"));
		list.add(baseParam.get("zdzl"));
		list.add(baseParam.get("aqxs"));
		list.add(baseParam.get("jxjw"));
		list.add(baseParam.get("hzgd"));
		list.add(baseParam.get("jzgd"));
		list.add(baseParam.get("czlb"));
		builder.append(" UPDATE mp_base_param SET wireType = ? , maxTension = ? ,securityCoefficient = ?, "
				+ " stringingCooling = ? ,windLoadCalcHeight = ? , windLoadRefeHeight = ?, terrainRoughness = ? WHERE id = '1'  ");
		baseDao.getJdbcTemplateDAO().update(builder.toString(), list.toArray());
		
		//	导线气象条件
		for (int i = 0; i < weatherConditions.size(); i++) {
			list.clear();
			builder = new StringBuilder();
			list.add(weatherConditions.get(i).get("workingConditionName"));//	工况名称
			list.add(weatherConditions.get(i).get("isCalculation"));//	参与计算
			list.add(weatherConditions.get(i).get("temperature"));//	温度℃
			list.add(weatherConditions.get(i).get("windSpeed"));//	风速m/s
			list.add(weatherConditions.get(i).get("iceThickness"));//	冰厚mm
			list.add(weatherConditions.get(i).get("isWindSpeedConversion"));//	风速折算
			list.add(weatherConditions.get(i).get("remarks"));//	备注
			list.add(weatherConditions.get(i).get("workingConditionNo"));//	工况序号
			builder.append(" UPDATE mp_weather_conditions SET workingConditionName = ? , isCalculation = ? ,temperature = ?, "
					+ " windSpeed = ? , iceThickness = ?, isWindSpeedConversion = ?, remarks = ? WHERE wireTypeTag = '1' AND workingConditionNo = ? ");
			baseDao.getJdbcTemplateDAO().update(builder.toString(), list.toArray());
		}
		
		//	架线百米弧垂
		List<MeterSag100> meterSag100 =  (List<MeterSag100>) result.get("meterSag100");
		for (MeterSag100 meterSag : meterSag100) {
			meterSag.setId(ToolsUtil.createUUID());
			meterSag.setWireTypeTag(1);
			baseDao.saveOrUpdate(meterSag);
		}
		
		//	水平张力
		List<HorizontalTension> tension =  (List<HorizontalTension>) result.get("horizontalTensions");
		for (HorizontalTension tension1 : tension) {
			tension1.setId(ToolsUtil.createUUID());
			tension1.setWireTypeTag(1);
			baseDao.saveOrUpdate(tension1);
		}
		
		//	弧垂
		List<Sag> sag =  (List<Sag>) result.get("sags");
		for (Sag sag2 : sag) {
			sag2.setId(ToolsUtil.createUUID());
			sag2.setWireTypeTag(1);
			baseDao.saveOrUpdate(sag2);
		}
		return true;
	}
	
	@Override
	public List<Map<String, Object>> getStandardSeriesByParam(Map<String, Object> param) {
		List<Object> list = new ArrayList<Object>();
		StringBuilder builder = new StringBuilder();
		builder.append(" select * from wd_standard_series WHERE 1 = 1 ");
		list.add(param.get("wireType"));
		builder.append(" AND wireType = ? ");
		list.add(param.get("weatherCondition"));
		builder.append(" AND weatherCondition = ? ");
		list.add(param.get("safetyFactor"));
		builder.append(" AND safetyFactor = ? ");
		list.add(param.get("contactConductor"));
		builder.append(" AND contactConductor = ? ");
		list.add(param.get("contactConductorSafetyFactor"));
		builder.append(" AND contactConductorSafetyFactor = ? ");
		list.add(param.get("contactDistance"));
		builder.append(" AND contactDistance = ? ");
		baseDao.getJdbcTemplateDAO().update(builder.toString(), list.toArray());
		return null;
	}
	
	@Override
	public Map<String,Object> getWireType(List<Attachment> attachments,RouteInfo route , String rootPath, int type) {

		Map<String,Object> map = new HashMap<String,Object>();
		List<Map<String,String>> wirewayContinuity = new ArrayList<Map<String,String>>();//连续档 导线
//		List<Map<String,String>> groundWireContinuity = new ArrayList<Map<String,String>>();//导线串
		List<Map<String,String>> wirewayIsolated	 = new ArrayList<Map<String,String>>();//孤立档  导线
//		List<Map<String,String>> groundWireIsolated	 = new ArrayList<Map<String,String>>();//
		List<List<String>> tensileList = new ArrayList<List<String>>();
		String tensileSection = route.getTensileSection();
		Object reply;
		if (!ToolsUtil.isEmpty(tensileSection)) {
			reply = (ToolsUtil.strToJson(tensileSection, List.class));
			tensileList = (List<List<String>>) reply;
		}
		
		List<File> lists = new ArrayList<File>();
		for(int i=0;i<attachments.size();i++)
		{
			Attachment attachment = attachments.get(i);

			if(attachment.getOriginalFileName().indexOf(".TA") > 0) {
				File file =new File(rootPath+ attachment.getFilePath());
				lists.add(file);
			}
			
		}
		TowerUtil t = new TowerUtil();
		List<List<List<String>>> lis3s =  t.getJColumns(TAUtil.readTa(lists));
		List<List<List<String>>> lis3sj =  t.getJColumns(TAUtil.readTa(lists));
		
		int temlen=0;
		for(int i=0;i<lis3s.size();i++)
		{
			
			List<List<String>> list2s = lis3s.get(i);
			List<List<String>> list2sj = lis3sj.get(i);
//			for(List<String> list : list2s)
			for(int j=0;j<list2s.size();j++)
			{
					List<String> list =list2s.get(j);
					List<String> listD =list2s.get(j);
					Map<String,String> rowMap = new HashMap<String,String>();
					String  str = list.get(0);
					String  str1 = list.get(1);
					List<String> tensile = tensileList.get(temlen+1);

					String wireway= ""; //导线
					String groundWire = ""; //地线
					
					if(!ToolsUtil.isEmpty(tensile.get(44)) && !"null".equals(tensile.get(44)))
					{
						wireway = tensile.get(44);
					}else if(!ToolsUtil.isEmpty(tensile.get(47))&& !"null".equals(tensile.get(47)))
					{
						wireway = tensile.get(47);
					}
					else if(!ToolsUtil.isEmpty(tensile.get(50))&& !"null".equals(tensile.get(50)))
					{
						wireway = tensile.get(50);
					}
					else if(!ToolsUtil.isEmpty(tensile.get(53)) && !"null".equals(tensile.get(53)))
					{
						wireway = tensile.get(53);
					}
					else if(!ToolsUtil.isEmpty(tensile.get(56)) && !"null".equals(tensile.get(56)))
					{
						wireway = tensile.get(56);
					}
					else if(!ToolsUtil.isEmpty(tensile.get(59)) && !"null".equals(tensile.get(59)))
					{
						wireway = tensile.get(59);
					}
					else if(!ToolsUtil.isEmpty(tensile.get(62)) && !"null".equals(tensile.get(62)))
					{
						wireway = tensile.get(62);
					}
					else if(!ToolsUtil.isEmpty(tensile.get(65)) && !"null".equals(tensile.get(65)))
					{
						wireway = tensile.get(65);
					}
					else if(!ToolsUtil.isEmpty(tensile.get(68)) && !"null".equals(tensile.get(68)))
					{
						wireway = tensile.get(68);
					}
					else if(!ToolsUtil.isEmpty(tensile.get(71)) && !"null".equals(tensile.get(71)))
					{
						wireway = tensile.get(71);
					}
					else if(!ToolsUtil.isEmpty(tensile.get(74)) && !"null".equals(tensile.get(74)))
					{
						wireway = tensile.get(74);
					}
					else if(!ToolsUtil.isEmpty(tensile.get(77)) && !"null".equals(tensile.get(77)))
					{
						wireway = tensile.get(77);
					}
					
//					else if(!ToolsUtil.isEmpty(tensile.get(17)))
//					{
//						wireway = tensile.get(17);
//					}
					
					
					if(!ToolsUtil.isEmpty(tensile.get(80))&& !"null".equals(tensile.get(80)))
					{
						groundWire = tensile.get(80);
					}else if(!ToolsUtil.isEmpty(tensile.get(82))&& !"null".equals(tensile.get(82)))
					{
						groundWire = tensile.get(82);
					}else if(!ToolsUtil.isEmpty(tensile.get(84))&& !"null".equals(tensile.get(84)))
					{
						groundWire = tensile.get(84);
					}else if(!ToolsUtil.isEmpty(tensile.get(86))&& !"null".equals(tensile.get(86)))
					{
						groundWire = tensile.get(86);
					}
					else if(!ToolsUtil.isEmpty(tensile.get(88))&& !"null".equals(tensile.get(88)))
					{
						groundWire = tensile.get(88);
					}
					else if(!ToolsUtil.isEmpty(tensile.get(90))&& !"null".equals(tensile.get(90)))
					{
						groundWire = tensile.get(90);
					}
					else if(!ToolsUtil.isEmpty(tensile.get(92))&& !"null".equals(tensile.get(92)))
					{
						groundWire = tensile.get(92);
					}
					else if(!ToolsUtil.isEmpty(tensile.get(94))&& !"null".equals(tensile.get(94)))
					{
						groundWire = tensile.get(94);
					}
					else if(!ToolsUtil.isEmpty(tensile.get(96))&& !"null".equals(tensile.get(96)))
					{
						groundWire = tensile.get(96);
					}
					else if(!ToolsUtil.isEmpty(tensile.get(98))&& !"null".equals(tensile.get(98)))
					{
						groundWire = tensile.get(98);
					}
					else if(!ToolsUtil.isEmpty(tensile.get(100))&& !"null".equals(tensile.get(100)))
					{
						groundWire = tensile.get(100);
					}
					else if(!ToolsUtil.isEmpty(tensile.get(102))&& !"null".equals(tensile.get(102)))
					{
						groundWire = tensile.get(102);
					}
					rowMap.put("wireway", wireway);
					rowMap.put("groundWire", groundWire);
					rowMap.put("shelvesType", tensile.get(0));
					rowMap.put("shelvesDistance", listD.get(2));
					
					//连续档的判断
					if((Integer.parseInt(str1) - Integer.parseInt(str))>1) {
						
						wirewayContinuity.add(rowMap);//连续档 导线
//						groundWireContinuity.add(rowMap);//
					}else {
						wirewayIsolated.add(rowMap);//孤立档  导线
//						groundWireIsolated.add(rowMap);//
					}
					
					
					
					temlen+=1;
			}
		}
		map.put("wirewayContinuity", wirewayContinuity);
//		map.put("groundWireContinuity", groundWireContinuity);
		map.put("wirewayIsolated", wirewayIsolated);
//		map.put("groundWireIsolated", groundWireIsolated);
		return map;
	}
	
	@Override
	public Map<String, Object> getDrawingNum(List<Map<String, Object>> ground_WireList, List<Map<String, Object>> wirewayList) {

		Map<String, Object> mapResult = new HashMap<String, Object>();
		Object  obj = null;
		StringBuilder builder = new StringBuilder();
		List<Object> list = new ArrayList<Object>();
		List<String> listGround_Wire_Mechanical_Properties =  new ArrayList<String>();//地线线力学特性表
		List<String> listGround_Wire_op =  new ArrayList<String>();//地线架线曲线表
		
		List<String> listwireway_Mechanical_Properties =  new ArrayList<String>();//导线线力学特性表
		List<String> listwireway_Wire_op=  new ArrayList<String>();//导线架线曲线表
		
		String sqlpre =" select pictureNumber  from wd_standard_series WHERE 1 = 1 ";
		//地线
		for(Map<String, Object> mapgw : ground_WireList) {
			 builder = new StringBuilder();
			 builder.append(sqlpre);
			 list = new ArrayList<Object>();
			//地线型号
			if(!ToolsUtil.isEmpty(obj = mapgw.get("groundWire_conductor_type")))
			{
				builder.append(" and  wireType = ?");
				list.add(obj.toString());
//				list.add("JLB40-100");
			}
			
			///气象条件
			if(!ToolsUtil.isEmpty(obj = mapgw.get("weather_condition")))
			{
				builder.append(" and  weatherCondition = ?");
				list.add(obj.toString());
			}
			///配合导线
			if(!ToolsUtil.isEmpty(obj = mapgw.get("contact_conductor")))
			{
				builder.append(" and  contactConductor = ?");
				list.add(obj.toString());
			}
			
			///配合导线安全系数
			if(!ToolsUtil.isEmpty(obj = mapgw.get("contact_safety_factor")))
			{
				String contact_safety_factor  = "k="+obj.toString() ;
				builder.append(" and  contactrSafetyFactor = ?");
				list.add(contact_safety_factor.toString());
			}
			
			///导地线间距
			if(!ToolsUtil.isEmpty(obj = mapgw.get("contact_distance")))
			{
				builder.append(" and  contactDistance = ?");
				list.add(obj.toString());
			}
			List<Map<String, Object>> listResult  = baseDao.getJdbcTemplateDAO().queryForList(builder.toString(), list.toArray());
			if(!ToolsUtil.isEmpty(listResult) && listResult.size() >0) {
				Map<String, Object> map = listResult.get(0);
				String temp = String.valueOf(map.get("pictureNumber"));
				
				listGround_Wire_Mechanical_Properties.add(map.get("pictureNumber").toString());
				String last = String.format("%03d", (Integer.parseInt(temp.substring(15, temp.length()))+1) );
				listGround_Wire_op.add(temp.substring(0, 15)+last);
			}else
			{
				listGround_Wire_Mechanical_Properties.add("未标准化");
				listGround_Wire_op.add("未标准化");
			}
//			System.out.println(listResult.size());
		}
		mapResult.put("ground_Wire_Mechanical_Properties", listGround_Wire_Mechanical_Properties);
		mapResult.put("ground_Wire_op", listGround_Wire_op);
		
		
		
		//导线
		for(Map<String, Object> mapgw : wirewayList) {
			 builder = new StringBuilder();
			 list = new ArrayList<Object>();
			 builder.append(sqlpre);
			//导线型号
			if(!ToolsUtil.isEmpty(obj = mapgw.get("wireway_conductor_type")))
			{
				builder.append(" and  wireType = ?");
				list.add(obj.toString());
//						list.add("JLB40-100");
			}
			
			///气象条件
			if(!ToolsUtil.isEmpty(obj = mapgw.get("weather_condition")))
			{
				builder.append(" and  weatherCondition = ?");
				list.add(obj.toString());
			}
			///安全系数
			if(!ToolsUtil.isEmpty(obj = mapgw.get("safety_factor")))
			{
				builder.append(" and  safetyFactor = ?");
				list.add(obj.toString());
			}
			
			List<Map<String, Object>> listResult  = baseDao.getJdbcTemplateDAO().queryForList(builder.toString(), list.toArray());
			if(!ToolsUtil.isEmpty(listResult) && listResult.size() >0) {
				Map<String, Object> map = listResult.get(0);
				String temp = String.valueOf(map.get("pictureNumber"));
				
				listwireway_Mechanical_Properties.add(map.get("pictureNumber").toString());
				String last = String.format("%03d", (Integer.parseInt(temp.substring(15, temp.length()))+1) );
				listwireway_Wire_op.add(temp.substring(0, 15)+last);
			}else
			{
				listwireway_Mechanical_Properties.add("未标准化");
				listwireway_Wire_op.add("未标准化");
		
			}
		}
		mapResult.put("wireway_Mechanical_Properties", listwireway_Mechanical_Properties);
		mapResult.put("wireway_Wire_op", listwireway_Wire_op);
		return mapResult;
	}
	
}
