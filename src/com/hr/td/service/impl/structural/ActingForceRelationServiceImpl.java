package com.hr.td.service.impl.structural;

import java.io.IOException;
import java.io.InputStream;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.hr.td.dao.IBaseDao;
import com.hr.td.entity.ActingForceRelation;
import com.hr.td.entity.StructuralParamter;
import com.hr.td.service.structural.IActingForceRealtionService;
import com.hr.td.util.Page;
import com.hr.td.util.ToolsUtil;
import com.nari.slsd.hd.param.Param;
import com.nari.slsd.hd.util.CommonTool;

@Service
public class ActingForceRelationServiceImpl implements IActingForceRealtionService {

	@Autowired
	private IBaseDao baseDao;

	@Override
	public int getRelationCount(Map<String, Object> map) {
		Map<String, Object> param = getQuerySql(map);
		Object[] obj = (Object[]) param.get("list");
		String sql = param.get("sql").toString();
		int count = baseDao.getCountBySql(sql, obj);
		return count;
	}

	@Override
	public List<Map<String, Object>> getRelationPage(Map<String, Object> map) {
		int pageSize = CommonTool
				.ConvertToInt((ToolsUtil.isEmpty(map.get("pageSize")) ? 10 : map.get("pageSize")).toString());
		int startIndex = CommonTool
				.ConvertToInt((ToolsUtil.isEmpty(map.get("startIndex")) ? 0 : map.get("startIndex")).toString());
		Map<String, Object> param = getQuerySql(map);
		String sql = param.get("sql").toString();
		Object[] obj = (Object[]) param.get("list");
		int count = getRelationCount(map);

		Page page = baseDao.getPageBySql(count, sql, pageSize, startIndex, obj);
		List<Map<String, Object>> relationList = new ArrayList<Map<String, Object>>();
		if (!ToolsUtil.isEmpty(page)) {
			List plist = page.getItems();
			Map<String, Object> newMap = null;
			int numNo = 1;
			for (int i = 0; i < plist.size(); i++) {
				Object[] objData = (Object[]) plist.get(i);
				newMap = new HashMap<String, Object>();
				newMap.put("numNo", numNo); // 序号
				newMap.put("id", objData[0]);
				newMap.put("towerName", objData[1]);
				newMap.put("huHeight", objData[2]);
				newMap.put("towerType", objData[3]);
				newMap.put("fullHeight", objData[4]);
				newMap.put("Nmax", objData[5]);
				newMap.put("Nx", objData[6]);
				newMap.put("Ny", objData[7]);
				newMap.put("Tmax", objData[8]);
				newMap.put("Tx", objData[9]);
				newMap.put("Ty", objData[10]);
				numNo++;
				relationList.add(newMap);
			}
		}
		return relationList;
	}

	/**
	 * 条件查询杆塔作用力关系
	 * 
	 * @param map
	 * @return List<Map<String, Object>>
	 */
	@Override
	public List<Map<String, Object>> getRealtionList(Map<String, Object> map) {
		Map<String, Object> param = getQuerySql(map);
		String sql = param.get("sql").toString();
		Object[] obj = (Object[]) param.get("list");
		List<Map<String, Object>> relationList = baseDao.getJdbcTemplateDAO().queryForList(sql, obj);
		return relationList;
	}

	public Map<String, Object> getQuerySql(Map<String, Object> map) {
		Map<String, Object> param = new HashMap<String, Object>();

		StringBuilder builder = new StringBuilder();
		List<Object> list = new ArrayList<Object>();

		builder.append(" select a.id,a.towerName,a.huHeight,a.towerType,a.fullHeight,a.Nmax,a.Nx,a.Ny,a.Tmax,a.Tx,a.Ty ");
		builder.append(" from  ActingForceRelation  a ");
		builder.append(" where 1=1 ");
		Object obj = null;
		if (!ToolsUtil.isEmpty(obj = map.get("towerType"))) {// 杆塔类型
			builder.append(" and  a.towerType like ?");
			list.add("%"+obj.toString()+"%");
		}

		builder.append(" order by a.towerType  ");

		param.put("sql", builder.toString());
		param.put("list", list.toArray());
		return param;
	}

	/**
	 * 批量添加
	 * 
	 * @param list
	 * @return
	 */
	@Override
	public int addRelationAll(List<ActingForceRelation> list) {

		return baseDao.batchExcute(list, Param.OpType.OP_INSERT);
	}

	/**
	 * 添加杆塔作用力关系
	 * 
	 * @param map
	 * @return
	 */
	@Override
	public boolean addRelation(Map<String, String> map) {
		ActingForceRelation relation = returnRelation(map);
		String id = (String) baseDao.save(relation);
		if (!ToolsUtil.isEmpty(id)) {
			return true;
		}
		return false;
	}

