console.log("script loaded");

d3.json("data.json").then(gotData);

function gotData(incomingData){
  let viz = d3.select("body")
    .append("svg")
      .attr("width", 500)
      .attr("height", 500)
  ;


  viz.selectAll("circle").data(incomingData)
    .enter()
      .append("circle")
      .attr("cx", getDay)
      .attr("cy", 100)
      .attr("r", 20)
  ;
}

function getDay(datapoint){
  var result = getDate(new Date(datapoint.day));

  return result;
}
