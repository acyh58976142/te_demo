package com.hr.td.entity;


import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * route文件信息表
 * @author sun
 *
 */
@Entity
@Table(name="routeInfo")
public class RouteInfo{
	
	private String id;     //主键ID，32位UUID大写
	private String projectId;//工程ID 
	private String tensileSection;// 耐张段信息
	/** 
	 * 耐张段信息  每行下标对应信息
	 * 0耐张段编号,22耐张段起点横坐标X,23耐张段起点纵坐标Y,24耐张段终点横坐标X,25耐张段终点纵坐标Y, 
	 * 33转角角度,37基本风速,38冰厚,39污秽,40雷害,41鸟害,42舞动,43杆塔型式,44导线型号1,
	 * 45分裂数,46架设位置,47导线型号2,48分裂数,49架设位置,50导线型号3,51分裂数,52架设位置,
	 * 53导线型号4,54分裂数,55架设位置,56导线型号5,57分裂数,58架设位置,59导线型号6,60分裂数,61架设位置,
	 * 62导线型号7,63分裂数,64架设位置,65导线型号8,66分裂数,67架设位置,68导线型号9,69分裂数,70架设位置,
	 * 71导线型号10,72分裂数,73架设位置,74导线型号11,75分裂数,76架设位置,77导线型号12,78分裂数,79架设位置,
	 * 80地线型号1,82地线型号2,84地线型号3,86地线型号4,88地线型号5,90地线型号6,92地线型号7,94地线型号8,
	 * 96地线型号9,98地线型号10,100地线型号11,102地线型号12
	 * 
	 */
	
	private String conductorParam;// 导线参数
	private String groundParam; //地线参数
	private String conductorAllParam;// 所有导线参数
	private String groundAllParam; // 所有地线参数
	
	private String relationData;//route文件和Ta文件关联信息(taSortno:ta文件序号，routeNo:route文件耐张段编号)


	/****主键ID*****/
	@Id
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getProjectId() {
		return projectId;
	}
	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}
	public String getTensileSection() {
		return tensileSection;
	}
	public void setTensileSection(String tensileSection) {
		this.tensileSection = tensileSection;
	}
	public String getConductorParam() {
		return conductorParam;
	}
	public void setConductorParam(String conductorParam) {
		this.conductorParam = conductorParam;
	}
	public String getGroundParam() {
		return groundParam;
	}
	public void setGroundParam(String groundParam) {
		this.groundParam = groundParam;
	}
	public String getRelationData() {
		return relationData;
	}
	public void setRelationData(String relationData) {
		this.relationData = relationData;
	}
	public String getConductorAllParam() {
		return conductorAllParam;
	}
	public void setConductorAllParam(String conductorAllParam) {
		this.conductorAllParam = conductorAllParam;
	}
	public String getGroundAllParam() {
		return groundAllParam;
	}
	public void setGroundAllParam(String groundAllParam) {
		this.groundAllParam = groundAllParam;
	}
	
}
	
	