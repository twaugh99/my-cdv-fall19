console.log("back script loaded");

d3.json("data.json").then(gotData);

let pieWidth = 800;
let pieHeight = 800;
let radius = Math.min(pieWidth, pieHeight) / 2;

function gotData(data){
  let color = d3.scaleOrdinal().range(["#EA4335","#4285F4","#FBBC05","#34A853"]);

  let pie = d3.pie()
    .value(function(d) { return d.type; })(data);

  let arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

  let labelArc = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

  let svg = d3.select("#container")
    .append("svg")
    .attr("width", pieWidth)
    .attr("height", pieHeight)
    .append("g")
    .attr("transform", "translate(" + pieWidth/2 + "," + pieHeight/2 +")");

  let g = svg.selectAll(".arc")
    .data(pie)
    .enter().append("g")
    .attr("class", "arc");

  g.append("path")
    .attr("d", arc)
    .style("fill", function(d) { return color(d.data.type);});
}
