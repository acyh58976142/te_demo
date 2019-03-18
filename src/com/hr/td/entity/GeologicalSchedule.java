package com.hr.td.entity;


import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 地址明细表
 * @author cyh
 *
 */
@Entity
@Table(name="geologicalSchedule")
public class GeologicalSchedule{
		private String id;  //标识
		private String mid; //主表id
		private String towerNum;  //杆塔编号
		private String towerLocation;  //杆塔位置
		private String explorationBasis;  //勘探依据
		private String stratigraphicName;  //地层名称
		private String floorDepth;  //层底深度
		private String geotechnicalDescription;  //岩土描述
		private String gravityDensity;  //重力密度
		private String cohesion;  //黏聚力
		private String internalFrictionAngle;  //内摩擦角
		private String eigenvalueCapacity;  //承载力特征值
		private String standardSideResistance;  //桩的极限侧阻力标准值
		private String standardEndResistance;  //桩的极限端阻力标准值
		private String illustrate;  //说明
		private String surveyPointLocation; //勘探点位置
		private String waterLevel; //地下水位类型埋深
		private String remark;  //备注
		private String resistivity;//电阻率
		private String stratigraphicState;//地层状态
		private String projectId;//工程id
		private String sortno;//杆塔编号排序
		
		@Id
		public String getId() {
			return id;
		}
		public void setId(String id) {
			this.id = id;
		}
		public String getMid() {
			return mid;
		}
		public void setMid(String mid) {
			this.mid = mid;
		}
		public String getTowerNum() {
			return towerNum;
		}
		public void setTowerNum(String towerNum) {
			this.towerNum = towerNum;
		}
		public String getTowerLocation() {
			return towerLocation;
		}
		public void setTowerLocation(String towerLocation) {
			this.towerLocation = towerLocation;
		}
		public String getExplorationBasis() {
			return explorationBasis;
		}
		public void setExplorationBasis(String explorationBasis) {
			this.explorationBasis = explorationBasis;
		}
		public String getStratigraphicName() {
			return stratigraphicName;
		}
		public void setStratigraphicName(String stratigraphicName) {
			this.stratigraphicName = stratigraphicName;
		}
		public String getFloorDepth() {
			return floorDepth;
		}
		public void setFloorDepth(String floorDepth) {
			this.floorDepth = floorDepth;
		}
		public String getGeotechnicalDescription() {
			return geotechnicalDescription;
		}
		public void setGeotechnicalDescription(String geotechnicalDescription) {
			this.geotechnicalDescription = geotechnicalDescription;
		}
		public String getGravityDensity() {
			return gravityDensity;
		}
		public void setGravityDensity(String gravityDensity) {
			this.gravityDensity = gravityDensity;
		}
		public String getCohesion() {
			return cohesion;
		}
		public void setCohesion(String cohesion) {
			this.cohesion = cohesion;
		}
		public String getInternalFrictionAngle() {
			return internalFrictionAngle;
		}
		public void setInternalFrictionAngle(String internalFrictionAngle) {
			this.internalFrictionAngle = internalFrictionAngle;
		}
		public String getEigenvalueCapacity() {
			return eigenvalueCapacity;
		}
		public void setEigenvalueCapacity(String eigenvalueCapacity) {
			this.eigenvalueCapacity = eigenvalueCapacity;
		}
		public String getStandardSideResistance() {
			return standardSideResistance;
		}
		public void setStandardSideResistance(String standardSideResistance) {
			this.standardSideResistance = standardSideResistance;
		}
		public String getStandardEndResistance() {
			return standardEndResistance;
		}
		public void setStandardEndResistance(String standardEndResistance) {
			this.standardEndResistance = standardEndResistance;
		}
		public String getIllustrate() {
			return illustrate;
		}
		public void setIllustrate(String illustrate) {
			this.illustrate = illustrate;
		}
		public String getSurveyPointLocation() {
			return surveyPointLocation;
		}
		public void setSurveyPointLocation(String surveyPointLocation) {
			this.surveyPointLocation = surveyPointLocation;
		}
		public String getWaterLevel() {
			return waterLevel;
		}
		public void setWaterLevel(String waterLevel) {
			this.waterLevel = waterLevel;
		}
		public String getRemark() {
			return remark;
		}
		public void setRemark(String remark) {
			this.remark = remark;
		}
		public String getResistivity() {
			return resistivity;
		}
		public void setResistivity(String resistivity) {
			this.resistivity = resistivity;
		}
		public String getStratigraphicState() {
			return stratigraphicState;
		}
		public void setStratigraphicState(String stratigraphicState) {
			this.stratigraphicState = stratigraphicState;
		}
		public String getProjectId() {
			return projectId;
		}
		public void setProjectId(String projectId) {
			this.projectId = projectId;
		}
		public String getSortno() {
			return sortno;
		}
		public void setSortno(String sortno) {
			this.sortno = sortno;
		}
				
		
}
	
	