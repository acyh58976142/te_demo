/**
 * 分页包装类
 */
package com.hr.td.util;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.hr.td.util.datatablePage.DataTableRequest;

/**
 * 
 * ClassName: DataTablePage 
 * Function: TODO ADD FUNCTION. 
 * Reason: TODO ADD REASON(可选). 
 * date: 2017年4月11日 下午4:21:51 
 *
 * @author 黄晓晖
 * @version 
 * @since 1.0.0
 */
public class DataTablePage {

    private int length;

    private String draw;

    private int start;

    private int iTotalRecords;

    private List<?> aaData;

    public int getLength() {
        return length;
    }

    public void setLength(int length) {
        this.length = length;
    }

    public String getDraw() {
        return draw;
    }

    public void setDraw(String draw) {
        this.draw = draw;
    }

    public int getStart() {
        return start;
    }

    public void setStart(int start) {
        this.start = start;
    }

    public int getiTotalRecords() {
        return iTotalRecords;
    }

    public void setiTotalRecords(int iTotalRecords) {
        this.iTotalRecords = iTotalRecords;
    }

    public List<?> getAaData() {
        return aaData;
    }

    public void setAaData(List<?> aaData) {
        this.aaData = aaData;
    }

    public Map<String, Object> toParamMap() {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("pageSize", this.getLength());
        map.put("startIndex", this.getStart());
        return map;
    }

    public Map<String, Object> toReturnMap(com.nari.slsd.hd.dto.Page p) {
        Map<String, Object> res = new HashMap<String, Object>();
        if (null != p) {
            res.put("aaData", p.getItems());
            res.put("draw", this.getDraw());
            res.put("iTotalRecords", p.getTotalCount());
            res.put("iTotalDisplayRecords", p.getTotalCount());
        }
        return res;
    }
    
    public Map<String, Object> toReturnMap(List<?> list) {
        Map<String, Object> res = new HashMap<String, Object>();
        if (null != list) {
            res.put("aaData", list);
            res.put("draw", this.getDraw());
            res.put("iTotalRecords",list.size());
            res.put("iTotalDisplayRecords",list.size());
        }
        return res;
    }

    @Override
    public String toString() {
        StringBuffer str = new StringBuffer("DataTablePage [iDisplayLength=" + this.getLength())
                .append(", sEcho=" + this.getDraw())
                .append(", iDisplayStart=" + this.getStart())
                .append(", iTotalRecords=" + this.getiTotalRecords())
                .append(", aaData=" + this.getAaData() + "]");
        return str.toString();
    }
    
    public Map<String, Object> toReturnMap(List<?> list,int total) {
        Map<String, Object> res = new HashMap<String, Object>();
        if (null != list) {
            res.put("aaData", list);
            res.put("draw", this.getDraw());
            res.put("iTotalRecords",total);
            res.put("iTotalDisplayRecords",total);
        }
        return res;
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
}
