
module.exports = {
  create
}



function create() {
  // init keyboard commands
  game.input.keyboard.addCallbacks(null, null, detectKeyStroke);

  // initialize map
  initMap();

  // initialize screen
  asciidisplay = [];
  for (var y = 0; y < rows; y++) {
    var newRow = [];
    asciidisplay.push(newRow);
    for (var x = 0; x < cols; x++)
      newRow.push(initCell('', x, y));
  }
  drawMap();
}

function drawMap() {
  for (var y = 0; y < rows; y++)
    for (var x = 0; x < cols; x++)
      asciidisplay[y][x].content = map[y][x];
}

function initCell(chr, x, y) {
  // add a single cell in a given position to the ascii display
  var style = { font: font + "px monospace", fill: "#fff" };
  return game.add.text(font * 0.6 * x, font * y, chr, style);
}