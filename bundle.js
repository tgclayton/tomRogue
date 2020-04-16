(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var firstMap = {
  mapArr: [],
  floor: {
    sym: '-',
    class: 'entry-floor',
  },
  wall: {
    sym: '#',
    class: 'entry-wall',
  }

}

module.exports = {
  firstMap
}

// const map = require('../scripts/map.js')




// console.log(firstMap)
},{}],2:[function(require,module,exports){
var font = 32

var height = 35
var width = 35



var actors = 10

const map = require('./map.js')
const maps = require('../data/maps')
const turn = require('./turn.js')
const key = require('./key')

map.makeRandomMap(maps.firstMap.mapArr, height, width)
// console.log(maps.firstMap.mapArr)
map.displayMap(maps.firstMap, width)
 

// document.addEventListener('keydown', e => key.detectKeyStroke(e, height, width))

// let avatar = {
//   symbol: '@',
//   location: 0,

// }

// function addAvatar() {
//   avatar.location = Math.floor(map.length / 2)
// }

// function displayMap() {
//   map[avatar.location] = avatar.symbol
//   let display = map.join('')
//   document.getElementById('map').innerHTML = display
// }


// addAvatar()
// displayMap(map)
module.exports = {
  turnCount
}
},{"../data/maps":1,"./key":3,"./map.js":4,"./turn.js":5}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){


//
const maps = require('../data/maps')

let avatar = {
  symbol: '@',
  location: 0,
}

function makeRandomMap(map, height, width) {
  let size = (height * width)
  for (let i = 0; i < size; i++) {

    let tile = {
      terrain: '',
      loot: [],
      trap: { isHere: false, type: null },
      isExplored: false,
    }
    if (Math.random() > 0.8) {
      tile.terrain = 'wall'
      map.push(tile)
    } else {
      tile.terrain = 'floor'
      map.push(tile)
    }

  }
  addAvatar()
}



function addAvatar() {
  avatar.location = Math.floor(maps.firstMap.mapArr.length / 2)
}

function displayMap(map, width) {
  let c = 1
  let dispArr = []

  map.mapArr.map((tile, idx) => {
    if (tile.terrain === 'wall') {
      dispArr.push(`<sp class = ${map.wall.class}>${map.wall.sym}</sp>`)
    } else if (tile.terrain === 'floor') {
      dispArr.push(`<sp class = '${map.floor.class}'>${map.floor.sym}</sp>`)
    }
    c++
    if ((idx + 1) % width === 0) {
      dispArr.push('<br>')
    }
  })
  dispArr[avatar.location] = avatar.symbol
  let display = dispArr.join('')
  document.getElementById('map').innerHTML = display
}
// console.log(maps)
// makeRandomMap(maps.firstMap.mapArr)
// console.log(maps.firstMap.mapArr.length)

module.exports = {
  makeRandomMap,
  displayMap,
  avatar
}
},{"../data/maps":1}],5:[function(require,module,exports){
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
},{"./map.js":4}]},{},[2]);
