package com.hr.td.util;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.StringReader;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.sql.Clob;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Properties;
import java.util.Random;
import java.util.UUID;

import javax.swing.ImageIcon;
import javax.swing.JOptionPane;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.apache.commons.beanutils.BeanUtils;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.w3c.dom.Document;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import com.hr.td.entity.Point;
import com.nari.slsd.hd.param.Param;

public class ToolsUtil {
	private static final int WIDTH = 50; // 缩略图宽度
	private static final int HEIGHT = 50;// 缩略图高度

	/**
	 * 得到UUID
	 * 
	 * @return
	 */
	public static String createUUID() {
		return UUID.randomUUID().toString().replace("-", "");
	}

	/**
	 * 从配置文件中获取数据
	 * 
	 * @param key
	 *            字段名称
	 * @return String 字段值
	 */
	public static String getPropertiesInfo(String file, String key) {
		Properties p = new Properties();
		String value = "";
		try {
			p = PropertiesLoaderUtils.loadAllProperties(file);
			value = p.getProperty(key);
			return value;
		} catch (Exception ioe) {
			ioe.printStackTrace();
			return value;
		}
	}

	/**
	 * 从配置文件中获取数据
	 * 
	 * @param file
	 *            文件路径
	 * @return Map<key,value>
	 */
	public static Map<String, String> getPropertiesInfo(String file) {
		Properties p = new Properties();
		HashMap<String, String> valMap = new HashMap<String, String>();
		InputStream in = null;
		String value = "";
		try {
			in = new FileInputStream(file);
			p.load(in);
			Object[] keys = p.stringPropertyNames().toArray();
			for (int i = 0; i < keys.length; i++) {
				String cKey = keys[i].toString();
				String cVal = p.getProperty(cKey);
				valMap.put(cKey, cVal);
			}
			return valMap;
		} catch (Exception ioe) {
			ioe.printStackTrace();
			return valMap;
		} finally {
			try {
				if (in != null)
					in.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	/**
	 * 从配置文件中获取数据
	 * 
	 * @param key
	 *            字段名称
	 * @return String 字段值
	 */
	public static String getPropertiesInfoByRealPath(String file, String key) {
		Properties p = new Properties();
		InputStream in = null;
		String value = "";
		try {
			in = new FileInputStream(file);
			p.load(in);
			value = p.getProperty(key);
			return value;
		} catch (Exception ioe) {
			ioe.printStackTrace();
			return value;
		} finally {
			try {
				if (in != null)
					in.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	/**
	 * 判断对象是否为空 <功能详细描述>
	 * 
	 * @param obj
	 * @return [参数说明]
	 * @return boolean [空则返回true]
	 */
	public static boolean isEmpty(Object obj) {
		return null == obj || obj.toString().trim().length() == 0;
	}
	
	/**
	 * 对象转化为String
	 * @param obj
	 * @return String
	 */
	public static String charFormat(Object obj) {
		if(obj ==null || obj.toString().isEmpty() || obj.toString().equals("")){
			return "";
		}
		return obj.toString();
	}

	/**
	 * 判断列表是否为空
	 * 
	 * @param mobileIDs
	 *            列表
	 * @return boolean [空则返回true]
	 */
	public static boolean isEmpty(List<?> list) {
		if (null == list || 0 == list.size()) {
			return true;
		}
		return false;
	}

	/**
	 * 判断字符串是否为空 <功能详细描述>
	 * 
	 * @param mobileID
	 * @return [参数说明]
	 * 
	 * @return boolean [返回类型说明]
	 * @exception throws
	 *                [违例类型] [违例说明]
	 * @see [类、类#方法、类#成员]
	 */
	public static boolean isEmpty(String string) {
		return null == string || "".equals(string.trim());
	}

	/**
	 * 字符串转换为列表
	 * 
	 * @param input
	 *            输入字符串
	 * @return List<String>
	 */
	public static List<String> getList(String input) {
		List<String> result = new ArrayList<String>();
		if (!ToolsUtil.isEmpty(input)) {
			String[] in = input.split(",");

			result.addAll(Arrays.asList(in));
		}
		return result;
	}

	/**
	 * 获取当前日期的最后一天
	 */
	public static int getLastDay(String d) {
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.YEAR, Integer.valueOf(d.split("-")[0]));
		cal.set(Calendar.MONTH, Integer.valueOf(d.split("-")[1]) - 1);
		int day = cal.getActualMaximum(Calendar.DAY_OF_MONTH);
		return day;
	}

	public static String getMonth(String d) {
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.MONTH, Integer.valueOf(d.split("-")[1]) + 1);
		if ((d.split("-")[0]).equals("12")) {
			cal.set(Calendar.YEAR, Integer.valueOf(d.split("-")[0]) + 1);
		} else {
			cal.set(Calendar.YEAR, Integer.valueOf(d.split("-")[0]));
		}
		String month = String.valueOf(cal.get(Calendar.MONTH));
		String monthTemp = "";
		if (month.length() < 2) {
			monthTemp = "0" + month;
		} else {
			monthTemp = month;
		}
		String dat = String.valueOf(cal.get(Calendar.YEAR)) + "-" + monthTemp;
		return dat;
	}

	/**
	 * 获取当前上一年
	 */
	public static String getYear(String d) {
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.YEAR, Integer.valueOf(d) - 1);
		String year = String.valueOf(cal.get(Calendar.YEAR));
		return year;
	}

	/**
	 * 获取当前下一年
	 */
	public static String getNextYear(String d) {
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.YEAR, Integer.valueOf(d) + 1);
		String year = String.valueOf(cal.get(Calendar.YEAR));
		return year;
	}

	/**
	 * 将日期格式化成“上旬”格式输出
	 * 
	 * @param cal
	 * @return
	 */
	public static String getTenDayFormatString(int dayOfMonth) {
		String calStr = null;
		if (dayOfMonth < 1) {
			calStr = "";
		} else if (dayOfMonth < 11) {
			calStr = "上旬";
		} else if (dayOfMonth < 21) {
			calStr = "中旬";
		} else {
			calStr = "下旬";
		}
		return calStr;
	}

	/**
	 * 日期转换为字符串，格式为：yyyy-MM-dd HH:mm:ss
	 * 
	 * @param date
	 * @return String
	 * @throws Exception
	 */
	public static String FullDateToString(Date date) {
		if (date != null) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			return sdf.format(date);
		}
		return "";
	}

	/**
	 * 日期转换为字符串，格式为：yyyy-MM-dd
	 * 
	 * @param date
	 * @return String
	 * @throws Exception
	 */
	public static String dateToString(Date date) {
		if (date != null) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			return sdf.format(date);
		}
		return "";
	}

