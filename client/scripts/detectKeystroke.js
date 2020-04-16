function detectKeyStroke(event) { //determines which arrow key is pressed and acts accordingly
  // move(event.keycode)

  switch (event.keyCode) {
    case 12: ; //num5
      console.log('stayed put')
      break;

    case 37: ; //left
      let el = document.getElementById('5')
      // console.log(el)
      document.getElementById('5').check
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

    default: console.log('detectKeystroke reached default, keycode was', event.keyCode)

  }
}

export default detectKeyStroke