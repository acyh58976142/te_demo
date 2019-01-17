package com.hr.td.util;

public enum StageStateEnum {

	checkin("待校核", 0), pass("校核已通过", 1), reject("校核未通过", 2);  
    // 成员变量  
    private String name;  
    private int index;  
    // 构造方法  
    private StageStateEnum(String name, int index) {  
        this.name = name;  
        this.index = index;  
    }  
    // 普通方法  
    public static String getName(int index) {  
        for (StageStateEnum c : StageStateEnum.values()) {  
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
		System.out.println(StageStateEnum.getName(0));
	}
}
