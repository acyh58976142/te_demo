/**
 * 结构数据js
 */
var zcell = null;
var jsonTop=[
	    ["电压等级(kv)","基础上拨力分布代号","Tmax","Tx","Ty","Nmax","Nx","Ny"],
	    ["110(66)","100","100","14","14","130","18","18"],
	    ["110(66)","150","150","21","21","195","27","27"],
	    ["110(66)","200","200","28","28","260","36","36"],
	    ["110(66)","250","250","35","35","325","46","46"],
	    ["110(66)","300","300","42","42","390","55","55"],
	    ["110(66)","350","350","49","49","455","64","64"],
	    ["110(66)","400","400","56","56","520","73","73"],
	    ["110(66)","450","450","63","63","585","82","82"],
	    ["110(66)","500","500","70","70","650","91","91"],
	    ["110(66)","550","550","77","77","715","100","100"],
	    ["110(66)","600","600","84","84","780","109","109"],
	    ["220(330)","700","700","98","98","910","127","127"],
	    ["220(330)","800","800","112","112","1040","146","146"],
	    ["220(330)","900","900","126","126","1170","164","164"],
	    ["220(330)","1000","1000","140","140","1300","182","182"],
	    ["500(750)","1200","1200","168","168","1560","218","218"],
	    ["500(750)","1400","1400","196","196","1820","255","255"],
	    ["500(750)","1600","1600","224","224","2080","291","291"],
	    ["500(750)","1800","1800","252","252","2340","328","328"],
	    ["500(750)","2000","2000","280","280","2600","364","364"],
	    ["500(750)","2200","2200","308","308","2860","400","400"],
	    ["500(750)","2400","2400","336","336","3120","437","437"],
	    ["500(750)","2600","2600","364","364","3380","473","473"],
	    ["500(750)","2800","2800","392","392","3640","510","510"],
	    ["500(750)","3000","3000","420","420","3900","546","546"]
	]

$(function(){
	var winHeight = window.innerHeight;//浏览器页面的高
	var heights = winHeight-45;
	$("#cellContainer").css({"height":heights+"px"});//整个中部界面的高
	
	//创建智表对象
	zcell = new ZCell(document.getElementById("cellContainer"));
	// 创建表，并指定列，行数
	zcell.InserSheet(0, 8,25);
	zcell.GetSheet(0).LoadArrData(jsonTop);
	mergeCells();
})



/**
 * 合并单元格
 * @returns
 */
function mergeCells(){
	var sheet=zcell.GetSheet(0);
	sheet.MergeCells(1,2,1,12);
	sheet.MergeCells(1,13,1,16);
	sheet.MergeCells(1,17,1,25);
}



