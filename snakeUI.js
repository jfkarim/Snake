var view;

$(document).ready( function() {

  var grid = $('#grid');
  for (var i = 0; i < 50; i++) {
    var ul = $('<ul></ul>');
    grid.append(ul);
    for (var j = 0; j < 50; j++) {
      var li = $('<li></li>');
      ul.append(li);
    }
  }

  var View = function (el) {
    this.$el = el;
  }

  View.prototype.addApple = function() {
    appleCoord = [Math.floor(Math.random() * 50),
                  Math.floor(Math.random() * 50)];
    if (!this.board.snake.isCollidedWith(appleCoord)) {
      this.board.apples.push(appleCoord);
    }
  }

  View.prototype.clearBoard = function() {
    $('li').removeClass('snakeCell appleCell');
  }

  View.prototype.parseRenderedBoard = function() {
    this.clearBoard();
    snake = this.board.snake
    apples = this.board.apples

    apples.forEach(function(apple) {
      $row = $('#grid ul:nth-child('+ (apple[0]+1) +')');
      cell = $row.children()[(apple[1]+1)];
      $(cell).addClass('appleCell');
    });

    snake.segments.forEach(function(segment) {
      $row = $('#grid ul:nth-child('+ (segment[0]+1) +')');
      cell = $row.children()[(segment[1]+1)];
      $(cell).addClass('snakeCell');
    });
  }

  View.prototype.step = function() {
    this.board.snake.move();
    this.parseRenderedBoard();
    if (this.board.snake.lost) {
      console.log('LOSER!!');
      this.stop();
    }
  }

  View.prototype.start = function () {
    that = this;

    this.board = new Sn.Board();

    snake = this.board.snake
    key('w', function() { snake.turn('N'); });
    key('a', function() { snake.turn('W'); });
    key('s', function() { snake.turn('S'); });
    key('d', function() { snake.turn('E'); });

    this.startTimeInd = setInterval(this.step.bind(this), 50);
    setInterval(this.addApple.bind(this), 2000);
  }

  View.prototype.stop = function() {
    clearInterval(this.startTimeInd);
  }

  var v = view = new View($('pre'));
  v.start();
});