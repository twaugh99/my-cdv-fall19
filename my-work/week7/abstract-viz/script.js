let w = 1200;
let h = 800;


let button1 = document.getElementById('button1');
let button2 = document.getElementById('button2');
let button3 = document.getElementById('button3');


// for convenience
let datafile = "data.json";

// function to retrieve only the data points
// belonging to one step in time:

let activeName = "A";

function getName(data, name){
  return data.filter(function(datapoint){
    if(datapoint.name == activeName){
      return true;
    }else{
      return false;
    }
  });
}

// creating the svg that holds everything else
// we do this outside the gotData function to
// keeps things clean
let viz = d3.select("#container")
  .append('svg')
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "darkcyan")
;


function gotData(incomingData, name){
  // checking out our data
  // console.log(incomingData);
  // testing the filter function defined above
  // console.log(getStep(incomingData, 0));

  let xDomain = d3.extent(incomingData, function(datapoint){
    return datapoint.x;
  });
  // console.log("xDomain:" + xDomain);

  let yDomain = d3.extent(incomingData, function(datapoint){
    return datapoint.y;
  });
  // console.log("yDomain:" + yDomain);

  // general padding of our visualization
  let padding = 40;
  // scale to map from min and max of our x values to the
  // boundaries (minus padding) of our svg:
  let xScale = d3.scaleLinear().domain(xDomain).range([padding, w-padding]);

  // create axis for this scale
  let xAxis = d3.axisBottom(xScale);
  // create a groyp to gold the axis elements
  let xAxisGroup = viz.append("g").attr("class", "xaxis");
  // tell d3 to fill the group with the axis elements
  xAxisGroup.call(xAxis);
  // position the axis at the bottom of the svg
  xAxisGroup.attr("transform", "translate(0, "+ (h-padding) +")");

  // note how we flip the orientation (in the range) of our y scale
  // to make sure that low y values are at the bottom of the graph
  let yScale = d3.scaleLinear().domain(yDomain).range([h-padding, padding]);
  let yAxis = d3.axisLeft(yScale);
  let yAxisGroup = viz.append("g").attr("class", "yaxis");
  yAxisGroup.call(yAxis);
  yAxisGroup.attr("transform", "translate("+padding+",0)");


  //Group that contains everything to do with our graph (aka the actual shapes)
  let vizgroup = viz.append("g").attr("class", "vizgroup");


  drawViz();



function drawViz(){
    // console.log("draw viz runs");
    let data = getName(incomingData, name);

    button1.addEventListener("click",function(){
      activeName = "A"
      console.log("button 1");
    });
    button1.addEventListener("click",drawViz);

    button2.addEventListener("click",function(){
      activeName = "B"
      console.log("button 2");
    });
    button2.addEventListener("click",drawViz);

    button3.addEventListener("click",function(){
      activeName = "C"
      console.log("button 3");
    });
    button3.addEventListener("click",drawViz);
    // console.log(data);

    // d3.shuffle(data);
    // console.log(data);

    let datagroups = vizgroup.selectAll(".datagroup").data(data, function(d){
      return d.name;
    });

    let enteringDataGroup = datagroups.enter()
      .append("g")
      .attr("class", "datagroup")
    ;

    enteringDataGroup.append("circle")
      .attr("r", 5)
      .attr("fill", "white")
    ;

    // enteringDataGroup.append("text")
    //   .text(function(d,i){
    //     return d.name;
    //   })
    //   .attr("x", 8)
    //   .attr("y", 5)
    //   .attr("fill", "white")
    //   .attr("font-family", "Comic Sans MS")
    // ;

    datagroups.exit().remove();

    enteringDataGroup.transition().attr("transform", function(d, i){
      return "translate("+ xScale(d.x) + ", " + yScale(d.y) + ")"
    });
  }
}

d3.json(datafile).then(gotData);
