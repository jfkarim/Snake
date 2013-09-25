(function(root) {
  var Sn = root.Sn = (root.Sn || {});

  var Snake = Sn.Snake = function(dir, segments) {
    this.dir = dir; // N, E, S, W
    this.segments = segments; //will have inital lenth of segments
    this.compass = {
      'N' : [-1,0],
      'S' : [1,0],
      'E' : [0,1],
      'W' : [0,-1]
    }
    this.lost = false;
  }

  var Board = Sn.Board = function() {

    var segments = [
      [25, 24],
      [25, 25],
      [25, 26]
    ];
    this.snake = new Snake('W', segments);
    this.apples = [];
  }

  Board.MAX_SIZE = 50

  Snake.prototype.isCollidedWith = function(coord) {
    for (var i = 0; i < this.segments.length; i++) {
      if (this.segments[i][0] === coord[0] && this.segments[i][1] === coord[1]) {
        return true;
      }
    }

    return false;
  }

  Snake.prototype.move = function() {
    this.temp = this.segments.pop();

    newSeg = [this.segments[0][0], this.segments[0][1]];
    newSeg[0] += this.compass[this.dir][0];
    newSeg[1] += this.compass[this.dir][1];
    if (newSeg[0] >= Board.MAX_SIZE) {
      newSeg[0] -= Board.MAX_SIZE;
    } else if (newSeg[0] < 0) {
      newSeg[0] += Board.MAX_SIZE;
    }

    if (newSeg[1] >= Board.MAX_SIZE) {
      newSeg[1] -= Board.MAX_SIZE;
    } else if (newSeg[1] < 0) {
      newSeg[1] += Board.MAX_SIZE;
    }

    if (this.isCollidedWith(newSeg)) {
      this.lost = true;
    }

    this.segments.unshift(newSeg);
  }

  Snake.prototype.turn = function(direction) {
    if (this.compass[this.dir][1] + this.compass[direction][1] !== 0) {
      this.dir = direction;
    }
  }

  Board.prototype.ateApple = function() {
    for (var i = 0; i < this.apples.length; i++) {
      if (this.snake.isCollidedWith(this.apples[i])) {
        this.snake.segments.push(this.snake.temp);
        this.apples.splice(i,1);
      }
    }
  }

  Board.prototype.render = function() {
    var grid = []
    for (var i = 0; i < Board.MAX_SIZE; i++) {
      grid.push(new Array(Board.MAX_SIZE));
      for (var j = 0; j < Board.MAX_SIZE; j++) {
        grid[i][j] = '.';
      }
    }
    this.snake.segments.forEach(function(segment) {
      grid[segment[0]][segment[1]] = 'S';
    });

    for (var i = 0; i < Board.MAX_SIZE; i++) {
      grid[i] = grid[i].join("");
    }

    return grid.join("\n");
  }

})(this);