package com.hr.td.upload;

import java.io.File;

import com.jacob.activeX.ActiveXComponent;
import com.jacob.com.Dispatch;


/**
 * 
 * OFFICE WORLD��EXCEL��PPT TO PDF FILE
 * 
 * @author Merely
 *
 *
 */
public class OfficeToPdfUtils {

	private static final int wdFormatPDF = 17;
	private static final int xlsFormatPDF = 0;
	private static final int pptFormatPDF = 32;

	public static boolean convertPDF(String inputFile, String pdfFile) {
		String suffix = getFileSufix(inputFile);
		File file = new File(inputFile);
		if (!file.exists()) {
			System.out.println("�ļ������ڣ�");
			return false;
		}
		if (suffix.equals("pdf")) {
			System.out.println("PDF�ļ�����Ҫ����װ��!");
			return false;
		}
		if (suffix.equals("doc") || suffix.equals("docx")) {
			return wordPDF(inputFile, pdfFile);
		} else if (suffix.equals("ppt") || suffix.equals("pptx")) {
			return pptPDF(inputFile, pdfFile);
		} else if (suffix.equals("xls") || suffix.equals("xlsx")) {
			return excelPDF(inputFile, pdfFile);
		} else {
			System.out.println("�ù�����ֻ֧�� WORLD, EXCEL, PPTת��PDF");
			return false;
		}
	}

	private static String getFileSufix(String fileName) {
		int splitIndex = fileName.lastIndexOf(".");
		return fileName.substring(splitIndex + 1);
	}

	private static boolean wordPDF(String inputFile, String pdfFile) {
		try {
			ActiveXComponent app = new ActiveXComponent("Word.Application");
			app.setProperty("Visible", false);
			Dispatch docs = app.getProperty("Documents").toDispatch();
			Dispatch doc = Dispatch.call(docs, "Open", inputFile, false, true).toDispatch();
			File tofile = new File(pdfFile);
			if (tofile.exists()) {
				tofile.delete();
			}
			Dispatch.call(doc, "ExportAsFixedFormat", pdfFile, wdFormatPDF);
			Dispatch.call(doc, "Close", false);
			app.invoke("Quit", 0);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	private static boolean excelPDF(String inputFile, String pdfFile) {
		try {
			ActiveXComponent app = new ActiveXComponent("Excel.Application");
			app.setProperty("Visible", false);
			Dispatch excels = app.getProperty("Workbooks").toDispatch();
			Dispatch excel = Dispatch.call(excels, "Open", inputFile, false, true).toDispatch();
			File tofile = new File(pdfFile);
			if (tofile.exists()) {
				tofile.delete();
			}
			Dispatch.call(excel, "ExportAsFixedFormat", xlsFormatPDF, pdfFile);
			Dispatch.call(excel, "Close", false);
			app.invoke("Quit");
			return true;
		} catch (Exception e) {
			return false;
		}

	}

	private static boolean pptPDF(String inputFile, String pdfFile) {
		try {
			ActiveXComponent app = new ActiveXComponent("PowerPoint.Application");
			Dispatch ppts = app.getProperty("Presentations").toDispatch();
			Dispatch ppt = Dispatch.call(ppts, "Open", inputFile, true, // ReadOnly
					true, // Untitledָ���ļ��Ƿ��б���
					false// WithWindowָ���ļ��Ƿ�ɼ�
			).toDispatch();
			File tofile = new File(pdfFile);
			if (tofile.exists()) {
				tofile.delete();
			}
			Dispatch.call(ppt, "SaveAs", pdfFile, pptFormatPDF);
			Dispatch.call(ppt, "Close");
			app.invoke("Quit");
			return true;
		} catch (Exception e) {
			return false;
		}
	}
}
