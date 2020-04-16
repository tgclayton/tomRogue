import React from 'react'
import ReactDOM from 'react-dom'
import detect from './scripts/detectKeystroke.js'
import Game from './components/Game.jsx'

console.log('Toms Rogue')

window.addEventListener("keydown", function(e) {
  // if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) { // stops arrow keys scrolling window
      e.preventDefault();
      detect(e)
  // }
}, false);

// document.onkeydown = detect

document.addEventListener('DOMContentLoaded', () => {
 
  ReactDOM.render(
    <Game />,
    document.getElementById('game')
    
  )
  
})

