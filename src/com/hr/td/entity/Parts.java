package com.hr.td.entity;


import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 组配件基本信息表
 * @author sun
 *
 */
@Entity
@Table(name="parts")
public class Parts{
	
	private String id;     //主键ID，32位UUID大写
	private String projectId;// 工程ID
	private String producer;   //创建人
	private String checker; //校对人
	private String column_k;// 杆塔k列信息
	private String column_l;// 杆塔l列信息
	private String column_m;// 杆塔m列信息
	private String column_n;// 杆塔n列信息
	private String column_o;// 杆塔o列信息
	private String column_p;// 杆塔p列信息
	private String column_q;// 杆塔q列信息
	private String column_r;// 杆塔r列信息
	private String column_s;// 杆塔s列信息
	private String column_t;// 杆塔t列信息
	private String column_u;// 杆塔u列信息
	private String column_v;// 杆塔v列信息
	private String column_w;// 杆塔w列信息
	private String column_x;// 杆塔x列信息
	private String column_y;// 杆塔y列信息
	private String column_z;// 杆塔z列信息
	private String column_aa;// 杆塔aa列信息 导线防震锤数量
	private String column_ab;// 杆塔ab列信息  地线防震锤数量
	private String column_ac;// 杆塔ac列信息   OPGW防震锤数量
	private String column_a;// 杆塔a列信息
	private String column_ae;// 杆塔ae列信息
	private String column_af;// 杆塔af列信息  导线型号
	private String column_ag;// 杆塔ag列信息  地线型号
	private String column_ah;// 杆塔ah列信息  OPGW型号
	private String column_ai;// 杆塔ai列信息  导线直径
	
	/****主键ID*****/
	@Id
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	
	public String getProducer() {
		return producer;
	}
	public void setProducer(String producer) {
		this.producer = producer;
	}
	public String getChecker() {
		return checker;
	}
	public void setChecker(String checker) {
		this.checker = checker;
	}
	
	public String getColumn_k() {
		return column_k;
	}
	public void setColumn_k(String column_k) {
		this.column_k = column_k;
	}
	public String getColumn_l() {
		return column_l;
	}
	public void setColumn_l(String column_l) {
		this.column_l = column_l;
	}
	public String getColumn_m() {
		return column_m;
	}
	public void setColumn_m(String column_m) {
		this.column_m = column_m;
	}
	public String getColumn_n() {
		return column_n;
	}
	public void setColumn_n(String column_n) {
		this.column_n = column_n;
	}
	public String getColumn_o() {
		return column_o;
	}
	public void setColumn_o(String column_o) {
		this.column_o = column_o;
	}
	public String getProjectId() {
		return projectId;
	}
	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}
	public String getColumn_p() {
		return column_p;
	}
	public void setColumn_p(String column_p) {
		this.column_p = column_p;
	}
	public String getColumn_q() {
		return column_q;
	}
	public void setColumn_q(String column_q) {
		this.column_q = column_q;
	}
	public String getColumn_r() {
		return column_r;
	}
	public void setColumn_r(String column_r) {
		this.column_r = column_r;
	}
	public String getColumn_s() {
		return column_s;
	}
	public void setColumn_s(String column_s) {
		this.column_s = column_s;
	}
	public String getColumn_t() {
		return column_t;
	}
	public void setColumn_t(String column_t) {
		this.column_t = column_t;
	}
	public String getColumn_u() {
		return column_u;
	}
	public void setColumn_u(String column_u) {
		this.column_u = column_u;
	}
	public String getColumn_v() {
		return column_v;
	}
	public void setColumn_v(String column_v) {
		this.column_v = column_v;
	}
	public String getColumn_w() {
		return column_w;
	}
	public void setColumn_w(String column_w) {
		this.column_w = column_w;
	}
	public String getColumn_x() {
		return column_x;
	}
	public void setColumn_x(String column_x) {
		this.column_x = column_x;
	}
	public String getColumn_y() {
		return column_y;
	}
	public void setColumn_y(String column_y) {
		this.column_y = column_y;
	}
	public String getColumn_z() {
		return column_z;
	}
	public void setColumn_z(String column_z) {
		this.column_z = column_z;
	}
	public String getColumn_aa() {
		return column_aa;
	}
	public void setColumn_aa(String column_aa) {
		this.column_aa = column_aa;
	}
	public String getColumn_ab() {
		return column_ab;
	}
	public void setColumn_ab(String column_ab) {
		this.column_ab = column_ab;
	}
	public String getColumn_ac() {
		return column_ac;
	}
	public void setColumn_ac(String column_ac) {
		this.column_ac = column_ac;
	}
	public String getColumn_a() {
		return column_a;
	}
	public void setColumn_a(String column_a) {
		this.column_a = column_a;
	}
	public String getColumn_ae() {
		return column_ae;
	}
	public void setColumn_ae(String column_ae) {
		this.column_ae = column_ae;
	}
	public String getColumn_af() {
		return column_af;
	}
	public void setColumn_af(String column_af) {
		this.column_af = column_af;
	}
	public String getColumn_ag() {
		return column_ag;
	}
	public void setColumn_ag(String column_ag) {
		this.column_ag = column_ag;
	}
	public String getColumn_ah() {
		return column_ah;
	}
	public void setColumn_ah(String column_ah) {
		this.column_ah = column_ah;
	}
	public String getColumn_ai() {
		return column_ai;
	}
	public void setColumn_ai(String column_ai) {
		this.column_ai = column_ai;
	}
	
}
	
	