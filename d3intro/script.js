let viz = d3.select("#viz-container")
  .append("svg")
  .attr("id", "viz")
  .attr("width", 800)
  .attr("height", 800);

// let myCircle = viz.append("circle")
//   .attr("cx", 200)
//   .attr("cy", 100)
//   .attr("r", 50);
//
// myCircle.attr("fill", "purple");
//
// let smallRect = viz.append("rect")
//   .attr("x", 10)
//   .attr("y", 20)
//   .attr("height", 50)
//   .attr("width", 50)
//   .attr("fill", "pink");

let myData = [1,2,3,4,5,6,7,8,9];
for(let i = 0; i < myData.length; i++){
  viz.selectAll("circle").data(myData[i]).enter().append("circle").attr("cx", myData[i]*20).attr("cy", 50).attr("r", 100);

}
