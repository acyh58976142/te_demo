package com.hr.td.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 附件信息表的实体类
 * 
 * @author sunyongjian
 */
@Entity
@Table(name = "attachment")
public class Attachment {

	private String id; // ID
	private String projectId; // 工程项目ID
	private String stageId; // 项目阶段ID
	private String originalFileName; // 原文件名（下载时赋值原文件名）
	private String newFileName; //新文件名（上传时文件重命名）
	private Integer attachmentType; //附件类型（0：监督单位提交的附件 1：建设单位提交的附件）
	private Integer sortNo; // 附件序号
	private String filePath; // 文件地址

	/** ID 主键 */
	@Id
	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	/** 工程项目ID */
	public String getProjectId() {
		return projectId;
	}
	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}
	/** 项目阶段ID*/
	public String getStageId() {
		return stageId;
	}
	public void setStageId(String stageId) {
		this.stageId = stageId;
	}

	/** 原文件名*/
	public String getOriginalFileName() {
		return originalFileName;
	}


	public void setOriginalFileName(String originalFileName) {
		this.originalFileName = originalFileName;
	}

	/** 附件类型*/
	public Integer getAttachmentType() {
		return attachmentType;
	}


	public void setAttachmentType(Integer attachmentType) {
		this.attachmentType = attachmentType;
	}

	/** 附件序号*/
	public Integer getSortNo() {
		return sortNo;
	}


	public void setSortNo(Integer sortNo) {
		this.sortNo = sortNo;
	}

	/** 新文件名*/
	public String getNewFileName() {
		return newFileName;
	}

	public void setNewFileName(String newFileName) {
		this.newFileName = newFileName;
	}

	/** 文件地址*/
	public String getFilePath() {
		return filePath;
	}


	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}
}
