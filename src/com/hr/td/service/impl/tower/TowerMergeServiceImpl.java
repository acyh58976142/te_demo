package com.hr.td.service.impl.tower;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hr.td.dao.IBaseDao;
import com.hr.td.entity.TowerMerge;
import com.hr.td.entity.TowerScreen;
import com.hr.td.service.tower.ITowerMergeService;
import com.hr.td.util.ToolsUtil;
import com.nari.slsd.hd.util.CommonTool;

@Service
public class TowerMergeServiceImpl implements ITowerMergeService{
	
	@Autowired
	private IBaseDao baseDao;

	/**
	 * 查询筛选后的杆塔信息
	 */
	@Override
	public List<TowerScreen> getTowerScreen(Map<String, String> map) {
		StringBuilder  builder=new StringBuilder();
		builder.append(" from TowerScreen where 1=1 ");
		String str="";
		List<String> list=new ArrayList<String>();
		if(!ToolsUtil.isEmpty(str=map.get("id"))){//主键id
			builder.append(" and id=? ");
			list.add(str);
		}
		if(!ToolsUtil.isEmpty(str=map.get("projectId"))){//工程projectId
			builder.append(" and projectId=? ");
			list.add(str);
		}
		List<TowerScreen> towerList=baseDao.find(builder.toString(), list.toArray());
		return towerList;
	}

	/**
	 * 查询归并后的杆塔信息
	 */
	@Override
	public List<TowerMerge> getTowerMerge(Map<String, String> map) {
		StringBuilder  builder=new StringBuilder();
		builder.append(" from TowerMerge where 1=1 ");
		String str="";
		List<String> list=new ArrayList<String>();
		if(!ToolsUtil.isEmpty(str=map.get("id"))){//主键id
			builder.append(" and id=? ");
			list.add(str);
		}
		if(!ToolsUtil.isEmpty(str=map.get("projectId"))){//工程projectId
			builder.append(" and projectId=? ");
			list.add(str);
		}
		List<TowerMerge> mergeList=baseDao.find(builder.toString(), list.toArray());
		
		return mergeList;
	}

	/**
	 * 添加筛选的杆塔信息
	 */
	@Override
	public boolean addTowerScreen(Map<String, String> map) {
		TowerScreen screen=new TowerScreen();
		screen.setId(CommonTool.createUUID());
		screen.setScreenData(map.get("screenData"));
		screen.setProjectId(map.get("projectId"));
		String id=(String) baseDao.save(screen);
		if(!ToolsUtil.isEmpty(id)){
			return true;
		}
		return false;
	}
    
	/**
	 * 修改筛选的信息
	 */
	@Override
	public boolean updateTowerScreen(Map<String, String> map) {
		List<TowerScreen> towerScreenList=getTowerScreen(map);
		if(!ToolsUtil.isEmpty(towerScreenList)){
			TowerScreen screen=towerScreenList.get(0);
			screen.setScreenData(map.get("screenData"));
			baseDao.update(screen);
			//删除原先归并的数据
			deleteTowerMerge(map);
			return true;
		}
		else{
			return addTowerScreen(map);
		}
	}

	/**
	 * 添加归并的杆塔信息
	 */
	@Override
	public boolean addTowerMerge(Map<String, String> map) {
		TowerMerge merge=new TowerMerge();
		merge.setId(CommonTool.createUUID());
		merge.setMergeData(map.get("mergeData"));
		merge.setTowerData(map.get("towerData"));
		merge.setProjectId(map.get("projectId"));
		String id=(String) baseDao.save(merge);
		if(!ToolsUtil.isEmpty(id)){
			return true;
		}
		return false;
	}

	/**
	 * 删除归并信息
	 */
	@Override
	public boolean deleteTowerMerge(Map<String, String> map) {
		String projectId=map.get("projectId");
		StringBuilder builder=new StringBuilder();
		List<String> list2=new ArrayList<>();
		if(ToolsUtil.isEmpty(projectId)){//根据主键删除
			String id=map.get("mergeId");
			List<String> list=(List<String>) ToolsUtil.strToJson(id, List.class);
			builder.append(" delete  from  tower_merge where id in (");
			for(int i=0;i<list.size();i++){
				builder.append("?");
				list2.add(list.get(i));
				if(i<list.size()-1){
					builder.append(",");
				}
			}
			builder.append(")");
			
		}
		else{//根据工程id删除信息
			builder.append(" delete from  tower_merge where projectId=?");
			list2.add(projectId);
		}
		int index=baseDao.executeBySQLNew(builder.toString(), list2.toArray());
		if(index>0){
			return true;
		}
		return false;
	}

}
