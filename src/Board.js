import React from 'react';
import { Component } from 'react';
import Cell from './Cell';

class Board extends Component {
    // this got the props state, which is a 2d array of all boolean values
    // and it got the props num, which is the row and column number
    renderCell(life) {
      return (
        <Cell life={life}/>
      );
    }

    renderRow(i) { // the row number
      let cols = this.props.num;
      let row = new Array(cols);
      for(let j=0; j<cols; j++) {
        row[j] = this.renderCell(false); // this makes an array of Cell components
      }
      return (
        <div>
          {row}
        </div> // returns a div wrapping [num] number of Cell components from the i'th row of the prop state
      );
    }

    renderBoard() {
        let rows = this.props.num;
        let board = new Array(rows); 
        for(let i=0; i<rows; i++) {
            board[i] = this.renderRow(i); // an array of divs wrapping cell elements
        }

        return (
            <div>
                <p>Hi</p>
            </div>
        )
    }
    render() {
      //note: variables exist in render, functions out of render

      return (
       <div>
       <p>hi</p>
       </div>
      );
    }
  }

export default Board