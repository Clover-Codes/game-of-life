import React from 'react';
import { Component } from 'react';
import Cell from './Cell';

class Board extends Component {
    // this got the props state, which is a 2d array of all boolean values
    // and it got the props num, which is the row and column number

    constructor(props) {
      super(props);
      this.state = {
        mouse: false,
      }
    }

    renderCell(life, k, i, j) {
      return (
        <Cell life={life} key={k} onClick = {() => this.props.onClick(i, j)} mouse={this.state.mouse}/>
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
            <div className='board' 
                 onMouseDown={(state)=>{
                  //  console.log('down');
                   this.setState(()=>{
                     return{mouse: true}
                   });
                  //  console.log(this.state.mouse);
                 }}
                 onMouseUp={(state)=> {
                   this.setState(()=>{
                     return{mouse: false}
                   });
                  //  console.log(this.state.mouse);
                 }}
                 // bug: if you do mouse up outside the board, it doesn't make it false again
                 >
                {board}
            </div>
        )
    }
    render() {
      //note: variables exist in render, functions out of render
      return (
       <>
       {/* <p>hi hello</p> */}
       {this.renderBoard()}
       </>
      );
    }
  }

export default Board