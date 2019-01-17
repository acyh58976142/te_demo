/**
 * 荷载计算过程
 */

// 1.绝缘子,间隔棒,防振锤覆冰系数K(前侧)
//覆冰厚度 c ( mm ) tr149
//系数 k  tr150
//选择覆冰系数   tr151
//B 5
//C 10
//D 15
//E 20
//F 30

// 2.各状态垂直档距表
//最大垂直档距
//前侧导线  Lvx1   tr167
//后侧导线  Lvx2   tr168
//前侧地线  Lvx1   tr169
//后侧地线  Lvx2   tr170

//高温  B
//覆冰  C
//大风  D
//低温 E
//安装  F
//v=5m/s G
//断线 	H

function getcount1(){	
	
	
	
	var B46=$(".B46").val();
	var C46=$(".C46").val();
	var D46=$(".D46").val();
	var E46=$(".E46").val();
	var B48=$(".B48").val();
	var C48=$(".C48").val();
	var B95=$(".B95").val();
	var D95=$(".D95").val();
	
	//米呼高平均悬挂点高度(前侧)
	B134=Number(B46)+Number(C46)+Number(D46)+Number(E46)-Number(C48)-2*Number(D95)/3;
	var num=Number(B46)-Number(B48)-2*Number(B95)/3;
	if(num<15){
		E134=15;
	}else{
		E134=num;
	}
	D134=E134+Number(C46);
	C134=D134+Number(D46);
	//导,地线风速高度变化系数 (前侧)
	var C121=Number($(".C121").val());
	var x=B134/15;
	var y=C134/15;
	var z=D134/15;
	var z1=E134/15;
	if(C121==1){//地面粗糙度类别(1-陆地 2-海岛 3-城市)
		B135=Math.pow(x,0.32);
		C135=Math.pow(y,0.32);
		D135=Math.pow(z,0.32);
		E135=Math.pow(z1,0.32);
	} else if(C121==2){
		B135=Math.pow(x,0.24);
		C135=Math.pow(y,0.24);
		D135=Math.pow(z,0.24);
		E135=Math.pow(z1,0.24);
	}else{
		B135=Math.pow(x,0.4);
		C135=Math.pow(y,0.4);
		D135=Math.pow(z,0.4);
		E135=Math.pow(z1,0.4);
	}
	
	//导地线绝缘子串挂点高(前侧)
	B136=Number(B46)+Number(C46)+Number(D46)+Number(E46)-Number(C48)/2;
	E136=Number(B46)-Number(B48)/2;
	C136=Number(E136)+Number(C46)+Number(D46);
	D136=Number(E136)+Number(C46);
	
	//导,地线绝缘子串(前侧)
	var x=B136/15;
	var y=C136/15;
	var z=D136/15;
	var z1=E136/15;
	if(C121==1){//地面粗糙度类别(1-陆地 2-海岛 3-城市)
		B137=Math.pow(x,0.32);
		C137=Math.pow(y,0.32);
		D137=Math.pow(z,0.32);
		E137=Math.pow(z1,0.32);
	} else if(C121==2){
		B137=Math.pow(x,0.24);
		C137=Math.pow(y,0.24);
		D137=Math.pow(z,0.24);
		E137=Math.pow(z1,0.24);
	}else{
		B137=Math.pow(x,0.4);
		C137=Math.pow(y,0.4);
		D137=Math.pow(z,0.4);
		E137=Math.pow(z1,0.4);
	}
	
	//跳线绝缘子串(前侧)
	var B44 = Number($(".B44").val());
	C138 = C137;
	if(B44==1){
		C138 = B137;
	}
	 D138 = D137;
	 E138 = E137;
	
	//米呼高平均悬挂点高度(后侧)
	var E95=Number($(".E95").val());
	var C95=Number($(".C95").val());
	 B142=Number(B46)+Number(C46)+Number(D46)+Number(E46)-Number(C48)-2*Number(E95)/3;
	var num=Number(B46)-Number(B48)-2*Number(C95)/3;
	E142=num;
	if(num<15){
		E142=15;
	}
	 D142=E142+Number(C46);
	 C142=D142+Number(D46);
	
	//导,地线风速高度变化系数 (后侧)
	var C129=Number($(".C129").val());
	var x=B142/15;
	var y=C142/15;
	var z=D142/15;
	var z1=E142/15;
	if(C129==1){//地面粗糙度类别(1-陆地 2-海岛 3-城市)
		B143=Math.pow(x,0.32);
		C143=Math.pow(y,0.32);
		D143=Math.pow(z,0.32);
		E143=Math.pow(z1,0.32);
	} else if(C129==2){
		B143=Math.pow(x,0.24);
		C143=Math.pow(y,0.24);
		D143=Math.pow(z,0.24);
		E143=Math.pow(z1,0.24);
	}else{
		B143=Math.pow(x,0.4);
		C143=Math.pow(y,0.4);
		D143=Math.pow(z,0.4);
		E143=Math.pow(z1,0.4);
	}
	
	//导地线绝缘子串挂点高(后侧)
	 B144=Number(B46)+Number(C46)+Number(D46)+Number(E46)-Number(C48)/2;
	 E144=Number(B46)-Number(B48)/2;
	 C144=Number(E144)+Number(C46)+Number(D46);
	 D144=Number(E144)+Number(C46);
	
	//导,地线绝缘子串(后侧)
	var x=B144/15;
	var y=C144/15;
	var z=D144/15;
	var z1=E144/15;
	if(C129==1){//地面粗糙度类别(1-陆地 2-海岛 3-城市)
		B145=Math.pow(x,0.32);
		C145=Math.pow(y,0.32);
		D145=Math.pow(z,0.32);
		E145=Math.pow(z1,0.32);
	} else if(C129==2){
		B145=Math.pow(x,0.24);
		C145=Math.pow(y,0.24);
		D145=Math.pow(z,0.24);
		E145=Math.pow(z1,0.24);
	}else{
		B145=Math.pow(x,0.4);
		C145=Math.pow(y,0.4);
		D145=Math.pow(z,0.4);
		E145=Math.pow(z1,0.4);
	}
	
	//跳线绝缘子串(后侧)
	var B44 = Number($(".B44").val());
	 C146 = C145;
	if(B44==1){
		C146 = B145;
	}
	D146 = D145;
	E146 = E145;
	
//绝缘子,间隔棒,防振锤覆冰系数K(前侧):
	

	var C117=$(".C117").val();
	
	//系数k
	 B150=1+(Number(B149)/5)*0.075;
	 C150=1+(Number(C149)/5)*0.075;
	 D150=1+(Number(D149)/5)*0.075;
	 E150=1+(Number(E149)/5)*0.075;
	 F150=1+(Number(F149)/5)*0.075;
	 
	 B151="导线";
	if(C117>E149){
		C151=E150;
	}else if(C117==B149||C117==C149||C117==D149||C117==E149){
		C151=1+(Number(C117)/5)*0.075;
	}
	D151="地线";
	m=Number(C117)+5;
	if(m>E149){
		E151=E150;
	}else if(m==B149||m==C149||m==D149||m==E149){
		E151=1+(m/5)*0.075;
	}
	
	
	//绝缘子,间隔棒,防振锤覆冰系数K(后侧)
	//系数K
	B155=1+(Number(B154)/5)*0.075;
	C155=1+(Number(C154)/5)*0.075;
	 D155=1+(Number(D154)/5)*0.075;
	 E155=1+(Number(E154)/5)*0.075;
	 F155=1+(Number(F154)/5)*0.075;
	
	//选择覆冰系数
	var C125=$(".C125").val();
	B156="导线";
	
	if(C125>E154){
		C156=E155;
	}else if(C125==B154){
		C156=B155;
	}else if(C125==C154){
		C156=C155;
	}else if (C125==D154){
		C156=D155;
	}else if(C125==E154){
		C156=E155;
	}
	 D156="地线";
	var n=Number(C125)+5;
	if(n>E154){
		E156=E155;
	}else if(n==B154){
		E156=B155;
	}else if(n==C154){
		E156=C155;
	}else if(n==D154){
		E156=D155;
	}else if(n==E154){
		E156=E155;
	}
	
	
	
	// 1.各状态垂直档距表
	//最大垂直档距 tr167-tr170
	var B52=$(".B52").val();
	var B54=$(".B54").val();
	var B61=$(".B61").val();

	//前侧导线Lvx1
	B167=Number(B52);
	var num=Number(B54)/2+Number(B61)*Number(C349)/Number(B91)*1.1;
	C167=num;
	D167=Number(B54)/2+Number(B61)*Number(D349)/Number(B90)*1.1;
	E167=Number(B54)/2+Number(B61)*Number(E349)/Number(B83)*1.1;
	F167=Number(B54)/2+Number(B61)*Number(F349)/Number(B89)*1.1;
	G167=Number(B54)/2+Number(B61)*Number(G349)/Number(B83)*1.1;
	H167=num;
	
	
	//后侧导线Lvx2
	var B53=$(".B53").val();
	var E54=$(".E54").val();
	var C61=$(".C61").val();
	
	
	B168=Number(B53);
	C168=Number(E54)/2+Number(C61)*Number(D350)/Number(C91);
	D168=Number(E54)/2+Number(C61)*Number(D350)/Number(C90);
	E168=Number(E54)/2+Number(C61)*Number(E350)/Number(C83);
	F168=Number(E54)/2+Number(C61)*Number(F350)/Number(C89);
	G168=Number(E54)/2+Number(C61)*Number(G350)/Number(C83);
	H168=C168; 
	
	//前侧地线 Lvx1
	var D61=$(".D61").val();
	
	 B169=Number(B52)*1.1;
	 C169=Number(B54)/2+Number(D61)*Number(C353)/Number(D91)*1.1;
	 D169=Number(B54)/2+Number(D61)*Number(D353)/Number(D90)*1.1;
	 E169=Number(B54)/2+Number(D61)/Number(D83)*Number(E353)*1.1;
	 F169=Number(B54)/2+Number(D61)/Number(D89)*Number(F353)*1.1;
	 G169=Number(B54)/2+Number(D61)/Number(D83)*Number(G353)*1.1;
	 H169=C169; 
	
	//后侧地线Lvx2
	var E61=$(".E61").val();
	
	
	 B170=Number(B53)*1.1;
	 C170=Number(E54)/2+Number(E61)*Number(D354)/Number(E91)*1.1;
	 D170=Number(E54)/2+Number(E61)/Number(E90)*Number(D354)*1.1;
	 E170=Number(E54)/2+Number(E61)/Number(E83)*Number(E354)*1.1;
	 F170=Number(E54)/2+Number(E61)/Number(E89)*Number(F354)*1.1;
	 G170=Number(E54)/2+Number(E61)/Number(E83)*Number(G354)*1.1;
	 H170=C170; 
	
	
	//最小垂直档距 tr172- tr175
	//前侧导线Lvn1
	var E52 = $(".E52").val();
	 B172=Number(E52);
	 C172=Number(B54)/2+Number(B61)*Number(C349)/Number(B91)*0.9;
	 D172=Number(B54)/2+Number(B61)*Number(D349)/Number(B90)*0.9;
	 E172=Number(B54)/2+Number(B61)*Number(E349)/Number(B83)*0.9;
	 F172=Number(B54)/2+Number(B61)*Number(F349)/Number(B89)*0.9;
	 G172=Number(B54)/2+Number(B61)*Number(G349)/Number(B83)*0.9;
	 H172=C172;
	
	//后侧导线Lvn2
	var E53 = $(".E53").val();
	 B173=Number(E53);
	 C173=Number(E54)/2+Number(C61)*Number(D350)/Number(C91)*0.9;
	 D173=Number(E54)/2+Number(C61)*Number(D350)/Number(C90)*0.9;
	 E173=Number(E54)/2+Number(C61)*Number(E350)/Number(C83)*0.9;
	 F173=Number(E54)/2+Number(C61)*Number(F350)/Number(C89)*0.9;
	 G173=Number(E54)/2+Number(C61)*Number(G350)/Number(C83)*0.9;
	 H173=C173; 
	
	
	//前侧地线Lvn1
	
	 B174=Number(E52)*1.1;
	 C174=Number(B54)/2+Number(D61)*Number(C353)/Number(D91)*0.9;
	 D174=Number(B54)/2+Number(D61)*Number(D353)/Number(D90)*0.9;
	 E174=Number(B54)/2+Number(D61)/Number(D83)*Number(E353)*0.9;
	 F174=Number(B54)/2+Number(D61)/Number(D89)*Number(F353)*0.9;
	 G174=Number(B54)/2+Number(D61)/Number(D83)*Number(G353)*0.9;
	 H174=C174; 
	
	
	//后侧地线Lvn2
	
	 B175=Number(E53)/1.1;
	 C175=Number(E54)/2+Number(E61)*Number(D354)/Number(E91)*0.9;
	 D175=Number(E54)/2+Number(E61)/Number(E90)*Number(D354)*0.9;
	 E175=Number(E54)/2+Number(E61)/Number(E83)*Number(E354)*0.9;
	 F175=Number(E54)/2+Number(E61)/Number(E89)*Number(F354)*0.9;
	 G175=Number(E54)/2+Number(E61)/Number(E83)*Number(G354)*0.9;
	 H175=C175; 
	
	 getcount2();
	
}