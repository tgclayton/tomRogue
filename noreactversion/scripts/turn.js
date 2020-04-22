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

