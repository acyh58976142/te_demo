package com.hr.td.service.impl.electricPower;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hr.td.dao.IBaseDao;
import com.hr.td.entity.HorizontalTension;
import com.hr.td.entity.MeterSag100;
import com.hr.td.entity.Sag;
import com.hr.td.service.electricPower.IMechanicsPropertyService;
import com.hr.td.util.ToolsUtil;

@Service
public class MechanicsPropertyServiceImpl implements IMechanicsPropertyService{
	
	@Autowired
	private IBaseDao baseDao;
	@Override
	public List<Map<String, Object>> groundWireParam() {
		List<Object> list = new ArrayList<Object>();
		StringBuilder builder = new StringBuilder();
		builder.append(" SELECT * FROM ahdc.ground_guide_param ");
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
	
}
