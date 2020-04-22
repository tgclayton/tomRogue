(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
warrior = {
  name: 'Bob Ross',
  symbol: 'B',
  style: 'avatar',
  location: 0,
  equipment: {
  },
  stats: {
    hitpoints: 10,
    

  },
}
  

  module.exports = {
    warrior,
  }



},{}],2:[function(require,module,exports){


var goblin = {
  symbol: 'g',
  details: {
    name: 'Goblin Warrior',
    hitPoints: 6,
    armour: 2,
    attack: 5,
  }
}

var orc = {
  symbol: 'o',
  details: {
    name: 'Orc Warrior',
    hitPoints: 9,
    armour: 4,
    attack: 7,
  }
}

module.exports = {
  goblin,
  orc
}
},{}],3:[function(require,module,exports){

const firstMap = {
  floor: {
    sym: '~',
    class: 'entry-floor',
  },
  wall: {
    sym: '#',
    class: 'entry-wall',
  },
  enemies: ['orc', 'goblin']
}

var agents = []
var screens = []


module.exports = {
  firstMap,
  agents,
  screens,
  }


},{}],4:[function(require,module,exports){
var player = {
class: null,
hitpoints: 0,
inventory: [],
attributes: {
  strength: null,
  speed: null,
  toughness: null,
  knowledge: null,
  agility: null,
},
location: null,

}

module.exports = [
  player
]
},{}],5:[function(require,module,exports){
var font = 32

var height = 35
var width = 35



var actors = 10
const avatars = require('../data/avatars.js')
const map = require('./mapFunctions.js')
const maps = require('../data/maps.js')
const turn = require('./turn.js')
const key = require('./key.js')

document.getElementById('start-button').addEventListener('click', startGame)

function startGame() {
  turn.resetTurns()
  map.makeRandomMap(maps.firstMap, height, width, 0)
  map.addAvatar(maps.screens[0])
  map.displayMap(maps.screens[0])
}

function removeElement(elementId) {
  // Removes an element from the document
  var element = document.getElementById(elementId);
  element.parentNode.removeChild(element);
}


document.addEventListener('keydown', e => key.detectKeyStroke())
module.exports = {
  height,
  width,
}
},{"../data/avatars.js":1,"../data/maps.js":3,"./key.js":6,"./mapFunctions.js":7,"./turn.js":8}],6:[function(require,module,exports){

function detectKeyStroke() { //determines which arrow key is pressed and acts accordingly
  // move(event.keycode)
  const turn = require('./turn.js')
 
  switch (event.keyCode) {
    case 12: ; //num5
      event.preventDefault()
      turn.nextTurn([0, 0])
      // console.log('stayed put')
      break;

    case 37: ; //left
      event.preventDefault()
      turn.nextTurn([-1, 0])
      // console.log('left')
      break;

    case 38: ; //up
      event.preventDefault()
      turn.nextTurn([0, -1])
      // console.log('up')
      break;

    case 39: ; //right
      event.preventDefault()
      turn.nextTurn([+1, 0])
      // console.log('right')
      break;

    case 40: ; //down
      event.preventDefault()
      turn.nextTurn([0, +1])
      // console.log('down')
      break;

    case 34: ; //down-right
      event.preventDefault()
      turn.nextTurn([+1, +1])
      // console.log('down-right')
      break;

    case 35: ; //down-left
      event.preventDefault()
      turn.nextTurn([-1, +1])
      // console.log('down-left')
      break;

    case 36: ; //up-left
      event.preventDefault()
      turn.nextTurn([-1, -1])
      // console.log('up-left')
      break;

    case 33: ; //up-right
      event.preventDefault()
      turn.nextTurn([+1, -1])
      // console.log('up-right')
      break;
    
    // default: console.log('detectKeystroke reached default, keycode was', event.keyCode)
  }
}

module.exports = {
  detectKeyStroke
}
},{"./turn.js":8}],7:[function(require,module,exports){
const enemies = require('../data/enemies.js')
const maps = require('../data/maps')
const avatars = require('../data/avatars.js')
const player = require('../data/player')
const turns = require('./turn.js')

function makeRandomMap(map, height, width, mapId) {
  maps.screens = []
  let screen = {
    id: mapId,
    height: height,
    width: width,
    mapStyle: map,
    mapArr: []
  }
  let size = (height * width)
  for (let i = 0; i < size; i++) {
    let tile = {
      terrain: '',
      loot: [],
      trap: { isHere: false, type: null },
      isExplored: false,
      isVisible: false,
      occupants: [],
    }
    if (Math.random() > 0.8) {
      tile.terrain = 'wall'
      screen.mapArr.push(tile)
    } else {
      tile.terrain = 'floor'
      screen.mapArr.push(tile)
    }
  }
  maps.screens.push(screen)
}

function addAvatar(map) {
  let avatar = avatars.warrior
  let l = Math.floor(map.mapArr.length / 2)
  map.mapArr[l].occupants.push('player')
  player.class = avatar
  player.hitpoints = avatar.stats.hitpoints
  player.location = l
}

function getNeighboursThreeOut(coords) {
  let neighbours = []
  for (let i = 0; i < 7; i++) {
    let rowMod = coords[1] + (i - 3)
    for (let n = 0; n < 7; n++) {
      let colMod = coords[0] + (n - 3)
      if (colMod >= 0 && colMod < maps.screens[0].width && rowMod >= 0 && rowMod < maps.screens[0].width) {
        let idx = turns.getIdx([colMod, rowMod], 35)
        neighbours.push(idx)
      }
    }
  }
  return neighbours
}

function addAgents(agents) {

}

function checkExplored(screen) {
  let visible = getNeighboursThreeOut(turns.getCoords(player.location, 35, 35))
  visible.map(idx => {
    screen[idx].isExplored = true
  })
}

function displayMap(screen) {
  checkExplored(screen.mapArr)
  let dispArr = []
  screen.mapArr.map((tile, idx) => {
    if (!tile.isExplored) {
      dispArr.push(`<sp id = ${idx}  class = 'unexplored'>-</sp>`)
    } else
      if (idx === player.location) {
        dispArr.push(`<sp id = ${idx} class = '${player.class.style} not-visible'>${player.class.symbol}</sp>`)
      } else if (tile.terrain === 'wall') {
        dispArr.push(`<sp id = ${idx} class = '${screen.mapStyle.wall.class} wall-unseen'>${screen.mapStyle.wall.sym}</sp>`)
      } else if (tile.terrain === 'floor') {
        dispArr.push(`<sp id = ${idx} class = '${screen.mapStyle.floor.class} not-visible'>${screen.mapStyle.floor.sym}</sp>`)
      }

    if ((idx + 1) % screen.width === 0) {
      dispArr.push('<br>')
    }
  })
  // map.agents.map(agent => {
  //   dispArr[agent.location] = `<sp class = '${agent.class}'>${agent.symbol}</sp>`
  // })
  let display = dispArr.join('')
  let playerCoords = turns.getCoords(player.location, screen.height, screen.width)
  document.getElementById('map').innerHTML = display
  document.getElementById('player-hp').innerText = `Player HP is: ${player.hitpoints}`
  document.getElementById('player-location').innerText = `Player is in Columnn: ${playerCoords[0] + 1} Row: ${playerCoords[1] + 1}`
  toggleVisible()
}

function toggleVisible() {
  let ref = player.location
  let refCoords = turns.getCoords(ref, 35, 35)
  let neighbours = getNeighboursThreeOut(refCoords, 35, 35)
  neighbours.forEach(n => {
    if (maps.screens[0].mapArr[n].terrain === 'wall') {
      document.getElementById(n).classList.toggle('wall-unseen')
    } else {
      document.getElementById(n).classList.toggle('not-visible')
    }
  })
}


module.exports = {
  makeRandomMap,
  displayMap,
  addAvatar,
  addAgents,
  checkExplored,
  toggleVisible,
}
},{"../data/avatars.js":1,"../data/enemies.js":2,"../data/maps":3,"../data/player":4,"./turn.js":8}],8:[function(require,module,exports){
module.exports = {
  nextTurn,
  getCoords,
  getIdx,
  resetTurns,
}

var turnCount = 0



const player = require('../data/player.js')
const maps = require('../data/maps.js')

function resetTurns() {
  turnCount = 0
  document.getElementById('turn-count').innerText = 'Turns taken: ' + turnCount
  return turnCount
}

function nextTurn(input) {
  const map = require('./mapFunctions.js')
  let screen = maps.screens[0]
  let height = screen.height
  let width = screen.width
  map.toggleVisible()
  document.getElementById('alert').innerText = 'Alert:'
  let coords = getCoords(player.location, height, width)
  let destCoords = getDestination(coords, input)
  if (checkOutOfBounds(destCoords, height, width) !== true) {
    document.getElementById('alert').innerText = 'Alert: You cannot move off the map'
    map.toggleVisible()
    return
  }
  let destIdx = getIdx(destCoords, height)
  if (screen.mapArr[destIdx].terrain === 'wall') {
    document.getElementById('alert').innerText = 'Alert: You cannot move through a wall'
    map.toggleVisible()
    return
  }
  player.location = destIdx
  turnCount++
  document.getElementById('turn-count').innerText = 'Turns taken: ' + turnCount
  map.displayMap(maps.screens[0])
}



function getCoords(idx, height, width) {
  let col = idx % height
  let row = (idx - col) / width
  return [col, row]
}

function getIdx(coords, height) {
  let idx = coords[0] + coords[1] * height
  return idx
}

function getDestination(origin, move) {
  let colMove = origin[0] + move[0]
  let rowMove = origin[1] + move[1]
  let destCoords = [colMove, rowMove]
  return destCoords
}

function checkOutOfBounds(coords, height, width) {
  let check = false
  if ((coords[0] < 0 || coords[0] >= width) || (coords[1] < 0 || coords[1] >= height)) {
    return check
  }
  return check = true
}

function getVisibleTiles(screen, ref) {
  let visTiles = []
  for (let i = 0; i < 9; i++) {
    if (i !== 4) {
      let coordMod = [Math.floor(i / 3) - 1, (i % 3) - 1]
      let workingArr = findVisLimit(ref, coordMod, screen)
      let newArr = workingArr.concat(visTiles)
      visTiles = newArr
    }
  }
  visTiles.forEach(idx => {
    maps.screens[0].mapArr[idx].isVisible = true
    maps.screens[0].mapArr[player.location].isVisible = true
  })
  return visTiles
}

function addVisIdx(idx) {

}

function findVisLimit(ref, mod, screen) {
  let workingArr = []
  let target = [ref[0] + mod[0], ref[1] + mod[1]]

  for (let done = false; (!done);) {
    let targetIdx = getIdx(target, 35, 35)
    if (screen[targetIdx].terrain === 'wall' || screen[targetIdx].terrain === undefined) {
      done = true
    } else {
      target = [target[0] + mod[0], target[1] + mod[1]]
    }
    workingArr.push(targetIdx)
  }
  return workingArr
}

function checkExplored(screen, ref) {
  let visible = getNeighboursTwoOut(getCoords(player.location, 35, 35))
  visible.map(idx => {
    screen.mapArr[idx].isExplored = true
  })
}

function getNeighboursTwoOut(coords) {
  let neighbours = []
  for (let i = 0; i < 5; i++) {
    let rowMod = coords[1] + (i - 2)
    for (let n = 0; n < 5; n++) {
      let colMod = coords[0] + (n - 2)
      if (colMod >= 0 && colMod < maps.screens[0].width && rowMod >= 0 && rowMod < maps.screens[0].width) {
        let idx = getIdx([colMod, rowMod], 35)
        neighbours.push(idx)
      }
    }
  }
  return neighbours
}


},{"../data/maps.js":3,"../data/player.js":4,"./mapFunctions.js":7}]},{},[5]);
