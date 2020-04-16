module.exports = {
  nextTurn
}

var turnCount = 0

const field = require('./map.js')

function nextTurn(input, height, width) {
  document.getElementById('alert').innerText= ''
  // get player location
  // console.log('avatar is on index', avatar.location)
  let coords = getCoords(field.avatar.location, height, width)

  // get destination location
  let destination = getDestination(coords, input)
  // console.log('destination coords are ',destination)
  // check if destination is out of bounds
  if (checkOutOfBounds(destination, height, width) !== true) {
    document.getElementById('alert').innerText= 'You cannot move off the map'
    return 
  }
  let dest = getIdx(destination, height)
  // console.log('destination index is',dest)
  if (map[dest] === '#') {
    document.getElementById('alert').innerText= 'You cannot move through a wall'
    return 
  }
  map[field.avatar.location] = '.'
  field.avatar.location = dest
  //move everything else, resolve events
  //render new map
  turnCount++
  document.getElementById('turn-count').innerText= 'Turns taken: ' +turnCount
  field.displayMap( blorb, width)
}

// function getNeighbours() {
//     let size = cols * rows
//     let ref = avatar.location
//     let refCol = ref % rows
//     let refRow = ref / cols
//     console.log('avatar coords are column:', refCol, 'row:', refRow)
//   }
  
  function getCoords(idx, height, width) {
    let col = idx % height
    let row = (idx - col) / width
    return [col, row]
  }
  
  function getIdx(coords, height) {
    let idx = coords[0] + coords[1] * height
    // console.log(idx)
    return idx
  }
  
  function getDestination(origin, move) {
    let colMove = origin[0] + move[0]
    let rowMove = origin[1] + move[1]
    let destCoords = [colMove, rowMove]
    // console.log(destCoords)
    return destCoords
  }
  
  function checkOutOfBounds(coords, height, width) {
    let check = false
    if ((coords[0] < 0 || coords[0] >= width-1) || (coords[1] < 0 || coords[1] >= height)) {
      return
    }
    return check = true
  }