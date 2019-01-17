package com.hr.td.util;

public enum ProjectStageEnum {

	newProject("新增工程", 0), tower("杆塔", 1);  
    // 成员变量  
    private String name;  
    private int index;  
    // 构造方法  
    private ProjectStageEnum(String name, int index) {  
        this.name = name;  
        this.index = index;  
    }  
    // 普通方法  
    public static String getName(int index) {  
        for (ProjectStageEnum c : ProjectStageEnum.values()) {  
            if (c.getIndex() == index) {  
                return c.name;  
            }  
        }  
        return null;  
    } 
    
    public String getName() {  
        return name;  
    }  
    public void setName(String name) {  
        this.name = name;  
    }  
    public int getIndex() {  
        return index;  
    }  
    public void setIndex(int index) {  
        this.index = index;  
    } 
    
    public static void main(String[] args) {
		System.out.println(ProjectStageEnum.getName(0));
	}
}
