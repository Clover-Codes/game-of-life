import React from 'react';

// class Cell extends Component {
//     // this got a props known as life, which is boolean
//     // we need to get a click functions passed down from Game to Board and come to this
//     constructor(props) {
//         super(props);
//         this.state = {
//             life: props.life,
//         };
//     }
    
//     render() {
//         let c;
//         if(this.state.life) {
//             c = <div className="alive" onClick = {this.props.onClick()}></div>
//         } else {
//             c = <div className="dead" onClick = {this.props.onClick()}></div>
//         }
//         return (
//             <>
//                 {c}
//             </>
//         )
//     }
// }

function check(mouse, fun) {
  if(mouse) {
    fun();
  }
}

function Cell(props) {
    return (
      <div className = {props.life? 'alive':'dead'}
              onMouseOver = {()=>check(props.mouse, props.onClick)}
              onMouseDown = {props.onClick}
              onDragStart={()=>false} onDrop={()=>false}>
        {props.value}
      </div>
    )
  }

export default Cell