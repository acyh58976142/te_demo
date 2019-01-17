package com.hr.td.util;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Date;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.imageio.ImageIO;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.codec.binary.Base64;
import org.codehaus.jackson.map.ObjectMapper;

public class CommonTool
{
	/**
	 * yyyy-MM-dd HH:mm:ss
	 */
	public static final SimpleDateFormat FORMAT_yyyy_MM_dd_HH_mm_ss = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	/**
	 * java对象转json字符串
	 * 
	 * @param javaObj
	 * @return
	 */
	public static String jsonToStr(Object javaObj)
	{
		ObjectMapper mapper = new ObjectMapper();
		try
		{
			return mapper.writeValueAsString(javaObj);
		}
		catch(Exception e)
		{
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
	public static Object strToJson(String jsonStr, Class<?> classType)
	{
		ObjectMapper mapper = new ObjectMapper();
		try
		{
			return mapper.readValue(jsonStr, classType);
		}
		catch(Exception e)
		{
			throw new RuntimeException(e);
		}
	}

	/**
	 * 生产32位的UUID
	 * 
	 * @return
	 */
	public static String createUUID()
	{
		return UUID.randomUUID().toString().replace("-", "");
	}
	

	/**
	 * Calendar格式化输出
	 * 
	 * @param cal
	 * @param format
	 *            格式化表达式，例如:yyyy-MM-dd HH:mm:ss
	 * @return
	 */
	public static String calendarFormat(Calendar cal, String format)
	{
		if(cal == null)
		{
			return "";
		}

		String res = FORMAT_yyyy_MM_dd_HH_mm_ss.format(cal.getTime());
		return res;
	}

	/**
	 * Date格式化输出
	 * 
	 * @param date
	 * @param format
	 *            格式化表达式，例如:yyyy-MM-dd HH:mm:ss
	 * @return
	 */
	public static String DateFormat(Date date, String format)
	{
		if(date == null)
		{
			return "";
		}
		String res = FORMAT_yyyy_MM_dd_HH_mm_ss.format(date);
		return res;
	}

	/**
	 * MD5加密
	 * 
	 * @param source
	 * @return
	 * @throws NoSuchAlgorithmException
	 * @throws UnsupportedEncodingException
	 */
	public static String md5HexString(String source) throws NoSuchAlgorithmException, UnsupportedEncodingException
	{
		MessageDigest digest = MessageDigest.getInstance("MD5");
		byte[] digestBytes = digest.digest(source.getBytes("utf-8"));
		StringBuilder builder = new StringBuilder();
		for(byte b : digestBytes)
		{
			String s = String.format("%02X", b);
			builder.append(s);
		}
		return builder.toString();
	}

	/**
	 * String转Int,异常返回errorV
	 * 
	 * @param str
	 * @param errorV
	 *            如果转换错误用来取代的数字
	 * @return
	 */
	public static int ConvertToInt(String str, int errorV)
	{
		int v = errorV;
		try
		{
			if(str != null)
				v = Integer.parseInt(str.toString());
		}
		catch(Exception er)
		{
			v = errorV;
		}

		return v;
	}

	/**
	 * String转Int,如果异常返回Null
	 * 
	 * @param str
	 * @return
	 */
	public static Integer ConvertToInt(String str)
	{
		Integer v = null;
		try
		{
			if(str != null)
				v = Integer.parseInt(str.toString());
		}
		catch(Exception er)
		{
		}

		return v;
	}

	/**
	 * 文本转Double,异常返回Null
	 */
	public static Double ConvertToDouble(String str)
	{
		Double v = null;
		try
		{
			if(str != null)
				v = Double.parseDouble(str.toString());
		}
		catch(Exception er)
		{
		}

		return v;
	}

	/**
	 * 文本转Double,异常返回errorV
	 * 
	 * @param str
	 * @param errorV
	 * @return
	 */
	public static double ConvertToDouble(String str, double errorV)
	{
		double v = errorV;
		try
		{
			if(str != null)
				v = Double.parseDouble(str.toString());
		}
		catch(Exception er)
		{
			v = errorV;
		}

		return v;
	}

	/**
	 * 将对象转换成长整�?
	 * 
	 * @param str
	 *            转换的对�?
	 * @param errorV
	 *            出错后的数据
	 * @return
	 */
	public static long ConvertToLong(Object str, long errorV)
	{
		long v = errorV;
		try
		{
			if(str != null)
				v = Long.parseLong(str.toString());
		}
		catch(Exception er)
		{
			v = errorV;
		}

		return v;
	}

	/**
	 * 文本转Long
	 * 
	 * @return
	 */
	public static Long ConvertToLong(Object str, Long errorV)
	{
		Long v = errorV;
		try
		{
			if(str != null)
				v = Long.parseLong(str.toString());
		}
		catch(Exception er)
		{
			v = errorV;
		}

		return v;
	}

	public static boolean ConvertToBoolean(String str, boolean errorV)
	{
		boolean v = errorV;
		try
		{
			if(str != null && !CommonTool.isNullOrEmpty(str))
				v = Boolean.parseBoolean(str.toString());
		}
		catch(Exception er)
		{
			v = errorV;
		}

		return v;
	}

	/**
	 * 将对象转换成Timestamp类型
	 * 
	 * @param val
	 *            需要转换的值
	 * @param errorV
	 *            出错后的默认数据
	 * @return
	 */
	public static Timestamp ConvertToTimestamp(Object val, Timestamp errorV)
	{
		Timestamp ts = null;
		try
		{
			if(val != null)
			{
				if(val instanceof String)
				{
					ts = Timestamp.valueOf((String)val);
				}
				else if(val instanceof java.sql.Date)
				{
					ts = new Timestamp(((Date)val).getTime());
				}
				else if(val instanceof Timestamp)
				{
					ts = (Timestamp)val;
				}
				else if(val instanceof Calendar)
				{
					ts = new Timestamp(((Calendar)val).getTime().getTime());
				}
			}
		}
		catch(Exception er)
		{
			ts = errorV;
		}

		return ts;
	}

	/**
	 * 判断字符串是否为空或空字符串
	 * 
	 * @param str
	 * @return
	 */
	public static boolean isNullOrEmpty(String str)
	{
		if(str == null)
			return true;
		if(str.trim().length() == 0)
			return true;
		return false;
	}

	/**
	 * 判断元素是否为空或空字符串
	 * 
	 * @param str
	 * @return
	 */
	public static boolean isObjNullOrEmpty(Object obj)
	{
		if(obj == null)
			return true;
		if(obj.toString().trim().length() == 0)
			return true;
		return false;
	}

	/**
	 * 判断集合是否为null或为null
	 * 
	 * @param ls
	 *            集合
	 * @return
	 */
	public static boolean isListNullOrEmpty(List<?> ls)
	{
		if(ls == null)
			return true;
		if(ls.size() == 0)
			return true;
		return false;
	}

	/**
	 * 返回文件扩展名
	 */
	public static String getFileType(File file)
	{
		String fileName = file.getName();
		String fileType = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length());
		return fileType;
	}

	/**
	 * bean 转 map
	 */
	@SuppressWarnings("unchecked")
	public static Map<String, Object> objectToMap(Object obj)
	{
		if(obj == null)
		{
			return null;
		}
		return new org.apache.commons.beanutils.BeanMap(obj);
	}

	/**
	 * map 转 bean
	 */
	public static void mapToObject(Map<String, Object> map, Object obj)
	{
		if(map == null || obj == null)
		{
			return;
		}
		try
		{
			BeanUtils.populate(obj, map);
		}
		catch(Exception e)
		{
			System.out.println("transMap2Bean2 Error " + e);
		}
	}
	/**
	 * 等比例生成缩略图
	 * 
	 * @param srcImgPath
	 *            源图
	 * @param outImgPath
	 *            缩略图
	 * @param maxLength
	 *            缩略图的高或宽的尺寸
	 */
	public static void compressImage(String srcImgPath, String outImgPath, int maxLength)
	{
		// 得到图片
		BufferedImage src = InputImage(srcImgPath);
		if(null != src)
		{
			int old_w = src.getWidth();
			// 得到源图宽
			int old_h = src.getHeight();
			// 得到源图长
			int new_w = 0;
			// 新图的宽
			int new_h = 0;
			// 新图的长
			// 根据图片尺寸压缩比得到新图的尺寸
			if(old_w > old_h)
			{
				// 图片要缩放的比例
				new_w = maxLength;
				new_h = (int)Math.round(old_h * ((float)maxLength / old_w));
			}
			else
			{
				new_w = (int)Math.round(old_w * ((float)maxLength / old_h));
				new_h = maxLength;
			}
			outputImage(src, outImgPath, new_w, new_h);
		}
	}

	/**
	 * 指定高宽生成缩略图，不考虑等比例
	 * 
	 * @param srcImgPath
	 * @param outImgPath
	 * @param new_w
	 * @param new_h
	 */
	public static void compressImage(String srcImgPath, String outImgPath, int new_w, int new_h)
	{
		BufferedImage src = InputImage(srcImgPath);
		outputImage(src, outImgPath, new_w, new_h);
	}

	private static BufferedImage InputImage(String srcImgPath)
	{
		BufferedImage srcImage = null;
		FileInputStream in = null;
		try
		{
			in = new FileInputStream(srcImgPath);
			srcImage = javax.imageio.ImageIO.read(in);
			in.close();
		}
		catch(IOException e)
		{
			throw new RuntimeException(e);
		}
		finally
		{
			if(in != null)
			{
				try
				{
					in.close();
				}
				catch(IOException e)
				{
					e.printStackTrace();
				}
			}
		}
		return srcImage;
	}
	private static void outputImage(BufferedImage src, String outImgPath, int new_w, int new_h)
	{
		// 得到源图长
		BufferedImage newImg = new BufferedImage(new_w, new_h, BufferedImage.TYPE_INT_RGB);
		// 根据图片尺寸压缩比得到新图的尺寸
		newImg.getGraphics().drawImage(src.getScaledInstance(new_w, new_h, Image.SCALE_SMOOTH), 0, 0, null);
		// 调用方法输出图片文件
		// 判断输出的文件夹路径是否存在，不存在则创建
		File file = new File(outImgPath);
		if(!file.getParentFile().exists())
		{
			file.getParentFile().mkdirs();
		}
		try
		{
			ImageIO.write(newImg, outImgPath.substring(outImgPath.lastIndexOf(".") + 1), new File(outImgPath));
		}
		catch(Exception e)
		{
			throw new RuntimeException(e);
		}

	}

	/**
	 * 格式化日期字符 yyyy-mm-dd hh:mm:ss
	 * 
	 * @param obj
	 * @return
	 */
	public static String characterFormatting(Object obj)
	{
		if(obj == null || obj.toString().isEmpty() || obj.toString().equals(""))
		{
			return "";
		}
		String str = obj.toString();
		return str.substring(0, str.indexOf("."));
	}
	
	/**
	 * 格式化字符
	 * 
	 * @param obj
	 * @return
	 */
	public static String strFormatting(Object obj)
	{
		if(obj == null || obj.toString().isEmpty() || obj.toString().equals(""))
		{
			return "";
		}
		return obj.toString();
	}

	/**
	 * Base64编码, byte[]->String.
	 */
	public static String base64Encode(byte[] input)
	{
		return Base64.encodeBase64String(input);
	}

	/**
	 * Base64解码, String->byte[].
	 */
	public static byte[] base64Decode(String input)
	{
		return Base64.decodeBase64(input);
	}

	public static void main(String[] args)
	{
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("name", "张敏");
		map.put("age", 13);
		String json = jsonToStr(map);
		System.out.println(json);

		@SuppressWarnings("unchecked")
		Map<String, Object> javaObj = (Map<String, Object>)strToJson(json, Map.class);
		System.out.println(javaObj.get("name"));

		System.out.println(createUUID());
		System.out.println(createUUID());
		System.out.println(createUUID());

	}
}
