import React from 'react';
// import ReactDOM from 'react-dom';
import { Component } from 'react';

class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            life: props.life,
        };
    }
    
    render() {
        let c;
        if(this.state.life) {
            c = <p>ALIVE</p>;
        } else {
            c = <p>DEad</p>;
        }
        return (
            <div>
                {c}
            </div>
        )
    }
}

export default Cell