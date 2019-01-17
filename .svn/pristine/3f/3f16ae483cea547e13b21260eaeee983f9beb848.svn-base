package com.hr.td.entity;

import java.io.Serializable;

/**
 * 荷载实体类
 * @author zhh
 *
 */
public class Load  implements Serializable,Cloneable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private  int workingConditionNo;//工况序号
	private  int nextWorkingConditionNo;//工况序号
	private  String workingCondition;//工况
	private double verticalLoad;//垂直荷载
	private double levelLoad;//水平荷载
	private double comprehensiveLoad;//综合荷载
	
	private double tmax;//Tmax
	private double rp;//	γ/σ
	
	
	private double σmaxm;
	private double σmaxn;
	private double γm;
	private double γn;
	
	private double  tm;
	private double  tn;
	private double  criterion;
	private double  Lr1;
	
	
	
	public int getNextWorkingConditionNo() {
		return nextWorkingConditionNo;
	}
	public void setNextWorkingConditionNo(int nextWorkingConditionNo) {
		this.nextWorkingConditionNo = nextWorkingConditionNo;
	}
	public double getΣmaxm() {
		return σmaxm;
	}
	public void setΣmaxm(double σmaxm) {
		this.σmaxm = σmaxm;
	}
	public double getΣmaxn() {
		return σmaxn;
	}
	public void setΣmaxn(double σmaxn) {
		this.σmaxn = σmaxn;
	}
	public double getΓm() {
		return γm;
	}
	public void setΓm(double γm) {
		this.γm = γm;
	}
	public double getΓn() {
		return γn;
	}
	public void setΓn(double γn) {
		this.γn = γn;
	}
	public double getTm() {
		return tm;
	}
	public void setTm(double tm) {
		this.tm = tm;
	}
	public double getTn() {
		return tn;
	}
	public void setTn(double tn) {
		this.tn = tn;
	}
	public double getCriterion() {
		return criterion;
	}
	public void setCriterion(double criterion) {
		this.criterion = criterion;
	}
	public double getLr1() {
		return Lr1;
	}
	public void setLr1(double lr1) {
		Lr1 = lr1;
	}
	public double getTmax() {
		return tmax;
	}
	public void setTmax(double tmax) {
		this.tmax = tmax;
	}
	public double getRp() {
		return rp;
	}
	public void setRp(double rp) {
		this.rp = rp;
	}
	public int getWorkingConditionNo() {
		return workingConditionNo;
	}
	public void setWorkingConditionNo(int workingConditionNo) {
		this.workingConditionNo = workingConditionNo;
	}
	public String getWorkingCondition() {
		return workingCondition;
	}
	public void setWorkingCondition(String workingCondition) {
		this.workingCondition = workingCondition;
	}
	public double getVerticalLoad() {
		return verticalLoad;
	}
	public void setVerticalLoad(double verticalLoad) {
		this.verticalLoad = verticalLoad;
	}
	public double getLevelLoad() {
		return levelLoad;
	}
	public void setLevelLoad(double levelLoad) {
		this.levelLoad = levelLoad;
	}
	public double getComprehensiveLoad() {
		return comprehensiveLoad;
	}
	public void setComprehensiveLoad(double comprehensiveLoad) {
		this.comprehensiveLoad = comprehensiveLoad;
	}
	public Load(int workingConditionNo, String workingCondition, double verticalLoad, double levelLoad,
			double comprehensiveLoad) {
		super();
		this.workingConditionNo = workingConditionNo;
		this.workingCondition = workingCondition;
		this.verticalLoad = verticalLoad;
		this.levelLoad = levelLoad;
		this.comprehensiveLoad = comprehensiveLoad;
	}
	public Load() {
		super();
	}
	
  @Override 
    public Object clone() { 
        Load load = null; 
        try{ 
        	load = (Load)super.clone(); 
        }catch(CloneNotSupportedException e) { 
            e.printStackTrace(); 
        } 
        return load; 
    } 
	
//	@Override
//	public int compareTo(Load arg0) {
//		return this.workingConditionNo-arg0.getWorkingConditionNo();
//	}
//	
	
}
