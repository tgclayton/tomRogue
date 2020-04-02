var font = 30

var mapHeight = 10
var mapWidth = 10

var actors = 10

document.onkeydown = detectKeyStroke

// var game = new Phaser.Game(COLS * FONT * 0.6, ROWS * FONT, Phaser.AUTO, null, {
//   create: create
// })

// function create() {
//   game.input.keyboard.addCallbacks(null, null, detectKeyStroke);
// }

function detectKeyStroke() { //determines which arrow key is pressed
  switch (event.keyCode) {
    case 37: ; //left
    console.log('pressed left')
      break;
    case 38: ; //up
    console.log('pressed up')
      break;
    case 39: ; //right
    console.log('pressed right')
      break;
    case 40: ; //down
    console.log('pressed down')
      break;
    default:
  }
}

function createMap(height, width) {
  let mapArray = []
for (let i = 0; i < (height * width); i++){
  if (i % width === 0){
    mapArray.push('br')
  }
  mapArray.push('|')
}
return mapArray
}
console.log(document.getElementById('test'))

function displayMap(arr){
  console.log(document.getElementById('map'))
  let mapString = arr.join('')
  document.getElementById('map').innerHTML = mapString
}

let map = createMap(mapHeight, mapWidth)
displayMap(map)