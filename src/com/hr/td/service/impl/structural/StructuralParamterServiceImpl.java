package com.hr.td.service.impl.structural;

import java.io.IOException;
import java.io.InputStream;
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
import com.hr.td.entity.StructuralParamter;
import com.hr.td.service.structural.IStructuralParamterService;
import com.hr.td.util.Page;
import com.hr.td.util.ToolsUtil;
import com.nari.slsd.hd.param.Param;
import com.nari.slsd.hd.util.CommonTool;

@Service
public class StructuralParamterServiceImpl implements IStructuralParamterService {
	
	@Autowired
	private IBaseDao baseDao;
	
	@Override
	public int getParamCount(Map<String, Object> map) {
		Map<String, Object> param=getQuerySql(map);
		Object[] obj=(Object[]) param.get("list");
		String sql=param.get("sql").toString();
		int count=baseDao.getCountBySql(sql, obj);
		return count;
	}

	 /**
	  * 分页查询结构基础参数信息
	  * @param map
	  * @return
	  */
	@Override
	public List<Map<String, Object>> getParamterPage(Map<String, Object> map) {
		int pageSize = CommonTool.ConvertToInt((ToolsUtil.isEmpty(map.get("pageSize"))?10:map.get("pageSize")).toString());
		int startIndex =CommonTool.ConvertToInt((ToolsUtil.isEmpty(map.get("startIndex"))?0:map.get("startIndex")).toString());
		Map<String, Object> param=getQuerySql(map);
		String sql=param.get("sql").toString();
		Object[] obj=(Object[]) param.get("list");
		int count=getParamCount(map);
	
		Page page =baseDao.getPageBySql(count, sql, pageSize, startIndex, obj);
		List<Map<String, Object>> paramList = new ArrayList<Map<String, Object>>();
		if (!ToolsUtil.isEmpty(page)) {		
			List plist = page.getItems();
			Map<String, Object> newMap = null;
			int numNo = 1;
			for(int i=0;i<plist.size();i++){
				Object[] objData =(Object[]) plist.get(i);   
				 newMap = new HashMap<String, Object>();
				 newMap.put("numNo",numNo); //序号
				 newMap.put("id",objData[0]); 
				 newMap.put("geologicalDescription",objData[1]); 
				 newMap.put("towerType",objData[2]); 
				 newMap.put("angleLY",objData[3]); 
				 newMap.put("actingForce",objData[4]); 
				 newMap.put("towerShaped",objData[5]); 
				 newMap.put("countOnly",objData[6]); 
				 newMap.put("steelLabel",objData[7]); 
				 newMap.put("soilVolume",objData[8]); 
				 newMap.put("steelQuantity",objData[9]); 
				 newMap.put("earthBolt",objData[10]); 
				 newMap.put("beddingLabel",objData[11]); 
				 newMap.put("cushion",objData[12]); 
				 newMap.put("buryingDepth",objData[13]); 
				 newMap.put("baseplateWidth",objData[14]); 
				 newMap.put("columnWidth",objData[15]); 
				 newMap.put("columnHigh",objData[16]); 
				 newMap.put("basicModel",objData[17]); 
				 newMap.put("remark",objData[18]); 
				 newMap.put("projectId",objData[19]);
			     numNo++;
			     paramList.add(newMap);
			}
		}
		return paramList;
	}

	@Override
	public List<Map<String, Object>> getParamter(Map<String, Object> map) {
		Map<String, Object> param=getQuerySql(map);
		String sql=param.get("sql").toString();
		Object[] obj=(Object[]) param.get("list");
		List<Map<String, Object>> paramList=baseDao.getJdbcTemplateDAO().queryForList(sql, obj);
		return paramList;
	}
	

