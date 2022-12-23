import React, { Component } from 'react';
import Node from './Node';
import "./Grid.css"; 

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: Array(20)
        .fill()
        .map((_, rowIndex) =>
          Array(35)
            .fill()
            .map((_, colIndex) => new Node(rowIndex, colIndex)),
        ),
    };
  }

  render() {
    return (
      <div className="grid-parent">
        <div className="grid">
          {this.state.grid.map((row, rowIndex) => (
            <div key={rowIndex}>
              {row.map((col, colIndex) => (
                <Node 
                  row={row}
                  col={col}


                  >

                </Node>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}


