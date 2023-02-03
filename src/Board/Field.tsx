import React, {Component} from "react";
import './Board.css'

interface IProps {
    locked: boolean
    value: number
    isResultField: boolean
    calcValue: () => number
    setValue: (value: number) => void
    onClick: () => void
}

interface IState {
}

class Field extends Component<IProps, IState> {
    render() {
        return (
            <tr>
                <td className={`cell ${this.props.locked ? 'locked' : ''}`}>
                    <button onClick={() => this.onClick()}>
                        {this.showText()}
                    </button>
                </td>
            </tr>
        )
    }

    onClick() {
        this.props.setValue(this.props.calcValue())
        this.props.onClick()
    }

    showText(): number {
        if (this.props.isResultField || !this.props.locked) {
            return this.props.calcValue()
        }
        return this.props.value
    }
}

export default Field