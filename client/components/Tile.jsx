import React from 'react'

class Tile extends React.Component {

  state = {
    classNames: ['tile'],
    symbol: this.setTile(),
    style: null
  }

  // constructor(props) {
  //   super(props)
  //   this.state.symbol = this.setTile()
  // }


  setTile() {
    if (Math.random() > 0.8)
      return '#'
    else
      return '.'
  }

  symbolChange(sym) {
    this.setState({
      classNames: ['tile'],
      symbol: sym,
      style: {
      }
    })
  }

  check = () => {
    console.log('Check worked')
    console.log(this)
  }

  tileInfo = () => {
    console.log(this)
    if (this.state.symbol === '#') {
      alert('This is a wall')
    } else if (this.state.symbol === '.') {
      alert('This tile is empty')
    }
  }

  render() {
    return (
      <div id = {this.props.id} style={this.state.style} className='tile' onClick={this.tileInfo}>{this.state.symbol}</div>
    )
  }
}

export default Tile 