package com.hr.td.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 杆塔作用力关系
 * @author yw
 *
 */
@Entity
@Table(name = "ActingForceRelation")
public class ActingForceRelation {
       private String id;//主键id
       private String towerName;//杆塔名称
       private String huHeight;//呼高
       private String towerType;//杆塔类型
       private String fullHeight;//全高
       private String Nmax;
       private String Nx;
       private String Ny;
       private String Tmax;
       private String Tx;
       private String Ty;
       
     @Id
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getTowerName() {
		return towerName;
	}
	public void setTowerName(String towerName) {
		this.towerName = towerName;
	}
	public String getHuHeight() {
		return huHeight;
	}
	public void setHuHeight(String huHeight) {
		this.huHeight = huHeight;
	}
	public String getTowerType() {
		return towerType;
	}
	public void setTowerType(String towerType) {
		this.towerType = towerType;
	}
	public String getFullHeight() {
		return fullHeight;
	}
	public void setFullHeight(String fullHeight) {
		this.fullHeight = fullHeight;
	}
	public String getNmax() {
		return Nmax;
	}
	public void setNmax(String nmax) {
		Nmax = nmax;
	}
	public String getNx() {
		return Nx;
	}
	public void setNx(String nx) {
		Nx = nx;
	}
	public String getNy() {
		return Ny;
	}
	public void setNy(String ny) {
		Ny = ny;
	}
	public String getTmax() {
		return Tmax;
	}
	public void setTmax(String tmax) {
		Tmax = tmax;
	}
	public String getTx() {
		return Tx;
	}
	public void setTx(String tx) {
		Tx = tx;
	}
	public String getTy() {
		return Ty;
	}
	public void setTy(String ty) {
		Ty = ty;
	}
       
       
}