	public Map<String, Object> getQuerySql(Map<String, Object> map) {
		Map<String, Object> param = new HashMap<String, Object>();

		StringBuilder builder = new StringBuilder();
		List<Object> list = new ArrayList<Object>();

		builder.append(" select  sp.id,sp.geologicalDescription,sp.towerType,sp.angleLY,sp.actingForce,sp.towerShaped,sp.countOnly,sp.steelLabel, ");
		builder.append(" sp.soilVolume,sp.steelQuantity,sp.earthBolt,sp.beddingLabel,sp.cushion,sp.buryingDepth,sp.baseplateWidth,sp.columnWidth, ");
		builder.append(" sp.columnHigh,sp.basicModel,sp.remark,projectId ");
		builder.append(" from  structuralParamter  sp  ");
		builder.append(" where 1=1 ");
		Object obj = null;
		if (!ToolsUtil.isEmpty(obj = map.get("projectId"))) {//工程id
			builder.append(" and  sp.projectId = ?");
			list.add(obj.toString());
		}
		if (!ToolsUtil.isEmpty(obj = map.get("geologicalDescription"))) {//地质描述
			builder.append(" and  sp.geologicalDescription = ?");
			list.add(obj.toString());
		}
		if (!ToolsUtil.isEmpty(obj = map.get("towerType"))) {// 杆塔类型
			builder.append(" and  sp.towerType = ?");
			list.add(obj.toString());
		}
		if (!ToolsUtil.isEmpty(obj = map.get("angleLY"))) {// 转角拉压方式
			builder.append(" and  sp.angleLY = ?");
			list.add(obj.toString());
		}
		
		builder.append(" order by towerType  ");

		param.put("sql", builder.toString());
		param.put("list", list.toArray());
		return param;
	}

	@Override
	public int addParamterAll(List<StructuralParamter> list) {
		
		return baseDao.batchExcute(list, Param.OpType.OP_INSERT);
	}
	
	@Override
	public boolean addParamter(Map<String, String> map) {
		StructuralParamter paramter=new StructuralParamter();
		paramter.setId(CommonTool.createUUID());
		paramter.setGeologicalDescription(map.get("geologicalDescription")); 
		paramter.setTowerType(map.get("towerType")); 
		paramter.setAngleLY(map.get("angleLY"));
		paramter.setActingForce(map.get("actingForce"));
		paramter.setTowerShaped(map.get("towerShaped")); 
		paramter.setCountOnly(map.get("countOnly"));
		paramter.setSteelLabel(map.get("steelLabel")); 
		paramter.setSoilVolume(map.get("soilVolume")); 
		paramter.setSteelQuantity(map.get("steelQuantity")); 
		paramter.setEarthBolt(map.get("earthBolt"));
		paramter.setBeddingLabel(map.get("beddingLabel"));
		paramter.setCushion(map.get("cushion"));
		paramter.setBuryingDepth(map.get("buryingDepth"));
		paramter.setBaseplateWidth(map.get("baseplateWidth")); 
		paramter.setColumnWidth(map.get("columnWidth"));
		paramter.setColumnHigh(map.get("columnHigh"));
		paramter.setBasicModel(map.get("basicModel"));
		paramter.setRemark(map.get("remark"));
		paramter.setProjectId(map.get("projectId"));
		String id=(String) baseDao.save(paramter);
		if(ToolsUtil.isEmpty(id)){
			return false;
		}
		return true;
	}

	@Override
	public int updateParamter(Map<String, String> map) {
		String id=map.get("id");
		if(!ToolsUtil.isEmpty(id)){
			StructuralParamter paramter=getParamterEntity(id);
			
			paramter.setGeologicalDescription(map.get("geologicalDescription")); 
		//	paramter.setTowerType(map.get("towerType")); 
			paramter.setAngleLY(map.get("angleLY"));
			paramter.setActingForce(map.get("actingForce"));
			paramter.setTowerShaped(map.get("towerShaped")); 
			paramter.setCountOnly(map.get("countOnly"));
			paramter.setSteelLabel(map.get("steelLabel")); 
			paramter.setSoilVolume(map.get("soilVolume")); 
			paramter.setSteelQuantity(map.get("steelQuantity")); 
			paramter.setEarthBolt(map.get("earthBolt"));
			paramter.setBeddingLabel(map.get("beddingLabel"));
			paramter.setCushion(map.get("cushion"));
			paramter.setBuryingDepth(map.get("buryingDepth"));
			paramter.setBaseplateWidth(map.get("baseplateWidth")); 
			paramter.setColumnWidth(map.get("columnWidth"));
			paramter.setColumnHigh(map.get("columnHigh"));
			paramter.setBasicModel(map.get("basicModel"));
			paramter.setRemark(map.get("remark"));
			baseDao.update(paramter);
			return 1;
		}
		return 0;
	}
	
