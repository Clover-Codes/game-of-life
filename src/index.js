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
        ongoing: false,
        size: size,
      };
    }

    handleClick(i, j) {
      let toggle = this.state.current;
      toggle[i][j] = !this.state.current[i][j];
      this.setState({current: toggle})
    }

    gametoggle() {
      this.setState({ongoing: !this.state.ongoing})
      this.gameUpdation();
    }
    
    lives(x, y, size) {
      let sum = 0;
      let board = this.state.current;
      for(let i=-1; i<2; i++) {
        for(let j=-1; j<2; j++) {
          if(x+i>size || x+i<0 || y+j>size || y+j<0) {
            sum+=0;
          } else {
            sum+=board[x+i][y+j];
          }
        }
      }

      sum-=board[x][y];

      console.log(`sum: ${sum} cell: ${x}, ${y}`);//
      if(sum<2 || sum>3) {
        return false;
      } else {
        return true;
      }
    }

    gameUpdation() {
      let next = this.state.current.slice();
      let size = this.state.size;
      for(let i=1; i<size-1; i++) {
        for(let j=1; j<size-1; j++) {
          next[i][j] = this.lives(i, j, size);
          if(next[i][j]) {
            console.log(`game: ${this.state.ongoing}    cell ${i}, ${j} became alive`);
          }
        }
      }
      console.table(this.state.current);// this shows an updated current when i haven't changes it yet
      // here, current somehow updates when i update next, 
      // i need them to be separate so i can get a new generations] all at once, not cell by cell
      // this.setState({current: next});
    }

    render() {
      let buttonText = this.state.ongoing? 'Stop' : 'Start';
      return (
        <div>
          <Board size={this.state.size} board={this.state.current} onClick = {(i, j) => this.handleClick(i, j)}/>
          {/* <p>HELL</p> */}
        {/* {console.log("hi")}; */}
          <button className='game'
            onClick={() => this.gametoggle()}
          >
          {buttonText}
          </button>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
