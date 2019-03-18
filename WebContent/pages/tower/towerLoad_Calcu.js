/**
 * 荷载计算过程
 */
// 1.水平荷重计算表(前侧)

//导线 P1= B*Lh*P4(5)*Kz  tr191-tr194
//绝缘子串P2=n*(v/25)^2*p*Kz  tr195-tr197
//跳线串P3=n*(v/25)^2*p*Kz   tr198-tr200
//跳线 P4=B*Lht*P4(5)*Kz/a   tr201-tr203
//地线P5=B*Lh*P4(5)*Kz tr204-tr205
//地线串P6=n*(v/25)^2*p*Kz tr206
//地线(验算) tr207-tr208

//2.水平荷重计算表(后侧)
//导线 P1= B*Lh*P4(5)*Kz  
//绝缘子串P2=n*(v/25)^2*p*Kz  
//跳线串P3=n*(v/25)^2*p*Kz   
//跳线 P4=B*Lht*P4(5)*Kz/a   
//地线P5=B*Lh*P4(5)*Kz 
//地线串P6=n*(v/25)^2*p*Kz 
//地线(验算) tr207-tr208
//位置 B 
//覆冰  C
//大风  D
//低温 E
//安装  F
//v=5m/s G
//断线 	H
//高温 I
function getcount2(){
	//金具（绝缘子金具串,跳线串,间隔棒,防振锤）重量(N)
	//最大垂直荷载---前侧无冰 ( N ) 
	var B100 = Number($(".B100").val());
	var C100 = Number($(".C100").val());
	var E100 = Number($(".E100").val());
	var F100 = Number($(".F100").val());
	var G100 = Number($(".G100").val());
	var C7 =  Number(220);
	B179 = B100;
	C179 = C100;
	D179 = 0;
	if(C7==500){
		D179 = D167*75/55;
	}
	 E179= E100;
	 F179= F100;
	 G179= G100;
	//前侧有冰 ( N )
	B180 = C151*B179;
	C180 = C151*C179;
	D180 = C151*D179;
	E180 = C151*E179;
	F180 = E151*F179;
	G180 = E151*G179;
	//后侧无冰 ( N )
	var B101 = Number($(".B101").val());
	var E101 = Number($(".E101").val());
	var F101 = Number($(".F101").val());
	var G101 = Number($(".G101").val());
	 B181 = B101;
	 C181 = "/";
	 D181 = 0;
	if(C7==500){
		D181 = D168*75/55;
	}
	 E181 = E101;
	 F181 = F101;
	 G181 = G101;
    //后侧有冰 ( N ) 
	 B182 = C156*B181;
	 C182 = "/";
	 D182 = C156*D181;
	 E182 = C156*E181;
	 F182 = E156*F181;
	 G182 = E156*G181;
	
	//最小垂直荷载---前侧无冰 ( N ) 
	 B184 = B100;
	 C184 = C100;
	 D184 = 0;
	if(C7==500){
		D184 = D172*75/55;
	}
	 E184= E100;
	 F184= F100;
	 G184= G100;
	//前侧有冰 ( N )
	 B185 = C151*B184;
	 C185 = C151*C184;
	 D185 = C151*D184;
	 E185 = C151*E184;
	 F185 = E151*F184;
	 G185 = E151*G184;
	//后侧无冰 ( N )
	 B186 = B101;
	 C186 = "/";
	 D186 = 0;
	if(C7==500){
		D186 = D173*75/55;
	}
	 E186 = E101;
	 F186 = F101;
	 G186 = G101;
    //后侧有冰 ( N ) 
	 B187 = C156*B186;
	 C187 = "/";
	 D187 = C156*D186;
	 E187 = C156*E186;
	 F187 = E156*F186;
	 G187 = E156*G186;
	
	
	var D69=$(".D69").val();
	var B54=$(".B54").val();
	var C120=$(".C120").val();
	var D120=$(".D120").val();
	//导线 P1= B*Lh*P4(5)*Kz tr191-tr194
	//Kz=1
	 C191=Number(D69)*Number(B54)*Number(B88)*Number(C120)/2;
	 D191=Number(D69)*Number(B54)*Number(B87)*Number(D120)/2;
	 E191=0;
	 F191=Number(D69)*Number(B54)*Number(B86)/2;
	 G191=Number(D69)*Number(B54)*Number(B85)/2;
	 H191=0;
	 I191=0;
	//上相 
	 C192=Number(C191)*Number(C135);
	 D192=Number(D191)*Number(C135);
	 E192=0;
	 F192=Number(F191)*Number(C135);
	 G192=Number(G191)*Number(C135);
	 H192=0;
	 I192=0;
	//中相
	 C193=Number(C191)*Number(D135);
	 D193=Number(D191)*Number(D135);
	 E193=0;
	 F193=Number(F191)*Number(D135);
	 G193=Number(G191)*Number(D135);
	 H193=0;
	 I193=0;
	//下相
	 C194=Number(C191)*Number(E135);
	 D194=Number(D191)*Number(E135);
	 E194=0;
	 F194=Number(F191)*Number(E135);
	 G194=Number(G191)*Number(E135);
	 H194=0;
	 I194=0;
	
	
	//绝缘子串P2=n*(v/25)^2*p*Kz   tr195-tr197
	//上相
	var B106=$(".B106").val();
	var C50=$(".C50").val();
	var C118=$(".C118").val();
	var D118=$(".D118").val();
	var F118=$(".F118").val();
	var G118=$(".G118").val();
	var C120=$(".C120").val();
	var D120=$(".D120").val();
	var x=Number(C118)/25;
	var y=Number(D118)/25;
	var z=Number(F118)/25;
	var m=Number(G118)/25;
	var x1=Math.pow(x,2);
	var y1=Math.pow(y,2);
	var z1=Math.pow(z,2);
	var m1=Math.pow(m,2);
	 C195=Number(B106)*Number(C50)*x1*Number(B162)*Number(C137)*Number(B163)*Number(C120);
	 D195=Number(B106)*Number(C50)*y1*Number(B162)*Number(C137)*Number(B163)*Number(D120);
	 E195=0;
	 F195=Number(B106)*Number(C50)*z1*Number(B162)*Number(C137)*Number(B163);
	 G195=Number(B106)*Number(C50)*m1*Number(B162)*Number(C137)*Number(B163);
	 H195=0;
	 I195=0;

	//中相
	 C196=Number(B106)*Number(C50)*x1*Number(B162)*Number(D137)*Number(B163)*Number(C120);
	 D196=Number(B106)*Number(C50)*y1*Number(B162)*Number(D137)*Number(B163);
	 E196=0;
	 F196=Number(B106)*Number(C50)*z1*Number(B162)*Number(D137)*Number(B163);
	 G196=Number(B106)*Number(C50)*m1*Number(B162)*Number(D137)*Number(B163);
	 H196=0;
	 I196=0;
	
	//下相
	 C197=Number(B106)*Number(C50)*x1*Number(B162)*Number(E137)*Number(B163)*Number(C120);
	 D197=Number(B106)*Number(C50)*y1*Number(B162)*Number(E137)*Number(B163);
	 E197=0;
	 F197=Number(B106)*Number(C50)*z1*Number(B162)*Number(E137)*Number(B163);
	 G197=Number(B106)*Number(C50)*m1*Number(B162)*Number(E137)*Number(B163);
	 H197=0;
	 I197=0;
	
	//跳线串P3=n*(v/25)^2*p*Kz   tr198-tr200
	//上相
	var D106=$(".D106").val();
	var B76=$(".B76").val();
	var C76=$(".C76").val();
	var D76=$(".D76").val();
	 C198=Number(D106)*Number(B76)*x1*Number(C162)*Number(C138)*Number(C163)*Number(C120);
	 D198=Number(D106)*Number(B76)*y1*Number(C162)*Number(C138)*Number(C163);
	 E198=0;
	 F198=Number(D106)*Number(B76)*z1*Number(C162)*Number(C138)*Number(C163);
	 G198=Number(D106)*Number(B76)*m1*Number(C162)*Number(C138)*Number(C163);
	 H198=0;
	 I198=0;
	//中相
	 C199=Number(D106)*Number(C76)*x1*Number(C162)*Number(D138)*Number(C163)*Number(C120);
	 D199=Number(D106)*Number(C76)*y1*Number(C162)*Number(D138)*Number(C163);
	 E199=0;
	 F199=Number(D106)*Number(C76)*z1*Number(C162)*Number(D138)*Number(C163);
	 G199=Number(D106)*Number(C76)*m1*Number(C162)*Number(D138)*Number(C163);
	 H199=0;
	 I199=0;
	//下相
	 C200=Number(D106)*Number(D76)*x1*Number(C162)*Number(E138)*Number(C163)*Number(C120);
	 D200=Number(D106)*Number(D76)*y1*Number(C162)*Number(E138)*Number(C163);
	 E200=0;
	 F200=Number(D106)*Number(D76)*z1*Number(C162)*Number(E138)*Number(C163);
	 G200=Number(D106)*Number(D76)*m1*Number(C162)*Number(E138)*Number(C163);
	 H200=0;
	 I200=0;
	
	//跳线 P4=B*Lht*P4(5)*Kz/a   tr201-tr203
	//上相
	var E76=$(".E76").val();
	var B57=$(".B57").val();
	var D119=$(".D119").val();
	var D120=$(".D120").val();
	 C201=Number(E76)*Number(B57)*Number(B88)*Number(C138)*Number(C120);
	 D201=Number(E76)*Number(B57)*Number(B87)*Number(C138)*Number(D120)/Number(D119);
	 E201=0;
	 F201=Number(E76)*Number(B57)*Number(B86)*Number(C138);
	 G201=Number(E76)*Number(B57)*Number(B85)*Number(C138);
	 H201=0;
	 I201=0;
	
	//中相
	 C202=Number(E76)*Number(B57)*Number(B88)*Number(D138)*Number(C120);
	 D202=Number(E76)*Number(B57)*Number(B87)*Number(D138)*Number(D120)/Number(D119);
	 E202=0;
	 F202=Number(E76)*Number(B57)*Number(B86)*Number(D138);
	 G202=Number(E76)*Number(B57)*Number(B85)*Number(D138);
	 H202=0;
	 I202=0;
	//下相
	 C203=Number(E76)*Number(B57)*Number(B88)*Number(E138)*Number(C120);
	 D203=Number(E76)*Number(B57)*Number(B87)*Number(E138)*Number(D120)/Number(D119);
	 E203=0;
	 F203=Number(E76)*Number(B57)*Number(B86)*Number(E138);
	 G203=Number(E76)*Number(B57)*Number(B85)*Number(E138);
	 H203=0;
	 I203=0;
	
	//地线P5=B*Lh*P4(5)*Kz tr204-tr205
	//Kz=1
	var B54=$(".B54").val();
	 C204=Number(B54)*Number(D88)*Number(C120)*1.1/2;
	 D204=Number(B54)*Number(D87)*Number(D120)/2;
	 E204=0;
	 F204=Number(B54)*Number(D86)/2;
	 G204=Number(B54)*Number(D85)/2;
	 H204=0;
	 I204=0;
	
	//Kz
	 C205=Number(C204)*Number(B135);
	 D205=Number(D204)*Number(B135);
	 E205=0;
	 F205=Number(F204)*Number(B135);
	 G205=Number(G204)*Number(B135);
	 H205=0;
	 I205=0;
	
	//地线串P6=n*(v/25)^2*p*Kz tr206
	//Kz
	var F106=$(".F106").val();
	 C206=Number(F106)*x1*Number(D162)*Number(B137)*Number(C120)*1.1;
	 D206=Number(F106)*y1*Number(D162)*Number(B137);
	 E206=0;
	 F206=Number(F106)*z1*Number(D162)*Number(B137);
	 G206=Number(F106)*m1*Number(D162)*Number(B137);
	 H206=0;
	 I206=0;
	
	//地线（验算）
	//Kz=1

	 E207=0;
	 H207=0;
	 I207=0;
	
	if(F78==1){
		C207=Number(B54)*Number(F88)*Number(C120)*1.1/2;
		D207=Number(B54)*Number(F87)*Number(C120)/2;
		F207=Number(B54)*Number(F86)/2;
		G207=Number(B54)*Number(F85)/2;
	}else{
		C207=0;
		D207=0;
		F207=0;
		G207=0;
	}
	
	//Kz
	 C208=Number(C207)*Number(B135);
	 D208=Number(D207)*Number(B135);
	 E208=Number(E207)*Number(B135);
	 F208=Number(F207)*Number(B135);
	 G208=Number(G207)*Number(B135);
	 H208=0;
	 I208=0;
	
	
	
	
	//水平荷重计算表（后侧）
	//导线 P1= B*Lh*P4(5)*Kz tr212-tr215
	//Kz=1
	var C128=$(".C128").val();
	var D128=$(".D128").val();
	var D70=$(".D70").val();
	var E54=$(".E54").val();
	 C212=Number(D70)*Number(E54)*Number(C88)*Number(C128)/2;
	 D212=Number(D70)*Number(E54)*Number(C87)*Number(D128)/2;
	 E212=0;
	 F212=Number(D70)*Number(E54)*Number(C86)/2;
	 G212=Number(D70)*Number(E54)*Number(C85)/2;
	 H212=0;
	 I212=0;
	//上相
	 C213=Number(C212)*Number(C143);
	 D213=Number(D212)*Number(C143);
	 E213=0;
	 F213=Number(F212)*Number(C143);
	 G213=Number(G212)*Number(C143);
	 H213=0;
	 I213=0;
	//中相
	 C214=Number(C212)*Number(D143);
	 D214=Number(D212)*Number(D143);
	 E214=0;
	 F214=Number(F212)*Number(D143);
	 G214=Number(G212)*Number(D143);
	 H214=0;
	 I214=0;
	//下相
	 C215=Number(C212)*Number(E143);
	 D215=Number(D212)*Number(E143);
	 E215=0;
	 F215=Number(F212)*Number(E143);
	 G215=Number(G212)*Number(E143);
	 H215=0;
	 I215=0;
	//绝缘子串P2=n*(v/25)^2*p*Kz tr216-tr218
	//上相
	var C126=$(".C126").val();
	var D126=$(".D126").val();
	var F126=$(".F126").val();
	var G126=$(".G126").val();
	var B111=$(".B111").val();
	
	var a=Number(C126)/25;
	var b=Number(D126)/25;
	var c=Number(F126)/25;
	var d=Number(G126)/25;
	var a1=Math.pow(a,2);
	var b1=Math.pow(b,2);
	var c1=Math.pow(c,2);
	var d1=Math.pow(d,2);
	 C216=Number(B111)*Number(C50)*a1*Number(B162)*Number(C145)*Number(B163)*Number(C128);
	 D216=Number(B111)*Number(C50)*b1*Number(B162)*Number(C145)*Number(B163)*Number(D128);
	 E216=0;
	 F216=Number(B111)*Number(C50)*c1*Number(B162)*Number(C145)*Number(B163);
	 G216=Number(B111)*Number(C50)*d1*Number(B162)*Number(C145)*Number(B163);
	 H216=0;
	 I216=0;
	
	//中相
	 C217=Number(B111)*Number(C50)*a1*Number(B162)*Number(D145)*Number(B163)*Number(C128);
	 D217=Number(B111)*Number(C50)*b1*Number(B162)*Number(D145)*Number(B163)*Number(D128);
	 E217=0;
	 F217=Number(B111)*Number(C50)*c1*Number(B162)*Number(D145)*Number(B163);
	 G217=Number(B111)*Number(C50)*d1*Number(B162)*Number(D145)*Number(B163);
	 H217=0;
	 I217=0;
	
	//下相
	 C218=Number(B111)*Number(C50)*a1*Number(B162)*Number(E145)*Number(B163)*Number(C128);
	 D218=Number(B111)*Number(C50)*b1*Number(B162)*Number(E145)*Number(B163)*Number(D128);
	 E218=0;
	 F218=Number(B111)*Number(C50)*c1*Number(B162)*Number(E145)*Number(B163);
	 G218=Number(B111)*Number(C50)*d1*Number(B162)*Number(E145)*Number(B163);
	 H218=0;
	 I218=0;
	
	//跳线串P3=n*(v/25)^2*p*Kz  tr219-tr221
	//上相
	var D111=$(".D111").val();
	
	 C219=Number(D111)*Number(B76)*a1*Number(C162)*Number(C146)*Number(C163)*Number(C128);
	 D219=Number(D111)*Number(B76)*b1*Number(C162)*Number(C146)*Number(C163)*Number(D128);
	 E219=0;
	 F219=Number(D111)*Number(B76)*c1*Number(C162)*Number(C146)*Number(C163);
	 G219=Number(D111)*Number(B76)*d1*Number(C162)*Number(C146)*Number(C163);
	 H219=0;
	 I219=0;
	
	//中相
	 C220=Number(D111)*Number(C76)*a1*Number(C162)*Number(D146)*Number(C163)*Number(C128);
	 D220=Number(D111)*Number(C76)*b1*Number(C162)*Number(D146)*Number(C163)*Number(D128);
	 E220=0;
	 F220=Number(D111)*Number(C76)*c1*Number(C162)*Number(D146)*Number(C163);
	 G220=Number(D111)*Number(C76)*d1*Number(C162)*Number(D146)*Number(C163);
	 H220=0;
	 I220=0;
	//下相
	 C221=Number(D111)*Number(D76)*a1*Number(C162)*Number(E146)*Number(C163)*Number(C128);
	 D221=Number(D111)*Number(D76)*b1*Number(C162)*Number(E146)*Number(C163)*Number(D128);
	 E221=0;
	 F221=Number(D111)*Number(D76)*c1*Number(C162)*Number(E146)*Number(C163);
	 G221=Number(D111)*Number(D76)*d1*Number(C162)*Number(E146)*Number(C163);
	 H221=0;
	 I221=0;
	
	//跳线 P4=B*Lht*P4(5)*Kz/a tr222-tr224
	//上相
	var D127=$(".D127").val();
	 C222=Number(E76)*Number(B57)*Number(C88)*Number(C146)*Number(C128);
	 D222=Number(E76)*Number(B57)*Number(C87)*Number(C146)*Number(D128)/Number(D127);
	 E222=0;
	 F222=Number(E76)*Number(B57)*Number(C86)*Number(C146);
	 G222=Number(E76)*Number(B57)*Number(C85)*Number(C146);
	 H222=0;
	 I222=0;
	//中相
	 C223=Number(E76)*Number(B57)*Number(C88)*Number(D146)*Number(C128);
	 D223=Number(E76)*Number(B57)*Number(C87)*Number(D146)*Number(D128)/Number(D127);
	 E223=0;
	 F223=Number(E76)*Number(B57)*Number(C86)*Number(D146);
	 G223=Number(E76)*Number(B57)*Number(C85)*Number(D146);
	 H223=0;
	 I223=0;
	
	//下相
	 C224=Number(E76)*Number(B57)*Number(C88)*Number(E146)*Number(C128);
	 D224=Number(E76)*Number(B57)*Number(C87)*Number(E146)*Number(D128)/Number(D127);
	 E224=0;
	 F224=Number(E76)*Number(B57)*Number(C86)*Number(E146);
	 G224=Number(E76)*Number(B57)*Number(C85)*Number(E146);
	 H224=0;
	 I224=0;
	
	
	//地线P5=B*Lh*P4(5)*Kz  tr225-tr226
	//Kz=1
	 C225=Number(E54)*Number(E88)*Number(C128)*1.1/2;
	 D225=Number(E54)*Number(E87)*Number(D128)/2;
	 E225=0;
	 F225=Number(E54)*Number(E86)/2;
	 G225=Number(E54)*Number(E85)/2;
	 H225=0;
	 I225=0;
	
	//Kz
	 C226=Number(C225)*Number(B143);
	 D226=Number(D225)*Number(B143);
	 E226=0;
	 F226=Number(F225)*Number(B143);
	 G226=Number(G225)*Number(B143);
	 H226=0;
	 I226=0;
	
	//地线串P6=n*(v/25)^2*p*Kz tr 227
	//Kz
	var F111=$(".F111").val();
	 C227=Number(F111)*a1*Number(B145)*Number(D162)*Number(C120)*1.1;
	 D227=Number(F111)*b1*Number(B145)*Number(D162)*Number(D120);
	 E227=0;
	 F227=Number(F111)*c1*Number(B145)*Number(D162);
	 G227=Number(F111)*d1*Number(B145)*Number(D162);
	 H227=0;
	 I227=0;
	
	//地线（验算）
	//Kz=1

	 E228=0;
	 H228=0;
	 I228=0;
	
	if(F78==1){
		C228=Number(E54)*Number(G88)*Number(C128)*1.1/2;
		D228=Number(E54)*Number(G87)*Number(C128)/2;
		F228=Number(E54)*Number(G86)/2;
		G228=Number(E54)*Number(G85)/2;
	}else{
		C228=0;
		D228=0;
		F228=0;
		G228=0;
	}
	
	//Kz
	 C229=Number(C228)*Number(B143);
	 D229=Number(D228)*Number(B143);
	 E229=Number(E228)*Number(B135);
	 F229=Number(F228)*Number(B143);
	 G229=Number(G228)*Number(B143);
	 H229=0;
	 I229=0;
	 
	 getcount3();
	
}