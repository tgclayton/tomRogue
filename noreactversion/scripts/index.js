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