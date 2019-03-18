package com.hr.td.service.electricPower;

import java.util.List;
import java.util.Map;

import com.hr.td.entity.Attachment;
import com.hr.td.entity.RouteInfo;

public interface IWiringingDrawingService {
	public List<Map<String, Object>> groundWireParam(String param);

	public Map<String, Object> getEntryCondition();

	public boolean updateMechanicsProperty(Map<String, String> baseParam, Map<String, String> wirewayParam, List<Map<String, String>> weatherConditions, Map<String, Object> result);

	public List<Map<String, Object>> getStandardSeriesByParam(Map<String, Object> param);
	/**
	 * 获取连续档或独立档的到地线参数
	 * @param route route文件
	 * @param route route文件
	 * @param rootPath 跟目录
	 * @param type 1连续档 2独立档
	 * @return
	 */
	public Map<String, Object>  getWireType(List<Attachment> attachments,RouteInfo route ,String rootPath,int type);
	
	public Map<String, Object>  getDrawingNum(List<Map<String, Object>> ground_WireList ,List<Map<String, Object>> wirewayList );
}