	/**
	 * 修改杆塔作用力关系
	 * 
	 * @param map
	 * @return
	 */
	@Override
	public boolean updateRelation(Map<String, String> map) {
		if (!ToolsUtil.isEmpty(map.get("id"))) {
			ActingForceRelation relation = returnRelation(map);
			baseDao.update(relation);
			return true;
		}

		return false;
	}

	public ActingForceRelation returnRelation(Map<String, String> map) {
		ActingForceRelation relation = null;
		if (ToolsUtil.isEmpty(map.get("id"))) {
			relation = new ActingForceRelation();
			relation.setId(CommonTool.createUUID());
		} else {
			relation = getrelationEntity(map.get("id"));
		}
		relation.setTowerName(map.get("towerName"));
		relation.setTowerType(map.get("towerType"));
		relation.setFullHeight(map.get("fullHeight"));
		relation.setHuHeight(map.get("huHeight"));
		relation.setNmax(map.get("Nmax"));
		relation.setNx(map.get("Nx"));
		relation.setNy(map.get("Ny"));
		relation.setTmax(map.get("Tmax"));
		relation.setTx(map.get("Tx"));
		relation.setTy(map.get("Ty"));

		return relation;
	}

	public ActingForceRelation getrelationEntity(String id) {
		ActingForceRelation relation = (ActingForceRelation) baseDao.getEntity(ActingForceRelation.class, id);
		return relation;
	}

	/**
	 * 删除杆塔作用力关系
	 * 
	 * @param map
	 * @return
	 */
	@Override
	public int deleteRelation(String id) {
		String sql = "DELETE FROM ActingForceRelation WHERE id = ? ";

		return baseDao.executeBySQL(sql, new Object[] { id });
	}
	
	/**
	 * 导入excel
	 */
	@Override
	public List<Map<String, Object>> importExcel(String fileName, MultipartFile file) {
		
		List<Map<String, Object>> paramList = new ArrayList<Map<String, Object>>();

		InputStream inputStream = null;
		try {
			// 验证文件名是否合格
			if (!validateExcel(fileName)) {
				return null;
			}
			// 根据文件名判断文件是2003版本还是2007版本
			boolean isExcel2003 = true;
			if (ToolsUtil.isExcel2007(fileName)) {
				isExcel2003 = false;
			}
			inputStream = file.getInputStream();

			// 根据excel里面的内容读取客户信息
     		paramList = getExcelInfo(inputStream, isExcel2003);
			inputStream.close();
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (inputStream != null) {
				try {
					inputStream.close();
				} catch (IOException e) {
					inputStream = null;
					e.printStackTrace();
				}
			}
		}
		return paramList;
	}
	
