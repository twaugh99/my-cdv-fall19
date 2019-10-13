console.log("middle spread script loaded");

let w = 1200;
let h = 800;

d3.json("data.json").then(gotData);
let stringToDateObjectConverter = d3.utcParse("%Y-%m-%dT%H:%M:%S.%LZ");
let stringToHourObjectConverter = d3.utcParse("%Y-%m-%dT%H:%M:%S.%LZ");

function gotData(incomingData){
  // console.log(incomingData);

  function findMinKey(d){
    let timeString = d.day;
    let properlyFormatted = stringToHourObjectConverter(timeString);
    return properlyFormatted;
  }
  let minYear = d3.min(incomingData, findMinKey);

  function findMaxKey(d){
    let timeString = d.day;
    let properlyFormatted = stringToDateObjectConverter(timeString);
    return properlyFormatted;
  }
  let maxYear = d3.max(incomingData, findMaxKey);

  let xDomain = [minYear, maxYear];
  let xPadding = 40;
  let xScale = d3.scaleTime().domain(xDomain).range([xPadding+35, w-(xPadding*2)]);
  // console.log(xDomain);

  let xAxis = d3.axisBottom(xScale);
  let xAxisYPos = h-20;


  function findMinKeyHOUR(d){
    let timeString = d.hour;
    let properlyFormatted = stringToDateObjectConverter(timeString);
    return properlyFormatted;
  }

  let minHour = d3.min(incomingData, findMinKeyHOUR);

  function findMaxKeyHOUR(d){
    let timeString = d.hour;
    let properlyFormatted = stringToDateObjectConverter(timeString);
    return properlyFormatted;
  }

  let maxHour = d3.max(incomingData, findMaxKeyHOUR);

  let yDomain = [maxHour, minHour];
  let yPadding = 20;
  let yScale = d3.scaleTime().domain(yDomain).range([yPadding, (-360)+w-(xPadding*2)]);
  // console.log(xDomain);

  var yAxis = d3.axisLeft(yScale);

  function getTranslate(d, i){
    let properlyFormattedDate = stringToDateObjectConverter(d.day);
    let properlyFormattedHour = stringToHourObjectConverter(d.hour);

    let value = d.hour;
    return "translate("+xScale(properlyFormattedDate)+","+yScale(properlyFormattedHour)+")";
  }

  let viz = d3.select("#graph")
    .append("svg")
      .attr("width", w)
      .attr("height", h)
  ;

  let groupelements = viz.selectAll(".datagroup").data(incomingData)
    .enter()
      .append("g")
      .attr("class", "datagroup")
      .attr("transform", getTranslate);
  ;


  let xAxisGroup = viz.append("g").attr("class", "xaxis");
  xAxisGroup.call(xAxis);
  xAxisGroup.attr("transform", "translate(0,"+xAxisYPos+")");
  xAxisGroup.call(xAxis);

  let yAxisgroup = viz.append("g").attr("class", "yaxis").call(yAxis);
  yAxisgroup.attr("transform", "translate("+xPadding+",0)");

  let vizGroup = viz.append("g").attr("class", "vizgroup");

  let dataGroups = vizGroup.selectAll(".datagroup").data(incomingData).enter()
        .append("g")
        .attr("class", "datagroup")
  ;

  groupelements.append("circle")
    .attr("cx", xPos)
    .attr("cy", yPos)
    .attr("r", 10)
    .attr("fill", getColor)
    .style("opacity", .6)
  ;

  groupelements.append("text")
    .text(loadText)
    .attr("fill", "black")
    .style("opacity", 0)
;
}


function loadText(datapoint){
  let text = datapoint.sender;
  return text;
}

function xPos(){

}

function yPos(){

}

function getColor(datapoint){
  if(datapoint.type == "Spam Personal"){
    return "#EA4335";
  }
  if(datapoint.type == "Spam School"){
    return "#4285F4";
  }
  if(datapoint.type == "Direct"){
    return "#FBBC05";
  }
  if(datapoint.type == "Teacher"){
    return "#34A853";
  }
}
