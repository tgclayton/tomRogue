

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