	public StructuralParamter getParamterEntity(String id){
		StructuralParamter  structuralParamter=(StructuralParamter) baseDao.getEntity(StructuralParamter.class, id);
	    return structuralParamter;
	}

	/**
	 * 删除参数信息
	 */
	@Override
	public int deleteParamter(String id) {
		String sql = "DELETE FROM structuralParamter WHERE id = ? ";
        
		return baseDao.executeBySQL(sql, new Object[]{id});
	}

	@Override
	public List<Map<String, Object>> importExcel(String fileName, MultipartFile file,String projectId) {
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
     		paramList = getExcelInfo(inputStream, false,projectId);
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
	public List<Map<String, Object>> getExcelInfo(InputStream inputStream, boolean isExcel2003,String projectId) {
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
	                if(r.getRowNum()<1){
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
						String towerNum= getValue(r.getCell(0));//序号
						String towerType= getValue(r.getCell(1));//杆塔名称
						String angleLY= getValue(r.getCell(2));//L/Y
						String geologicalDescription= getValue(r.getCell(3));//地质描述
					//	String water= getValue(r.getCell(4));//地下水
						String actingForce= getValue(r.getCell(5));//作用力
						String towerShaped= getValue(r.getCell(6));//塔形
						String countOnly= getValue(r.getCell(7));//只数
						String steelLabel= getValue(r.getCell(8));//标号
						String soilVolume= getValue(r.getCell(9));//混泥土量
						String steelQuantity= getValue(r.getCell(10));//钢材量
						String earthBolt= getValue(r.getCell(11));//地栓
						String beddingLabel= getValue(r.getCell(12));//垫层标号
						String cushion= getValue(r.getCell(13));//垫层
						String buryingDepth= getValue(r.getCell(14));//埋深
						String baseplateWidth= getValue(r.getCell(15));//底板宽
						String columnWidth= getValue(r.getCell(16));//立柱宽
						String columnHigh= getValue(r.getCell(17));//立柱出土高
						String basicModel= getValue(r.getCell(18));//基础型号
						String remark= getValue(r.getCell(19));//备注
					
						
						if (!ToolsUtil.isEmpty(errorMessage)) {
							errorList.add(errorMessage);
							totalErrormessage += errorMessage;
							isError = true;
						}

						if (!isError) {
							// 新建map，把从excel中取出的值依次保存起来
							Map<String, String>  newMap = new HashMap<String, String>();							
							 newMap.put("geologicalDescription",geologicalDescription); 
							 newMap.put("towerType",towerType); 
							 newMap.put("angleLY",angleLY); 
							 newMap.put("actingForce",actingForce); 
							 newMap.put("towerShaped",towerShaped); 
							 newMap.put("countOnly",countOnly); 
							 newMap.put("steelLabel",steelLabel); 
							 newMap.put("soilVolume",soilVolume); 
							 newMap.put("steelQuantity",steelQuantity); 
							 newMap.put("earthBolt",earthBolt); 
							 newMap.put("beddingLabel",beddingLabel); 
							 newMap.put("cushion",cushion); 
							 newMap.put("buryingDepth",buryingDepth); 
							 newMap.put("baseplateWidth",baseplateWidth); 
							 newMap.put("columnWidth",columnWidth); 
							 newMap.put("columnHigh",columnHigh); 
							 newMap.put("basicModel",basicModel); 
							 newMap.put("remark",remark); 
							 newMap.put("projectId",projectId);
							
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
						isInsert=this.addParamter(map);
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
