/**
 * 荷载计算过程
 */

function getcount(){
	
	/**
	 * 获取对象
	 */
	var B69data=$(".B69").find("option:selected").data();// 前侧导线
	var B70data=$(".B70").find("option:selected").data();// 后侧导线
	var B71data=$(".B71").find("option:selected").data();// 前侧地线
	var B72data=$(".B72").find("option:selected").data();// 后侧地线
	
	/**
	 * 导地线型号
	 */
	B81 = B69data.conductor_type;  // 赋值
    C81 = B70data.conductor_type;
	D81 = B71data.conductor_type;
	E81 = B72data.conductor_type;
	F81 = B71data.conductor_type;
	G81 = B72data.conductor_type;
	
	/**
	 * P3(N/m)自荷载加冰荷载
	 */
	var C117 = $(".C117").val();
	var pi = 3.14159265358979;
	
	/**
	 * P (v=5)(N/m)
	 */
	var getvalue = "";
	var G118 = $(".G118").val();
	var G119 = $(".G119").val();
	
	
	/**
	 * P4(N/m)安装时风荷载
	 */
	var F118 = $(".F118").val();
    var F119 = $(".F119").val();
	
	
	/**
	 * P4(N/m)大风时风荷载
	 */
	var D118 = $(".D118").val();
	var D119 = $(".D119").val();
	
	
	/**
	 * P5(N/m)覆冰时风荷载
	 */
	var C118 = $(".C118").val();
	var C119 = $(".C119").val();
	
	
	/**
	 * 前侧导线 LGJ-240/40 判断非空
	 */
    if(B81==""){
    	var B69="";
    }else{
    	B82 = B69data.cross_section_area;
    	B83 = (Number(B69data.unit_weight) * 9.80665);
    	B84 = (B83+0.9*pi*Number(C117)*(Number(B69data.diameter)+Number(C117))*9.80665/1000);
    	if(Number(B69data.diameter)<17){
    		getvalue = 1.2;
    	}else{
    		getvalue = 1.1;
    	}
    	B85 = (Number(G119)*getvalue*Number(B69data.diameter)*Number(G118)*Number(G118)/16*9.80665/1000);
    	B86 = (Number(F119)*getvalue*Number(B69data.diameter)*Number(F118)*Number(F118)/16*9.80665/1000);
    	B87 = (Number(D119)*getvalue*Number(B69data.diameter)*Number(D118)*Number(D118)/16*9.80665/1000);
    	B88 = (Number(C119)*1.2*(Number(B69data.diameter)+Number(C117)*2)*Number(C118)*Number(C118)/16*9.80665/1000);
    }
    
    /**
	 * 后侧导线 LGJ-240/40 判断非空
	 */
    if(C81==""){
    	var B70="";
    }else{
    	C82 = B70data.cross_section_area;
    	C83 = (Number(B70data.unit_weight) * 9.80665);
    	C84 = (C83+0.9*pi*Number(C117)*((Number(B70data.diameter)+Number(C117))*9.80665/1000));
    	if(Number(B70data.diameter)<17){
    		getvalue = 1.2;
    	}else{
    		getvalue = 1.1;
    	}
    	C85 = (Number(G119)*getvalue*Number(B70data.diameter)*Number(G118)*Number(G118)/16*9.80665/1000);
    	C86 = (Number(F119)*getvalue*Number(B70data.diameter)*Number(F118)*Number(F118)/16*9.80665/1000);
    	C87 = (Number(D119)*getvalue*Number(B70data.diameter)*Number(D118)*Number(D118)/16*9.80665/1000);
    	C88 = (Number(C119)*1.2*(Number(B70data.diameter)+Number(C117)*2)*Number(C118)*Number(C118)/16*9.80665/1000);
    }
    
    /**
	 * 前侧地线 JLB20A-100 判断非空
	 */
    if(D81==""){
    	var B71="";
    }else{
    	D82 = B71data.cross_section_area;
        D83 = (Number(B71data.unit_weight) * 9.80665);
        D84 = (D83+0.9*pi*Number(C117)*((Number(B71data.diameter)+Number(C117))*9.80665/1000));
        if(Number(B71data.diameter)<17){
    		getvalue = 1.2;
    	}else{
    		getvalue = 1.1;
    	}
    	D85 = (Number(G119)*getvalue*Number(B71data.diameter)*Number(G118)*Number(G118)/16*9.80665/1000);
    	D86 = (Number(F119)*getvalue*Number(B71data.diameter)*Number(F118)*Number(F118)/16*9.80665/1000);
    	D87 = (Number(D119)*getvalue*Number(B71data.diameter)*Number(D118)*Number(D118)/16*9.80665/1000);
    	
    }
    
    /**
	 * 后侧地线 JLB20A-100 判断非空
	 */
    if(E81==""){
    	var B72="";
    }else{
    	E82 = B72data.cross_section_area;
    	E83 = (Number(B72data.unit_weight) * 9.80665);
    	E84 = (E83+0.9*pi*Number(C117)*((Number(B72data.diameter)+Number(C117))*9.80665/1000));
    	if(Number(B72data.diameter)<17){
    		getvalue = 1.2;
    	}else{
    		getvalue = 1.1;
    	}
    	E85 = (Number(G119)*getvalue*Number(B72data.diameter)*Number(G118)*Number(G118)/16*9.80665/1000);
    	E86 = (Number(F119)*getvalue*Number(B72data.diameter)*Number(F118)*Number(F118)/16*9.80665/1000);
    	E87 = (Number(D119)*getvalue*Number(B72data.diameter)*Number(D118)*Number(D118)/16*9.80665/1000);
    }
    
    /**
	 * 地线(验算) 前侧地线 JLB20A-100 判断非空
	 * 
	 */
	if(F78==1){
		F82 = B71data.cross_section_area;
		F83 = (Number(B71data.unit_weight) * 9.80665);
		F84 = (F83+0.9*pi*(Number(C117)+5)*((Number(B71data.diameter)+(Number(C117)+5))*9.80665/1000));
		if(Number(B71data.diameter)<17){
    		getvalue = 1.2;
    	}else{
    		getvalue = 1.1;
    	}
		F85 = (Number(G119)*getvalue*Number(B71data.diameter)*Number(G118)*Number(G118)/16*9.80665/1000);
		F86 = (Number(F119)*getvalue*Number(B71data.diameter)*Number(F118)*Number(F118)/16*9.80665/1000);
		F87 = (Number(D119)*getvalue*Number(B71data.diameter)*Number(D118)*Number(D118)/16*9.80665/1000);
		D88 = (Number(C119)*1.2*(Number(B71data.diameter)+Number(C117)*2)*Number(C118)*Number(C118)/16*9.80665/1000);
		F88 = (Number(C119)*1.2*(Number(B71data.diameter)+(Number(C117)+5)*2)*Number(C118)*Number(C118)/16*9.80665/1000);
	}
	
	/**
	 * 地线(验算) 后侧地线 JLB20A-100 判断非空
	 */
	if(F78==1){
		G82 = B72data.cross_section_area;
	    G83 = (Number(B72data.unit_weight) * 9.80665);
	    G84 = (G83+0.9*pi*(Number(C117)+5)*((Number(B72data.diameter)+(Number(C117)+5))*9.80665/1000));
	    if(Number(B72data.diameter)<17){
    		getvalue = 1.2;
    	}else{
    		getvalue = 1.1;
    	}
		G85 = (Number(G119)*getvalue*Number(B72data.diameter)*Number(G118)*Number(G118)/16*9.80665/1000);
		G86 = (Number(F119)*getvalue*Number(B72data.diameter)*Number(F118)*Number(F118)/16*9.80665/1000);
		G87 = (Number(D119)*getvalue*Number(B72data.diameter)*Number(D118)*Number(D118)/16*9.80665/1000);
		E88 = (Number(C119)*1.2*(Number(B72data.diameter)+Number(C117)*2)*Number(C118)*Number(C118)/16*9.80665/1000);
		G88 = (Number(C119)*1.2*(Number(B72data.diameter)+(Number(C117)+5)*2)*Number(C118)*Number(C118)/16*9.80665/1000);
	}
	

	/**
	 * P4(N/m)安装时综合荷载
	 */
	B89 = Math.pow(Math.pow(Number(B83),2)+Math.pow(Number(B86),2),0.5);
	C89 = Math.pow(Math.pow(Number(C83),2)+Math.pow(Number(C86),2),0.5);
	D89 = Math.pow(Math.pow(Number(D83),2)+Math.pow(Number(D86),2),0.5);
	E89 = Math.pow(Math.pow(Number(E83),2)+Math.pow(Number(E86),2),0.5);
	F89 = Math.pow(Math.pow(Number(F83),2)+Math.pow(Number(F86),2),0.5);
	G89 = Math.pow(Math.pow(Number(G83),2)+Math.pow(Number(G86),2),0.5);
	
	/**
	 * P4(N/m)大风时综合荷载
	 */
	B90 = Math.pow(Math.pow(Number(B83),2)+Math.pow(Number(B87),2),0.5);
	C90 = Math.pow(Math.pow(Number(C83),2)+Math.pow(Number(C87),2),0.5);
	D90 = Math.pow(Math.pow(Number(D83),2)+Math.pow(Number(D87),2),0.5);
	E90 = Math.pow(Math.pow(Number(E83),2)+Math.pow(Number(E87),2),0.5);
	F90 = Math.pow(Math.pow(Number(F83),2)+Math.pow(Number(F87),2),0.5);
	G90 = Math.pow(Math.pow(Number(G83),2)+Math.pow(Number(G87),2),0.5);
	
	/**
	 * P5(N/m)覆冰时综合荷载
	 */
	B91 = Math.pow(Math.pow(Number(B84),2)+Math.pow(Number(B88),2),0.5);
	C91 = Math.pow(Math.pow(Number(C84),2)+Math.pow(Number(C88),2),0.5);
	D91 = Math.pow(Math.pow(Number(D84),2)+Math.pow(Number(D88),2),0.5);
	E91 = Math.pow(Math.pow(Number(E84),2)+Math.pow(Number(E88),2),0.5);
	F91 = Math.pow(Math.pow(Number(F84),2)+Math.pow(Number(F88),2),0.5);
	G91 = Math.pow(Math.pow(Number(G84),2)+Math.pow(Number(G88),2),0.5);
	
	calcu_horizontalTension();
}