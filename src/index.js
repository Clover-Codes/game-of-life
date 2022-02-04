import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './Board';

  class Game extends React.Component {
    constructor(props) {
      super(props);
      let size = 15;
      let board = new Array(size);

      for(let i=0; i<size; i++) {
        board[i] = new Array(size).fill(false);
      }
      this.state = {
        // current: Array[10][10].fill(true),
        // CHECKPOINT: how do i make a 2d array in state?
        current: board,
        ongoing: true,
        size: size,
      };
    }

    handleClick(i, j) {
      let toggle = this.state.current;
      toggle[i][j] = !this.state.current[i][j];
      this.setState({current: toggle})
    }

    render() {
      return (
        <div>
          <Board size={this.state.size} board={this.state.current} onClick = {(i, j) => this.handleClick(i, j)}/>
          {/* <p>HELL</p> */}
        {/* {console.log("hi")}; */}
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
