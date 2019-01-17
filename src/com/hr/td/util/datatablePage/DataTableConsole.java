package com.hr.td.util.datatablePage;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.nari.slsd.hd.dto.Page;

/**
 * datatables 主控台
 * @author YUXIN LI
 * @date 2014-12-30
 */
public class DataTableConsole {

	private List<?> data;


	protected String error;


	private int draw;


	private int recordsTotal;


	private int recordsFiltered;


	private int recordsDisplay;
	
	public int getDraw() {
		return draw;
	}

	public void setDraw(int draw) {
		this.draw = draw;
	}

	public int getRecordsTotal() {
		return recordsTotal;
	}

	public void setRecordsTotal(int recordsTotal) {
		this.recordsTotal = recordsTotal;
	}

	public int getRecordsFiltered() {
		return recordsFiltered;
	}

	public void setRecordsFiltered(int recordsFiltered) {
		this.recordsFiltered = recordsFiltered;
	}
	
	public List<?> getData() {
		return data;
	}

	public void setData(List<?> data) {
		this.data = data;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}
	
	public int getRecordsDisplay() {
		return recordsDisplay;  
	}  
		  
	public void setRecordsDisplay(int recordsDisplay) {
		this.recordsDisplay = recordsDisplay;  
	}
	
	
	public Map<String, Object> toParamMap(DataTableRequest request)
	{
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("pageSize", request.getLength());
		map.put("startIndex", request.getStart());
		map.put("orderColumn", request.getOrderColumn());
		map.put("orderAsc", request.isOrderAsc());
		
		return map;
	}

	
	public Map<String, Object> toReturnMap(Page page)
	{
		Map<String, Object> res = new HashMap<String, Object>();
		if (null != page)
		{
			res.put("draw", this.getDraw());
			res.put("data", page.getItems());
			res.put("recordsTotal", page.getTotalCount());
			res.put("recordsFiltered", page.getTotalCount());
			res.put("recordsDisplay",  page.getItems().size());
		}
		return res;
	}
	
}


