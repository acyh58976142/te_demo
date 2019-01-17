package com.hr.td.service.impl.tower;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hr.td.dao.IBaseDao;
import com.hr.td.service.tower.ITowerLoadService;
import com.hr.td.util.ToolsUtil;

/**
 * 杆塔荷载实现类
 * @author yw
 *
 */
@Service
public class TowerLoadServiceImpl implements ITowerLoadService{
	
	@Autowired
	private IBaseDao baseDao;
    
	/**
	 * 查询导地线参数
	 */
	@Override
	public List<Map<String, Object>> getGroundGuideParam() {
		StringBuilder builder=new StringBuilder();
		builder.append(" select ground_id,conductor_type,cross_section_area,diameter,breaking_force,unit_weight,modulus_elasticity,tem_exp_coefficient ");
		builder.append(" from ground_guide_param where 1=1 ");
		List list=baseDao.getHibernateDAO().queryByNativeSql(builder.toString(), null);
		List<Map<String, Object>> paramList=new ArrayList<Map<String, Object>>();
		if(!ToolsUtil.isEmpty(list)){
			for(int i=0;i<list.size();i++){
				Object[] obj=(Object[]) list.get(i);
				Map<String, Object> map=new HashMap<String, Object>();
				map.put("ground_id",obj[0]);	        //主键
				map.put("conductor_type", obj[1]);      //导地线型号
				map.put("cross_section_area",obj[2]);  //截面积
				map.put("diameter", obj[3]);            //直径
				map.put("breaking_force", obj[4]);      //拉断力
				map.put("unit_weight", obj[5]);         //单位重量
				map.put("modulus_elasticity",obj[6]);  //弹性模量
				map.put("tem_exp_coefficient",obj[7]); //温度膨胀系数
				paramList.add(map);
			}
		}
		return paramList;
	}

}
