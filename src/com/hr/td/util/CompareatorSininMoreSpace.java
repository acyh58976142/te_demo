package com.hr.td.util;

import java.math.BigDecimal;
import java.util.Comparator;

import com.hr.td.entity.StructuralParamter;

public class CompareatorSininMoreSpace implements Comparator {
	@Override
    public int compare(Object o1, Object o2) {
	StructuralParamter sms1 = (StructuralParamter) o1;
	StructuralParamter sms2 = (StructuralParamter) o2;
    BigDecimal data1 = new BigDecimal(Double.parseDouble(sms1.getSoilVolume()));
    BigDecimal data2 = new BigDecimal(Double.parseDouble(sms2.getSoilVolume()));
    int flag = data1.compareTo(data2);
    if (flag == 0) {
    	return sms1.getId().compareTo(sms2.getId());
    } else { return flag;
    } 
    }

}
