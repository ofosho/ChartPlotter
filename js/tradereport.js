/*
JavaScript File written for GPNet
Author:	The Omar Chanouha (ofosho) 
		ofosho@gatech.edu
Associated PHP:	tradereport.php
Ajax PHP: 	
Framework:	JQuery.js v1.3.2
Desription:
Create Plot of Data
*/
var datasets = [];
var data = [];
var legends = null;
var updateLegendTimeout = null;
var latestPosition = null;
var plot = null;
var overview = null;
Array.prototype.getMax = function() {
//get max number in array
	var max = this[0][1];
	var len = this.length;
	for (var i = 1; i < len; i++) if (this[i][1] > max) max = this[i][1];
	return max;
}
Array.prototype.getMin = function() {
//get min number in array
	var min = this[0][1];
	var len = this.length;
	for (var i = 1; i < len; i++) if (this[i][1] < min) min = this[i][1];
	return min;
}
function addCommas(nStr){
//add commas to a floating point number
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}
$(document).ready(function(){
//start report creation
	getHistoricalInfo();
});
function getHistoricalInfo(){
//get historical info
	dataName = $('#file').val();
	$('#title').html(dataName);
	groupName = $('#group').val();
	$.ajax({
		url: '../php/getCSVasTable.php',
		method: 'GET',
		data: {file: dataName, group:groupName},
		datatype: 'html',
		success: function(data){
			$("#hist").append("<div class='histdata'><b class='tick'>"+dataName+"</b>"+data+"</div>");
			addData(dataName);
			plotChart();
		},
		error: function(){ alert('Something went wrong...') }});
}
function getValue(el,colName) {
//format and add a new [x,y] to a dataset
	var point = [(new Date($(el).find(".date").html().replace("-","/"))).getTime(),$(el).find("."+ colName).html()];
	data.push(point);
}
function addDataSet(dataName,colName){
//add data to the gobal datsets
	data = [];
	$('#'+dataName).find("tbody > tr").each(function(i,el){getValue(el,colName)});
	//var newset = {"label": dataName+'_'+colName, "data": data};
	var newset = {"label": colName, "data": data};
	datasets.push(newset);
}
function addData(dataName){
	$('#'+dataName).find("thead > tr > th").each(function(){
		if($(this).html() != 'date')
			addDataSet(dataName, $(this).html());
	});
}
function plotChart(){
//plot the data
    var i = 0;
    $.each(datasets, function(key, val) {
        val.color = i;
        ++i;
    });
	
	var choiceContainer = $("#choices");
	choiceContainer.html('');
    $.each(datasets, function(key, val) {
        choiceContainer.append('<br/><input type="checkbox" name="' + key +
                               '" checked="checked" ' + ' id="id' + key + '">' +
                               '<label for="id' + key + '">'
                                + val.label + '</label>');
    });
    choiceContainer.find("input").click(plotAccordingToChoices);
	
	plotAccordingToChoices();
}
function updateLegend() {
//upddate the legend with values over the crosshair
	updateLegendTimeout = null;
	
	var pos = latestPosition;		
	var axes = plot.getAxes();
	if (pos.x < axes.xaxis.min || pos.x > axes.xaxis.max ||
		pos.y < axes.yaxis.min || pos.y > axes.yaxis.max)
		return;

	var i, j, dataset = plot.getData();
	for (i = 0; i < dataset.length; ++i) {
		var series = dataset[i];
		// find the nearest points, x-wise
		for (j = 0; j < series.data.length; ++j)
			if (series.data[j][0] > pos.x)
				break;

		// now interpolate
		var y, p1 = series.data[j - 1], p2 = series.data[j];
		if (p1 == null)
			y = p2[1];
		else if (p2 == null)
			y = p1[1];
		else
			y = parseFloat(p1[1]) + (p2[1] - p1[1]) * (pos.x - p1[0]) / (p2[0] - p1[0]);

		legends.eq(i).text(addCommas(series.label +" = " + y));
	}
	var temp=i;
	var i, j, dataset = overview.getData();
	for (i = 0; i < dataset.length; ++i) {
		var series = dataset[i];
		// find the nearest points, x-wise
		for (j = 0; j < series.data.length; ++j)
			if (series.data[j][0] > pos.x)
				break;

		// now interpolate
		var y, p1 = series.data[j - 1], p2 = series.data[j];
		if (p1 == null)
			y = p2[1];
		else if (p2 == null)
			y = p1[1];
		else
			y = parseFloat(p1[1]) + (p2[1] - p1[1]) * (pos.x - p1[0]) / (p2[0] - p1[0]);

		legends.eq(i+temp).text(addCommas(series.label +" = " + y));
	}
}
function plotAccordingToChoices(){
//replot the chart based on user input
	data = [];
	var choiceContainer = $("#choices");
	choiceContainer.find("input:checked").each(function () {
		var key = $(this).attr("name");
		//datasets[key]["yaxis"] = 2;
		if (key && datasets[key]["label"].match("olume") > -1)
			data.push(datasets[key]);
	});	
	
	var options = { xaxis: { ticks: [], mode: "time" },
					xaxis:{tickFormatter: function(v,axis){return "";}},
					yaxis:{position:"right"},
					grid: {hoverable: true, autoHighlight: false, show:true},
					crosshair: { mode: "x" },
					selection:{mode: "x"},
					legend:{backgroundColor:null,backgroundOpacity:0}
				  };
			
	plot = $.plot($("#placeholder"), data ,options);
	
	var data2 = [];
	data2.push(datasets[1]);
    overview = $.plot($("#overview"), data2, {
        series: {			
            lines: { show: true, lineWidth: 1 },
            shadowSize: 0
        },
		grid: {backgroundColor: '#FFFFFF'},
		xaxis:{mode:"time",timeformat:"%b %d, %y"},
		yaxis:{position:"right",labelWidth:10,tickFormatter: function(v,axis){return v.toString().substring(0,2)}},
        selection: { mode: "x" },
		legend:{backgroundColor:null,backgroundOpacity:0},
		bars: {show: true}
    });
	
	legends = $(".legendLabel");
	$("table").draggable();

    $("#placeholder").bind("plotselected", function (event, ranges) {
       plot = $.plot($("#placeholder"), data,
                      $.extend(true, {}, options, {
                          xaxis: { min: ranges.xaxis.from, max: ranges.xaxis.to }
                      }));
		legends = $(".legendLabel");
		$("table").draggable();
        // don't fire event on the overview to prevent eternal loop
        overview.setSelection(ranges, true);
    });
	
    $("#overview").bind("plotselected", function (event, ranges) {
        plot.setSelection(ranges);
    });		
	
    $("#placeholder").bind("plothover",  function (event, pos, item) {
		latestPosition = pos;
        if (!updateLegendTimeout)
            updateLegendTimeout = setTimeout(updateLegend, 50);
    });
}
