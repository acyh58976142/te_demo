package com.hr.td.upload;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.fileupload.FileItem;
import org.apache.log4j.Logger;

import com.hr.td.util.CommonTool;
import com.hr.td.util.PropertiesConfig;


/**
 * file上传处理
 */
public class FileUploadProcessor implements Uploadprocessor
{
	private static Logger Log = Logger.getLogger(FileUploadProcessor.class);
	@Override
	public Map<String, Object> process(FileItem uploadFile, Map<String, Object> others)
	{
		Map<String, Object> resultMap = new HashMap<String, Object>();
		//上传的图片名称
		String picName = uploadFile.getName();
		//加上时间戳前缀,以形成唯一
		long timestamp = System.currentTimeMillis();
		String imageFileName = timestamp+picName.substring(picName.lastIndexOf("."));
		//获得文件要存储的根目录的磁盘路径
		String rootPath = PropertiesConfig.getInstance().getProperty("app_file_address");
		//根据逻辑获得图片应该保存的目录
		File saveDir = getSaveDir(rootPath);
		if(saveDir != null)
		{
			String picPath = saveDir+File.separator+imageFileName;
			try
			{   
				//将文件保存到磁盘目录中
				File f = new File(picPath);
				uploadFile.write(f);
				//转PDF形成的文件名
				//String  pdfFileName=timestamp+".pdf";
				//String pdfPath=saveDir+File.separator+pdfFileName;
				//boolean flag=OfficeToPdfUtils.convertPDF(picPath,pdfPath);
				String dirName = saveDir.getName();
				resultMap.put("oldName", picName.substring(getFileNameByIE(picName)));
				resultMap.put("newName", imageFileName);
				resultMap.put("url", (File.separator+dirName+File.separator+imageFileName).replace("\\", "/"));
				//resultMap.put("url", f);
				resultMap.put("id", CommonTool.createUUID());
				resultMap.put("succ", true);
			}
			catch(Exception e)
			{
				e.printStackTrace();
				resultMap.put("succ", false);
			}
		}
		return resultMap;
	}
	
	/**
	 * 获取file名称（截取掉IE浏览器中传过来的盘）
	 * @param str
	 * @return
	 */
	private int getFileNameByIE(String str){
		int index = str.lastIndexOf("\\");
		if(index>0){
			return index+1;
		}else{
			return 0;
		}
	}
	
	public static void main(String[] args) {
		String str= "10893";
		//String index = str.substring(str.length()-3,str.length());
		String index = str.substring(0,str.length()-3)+"+"+str.substring(str.length()-3,str.length());
		System.out.println(index);
	}
	/**获取文件目录*/
	private File getSaveDir(String rootPath)
	{
		//图片保存的目录名称
		String savePicDirName = null;
		File savePicDir = null;
		File rootDir = new File(rootPath);
		if(!rootDir.exists()){
			rootDir.mkdirs();
		}
		if(rootDir.exists() && rootDir.isDirectory())
		{
			File[] picDirs = rootDir.listFiles();
			if(picDirs.length == 0)
			{
				File rootDirNo = new File(rootPath+File.separator+1);
				rootDirNo.mkdirs();
				picDirs = rootDir.listFiles();
			}
			//遍历查找目录下编号最大的文件夹
			savePicDirName = picDirs[0].getName();
			
			for(File file : picDirs)
			{
				int nameNum = CommonTool.ConvertToInt(file.getName(), -1);
				if(CommonTool.ConvertToInt(savePicDirName) < nameNum)
				{
					savePicDirName = file.getName();
				}
			}
			//判断编号最大的文件夹下的文件是否超过1000
			int preinstallCount = CommonTool.ConvertToInt(PropertiesConfig.getInstance().getProperty("upload_store_dirFileCount"));
			
			savePicDir = new File(rootPath+File.separator+savePicDirName);
			//现有文件数量
			int fileCount = savePicDir.list().length;
			//超过最大限制就要新建一个目录
			if(fileCount >= preinstallCount)
			{
				String newDirName = ""+(CommonTool.ConvertToInt(savePicDirName) + 1);
				savePicDir = new File(rootPath+File.separator+newDirName);
				boolean result = savePicDir.mkdirs();
				if(result)
				{
					Log.debug("创建file目录:"+savePicDir.getAbsolutePath());
				}
			}
			return savePicDir;
		}
		return null;
	}
	@Override
	public boolean accept(String bizType)
	{
		if(bizType.toLowerCase().equals("nrfile"))
		{
			return true;
		}
		return false;
	}
}