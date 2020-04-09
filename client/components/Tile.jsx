import React from 'react'

class Tile extends React.Component{
  state = {
    className: 'tile',
    style: {

    }
  }
  
 render(){
 return (
 <div style = {this.state.style} className = {this.state.className}>{this.props.id}</div>
 )
}
}

export default Tile