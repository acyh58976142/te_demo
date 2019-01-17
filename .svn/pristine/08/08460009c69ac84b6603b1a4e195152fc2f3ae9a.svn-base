$(function() {

})

var HistogramChart;
var HistogramChartBarLine;
var PieChart;

var echartsTool = {
	/**
	 * 绘制柱状图 divId:柱状图容器的id titleName:柱状图标题 legendName:图例名称 数组 xAxisTitle:x轴名称
	 * xAxisData:x轴数据 数组 yAxisTitle:y轴名称 seriesTitle:图表标题 seriesData:图表数据 数组
	 */
	flowHistogram : function(divId, titleName, legendName, xAxisTitle,
			xAxisData, yAxisTitle, seriesTitle, seriesData) {
		// echart配置start
		var echartId = document.getElementById(divId);
		HistogramChart = echarts.init(echartId, 'macarons');
		// 指定图表的配置项和数据
		option = {
			color : [ '#3398DB' ],// 柱状图颜色
			tooltip : {
				trigger : 'axis',
				axisPointer : { // 坐标轴指示器，坐标轴触发有效
					type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			toolbox : {
				show : true,
				x : "right",
				feature : {
					mark : {
						show : true
					},
					dataView : {
						show : true,
						readOnly : false
					},
					restore : {
						show : true
					},
					saveAsImage : {
						show : true
					}
				}
			},
			grid : { // 柱状图的位置调节
				left : '3%',
				right : '8%',
				bottom : '3%',
				containLabel : true
			},
			title : { // 柱状图标题
				x : "center",
				text : titleName,
				textStyle : {
					fontFamily : '微软雅黑',
					color : "#05a1d1",
					fontSize : '16'
				},
			},
			legend : { // 图例
				x : "left",
				data : legendName,
				textStyle : {
					fontFamily : '微软雅黑',
					fontSize : '12'
				},
			},
			xAxis : [ {
				name : xAxisTitle,
				type : 'category',
				data : xAxisData,
				axisTick : {
					alignWithLabel : true
				},
				axisLine : {
					lineStyle : {
						fontFamily : '微软雅黑',
						color : '#656565',
						fontSize : "14"
					}
				},
			} ],
			yAxis : [ {
				name : yAxisTitle,
				type : 'value',
				axisLine : {
					lineStyle : {
						fontFamily : '微软雅黑',
						color : '#656565',
						fontSize : "14"
					}
				},
			} ],
			series : [ {
				name : seriesTitle,
				type : 'bar',
				stack : 'sum',
				barWidth : '30px',
				barCategoryGap : '40%',
				itemStyle : {
					normal : {
						color : '#3398DB',
						label : {
							show : true,
							position : 'top',
							textStyle : {
								color : '#656565'
							}
						},
					}
				},
				data : seriesData
			} ]
		};

		// 使用刚指定的配置项和数据显示图表。
		HistogramChart.setOption(option);
	},
	// 双柱状图
	flowHistogramTwo : function(divId, titleName, legendName, xAxisTitle,
			xAxisData, yAxisTitle, seriesTitle1, seriesData1, seriesTitle2,
			seriesData2) {
		// echart配置start
		var echartId = document.getElementById(divId);
		HistogramChart = echarts.init(echartId, 'macarons');
		// 指定图表的配置项和数据
		option = {
			color : [ '#3398DB' ],// 柱状图颜色
			tooltip : {
				trigger : 'axis',
				axisPointer : { // 坐标轴指示器，坐标轴触发有效
					type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			toolbox : {
				show : true,
				x : "right",
				feature : {
					mark : {
						show : true
					},
					dataView : {
						show : true,
						readOnly : false
					},
					restore : {
						show : true
					},
					saveAsImage : {
						show : true
					}
				}
			},
			grid : { // 柱状图的位置调节
				left : '3%',
				right : '8%',
				bottom : '3%',
				top : "100px",
				containLabel : true
			},
			title : { // 柱状图标题
				x : "center",
				text : titleName,
				textStyle : {
					fontFamily : '微软雅黑',
					color : '#05a1d1',
					fontSize : '16'
				},
			},
			legend : { // 图例
				orient : 'vertical',
				x : "left",
				data : legendName,
				textStyle : {
					fontFamily : '微软雅黑',
					fontSize : '12'
				},
			},
			xAxis : [ {
				name : xAxisTitle,
				type : 'category',
				data : xAxisData,
				axisTick : {
					alignWithLabel : true
				},
				axisLine : {
					lineStyle : {
						fontFamily : '微软雅黑',
						color : '#656565',
						fontSize : "14"
					}
				},
			} ],
			yAxis : [ {
				name : yAxisTitle,
				axisLine : {
					lineStyle : {
						fontFamily : '微软雅黑',
						color : '#656565',
						fontSize : "14"
					}
				},
				type : 'value'
			} ],
			series : [ {
				name : seriesTitle1,
				type : 'bar',
				barWidth : '30px',
				barCategoryGap : '40%',
				itemStyle : {
					normal : {
						color : '#3398DB',
						// barBorderColor: '#3398DB',
						// barBorderWidth: 6,
						// barBorderRadius:0,
						label : {
							show : true,
							position : 'top',
							textStyle : {
								color : '#656565'
							}
						}
					}
				},
				data : seriesData1
			}, {
				name : seriesTitle2,
				type : 'bar',
				barCategoryGap : '40%',
				itemStyle : {
					normal : {
						color : '#FF9F15',
						// barBorderColor: '#FF9F15',
						// barBorderWidth: 6,
						// barBorderRadius:0,
						label : {
							show : true,
							position : 'top',
							textStyle : {
								color : '#656565'
							}
						}
					}
				},
				data : seriesData2
			} ]
		};

		// 使用刚指定的配置项和数据显示图表。
		HistogramChart.setOption(option);
	},

	// 折线和柱状图一体
	flowHistogramBarLine : function(divId,titleName, legendName, xAxisName,
			xAxisData, yAxisNameLine, yAxisNameBar,seriesNameLine,seriesNameBar, seriesDataLine,
			seriesDataBar) {
		// echart配置start
		var echartId = document.getElementById(divId);
		HistogramChartBarLine = echarts.init(echartId, 'macarons');
		option = {
			tooltip : {
				trigger : 'axis',
				axisPointer : {
					type : 'cross',
					crossStyle : {
						color : '#999'
					}
				}
			},
			grid : { // 柱状图的位置调节
				left : '3%',
				right : '8%',
				bottom : '3%',
				containLabel : true
			},
			title : { // 柱状图标题
				x : "center",
				text : titleName,
			},
			toolbox : {
				feature : {
					dataView : {
						show : true,
						readOnly : false
					},
					magicType : {
						show : true,
						type : [ 'line', 'bar' ]
					},
					restore : {
						show : true
					},
					saveAsImage : {
						show : true
					}
				}
			},
			legend : {
				x : "left",
				data : legendName
			},
			xAxis : [ {
				name : xAxisName,
				type : 'category',
				data : xAxisData,
				axisPointer : {
					type : 'shadow'
				}
			} ],
			yAxis : [ {
				type : 'value',
				name : yAxisNameLine,
				min : 0,
				axisLabel : {
					formatter : '{value}'
				}
			}, {
				type : 'value',
				name : yAxisNameBar,
				min : 0,
				axisLabel : {
					formatter : '{value}'
				}
			} ],
			series : [ {
				name : seriesNameLine,
				type : 'line',
				itemStyle : {
					normal : {
						color : '#FF9F15',
						// barBorderColor: '#FF9F15',
						// barBorderWidth: 6,
						// barBorderRadius:0,
						label : {
							show : true,
							position : 'start',
							textStyle : {
								color : '#656565'
							}
						}
					}
				},
				data : seriesDataLine
			}, {
				name : seriesNameBar,
				type : 'bar',
				yAxisIndex : 1,
				barWidth : '30px',
				itemStyle : {
					normal : {
//						color : '#FF9F15',
						// barBorderColor: '#FF9F15',
						// barBorderWidth: 6,
						// barBorderRadius:0,
						label : {
							show : true,
							position : 'top',
							textStyle : {
								color : '#656565'
							}
						}
					}
				},
				data : seriesDataBar
			} ]
		};
		HistogramChartBarLine.setOption(option, true);
	},

	/**
	 * 绘制饼图 divId:饼图容器的id titleName:饼图标题 legendName:图例名称 数组 seriesTitle:图表标题
	 * seriesData:图表数据 json数组
	 */
	flowPiechart : function(divId, titleName, legendName, seriesTitle,seriesData) {
		// echart配置start
		var echartId = document.getElementById(divId);
		PieChart = echarts.init(echartId, 'macarons');
		option = {
			title : {
				text : titleName,
				x : 'center'
			},
			tooltip : {
				trigger : 'item',
				formatter : "{a} <br/>{b} : {c} ({d}%)"
			},
			toolbox : {
				show : true,
				right : '3%',
				feature : {
					mark : {
						show : true
					},
					dataView : {
						show : true,
						readOnly : false
					},
//					restore : {
//						show : true
//					},
					saveAsImage : {
						show : true
					}
				}
			},
			legend : {
				orient : 'vertical',
				left : 'left',
				data : legendName
			},
			series : [ {
				name : seriesTitle,
				type : 'pie',
				radius : '60%',
				center : [ '50%', '60%' ],
				data : seriesData,
				itemStyle : {
					emphasis : {
						shadowBlur : 10,
						shadowOffsetX : 0,
						shadowColor : 'rgba(0, 0, 0, 0.5)'
					}
				}
			} ]
		};
		// 使用刚指定的配置项和数据显示图表。
		PieChart.setOption(option);
	},

	/**
	 * 绘制环状饼图 divId:饼图容器的id titleName:饼图标题 legendName:图例名称 数组 seriesTitle:图表标题
	 * seriesData:图表数据 json数组
	 */
	flowAnnularPiechart : function(divId, titleName, legendName, seriesTitle1,
			seriesTitle2, seriesData1, seriesData2) {
		// echart配置start
		var echartId = document.getElementById(divId);
		PieChart = echarts.init(echartId, 'macarons');
		option = {
			title : {
				text : titleName,
				x : 'center',
				textStyle : {
					fontFamily : '微软雅黑',
					color : '#05a1d1',
					fontSize : '16'
				},
			},
			tooltip : {
				trigger : 'item',
				formatter : "{a} <br/>{b} : {c} ({d}%)"
			},
			toolbox : {
				show : true,
				right : '3%',
				feature : {
					mark : {
						show : true
					},
					dataView : {
						show : true,
						readOnly : false
					},
//					restore : {
//						show : true
//					},
					saveAsImage : {
						show : true
					}
				}
			},
			legend : {
				orient : 'vertical',
				left : 'left',
				data : legendName,
				textStyle : {
					fontFamily : '微软雅黑',
					fontSize : '12'
				},
			},
			series : [ {
				name : seriesTitle1,
				type : 'pie',
				selectedMode : 'single',
				radius : [ 0, '50%' ],
				label : {
					normal : {
						position : 'inner'
					}
				},
				labelLine : {
					normal : {
						show : false
					}
				},
				data : seriesData1,
				itemStyle : {
					emphasis : {
						shadowBlur : 10,
						shadowOffsetX : 0,
						shadowColor : 'rgba(0, 0, 0, 0.5)'
					}
				}
			}, {
				name : seriesTitle2,
				type : 'pie',
				radius : [ '60%', '75%' ],
				label : {
					normal : {
						formatter : '{b}',
					}
				},
				data : seriesData2
			} ]
		};
		// 使用刚指定的配置项和数据显示图表。
		PieChart.setOption(option);
	}
}
