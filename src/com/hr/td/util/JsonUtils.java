package com.hr.td.util;
import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

import org.codehaus.jackson.map.ObjectMapper;


import net.sf.json.JSONObject;

public class JsonUtils {

	
	public static Object strToJson(String jsonStr, Class<?> classType) {
		ObjectMapper mapper = new ObjectMapper();
		try {
			return mapper.readValue(jsonStr, classType);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	
	
	
	public static Map<String, Object> objToMap(Object obj) {  
        Map<String, Object> reMap = new HashMap<String, Object>();  
        if (obj == null)  
            return null;  
        Field[] fields = obj.getClass().getDeclaredFields();  
        try {  
            for (int i = 0; i < fields.length; i++) {  
                try {  
                    Field f = obj.getClass().getDeclaredField(  
                            fields[i].getName());  
                    f.setAccessible(true);  
                    Object o = f.get(obj);  
                    reMap.put(fields[i].getName(), o);  
                } catch (Exception e) {  
                    e.printStackTrace();  
                }  
            }  
        } catch (SecurityException e) {  
            e.printStackTrace();  
        }  
        return reMap;  
    }  
	
	public static String objToString(Object object) {
		JSONObject jsonObject = JSONObject.fromObject(object);
		return jsonObject.toString();
	}
	
}
