console.log("middle spread p2 script loaded");

let width = 800;
let height = 300;

let numPerRow = 10;
let size= 20;

let scale = d3.scaleLinear() // <-A
  .domain([0, numPerRow -1])
  .range([0, size * numPerRow])


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
      .attr("fill", getColor2)
      .style("opacity", getOpacity2)
  ;

}


function getColor2(datapoint){
  if(datapoint.type == "Direct"){
    return "#FBBC05";
  } else {
    return "#D3D3D3"
  }
}

function getOpacity2(datapoint){
  if(datapoint.type == "Direct"){
    return ".8";
  } else {
    return ".4"
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
