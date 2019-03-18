package com.hr.td.service.material;

import java.util.List;
import java.util.Map;

import com.hr.td.util.Page;

public interface IMaterialService {
	
	/**
     * 初始化工程列表并分页
     */
	 //查询总记录数
	 public int findMainInfoListCount();
	 //根据map里的条件查询工程信息，将列表展示需要的字段信息存进Page
	 public Page findMainInfoList(Map<String, Object> map,int totalCount);
     
	 /**
	  *   根据工程id，查询出routeInfo表 conductorAllParam,groundAllParam信息
	  */
	 //public List<List<String>> findCAPAndGAPByProjectId(String projectId);
}
