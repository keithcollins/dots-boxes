class Dot {
  constructor(id,x,y) {
    this.id = id;
    this.x = x;
    this.y = y;
  }
  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx*dx + dy*dy);
    // return Math.abs(dx) + Math.abs(dy);
  }
}

export default Dot;
