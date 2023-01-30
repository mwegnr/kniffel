import React, {Component} from "react";
import Die from "./Die";
import "./Dice.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";


interface IProps {
    values: Array<number>;
    lockedDice: Array<boolean>;
    lockDie: (i: number) => void;
    shuffleDice: () => void;

}

class Dice extends Component<IProps> {
    renderDie(i: number) {
        return (<Die value={this.props.values[i]}
                     locked={this.props.lockedDice[i]}
                     onClick={() => this.props.lockDie(i)}
                     key={`die_${i}`}
        />)
    }

    render() {
        return (
            <div className="dice-row">
                {this.props.values.map((_, index) => this.renderDie(index))}
                <FontAwesomeIcon icon={`shuffle` as IconProp} onClick={() => this.props.shuffleDice()}
                                 className='dice-icon small'/>
            </div>
        )
    }
}

export default Dice