import React, {Component} from "react";
import './Board.css'

interface IProps {
}

interface IState {
    locked: boolean
}

class Field extends Component<IProps, IState> {
// TODO
// Field-State/Props:
// - filledValue
// - numbersToCount
// - onClick
    constructor(props: IProps) {
        super(props);
        this.state = {
            locked: false
        }
    }


    render() {
        return (
            <tr>
                {/*TODO:
                    - use props and pass locked prop/state from board
                    - pass value prop from board
                */}
                <td className={`cell ${this.state.locked ? 'locked' : ''}`}>
                    <button onClick={() => this.setState({locked: !this.state.locked})}>sdasd</button>
                </td>
            </tr>
        )
    }

}

export default Field