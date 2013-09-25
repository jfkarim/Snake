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

  View.prototype.parseRenderedBoard = function() {
    snake = this.board.snake
    // console.log(snake);
    // console.log(snake.segments);
    snake.segments.forEach(function(segment) {
      // console.log($('#grid:nth-child('+ segment.coord[0] +')'));
      $row = $('#grid ul:nth-child('+ segment.coord[0] +')');
      cell = $row.children()[segment.coord[1]];
      $(cell).addClass('snakeCell');
    });
  }

  View.prototype.step = function() {
    // each game step
    this.board.snake.move();

    this.parseRenderedBoard();
    // var renderedBoard = this.board.render();
    // this.$el.html(renderedBoard);
  }

  View.prototype.start = function () {
    that = this;

    this.board = new Sn.Board();

    snake = this.board.snake
    key('w', function() { snake.turn('N'); });
    key('a', function() { snake.turn('W'); });
    key('s', function() { snake.turn('S'); });
    key('d', function() { snake.turn('E'); });

    this.startTimeInd = setInterval(this.step.bind(this), 500);
  }

  View.prototype.stop = function() {
    clearInterval(this.startTimeInd);
  }

  var v = view = new View($('pre'));
  v.start();
});