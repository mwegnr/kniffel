import React, {Component} from "react";
import './Board.css'

interface IProps {
}

interface IState {
}

class Field extends Component<IProps, IState> {
// TODO
// Field-State/Props:
// - filledValue
// - numbersToCount
// - onClick

    render() {
        return (
            <tr><td className='cell'><input type='number'/></td></tr>
        )
    }

}

export default Field