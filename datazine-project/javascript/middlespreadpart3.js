console.log("middle spread p3 script loaded");



d3.json("data.json").then(gotData);

function gotData(incomingData){

  let viz = d3.select("#gv")
    .append("svg")
      .attr("width", width)
      .attr("height", height)
  ;

  viz.selectAll("circle").data(incomingData)
    .enter()
      .append("circle")
      .attr("cx", getX)
      .attr("cy", getY)
      .attr("r", 10)
      .attr("fill", getColor3)
      .style("opacity", getOpacity3)
  ;

}


function getColor3(datapoint){
  if(datapoint.generalSubject == "ad" || datapoint.generalSubject == "flight deals" || datapoint.generalSubject == "concert tickets"){
    return "#000000";
  } else {
    return "#D3D3D3";
  }
}

function getOpacity3(datapoint){
  if(datapoint.generalSubject == "ad" || datapoint.generalSubject == "flight deals" || datapoint.generalSubject == "concert tickets"){
    return ".8";
  } else {
    return ".4";
  }
}

function getY(d, i){
  let n = i % numPerRow  // <-C
  return scale(n)+10;
}

function getX(d, i){
  let n = Math.floor(i / 10) // <-D
  return scale(n)+10;
}
