console.log("script loaded");

// 1. find *real* data (array containing JS objects) in JSON format
// 2. load data (make it *console.loggable* (what a word!) in our script)
function gotData(incomingData){
  console.log(incomingData);
  //create svg



  let viz = d3.select("body")
    .append("svg")
      .attr("width", 500)
      .attr("height", 500)
  ;

  //bin datapoint

  viz.selectAll("circle").data(incomingData)
    .enter()
      .append("circle")
      .attr("cx", randomNumber)
      .attr("cy", getColor)
      .attr("r", 20)
      // .attr("fill", getColor)
  ;

}

function getColor(datapoint, i){
    console.log("ELEMENT: " + ((datapoint.roomNumber)-1000)/1.5);

    return ((datapoint.roomNumber)-1000)/1.5;
}

function randomNumber(datapoint, i){
  console.log(datapoint);
  console.log("ELEMENT 2: " + datapoint.indoorTem*15);

  return datapoint.indoorTem*15;

  console.log(i);
  return ((datapoint.roomNumber)-1000)*10;
}

// 3. concept: data and datapoint


// 4. make on circle for each datapoint (size and position doesn't matter)


// 5. concept: functions that "return"
// 6. use function to position circles randomly
// 7. realize "who" calls this function / why is there no `()`?
// 8. concept: "passing value into function"
// 9. let's assume: "D3 passes value into the data function"
// 10. if D3 passes a value, how can we receive it?
// 11. use *real* information to impact the x position
// 12. let's assume: "D3 passes another value!"
// 13. how can we receive that value?
// 14. in which ways is D3 making our live easy?



d3.json("data.json").then(gotData);
