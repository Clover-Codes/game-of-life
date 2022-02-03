import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Cell from './Cell';

  function Square(props) {
    return (
      <button className = 'square'
              onClick = {props.onClick}>
        {props.value}
      </button>
    )
  }
  
  class Board extends React.Component {

    renderSquare() {
      return (
        <Square/>
      );
    }
  
    render() {
      return (
       <div>
         <p>HII!!!!</p>
         {this.renderSquare()}
       </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    handleClick(i) {
    }

    render() {
      return (
        <div>
        <p>HI!</p>
        <Cell life={false}/>
        <Board/>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
