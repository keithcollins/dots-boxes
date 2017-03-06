import * as d3 from "d3";
import Game from './Game';
var game = new Game(d3);
var dot = game.Dot;

function dataFromEl(el) {
  return el["_groups"]["0"]["0"].__data__;
}

function mousemove() {
  if (moveline) {
    var coords = d3.mouse(this);
    moveline
      .attr("x2",coords[0]-game.dot_radius)
      .attr("y2",coords[1]-game.dot_radius);
  }
}

var moveline = null;

// Append svg and group transformed to margins,
// which are equal to game.dot_radius
var svg = d3.select("#game").append("svg")
  .attr("viewBox", "0 0 "+game.width+" "+game.height)
  .on("mousemove",mousemove)
  .append("g").attr("transform","translate("+game.dot_radius+","+game.dot_radius+")");

var linesG = svg.append("g");

var dots = svg.selectAll(".dot")
  .data(game.dotGrid)
  .enter().append("circle")
  .attr("class","dot")
  .attr("id",function(d){ return "d"+d.id})
  .attr("cx",function(d){ return d.x})
  .attr("cy",function(d){ return d.y})
  .attr("r",game.dot_radius);

dots.on("mousedown",function(){
  var startDotEl = d3.select(this)
    .style("stroke","#69D2E7")
    .style("stroke-width",5);

  var startDot = dataFromEl(startDotEl);

  console.log(dot.distance(startDot, game.dotGrid[1])/game.dot_scale.step());

  moveline = linesG.append("line")
    .attr("class","line moveline")
    .attr("x1",startDotEl.attr("cx"))
    .attr("y1",startDotEl.attr("cy"))
    .attr("x2",startDotEl.attr("cx"))
    .attr("y2",startDotEl.attr("cy"));
});
