// import * as d3 from "d3";

class Game {
  constructor(callback) {
    // Define constants
    // Some will be user-defined
    this.num_boxes = 9;
    this.boxes_per_side = 3;
    this.dot_radius = 40;
    this.num_lines = 12;
    this.width = 405;
    this.height = 720;
    this.innder_width = this.width - (this.dot_radius*2);
    this.inner_height = this.height - (this.dot_radius*2);
    this.dot_scale = d3.scale.ordinal()
      .domain(d3.range(this.boxes_per_side))
      .rangePoints([0,this.innder_width]);
    this.range_step = this.dot_scale.range()[1] - this.dot_scale.range()[0];
    // Create an array of objects with
    // dot positions
    this.yIndex = -1;
    this.dotGrid = d3.range(this.num_boxes).map(function(d,i){
      this.yIndex += (i%this.boxes_per_side == 0) ? 1 : 0;
      return new Dot(i,this.dot_scale(i%this.boxes_per_side),this.dot_scale(this.yIndex));
    });
  }
}

// export default Game;