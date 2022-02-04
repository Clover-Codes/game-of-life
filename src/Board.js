import React from 'react';
import { Component } from 'react';
import Cell from './Cell';

class Board extends Component {
    // this got the props state, which is a 2d array of all boolean values
    // and it got the props num, which is the row and column number
    renderCell(life, k, i, j) {
      return (
        <Cell life={life} key={k} onClick = {() => this.props.onClick(i, j)}/>
      );
    }

    renderRow(i) { // the row number
      let cols = this.props.size;
      let row = new Array(cols);
      for(let j=0; j<cols; j++) {
        row[j] = this.renderCell(this.props.board[i][j], i*cols+j, i, j); // this makes an array of Cell components
      }
      return (
        <div key={i}>
          {row}
        </div> // returns a div wrapping [num] number of Cell components from the i'th row of the prop state
      );
    }

    renderBoard() {
        let rows = this.props.size;
        // console.log(rows);//
        let board = new Array(rows); 
        for(let i=0; i<rows; i++) {
            board[i] = this.renderRow(i); // an array of divs wrapping cell elements
        }

        return (
            <div>
                {/* <p>Hi hell wow</p> */}
                {board}
                {/* {console.log(this.props.board)} */}
            </div>
        )
    }
    render() {
      //note: variables exist in render, functions out of render
      return (
       <div>
       {/* <p>hi hello</p> */}
       {this.renderBoard()}
       </div>
      );
    }
  }

export default Board