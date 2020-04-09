import React from 'react'
import ReactDOM from 'react-dom'

import Game from './components/Game.jsx'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Game />,
    document.getElementById('game')
  )
})

// document.addEventListener('DOMContentLoaded', () => {
//   ReactDOM.render(
//     <App />,
//     document.getElementById('app')
//   )
// })