import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './Board';

  class Game extends React.Component {
    constructor(props) {
      super(props);
      let size = 20;
      let board = new Array(size);

      for(let i=0; i<size; i++) {
        board[i] = new Array(size).fill(false);
      }
      this.state = {
        current: board,
        ongoing: false,
        size: size,
        gen: 0,
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

    gameUpdation() {
      // let next = this.state.current.slice();

      // this next gen below could be written in a better way
      let next = new Array(this.state.size);
      this.setState({gen: this.state.gen+1});

      for(let i=0; i<this.state.size; i++) {
        next[i] = new Array(this.state.size).fill(false);
      }

      let size = this.state.size;
      for(let i=1; i<size-1; i++) {
        for(let j=1; j<size-1; j++) {
          next[i][j] = this.lives(i, j, size);
          // if(next[i][j]) {
          //   console.log(`game: ${this.state.ongoing}    cell ${i}, ${j} became alive`);
          // }
        }
      }
      // console.table(this.state.current);// this shows an updated current when i haven't changes it yet
      // here, current somehow updates when i update next, 
      // i need them to be separate so i can get a new generations] all at once, not cell by cell
      this.setState({current: next});
    }

    gameReset() {
      let next = this.state.current.slice();
      for(let i=0; i<this.state.size; i++) {
        for(let j=0; j<this.state.size; j++) {
          next[i][j] = false;
        }
      }

      this.setState({current: next});
      this.setState({gen: 0});
    }

    componentDidMount = () => {
      console.log(this.state.ongoing);
      // setInterval(this.gameUpdation, 1000);
    }

    componentWillUnmount = () => {
      console.log('huh');
      // clearInterval(this.gameUpdation);
    }

    render() {
      let buttonText = this.state.ongoing? 'Stop' : 'Start';
      return (
        <div>
          <h1>Game of Life</h1>
          <div className="main-game">
            <Board size={this.state.size} board={this.state.current} onClick = {(i, j) => this.handleClick(i, j)}/>
            <button className='game toggle'
              onClick={() => this.gametoggle()}
            >
            {buttonText}
            </button>
            <button className='game reset'
              onClick={() => this.gameReset()}
            >
            Reset
            </button>
            <p>Generations: {this.state.gen}</p>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
