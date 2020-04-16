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