package com.hr.td.util;
import java.awt.image.BufferedImage;
import java.awt.image.RenderedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

import org.apache.log4j.Logger;
import org.icepdf.core.pobjects.Document;
import org.icepdf.core.util.GraphicsRenderingHints;

public class Pdf2Png
{
	private static Logger LOG = Logger.getLogger(Pdf2Png.class);

	public static String[] convert(String pdfPath, String saveDir)
	{
		return convert(pdfPath, saveDir, "jpg", -1);
	}

	/**
	 * 转换PDF的第�?张图片�?�保存在pdf同目录�??
	 * 
	 * @param pdfPath
	 *            要转换的PDF文档全路�?
	 * @return 保存的文件的路径
	 */
	public static String convertFirstPage(String pdfPath)
	{
		String saveDir = null;
		if(pdfPath.contains("/"))
		{
			saveDir = pdfPath.substring(0, pdfPath.lastIndexOf("/"));
		}
		else if(pdfPath.contains("\\"))
		{
			saveDir = pdfPath.substring(0, pdfPath.lastIndexOf("\\"));
		}
		else
		{
			return "";
		}
		return convertFirstPage(pdfPath, saveDir + File.separator);
	}

	/**
	 * 转换PDF的第�?张图片�??
	 * 
	 * @param pdfPath
	 *            要转换的PDF文档全路�?
	 * @param saveDir
	 *            保存的目�?
	 * @return 保存的文件的路径
	 */
	public static String convertFirstPage(String pdfPath, String saveDir)
	{
		String[] paths = convert(pdfPath, saveDir, "jpg", 0);
		if(paths != null && paths.length > 0)
		{
			return paths[0];
		}
		else
		{
			return "";
		}
	}

	public static String[] convert(String pdfPath, String saveDir, String suffix, int numbers)
	{
		File pdfFile = new File(pdfPath);
		if(!pdfFile.exists())
		{
			LOG.error("pdf文件不存�?!:" + pdfPath);
			return null;
		}
		String pdfName = pdfFile.getName();
		if(pdfName.endsWith(".pdf"))
		{
			pdfName = pdfName.substring(0, pdfName.length() - 4);
		}
		Document document = new Document();
		document.setFile(pdfPath);
		float scale = 2.5f;// 缩放比例
		float rotation = 0f;// 旋转角度
		int pageNumber = document.getNumberOfPages();
		String[] imgNames = new String[pageNumber];

		for(int i = 0; i < document.getNumberOfPages() && numbers >= 0 && i <= numbers; i++)
		{
			BufferedImage image = (BufferedImage)document.getPageImage(i, GraphicsRenderingHints.SCREEN, org.icepdf.core.pobjects.Page.BOUNDARY_CROPBOX, rotation, scale);
			RenderedImage rendImage = image;
			try
			{
				String name = "";
				if(numbers > 0)
				{
					name = pdfName + i + (suffix.startsWith(".") ? suffix : "." + suffix);
				}
				else
				{
					name = pdfName + (suffix.startsWith(".") ? suffix : "." + suffix);
				}
				File file = new File(saveDir + name);
				ImageIO.write(rendImage, (suffix.startsWith(".") ? suffix.substring(1) : suffix), file);
				imgNames[i] = file.getAbsolutePath();
				LOG.debug("生成图片:" + imgNames[i]);
			}
			catch(IOException e)
			{
				LOG.error(e);
			}
			image.flush();
		}
		document.dispose();
		return imgNames;
	}

	public static void main(String[] args)
	{
		String pdfPath = "D:\\123.pdf";
		convertFirstPage(pdfPath);
	}
}