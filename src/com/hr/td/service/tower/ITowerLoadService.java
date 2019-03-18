package com.hr.td.service.tower;

import java.util.List;
import java.util.Map;

/**
 * 杆塔荷载接口
 * @author yw
 *
 */
public interface ITowerLoadService {
	
	//查询导地线参数
	public List<Map<String, Object>> getGroundGuideParam(Map<String, String> param);

}
