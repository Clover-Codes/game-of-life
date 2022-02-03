import React from 'react';
import { Component } from 'react';

class Cell extends Component {
    // this got a props known as life, which is boolean
    // we need to get a click functions passed down from Game to Board and come to this
    constructor(props) {
        super(props);
        this.state = {
            life: props.life,
        };
    }
    
    render() {
        let c;
        if(this.state.life) {
            c = <div className="alive"></div>
        } else {
            c = <div className="dead"></div>
        }
        return (
            <>
                {c}
            </>
        )
    }
}

export default Cell