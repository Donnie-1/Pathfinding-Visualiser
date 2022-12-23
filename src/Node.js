import React, { Component } from 'react';


export default class Node extends Component {
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }
  

  render() {
    return ( 
      <div className="grid-item" ></div>
    )
  }
      
}