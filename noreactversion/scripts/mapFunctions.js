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
  let edgeTiles = []
for (let i = 0 ; i < 35; i++){
edgeTiles.push(i)
if (i > 0){
  edgeTiles.push(i * 35)
  edgeTiles.push((i*35) + 34)
}
}
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