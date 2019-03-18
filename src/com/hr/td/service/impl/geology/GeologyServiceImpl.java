package com.hr.td.service.impl.geology;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.hr.td.dao.IBaseDao;
import com.hr.td.entity.Attachment;
import com.hr.td.entity.GeologicalSchedule;
import com.hr.td.entity.GeologicalScheduleConfigure;
import com.hr.td.service.geology.IGeologyService;
import com.hr.td.service.tower.ITowerService;
import com.hr.td.util.DataTablePage;
import com.hr.td.util.Page;
import com.hr.td.util.PropertiesConfig;
import com.hr.td.util.TAUtil;
import com.hr.td.util.ToolsUtil;
import com.nari.slsd.hd.param.Param;
import com.nari.slsd.hd.param.Param.OpType;
import com.nari.slsd.hd.util.CommonTool;

@Service
public class GeologyServiceImpl implements IGeologyService{
	@Autowired
	private IBaseDao baseDao;
	@Autowired
	protected JdbcTemplate jdbcTemplate;
	
	@Autowired
	private ITowerService towerService;// 杆塔明细的接口
	
	/**
	 *  查询地层名称和配置表ID
	 */
	@Override
	public List<Map<String, Object>> queryStratigraphicName() {
		String sql = "select * from geologicalScheduleConfigure";
		return jdbcTemplate.queryForList(sql);
	}
    
	/**
	 * 根据地层名称的value（ID）查询对应的岩土物理力学指标
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<String> queryNormByID(String ID) {
		//使用hql，from的是实体对象的名称
		String hql = " select geotechnicalDescription,gravityDensity,cohesion," +
				     " internalFrictionAngle,eigenvalueCapacity,standardSideResistance," +
				     " standardEndResistance,stratigraphicState  from GeologicalScheduleConfigure" +
				     " where ID = ? ";
		return baseDao.find(hql, ID);
	}
    
	/**
	 * 插入所有列表数据到geologicalSchedule表中
	 * @see com.hr.td.service.geology.IGeologyService#addAllGeological(java.util.List)
	 */
	@Override
	public int addAllGeological(List<GeologicalSchedule> geologicalScheduleList) {
		
		return baseDao.batchExcute(geologicalScheduleList, Param.OpType.OP_INSERT);
	}
    
	
	@Override
	public int getScheduleCount(Map<String, Object> map) {
		Map<String, Object> param=getQuerySql(map);
		Object[] obj=(Object[]) param.get("list");
		String sql=param.get("sql").toString();
		int count=baseDao.getCountBySql(sql, obj);
		return count;
	}
	
	@Override
	public List<Map<String, Object>> getSchedulePage(Map<String, Object> map) {
		int pageSize = CommonTool.ConvertToInt((ToolsUtil.isEmpty(map.get("pageSize"))?10:map.get("pageSize")).toString());
		int startIndex =CommonTool.ConvertToInt((ToolsUtil.isEmpty(map.get("startIndex"))?0:map.get("startIndex")).toString());
		Map<String, Object> param=getQuerySql(map);
		String sql=param.get("sql").toString();
		Object[] obj=(Object[]) param.get("list");
		int count=getScheduleCount(map);
	
		Page page =baseDao.getPageBySql(count, sql, pageSize, startIndex, obj);
		List<Map<String, Object>> ScheduleList = new ArrayList<Map<String, Object>>();
		if (!ToolsUtil.isEmpty(page)) {		
			List plist = page.getItems();
			Map<String, Object> newMap = null;
			int numNo = 1;
			for(int i=0;i<plist.size();i++){
				Object[] objData =(Object[]) plist.get(i);   
				 newMap = new HashMap<String, Object>();
				 newMap.put("numNo",numNo); //序号
				 newMap.put("id",objData[0]); 
				 newMap.put("mid",objData[1]); 
				 newMap.put("towerNum",objData[2]); 
				 newMap.put("towerLocation",objData[3]); 
				 newMap.put("explorationBasis",objData[4]); 
				 newMap.put("stratigraphicName",objData[5]); 
				 newMap.put("floorDepth",objData[6]); 
				 newMap.put("geotechnicalDescription",objData[7]); 
				 newMap.put("gravityDensity",objData[8]); 
				 newMap.put("cohesion",objData[9]); 
				 newMap.put("internalFrictionAngle",objData[10]); 
				 newMap.put("eigenvalueCapacity",objData[11]); 
				 newMap.put("standardSideResistance",objData[12]); 
				 newMap.put("standardEndResistance",objData[13]); 
				 newMap.put("illustrate",objData[14]); 
				 newMap.put("remark",objData[15]); 
				 newMap.put("surveyPointLocation",objData[16]); 
				 newMap.put("resistivity",objData[17]); 
				 newMap.put("stratigraphicState",objData[18]); 
				 newMap.put("waterLevel",objData[19]); 
				 newMap.put("projectId",objData[20]); 
				 newMap.put("sortno",objData[21]); 
			     numNo++;
			     ScheduleList.add(newMap);
			}
		}
		return ScheduleList;
	}
	
