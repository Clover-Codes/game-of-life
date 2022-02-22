import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './Board';

  class Game extends React.Component {
    constructor(props) {
      super(props);
      // let size = 20;
      let row = Math.floor((window.innerHeight - 275)/21);
      let col = Math.floor((window.innerWidth - 150)/21);
      let board = new Array(row);
      // let width = window.innerWidth;

      for(let i=0; i<row; i++) {
        board[i] = new Array(col);
        for(let j=0; j<col; j++) {
          board[i][j] = false;
        }
      }
      this.state = {
        current: board,
        ongoing: false,
        // size: size,
        row: row,
        col: col,
        gen: 0,
        // WindowSize : width,
      };
      this.handleResize = this.handleResize.bind(this);
    }

    componentDidMount = () => {
      setInterval(this.gameUpdation, 100); // 300ms
      // clearInterval(k);
      // this runs but i don't remove this before unmounting
      window.addEventListener("resize", this.handleResize);
    }
    componentWillUnmount() {
      window.addEventListener("resize", null);
    }
    handleResize(WindowSize, event) {
        // this.setState({WindowSize: window.innerWidth})
        // this.setState({col: Math.floor((window.innerWidth - 150)/21)}) // not instant
        this.setState((state) => {
          return {col: Math.floor((window.innerWidth - 150)/21)} // you gotta see how many pixels because different dispays have different resolution
        });
        // this.setState({row: Math.floor((window.innerHeight - 350)/21)})
        this.setState((state) => {
          return {row: Math.floor((window.innerHeight - 350)/21)}
        });
        this.gameReset();
    }

    handleClick(i, j) {
      // let toggle = this.state.current;
      // toggle[i][j] = !this.state.current[i][j];
      // this.setState({current: toggle})
      this.setState((state) => {
        let toggle = state.current;
        toggle[i][j] = !(state.current[i][j]);
        return {current: toggle}
      });
    }

    gametoggle() {
      // this.setState({ongoing: !this.state.ongoing})
      this.setState((state) => {
        return {ongoing: !(state.ongoing)}
      });
      // this.gameUpdation();
    }
    
    lives(x, y, row, col, board) {
      let sum = 0;
      for(let i=-1; i<2; i++) {
        for(let j=-1; j<2; j++) {
          sum+=(board[(x+i+row)%row][(y+j+col)%col])?1:0;
          // console.log(board[(x+i+row)%row][(y+j+col)%col])
        }
      }

      sum-=(board[x][y]?1:0);

      // console.log(`sum: ${sum} cell: ${x}, ${y}`);//
      if(board[x][y]) {
        if(sum<2 || sum>3) {
          return false;
        } else {
          return true;
        }
      } else {
        if(sum===3) {
          return true;
        } else {
          return false;
        }
      }
    }

    gameUpdation = () => {
      // console.table(this.state.current);//
      // console.table(this.state.current[0]);
      // let k = new Array(this.state.row);
      // for(let i=0; i<this.state.row; i++) {
      //   k[i] = this.state.current[i][0];
      // }
      // console.table(k);
      // console.log(`the ongoing rn is ${this.state.ongoing}`);
      if(this.state.ongoing===false) {
        return;
      }
      this.setState((state) => {
        return {gen: state.gen + 1}
      });
      // console.table(this.state.current);// this shows an updated current when i haven't changes it yet
      // here, current somehow updates when i update next, 
      // i need them to be separate so i can get a new generations] all at once, not cell by cell
      this.setState((state) => {
        // console.log(state.current);//
        let next = new Array(state.row);
        for(let i=0; i<state.row; i++) {
          next[i] = new Array(state.col).fill(false);
        }
        for(let i=0; i<state.row; i++) {
          for(let j=0; j<state.col; j++) {
            // console.log(state.col);
            next[i][j] = this.lives(i, j, state.row, state.col, state.current);
          }
        }
        // console.log(state.current);//
        return {current: next}
      });
    }

    gameReset() {
      this.setState((state) => {
        let next = new Array(state.row);
        for(let i=0; i<state.row; i++) {
          next[i] = new Array(state.col).fill(false);
        }
        return {current: next}
      });

      this.setState(() => {
        return {gen: 0}
      });

      this.setState(() => {
        return {ongoing: false}
      });
    }

    gameRandom() {
      this.setState((state) => {
        let next = new Array(state.row);
        for(let i=0; i<state.row; i++) {
          next[i] = new Array(state.col);
          for(let j=0; j<state.col; j++) {
            next[i][j] = (Math.random() < 0.2)?true:false;
          }
        }
        return {current: next}
      });

      this.setState(() => {
        return {gen: 0}
      });
    }

    // updator(state) {
    //   console.log(state.ongoing);
    // }

    render() {
      let buttonText = this.state.ongoing? 'Pause' : 'Start';
      return (
        <div className="main-game">
          <h1>Game of Life</h1>
          {/* <h2>Width: {this.state.WindowSize} </h2> */}
          <Board row={this.state.row} col={this.state.col} board={this.state.current} onClick = {(i, j) => this.handleClick(i, j)}/>
          <div className="controls">
            <div className='game toggle'
              onClick={() => this.gametoggle()}
            >
            <p>{buttonText}</p>
            </div>
            <div className='game random'
              onClick={() => this.gameRandom()}
            >
            <p>Randomize</p>
            </div>
            <div className='game reset'
              onClick={() => this.gameReset()}
            >
            <p>Reset</p>
            </div>
          </div>
          <div className='stats gen'><p>Generation: {this.state.gen}</p></div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
