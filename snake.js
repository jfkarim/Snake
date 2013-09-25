(function(root) {
  var Sn = root.Sn = (root.Sn || {});

  var Coord = Sn.Coord = function(coord) {
    this.coord = coord
  }

  Coord.prototype.plus = function(dir) {
    this.coord[0] += dir[0];
    this.coord[1] += dir[1];
  }

  var Snake = Sn.Snake = function(dir, segments) {
    this.dir = dir; // N, E, S, W
    this.segments = segments; //will have inital lenth of segments
    this.compass = {
      'N' : [0,-1],
      'S' : [0,1],
      'E' : [1,0],
      'W' : [-1,0]
    }
  }

  Snake.prototype.move = function() {
    that = this;
    this.segments.pop();
    newSeg = new Coord(segments[0]);
    newSeg.plus(that.compass[that.dir]);
    this.segments.unshift(newSeg);
  }

  Snake.prototype.turn = function(direction) {
    this.dir = direction;
  }

  var Board = Sn.Board = function() {
    var segments = [
      new Coord([249, 250]),
      new Coord([250, 250]),
      new Coord([251, 250])
    ];
    this.snake = new Snake('W', segments);

  }

  Board.prototype.render = function() {
    grid = new Array(100);
    grid.forEach(function(row) {
      row = new Array(100);
      row.forEach(function(element){
        element = ".";
      });
    });
    this.snake.segments.forEach(function(segment) {
      grid[segment[0]][segment[1]] = 'S'
    });
    return grid;
  }

})(this);