	public Map<String, Object> getQuerySql(Map<String, Object> map) {
		Map<String, Object> param = new HashMap<String, Object>();

		StringBuilder builder = new StringBuilder();
		List<Object> list = new ArrayList<Object>();

		builder.append(" select id,mid,towerNum,towerLocation,explorationBasis,stratigraphicName,floorDepth,");
		builder.append(" geotechnicalDescription,gravityDensity,cohesion,internalFrictionAngle,eigenvalueCapacity,");
		builder.append(" standardSideResistance,standardEndResistance,illustrate,remark,surveyPointLocation,");
		builder.append(" resistivity,stratigraphicState,waterLevel,projectId,sortno  ");
		builder.append(" from geologicalSchedule ");
		builder.append(" where 1=1 ");
		
		Object obj = null;
		if (!ToolsUtil.isEmpty(obj = map.get("projectId"))) {//工程id
			builder.append(" and  projectId = ?");
			list.add(obj.toString());
		}
		
		builder.append(" order by sortno,towerNum  ");

		param.put("sql", builder.toString());
		param.put("list", list.toArray());
		return param;
	}
    
	/**
	 * 查询geologicalSchedule表信息（前台分页）
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public List<GeologicalSchedule> queryGeologicalScheduleAll() {
		String sql = " select * from geologicalSchedule order by towerNum ";

		return  jdbcTemplate.query(sql, new BeanPropertyRowMapper(GeologicalSchedule.class));
	}
    
	/**
	 * 批量修改geologicalSchedule表信息
	 */
	@Override
	public int updateAllEditGeological(List<GeologicalSchedule> geologicalScheduleList) {
		
		return baseDao.batchExcute(geologicalScheduleList, Param.OpType.OP_UPDATE);
	}
    
	/**
	 * 删除一条geologicalSchedule信息
	 */
	@Override
	public int deleteEditGeological(String id) {
		String sql = "DELETE FROM geologicalSchedule WHERE id = ? ";
         
		return jdbcTemplate.update(sql,id);
	}

	/**
	 * 查询地质数据
	 * @param map
	 * @return
	 */
	@Override
	public List<GeologicalSchedule> getScheduleList(Map<String, Object> map) {
		StringBuilder hql = new  StringBuilder();
        hql.append(" from GeologicalSchedule  where 1=1 ");
		Object obj=null;
		List<String> list=new ArrayList<String>();
		if(!ToolsUtil.isEmpty(obj=map.get("id"))){
			hql.append(" and id = ? ");
			list.add(obj.toString());
		}
		if(!ToolsUtil.isEmpty(obj=map.get("projectId"))){
			hql.append(" and projectId = ? ");
			list.add(obj.toString());
		}
		if(!ToolsUtil.isEmpty(obj=map.get("towerNum"))){
			hql.append(" and towerNum = ? ");
			list.add(obj.toString());
		}
		
		hql.append(" order by sortno, towerNum ");
		List<GeologicalSchedule> scheduleList=baseDao.queryByHQL(hql.toString(), list.toArray());
		return scheduleList;
	}