	/**
	 * Blob字段的通用转换 注意可能出现乱码
	 * 
	 * @return 转好的字符串，
	 **/
	public static String BlobToString(byte[] blob) {
		String str = "";
		// 使用StringBuffer进行拼接
		ByteArrayInputStream in = null;
		// InputStream in=null;//输入字节流
		try {
			in = new ByteArrayInputStream(blob);
			// 一般接下来是把in的字节流写入一个文件中,但这里直接放进字符串
			byte[] buff = new byte[(int) blob.length];
			// byte[] buff=new byte[1024];
			// byte[] b = new byte[blob.getBufferSize()];
			for (int i = 0; (i = in.read(buff)) > 0;) {
				str += new String(buff, "UTF-8");
			}
			// str += new String(buff);

			return str;

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				in.close();
			} catch (Exception e) {
				System.out.println("转换异常");
				e.printStackTrace();
			}
		}
		return null;
	}

	public static byte[] converToBlob(String content) {
		byte[] blob = null;
		// Blob blob = null;
		try {
			blob = content.getBytes("UTF-8");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		// try {
		// String blobString = new String(blob.getBytes(1,
		// (int)blob.length()),"GBK");
		// } catch (UnsupportedEncodingException e) {
		// // TODO Auto-generated catch block
		// e.printStackTrace();
		// } catch (SQLException e) {
		// // TODO Auto-generated catch block
		// e.printStackTrace();
		// }
		return blob;
	}

	public static byte[] converToBlobWithCharset(String content, String charset) {
		byte[] blob = null;
		try {
			blob = content.getBytes(charset);
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return blob;
	}

	/**
	 * 递归来重命名文件名
	 * 
	 * @param realPath
	 * @param filename
	 * @param extName
	 * @return
	 */
	public static File reNameFile(String realPath, String fileName, String extName) {
		String str = "";
		int mm = 0;// 重命名
		File file = new File(realPath + "\\" + fileName + extName);
		if (file.exists()) {
			mm++;
			str = "_" + mm;
			reNameFile(realPath, fileName + str, extName);
		} else {
			if (mm != 0) {
				str = "_" + mm;
			}
		}
		return file;
	}

	/**
	 * 生成随机数
	 * 
	 * @param length
	 * @return
	 */
	public static String getRandomString(int length) { // length表示生成字符串的长度
		String base = "abcdefghijklmnopqrstuvwxyz0123456789";
		Random random = new Random();
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < length; i++) {
			int number = random.nextInt(base.length());
			sb.append(base.charAt(number));
		}
		return sb.toString();
	}

	/**
	 * 字符串转化为xml
	 * 
	 * @param str
	 * @return
	 * @throws SAXException
	 * @throws IOException
	 * @throws ParserConfigurationException
	 */
	public static Document strToXml(String str) throws SAXException, IOException, ParserConfigurationException {
		StringReader sr = new StringReader(str);
		InputSource is = new InputSource(sr);
		is.setEncoding("gb2312");
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		DocumentBuilder builder = factory.newDocumentBuilder();
		Document doc = builder.parse(is);
		return doc;
	}

	public static Document strToXml(String str, String charset)
			throws SAXException, IOException, ParserConfigurationException {
		StringReader sr = new StringReader(str);
		InputSource is = new InputSource(sr);
		is.setEncoding(charset);
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		DocumentBuilder builder = factory.newDocumentBuilder();
		Document doc = builder.parse(is);
		return doc;
	}

	/**
	 * file转化为dom
	 */
	public static Document fileToXml(File file) throws SAXException, IOException, ParserConfigurationException {
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		DocumentBuilder builder = factory.newDocumentBuilder();
		Document doc = builder.parse(file);
		return doc;
	}

	public static Document createXML() throws ParserConfigurationException {
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		DocumentBuilder builder = factory.newDocumentBuilder();
		Document doc = builder.newDocument();
		return doc;

	}

	/**
	 * 将xml转换成string
	 * 
	 * @param doc
	 * @return
	 * @throws TransformerException
	 */
	public static String xmlToStr(Document doc) throws TransformerException {
		TransformerFactory tf = TransformerFactory.newInstance();
		Transformer t = tf.newTransformer();
		t.setOutputProperty("encoding", "gb2312");
		ByteArrayOutputStream bos = new ByteArrayOutputStream();
		t.transform(new DOMSource(doc), new StreamResult(bos));
		String xmlStr = bos.toString();
		return xmlStr;
	}

	public static String xmlToStr(Document doc, String charset) throws TransformerException {
		TransformerFactory tf = TransformerFactory.newInstance();
		Transformer t = tf.newTransformer();
		t.setOutputProperty("encoding", charset);
		ByteArrayOutputStream bos = new ByteArrayOutputStream();
		t.transform(new DOMSource(doc), new StreamResult(bos));
		String xmlStr = bos.toString();
		return xmlStr;
	}

	/**
	 * 获取本地化字符串
	 * 
	 * @param key
	 *            键
	 * @return 值
	 */
	public static String getNatureString(String key) {
		Properties propNative = new Properties();
		try {
			String properties = Locale.getDefault().getLanguage() + "_nature.properties";
			propNative.load(ToolsUtil.class.getResourceAsStream(properties));
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			JOptionPane.showMessageDialog(null, "Can not read .properties files,please check path", "Error",
					JOptionPane.ERROR_MESSAGE);
			System.exit(0);
		}

		return propNative.getProperty(key);
	}

	/**
	 * string to unicode
	 */
	public static String StringtoUnicode(String s) {
		String as[] = new String[s.length()];
		String s1 = "";
		for (int i = 0; i < s.length(); i++) {
			as[i] = Integer.toHexString(s.charAt(i) & 0xffff);
			s1 = s1 + "\\u" + as[i];
		}
		return s1;
	}

	/**
	 * Object to ByteArray
	 * 
	 * @param obj
	 * @return
	 */
	public static byte[] toByteArray(Object obj) {
		byte[] bytes = null;
		try {
			ByteArrayOutputStream bos = new ByteArrayOutputStream();
			ObjectOutputStream oos = new ObjectOutputStream(bos);
			oos.writeObject(obj);
			oos.flush();
			bytes = bos.toByteArray();
			oos.close();
			bos.close();
		} catch (IOException ex) {
			ex.printStackTrace();
		}
		return bytes;
	}

	/**
	 * ByteArray to Object
	 * 
	 * @param bytes
	 * @return
	 */
	public static Object toObject(byte[] bytes) {
		Object obj = null;
		try {
			ByteArrayInputStream bis = new ByteArrayInputStream(bytes);
			ObjectInputStream ois = new ObjectInputStream(bis);
			obj = ois.readObject();
			ois.close();
			bis.close();
		} catch (IOException ex) {
			ex.printStackTrace();
		} catch (ClassNotFoundException ex) {
			ex.printStackTrace();
		}
		return obj;
	}

	public static String Clob2Str(Clob clob) throws Exception {
		return (clob != null ? clob.getSubString(1, (int) clob.length()) : null);
	}

	// 生成缩略图
	public static BufferedImage zoom(String srcFileName) {
		// 使用源图像文件名创建ImageIcon对象。
		ImageIcon imgIcon = new ImageIcon(srcFileName);
		// 得到Image对象。
		Image img = imgIcon.getImage();
		// 构造一个预定义的图像类型的BufferedImage对象。
		BufferedImage buffImg = new BufferedImage(WIDTH, HEIGHT, BufferedImage.TYPE_INT_RGB);
		// buffImg.flush();
		// 创建Graphics2D对象，用于在BufferedImage对象上绘图。
		Graphics2D g = buffImg.createGraphics();

		// 设置图形上下文的当前颜色为白色。
		g.setColor(Color.WHITE);
		// 用图形上下文的当前颜色填充指定的矩形区域。
		g.fillRect(0, 0, WIDTH, HEIGHT);
		// 按照缩放的大小在BufferedImage对象上绘制原始图像。
		g.drawImage(img, 0, 0, WIDTH, HEIGHT, null);
		// 释放图形上下文使用的系统资源。
		g.dispose();
		// 刷新此 Image 对象正在使用的所有可重构的资源.
		img.flush();
		return buffImg;
	}

	/**
	 * 前时标
	 * 
	 * @param dayOfMonth
	 * @return
	 */
	public static String getBeforeTenDayFormatString(Calendar cal, int dayOfMonth) {
		String calStr = null;
		if (dayOfMonth < 1) {
			calStr = "";
		} else if (dayOfMonth < 11) {
			cal.add(Calendar.MONTH, -1);
			calStr = "下旬";
		} else if (dayOfMonth < 21) {
			calStr = "上旬";
		} else {
			calStr = "中旬";
		}
		return calStr;
	}

	public static String calendarToStr(Calendar calendar, String formatStr) {
		SimpleDateFormat sdf = new SimpleDateFormat(formatStr);
		return sdf.format(calendar.getTime());
	}

	public static Calendar strToCalendar(String timeStr, String formatStr) {
		SimpleDateFormat sdf = new SimpleDateFormat(formatStr);
		Calendar calendar = Calendar.getInstance();
		try {
			Date date = sdf.parse(timeStr);
			calendar.setTime(date);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return calendar;
	}

	public static Date strToDate(String timeStr, String formatStr) {
		SimpleDateFormat sdf = new SimpleDateFormat(formatStr);
		Date date = null;
		try {
			date = sdf.parse(timeStr);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}

	/**
	 * java对象转json字符串
	 * 
	 * @param javaObj
	 * @return
	 */
	public static String jsonToStr(Object javaObj) {
		ObjectMapper mapper = new ObjectMapper();
		try {
			return mapper.writeValueAsString(javaObj);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	/**
	 * json字符串转java对象
	 * 
	 * @param jsonStr
	 * @param classType
	 * @return
	 */
	public static Object strToJson(String jsonStr, Class<?> classType) {
		ObjectMapper mapper = new ObjectMapper();
		try {
			return mapper.readValue(jsonStr, classType);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	/**
	 * map 转 bean
	 */
	public static void mapToObject(Map<String, Object> map, Object obj) {
		if (map == null || obj == null) {
			return;
		}
		try {
			BeanUtils.populate(obj, map);
		} catch (Exception e) {
			System.out.println("transMap2Bean2 Error " + e);
			throw new RuntimeException(e);
		}
	}

	/**
	 * 判断字符串中是否含有注入攻击字符
	 * 
	 * @param str
	 * @return
	 */
	public static boolean injectChar(String str) {
		String inj_str = "\" ( ) \' * % < > & $ + ; alert";
		if (null != str) {
			String inj_stra[] = inj_str.split(" ");
			for (int i = 0; i < inj_stra.length; i++) {
				if (str.indexOf(inj_stra[i]) >= 0) {
					// return inj_stra[i];
					return false;
				}
			}
		}
		return true;
	}

	// 高字节在前
	public static byte[] longToByte8(long lo) {
		byte[] targets = new byte[8];
		for (int i = 0; i < 8; i++) {
			int offset = (7 - i) * 8;
			targets[i] = (byte) ((lo >>> offset) & 0xff);
		}
		return targets;
	}

	public static byte[] floatToByte4(float data) {
		int intBits = Float.floatToIntBits(data);
		return intToByte4(intBits);
	}

	// 高字节在后
	public static byte[] intToByte4(int data) {
		byte[] bytes = new byte[4];
		bytes[0] = (byte) (data & 0xff);
		bytes[1] = (byte) ((data & 0xff00) >> 8);
		bytes[2] = (byte) ((data & 0xff0000) >> 16);
		bytes[3] = (byte) ((data & 0xff000000) >> 24);
		return bytes;
	}

	public static List<Calendar> getRoundTimeList(Calendar bt, Calendar et, String runDataType) {
		List<Calendar> timeList = new ArrayList<Calendar>();
		Calendar time = (Calendar) bt.clone();
		time.set(Calendar.MILLISECOND, 0);
		time.set(Calendar.SECOND, 0);
		if (runDataType.equals(Param.RunDataType.RUN_HOUR)) {
			time.set(Calendar.MINUTE, 0);
		} else if (runDataType.equals(Param.RunDataType.RUN_DAY)) {
			time.set(Calendar.HOUR_OF_DAY, 0);
		} else if (runDataType.equals(Param.RunDataType.RUN_MONTH)) {
			time.set(Calendar.DAY_OF_MONTH, 0);
		} else if (runDataType.equals(Param.RunDataType.RUN_YEAR)) {
			time.set(Calendar.MONTH, 0);
		}
		while (!time.after(et)) {
			timeList.add(time);
			if (runDataType.equals(Param.RunDataType.RUN_HOUR)) {
				time.add(Calendar.HOUR_OF_DAY, 1);
			} else if (runDataType.equals(Param.RunDataType.RUN_DAY)) {
				time.add(Calendar.DAY_OF_MONTH, 1);
			} else if (runDataType.equals(Param.RunDataType.RUN_MONTH)) {
				time.add(Calendar.MONTH, 1);
			} else if (runDataType.equals(Param.RunDataType.RUN_YEAR)) {
				time.add(Calendar.YEAR, 1);
			}
		}
		return timeList;
	}
	
	/**
	 * 已知三个点A(x1,y1)、B(x2,y2)、C(x3,y3)的坐标 求AB和CB的夹角
	 * [(x1-x2)*(x3-x2)+(y1-y2)*(y3-y2)]/[(x1-x2)^2+(y1-y2)^2]^0.5+[(x3-x2)^2+(y3-y2)^2]^0.5=cosABC
	 * 
	 */
    public static double Angle(Point pointA, Point pointB, Point pointC)  
    { 
     double PI = 3.1415926535897  ;
	 double AB_x = pointB.getX() - pointA.getX();
	 double AB_y = pointB.getY() - pointA.getY();
	 double BC_x = pointC.getX() - pointB.getX();
	 double BC_y = pointC.getY() - pointB.getY(); 
	 
	 double tanAB =  AB_y/ AB_x; 
	 double tanCB =  BC_y/BC_x;
	 double angleAB = Math.atan(tanAB)*180/PI;
	 double angleCB = Math.atan(tanCB)*180/PI;
	 if ((AB_y< 0) & (AB_x < 0 ))
		 angleAB = angleAB +180;
	 else if((AB_y> 0) & (AB_x < 0 ))
		 angleAB = angleAB +180;
		 
	 if ((BC_y< 0) & (BC_x < 0 ))
		 angleCB = angleCB +180;
	 else if((BC_y> 0) & (BC_x < 0 ))
		 angleCB = angleCB +180;
	 double angleABC = angleCB - angleAB ;
	 
	 return angleABC;
} 
    
    public static void main(String args[]) { 
    	
    	Point pointC = new Point(493168.005,3635743.154);
    	Point pointA = new Point(493177.772,3634927.566);
    	Point pointB = new Point(493015.941,3634972.66);
    	double angleABC=Angle(pointA,pointB,pointC);
    	
    	System.out.println(angleABC); 
   } 
   
	// @描述：是否是2003的excel，返回true是2003 
    public static boolean isExcel2003(String filePath)  {  
         return filePath.matches("^.+\\.(?i)(xls)$");  
     }  
   
    //@描述：是否是2007的excel，返回true是2007 
    public static boolean isExcel2007(String filePath)  {  
         return filePath.matches("^.+\\.(?i)(xlsx)$");  
     } 
    
    /**
	 * 通过导线架线位置和转角角度获得跳线架线数量
	 * angle 转角角度
	 * position 架线位置
	 */
    public static int getCountByAngleAndPosition(double angle,String position,double minAngle,double maxAngle){ 
    	int count = 0;//跳线架线数量
    	int G;//转角方向  左-1，右1
    	int Z;//导线方向
    	if(angle>0){
    		G=-1;
    	}else{
    		G=1;
    	}
    	if(!isEmpty(position)){
    		String last = position.substring(position.length()-1,position.length());
    		if(last.equals("左")||last.equals("右")){
    			if(last.equals("左")){
    				Z =-1;
    			}else{
    				Z =1;
    			}
    			double  newAngle =-(G*Z*Math.abs(angle));
    			if(newAngle>-90&&newAngle<-minAngle){
    				count=0;
    			}
    			else if(newAngle>-minAngle&&newAngle<minAngle){
    				count=3;
    			}
    			else if(newAngle>minAngle&&newAngle<maxAngle){
    				count=0;
    			}
    			else if(newAngle>maxAngle&&newAngle<90){
    				count=3;
    			}
    		}
    		else{
    			Z =1;
    			double  newAngle =-(G*Z*Math.abs(angle));
    			if(newAngle>-90&&newAngle<-maxAngle){
    				count=2;
    			}
    			else if(newAngle>-maxAngle&&newAngle<-minAngle){
    				count=1;
    			}
    			else if(newAngle>-minAngle&&newAngle<minAngle){
    				count=2;
    			}
    			else if(newAngle>minAngle&&newAngle<maxAngle){
    				count=1;
    			}
    			else if(newAngle>maxAngle&&newAngle<90){
    				count=2;
    			}
    		}
    	}
    
         return count;  
     } 
}
