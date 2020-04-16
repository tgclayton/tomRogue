(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var firstMap = {
  mapArr: [],
  floorSym: '.',
  wallSym: '#',
  
  }

module.exports = {
  firstMap: firstMap
}

// const map = require('../scripts/map.js')




// console.log(firstMap)
},{}],2:[function(require,module,exports){
var font = 32

var rows = 25
var cols = 25

var turn = 0

var actors = 10
const map = require('./map.js')
const maps = require('../data/maps')

map.makeRandomMap(maps.firstMap.mapArr, 30, 30)
console.log(maps.firstMap.mapArr)
map.displayMap(maps.firstMap)
 

document.addEventListener('keydown', e => detectKeyStroke(e))

// let avatar = {
//   symbol: '@',
//   location: 0,

// }

// function setFont(font) {
//   document.getElementById('map').style = "font-weight:" + font
// }

// function makeRandomMap(width, height) {
//   // let trueWidth = height
//   let workArr = new Array(height * width)
//   for (let i = 0; i < workArr.length; i++) {
//     if (Math.random() > .9)
//       workArr[i] = '#'
//     else
//       workArr[i] = '.'
//     if ((i + 1) % width === 0 && i > 1) {
//       workArr[i] = '<br>'
//     }
//   }
//   return workArr
// }

// function addAvatar() {
//   avatar.location = Math.floor(map.length / 2)
// }

// function displayMap() {
//   map[avatar.location] = avatar.symbol
//   let display = map.join('')
//   document.getElementById('map').innerHTML = display
// }

// // function getNeighbours() {
// //   let size = cols * rows
// //   let ref = avatar.location
// //   let refCol = ref % rows
// //   let refRow = ref / cols
// //   console.log('avatar coords are column:', refCol, 'row:', refRow)
// // }

// function getCoords(idx) {
//   let col = idx % rows
//   let row = (idx - col) / cols
//   return [col, row]
// }

// function getIdx(coords) {
//   let idx = coords[0] + coords[1] * rows
//   // console.log(idx)
//   return idx
// }

// function getDestination(origin, move) {
//   let colMove = origin[0] + move[0]
//   let rowMove = origin[1] + move[1]
//   let destCoords = [colMove, rowMove]
//   // console.log(destCoords)
//   return destCoords
// }

// function checkOutOfBounds(coords) {
//   let check = false
//   if ((coords[0] < 0 || coords[0] >= cols-1) || (coords[1] < 0 || coords[1] >= rows)) {
//     return
//   }
//   return check = true
// }

// function nextTurn(input) {
//   document.getElementById('alert').innerText= ''
//   // get player location
//   // console.log('avatar is on index', avatar.location)
//   let coords = getCoords(avatar.location)

//   // get destination location
//   let destination = getDestination(coords, input)
//   // console.log('destination coords are ',destination)
//   // check if destination is out of bounds
//   if (checkOutOfBounds(destination) !== true) {
//     document.getElementById('alert').innerText= 'You cannot move off the map'
//     return 
//   }
//   let dest = getIdx(destination)
//   // console.log('destination index is',dest)
//   if (map[dest] === '#') {
//     document.getElementById('alert').innerText= 'You cannot move through a wall'
//     return 
//   }
//   map[avatar.location] = '.'
//   avatar.location = dest
//   //move everything else, resolve events
//   //render new map
//   turn++
//   document.getElementById('turn-count').innerText= 'Turns taken: ' +turn
//   displayMap()
// }


// function detectKeyStroke(event) { //determines which arrow key is pressed and acts accordingly
//   // move(event.keycode)

//   switch (event.keyCode) {
//     case 12: ; //num5
//       event.preventDefault()
//       nextTurn([0, 0])
//       console.log('stayed put')
//       break;

//     case 37: ; //left
//       event.preventDefault()
//       nextTurn([-1, 0])
//       // console.log(el)
//       console.log('left')
//       break;

//     case 38: ; //up
//       event.preventDefault()
//       nextTurn([0, -1])
//       console.log('up')
//       break;

//     case 39: ; //right
//       event.preventDefault()
//       nextTurn([+1, 0])
//       console.log('right')
//       break;

//     case 40: ; //down
//       event.preventDefault()
//       nextTurn([0, +1])
//       console.log('down')
//       break;

//     case 34: ; //down-right
//       event.preventDefault()
//       nextTurn([+1, +1])
//       console.log('down-right')
//       break;

//     case 35: ; //down-left
//       event.preventDefault()
//       nextTurn([-1, +1])
//       console.log('down-left')
//       break;

//     case 36: ; //up-left
//       event.preventDefault()
//       nextTurn([-1, -1])
//       console.log('up-left')
//       break;

//     case 33: ; //up-right
//       event.preventDefault()
//       nextTurn([+1, -1])
//       console.log('up-right')
//       break;

//     default: console.log('detectKeystroke reached default, keycode was', event.keyCode)

//   }
// }

// addAvatar()
// displayMap(map)
},{"../data/maps":1,"./map.js":3}],3:[function(require,module,exports){
module.exports = {
  makeRandomMap,
  displayMap
}

//
const maps = require('../data/maps')


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
}

function displayMap(map) {
  let c = 1
  let dispArr = []
  // console.log(arr)
  map.mapArr.map((tile, idx) => {
    if (tile.terrain === 'wall') {
      dispArr.push(`<sp>${map.wallSym}</sp>`)
    } else if (tile.terrain === 'floor') {
      dispArr.push(`<sp>${map.floorSym}</sp>`)
    }
    c++
    if ((idx + 1) % 30 === 0) {
      dispArr.push('<br>')
    }
  })
  console.log(dispArr)
  let display = dispArr.join('')
  document.getElementById('map').innerHTML = display
}
// console.log(maps)
// makeRandomMap(maps.firstMap.mapArr)
// console.log(maps.firstMap.mapArr.length)


},{"../data/maps":1}]},{},[2]);