	@Override
	public Map<String, Object> getGeologicalScheduleInfo(String projectId) {
		//查询总塔数
		String sql=" select count(a.towerNum) towerNum  from (select DISTINCT towerNum from geologicalSchedule where projectId='"+projectId+"') a ";
		//查询钻孔数  explorationBasis=1
		String sql1="select count(explorationBasis) from geologicalSchedule where explorationBasis ='1' and towerNum !='' and projectId='"+projectId+"'";		
		String sql11="select sum(b.floorDepth) from (select max(a.floorDepth) floorDepth,a.towerNum from (select floorDepth, towerNum from geologicalSchedule where explorationBasis ='1' and towerNum !='' and projectId='"+projectId+"') a GROUP BY a.towerNum) b";		
		//查询小麻花钻 explorationBasis=2
		String sql2="select count(explorationBasis) from geologicalSchedule where explorationBasis ='2' and towerNum !='' and projectId='"+projectId+"'";		
		//查询静力触探 explorationBasis=3
		String sql3="select count(explorationBasis) from geologicalSchedule where explorationBasis ='3' and towerNum !='' and projectId='"+projectId+"'";		
		String sql33="select sum(b.floorDepth) from (select max(a.floorDepth) floorDepth,a.towerNum from (select floorDepth, towerNum from geologicalSchedule where explorationBasis ='3' and towerNum !='' and projectId='"+projectId+"') a GROUP BY a.towerNum) b";
		//查询地质调查 explorationBasis=4、5、6
		String sql4="select count(explorationBasis) from geologicalSchedule where explorationBasis in ('4','5','6') and towerNum !='' and projectId='"+projectId+"'";		
		//查询名称
		String sql5="select *  from geologicalSchedule where projectId='"+projectId+"'  group by  stratigraphicName";
		List list=baseDao.queryBySQL(sql, null);
		List list1=baseDao.queryBySQL(sql1, null);
		List list2=baseDao.queryBySQL(sql2, null);
		List list3=baseDao.queryBySQL(sql3, null);
		List list4=baseDao.queryBySQL(sql4, null);
		List list11=baseDao.queryBySQL(sql11, null);
		List list33=baseDao.queryBySQL(sql33, null);
		List<Map<String, Object>> list5=baseDao.getJdbcTemplateDAO().queryForList(sql5);
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("count_towerNum", list.get(0));
		map.put("count_basis1", list1.get(0));
		map.put("count_basis2", list2.get(0));
		map.put("count_basis3", list3.get(0));
		map.put("count_basis4", list4.get(0));
		map.put("count_basis11", list11.get(0));
		map.put("count_basis33", list33.get(0));
		map.put("stratigraphicName", list5);
		return map;
	}
	
