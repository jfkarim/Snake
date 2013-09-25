$(document).ready( function() {

  var View = function (el) {
    this.$el = el;
  }

  View.prototype.step = function() {
    // each game step
    this.board.snake.move();

    var renderedBoard = this.board.render();
    this.$el.html(renderedBoard);
  }

  View.prototype.start = function () {
    that = this;
    this.board = new Sn.Board();
    // console.log(this.board);
    snake = this.board.snake
    key('w', function() { snake.turn('N'); });
    key('a', function() { snake.turn('W'); });
    key('s', function() { snake.turn('S'); });
    key('d', function() { snake.turn('E'); });
    // bind key events
    // setinterval for game step every 1/2 second
    this.startTimeInd = setInterval(this.step.bind(this), 500);
  }

  var v = new View($('pre'));
  v.start();
});