	/**
	 * 获取excel表格的具体内容
	 * 
	 * @param inputStream
	 * @param isExcel2003
	 * @return
	 */
	public List<Map<String, Object>> getExcelInfo(InputStream inputStream, boolean isExcel2003) {
		List<Map<String, Object>> paramList = new ArrayList<Map<String, Object>>();

		// 根据Excel版本选择创建Workbook的方式
		Workbook wb0 = null;

		try {		
			if (isExcel2003) {// 当excel是2003时
				wb0 = new HSSFWorkbook(inputStream);
			} 
			else {// 当excel是2007时
				wb0 = new XSSFWorkbook(inputStream);
			}
            
				//获取Excel文档中的第一个表单
	            Sheet sht0 = wb0.getSheetAt(0);
	            String sheetName=sht0.getSheetName();
	            // 建立一个map用来装错误信息数据
	         	Map<String, Object> errorMap = new HashMap<String, Object>();
	         	
	            // 建立一个list<map>用来装所有行的数据
	         	List<Map<String, String>> relationList = new ArrayList<Map<String, String>>();
	         	
	         	//获得表头行总列数
				int coloumNum=sht0.getRow(0).getPhysicalNumberOfCells();
				
				int cellNum=0;
				
							
							
	            // 对sheet中的每一行进行迭代
	            for (Row r : sht0) {
	            	
	            	 //如果当前行的行号（从0开始）未达到2（第三行）则从新循环
	                if(r.getRowNum()<2){
	                    continue;
	                }
	                
	             // 定义一个字符串来放错误信息
				 String errorMessage = "";
				 boolean isError=false;//默认没有错误
				 cellNum=r.getPhysicalNumberOfCells();//每一行的单元格数
				 
				//如果该行的单元格数不超过表头字段数量,则继续执行
				if(cellNum<=coloumNum){
					if (!ToolsUtil.isEmpty(r.getCell(0))) {
						boolean error=true;
						/*****************第一列*************************************/					
						Cell towerName= r.getCell(0);//杆塔名称
						String huHeight= Integer.parseInt(r.getCell(1).toString())+"";//呼高
						String towerType= r.getCell(0).toString()+"-"+Integer.parseInt(r.getCell(1).toString());//杆塔类型
						String fullHeight= getValue(r.getCell(3));//全高
						String Nmax= getValue(r.getCell(4));
						String Nx= getValue(r.getCell(5));
						String Ny= getValue(r.getCell(6));
						String Tmax= getValue(r.getCell(7));
						String Tx= getValue(r.getCell(8));
						String Ty= getValue(r.getCell(9));
						
						if (!ToolsUtil.isEmpty(errorMessage)) {
							errorList.add(errorMessage);
							totalErrormessage += errorMessage;
							isError = true;
						}

						if (!isError) {
							// 新建map，把从excel中取出的值依次保存起来
							Map<String, String>  newMap = new HashMap<String, String>();							
							newMap.put("towerName", towerName.toString());
							newMap.put("huHeight", huHeight);
							newMap.put("towerType", towerType);
							newMap.put("fullHeight", fullHeight);
							newMap.put("Nmax", Nmax);
							newMap.put("Nx",Nx);
							newMap.put("Ny",Ny);
							newMap.put("Tmax",Tmax);
							newMap.put("Tx", Tx);
							newMap.put("Ty", Ty);
							
							// 将实体类放入list
							relationList.add(newMap);
						}
					}
				}
				else{
					errorMessage += sheetName+ "中第" + (r.getRowNum() + 1) + "行" + "出错，每行插入单元格数不能超过表头字段数！" + "</br>";
					totalErrormessage += errorMessage;
					errorList.add(errorMessage);
				}		
				
	            }
	            
	        	// 每一行出错的话，就把错误信息放到map中
	        	errorMap.put("errorMessage", totalErrormessage);
				errorMap.put("errorMessageList", errorList);
				
				if (!ToolsUtil.isEmpty(relationList)) {				
					//如果每一行都没有出错,将所有信息保存新增
					int totalInsert = 0;
					int errorInsert = 0;
					boolean isInsert=false;
					// 如果没有出错，则把所有行数据，插入数据库
					for (Map<String, String> map : relationList) {
						isInsert=this.addRelation(map);
						if(isInsert){
							totalInsert++;
						}else{
							errorInsert++;
						}
					}
					if(errorInsert<1){//存入数据库没有问题
						errorMap.put("total", totalInsert);
					}else{
						errorMap.put("errorDataMessage", "导入的数据存在问题");
					}
				}
				
				paramList.add(errorMap);
		

			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return paramList;
	}
	
	private String totalErrormessage;
	private List<Object> errorList= new ArrayList<Object>(); 
	private boolean errorFlag = false;

	/**
	* @Title: validateExcel  
	* @Description: 验证EXCEL文件
	* @param filePath
	* @return
	 */
	public boolean validateExcel(String filePath) {
		if (filePath == null || !(ToolsUtil.isExcel2003(filePath) || ToolsUtil.isExcel2007(filePath))) {
			totalErrormessage = "文件名不是excel格式";
			errorList.add(totalErrormessage);
			return false;
		}
		return true;
	}
	
	public String  getValue(Cell cell){
		String cellValue = ""; 
		if(!ToolsUtil.isEmpty(cell)){
			cellValue=getCellValue(cell);
		}
		return cellValue;
	}
	
	private SimpleDateFormat sdf= new SimpleDateFormat("yyyy-MM-dd");
	
	/**
	* @Title: getCellValue  
	* @Description: 单元格内容类型判断并取值
	* @param cell
	* @return
	 */
	private String getCellValue(Cell cell) {
		  String cellValue = "";  
	        switch (cell.getCellType()) {  
	        case Cell.CELL_TYPE_STRING:  // 字符串
	            cellValue = cell.getRichStringCellValue().getString().trim();  
	            break;  
	        case Cell.CELL_TYPE_NUMERIC:  // 数字
	          //如果为时间格式的内容
	            if (HSSFDateUtil.isCellDateFormatted(cell)) {      
	               //注：format格式 yyyy-MM-dd hh:mm:ss 中小时为12小时制，若要24小时制，则把小h变为H即可，yyyy-MM-dd HH:mm:ss
	               cellValue=sdf.format(HSSFDateUtil.getJavaDate(cell. getNumericCellValue())).toString();                                 
	                 break;
	             } else {
	            	 cellValue = cell.toString();
	             }
	            break;  
	        case Cell.CELL_TYPE_BOOLEAN:  // Boolean
	            cellValue = String.valueOf(cell.getBooleanCellValue()).trim();  
	            break;  
	        case Cell.CELL_TYPE_FORMULA:  // 公式
	            cellValue = cell.getCellFormula();  
	            break; 
	        case Cell.CELL_TYPE_BLANK: // 空值
	        	cellValue = "";
	            break;
	        case Cell.CELL_TYPE_ERROR: // 故障
	        	cellValue = "非法字符";
	            break;
	        default:
	        	cellValue = "未知类型";
	            break;
	        }  
	        return cellValue;  
	}
	

}
