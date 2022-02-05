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

    componentDidMount = () => {
      setInterval(this.gameUpdation, 100); // 300ms
      // clearInterval(k);
      // this runs but i don't remove this before unmounting
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

    gameUpdation = () => {
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
        let next = new Array(state.size);
        for(let i=0; i<state.size; i++) {
          next[i] = new Array(state.size).fill(false);
        }
        for(let i=1; i<state.size-1; i++) {
          for(let j=1; j<state.size-1; j++) {
            next[i][j] = this.lives(i, j, state.size);
          }
        }
        return {current: next}
      });
    }

    gameReset() {

      // this.gametoggle();

      // this.setState({current: next});
      this.setState((state) => {
        let next = new Array(state.size);
        for(let i=0; i<state.size; i++) {
          next[i] = new Array(state.size).fill(false);
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

    // updator(state) {
    //   console.log(state.ongoing);
    // }

    render() {
      let buttonText = this.state.ongoing? 'Pause' : 'Start';
      return (
        <div>
          <h1>Game of Life</h1>
          <div className="main-game">
            <Board size={this.state.size} board={this.state.current} onClick = {(i, j) => this.handleClick(i, j)}/>
            <div className="controls">
              <div className='game toggle'
                onClick={() => this.gametoggle()}
              >
              <p>{buttonText}</p>
              </div>
              <div className='game reset'
                onClick={() => this.gameReset()}
              >
              <p>Reset</p>
              </div>
              <div className='stats gen'><p>Generations: {this.state.gen}</p></div>
            </div>
          </div>
          {/* don't write any functions here, because they will be called whenever this whole this is rerendered */}
          {/* {console.log('hi')} */}
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
