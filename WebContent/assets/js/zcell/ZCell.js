/**
 * 版权声明： 智表（ZCELL）研发团队保留所有权利，未经明确的书面许可，不得修改本文档，或以任何形式或任何手段复制产品的任何部分，进行商业用途。
 * 如需购买 请联系 邮件：108653210@qq.com
 * Version: 1.4.0
 * Create by zf  2018/8/23.
 */
"use strict";
var zc, zce, zv, zr, zcev = "V1.4.0";
zr = ["E62327FA26A2E37F69062528CDE4B0E0"];
function ZCell(O7495) {
    var O186b = new StringBuffer();
    O186b.zfappend();
    O186b.zfappend("<div style='overflow: auto; height: 100%;width: 100%; border: 0px solid red' >");
    O186b.zfappend("<table>");
    O186b.zfappend("<tr><td id='zfbooktd' ></td></tr>");
    O186b.zfappend("<tr><td id='zfstatd'></td></tr>");
    O186b.zfappend("</table></div>");
    ZCell.offsetpx = 1;
    $(O7495).html(O186b.toString());
    this.OutContainer = $('#zfbooktd');
    this.bookdiv = ($("<div id ='bookdiv' class=\"book\"></div>"))[0];
    this.Sheets = [];
    this.CurrentSheet = null;
    ZCell.jsyz = 0;
    this.offpriv = 1;
    zv = zr[0];
    zc = zr[1];
    zce = zr;
    if (zc != undefined && zc != "E62327FA26A2E37F69062528CDE4B0E0" && zv != undefined) {
        ZCell.jsyz = 1
    }
    ;this.OutContainer.append(this.bookdiv);
    this.Editors = [];
    this.EditorsDiv = null;
    this.InitEditors();
    _initTipBar(this.OutContainer);
    _initStatuBar(this, $('#zfstatd'));
    this.dragline = $("#zcell_dragline");
    if (this.dragline.length == 0) {
        this.dragline = $("<div id=\"zcell_dragline\" class='zcell_dragline'></div>")
    }
    ;this.OutContainer.append(this.dragline)
}
;function _initStatuBar(e4a85, be60d) {
    $("#statuBardiv").remove();
    var O11c1 = null;
    O11c1 = ($("<div id ='statuBardiv' class='.book div:after'></div>"))[0];
    var O186b = new StringBuffer();
    O186b.zfappend();
    O186b.zfappend("<table id='tb_stabar' style='table-layout:fixed;'   width='550px'>");
    O186b.zfappend("<tr>");
    ;O186b.zfappend("<td class='td-stbar-cal' width='20px' align='right'> ★</td>");
    O186b.zfappend("<td id='caldiv' width='300px'  class='td-stbar-cal'>");
    ZCell.offsetpx = 0;
    O186b.zfappend("</td>");
    O186b.zfappend("</tr>");
    O186b.zfappend("</table>");
    $(O11c1).html(O186b.toString());
    be60d.append(O11c1)
}
;function _initTipBar(be60d) {
    var O11c1 = ($("<div id=\"ZCELLtipDiv\" style=\"position: absolute; background-color: white; border: 1px solid darkorange;display: none ;\"></div>"))[0];
    be60d.append(O11c1)
}
;function _initResizeLine(be60d) {
    this.resize_line = $("#sheet_resize_line");
    if (this.resize_line.length == 0) {
        this.resize_line = $("<div id=\"sheet_resize_line\"></div>")
    }
    ;this.div.prepend(this.resize_line)
}
;function _bingDropdownsource(a, b, c) {
    var f, d = [], e = {};
    for (f in b)
        d.length >= 3 && (void 0 == c.Sheet.Zcell.offpriv || 1 == c.Sheet.Zcell.offpriv) || (e = b[f],
        d.push('<a key="' + f + '"  >' + e + "</a>"));
    a.html(d.join(" ")),
    a.find("a").unbind("click").click(function(b) {
        a.retval = $(b.target).attr("key"),
        a.ZCell.stopEditCell()
    })
}
ZCell.prototype.InitEditors = function() {
    var a, b;
    this.EditorsDiv = $('<div id="ZCELLEditorDiv"  class="cell_editor" ></div>'),
    this.OutContainer.append(this.EditorsDiv),
    void 0 != zc && zce.indexOf(hex_md5(zc + getRoot()).toUpperCase()) > -1 && hex_md5(zcev).toUpperCase() == zv && void 0 != zv && (this.offpriv = 0),
    a = $('<div id="text_editor"  class="text_editor"  contenteditable="true"></div>'),
    a.onStartEdit = function(a, b) {
        $(a).attr("status", "edit"),
        this.focus(),
        this.width($(a).width() - 0),
        a.cellType && a.cellType.formula_expression ? this.html("=" + a.cellType.formula_expression) : b ? this.html(a.Value) : this.html("")
    }
    ,
    a.onStopEdit = function(a) {
        var c, d, e, b = this.html();
        return b = b.replace(/\r\n/g, ""),
        b = b.replace(/\n/g, ""),
        b = b.replace(/<br>/g, ""),
        c = b,
        d = c.slice(0, 1),
        e = {
            code: "text"
        },
        "=" == d && (c = c.slice(1),
        c = c.toUpperCase(),
        e = {
            code: "text",
            formula_expression: c
        }),
        _SetCellType(a, e),
        _SetCellValue(a, b),
        this.html(""),
        this.hide(),
        $(a).attr("status", "read"),
        this.blur(),
        !0
    }
    ,
    this.RegEditor("text", a),
    b = $('<p    class="dropdown_editor"></p>'),
    b.onStartEdit = function(a, b) {
        $(a).attr("status", "edit"),
        this.focus(),
        this.width($(a).width() - 0);
        var c = _GetCellType(a);
        "dropdown" == c.code && _bingDropdownsource(this, c.source, a)
    }
    ,
    b.onStopEdit = function(a) {
        var b = this.retval;
        return void 0 != b && (b = b.replace(/\r\n/g, ""),
        b = b.replace(/\n/g, ""),
        _SetCellValue(a, b)),
        this.html(""),
        this.hide(),
        $(a).attr("status", "read"),
        this.blur(),
        !0
    }
    ,
    this.RegEditor("dropdown", b)
}
;
ZCell.prototype.RegEditor = function(O3e65, daeff) {
    daeff.hide();
    this.Editors[O3e65] = daeff;
    this.EditorsDiv.append(daeff)
}
;
ZCell.prototype.getCellEditor = function(O9938) {
    var O7ff7 = _GetCellType(O9938);
    return this.Editors[O7ff7.code]
}
;
ZCell.prototype.stopEditCell = function() {
    if (this.EditorsDiv.td) {
        var O9938 = this.EditorsDiv.td;
        var daeff = this.getCellEditor(O9938);
        if (daeff && daeff.onStopEdit(O9938)) {
            this.EditorsDiv.td = null;
            this.EditorsDiv.hide();
        }
    }
}
;
ZCell.prototype.startEditCell = function(O9938, c473a) {
    if (O9938.readonly == "1")
        return;
    var O3e65 = _GetCellType(O9938);
    if (O3e65.code == "object")
        return;
    if (O3e65.code == "checkbox") {
        var O81bf = $(O9938).find("input:checked").length > 0 ? 1 : 0;
        _SetCellValue(O9938, O81bf);
        return
    }
    ;var daeff = this.getCellEditor(O9938);
    if (daeff) {
        this.EditorsDiv.td = O9938;
        daeff.ZCell = this;
        this.EditorsDiv.width($(O9938).width() + 0);
        this.EditorsDiv.height($(O9938).height() + 0);
        this.EditorsDiv.show();
        var O14f7 = $(O9938).offset().left;
        var O2b69 = $(O9938).offset().top;
        this.EditorsDiv.css("left", O14f7);
        this.EditorsDiv.css("top", O2b69 - 50);
        daeff.show();
        daeff.onStartEdit(O9938, c473a);
    }
}
;
ZCell.prototype.InserSheet = function(O70b9, O9fd6, O2dde) {
    if (O70b9 == undefined) {
        alert("创建时必须指定位置索引");
        return
    }
    ;if (O2dde == undefined || O9fd6 == undefined) {
        alert("创建时必须指定行数和列数");
        return
    }
    ;if (O2dde < 1 || O9fd6 < 1) {
        alert("行数和列数必须大于1");
        return
    }
    ;var f2a08 = new Sheet(this.bookdiv,O2dde,O9fd6);
    this.CurrentSheet = f2a08;
    f2a08.Zcell = this;
    $("#" + f2a08.id).attr("id", "Sheet" + (this.Sheets.length + 1));
    f2a08.id = "Sheet" + (this.Sheets.length + 1);
    this.Sheets.splice(O70b9, 0, f2a08)
}
;
ZCell.prototype.GetSheet = function(O70b9) {
    return this.Sheets[O70b9]
}
;
ZCell.prototype.DeleteSheet = function(O70b9) {
    $("#" + this.Sheets[O70b9].id).remove();
    this.Sheets.splice(O70b9, 1);
}
;
ZCell.prototype.SetStatusBar = function(O85f4) {
    if (O85f4 == 0) {
        if (zce.indexOf(hex_md5(zc + getRoot()).toUpperCase()) > -1 && hex_md5(zcev).toUpperCase() == zv) {
            $("#tb_stabar").hide()
        }
    }
    ;if (O85f4 == 1) {
        $("#tb_stabar").show()
    }
}
;
ZCell.prototype.SaveEdit = function() {
    this.stopEditCell()
}
;
function Sheet(aece7, O18e4, O272c) {
    var f2a08 = this;
    var O9ec9 = null;
    this.id = "Sheet1";
    this.table = null;
    this.Cells = null;
    this.NameCells = null;
    this.rows = null;
    this.NameRows = null;
    this.cols = null;
    this.NameCols = null;
    this.rcCros = null;
    this.allSelCells = [];
    this.nowSelCells = [];
    Sheet.ROW_MIN_HEIGHT = 20;
    Sheet.COL_MIN_WIDTH = 10;
    Sheet.COL_DEFAULT_WIDTH = 60;
    Sheet.ROW_DEFAULT_HEIGHT = 40;
    this.div = $("<div class=\"sheet\"  id='Sheet1' ></div>");
    _GenTable(this, O18e4, O272c);
    aece7.appendChild(this.div[0])
}
;Sheet.prototype = {
    AllowAutoCalculate: true,
    AllowPaste: true
};
function _GenTable(f2a08, O18e4, O272c) {
    var O186b = new StringBuffer();
    O186b.zfappend();
    var O1c5f = " style=\"width:" + Sheet.COL_DEFAULT_WIDTH + "px;height:" + Sheet.ROW_DEFAULT_HEIGHT + "px\" ";
    var O98ed = 20;
    var a12d4 = 20;
    O186b.zfappend("<thead><tr  >");
    var O68b1 = "<th class='rulercro' style='width: 20px'>&nbsp;</th>";
    var O657f = 0;
    var abd5b = 0;
    for (O657f = 0; O657f < O272c; O657f++) {
        O68b1 += "<th class='collab'   style='width: 100px'>" + ColNo2ColLab(O657f + 1) + "</th>";
    }
    ;O186b.zfappend(O68b1);
    O186b.zfappend("</tr></thead>");
    O186b.zfappend("<tbody>");
    for (O657f = 0; O657f < O18e4; O657f++) {
        O98ed += Sheet.ROW_DEFAULT_HEIGHT;
        O186b.zfappend("<tr class='rowtr'>");
        O186b.zfappend("<th class='rowlab'  >");
        O186b.zfappend(O657f + 1);
        O186b.zfappend("</th>");
        for (abd5b = 0; abd5b < O272c; abd5b++) {
            if (O657f === 0) {
                a12d4 += Sheet.COL_DEFAULT_WIDTH
            }
            ;O186b.zfappend("<td  ");
            O186b.zfappend(">");
            O186b.zfappend("</td>")
        }
        ;O186b.zfappend("</tr>")
    }
    ;O186b.zfappend("</tbody>");
    var O465a = " width='" + a12d4 + "px' height='" + O98ed + "px' ";
    var a864c = $("<table id='tabl1'   cellspacing=\"0\" ></table>");
    a864c[0].innerHTML = O186b.toString();
    f2a08.table = a864c[0];
    f2a08.div.append(f2a08.table);
    _BindEvent(f2a08);
    _GenColBuffer(f2a08);
    _GenRowBuffer(f2a08);
    _GencellBuffer(f2a08);
}
;function _GenRowBuffer(f2a08) {
    f2a08.rcCros = $(".rulercro");
    f2a08.rows = $(f2a08.table).find("th.rowlab");
    f2a08.rowTrs = $(f2a08.table).find("tr.rowtr");
    for (var O657f = 0; O657f < f2a08.rows.length; O657f++) {
        $(f2a08.rows[O657f]).text(O657f + 1)
    }
}
;function _GenColBuffer(f2a08) {
    f2a08.cols = $(f2a08.table).find("th.collab");
    for (var O657f = 0; O657f < f2a08.cols.length; O657f++) {
        $(f2a08.cols[O657f]).text(ColNo2ColLab(O657f + 1));
    }
}
;function _GencellBuffer(f2a08) {
    var O5259, O2ce4 = [];
    var O8189 = 0;
    var O698b = -1;
    var O62f0 = [];
    for (var O6a78 = 0; O6a78 < f2a08.rowTrs.length; O6a78++) {
        var O97f9 = f2a08.rowTrs[O6a78];
        var O1990 = $(O97f9).find("td");
        O8189 = 0;
        O698b = O6a78;
        if (O2ce4[O698b] === undefined) {
            O2ce4[O698b] = []
        }
        ;for (var O2ecc = 0; O2ecc < O1990.length; O2ecc++) {
            var O657f = 0
              , abd5b = 0;
            var O1ecb = O1990[O2ecc].rowSpan || 1;
            var O7e6a = O1990[O2ecc].colSpan || 1;
            var O31e6 = null;
            var f63b4 = O698b;
            for (O657f = 0; O657f < O2ce4[O698b].length + 1; O657f += 1) {
                if (O2ce4[O698b][O657f] === undefined) {
                    O8189 = O657f;
                    break
                }
            }
            ;for (O657f = f63b4; O657f < f63b4 + O1ecb; O657f += 1) {
                if (O2ce4[O657f] === undefined) {
                    O2ce4[O657f] = []
                }
                ;for (abd5b = O8189; abd5b < O8189 + O7e6a; abd5b += 1) {
                    var O748b = ColNo2ColLab(abd5b + 1) + (O657f + 1);
                    if (O31e6 == null) {
                        O31e6 = _InitCell(O1990[O2ecc], f2a08, abd5b, O657f)
                    }
                    ;O2ce4[O657f][abd5b] = O31e6;
                    O62f0[O748b] = O31e6
                }
            }
        }
    }
    ;f2a08.Cells = O2ce4;
    f2a08.NameCells = O62f0
}
;function _InitCell(O9938, f2a08, d9f65, c5ccb) {
    if (O9938.Sheet === undefined) {
        O9938.Sheet = f2a08;
        O9938.visible = true;
        O9938.readonly = false;
        O9938.Value = "";
    }
    ;var O748b = ColNo2ColLab(d9f65 + 1) + (c5ccb + 1);
    O9938.name = O748b;
    O9938.rowNo = c5ccb + 1;
    O9938.colNo = d9f65 + 1;
    return O9938;
}
;function ColNo2ColLab(O9be1) {
    O9be1 = O9be1 - 1;
    var eecda = "";
    if (O9be1 > 300) {
        return "outside of the maxnum";
    }
    ;if ((O9be1 / 26) >= 1) {
        eecda += String.fromCharCode(64 + O9be1 / 26)
    }
    ;eecda += String.fromCharCode(65 + O9be1 % 26);
    return eecda
}
;function _getColNoByPoint(f2a08, O1346) {
    var O5683 = f2a08.cols;
    if (O1346 < $(O5683[0]).offset().left || ZCell.offsetpx == 1) {
        return -1
    }
    ;for (var O657f = 0; O657f < O5683.length; O657f++) {
        var a14e4 = $(O5683[O657f]);
        if (a14e4.offset().left + a14e4.width() > O1346) {
            return O657f
        }
    }
    ;return -1
}
;function _getRowNoByPoint(f2a08, O36ee) {
    var O24b1 = f2a08.rows;
    if (O36ee < $(O24b1[0]).offset().top || ZCell.offsetpx == 1) {
        return -1
    }
    ;var O7a8f = O24b1.length;
    for (var O657f = 0; O657f < O7a8f; O657f++) {
        var d27f8 = $(O24b1[O657f]);
        if (d27f8.offset().top + d27f8.height() > O36ee) {
            return O657f
        }
    }
    ;return -1
}
;function _getCellByCoord(f2a08, ae644, O83f2) {
    if (ae644 < 0 || ae644 >= f2a08.rows.length)
        return null;
    if (O83f2 < 0 || O83f2 >= f2a08.cols.length)
        return null;
    return f2a08.Cells[ae644][O83f2]
}
;function _selectCell(f2a08, bd84a) {
    if (f2a08 == null)
        return;
    if (bd84a == null)
        return;
    $(bd84a).addClass("cell-selected-border");
    $(bd84a).addClass("cell-selected-bgcolor");
    $(f2a08.rows[bd84a.rowNo - 1]).addClass("lab-selected-bgcolor");
    $(f2a08.cols[bd84a.colNo - 1]).addClass("lab-selected-bgcolor");
    f2a08.Zcell.stopEditCell()
}
;function _unselectCell(f2a08, bd84a) {
    if (f2a08 == null)
        return;
    if (bd84a == null)
        return;
    $(bd84a).removeClass("cell-selected-border");
    $(bd84a).removeClass("cell-selected-bgcolor");
    $(bd84a).removeClass("cell-copybefore-border");
    $(f2a08.rows[bd84a.rowNo - 1]).removeClass("lab-selected-bgcolor");
    $(f2a08.cols[bd84a.colNo - 1]).removeClass("lab-selected-bgcolor")
}
;function _unselectAllCell(f2a08) {
    if (f2a08 == null)
        return;
    for (var ad8cb = 0, lenm = f2a08.allSelCells.length; ad8cb < lenm; ad8cb++) {
        _unselectCell(f2a08, f2a08.allSelCells[ad8cb])
    }
    ;f2a08.allSelCells.length = 0
}
;function _getCellsByRect(f2a08, O183a) {
    if (O183a.getMaxY() > f2a08.rows.length || O183a.getMaxX() > f2a08.cols.length) {
        alert("行列索引超出范围");
        return
    }
    ;var O3723 = [];
    for (var d27f8 = O183a.getMinY(); d27f8 <= O183a.getMaxY(); d27f8++) {
        for (var a14e4 = O183a.getMinX(); a14e4 <= O183a.getMaxX(); a14e4++) {
            var d6df2 = true;
            for (var O657f = 0; O657f < O3723.length; O657f++) {
                if (O3723[O657f] == f2a08.Cells[d27f8][a14e4]) {
                    d6df2 = false
                }
            }
            ;if (d6df2) {
                O3723[O3723.length] = f2a08.Cells[d27f8][a14e4]
            }
        }
    }
    ;return O3723
}
;function _getCellRect(f2a08, O9938) {
    var O35b4 = O9938.colNo;
    var O7b67 = O9938.rowNo;
    var a2398 = O35b4 + O9938.colSpan - 1;
    var O13b5 = O7b67 + O9938.rowSpan - 1;
    return new Rect(O35b4,O7b67,a2398,O13b5)
}
;function _GetCellType(O9938) {
    if (O9938.cellType && O9938.cellType.code) {
        return O9938.cellType
    }
    ;return {
        "code": "text"
    };
}
;function _SetCellType(O9938, O3e65) {
    var e5c89 = _GetCellType(O9938);
    O9938.cellType = O3e65;
    if (O3e65 && (e5c89.code != O3e65.code || (e5c89 != O3e65) || (e5c89.formula_expression && O3e65.formula_expression && e5c89.formula_expression != O3e65.formula_expression))) {
        if (O3e65.code == "text") {
            if (O9938.cellType.formula_expression) {
                var O7765 = "";
                if (O3e65.formula_expression) {
                    O7765 = O3e65.formula_expression;
                }
                ;var b3505 = _SetCellFormula(O9938, O7765)
            } else {
                if ($(O9938).hasClass("cell-formula-color")) {
                    $(O9938).removeClass("cell-formula-color")
                }
            }
        } else if (O3e65.code == "checkbox") {
            var f5c76 = $('<input style=\"vertical-align: middle;\" class=\"valueobject\" type=\"checkbox\"   />');
            $(O9938).html("");
            $(O9938).append(f5c76);
            f5c76.change(function(O5ee8) {
                O9938.Sheet.Zcell.startEditCell(O9938, true)
            })
        } else if (O3e65.code == "dropdown") {
            $(O9938).text("");
            var O3796 = $('<div style=\"vertical-align: middle; float: right; cursor:pointer;  \" class=\"valueobject\"  >▼</div>');
            $(O9938).prepend(O3796);
            O3796.click(function(O5ee8) {
                O9938.Sheet.Zcell.startEditCell(O9938, false);
            })
        } else if (O3e65.code == "object") {
            $(O9938).append(O3e65.object)
        }
        ;_UpdateCellText(O9938)
    }
}
;function _GetCellFormat(O9938) {
    if (O9938.format && O9938.format.code) {
        return O9938.format
    }
    ;return {
        "code": "none"
    };
}
;function _SetCellFormat(a, b) {
    _GetCellFormat(a),
    a.format = b,
    _UpdateCellText(a)
}
function _SetCellValue(a, b) {
    if ("1" != a.readonly) {
        if (a.cellType && a.cellType.formula_expression)
            _UpdateFormulaValue(a);
        else if (a.Value = b,
        a.Formula_parentreftds)
            for (var c = 0, d = a.Formula_parentreftds.length; d > c; c++)
                _UpdateFormulaValue(a.Formula_parentreftds[c]);
        _UpdateCellText(a)
    }
}
function _UpdateFormulaValue(td) {
    var i, len, sheet = td.Sheet;
    if (0 != sheet.AllowAutoCalculate && td.cellType && td.cellType.formula_expression) {
        if (td.cellType.formula_expressionparse)
            try {
                if (td.Value = eval(td.cellType.formula_expressionparse),
                td.Formula_parentreftds)
                    for (i = 0,
                    len = td.Formula_parentreftds.length; len > i; i++)
                        _UpdateFormulaValue(td.Formula_parentreftds[i])
            } catch (exception) {
                td.Value = "#error"
            }
        _UpdateCellText(td)
    }
}
function _ManualCalculateSheet(sheet) {
    var k, j, td, i, len;
    for (k = 0; k < sheet.Cells.length; k++)
        for (j = 0; j < sheet.Cells[k].length; j++)
            if (td = sheet.Cells[k][j],
            td.cellType && td.cellType.formula_expression) {
                if (td.cellType.formula_expressionparse)
                    try {
                        if (td.Value = eval(td.cellType.formula_expressionparse),
                        td.Formula_parentreftds)
                            for (i = 0,
                            len = td.Formula_parentreftds.length; len > i; i++)
                                _UpdateFormulaValue(td.Formula_parentreftds[i])
                    } catch (exception) {
                        td.Value = "#error"
                    }
                _UpdateCellText(td)
            }
}
function _CalculateSheet(a) {
    a.AllowAutoCalculate && _ManualCalculateSheet(a)
}
;function _GetCellValue(a) {
    var b = a.Value
      , c = _GetCellType(a)
      , d = _GetCellFormat(a);
    return "text" == c.code ? "none" == d.code ? "" == b || isNaN(b) || (b = zftoFixed2(Number(b))) : "number" == d.code ? "" == b || isNaN(b) || (b = zftoFixed2(Number(b))) : "bool" == d.code : "checkbox" == c.code || "dropdown" == c.code,
    b
}
function _GetCellValueByName(a, b) {
    return null == b || void 0 == b ? "" : null == a.NameCells[b.toUpperCase()] ? "" : _GetCellValue(a.NameCells[b])
}
function _UpdateCellText(a) {
    var d, e, f, g, b = _GetCellType(a), c = _GetCellFormat(a);
    "text" == b.code ? "none" == c.code ? $(a).text(a.Value) : "number" == c.code ? ("" == a.Value ? e = "" : (d = 0,
    c.expression && c.expression.precision && (d = c.expression.precision),
    e = parseFloat(parseFloat(a.Value).toFixed(d)),
    0 == parseFloat(a.Value) && (e = ""),
    void 0 == e && (e = "")),
    $(a).text(e.toString())) : "bool" == c.code && (f = c.expression.format,
    g = f.split("/"),
    "true" == a.Value.toString().toLowerCase() || "1" == a.Value ? $(a).text(g[0]) : "false" == a.Value.toString().toLowerCase() || "0" == a.Value ? $(a).text(g[1]) : $(a).text("")) : "checkbox" == b.code || "dropdown" == b.code && b.source && ($(a).find("div"),
    void 0 == b.source[a.Value] ? $(a).prop("lastChild").nodeValue = "" : (e = b.source[a.Value].toString(),
    a.lastChild.nodeValue = e))
}
;function _SetCellFormula(a, b) {
    var e, f, g, c = b, d = /[^A-Za-z0-9\/%*()-_+,.<>='": ]/;
    return d.test(c) ? (alert("输入的公式表达式中含有非法字符。公式表达式不支持数字、字母、%*()-_+/,.<>='\":之外的字符"),
    0) : (f = a.Sheet,
    g = /[A-Z]+[0-9]+[(_.'":]?/g,
    c = c.replace(g, function(b) {
        var c = /[(_.'":]$/;
        return c.test(b) ? b : null == f.NameCells[b] ? e = "#NAME?" : (f.NameCells[b].Formula_parentreftds ? f.NameCells[b].Formula_parentreftds.indexOf(a) <= -1 && ((void 0 == f.Zcell.offpriv || 1 == f.Zcell.offpriv) && f.NameCells[b].Formula_parentreftds.length >= 5 || f.NameCells[b].Formula_parentreftds.push(a)) : (f.NameCells[b].Formula_parentreftds = [],
        f.NameCells[b].Formula_parentreftds.push(a)),
        '_GetCellValueByName(sheet,"' + b + '")')
    }),
    c = ztranslate(c),
    a.cellType && (a.cellType.formula_expressionparse = c),
    $(a).addClass("cell-formula-color"),
    1)
}
function _GetCellFormula(a) {
    return a.cellType && a.cellType.expression ? a.cellType.expression : ""
}
;function _BindEvent(f2a08) {
    _bindSelEvent(f2a08);
    _bindKeyEvent(f2a08);
    $(f2a08.table).on('contextmenu', '', function() {
        return false
    });
}
;function _bindSelEvent(f2a08) {
    $(f2a08.table).bind("mousemove", {}, function(O5ee8) {
        if ($(O5ee8.target).hasClass("collab")) {
            var a19da = $(O5ee8.target);
            if ((a19da.offset().left + a19da.width() - O5ee8.pageX) <= 3) {
                a19da.css("cursor", "col-resize")
            } else {
                a19da.css("cursor", "default")
            }
        }
    });
    $(f2a08.table).bind("mousedown", {}, function(O5ee8) {
        var b8458 = O5ee8 || event;
        if (O5ee8.target.tagName == "TH" || $(O5ee8.target).parents("th").length > 0) {
            if ($(O5ee8.target).hasClass("collab")) {
                var a19da = $(O5ee8.target);
                var colevent_move = function(O532c) {
                    f2a08.Zcell.dragline.css('left', O532c.pageX + f2a08.div.scrollLeft() + "px");
                    var d73bc = O532c.pageX - $(O532c.data.colth).offset().left;
                    if (d73bc >= Sheet.COL_MIN_WIDTH) {
                        f2a08.Zcell.dragline.css('left', O532c.pageX + f2a08.div.scrollLeft() + "px")
                    }
                };
                var colevent_up = function(O532c) {
                    $("body").unbind("mousemove", colevent_move);
                    f2a08.Zcell.dragline.hide();
                    var d73bc = $(O532c.data.colth).width() + (O532c.pageX + f2a08.div.scrollLeft() - O532c.data.fromX);
                    if (d73bc >= Sheet.COL_MIN_WIDTH) {
                        $(O532c.data.colth).width(d73bc)
                    }
                    ;$("body").unbind("mouseup", colevent_up)
                };
                if ((a19da.offset().left + a19da.width() - O5ee8.pageX) <= 3) {
                    f2a08.Zcell.dragline.show();
                    f2a08.Zcell.dragline.height($(f2a08.table).height());
                    f2a08.Zcell.dragline.width(2);
                    f2a08.Zcell.dragline.css("top", $(f2a08.table).offset().top + "px");
                    var adeda = O5ee8.pageX + f2a08.div.scrollLeft();
                    f2a08.Zcell.dragline.css("left", adeda + "px");
                    $("body").bind("mousemove", {
                        "colth": a19da
                    }, colevent_move);
                    $("body").bind("mouseup", {
                        "colth": a19da,
                        "fromX": adeda
                    }, colevent_up)
                } else {}
            }
            ;return
        }
        ;if (!O5ee8.ctrlKey) {
            _unselectAllCell(f2a08)
        }
        ;var O7c6d = _getRowNoByPoint(f2a08, O5ee8.pageY);
        var a2375 = _getColNoByPoint(f2a08, O5ee8.pageX);
        if (O7c6d < 0 || a2375 < 0) {
            return
        }
        ;var c4fbe = _getCellByCoord(f2a08, O7c6d, a2375);
        if (c4fbe != undefined) {
            f2a08.nowSelCells.push(c4fbe);
            if (f2a08.allSelCells.length > 0) {
                $(f2a08.allSelCells[f2a08.allSelCells.length - 1]).removeClass("cell-selected-border")
            }
            ;f2a08.nowSelCells.push(c4fbe);
            _selectCell(f2a08, c4fbe)
        }
        ;$('#ZCELLtipDiv').hide()
    });
    $(f2a08.table).bind("mouseup mouseleave", {}, function(O5ee8) {
        if (f2a08.nowSelCells.length == 0) {
            return
        }
        ;for (var abd5b = 1, len = f2a08.nowSelCells.length; abd5b < len; abd5b++) {
            f2a08.allSelCells.push(f2a08.nowSelCells[abd5b])
        }
        ;f2a08.nowSelCells.length = 0;
        if ((ZCell.jsyz == 0 || hex_md5(zcev).toUpperCase() != zv || zce.indexOf(hex_md5(zc + getRoot()).toUpperCase()) == -1) && f2a08.allSelCells.length > 5) {}
        ;calculateStaBar(f2a08)
    });
    $(f2a08.table).bind("mouseover", {}, function(O58ec) {
        if (f2a08.nowSelCells.length == 0) {
            return
        }
        ;var O5ee8 = O58ec || window.event;
        var O5989 = GetDirection(O5ee8);
        var O6679 = 0;
        if (O5989 == 2) {
            O6679 = -((parseInt($(O5ee8.target).css('border-bottom-width')) || 0) + 3);
        }
        ;if (O5989 == 0) {
            O6679 = ((parseInt($(O5ee8.target).css('border-top-width')) || 0) + 3)
        }
        ;var O8c86 = 0;
        if (O5989 == 3) {
            O8c86 = ((parseInt($(O5ee8.target).css('border-left-width')) || 0) + 3)
        }
        ;if (O5989 == 1) {
            O8c86 = -((parseInt($(O5ee8.target).css('border-right-width')) || 0) + 3)
        }
        ;var edce3 = _getRowNoByPoint(f2a08, O5ee8.pageY + O6679);
        var O347e = _getColNoByPoint(f2a08, O5ee8.pageX + O8c86);
        if (edce3 < 0 || O347e < 0) {
            return
        }
        ;var O59c5 = _getCellByCoord(f2a08, edce3, O347e);
        var c4fbe = f2a08.nowSelCells[0];
        var e9dfd = Math.min(c4fbe.rowNo, O59c5.rowNo) - 1;
        var a0796 = Math.max(c4fbe.rowNo, O59c5.rowNo) - 1;
        var c9bba = Math.min(c4fbe.colNo, O59c5.colNo) - 1;
        var eea4c = Math.max(c4fbe.colNo, O59c5.colNo) - 1;
        for (var ad8cb = 1, lenm = f2a08.nowSelCells.length; ad8cb < lenm; ad8cb++) {
            _unselectCell(f2a08, f2a08.nowSelCells[ad8cb])
        }
        ;f2a08.nowSelCells.splice(1, f2a08.nowSelCells.length - 1);
        for (var O657f = e9dfd; O657f <= a0796; O657f++) {
            for (var abd5b = c9bba; abd5b <= eea4c; abd5b++) {
                if (f2a08.nowSelCells.length > 0) {
                    $(f2a08.nowSelCells[f2a08.nowSelCells.length - 1]).removeClass("cell-selected-border")
                }
                ;f2a08.nowSelCells.push(f2a08.Cells[O657f][abd5b]);
                _selectCell(f2a08, f2a08.Cells[O657f][abd5b])
            }
        }
    });
    $(f2a08.table).dblclick(function(O5ee8) {
        if (O5ee8.target.tagName != "td" && O5ee8.target.tagName != "TD") {
            return
        }
        ;var O3e65 = _GetCellType(O5ee8.target);
        if (O3e65.code != "object" && O3e65.code != "checkbox") {
            f2a08.Zcell.startEditCell(O5ee8.target, true)
        }
    })
}
;function _bindKeyEvent(a) {
    function b(b) {
        var c, d, e, f, g, h, i;
        if (0 != a.allSelCells.length && (c = a.allSelCells[0].rowNo,
        d = a.allSelCells[0].colNo,
        !(0 > c || 0 > d)))
            if (e = EventUtil.getEvent(b),
            f = EventUtil.getClipboardText(e),
            g = cells2parse(f),
            1 == g.length && 1 == g[0].length)
                for (h = 0; h < a.allSelCells.length; h++)
                    a.SetCellValue(a.allSelCells[h].colNo, a.allSelCells[h].rowNo, g[0][0]);
            else
                for (h = 0; h < g.length; h++)
                    for (i = 0; i < g[h].length; i++)
                        a.SetCellValue(d + i, c + h, g[h][i])
    }
    function c(b) {
        var c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s;
        if (0 != a.allSelCells.length) {
            for (c = a.allSelCells,
            c.sort(function(a, b) {
                return a.rowNo === b.rowNo ? a.colNo - b.colNo : a.rowNo - b.rowNo
            }),
            d = [],
            e = null,
            f = -1,
            g = -1,
            h = -1,
            i = -1,
            j = -1,
            m = 0,
            n = c.length; n > m; m++) {
                if (0 == m && (f = c[m].rowNo - 1,
                h = c[m].colNo - 1),
                (1 == c[m].ismcell || null != c[m].pcell) && n > 1)
                    return alert("合并单元格暂不支持与其他单元格一起复制！"),
                    void 0;
                if (g = c[m].rowNo - 1,
                i = c[m].colNo - 1,
                g != j) {
                    if (e = [],
                    e.push(c[m]),
                    d.push(e),
                    m > 0) {
                        if (k = null,
                        d.length > 0 && (k = d[d.length - 2]),
                        h != i)
                            return alert("不能对多重选定区域使用此命令！"),
                            void 0;
                        if (l = null,
                        k.length >= e.length && (l = k[e.length - 1]),
                        null === k || null === l || l.colNo - 1 != i)
                            return alert("不能对多重选定区域使用此命令！"),
                            void 0
                    }
                    j = g
                } else if (e.push(c[m]),
                m > 0 && g != f && (k = null,
                d.length > 0 && (k = d[d.length - 2]),
                l = null,
                k.length >= e.length && (l = k[e.length - 1]),
                null === k || null === l || l.colNo - 1 != i))
                    return alert("不能对多重选定区域使用此命令！"),
                    void 0
            }
            for (o = [],
            m = 0,
            n = d.length; n > m; m++) {
                for (p = [],
                q = 0,
                r = d[m].length; r > q; q++)
                    p.push(_GetCellValue(d[m][q])),
                    $(d[m][q]).addClass("cell-copybefore-border");
                o.push(p)
            }
            s = arr2copy(o),
            EventUtil.getEvent(b),
            EventUtil.preventDefault(b),
            EventUtil.setClipboardText(b, s)
        }
    }
    $(document).on("keydown", function(d) {
        var f, g, h, i, j, k, l, e = d.keyCode || d.which || d.charCode;
        if (d.ctrlKey && ("c" === String.fromCharCode(d.which) || "C" === String.fromCharCode(d.which))) {
            if (void 0 == window.clipboardData)
                return EventUtil.addHandler(document, "copy", c),
                void 0;
            c(d)
        }
        if (d.ctrlKey && ("v" === String.fromCharCode(d.which) || "V" === String.fromCharCode(d.which))) {
            if (void 0 == window.clipboardData)
                return EventUtil.addHandler(document, "paste", b),
                void 0;
            b(d)
        }
        if ("." == String.fromCharCode(d.which))
            for (f = 0,
            g = a.allSelCells.length; g > f; f++)
                _SetCellValue(a.allSelCells[f], "");
        if ("9" == e) {
            if (h = d || event,
            h.preventDefault(),
            0 == a.allSelCells.length)
                return;
            i = a.allSelCells[0].rowNo,
            j = a.allSelCells[0].rowSpan,
            k = a.allSelCells[0].colNo,
            l = a.allSelCells[0].colSpan,
            a.MoveToCell(k + 1 + l - 1, i)
        }
        if ("13" == e) {
            if (0 == a.allSelCells.length)
                return;
            i = a.allSelCells[0].rowNo,
            j = a.allSelCells[0].rowSpan,
            k = a.allSelCells[0].colNo,
            l = a.allSelCells[0].colSpan,
            a.MoveToCell(k, i + 1 + j - 1)
        }
        if ("37" == e) {
            if (0 == a.allSelCells.length)
                return;
            i = a.allSelCells[0].rowNo,
            j = a.allSelCells[0].rowSpan,
            k = a.allSelCells[0].colNo,
            l = a.allSelCells[0].colSpan,
            a.MoveToCell(k - 1, i)
        }
        if ("38" == e) {
            if (0 == a.allSelCells.length)
                return;
            i = a.allSelCells[0].rowNo,
            j = a.allSelCells[0].rowSpan,
            k = a.allSelCells[0].colNo,
            l = a.allSelCells[0].colSpan,
            a.MoveToCell(k, i - 1)
        }
        if ("39" == e) {
            if (0 == a.allSelCells.length)
                return;
            i = a.allSelCells[0].rowNo,
            j = a.allSelCells[0].rowSpan,
            k = a.allSelCells[0].colNo,
            l = a.allSelCells[0].colSpan,
            a.MoveToCell(k + 1 + l - 1, i)
        }
        if ("40" == e) {
            if (0 == a.allSelCells.length)
                return;
            i = a.allSelCells[0].rowNo,
            j = a.allSelCells[0].rowSpan,
            k = a.allSelCells[0].colNo,
            l = a.allSelCells[0].colSpan,
            a.MoveToCell(k, i + 1 + j - 1)
        }
        "27" == e && a.Zcell.stopEditCell()
    }),
    $(document).on("keydown", function(b) {
        var c = b.keyCode || b.which || b.charCode;
        if (0 == b.ctrlKey && (c >= "48" && "90" >= c || "173" == c || "187" == c || "188" == c || "189" == c || "190" == c || "191" == c || "192" == c || "219" == c || "221" == c || "222" == c)) {
            if (0 == a.allSelCells.length)
                return;
            a.allSelCells[0].rowNo,
            a.allSelCells[0].colNo,
            (void 0 == $(a.allSelCells[0]).attr("status") || "read" == $(a.allSelCells[0]).attr("status")) && a.Zcell.startEditCell(a.allSelCells[0], !1)
        }
    })
}
;function countQuotes(a) {
    return a.split('"').length - 1
}
function cells2parse(a) {
    var b, c, d, g, h, i, j, e = [], f = 0;
    for (d = a.split("\n"),
    d.length > 1 && "" === d[d.length - 1] && d.pop(),
    b = 0,
    c = d.length; c > b; b += 1) {
        for (d[b] = d[b].split("	"),
        g = 0,
        h = d[b].length; h > g; g += 1)
            e[f] || (e[f] = []),
            i && 0 === g ? (j = e[f].length - 1,
            e[f][j] = e[f][j] + "\n" + d[b][0],
            i && 1 & countQuotes(d[b][0]) && (i = !1,
            e[f][j] = e[f][j].substring(0, e[f][j].length - 1).replace(/""/g, '"'))) : g === h - 1 && 0 === d[b][g].indexOf('"') && 1 & countQuotes(d[b][g]) ? (e[f].push(d[b][g].substring(1).replace(/""/g, '"')),
            i = !0) : (e[f].push(d[b][g].replace(/""/g, '"')),
            i = !1);
        i || (f += 1)
    }
    return e
}
function arr2copy(a) {
    var b, c, d, e, g, f = "";
    for (b = 0,
    c = a.length; c > b; b += 1) {
        for (e = a[b].length,
        d = 0; e > d; d += 1)
            d > 0 && (f += "	"),
            g = a[b][d],
            f += "string" == typeof g ? g.indexOf("\n") > -1 ? '"' + g.replace(/"/g, '""') + '"' : g : null === g || void 0 === g ? "" : g;
        b !== c - 1 && (f += "\n")
    }
    return f
}
var EventUtil = {
    addHandler: function(a, b, c) {
        a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent ? a.attachEvent("on" + b, c) : a["on" + b] = c
    },
    removeHandler: function(a, b, c) {
        a.removeEventListener ? a.removeEventListener(b, c, !1) : a.detachEvent ? a.detachEvent("on" + b, c) : a["on" + b] = null
    },
    getEvent: function(a) {
        return a ? a : window.event
    },
    getClipboardText: function(a) {
        var b = a.clipboardData || window.clipboardData;
        return b.getData("text")
    },
    setClipboardText: function(a, b) {
        return a.clipboardData ? a.clipboardData.setData("text/plain", b) : window.clipboardData ? window.clipboardData.setData("text", b) : void 0
    },
    preventDefault: function(a) {
        a.preventDefault ? a.preventDefault() : a.returnValue = !1
    }
};
function GetDirection(O5ee8) {
    var O1231 = O5ee8.target;
    var O112e = O1231.offsetWidth
      , d643f = O1231.offsetHeight
      , O1346 = (O5ee8.pageX - $(O1231).offset().left - (O112e / 2)) * (O112e > d643f ? (d643f / O112e) : 1)
      , O36ee = (O5ee8.pageY - $(O1231).offset().top - (d643f / 2)) * (d643f > O112e ? (O112e / d643f) : 1)
      , O5989 = Math.round((((Math.atan2(O36ee, O1346) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
    return O5989
}
;function calculateStaBar(f2a08) {
    if (f2a08.allSelCells.length == 0)
        return;
    var f2686 = 0
      , O63b5 = 0
      , O4b9f = 0;
    var O9c66, O5090 = 0;
    for (var ad8cb = 0, lenm = f2a08.allSelCells.length; ad8cb < lenm; ad8cb++) {
        O9c66 = f2a08.allSelCells[ad8cb].Value;
        O9c66 = Number(O9c66);
        if (isNaN(O9c66)) {
            O5090++;
            continue
        }
        ;if (O9c66 != '' && O9c66 != null) {
            f2686++;
            O63b5 = O63b5.add(O9c66);
        }
    }
    ;if (f2686 == 0) {
        O4b9f = '0'
    } else {
        O4b9f = O63b5.div(f2686)
    }
    ;var O1d3e = "平均值：" + zftoFixed(O4b9f, 4);
    O1d3e += "&nbsp;&nbsp; ";
    O1d3e += "计数：" + (f2686 + O5090);
    O1d3e += " &nbsp;&nbsp;";
    O1d3e += "求和：" + zftoFixed(O63b5, 4);
    $("#caldiv").html(O1d3e)
}
;function _InsertCol(f2a08, O9625, O3dea) {
    O9625 = O9625 - 1;
    for (var O2ecc = 0; O2ecc < O3dea; O2ecc++) {
        var O97bc = ColNo2ColLab(O9625 + O2ecc);
        var a19da = $("<th class=\"collab\" style='width: 100px'>" + O97bc + "</th>");
        $(f2a08.cols[O9625]).before(a19da);
        for (var O657f = 0; O657f < f2a08.rows.length; O657f++) {
            for (var abd5b = O9625; abd5b < f2a08.Cells[O657f].length; abd5b++) {
                var f4325 = _getCellRect(f2a08, f2a08.Cells[O657f][abd5b]);
                if (f4325.getMinY() == O657f) {
                    if (f4325.getMinX() < O9625) {
                        var O9938 = f2a08.Cells[O657f][abd5b];
                        O9938.colSpan = O9938.colSpan + 1
                    } else {
                        var O9938 = $("<td></td>");
                        $(f2a08.Cells[O657f][abd5b]).before(O9938);
                        O9938[0].rowSpan = f4325.getHeight()
                    }
                    ;O657f += f4325.getHeight() - 1;
                    break
                }
            }
        }
    }
    ;_GenColBuffer(f2a08);
    _GencellBuffer(f2a08);
    _CalculateSheet(f2a08)
}
;function _AppendCol(f2a08, O3dea) {
    var O9625 = f2a08.cols.length - 1;
    for (var O2ecc = 0; O2ecc < O3dea; O2ecc++) {
        var O97bc = ColNo2ColLab(O9625 + O2ecc);
        var a19da = $("<th class=\"collab\" style='width: 100px'>" + O97bc + "</th>");
        $(f2a08.cols[O9625]).after(a19da);
        for (var O657f = 0; O657f < f2a08.rows.length; O657f++) {
            for (var abd5b = O9625; abd5b < f2a08.Cells[O657f].length; abd5b++) {
                var f4325 = _getCellRect(f2a08, f2a08.Cells[O657f][abd5b]);
                if (f4325.getMinY() == O657f) {
                    if (f4325.getMaxX() > O9625) {
                        var O9938 = f2a08.Cells[O657f][abd5b];
                        O9938.colSpan = O9938.colSpan + 1
                    } else {
                        var O9938 = $("<td></td>");
                        $(f2a08.Cells[O657f][abd5b]).after(O9938);
                        O9938[0].rowSpan = f4325.getHeight()
                    }
                    ;O657f += f4325.getHeight() - 1;
                    break
                }
            }
        }
    }
    ;_GenColBuffer(f2a08);
    _GencellBuffer(f2a08);
    _CalculateSheet(f2a08)
}
;function _DeleteCol(f2a08, O9625, O3dea) {
    O9625 = O9625 - 1;
    for (var O2ecc = 0; O2ecc < O3dea; O2ecc++) {
        for (var O657f = 0; O657f < f2a08.Cells.length; O657f++) {
            var d27f8 = f2a08.Cells[O657f];
            if ((O9625 + O2ecc) >= d27f8.length)
                break;
            var O183a = _getCellRect(f2a08, d27f8[O9625 + O2ecc]);
            var O9938 = d27f8[O9625 + O2ecc];
            if (O183a.getWidth() > 1) {
                O9938.colSpan = O9938.colSpan - 1
            } else {
                $(O9938).remove()
            }
            ;O657f += O183a.getHeight() - 1
        }
        ;var O97bc = f2a08.cols[O9625 + O2ecc];
        $(O97bc).remove()
    }
    ;_GenColBuffer(f2a08);
    _GencellBuffer(f2a08);
    _CalculateSheet(f2a08)
}
;function _HideCol(f2a08, d971b, ba719) {
    var O9625 = Math.min(d971b, ba719);
    var O8d29 = Math.max(d971b, ba719);
    var O3dea = O8d29 - O9625 + 1;
    O9625 = O9625 - 1;
    for (var O2ecc = 0; O2ecc < O3dea; O2ecc++) {
        if ($(f2a08.cols[O9625 + O2ecc]).is(':hidden')) {
            continue
        }
        ;for (var O657f = 0; O657f < f2a08.Cells.length; O657f++) {
            var d27f8 = f2a08.Cells[O657f];
            if ((O9625 + O2ecc) >= d27f8.length)
                break;
            var O183a = _getCellRect(f2a08, d27f8[O9625 + O2ecc]);
            var O9938 = d27f8[O9625 + O2ecc];
            if (O183a.getWidth() > 1) {
                O9938.colSpan = O9938.colSpan - 1
            } else {
                O9938.visible = false;
                $(O9938).hide()
            }
            ;O657f += O183a.getHeight() - 1
        }
        ;var O97bc = f2a08.cols[O9625 + O2ecc];
        $(O97bc).hide()
    }
}
;function _UnHideCol(f2a08, d971b, ba719) {
    var O9625 = Math.min(d971b, ba719);
    var O8d29 = Math.max(d971b, ba719);
    var O3dea = O8d29 - O9625 + 1;
    O9625 = O9625 - 1;
    for (var O2ecc = 0; O2ecc < O3dea; O2ecc++) {
        var O97bc = f2a08.cols[O9625 + O2ecc];
        if ($(O97bc).is(':hidden')) {
            $(O97bc).show()
        } else {
            continue
        }
        ;for (var O657f = 0; O657f < f2a08.Cells.length; O657f++) {
            var d27f8 = f2a08.Cells[O657f];
            if ((O9625 + O2ecc) >= d27f8.length)
                break;
            var f4325 = _getCellRect(f2a08, d27f8[O9625 + O2ecc]);
            var O9938 = d27f8[O9625 + O2ecc];
            if (f4325.getMinY() == O657f) {
                if ((O9625 + O2ecc) > 0) {
                    if (d27f8[O9625 + O2ecc - 1].name == O9938.name) {
                        O9938.colSpan = O9938.colSpan + 1
                    } else {
                        if ((O9625 + O2ecc + 1 < d27f8.length) && d27f8[O9625 + O2ecc + 1].name == O9938.name && O9938.visible == true) {
                            O9938.colSpan = O9938.colSpan + 1
                        } else {
                            O9938.visible = true;
                            $(O9938).show()
                        }
                    }
                } else {
                    if ((O9625 + O2ecc + 1 < d27f8.length) && d27f8[O9625 + O2ecc + 1].name == O9938.name && O9938.visible == true) {
                        O9938.colSpan = O9938.colSpan + 1
                    } else {
                        O9938.visible = true;
                        $(O9938).show()
                    }
                }
                ;O657f += f4325.getHeight() - 1
            }
        }
    }
}
function _InsertRow(f2a08, f63b4, O3dea) {
    f63b4 = f63b4 - 1;
    for (var O2ecc = 0; O2ecc < O3dea; O2ecc++) {
        var O97f9 = f2a08.rowTrs[f63b4];
        var d27f8 = f2a08.Cells[f63b4];
        var cb31f = f63b4 + O3dea;
        var e3b8d = $("<tr class='rowtr'><th class=\"rowlab\" style='height: 20px'>" + cb31f + "</th></tr>");
        for (var O657f = 0; O657f < d27f8.length; O657f++) {
            var O9938 = d27f8[O657f];
            if (O9938.parentNode != O97f9) {
                O9938.rowSpan = O9938.rowSpan + 1;
                O657f += (O9938.colSpan - 1)
            } else {
                var a9d95 = $("<td></td>")[0];
                e3b8d.append(a9d95)
            }
        }
        ;$(O97f9).before(e3b8d)
    }
    ;_GenRowBuffer(f2a08);
    _GencellBuffer(f2a08);
    _CalculateSheet(f2a08)
}
;function _AppendRow(f2a08, O3dea) {
    var f63b4 = f2a08.rows.length - 1;
    for (var O2ecc = 0; O2ecc < O3dea; O2ecc++) {
        var O97f9 = f2a08.rowTrs[f63b4];
        var d27f8 = f2a08.Cells[f63b4];
        var cb31f = f63b4 + O3dea;
        var e3b8d = $("<tr class='rowtr'><th class=\"rowlab\" style='height: 20px'>" + cb31f + "</th></tr>");
        for (var O657f = 0; O657f < d27f8.length; O657f++) {
            var O9938 = d27f8[O657f];
            if (O9938.parentNode != O97f9) {
                O9938.rowSpan = O9938.rowSpan + 1;
                O657f += (O9938.colSpan - 1)
            } else {
                var a9d95 = $("<td></td>")[0];
                e3b8d.append(a9d95)
            }
        }
        ;$(O97f9).after(e3b8d)
    }
    ;_GenRowBuffer(f2a08);
    _GencellBuffer(f2a08);
    _CalculateSheet(f2a08)
}
;function _DeleteRow(f2a08, f63b4, O3dea) {
    f63b4 = f63b4 - 1;
    for (var O2ecc = 0; O2ecc < O3dea; O2ecc++) {
        var O657f = 0;
        var ae644 = f63b4 + O2ecc;
        if ((f63b4 + O2ecc) >= f2a08.Cells.length)
            break;
        var d27f8 = f2a08.Cells[ae644];
        for (O657f = 0; O657f < d27f8.length; O657f++) {
            var O9938 = d27f8[O657f];
            if (O9938.rowSpan > 1) {
                var O332e = O9938.rowSpan;
                if ((O9938.rowNo - 1) == ae644) {
                    if (O657f == 0) {
                        var O2262 = f2a08.rowTrs[ae644 + 1];
                        $(O2262).find("th:last").after(O9938);
                        O9938.rowNo = ae644 + 1 + 1;
                    } else {
                        for (var abd5b = O657f; abd5b >= 0; abd5b--) {
                            if ((f2a08.Cells[ae644 + 1][abd5b].rowNo - 1) == ae644 + 1) {
                                $(f2a08.Cells[ae644 + 1][abd5b]).after(O9938);
                                O9938.rowNo = ae644 + 1 + 1;
                                break
                            }
                        }
                    }
                }
                ;O9938.rowSpan = O332e - 1
            } else {}
            ;O657f += O9938.colSpan - 1
        }
        ;var O97f9 = f2a08.rowTrs[ae644];
        $(O97f9).remove()
    }
    ;_GenRowBuffer(f2a08);
    _GencellBuffer(f2a08);
    _CalculateSheet(f2a08)
}
;function _HideRow(f2a08, ad73f, O7c38) {
    var f63b4 = Math.min(ad73f, O7c38);
    var O1f9c = Math.max(ad73f, O7c38);
    var O3dea = O1f9c - f63b4 + 1;
    f63b4 = f63b4 - 1;
    for (var O2ecc = 0; O2ecc < O3dea; O2ecc++) {
        var O657f = 0;
        var ae644 = f63b4 + O2ecc;
        if ((ae644) >= f2a08.Cells.length)
            break;
        var cb31f = f2a08.rows[ae644];
        if ($(cb31f).is(':hidden')) {
            continue
        }
        ;var d27f8 = f2a08.Cells[ae644];
        for (O657f = 0; O657f < d27f8.length; O657f++) {
            var O9938 = d27f8[O657f];
            if (O9938.rowSpan > 1) {
                if ((O9938.rowNo - 1) != ae644) {} else {
                    if (O657f == 0) {
                        var O2262 = f2a08.rowTrs[ae644 + 1];
                        $(O2262).find("th:last").after(O9938);
                        O9938.rowNo = ae644 + 1 + 1;
                    } else {
                        for (var abd5b = O657f; abd5b >= 0; abd5b--) {
                            if ((f2a08.Cells[ae644 + 1][abd5b].rowNo - 1) == ae644 + 1) {
                                $(f2a08.Cells[ae644 + 1][abd5b]).after(O9938);
                                O9938.rowNo = ae644 + 1 + 1;
                                break
                            }
                        }
                    }
                }
                ;O9938.rowSpan = O9938.rowSpan - 1
            } else {
                O9938.visible = false
            }
            ;O657f += O9938.colSpan - 1
        }
        ;var O97f9 = f2a08.rowTrs[f63b4 + O2ecc];
        $(O97f9).hide()
    }
}
;function _UnHideRow(f2a08, ad73f, O7c38) {
    var f63b4 = Math.min(ad73f, O7c38);
    var O1f9c = Math.max(ad73f, O7c38);
    var O3dea = O1f9c - f63b4 + 1;
    f63b4 = f63b4 - 1;
    var ae644 = 0;
    for (var O2ecc = O3dea - 1; O2ecc >= 0; O2ecc--) {
        var O657f = 0;
        ae644 = f63b4 + O2ecc;
        if ((ae644) >= f2a08.Cells.length)
            break;
        var cb31f = f2a08.rows[ae644];
        if ($(cb31f).is(':hidden')) {
            $(cb31f).show()
        } else {
            continue
        }
        ;var d27f8 = f2a08.Cells[ae644];
        var O97f9 = f2a08.rowTrs[ae644];
        for (O657f = 0; O657f < d27f8.length; O657f++) {
            var O9938 = d27f8[O657f];
            if ((O9938.rowNo - 1) < ae644) {
                O9938.rowSpan = O9938.rowSpan + 1
            } else {
                var O83bb = false;
                if (O657f == 0) {
                    if ((ae644 + 1 < f2a08.Cells.length) && f2a08.Cells[ae644 + 1][0].name == O9938.name && O9938.visible == true) {
                        $(O97f9).find("th:last").after(O9938);
                        O9938.rowNo = ae644 + 1;
                        O9938.rowSpan = O9938.rowSpan + 1;
                        O83bb = true
                    }
                } else {
                    for (var abd5b = O657f; abd5b >= 0; abd5b--) {
                        if ((ae644 + 1 < f2a08.Cells.length) && f2a08.Cells[ae644 + 1][abd5b].name == O9938.name && O9938.visible == true) {
                            $(f2a08.Cells[ae644][abd5b - 1]).after(O9938);
                            O9938.rowNo = ae644 + 1;
                            O9938.rowSpan = O9938.rowSpan + 1;
                            O83bb = true;
                            break
                        }
                    }
                }
                ;if (O83bb == false) {
                    O9938.visible = true;
                    $(O9938).show()
                }
            }
            ;O657f += O9938.colSpan - 1
        }
        ;$(O97f9).show()
    }
}
;function _MergeCells(f2a08, d971b, ad73f, ba719, O7c38) {
    var O183a = new Rect(d971b,ad73f,ba719,O7c38);
    var O5893 = _getCellsByRect(f2a08, O183a);
    for (var O657f = 0; O657f < O5893.length; O657f++) {
        if (O5893[O657f].colSpan > 1 || O5893[O657f].rowSpan > 1) {
            alert("您选定的范围内有合并单元格，需要先拆分后才能被合并");
            return
        }
    }
    ;for (var O657f = 0; O657f < O5893.length; O657f++) {
        if (O657f == 0) {
            O5893[O657f].colSpan = O183a.getWidth();
            O5893[O657f].rowSpan = O183a.getHeight();
            for (var d27f8 = O183a.getMinY(); d27f8 <= O183a.getMaxY(); d27f8++) {
                for (var a14e4 = O183a.getMinX(); a14e4 <= O183a.getMaxX(); a14e4++) {
                    f2a08.NameCells[f2a08.Cells[d27f8][a14e4].name] = O5893[O657f];
                    f2a08.Cells[d27f8][a14e4] = O5893[O657f]
                }
            }
        } else {
            $(O5893[O657f]).remove()
        }
    }
}
;function _SplitCell(f2a08, O83f2, ae644) {
    var O9938 = f2a08.Cells[ae644 - 1][O83f2 - 1];
    var O183a = _getCellRect(f2a08, O9938);
    var O3e4b;
    for (var ad73f = O183a.getMinY(); ad73f <= O183a.getMaxY(); ad73f++) {
        for (var d971b = O183a.getMinX(); d971b <= O183a.getMaxX(); d971b++) {
            if (ad73f == O183a.getMinY()) {
                if (d971b == O183a.getMinX()) {
                    O9938.rowSpan = 1;
                    O9938.colSpan = 1;
                    O3e4b = $(O9938)
                } else {
                    var a9d95 = $("<td></td>");
                    a9d95[0].colNo = d971b + 1;
                    a9d95[0].rowNo = ad73f + 1;
                    _InitCell(a9d95[0], f2a08, d971b, ad73f);
                    f2a08.Cells[ad73f][d971b] = a9d95[0];
                    f2a08.NameCells[a9d95[0].name] = a9d95[0];
                    O3e4b.after(a9d95);
                    O3e4b = a9d95
                }
            } else {
                if (d971b == O183a.getMinX()) {
                    O3e4b = $("<td></td>");
                    O3e4b[0].colNo = d971b + 1;
                    O3e4b[0].rowNo = ad73f + 1;
                    var O83bb = false;
                    for (var O657f = d971b - 1; O657f >= 0; O657f--) {
                        if ((f2a08.Cells[ad73f][O657f].rowNo - 1) == ad73f) {
                            $(f2a08.Cells[ad73f][O657f]).after(O3e4b);
                            O83bb = true;
                            break
                        }
                    }
                    ;if (!O83bb) {
                        var O97f9 = $(f2a08.table).find("tr")[ad73f + 1];
                        $(O97f9).find("th:last").after(O3e4b)
                    }
                    ;_InitCell(O3e4b[0], f2a08, d971b, ad73f);
                    f2a08.Cells[ad73f][d971b] = O3e4b[0];
                    f2a08.NameCells[O3e4b[0].name] = O3e4b[0]
                } else {
                    var a9d95 = $("<td></td>");
                    a9d95[0].colNo = d971b + 1;
                    a9d95[0].rowNo = ad73f + 1;
                    _InitCell(a9d95[0], f2a08, d971b, ad73f);
                    f2a08.Cells[ad73f][d971b] = a9d95[0];
                    f2a08.NameCells[a9d95[0].name] = a9d95[0];
                    O3e4b.after(a9d95);
                    O3e4b = a9d95
                }
            }
        }
    }
}
;Sheet.prototype.SetColWidth = function(O46e7, c3754) {
    $(this.cols[O46e7 - 1]).css("width", c3754)
}
;
Sheet.prototype.SetRowHeight = function(O46e7, c3754) {
    $(this.rows[O46e7 - 1]).css("height", c3754)
}
;
Sheet.prototype.SetCellStyle = function(a14e4, d27f8, c3754) {
    $(this.GetCell(a14e4, d27f8)).css(c3754)
}
;
Sheet.prototype.GetCell = function(O83f2, ae644) {
    if (ae644 < 1 || ae644 > this.rows.length)
        return null;
    if (O83f2 < 1 || O83f2 > this.cols.length)
        return null;
    return this.Cells[ae644 - 1][O83f2 - 1]
}
;
Sheet.prototype.GetCurrentColNo = function() {
    if (this.allSelCells.length == 0)
        return -1;
    return this.allSelCells[0].colNo
}
;
Sheet.prototype.GetCurrentRowNo = function() {
    if (this.allSelCells.length == 0)
        return -1;
    return this.allSelCells[0].rowNo
}
;
Sheet.prototype.GetCols = function() {
    return this.cols.length
}
;
Sheet.prototype.GetRows = function() {
    return this.rows.length
}
;
Sheet.prototype.GetSelectCellsJson = function() {
    var O6d9b = '{"cells":[';
    for (var ad8cb = 0, lenm = this.allSelCells.length; ad8cb < lenm; ad8cb++) {
        O6d9b += '{"col":' + this.allSelCells[ad8cb].colNo + ',"row":' + this.allSelCells[ad8cb].rowNo + '}';
        if (ad8cb != lenm - 1) {
            O6d9b += ","
        }
    }
    ;O6d9b += "]}";
    return O6d9b
}
;
Sheet.prototype.SetCellValue = function(O83f2, ae644, d610e) {
    _SetCellValue(this.GetCell(O83f2, ae644), d610e)
}
;
Sheet.prototype.GetCellValue = function(O83f2, ae644) {
    return _GetCellValue(this.GetCell(O83f2, ae644))
}
;
Sheet.prototype.ShowColLab = function(O85f4) {
    if (O85f4 == 0) {
        $(".collab").css("height", "0");
        $(".collab").css("line-height", "0");
        $(".rulercro").css("height", "0");
        $(".rulercro").css("line-height", "0");
        $(".collab").css("border-width", "0");
        $(".rulercro").css("border-width", "0");
        $(".collab").css("color", "transparent");
        $(".rulercro").css("color", "transparent")
    } else if (O85f4 == 1) {
        $(".collab").css("height", "20");
        $(".collab").css("line-height", "1");
        $(".rulercro").css("height", "20");
        $(".rulercro").css("line-height", "1");
        $(".collab").css("border-width", "1");
        $(".rulercro").css("border-width", "1");
        $(".collab").css("color", "black");
        $(".rulercro").css("color", "black")
    } else {
        alert("参数异常！")
    }
}
;
Sheet.prototype.ShowRowLab = function(O85f4) {
    if (O85f4 == 0) {
        $(".rowlab").css("width", "0");
        $(".rulercro").css("width", "0");
        $(".rowlab").css("border-width", "0");
        $(".rulercro").css("border-width", "0");
        $(".rowlab").css("color", "transparent");
        $(".rulercro").css("color", "transparent");
        _unselectAllCell(this);
    } else if (O85f4 == 1) {
        $(".rowlab").css("width", "20");
        $(".rulercro").css("width", "20");
        $(".rowlab").css("border-width", "1");
        $(".rulercro").css("border-width", "1");
        $(".rowlab").css("color", "black");
        $(".rulercro").css("color", "black")
    } else {
        alert("参数异常！")
    }
}
;
Sheet.prototype.MoveToCell = function(d971b, ad73f) {
    var f2a08 = this;
    var c4fbe = f2a08.GetCell(d971b, ad73f);
    if (c4fbe == null)
        return;
    _unselectAllCell(f2a08);
    _selectCell(f2a08, c4fbe);
    f2a08.allSelCells.push(c4fbe);
    calculateStaBar(f2a08)
}
;
Sheet.prototype.LoadArrData = function(bd8dc) {
    var f2a08 = this;
    for (var O657f = 0; O657f < bd8dc.length; O657f++) {
        if (O657f > f2a08.Cells.length - 1)
            continue;
        for (var abd5b = 0; abd5b < bd8dc[O657f].length; abd5b++) {
            if (abd5b > f2a08.Cells[O657f].length - 1)
                continue;
            _SetCellValue(f2a08.Cells[O657f][abd5b], bd8dc[O657f][abd5b])
        }
    }
}
;
Sheet.prototype.GetDataArr = function() {
    var bd8dc = [];
    var f2a08 = this;
    for (var O657f = 0; O657f < f2a08.Cells.length; O657f++) {
        bd8dc[O657f] = [];
        for (var abd5b = 0; abd5b < f2a08.Cells[O657f].length; abd5b++) {
            bd8dc[O657f][abd5b] = _GetCellValue(f2a08.Cells[O657f][abd5b])
        }
    }
    ;return bd8dc
}
;
Sheet.prototype.SetCellType = function(d971b, ad73f, O3e65) {
    _SetCellType(this.GetCell(d971b, ad73f), O3e65)
}
;
Sheet.prototype.SetCellFormat = function(d971b, ad73f, d6abe) {
    _SetCellFormat(this.GetCell(d971b, ad73f), d6abe)
}
;
Sheet.prototype.SetFormula = function(d971b, ad73f, c28ec) {
    var e5c89 = {
        "code": "text",
        "formula_expression": c28ec.toUpperCase()
    };
    _SetCellType(this.GetCell(d971b, ad73f), e5c89);
    _SetCellValue(this.GetCell(d971b, ad73f), "")
}
;
Sheet.prototype.SetCellReadOnly = function(d971b, ad73f, O52fc) {
    this.GetCell(d971b, ad73f).readonly = O52fc;
    if (O52fc == "1") {
        $(this.GetCell(d971b, ad73f)).addClass("cell-readonly-backcolor")
    }
    ;if (O52fc == "0") {
        $(this.GetCell(d971b, ad73f)).removeClass("cell-readonly-backcolor")
    }
}
;
Sheet.prototype.InsertCol = function(O9625, O3dea) {
    _InsertCol(this, O9625, O3dea)
}
;
Sheet.prototype.AppendCol = function(O3dea) {
    _AppendCol(this, O3dea)
}
;
Sheet.prototype.DeleteCol = function(O9625, O3dea) {
    _DeleteCol(this, O9625, O3dea)
}
;
Sheet.prototype.InsertRow = function(f63b4, O3dea) {
    _InsertRow(this, f63b4, O3dea)
}
;
Sheet.prototype.AppendRow = function(O3dea) {
    _AppendRow(this, O3dea)
}
;
Sheet.prototype.DeleteRow = function(f63b4, O3dea) {
    _DeleteRow(this, f63b4, O3dea)
}
;
Sheet.prototype.SetColHidden = function(d971b, ba719) {
    _HideCol(this, d971b, ba719)
}
;
Sheet.prototype.SetColUnHidden = function(d971b, ba719) {
    _UnHideCol(this, d971b, ba719)
}
;
Sheet.prototype.SetRowHidden = function(ad73f, O7c38) {
    _HideRow(this, ad73f, O7c38)
}
;
Sheet.prototype.SetRowUnHidden = function(ad73f, O7c38) {
    _UnHideRow(this, ad73f, O7c38)
}
;
Sheet.prototype.MergeCells = function(d971b, ad73f, ba719, O7c38) {
    _MergeCells(this, d971b, ad73f, ba719, O7c38);
}
;
Sheet.prototype.SplitCell = function(O83f2, ae644) {
    _SplitCell(this, O83f2, ae644);
}
;
Sheet.prototype.ManualCalculateSheet = function() {
    _ManualCalculateSheet(this)
}
;
function findInArr(a, b) {
    for (var c = 0; c < a.length; c++) {
        if (a[c]instanceof Array)
            return findInArr(a[c], b);
        if (a[c].name == b.name)
            return a[c]
    }
    return -1
}
function Rect(a, b, c, d) {
    this.x1 = a - 1,
    this.y1 = b - 1,
    this.x2 = c - 1,
    this.y2 = d - 1,
    this.getWidth = function() {
        return Math.abs(this.x1 - this.x2) + 1
    }
    ,
    this.getHeight = function() {
        return Math.abs(this.y1 - this.y2) + 1
    }
    ,
    this.getMinX = function() {
        return Math.min(this.x1, this.x2)
    }
    ,
    this.getMaxX = function() {
        return Math.max(this.x1, this.x2)
    }
    ,
    this.getMinY = function() {
        return Math.min(this.y1, this.y2)
    }
    ,
    this.getMaxY = function() {
        return Math.max(this.y1, this.y2)
    }
}
function StringBuffer() {
    this._strings_ = []
}
function base64encode(a) {
    for (var e, f, g, d = a.length, c = 0, b = ""; d > c; ) {
        if (e = 255 & a.charCodeAt(c++),
        c == d) {
            b += base64EncodeChars.charAt(e >> 2),
            b += base64EncodeChars.charAt((3 & e) << 4),
            b += "==";
            break
        }
        if (f = a.charCodeAt(c++),
        c == d) {
            b += base64EncodeChars.charAt(e >> 2),
            b += base64EncodeChars.charAt((3 & e) << 4 | (240 & f) >> 4),
            b += base64EncodeChars.charAt((15 & f) << 2),
            b += "=";
            break
        }
        g = a.charCodeAt(c++),
        b += base64EncodeChars.charAt(e >> 2),
        b += base64EncodeChars.charAt((3 & e) << 4 | (240 & f) >> 4),
        b += base64EncodeChars.charAt((15 & f) << 2 | (192 & g) >> 6),
        b += base64EncodeChars.charAt(63 & g)
    }
    return b
}
function base64decode(a) {
    for (var b, c, d, e, g = a.length, f = 0, h = ""; g > f; ) {
        do
            b = base64DecodeChars[255 & a.charCodeAt(f++)];
        while (g > f && -1 == b);if (-1 == b)
            break;
        do
            c = base64DecodeChars[255 & a.charCodeAt(f++)];
        while (g > f && -1 == c);if (-1 == c)
            break;
        h += String.fromCharCode(b << 2 | (48 & c) >> 4);
        do {
            if (d = 255 & a.charCodeAt(f++),
            61 == d)
                return h;
            d = base64DecodeChars[d]
        } while (g > f && -1 == d);if (-1 == d)
            break;
        h += String.fromCharCode((15 & c) << 4 | (60 & d) >> 2);
        do {
            if (e = 255 & a.charCodeAt(f++),
            61 == e)
                return h;
            e = base64DecodeChars[e]
        } while (g > f && -1 == e);if (-1 == e)
            break;
        h += String.fromCharCode((3 & d) << 6 | e)
    }
    return h
}
function utf16to8(a) {
    var b, c, d, e;
    for (b = "",
    d = a.length,
    c = 0; d > c; c++)
        e = a.charCodeAt(c),
        e >= 1 && 127 >= e ? b += a.charAt(c) : e > 2047 ? (b += String.fromCharCode(224 | 15 & e >> 12),
        b += String.fromCharCode(128 | 63 & e >> 6),
        b += String.fromCharCode(128 | 63 & e >> 0)) : (b += String.fromCharCode(192 | 31 & e >> 6),
        b += String.fromCharCode(128 | 63 & e >> 0));
    return b
}
function utf8to16(a) {
    for (var e, f, g, b = "", d = a.length, c = 0; d > c; )
        switch (e = a.charCodeAt(c++),
        e >> 4) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
            b += a.charAt(c - 1);
            break;
        case 12:
        case 13:
            f = a.charCodeAt(c++),
            b += String.fromCharCode((31 & e) << 6 | 63 & f);
            break;
        case 14:
            f = a.charCodeAt(c++),
            g = a.charCodeAt(c++),
            b += String.fromCharCode((15 & e) << 12 | (63 & f) << 6 | (63 & g) << 0)
        }
    return b
}
function hex_md5(a) {
    return binl2hex(core_md5(str2binl(a), a.length * chrsz))
}
function b64_md5(a) {
    return binl2b64(core_md5(str2binl(a), a.length * chrsz))
}
function str_md5(a) {
    return binl2str(core_md5(str2binl(a), a.length * chrsz))
}
function hex_hmac_md5(a, b) {
    return binl2hex(core_hmac_md5(a, b))
}
function b64_hmac_md5(a, b) {
    return binl2b64(core_hmac_md5(a, b))
}
function str_hmac_md5(a, b) {
    return binl2str(core_hmac_md5(a, b))
}
function core_md5(a, b) {
    var c, d, e, f, g, h, i, j, k;
    for (a[b >> 5] |= 128 << b % 32,
    a[(b + 64 >>> 9 << 4) + 14] = b,
    c = 1732584193,
    d = -271733879,
    e = -1732584194,
    f = 271733878,
    g = 0; g < a.length; g += 16)
        h = c,
        i = d,
        j = e,
        k = f,
        c = md5_ff(c, d, e, f, a[g + 0], 7, -680876936),
        f = md5_ff(f, c, d, e, a[g + 1], 12, -389564586),
        e = md5_ff(e, f, c, d, a[g + 2], 17, 606105819),
        d = md5_ff(d, e, f, c, a[g + 3], 22, -1044525330),
        c = md5_ff(c, d, e, f, a[g + 4], 7, -176418897),
        f = md5_ff(f, c, d, e, a[g + 5], 12, 1200080426),
        e = md5_ff(e, f, c, d, a[g + 6], 17, -1473231341),
        d = md5_ff(d, e, f, c, a[g + 7], 22, -45705983),
        c = md5_ff(c, d, e, f, a[g + 8], 7, 1770035416),
        f = md5_ff(f, c, d, e, a[g + 9], 12, -1958414417),
        e = md5_ff(e, f, c, d, a[g + 10], 17, -42063),
        d = md5_ff(d, e, f, c, a[g + 11], 22, -1990404162),
        c = md5_ff(c, d, e, f, a[g + 12], 7, 1804603682),
        f = md5_ff(f, c, d, e, a[g + 13], 12, -40341101),
        e = md5_ff(e, f, c, d, a[g + 14], 17, -1502002290),
        d = md5_ff(d, e, f, c, a[g + 15], 22, 1236535329),
        c = md5_gg(c, d, e, f, a[g + 1], 5, -165796510),
        f = md5_gg(f, c, d, e, a[g + 6], 9, -1069501632),
        e = md5_gg(e, f, c, d, a[g + 11], 14, 643717713),
        d = md5_gg(d, e, f, c, a[g + 0], 20, -373897302),
        c = md5_gg(c, d, e, f, a[g + 5], 5, -701558691),
        f = md5_gg(f, c, d, e, a[g + 10], 9, 38016083),
        e = md5_gg(e, f, c, d, a[g + 15], 14, -660478335),
        d = md5_gg(d, e, f, c, a[g + 4], 20, -405537848),
        c = md5_gg(c, d, e, f, a[g + 9], 5, 568446438),
        f = md5_gg(f, c, d, e, a[g + 14], 9, -1019803690),
        e = md5_gg(e, f, c, d, a[g + 3], 14, -187363961),
        d = md5_gg(d, e, f, c, a[g + 8], 20, 1163531501),
        c = md5_gg(c, d, e, f, a[g + 13], 5, -1444681467),
        f = md5_gg(f, c, d, e, a[g + 2], 9, -51403784),
        e = md5_gg(e, f, c, d, a[g + 7], 14, 1735328473),
        d = md5_gg(d, e, f, c, a[g + 12], 20, -1926607734),
        c = md5_hh(c, d, e, f, a[g + 5], 4, -378558),
        f = md5_hh(f, c, d, e, a[g + 8], 11, -2022574463),
        e = md5_hh(e, f, c, d, a[g + 11], 16, 1839030562),
        d = md5_hh(d, e, f, c, a[g + 14], 23, -35309556),
        c = md5_hh(c, d, e, f, a[g + 1], 4, -1530992060),
        f = md5_hh(f, c, d, e, a[g + 4], 11, 1272893353),
        e = md5_hh(e, f, c, d, a[g + 7], 16, -155497632),
        d = md5_hh(d, e, f, c, a[g + 10], 23, -1094730640),
        c = md5_hh(c, d, e, f, a[g + 13], 4, 681279174),
        f = md5_hh(f, c, d, e, a[g + 0], 11, -358537222),
        e = md5_hh(e, f, c, d, a[g + 3], 16, -722521979),
        d = md5_hh(d, e, f, c, a[g + 6], 23, 76029189),
        c = md5_hh(c, d, e, f, a[g + 9], 4, -640364487),
        f = md5_hh(f, c, d, e, a[g + 12], 11, -421815835),
        e = md5_hh(e, f, c, d, a[g + 15], 16, 530742520),
        d = md5_hh(d, e, f, c, a[g + 2], 23, -995338651),
        c = md5_ii(c, d, e, f, a[g + 0], 6, -198630844),
        f = md5_ii(f, c, d, e, a[g + 7], 10, 1126891415),
        e = md5_ii(e, f, c, d, a[g + 14], 15, -1416354905),
        d = md5_ii(d, e, f, c, a[g + 5], 21, -57434055),
        c = md5_ii(c, d, e, f, a[g + 12], 6, 1700485571),
        f = md5_ii(f, c, d, e, a[g + 3], 10, -1894986606),
        e = md5_ii(e, f, c, d, a[g + 10], 15, -1051523),
        d = md5_ii(d, e, f, c, a[g + 1], 21, -2054922799),
        c = md5_ii(c, d, e, f, a[g + 8], 6, 1873313359),
        f = md5_ii(f, c, d, e, a[g + 15], 10, -30611744),
        e = md5_ii(e, f, c, d, a[g + 6], 15, -1560198380),
        d = md5_ii(d, e, f, c, a[g + 13], 21, 1309151649),
        c = md5_ii(c, d, e, f, a[g + 4], 6, -145523070),
        f = md5_ii(f, c, d, e, a[g + 11], 10, -1120210379),
        e = md5_ii(e, f, c, d, a[g + 2], 15, 718787259),
        d = md5_ii(d, e, f, c, a[g + 9], 21, -343485551),
        c = safe_add(c, h),
        d = safe_add(d, i),
        e = safe_add(e, j),
        f = safe_add(f, k);
    return Array(c, d, e, f)
}
function md5_cmn(a, b, c, d, e, f) {
    return safe_add(bit_rol(safe_add(safe_add(b, a), safe_add(d, f)), e), c)
}
function md5_ff(a, b, c, d, e, f, g) {
    return md5_cmn(b & c | ~b & d, a, b, e, f, g)
}
function md5_gg(a, b, c, d, e, f, g) {
    return md5_cmn(b & d | c & ~d, a, b, e, f, g)
}
function md5_hh(a, b, c, d, e, f, g) {
    return md5_cmn(b ^ c ^ d, a, b, e, f, g)
}
function md5_ii(a, b, c, d, e, f, g) {
    return md5_cmn(c ^ (b | ~d), a, b, e, f, g)
}
function core_hmac_md5(a, b) {
    var d, e, f, g, c = str2binl(a);
    for (c.length > 16 && (c = core_md5(c, a.length * chrsz)),
    d = Array(16),
    e = Array(16),
    f = 0; 16 > f; f++)
        d[f] = 909522486 ^ c[f],
        e[f] = 1549556828 ^ c[f];
    return g = core_md5(d.concat(str2binl(b)), 512 + b.length * chrsz),
    core_md5(e.concat(g), 640)
}
function safe_add(a, b) {
    var c = (65535 & a) + (65535 & b)
      , d = (a >> 16) + (b >> 16) + (c >> 16);
    return d << 16 | 65535 & c
}
function bit_rol(a, b) {
    return a << b | a >>> 32 - b
}
function str2binl(a) {
    var d, b = Array(), c = (1 << chrsz) - 1;
    for (d = 0; d < a.length * chrsz; d += chrsz)
        b[d >> 5] |= (a.charCodeAt(d / chrsz) & c) << d % 32;
    return b
}
function binl2str(a) {
    var d, b = "", c = (1 << chrsz) - 1;
    for (d = 0; d < 32 * a.length; d += chrsz)
        b += String.fromCharCode(a[d >> 5] >>> d % 32 & c);
    return b
}
function binl2hex(a) {
    var d, b = hexcase ? "0123456789ABCDEF" : "0123456789abcdef", c = "";
    for (d = 0; d < 4 * a.length; d++)
        c += b.charAt(15 & a[d >> 2] >> 8 * (d % 4) + 4) + b.charAt(15 & a[d >> 2] >> 8 * (d % 4));
    return c
}
function binl2b64(a) {
    var d, e, f, b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", c = "";
    for (d = 0; d < 4 * a.length; d += 3)
        for (e = (255 & a[d >> 2] >> 8 * (d % 4)) << 16 | (255 & a[d + 1 >> 2] >> 8 * ((d + 1) % 4)) << 8 | 255 & a[d + 2 >> 2] >> 8 * ((d + 2) % 4),
        f = 0; 4 > f; f++)
            c += 8 * d + 6 * f > 32 * a.length ? b64pad : b.charAt(63 & e >> 6 * (3 - f));
    return c
}
function getRoot() {
    var a = location.hostname;
    return a.toUpperCase()
}
function addWaterMarker(a, b) {
    var e, c = document.createElement("canvas"), d = a;
    d.append(c),
    c.width = 400,
    c.height = 200,
    c.style.display = "none",
    e = c.getContext("2d"),
    e.rotate(-20 * Math.PI / 180),
    e.font = "16px Microsoft JhengHei",
    e.fillStyle = "rgba(17, 17, 17, 0.50)",
    e.textAlign = "left",
    e.textBaseline = "Middle",
    e.fillText(b, c.width / 3, c.height / 2),
    $(a).css("background-color", "yellow!important")
}
function accAdd(a, b) {
    var c, d, e, f, h, i;
    try {
        c = a.toString().split(".")[1].length
    } catch (g) {
        c = 0
    }
    try {
        d = b.toString().split(".")[1].length
    } catch (g) {
        d = 0
    }
    return f = Math.abs(c - d),
    e = Math.pow(10, Math.max(c, d)),
    f > 0 ? (h = Math.pow(10, f),
    c > d ? (a = Number(a.toString().replace(".", "")),
    b = Number(b.toString().replace(".", "")) * h) : (a = Number(a.toString().replace(".", "")) * h,
    b = Number(b.toString().replace(".", "")))) : (a = Number(a.toString().replace(".", "")),
    b = Number(b.toString().replace(".", ""))),
    i = (a + b) / e,
    zftoFixed2(i)
}
function accSub(a, b) {
    var c, d, e, f, h;
    try {
        c = a.toString().split(".")[1].length
    } catch (g) {
        c = 0
    }
    try {
        d = b.toString().split(".")[1].length
    } catch (g) {
        d = 0
    }
    return e = Math.pow(10, Math.max(c, d)),
    f = c >= d ? c : d,
    h = zftoFixed((a * e - b * e) / e, f),
    zftoFixed2(h)
}
function accMul(a, b) {
    var g, c = 0, d = a.toString(), e = b.toString();
    try {
        c += d.split(".")[1].length
    } catch (f) {}
    try {
        c += e.split(".")[1].length
    } catch (f) {}
    return g = Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c),
    zftoFixed2(g)
}
function accDiv(a, b) {
    var e, f, h, c = 0, d = 0;
    try {
        c = a.toString().split(".")[1].length
    } catch (g) {}
    try {
        d = b.toString().split(".")[1].length
    } catch (g) {}
    return e = Number(a.toString().replace(".", "")),
    f = Number(b.toString().replace(".", "")),
    h = e / f * Math.pow(10, d - c),
    zftoFixed2(h)
}
function zftoFixed(a, b) {
    return a *= Math.pow(10, b),
    a = Math.round(a),
    a / Math.pow(10, b)
}
function zftoFixed2(a) {
    var b = 0;
    try {
        b = a.toString().split(".")[1].length
    } catch (c) {}
    return b > 9 ? zftoFixed(a, 9) : a
}
function ztranslate(a) {
    var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r;
    if (void 0 == a)
        return a;
    if (b = [],
    c = a.replace(/\s/g, ""),
    d = [],
    e = c.split(/["]+[^"]*["]+|[']+[^']*[']+|\*\*|\+|-|\*|\/|\(|\)|\?|>[=]|<[=]|={2}|:|&{2}|\|{2}|\{|\}|=|%|\.\/|\.\*|,/g),
    f = c.match(/["]+[^"]*["]+|[']+[^']*[']+|\*\*|\+|-|\*|\/|\(|\)|\?|>[=]|<[=]|={2}|:|&{2}|\|{2}|\{|\}|=|%|\.\/|\.\*|,/g),
    void 0 == e)
        return a;
    if (void 0 == f)
        return a;
    for (g = 0,
    h = f.length; h > g; g++)
        "" != e[g] && d.push(e[g]),
        "" != f[g] && d.push(f[g]);
    for (d.push(e[f.length]),
    g = 0; g < d.length; g++)
        if (i = d[g],
        /\*\*|\+|-|\*|\/|%|\.\/|\.\*/.test(d[g]))
            j = b.pop(),
            k = "__replace__(" + j + ",'" + d[g] + "',",
            b.push(k);
        else if (")" == d[g]) {
            for (l = d[g],
            m = b.pop(); "(" != m; )
                l = m + l,
                m = b.pop();
            for (l = m + l,
            n = b[b.length - 1]; /[_\w]+[\.]?[_\w]+/.test(n) && !/^__replace__\(/.test(n) && void 0 != n; )
                n = b.pop(),
                l = n + l,
                n = b[b.length - 1];
            for (n = b[b.length - 1]; void 0 != n && /^__replace__\(/.test(n); )
                n = b.pop(),
                l = n + l + ")",
                n = b[b.length - 1];
            b.push(l)
        } else {
            if ("" == d[g] || " " == d[g])
                continue;
            for (n = b[b.length - 1],
            o = d[g]; void 0 != n && /^__replace__\(/.test(n) && !/\*\*|\+|-|\*|\/|\(|\?|>[=]|<[=]|={2}|:|&{2}|\|{2}|\{|=|\}|%|\.\/|\.\*/.test(i) && !/^__replace__\(/.test(i); ) {
                if (void 0 == d[g + 1]) {
                    n = b.pop(),
                    o = n + o + ")";
                    break
                }
                n = b.pop(),
                o = "(" == d[g + 1] ? n + o : n + o + ")",
                n = b[b.length - 1]
            }
            b.push(o)
        }
    for (p = "",
    q = 0,
    r = b.length; r > q; q++)
        p += b[q];
    return p
}
function __replace__(a, b, c) {
    if ("number" != typeof a && "number" != typeof c)
        return new Function("a","b","return a" + b + "b")(a, c);
    if (typeof a != typeof c)
        if ("number" == typeof a && "" == c)
            c = 0;
        else {
            if ("number" != typeof c || "" != a)
                return "#VALUE!";
            a = 0
        }
    if ("+" == b)
        return a.add(c);
    if ("-" == b)
        return a.sub(c);
    if ("*" == b)
        return a.mul(c);
    if ("/" == b)
        return a.div(c);
    throw b + "运算符无法识别"
}
var base64EncodeChars, base64DecodeChars, hexcase, b64pad, chrsz;
StringBuffer.prototype.zfappend = function(a) {
    this._strings_.push(a)
}
,
StringBuffer.prototype.toString = function() {
    return this._strings_.join("")
}
,
base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
base64DecodeChars = new Array(-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,-1,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-1,-1,-1,-1,-1),
hexcase = 0,
b64pad = "",
chrsz = 8,
Number.prototype.add = function(a) {
    return accAdd(a, this)
}
,
Number.prototype.sub = function(a) {
    return accSub(this, a)
}
,
Number.prototype.mul = function(a) {
    return accMul(this, a)
}
,
Number.prototype.div = function(a) {
    return accDiv(this, a)
}
;