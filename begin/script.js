var font = 32

var rows = 15
var cols = 25

var actors = 10


// const goblin = characters.goblin
// const player = characters.player

var game = new Phaser.Game(cols * font * 0.6, rows * font, Phaser.AUTO, null, {
  create
})

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

function detectKeyStroke() { //determines which arrow key is pressed

  switch (event.keyCode) {
    case 12: ; //num5
      console.log('stayed put')
      break;
    case 37: ; //left
      console.log('left')
      break;
    case 38: ; //up
      console.log('up')
      break;
    case 39: ; //right
      console.log('right')
      break;
    case 40: ; //down
      console.log('down')
      break;
    case 34: ; //down-right
      console.log('down-right')
      break;
    case 35: ; //down-left
      console.log('down-left')
      break;
    case 36: ; //up-left
      console.log('up-left')
      break;
    case 33: ; //up-right
      console.log('up-right')
      break;
    default: console.log(event.keyCode)

  }
}

function initMap() {
  // create a new random map
  map = [];
  for (var y = 0; y < rows; y++) {
    var newRow = [];
    for (var x = 0; x < cols; x++) {
      if (Math.random() > 0.8)
        newRow.push('#');
      else
        newRow.push('.');
    }
    map.push(newRow);
  }
}
