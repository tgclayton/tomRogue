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

