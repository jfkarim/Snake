$(document).ready( function() {
  var board = new Sn.Board();
  var renderedBoard = board.render();
  $('pre').html(renderedBoard);
});