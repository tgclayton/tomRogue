module.exports = {
  detectKeyStroke
}

// const turn = require('./turn.js')

function detectKeyStroke(event) { //determines which arrow key is pressed and acts accordingly
  // move(event.keycode)

  switch (event.keyCode) {
    case 12: ; //num5
      event.preventDefault()
      turn.nextTurn([0, 0])
      console.log('stayed put')
      break;

    case 37: ; //left
      event.preventDefault()
      turn.nextTurn([-1, 0])
      // console.log(el)
      console.log('left')
      break;

    case 38: ; //up
      event.preventDefault()
      turn.nextTurn([0, -1])
      console.log('up')
      break;

    case 39: ; //right
      event.preventDefault()
      turn.nextTurn([+1, 0])
      console.log('right')
      break;

    case 40: ; //down
      event.preventDefault()
      turn.nextTurn([0, +1])
      console.log('down')
      break;

    case 34: ; //down-right
      event.preventDefault()
      turn.nextTurn([+1, +1])
      console.log('down-right')
      break;

    case 35: ; //down-left
      event.preventDefault()
      turn.nextTurn([-1, +1])
      console.log('down-left')
      break;

    case 36: ; //up-left
      event.preventDefault()
      turn.nextTurn([-1, -1])
      console.log('up-left')
      break;

    case 33: ; //up-right
      event.preventDefault()
      turn.nextTurn([+1, -1])
      console.log('up-right')
      break;

    default: console.log('detectKeystroke reached default, keycode was', event.keyCode)
  }}
