(function(){
  class Dot {
    constructor(id,x,y) {
      this.id = id;
      this.x = x;
      this.y = y;
    }
  }

  function heuristic(dotA, dotB) {
    return Math.abs(dotA.x - dotB.x) + Math.abs(dotA.y - dotB.y);
  }
  // Define constants
  // Some will be user-defined
  var NUM_BOXES = 9;
  var BOXES_PER_SIDE = 3;
  var DOT_RADIUS = 40;
  var NUM_LINES = 12;
  var WIDTH = 405;
  var HEIGHT = 720;
  var INNDER_WIDTH = WIDTH - (DOT_RADIUS*2);
  var INNER_HEIGHT = HEIGHT - (DOT_RADIUS*2);
  var DOT_SCALE = d3.scale.ordinal()
    .domain(d3.range(BOXES_PER_SIDE))
    .rangePoints([0,INNDER_WIDTH]);

  // Append svg and group transformed to margins,
  // which are equal to DOT_RADIUS
  var svg = d3.select("#game").append("svg")
    .attr("viewBox", "0 0 "+WIDTH+" "+HEIGHT)
    .on("mousemove",mousemove)
    .append("g").attr("transform","translate("+DOT_RADIUS+","+DOT_RADIUS+")");

  // Create an array of objects with
  // dot positions
  var yIndex = -1;
  var dotGrid = d3.range(NUM_BOXES).map(function(d,i){
    yIndex += (i%BOXES_PER_SIDE == 0) ? 1 : 0;
    return new Dot(i,DOT_SCALE(i%BOXES_PER_SIDE),DOT_SCALE(yIndex));
  });

  var linesG = svg.append("g");
  var moveline = null;

  var dots = svg.selectAll(".dot")
    .data(dotGrid)
    .enter().append("circle")
    .attr("class","dot")
    .attr("id",function(d){ return "d"+d.id})
    .attr("cx",function(d){ return d.x})
    .attr("cy",function(d){ return d.y})
    .attr("r",DOT_RADIUS);

  dots.on("mousedown",function(){
    var startDotEl = d3.select(this)
      .style("stroke","#69D2E7")
      .style("stroke-width",5);

    var startDot = startDotEl["0"]["0"].__data__;

    moveline = linesG.append("line")
      .attr("class","line moveline")
      .attr("x1",startDotEl.attr("cx"))
      .attr("y1",startDotEl.attr("cy"))
      .attr("x2",startDotEl.attr("cx"))
      .attr("y2",startDotEl.attr("cy"));
  });

  function mousemove() {
    if (moveline) {
      var coords = d3.mouse(this);
      moveline
        .attr("x2",coords[0]-DOT_RADIUS)
        .attr("y2",coords[1]-DOT_RADIUS);
    }
  }

})()
