package com.hr.td.service.electricPower;

import java.util.List;
import java.util.Map;

public interface IMechanicsPropertyService {
	public List<Map<String, Object>> groundWireParam();

	public Map<String, Object> getEntryCondition();

	public boolean updateMechanicsProperty(Map<String, String> baseParam, Map<String, String> wirewayParam, List<Map<String, String>> weatherConditions, Map<String, Object> result);
}
