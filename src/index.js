import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './Board';

  class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        // current: Array[10][10].fill(true),
        // CHECKPOINT: how do i make a 2d array in state?
        ongoing: true,
      };
    }

    render() {
      return (
        <div>
        <p>HI!</p>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
