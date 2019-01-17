package com.hr.td.upload;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.log4j.Logger;

import com.hr.td.util.CommonTool;
import com.hr.td.util.PropertiesConfig;
import com.hr.td.util.ToolsUtil;





@WebServlet(name="upload",urlPatterns = "/upload",loadOnStartup=10)  
public class UploadServlet extends HttpServlet
{
	private static final long serialVersionUID = 1L;
	private static Logger Log = Logger.getLogger(UploadServlet.class);
	private List<Uploadprocessor> processorList ;
	// 限制文件的上传大小
	private int maxPostSize = 100 * 1024 * 1024; // 最大100M
	public UploadServlet()
	{
		super();
		
		processorList = new ArrayList<Uploadprocessor>();
		//加载文档处理器列表
		String processorListStr = PropertiesConfig.getInstance().getProperty("upload_processor");
		if(!CommonTool.isNullOrEmpty(processorListStr))
		{
			String[] processors = processorListStr.split(";");
			for(String className : processors)
			{
				try
				{
					Uploadprocessor processor = (Uploadprocessor)Class.forName(className).newInstance();
					if(processor != null)
					{
						processorList.add(processor);
					}
				}
				catch(Exception e)
				{
					throw new RuntimeException(e);
				}
				
			}
		}
		Log.info("文件上传服务已启动");
	}

	@SuppressWarnings({ "rawtypes" })
	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		response.setContentType("text/html;charset=UTF-8");
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("succ", false);
		DiskFileItemFactory factory = new DiskFileItemFactory();
		factory.setSizeThreshold(4096);
		ServletFileUpload upload = new ServletFileUpload(factory);
		upload.setHeaderEncoding("utf-8");
		upload.setSizeMax(maxPostSize);
		try
		{
			List fileItems = upload.parseRequest(request);
			Iterator iter = fileItems.iterator();
			//存放表单中的<hidden>元素中的值，表示本次上传的业务类型
			String processor = request.getParameter("processor");
			Map<String,Object> otherMap = new HashMap<String,Object>();
			FileItem uploadFile = null;
			while(iter.hasNext())
			{
				FileItem item = (FileItem)iter.next();
				//这是表单中其他类型的属性
				if(item.isFormField())
				{
					//属性名称
					String fieldName = item.getFieldName();
					//属性值
					String fieldValue = item.getString("UTF-8");
					otherMap.put(fieldName, fieldValue);
				}
				
				//这是上传文件
				if(!item.isFormField())
				{
					uploadFile = item;
				}
			}
			
			for(Uploadprocessor uploadprocessor : processorList)
			{
				if(uploadprocessor.accept(processor)&&uploadFile!=null)
				{
					resultMap = uploadprocessor.process(uploadFile, otherMap);
					break;
				}
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		String json = ToolsUtil.jsonToStr(resultMap);
		response.getWriter().print(json);
	}

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		processRequest(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		processRequest(request, response);
	}

	public String getServletInfo()
	{
		return "";
	}

}
