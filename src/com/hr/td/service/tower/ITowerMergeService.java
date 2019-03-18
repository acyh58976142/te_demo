package com.hr.td.service.tower;

import java.util.List;
import java.util.Map;

import com.hr.td.entity.TowerMerge;
import com.hr.td.entity.TowerScreen;

/**
 * 筛选和归并的杆塔接口
 * @author yw
 *
 */
public interface ITowerMergeService {
    /**
     * 查询筛选的数据
     * @param map
     * @return
     */
	public List<TowerScreen> getTowerScreen(Map<String, String> map);
	
	/**
	 * 查询归并的数据
	 * @param map
	 * @return
	 */
	public List<TowerMerge> getTowerMerge(Map<String, String> map);
	
	/**
	 * 添加筛选的数据
	 * @param map
	 * @return
	 */
	public boolean addTowerScreen(Map<String, String> map);
	
	/**
	 * 修改筛选的数据
	 * @param map
	 * @return
	 */
	public boolean updateTowerScreen(Map<String, String> map);
	
	/**
	 * 添加归并的数据
	 * @param map
	 * @return
	 */
	public boolean addTowerMerge(Map<String, String> map);
	
	/**
	 * 删除归并的数据
	 * @param map
	 * @return
	 */
	public boolean deleteTowerMerge(Map<String, String> map);
}
