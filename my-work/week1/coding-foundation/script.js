console.log("loaded");

function makeSquares(){
  document.getElementById("squareDiv").innerHTML = "";
  var squaresValue = document.getElementById("square").value;
  console.log(squaresValue);

  for(i = 0; i < squaresValue; i++) {
    console.log("new square");
    var img = document.createElement("img");

    img.src = "square.png";
    var src = document.getElementById("squareDiv");

    src.appendChild(img);
  }
}
