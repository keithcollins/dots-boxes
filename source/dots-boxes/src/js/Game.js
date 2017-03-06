import State from './State';
import Dot from './Dot';

class Game {
  constructor(d3) {
    this.State = new State();
    this.Dot = Dot;
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
    this.dot_scale = d3.scalePoint()
      .domain(d3.range(this.boxes_per_side))
      .range([0,this.innder_width]);
    this.range_step = this.dot_scale.range()[1] - this.dot_scale.range()[0];
    // Create an array of objects with
    // dot positions
    this.yIndex = -1;
    var self = this;
    this.dotGrid = d3.range(this.num_boxes).map(function(d,i){
      self.yIndex += (i%self.boxes_per_side == 0) ? 1 : 0;
      return new Dot(i,self.dot_scale(i%self.boxes_per_side),self.dot_scale(self.yIndex));
    });
  }
}

export default Game;
