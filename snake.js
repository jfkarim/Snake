(function(root) {
  var Sn = root.Sn = (root.Sn || {});

  var Coord = Sn.Coord = function(coord) {
    this.coord = [null,null];
    this.coord[0] = coord[0];
    this.coord[1] = coord[1];
  }

  Coord.prototype.plus = function(dir) {
    this.coord[0] += dir[0];
    this.coord[1] += dir[1];
  }

  var Snake = Sn.Snake = function(dir, segments) {
    this.dir = dir; // N, E, S, W
    this.segments = segments; //will have inital lenth of segments
    this.compass = {
      'N' : [-1,0],
      'S' : [1,0],
      'E' : [0,1],
      'W' : [0,-1]
    }
  }

  Snake.prototype.move = function() {
    that = this;
    this.segments.pop();
    newSeg = new Coord(that.segments[0].coord);
    newSeg.plus(that.compass[that.dir]);
    this.segments.unshift(newSeg);
  }

  Snake.prototype.turn = function(direction) {
    if (this.compass[this.dir][1] + this.compass[direction][1] !== 0) {
      this.dir = direction;
    }
  }

  var Board = Sn.Board = function() {

    var segments = [
      new Coord([25, 24]),
      new Coord([25, 25]),
      new Coord([25, 26])
    ];
    this.snake = new Snake('W', segments);

  }

  Board.MAX_SIZE = 50

  Board.prototype.render = function() {
    var grid = []
    for (var i = 0; i < Board.MAX_SIZE; i++) {
      grid.push(new Array(Board.MAX_SIZE));
      for (var j = 0; j < Board.MAX_SIZE; j++) {
        grid[i][j] = '.';
      }
    }
    // console.log(grid);
    this.snake.segments.forEach(function(segment) {
      grid[segment.coord[0]][segment.coord[1]] = 'S';
    });

    for (var i = 0; i < Board.MAX_SIZE; i++) {
      grid[i] = grid[i].join("");
    }

    return grid.join("\n");
  }

})(this);