	/**
	 * 添加
	 * @param scheduleMap
	 * @return
	 */
	public boolean addGeo(Map<String, String> scheduleMap){
		GeologicalSchedule geologicalSchedule = new GeologicalSchedule();
	    geologicalSchedule.setId(CommonTool.createUUID());
		geologicalSchedule.setProjectId(scheduleMap.get("projectId"));
		geologicalSchedule.setMid(null);
		geologicalSchedule.setTowerNum(scheduleMap.get("towerNum"));
		geologicalSchedule.setTowerLocation(scheduleMap.get("towerLocation"));
		geologicalSchedule.setExplorationBasis(scheduleMap.get("explorationBasis"));
		geologicalSchedule.setStratigraphicName(scheduleMap.get("stratigraphicName"));
		geologicalSchedule.setFloorDepth(scheduleMap.get("floorDepth"));
		geologicalSchedule.setGeotechnicalDescription(scheduleMap.get("geotechnicalDescription"));
		geologicalSchedule.setGravityDensity(scheduleMap.get("gravityDensity"));
		geologicalSchedule.setCohesion(scheduleMap.get("cohesion"));
		geologicalSchedule.setInternalFrictionAngle(scheduleMap.get("internalFrictionAngle"));
		geologicalSchedule.setEigenvalueCapacity(scheduleMap.get("eigenvalueCapacity"));
		geologicalSchedule.setStandardSideResistance(scheduleMap.get("standardSideResistance"));
		geologicalSchedule.setStandardEndResistance(scheduleMap.get("standardEndResistance"));
		geologicalSchedule.setIllustrate(scheduleMap.get("illustrate"));
		geologicalSchedule.setRemark(scheduleMap.get("remark"));
		geologicalSchedule.setSurveyPointLocation(scheduleMap.get("surveyPointLocation"));
		geologicalSchedule.setWaterLevel(scheduleMap.get("waterLevel"));
		geologicalSchedule.setResistivity(scheduleMap.get("resistivity"));
		geologicalSchedule.setStratigraphicState(scheduleMap.get("stratigraphicState"));
		geologicalSchedule.setSortno(scheduleMap.get("sortno"));;
		String id=(String) baseDao.save(geologicalSchedule);
		if(ToolsUtil.isEmpty(id)){
			return false;
		}
		return true;
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
     		paramList = getExcelInfo(inputStream, isExcel2003,projectId);
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
				
				List<Map<String, Object>> geolist= queryStratigraphicName();
				List<String> sortNoList=findTowerNum(projectId);
							
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
					    String towerNum= getValue(r.getCell(0));//杆塔编号
						String towerLocation= getValue(r.getCell(1));//杆塔位置
						String explorationBasis=getExploration(getValue(r.getCell(2)));//勘探依据
						String stratigraphicName=getNumByName(geolist, getValue(r.getCell(3)));//地层名称
						String floorDepth= getValue(r.getCell(4));//层底深度
						String geotechnicalDescription= getValue(r.getCell(5));//岩土描述
						String gravityDensity= getValue(r.getCell(6));//重力密度
						String cohesion= getValue(r.getCell(7));//粘聚力
						String internalFrictionAngle= getValue(r.getCell(8));//内摩擦角
						String eigenvalueCapacity= getValue(r.getCell(9));//承载力特征值
						String standardSideResistance= getValue(r.getCell(10));//桩的极限侧阻力标准值
						String standardEndResistance= getValue(r.getCell(11));//桩的极限端阻力标准值
					//	String beddingLabel= getValue(r.getCell(12));//图片
						String illustrate= getValue(r.getCell(13));//说明
						String surveyPointLocation= getValue(r.getCell(14));//勘测点位置
						String waterLevel= getValue(r.getCell(15));//地下水位埋深
						String resistivity= getValue(r.getCell(16));//电阻率
						String stratigraphicState= getValue(r.getCell(17));//地层状态
						String remark= getValue(r.getCell(18));//备注
						
						if (!ToolsUtil.isEmpty(errorMessage)) {
							errorList.add(errorMessage);
							totalErrormessage += errorMessage;
							isError = true;
						}

						if (!isError) {
							// 新建map，把从excel中取出的值依次保存起来
							Map<String, String>  newMap = new HashMap<String, String>();							
							 newMap.put("towerNum",towerNum); 
							 newMap.put("towerLocation",towerLocation); 
							 newMap.put("explorationBasis",explorationBasis); 
							 newMap.put("stratigraphicName",stratigraphicName); 
							 newMap.put("floorDepth",floorDepth); 
							 newMap.put("geotechnicalDescription",geotechnicalDescription); 
							 newMap.put("gravityDensity",gravityDensity); 
							 newMap.put("cohesion",cohesion); 
							 newMap.put("internalFrictionAngle",internalFrictionAngle); 
							 newMap.put("eigenvalueCapacity",eigenvalueCapacity); 
							 newMap.put("standardSideResistance",standardSideResistance); 
							 newMap.put("standardEndResistance",standardEndResistance); 
							 newMap.put("illustrate",illustrate); 
							 newMap.put("surveyPointLocation",surveyPointLocation); 
							 newMap.put("waterLevel",waterLevel); 
							 newMap.put("resistivity",resistivity); 
							 newMap.put("stratigraphicState",stratigraphicState); 
							 newMap.put("remark",remark); 
							 newMap.put("projectId",projectId);
							 newMap.put("sortno",getSortno(sortNoList,towerNum));
							
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
						isInsert=this.addGeo(map);
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
	
	public String getNumByName(List<Map<String, Object>> list,String name){
		for(int i=0;i<list.size();i++){
			Map<String, Object> map=list.get(i);
			String stratigraphicName=(String) map.get("stratigraphicName");
			if(stratigraphicName.equals(name)){
				return map.get("ID").toString();
			}
		}
		return "";
	}
	
	public String getExploration(String str){
		if(str.equals("钻孔")){
			return "1";
		}
		if(str.equals("小麻花钻")){
			return "2";
		}
		if(str.equals("静力触探")){
			return "3";
		}
		if(str.equals("地质调查")){
			return "4";
		}
		if(str.equals("小麻花钻+地质调查")){
			return "5";
		}
		if(str.equals("静力触探+地质调查")){
			return "6";
		}
		return "";
	}
	
	public String getSortno(List<String> list,String towerNum){
		if(!ToolsUtil.isEmpty(list)){
			for(int i=0;i<list.size();i++){
				String num=list.get(i);
				if(num.equals(towerNum)){
					return i+"";
				}
			}
		}
		return "";
	}
	
	public List<String> findTowerNum(String id){
		List<Attachment> attachList = towerService.getAttachment(id);
		// 获得文件要存储的根目录的磁盘路径
		String rootPath = PropertiesConfig.getInstance().getProperty("upload_store_root");
		List<File> list = new ArrayList<File>();
		for (int i = 0; i < attachList.size(); i++) {
			Attachment attach = attachList.get(i);
			String path = attach.getFilePath();// TA文件保存路径
			File file = new File(rootPath + path);
			list.add(file);
		}
		List<List<List<String>>> towerDetailList = TAUtil.readTa(list);
		List<String> towerList = new ArrayList<String>();
		for(int m= 0; m < towerDetailList.size(); m++){
			List<List<String>>  towerDetail=towerDetailList.get(m);
		    for (int i = 0; i < towerDetail.size(); i++) {
			     List<String> tower = towerDetail.get(i);
				 String towerNum=tower.get(0);
			     towerList.add(towerNum); // 杆塔编号			
		     }
		}
		return towerList;
	}

	@Override
	public List<Map<String, Object>> queryStratigraphic(Map<String, Object> map) {
		Map<String, Object> param=getConfigureSql(map);
		String sql=param.get("sql").toString();
		Object[] obj=(Object[]) param.get("list");
		List<Map<String, Object>> paramList=baseDao.getJdbcTemplateDAO().queryForList(sql, obj);
		return paramList;
	}

	@Override
	public int getConfigureCount(Map<String, Object> map) {
		Map<String, Object> param=getConfigureSql(map);
		Object[] obj=(Object[]) param.get("list");
		String sql=param.get("sql").toString();
		int count=baseDao.getCountBySql(sql, obj);
		return count;
	}

	@Override
	public List<Map<String, Object>> getConfigurePage(Map<String, Object> map) {
		int pageSize = CommonTool.ConvertToInt((ToolsUtil.isEmpty(map.get("pageSize"))?10:map.get("pageSize")).toString());
		int startIndex =CommonTool.ConvertToInt((ToolsUtil.isEmpty(map.get("startIndex"))?0:map.get("startIndex")).toString());
		Map<String, Object> param=getConfigureSql(map);
		String sql=param.get("sql").toString();
		Object[] obj=(Object[]) param.get("list");
		int count=getConfigureCount(map);
	
		Page page =baseDao.getPageBySql(count, sql, pageSize, startIndex, obj);
		List<Map<String, Object>> ScheduleList = new ArrayList<Map<String, Object>>();
		if (!ToolsUtil.isEmpty(page)) {		
			List plist = page.getItems();
			Map<String, Object> newMap = null;
			int numNo = 1;
			for(int i=0;i<plist.size();i++){
				Object[] objData =(Object[]) plist.get(i);   
				 newMap = new HashMap<String, Object>();
				 newMap.put("numNo",numNo); //序号
				 newMap.put("id",objData[0]); 
				 newMap.put("stratigraphicName",objData[1]); 
				 newMap.put("floorDepth",objData[2]); 
				 newMap.put("geotechnicalDescription",objData[3]); 
				 newMap.put("gravityDensity",objData[4]); 
				 newMap.put("cohesion",objData[5]); 
				 newMap.put("internalFrictionAngle",objData[6]); 
				 newMap.put("eigenvalueCapacity",objData[7]); 
				 newMap.put("standardSideResistance",objData[8]); 
				 newMap.put("standardEndResistance",objData[9]); 
				 newMap.put("stratigraphicState",objData[10]);
			     numNo++;
			     ScheduleList.add(newMap);
			}
		}
		return ScheduleList;
	}
	
	public Map<String, Object> getConfigureSql(Map<String, Object> map) {
		Map<String, Object> param = new HashMap<String, Object>();

		StringBuilder builder = new StringBuilder();
		List<Object> list = new ArrayList<Object>();

		builder.append(" select id,stratigraphicName,floorDepth,");
		builder.append(" geotechnicalDescription,gravityDensity,cohesion,internalFrictionAngle,eigenvalueCapacity,");
		builder.append(" standardSideResistance,standardEndResistance,stratigraphicState ");
		builder.append(" from geologicalScheduleConfigure ");
		builder.append(" where 1=1 ");
		
		Object obj = null;
		if (!ToolsUtil.isEmpty(obj = map.get("id"))) {//id
			builder.append(" and  id = ?");
			list.add(obj.toString());
		}
		if (!ToolsUtil.isEmpty(obj = map.get("stratigraphicName"))) {
			builder.append(" and  stratigraphicName like ? ");
			list.add("%"+obj.toString()+"%");
		}
		if (!ToolsUtil.isEmpty(obj = map.get("stratigraphicState"))) {
			builder.append(" and  stratigraphicState = ? ");
			list.add(obj.toString());
		}

		builder.append(" order by floorDepth  ");

		param.put("sql", builder.toString());
		param.put("list", list.toArray());
		return param;
	}

	@Override
	public int addConfigure(Map<String, String> map) {
		GeologicalScheduleConfigure configure =new GeologicalScheduleConfigure();
		configure.setID(CommonTool.createUUID());
		configure.setStratigraphicName(map.get("stratigraphicName"));
		configure.setStratigraphicState(map.get("stratigraphicState"));
		configure.setStandardSideResistance(map.get("standardSideResistance"));
		configure.setStandardEndResistance(map.get("standardEndResistance"));
		configure.setInternalFrictionAngle(map.get("internalFrictionAngle"));
		configure.setGravityDensity(map.get("gravityDensity"));
		configure.setGeotechnicalDescription(map.get("geotechnicalDescription"));
		configure.setFloorDepth(map.get("floorDepth"));
		configure.setEigenvalueCapacity(map.get("eigenvalueCapacity"));
		configure.setCohesion(map.get("cohesion"));
		String id=(String) baseDao.save(configure);
		if(!ToolsUtil.isEmpty(id)){
			return 1;
		}
		return 0;
	}

	@Override
	public int updateConfigure(Map<String, String> map) {
		if(!ToolsUtil.isEmpty(map.get("id"))){
			GeologicalScheduleConfigure configure =getConfugureEntity(map.get("id"));
			configure.setStratigraphicName(map.get("stratigraphicName"));
			configure.setStratigraphicState(map.get("stratigraphicState"));
			configure.setStandardSideResistance(map.get("standardSideResistance"));
			configure.setStandardEndResistance(map.get("standardEndResistance"));
			configure.setInternalFrictionAngle(map.get("internalFrictionAngle"));
			configure.setGravityDensity(map.get("gravityDensity"));
			configure.setGeotechnicalDescription(map.get("geotechnicalDescription"));
			configure.setFloorDepth(map.get("floorDepth"));
			configure.setEigenvalueCapacity(map.get("eigenvalueCapacity"));
			configure.setCohesion(map.get("cohesion"));
			baseDao.update(configure);
			return 1;
		}
		return 0;
	}

	@Override
	public int deleteConfigure(String id) {
		if(!ToolsUtil.isEmpty(id)){
			GeologicalScheduleConfigure configure =getConfugureEntity(id);
		    baseDao.delete(configure);
		    return 1;
		}
		return 0;
	}

	@Override
	public GeologicalScheduleConfigure getConfugureEntity(String id) {
		GeologicalScheduleConfigure configure =(GeologicalScheduleConfigure) baseDao.getEntity(GeologicalScheduleConfigure.class, id);
		return configure;
	}
   	
}
