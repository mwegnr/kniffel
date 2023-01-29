import React, {Component} from "react";
import './Dice.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {IconProp} from "@fortawesome/fontawesome-svg-core";

interface IProps {
    value: number;
    locked: boolean;
    onClick: () => void
}

const faces = ["one", "two", "three", "four", "five", "six"]

class Die extends Component<IProps> {
    render() {
        return (
            <div>
                <FontAwesomeIcon icon={`dice-${faces[this.props.value - 1]}` as IconProp}
                                 className={`dice-icon ${this.props.locked ? 'locked' : ''}`}
                                 onClick={() => this.props.onClick()}/>
            </div>
        )
    }
}


export default Die